"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useRef, useEffect, useState, type FormEvent } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import {
  FloatingInput,
  FloatingTextarea,
} from "@/features/contact/components/FloatingField";
import { FormSuccess } from "@/features/contact/components/FormSuccess";
import {
  contactContent,
  emptyEnquiryForm,
  environmentOptions,
} from "@/features/contact/content";
import { simulatedEnquirySubmission } from "@/features/contact/lib/submission";
import {
  hasEnquiryErrors,
  validateEnquiryField,
  validateEnquiryForm,
} from "@/features/contact/lib/validation";
import type {
  EnquiryFormData,
  EnquiryFormErrors,
  EnquiryFormField,
  EnquirySubmissionAdapter,
} from "@/features/contact/types";
import { cn } from "@/lib/utils";

interface EnquiryFormProps {
  submissionAdapter?: EnquirySubmissionAdapter;
  className?: string;
}

/* ─── Custom styled dropdown ───────────────────────────────────────────────── */
interface StyledSelectProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
}

function StyledEnvironmentSelect({ value, onChange, onBlur, error }: StyledSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = environmentOptions.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  return (
    <div className="relative" ref={ref}>
      {/* Floating label */}
      <span
        className={cn(
          "pointer-events-none absolute left-0 z-10 origin-left text-muted-foreground transition-all duration-200",
          value || open
            ? "top-0 scale-[0.92] text-[10px] sm:text-xs tracking-wide"
            : "top-3 text-sm sm:top-4",
          open && "text-brand-green",
          error && "text-destructive",
        )}
      >
        Environment
      </span>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        onBlur={() => { if (!open) onBlur?.(); }}
        className={cn(
          "w-full border-0 bg-transparent pt-4 pb-1 text-left text-sm outline-none transition-colors duration-200 sm:pt-5 sm:text-base",
          selected ? "text-white" : "text-transparent",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected?.label ?? "\u00a0"}
      </button>

      {/* Chevron */}
      <ChevronDown
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform duration-200",
          open && "rotate-180",
        )}
      />

      {/* Bottom line */}
      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-[1px] transition-all duration-200 origin-left",
          open ? "bg-brand-green scale-x-100 opacity-100" : "bg-white/20 scale-x-100 opacity-50",
        )}
        aria-hidden
      />

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Environment"
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1a13]/95 py-1.5 shadow-2xl backdrop-blur-xl"
          >
            {environmentOptions.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  onBlur?.();
                }}
                className={cn(
                  "cursor-pointer px-4 py-2.5 text-sm transition-colors duration-150 select-none",
                  opt.value === value
                    ? "bg-brand-green/15 text-brand-green font-medium"
                    : "text-white/75 hover:bg-white/8 hover:text-white",
                )}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-destructive/90" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Main form component ──────────────────────────────────────────────────── */
export function EnquiryForm({
  submissionAdapter = simulatedEnquirySubmission,
  className,
}: EnquiryFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<EnquiryFormData>({
    ...emptyEnquiryForm,
  });
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryFormField, boolean>>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = useCallback(
    (field: EnquiryFormField, value: string) => {
      setFormData((current) => ({ ...current, [field]: value }));

      if (touched[field]) {
        const nextErrors = validateEnquiryField(field, {
          ...formData,
          [field]: value,
        });
        setErrors((current) => ({
          ...current,
          [field]: nextErrors,
        }));
      }
    },
    [formData, touched],
  );

  const handleBlur = useCallback(
    (field: EnquiryFormField) => () => {
      setTouched((current) => ({ ...current, [field]: true }));
      const message = validateEnquiryField(field, formData);
      setErrors((current) => ({ ...current, [field]: message }));
    },
    [formData],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateEnquiryForm(formData);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      environment: true,
      company: true,
      problemDescription: true,
    });

    if (hasEnquiryErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submissionAdapter.submit(formData);
      if (result.success) {
        setIsSuccess(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl border border-white/8 bg-black/50 p-4 shadow-2xl backdrop-blur-xl sm:p-6",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <FormSuccess
            key="success"
            heading={contactContent.form.successHeading}
            message={contactContent.form.successMessage}
          />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: durations.base, ease: easings.premium }}
          >
            {/* Form header */}
            <div className="mb-5">
              <h3 className="text-2xl font-bold text-white leading-tight">
                Let's start with your space
              </h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                What kind of environment are you looking to protect?
              </p>
            </div>

            {/* Fields grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <FloatingInput
                name="name"
                label="Full Name"
                autoComplete="name"
                value={formData.name}
                error={touched.name ? errors.name : undefined}
                onChange={(event) => updateField("name", event.target.value)}
                onBlur={handleBlur("name")}
              />

              <FloatingInput
                name="phone"
                type="tel"
                label="Phone Number"
                autoComplete="tel"
                inputMode="tel"
                value={formData.phone}
                error={touched.phone ? errors.phone : undefined}
                onChange={(event) => updateField("phone", event.target.value)}
                onBlur={handleBlur("phone")}
              />

              {/* Custom styled environment dropdown */}
              <StyledEnvironmentSelect
                value={formData.environment}
                onChange={(val) => updateField("environment", val)}
                onBlur={handleBlur("environment")}
                error={touched.environment ? errors.environment : undefined}
              />

              <FloatingInput
                name="email"
                type="email"
                label="Work Email"
                autoComplete="email"
                inputMode="email"
                value={formData.email}
                error={touched.email ? errors.email : undefined}
                onChange={(event) => updateField("email", event.target.value)}
                onBlur={handleBlur("email")}
              />

              <div className="sm:col-span-2">
                <FloatingInput
                  name="company"
                  label="Company Name"
                  optional
                  autoComplete="organization"
                  value={formData.company}
                  onChange={(event) => updateField("company", event.target.value)}
                  onBlur={handleBlur("company")}
                />
              </div>

              {/* New: Tell us more about your problem */}
              <div className="sm:col-span-2">
                <FloatingTextarea
                  name="problemDescription"
                  label="Tell us more about your problem"
                  optional
                  value={formData.problemDescription}
                  onChange={(event) =>
                    updateField("problemDescription", event.target.value)
                  }
                  onBlur={handleBlur("problemDescription")}
                  rows={2}
                />
              </div>
            </div>

            {/* Response-time nudge */}
            <p className="mt-4 text-xs text-white/35 text-center">
              We'll get back to you within 24 hours — no spam, ever.
            </p>

            {/* Submit */}
            <div className="pt-3">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-white px-8 text-sm font-semibold tracking-wide text-black transition-colors duration-300 ease-premium hover:bg-white/90 disabled:opacity-60"
                whileHover={prefersReducedMotion || isSubmitting ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion || isSubmitting ? undefined : { scale: 0.98 }}
              >
                <span className="relative flex items-center gap-2">
                  {isSubmitting ? "Submitting…" : contactContent.form.submitLabel}
                </span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import {
  FloatingInput,
  FloatingTextarea,
} from "@/features/contact/components/FloatingField";
import { FormSuccess } from "@/features/contact/components/FormSuccess";
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

// ── Environment options ────────────────────────────────────────────────────────

const B2C_ENVIRONMENTS = [
  { value: "apartment", label: "Home / Apartment" },
  { value: "villa", label: "Villa / Independent House" },
  { value: "studio", label: "Studio / Compact Space" },
  { value: "farmhouse", label: "Farmhouse / Estate" },
] as const;

const CITY_OPTIONS = [
  "Delhi / NCR", "Mumbai", "Bengaluru", "Hyderabad", "Chennai",
  "Pune", "Kolkata", "Ahmedabad", "Chandigarh", "Jaipur",
  "Lucknow", "Other",
] as const;

// ── Custom Dropdown ────────────────────────────────────────────────────

interface StyledSelectProps {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
}

function StyledSelect({ label, value, options, onChange, onBlur, error }: StyledSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedByValue = value ? options.find((o) => o.value === value) : null;

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onBlur]);

  return (
    <div className="relative" ref={ref}>
      <span
        className={cn(
          "pointer-events-none absolute left-0 z-10 origin-left text-muted-foreground transition-all duration-200",
          value || open
            ? "top-0 scale-[0.92] text-[10px] sm:text-xs tracking-wide"
            : "top-3 text-sm sm:top-4",
          open && "text-[#C5A059]",
          error && "text-destructive",
        )}
      >
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        onBlur={() => { if (!open) onBlur?.(); }}
        className={cn(
          "w-full border-0 bg-transparent pt-4 pb-1 text-left text-sm outline-none transition-colors duration-200 sm:pt-5 sm:text-base",
          selectedByValue ? "text-foreground" : "text-transparent",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedByValue?.label ?? "\u00a0"}
      </button>

      <ChevronDown
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform duration-200",
          open && "rotate-180",
        )}
      />

      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-[1px] transition-all duration-200",
          open ? "bg-[#C5A059]" : "bg-border",
        )}
        aria-hidden
      />

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-border bg-white py-1.5 shadow-elevated"
          >
            {options.map((opt, i) => (
              <li
                key={`${opt.value}-${i}`}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => { onChange(opt.value); setOpen(false); onBlur?.(); }}
                className={cn(
                  "cursor-pointer px-4 py-2.5 text-sm transition-colors duration-150 select-none",
                  opt.value === value
                    ? "bg-[#FDFBF7] text-[#C5A059] font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main Form ─────────────────────────────────────────────────────────────────

export function ResidentialEnquiryForm({
  submissionAdapter = simulatedEnquirySubmission,
  className,
}: {
  submissionAdapter?: EnquirySubmissionAdapter;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [city, setCity] = useState("");

  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    company: "", // Not used in residential but required by type
    email: "",
    phone: "",
    environment: "",
    message: "",
    problemDescription: "",
  });
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryFormField, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = useCallback(
    (field: EnquiryFormField, value: string) => {
      setFormData((current) => ({ ...current, [field]: value }));
      if (touched[field]) {
        const nextErrors = validateEnquiryField(field, { ...formData, [field]: value });
        setErrors((current) => ({ ...current, [field]: nextErrors }));
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
    // Bypassing 'company' validation for residential
    const dataToValidate = { ...formData, company: "Residential Client" };
    const nextErrors = validateEnquiryForm(dataToValidate);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, environment: true, problemDescription: true });
    
    // Ignore company error
    const hasError = Object.entries(nextErrors).some(([k, v]) => k !== "company" && v);
    if (hasError) return;
    
    setIsSubmitting(true);
    try {
      const result = await submissionAdapter.submit(dataToValidate);
      if (result.success) setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <FormSuccess
            key="success"
            heading="We're on it."
            message="An O2Cure Residential Specialist will contact you within 24 hours."
          />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: durations.base, ease: easings.premium }}
          >
            {/* Form header */}
            <div className="mb-6">
              <h2 className="text-[1.3rem] font-bold text-[#1A1C19] leading-tight tracking-[-0.02em]">
                Schedule Air Diagnostics
              </h2>
              <p className="mt-1.5 text-[0.85rem] text-gray-500 font-light leading-relaxed">
                Tell us about your home — we'll design the right purification solution.
              </p>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <FloatingInput
                name="name"
                label="Full Name"
                autoComplete="name"
                value={formData.name}
                error={touched.name ? errors.name : undefined}
                onChange={(e) => updateField("name", e.target.value)}
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
                onChange={(e) => updateField("phone", e.target.value)}
                onBlur={handleBlur("phone")}
              />

              <StyledSelect
                label="Property Type"
                value={formData.environment}
                options={B2C_ENVIRONMENTS}
                onChange={(val) => updateField("environment", val)}
                onBlur={handleBlur("environment")}
                error={touched.environment ? errors.environment : undefined}
              />

              <StyledSelect
                label="City / Area"
                value={city}
                options={CITY_OPTIONS.map((c) => ({ value: c, label: c }))}
                onChange={setCity}
              />

              <div className="sm:col-span-2">
                <FloatingInput
                  name="email"
                  type="email"
                  label="Email Address"
                  autoComplete="email"
                  inputMode="email"
                  value={formData.email}
                  error={touched.email ? errors.email : undefined}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={handleBlur("email")}
                />
              </div>

              <div className="sm:col-span-2">
                <FloatingTextarea
                  name="problemDescription"
                  label="Tell us about your home & concerns"
                  optional
                  value={formData.problemDescription}
                  onChange={(e) => updateField("problemDescription", e.target.value)}
                  onBlur={handleBlur("problemDescription")}
                  rows={3}
                />
              </div>
            </div>

            {/* Privacy note */}
            <p className="mt-5 text-[0.7rem] text-gray-400 font-light text-center leading-relaxed">
              Your information is secure and never shared. Response guaranteed within 24 hours.
            </p>

            {/* Submit */}
            <div className="pt-4">
              <motion.button
                type="submit"
                id="residential-submit-btn"
                disabled={isSubmitting}
                className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-[#C5A059] px-8 text-[0.9rem] font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-[#A88746] disabled:opacity-60"
                whileHover={prefersReducedMotion || isSubmitting ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion || isSubmitting ? undefined : { scale: 0.98 }}
              >
                {/* shimmer */}
                {!isSubmitting && (
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                )}
                <span className="relative">
                  {isSubmitting ? "Submitting…" : "Request Consultation →"}
                </span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

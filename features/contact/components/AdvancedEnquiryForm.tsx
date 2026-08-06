"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2, ChevronDown, Home } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

import { Reveal } from "@/components/motion/Reveal";
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

// ── Types ─────────────────────────────────────────────────────────────────────

type ClientType = "b2b" | "b2c";

interface AdvancedEnquiryFormProps {
  submissionAdapter?: EnquirySubmissionAdapter;
  className?: string;
}

// ── Environment options ────────────────────────────────────────────────────────

const B2B_ENVIRONMENTS = [
  { value: "corporate",        label: "Office / Corporate Campus" },
  { value: "healthcare",       label: "Hospital / Clinic"          },
  { value: "industrial",       label: "Factory / Industrial"       },
  { value: "education",        label: "School / University"        },
  { value: "government",       label: "Government / Defence"       },
  { value: "airports-transit", label: "Airport / Transit Hub"      },
] as const;

const B2C_ENVIRONMENTS = [
  { value: "residential", label: "Home / Apartment"          },
  { value: "residential", label: "Villa / Independent House" },
  { value: "residential", label: "Studio / Compact Space"    },
] as const;

const CITY_OPTIONS = [
  "Delhi / NCR", "Mumbai", "Bengaluru", "Hyderabad", "Chennai",
  "Pune", "Kolkata", "Ahmedabad", "Chandigarh", "Jaipur",
  "Lucknow", "Other",
] as const;

// ── B2B / B2C Selector ────────────────────────────────────────────────────────

function ClientTypeToggle({
  value,
  onChange,
}: {
  value: ClientType;
  onChange: (v: ClientType) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Select enquiry type"
      className="flex rounded-xl border border-border bg-muted/40 p-1 gap-1"
    >
      {(["b2b", "b2c"] as ClientType[]).map((type) => {
        const isActive = value === type;
        const Icon = type === "b2b" ? Building2 : Home;
        const label = type === "b2b" ? "Business / Enterprise" : "Residential / Personal";

        return (
          <button
            key={type}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(type)}
            className={cn(
              "relative flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[0.75rem] font-semibold transition-all duration-300",
              isActive
                ? "bg-white text-brand-green shadow-soft border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-3.5 shrink-0" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ── Custom Dropdown (light) ────────────────────────────────────────────────────

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
  const selected = options.find((o) => o.label === (options.find((x) => x.value === value && options.indexOf(x) >= 0)?.label));
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
          open && "text-brand-green",
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
          open ? "bg-brand-green" : "bg-border",
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
                    ? "bg-accent text-brand-green font-medium"
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

export function AdvancedEnquiryForm({
  submissionAdapter = simulatedEnquirySubmission,
  className,
}: AdvancedEnquiryFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const [clientType, setClientType] = useState<ClientType>("b2b");
  const [city, setCity] = useState("");

  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    company: "",
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

  const handleTypeChange = (type: ClientType) => {
    setClientType(type);
    setFormData((current) => ({ ...current, environment: "", company: "" }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateEnquiryForm(formData);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, environment: true, company: true, problemDescription: true });
    if (hasEnquiryErrors(nextErrors)) return;
    setIsSubmitting(true);
    try {
      const result = await submissionAdapter.submit(formData);
      if (result.success) setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const environmentOptions = clientType === "b2b" ? B2B_ENVIRONMENTS : B2C_ENVIRONMENTS;

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl border border-border bg-white p-5 shadow-soft sm:p-7",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <FormSuccess
            key="success"
            heading="We're on it."
            message="An O₂Cure Air Quality Specialist will contact you within 2 business hours."
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
            <div className="mb-5">
              <h2 className="text-xl font-bold text-foreground leading-tight tracking-[-0.02em]">
                {clientType === "b2b"
                  ? "Request Engineering Consultation"
                  : "Schedule Air Diagnostics"}
              </h2>
              <p className="mt-1.5 text-[0.8rem] text-muted-foreground leading-relaxed">
                {clientType === "b2b"
                  ? "A certified air quality engineer will respond within 2 business hours."
                  : "Tell us about your home — we'll design the right purification solution."}
              </p>
            </div>

            {/* B2B / B2C toggle */}
            <div className="mb-5">
              <ClientTypeToggle value={clientType} onChange={handleTypeChange} />
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
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
                label="Environment Type"
                value={formData.environment}
                options={environmentOptions}
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

              <div className={clientType === "b2b" ? "" : "sm:col-span-2"}>
                <FloatingInput
                  name="email"
                  type="email"
                  label={clientType === "b2b" ? "Work Email" : "Email Address"}
                  autoComplete="email"
                  inputMode="email"
                  value={formData.email}
                  error={touched.email ? errors.email : undefined}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={handleBlur("email")}
                />
              </div>

              {clientType === "b2b" && (
                <FloatingInput
                  name="company"
                  label="Organization Name"
                  optional
                  autoComplete="organization"
                  value={formData.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  onBlur={handleBlur("company")}
                />
              )}

              <div className="sm:col-span-2">
                <FloatingTextarea
                  name="problemDescription"
                  label={
                    clientType === "b2b"
                      ? "Describe your facility & air quality concerns"
                      : "Tell us about your home & concerns"
                  }
                  optional
                  value={formData.problemDescription}
                  onChange={(e) => updateField("problemDescription", e.target.value)}
                  onBlur={handleBlur("problemDescription")}
                  rows={3}
                />
              </div>
            </div>

            {/* Privacy note */}
            <p className="mt-4 text-[0.66rem] text-muted-foreground text-center leading-relaxed">
              Your information is secure and never shared. Response guaranteed within 2 business hours.
            </p>

            {/* Submit */}
            <div className="pt-3">
              <motion.button
                type="submit"
                id="contact-submit-btn"
                disabled={isSubmitting}
                className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-brand-green px-8 text-[0.85rem] font-bold tracking-wide text-white transition-colors duration-300 hover:bg-brand-green-hover disabled:opacity-60"
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
                  {isSubmitting
                    ? "Submitting…"
                    : clientType === "b2b"
                    ? "Request Engineering Consultation →"
                    : "Schedule Air Diagnostics →"}
                </span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, ChevronDown, Home, Lock } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import { FormSuccess } from "@/features/contact/components/FormSuccess";
import { submitZohoLead } from "@/features/audit/lib/zohoLead";
import {
  hasEnquiryErrors,
  validateEnquiryForm,
} from "@/features/contact/lib/validation";
import type {
  EnquiryFormData,
  EnquiryFormErrors,
  EnquirySubmissionAdapter,
  EnvironmentType,
} from "@/features/contact/types";
import { formatBrandText } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { CitySelectDropdown } from "./CitySelectDropdown";

/**
 * AuditBookingForm — "Book A Free Air Audit" card.
 * Visual spec follows the Figma: pill toggle, filled pill inputs with
 * small bold labels above, full-width green pill CTA.
 */

type Segment = "business" | "residential";

const SEGMENTS = [
  { id: "business", label: "Business / Enterprise", icon: Building2 },
  { id: "residential", label: "Residential", icon: Home },
] as const;

const BUSINESS_ENVIRONMENTS: readonly { value: EnvironmentType; label: string }[] = [
  { value: "corporate", label: "Office / Corporate" },
  { value: "healthcare", label: "Hospital / Clinic" },
  { value: "industrial", label: "Factory / Industrial" },
  { value: "education", label: "School / University" },
  { value: "government", label: "Government / Defence" },
  { value: "airports-transit", label: "Airport / Transit Hub" },
];

const RESIDENTIAL_CONFIGS = [
  { value: "1-2-bhk", label: "1 - 2 Rooms (< 1,200 sq.ft)" },
  { value: "3-bhk", label: "3 BHK (1,200 – 2,000 sq.ft)" },
  { value: "4-bhk", label: "4 BHK (2,000 – 3,200 sq.ft)" },
  { value: "villa", label: "Villa / 5+ BHK (3,200+ sq.ft)" },
  { value: "studio", label: "Studio / Single Room" },
  { value: "other", label: "Other / Custom Layout" },
] as const;


const fieldBase =
  "h-11 w-full rounded-full border border-transparent bg-[#F1F1F3] px-5 text-[0.85rem] text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-brand-green/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(58,125,42,0.10)]";

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[0.7rem] font-bold text-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="pl-2 text-[0.68rem] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  id,
  value,
  onChange,
  options,
  placeholder = "Select",
  invalid,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
  invalid?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        aria-invalid={invalid}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          fieldBase,
          "cursor-pointer appearance-none pr-10 text-[0.8rem]",
          !value && "text-muted-foreground/70",
          invalid && "border-destructive/50",
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

interface AuditBookingFormProps {
  submissionAdapter?: EnquirySubmissionAdapter;
  className?: string;
}

export function AuditBookingForm({
  submissionAdapter,
  className,
}: AuditBookingFormProps) {
  const uid = useId();
  const prefersReducedMotion = useReducedMotion();

  const [segment, setSegment] = useState<Segment>("business");
  const [city, setCity] = useState("");
  const [residentialSize, setResidentialSize] = useState("");
  const [customSize, setCustomSize] = useState("");
  const [data, setData] = useState<EnquiryFormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    environment: "",
    message: "",
    problemDescription: "",
  });
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (field: keyof EnquiryFormData) => (value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const changeSegment = (next: Segment) => {
    setSegment(next);
    setData((d) => ({ ...d, environment: "" }));
    setErrors((e) => ({ ...e, environment: undefined }));
  };

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validateEnquiryForm(data);

    // In residential mode, Environment Type is NOT asked or required
    if (segment === "residential") {
      delete next.environment;
    }

    setErrors(next);
    if (hasEnquiryErrors(next)) return;

    setIsSubmitting(true);
    try {
      const selectedResLabel = RESIDENTIAL_CONFIGS.find(
        (c) => c.value === residentialSize,
      )?.label;

      const residentialInfo =
        residentialSize === "other" && customSize.trim()
          ? customSize.trim()
          : selectedResLabel || "";

      const environmentResolved =
        segment === "business"
          ? data.environment
          : residentialInfo || "Residential";

      const messageParts = [
        `Free air audit — ${segment === "business" ? "Business / Enterprise" : "Residential"}`,
        segment === "business" && data.environment
          ? `Environment: ${data.environment}`
          : null,
        segment === "residential" && residentialInfo
          ? `Space: ${residentialInfo}`
          : null,
        city ? `City: ${city}` : null,
      ].filter(Boolean);

      const resolvedEnvironment =
        segment === "business" ? data.environment : "residential";
      const result = submissionAdapter
        ? await submissionAdapter.submit({
            ...data,
            environment: resolvedEnvironment,
            message: messageParts.join(" — "),
          })
        : await submitZohoLead({
            fullName: data.name,
            phone: data.phone,
            email: data.email,
            environment: resolvedEnvironment,
            city,
          });
      if (result.success) {
        setSubmitted(true);
        if (typeof window !== "undefined") {
          try {
            sessionStorage.setItem(
              "o2cure_audit_submission",
              JSON.stringify({
                name: data.name,
                phone: data.phone,
                email: data.email,
                segment,
                environment: environmentResolved,
                roomsOrArea: residentialInfo,
                city,
                referenceId:
                  result.referenceId ||
                  `AUD-${Date.now().toString(36).toUpperCase()}`,
                submittedAt: new Date().toISOString(),
              }),
            );
          } catch {
            // ignore storage quota errors
          }

          // Push event to Google Tag Manager dataLayer
          const gtmWindow = window as unknown as { dataLayer?: unknown[] };
          gtmWindow.dataLayer = gtmWindow.dataLayer || [];
          gtmWindow.dataLayer.push({
            event: "audit_form_submitted",
            segment,
            environment: environmentResolved,
            roomsOrArea: residentialInfo,
            city,
          });
        }
        router.push("/thankyou");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_24px_60px_-24px_rgba(58,125,42,0.28),0_2px_6px_rgba(0,0,0,0.04)] sm:p-8",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <FormSuccess
            key="success"
            heading="Your audit is booked."
            message={formatBrandText(
              "An O2Cure Air Quality Specialist will contact you within 24 hours.",
            )}
          />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby={`${uid}-title`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: durations.base, ease: easings.premium }}
            className="flex flex-col"
          >
            <h2
              id={`${uid}-title`}
              className="text-[1.65rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-[1.9rem]"
            >
              Book A Free Air Audit
            </h2>
            <p className="mt-1 text-[0.74rem] text-muted-foreground">
              A certified air quality engineer will respond within 24 Hours
            </p>

            {/* Segment toggle */}
            <div
              role="radiogroup"
              aria-label="Audit type"
              className="mt-6 flex gap-1 rounded-full bg-[#F1F1F3] p-1"
            >
              {SEGMENTS.map(({ id, label, icon: Icon }) => {
                const active = segment === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => changeSegment(id)}
                    className={cn(
                      "flex h-11 flex-1 items-center justify-center gap-2 rounded-full border text-[0.7rem] font-bold transition-all duration-500",
                      active
                        ? "border-brand-green bg-white text-foreground shadow-soft"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon
                      className={cn("size-4", active ? "text-brand-green" : "text-muted-foreground")}
                    />
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-4">
              <Field label="Full Name" htmlFor={`${uid}-name`} error={errors.name}>
                <input
                  id={`${uid}-name`}
                  type="text"
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => set("name")(e.target.value)}
                  aria-invalid={!!errors.name}
                  className={cn(fieldBase, errors.name && "border-destructive/50")}
                />
              </Field>

              <Field label="Phone Number" htmlFor={`${uid}-phone`} error={errors.phone}>
                <input
                  id={`${uid}-phone`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                  aria-invalid={!!errors.phone}
                  className={cn(fieldBase, errors.phone && "border-destructive/50")}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {segment === "business" ? (
                  <Field
                    label="Environment Type"
                    htmlFor={`${uid}-env`}
                    error={errors.environment}
                  >
                    <SelectField
                      id={`${uid}-env`}
                      value={data.environment}
                      onChange={set("environment")}
                      options={BUSINESS_ENVIRONMENTS}
                      invalid={!!errors.environment}
                    />
                  </Field>
                ) : (
                  <Field
                    label="Rooms / Carpet Area (Optional)"
                    htmlFor={`${uid}-residential-size`}
                  >
                    <SelectField
                      id={`${uid}-residential-size`}
                      value={residentialSize}
                      onChange={setResidentialSize}
                      options={RESIDENTIAL_CONFIGS}
                      placeholder="Select (Optional)"
                    />
                  </Field>
                )}
                <Field label="City / Area" htmlFor={`${uid}-city`}>
                  <CitySelectDropdown
                    id={`${uid}-city`}
                    value={city}
                    onChange={setCity}
                    placeholder="Select city / area"
                  />
                </Field>
              </div>

              {segment === "residential" && residentialSize === "other" && (
                <Field
                  label="Custom Space / Area Details (Optional)"
                  htmlFor={`${uid}-custom-size`}
                >
                  <input
                    id={`${uid}-custom-size`}
                    type="text"
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    placeholder="e.g. 5 BHK, 4,500 sq.ft duplex"
                    className={fieldBase}
                  />
                </Field>
              )}

              <Field label="Email" htmlFor={`${uid}-email`} error={errors.email}>
                <input
                  id={`${uid}-email`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => set("email")(e.target.value)}
                  aria-invalid={!!errors.email}
                  className={cn(fieldBase, errors.email && "border-destructive/50")}
                />
              </Field>
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[0.62rem] text-muted-foreground">
              <Lock className="size-3" aria-hidden />
              Your information is secured and never shared.
            </p>

            <motion.button
              type="submit"
              id="audit-submit-btn"
              disabled={isSubmitting}
              whileTap={prefersReducedMotion || isSubmitting ? undefined : { scale: 0.99 }}
              className="group relative mt-3 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-green px-8 text-[0.76rem] font-bold uppercase tracking-[0.06em] text-white shadow-[0_10px_24px_-10px_rgba(58,125,42,0.7)] transition-colors duration-500 hover:bg-brand-green-hover disabled:opacity-60"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
              />
              <span className="relative">
                {isSubmitting ? "Booking…" : "Book an Air Audit"}
              </span>
              {!isSubmitting && (
                <ArrowRight className="relative size-4 transition-transform duration-500 group-hover:translate-x-1" />
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

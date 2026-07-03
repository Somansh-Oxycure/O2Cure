"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  useCallback,
  useState,
  type FormEvent,
} from "react";

import { Reveal } from "@/components/motion/Reveal";
import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import {
  FloatingInput,
  FloatingSelect,
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
  /** Inject a real adapter when wiring CRM / API / email later. */
  submissionAdapter?: EnquirySubmissionAdapter;
  className?: string;
}

export function EnquiryForm({
  submissionAdapter = simulatedEnquirySubmission,
  className,
}: EnquiryFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<EnquiryFormData>({
    ...emptyEnquiryForm,
  });
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryFormField, boolean>>>(
    {},
  );
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
    <div className={cn("relative", className)}>
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
            className="space-y-8 sm:space-y-9"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
            transition={{ duration: durations.base, ease: easings.premium }}
          >
            <Reveal delay={0.12} distance={18}>
              <FloatingInput
                name="name"
                label="Name"
                autoComplete="name"
                value={formData.name}
                error={touched.name ? errors.name : undefined}
                onChange={(event) => updateField("name", event.target.value)}
                onBlur={handleBlur("name")}
              />
            </Reveal>

            <Reveal delay={0.16} distance={18}>
              <FloatingInput
                name="company"
                label="Company"
                optional
                autoComplete="organization"
                value={formData.company}
                onChange={(event) => updateField("company", event.target.value)}
                onBlur={handleBlur("company")}
              />
            </Reveal>

            <Reveal delay={0.2} distance={18}>
              <FloatingInput
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                inputMode="email"
                value={formData.email}
                error={touched.email ? errors.email : undefined}
                onChange={(event) => updateField("email", event.target.value)}
                onBlur={handleBlur("email")}
              />
            </Reveal>

            <Reveal delay={0.24} distance={18}>
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
            </Reveal>

            <Reveal delay={0.28} distance={18}>
              <div className="relative">
                <FloatingSelect
                  name="environment"
                  label="Environment"
                  value={formData.environment}
                  options={environmentOptions}
                  error={touched.environment ? errors.environment : undefined}
                  onChange={(event) =>
                    updateField("environment", event.target.value)
                  }
                  onBlur={handleBlur("environment")}
                />
                <ChevronRight
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted-foreground"
                />
              </div>
            </Reveal>

            <Reveal delay={0.32} distance={18}>
              <FloatingTextarea
                name="message"
                label="Message"
                optional
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
                onBlur={handleBlur("message")}
              />
            </Reveal>

            <Reveal delay={0.36} distance={14}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-2 inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-sm font-medium tracking-wide text-primary-foreground transition-colors duration-300 ease-premium disabled:opacity-60 sm:w-auto sm:min-w-[15rem]"
                whileHover={
                  prefersReducedMotion || isSubmitting
                    ? undefined
                    : { scale: 1.02 }
                }
                whileTap={
                  prefersReducedMotion || isSubmitting
                    ? undefined
                    : { scale: 0.98 }
                }
                transition={{ duration: durations.fast, ease: easings.premium }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.18)_50%,transparent_100%)] opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100"
                />
                <span className="relative">
                  {isSubmitting ? "Sending…" : contactContent.form.submitLabel}
                </span>
              </motion.button>
            </Reveal>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

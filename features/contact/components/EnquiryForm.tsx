"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useCallback, useState, type FormEvent } from "react";

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
    <div className={cn("relative w-full rounded-3xl border border-white/5 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-10", className)}>
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
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white">Let's start with your space</h3>
              <p className="mt-2 text-sm text-muted-foreground">What kind of environment are you looking to protect?</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
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

              <div className="relative">
                <FloatingSelect
                  name="environment"
                  label="Environment"
                  value={formData.environment}
                  options={environmentOptions}
                  error={touched.environment ? errors.environment : undefined}
                  onChange={(event) => updateField("environment", event.target.value)}
                  onBlur={handleBlur("environment")}
                />
                <ChevronRight
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted-foreground"
                />
              </div>

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
            </div>

            <div className="pt-6">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-white px-8 text-sm font-medium tracking-wide text-black transition-colors duration-300 ease-premium hover:bg-white/90 disabled:opacity-60"
                whileHover={prefersReducedMotion || isSubmitting ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion || isSubmitting ? undefined : { scale: 0.98 }}
              >
                <span className="relative flex items-center">
                  {isSubmitting ? "Submitting..." : contactContent.form.submitLabel}
                </span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

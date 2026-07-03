"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useState,
  type FormEvent,
} from "react";

import { Reveal } from "@/components/motion/Reveal";
import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import { simulatedNewsletterSubmission } from "@/features/footer/lib/submission";
import type {
  FooterNewsletterContent,
  NewsletterSubmissionAdapter,
} from "@/features/footer/types";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  content: FooterNewsletterContent;
  submissionAdapter?: NewsletterSubmissionAdapter;
  className?: string;
  revealDelay?: number;
}

export function NewsletterSignup({
  content,
  submissionAdapter = simulatedNewsletterSubmission,
  className,
  revealDelay = 0.56,
}: NewsletterSignupProps) {
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(undefined);
      setIsSubmitting(true);

      const result = await submissionAdapter.subscribe(email);
      setIsSubmitting(false);

      if (!result.success) {
        setError(result.message ?? "Please enter a valid email address.");
        return;
      }

      setIsSuccess(true);
    },
    [email, submissionAdapter],
  );

  return (
    <Reveal delay={revealDelay} distance={18} amount={0.25}>
      <div className={cn("mx-auto max-w-2xl text-center", className)}>
        <h3 className="font-heading text-h3 text-foreground">
          {content.heading}
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-body-lg text-muted-foreground">
          {content.supporting}
        </p>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              role="status"
              aria-live="polite"
              className="mt-10"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.base, ease: easings.premium }}
            >
              <p className="font-heading text-h3 text-foreground">
                {content.successHeading}
              </p>
              <p className="mt-3 text-body-lg text-muted-foreground">
                {content.successMessage}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="mt-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
              transition={{ duration: durations.fast, ease: easings.premium }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-center">
                <div className="relative flex-1 sm:max-w-sm">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    {content.emailLabel}
                  </label>
                  <input
                    id="footer-newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError(undefined);
                    }}
                    placeholder={content.emailLabel}
                    className={cn(
                      "h-12 w-full border-0 border-b border-border bg-transparent px-0 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-300 ease-premium focus:border-brand-blue focus:outline-none",
                      error && "border-destructive",
                    )}
                  />
                  {error ? (
                    <p className="mt-2 text-left text-sm text-destructive">
                      {error}
                    </p>
                  ) : null}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 min-w-[9rem] items-center justify-center rounded-full border border-brand-blue/30 bg-transparent px-7 text-sm font-medium tracking-wide text-brand-blue transition-colors duration-300 ease-premium hover:border-brand-blue hover:bg-brand-blue/5 disabled:opacity-60"
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
                  {isSubmitting ? "Subscribing…" : content.submitLabel}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

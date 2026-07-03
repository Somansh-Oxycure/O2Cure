"use client";

import { motion, useReducedMotion } from "framer-motion";

import { AmbientParticles } from "@/features/contact/components/AmbientParticles";
import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";

interface FormSuccessProps {
  heading: string;
  message: string;
}

export function FormSuccess({ heading, message }: FormSuccessProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="relative flex min-h-[28rem] flex-col items-start justify-center py-8 sm:min-h-[32rem]"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: durations.base, ease: easings.premium }}
    >
      <AmbientParticles />

      <motion.p
        className="relative font-heading text-h2 text-foreground"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: durations.base,
          ease: easings.premium,
          delay: 0.1,
        }}
      >
        {heading}
      </motion.p>

      <motion.p
        className="relative mt-4 max-w-sm text-body-lg text-muted-foreground"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: durations.base,
          ease: easings.premium,
          delay: 0.2,
        }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
}

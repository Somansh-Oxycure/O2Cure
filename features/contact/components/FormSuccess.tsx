"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { AmbientParticles } from "@/features/contact/components/AmbientParticles";
import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";

interface FormSuccessProps {
  heading: string;
  message: React.ReactNode;
}

export function FormSuccess({ heading, message }: FormSuccessProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="relative flex min-h-[28rem] flex-col items-center justify-center py-8 text-center sm:min-h-[32rem]"
      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: durations.base, ease: easings.premium }}
    >
      <AmbientParticles />

      {/* Animated Icon Container */}
      <motion.div
        className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#EAF5E4] text-brand-green shadow-soft"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: durations.base,
          ease: easings.premium,
          delay: 0.1,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        {/* Subtle pulsing background glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-brand-green/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Check Icon */}
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.3,
          }}
        >
          <Check className="relative z-10 size-10 stroke-[3]" />
        </motion.div>
      </motion.div>

      {/* Heading */}
      <motion.h3
        className="relative font-heading text-[clamp(2rem,4vw,2.5rem)] font-bold text-foreground leading-tight tracking-tight"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: durations.base,
          ease: easings.premium,
          delay: 0.2,
        }}
      >
        {heading}
      </motion.h3>

      {/* Message */}
      <motion.p
        className="relative mt-4 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: durations.base,
          ease: easings.premium,
          delay: 0.3,
        }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
}

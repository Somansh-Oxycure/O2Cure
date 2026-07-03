"use client";

import { motion, useReducedMotion } from "framer-motion";

import { easings } from "@/components/motion/easings";

interface AnimatedGradientDividerProps {
  className?: string;
}

/**
 * Thin line with an almost imperceptible blue-to-white gradient drift.
 */
export function AnimatedGradientDivider({
  className = "",
}: AnimatedGradientDividerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`relative h-px w-full overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--brand-blue-light) 25%, rgba(255,255,255,0.9) 50%, var(--brand-blue-light) 75%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.6 }
            : { backgroundPosition: ["0% 0%", "100% 0%"] }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: easings.idle,
        }}
      />
      <div className="absolute inset-0 bg-border/40" />
    </div>
  );
}

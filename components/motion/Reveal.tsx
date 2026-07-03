"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Vertical offset (px) the content travels while revealing. */
  distance?: number;
  /** Duration override, in seconds. Defaults to durations.slow. */
  duration?: number;
  /** Only animate once, the first time it enters the viewport. */
  once?: boolean;
  /** Fraction of the element that must be visible before revealing. */
  amount?: number;
}

/**
 * Shared scroll-triggered reveal used across every section so entrance
 * motion stays consistent site-wide. Collapses to a simple opacity fade
 * (no vertical travel) when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  duration = durations.slow,
  once = true,
  amount = 0.3,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? durations.fast : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: easings.premium,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

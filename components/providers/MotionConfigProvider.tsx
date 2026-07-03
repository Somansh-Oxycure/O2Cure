"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";

interface MotionConfigProviderProps {
  children: ReactNode;
}

/**
 * Global Framer Motion defaults. `reducedMotion="user"` makes every Framer
 * Motion animation site-wide automatically respect the OS-level
 * prefers-reduced-motion setting (transforms are disabled, opacity fades
 * still play), without needing to check it manually in every component.
 */
export function MotionConfigProvider({ children }: MotionConfigProviderProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: durations.base, ease: easings.premium }}
    >
      {children}
    </MotionConfig>
  );
}

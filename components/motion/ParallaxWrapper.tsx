"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface ParallaxWrapperProps {
  children: ReactNode;
  className?: string;
  /**
   * How far the content travels (in px) across the scroll range.
   * Positive values move the content down as the user scrolls past it,
   * negative values move it up. Keep this subtle — parallax should
   * support storytelling, not distract from it.
   */
  strength?: number;
}

/**
 * Shared scroll-linked parallax wrapper. Tracks the wrapped element's
 * progress through the viewport and translates it vertically. Disabled
 * entirely when the user prefers reduced motion.
 */
export function ParallaxWrapper({
  children,
  className,
  strength = 40,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-strength, strength]
  );

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

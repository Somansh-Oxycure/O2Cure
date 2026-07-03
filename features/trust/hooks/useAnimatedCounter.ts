"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";

interface UseAnimatedCounterOptions {
  value: number;
  once?: boolean;
  amount?: number;
}

/**
 * Counts from zero to `value` once when the element enters the viewport.
 * Collapses to the final value immediately when reduced motion is preferred.
 */
export function useAnimatedCounter({
  value,
  once = true,
  amount = 0.4,
}: UseAnimatedCounterOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    return motionValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [motionValue]);

  useEffect(() => {
    if (!isInView) return;
    if (hasAnimated.current && once) return;

    if (prefersReducedMotion) {
      motionValue.set(value);
      hasAnimated.current = true;
      return;
    }

    const controls = animate(motionValue, value, {
      duration: durations.slow,
      ease: easings.premium,
    });

    hasAnimated.current = true;
    return () => controls.stop();
  }, [isInView, value, motionValue, prefersReducedMotion, once]);

  return { ref, displayValue };
}

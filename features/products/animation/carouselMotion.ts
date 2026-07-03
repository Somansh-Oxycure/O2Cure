import type { Transition } from "framer-motion";

import { durations } from "@/components/motion/durations";

/** Spring physics for carousel track movement — 500–700ms settle, no harsh snap. */
export const carouselSpring = {
  type: "spring",
  stiffness: 260,
  damping: 34,
  mass: 0.85,
} as const satisfies Transition;

/** Card focus states when becoming active / inactive. */
export const cardFocusSpring = {
  type: "spring",
  stiffness: 280,
  damping: 32,
  mass: 0.75,
} as const satisfies Transition;

/** Reduced-motion fallback — still smooth, but shorter. */
export const carouselTween = {
  duration: durations.fast,
  ease: [0.16, 1, 0.3, 1],
} as const satisfies Transition;

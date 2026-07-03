import { easings } from "@/components/motion/easings";

/** Panel selector motion tokens — aligned with Chapter 2 blueprint timings. */
export const panelMotion = {
  collapsedHeight: 120,
  compressedHeight: 100,
  expandedHeight: 370,
  gap: 14,
  expand: {
    duration: 0.6,
    ease: easings.standard,
  },
  image: {
    duration: 0.4,
    ease: easings.standard,
  },
  cta: {
    duration: 0.5,
    ease: easings.standard,
  },
} as const;

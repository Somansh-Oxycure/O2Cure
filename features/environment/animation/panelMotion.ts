import { easings } from "@/components/motion/easings";

/** Panel selector motion tokens — cinematic, premium feel. */
export const panelMotion = {
  collapsedHeight: 88,
  compressedHeight: 76,
  expandedHeight: 400,
  gap: 10,
  expand: {
    duration: 0.65,
    ease: easings.premium,
  },
  image: {
    duration: 0.45,
    ease: easings.premium,
  },
  cta: {
    duration: 0.5,
    ease: easings.premium,
  },
} as const;

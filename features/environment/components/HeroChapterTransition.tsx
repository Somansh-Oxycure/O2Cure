"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface HeroChapterTransitionProps {
  progress: MotionValue<number>;
}

const CLEAN_PARTICLES = [
  { left: "18%", size: 4, delay: 0 },
  { left: "32%", size: 3, delay: 0.08 },
  { left: "44%", size: 5, delay: 0.04 },
  { left: "56%", size: 3, delay: 0.12 },
  { left: "68%", size: 4, delay: 0.06 },
] as const;

/**
 * Scroll-linked overlays on the Hero — simulates the Chapter 2 handoff
 * without modifying Hero internals: polluted world dissolves, clean world
 * brightens, purifier exits downward, clean particles drift upward.
 */
export function HeroChapterTransition({ progress }: HeroChapterTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  const pollutedFade = useTransform(progress, [0.3, 0.78], [0, 1]);
  const brightWash = useTransform(progress, [0.45, 0.95], [0, 0.88]);
  const exitCurtainHeight = useTransform(progress, [0.28, 0.82], ["0%", "58%"]);
  const particleDrift = useTransform(progress, [0, 1], [0, -140]);
  const particleOpacity = useTransform(progress, [0.15, 0.55, 0.95], [0, 0.55, 0]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[38] overflow-hidden"
    >
      {/* Polluted half dissolves into clean white — feathered horizontal blend
          so there is no hard vertical seam cutting through the middle */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[70%] bg-linear-to-l from-background via-background/85 to-transparent"
        style={{ opacity: pollutedFade }}
      />

      {/* Overall brightening — entering the clean world */}
      <motion.div
        className="absolute inset-0 bg-white"
        style={{ opacity: brightWash }}
      />

      {/* Purifier exits downward beneath rising white curtain */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent"
        style={{ height: exitCurtainHeight }}
      />

      {/* Clean particles continue drifting upward */}
      {CLEAN_PARTICLES.map((particle) => (
        <motion.span
          key={particle.left}
          className="absolute bottom-[22%] rounded-full bg-brand-blue-light/50 blur-[1px]"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            y: particleDrift,
            opacity: particleOpacity,
          }}
        />
      ))}
    </div>
  );
}

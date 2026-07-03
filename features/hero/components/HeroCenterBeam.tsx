"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Green beam rising from the purifier — soft glow, slow breathing pulse.
 */
export function HeroCenterBeam() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 z-20 w-[2px] -translate-x-1/2"
      style={{ bottom: "clamp(160px, 34vh, 420px)" }}
    >
      <div
        className={`h-full w-full bg-brand-green ${prefersReducedMotion ? "" : "animate-hero-beam-pulse"}`}
        style={{
          boxShadow:
            "0 0 12px 2px color-mix(in oklch, var(--brand-green) 55%, transparent), 0 0 32px 6px color-mix(in oklch, var(--brand-green) 25%, transparent)",
        }}
      />
    </div>
  );
}

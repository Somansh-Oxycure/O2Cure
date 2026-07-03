"use client";

import { easings } from "@/components/motion/easings";
import { PHASE_RANK } from "@/features/aqi/animation/purificationSequence";
import type { PurificationPhase } from "@/features/aqi/types";
import { cn } from "@/lib/utils";

interface AqiLightingOverlayProps {
  phase: PurificationPhase;
  lightingProgress: number;
  className?: string;
}

/**
 * Soft atmosphere tint — no masks, no opaque white layers.
 */
export function AqiLightingOverlay({
  phase,
  lightingProgress,
  className,
}: AqiLightingOverlayProps) {
  const rank = PHASE_RANK[phase];
  const isLightingOrAfter = rank >= PHASE_RANK.lighting;

  const pollutedOpacity = !isLightingOrAfter ? 1 : 1 - lightingProgress;
  const cleanOpacity = !isLightingOrAfter ? 0 : lightingProgress;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
    >
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: pollutedOpacity,
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(210, 155, 90, 0.12) 0%, rgba(195, 130, 75, 0.05) 50%, transparent 75%)",
          transitionTimingFunction: easings.premium.join(","),
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: cleanOpacity,
          background:
            "radial-gradient(ellipse 95% 75% at 50% 48%, rgba(120, 210, 185, 0.16) 0%, rgba(180, 230, 215, 0.07) 50%, transparent 72%)",
          transitionTimingFunction: easings.premium.join(","),
        }}
      />
    </div>
  );
}

import type { PurificationPhase } from "@/features/aqi/types";

/**
 * Particle-focused sequence — values count down in parallel from attraction onward.
 */
export const PURIFICATION_TIMELINE = {
  button: 0,
  attraction: 400,
  dissolve: 2000,
  cleanEmerge: 2800,
  lighting: 3000,
  complete: 5500,
} as const;

export const VALUES_START = PURIFICATION_TIMELINE.button;
export const VALUES_END = PURIFICATION_TIMELINE.complete;

export function getPhaseAtElapsed(elapsedMs: number): PurificationPhase {
  if (elapsedMs >= PURIFICATION_TIMELINE.complete) return "complete";
  if (elapsedMs >= PURIFICATION_TIMELINE.lighting) return "lighting";
  if (elapsedMs >= PURIFICATION_TIMELINE.cleanEmerge) return "cleanEmerge";
  if (elapsedMs >= PURIFICATION_TIMELINE.dissolve) return "dissolve";
  if (elapsedMs >= PURIFICATION_TIMELINE.attraction) return "attraction";
  if (elapsedMs >= PURIFICATION_TIMELINE.button) return "button";
  return "idle";
}

export function phaseProgress(
  elapsedMs: number,
  start: number,
  end: number,
): number {
  if (elapsedMs <= start) return 0;
  if (elapsedMs >= end) return 1;
  return (elapsedMs - start) / (end - start);
}

export function easeOutCubic(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return 1 - (1 - c) ** 3;
}

/** Shared 0–1 progress for pollutant + AQI countdown during purification. */
export function getValueProgress(elapsedMs: number): number {
  return easeOutCubic(phaseProgress(elapsedMs, VALUES_START, VALUES_END));
}

export const PHASE_RANK: Record<PurificationPhase, number> = {
  idle: 0,
  button: 1,
  attraction: 2,
  dissolve: 3,
  cleanEmerge: 4,
  lighting: 5,
  complete: 6,
};

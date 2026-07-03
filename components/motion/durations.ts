/**
 * Shared duration tokens (in seconds, for Framer Motion / GSAP).
 *
 * Named by intent rather than raw value so every section evolves timing
 * together instead of drifting apart with hardcoded numbers.
 */
export const durations = {
  /** Micro-interactions: hover, focus, small state changes. */
  fast: 0.3,
  /** Default entrance/exit transitions for most UI. */
  base: 0.6,
  /** Section-level reveals (headline, cards, imagery). */
  slow: 1.0,
  /** Hero-scale cinematic transitions. */
  cinematic: 1.4,
} as const;

export type DurationName = keyof typeof durations;

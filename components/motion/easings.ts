/**
 * Shared easing curves for the entire site.
 *
 * Per docs/05_AI_AGENT_INSTRUCTIONS.md: motion should feel expensive and
 * cinematic. Avoid bounce, elastic, overshoot and fast scaling. These are
 * the only easing curves that should be used across Framer Motion, GSAP
 * and CSS transitions — never inline ad-hoc bezier values in a component.
 *
 * `premium` mirrors the `--ease-premium` CSS variable in app/globals.css
 * so JS-driven and CSS-driven motion feel identical.
 */
export const easings = {
  /** Slow, decelerating "expo-out" curve. Default for most entrance motion. */
  premium: [0.16, 1, 0.3, 1] as const,
  /** Neutral, slightly less dramatic deceleration for smaller UI transitions. */
  standard: [0.4, 0, 0.2, 1] as const,
  /** Symmetric ease for looping/idle motion (e.g. floating, glow pulses). */
  idle: [0.45, 0, 0.55, 1] as const,
} as const;

export type EasingName = keyof typeof easings;

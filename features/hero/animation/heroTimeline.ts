/**
 * Orchestrated Hero entrance sequence (milliseconds).
 */
export const heroTimeline = {
  heroFadeIn: 0,
  eyebrow: 150,
  headline: 300,
  supportingText: 500,
  buttons: 700,
  tagline: 950,
  purifier: 800,
  particles: 1100,
} as const;

export function msToSeconds(ms: number): number {
  return ms / 1000;
}

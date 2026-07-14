/**
 * AQI section copy — shaped like future CMS content.
 * Two narrative states: confrontation (polluted) → resolution (clean).
 */
export const aqiContent = {
  /** Act 1 — confrontation line, visible at scrollProgress 0–0.5 */
  pollutedLine: "This is the air you are breathing.",
  /** Act 2 — resolution line, visible at scrollProgress 0.6–1 */
  cleanLine: "This is air, with O₂Cure.",
  /** CTA at the end of the scroll */
  cta: "Discover the technology behind this",
  ctaHref: "#technology",
  /** Aria label for the scroll container */
  ariaLabel: "Live AQI purification experience",
} as const;

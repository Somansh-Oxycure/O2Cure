"use client";

import { AqiScrollContainer } from "@/features/aqi/components/AqiScrollContainer";
import { useAqiData } from "@/features/aqi/hooks/useAqiData";

/**
 * AQI section — Chapter 3 of the homepage.
 *
 * A scroll-driven purification experience: the user scrolls and the world
 * transforms around them from polluted (amber/dark) to clean (ice-blue).
 * AQI counts down live. Pollutant readings update in real-time.
 * No interaction required. No button. No drag. Scroll is the only input.
 *
 * Works identically on mobile and desktop.
 */
export function AqiSection() {
  const { city, isLocating } = useAqiData();

  return (
    <section
      id="aqi-effect"
      aria-labelledby="aqi-effect-heading"
      className="relative w-full"
    >
      {/* Visually-hidden heading for screen readers & SEO */}
      <h2
        id="aqi-effect-heading"
        className="sr-only"
      >
        Experience the O₂Cure Effect — Live Air Quality Purification
      </h2>

      <AqiScrollContainer city={city} isLocating={isLocating} />
    </section>
  );
}

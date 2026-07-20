"use client";

import { getAqiColor } from "@/features/aqi/data/aqiCategories";
import type { AqiReading } from "@/features/aqi/types";
import { cn } from "@/lib/utils";

interface AqiAnchorProps {
  reading: AqiReading;
  isLocating?: boolean;
  className?: string;
}

/**
 * Prominent AQI focal point — updates every frame during purification.
 */
export function AqiAnchor({
  reading,
  isLocating = false,
  className,
}: AqiAnchorProps) {
  const accent = getAqiColor(reading.aqi);

  return (
    <div
      className={cn("text-center", className)}
      aria-live="polite"
    >
      <p className="text-body-lg text-muted-foreground">
        {isLocating ? "Locating…" : reading.city}
      </p>

      <p className="mt-1.5 text-eyebrow tracking-widest text-muted-foreground">
        AQI
      </p>

      <p
        className="font-heading text-h1 tabular-nums sm:text-display"
        style={{ color: accent }}
      >
        {reading.aqi}
      </p>

      <p className="mt-1.5 text-body-lg text-muted-foreground">
        {reading.statusLabel}
      </p>
    </div>
  );
}

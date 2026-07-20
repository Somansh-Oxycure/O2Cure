"use client";

import type { PollutantReading } from "@/features/aqi/data/pollutants";

interface AqiPollutantStripProps {
  pollutants: PollutantReading[];
  /** 0 = polluted state, 1 = clean state */
  progress: number;
}

/**
 * Compact horizontal chip strip showing 6 live pollutant readings.
 *
 * Design:
 * - Polluted state: warm cream chips with amber border — feel alarming
 * - Clean state: cool mint chips with teal border — feel resolved
 * - Values use tabular nums and darken for readability on white
 * - Strip itself fades slightly at ends to suggest more
 */
export function AqiPollutantStrip({
  pollutants,
  progress,
}: AqiPollutantStripProps) {
  const isClean = progress > 0.5;

  const chipBg = isClean
    ? "oklch(0.95 0.025 200 / 0.88)"
    : "oklch(0.97 0.028 50 / 0.92)";

  const chipBorder = isClean
    ? `oklch(0.60 0.12 200 / ${0.28 + progress * 0.22})`
    : `oklch(0.68 0.12 46 / ${0.32 + (1 - progress) * 0.2})`;

  return (
    <div
      role="list"
      aria-label="Pollutant readings"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "7px",
        padding: "0 12px",
        maxWidth: "520px",
        width: "100%",
      }}
    >
      {pollutants.map((p) => {
        const isHigh = p.value > 80;
        const valColor = isClean
          ? "oklch(0.34 0.14 155)"
          : isHigh
            ? "oklch(0.38 0.16 36)"
            : "oklch(0.42 0.10 46)";

        return (
          <div
            key={p.id}
            role="listitem"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              minWidth: "68px",
              padding: "7px 10px",
              borderRadius: "10px",
              background: chipBg,
              border: `1px solid ${chipBorder}`,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "background 0.4s ease, border-color 0.4s ease",
            }}
          >
            {/* Pollutant name */}
            <span
              style={{
                fontSize: "0.56rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "oklch(0.40 0.04 50 / 0.6)",
              }}
            >
              {p.name}
            </span>

            {/* Value + unit */}
            <span
              style={{
                fontSize: "0.88rem",
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
                color: valColor,
                transition: "color 0.3s ease",
              }}
              aria-live="polite"
            >
              {p.value}
              <span
                style={{
                  fontSize: "0.52rem",
                  fontWeight: 400,
                  marginLeft: "2px",
                  color: "oklch(0.42 0 0 / 0.45)",
                }}
              >
                {p.unit}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

import { getAqiColor } from "@/features/aqi/data/aqiCategories";
import type { AqiReading, SimulatedCity } from "@/features/aqi/types";

interface AqiScoreDisplayProps {
  reading: AqiReading;
  progress: number;
  isLocating?: boolean;
  city: SimulatedCity;
}

/**
 * AQI score centrepiece.
 *
 * Layout (top → bottom):
 *   City eyebrow
 *   "AIR QUALITY INDEX" label
 *   Massive AQI number  ← always locked to vertical centre
 *   Category tag
 *   Narrative copy (cross-fades — never overlaps number)
 *
 * The copy container uses min-height so it never compresses other elements.
 */
export function AqiScoreDisplay({
  reading,
  progress,
  isLocating = false,
  city,
}: AqiScoreDisplayProps) {
  const prefersReducedMotion = useReducedMotion();
  const aqiColor = getAqiColor(reading.aqi);

  // Health metric copy
  const reductionPct = Math.round(
    ((city.pollutedAqi - city.cleanAqi) / city.pollutedAqi) * 100,
  );

  // Cross-fade thresholds — polluted exits by 40%, clean enters from 55%
  const pollutedOpacity = Math.max(0, 1 - progress * 2.5);
  const cleanOpacity = Math.max(0, (progress - 0.55) * 3.5);

  // Number colour darkened for light-bg legibility
  const numberFilter =
    progress < 0.5
      ? `brightness(${0.62 + progress * 0.12}) saturate(1.35)`
      : `brightness(${0.72 + progress * 0.08}) saturate(1.18)`;

  // Ambient glow: tight amber drop-shadow → clean green glow
  const numberShadow =
    progress < 0.5
      ? `0 2px 18px oklch(0.58 0.18 40 / ${0.22 + (1 - progress) * 0.2})`
      : `0 2px 22px oklch(0.50 0.16 152 / ${0.18 + progress * 0.22})`;

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{ gap: 0 }}
    >
      {/* City */}
      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          color: "oklch(0.38 0.08 50 / 0.72)",
          marginBottom: "6px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
        aria-live="polite"
      >
        <span aria-hidden>📍</span>
        <span>{isLocating ? "Locating…" : reading.city}</span>
      </motion.p>

      {/* AQI label */}
      <p
        style={{
          fontSize: "0.6rem",
          fontWeight: 500,
          letterSpacing: "0.24em",
          color: "oklch(0.40 0.02 50 / 0.48)",
          marginBottom: "4px",
        }}
      >
        Air Quality Index
      </p>

      {/* ── The number ── */}
      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        className="font-heading tabular-nums"
        style={{
          fontSize: "clamp(4.8rem, 14vw, 8rem)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: aqiColor,
          textShadow: numberShadow,
          filter: numberFilter,
          transition: "color 0.35s ease, filter 0.35s ease",
          marginBottom: "8px",
        }}
        aria-label={`AQI ${reading.aqi}`}
        aria-live="polite"
      >
        {reading.aqi}
      </motion.p>

      {/* Category tag */}
      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: aqiColor,
          filter: "brightness(0.78) saturate(1.2)",
          marginBottom: "16px",
        }}
        aria-live="polite"
      >
        {reading.statusLabel}
      </motion.p>

      {/* ── Narrative copy — fixed height so it NEVER collapses or overflows ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          height: "44px",       // fixed: enough for 2 lines of text at body-sm
          flexShrink: 0,
        }}
      >
        {/* Polluted line */}
        <p
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.82rem",
            fontStyle: "italic",
            lineHeight: 1.45,
            color: "oklch(0.44 0.12 44 / 0.85)",
            opacity: pollutedOpacity,
            textAlign: "center",
            padding: "0 8px",
          }}
        >
          This is the air you breathe every day.
        </p>

        {/* Clean line — multi-line friendly */}
        <p
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.82rem",
            fontWeight: 600,
            lineHeight: 1.45,
            color: "oklch(0.36 0.14 152 / 0.92)",
            opacity: cleanOpacity,
            textAlign: "center",
            padding: "0 8px",
          }}
        >
          Oxycure: {city.pollutedAqi} → {city.cleanAqi} AQI.&nbsp;
          Breathe {reductionPct}% cleaner air.
        </p>
      </div>
    </div>
  );
}

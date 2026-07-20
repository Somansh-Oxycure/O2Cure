"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

import { AqiAtmosphere } from "@/features/aqi/components/AqiAtmosphere";
import { AqiBackground } from "@/features/aqi/components/AqiBackground";
import { AqiCta } from "@/features/aqi/components/AqiCta";
import { AqiPollutantStrip } from "@/features/aqi/components/AqiPollutantStrip";
import { AqiScoreDisplay } from "@/features/aqi/components/AqiScoreDisplay";
import type { SimulatedCity } from "@/features/aqi/types";
import {
  interpolateAqi,
  interpolatePollutants,
} from "@/features/aqi/data/pollutants";
import { buildAqiReading } from "@/features/aqi/data/simulatedAqi";
import { useScrollProgress } from "@/features/aqi/hooks/useScrollProgress";
import { aqiContent } from "@/features/aqi/content";

interface AqiScrollContainerProps {
  city: SimulatedCity;
  isLocating: boolean;
}

/**
 * The core scroll-driven purification experience.
 *
 * 280vh outer container — sticky inner panel tracks scroll progress 0→1.
 * Layout: main score block is always centred. CTA resolution panel appears
 * as an absolute overlay at the bottom so it never pushes content around.
 *
 * Two emotional phases:
 *   0–0.5  → ALERT: amber haze, pulsing danger badge, high AQI
 *   0.5–1  → RESOLUTION: sky clears, green badge, AQI drops, success copy
 */
export function AqiScrollContainer({
  city,
  isLocating,
}: AqiScrollContainerProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawProgress = useScrollProgress(
    outerRef as React.RefObject<HTMLElement | null>,
  );
  const progress = prefersReducedMotion ? 1 : rawProgress;

  const currentAqi = interpolateAqi(city, progress);
  const currentPollutants = interpolatePollutants(city, progress);
  const reading = buildAqiReading(city, currentAqi);

  // Scroll hint: vanishes after first 5% scroll
  const scrollHintOpacity = Math.max(0, 1 - progress * 20);

  // "Purification flash" — a very brief bright bloom at progress ~0.72
  const flashOpacity = (() => {
    const center = 0.72;
    const width = 0.06;
    const dist = Math.abs(progress - center);
    return dist < width ? Math.max(0, 1 - dist / width) * 0.18 : 0;
  })();

  // Resolution overlay (bottom-anchored) — slides up and fades in at end
  const resolutionOpacity = Math.max(0, (progress - 0.82) / 0.18);
  const resolutionY = Math.round((1 - resolutionOpacity) * 24);

  return (
    /* 150vh: compact travel for a fast, punchy animation */
    <div
      ref={outerRef}
      className="relative w-full"
      style={{ height: "150vh" }}
      aria-label={aqiContent.ariaLabel}
    >
      {/* ── Sticky viewport panel ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* L0 — CSS gradient background */}
        <AqiBackground progress={progress} />

        {/* L1 — canvas particle haze */}
        <AqiAtmosphere progress={progress} />

        {/* L2 — purification flash bloom */}
        {flashOpacity > 0.001 && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              opacity: flashOpacity,
              background:
                "radial-gradient(ellipse 60% 50% at 50% 48%, oklch(0.98 0.04 160 / 0.9) 0%, transparent 70%)",
            }}
          />
        )}

        {/* L3 — centred UI core (never shifts) */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          {/* ── Status badge ── */}
          <StatusBadge progress={progress} />

          {/* ── Spacer ── */}
          <div className="h-3 sm:h-4" />

          {/* ── AQI score block ── */}
          <AqiScoreDisplay
            reading={reading}
            progress={progress}
            isLocating={isLocating}
            city={city}
          />

          {/* ── Spacer ── */}
          <div className="h-5 sm:h-6" />

          {/* ── Pollutant chips ── */}
          <AqiPollutantStrip pollutants={currentPollutants} progress={progress} />
        </div>

        {/* L4 — resolution overlay: absolutely positioned, never moves main content */}
        <div
          aria-hidden={resolutionOpacity < 0.1}
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center pb-14 sm:pb-16"
          style={{
            opacity: resolutionOpacity,
            transform: `translateY(${resolutionY}px)`,
          }}
        >
          {/* Divider line */}
          <div
            className="mb-6 h-px w-16"
            style={{ background: "oklch(0.55 0.14 152 / 0.3)" }}
          />
          <div className="pointer-events-auto">
            <AqiCta progress={progress} href={aqiContent.ctaHref} />
          </div>
        </div>

        {/* L5 — scroll hint (bottom centre) */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: scrollHintOpacity }}
        >
          <span
            className="text-eyebrow tracking-[0.2em]"
            style={{ color: "oklch(0.42 0.06 50 / 0.6)", fontSize: "0.6rem" }}
          >
            Scroll to purify
          </span>
          <ScrollChevron />
        </div>

        {/* L6 — thin progress bar at very bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 z-30 h-[2px] transition-none"
          style={{
            width: `${progress * 100}%`,
            background:
              progress < 0.5
                ? "linear-gradient(90deg, oklch(0.62 0.16 38), oklch(0.70 0.14 50))"
                : "linear-gradient(90deg, oklch(0.55 0.14 142), oklch(0.65 0.13 155))",
          }}
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Purification progress"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ScrollChevron() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className="animate-bounce"
      style={{ color: "oklch(0.44 0.08 50 / 0.5)" }}
    >
      <path
        d="M4 7l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * StatusBadge — pulsing amber pill (danger) cross-fades to steady green pill (safe).
 * Transition happens around progress 0.45–0.55 for a clear mid-point moment.
 */
function StatusBadge({ progress }: { progress: number }) {
  // Danger exits sharply before midpoint; safe enters just after
  const dangerOpacity = Math.max(0, 1 - progress * 2.2);
  const safeOpacity = Math.max(0, (progress - 0.45) * 2.2);

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    borderRadius: "9999px",
    padding: "5px 12px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ position: "relative", height: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* ⚠ Danger */}
      <div
        style={{
          ...baseStyle,
          opacity: dangerOpacity,
          background: "oklch(0.97 0.03 50 / 0.9)",
          border: "1px solid oklch(0.70 0.14 44 / 0.45)",
          pointerEvents: dangerOpacity < 0.05 ? "none" : undefined,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "oklch(0.55 0.20 36)",
            animation: "pulse 1.4s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "oklch(0.38 0.16 38)",
          }}
        >
          Unhealthy Air — AQI Alert
        </span>
      </div>

      {/* ✓ Safe */}
      <div
        style={{
          ...baseStyle,
          opacity: safeOpacity,
          background: "oklch(0.96 0.04 155 / 0.9)",
          border: "1px solid oklch(0.60 0.14 152 / 0.4)",
          pointerEvents: safeOpacity < 0.05 ? "none" : undefined,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "oklch(0.52 0.18 152)",
          }}
        />
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "oklch(0.30 0.14 152)",
          }}
        >
          Air Purified — Breathe Safe
        </span>
      </div>
    </div>
  );
}

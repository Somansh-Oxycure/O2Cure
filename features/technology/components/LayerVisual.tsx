"use client";

import { motion } from "framer-motion";

import { easings } from "@/components/motion/easings";
import type { TriCureLayer } from "@/features/technology/types";
import { getAccentPalette } from "./palette";

interface LayerVisualProps {
  layer: TriCureLayer;
  reducedMotion: boolean;
}

// ─── Particulate Visual ──────────────────────────────────────────────────────

function ParticulateVisual({
  p,
  reducedMotion,
}: {
  p: ReturnType<typeof getAccentPalette>;
  reducedMotion: boolean;
}) {
  const dots = [
    { cx: 34, cy: 44, r: 3.2, delay: 0 },
    { cx: 22, cy: 72, r: 2.2, delay: 0.3 },
    { cx: 48, cy: 88, r: 2.8, delay: 0.55 },
    { cx: 16, cy: 116, r: 2.0, delay: 0.8 },
    { cx: 58, cy: 60, r: 1.8, delay: 0.15 },
    { cx: 40, cy: 130, r: 2.4, delay: 1.0 },
    { cx: 30, cy: 100, r: 1.6, delay: 0.65 },
    { cx: 62, cy: 104, r: 2.0, delay: 0.4 },
  ];

  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      className="h-full w-full"
      aria-hidden
    >
      {/* Filter arc */}
      <path
        d="M90 20 Q140 90 90 160"
        stroke={p.raw}
        strokeWidth="2"
        strokeOpacity="0.4"
        strokeDasharray="4 6"
      />
      <path
        d="M100 30 Q148 90 100 150"
        stroke={p.raw}
        strokeWidth="1.5"
        strokeOpacity="0.2"
        strokeDasharray="3 8"
      />
      {/* "Captured" zone glow */}
      <ellipse
        cx="118"
        cy="90"
        rx="28"
        ry="60"
        fill={p.raw}
        fillOpacity="0.05"
      />

      {/* Floating particles drifting rightward */}
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill={p.raw}
          fillOpacity="0.7"
          animate={
            reducedMotion
              ? undefined
              : {
                  cx: [d.cx, d.cx + 52, d.cx + 52],
                  opacity: [0.7, 0.7, 0],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 3.5,
                  delay: d.delay,
                  repeat: Infinity,
                  ease: easings.idle,
                  times: [0, 0.7, 1],
                }
          }
        />
      ))}
    </svg>
  );
}

// ─── Microbial Visual ─────────────────────────────────────────────────────────

function MicrobialVisual({
  p,
  reducedMotion,
}: {
  p: ReturnType<typeof getAccentPalette>;
  reducedMotion: boolean;
}) {
  const rings = [0, 1, 2];

  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      className="h-full w-full"
      aria-hidden
    >
      {/* Shield body */}
      <path
        d="M80 22 L130 42 L130 90 C130 128 107 152 80 165 C53 152 30 128 30 90 L30 42 Z"
        stroke={p.raw}
        strokeWidth="1.8"
        strokeOpacity="0.5"
        fill={p.raw}
        fillOpacity="0.04"
      />

      {/* UV pulse rings emanating from shield center */}
      {rings.map((i) => (
        <motion.circle
          key={i}
          cx="80"
          cy="96"
          r="20"
          stroke={p.raw}
          strokeWidth="1.2"
          fill="none"
          animate={
            reducedMotion
              ? undefined
              : {
                  r: [20, 58],
                  strokeOpacity: [0.6, 0],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 2.4,
                  delay: i * 0.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }
          }
        />
      ))}

      {/* Center icon */}
      <circle cx="80" cy="96" r="12" fill={p.raw} fillOpacity="0.15" />
      <circle cx="80" cy="96" r="5" fill={p.raw} fillOpacity="0.6" />

      {/* Check mark inside shield */}
      <path
        d="M70 95 L77 103 L93 87"
        stroke={p.raw}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
}

// ─── Gas / Odor Visual ────────────────────────────────────────────────────────

function GasOdorVisual({
  p,
  reducedMotion,
}: {
  p: ReturnType<typeof getAccentPalette>;
  reducedMotion: boolean;
}) {
  const vapors = [
    { x: 52, baseY: 150, amplitude: 10, duration: 3.2, delay: 0 },
    { x: 80, baseY: 145, amplitude: 14, duration: 2.8, delay: 0.5 },
    { x: 108, baseY: 152, amplitude: 9, duration: 3.6, delay: 1.1 },
  ];

  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      className="h-full w-full"
      aria-hidden
    >
      {/* Clean air zone at top */}
      <ellipse
        cx="80"
        cy="45"
        rx="52"
        ry="28"
        fill={p.raw}
        fillOpacity="0.06"
        stroke={p.raw}
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="4 6"
      />
      <text
        x="80"
        y="51"
        textAnchor="middle"
        fontSize="9"
        fill={p.raw}
        fillOpacity="0.55"
        fontFamily="var(--font-plus-jakarta)"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        CLEAN AIR
      </text>

      {/* Divider / filter membrane */}
      <line
        x1="20"
        y1="100"
        x2="140"
        y2="100"
        stroke={p.raw}
        strokeWidth="1.5"
        strokeOpacity="0.3"
        strokeDasharray="5 4"
      />

      {/* Rising vapor paths */}
      {vapors.map((v, i) => (
        <motion.path
          key={i}
          d={`M${v.x} ${v.baseY} Q${v.x + v.amplitude} ${v.baseY - 20} ${v.x} ${v.baseY - 40} Q${v.x - v.amplitude} ${v.baseY - 60} ${v.x} ${v.baseY - 80}`}
          stroke={p.raw}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={
            reducedMotion
              ? undefined
              : {
                  pathLength: [0, 1, 1],
                  opacity: [0, 0.55, 0],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: v.duration,
                  delay: v.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.6, 1],
                }
          }
        />
      ))}
    </svg>
  );
}

// ─── Exported wrapper ─────────────────────────────────────────────────────────

export function LayerVisual({ layer, reducedMotion }: LayerVisualProps) {
  const p = getAccentPalette(layer.accentColor);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Ambient radial glow behind the visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${p.raw.replace("1)", "0.07)")} 0%, transparent 70%)`,
        }}
      />

      {layer.accentColor === "blue" && (
        <ParticulateVisual p={p} reducedMotion={reducedMotion} />
      )}
      {layer.accentColor === "teal" && (
        <MicrobialVisual p={p} reducedMotion={reducedMotion} />
      )}
      {layer.accentColor === "green" && (
        <GasOdorVisual p={p} reducedMotion={reducedMotion} />
      )}
    </div>
  );
}

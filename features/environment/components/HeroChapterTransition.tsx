"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface HeroChapterTransitionProps {
  progress: MotionValue<number>;
}

/**
 * World-class cinematic Hero → Chapter 2 handoff.
 *
 * Layer order (bottom → top):
 * 1. Radial clean-world glow bloom (brand green, fades in early)
 * 2. Horizontal light sweep — a single bright streak across the horizon
 * 3. Rising fog curtain from the bottom — erases the hero world
 * 4. Dissolve vignette — edges pull inward to focus center
 * 5. Top-edge chapter entry gradient — blends into Section 2 background
 * 6. Clean air particles — final breath of fresh air rising out
 */
export function HeroChapterTransition({ progress }: HeroChapterTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  // --- Layer 1: Radial glow bloom (brand-green, centered, early) ---
  const glowOpacity = useTransform(progress, [0.2, 0.55, 0.85], [0, 0.65, 0]);
  const glowScale = useTransform(progress, [0.2, 0.6], [0.6, 1.4]);

  // --- Layer 2: Horizontal light sweep ---
  const sweepX = useTransform(progress, [0.3, 0.72], ["-110%", "110%"]);
  const sweepOpacity = useTransform(
    progress,
    [0.28, 0.35, 0.6, 0.72],
    [0, 0.9, 0.9, 0],
  );

  // --- Layer 3: Fog curtain rising from bottom ---
  const fogHeight = useTransform(progress, [0.25, 0.88], ["0%", "100%"]);
  const fogOpacity = useTransform(progress, [0.25, 0.5, 0.88], [0, 0.96, 1]);

  // --- Layer 4: Dissolve vignette (dark edges pull in) ---
  const vignetteOpacity = useTransform(progress, [0.5, 0.82], [0, 0.55]);

  // --- Layer 5: Final bright white wash ---
  const whiteOut = useTransform(progress, [0.75, 0.97], [0, 1]);

  // --- Clean particles ---
  const particleDrift = useTransform(progress, [0.1, 0.85], [0, -180]);
  const particleOpacity = useTransform(
    progress,
    [0.12, 0.38, 0.72, 0.9],
    [0, 0.7, 0.7, 0],
  );

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[38] overflow-hidden"
    >
      {/* Layer 1 — Radial brand-green glow bloom */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: glowOpacity }}
      >
        <motion.div
          className="h-[70vmax] w-[70vmax] rounded-full"
          style={{
            scale: glowScale,
            background:
              "radial-gradient(circle, rgba(58,125,42,0.28) 0%, rgba(58,125,42,0.12) 35%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Layer 2 — Horizontal cinematic light sweep */}
      <motion.div
        className="absolute inset-y-0 w-[45%]"
        style={{
          x: sweepX,
          opacity: sweepOpacity,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 15%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.06) 85%, transparent 100%)",
          filter: "blur(2px)",
          left: 0,
        }}
      />

      {/* Layer 3 — Fog curtain (rising from bottom, brand background color) */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: fogHeight,
          opacity: fogOpacity,
          background:
            "linear-gradient(to top, #F5F5F4 0%, #F5F5F4 40%, rgba(245,245,244,0.95) 70%, transparent 100%)",
        }}
      />

      {/* Layer 4 — Vignette dissolve (darkens edges, focuses center) */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 45%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      {/* Layer 5 — Final clean white flash */}
      <motion.div
        className="absolute inset-0 bg-[#F5F5F4]"
        style={{ opacity: whiteOut }}
      />

      {/* Clean air particles — drift upward as world brightens */}
      {CLEAN_PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            y: particleDrift,
            opacity: particleOpacity,
            background: `radial-gradient(circle, ${p.color} 0%, transparent 80%)`,
            filter: "blur(0.6px)",
          }}
        />
      ))}
    </div>
  );
}

const CLEAN_PARTICLES = [
  { id: "p1", left: "12%", bottom: "28%", size: 6, color: "rgba(58,125,42,0.7)" },
  { id: "p2", left: "22%", bottom: "18%", size: 4, color: "rgba(75,190,165,0.65)" },
  { id: "p3", left: "35%", bottom: "32%", size: 8, color: "rgba(58,125,42,0.5)" },
  { id: "p4", left: "44%", bottom: "22%", size: 5, color: "rgba(95,205,180,0.6)" },
  { id: "p5", left: "55%", bottom: "36%", size: 4, color: "rgba(58,125,42,0.55)" },
  { id: "p6", left: "63%", bottom: "20%", size: 7, color: "rgba(75,190,165,0.5)" },
  { id: "p7", left: "74%", bottom: "28%", size: 5, color: "rgba(58,125,42,0.6)" },
  { id: "p8", left: "84%", bottom: "18%", size: 4, color: "rgba(95,205,180,0.55)" },
  { id: "p9", left: "28%", bottom: "42%", size: 3, color: "rgba(58,125,42,0.45)" },
  { id: "p10", left: "50%", bottom: "15%", size: 6, color: "rgba(75,190,165,0.6)" },
] as const;

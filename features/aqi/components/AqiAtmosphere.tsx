"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "framer-motion";

interface AqiAtmosphereProps {
  /** 0 = fully polluted, 1 = fully clean */
  progress: number;
}

// ── Polluted particle palette — deep clay/burnt-sienna, alarming on white ──
const POLLUTED_COLORS = [
  [168, 92, 48] as const,   // burnt sienna
  [190, 110, 55] as const,  // clay amber
  [145, 78, 42] as const,   // deep rust
  [178, 100, 52] as const,  // warm terracotta
  [155, 85, 46] as const,   // earthy orange
];

// ── Clean particle palette — cool aquamarine/sky, crisp and fresh ──────────
const CLEAN_COLORS = [
  [56, 178, 172] as const,  // teal
  [72, 196, 188] as const,  // aquamarine
  [88, 210, 195] as const,  // mint
  [44, 162, 158] as const,  // deep teal
  [100, 220, 210] as const, // sky-mint
];

type Particle = {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  phase: number; // individual noise phase
  r: number;
  g: number;
  b: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function randColor(palette: readonly (readonly [number, number, number])[]): [number, number, number] {
  const c = palette[Math.floor(Math.random() * palette.length)]!;
  return [c[0], c[1], c[2]];
}

function spawnPolluted(w: number, h: number): Particle {
  const [r, g, b] = randColor(POLLUTED_COLORS);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    // Much smaller — like real particulate matter
    radius: 1.5 + Math.random() * 3.5,
    vx: (Math.random() - 0.5) * 0.10,
    vy: (Math.random() - 0.5) * 0.07 - 0.01,
    // Higher opacity so they're visible and feel oppressive on white
    opacity: 0.18 + Math.random() * 0.32,
    phase: Math.random() * Math.PI * 2,
    r, g, b,
  };
}

function spawnClean(w: number, h: number): Particle {
  const [r, g, b] = randColor(CLEAN_COLORS);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    // Tiny crystalline dots — feel airy and pure
    radius: 0.8 + Math.random() * 1.8,
    vx: (Math.random() - 0.5) * 0.15,
    vy: -(0.22 + Math.random() * 0.32),
    opacity: 0.35 + Math.random() * 0.45,
    phase: Math.random() * Math.PI * 2,
    r, g, b,
  };
}


/**
 * Canvas-based atmosphere that blends from thick amber haze (polluted)
 * to sparse teal drift (clean) as `progress` moves 0 → 1.
 *
 * Performance notes:
 * - Throttled to 30 fps on mobile (devicePixelRatio ≤ 1.5)
 * - Max DPR capped at 2 to avoid heavy overdraw on retina
 * - Particle count scales with viewport size
 */
export function AqiAtmosphere({ progress }: AqiAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const frameRef = useRef(0);
  const lastFrameRef = useRef(0);
  const pollutedRef = useRef<Particle[]>([]);
  const cleanRef = useRef<Particle[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // Keep progress in sync without re-triggering the effect
  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.devicePixelRatio <= 1.5;
    const TARGET_FPS = isMobile ? 30 : 60;
    const FRAME_MS = 1000 / TARGET_FPS;

    const resize = () => {
      const parent = canvas.parentElement!;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? 60 : 120;
      pollutedRef.current = Array.from({ length: count }, () =>
        spawnPolluted(width, height),
      );
      cleanRef.current = Array.from({ length: Math.round(count * 0.5) }, () =>
        spawnClean(width, height),
      );
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let frame = 0;

    const draw = (timestamp: number) => {
      frameRef.current = requestAnimationFrame(draw);

      // Frame throttle
      if (timestamp - lastFrameRef.current < FRAME_MS) return;
      lastFrameRef.current = timestamp;

      const p = progressRef.current;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      frame++;

      // Polluted: strong until ~60% scroll, then rapidly fades
      const pollutedAlpha = Math.max(0, 1 - p * 1.8);
      // Clean: begins entering at 25% scroll, fully present by 70%
      const cleanAlpha = Math.max(0, (p - 0.25) / 0.6);

      const t = frame * 0.008;

      // ── Draw polluted haze ────────────────────────────────────────────
      if (pollutedAlpha > 0.01) {
        for (const part of pollutedRef.current) {
          part.x += part.vx + Math.sin(t + part.phase) * 0.05;
          part.y += part.vy + Math.cos(t * 0.7 + part.phase) * 0.04;

          if (part.x < -20) part.x = width + 20;
          if (part.x > width + 20) part.x = -20;
          if (part.y < -20) part.y = height + 20;
          if (part.y > height + 20) part.y = -20;

          ctx.save();
          // Reduced blur so particles are crisp dots, not blobs, on white
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${part.r},${part.g},${part.b},0.4)`;
          ctx.beginPath();
          ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${part.r},${part.g},${part.b},${part.opacity * pollutedAlpha})`;
          ctx.fill();
          ctx.restore();
        }
      }

      // ── Draw clean particles ──────────────────────────────────────────
      if (cleanAlpha > 0.01) {
        for (const part of cleanRef.current) {
          part.x += part.vx + Math.sin(t * 1.2 + part.phase) * 0.03;
          part.y += part.vy;

          if (part.y < -20) {
            part.y = height + 10;
            part.x = Math.random() * width;
          }
          if (part.x < -10) part.x = width + 10;
          if (part.x > width + 10) part.x = -10;

          ctx.save();
          // Crisp glow — minimal blur for sparkle effect on light bg
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${part.r},${part.g},${part.b},0.6)`;
          ctx.beginPath();
          ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${part.r},${part.g},${part.b},${part.opacity * cleanAlpha})`;
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1]"
    />
  );
}

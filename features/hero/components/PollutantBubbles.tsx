"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import type { PurifierAnchor } from "@/features/hero/components/HeroPurifier";

interface PollutantBubblesProps {
  anchor?: PurifierAnchor;
}

/**
 * Only PM2.5 and AQI — two pollutants, each appearing on both sides.
 * Dirty values on the right (polluted world), clean values on the left.
 */
const POLLUTANTS = [
  { name: "PM2.5", dirty: "450", clean: "12",  unit: "µg/m³" },
  { name: "AQI",   dirty: "318", clean: "21",  unit: ""       },
] as const;

type P = (typeof POLLUTANTS)[number];

/**
 * A labeled bubble — moves exactly like a polluted particle:
 *   - position-based vx/vy updated every frame
 *   - speed in the same 0.16–0.52 px/frame band
 *   - once it reaches the purifier it "teleports" to the clean side
 *     and drifts gently away (matching clean-particle speed 0.40–0.75)
 */
interface Bubble {
  pollutant: P;
  side: "dirty" | "clean";
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;   // visual circle radius
  opacity: number;
  spawnDelay: number;
}

/** How many of each pollutant to keep alive at once */
const COUNT_PER_POLLUTANT = 3; // 3× PM2.5 + 3× AQI = 6 bubbles total

function spawnDirtyBubble(
  pol: P,
  ox: number,
  oy: number,
  W: number,
  H: number,
  stagger: boolean,
): Bubble {
  // Spawn anywhere on the right (polluted) side, then drift toward purifier
  const x = ox + 50 + Math.random() * (W - ox - 60);
  const y = H * 0.10 + Math.random() * H * 0.78;

  const dx = ox - x;
  const dy = oy - y;
  const dist = Math.hypot(dx, dy) || 1;

  // Match polluted-particle speed band exactly: 0.16–0.52 px/frame
  const speed = 0.16 + Math.random() * 0.36;

  return {
    pollutant: pol,
    side: "dirty",
    // If staggering, pre-advance position along the drift path so bubbles
    // are spread across the screen from frame 0 (same trick as ParticleField)
    x: stagger ? x + (dx / dist) * speed * Math.random() * 400 : x,
    y: stagger ? y + (dy / dist) * speed * Math.random() * 400 : y,
    vx: (dx / dist) * speed,
    vy: (dy / dist) * speed,
    radius: 20 + Math.random() * 6,
    opacity: 0.30 + Math.random() * 0.22,  // light, like the dust motes
    spawnDelay: stagger ? 0 : Math.floor(Math.random() * 80),
  };
}

function spawnCleanBubble(
  pol: P,
  ox: number,
  oy: number,
  W: number,
  H: number,
): Bubble {
  // Emerge from near the purifier then drift leftward + slightly upward
  // Clean-particle speed: 0.40–0.75 px/frame
  const angle = Math.PI + (Math.random() - 0.5) * 0.85;
  const speed = 0.40 + Math.random() * 0.35;

  return {
    pollutant: pol,
    side: "clean",
    x: ox + (Math.random() - 0.5) * 24,
    y: oy + (Math.random() - 0.5) * 18,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 0.18,  // gentle upward bias, same as clean particles
    radius: 18 + Math.random() * 6,
    opacity: 0.28 + Math.random() * 0.20,
    spawnDelay: Math.floor(Math.random() * 60),
  };
}

function drawBubble(
  ctx: CanvasRenderingContext2D,
  b: Bubble,
) {
  if (b.opacity < 0.02) return;

  const isDirty = b.side === "dirty";
  const r = b.radius;
  const value = isDirty ? b.pollutant.dirty : b.pollutant.clean;
  const unit  = b.pollutant.unit;

  ctx.save();
  ctx.globalAlpha = b.opacity;
  ctx.translate(b.x, b.y);

  // ── circle background (radial, very light) ──────────────────────────
  const bg = ctx.createRadialGradient(0, -r * 0.15, 0, 0, 0, r);
  if (isDirty) {
    bg.addColorStop(0,   "rgba(210, 140, 48, 0.22)");
    bg.addColorStop(0.65,"rgba(175, 105, 28, 0.16)");
    bg.addColorStop(1,   "rgba(148,  82, 18, 0.09)");
  } else {
    bg.addColorStop(0,   "rgba(48, 192, 195, 0.22)");
    bg.addColorStop(0.65,"rgba(35, 162, 172, 0.16)");
    bg.addColorStop(1,   "rgba(28, 135, 145, 0.09)");
  }
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = bg;
  ctx.fill();

  // ── border ──────────────────────────────────────────────────────────
  ctx.strokeStyle = isDirty
    ? "rgba(205, 128, 42, 0.48)"
    : "rgba(44, 174, 185, 0.48)";
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // ── top highlight arc ────────────────────────────────────────────────
  ctx.beginPath();
  ctx.arc(0, 0, r - 0.8, Math.PI * 1.10, Math.PI * 1.78);
  ctx.strokeStyle = isDirty
    ? "rgba(255, 198, 98, 0.20)"
    : "rgba(138, 240, 250, 0.20)";
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // ── pollutant name (top, small) ──────────────────────────────────────
  ctx.font = "600 8.5px 'Plus Jakarta Sans', Inter, system-ui, sans-serif";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = isDirty
    ? "rgba(218, 148, 60, 0.88)"
    : "rgba(48, 188, 195, 0.88)";
  ctx.fillText(b.pollutant.name, 0, -r * 0.32);

  // ── value (bold, center) ─────────────────────────────────────────────
  const vSize = value.length > 3 ? 12 : 15;
  ctx.font = `800 ${vSize}px 'Plus Jakarta Sans', Inter, system-ui, sans-serif`;
  ctx.fillStyle = isDirty
    ? "rgba(252, 192, 82, 0.98)"
    : "rgba(68, 222, 152, 0.98)";
  ctx.fillText(value, 0, r * 0.08);

  // ── unit (tiny, bottom) ──────────────────────────────────────────────
  if (unit) {
    ctx.font = "500 7.5px 'Plus Jakarta Sans', Inter, system-ui, sans-serif";
    ctx.fillStyle = isDirty
      ? "rgba(212, 142, 55, 0.58)"
      : "rgba(48, 188, 195, 0.58)";
    ctx.fillText(unit, 0, r * 0.48);
  }

  ctx.restore();
}

export function PollutantBubbles({ anchor }: PollutantBubblesProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const frameRef   = useRef<number>(0);
  const anchorRef  = useRef<PurifierAnchor>(anchor ?? { x: 0.5, y: 0.8 });
  const prefersRM  = useReducedMotion();

  useEffect(() => {
    if (anchor) anchorRef.current = anchor;
  }, [anchor]);

  useEffect(() => {
    if (prefersRM) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1;

    const initPool = (width: number, height: number) => {
      const { x: ax, y: ay } = anchorRef.current;
      const ox = ax * width;
      const oy = ay * height;

      if (width < 768) { bubblesRef.current = []; return; }

      const pool: Bubble[] = [];
      for (const pol of POLLUTANTS) {
        for (let k = 0; k < COUNT_PER_POLLUTANT; k++) {
          pool.push(spawnDirtyBubble(pol, ox, oy, width, height, true));
        }
      }
      bubblesRef.current = pool;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio, 2);
      const rect = parent.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPool(W, H);
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      const { x: ax, y: ay } = anchorRef.current;
      const ox = ax * W;
      const oy = ay * H;

      for (let i = 0; i < bubblesRef.current.length; i++) {
        const b = bubblesRef.current[i]!;

        // ── stagger delay (same approach as ParticleField) ───────────
        if (b.spawnDelay > 0) {
          b.spawnDelay--;
          continue;
        }

        // ── position update (velocity-based, just like particles) ────
        b.x += b.vx;
        b.y += b.vy;

        // ── respawn logic ─────────────────────────────────────────────
        if (b.side === "dirty") {
          const dist = Math.hypot(b.x - ox, b.y - oy);
          // Absorbed by the purifier → emit as a clean bubble
          if (dist < 30 || b.x < ox - 15) {
            bubblesRef.current[i] = spawnCleanBubble(b.pollutant, ox, oy, W, H);
            continue;
          }
        } else {
          // Clean bubble: respawn dirty when it exits the left/top/bottom bounds
          if (
            b.x < -40 ||
            b.x > ox + 10 ||
            b.y < -40 ||
            b.y > H + 40
          ) {
            bubblesRef.current[i] = spawnDirtyBubble(b.pollutant, ox, oy, W, H, false);
            continue;
          }
        }

        drawBubble(ctx, b);
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [prefersRM]);

  if (prefersRM) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20"
    />
  );
}

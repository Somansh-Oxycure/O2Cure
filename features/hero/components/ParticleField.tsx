"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import type { PurifierAnchor } from "@/features/hero/components/HeroPurifier";

interface ParticleFieldProps {
  active?: boolean;
  anchor?: PurifierAnchor;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  type: "clean" | "polluted";
  mist: boolean;
  spawnDelay?: number;
}

/**
 * Clean side — soft blue-white/teal motes.
 * Boosted opacity/color for visibility on the off-white background.
 */
const CLEAN_COLORS = [
  "rgba(40, 160, 185, 0.88)",
  "rgba(55, 175, 200, 0.82)",
  "rgba(30, 140, 165, 0.85)",
  "rgba(70, 185, 210, 0.78)",
  "rgba(50, 165, 190, 0.82)",
];

/**
 * Polluted side — fine suspended dust motes.
 * Warm amber and grey-brown tones, adjusted for clean visibility on the gradient/white background.
 */
const POLLUTION_COLORS = [
  "rgba(180, 120, 50, 0.88)",
  "rgba(160, 105, 40, 0.84)",
  "rgba(195, 135, 60, 0.85)",
  "rgba(150, 100, 35, 0.82)",
  "rgba(130, 110, 80, 0.78)",  // grey-dust mote
  "rgba(165, 115, 50, 0.86)",
];

/**
 * Spawn a clean particle — drifts gently upward from the purifier zone.
 */
function spawnClean(
  originX: number,
  originY: number,
  width: number,
  height: number,
  stagger = false,
): Particle {
  const angle = Math.PI + (Math.random() - 0.5) * 0.9;
  const speed = 0.40 + Math.random() * 0.35; // slower, calmer
  const mist = Math.random() > 0.50;

  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed - 0.20; // gentle upward bias

  const spawnX = originX + (Math.random() - 0.5) * 28;
  const spawnY = originY + (Math.random() - 0.5) * 20;

  let x = spawnX;
  let y = spawnY;

  if (stagger) {
    const streamLength = originX + 50;
    const progress = Math.random();
    const invSpeed = speed > 0 ? 1 / speed : 1;
    x = spawnX + (vx * invSpeed) * progress * streamLength;
    y = spawnY + (vy * invSpeed) * progress * streamLength;
  }

  return {
    x,
    y,
    // Slightly larger to make them visible
    radius: mist ? 2.5 + Math.random() * 3.0 : 1.0 + Math.random() * 1.5,
    vx,
    vy,
    // Boosted opacity so they show up beautifully on off-white background
    opacity: mist ? 0.20 + Math.random() * 0.15 : 0.40 + Math.random() * 0.25,
    color: CLEAN_COLORS[Math.floor(Math.random() * CLEAN_COLORS.length)]!,
    type: "clean",
    mist,
    spawnDelay: stagger ? 0 : Math.floor(Math.random() * 80),
  };
}

/**
 * Spawn a polluted particle — fine dust mote drifting inward.
 * Slightly larger and brighter than previous iteration for balanced visibility.
 */
function spawnPolluted(
  originX: number,
  originY: number,
  width: number,
  height: number,
): Particle {
  const x = originX + 40 + Math.random() * (width - originX - 20);
  const y = originY * 0.25 + Math.random() * height * 0.75;
  const dx = originX - x;
  const dy = originY - y;
  const dist = Math.hypot(dx, dy) || 1;
  const speed = 0.16 + Math.random() * 0.36; // slow drift, not rushing
  const mist = Math.random() > 0.48;

  return {
    x,
    y,
    // Slightly larger particles
    radius: mist ? 2.8 + Math.random() * 3.5 : 1.2 + Math.random() * 2.0,
    vx: (dx / dist) * speed,
    vy: (dy / dist) * speed,
    // Higher opacity for visibility on off-white and gradient areas
    opacity: mist ? 0.22 + Math.random() * 0.18 : 0.45 + Math.random() * 0.20,
    color:
      POLLUTION_COLORS[Math.floor(Math.random() * POLLUTION_COLORS.length)]!,
    type: "polluted",
    mist,
  };
}

const defaultAnchor = (): PurifierAnchor => ({ x: 0.5, y: 0.8 });

/**
 * Dual subtle mist field:
 * — Left (clean): barely-visible blue-white motes drifting gently upward.
 * — Right (polluted): fine warm dust motes floating inward — PM2.5 in still air.
 */
export function ParticleField({ active = true, anchor }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const anchorRef = useRef<PurifierAnchor>(defaultAnchor());
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (anchor) anchorRef.current = anchor;
  }, [anchor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = (width: number, height: number) => {
      const { x: ax, y: ay } = anchorRef.current;
      const originX = ax * width;
      const originY = ay * height;
      const isMobile = width < 768;
      const cleanCount = isMobile ? 20 : 38;
      const pollutedCount = isMobile ? 32 : 60;

      particlesRef.current = [
        ...Array.from({ length: cleanCount }, () =>
          spawnClean(originX, originY, width, height, true),
        ),
        ...Array.from({ length: pollutedCount }, () =>
          spawnPolluted(originX, originY, width, height),
        ),
      ];
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      if (!active || prefersReducedMotion) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      const { x: ax, y: ay } = anchorRef.current;
      const originX = ax * width;
      const originY = ay * height;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i]!;

        if (particle.type === "clean" && particle.spawnDelay && particle.spawnDelay > 0) {
          particle.spawnDelay--;
          continue;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.type === "clean") {
          if (
            particle.x < -30 ||
            particle.x > originX + 20 ||
            particle.y < -30 ||
            particle.y > height + 30
          ) {
            particlesRef.current[i] = spawnClean(
              originX,
              originY,
              width,
              height,
              false,
            );
          }
        } else {
          const dist = Math.hypot(particle.x - originX, particle.y - originY);
          if (dist < 28 || particle.x < originX - 10) {
            particlesRef.current[i] = spawnPolluted(
              originX,
              originY,
              width,
              height,
            );
          }
        }

        ctx.save();
        // No shadow glow on either side — both backgrounds are light.
        // Shadow would create heavy blobs; fine dust motes have no glow.
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [active, prefersReducedMotion, anchor]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10"
    />
  );
}

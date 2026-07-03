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

const CLEAN_COLORS = [
  "rgba(75, 190, 165, 0.88)",
  "rgba(95, 205, 180, 0.78)",
  "rgba(60, 170, 150, 0.82)",
  "rgba(115, 215, 195, 0.72)",
  "rgba(70, 180, 155, 0.8)",
];

const POLLUTION_COLORS = [
  "rgba(210, 155, 90, 0.82)",
  "rgba(195, 130, 75, 0.74)",
  "rgba(225, 170, 105, 0.7)",
  "rgba(175, 120, 70, 0.68)",
  "rgba(200, 145, 85, 0.78)",
];

function spawnClean(
  originX: number,
  originY: number,
  width: number,
  height: number,
  stagger = false,
): Particle {
  const angle = Math.PI + (Math.random() - 0.5) * 1.1;
  const speed = 0.85 + Math.random() * 0.55;
  const mist = Math.random() > 0.55;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed - 0.08;
  const spawnX = originX + (Math.random() - 0.5) * 36;
  const spawnY = originY + (Math.random() - 0.5) * 28;

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
    radius: mist ? 2.5 + Math.random() * 5 : 0.8 + Math.random() * 2,
    vx,
    vy,
    opacity: mist ? 0.14 + Math.random() * 0.24 : 0.38 + Math.random() * 0.42,
    color: CLEAN_COLORS[Math.floor(Math.random() * CLEAN_COLORS.length)]!,
    type: "clean",
    mist,
    spawnDelay: stagger ? 0 : Math.floor(Math.random() * 100),
  };
}

function spawnPolluted(
  originX: number,
  originY: number,
  width: number,
  height: number,
): Particle {
  const x = originX + 40 + Math.random() * (width - originX - 20);
  const y = originY * 0.35 + Math.random() * height * 0.65;
  const dx = originX - x;
  const dy = originY - y;
  const dist = Math.hypot(dx, dy) || 1;
  const speed = 0.18 + Math.random() * 0.42;
  const mist = Math.random() > 0.5;

  return {
    x,
    y,
    radius: mist ? 3 + Math.random() * 6 : 1 + Math.random() * 2.5,
    vx: (dx / dist) * speed,
    vy: (dy / dist) * speed,
    opacity: mist ? 0.16 + Math.random() * 0.26 : 0.34 + Math.random() * 0.44,
    color:
      POLLUTION_COLORS[Math.floor(Math.random() * POLLUTION_COLORS.length)]!,
    type: "polluted",
    mist,
  };
}

const defaultAnchor = (): PurifierAnchor => ({ x: 0.5, y: 0.8 });

/**
 * Dual mist field — clean blue-green flows out left; polluted gold-brown flows in.
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
      const cleanCount = isMobile ? 28 : 52;
      const pollutedCount = isMobile ? 38 : 68;

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
        if (particle.mist) {
          ctx.shadowBlur = particle.type === "clean" ? 14 : 18;
          ctx.shadowColor = particle.color;
        }

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

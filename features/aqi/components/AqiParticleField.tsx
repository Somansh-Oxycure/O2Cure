"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import {
  PHASE_RANK,
  phaseProgress,
  PURIFICATION_TIMELINE,
} from "@/features/aqi/animation/purificationSequence";
import type { PurificationTimeline } from "@/features/aqi/types";
import {
  spawnAmbientPolluted,
  spawnCleanFromCentre,
  spawnIdleClean,
  type SharedParticle,
} from "@/lib/particles/heroLanguage";

interface AqiParticleFieldProps {
  timelineRef: React.RefObject<PurificationTimeline>;
  centerRef: React.RefObject<HTMLElement | null>;
}

const DISSOLVE_RADIUS = 64;

export function AqiParticleField({
  timelineRef,
  centerRef,
}: AqiParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SharedParticle[]>([]);
  const frameRef = useRef(0);
  const activatedRef = useRef(false);
  const cleanBurstRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initPolluted = (width: number, height: number) => {
      const count = width < 768 ? 48 : 76;
      particlesRef.current = Array.from({ length: count }, () =>
        spawnAmbientPolluted(width, height),
      );
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

      if (!activatedRef.current) {
        initPolluted(width, height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const getCenter = (width: number, height: number) => {
      const parent = canvas.parentElement;
      const el = centerRef.current;
      if (parent && el) {
        const pr = parent.getBoundingClientRect();
        const cr = el.getBoundingClientRect();
        return {
          x: cr.left + cr.width / 2 - pr.left,
          y: cr.top + cr.height / 2 - pr.top,
        };
      }
      return { x: width / 2, y: height * 0.55 };
    };

    const applyGravity = (
      p: SharedParticle,
      strength: number,
      cx: number,
      cy: number,
    ) => {
      const dx = cx - p.x;
      const dy = cy - p.y;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;
      const tx = -ny * p.swirl;
      const ty = nx * p.swirl;
      const proximity = Math.max(0, 1 - dist / 380);
      const pull = strength * (0.25 + proximity ** 1.2 * 0.75);

      p.vx += nx * pull + tx * pull * 0.5;
      p.vy += ny * pull + ty * pull * 0.5;
      p.vx *= 0.976;
      p.vy *= 0.976;
      p.x += p.vx;
      p.y += p.vy;
    };

    const dissolveParticle = (p: SharedParticle, dist: number) => {
      const closeness = 1 - dist / DISSOLVE_RADIUS;
      p.dissolving = Math.min(1, p.dissolving + 0.022 + closeness * 0.02);
      p.opacity *= 0.968;
      p.radius *= 0.988;
      return p.dissolving >= 1 || p.opacity < 0.012;
    };

    let frameCount = 0;

    const draw = () => {
      frameCount++;
      const { width, height } = canvas.getBoundingClientRect();
      const { x: centerX, y: centerY } = getCenter(width, height);
      ctx.clearRect(0, 0, width, height);

      const { elapsed, phase } = timelineRef.current ?? {
        elapsed: 0,
        phase: "idle" as const,
        valueProgress: 0,
      };

      if (phase === "idle") {
        activatedRef.current = false;
        cleanBurstRef.current = false;
      }

      const isActivated = phase !== "idle" && phase !== "complete";
      if (isActivated) activatedRef.current = true;

      const rank = PHASE_RANK[phase];
      const attractT = phaseProgress(
        elapsed,
        PURIFICATION_TIMELINE.attraction,
        PURIFICATION_TIMELINE.dissolve,
      );
      const attractStrength = 0.02 + attractT ** 1.8 * 0.22;

      const isPulling = rank >= PHASE_RANK.button && rank < PHASE_RANK.cleanEmerge;
      const isCleanPhase = rank >= PHASE_RANK.cleanEmerge;
      const isIdle = phase === "idle";
      const isComplete = phase === "complete";

      let pollutedRemaining = 0;

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]!;

        if (p.type === "polluted") {
          if (isCleanPhase) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          if (isPulling) {
            const strength =
              rank === PHASE_RANK.button
                ? 0.045
                : attractStrength;
            applyGravity(p, strength, centerX, centerY);
            const dist = Math.hypot(p.x - centerX, p.y - centerY);

            if (dist < DISSOLVE_RADIUS) {
              if (dissolveParticle(p, dist)) {
                particlesRef.current.splice(i, 1);
                continue;
              }
            }
          } else if (isIdle) {
            const t = frameCount * 0.012 + p.noise;
            p.x +=
              p.vx +
              Math.sin(t * 1.1) * 0.05 +
              Math.cos(t * 0.7) * 0.035;
            p.y +=
              p.vy +
              Math.cos(t * 0.9) * 0.04 +
              Math.sin(t * 0.6) * 0.025;
            if (p.x < -28) p.x = width + 28;
            if (p.x > width + 28) p.x = -28;
            if (p.y < -28) p.y = height + 28;
            if (p.y > height + 28) p.y = -28;
          }
        } else {
          if (p.spawnDelay && p.spawnDelay > 0) {
            p.spawnDelay--;
            continue;
          }

          const t = frameCount * 0.01 + p.noise;
          p.x += p.vx + Math.sin(t) * 0.025;
          p.y += p.vy + Math.cos(t * 0.8) * 0.02;

          if (isComplete) {
            p.vx *= 0.999;
            p.vy *= 0.999;
          }

          const outOfBounds =
            p.x < -48 ||
            p.x > width + 48 ||
            p.y < -48 ||
            p.y > height + 48;

          if (outOfBounds) {
            particlesRef.current[i] = isComplete
              ? spawnIdleClean(centerX, centerY, width, height)
              : spawnCleanFromCentre(centerX, centerY);
          }
        }

        ctx.save();
        if (p.mist) {
          ctx.shadowBlur = p.type === "clean" ? 14 : 18;
          ctx.shadowColor = p.color;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (1 - p.dissolving * 0.92);
        ctx.fill();
        ctx.restore();
      }

      pollutedRemaining = particlesRef.current.filter(
        (p) => p.type === "polluted",
      ).length;

      const shouldBurstClean =
        (isPulling && pollutedRemaining === 0 && activatedRef.current) ||
        (rank >= PHASE_RANK.cleanEmerge && !cleanBurstRef.current);

      if (shouldBurstClean && !cleanBurstRef.current) {
        cleanBurstRef.current = true;
        const burst = width < 768 ? 14 : 22;
        for (let s = 0; s < burst; s++) {
          particlesRef.current.push(spawnCleanFromCentre(centerX, centerY));
        }
      }

      if (cleanBurstRef.current || isCleanPhase) {
        const cleanTarget = width < 768 ? 28 : 46;
        const cleanCount = particlesRef.current.filter(
          (p) => p.type === "clean",
        ).length;

        if (cleanCount < cleanTarget) {
          particlesRef.current.push(spawnCleanFromCentre(centerX, centerY));
        }
      }

      if (
        isComplete &&
        particlesRef.current.every((p) => p.type === "polluted")
      ) {
        const n = width < 768 ? 28 : 46;
        particlesRef.current = Array.from({ length: n }, () =>
          spawnIdleClean(centerX, centerY, width, height),
        );
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
  }, [prefersReducedMotion, timelineRef, centerRef]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1]"
    />
  );
}

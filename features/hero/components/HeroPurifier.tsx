"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import { heroTimeline, msToSeconds } from "@/features/hero/animation/heroTimeline";
import { heroContent } from "@/features/hero/content";

export interface PurifierAnchor {
  x: number;
  y: number;
}

interface HeroPurifierProps {
  onAnchorChange?: (anchor: PurifierAnchor) => void;
}

/**
 * Center-bottom purifier — the literal bridge between clean and polluted worlds.
 *
 * Lighting layers (back to front):
 *  1. Wide amber separation corona   — right side, dark world meets device
 *  2. Primary green volumetric halo  — behind device, emits purified air
 *  3. Floor light pool               — green light pooling at device base
 *  4. Purifier image                 — with strong structural drop shadow
 */
export function HeroPurifier({ onAnchorChange }: HeroPurifierProps) {
  const prefersReducedMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);

  const reportAnchor = useCallback(() => {
    const node = imageRef.current;
    const section = node?.closest("section");
    if (!node || !section || !onAnchorChange) return;

    const nodeRect = node.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();

    onAnchorChange({
      x: (nodeRect.left + nodeRect.width / 2 - sectionRect.left) / sectionRect.width,
      y: (nodeRect.top + nodeRect.height * 0.2 - sectionRect.top) / sectionRect.height,
    });
  }, [onAnchorChange]);

  useEffect(() => {
    reportAnchor();
    window.addEventListener("resize", reportAnchor);
    return () => window.removeEventListener("resize", reportAnchor);
  }, [reportAnchor]);

  return (
    <motion.div
      className="pointer-events-none absolute bottom-0 left-1/2 z-[25] -translate-x-1/2"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: prefersReducedMotion ? 0 : msToSeconds(heroTimeline.purifier),
        duration: prefersReducedMotion ? durations.fast : durations.slow,
        ease: easings.premium,
      }}
      onAnimationComplete={reportAnchor}
    >
      <div ref={imageRef} className="relative">

        {/* ── Layer 1: Ambient amber warmth (very faint on light bg) ───────────
            Hints at the warm polluted world to the right — barely-there.  */}
        <div
          aria-hidden
          className="absolute -right-12 top-1/4 h-48 w-48 -translate-y-1/4 rounded-full sm:h-56 sm:w-56"
          style={{
            background:
              "radial-gradient(circle, rgba(200, 130, 50, 0.05) 0%, rgba(180, 110, 40, 0.02) 50%, transparent 72%)",
            filter: "blur(28px)",
          }}
        />

        {/* ── Layer 2: Primary green volumetric halo ──────────────────────
            The device glows with purified-air energy — subtle on light bg. */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[6%] h-24 w-24 -translate-x-1/2 rounded-full sm:h-32 sm:w-32"
          style={{
            background:
              "radial-gradient(circle, rgba(58, 125, 42, 0.22) 0%, rgba(58, 125, 42, 0.08) 50%, transparent 72%)",
            filter: "blur(24px)",
          }}
        />

        {/* ── Layer 3: Floor light pool ────────────────────────────────────
            Wide, flat ellipse at device base — simulates light pooling on
            the ground beneath the purifier, adding physical depth.        */}
        <div
          aria-hidden
          className="absolute bottom-1 left-1/2 h-6 w-48 -translate-x-1/2 sm:w-60"
          style={{
            background:
              "radial-gradient(ellipse, rgba(58, 125, 42, 0.28) 0%, rgba(58, 125, 42, 0.10) 50%, transparent 80%)",
            filter: "blur(14px)",
          }}
        />

        {/* ── Purifier image ───────────────────────────────────────────────
            Strong structural drop-shadow gives depth against both the
            white and dark backgrounds simultaneously.                      */}
        <Image
          src={heroContent.product.src}
          alt={heroContent.product.alt}
          width={heroContent.product.width}
          height={heroContent.product.height}
          priority
          className="relative h-[clamp(200px,38vh,480px)] w-auto max-w-[min(72vw,320px)] object-contain sm:max-w-[min(42vw,360px)] md:h-[clamp(260px,44vh,520px)] md:max-w-none"
          style={{
            filter:
              "drop-shadow(0 32px 64px rgba(0,0,0,0.28)) drop-shadow(0 8px 16px rgba(0,0,0,0.18))",
          }}
        />
      </div>
    </motion.div>
  );
}

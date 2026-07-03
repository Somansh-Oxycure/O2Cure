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
 * Center-bottom purifier — the anchor for clean and polluted particle mist.
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
        <div
          aria-hidden
          className="absolute left-1/2 top-[8%] h-16 w-16 -translate-x-1/2 rounded-full bg-brand-green/20 blur-2xl sm:h-20 sm:w-20"
        />
        <Image
          src={heroContent.product.src}
          alt={heroContent.product.alt}
          width={heroContent.product.width}
          height={heroContent.product.height}
          priority
          className="relative h-[clamp(200px,38vh,480px)] w-auto max-w-[min(72vw,320px)] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.12)] sm:max-w-[min(42vw,360px)] md:h-[clamp(260px,44vh,520px)] md:max-w-none"
        />
      </div>
    </motion.div>
  );
}

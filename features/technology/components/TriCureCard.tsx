"use client";

import { motion } from "framer-motion";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import { cn } from "@/lib/utils";

import type { TriCureLayer } from "@/features/technology/types";

interface TriCureCardProps {
  layer: TriCureLayer;
  index: number;
  isActive: boolean;
  reducedMotion: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

/**
 * A single premium glass card for one pollutant category. Reveals in
 * sequence (delay driven by `index`) and gently lifts + glows on hover,
 * reporting its active state upward so the connector can highlight the
 * matching path to the TriCure™ badge.
 */
export function TriCureCard({
  layer,
  index,
  isActive,
  reducedMotion,
  onActivate,
  onDeactivate,
}: TriCureCardProps) {
  const { Icon } = layer;

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: reducedMotion ? durations.fast : durations.slow,
        ease: easings.premium,
        delay: reducedMotion ? 0 : 0.18 + index * 0.16,
      }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      onHoverStart={onActivate}
      onHoverEnd={onDeactivate}
      onFocusCapture={onActivate}
      onBlurCapture={onDeactivate}
      tabIndex={0}
      aria-label={`${layer.title}: ${layer.description}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border p-8 outline-none sm:p-9",
        "bg-gradient-to-b from-background/90 to-secondary/40 backdrop-blur-sm",
        "transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isActive
          ? "border-brand-blue/40 shadow-elevated"
          : "border-border/60 shadow-soft",
      )}
    >
      {/* Soft brand wash that fades in on hover/focus */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
          isActive && "opacity-100",
        )}
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, oklch(0.55 0.12 248 / 0.08) 0%, rgba(120, 210, 185, 0.05) 45%, transparent 75%)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <span
          aria-hidden
          className={cn(
            "font-heading text-6xl leading-none tabular-nums transition-colors duration-500",
            isActive ? "text-brand-blue/30" : "text-foreground/10",
          )}
        >
          {layer.number}
        </span>

        <span
          aria-hidden
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl border transition-colors duration-500",
            isActive
              ? "border-brand-blue/30 bg-brand-blue/10 text-brand-blue"
              : "border-border/60 bg-secondary/50 text-muted-foreground",
          )}
        >
          <Icon className="size-6" />
        </span>
      </div>

      <h3 className="relative mt-8 font-heading text-h3 text-foreground">
        {layer.title}
      </h3>
      <p className="relative mt-2 max-w-[22rem] text-body-lg text-muted-foreground">
        {layer.description}
      </p>
    </motion.div>
  );
}

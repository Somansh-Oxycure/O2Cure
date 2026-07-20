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

/** Resolve the accent palette for each layer's color key. */
function useAccentPalette(accentColor: TriCureLayer["accentColor"]) {
  switch (accentColor) {
    case "teal":
      return {
        border: "rgba(120,210,185,0.35)",
        borderIdle: "rgba(120,210,185,0.12)",
        glow: "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(120,210,185,0.11) 0%, rgba(120,210,185,0.04) 50%, transparent 80%)",
        iconBg: "rgba(120,210,185,0.1)",
        iconBorder: "rgba(120,210,185,0.25)",
        iconColor: "rgb(90,190,165)",
        badgeBg: "rgba(120,210,185,0.08)",
        badgeBorder: "rgba(120,210,185,0.18)",
        badgeText: "rgb(70,170,145)",
        numColor: "rgba(120,210,185,0.22)",
      };
    case "green":
      return {
        border: "rgba(58,125,42,0.35)",
        borderIdle: "rgba(58,125,42,0.12)",
        glow: "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(58,125,42,0.1) 0%, rgba(58,125,42,0.04) 50%, transparent 80%)",
        iconBg: "rgba(58,125,42,0.08)",
        iconBorder: "rgba(58,125,42,0.22)",
        iconColor: "rgb(58,125,42)",
        badgeBg: "rgba(58,125,42,0.07)",
        badgeBorder: "rgba(58,125,42,0.18)",
        badgeText: "rgb(46,100,34)",
        numColor: "rgba(58,125,42,0.18)",
      };
    default: // blue
      return {
        border: "oklch(0.55 0.12 248 / 0.35)",
        borderIdle: "oklch(0.55 0.12 248 / 0.12)",
        glow: "radial-gradient(ellipse 90% 65% at 50% 0%, oklch(0.55 0.12 248 / 0.09) 0%, oklch(0.55 0.12 248 / 0.03) 50%, transparent 80%)",
        iconBg: "oklch(0.55 0.12 248 / 0.08)",
        iconBorder: "oklch(0.55 0.12 248 / 0.22)",
        iconColor: "oklch(0.55 0.12 248)",
        badgeBg: "oklch(0.55 0.12 248 / 0.07)",
        badgeBorder: "oklch(0.55 0.12 248 / 0.18)",
        badgeText: "oklch(0.48 0.12 248)",
        numColor: "oklch(0.55 0.12 248 / 0.18)",
      };
  }
}

/**
 * Ultra-premium glass card for one TriCure™ protection layer.
 * Surfaces B2B metadata badges styled as aerospace telemetry tags.
 * Hover interactions execute at exactly 600ms on cubic-bezier(0.16,1,0.3,1).
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
  const p = useAccentPalette(layer.accentColor);

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: reducedMotion ? durations.fast : durations.slow,
        ease: easings.premium,
        delay: reducedMotion ? 0 : 0.14 + index * 0.18,
      }}
      whileHover={reducedMotion ? undefined : { y: -8, scale: 1.012 }}
      onHoverStart={onActivate}
      onHoverEnd={onDeactivate}
      onFocusCapture={onActivate}
      onBlurCapture={onDeactivate}
      tabIndex={0}
      aria-label={`${layer.title}: ${layer.description}`}
      style={{
        // 600ms hardware-stabilized easing on all transitions
        transition: "border-color 600ms cubic-bezier(0.16,1,0.3,1), box-shadow 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)",
        borderColor: isActive ? p.border : p.borderIdle,
        boxShadow: isActive
          ? `0 0 0 1px ${p.border}, 0 24px 64px -24px ${p.border}, 0 8px 24px -8px ${p.border}`
          : "0 1px 2px rgba(0,0,0,0.04), 0 12px 32px -12px rgba(0,0,0,0.08)",
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border p-8 outline-none sm:p-9",
        "bg-gradient-to-b from-white/[0.06] via-background/80 to-secondary/20 backdrop-blur-md",
      )}
    >
      {/* Inner glass edge shine */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 55%)",
        }}
      />

      {/* Radial accent wash — fades in on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background: p.glow,
          opacity: isActive ? 1 : 0,
          transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Top row: sequence number + icon */}
      <div className="relative flex items-start justify-between">
        <span
          aria-hidden
          className="font-heading text-[4.5rem] font-bold leading-none tabular-nums"
          style={{
            color: isActive ? p.numColor : "rgba(28,28,28,0.07)",
            transition: "color 600ms cubic-bezier(0.16,1,0.3,1)",
            letterSpacing: "-0.04em",
          }}
        >
          {layer.number}
        </span>

        <span
          aria-hidden
          className="flex size-12 shrink-0 items-center justify-center rounded-2xl border"
          style={{
            background: isActive ? p.iconBg : "rgba(0,0,0,0.03)",
            borderColor: isActive ? p.iconBorder : "rgba(0,0,0,0.08)",
            color: isActive ? p.iconColor : "rgba(28,28,28,0.35)",
            transition: "all 600ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Icon className="size-6" />
        </span>
      </div>

      {/* Title & sub-description */}
      <h3
        className="relative mt-6 font-heading text-h3 text-foreground"
        style={{ fontFamily: "var(--font-plus-jakarta)", fontWeight: 600, letterSpacing: "-0.02em" }}
      >
        {layer.title}
      </h3>
      <p
        className="relative mt-1 text-sm text-muted-foreground"
        style={{ fontFamily: "var(--font-plus-jakarta)", fontWeight: 400 }}
      >
        {layer.description}
      </p>

      {/* B2B Technical Metadata Badges — Aerospace Telemetry Style */}
      <div className="relative mt-6 flex flex-wrap gap-1.5">
        {layer.badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center rounded-md px-2 py-0.5"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontWeight: 600,
              fontSize: "9pt",
              letterSpacing: "0.05em",
              background: isActive ? p.badgeBg : "rgba(0,0,0,0.04)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: isActive ? p.badgeBorder : "rgba(0,0,0,0.08)",
              color: isActive ? p.badgeText : "rgba(28,28,28,0.45)",
              transition: "all 600ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Spec line — ISO / ASHRAE / ASTM references */}
      <p
        className="relative mt-4 text-[10px] tracking-wide"
        style={{
          fontFamily: "var(--font-plus-jakarta)",
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: isActive ? "rgba(28,28,28,0.5)" : "rgba(28,28,28,0.25)",
          transition: "color 600ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {layer.spec}
      </p>

      {/* Bottom accent line — grows on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-6 right-6 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${p.border}, transparent)`,
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scaleX(1)" : "scaleX(0.3)",
          transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)",
          transformOrigin: "center",
        }}
      />
    </motion.div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { easings } from "@/components/motion/easings";
import type { TriCureLayer } from "@/features/technology/types";
import { LayerVisual } from "./LayerVisual";
import { getAccentPalette } from "./palette";

interface ThreatPanelProps {
  layer: TriCureLayer;
  reducedMotion: boolean;
}

// ─── Animated stat counter ───────────────────────────────────────────────────

function useCountUp(target: string, animate: boolean, trigger: string) {
  const [display, setDisplay] = useState(animate ? "0" : target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animate) {
      setDisplay(target);
      return;
    }
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) {
      setDisplay(target);
      return;
    }

    const duration = 900; // ms
    const start = performance.now();
    setDisplay("0");

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;

      // Match decimal places of target
      const decimals = (target.split(".")[1] ?? "").length;
      setDisplay(current.toFixed(decimals));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]); // Re-run only when the layer changes (trigger = layer id)

  return display;
}

// ─── Main panel ─────────────────────────────────────────────────────────────

export function ThreatPanel({ layer, reducedMotion }: ThreatPanelProps) {
  const p = getAccentPalette(layer.accentColor);
  const { Icon } = layer;
  const statDisplay = useCountUp(
    layer.stat.value,
    layer.stat.animate && !reducedMotion,
    layer.id,
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={layer.id}
        initial={{ opacity: 0, x: reducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: reducedMotion ? 0 : -16 }}
        transition={{ duration: 0.22, ease: easings.premium }}
        className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto]"
      >
        {/* ── Left: content ── */}
        <div className="flex flex-col justify-center gap-0">
          {/* Icon + title row */}
          <div className="flex items-center gap-4">
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-2xl border"
              style={{
                background: p.iconBg,
                borderColor: p.iconBorder,
                color: p.iconColor,
              }}
            >
              <Icon className="size-5" />
            </span>

            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Layer {layer.number}
              </p>
              <h3
                className="text-xl font-semibold leading-tight text-foreground"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  letterSpacing: "-0.02em",
                }}
              >
                {layer.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p
            className="mt-4 text-sm text-muted-foreground"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {layer.description}
          </p>

          {/* ── Hero stat counter ── */}
          <div
            className="mt-5 flex items-baseline gap-2"
            aria-label={`${layer.stat.value} ${layer.stat.label}`}
          >
            <span
              className="font-heading tabular-nums leading-none"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontWeight: 700,
                fontSize: "clamp(2.8rem, 6vw, 3.8rem)",
                letterSpacing: "-0.04em",
                color: p.iconColor,
              }}
            >
              {statDisplay}
            </span>
            <span
              className="max-w-[10rem] text-xs leading-tight text-muted-foreground"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {layer.stat.label}
            </span>
          </div>

          {/* Separator */}
          <div
            className="mt-5 h-px w-full"
            style={{
              background: `linear-gradient(to right, ${p.border}, transparent)`,
            }}
          />

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {layer.badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.08 + i * 0.06, duration: 0.2 }}
                className="inline-flex items-center rounded-md px-2 py-0.5 text-[9pt] font-semibold uppercase"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  letterSpacing: "0.05em",
                  background: p.badgeBg,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: p.badgeBorder,
                  color: p.badgeText,
                }}
              >
                {badge}
              </motion.span>
            ))}
          </div>

          {/* Spec line */}
          <p
            className="mt-3 text-[10px] tracking-wide text-muted-foreground/60"
            style={{ fontFamily: "var(--font-plus-jakarta)", letterSpacing: "0.04em" }}
          >
            {layer.spec}
          </p>
        </div>

        {/* ── Right: animated visual ── */}
        <div
          className="hidden h-[220px] w-[180px] shrink-0 overflow-hidden rounded-2xl border md:block"
          style={{
            borderColor: p.borderIdle,
            background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 70%)`,
          }}
        >
          <LayerVisual layer={layer} reducedMotion={reducedMotion} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

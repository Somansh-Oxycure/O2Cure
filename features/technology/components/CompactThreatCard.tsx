"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { TriCureLayer } from "@/features/technology/types";
import { getAccentPalette } from "./palette";

interface CompactCardProps {
  layer: TriCureLayer;
  index: number;
  reducedMotion: boolean;
}

// ─── Per-card scroll-triggered stat counter ──────────────────────────────────

function useScrollCountUp(
  target: string,
  animate: boolean,
  inView: boolean,
  reducedMotion: boolean,
) {
  const [display, setDisplay] = useState("0");
  const hasRun = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    if (!animate || reducedMotion) {
      setDisplay(target);
      hasRun.current = true;
      return;
    }
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) { setDisplay(target); hasRun.current = true; return; }

    hasRun.current = true;
    const duration = 1100;
    const start = performance.now();
    const decimals = (target.split(".")[1] ?? "").length;

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay((numeric * eased).toFixed(decimals));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, animate, target, reducedMotion]);

  return animate ? display : target;
}

// ─── Single compact card ─────────────────────────────────────────────────────

export function CompactThreatCard({ layer, index, reducedMotion }: CompactCardProps) {
  const p = getAccentPalette(layer.accentColor);
  const { Icon } = layer;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [hovered, setHovered] = useState(false);

  const statDisplay = useScrollCountUp(
    layer.stat.value,
    layer.stat.animate,
    inView,
    reducedMotion,
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        delay: reducedMotion ? 0 : index * 0.12,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderColor: hovered ? p.border : p.borderIdle,
        boxShadow: hovered
          ? `0 0 0 1px ${p.border}, 0 16px 48px -16px ${p.rawMid.replace("0.55)", "0.18)")}`
          : "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.07)",
        transition:
          "border-color 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms cubic-bezier(0.16,1,0.3,1)",
      }}
      className="relative flex flex-col overflow-hidden rounded-2xl border bg-white/70 p-5 backdrop-blur-sm sm:p-6"
    >
      {/* Accent glow wash — slides in on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: p.glow,
          opacity: hovered ? 1 : 0,
          transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {/* Glass edge shine */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 55%)",
        }}
      />

      {/* ── Top row: number + icon ── */}
      <div className="relative flex items-center justify-between">
        <span
          className="font-heading tabular-nums leading-none"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontWeight: 700,
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            color: p.iconColor,
            opacity: 0.7,
          }}
        >
          {layer.number}
        </span>
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-xl border"
          style={{
            background: hovered ? p.iconBg : "rgba(0,0,0,0.03)",
            borderColor: hovered ? p.iconBorder : "rgba(0,0,0,0.08)",
            color: hovered ? p.iconColor : "rgba(28,28,28,0.35)",
            transition: "all 500ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Icon className="size-4" />
        </span>
      </div>

      {/* ── Title + description ── */}
      <h3
        className="relative mt-3 text-base font-semibold leading-tight text-foreground"
        style={{ fontFamily: "var(--font-plus-jakarta)", letterSpacing: "-0.02em" }}
      >
        {layer.title}
      </h3>
      <p
        className="relative mt-1 text-xs text-muted-foreground"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {layer.description}
      </p>

      {/* ── Stat counter ── */}
      <div className="relative mt-4 flex items-end gap-2">
        <span
          className="tabular-nums leading-none tracking-tighter"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontWeight: 700,
            fontSize: "2.5rem",
            color: p.iconColor,
          }}
        >
          {statDisplay}
        </span>
        <span
          className="pb-1 text-xs leading-tight text-muted-foreground"
          style={{ fontFamily: "var(--font-plus-jakarta)", maxWidth: "140px" }}
        >
          {layer.stat.label}
        </span>
      </div>

      <motion.div
        initial={false}
        animate={{ 
          height: hovered ? "auto" : 0, 
          opacity: hovered ? 1 : 0, 
          marginTop: hovered ? 16 : 0 
        }}
        className="overflow-hidden"
      >
        <p
          className="text-sm text-muted-foreground leading-relaxed"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          {layer.detail}
        </p>
      </motion.div>

      {/* Bottom accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-5 right-5 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${p.border}, transparent)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
          transition:
            "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)",
          transformOrigin: "center",
        }}
      />
    </motion.div>
  );
}

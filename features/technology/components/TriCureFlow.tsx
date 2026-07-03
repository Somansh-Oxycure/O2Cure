"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { easings } from "@/components/motion/easings";
import { cn } from "@/lib/utils";

interface TriCureFlowProps {
  /** Index of the currently hovered/focused card, or null. */
  activeIndex: number | null;
  count: number;
  badge: string;
  outcome: string;
  reducedMotion: boolean;
}

const BLUE = "oklch(0.55 0.12 248 / 0.9)";
const GREEN = "rgba(120, 210, 185, 0.85)";

/** Small pulse that drops down a vertical stem toward the rail. */
function StemPulse({ delay }: { delay: number }) {
  return (
    <motion.span
      aria-hidden
      className="absolute left-1/2 top-0 h-4 w-[3px] -translate-x-1/2 rounded-full blur-[0.5px]"
      style={{ background: `linear-gradient(to bottom, transparent, ${BLUE}, transparent)` }}
      initial={{ y: "-120%", opacity: 0 }}
      animate={{ y: ["-120%", "320%"], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2.6,
        times: [0, 0.15, 0.8, 1],
        repeat: Infinity,
        ease: easings.idle,
        delay,
      }}
    />
  );
}

/** Pulse that travels along the horizontal rail toward the centre badge. */
function RailPulse({ from, delay }: { from: "left" | "right"; delay: number }) {
  const isLeft = from === "left";
  return (
    <motion.span
      aria-hidden
      className="absolute top-1/2 h-[3px] w-10 -translate-y-1/2 rounded-full blur-[0.5px]"
      style={{ background: `linear-gradient(to right, transparent, ${GREEN}, transparent)` }}
      initial={{ left: isLeft ? "0%" : "100%", opacity: 0 }}
      animate={{
        left: isLeft ? ["0%", "50%"] : ["100%", "50%"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2.8,
        times: [0, 0.2, 0.75, 1],
        repeat: Infinity,
        ease: easings.idle,
        delay,
      }}
    />
  );
}

/**
 * Circuit-style connector: three vertical stems (one per card) drop into a
 * horizontal rail that funnels into the central TriCure™ badge, which then
 * flows down into the "Cleaner Indoor Air" outcome. Pulses travel calmly and
 * continuously toward the badge; the stem matching the hovered card brightens.
 */
export function TriCureFlow({
  activeIndex,
  count,
  badge,
  outcome,
  reducedMotion,
}: TriCureFlowProps) {
  const stems = Array.from({ length: count });

  return (
    <Reveal
      className="mx-auto mt-4 w-full max-w-6xl px-2 sm:mt-6"
      delay={0.2}
      distance={20}
      amount={0.3}
    >
      {/* Vertical stems — aligned with the card columns on desktop */}
      <div className="grid grid-cols-3 gap-6 md:gap-7 lg:gap-8">
        {stems.map((_, i) => {
          const active = activeIndex === i;
          return (
            <div key={i} className="flex justify-center">
              <div
                className={cn(
                  "relative h-12 w-px overflow-hidden transition-colors duration-500",
                  active ? "bg-brand-blue/50" : "bg-border",
                )}
              >
                {!reducedMotion && <StemPulse delay={i * 0.5} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Horizontal rail funnelling toward the centre */}
      <div className="relative h-px w-full overflow-hidden bg-gradient-to-r from-transparent via-border to-transparent">
        {!reducedMotion && (
          <>
            <RailPulse from="left" delay={0.2} />
            <RailPulse from="right" delay={1.6} />
          </>
        )}
      </div>

      {/* Convergence into the badge, then out to the outcome */}
      <div className="flex flex-col items-center">
        <div className="relative h-6 w-px overflow-hidden bg-gradient-to-b from-border to-brand-blue/40">
          {!reducedMotion && <StemPulse delay={1.1} />}
        </div>

        <motion.div
          className="relative inline-flex items-center gap-2.5 rounded-full border border-brand-blue/25 bg-background/85 px-6 py-3 shadow-soft backdrop-blur-sm"
          animate={reducedMotion ? undefined : { opacity: [0.94, 1, 0.94] }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: easings.idle }
          }
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full"
            style={{ boxShadow: "0 0 40px -6px oklch(0.55 0.12 248 / 0.35)" }}
          />
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="size-5 text-brand-blue"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
          >
            <path d="M5 6l7 6-7 6M19 6l-7 6 7 6" opacity={0.85} />
            <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
          </svg>
          <span className="font-heading text-base font-medium tracking-tight text-foreground sm:text-lg">
            {badge}
          </span>
        </motion.div>

        <div className="relative h-6 w-px overflow-hidden bg-gradient-to-b from-brand-blue/40 to-brand-green/40">
          {!reducedMotion && <StemPulse delay={2} />}
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/5 px-5 py-2.5 text-eyebrow uppercase tracking-[0.14em] text-brand-green">
          <span aria-hidden className="size-1.5 rounded-full bg-brand-green" />
          {outcome}
        </span>
      </div>
    </Reveal>
  );
}

"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { easings } from "@/components/motion/easings";

interface TriCureFlowProps {
  /** Index of the currently hovered/focused card, or null. */
  activeIndex: number | null;
  count: number;
  badge: string;
  outcome: string;
  reducedMotion: boolean;
}

// ─── Color constants ────────────────────────────────────────────────────────
const BLUE = "oklch(0.55 0.12 248)";
const TEAL = "rgba(120,210,185,1)";
const GREEN = "rgba(58,125,42,1)";
const ACCENT_COLORS = [BLUE, TEAL, GREEN] as const;

/**
 * Stem pulse that cascades downward from a card into the rail.
 * Each pulse uses the card's accent color.
 */
function StemPulse({
  delay,
  color,
}: {
  delay: number;
  color: string;
}) {
  return (
    <motion.span
      aria-hidden
      className="absolute left-1/2 top-0 h-5 w-[2px] -translate-x-1/2 rounded-full"
      style={{
        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        filter: "blur(0.5px)",
      }}
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: ["-100%", "400%"], opacity: [0, 0.9, 0.9, 0] }}
      transition={{
        duration: 2.4,
        times: [0, 0.12, 0.78, 1],
        repeat: Infinity,
        ease: easings.idle,
        delay,
      }}
    />
  );
}

/**
 * Horizontal rail pulse flowing from one edge toward the center badge.
 * The flowing gradient is the "energy transfer" that visually links
 * the three threat categories into the central neutralization badge.
 */
function RailPulse({
  from,
  delay,
  color,
}: {
  from: "left" | "right";
  delay: number;
  color: string;
}) {
  const isLeft = from === "left";
  const gradient = isLeft
    ? `linear-gradient(to right, transparent, ${color}, transparent)`
    : `linear-gradient(to left, transparent, ${color}, transparent)`;

  return (
    <motion.span
      aria-hidden
      className="absolute top-1/2 h-[2px] w-16 -translate-y-1/2 rounded-full"
      style={{
        background: gradient,
        filter: "blur(0.5px)",
        boxShadow: `0 0 8px 1px ${color}`,
      }}
      initial={{ left: isLeft ? "0%" : "100%", opacity: 0 }}
      animate={{
        left: isLeft ? ["0%", "50%"] : ["100%", "50%"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 3.0,
        times: [0, 0.18, 0.72, 1],
        repeat: Infinity,
        ease: easings.idle,
        delay,
      }}
    />
  );
}

/**
 * The animated connector that links the three glass cards to the TriCure™ badge.
 *
 * Layout:
 *  [Card 0]   [Card 1]   [Card 2]
 *     │           │          │        ← vertical stems (3 px, per-card accent)
 *  ───┴───────────┴──────────┴────    ← horizontal rail (gradient pulse flows inward)
 *                 │                   ← center stem drops to badge
 *          ┌─ TriCure™ ─┐
 *                 │                   ← post-badge stem flows out
 *       [ Cleaner Indoor Air ]
 *
 * The animated pulses create the "energy transfer" metaphor. On hover, the
 * matching card stem brightens and its rail pulse accelerates.
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
      className="mx-auto mt-2 w-full max-w-6xl px-2 sm:mt-4"
      delay={0.25}
      distance={24}
      amount={0.25}
    >
      {/* ── Vertical stems — one per card column ── */}
      <div className="grid grid-cols-3 gap-6 md:gap-7 lg:gap-8">
        {stems.map((_, i) => {
          const active = activeIndex === i;
          const color = ACCENT_COLORS[i];
          return (
            <div key={i} className="flex justify-center">
              <div
                className="relative h-14 overflow-hidden"
                style={{
                  width: "2px",
                  background: active
                    ? `linear-gradient(to bottom, ${color}55, ${color}cc)`
                    : "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.04))",
                  borderRadius: "1px",
                  transition: "background 600ms cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: active ? `0 0 8px 1px ${color}55` : "none",
                }}
              >
                {!reducedMotion && (
                  <StemPulse delay={i * 0.6} color={color} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Horizontal rail ── */}
      <div
        className="relative h-[2px] w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(to right, transparent 2%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.08) 80%, transparent 98%)",
          borderRadius: "1px",
        }}
      >
        {/* Flowing gradient energy pulses from left (blue) and right (green) */}
        {!reducedMotion && (
          <>
            <RailPulse from="left" delay={0.0} color={BLUE} />
            <RailPulse from="right" delay={1.0} color={GREEN} />
            <RailPulse from="left" delay={2.0} color={TEAL} />
            <RailPulse from="right" delay={3.2} color={BLUE} />
          </>
        )}
      </div>

      {/* ── Convergence stem + Badge + Outcome ── */}
      <div className="flex flex-col items-center">
        {/* Pre-badge stem */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "2px",
            height: "3rem",
            background: `linear-gradient(to bottom, rgba(0,0,0,0.06), ${BLUE}88)`,
            borderRadius: "1px",
          }}
        >
          {!reducedMotion && (
            <motion.span
              aria-hidden
              className="absolute left-1/2 top-0 h-5 -translate-x-1/2 rounded-full"
              style={{
                width: "2px",
                background: `linear-gradient(to bottom, transparent, ${BLUE}, transparent)`,
                filter: "blur(0.5px)",
                boxShadow: `0 0 6px 1px ${BLUE}88`,
              }}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: ["-100%", "400%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.2,
                times: [0, 0.12, 0.78, 1],
                repeat: Infinity,
                ease: easings.idle,
                delay: 1.2,
              }}
            />
          )}
        </div>

        {/* TriCure™ Central Badge */}
        <motion.div
          className="relative"
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.92, 1, 0.92] }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: 3.5, repeat: Infinity, ease: easings.idle }
          }
        >
          {/* Outer glow ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-full"
            style={{
              background: `radial-gradient(ellipse 100% 100% at 50% 50%, ${BLUE}22 0%, transparent 70%)`,
            }}
          />

          <div
            className="relative inline-flex items-center gap-3 rounded-full border px-7 py-3.5 backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)",
              borderColor: `${BLUE}44`,
              boxShadow: `0 0 0 1px ${BLUE}22, 0 8px 32px -8px ${BLUE}44, inset 0 1px 0 rgba(255,255,255,0.1)`,
            }}
          >
            {/* TriCure™ icon — stylized double chevron merging to a point */}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              style={{ color: `oklch(0.55 0.12 248)` }}
            >
              <path d="M5 6l7 6-7 6M19 6l-7 6 7 6" opacity={0.8} />
              <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
            </svg>

            <div className="flex flex-col items-start">
              <span
                className="text-xs font-semibold tracking-[0.1em] text-muted-foreground"
                style={{ fontFamily: "var(--font-plus-jakarta)", fontSize: "9pt", letterSpacing: "0.08em" }}
              >
                Integrated Platform
              </span>
              <span
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 600,
                  fontSize: "1.0625rem",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                {badge}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Post-badge stem */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "2px",
            height: "2.5rem",
            background: `linear-gradient(to bottom, ${BLUE}88, ${GREEN}88)`,
            borderRadius: "1px",
          }}
        >
          {!reducedMotion && (
            <motion.span
              aria-hidden
              className="absolute left-1/2 top-0 h-4 -translate-x-1/2 rounded-full"
              style={{
                width: "2px",
                background: `linear-gradient(to bottom, transparent, ${TEAL}, transparent)`,
                filter: "blur(0.5px)",
              }}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: ["-100%", "400%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.0,
                times: [0, 0.1, 0.8, 1],
                repeat: Infinity,
                ease: easings.idle,
                delay: 2.1,
              }}
            />
          )}
        </div>

        {/* Outcome chip */}
        <div
          className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontWeight: 600,
            fontSize: "9pt",
            letterSpacing: "0.1em",
            borderColor: `${GREEN}44`,
            background: `${GREEN}09`,
            color: GREEN,
          }}
        >
          <motion.span
            aria-hidden
            className="size-1.5 rounded-full"
            style={{ background: GREEN }}
            animate={reducedMotion ? undefined : { opacity: [1, 0.4, 1] }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 2, repeat: Infinity, ease: easings.idle }
            }
          />
          {outcome}
        </div>
      </div>
    </Reveal>
  );
}

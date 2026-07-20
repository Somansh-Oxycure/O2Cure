"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import {
  heroTimeline,
  msToSeconds,
} from "@/features/hero/animation/heroTimeline";
import { HeroCenterBeam } from "@/features/hero/components/HeroCenterBeam";
import {
  HeroPurifier,
  type PurifierAnchor,
} from "@/features/hero/components/HeroPurifier";
import { ParticleField } from "@/features/hero/components/ParticleField";
import { PollutantBubbles } from "@/features/hero/components/PollutantBubbles";
import { SplitWorldBackground } from "@/features/hero/components/SplitWorldBackground";
import { heroContent } from "@/features/hero/content";

/* ── Shared fade-up variant factory ─────────────────────────────────────── */

const fadeUp = (delayMs: number, reduced: boolean) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: reduced ? 0 : msToSeconds(delayMs),
      duration: reduced ? durations.fast : durations.slow,
      ease: easings.premium,
    },
  },
});

/* ── Scroll chevron ─────────────────────────────────────────────────────── */

function ScrollChevron() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-heading text-[0.6rem] font-semibold tracking-[0.2em] text-[#1C1C1C]/30">
        Scroll
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        className="animate-bounce"
        style={{ color: "rgba(28,28,28,0.25)" }}
      >
        <path
          d="M4 7l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ── MOBILE hero (new — typography-driven, no images or animations) ──────── */

function MobileHero() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  const headingLines = heroContent.heading.split("\n");

  return (
    <section
      aria-label="O2Cure hero"
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-[#F5F5F4]"
    >
      {/* Ambient background glow — CSS only, no JS */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(58,125,42,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[400px] w-[500px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 90%, rgba(43,108,176,0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-24 pt-[140px]">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: reduced ? 0 : 0.1 },
            },
          }}
        >
          {/* Eyebrow */}
          {heroContent.eyebrow && (
            <motion.div
              className="mb-5 flex items-center gap-3"
              variants={fadeUp(heroTimeline.eyebrow, reduced)}
            >
              <span className="font-heading text-[0.65rem] font-bold tracking-[0.18em] text-brand-green">
                {heroContent.eyebrow}
              </span>
              <span aria-hidden className="h-px w-6 bg-brand-green/30" />
            </motion.div>
          )}

          {/* Display heading */}
          <motion.h1
            className="font-heading text-[clamp(2.25rem,1.6rem+3.5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#1C1C1C]"
            variants={fadeUp(heroTimeline.headline, reduced)}
          >
            {headingLines.map((line, i) => (
              <span key={i} className="block">
                {i === headingLines.length - 1 ? (
                  <>
                    {line.replace(".", "")}
                    <span className="text-brand-green">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            className="mt-5 max-w-lg text-[clamp(0.9375rem,0.88rem+0.3vw,1.0625rem)] leading-relaxed text-[#6B7280]"
            variants={fadeUp(heroTimeline.supportingText, reduced)}
          >
            {heroContent.supporting}
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-8"
            variants={fadeUp(heroTimeline.buttons, reduced)}
          >
            <Button
              type="button"
              size="lg"
              className="min-w-[12rem] rounded-full border border-brand-green bg-brand-green px-7 text-white hover:bg-brand-green/90 hover:text-white"
            >
              {heroContent.cta}
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1"
            variants={fadeUp(heroTimeline.buttons + 200, reduced)}
          >
            {heroContent.trustItems.map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                <span className="font-heading text-[0.7rem] font-semibold tracking-[0.08em] text-[#1C1C1C]/40">
                  {item}
                </span>
                {i < heroContent.trustItems.length - 1 && (
                  <span
                    aria-hidden
                    className="inline-block h-3 w-px bg-[#1C1C1C]/15"
                  />
                )}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: reduced ? 0 : msToSeconds(heroTimeline.buttons + 400),
          duration: durations.base,
        }}
      >
        <ScrollChevron />
      </motion.div>
    </section>
  );
}

/* ── DESKTOP hero (original — split world with purifier) ─────────────────── */

function DesktopHero() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const [anchor, setAnchor] = useState<PurifierAnchor>({ x: 0.5, y: 0.8 });

  const handleAnchorChange = useCallback((next: PurifierAnchor) => {
    setAnchor(next);
  }, []);

  return (
    <section
      aria-label="O2Cure hero"
      className="relative flex h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <SplitWorldBackground />
      <ParticleField active anchor={anchor} />
      <PollutantBubbles anchor={anchor} />
      <HeroPurifier onAnchorChange={handleAnchorChange} />

      {/* Copy — splits 50/50 on desktop */}
      <div className="relative z-30 flex h-full w-full flex-row">

        {/* LEFT: Clean world copy */}
        <div className="flex w-1/2 flex-col justify-center pl-[8vw] pr-[6vw]">
          <motion.div
            className="max-w-xl"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
            }}
          >
            <motion.p
              className="font-heading text-eyebrow tracking-[0.08em] text-teal-600"
              variants={fadeUp(heroTimeline.eyebrow, reduced)}
            >
              {heroContent.desktopLeft.eyebrow}
            </motion.p>

            <motion.h1
              className="mt-3 font-heading text-[clamp(2.25rem,1.6rem+4vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#111111] sm:mt-4"
              variants={fadeUp(heroTimeline.headline, reduced)}
            >
              {heroContent.desktopLeft.headingLine1}
              <span className="text-brand-green">.</span>
            </motion.h1>

            <motion.div variants={fadeUp(heroTimeline.buttons, reduced)}>
              <Button
                type="button"
                size="lg"
                className="mt-6 min-w-[10rem] rounded-full border border-brand-green bg-brand-green px-6 text-white hover:bg-brand-green/90 hover:text-white sm:mt-10 sm:min-w-[11rem] sm:px-7"
              >
                {heroContent.desktopLeft.cta}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT: Polluted world copy */}
        <div className="flex w-1/2 flex-col items-end justify-center pl-[6vw] pr-[8vw] text-right">
          <motion.div
            className="max-w-xl"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
            }}
          >
            <motion.p
              className="font-heading text-eyebrow tracking-[0.08em] text-[#9A6020]"
              variants={fadeUp(heroTimeline.eyebrow, reduced)}
            >
              {heroContent.desktopRight.eyebrow}
            </motion.p>

            <motion.h2
              className="mt-3 font-heading text-[clamp(2.25rem,1.6rem+4vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1C1C] sm:mt-4"
              variants={fadeUp(heroTimeline.headline, reduced)}
            >
              {heroContent.desktopRight.heading.slice(0, -1)}
              <span className="text-[#AA4A44]">.</span>
            </motion.h2>

            <motion.p
              className="mt-4 max-w-md text-[clamp(0.9375rem,0.88rem+0.3vw,1.125rem)] leading-relaxed text-[#1C1C1C]/60 sm:mt-5"
              variants={fadeUp(heroTimeline.supportingText, reduced)}
            >
              {heroContent.desktopRight.description}
            </motion.p>

            <motion.div
              className="flex justify-end"
              variants={fadeUp(heroTimeline.buttons, reduced)}
            >
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="mt-6 min-w-[10rem] rounded-full border border-[#9A6020]/35 bg-transparent px-6 text-[#7A4C18] hover:bg-[#9A6020]/8 hover:text-[#7A4C18] sm:mt-10 sm:min-w-[11rem] sm:px-7"
              >
                {heroContent.desktopRight.cta}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Center tagline — desktop only */}
      <motion.p
        className="pointer-events-none absolute left-[28%] top-[46%] z-30 max-w-[400px] -translate-y-1/2 px-6 text-left font-heading text-[clamp(0.875rem,0.75rem+0.6vw,1.125rem)] font-medium leading-snug tracking-[-0.02em] text-[#1C1C1C]/55"
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: reduced ? 0 : msToSeconds(heroTimeline.tagline),
          duration: reduced ? durations.fast : durations.slow,
          ease: easings.premium,
        }}
      >
        {heroContent.desktopLeft.centerTagline}
      </motion.p>

      {/* Top center badge */}
      <div className="absolute left-1/2 top-[112px] z-40 -translate-x-1/2 pointer-events-none text-center lg:top-[145px]">
        <motion.div
          className="flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduced ? 0 : msToSeconds(heroTimeline.eyebrow),
            duration: reduced ? durations.fast : durations.slow,
            ease: easings.premium,
          }}
        >
          <span className="font-heading text-eyebrow font-semibold tracking-[0.2em] text-[#1C1C1C]/45">
            India's Best Air Purification Brand
          </span>
          <div className="h-[1px] w-6 bg-[#1C1C1C]/15" />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Root export — CSS breakpoint switch ────────────────────────────────── */

export function Hero() {
  return (
    <>
      {/* Mobile only (< md) */}
      <div className="block md:hidden">
        <MobileHero />
      </div>

      {/* Desktop only (≥ md) */}
      <div className="hidden md:block">
        <DesktopHero />
      </div>
    </>
  );
}

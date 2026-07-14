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
import { SplitWorldBackground } from "@/features/hero/components/SplitWorldBackground";
import { heroContent } from "@/features/hero/content";

const fadeUp = (delayMs: number, reduced: boolean) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 20 },
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

/**
 * "Breath Divide" Hero — pristine white left, dark canvas right.
 * The HULK purifier at center is the literal bridge between worlds.
 *
 * Left copy (clean world):  dark text on white — O2 Green CTA anchor.
 * Right copy (dark world):  white text on dark — amber border CTA.
 * Center tagline:            explicit split rendering for contrast safety.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const [anchor, setAnchor] = useState<PurifierAnchor>({ x: 0.5, y: 0.8 });

  const handleAnchorChange = useCallback((next: PurifierAnchor) => {
    setAnchor(next);
  }, []);

  return (
    <section
      aria-label="O2Cure hero"
      className="relative flex h-dvh min-h-[640px] w-full overflow-hidden"
    >
      <SplitWorldBackground />

      <ParticleField active anchor={anchor} />

      <HeroPurifier onAnchorChange={handleAnchorChange} />

      {/* Copy — mobile stacks top, desktop splits 50/50 */}
      <div className="relative z-30 flex h-full w-full flex-col md:flex-row">

        {/* ── LEFT: Clean world copy — dark text on off-white ───────────── */}
        <div className="flex w-full flex-col justify-end px-6 pb-2 pt-24 sm:px-8 md:w-1/2 md:justify-center md:pl-[8vw] md:pr-[6vw] md:pb-0 md:pt-0">
          <motion.div
            className="max-w-xl"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
            }}
          >
            {/* Eyebrow — crisp teal on white */}
            <motion.p
              className="font-heading text-eyebrow uppercase tracking-[0.08em] text-teal-600"
              variants={fadeUp(heroTimeline.eyebrow, reduced)}
            >
              {heroContent.left.eyebrow}
            </motion.p>

            {/* Heading — deep charcoal on white, Plus Jakarta Sans, tight tracking */}
            <motion.h1
              className="mt-3 font-heading text-[clamp(2.25rem,1.6rem+4vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#111111] sm:mt-4"
              variants={fadeUp(heroTimeline.headline, reduced)}
            >
              {heroContent.left.headingLine1}
              <br />
              {heroContent.left.headingLine2.slice(0, -1)}
              <span className="text-brand-green">.</span>
            </motion.h1>

            {/* CTA — O2 Green, the single viewport anchor element */}
            <motion.div variants={fadeUp(heroTimeline.buttons, reduced)}>
              <Button
                type="button"
                size="lg"
                className="mt-6 min-w-[10rem] rounded-full border border-brand-green bg-brand-green px-6 text-white hover:bg-brand-green/90 hover:text-white sm:mt-10 sm:min-w-[11rem] sm:px-7"
              >
                {heroContent.left.cta}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT: Polluted world copy — white text on dark canvas ──────── */}
        <div className="flex w-full flex-col items-end justify-start px-6 pb-[clamp(190px,40vh,300px)] text-right sm:px-8 md:w-1/2 md:justify-center md:pl-[6vw] md:pr-[8vw] md:pb-0">
          <motion.div
            className="max-w-xl"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
            }}
          >
            {/* Eyebrow — warm amber-brown on light background */}
            <motion.p
              className="font-heading text-eyebrow uppercase tracking-[0.08em] text-[#9A6020]"
              variants={fadeUp(heroTimeline.eyebrow, reduced)}
            >
              {heroContent.right.eyebrow}
            </motion.p>

            {/* Heading — deep charcoal on the light/haze background */}
            <motion.h2
              className="mt-3 font-heading text-[clamp(2.25rem,1.6rem+4vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1C1C] sm:mt-4"
              variants={fadeUp(heroTimeline.headline, reduced)}
            >
              {heroContent.right.heading.slice(0, -1)}
              <span className="text-brand-green">.</span>
            </motion.h2>

            {/* Supporting text — charcoal/60 on the soft light background */}
            <motion.p
              className="mt-4 max-w-md text-[clamp(0.9375rem,0.88rem+0.3vw,1.125rem)] leading-relaxed text-[#1C1C1C]/60 sm:mt-5"
              variants={fadeUp(heroTimeline.supportingText, reduced)}
            >
              {heroContent.right.description}
            </motion.p>

            {/* CTA — amber border, amber text, no glow, clean material */}
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
                {heroContent.right.cta}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── CENTER TAGLINE ──────────────────────────────────────────────────
          Single clean element — charcoal/60 on the off-white canvas.
          Background is light everywhere so no split rendering needed.      */}
      <motion.p
        className="pointer-events-none absolute left-[28%] top-[46%] z-30 hidden max-w-[400px] -translate-y-1/2 px-6 text-left font-heading text-[clamp(0.875rem,0.75rem+0.6vw,1.125rem)] font-medium leading-snug tracking-[-0.02em] text-[#1C1C1C]/55 md:block"
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: reduced ? 0 : msToSeconds(heroTimeline.tagline),
          duration: reduced ? durations.fast : durations.slow,
          ease: easings.premium,
        }}
      >
        {heroContent.centerTagline}
      </motion.p>
    </section>
  );
}

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
 * Split-world Hero — purifier at center cleans polluted mist into pure air.
 * Mobile-first: stacked copy, purifier anchored bottom-center on all sizes.
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

      {/* <HeroCenterBeam /> */}

      {/* Copy — mobile stacks top, desktop splits 50/50 */}
      <div className="relative z-30 flex h-full w-full flex-col md:flex-row">
        <div className="flex w-full flex-col justify-end px-6 pb-2 pt-24 sm:px-8 md:w-1/2 md:justify-center md:pl-[8vw] md:pr-[6vw] md:pb-0 md:pt-0">
          <motion.div
            className="max-w-xl"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
            }}
          >
            <motion.p
              className="text-eyebrow uppercase text-brand-green"
              variants={fadeUp(heroTimeline.eyebrow, reduced)}
            >
              {heroContent.left.eyebrow}
            </motion.p>

            <motion.h1
              className="mt-3 font-heading text-[clamp(2.25rem,1.6rem+4vw,5rem)] leading-[1.05] tracking-[-0.02em] text-[#0A0A0A] sm:mt-4"
              variants={fadeUp(heroTimeline.headline, reduced)}
            >
              {heroContent.left.headingLine1}
              <br />
              {heroContent.left.headingLine2.slice(0, -1)}
              <span className="text-brand-green">.</span>
            </motion.h1>

            <motion.div variants={fadeUp(heroTimeline.buttons, reduced)}>
              <Button
                type="button"
                size="lg"
                className="mt-6 min-w-[10rem] rounded-full border border-brand-green bg-transparent px-6 text-brand-green hover:bg-brand-green/10 hover:text-brand-green sm:mt-10 sm:min-w-[11rem] sm:px-7"
              >
                {heroContent.left.cta}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="flex w-full flex-col items-end justify-start px-6 pb-[clamp(190px,40vh,300px)] text-right sm:px-8 md:w-1/2 md:justify-center md:pl-[6vw] md:pr-[8vw] md:pb-0">
          <motion.div
            className="max-w-xl"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
            }}
          >
            <motion.p
              className="text-eyebrow uppercase text-[#B8844A]"
              variants={fadeUp(heroTimeline.eyebrow, reduced)}
            >
              {heroContent.right.eyebrow}
            </motion.p>

            <motion.h2
              className="mt-3 font-heading text-[clamp(2.25rem,1.6rem+4vw,5rem)] leading-[1.05] tracking-[-0.02em] text-[#0A0A0A] sm:mt-4"
              variants={fadeUp(heroTimeline.headline, reduced)}
            >
              {heroContent.right.heading.slice(0, -1)}
              <span className="text-brand-green">.</span>
            </motion.h2>

            <motion.p
              className="mt-4 max-w-md text-[clamp(0.9375rem,0.88rem+0.3vw,1.125rem)] leading-relaxed text-[#0A0A0A]/60 sm:mt-5"
              variants={fadeUp(heroTimeline.supportingText, reduced)}
            >
              {heroContent.right.description}
            </motion.p>

            <motion.div
              className="flex justify-end"
              variants={fadeUp(heroTimeline.buttons, reduced)}
            >
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="mt-6 min-w-[10rem] rounded-full border-[#B8844A]/40 bg-transparent px-6 text-[#8A5E30] hover:bg-[#B8844A]/10 hover:text-[#8A5E30] sm:mt-10 sm:min-w-[11rem] sm:px-7"
              >
                {heroContent.right.cta}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Center tagline — hidden on small screens to avoid purifier overlap */}
      <motion.p
        className="pointer-events-none absolute left-1/2 top-[46%] z-30 hidden max-w-[700px] -translate-x-1/2 -translate-y-1/2 px-6 text-center font-heading text-[clamp(1.125rem,0.9rem+1vw,1.5rem)] leading-snug tracking-[-0.01em] text-[#0A0A0A]/70 md:block"
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

"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { EnvironmentPanelStack } from "@/features/environment/components/EnvironmentPanelStack";

/**
 * Chapter 2 — "Where Do You Breathe?" environment selector.
 *
 * Uses useInView for independent in-viewport animation, decoupled from
 * the Hero's scroll progress (which maxes out before this section is visible).
 */
export function EnvironmentSection() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });

  const isVisible = reduced || inView;

  return (
    <section
      ref={sectionRef}
      id="environments"
      aria-labelledby="environments-heading"
      className="relative min-h-dvh bg-[#F5F5F4] pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pt-28"
    >
      {/* Ambient section background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Top gradient bridge from bridge section */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F5F5F4] to-transparent" />
        {/* Subtle radial glow at bottom center */}
        <div
          className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(58,125,42,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        {/* Section header */}
        <header className="mb-12 text-center sm:mb-14">
          {/* Eyebrow */}
          <motion.div
            className="mb-4 flex items-center justify-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="h-px w-10 bg-brand-green/35" />
            <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
              Your Environment
            </span>
            <span className="h-px w-10 bg-brand-green/35" />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            id="environments-heading"
            className="font-heading text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: reduced ? 0 : 0.1,
            }}
          >
            Choose your space,
            <br />
            <span className="text-brand-green">breathe better</span> within it.
          </motion.h2>

          {/* Supporting copy */}
          <motion.p
            className="mx-auto mt-5 max-w-lg text-[clamp(0.9375rem,0.88rem+0.3vw,1.0625rem)] leading-relaxed text-[#0A0A0A]/55"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={isVisible ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: reduced ? 0 : 0.2,
            }}
          >
            Hover or tap any environment to see how O2Cure's intelligent air
            purification adapts to every space.
          </motion.p>
        </header>

        {/* Environment panel stack */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
            delay: reduced ? 0 : 0.3,
          }}
        >
          <EnvironmentPanelStack />
        </motion.div>
      </div>
    </section>
  );
}

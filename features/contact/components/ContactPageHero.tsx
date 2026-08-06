"use client";

import { motion, useReducedMotion } from "framer-motion";

import { easings } from "@/components/motion/easings";

/**
 * ContactPageHero — Light, airy hero for the /contact landing page.
 * Uses the site's standard bg-background (#F5F5F4) with brand green accents.
 */
export function ContactPageHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact-hero"
      aria-labelledby="contact-page-heading"
      className="relative overflow-hidden bg-background pt-32 pb-16"
    >
      {/* Soft ambient tint — very subtle, light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] opacity-30 blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(58,125,42,0.12) 0%, rgba(43,108,176,0.08) 60%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        {/* Eyebrow */}
        <motion.div
          className="mb-5 flex items-center gap-3"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easings.premium }}
        >
          <span className="h-px w-8 bg-brand-green/40" aria-hidden />
          <span className="text-[0.72rem] font-semibold tracking-[0.18em] text-brand-green uppercase">
            Engineering Consultation
          </span>
          <span className="h-px w-8 bg-brand-green/40" aria-hidden />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          id="contact-page-heading"
          className="font-heading text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.05] tracking-[-0.03em] text-foreground"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.75, ease: easings.premium }}
        >
          Let&apos;s build a{" "}
          <span className="text-brand-green">healthier</span>
          <br />
          space together.
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          className="mt-5 max-w-2xl text-[clamp(0.9rem,1.6vw,1.05rem)] leading-relaxed text-muted-foreground"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7, ease: easings.premium }}
        >
          Whether you&apos;re protecting a hospital wing, a corporate headquarters,
          a hotel or a home — our HVAC-certified air quality engineers design systems
          calibrated to your environment and the next decade of clean air.
        </motion.p>

        {/* Decorative bottom rule */}
        <motion.div
          className="mt-10 h-px w-full max-w-xs bg-gradient-to-r from-brand-green/30 to-transparent"
          initial={prefersReducedMotion ? false : { scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.9, ease: easings.premium }}
          aria-hidden
        />
      </div>
    </section>
  );
}

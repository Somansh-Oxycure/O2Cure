"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { easings } from "@/components/motion/easings";
import { aboutHeroContent } from "@/features/about/content";

// ─── Scroll indicator ──────────────────────────────────────────────────────────
function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.4,
        duration: 0.8,
        ease: easings.premium,
      }}
      aria-hidden
    >
      <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/50 uppercase">
        Scroll
      </span>
      <motion.div
        className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent"
        animate={prefersReducedMotion ? {} : { scaleY: [1, 0.4, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: easings.idle }}
      />
    </motion.div>
  );
}

// ─── Floating particles (decorative, mirrors homepage Hero) ───────────────────
function HeroParticles() {
  const prefersReducedMotion = useReducedMotion();

  const particles = [
    { cx: "14%", cy: "22%", r: 2, delay: 0 },
    { cx: "82%", cy: "18%", r: 1.5, delay: 0.6 },
    { cx: "68%", cy: "72%", r: 2.5, delay: 1.1 },
    { cx: "28%", cy: "65%", r: 1.5, delay: 0.3 },
    { cx: "90%", cy: "50%", r: 1, delay: 0.9 },
    { cx: "8%",  cy: "48%", r: 1.5, delay: 1.4 },
  ];

  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-blue-light/30"
          style={{
            left: p.cx,
            top: p.cy,
            width: p.r * 2,
            height: p.r * 2,
          }}
          animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5 + p.delay,
            delay: p.delay,
            ease: easings.idle,
          }}
        />
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function AboutHero() {
  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-heading"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <Image
          src={aboutHeroContent.imageSrc}
          alt={aboutHeroContent.imageAlt}
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay for text legibility — left-to-right gradient */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.35) 100%)",
          }}
        />
        {/* Bottom fade to background color */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#F5F5F4]"
        />
        {/* Subtle brand-green vignette on the left edge */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 0% 60%, rgba(58,125,42,0.25) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* ── Floating particles ── */}
      <HeroParticles />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)] pt-28 pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easings.premium }}
          >
            <span className="h-px w-10 bg-brand-green/70" aria-hidden />
            <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
              {aboutHeroContent.eyebrow}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            id="about-hero-heading"
            className="font-heading font-bold leading-[1.05] tracking-[-0.03em] text-white"
            style={{
              fontSize: "clamp(2.5rem, 2rem + 3.5vw, 5rem)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: easings.premium }}
          >
            {aboutHeroContent.headline}
            <br />
            <span className="text-brand-green">
              {aboutHeroContent.headlineAccent}
            </span>
          </motion.h1>

          {/* Sub-line */}
          <motion.p
            className="mt-6 text-base font-medium tracking-wide text-white/60"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easings.premium }}
          >
            {aboutHeroContent.subline}
          </motion.p>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}

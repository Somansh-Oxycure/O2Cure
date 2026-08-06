"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { easings } from "@/components/motion/easings";
import { aboutHeroContent } from "@/features/about/content";
import { formatBrandText } from "@/lib/brand";

// ─── Animated chevron scroll indicator ────────────────────────────────────────
function ScrollChevron() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.7, ease: easings.premium }}
      aria-hidden
    >
      <span className="text-[0.6rem] font-semibold tracking-[0.2em] text-white/40 uppercase select-none">
        Scroll
      </span>
      {/* Double chevron — staggered opacity for a breathing effect */}
      {[0, 1].map((i) => (
        <motion.svg
          key={i}
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginTop: i === 0 ? 0 : -6 }}
          animate={
            prefersReducedMotion
              ? {}
              : { opacity: [0.25 + i * 0.15, 0.7, 0.25 + i * 0.15], y: [0, 4, 0] }
          }
          transition={{
            repeat: Infinity,
            duration: 2.2,
            delay: i * 0.18,
            ease: easings.idle,
          }}
        >
          <polyline points="2,2 9,8 16,2" />
        </motion.svg>
      ))}
    </motion.div>
  );
}

// ─── Floating data badge — glassmorphic science detail ─────────────────────────
function DataBadge() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute bottom-10 right-5 sm:right-8 lg:bottom-14 lg:right-12 z-20"
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.9, ease: easings.premium }}
    >
      <motion.div
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md"
        animate={
          prefersReducedMotion
            ? {}
            : { y: [0, -4, 0] }
        }
        transition={{ repeat: Infinity, duration: 5, ease: easings.idle }}
      >
        {/* Pulsing green dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: easings.idle }}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
        </span>

        <div className="flex flex-col leading-tight">
          <span className="text-[0.7rem] font-semibold tracking-[0.1em] text-white/50 uppercase">
            Daily breaths
          </span>
          <span className="text-[1.05rem] font-bold tabular-nums text-white leading-none mt-0.5">
            23,000
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Floating particles (decorative, mirrors homepage Hero) ───────────────────
function HeroParticles() {
  const prefersReducedMotion = useReducedMotion();

  const particles = [
    { cx: "14%", cy: "22%", r: 2,   delay: 0   },
    { cx: "82%", cy: "18%", r: 1.5, delay: 0.6 },
    { cx: "68%", cy: "72%", r: 2.5, delay: 1.1 },
    { cx: "28%", cy: "65%", r: 1.5, delay: 0.3 },
    { cx: "90%", cy: "50%", r: 1,   delay: 0.9 },
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
            top:  p.cy,
            width:  p.r * 2,
            height: p.r * 2,
          }}
          animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5 + p.delay,
            delay:    p.delay,
            ease:     easings.idle,
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
      /*
        Mobile: 65svh keeps the hero tight so content below is immediately
        reachable without heavy thumb-scroll. Desktop keeps full viewport height.
        `svh` (small viewport height) avoids the iOS Safari bottom-bar trap.
      */
      className="relative flex min-h-[65svh] lg:min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A]"
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
            className="mb-5 flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easings.premium }}
          >
            <span className="h-px w-8 bg-brand-green/70" aria-hidden />
            <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
              {aboutHeroContent.eyebrow}
            </span>
          </motion.div>

          {/* H1 — floor reduced to 2rem on mobile to prevent overflow */}
          <motion.h1
            id="about-hero-heading"
            className="font-heading font-bold leading-[1.05] tracking-[-0.03em] text-white"
            style={{
              fontSize: "clamp(2rem, 1.6rem + 3.5vw, 5rem)",
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
            className="mt-5 text-sm sm:text-base font-medium tracking-wide text-white/60"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easings.premium }}
          >
            {formatBrandText(aboutHeroContent.subline)}
          </motion.p>
        </div>
      </div>

      {/* ── Floating data badge ── */}
      <DataBadge />

      {/* ── Scroll indicator ── */}
      <ScrollChevron />
    </section>
  );
}

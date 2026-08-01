"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { easings } from "@/components/motion/easings";
import { pillars, pillarsContent } from "@/features/about/content";
import type { PillarItem } from "@/features/about/types";

// ─── Pillar icons ──────────────────────────────────────────────────────────────
function VisionIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function MissionIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
function UniquenessIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
function SolutionsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2"/>
      <path d="M12.59 19.41A2 2 0 1 0 14 16H2"/>
      <path d="M17.59 11.41A2 2 0 1 1 19 8H2"/>
    </svg>
  );
}

const pillarIcons = [VisionIcon, MissionIcon, UniquenessIcon, SolutionsIcon];

// ─── Pillar Card ──────────────────────────────────────────────────────────────
function PillarCard({ pillar, cardIndex }: { pillar: PillarItem; cardIndex: number }) {
  const Icon = pillarIcons[cardIndex] ?? VisionIcon;

  return (
    <Reveal delay={0.08 * cardIndex} distance={28} amount={0.15}>
      <motion.article
        id={pillar.id}
        aria-labelledby={`${pillar.id}-title`}
        className="group relative flex flex-col gap-5 rounded-2xl bg-white border border-gray-100 p-7 sm:p-9 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow duration-500 hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.14)]"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: easings.standard }}
      >
        {/* Large decorative number — background watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-5 top-3 font-heading text-[5.5rem] sm:text-[7rem] font-black leading-none tracking-tighter text-brand-green/[0.045] select-none transition-colors duration-500 group-hover:text-brand-green/[0.07]"
        >
          {String(pillar.index).padStart(2, "0")}
        </span>

        {/* Icon + label row */}
        <div className="flex items-center gap-3 text-brand-green transition-colors duration-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF5E4] text-brand-green">
            <Icon />
          </div>
          <h3
            id={`${pillar.id}-title`}
            className="font-heading text-[0.8125rem] font-semibold tracking-[0.1em] uppercase text-brand-green"
          >
            {pillar.title}
          </h3>
        </div>

        {/* Description */}
        <p className="relative z-10 text-sm sm:text-[0.9375rem] leading-relaxed text-muted-foreground">
          {pillar.description}
        </p>

        {/* Hover accent border-left */}
        <span
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-brand-green opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        />
      </motion.article>
    </Reveal>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function PillarsSection() {
  return (
    <section
      id="our-pillars"
      aria-labelledby="pillars-heading"
      className="relative bg-background py-[clamp(4rem,6vw,8rem)]"
    >
      {/* Very subtle ambient top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">

        {/* ── Section Header ── */}
        <div className="text-center mb-14 sm:mb-18">
          <Reveal delay={0} distance={16}>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/35" aria-hidden />
              <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
                {pillarsContent.eyebrow}
              </span>
              <span className="h-px w-10 bg-brand-green/35" aria-hidden />
            </div>
          </Reveal>
          <Reveal delay={0.1} distance={22}>
            <h2
              id="pillars-heading"
              className="font-heading text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]"
            >
              {pillarsContent.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.2} distance={18}>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted-foreground">
              {pillarsContent.supporting}
            </p>
          </Reveal>
        </div>

        {/* ── 2×2 Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} cardIndex={i} />
          ))}
        </div>

        {/* ── CTA strip ── */}
        <Reveal delay={0.4} distance={16}>
          <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-sm text-muted-foreground max-w-sm">
              Ready to breathe cleaner air? Explore our complete range of solutions.
            </p>
            <a
              href="/solutions"
              id="pillars-cta-solutions"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(58,125,42,0.45)] transition-all duration-300 hover:bg-brand-green-hover hover:shadow-[0_6px_24px_-4px_rgba(58,125,42,0.55)] hover:-translate-y-px"
            >
              Explore Solutions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Bottom gradient bridge to footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}

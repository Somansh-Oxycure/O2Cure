/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { easings } from "@/components/motion/easings";
import { pillars, pillarsContent } from "@/features/about/content";
import type { PillarItem } from "@/features/about/types";
import { formatBrandText } from "@/lib/brand";

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

// ─── Desktop Pillar Card (unchanged) ──────────────────────────────────────────
function PillarCard({ pillar, cardIndex }: { pillar: PillarItem; cardIndex: number }) {
  const Icon = pillarIcons[cardIndex] ?? VisionIcon;

  return (
    <Reveal delay={0.08 * cardIndex} distance={28} amount={0.15} className="h-full">
      <motion.article
        id={pillar.id}
        aria-labelledby={`${pillar.id}-title`}
        className="h-full group relative flex flex-col gap-5 rounded-2xl bg-white border border-gray-100 p-7 sm:p-9 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow duration-500 hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.14)]"
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
          {formatBrandText(pillar.description)}
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

// ─── Mobile: Tabbed pill panel ─────────────────────────────────────────────────
/**
 * Shows 4 pill tabs in a horizontally scrollable strip.
 * Active pill: solid brand-green. Inactive: outlined ghost.
 * Body animates with a directional x-slide so the user gets
 * spatial feedback about which direction they navigated.
 */
function PillarTabs() {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const pillRef = useRef<HTMLDivElement>(null);

  const direction = active > prevActive ? 1 : -1;

  function selectTab(i: number) {
    setPrevActive(active);
    setActive(i);
    // Scroll selected pill into view
    const pill = pillRef.current?.children[i] as HTMLElement | undefined;
    pill?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  const pillar = pillars[active];
  const Icon = pillarIcons[active] ?? VisionIcon;

  const slideVariants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir * 40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.38,
        ease: easings.premium,
      },
    },
    exit: (dir: number) => ({
      x: prefersReducedMotion ? 0 : -dir * 40,
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.22,
        ease: easings.standard,
      },
    }),
  };

  return (
    <div>
      {/* ── Pill strip ── */}
      <div
        ref={pillRef}
        role="tablist"
        aria-label="Our Pillars"
        className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {pillars.map((p, i) => {
          const PillIcon = pillarIcons[i] ?? VisionIcon;
          const isActive = i === active;
          return (
            <button
              key={p.id}
              id={`pillar-tab-${i}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`pillar-panel-${i}`}
              onClick={() => selectTab(i)}
              style={{ scrollSnapAlign: "start", flexShrink: 0 }}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-semibold tracking-wide transition-all duration-250 ${
                isActive
                  ? "bg-brand-green text-white shadow-[0_4px_16px_-4px_rgba(58,125,42,0.45)]"
                  : "border border-gray-200 bg-white text-muted-foreground hover:border-brand-green/40 hover:text-brand-green"
              }`}
            >
              <span className={isActive ? "text-white" : "text-brand-green"}>
                <PillIcon />
              </span>
              {p.title}
            </button>
          );
        })}
      </div>

      {/* ── Animated panel ── */}
      <div
        id={`pillar-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`pillar-tab-${active}`}
        className="mt-5 relative overflow-hidden"
        style={{ minHeight: "200px" }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)]"
          >
            {/* Watermark index */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-2 font-heading text-[5rem] font-black leading-none tracking-tighter text-brand-green/[0.05] select-none"
            >
              {String(pillar.index).padStart(2, "0")}
            </span>

            {/* Icon + Title */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5E4] text-brand-green">
                <Icon />
              </div>
              <h3 className="font-heading text-[0.8125rem] font-semibold tracking-[0.1em] uppercase text-brand-green">
                {pillar.title}
              </h3>
            </div>

            {/* Description */}
            <p className="relative z-10 text-sm leading-relaxed text-muted-foreground">
              {formatBrandText(pillar.description)}
            </p>

            {/* Accent line */}
            <span
              aria-hidden
              className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-brand-green"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Sticky bottom CTA bar (mobile only) ──────────────────────────────────────
/**
 * Appears when the pillars section enters the viewport.
 * Disappears as soon as the footer sentinel crosses the fold.
 * Uses IntersectionObserver on both the section and a footer sentinel.
 */
function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = document.getElementById("our-pillars");
    const footer  = document.getElementById("site-footer");

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === section) {
            setVisible(entry.isIntersecting);
          }
          if (entry.target === footer && entry.isIntersecting) {
            // Footer in view → hide bar
            setVisible(false);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(section);
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={{ y: prefersReducedMotion ? 0 : 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{   y: prefersReducedMotion ? 0 : 72, opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: easings.premium }}
          /*
            sm:hidden — strictly mobile only.
            pb-safe = env(safe-area-inset-bottom) via Tailwind's pb-[env(safe-area-inset-bottom)]
          */
          className="sm:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-white/80 backdrop-blur-xl"
          style={{
            paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          }}
        >
          <div className="flex items-center justify-between gap-3 px-5 pt-3">
            <p className="text-xs text-muted-foreground leading-snug max-w-[55%]">
              Ready to breathe cleaner air?
            </p>
            <a
              href="/solutions"
              id="pillars-sticky-cta"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(58,125,42,0.5)] transition-all duration-200 active:scale-[0.97]"
            >
              Explore Solutions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function PillarsSection() {
  return (
    <>
      <section
        id="our-pillars"
        aria-labelledby="pillars-heading"
        className="relative bg-background py-[clamp(3.5rem,6vw,8rem)]"
      >
        {/* Very subtle ambient top glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">

          {/* ── Section Header ── */}
          <div className="text-center mb-10 sm:mb-14 lg:mb-18">
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
                className="font-heading text-[clamp(1.6rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]"
              >
                {pillarsContent.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.2} distance={18}>
              <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted-foreground">
                {formatBrandText(pillarsContent.supporting)}
              </p>
            </Reveal>
          </div>

          {/* ── Mobile: Tabbed pills (< sm) ── */}
          <div className="sm:hidden">
            <Reveal delay={0.1} distance={20} amount={0.1}>
              <PillarTabs />
            </Reveal>
          </div>

          {/* ── Desktop: 2×2 grid (sm+) ── */}
          <div className="hidden sm:grid grid-cols-2 gap-6">
            {pillars.map((pillar, i) => (
              <PillarCard key={pillar.id} pillar={pillar} cardIndex={i} />
            ))}
          </div>

          {/* ── Desktop CTA strip (sm+) ── */}
          <Reveal delay={0.4} distance={16}>
            <div className="hidden sm:flex mt-14 sm:mt-16 flex-col sm:flex-row items-center justify-center gap-4 text-center">
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

      {/* Mobile sticky CTA bar — rendered outside the section so it can overlay footer */}
      <StickyCtaBar />
    </>
  );
}

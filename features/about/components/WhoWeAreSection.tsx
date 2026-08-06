"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { easings } from "@/components/motion/easings";
import { whoWeAreContent } from "@/features/about/content";
import { formatBrandText } from "@/lib/brand";

// ─── Expandable drawer (mobile-only) ─────────────────────────────────────────
/**
 * Shows the first paragraph always. Remaining paragraphs slide in/out
 * behind a 44px+ touch-target toggle button. Desktop renders all paragraphs
 * inline — the accordion state has no visual effect at lg+ because the
 * toggle button is hidden there.
 */
function ParagraphDrawer({ paragraphs }: { paragraphs: readonly string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const leadParagraph = paragraphs[0];
  const hiddenParagraphs = paragraphs.slice(1);

  return (
    <div className="flex flex-col gap-5">
      {/* Lead paragraph — always visible */}
      <Reveal delay={0.1} distance={20}>
        <p className="text-base sm:text-[1.0625rem] leading-relaxed text-muted-foreground">
          {formatBrandText(leadParagraph)}
        </p>
      </Reveal>

      {/* ── Collapsed paragraphs (desktop: always shown, mobile: toggled) ── */}
      {/* Desktop: render all paragraphs without AnimatePresence */}
      <div className="hidden lg:flex flex-col gap-5">
        {hiddenParagraphs.map((para, i) => (
          <Reveal key={i} delay={0.15 + i * 0.1} distance={20}>
            <p className="text-base sm:text-[1.0625rem] leading-relaxed text-muted-foreground">
              {formatBrandText(para)}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Mobile: collapsible drawer */}
      <div className="lg:hidden">
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: { duration: prefersReducedMotion ? 0 : 0.42, ease: easings.premium },
                  opacity: { duration: prefersReducedMotion ? 0 : 0.3, delay: prefersReducedMotion ? 0 : 0.1 },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  height: { duration: prefersReducedMotion ? 0 : 0.3, ease: easings.standard },
                  opacity: { duration: prefersReducedMotion ? 0 : 0.2 },
                },
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-5 pt-1">
                {hiddenParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-muted-foreground"
                  >
                    {formatBrandText(para)}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button — min 44px touch target */}
        <button
          id="who-we-are-toggle"
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="who-we-are-drawer"
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brand-green/30 bg-[#EAF5E4] px-5 py-2.5 text-sm font-semibold text-brand-green transition-all duration-200 hover:bg-brand-green hover:text-white active:scale-[0.97]"
        >
          {isOpen ? "Show Less" : "Read More"}
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: easings.standard }}
            aria-hidden
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </button>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function WhoWeAreSection() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="relative bg-background overflow-hidden"
    >
      {/* ── Top gradient bridge from Hero ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F5F5F4] to-transparent"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(3.5rem,6vw,8rem)]">

        {/* ── Section Header ── */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <Reveal delay={0} distance={16}>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/35" aria-hidden />
              <span
                id="who-we-are-heading"
                className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green"
              >
                {whoWeAreContent.eyebrow}
              </span>
              <span className="h-px w-10 bg-brand-green/35" aria-hidden />
            </div>
          </Reveal>
          <Reveal delay={0.12} distance={22}>
            <h2 className="font-heading text-[clamp(1.6rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]">
              {formatBrandText(whoWeAreContent.heading)}
            </h2>
          </Reveal>
        </div>

        {/* ── Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Image block — first on mobile (visual anchor), second on desktop */}
          <div className="relative order-1 lg:order-2">
            <Reveal delay={0.1} distance={28}>
              <div className="relative">
                {/*
                  Mobile: full-width 4:3 image — no overlapping lifestyle thumb
                  (too cramped at <400px). Desktop: lifestyle thumb re-appears.
                */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_-24px_rgba(0,0,0,0.22)] aspect-[4/3]">
                  <Image
                    src={whoWeAreContent.buildingImageSrc}
                    alt={whoWeAreContent.buildingImageAlt}
                    fill
                    quality={85}
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                  {/* Subtle brand overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent"
                  />
                </div>




              </div>
            </Reveal>
          </div>

          {/* Text block — second on mobile (image anchors first), first on desktop */}
          <div className="order-2 lg:order-1">
            <ParagraphDrawer paragraphs={whoWeAreContent.paragraphs} />
          </div>
        </div>
      </div>

    </section>
  );
}

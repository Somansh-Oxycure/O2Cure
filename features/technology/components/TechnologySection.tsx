"use client";

import { useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { technologyContent } from "@/features/technology/content";
import { CompactThreatCard } from "./CompactThreatCard";

/**
 * Chapter 4 — "Powered by TriCure™ Technology".
 *
 * Layout: compact 3-column grid — all threat layers visible simultaneously.
 * No tabs, no clicks needed. Stat counters fire on scroll-into-view.
 * Slim convergence bar below the grid.
 */
export function TechnologySection() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);

  const { eyebrow, heading, supporting, layers } =
    technologyContent;

  return (
    <>
      {/* Story bridge */}
      <div
        aria-hidden
        className="pointer-events-none relative h-[clamp(3.5rem,8vh,5.5rem)] overflow-hidden bg-background"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(120,210,185,0.08) 0%, rgba(43,108,176,0.04) 40%, transparent 100%)",
          }}
        />
      </div>

      <section
        id="technology"
        aria-labelledby="technology-heading"
        className="relative bg-background py-4"
      >
        {/* Ambient radial */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -top-32 left-1/2 h-[40rem] w-[56rem] -translate-x-1/2 opacity-[0.03]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.55 0.12 248) 0%, transparent 65%)",
              filter: "blur(1px)",
            }}
          />
        </div>

        <div className="relative px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
          {/* ── Header ── */}
          <header className="mx-auto max-w-5xl text-center">
            <Reveal delay={0} distance={20}>
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-brand-green/35" />
                <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
                  {eyebrow}
                </span>
                <span className="h-px w-10 bg-brand-green/35" />
              </div>
            </Reveal>

            <Reveal delay={0.1} distance={28}>
              <h2
                id="technology-heading"
                className="mt-3 font-heading text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A] sm:mt-4"
              >
                {heading}
              </h2>
            </Reveal>

            <Reveal delay={0.18} distance={20}>
              <p
                className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg sm:leading-relaxed"
                style={{ fontFamily: "var(--font-plus-jakarta)", fontWeight: 400 }}
              >
                {supporting}
              </p>
            </Reveal>
          </header>

          {/* ── 3-column compact card grid ── */}
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-start gap-4 sm:grid-cols-3 sm:gap-5">
            {layers.map((layer, index) => (
              <CompactThreatCard
                key={layer.id}
                layer={layer}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          {/* ── Closing copy ── */}
          <Reveal delay={0.15} distance={18} amount={0.5}>
            <p
              className="mx-auto mt-8 max-w-2xl text-center text-body-lg text-muted-foreground"
              style={{ fontFamily: "var(--font-plus-jakarta)", fontWeight: 400 }}
            >
              {/* {closing} */}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

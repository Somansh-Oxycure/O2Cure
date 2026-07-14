"use client";

import { motion, useReducedMotion } from "framer-motion";

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

  const { eyebrow, heading, supporting, layers, badge, outcome, closing } =
    technologyContent;

  const BLUE = "oklch(0.55 0.12 248)";
  const TEAL = "rgba(120,210,185,1)";
  const GREEN = "rgba(58,125,42,1)";

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
        className="relative bg-background pb-section pt-section-sm"
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
          <header className="mx-auto max-w-3xl text-center">
            <Reveal delay={0} distance={20}>
              <p
                className="uppercase text-muted-foreground"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 600,
                  fontSize: "9pt",
                  letterSpacing: "0.1em",
                }}
              >
                {eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.1} distance={28}>
              <h2
                id="technology-heading"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
                className="mt-4 text-h2 text-foreground sm:mt-5"
              >
                {heading}
              </h2>
            </Reveal>

            <Reveal delay={0.18} distance={20}>
              <p
                className="mx-auto mt-3 max-w-xl text-body-lg text-muted-foreground"
                style={{ fontFamily: "var(--font-plus-jakarta)", fontWeight: 400 }}
              >
                {supporting}
              </p>
            </Reveal>
          </header>

          {/* ── 3-column compact card grid ── */}
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {layers.map((layer, index) => (
              <CompactThreatCard
                key={layer.id}
                layer={layer}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          {/* ── Slim convergence bar ── */}
          <Reveal delay={0.1} distance={16} amount={0.4}>
            <div className="mx-auto mt-7 flex max-w-sm flex-col items-center gap-3">
              {/* Animated rail */}
              <div
                className="relative h-px w-full overflow-hidden rounded-full"
                style={{
                  background: `linear-gradient(to right, ${BLUE}44, ${TEAL}55, ${GREEN}44)`,
                }}
              >
                {!reducedMotion && (
                  <motion.span
                    aria-hidden
                    className="absolute top-0 h-full w-16 rounded-full"
                    style={{
                      background: `linear-gradient(to right, transparent, ${TEAL}, transparent)`,
                      filter: "blur(1px)",
                    }}
                    animate={{ left: ["-15%", "110%"] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.6,
                    }}
                  />
                )}
              </div>

              {/* Badge + outcome on one line */}
              <div
                className="inline-flex items-center gap-3 rounded-full border px-5 py-2"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)",
                  borderColor: `${BLUE}44`,
                  boxShadow: `0 0 0 1px ${BLUE}1a, 0 4px 16px -4px ${BLUE}28`,
                }}
              >
                {/* <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="size-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  style={{ color: BLUE }}
                >
                  <path d="M5 6l7 6-7 6M19 6l-7 6 7 6" opacity={0.8} />
                  <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
                </svg> */}
                <span
                  className="text-sm font-semibold text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {badge}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[9pt] font-semibold uppercase"
                  style={{
                    background: `${GREEN}12`,
                    color: GREEN,
                    letterSpacing: "0.07em",
                    border: `1px solid ${GREEN}33`,
                  }}
                >
                  {outcome}
                </span>
              </div>
            </div>
          </Reveal>

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

"use client";

import { useReducedMotion } from "framer-motion";
import { useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { TriCureCard } from "@/features/technology/components/TriCureCard";
import { TriCureFlow } from "@/features/technology/components/TriCureFlow";
import { technologyContent } from "@/features/technology/content";

/**
 * Chapter 4 — "Powered by TriCure™ Technology".
 * Centered header, three sequentially-revealed glass cards for the pollutant
 * categories, then an animated connector that funnels them into the central
 * TriCure™ badge and on to "Cleaner Indoor Air". Communicates trust through
 * clarity rather than technical density.
 */
export function TechnologySection() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { eyebrow, heading, supporting, layers, badge, outcome, closing } =
    technologyContent;

  return (
    <>
      {/* Story bridge — clean particles dissolve into a calmer laboratory atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none relative h-[clamp(3.5rem,8vh,5.5rem)] overflow-hidden bg-background"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(180, 230, 215, 0.12) 0%, rgba(120, 210, 185, 0.04) 35%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(120, 210, 185, 0.18) 0%, transparent 70%)",
          }}
        />
      </div>

      <section
        id="technology"
        aria-labelledby="technology-heading"
        className="relative bg-background pb-section pt-section-sm"
      >
        <div className="px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
          <header className="mx-auto max-w-3xl text-center">
            <Reveal delay={0} distance={20}>
              <p className="text-eyebrow uppercase text-brand-blue">{eyebrow}</p>
            </Reveal>

            <Reveal delay={0.12} distance={24}>
              <h2
                id="technology-heading"
                className="mt-4 font-heading text-h2 text-foreground sm:mt-5"
              >
                {heading}
              </h2>
            </Reveal>

            <Reveal delay={0.26} distance={20}>
              <p className="mx-auto mt-4 max-w-2xl text-body-lg text-muted-foreground sm:mt-5">
                {supporting}
              </p>
            </Reveal>
          </header>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-7 lg:mt-16 lg:gap-8">
            {layers.map((layer, index) => (
              <TriCureCard
                key={layer.id}
                layer={layer}
                index={index}
                isActive={activeIndex === index}
                reducedMotion={reducedMotion}
                onActivate={() => setActiveIndex(index)}
                onDeactivate={() => setActiveIndex(null)}
              />
            ))}
          </div>

          <TriCureFlow
            activeIndex={activeIndex}
            count={layers.length}
            badge={badge}
            outcome={outcome}
            reducedMotion={reducedMotion}
          />

          <Reveal delay={0.2} distance={20} amount={0.5}>
            <p className="mx-auto mt-14 max-w-2xl text-center text-body-lg text-muted-foreground lg:mt-16">
              {closing}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

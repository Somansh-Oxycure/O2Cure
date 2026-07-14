"use client";

import { Reveal } from "@/components/motion/Reveal";
import { RecognitionStrip } from "@/features/trust/components/RecognitionStrip";
import { recognitionMetrics } from "@/features/trust/content";

/**
 * Standalone metrics / numbers section — sits between the environment
 * chapter and the trust section so the impact figures land right after
 * the environmental narrative peaks.
 */
export function MetricsSection() {
  return (
    <section
      id="metrics"
      aria-labelledby="metrics-heading"
      className="relative bg-background py-section-sm"
    >
      {/* Subtle top rule */}
      <div
        aria-hidden
        className="mx-auto mb-12 max-w-6xl px-5 sm:mb-14 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      </div>

      {/* Header */}
      <div className="mx-auto mb-10 max-w-6xl px-5 text-center sm:mb-12 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        <Reveal delay={0} distance={16}>
          <p className="text-eyebrow uppercase tracking-widest text-brand-green">
            Our Impact
          </p>
        </Reveal>
        <Reveal delay={0.1} distance={20}>
          <h2
            id="metrics-heading"
            className="mt-3 font-heading text-h2 font-semibold tracking-tight text-foreground sm:mt-4"
          >
            Numbers That Speak for Themselves
          </h2>
        </Reveal>
        <Reveal delay={0.2} distance={18}>
          <p className="mx-auto mt-3 max-w-xl text-body-lg text-muted-foreground sm:mt-4">
            Over a decade of clean-air innovation, measured in real outcomes.
          </p>
        </Reveal>
      </div>

      <RecognitionStrip metrics={recognitionMetrics} />

      {/* Subtle bottom rule */}
      <div
        aria-hidden
        className="mx-auto mt-12 max-w-6xl px-5 sm:mt-14 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      </div>
    </section>
  );
}

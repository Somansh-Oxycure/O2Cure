"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CertificationBadges } from "@/features/trust/components/CertificationBadges";
import { LogoWall } from "@/features/trust/components/LogoWall";
import { TestimonialsPreview } from "@/features/trust/components/TestimonialsPreview";
import {
  certifications,
  clientLogos,
  testimonials,
  trustContent,
} from "@/features/trust/content";

/**
 * Chapter 6 — trust and credibility.
 * Story bridge: product stage softens into a calm white field with
 * dissolving clean-air particles before the credibility content appears.
 */
export function TrustSection() {
  return (
    <>
      {/* Story bridge — stage fades, lighting softens, particles dissolve */}
      <div
        aria-hidden
        className="pointer-events-none relative h-[clamp(3.5rem,8vh,5.5rem)] overflow-hidden bg-background"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.55) 0%, rgba(248, 252, 251, 0.35) 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-full opacity-35"
          style={{
            background:
              "radial-gradient(ellipse 75% 100% at 50% 0%, rgba(180, 230, 215, 0.12) 0%, transparent 68%)",
          }}
        />
        {/* Floating clean-air particle motes */}
        <div className="absolute inset-0">
          <span className="absolute left-[18%] top-[28%] size-1 rounded-full bg-brand-green/25 blur-[0.5px]" />
          <span className="absolute left-[42%] top-[18%] size-1.5 rounded-full bg-brand-blue/20 blur-[0.5px]" />
          <span className="absolute left-[62%] top-[32%] size-1 rounded-full bg-brand-green/20 blur-[0.5px]" />
          <span className="absolute left-[78%] top-[22%] size-1 rounded-full bg-brand-blue/15 blur-[0.5px]" />
        </div>
      </div>

      <section
        id="trust"
        aria-labelledby="trust-heading"
        className="relative bg-background pb-section pt-section-sm"
      >
        <div className="px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
          {/* ── Header ── */}
          <header className="mx-auto max-w-5xl text-center">
            <Reveal delay={0} distance={20}>
              <p className="text-eyebrow uppercase text-brand-blue">
                {trustContent.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.12} distance={24}>
              <h2
                id="trust-heading"
                className="mt-4 font-heading text-h2 text-foreground sm:mt-5"
              >
                {trustContent.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.26} distance={20}>
              <p className="mx-auto mt-4 max-w-2xl text-body-lg text-muted-foreground sm:mt-5">
                {trustContent.supporting}
              </p>
            </Reveal>
          </header>

          {/* ── Logo Marquee ── */}
          <div className="mt-14 sm:mt-16 lg:mt-20">
            <LogoWall logos={clientLogos} />
          </div>

          {/* ── Testimonials ── */}
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <TestimonialsPreview testimonials={testimonials} />
          </div>

          {/* ── Certifications ── */}
          <div className="mt-14 sm:mt-16 lg:mt-20">
            <Reveal delay={0.06} distance={14} amount={0.3}>
              <div className="mx-auto max-w-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
                  <p className="text-eyebrow font-semibold uppercase tracking-widest text-muted-foreground text-xs">
                    Certified &amp; Compliant
                  </p>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
                </div>
                <CertificationBadges certifications={certifications} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

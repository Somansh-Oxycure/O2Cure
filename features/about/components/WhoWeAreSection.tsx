"use client";

import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { whoWeAreContent } from "@/features/about/content";

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

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,6vw,8rem)]">

        {/* ── Section Header ── */}
        <div className="text-center mb-16 sm:mb-20">
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
            <h2 className="font-heading text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]">
              {whoWeAreContent.heading}
            </h2>
          </Reveal>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Text */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            {whoWeAreContent.paragraphs.map((para, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1} distance={20}>
                <p className="text-base sm:text-[1.0625rem] leading-relaxed text-muted-foreground">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Right — Images */}
          <div className="relative order-1 lg:order-2">
            <Reveal delay={0.1} distance={28}>
              <div className="relative">
                {/* Main building image */}
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

                {/* Floating lifestyle image — overlapping bottom-left */}
                <div
                  className="absolute -bottom-6 -left-6 w-2/5 rounded-xl overflow-hidden shadow-[0_12px_40px_-8px_rgba(0,0,0,0.28)] border-4 border-white aspect-square"
                  aria-hidden
                >
                  <Image
                    src={whoWeAreContent.lifestyleImageSrc}
                    alt={whoWeAreContent.lifestyleImageAlt}
                    fill
                    quality={80}
                    className="object-cover object-center"
                    sizes="20vw"
                    loading="lazy"
                  />
                </div>

                {/* Small brand badge */}
                <div
                  className="absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green shadow-[0_8px_24px_-4px_rgba(58,125,42,0.45)]"
                  aria-hidden
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2" />
                    <path d="M12.59 19.41A2 2 0 1 0 14 16H2" />
                    <path d="M17.59 11.41A2 2 0 1 1 19 8H2" />
                  </svg>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

    </section>
  );
}


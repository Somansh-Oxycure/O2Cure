"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { awards, awardsContent } from "@/features/about/content";
import type { AwardItem } from "@/features/about/types";

// ─── External link icon ───────────────────────────────────────────────────────
function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Award Card ───────────────────────────────────────────────────────────────
function AwardCard({ award, index }: { award: AwardItem; index: number }) {
  return (
    <Reveal delay={0.08 * index} distance={24} amount={0.15}>
      <article
        id={award.id}
        aria-labelledby={`${award.id}-title`}
        className="group relative flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.14)]"
      >
        {/* Badge image */}
        <div className="relative h-20 w-auto self-start">
          <Image
            src={award.badgeSrc}
            alt={award.badgeAlt}
            width={award.badgeWidth}
            height={award.badgeHeight}
            className="h-20 w-auto object-contain object-left"
            loading="lazy"
          />
        </div>

        {/* Award title */}
        <h3
          id={`${award.id}-title`}
          className="font-heading text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] font-semibold leading-snug tracking-[-0.01em] text-[#0A0A0A]"
        >
          {award.title}
        </h3>

        {/* Description */}
        <p className="flex-1 text-sm sm:text-[0.9375rem] leading-relaxed text-muted-foreground">
          {award.description}
        </p>

        {/* Read More */}
        <Link
          href={award.readMoreHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read more about the ${award.title} award (opens in a new tab)`}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-brand-green transition-colors duration-200 hover:text-brand-green-hover group/link"
        >
          <span>Read More</span>
          <span className="translate-x-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
            <ExternalLinkIcon />
          </span>
        </Link>

        {/* Hover accent line */}
        <span
          aria-hidden
          className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-brand-green/0 via-brand-green/40 to-brand-green/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </article>
    </Reveal>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function AwardsSection() {
  return (
    <section
      id="awards-recognitions"
      aria-labelledby="awards-heading"
      className="relative bg-[#f5f5f4] py-[clamp(4rem,6vw,8rem)]"
    >
      {/* Subtle radial glow behind the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(58,125,42,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">

        {/* ── Section Header ── */}
        <div className="text-center mb-14 sm:mb-18">
          <Reveal delay={0} distance={16}>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/35" aria-hidden />
              <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
                {awardsContent.eyebrow}
              </span>
              <span className="h-px w-10 bg-brand-green/35" aria-hidden />
            </div>
          </Reveal>
          <Reveal delay={0.1} distance={22}>
            <h2
              id="awards-heading"
              className="font-heading text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]"
            >
              {awardsContent.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.2} distance={18}>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted-foreground">
              {awardsContent.supporting}
            </p>
          </Reveal>
        </div>

        {/* ── Awards Grid ── */}
        {/*
          Layout: 3 cards on top row, 2 centred on bottom row.
          Mobile: single column stack.
          Tablet: 2 columns.
          Desktop: 3 columns with a centred 2-card second row.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First 3 awards fill the top row */}
          {awards.slice(0, 3).map((award, i) => (
            <AwardCard key={award.id} award={award} index={i} />
          ))}
        </div>

        {/* Bottom row — 2 cards centred on desktop */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:mx-auto lg:max-w-[calc(66.666%+1rem)]">
          {awards.slice(3).map((award, i) => (
            <AwardCard key={award.id} award={award} index={3 + i} />
          ))}
        </div>
      </div>

      {/* Bottom gradient bridge */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}

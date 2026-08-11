/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { awards, awardsContent } from "@/features/about/content";
import type { AwardItem } from "@/features/about/types";
import { formatBrandText } from "@/lib/brand";

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

// ─── Award Card (shared between grid and carousel) ─────────────────────────────
function AwardCard({
  award,
  index,
  compact = false,
}: {
  award: AwardItem;
  index: number;
  compact?: boolean;
}) {
  const card = (
    <article
      id={award.id}
      aria-labelledby={`${award.id}-title`}
      className={`group relative flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.14)] ${
        compact ? "p-5" : "p-6 sm:p-8"
      }`}
    >
      {/* Badge image */}
      <div className={`relative self-start ${compact ? "h-14" : "h-20"} w-auto`}>
        <Image
          src={award.badgeSrc}
          alt={award.badgeAlt}
          width={award.badgeWidth}
          height={award.badgeHeight}
          className={`${compact ? "h-14" : "h-20"} w-auto object-contain object-left`}
          loading="lazy"
        />
      </div>

      {/* Award title */}
      <h3
        id={`${award.id}-title`}
        className={`font-heading font-semibold leading-snug tracking-[-0.01em] text-[#0A0A0A] ${
          compact ? "text-[0.9375rem]" : "text-[clamp(1rem,0.9rem+0.5vw,1.25rem)]"
        }`}
      >
        {formatBrandText(award.title)}
      </h3>

      {/* Description */}
      <p className={`flex-1 leading-relaxed text-muted-foreground ${compact ? "text-[0.8125rem]" : "text-sm sm:text-[0.9375rem]"}`}>
        {formatBrandText(award.description)}
      </p>

      {/* Read More */}
      <Link
        href={award.readMoreHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read more about the ${award.title} award (opens in a new tab)`}
        className="inline-flex min-h-[44px] items-center gap-1.5 self-start text-[0.8125rem] font-semibold text-brand-green transition-colors duration-200 hover:text-brand-green-hover group/link"
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
  );

  return card;
}

// ─── Desktop grid award card (with Reveal) ────────────────────────────────────
function AwardCardReveal({ award, index }: { award: AwardItem; index: number }) {
  return (
    <Reveal delay={0.08 * index} distance={24} amount={0.15}>
      <AwardCard award={award} index={index} />
    </Reveal>
  );
}

// ─── Dot indicator ────────────────────────────────────────────────────────────
function DotIndicator({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-5" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="block rounded-full transition-all duration-300"
          style={{
            width:  i === active ? "20px" : "6px",
            height: "6px",
            background: i === active ? "var(--brand-green)" : "var(--border)",
            opacity: i === active ? 1 : 0.5,
          }}
        />
      ))}
    </div>
  );
}

// ─── Mobile carousel ──────────────────────────────────────────────────────────
/**
 * Horizontal snap-scroll carousel for mobile.
 * - scroll-snap-type: x mandatory
 * - Each card: scroll-snap-align: start, min-width: 78vw (peek card visible)
 * - no-scrollbar utility hides scrollbar chrome
 * - IntersectionObserver drives the dot indicator
 */
function AwardsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const containerLeft = container.getBoundingClientRect().left;
    let closest = 0;
    let closestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const dist = Math.abs(card.getBoundingClientRect().left - containerLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      {/* Carousel track */}
      <div
        ref={scrollRef}
        role="list"
        aria-label="Awards and recognitions"
        className="no-scrollbar flex gap-4 overflow-x-auto"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          /* Padding ensures the last card can snap to start and peek the edge */
          paddingLeft:  "20px",
          paddingRight: "20px",
        }}
      >
        {awards.map((award, i) => (
          <div
            key={award.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            role="listitem"
            style={{
              scrollSnapAlign: "start",
              minWidth: "78vw",
              maxWidth: "78vw",
              flexShrink: 0,
            }}
          >
            <AwardCard award={award} index={i} compact />
          </div>
        ))}

        {/* Right padding sentinel — keeps last card from snapping flush to edge */}
        <div style={{ minWidth: "4px", flexShrink: 0 }} aria-hidden />
      </div>

      {/* Dot indicator */}
      <DotIndicator total={awards.length} active={activeIndex} />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function AwardsSection() {
  return (
    <section
      id="awards-recognitions"
      aria-labelledby="awards-heading"
      className="relative bg-[#f5f5f4] py-[clamp(3.5rem,6vw,8rem)]"
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(58,125,42,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Section Header ── */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        <div className="text-center mb-10 sm:mb-14 lg:mb-18">
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
              className="font-heading text-[clamp(1.6rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]"
            >
              {formatBrandText(awardsContent.heading)}
            </h2>
          </Reveal>
          <Reveal delay={0.2} distance={18}>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted-foreground">
              {formatBrandText(awardsContent.supporting)}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Mobile carousel (< sm) ── */}
      <div className="sm:hidden">
        <Reveal delay={0.1} distance={20} amount={0.1}>
          <AwardsCarousel />
        </Reveal>
      </div>

      {/* ── Desktop grid (sm+) — unchanged ── */}
      <div className="hidden sm:block relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.slice(0, 3).map((award, i) => (
            <AwardCardReveal key={award.id} award={award} index={i} />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 lg:mx-auto lg:max-w-[calc(66.666%+1rem)]">
          {awards.slice(3).map((award, i) => (
            <AwardCardReveal key={award.id} award={award} index={3 + i} />
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

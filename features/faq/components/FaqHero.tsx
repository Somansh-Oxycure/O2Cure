"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useCallback, useRef } from "react";

import { Reveal } from "@/components/motion/Reveal";

interface FaqHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalQuestions: number;
}

/**
 * FAQ page hero.
 *
 * Matches homepage section heading style exactly:
 * - Eyebrow: text-eyebrow tracking-[0.15em] brand-green with flanking h-px w-10 lines
 * - H1: clamp(1.75rem,1.4rem+2vw,3rem) font-bold leading-[1.1] tracking-[-0.022em]
 * - Supporting copy: text-body-lg text-muted-foreground
 * - Search bar: pill-shaped, ring brand-green, magnifier icon, live clear button
 */
export function FaqHero({ searchQuery, onSearchChange, totalQuestions }: FaqHeroProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = useCallback(() => {
    onSearchChange("");
    inputRef.current?.focus();
  }, [onSearchChange]);

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-background pb-16 pt-[calc(72px+clamp(3rem,5vw,5rem))]"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Radial glow — top center */}
        <div
          className="absolute -top-24 left-1/2 h-[600px] w-[900px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(58,125,42,0.07) 0%, rgba(43,108,176,0.04) 45%, transparent 70%)",
          }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(58,125,42,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(58,125,42,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Clean-air particle motes */}
        <span className="absolute left-[12%] top-[28%] size-1.5 rounded-full bg-brand-green/20 blur-[0.5px]" />
        <span className="absolute left-[28%] top-[18%] size-1 rounded-full bg-brand-blue/15 blur-[0.5px]" />
        <span className="absolute left-[68%] top-[22%] size-1.5 rounded-full bg-brand-green/15 blur-[0.5px]" />
        <span className="absolute left-[82%] top-[35%] size-1 rounded-full bg-brand-blue/20 blur-[0.5px]" />
        <span className="absolute left-[46%] top-[8%] size-2 rounded-full bg-brand-green/10 blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        {/* Eyebrow — identical to homepage pattern */}
        <Reveal delay={0} distance={16}>
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/35" />
            <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
              Knowledge Base
            </span>
            <span className="h-px w-10 bg-brand-green/35" />
          </div>
        </Reveal>

        {/* H1 — matching homepage heading token exactly */}
        <Reveal delay={0.1} distance={24}>
          <h1
            id="faq-heading"
            className="font-heading text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]"
          >
            Every question,{" "}
            <span className="text-brand-green">answered.</span>
          </h1>
        </Reveal>

        {/* Supporting copy */}
        <Reveal delay={0.2} distance={20}>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg leading-relaxed text-muted-foreground">
            Science-backed answers to help you make a confident, informed
            decision — for your home, facility, or enterprise.
          </p>
        </Reveal>

        {/* Question count pill */}
        <Reveal delay={0.28} distance={16}>
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-accent px-3.5 py-1 text-xs font-semibold text-brand-green">
              {totalQuestions} answered questions across 5 categories
            </span>
          </div>
        </Reveal>

        {/* Search bar */}
        <Reveal delay={0.35} distance={20}>
          <div className="relative mx-auto mt-10 max-w-xl">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <div className="relative flex items-center">
              <Search
                className="pointer-events-none absolute left-4 size-[18px] text-muted-foreground/60"
                aria-hidden
              />
              <input
                ref={inputRef}
                id="faq-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search questions…"
                autoComplete="off"
                className="w-full rounded-full border border-border/70 bg-white/80 py-3.5 pl-11 pr-11 text-[0.9375rem] text-foreground shadow-soft backdrop-blur-sm placeholder:text-muted-foreground/50 focus:border-brand-green/60 focus:outline-none focus:ring-2 focus:ring-brand-green/25 transition-all duration-200"
              />
              {searchQuery && (
                <motion.button
                  type="button"
                  onClick={handleClear}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-4 flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-colors duration-150"
                  aria-label="Clear search"
                >
                  <X className="size-3" aria-hidden />
                </motion.button>
              )}
            </div>
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2.5 text-center text-xs text-muted-foreground"
              >
                Searching across all categories
              </motion.p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

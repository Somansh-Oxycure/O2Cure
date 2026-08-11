/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import {
  CATEGORIES,
  type CategoryId,
  type ClientEntry,
  clienteleHero,
  clients,
  scaleStats,
} from "@/features/clientele/content";
import { FooterSection } from "@/features/footer";

// ─────────────────────────────────────────────────────────────────────────────
// Category Filter — pill tabs matching site typography
// ─────────────────────────────────────────────────────────────────────────────
interface FilterTabsProps {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}

function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div
      className="relative"
      role="tablist"
      aria-label="Filter clients by sector"
    >
      {/* Horizontal scroll on mobile */}
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls="client-grid"
              onClick={() => onChange(cat.id as CategoryId)}
              className={[
                "relative shrink-0 rounded-full px-4 py-2 text-[0.78rem] font-semibold transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
                isActive
                  ? "bg-brand-green text-white shadow-[0_2px_12px_-4px_rgba(58,125,42,0.45)]"
                  : "bg-white/80 text-muted-foreground border border-border hover:border-brand-green/30 hover:text-foreground",
              ].join(" ")}
            >
              {cat.label}
              <span
                className={[
                  "ml-1.5 rounded-full px-1.5 py-0.5 text-[0.63rem] font-bold",
                  isActive
                    ? "bg-white/25 text-white"
                    : "bg-muted text-muted-foreground",
                ].join(" ")}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile right-edge fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background to-transparent sm:hidden"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Single logo card — full colour, no filter, larger logo, no name overlay
// ─────────────────────────────────────────────────────────────────────────────
function LogoCard({
  client,
  index,
}: {
  client: ClientEntry;
  index: number;
}) {
  const prefersReduced = useReducedMotion();

  // ── Residence text card (no logo available) ─────────────────────────────
  if (client.category === "residences") {
    return (
      <motion.div
        layout
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
        transition={{
          duration: 0.38,
          delay: Math.min(index * 0.022, 0.55),
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group relative flex flex-col items-center justify-center rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-brand-green/30 hover:shadow-[0_4px_20px_-6px_rgba(58,125,42,0.22)]"
        style={{
          background: "linear-gradient(135deg, #f0faf0 0%, #f8fcf8 50%, #ffffff 100%)",
          minHeight: "110px",
          padding: "1.25rem 1rem",
        }}
      >
        {/* Subtle decorative arc in corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #3A7D2A 0%, transparent 70%)" }}
        />

        {/* Small home icon — decorative only */}
        <span
          aria-hidden
          className="mb-2 text-[1.1rem] select-none opacity-40"
        >
          🏠
        </span>

        {/* Name — always visible */}
        <span className="text-center text-[0.82rem] font-semibold leading-snug text-[#1a2e1a]">
          {client.name}
        </span>

        {/* Label */}
        {client.sector ? (
          <span className="mt-1.5 text-center text-[0.7rem] font-medium leading-snug text-muted-foreground">
            {client.sector}
          </span>
        ) : (
          <span className="mt-1.5 text-[0.6rem] font-semibold tracking-[0.12em] text-brand-green uppercase opacity-70">
            Residence
          </span>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * 0.022, 0.55),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex items-center justify-center rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:border-brand-green/25 hover:shadow-[0_4px_20px_-6px_rgba(58,125,42,0.18)] sm:p-6 overflow-hidden"
    >
      <div className="relative flex h-16 w-full items-center justify-center sm:h-20 transition-all duration-300 group-hover:scale-95 group-hover:opacity-15">
        <Image
          src={client.src}
          alt={`${client.name} logo`}
          width={160}
          height={64}
          className="max-h-16 w-auto max-w-[130px] object-contain sm:max-h-20 sm:max-w-[150px]"
          style={client.scale ? { transform: `scale(${client.scale})` } : undefined}
          loading="lazy"
          unoptimized
        />
      </div>

      {/* Hover Overlay for Client Name */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-center text-[0.85rem] font-semibold leading-tight text-foreground">
          {client.name}
        </span>
        {client.sector && (
          <span className="mt-1 text-center text-[0.7rem] font-medium tracking-wide text-brand-green uppercase">
            {client.sector}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 700+ scale dot-matrix visualiser (light, matches site palette)
// ─────────────────────────────────────────────────────────────────────────────
function ScaleVisualiser() {
  const total = 700;
  const highlighted = clients.length;
  const remaining = total - highlighted;

  const dots = useMemo(
    () =>
      Array.from({ length: total }, (_, i) => i < highlighted),
    [highlighted]
  );

  return (
    <div className="mt-20 overflow-hidden rounded-3xl border border-border bg-white p-8 sm:p-10 lg:p-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-green/35" />
            <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
              Scale at a Glance
            </span>
            <span className="h-px w-8 bg-brand-green/35" />
          </div>
          <h2 className="font-heading text-[clamp(1.4rem,1.1rem+1.5vw,2rem)] font-bold leading-[1.15] tracking-[-0.022em] text-[#0A0A0A]">
            700+ Enterprise Installations Nationwide
          </h2>
          <p className="mt-2 max-w-md text-[0.875rem] leading-[1.65] text-muted-foreground">
            Each dot is one O₂Cure enterprise deployment.{" "}
            <span className="font-semibold text-brand-green">
              {highlighted} named partners
            </span>{" "}
            — the rest are additional enterprise clients.
          </p>
        </div>

        {/* Legend */}
        <div className="flex shrink-0 flex-col gap-2 text-[0.72rem] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-green" />
            Named Partners ({highlighted})
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D1D5DB]" />
            Other Installations ({remaining})
          </div>
        </div>
      </div>

      {/* Dot grid */}
      <div
        className="flex flex-wrap gap-[5px]"
        role="img"
        aria-label="700 installation dots, 117 highlighted as named partner installations"
      >
        {dots.map((lit, i) => (
          <span
            key={i}
            className="h-[7px] w-[7px] rounded-full"
            style={{ backgroundColor: lit ? "#3A7D2A" : "#E5E7EB" }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats strip — matches the MetricsSection pattern
// ─────────────────────────────────────────────────────────────────────────────
function StatsStrip() {
  return (
    <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
      {scaleStats.map((s) => (
        <div
          key={s.label}
          className="bg-white px-6 py-6 text-center sm:py-8"
        >
          <p className="font-heading text-[1.75rem] font-black leading-none tracking-[-0.03em] text-[#0A0A0A] sm:text-[2.25rem]">
            {s.value}
          </p>
          <p className="mt-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — light background, matches homepage heading structure exactly
// ─────────────────────────────────────────────────────────────────────────────
function ClienteleHero() {
  return (
    <section
      className="relative overflow-hidden bg-background pt-20 pb-6 sm:pt-28 sm:pb-8"
      aria-labelledby="clientele-hero-heading"
    >
      {/* Subtle radial tint — same technique as homepage trust section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(43,108,176,0.055) 0%, rgba(58,125,42,0.04) 50%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8 lg:px-12">
        {/* Eyebrow — identical pattern to ClienteleSection on homepage */}
        <Reveal delay={0} distance={16}>
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/35" />
            <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
              {clienteleHero.eyebrow}
            </span>
            <span className="h-px w-10 bg-brand-green/35" />
          </div>
        </Reveal>

        {/* H1 — matches homepage heading size tokens */}
        <Reveal delay={0.1} distance={24}>
          <h1
            id="clientele-hero-heading"
            className="font-heading text-[clamp(1.8rem,1.5rem+2.5vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.03em] text-[#0A0A0A]"
          >
            Trusted by India's <span className="text-brand-green">Most Demanding</span> Environments.
          </h1>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={0.35} distance={14}>
          <StatsStrip />
        </Reveal>
      </div>

      {/* Transition gradient into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Client grid section
// ─────────────────────────────────────────────────────────────────────────────
function ClientGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return clients;
    return clients.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const handleFilter = useCallback((id: CategoryId) => {
    setActiveCategory(id);
  }, []);

  return (
    <section
      className="bg-background py-4 sm:py-8"
      aria-label="Verified Partners"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Removed section header to save space */}

        {/* Filter tabs */}
        <Reveal delay={0.12} distance={14}>
          <div className="mb-6">
            <FilterTabs active={activeCategory} onChange={handleFilter} />
          </div>
        </Reveal>

        {/* Count indicator */}
        <div className="mb-6">
          <p
            className="text-[0.78rem] font-medium text-muted-foreground"
            aria-live="polite"
            aria-atomic="true"
          >
            Showing{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "partner" : "partners"}
            {activeCategory !== "all" && (
              <>
                {" "}in{" "}
                <span className="text-brand-green font-semibold">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Logo grid with animated transitions */}
        <div
          id="client-grid"
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory}`}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((client, i) => (
              <LogoCard key={client.id} client={client} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Scale visualiser — only in "all" view */}
        {activeCategory === "all" && (
          <Reveal delay={0.1} distance={20} amount={0.15}>
            <ScaleVisualiser />
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA banner — light, matches homepage contact section feel
// ─────────────────────────────────────────────────────────────────────────────
function ClienteleCTA() {
  return (
    <section
      className="bg-background pb-24 sm:pb-32"
      aria-labelledby="clientele-cta-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-3xl border border-border bg-white p-10 sm:p-14 lg:p-16">
          {/* Layout: centred on mobile, 2-col on lg */}
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Copy */}
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-brand-green/35" />
                <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
                  Partner with O₂Cure
                </span>
              </div>
              <h2
                id="clientele-cta-heading"
                className="font-heading text-[clamp(1.75rem,1.4rem+2vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#0A0A0A]"
              >
                Join India's Most Trusted Air Quality Network.
              </h2>
              <p className="mt-4 text-[0.95rem] leading-[1.7] text-muted-foreground">
                Whether you're building a hospital, a corporate campus, or a five-star property — our team will design the right air quality solution for your environment.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <a
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-brand-green px-8 text-[0.875rem] font-semibold text-white shadow-[0_4px_20px_-4px_rgba(58,125,42,0.4)] transition-all duration-300 hover:bg-brand-green-hover hover:shadow-[0_6px_28px_-4px_rgba(58,125,42,0.5)]"
              >
                Request a Consultation
              </a>
              <a
                href="/solutions"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-[0.875rem] font-semibold text-foreground transition-all duration-300 hover:border-brand-green/40 hover:text-brand-green"
              >
                Explore Solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page root
// ─────────────────────────────────────────────────────────────────────────────
export function ClientelePage() {
  return (
    <main>
      <ClienteleHero />
      <ClientGrid />
      <ClienteleCTA />
      <FooterSection />
    </main>
  );
}

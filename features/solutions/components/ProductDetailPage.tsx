"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Wind, Shield, Zap, Activity, Droplets, Cpu, Wifi, Wrench,
  Filter, Thermometer, Leaf, Eye, Radio, Layers, Settings,
  Lock, Sun, RefreshCw, ArrowLeft, CheckCircle, ChevronRight,
  MessageCircle, Download, Star, MapPin,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import type { ProductDetail } from "@/features/solutions/data/productDetailData";
import type { ProductEntry } from "@/features/solutions/data/productCatalog";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  wind: Wind, shield: Shield, zap: Zap, activity: Activity,
  droplets: Droplets, cpu: Cpu, wifi: Wifi, wrench: Wrench,
  filter: Filter, thermometer: Thermometer, leaf: Leaf, eye: Eye,
  radio: Radio, layers: Layers, settings: Settings, lock: Lock,
  sun: Sun, "refresh-cw": RefreshCw,
};

function CapabilityIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Shield;
  return <Icon className={className} />;
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProductDetailPageProps {
  detail: ProductDetail;
  entry: ProductEntry;
}

export function ProductDetailPage({ detail, entry }: ProductDetailPageProps) {
  return (
    <main id="pdp-main" className="flex flex-col min-h-screen bg-[#F5F5F4]">
      {/* 1 ── Hero */}
      <PDPHero detail={detail} entry={entry} />

      {/* 2 ── Contaminant Strip */}
      <PDPContaminantStrip contaminants={detail.contaminantsCleared} />

      {/* 3 ── Overview + Capabilities */}
      <PDPCapabilities detail={detail} />

      {/* 4 ── Performance Metrics */}
      <PDPMetrics metrics={detail.performanceMetrics} />

      {/* 5 ── Specs Table */}
      <PDPSpecs specs={detail.specs} certifications={detail.certifications} />

      {/* 6 ── Applications */}
      <PDPApplications applications={detail.applications} />

      {/* 7 ── Reviews (if available) */}
      {detail.reviews && detail.reviews.length > 0 && (
        <PDPReviews reviews={detail.reviews} />
      )}

      {/* 8 ── CTA */}
      <PDPCTA detail={detail} entry={entry} />
    </main>
  );
}

// ─── 1. Hero ──────────────────────────────────────────────────────────────────

function PDPHero({ detail, entry }: { detail: ProductDetail; entry: ProductEntry }) {
  const metric = detail.performanceMetrics[0];
  const metric2 = detail.performanceMetrics[1];

  return (
    <section
      className="relative w-full min-h-[100svh] overflow-hidden flex flex-col items-center justify-center pt-20"
      aria-label="Product hero"
    >
      {/* Two-tone split bg — matches live site palette exactly */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex flex-col">
        <div className="w-full h-[65%] bg-[#dfdfdd]" />
        <div className="w-full h-[35%] bg-[#d2d2d0] shadow-[inset_0_20px_40px_rgba(0,0,0,0.05)] border-t border-black/5" />
      </div>

      {/* Back link */}
      <div className="absolute top-24 left-4 md:left-8 z-30">
        <Link
          href="/solutions"
          className="flex items-center gap-1.5 text-xs font-medium text-[#1C1C1C]/50 hover:text-[#1C1C1C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Solutions
        </Link>
      </div>

      {/* Large wordmark behind product */}
      <div className="absolute top-[18%] left-0 w-full text-center z-10 pointer-events-none select-none px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.06, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] leading-none font-bold text-[#1C1C1C] tracking-tighter"
        >
          {entry.systemName.split(" ")[0].toUpperCase()}
        </motion.h1>
      </div>

      {/* Product image card */}
      <div className="relative z-20 mt-10 md:mt-20 w-full max-w-4xl flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative w-[60%] sm:w-[45%] max-w-[400px] rounded-[2.5rem] border border-white/50
            bg-white/35 backdrop-blur-sm shadow-[0_40px_80px_rgba(0,0,0,0.18)] overflow-hidden p-5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entry.image.src}
            alt={entry.image.alt}
            className="w-full h-auto object-contain mix-blend-multiply rounded-[1.75rem]"
            style={{ aspectRatio: "3/4", objectFit: "contain" }}
            fetchPriority="high"
          />
        </motion.div>

        {/* Left floating stat card */}
        {metric && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="hidden sm:block absolute left-0 lg:-left-10 top-[40%] md:top-[35%] z-30"
          >
            <div className="relative p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/30
              shadow-[0_8px_32px_rgba(0,0,0,0.1)] w-[220px] lg:w-[260px]">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <ChevronRight className="w-4 h-4 text-[#1C1C1C]" />
              </div>
              <p className="text-2xl font-bold text-[#1C1C1C] leading-tight">{metric.value}</p>
              <p className="text-xs text-[#1C1C1C]/60 mt-1 leading-relaxed">{metric.label}</p>
            </div>
          </motion.div>
        )}

        {/* Right floating stat card */}
        {metric2 && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="hidden sm:block absolute right-0 lg:-right-10 top-[55%] md:top-[50%] z-30"
          >
            <div className="relative p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/30
              shadow-[0_8px_32px_rgba(0,0,0,0.1)] w-[220px] lg:w-[260px]">
              <p className="text-2xl font-bold text-[#1C1C1C] leading-tight">{metric2.value}</p>
              <p className="text-xs text-[#1C1C1C]/60 mt-1 leading-relaxed">{metric2.label}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom row */}
      <div className="absolute bottom-8 left-0 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-20">
        {/* Name + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="max-w-md"
        >
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#1C1C1C]/40 mb-1">
            {entry.customerType === "b2c" ? "For Home & Personal Use" : entry.customerType === "b2b" ? "Business & Institutional" : "Universal Application"}
          </p>
          <h2 className="text-lg md:text-xl font-bold text-[#1C1C1C] leading-tight tracking-tight">
            {entry.systemName}
          </h2>
          <p className="mt-1 text-sm text-[#1C1C1C]/60 leading-relaxed max-w-[320px]">
            {detail.heroHeadline}
          </p>
        </motion.div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="flex flex-wrap md:justify-end gap-2 max-w-[300px]"
        >
          {detail.certifications.slice(0, 4).map((cert) => (
            <span
              key={cert}
              className="px-3 py-1.5 rounded-full border border-[#1C1C1C]/15 text-[#1C1C1C]/60 text-[0.65rem] font-medium backdrop-blur-sm"
            >
              {cert}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. Contaminant Strip ─────────────────────────────────────────────────────

function PDPContaminantStrip({ contaminants }: { contaminants: string[] }) {
  return (
    <section className="bg-[#1C1C1C] py-10 border-t border-white/5" aria-label="Contaminants cleared">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/40 mr-2">
            Built to clear
          </span>
          {contaminants.map((c) => (
            <span
              key={c}
              className="text-sm text-white/70 border border-white/10 rounded-full px-4 py-1.5"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. Capabilities ──────────────────────────────────────────────────────────

function PDPCapabilities({ detail }: { detail: ProductDetail }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-[#F5F5F4]"
      aria-labelledby="capabilities-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#3A7D2A] mb-4">
            What it does
          </p>
          <h2
            id="capabilities-heading"
            className="font-semibold text-3xl md:text-5xl text-[#1C1C1C] leading-[1.1] tracking-tight text-balance mb-6"
          >
            Built to perform where air quality matters most.
          </h2>
          <p className="text-base md:text-lg text-[#6B7280] leading-relaxed max-w-2xl">
            {detail.overview}
          </p>
        </motion.div>

        {/* Capability cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {detail.capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.08 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center mt-0.5">
                <CapabilityIcon name={cap.icon} className="w-5 h-5 text-[#3A7D2A]" />
              </div>
              <div>
                <h3 className="font-semibold text-[1rem] text-[#1C1C1C] mb-1.5 leading-snug">
                  {cap.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. Performance Metrics ───────────────────────────────────────────────────

function PDPMetrics({ metrics }: { metrics: { value: string; label: string }[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-[#1C1C1C]"
      aria-labelledby="metrics-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#3A7D2A] mb-12"
        >
          Performance at a glance
        </motion.p>
        <h2 id="metrics-heading" className="sr-only">Performance metrics</h2>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i }}
              className="border-t border-white/10 pt-6"
            >
              <dd className="font-semibold text-3xl md:text-4xl text-white tracking-tight leading-none mb-2">
                {m.value}
              </dd>
              <dt className="text-[0.75rem] text-white/40 leading-snug">{m.label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ─── 5. Specifications ────────────────────────────────────────────────────────

function PDPSpecs({ specs, certifications }: { specs: { parameter: string; value: string }[]; certifications: string[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-[#F5F5F4]"
      aria-labelledby="specs-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-14"
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#3A7D2A] mb-4">
            Specifications
          </p>
          <h2 id="specs-heading" className="font-semibold text-4xl md:text-5xl text-[#1C1C1C] tracking-tight leading-[1.1]">
            The numbers, plainly.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Specs grid */}
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
            {specs.map((spec, i) => (
              <motion.div
                key={spec.parameter}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i }}
                className="border-t border-[#E5E7EB] pt-4"
              >
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#9CA3AF] mb-2">
                  {spec.parameter}
                </dt>
                <dd className="font-mono text-[#1C1C1C] text-base leading-snug">
                  {spec.value}
                </dd>
              </motion.div>
            ))}
          </dl>

          {/* Certifications sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF] mb-4">
              Certifications
            </p>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#3A7D2A] shrink-0" />
                  <span className="text-sm text-[#1C1C1C]">{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. Applications ──────────────────────────────────────────────────────────

function PDPApplications({ applications }: { applications: string[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 md:py-20 bg-[#EAECF0]" aria-labelledby="applications-heading">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#3A7D2A] mb-3">
            Where it fits
          </p>
          <h2 id="applications-heading" className="font-semibold text-2xl md:text-3xl text-[#1C1C1C] tracking-tight mb-8 text-balance">
            Anywhere people breathe the same air for hours.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          {applications.map((app) => (
            <span
              key={app}
              className="flex items-center gap-1.5 text-sm text-[#1C1C1C] border border-[#1C1C1C]/10
                rounded-full px-4 py-2 bg-white/80 backdrop-blur-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-[#3A7D2A]" />
              {app}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 7. Reviews ───────────────────────────────────────────────────────────────

function PDPReviews({ reviews }: { reviews: { author: string; rating: number; body: string; date: string }[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#F5F5F4]" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between flex-wrap gap-6 mb-14"
        >
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#D97706] mb-4">
              Customer reviews
            </p>
            <h2 id="reviews-heading" className="font-semibold text-4xl text-[#1C1C1C] text-balance">
              Rated {avgRating.toFixed(2)} out of 5
            </h2>
          </div>
          <p className="text-[#9CA3AF] text-sm">Based on {reviews.length} verified customer {reviews.length === 1 ? "rating" : "ratings"}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={`${review.author}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.07 * i }}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-7"
            >
              <div className="flex gap-1 text-[#D97706]">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-[#1C1C1C] text-lg font-medium leading-snug">
                &ldquo;{review.body}&rdquo;
              </p>
              <p className="mt-4 text-sm text-[#9CA3AF]">
                {review.author}{" "}
                <span className="text-[#9CA3AF]/60">· Verified buyer · {review.date}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 8. CTA ───────────────────────────────────────────────────────────────────

function PDPCTA({ detail, entry }: { detail: ProductDetail; entry: ProductEntry }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { cta } = detail;

  return (
    <section ref={ref} id="buy" className="py-24 md:py-32 bg-[#EAECF0]" aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-[#1C1C1C]/8 bg-[#1C1C1C] overflow-hidden shadow-[0_24px_64px_-24px_rgba(0,0,0,0.4)] grid lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* Product image */}
          <div className="relative aspect-square lg:aspect-auto bg-white/5 min-h-[280px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.image.src}
              alt={entry.image.alt}
              className="absolute inset-0 w-full h-full object-contain p-10 mix-blend-luminosity opacity-90"
            />
          </div>

          {/* CTA content */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#3A7D2A] mb-3">
              {entry.systemName}
            </p>
            <h2
              id="cta-heading"
              className="font-semibold text-3xl sm:text-4xl text-white text-balance tracking-tight"
            >
              {cta.type === "priced"
                ? "Ready to breathe better? Order yours today."
                : "Speak to our engineering team for a custom quote."}
            </h2>
            <p className="mt-4 text-white/50 leading-relaxed max-w-md text-sm">
              {cta.type === "priced"
                ? detail.heroHeadline
                : "We size, supply and support the full installation — from site survey to AMC. Contact us for a no-obligation consultation."}
            </p>

            {/* Price (B2C only) */}
            {cta.type === "priced" && cta.price && (
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-semibold text-4xl text-white">{cta.price}</span>
                <span className="text-white/40 text-sm">incl. taxes</span>
              </div>
            )}

            {/* Manual download (B2C) */}
            {cta.manualUrl && (
              <a
                href={cta.manualUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm text-[#3A7D2A] hover:text-[#5aaa48] transition-colors w-fit"
              >
                <Download className="w-4 h-4" />
                Download user manual (PDF)
              </a>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {cta.type === "priced" && cta.productPageUrl ? (
                <a
                  href={cta.productPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center rounded-full bg-[#3A7D2A] text-white
                    font-semibold px-7 py-3.5 hover:bg-[#2A5C1D] transition-colors"
                >
                  {cta.primaryLabel}
                </a>
              ) : (
                <a
                  href="mailto:info@o2cure.in"
                  className="inline-flex justify-center items-center rounded-full bg-[#3A7D2A] text-white
                    font-semibold px-7 py-3.5 hover:bg-[#2A5C1D] transition-colors"
                >
                  {cta.primaryLabel}
                </a>
              )}

              <a
                href="https://wa.me/918010111177"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 rounded-full border border-white/20
                  text-white font-medium px-7 py-3.5 hover:border-[#3A7D2A]/60 hover:text-[#3A7D2A] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {cta.type === "priced" ? "Ask on WhatsApp" : "Speak to an Expert"}
              </a>
            </div>

            {/* Trust indicators — B2C */}
            {cta.type === "priced" && (
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { label: "Easy shipping" },
                  { label: "Best offers" },
                  { label: "Quality product" },
                  { label: "Secure payment" },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#3A7D2A]" />
                    <span className="text-xs text-white/50">{t.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Services — B2B */}
            {cta.type === "enquiry" && (
              <div className="mt-10 grid grid-cols-2 gap-3">
                {["Site Survey & Report", "Installation & Commissioning", "After-Sale Service", "AMC & Maintenance"].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3A7D2A] shrink-0" />
                    <span className="text-xs text-white/50">{s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/solutions"
            className="flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#1C1C1C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View all {" "}<span className="text-[#3A7D2A] font-semibold">26 O2Cure solutions</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

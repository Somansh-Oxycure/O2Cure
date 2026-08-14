"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ResidentialRecommendation } from "../data/mock";
import { LeadCaptureForm } from "./LeadCaptureForm";

interface DiagnosticResultSectionProps {
  recommendation: ResidentialRecommendation;
  onReset: () => void;
}

const TRICURE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Particulate Capture": {
    bg: "bg-[#F7F5F0]",
    text: "text-[#8B7C62]",
    dot: "bg-[#C5A059]",
  },
  "VOC Neutralisation": {
    bg: "bg-[#F7F5F0]",
    text: "text-[#8B7C62]",
    dot: "bg-[#C5A059]",
  },
  "Microbial Deactivation": {
    bg: "bg-[#F7F5F0]",
    text: "text-[#8B7C62]",
    dot: "bg-[#C5A059]",
  },
};

export function DiagnosticResultSection({
  recommendation,
  onReset,
}: DiagnosticResultSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      id="diagnostic-result"
      className="scroll-mt-24 pt-8"
      aria-label="Diagnostic Result and Consultation"
    >
      {/* Section header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <div className="h-[1px] w-8 bg-[#C5A059]" />
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
            Personalised Recommendation
          </p>
          <div className="h-[1px] w-8 bg-[#C5A059]" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="text-[clamp(1.8rem,1.5rem+2vw,2.75rem)] font-semibold tracking-[-0.02em] text-[#1A1C19]"
        >
          Your Home Air Architecture
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="mt-4 text-[0.95rem] font-light text-gray-500 max-w-lg mx-auto"
        >
          Based on your spatial parameters, we recommend the following bespoke system configuration.
        </motion.p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        {/* ── Recommendation Card ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-black/5"
        >
          {/* Image */}
          <div className="relative h-64 w-full overflow-hidden md:h-80">
            <Image
              src={recommendation.imageUrl}
              alt={recommendation.imageAlt}
              fill
              className="object-cover object-center transition-transform duration-1000 hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 600px"
            />
            {/* Tier badge */}
            <div className="absolute left-5 top-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#1A1C19] backdrop-blur-md shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                {recommendation.systemTier === "compact" && "Compact System"}
                {recommendation.systemTier === "standard" && "Standard System"}
                {recommendation.systemTier === "premium" && "Premium System"}
                {recommendation.systemTier === "enterprise" && "Enterprise System"}
              </span>
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/90 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* System name + tagline */}
            <h3 className="text-[1.6rem] font-semibold tracking-[-0.01em] text-[#1A1C19]">
              {recommendation.systemName}
            </h3>
            <p className="mt-1 text-[0.85rem] font-medium text-[#C5A059]">
              {recommendation.tagline}
            </p>
            <p className="mt-4 text-[0.9rem] leading-[1.7] text-gray-500 font-light">
              {recommendation.description}
            </p>

            {/* Scientific metadata badges */}
            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-[#FDFBF7] p-4 text-center transition-colors hover:border-[#C5A059]/30">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#8B7C62]">
                  Target CFM
                </p>
                <p className="mt-1.5 text-[1.1rem] font-semibold text-[#1A1C19]">
                  {recommendation.cfmRange}
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-[#FDFBF7] p-4 text-center transition-colors hover:border-[#C5A059]/30">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#8B7C62]">
                  Coverage
                </p>
                <p className="mt-1.5 text-[1.1rem] font-semibold text-[#1A1C19]">
                  {recommendation.coverageRange}
                </p>
              </div>
              {recommendation.nabl && (
                <div className="rounded-xl border border-[#C5A059]/20 bg-[#FDFBF7] p-4 text-center transition-colors hover:border-[#C5A059]/40">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#C5A059]">
                    Lab Status
                  </p>
                  <p className="mt-1.5 text-[0.9rem] font-bold text-[#C5A059]">
                    NABL Tested
                  </p>
                </div>
              )}
            </div>

            {/* TriCure™ pillars */}
            <div className="mt-7">
              <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-[#8B7C62]">
                TriCure™ Active Pillars
              </p>
              <div className="flex flex-wrap gap-2.5">
                {recommendation.tricurePillars.map((p) => {
                  const c = TRICURE_COLORS[p] ?? {
                    bg: "bg-[#F3F4F6]",
                    text: "text-[#374151]",
                    dot: "bg-[#6B7280]",
                  };
                  return (
                    <span
                      key={p}
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.75rem] font-medium border border-transparent hover:border-[#C5A059]/20 transition-colors ${c.bg} ${c.text}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                      {p}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Certification badges */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {recommendation.badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[0.7rem] font-medium text-gray-500"
                >
                  <svg
                    className="h-3 w-3 fill-[#C5A059]"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.8z" />
                  </svg>
                  {b}
                </span>
              ))}
            </div>

            {/* Secondary CTA */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
              <a
                href={`/products/${recommendation.productId}`}
                id="result-request-specs"
                className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-[#C5A059] transition-colors hover:text-[#A88746]"
              >
                {recommendation.secondaryCta}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>

              <button
                type="button"
                id="result-re-diagnose"
                onClick={onReset}
                className="text-[0.8rem] font-medium text-gray-400 underline-offset-4 transition-colors hover:text-gray-600 hover:underline"
              >
                Re-diagnose
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Lead Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.32, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <LeadCaptureForm systemName={recommendation.systemName} />
        </motion.div>
      </div>
    </motion.section>
  );
}

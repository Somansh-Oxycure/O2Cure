"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Atom,
  ArrowRight,
  Building2,
  ChevronDown,
  Home,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { easings } from "@/components/motion/easings";
import { FAQ_CATEGORIES } from "@/features/faq/content";
import type { FaqItem } from "@/features/faq/types";
import { formatBrandText } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * AuditFaqSection — "FAQs".
 * Matches the max-w-7xl scale and rounded-[2.5rem] card styling of other sections.
 * Displays audit-focused answers under TriCure™ Technology and full FAQ coverage
 * across all other categories.
 */

const ICON_MAP: Record<string, LucideIcon> = {
  Atom,
  Building2,
  Home,
  ShieldCheck,
  Wrench,
};

/** Exact audit questions from the Figma with comprehensive, brand-aligned answers */
const AUDIT_SPECIFIC_ITEMS: FaqItem[] = [
  {
    id: "audit-really-free",
    question: "Is the audit really free, and what's the catch?",
    answer:
      "Yes, the air audit is 100% free with zero catch and zero obligation. Our certified air quality engineers visit your space with calibrated diagnostic instruments to measure PM2.5, PM10, CO₂, VOCs, and humidity levels. You receive a complete transparent diagnostic report and tailored recommendations with no pressure to purchase.",
  },
  {
    id: "audit-how-long",
    question: "How long does it take?",
    answer:
      "A standard on-site inspection takes approximately 30 to 45 minutes for residential spaces and 60 to 90 minutes for commercial or enterprise facilities, depending on total floor area, occupancy load, and HVAC layout.",
  },
  {
    id: "audit-which-cities",
    question: "Which cities do you cover?",
    answer:
      "We provide on-site air audits across the entire Delhi NCR region (including New Delhi, Gurugram, Noida, Greater Noida, Faridabad, and Ghaziabad), with expanding diagnostic coverage in Mumbai, Bengaluru, and other metropolitan hubs across India.",
  },
  {
    id: "audit-what-happens-after",
    question: "What happens after the audit?",
    answer:
      "Within 24 hours of the physical inspection, our engineering team shares a comprehensive Indoor Air Quality (IAQ) report detailing exact pollutant concentrations, source identification, and tailored engineering solutions calibrated to your specific space.",
  },
  {
    id: "audit-existing-hvac",
    question: "Does it work with our existing HVAC?",
    answer:
      "Yes. O₂Cure solutions are engineered for seamless retrofitting into all standard HVAC configurations — including central AHUs, VRV/VRF systems, ductable splits, and standalone environments — without requiring duct redesign or infrastructure overhaul.",
  },
  {
    id: "audit-have-to-buy",
    question: "Do I have to buy anything?",
    answer:
      "Absolutely not. The audit is a purely diagnostic and consultative service designed to give you clarity on your indoor air quality. Whether you choose to implement our recommendations or not is completely up to you.",
  },
];

export function AuditFaqSection() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(FAQ_CATEGORIES[0].id);
  const [openId, setOpenId] = useState<string | null>(null);

  const category =
    FAQ_CATEGORIES.find((c) => c.id === activeId) ?? FAQ_CATEGORIES[0];

  // For the first category (TriCure / Audit), show the Figma audit questions;
  // for all others, show the top questions from the site-wide FAQ knowledge base.
  const items =
    category.id === "tricure-technology"
      ? AUDIT_SPECIFIC_ITEMS
      : category.items.slice(0, 6);

  const CategoryIcon = ICON_MAP[category.iconName] ?? Atom;

  const selectCategory = (id: string) => {
    setActiveId(id);
    setOpenId(null);
  };

  return (
    <section
      id="audit-faq"
      aria-labelledby="audit-faq-heading"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal delay={0} distance={18} amount={0.3}>
          <h2
            id="audit-faq-heading"
            className="text-center font-heading text-[clamp(2rem,1.4rem+2vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]"
          >
            FAQs
          </h2>
        </Reveal>

        <Reveal delay={0.1} distance={20} amount={0.1}>
          <div className="mt-10 rounded-[2.5rem] bg-[#F2F5F1] px-6 py-10 sm:px-10 lg:mt-12 lg:px-14 lg:py-14">
            {/* Category tabs */}
            <div
              role="tablist"
              aria-label="FAQ categories"
              className="no-scrollbar flex flex-wrap gap-2 sm:gap-2.5 pb-2"
            >
              {FAQ_CATEGORIES.map((cat) => {
                const Icon = ICON_MAP[cat.iconName] ?? Atom;
                const active = cat.id === activeId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    id={`audit-faq-tab-${cat.id}`}
                    aria-selected={active}
                    aria-controls="audit-faq-panel"
                    onClick={() => selectCategory(cat.id)}
                    className={cn(
                      "flex shrink-0 items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-[0.82rem] font-semibold transition-all duration-300",
                      active
                        ? "bg-brand-green text-white shadow-[0_6px_20px_-6px_rgba(58,125,42,0.6)]"
                        : "text-muted-foreground hover:bg-white/70 hover:text-foreground",
                    )}
                  >
                    <Icon className="size-3.5 sm:size-4" aria-hidden />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div
              id="audit-faq-panel"
              role="tabpanel"
              aria-labelledby={`audit-faq-tab-${category.id}`}
            >
              {/* Category intro */}
              <div className="mt-8 flex items-start gap-3.5 sm:gap-4 border-b border-border/60 pb-6">
                <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <CategoryIcon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
                    <span aria-hidden className="h-px w-4 bg-brand-green/60" />
                    {formatBrandText(category.label)}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {formatBrandText(category.description)}
                  </p>
                </div>
              </div>

              {/* Accordion questions */}
              <ul className="mt-8 flex flex-col gap-3.5 sm:gap-4">
                {items.map((item) => {
                  const open = openId === item.id;
                  return (
                    <li key={item.id}>
                      <div
                        className={cn(
                          "overflow-hidden bg-white transition-all duration-300",
                          open
                            ? "rounded-2xl sm:rounded-[1.75rem] shadow-[0_12px_32px_-12px_rgba(58,125,42,0.22)]"
                            : "rounded-full shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_-8px_rgba(0,0,0,0.12)]",
                        )}
                      >
                        <button
                          type="button"
                          id={`audit-faq-btn-${item.id}`}
                          aria-expanded={open}
                          aria-controls={`audit-faq-answer-${item.id}`}
                          onClick={() => setOpenId(open ? null : item.id)}
                          className="flex w-full items-center justify-between gap-4 px-6 sm:px-8 py-4 sm:py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-inset"
                        >
                          <span className="font-heading text-sm sm:text-base font-semibold text-[#14172B]">
                            {formatBrandText(item.question)}
                          </span>
                          <ChevronDown
                            aria-hidden
                            className={cn(
                              "size-5 shrink-0 transition-transform duration-300",
                              open
                                ? "rotate-180 text-brand-green"
                                : "text-muted-foreground/60",
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              id={`audit-faq-answer-${item.id}`}
                              role="region"
                              aria-labelledby={`audit-faq-btn-${item.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: reduceMotion ? 0 : 0.45,
                                ease: easings.premium,
                              }}
                              className="overflow-hidden"
                            >
                              <p className="px-6 sm:px-8 pb-6 pt-1 text-xs sm:text-sm leading-[1.75] text-muted-foreground">
                                {formatBrandText(item.answer)}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                id="audit-faq-cta"
                href="#audit-hero"
                className="group relative mt-8 inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-brand-green px-8 text-xs sm:text-[0.78rem] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_-10px_rgba(58,125,42,0.7)] transition-colors duration-500 hover:bg-brand-green-hover"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                />
                <span className="relative">Book an Air Audit</span>
                <ArrowRight className="relative size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

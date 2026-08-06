"use client";

import { useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  environmentSectors,
  type EnvironmentSectorId,
} from "@/features/solutions/data/productCatalog";

interface EnvironmentSelectorRowProps {
  active: EnvironmentSectorId;
  onChange: (id: EnvironmentSectorId) => void;
}

/**
 * EnvironmentSelectorRow — Dual-mode component.
 *
 * Mobile  (< md):
 *   ┌─────────────────────────────────────────────────┐
 *   │ [All] [Corporate] [Healthcare] [Residential] ›  │  ← scrollable pill tabs
 *   └─────────────────────────────────────────────────┘
 *   ┌─────────────────────────────────────────────────┐
 *   │  ENVIRONMENT IMAGE      Air Safety Engineering  │
 *   │  (16:7 ratio)           Corporate & Office      │  ← context card
 *   │                         30% offices have SBS    │
 *   └─────────────────────────────────────────────────┘
 *
 * Desktop (≥ md):
 *   ┌─────── Original image-card row (unchanged) ─────┐
 */
export function EnvironmentSelectorRow({
  active,
  onChange,
}: EnvironmentSelectorRowProps) {
  const handleSelect = useCallback(
    (id: EnvironmentSectorId) => onChange(id),
    [onChange]
  );

  const activeSector =
    environmentSectors.find((s) => s.id === active) ?? environmentSectors[0];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          MOBILE — Pill tabs + context card
          ══════════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* ── Pill tab bar ──────────────────────────────────────── */}
        <div className="border-b border-[#E5E7EB] bg-white">
          <div
            className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Select environment sector"
          >
            {environmentSectors.map((sector) => {
              const isActive = active === sector.id;
              return (
                <button
                  key={sector.id}
                  id={`mob-env-${sector.id}`}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelect(sector.id)}
                  className={cn(
                    // Base — pill shape, min 44px touch target
                    "flex min-h-[44px] shrink-0 items-center rounded-full px-4 py-2",
                    "text-[0.78rem] font-semibold whitespace-nowrap",
                    "border transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/50",
                    isActive
                      ? "border-[#3A7D2A]/30 bg-[#EAF5E4] text-[#2A5C1D] shadow-[0_0_0_1px_rgba(58,125,42,0.15)]"
                      : "border-[#E5E7EB] bg-white text-[#6B7280]"
                  )}
                >
                  {sector.label}
                </button>
              );
            })}
            {/* Peek spacer — hints user there's more to scroll */}
            <div className="w-5 shrink-0" aria-hidden />
          </div>
        </div>

        {/* ── Context card — environment hero ───────────────────── */}
        <div className="relative mx-4 my-3 overflow-hidden rounded-2xl" style={{ aspectRatio: "16/7" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={activeSector.image}
                alt={activeSector.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) calc(100vw - 32px)"
                priority
              />
              {/* Gradient — reads left-to-right on landscape */}
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.78)] via-[rgba(0,0,0,0.35)] to-transparent" />

              {/* Copy — anchored bottom-left */}
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/60">
                  Air Safety Engineering
                </p>
                <p className="mt-0.5 text-[1rem] font-bold leading-tight tracking-[-0.02em] text-white">
                  {activeSector.label}
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[0.68rem] leading-snug text-white/75">
                  {/* Atmospheric data badge */}
                  <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-white/90 backdrop-blur-sm">
                    Data
                  </span>
                  {activeSector.stat}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP — Original image-card row (unchanged)
          ══════════════════════════════════════════════════════════ */}
      <div
        className="relative hidden w-full border-b border-[#E5E7EB] bg-white pt-5 pb-5 md:block"
        role="group"
        aria-label="Select environment sector"
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 overflow-x-auto px-5 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {environmentSectors.map((sector) => {
            const isActive = active === sector.id;
            return (
              <button
                key={sector.id}
                id={`env-sector-${sector.id}`}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(sector.id)}
                className={cn(
                  "group relative flex h-28 w-44 shrink-0 flex-col justify-end overflow-hidden rounded-xl border-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/50",
                  isActive
                    ? "border-[#3A7D2A] shadow-md"
                    : "border-transparent hover:border-[#D1D5DB] hover:shadow-sm"
                )}
              >
                <Image
                  src={sector.image}
                  alt={sector.alt}
                  fill
                  className="object-cover"
                  sizes="176px"
                  priority={isActive}
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isActive
                      ? "bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.3)] to-transparent"
                      : "bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.1)] group-hover:from-[rgba(0,0,0,0.8)]"
                  )}
                />
                <div className="relative z-10 px-3 pb-3">
                  <span className="block text-[0.85rem] font-bold leading-tight text-white">
                    {sector.label}
                  </span>
                  {isActive && (
                    <span className="mt-0.5 block text-[0.65rem] font-medium leading-snug text-white/80 line-clamp-1">
                      {sector.stat}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

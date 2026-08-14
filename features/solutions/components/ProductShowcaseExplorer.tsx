/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  products,
  environmentSectors,
  areaSegments,
  type EnvironmentSectorId,
  type AirChallengeId,
  type AreaSegmentId,
  type IntegrationTypeId,
  type CustomerTypeId,
} from "@/features/solutions/data/productCatalog";
import { EnvironmentSelectorRow } from "./EnvironmentSelectorRow";
import {
  FilterSidebar,
  MobileFilterDrawer,
} from "./EngineeringFilterSidebar";
import { SolutionCard } from "./PremiumSolutionCard";

const PAGE_SIZE = 8; // 4 columns × 2 rows

/**
 * ProductShowcaseExplorer
 *
 * Desktop layout:
 * ┌──────────────────────────────────────────────────────────────┐
 * │           Environment image selector strip                    │
 * ├──────────────┬───────────────────────────────────────────────┤
 * │ Filter       │  [Label]                [n systems]           │
 * │ sidebar      │  ╔═══╗ ╔═══╗ ╔═══╗ ╔═══╗                   │
 * │              │  ║   ║ ║   ║ ║   ║ ║   ║  ← 4 × 2 = 8     │
 * │              │  ╚═══╝ ╚═══╝ ╚═══╝ ╚═══╝                   │
 * │              │  ╔═══╗ ╔═══╗ ╔═══╗ ╔═══╗                   │
 * │              │  ║   ║ ║   ║ ║   ║ ║   ║                   │
 * │              │  ╚═══╝ ╚═══╝ ╚═══╝ ╚═══╝                   │
 * │              │  ← →  ● ○ ○          View more →            │
 * └──────────────┴───────────────────────────────────────────────┘
 *
 * Mobile layout:
 * - Compact environment selector (scrollable thumbnails)
 * - Sticky top bar: "Corporate & Office"  [Filter ●]
 * - 2-column card grid
 * - Pagination bar below
 * - Filter lives in a bottom-sheet drawer (no clutter in the main view)
 */
export function ProductShowcaseExplorer() {
  const searchParams = useSearchParams();
  const envParam = searchParams.get("env") as EnvironmentSectorId | null;

  const [activeEnvironment, setActiveEnvironment] =
    useState<EnvironmentSectorId>(
      envParam && environmentSectors.some((s) => s.id === envParam)
        ? envParam
        : "all"
    );
  const [activeChallenges, setActiveChallenges] = useState<AirChallengeId[]>([]);
  const [activeAreaSegment, setActiveAreaSegment] = useState<AreaSegmentId | null>(null);
  const [activeIntegrations, setActiveIntegrations] = useState<IntegrationTypeId[]>([]);
  const [activeCustomerType, setActiveCustomerType] = useState<CustomerTypeId | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (envParam && environmentSectors.some((s) => s.id === envParam)) {
      setActiveEnvironment(envParam);
      setActiveChallenges([]);
      setActiveAreaSegment(null);
      setActiveIntegrations([]);
      setActiveCustomerType(null);
      setPage(0);
    } else if (!envParam) {
      setActiveEnvironment("all");
    }
  }, [envParam]);

  // ── Filter logic ──────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = activeEnvironment === "all"
      ? products
      : products.filter((p) => p.environments.includes(activeEnvironment));

    if (activeChallenges.length > 0) {
      result = result.filter((p) =>
        activeChallenges.every((c) => p.challenges.includes(c))
      );
    }

    if (activeIntegrations.length > 0) {
      result = result.filter((p) =>
        activeIntegrations.includes(p.integrationType)
      );
    }

    if (activeCustomerType && activeCustomerType !== "both") {
      result = result.filter(
        (p) => p.customerType === activeCustomerType || p.customerType === "both"
      );
    }

    if (activeAreaSegment) {
      const minSqFt =
        activeAreaSegment === "compact" ? 0 :
          activeAreaSegment === "mid" ? 500 :
            activeAreaSegment === "large" ? 2500 : 8000;
      const maxSqFt =
        activeAreaSegment === "compact" ? 500 :
          activeAreaSegment === "mid" ? 2500 :
            activeAreaSegment === "large" ? 8000 : Infinity;
      
      result = result.filter((p) => p.capacityMaxSqFt >= minSqFt && p.capacityMaxSqFt <= maxSqFt);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.systemName.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.badges.some((b) => b.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeEnvironment, activeChallenges, activeAreaSegment, activeIntegrations, activeCustomerType, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const pageProducts = filteredProducts.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  );

  // ── Handlers ──────────────────────────────────────────────────
  const handleEnvironmentChange = useCallback((id: EnvironmentSectorId) => {
    setActiveEnvironment(id);
    setActiveChallenges([]);
    setActiveAreaSegment(null);
    setActiveIntegrations([]);
    setActiveCustomerType(null);
    setPage(0);
  }, []);

  const handleToggleChallenge = useCallback((id: AirChallengeId) => {
    setActiveChallenges((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setPage(0);
  }, []);

  const handleSetArea = useCallback((id: AreaSegmentId | null) => {
    setActiveAreaSegment(id);
    setPage(0);
  }, []);

  const handleToggleIntegration = useCallback((id: IntegrationTypeId) => {
    setActiveIntegrations((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
    setPage(0);
  }, []);

  const handleSetCustomerType = useCallback((id: CustomerTypeId | null) => {
    setActiveCustomerType(id);
    setPage(0);
  }, []);

  const handleClearAll = useCallback(() => {
    setActiveChallenges([]);
    setActiveAreaSegment(null);
    setActiveIntegrations([]);
    setActiveCustomerType(null);
    setSearchQuery("");
    setPage(0);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    document.getElementById("solutions-main")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const activeEnvLabel =
    environmentSectors.find((e) => e.id === activeEnvironment)?.label ?? "";

  const filterProps = {
    activeChallenges,
    activeAreaSegment,
    activeIntegrations,
    activeCustomerType,
    onToggleChallenge: handleToggleChallenge,
    onSetAreaSegment: handleSetArea,
    onToggleIntegration: handleToggleIntegration,
    onSetCustomerType: handleSetCustomerType,
    onClearAll: handleClearAll,
    resultCount: filteredProducts.length,
  };

  return (
    <div className="flex flex-col">
      {/* ── Environment selector ──────────────────────────────── */}
      <EnvironmentSelectorRow
        active={activeEnvironment}
        onChange={handleEnvironmentChange}
      />


      {/* Mobile sticky context bar REMOVED — filter now lives in bottom action bar */}

      {/* ── Main body ─────────────────────────────────────────── */}
      <div className="flex flex-1 gap-0 bg-[#F5F5F4] relative items-stretch min-h-[calc(100vh-80px)]">
        {/* Desktop sidebar - Sticky Outer Wrapper */}
        <div className="hidden shrink-0 md:block md:w-56 lg:w-60 xl:w-64 sticky top-20 self-start z-10">
          {/* Inner Container */}
          <div className="w-full border-r border-[#E5E7EB] bg-white p-5 pb-12">
            <FilterSidebar {...filterProps} />
          </div>
        </div>

        {/* Grid column — extra bottom padding on mobile so cards aren't hidden behind bottom bar */}
        <div className="flex min-w-0 flex-1 flex-col p-3 pb-28 md:p-6 md:pb-6 lg:p-8 lg:pb-8">
          {/* Search Bar / Filter / Context Header Row */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search solutions by name, technology, features..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(0);
                  }}
                  className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 pl-10 text-[0.82rem] text-[#1C1C1C] placeholder-[#9CA3AF] shadow-sm outline-none transition-all focus:border-[#3A7D2A]/40 focus:ring-2 focus:ring-[#3A7D2A]/10"
                />
                <svg
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setPage(0);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#1C1C1C]"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <div className="hidden sm:block">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF] text-right">
                  Solutions for
                </p>
                <h2 className="text-[0.85rem] font-bold tracking-[-0.02em] text-[#1C1C1C] text-right">
                  {activeEnvLabel}
                </h2>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={filteredProducts.length}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[0.72rem] font-semibold text-[#6B7280] shadow-sm"
                  aria-live="polite"
                >
                  {filteredProducts.length} system{filteredProducts.length !== 1 ? "s" : ""}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Product grid ────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {pageProducts.length > 0 ? (
              <motion.div
                key={`${activeEnvironment}-${currentPage}-${activeChallenges.join()}-${activeAreaSegment}-${activeIntegrations.join()}-${activeCustomerType}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                // Mobile: single-col landscape cards; Tablet+: 2-col; Desktop: 3/4-col
                className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {pageProducts.map((product, i) => (
                  <SolutionCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            ) : (
              <EmptyState onReset={handleClearAll} />
            )}
          </AnimatePresence>

          {/* ── Pagination ──────────────────────────────────── */}
          {filteredProducts.length > PAGE_SIZE && (
            <PaginationBar
              current={currentPage}
              total={totalPages}
              onPrev={() => handlePageChange(Math.max(0, currentPage - 1))}
              onNext={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
              onPage={(p) => handlePageChange(p)}
            />
          )}
        </div>
      </div>

      {/* ── Mobile sticky bottom action bar ────────────────── */}
      <MobileBottomBar
        activeEnvLabel={activeEnvLabel}
        resultCount={filteredProducts.length}
        filterCount={
          activeChallenges.length +
          (activeAreaSegment ? 1 : 0) +
          activeIntegrations.length +
          (activeCustomerType ? 1 : 0)
        }
        onOpenFilter={() => setFilterOpen(true)}
      />

      {/* ── Mobile filter drawer ──────────────────────────── */}
      <MobileFilterDrawer
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        {...filterProps}
      />
    </div>
  );
}

// ─── Pagination ──────────────────────────────────────────────────────────────

interface PaginationBarProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onPage: (p: number) => void;
}

function PaginationBar({
  current,
  total,
  onPrev,
  onNext,
  onPage,
}: PaginationBarProps) {
  return (
    <div className="mt-8 flex items-center justify-between">
      {/* Arrow controls */}
      <div className="flex items-center gap-2">
        <button
          id="pagination-prev"
          onClick={onPrev}
          disabled={current === 0}
          aria-label="Previous page"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl border",
            "transition-all duration-200",
            current === 0
              ? "border-[#E5E7EB] bg-white text-[#D1D5DB] cursor-not-allowed"
              : "border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#1C1C1C] hover:shadow-sm active:scale-[0.95]"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              id={`pagination-dot-${i}`}
              onClick={() => onPage(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === current ? "page" : undefined}
              className={cn(
                "rounded-full transition-all duration-300",
                i === current
                  ? "h-2 w-5 bg-[#1C1C1C]"
                  : "h-2 w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]"
              )}
            />
          ))}
        </div>

        <button
          id="pagination-next"
          onClick={onNext}
          disabled={current === total - 1}
          aria-label="Next page"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl border",
            "transition-all duration-200",
            current === total - 1
              ? "border-[#E5E7EB] bg-white text-[#D1D5DB] cursor-not-allowed"
              : "border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#1C1C1C] hover:shadow-sm active:scale-[0.95]"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* View more link */}
      {/* <a
        href="#contact"
        className="group flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#3A7D2A] transition-all duration-200 hover:gap-2"
        aria-label="View all solutions — contact us"
      >
        View all soolutions
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a> */}
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center gap-4 py-24 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white shadow-sm" aria-hidden>
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#9CA3AF]" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      </div>
      <div>
        <p className="text-[0.9rem] font-semibold text-[#1C1C1C]">No systems matched</p>
        <p className="mt-1 max-w-[220px] text-[0.78rem] text-[#9CA3AF]">
          Adjust filters to see matching solutions.
        </p>
      </div>
      <button
        onClick={onReset}
        className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-[0.78rem] font-semibold text-[#6B7280] shadow-sm transition-all hover:border-[#3A7D2A]/30 hover:bg-[#EAF5E4] hover:text-[#2A5C1D]"
      >
        Reset filters
      </button>
    </motion.div>
  );
}

// ─── Mobile Bottom Action Bar ─────────────────────────────────────────────────
// Thumb-zone: keeps environment context + result count + filter trigger
// permanently accessible at the bottom of the screen — only on mobile.

interface MobileBottomBarProps {
  activeEnvLabel: string;
  resultCount: number;
  filterCount: number;
  onOpenFilter: () => void;
}

function MobileBottomBar({
  activeEnvLabel,
  resultCount,
  filterCount,
  onOpenFilter,
}: MobileBottomBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white/95 p-2 shadow-[0_-4px_24px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-md">
        {/* Left: active environment label */}
        <div className="min-w-0 flex-1 pl-2">
          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-[#9CA3AF]">
            Showing for
          </p>
          <p className="truncate text-[0.82rem] font-bold tracking-[-0.01em] text-[#1C1C1C]">
            {activeEnvLabel}
          </p>
        </div>

        {/* Center: animated result count badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={resultCount}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 rounded-full bg-[#F5F5F4] px-3 py-1.5"
            aria-live="polite"
          >
            <p className="text-[0.7rem] font-semibold text-[#6B7280]">
              {resultCount} system{resultCount !== 1 ? "s" : ""}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Right: filter button — in thumb zone */}
        <button
          id="mobile-filter-btn"
          onClick={onOpenFilter}
          aria-label={`Open filters${filterCount > 0 ? `, ${filterCount} active` : ""}`}
          className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl bg-[#1C1C1C] px-4 py-2.5
            text-[0.78rem] font-semibold text-white
            transition-all duration-200 active:scale-[0.96] hover:bg-[#374151]"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filter
          {filterCount > 0 && (
            <motion.span
              key={filterCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3A7D2A] text-[0.55rem] font-bold text-white"
            >
              {filterCount}
            </motion.span>
          )}
        </button>
      </div>
    </div>
  );
}

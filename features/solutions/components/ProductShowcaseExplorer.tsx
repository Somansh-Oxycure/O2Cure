"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
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
  MobileFilterTrigger,
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
        activeChallenges.some((c) => p.challenges.includes(c))
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
      result = result.filter((p) => p.capacityMaxSqFt >= minSqFt);
    }

    return result;
  }, [activeEnvironment, activeChallenges, activeAreaSegment, activeIntegrations, activeCustomerType]);

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
    setPage(0);
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

      {/* ── Mobile: sticky context bar ───────────────────────── */}
      <div className="sticky top-16 z-30 flex items-center justify-between border-b border-[#E5E7EB] bg-white/95 px-4 py-3 backdrop-blur-sm md:hidden">
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">
            Solutions for
          </p>
          <p className="text-[0.85rem] font-bold tracking-[-0.02em] text-[#1C1C1C]">
            {activeEnvLabel}
          </p>
        </div>
        <MobileFilterTrigger
          onOpen={() => setFilterOpen(true)}
          activeChallenges={activeChallenges}
          activeAreaSegment={activeAreaSegment}
          activeIntegrations={activeIntegrations}
          activeCustomerType={activeCustomerType}
        />
      </div>

      {/* ── Main body ─────────────────────────────────────────── */}
      <div className="flex flex-1 gap-0 bg-[#F5F5F4] relative items-stretch min-h-[calc(100vh-80px)]">
        {/* Desktop sidebar - Sticky Outer Wrapper */}
        <div className="hidden shrink-0 md:block md:w-56 lg:w-60 xl:w-64 sticky top-20 self-start z-10">
          {/* Inner Container */}
          <div className="w-full border-r border-[#E5E7EB] bg-white p-5 pb-12">
            <FilterSidebar {...filterProps} />
          </div>
        </div>

        {/* Grid column */}
        <div className="flex min-w-0 flex-1 flex-col p-4 md:p-6 lg:p-8">
          {/* Desktop context header */}
          <div className="mb-5 hidden items-center justify-between md:flex">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">
                Solutions for
              </p>
              <h2 className="text-[0.95rem] font-bold tracking-[-0.02em] text-[#1C1C1C]">
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

          {/* ── Product grid ────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {pageProducts.length > 0 ? (
              <motion.div
                key={`${activeEnvironment}-${currentPage}-${activeChallenges.join()}-${activeAreaSegment}-${activeIntegrations.join()}-${activeCustomerType}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                // 4-col desktop, 2-col tablet/mobile
                className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
              onPrev={() => setPage((p) => Math.max(0, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              onPage={(p) => setPage(p)}
            />
          )}
        </div>
      </div>

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

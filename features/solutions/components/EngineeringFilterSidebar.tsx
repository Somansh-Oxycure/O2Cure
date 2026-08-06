"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wind,
  Biohazard,
  CloudFog,
  Gauge,
  LayoutGrid,
  X,
  ChevronDown,
  Plug,
  Fan,
  Car,
  AirVent,
  Building2,
  Home,
  FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  airChallenges,
  areaSegments,
  integrationTypes,
  customerTypes,
  type AirChallengeId,
  type AreaSegmentId,
  type IntegrationTypeId,
  type CustomerTypeId,
} from "@/features/solutions/data/productCatalog";

// ─── Icon maps ────────────────────────────────────────────────────────────────

const CHALLENGE_ICONS: Record<AirChallengeId, React.ElementType> = {
  particulate: CloudFog,
  "odor-gases": Wind,
  "high-co2": Gauge,
  pathogens: Biohazard,
};

/** Plain-English labels non-technical users immediately understand */
const CHALLENGE_PLAIN: Record<AirChallengeId, string> = {
  particulate: "Dust & Pollution",
  "odor-gases": "Smells & Chemicals",
  "high-co2": "Stuffy / Stale Air",
  pathogens: "Germs & Viruses",
};

const INTEGRATION_ICONS: Record<IntegrationTypeId, React.ElementType> = {
  "in-duct": Fan,
  standalone: Plug,
  portable: Car,
  "fresh-air": AirVent,
};

const CUSTOMER_ICONS: Record<CustomerTypeId, React.ElementType> = {
  b2b: Building2,
  b2c: Home,
  both: FlaskConical,
};

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

export interface FilterState {
  activeChallenges: AirChallengeId[];
  activeAreaSegment: AreaSegmentId | null;
  activeIntegrations: IntegrationTypeId[];
  activeCustomerType: CustomerTypeId | null;
}

interface FilterSidebarProps extends FilterState {
  onToggleChallenge: (id: AirChallengeId) => void;
  onSetAreaSegment: (id: AreaSegmentId | null) => void;
  onToggleIntegration: (id: IntegrationTypeId) => void;
  onSetCustomerType: (id: CustomerTypeId | null) => void;
  onClearAll: () => void;
  resultCount: number;
  /**
   * When true, only the first filter section starts expanded.
   * Used inside the mobile bottom-sheet drawer to reduce initial scroll depth.
   */
  compactMode?: boolean;
}

export function FilterSidebar({
  activeChallenges,
  activeAreaSegment,
  activeIntegrations,
  activeCustomerType,
  onToggleChallenge,
  onSetAreaSegment,
  onToggleIntegration,
  onSetCustomerType,
  onClearAll,
  resultCount,
  compactMode = false,
}: FilterSidebarProps) {
  const totalActive =
    activeChallenges.length +
    (activeAreaSegment ? 1 : 0) +
    activeIntegrations.length +
    (activeCustomerType ? 1 : 0);

  return (
    <aside className="flex flex-col gap-5" aria-label="Solution filters">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-3.5 w-3.5 text-[#6B7280]" />
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#374151]">
            Filters
          </p>
          <AnimatePresence>
            {totalActive > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3A7D2A] text-[0.55rem] font-bold text-white"
              >
                {totalActive}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {totalActive > 0 && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              onClick={onClearAll}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-[0.65rem] font-semibold text-[#9CA3AF]
                transition-colors hover:bg-[#F5F5F4] hover:text-[#6B7280]"
              aria-label="Clear all filters"
            >
              <X className="h-2.5 w-2.5" />
              Clear all
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── What's the problem? ── (always open, primary filter) ── */}
      <FilterSection title="What's your air problem?" defaultOpen={true}>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Air problems">
          {airChallenges.map((c) => {
            const Icon = CHALLENGE_ICONS[c.id];
            const active = activeChallenges.includes(c.id);
            return (
              <button
                key={c.id}
                id={`filter-challenge-${c.id}`}
                role="checkbox"
                aria-checked={active}
                onClick={() => onToggleChallenge(c.id)}
                className={cn(
                  "group flex min-h-[64px] flex-col items-center justify-center gap-2 rounded-xl p-3 text-center",
                  "border transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/40",
                  active
                    ? "border-[#3A7D2A]/25 bg-[#EAF5E4] shadow-[0_0_0_1px_rgba(58,125,42,0.15)]"
                    : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:bg-[#FAFAFA]"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    active
                      ? "bg-[#3A7D2A] text-white"
                      : "bg-[#F5F5F4] text-[#9CA3AF] group-hover:bg-[#EAF5E4] group-hover:text-[#3A7D2A]"
                  )}
                  aria-hidden
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "text-[0.7rem] font-bold leading-tight",
                    active ? "text-[#2A5C1D]" : "text-[#1C1C1C]"
                  )}
                >
                  {CHALLENGE_PLAIN[c.id]}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      <SectionDivider />

      {/* ── How does it install? ── collapsed on mobile by default ── */}
      <FilterSection title="How does it install?" defaultOpen={!compactMode}>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Installation type">
          {integrationTypes.map((t) => {
            const Icon = INTEGRATION_ICONS[t.id];
            const active = activeIntegrations.includes(t.id);
            return (
              <button
                key={t.id}
                id={`filter-integration-${t.id}`}
                role="checkbox"
                aria-checked={active}
                onClick={() => onToggleIntegration(t.id)}
                className={cn(
                  "group flex min-h-[64px] flex-col items-center justify-center gap-2 rounded-xl p-3 text-center",
                  "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/40 border",
                  active
                    ? "border-[#3A7D2A]/25 bg-[#EAF5E4] shadow-[0_0_0_1px_rgba(58,125,42,0.15)]"
                    : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:bg-[#FAFAFA]"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                    active
                      ? "bg-[#3A7D2A] text-white"
                      : "bg-[#F5F5F4] text-[#9CA3AF] group-hover:bg-[#EAF5E4] group-hover:text-[#3A7D2A]"
                  )}
                  aria-hidden
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "text-[0.7rem] font-bold leading-tight",
                    active ? "text-[#2A5C1D]" : "text-[#1C1C1C]"
                  )}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      <SectionDivider />

      {/* ── Room size ── collapsed on mobile by default ───────────── */}
      <FilterSection title="Room size" defaultOpen={!compactMode}>
        <div className="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="Room size">
          {areaSegments.map((seg) => {
            const active = activeAreaSegment === seg.id;
            return (
              <button
                key={seg.id}
                id={`filter-area-${seg.id}`}
                role="radio"
                aria-checked={active}
                onClick={() => onSetAreaSegment(active ? null : seg.id)}
                className={cn(
                  "flex min-h-[52px] flex-col items-start justify-center rounded-xl border px-2.5 py-2",
                  "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/40",
                  active
                    ? "border-[#3A7D2A]/25 bg-[#EAF5E4]"
                    : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:bg-[#FAFAFA]"
                )}
              >
                <span
                  className={cn(
                    "text-[0.72rem] font-bold",
                    active ? "text-[#2A5C1D]" : "text-[#1C1C1C]"
                  )}
                >
                  {seg.label}
                </span>
                <span className="mt-0.5 text-[0.6rem] leading-tight text-[#9CA3AF]">
                  {seg.range}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>


    </aside>
  );
}

// ─── Collapsible section wrapper ─────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mb-2.5 flex w-full min-h-[44px] items-center justify-between group"
        aria-expanded={open}
      >
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#6B7280]
          group-hover:text-[#374151] transition-colors">
          {title}
        </p>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-[#9CA3AF] transition-transform duration-200",
            open ? "rotate-0" : "-rotate-90"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SectionDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />;
}

// ─── Mobile Filter Drawer ─────────────────────────────────────────────────────

interface MobileFilterDrawerProps extends FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  ...filterProps
}: MobileFilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            aria-hidden
          />

          {/* Bottom sheet — 70dvh max; scrollable body; sticky CTA footer */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl bg-white md:hidden"
            style={{ maxHeight: "70dvh" }}
            role="dialog"
            aria-modal
            aria-label="Solution filters"
          >
            {/* Handle bar */}
            <div className="flex shrink-0 flex-col px-6 pt-4 pb-0">
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E5E7EB]" aria-hidden />
              {/* Header row */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[0.9rem] font-bold tracking-[-0.02em] text-[#1C1C1C]">
                  Filters
                </p>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F4] text-[#6B7280] transition-colors hover:bg-[#E5E7EB]"
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable filter body */}
            <div className="flex-1 overflow-y-auto px-6 pb-2">
              <FilterSidebar {...filterProps} compactMode />
            </div>

            {/* Sticky CTA — always visible without scrolling */}
            <div
              className="shrink-0 border-t border-[#F5F5F4] bg-white px-6 py-4"
              style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
            >
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-[#1C1C1C] py-3.5 text-[0.85rem] font-bold text-white transition-all duration-300 hover:bg-[#3A7D2A] active:scale-[0.98]"
              >
                View {filterProps.resultCount} Solution{filterProps.resultCount !== 1 ? "s" : ""}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Mobile floating filter trigger ──────────────────────────────────────────

interface MobileFilterTriggerProps {
  onOpen: () => void;
  activeChallenges: AirChallengeId[];
  activeAreaSegment: AreaSegmentId | null;
  activeIntegrations: IntegrationTypeId[];
  activeCustomerType: CustomerTypeId | null;
}

export function MobileFilterTrigger({
  onOpen,
  activeChallenges,
  activeAreaSegment,
  activeIntegrations,
  activeCustomerType,
}: MobileFilterTriggerProps) {
  const count =
    activeChallenges.length +
    (activeAreaSegment ? 1 : 0) +
    activeIntegrations.length +
    (activeCustomerType ? 1 : 0);

  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5
        text-[0.78rem] font-semibold text-[#1C1C1C] shadow-sm
        transition-all duration-200 hover:border-[#D1D5DB] hover:shadow-md
        active:scale-[0.97]"
      aria-label="Open filters"
    >
      <LayoutGrid className="h-3.5 w-3.5 text-[#6B7280]" />
      Filter
      {count > 0 && (
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3A7D2A] text-[0.55rem] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}

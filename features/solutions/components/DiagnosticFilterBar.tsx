"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DiagnosticFilter, EnvironmentTab } from "@/features/solutions/types";
import { diagnosticFilters } from "@/features/solutions/content";

interface DiagnosticSidebarProps {
  activeTab: EnvironmentTab;
  activeFilters: string[];
  onToggle: (filterId: string) => void;
}

/**
 * DiagnosticSidebar — blueprint §1.3
 *
 * Desktop: Fixed left-hand column. "Feels like a modern, friendly health app."
 * Mobile: Hidden — the MobileDiagnosticBar renders instead.
 *
 * Pill styling: white bg + soft-gray border → selected = pale mint green bg + dark green text.
 */
export function DiagnosticSidebar({
  activeTab,
  activeFilters,
  onToggle,
}: DiagnosticSidebarProps) {
  const relevantFilters: DiagnosticFilter[] = diagnosticFilters.filter((f) =>
    f.environments.includes(activeTab)
  );

  return (
    <aside
      aria-label="Diagnostic filters"
      className="hidden md:flex md:w-56 md:shrink-0 md:flex-col md:gap-2 lg:w-60"
    >
      <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#9CA3AF]">
        Filter by Space Type
      </p>
      <motion.ul
        layout
        className="flex flex-col gap-1.5"
        role="group"
        aria-label="Space type filters"
      >
        {relevantFilters.map((filter, i) => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <motion.li
              key={filter.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                id={`sidebar-filter-${filter.id}`}
                onClick={() => onToggle(filter.id)}
                aria-pressed={isActive}
                className={cn(
                  "w-full rounded-xl border px-4 py-2.5 text-left",
                  "text-[0.8rem] font-medium transition-all duration-250",
                  "ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/40",
                  isActive
                    ? "border-[#3A7D2A]/20 bg-[#EAF5E4] text-[#2A5C1D]"
                    : "border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#1C1C1C]"
                )}
              >
                {filter.label}
              </button>
            </motion.li>
          );
        })}
      </motion.ul>

      {activeFilters.length > 0 && (
        <button
          onClick={() => activeFilters.forEach(onToggle)}
          className="mt-2 text-left text-[0.75rem] text-[#9CA3AF] underline-offset-2 hover:text-[#6B7280] hover:underline transition-colors"
          aria-label="Clear all active filters"
        >
          Clear filters
        </button>
      )}
    </aside>
  );
}

// ─── Mobile horizontal pill strip (blueprint §1.3 Option B) ────────────────

interface MobileDiagnosticBarProps {
  activeTab: EnvironmentTab;
  activeFilters: string[];
  onToggle: (filterId: string) => void;
}

export function MobileDiagnosticBar({
  activeTab,
  activeFilters,
  onToggle,
}: MobileDiagnosticBarProps) {
  const relevantFilters: DiagnosticFilter[] = diagnosticFilters.filter((f) =>
    f.environments.includes(activeTab)
  );

  if (relevantFilters.length === 0) return null;

  return (
    <div
      className="relative w-full bg-white md:hidden"
      aria-label="Diagnostic filters"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />

      <div
        className="
          flex gap-2 overflow-x-auto px-5 py-3
          [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
        role="group"
        aria-label="Space type filters"
      >
        {relevantFilters.map((filter) => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <button
              key={filter.id}
              id={`mobile-filter-${filter.id}`}
              onClick={() => onToggle(filter.id)}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5",
                "text-[0.75rem] font-semibold whitespace-nowrap",
                "transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/40",
                isActive
                  ? "border-[#3A7D2A]/20 bg-[#EAF5E4] text-[#2A5C1D]"
                  : "border-[#E5E7EB] bg-white text-[#6B7280]"
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

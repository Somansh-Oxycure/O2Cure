"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Solution } from "@/features/solutions/types";

interface SolutionPickerListProps {
  solutions: Solution[];
  activeSolutionId: string;
  onSelect: (id: string) => void;
}

/**
 * SolutionPickerList
 *
 * Desktop: Vertical list in the sidebar area — compact rows a user clicks
 * to swap the main canvas display.
 *
 * Mobile: Horizontal scroll strip of compact cards — much smarter than
 * stacking everything vertically.
 */
export function SolutionPickerList({
  solutions,
  activeSolutionId,
  onSelect,
}: SolutionPickerListProps) {
  if (solutions.length === 0) return null;

  return (
    <>
      {/* ── Desktop: vertical list ─────────────────────────────────── */}
      <nav
        aria-label="Available solutions"
        className="hidden flex-col gap-2 md:flex"
      >
        <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#9CA3AF]">
          Available Systems
        </p>
        {solutions.map((s, i) => {
          const isActive = s.id === activeSolutionId;
          return (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelect(s.id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "group w-full rounded-xl border px-4 py-3 text-left",
                "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/40",
                isActive
                  ? "border-[#3A7D2A]/20 bg-[#EAF5E4] shadow-[0_2px_8px_rgba(58,125,42,0.12)]"
                  : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:bg-[#FAFAFA]"
              )}
            >
              <p
                className={cn(
                  "text-[0.8125rem] font-semibold leading-snug transition-colors",
                  isActive ? "text-[#2A5C1D]" : "text-[#1C1C1C]"
                )}
              >
                {s.systemName}
              </p>
              <p className="mt-0.5 text-[0.75rem] text-[#9CA3AF]">
                Up to {s.capacityMaxSqFt.toLocaleString()} sq. ft.
              </p>
            </motion.button>
          );
        })}
      </nav>

      {/* ── Mobile: horizontal scroll strip ───────────────────────── */}
      <div className="relative w-full md:hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#F5F5F4] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#F5F5F4] to-transparent" />

        <div
          className="
            flex gap-3 overflow-x-auto px-5 pb-1
            [scrollbar-width:none] [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
          role="listbox"
          aria-label="Select a solution"
        >
          {solutions.map((s) => {
            const isActive = s.id === activeSolutionId;
            return (
              <button
                key={s.id}
                role="option"
                aria-selected={isActive}
                onClick={() => onSelect(s.id)}
                className={cn(
                  "shrink-0 rounded-2xl border p-4 text-left",
                  "w-48 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/40",
                  isActive
                    ? "border-[#3A7D2A]/20 bg-[#EAF5E4] shadow-[0_2px_12px_rgba(58,125,42,0.15)]"
                    : "border-[#E5E7EB] bg-white"
                )}
              >
                <p
                  className={cn(
                    "text-[0.8rem] font-semibold leading-snug",
                    isActive ? "text-[#2A5C1D]" : "text-[#1C1C1C]"
                  )}
                >
                  {s.systemName}
                </p>
                <p className="mt-1 text-[0.7rem] text-[#9CA3AF]">
                  {s.integrationType}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

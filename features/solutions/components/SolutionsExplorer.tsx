"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { solutions } from "@/features/solutions/content";
import type { EnvironmentTab } from "@/features/solutions/types";
import { EnvironmentTabBar } from "./EnvironmentTabBar";
import { DiagnosticSidebar, MobileDiagnosticBar } from "./DiagnosticFilterBar";
import { SolutionPickerList } from "./SolutionPickerList";
import { SolutionCanvas } from "./SolutionCanvas";

/**
 * SolutionsExplorer
 *
 * Orchestrates the full blueprint layout:
 *
 * ┌─────────────────────────────────────────────┐
 * │         Environment Tab Bar (§1.2)           │
 * ├─────────────────────────────────────────────┤
 * │   Mobile Diagnostic Pill Strip (§1.3)        │
 * │   Mobile Solution Picker Strip               │
 * ├──────────────┬──────────────────────────────┤
 * │ Sidebar      │     Main Canvas (§2)          │
 * │ (§1.3)       │ • Render (§2.1)               │
 * │ Filter pills │ • Badges (§2.3)               │
 * │              │ • Calculator (§2.2)           │
 * │ Solution     │ • CTA (§2.4)                  │
 * │ picker list  │                               │
 * └──────────────┴──────────────────────────────┘
 */
export function SolutionsExplorer() {
  const [activeTab, setActiveTab] = useState<EnvironmentTab>("corporate");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeSolutionId, setActiveSolutionId] = useState<string>(
    "reme-halo-01"
  );

  // Filtered solution list based on active tab + selected filter pills
  const filteredSolutions = useMemo(() => {
    let result = solutions.filter((s) =>
      s.environmentTarget.includes(activeTab)
    );
    if (activeFilters.length > 0) {
      result = result.filter((s) =>
        activeFilters.some((f) => s.filterTags.includes(f))
      );
    }
    return result;
  }, [activeTab, activeFilters]);

  // Keep activeSolutionId valid when tab / filters change
  const validSolution =
    filteredSolutions.find((s) => s.id === activeSolutionId) ??
    filteredSolutions[0];

  const handleTabChange = (tab: EnvironmentTab) => {
    setActiveTab(tab);
    setActiveFilters([]);
    // Pre-select first solution of new tab
    const first = solutions.find((s) => s.environmentTarget.includes(tab));
    if (first) setActiveSolutionId(first.id);
  };

  const handleFilterToggle = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="flex flex-col">
      {/* ── Tab bar ───────────────────────────────────────────────── */}
      <EnvironmentTabBar active={activeTab} onChange={handleTabChange} />

      {/* ── Mobile diagnostic pill strip ──────────────────────────── */}
      <MobileDiagnosticBar
        activeTab={activeTab}
        activeFilters={activeFilters}
        onToggle={handleFilterToggle}
      />

      {/* ── Mobile solution picker strip ──────────────────────────── */}
      <div className="bg-[#F5F5F4] px-0 py-4 md:hidden">
        <SolutionPickerList
          solutions={filteredSolutions}
          activeSolutionId={validSolution?.id ?? ""}
          onSelect={setActiveSolutionId}
        />
      </div>

      {/* ── Main body: sidebar + canvas ───────────────────────────── */}
      <div className="flex flex-1 gap-6 bg-[#F5F5F4] p-5 md:gap-8 md:p-8 lg:p-10">
        {/* Left sidebar — desktop only */}
        <div className="hidden flex-col gap-8 md:flex md:w-56 lg:w-60">
          <DiagnosticSidebar
            activeTab={activeTab}
            activeFilters={activeFilters}
            onToggle={handleFilterToggle}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SolutionPickerList
                solutions={filteredSolutions}
                activeSolutionId={validSolution?.id ?? ""}
                onSelect={setActiveSolutionId}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main canvas */}
        <div className="flex min-w-0 flex-1 flex-col">
          {validSolution ? (
            <SolutionCanvas solution={validSolution} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-3 py-20 text-center"
            >
              <p className="text-[0.95rem] font-semibold text-[#1C1C1C]">
                No systems match these filters.
              </p>
              <button
                onClick={() => setActiveFilters([])}
                className="text-[0.8rem] text-[#3A7D2A] underline-offset-2 hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

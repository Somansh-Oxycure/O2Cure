/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { IssueId, AirIssueWizardState, RecommendationResult } from "@/features/solutions/types";
import {
  airIssues,
  spaceTypeOptions,
  getRecommendations,
  getImpactStats,
} from "@/features/solutions/data/issueFinderData";

// ─── Step indicators ───────────────────────────────────────────────────────

const STEPS = [
  { num: 1, label: "Your Issues" },
  { num: 2, label: "Your Space" },
  { num: 3, label: "Results" },
] as const;

// ─── Step 1: Issue selector ────────────────────────────────────────────────

function IssueSelector({
  selected,
  onToggle,
}: {
  selected: IssueId[];
  onToggle: (id: IssueId) => void;
}) {
  return (
    <div>
      <h3 className="mb-2 text-[1.05rem] font-bold text-[#1C1C1C]">
        What's affecting your air quality?
      </h3>
      <p className="mb-6 text-[0.85rem] text-[#6B7280]">
        Select all that apply — we'll find the best solution for your exact situation.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
        {airIssues.map((issue, i) => {
          const isSelected = selected.includes(issue.id);
          return (
            <motion.button
              key={issue.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onToggle(issue.id)}
              id={`issue-btn-${issue.id}`}
              aria-pressed={isSelected}
              className={cn(
                "group relative flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left",
                "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/50",
                isSelected
                  ? "shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                  : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-sm"
              )}
              style={
                isSelected
                  ? {
                      backgroundColor: issue.bgColor,
                      borderColor: issue.color,
                    }
                  : {}
              }
            >
              {/* Checkmark */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "backOut" }}
                    className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ backgroundColor: issue.color }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4l2.5 2.5L9 1"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="text-2xl">{issue.emoji}</span>
              <div>
                <p
                  className="text-[0.85rem] font-bold leading-snug"
                  style={{ color: isSelected ? issue.color : "#1C1C1C" }}
                >
                  {issue.label}
                </p>
                <p className="mt-0.5 text-[0.72rem] leading-snug text-[#9CA3AF]">
                  {issue.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: Space configurator ────────────────────────────────────────────

function SpaceConfigurator({
  state,
  onChange,
}: {
  state: AirIssueWizardState;
  onChange: (partial: Partial<AirIssueWizardState>) => void;
}) {
  const areaFill =
    ((state.areaSqFt - 100) / (15000 - 100)) * 100;
  const occupantFill = ((state.occupants - 1) / 99) * 100;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 text-[1.05rem] font-bold text-[#1C1C1C]">
          Tell us about your space
        </h3>
        <p className="text-[0.85rem] text-[#6B7280]">
          We'll use this to calculate how many units you need and tailor our recommendation.
        </p>
      </div>

      {/* Space type */}
      <div>
        <label className="mb-3 block text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
          Space Type
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {spaceTypeOptions.map((opt) => {
            const isActive = state.spaceType === opt.id;
            return (
              <button
                key={opt.id}
                id={`space-type-${opt.id}`}
                onClick={() => onChange({ spaceType: opt.id })}
                aria-pressed={isActive}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-2xl border-2 px-3 py-4 text-center",
                  "transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/50",
                  isActive
                    ? "border-[#3A7D2A] bg-[#EAF5E4] shadow-[0_4px_16px_rgba(58,125,42,0.15)]"
                    : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]"
                )}
              >
                <span className="text-2xl">{opt.label.split(" ")[0]}</span>
                <span
                  className={cn(
                    "text-[0.8rem] font-semibold",
                    isActive ? "text-[#2A5C1D]" : "text-[#1C1C1C]"
                  )}
                >
                  {opt.label.split(" ").slice(1).join(" ")}
                </span>
                <span className="text-[0.7rem] text-[#9CA3AF]">{opt.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Area slider */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label
            htmlFor="space-area-slider"
            className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]"
          >
            Space Area
          </label>
          <motion.span
            key={state.areaSqFt}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[1rem] font-bold tabular-nums text-[#3A7D2A]"
          >
            {state.areaSqFt.toLocaleString()} sq. ft.
          </motion.span>
        </div>
        <div className="relative flex h-6 items-center">
          <div className="absolute h-2 w-full rounded-full bg-[#E5E7EB]" />
          <div
            className="absolute h-2 rounded-full bg-gradient-to-r from-[#3A7D2A] to-[#5BAD46] transition-all duration-75"
            style={{ width: `${areaFill}%` }}
          />
          <input
            id="space-area-slider"
            type="range"
            min={100}
            max={15000}
            step={100}
            value={state.areaSqFt}
            onChange={(e) => onChange({ areaSqFt: Number(e.target.value) })}
            className="
              absolute w-full cursor-pointer appearance-none bg-transparent
              [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-[0_0_0_2.5px_#3A7D2A,0_2px_6px_rgba(0,0,0,0.15)]
              [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-[#3A7D2A] [&::-moz-range-thumb]:bg-white
              focus-visible:outline-none
            "
          />
        </div>
        <div className="mt-2 flex justify-between text-[0.72rem] text-[#9CA3AF]">
          <span>100 sq. ft.</span>
          <span>15,000 sq. ft.</span>
        </div>
      </div>

      {/* Occupants slider */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label
            htmlFor="occupants-slider"
            className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]"
          >
            Number of Occupants
          </label>
          <motion.span
            key={state.occupants}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[1rem] font-bold tabular-nums text-[#3A7D2A]"
          >
            {state.occupants >= 100 ? "100+" : state.occupants}{" "}
            {state.occupants === 1 ? "person" : "people"}
          </motion.span>
        </div>
        <div className="relative flex h-6 items-center">
          <div className="absolute h-2 w-full rounded-full bg-[#E5E7EB]" />
          <div
            className="absolute h-2 rounded-full bg-gradient-to-r from-[#3A7D2A] to-[#5BAD46] transition-all duration-75"
            style={{ width: `${occupantFill}%` }}
          />
          <input
            id="occupants-slider"
            type="range"
            min={1}
            max={100}
            step={1}
            value={state.occupants}
            onChange={(e) => onChange({ occupants: Number(e.target.value) })}
            className="
              absolute w-full cursor-pointer appearance-none bg-transparent
              [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-[0_0_0_2.5px_#3A7D2A,0_2px_6px_rgba(0,0,0,0.15)]
              [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-[#3A7D2A] [&::-moz-range-thumb]:bg-white
              focus-visible:outline-none
            "
          />
        </div>
        <div className="mt-2 flex justify-between text-[0.72rem] text-[#9CA3AF]">
          <span>1 person</span>
          <span>100+ people</span>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Results ────────────────────────────────────────────────────────

function ResultsPanel({
  results,
  wizardState,
  onReset,
}: {
  results: RecommendationResult[];
  wizardState: AirIssueWizardState;
  onReset: () => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-[1rem] font-semibold text-[#1C1C1C]">
          No strong matches found for this combination.
        </p>
        <button
          onClick={onReset}
          className="rounded-xl bg-[#3A7D2A] px-5 py-2.5 text-[0.875rem] font-semibold text-white hover:bg-[#2A5C1D] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const selectedIssueLabels = wizardState.selectedIssues
    .map((id) => airIssues.find((a) => a.id === id)?.label)
    .filter(Boolean);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[1.05rem] font-bold text-[#1C1C1C]">
            Your Recommended Systems
          </h3>
          <p className="mt-1 text-[0.82rem] text-[#6B7280]">
            Based on{" "}
            <span className="font-semibold text-[#1C1C1C]">
              {selectedIssueLabels.join(", ")}
            </span>{" "}
            in a {wizardState.areaSqFt.toLocaleString()} sq. ft.{" "}
            {wizardState.spaceType} space with {wizardState.occupants} occupant
            {wizardState.occupants !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={onReset}
          id="wizard-reset-btn"
          className="shrink-0 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-[0.78rem] font-semibold text-[#6B7280] transition-colors hover:border-[#D1D5DB] hover:text-[#1C1C1C]"
        >
          Start Over
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {results.map((result, i) => {
          const isTop = i === 0;
          const isExpanded = expandedId === result.solution.id;
          const impactStats = getImpactStats(result);
          const scoreColor =
            result.score >= 80 ? "#059669" : result.score >= 60 ? "#D97706" : "#6B7280";

          return (
            <motion.div
              key={result.solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "overflow-hidden rounded-2xl border bg-white",
                isTop
                  ? "border-[#3A7D2A]/30 shadow-[0_4px_24px_rgba(58,125,42,0.12)]"
                  : "border-[#E5E7EB] shadow-sm"
              )}
            >
              {/* Top badge */}
              {isTop && (
                <div className="bg-[#3A7D2A] px-5 py-2">
                  <span className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
                    ⭐ Best Match for You
                  </span>
                </div>
              )}

              <div className="flex gap-4 p-5 sm:gap-6">
                {/* Product image */}
                <div className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.solution.image.src}
                    alt={result.solution.image.alt}
                    className="h-20 w-20 rounded-xl object-contain bg-[#F5F5F4] p-1"
                  />
                </div>

                {/* Main content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-[0.95rem] font-bold leading-snug text-[#1C1C1C]">
                        {result.solution.systemName}
                      </h4>
                      <p className="mt-0.5 text-[0.78rem] text-[#9CA3AF]">
                        {result.solution.integrationType}
                      </p>
                    </div>

                    {/* Match score ring */}
                    <div className="shrink-0 text-right">
                      <div
                        className="text-[1.25rem] font-black tabular-nums"
                        style={{ color: scoreColor }}
                      >
                        {result.score}%
                      </div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                        match
                      </p>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: scoreColor }}
                    />
                  </div>

                  {/* Primary reason */}
                  <p className="mt-3 text-[0.8rem] leading-[1.5] text-[#4B5563]">
                    {result.primaryReason}
                  </p>

                  {/* Impact stats */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {impactStats.map((stat) => (
                      <span
                        key={stat.label}
                        className="rounded-full border px-2.5 py-0.5 text-[0.68rem] font-semibold"
                        style={{
                          borderColor: `${stat.color}30`,
                          backgroundColor: `${stat.color}10`,
                          color: stat.color,
                        }}
                      >
                        {stat.value}
                      </span>
                    ))}
                    {result.unitsNeeded > 1 && (
                      <span className="rounded-full border border-[#7C3AED]/20 bg-[#F5F3FF] px-2.5 py-0.5 text-[0.68rem] font-semibold text-[#7C3AED]">
                        {result.unitsNeeded}× units for your area
                      </span>
                    )}
                  </div>

                  {/* Expand/collapse why section */}
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      id={`expand-why-${result.solution.id}`}
                      onClick={() =>
                        setExpandedId(isExpanded ? null : result.solution.id)
                      }
                      className="text-[0.78rem] font-semibold text-[#3A7D2A] underline-offset-2 hover:underline"
                    >
                      {isExpanded ? "Hide details ↑" : "Why this product? ↓"}
                    </button>
                    <button
                      id={`result-cta-${result.solution.id}`}
                      className={cn(
                        "ml-auto rounded-xl px-4 py-2 text-[0.8rem] font-semibold text-white",
                        "transition-all duration-250 hover:-translate-y-0.5",
                        isTop
                          ? "bg-[#3A7D2A] shadow-[0_4px_12px_rgba(58,125,42,0.25)] hover:shadow-[0_6px_20px_rgba(58,125,42,0.35)]"
                          : "bg-[#1C1C1C] hover:bg-[#374151]"
                      )}
                    >
                      {result.solution.ctaText}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded detail panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[#E5E7EB] bg-[#FAFAFA] px-5 py-4">
                      <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                        Detailed Impact Analysis
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {wizardState.selectedIssues.map((issueId) => {
                          const issue = airIssues.find((a) => a.id === issueId);
                          const relevance = result.solution.issueRelevance[issueId] ?? 0;
                          const impact = result.solution.issueImpact?.[issueId];
                          const pct = Math.round(relevance * 100);
                          if (!issue) return null;
                          return (
                            <div
                              key={issueId}
                              className="rounded-xl border border-[#E5E7EB] bg-white p-3"
                            >
                              <div className="mb-2 flex items-center justify-between gap-2">
                                <span className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#1C1C1C]">
                                  <span>{issue.emoji}</span> {issue.label}
                                </span>
                                <span
                                  className="text-[0.72rem] font-bold"
                                  style={{
                                    color:
                                      pct >= 80
                                        ? "#059669"
                                        : pct >= 60
                                        ? "#D97706"
                                        : "#9CA3AF",
                                  }}
                                >
                                  {pct}%
                                </span>
                              </div>
                              {/* Mini progress bar */}
                              <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${pct}%`,
                                    backgroundColor:
                                      pct >= 80
                                        ? "#059669"
                                        : pct >= 60
                                        ? "#D97706"
                                        : "#9CA3AF",
                                  }}
                                />
                              </div>
                              {impact && (
                                <p className="text-[0.72rem] leading-snug text-[#6B7280]">
                                  {impact}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {/* Badges */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {result.solution.badges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-full border border-[#3A7D2A]/15 bg-[#EAF5E4] px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.05em] text-[#2A5C1D]"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

const DEFAULT_STATE: AirIssueWizardState = {
  selectedIssues: [],
  occupants: 4,
  areaSqFt: 1500,
  spaceType: "residential",
};

export function AirIssueFinder() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [wizardState, setWizardState] = useState<AirIssueWizardState>(DEFAULT_STATE);
  const [results, setResults] = useState<RecommendationResult[]>([]);

  const updateState = useCallback((partial: Partial<AirIssueWizardState>) => {
    setWizardState((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleIssue = useCallback((id: IssueId) => {
    setWizardState((prev) => ({
      ...prev,
      selectedIssues: prev.selectedIssues.includes(id)
        ? prev.selectedIssues.filter((i) => i !== id)
        : [...prev.selectedIssues, id],
    }));
  }, []);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) {
      const recs = getRecommendations(wizardState);
      setResults(recs);
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setWizardState(DEFAULT_STATE);
    setResults([]);
  };

  const canProceed = step === 1 ? wizardState.selectedIssues.length > 0 : true;

  return (
    <section
      id="air-issue-finder"
      className="bg-gradient-to-b from-[#F0FDF4] to-white py-16 px-5 md:px-10"
      aria-label="Air Issue Finder"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#3A7D2A]">
            Personalized Finder
          </p>
          <h2 className="text-[clamp(1.5rem,1.2rem+2vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[#1C1C1C]">
            What issue are you facing?
          </h2>
          <p className="mt-3 text-[0.9rem] leading-[1.6] text-[#6B7280]">
            Tell us your air quality problems, space details, and we'll calculate the exact solution —
            with real impact numbers.
          </p>
        </motion.div>

        {/* Wizard card */}
        <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)]">
          {/* Step progress bar */}
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex items-center gap-0">
              {STEPS.map((s, i) => {
                const isDone = step > s.num;
                const isActive = step === s.num;
                return (
                  <div key={s.num} className="flex flex-1 items-center">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-bold transition-all duration-300",
                          isDone
                            ? "bg-[#3A7D2A] text-white"
                            : isActive
                            ? "border-2 border-[#3A7D2A] text-[#3A7D2A]"
                            : "border-2 border-[#E5E7EB] text-[#9CA3AF]"
                        )}
                      >
                        {isDone ? (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4l2.5 2.5L9 1"
                              stroke="white"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          s.num
                        )}
                      </div>
                      <span
                        className={cn(
                          "hidden text-[0.78rem] font-semibold sm:block transition-colors",
                          isActive ? "text-[#1C1C1C]" : "text-[#9CA3AF]"
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={cn(
                          "mx-3 h-[2px] flex-1 rounded-full transition-all duration-500",
                          step > s.num ? "bg-[#3A7D2A]" : "bg-[#E5E7EB]"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: step > 1 ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: step > 1 ? -24 : 24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 1 && (
                  <IssueSelector
                    selected={wizardState.selectedIssues}
                    onToggle={toggleIssue}
                  />
                )}
                {step === 2 && (
                  <SpaceConfigurator state={wizardState} onChange={updateState} />
                )}
                {step === 3 && (
                  <ResultsPanel
                    results={results}
                    wizardState={wizardState}
                    onReset={handleReset}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation footer */}
          {step < 3 && (
            <div className="flex items-center justify-between border-t border-[#E5E7EB] bg-[#FAFAFA] px-6 py-4">
              <button
                id="wizard-back-btn"
                onClick={handleBack}
                disabled={step === 1}
                className={cn(
                  "rounded-xl px-5 py-2.5 text-[0.85rem] font-semibold transition-all",
                  step === 1
                    ? "invisible"
                    : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#1C1C1C]"
                )}
              >
                ← Back
              </button>

              <div className="flex items-center gap-3">
                {step === 1 && wizardState.selectedIssues.length > 0 && (
                  <span className="text-[0.78rem] text-[#9CA3AF]">
                    {wizardState.selectedIssues.length} selected
                  </span>
                )}
                <button
                  id="wizard-next-btn"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={cn(
                    "rounded-xl px-6 py-2.5 text-[0.875rem] font-semibold text-white",
                    "transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/50",
                    canProceed
                      ? "bg-[#3A7D2A] shadow-[0_4px_12px_rgba(58,125,42,0.25)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(58,125,42,0.35)]"
                      : "cursor-not-allowed bg-[#D1D5DB] text-[#9CA3AF]"
                  )}
                >
                  {step === 2 ? "Find My Solution →" : "Next →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

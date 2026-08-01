"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { calculatorConfig, getCalculatorOutput } from "@/features/solutions/content";
import type { Solution } from "@/features/solutions/types";

interface SolutionCanvasProps {
  solution: Solution;
}

/**
 * SolutionCanvas — blueprint §2
 *
 * The main display panel. Shows:
 * 1. Sunlit product render (§2.1)
 * 2. Science / certification badges (§2.3)
 * 3. Slim interactive capacity calculator (§2.2)
 * 4. Single primary CTA (§2.4)
 *
 * Transitions smoothly in/out on solution change: 600ms cubic-bezier(0.16,1,0.3,1).
 * NO long descriptions. NO capability bullet lists. Keep it focused.
 */
export function SolutionCanvas({ solution }: SolutionCanvasProps) {
  const sliderId = useId();
  const [area, setArea] = useState(
    Math.min(solution.capacityMaxSqFt, calculatorConfig.defaultArea)
  );

  const output = getCalculatorOutput(area, solution);
  const fillPct =
    ((area - calculatorConfig.areaMin) /
      (calculatorConfig.areaMax - calculatorConfig.areaMin)) *
    100;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={solution.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-1 flex-col gap-6"
        role="tabpanel"
        aria-label={`Solution: ${solution.systemName}`}
      >
        {/* ── Integration type badge ── */}
        <span className="self-start rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.07em] text-[#6B7280] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {solution.integrationType}
        </span>

        {/* ── Product render (blueprint §2.1: sunlit, pure white bg) ── */}
        <div
          className="
            relative w-full overflow-hidden rounded-2xl
            bg-gradient-to-br from-white to-[#F5F5F4]
            border border-[#E5E7EB]
          "
          style={{ minHeight: 280 }}
        >
          {solution.image.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={solution.image.src}
              alt={solution.image.alt}
              className="h-full w-full object-contain p-8 md:max-h-72"
              loading="lazy"
            />
          ) : (
            /* Placeholder — soft airflow-inspired illustration */
            <div className="flex h-full min-h-[280px] items-center justify-center">
              <div className="flex flex-col items-center gap-3 opacity-30">
                {[64, 88, 112, 88, 64].map((w, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full bg-[#2B6CB0]"
                    style={{ width: w }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── System name + tagline ── */}
        <div>
          <h2 className="text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.025em] text-[#1C1C1C]">
            {solution.systemName}
          </h2>
          <p className="mt-2 text-[0.875rem] leading-[1.6] text-[#6B7280]">
            {solution.tagline}
          </p>
        </div>

        {/* ── Science badges (blueprint §2.3) ── */}
        <div className="flex flex-wrap gap-2" aria-label="Certifications and technology badges">
          {solution.badges.map((badge) => (
            <span
              key={badge}
              className="
                rounded-full border border-[#3A7D2A]/15
                bg-[#EAF5E4] px-3 py-1
                text-[0.7rem] font-semibold uppercase tracking-[0.05em] text-[#2A5C1D]
              "
            >
              {badge}
            </span>
          ))}
        </div>

        {/* ── Capacity calculator (blueprint §2.2) ── */}
        <div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(43,108,176,0.08)]"
          aria-label="Live capacity calculator"
        >
          <div className="mb-4 flex items-center justify-between">
            <label
              htmlFor={sliderId}
              className="text-[0.8rem] font-semibold text-[#1C1C1C]"
            >
              Space Area
            </label>
            <AnimatePresence mode="wait">
              <motion.span
                key={area}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="tabular-nums text-[0.875rem] font-bold text-[#3A7D2A]"
                aria-live="polite"
              >
                {area.toLocaleString()} sq. ft.
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Slider */}
          <div className="relative mb-3 flex h-5 items-center">
            <div className="absolute h-1.5 w-full rounded-full bg-[#E5E7EB]" />
            <div
              className="absolute h-1.5 rounded-full bg-[#3A7D2A] transition-all duration-75"
              style={{ width: `${fillPct}%` }}
            />
            <input
              id={sliderId}
              type="range"
              min={calculatorConfig.areaMin}
              max={calculatorConfig.areaMax}
              step={calculatorConfig.areaStep}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="
                absolute w-full cursor-pointer appearance-none bg-transparent
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_#3A7D2A,0_2px_4px_rgba(0,0,0,0.12)]
                [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
                [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-[#3A7D2A] [&::-moz-range-thumb]:bg-white
                focus-visible:outline-none
              "
              aria-valuemin={calculatorConfig.areaMin}
              aria-valuemax={calculatorConfig.areaMax}
              aria-valuenow={area}
              aria-valuetext={`${area.toLocaleString()} square feet`}
            />
          </div>

          {/* Output text (blueprint §2.2 example style) */}
          <AnimatePresence mode="wait">
            <motion.p
              key={output.summary}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl bg-[#F5F5F4] px-4 py-3 text-[0.8125rem] leading-[1.5] text-[#1C1C1C]"
              aria-live="polite"
            >
              {output.summary}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── Primary CTA (blueprint §2.4) ── */}
        <button
          id={`solution-cta-${solution.id}`}
          className={cn(
            "w-full rounded-xl bg-[#3A7D2A] px-6 py-4",
            "text-[0.9rem] font-semibold text-white",
            "shadow-[0_4px_16px_rgba(58,125,42,0.25)]",
            "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(58,125,42,0.35)]",
            "active:translate-y-0 active:scale-[0.99]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/50 focus-visible:ring-offset-2"
          )}
          aria-label={`${solution.ctaText} for ${solution.systemName}`}
        >
          {solution.ctaText}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

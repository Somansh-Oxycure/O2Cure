"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getRecommendation,
  type DiagnosticState,
  type ResidentialRecommendation,
} from "../data/mock";
import { ThreatVectorStep } from "./ThreatVectorStep";
import { SpatialLayoutStep } from "./SpatialLayoutStep";
import { OccupancySliderStep } from "./OccupancySliderStep";
import { DiagnosticResultSection } from "./DiagnosticResultSection";

const STEPS = [
  {
    id: "threats",
    number: "01",
    label: "Threat Vectors",
    description: "What are you experiencing?",
  },
  {
    id: "layout",
    number: "02",
    label: "Spatial Blueprint",
    description: "Where is this occurring?",
  },
  {
    id: "scale",
    number: "03",
    label: "Occupancy & Scale",
    description: "Area and resident count",
  },
];

export function DiagnosticEngine() {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState<DiagnosticState>({
    threats: [],
    layout: "",
    areaSqFt: 800,
    occupancy: 3,
  });
  const [recommendation, setRecommendation] =
    useState<ResidentialRecommendation | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const canAdvance = useCallback(() => {
    if (activeStep === 0) return state.threats.length > 0;
    if (activeStep === 1) return state.layout !== "";
    return true;
  }, [activeStep, state]);

  const handleAdvance = () => {
    if (activeStep < 2) {
      setActiveStep((s) => s + 1);
    } else {
      // Generate recommendation
      const rec = getRecommendation(state);
      setRecommendation(rec);
      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1);
  };

  const handleReset = () => {
    setRecommendation(null);
    setActiveStep(0);
    setState({ threats: [], layout: "", areaSqFt: 800, occupancy: 3 });
  };

  const isComplete = recommendation !== null;

  return (
    <section
      id="diagnostic-engine"
      className="bg-[#F7FAFD] py-20 md:py-28"
      aria-label="Home Air Diagnostic Engine"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Section header */}
        <div className="mb-12 max-w-xl">
          <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#C5A059]">
            3-Step Diagnostic
          </p>
          <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] font-bold tracking-[-0.03em] text-[#1C1C1C]">
            Your Home Air Diagnosis
          </h2>
          <p className="mt-3 text-[0.9rem] leading-[1.65] text-[#6B7280]">
            Answer three spatial questions. We&apos;ll engineer a precise air
            purification recommendation around your home.
          </p>
        </div>

        {!isComplete && (
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* ── Step navigator (sidebar) ── */}
            <aside aria-label="Diagnostic steps" className="hidden lg:block">
              <div className="sticky top-28 space-y-2">
                {STEPS.map((step, idx) => {
                  const status =
                    idx < activeStep
                      ? "done"
                      : idx === activeStep
                      ? "active"
                      : "idle";
                  return (
                    <button
                      key={step.id}
                      type="button"
                      id={`step-nav-${step.id}`}
                      onClick={() => {
                        // Only allow going back, or forward if steps are valid
                        if (idx < activeStep) setActiveStep(idx);
                      }}
                      disabled={idx > activeStep}
                      className={`group flex w-full items-start gap-4 rounded-2xl p-4 text-left transition-all duration-300 ${
                        status === "active"
                          ? "bg-white shadow-sm border border-[#C5A059]/20"
                          : status === "done"
                          ? "hover:bg-white/60 cursor-pointer"
                          : "opacity-40 cursor-default"
                      }`}
                      aria-current={status === "active" ? "step" : undefined}
                    >
                      {/* Step number / checkmark */}
                      <div
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[0.75rem] font-bold transition-colors duration-300 ${
                          status === "done"
                            ? "bg-[#C5A059] text-white"
                            : status === "active"
                            ? "bg-[#C5A059] text-white"
                            : "border-2 border-gray-200 text-gray-400"
                        }`}
                      >
                        {status === "done" ? (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          step.number
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-[0.82rem] font-semibold ${
                            status === "active"
                              ? "text-[#C5A059]"
                              : status === "done"
                              ? "text-[#1A1C19]"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="mt-0.5 text-[0.72rem] text-[#6B7280]">
                          {step.description}
                        </p>
                      </div>
                    </button>
                  );
                })}

                {/* Progress */}
                <div className="mt-6 rounded-xl bg-white border border-gray-100 px-4 py-3">
                  <div className="mb-2 flex justify-between text-[0.68rem] font-medium text-gray-400">
                    <span>Progress</span>
                    <span>{Math.round(((activeStep) / 3) * 100)}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-[#F7F5F0]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#C5A059] to-[#D4B370]"
                      animate={{ width: `${(activeStep / 3) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Step content panel ── */}
            <div>
              {/* Mobile step indicator */}
              <div className="mb-6 flex items-center gap-3 lg:hidden">
                {STEPS.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      idx <= activeStep
                        ? idx < activeStep
                          ? "bg-[#C5A059]"
                          : "bg-[#C5A059]"
                        : "bg-gray-200"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8">
                {/* Step header */}
                <div className="mb-6">
                  <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
                    Step {STEPS[activeStep].number} of 03
                  </p>
                  <h3 className="text-[1.1rem] font-bold tracking-[-0.02em] text-[#1C1C1C]">
                    {STEPS[activeStep].label}
                  </h3>
                  <p className="mt-0.5 text-[0.8rem] text-[#6B7280]">
                    {STEPS[activeStep].description}
                  </p>
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {activeStep === 0 && (
                      <ThreatVectorStep
                        selected={state.threats}
                        onChange={(threats) =>
                          setState((s) => ({ ...s, threats }))
                        }
                      />
                    )}
                    {activeStep === 1 && (
                      <SpatialLayoutStep
                        selected={state.layout}
                        onChange={(layout) =>
                          setState((s) => ({ ...s, layout }))
                        }
                      />
                    )}
                    {activeStep === 2 && (
                      <OccupancySliderStep
                        areaSqFt={state.areaSqFt}
                        occupancy={state.occupancy}
                        onAreaChange={(areaSqFt) =>
                          setState((s) => ({ ...s, areaSqFt }))
                        }
                        onOccupancyChange={(occupancy) =>
                          setState((s) => ({ ...s, occupancy }))
                        }
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between border-t border-[#F3F4F6] pt-6">
                  <button
                    type="button"
                    id="diagnostic-back"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[0.82rem] font-medium text-[#6B7280] transition-colors hover:text-[#1C1C1C] disabled:pointer-events-none disabled:opacity-0"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>

                  <button
                    type="button"
                    id="diagnostic-next"
                    onClick={handleAdvance}
                    disabled={!canAdvance()}
                    className="group inline-flex items-center gap-2.5 rounded-xl bg-[#C5A059] px-6 py-3 text-[0.88rem] font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A88746] hover:shadow-md hover:shadow-[#C5A059]/25 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={
                      activeStep === 2
                        ? "Generate your air diagnosis"
                        : "Advance to next step"
                    }
                  >
                    {activeStep === 2 ? "Generate My Diagnosis" : "Continue"}
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Result Section ── */}
        <div ref={resultRef}>
          <AnimatePresence>
            {recommendation && (
              <DiagnosticResultSection
                recommendation={recommendation}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

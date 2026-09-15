"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getRecommendation,
  type DiagnosticState,
  type CommercialRecommendation,
} from "../data/mock";
import { CommercialThreatVectorStep } from "./CommercialThreatVectorStep";
import { CommercialSpaceTypeStep } from "./CommercialSpaceTypeStep";
import { CommercialDiagnosticResultSection } from "./CommercialDiagnosticResultSection";
import { CommercialFloorPlan } from "./CommercialFloorPlan";
import { CommercialLeadCaptureForm } from "./CommercialLeadCaptureForm";

const STEPS = [
  {
    id: "scale",
    number: "01",
    label: "Facility & Scale",
    description: "Define your commercial space",
  },
  {
    id: "threats",
    number: "02",
    label: "Threat Vectors",
    description: "What are the core issues?",
  },
];

export function CommercialDiagnosticEngine() {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState<DiagnosticState>({
    threats: [],
    layout: "office",
    spaceType: "corporate",
    areaSqFt: 5000,
    occupancy: 50, // kept for backward compatibility if needed elsewhere
  });
  const [recommendation, setRecommendation] =
    useState<CommercialRecommendation | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const canAdvance = useCallback(() => {
    if (activeStep === 0) return true;
    if (activeStep === 1) return state.threats.length > 0;
    return true;
  }, [activeStep, state]);

  const handleAdvance = () => {
    if (activeStep < 1) {
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
    setState({ threats: [], layout: "office", spaceType: "corporate", areaSqFt: 5000, occupancy: 50 });
  };

  const isComplete = recommendation !== null;

  return (
    <section
      id="diagnostic-engine"
      className="bg-[#F8FAFC] py-10 md:py-16"
      aria-label="Commercial Air Diagnostic Engine"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section header */}
        {!isComplete ? (
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4 flex items-center justify-center gap-3"
            >
              <div className="h-[1px] w-8 bg-[#2563EB]" />
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                Interactive Diagnostic
              </p>
              <div className="h-[1px] w-8 bg-[#2563EB]" />
            </motion.div>
            <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] font-bold tracking-[-0.03em] text-[#0F172A]">
              Engineer Your Facility
            </h2>
            <p className="mt-3 text-[0.9rem] leading-[1.65] text-[#6B7280] max-w-lg mx-auto">
              Watch your commercial space transform as we calculate the precise HVAC purification load required.
            </p>
          </div>
        ) : (
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4 flex items-center justify-center gap-3"
            >
              <div className="h-[1px] w-8 bg-[#2563EB]" />
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                Personalised Recommendation
              </p>
              <div className="h-[1px] w-8 bg-[#2563EB]" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="text-[clamp(1.8rem,1.5rem+2vw,2.75rem)] font-semibold tracking-[-0.02em] text-[#0F172A]"
            >
              Your Commercial Air Architecture
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              className="mt-4 text-[0.95rem] font-light text-gray-500 max-w-lg mx-auto"
            >
              Based on your spatial parameters, we recommend the following bespoke system configuration.
            </motion.p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {!isComplete ? (
              <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8">
                {/* Step header */}
                <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
                      Step {STEPS[activeStep].number} of 02
                    </p>
                    <h3 className="text-[1.1rem] font-bold tracking-[-0.02em] text-[#0F172A]">
                      {STEPS[activeStep].label}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    {STEPS.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === activeStep ? 'bg-[#2563EB]' : i < activeStep ? 'bg-[#3B82F6]' : 'bg-gray-200'}`} />
                    ))}
                  </div>
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
                      <CommercialSpaceTypeStep
                        spaceType={state.spaceType}
                        areaSqFt={state.areaSqFt}
                        onSpaceTypeChange={(spaceType) =>
                          setState((s) => ({ ...s, spaceType }))
                        }
                        onAreaChange={(areaSqFt) =>
                          setState((s) => ({ ...s, areaSqFt }))
                        }
                      />
                    )}
                    {activeStep === 1 && (
                      <CommercialThreatVectorStep
                        selected={state.threats}
                        onChange={(threats) =>
                          setState((s) => ({ ...s, threats }))
                        }
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between border-t border-[#F3F4F6] pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[0.82rem] font-medium text-[#6B7280] transition-colors hover:text-[#0F172A] ${activeStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleAdvance}
                    disabled={!canAdvance()}
                    className="group inline-flex items-center gap-2.5 rounded-xl bg-[#2563EB] px-6 py-3 text-[0.88rem] font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {activeStep === 1 ? "Generate System Design" : "Continue"}
                  </button>
                </div>
              </div>
            ) : (
              <div ref={resultRef}>
                <CommercialDiagnosticResultSection
                  recommendation={recommendation}
                  onReset={handleReset}
                />
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Visualizer (Sticky) */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-28 flex flex-col">
            <CommercialFloorPlan 
              spaceType={state.spaceType}
              areaSqFt={state.areaSqFt}
              threats={state.threats}
              isComplete={isComplete}
              productImage={recommendation?.imageUrl}
            />
            
            {/* CTA and Lead Form below visualizer */}
            <AnimatePresence>
              {isComplete && recommendation && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 flex flex-col"
                >
                  <CommercialLeadCaptureForm systemName={recommendation.systemName} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* WhatsApp Floating Popup */}
      <AnimatePresence>
        {isComplete && recommendation && (
          <motion.a
            href={`https://wa.me/918010111177?text=${encodeURIComponent(
              `Hello, I just used the O2Cure Air Diagnostic tool and got recommended the ${recommendation.systemName}. Can we discuss this?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[5.5rem] right-6 z-50 flex w-[260px] flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors hover:border-[#25D366]/30 group"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.55 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15.01 3.8 13.49 3.8 11.91C3.8 7.37 7.49 3.68 12.04 3.68C16.58 3.68 20.27 7.38 20.27 11.92C20.27 16.46 16.58 20.15 12.04 20.15Z" />
                </svg>
              </div>
              <div>
                <p className="text-[0.8rem] font-semibold text-[#1A1C19]">Get in touch directly</p>
                <p className="mt-0.5 text-[0.75rem] leading-[1.4] text-gray-500">
                  Discuss your <strong>{recommendation.systemName}</strong> solution on WhatsApp.
                </p>
              </div>
            </div>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-5 h-4 w-4 rotate-45 border-b border-r border-gray-100 bg-white" />
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  );
}

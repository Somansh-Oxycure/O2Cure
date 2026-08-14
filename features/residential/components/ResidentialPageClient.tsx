"use client";

/**
 * ResidentialPageClient
 *
 * Thin client wrapper that assembles the three major page sections
 * (Hero → DiagnosticEngine → SocialProof) and owns the scroll-to-diagnostic
 * callback triggered by the hero CTA button.
 */
import { useCallback } from "react";
import { ResidentialHero } from "./ResidentialHero";
import { ResidentialBenefitsSection } from "./ResidentialBenefitsSection";
import { DiagnosticEngine } from "./DiagnosticEngine";
import { SocialProofSection } from "./SocialProofSection";
import Link from "next/link";

export function ResidentialPageClient() {
  const scrollToDiagnostic = useCallback(() => {
    document
      .getElementById("diagnostic-engine")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main
      id="residential-main"
      className="flex min-h-screen flex-col bg-white"
    >
      {/* Section 1: Hero */}
      <ResidentialHero onBeginDiagnostic={scrollToDiagnostic} />

      {/* Section 2: Health/Benefits Section */}
      <ResidentialBenefitsSection />

      {/* Section 3: 3-Step Diagnostic Engine */}
      <DiagnosticEngine />

      {/* Section 4: Validation & Social Proof */}
      <SocialProofSection />

      {/* Section 5: Contact CTA */}
      <section className="bg-[#F8FAFC] py-16 md:py-20 border-t border-slate-100 text-center px-6">
        <h2 className="text-[clamp(1.8rem,2vw,2.5rem)] font-bold text-[#0F172A] mb-4">
          Ready to Transform Your Home's Air?
        </h2>
        <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
          Consult with our environmental specialists to design a custom purification system for your family's sanctuary.
        </p>
        <Link 
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-[#10B981] px-8 py-3.5 text-[0.95rem] font-medium text-white transition-all duration-300 hover:bg-[#059669] hover:shadow-lg hover:-translate-y-0.5"
        >
          Contact Us
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </section>
    </main>
  );
}

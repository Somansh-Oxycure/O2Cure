"use client";

import { LogoWall } from "@/features/trust/components/LogoWall";
import { clientLogos } from "@/features/trust/content";

export function ContactClientCarousel() {
  return (
    <section
      id="contact-trusted-by"
      aria-label="Enterprise clients who trust O₂Cure"
      className="relative bg-background py-6 overflow-hidden border-y border-border/50"
    >
      <div className="mb-6 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-brand-green/30" aria-hidden />
        <h3 className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green uppercase text-center">
          Trusted By Industry Leaders
        </h3>
        <span className="h-px w-8 bg-brand-green/30" aria-hidden />
      </div>
      <LogoWall logos={clientLogos} />
    </section>
  );
}

"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsPreview } from "@/features/trust/components/TestimonialsPreview";
import { testimonials } from "@/features/trust/content";
import { VideoTestimonials } from "@/features/trust/components/VideoTestimonials";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative bg-background py-4"
    >
      <div className="px-5 mt-4 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        {/* ── Header ── */}
        <header className="mx-auto max-w-5xl text-center">
          <Reveal delay={0} distance={20}>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/35" />
              <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
                Testimonials
              </span>
              <span className="h-px w-10 bg-brand-green/35" />
            </div>
          </Reveal>

          <Reveal delay={0.12} distance={24}>
            <h2
              id="testimonials-heading"
              className="font-heading text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]"
            >
              Proof is in the Air.
            </h2>
          </Reveal>
        </header>

        {/* ── Testimonials ── */}
        <div>
          <VideoTestimonials />

          <Reveal delay={0.2} distance={24}>
            <TestimonialsPreview testimonials={testimonials} />
          </Reveal>
        </div>

      </div>
    </section>
  );
}

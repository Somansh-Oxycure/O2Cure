"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsPreview } from "@/features/trust/components/TestimonialsPreview";
import { testimonials } from "@/features/trust/content";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative bg-background py-4"
    >
      <div className="px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        {/* ── Header ── */}
        <header className="mx-auto max-w-5xl text-center mb-14 sm:mb-16 lg:mb-20">
          <Reveal delay={0} distance={20}>
            <p className="text-eyebrow uppercase text-brand-blue">
              TESTIMONIALS
            </p>
          </Reveal>

          <Reveal delay={0.12} distance={24}>
            <h2
              id="testimonials-heading"
              className="mt-4 font-heading text-h2 text-foreground sm:mt-5"
            >
              What Our Clients Sayy
            </h2>
          </Reveal>
        </header>

        {/* ── Testimonials ── */}
        <div>
          <TestimonialsPreview testimonials={testimonials} />
        </div>

      </div>
    </section>
  );
}

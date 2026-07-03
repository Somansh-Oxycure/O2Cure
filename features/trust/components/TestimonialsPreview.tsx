"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TestimonialCard } from "@/features/trust/components/TestimonialCard";
import type { Testimonial } from "@/features/trust/types";

interface TestimonialsPreviewProps {
  testimonials: Testimonial[];
}

/**
 * Two premium testimonial cards — staggered reveal, stack on mobile.
 */
export function TestimonialsPreview({ testimonials }: TestimonialsPreviewProps) {
  return (
    <div
      className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10"
      aria-label="Client testimonials"
    >
      {testimonials.map((testimonial, index) => (
        <Reveal key={testimonial.id} delay={index * 0.14} distance={22} amount={0.25}>
          <TestimonialCard testimonial={testimonial} />
        </Reveal>
      ))}
    </div>
  );
}

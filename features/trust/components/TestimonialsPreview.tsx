"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { TestimonialCard } from "@/features/trust/components/TestimonialCard";
import type { Testimonial } from "@/features/trust/types";

interface TestimonialsPreviewProps {
  testimonials: Testimonial[];
}

/**
 * Premium testimonials carousel - displays a single 3-line testimonial card
 * that rotates horizontally every 3 seconds. Features auto-play pause on hover,
 * dot indicators, and touch-friendly navigation.
 */
export function TestimonialsPreview({ testimonials }: TestimonialsPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleNext = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  // Slide transition variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="w-full">
      {/* Section label */}
      <Reveal delay={0} distance={16}>
        <div className="mb-10 flex items-center gap-4 sm:mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
          <p className="text-eyebrow font-semibold uppercase tracking-widest text-brand-blue/70 text-xs">
            What Our Clients Say
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
        </div>
      </Reveal>

      {/* Testimonials Slider Wrapper */}
      <div
        className="relative mx-auto max-w-2xl px-2 sm:px-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden py-4 min-h-[360px] sm:min-h-[320px] flex items-center">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} className="h-full" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-[-16px] sm:left-0 top-1/2 -translate-y-1/2 z-10 flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/40 bg-white/90 backdrop-blur-sm text-foreground/75 shadow-sm transition-all hover:bg-white hover:text-brand-blue hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="size-4 sm:size-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-[-16px] sm:right-0 top-1/2 -translate-y-1/2 z-10 flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/40 bg-white/90 backdrop-blur-sm text-foreground/75 shadow-sm transition-all hover:bg-white hover:text-brand-blue hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Next testimonial"
        >
          <ChevronRight className="size-4 sm:size-5" />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "w-6 bg-brand-blue"
                : "w-2 bg-border/80 hover:bg-border"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

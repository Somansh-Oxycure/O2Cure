"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { TestimonialCard } from "@/features/trust/components/TestimonialCard";
import type { Testimonial } from "@/features/trust/types";

interface TestimonialsPreviewProps {
  testimonials: Testimonial[];
}

/**
 * Premium testimonials carousel - displays 3 or 4 testimonials at a time
 * that rotate every 4 seconds. Features auto-play pause on hover, responsive
 * item counts, dot indicators, and touch-friendly navigation.
 */
export function TestimonialsPreview({ testimonials }: TestimonialsPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Determine responsive visible cards count client-side
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  // Keep currentIndex in bounds if visibleCount changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  }, [maxIndex]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isHovered || maxIndex <= 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, maxIndex, handleNext]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 150, damping: 22 };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="w-full">
      {/* Section label */}
      {/* <Reveal delay={0} distance={16}>
        <div className="mb-10 flex items-center gap-4 sm:mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
          <p className="text-eyebrow font-semibold uppercase tracking-widest text-brand-blue/70 text-xs">
            What Our Clients Say
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
        </div>
      </Reveal> */}

      {/* Testimonials Slider Wrapper */}
      <div
        className="relative mx-auto max-w-7xl px-4 sm:px-12 lg:px-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden py-4">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
            transition={transition}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="shrink-0 px-3 flex"
                style={{
                  width: `${100 / visibleCount}%`,
                }}
              >
                <TestimonialCard testimonial={testimonial} className="w-full h-full" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        {maxIndex > 0 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-1 sm:left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-10 flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/40 bg-white/90 backdrop-blur-sm text-foreground/75 shadow-sm transition-all hover:bg-white hover:text-brand-blue hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-1 sm:right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-10 flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/40 bg-white/90 backdrop-blur-sm text-foreground/75 shadow-sm transition-all hover:bg-white hover:text-brand-blue hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Indicators */}
      {maxIndex > 0 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
                  ? "w-6 bg-brand-blue"
                  : "w-2 bg-border/80 hover:bg-border"
                }`}
              aria-label={`Go to testimonial slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

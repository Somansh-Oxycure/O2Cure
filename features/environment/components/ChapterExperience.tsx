"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

import { EnvironmentSection } from "@/features/environment/components/EnvironmentSection";

interface ChapterExperienceProps {
  hero: ReactNode;
}

/**
 * Orchestrates a simple scroll transition from the Hero to Chapter 2.
 */
export function ChapterExperience({ hero }: ChapterExperienceProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Hero content lifts and fades as user scrolls down
  const headlineLift = useTransform(scrollYProgress, [0, 0.9], [0, -72]);
  const headlineFade = useTransform(scrollYProgress, [0.55, 0.98], [1, 0]);

  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative">
        <motion.div
          style={
            reduced ? undefined : { y: headlineLift, opacity: headlineFade }
          }
        >
          {hero}
        </motion.div>
      </div>

      {/* A simple spacer between sections */}
      {/* <div
        aria-hidden
        className="h-2 bg-[#F5F5F4]"
      /> */}

      {/* ── SECTION 2: WHERE DO YOU BREATHE? ─────────────────────── */}
      <EnvironmentSection />
    </main>
  );
}

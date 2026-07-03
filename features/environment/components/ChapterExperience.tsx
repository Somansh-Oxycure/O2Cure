"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

import { HeroChapterTransition } from "@/features/environment/components/HeroChapterTransition";
import { EnvironmentSection } from "@/features/environment/components/EnvironmentSection";

interface ChapterExperienceProps {
  hero: ReactNode;
}

/**
 * Orchestrates the Hero → Chapter 2 cinematic handoff and the environment
 * selector. Hero component files remain untouched — transition is applied
 * via scroll-linked wrappers and overlays in this layer only.
 */
export function ChapterExperience({ hero }: ChapterExperienceProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const headlineLift = useTransform(scrollYProgress, [0, 0.9], [0, -72]);
  const headlineFade = useTransform(scrollYProgress, [0.55, 0.98], [1, 0]);

  return (
    <main>
      <div ref={heroRef} className="relative">
        <motion.div
          style={
            reduced ? undefined : { y: headlineLift, opacity: headlineFade }
          }
        >
          {hero}
        </motion.div>
        <HeroChapterTransition progress={scrollYProgress} />
      </div>

      {/* Brief clean-world pause before Chapter 2 — kept short so the
          environment heading rises while the hero is still fading out. */}
      <div
        aria-hidden
        className="h-[clamp(3rem,8vh,6rem)] bg-gradient-to-b from-background to-background"
      />

      <EnvironmentSection chapterProgress={scrollYProgress} />
    </main>
  );
}

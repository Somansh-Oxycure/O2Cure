"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { EnvironmentPanelStack } from "@/features/environment/components/EnvironmentPanelStack";
import { environmentContent } from "@/features/environment/content";

interface EnvironmentSectionProps {
  chapterProgress: MotionValue<number>;
}

/**
 * Chapter 2 — premium interactive environment selector.
 * Heading breathes, then stacked panels reveal without a card grid.
 */
export function EnvironmentSection({ chapterProgress }: EnvironmentSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  const headingOpacity = useTransform(chapterProgress, [0.66, 0.86], [0, 1]);
  const headingY = useTransform(
    chapterProgress,
    [0.66, 0.86],
    [reduced ? 0 : 28, 0],
  );
  // Interactive panels wait until the heading has fully settled — a short
  // reading beat before the chapter becomes explorable.
  const panelsOpacity = useTransform(chapterProgress, [0.9, 1], [0, 1]);
  const panelsY = useTransform(
    chapterProgress,
    [0.9, 1],
    [reduced ? 0 : 20, 0],
  );

  return (
    <section
      id="environments"
      aria-labelledby="environments-heading"
      className="flex min-h-dvh flex-col bg-background px-5 pb-10 pt-4 sm:px-8 sm:pb-12 lg:px-[clamp(2rem,5vw,4rem)]"
    >
      <header className="mx-auto w-full max-w-5xl shrink-0 text-center">
        {reduced ? (
          <>
            <h2
              id="environments-heading"
              className="font-heading text-h2 text-foreground"
            >
              {environmentContent.heading}
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {environmentContent.supporting}
            </p>
          </>
        ) : (
          <motion.div style={{ opacity: headingOpacity, y: headingY }}>
            <h2
              id="environments-heading"
              className="font-heading text-h2 text-foreground"
            >
              {environmentContent.heading}
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {environmentContent.supporting}
            </p>
          </motion.div>
        )}
      </header>

      <motion.div
        className="mx-auto mt-8 w-full max-w-5xl flex-1 sm:mt-10"
        style={
          reduced ? undefined : { opacity: panelsOpacity, y: panelsY }
        }
      >
        <EnvironmentPanelStack />
      </motion.div>
    </section>
  );
}

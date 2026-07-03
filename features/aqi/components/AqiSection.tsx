"use client";

import { useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { O2CureEffectExperience } from "@/features/aqi/components/O2CureEffectExperience";
import { aqiContent } from "@/features/aqi/content";
import { useAqiData } from "@/features/aqi/hooks/useAqiData";
import { usePurificationSequence } from "@/features/aqi/hooks/usePurificationSequence";

export function AqiSection() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const { city, isLocating } = useAqiData();

  const {
    phase,
    reading,
    pollutants,
    lightingProgress,
    timelineRef,
    activate,
    isComplete,
  } = usePurificationSequence({ city, reducedMotion: reduced });

  return (
    <>
      <div
        aria-hidden
        className="h-[clamp(2.5rem,6vh,4rem)] bg-background"
      />

      <section
        id="aqi-effect"
        aria-labelledby="aqi-effect-heading"
        className="relative bg-background pb-section"
      >
        <div className="px-5 pt-section-sm sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
          <header className="mx-auto max-w-5xl text-center">
            <Reveal delay={0.12} distance={24}>
              <h2
                id="aqi-effect-heading"
                className="font-heading text-h2 text-foreground"
              >
                {aqiContent.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.26} distance={20}>
              <p className="mx-auto mt-4 max-w-lg text-body-lg text-muted-foreground">
                {aqiContent.supporting}
              </p>
            </Reveal>
          </header>
        </div>

        {/* Interactive purification experience enters after a reading beat. */}
        <Reveal className="mt-8 sm:mt-10" delay={0.44} distance={28} amount={0.2}>
          <O2CureEffectExperience
            phase={phase}
            reading={reading}
            pollutants={pollutants}
            lightingProgress={lightingProgress}
            timelineRef={timelineRef}
            isLocating={isLocating}
            isComplete={isComplete}
            onActivate={activate}
          />
        </Reveal>
      </section>
    </>
  );
}

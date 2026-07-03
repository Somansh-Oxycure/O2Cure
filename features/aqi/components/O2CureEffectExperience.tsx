"use client";

import type { RefObject } from "react";
import { useRef } from "react";

import { ActivationButton } from "@/features/aqi/components/ActivationButton";
import { AqiAnchor } from "@/features/aqi/components/AqiAnchor";
import { AqiLightingOverlay } from "@/features/aqi/components/AqiLightingOverlay";
import { AqiParticleField } from "@/features/aqi/components/AqiParticleField";
import { PollutantOrbit } from "@/features/aqi/components/PollutantOrbit";
import type { PollutantReading } from "@/features/aqi/data/pollutants";
import type {
  AqiReading,
  PurificationPhase,
  PurificationTimeline,
} from "@/features/aqi/types";

interface O2CureEffectExperienceProps {
  phase: PurificationPhase;
  reading: AqiReading;
  pollutants: PollutantReading[];
  lightingProgress: number;
  timelineRef: RefObject<PurificationTimeline>;
  isLocating?: boolean;
  isComplete: boolean;
  onActivate: () => void;
}

export function O2CureEffectExperience({
  phase,
  reading,
  pollutants,
  lightingProgress,
  timelineRef,
  isLocating = false,
  isComplete,
  onActivate,
}: O2CureEffectExperienceProps) {
  const buttonCenterRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative isolate w-full overflow-hidden">
      <AqiLightingOverlay phase={phase} lightingProgress={lightingProgress} />
      <AqiParticleField timelineRef={timelineRef} centerRef={buttonCenterRef} />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        <AqiAnchor
          reading={reading}
          isLocating={isLocating}
          className="mb-4 sm:mb-5"
        />

        <div
          ref={buttonCenterRef}
          className="relative flex h-48 w-full max-w-md items-center justify-center sm:h-52"
        >
          <PollutantOrbit pollutants={pollutants} />
          <ActivationButton
            phase={phase}
            onActivate={onActivate}
            disabled={isComplete}
          />
        </div>
      </div>
    </div>
  );
}

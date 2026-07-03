"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import {
  getPhaseAtElapsed,
  getValueProgress,
  phaseProgress,
  PURIFICATION_TIMELINE,
} from "@/features/aqi/animation/purificationSequence";
import {
  getPollutedReadings,
  interpolateAqi,
  interpolatePollutants,
  type PollutantReading,
} from "@/features/aqi/data/pollutants";
import { buildAqiReading } from "@/features/aqi/data/simulatedAqi";
import type {
  AqiReading,
  PurificationPhase,
  PurificationTimeline,
  SimulatedCity,
} from "@/features/aqi/types";

type UsePurificationSequenceOptions = {
  city: SimulatedCity;
  reducedMotion?: boolean;
};

type UsePurificationSequenceResult = {
  phase: PurificationPhase;
  isComplete: boolean;
  reading: AqiReading;
  pollutants: PollutantReading[];
  lightingProgress: number;
  timelineRef: RefObject<PurificationTimeline>;
  activate: () => void;
};

export function usePurificationSequence({
  city,
  reducedMotion = false,
}: UsePurificationSequenceOptions): UsePurificationSequenceResult {
  const [phase, setPhase] = useState<PurificationPhase>("idle");
  const [displayedAqi, setDisplayedAqi] = useState(city.pollutedAqi);
  const [pollutants, setPollutants] = useState<PollutantReading[]>(() =>
    getPollutedReadings(city),
  );
  const [lightingProgress, setLightingProgress] = useState(0);
  const timelineRef = useRef<PurificationTimeline>({
    elapsed: 0,
    phase: "idle",
    valueProgress: 0,
  });
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const lastPhaseRef = useRef<PurificationPhase>("idle");

  useEffect(() => {
    if (phase === "idle") {
      setDisplayedAqi(city.pollutedAqi);
      setPollutants(getPollutedReadings(city));
    }
  }, [city, phase]);

  const tick = useCallback(
    (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const nextPhase = getPhaseAtElapsed(elapsed);
      const valueProgress = getValueProgress(elapsed);

      timelineRef.current = { elapsed, phase: nextPhase, valueProgress };

      if (nextPhase !== lastPhaseRef.current) {
        lastPhaseRef.current = nextPhase;
        setPhase(nextPhase);
      }

      const isPurifying =
        nextPhase !== "idle" && nextPhase !== "complete";

      if (isPurifying) {
        setPollutants(interpolatePollutants(city, valueProgress));
        setDisplayedAqi(interpolateAqi(city, valueProgress));
      }

      if (nextPhase === "lighting" || nextPhase === "complete") {
        const t = phaseProgress(
          elapsed,
          PURIFICATION_TIMELINE.lighting,
          PURIFICATION_TIMELINE.complete,
        );
        setLightingProgress(Math.min(1, t));
      }

      if (elapsed < PURIFICATION_TIMELINE.complete) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayedAqi(city.cleanAqi);
        setPollutants(interpolatePollutants(city, 1));
        setLightingProgress(1);
        timelineRef.current = {
          elapsed,
          phase: "complete",
          valueProgress: 1,
        };
        setPhase("complete");
      }
    },
    [city],
  );

  const activate = useCallback(() => {
    if (phase !== "idle") return;

    if (reducedMotion) {
      setPhase("complete");
      setDisplayedAqi(city.cleanAqi);
      setPollutants(interpolatePollutants(city, 1));
      setLightingProgress(1);
      timelineRef.current = {
        elapsed: PURIFICATION_TIMELINE.complete,
        phase: "complete",
        valueProgress: 1,
      };
      return;
    }

    startRef.current = null;
    lastPhaseRef.current = "idle";
    setLightingProgress(0);
    setPhase("button");
    timelineRef.current = { elapsed: 0, phase: "button", valueProgress: 0 };
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(tick);
  }, [city, phase, reducedMotion, tick]);

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const reading = buildAqiReading(city, displayedAqi);

  return {
    phase,
    isComplete: phase === "complete",
    reading,
    pollutants,
    lightingProgress,
    timelineRef,
    activate,
  };
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Returns an ever-increasing litre count that ticks up in real-time,
 * simulating the cumulative volume of air purified by all active O₂Cure units.
 *
 * Baseline: ~450 billion litres purified since inception (15 years of ops).
 * Growth rate: ~47 litres/second — derived from ~500 active purifiers,
 * each processing ~100 CFM ≈ 2,830 L/min total → ~47 L/s.
 *
 * Performance: only ticks when the element is in view, at 2s intervals.
 */
const BASELINE_LITRES = 450_000_000_000; // 450 billion litres
const LITRES_PER_SECOND = 47;

/** Epoch-aligned baseline so the count is consistent across page loads. */
const EPOCH_START_MS = Date.UTC(2010, 0, 1); // Jan 1 2010

function getLitreCount(): number {
  const nowMs = Date.now();
  const elapsedSeconds = (nowMs - EPOCH_START_MS) / 1000;
  return BASELINE_LITRES + elapsedSeconds * LITRES_PER_SECOND;
}

export function useLiveAirCounter(containerRef: React.RefObject<Element | null>): number {
  const [count, setCount] = useState<number>(() => Math.floor(getLitreCount()));
  const isInView = useInView(containerRef, { amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;
    // Update every 2 seconds when visible — imperceptibly slow vs 33ms but saves ~59 re-renders/s
    const interval = setInterval(() => {
      setCount(Math.floor(getLitreCount()));
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  return count;
}


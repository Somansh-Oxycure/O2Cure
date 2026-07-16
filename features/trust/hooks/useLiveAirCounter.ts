"use client";

import { useEffect, useState } from "react";

/**
 * Returns an ever-increasing litre count that ticks up in real-time,
 * simulating the cumulative volume of air purified by all active O₂Cure units.
 *
 * Baseline: ~450 billion litres purified since inception (15 years of ops).
 * Growth rate: ~47 litres/second — derived from ~500 active purifiers,
 * each processing ~100 CFM ≈ 2,830 L/min total → ~47 L/s.
 */
const BASELINE_LITRES = 450_000_000_000; // 450 billion litres
const LITRES_PER_SECOND = 47;

/** Epoch-aligned baseline so the count is consistent across page loads. */
const EPOCH_START_S = Math.floor(Date.UTC(2010, 0, 1) / 1000); // Jan 1 2010

function getLitreCount(): number {
  const nowS = Math.floor(Date.now() / 1000);
  return BASELINE_LITRES + (nowS - EPOCH_START_S) * LITRES_PER_SECOND;
}

export function useLiveAirCounter(): number {
  const [count, setCount] = useState<number>(getLitreCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(getLitreCount());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return count;
}

"use client";

import { useEffect, useState } from "react";

import {
  buildAqiReading,
  DEFAULT_CITY,
  findNearestCity,
} from "@/features/aqi/data/simulatedAqi";
import type { AqiReading, SimulatedCity } from "@/features/aqi/types";

type UseAqiDataResult = {
  city: SimulatedCity;
  reading: AqiReading;
  isLocating: boolean;
};

/**
 * Attempts browser geolocation, then maps coordinates to the nearest
 * simulated city. Falls back to DEFAULT_CITY when permission is denied
 * or unavailable. Architecture allows swapping this hook for a live API.
 */
export function useAqiData(): UseAqiDataResult {
  const [city, setCity] = useState<SimulatedCity>(DEFAULT_CITY);
  const [isLocating, setIsLocating] = useState(true);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest = findNearestCity(
          position.coords.latitude,
          position.coords.longitude,
        );
        setCity(nearest);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      },
      { timeout: 5000, maximumAge: 300_000 },
    );
  }, []);

  const reading = buildAqiReading(city, city.pollutedAqi);

  return { city, reading, isLocating };
}

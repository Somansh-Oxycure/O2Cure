import type { SimulatedCity } from "@/features/aqi/types";

export type PollutantSpec = {
  id: string;
  name: string;
  unit: string;
  polluted: number;
  clean: number;
};

/** Demo pollutant levels — replaceable via live API. */
export const POLLUTANT_SPECS: PollutantSpec[] = [
  { id: "pm25", name: "PM2.5", unit: "µg/m³", polluted: 142, clean: 28 },
  { id: "pm10", name: "PM10", unit: "µg/m³", polluted: 198, clean: 42 },
  { id: "voc", name: "VOC", unit: "ppb", polluted: 860, clean: 120 },
  { id: "co", name: "CO", unit: "ppm", polluted: 4.2, clean: 0.6 },
  { id: "no2", name: "NO₂", unit: "ppb", polluted: 74, clean: 12 },
  { id: "o3", name: "O₃", unit: "ppb", polluted: 96, clean: 24 },
];

export type PollutantReading = {
  id: string;
  name: string;
  unit: string;
  value: number;
};

function scalePollutants(city: SimulatedCity): PollutantSpec[] {
  const ratio = city.cleanAqi / city.pollutedAqi;
  return POLLUTANT_SPECS.map((p) => ({
    ...p,
    clean: Math.round(p.clean * ratio * 10) / 10,
  }));
}

export function getPollutedReadings(city: SimulatedCity): PollutantReading[] {
  return scalePollutants(city).map((p) => ({
    id: p.id,
    name: p.name,
    unit: p.unit,
    value: p.polluted,
  }));
}

export function interpolatePollutants(
  city: SimulatedCity,
  progress: number,
): PollutantReading[] {
  const specs = scalePollutants(city);
  const t = Math.max(0, Math.min(1, progress));

  return specs.map((p) => {
    const value = p.polluted + (p.clean - p.polluted) * t;
    const decimals = p.unit === "ppm" ? 1 : 0;
    return {
      id: p.id,
      name: p.name,
      unit: p.unit,
      value: Number(value.toFixed(decimals)),
    };
  });
}

export function interpolateAqi(
  city: SimulatedCity,
  progress: number,
): number {
  const t = Math.max(0, Math.min(1, progress));
  return Math.round(city.pollutedAqi + (city.cleanAqi - city.pollutedAqi) * t);
}

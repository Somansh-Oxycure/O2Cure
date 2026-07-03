/** AQI reading shaped for future live API replacement. */
export type AqiReading = {
  city: string;
  aqi: number;
  category: string;
  statusLabel: string;
};

export type PurificationPhase =
  | "idle"
  | "button"
  | "attraction"
  | "dissolve"
  | "cleanEmerge"
  | "lighting"
  | "complete";

export type SimulatedCity = {
  name: string;
  lat: number;
  lng: number;
  pollutedAqi: number;
  cleanAqi: number;
};

export type PurificationTimeline = {
  elapsed: number;
  phase: PurificationPhase;
  valueProgress: number;
};

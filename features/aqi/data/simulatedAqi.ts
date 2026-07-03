import { getAqiCategory } from "@/features/aqi/data/aqiCategories";
import type { AqiReading, SimulatedCity } from "@/features/aqi/types";

/** Default demonstration city when geolocation is unavailable. */
export const DEFAULT_CITY: SimulatedCity = {
  name: "New Delhi",
  lat: 28.6139,
  lng: 77.209,
  pollutedAqi: 186,
  cleanAqi: 38,
};

/** Preset cities for approximate location matching. */
export const SIMULATED_CITIES: SimulatedCity[] = [
  DEFAULT_CITY,
  {
    name: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    pollutedAqi: 132,
    cleanAqi: 38,
  },
  {
    name: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    pollutedAqi: 118,
    cleanAqi: 35,
  },
  {
    name: "London",
    lat: 51.5074,
    lng: -0.1278,
    pollutedAqi: 94,
    cleanAqi: 28,
  },
  {
    name: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    pollutedAqi: 86,
    cleanAqi: 24,
  },
  {
    name: "Dubai",
    lat: 25.2048,
    lng: 55.2708,
    pollutedAqi: 112,
    cleanAqi: 36,
  },
  {
    name: "New York",
    lat: 40.7128,
    lng: -74.006,
    pollutedAqi: 78,
    cleanAqi: 22,
  },
];

function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearestCity(lat: number, lng: number): SimulatedCity {
  let nearest = DEFAULT_CITY;
  let minDist = Infinity;

  for (const city of SIMULATED_CITIES) {
    const dist = haversineKm(lat, lng, city.lat, city.lng);
    if (dist < minDist) {
      minDist = dist;
      nearest = city;
    }
  }

  return nearest;
}

export function buildAqiReading(
  city: SimulatedCity,
  aqi: number,
): AqiReading {
  const { category, statusLabel } = getAqiCategory(aqi);
  return {
    city: city.name,
    aqi: Math.round(aqi),
    category,
    statusLabel,
  };
}

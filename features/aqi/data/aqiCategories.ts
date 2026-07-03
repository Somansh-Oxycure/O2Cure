/** AQI labels for the focal reading. */
export function getAqiCategory(aqi: number): {
  category: string;
  statusLabel: string;
} {
  if (aqi <= 50) {
    return { category: "Good", statusLabel: "Good Air Quality" };
  }
  if (aqi <= 100) {
    return { category: "Moderate", statusLabel: "Moderate Air Quality" };
  }
  if (aqi <= 200) {
    return { category: "Poor", statusLabel: "Poor Air Quality" };
  }
  return { category: "Very Poor", statusLabel: "Very Poor Air Quality" };
}

export function getAqiColor(aqi: number): string {
  if (aqi <= 50) return "var(--brand-green)";
  if (aqi <= 100) return "oklch(0.72 0.14 95)";
  if (aqi <= 150) return "oklch(0.72 0.16 65)";
  if (aqi <= 200) return "oklch(0.58 0.2 35)";
  if (aqi <= 300) return "oklch(0.48 0.22 15)";
  return "oklch(0.42 0.24 5)";
}

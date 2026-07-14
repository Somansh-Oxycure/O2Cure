import type { TriCureLayer } from "@/features/technology/types";

export interface AccentPalette {
  border: string;
  borderIdle: string;
  glow: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  numColor: string;
  raw: string; // solid accent color for direct use
  rawMid: string; // 55% opacity version
}

/** Pure function — resolves the full accent palette for a layer's color key. */
export function getAccentPalette(
  accentColor: TriCureLayer["accentColor"],
): AccentPalette {
  switch (accentColor) {
    case "teal":
      return {
        border: "rgba(120,210,185,0.4)",
        borderIdle: "rgba(120,210,185,0.14)",
        glow: "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(120,210,185,0.13) 0%, rgba(120,210,185,0.04) 50%, transparent 80%)",
        iconBg: "rgba(120,210,185,0.1)",
        iconBorder: "rgba(120,210,185,0.28)",
        iconColor: "rgb(60,180,148)",
        badgeBg: "rgba(120,210,185,0.09)",
        badgeBorder: "rgba(120,210,185,0.22)",
        badgeText: "rgb(40,155,125)",
        numColor: "rgba(120,210,185,0.28)",
        raw: "rgba(120,210,185,1)",
        rawMid: "rgba(120,210,185,0.55)",
      };
    case "green":
      return {
        border: "rgba(58,125,42,0.38)",
        borderIdle: "rgba(58,125,42,0.13)",
        glow: "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(58,125,42,0.11) 0%, rgba(58,125,42,0.04) 50%, transparent 80%)",
        iconBg: "rgba(58,125,42,0.09)",
        iconBorder: "rgba(58,125,42,0.25)",
        iconColor: "rgb(58,125,42)",
        badgeBg: "rgba(58,125,42,0.08)",
        badgeBorder: "rgba(58,125,42,0.2)",
        badgeText: "rgb(40,95,28)",
        numColor: "rgba(58,125,42,0.22)",
        raw: "rgba(58,125,42,1)",
        rawMid: "rgba(58,125,42,0.55)",
      };
    default: // blue
      return {
        border: "oklch(0.55 0.12 248 / 0.4)",
        borderIdle: "oklch(0.55 0.12 248 / 0.14)",
        glow: "radial-gradient(ellipse 90% 65% at 50% 0%, oklch(0.55 0.12 248 / 0.11) 0%, oklch(0.55 0.12 248 / 0.03) 50%, transparent 80%)",
        iconBg: "oklch(0.55 0.12 248 / 0.09)",
        iconBorder: "oklch(0.55 0.12 248 / 0.25)",
        iconColor: "oklch(0.52 0.14 248)",
        badgeBg: "oklch(0.55 0.12 248 / 0.08)",
        badgeBorder: "oklch(0.55 0.12 248 / 0.2)",
        badgeText: "oklch(0.44 0.14 248)",
        numColor: "oklch(0.55 0.12 248 / 0.22)",
        raw: "oklch(0.55 0.12 248)",
        rawMid: "oklch(0.55 0.12 248 / 0.55)",
      };
  }
}

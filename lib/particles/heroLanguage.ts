/**
 * Shared particle visual language — mirrors Hero ParticleField exactly.
 * Hero imports are unchanged; AQI consumes this module for continuity.
 */

export const HERO_CLEAN_COLORS = [
  "rgba(75, 190, 165, 0.88)",
  "rgba(95, 205, 180, 0.78)",
  "rgba(60, 170, 150, 0.82)",
  "rgba(115, 215, 195, 0.72)",
  "rgba(70, 180, 155, 0.8)",
] as const;

export const HERO_POLLUTION_COLORS = [
  "rgba(210, 155, 90, 0.82)",
  "rgba(195, 130, 75, 0.74)",
  "rgba(225, 170, 105, 0.7)",
  "rgba(175, 120, 70, 0.68)",
  "rgba(200, 145, 85, 0.78)",
] as const;

export type SharedParticle = {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  type: "clean" | "polluted";
  mist: boolean;
  swirl: number;
  dissolving: number;
  spawnDelay?: number;
  /** Organic drift phase offset */
  noise: number;
};

/** Slow ambient drift — brown/amber pollution across the experience field. */
export function spawnAmbientPolluted(
  width: number,
  height: number,
): SharedParticle {
  const mist = Math.random() > 0.42;
  const isFine = Math.random() > 0.65;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: mist
      ? 3 + Math.random() * 5.5
      : isFine
        ? 0.7 + Math.random() * 1.8
        : 1.2 + Math.random() * 2.8,
    vx: (Math.random() - 0.5) * 0.14,
    vy: (Math.random() - 0.5) * 0.11 - 0.02,
    opacity: mist ? 0.14 + Math.random() * 0.22 : 0.32 + Math.random() * 0.4,
    color:
      HERO_POLLUTION_COLORS[
        Math.floor(Math.random() * HERO_POLLUTION_COLORS.length)
      ]!,
    type: "polluted",
    mist,
    swirl: Math.random() > 0.5 ? 1 : -1,
    dissolving: 0,
    noise: Math.random() * Math.PI * 2,
  };
}

/** Clean particles emerging from the O₂Cure centre — Hero outward flow. */
export function spawnCleanFromCentre(
  centerX: number,
  centerY: number,
): SharedParticle {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.75 + Math.random() * 0.5;
  const mist = Math.random() > 0.55;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed - 0.06;

  return {
    x: centerX + (Math.random() - 0.5) * 20,
    y: centerY + (Math.random() - 0.5) * 16,
    radius: mist ? 2.5 + Math.random() * 4.5 : 0.8 + Math.random() * 2,
    vx,
    vy,
    opacity: mist ? 0.14 + Math.random() * 0.24 : 0.38 + Math.random() * 0.42,
    color:
      HERO_CLEAN_COLORS[Math.floor(Math.random() * HERO_CLEAN_COLORS.length)]!,
    type: "clean",
    mist,
    swirl: 0,
    dissolving: 0,
    spawnDelay: Math.floor(Math.random() * 12),
    noise: 0,
  };
}

/** Idle clean drift after purification — gentle upward/outward motion. */
export function spawnIdleClean(
  centerX: number,
  centerY: number,
  width: number,
  height: number,
): SharedParticle {
  const p = spawnCleanFromCentre(centerX, centerY);
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.2 + Math.random() * 0.35;
  p.x = Math.random() * width;
  p.y = Math.random() * height;
  p.vx = Math.cos(angle) * speed;
  p.vy = Math.sin(angle) * speed - 0.08;
  p.noise = Math.random() * Math.PI * 2;
  return p;
}

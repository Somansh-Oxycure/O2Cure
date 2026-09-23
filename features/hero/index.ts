// ── Hero mode switch ──────────────────────────────────────────────────────────
// Change HERO_MODE to switch between hero variants.
//
//   "video"    → HeroVideo  (full-screen MP4 background)
//   "original" → Hero       (split-world animated hero)
//
// Only ONE line needs to change to flip between them.
// ─────────────────────────────────────────────────────────────────────────────

export const HERO_MODE = "original" as "video" | "original";

export { Hero } from "@/features/hero/components/Hero";
export { HeroVideo } from "@/features/hero/components/HeroVideo";

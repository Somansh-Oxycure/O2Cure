import {
  GasOdorIcon,
  MicrobialIcon,
  ParticulateIcon,
} from "@/features/technology/components/icons";
import type { TriCureLayer } from "@/features/technology/types";

/**
 * Chapter 4 — "Powered by TriCure™ Technology".
 * Copy is precision-engineered: consumer-facing clarity on the surface,
 * B2B-grade technical metadata woven into each card via badge tokens.
 * Shaped like future CMS content; the `badges` and `spec` fields allow
 * enterprise buyers to verify claims without reading a whitepaper.
 */
export const technologyContent = {
  eyebrow: "Our Technology",
  heading: "Powered by TriCure™ Technology",
  supporting:
    "Indoor air pollution isn't one thing. It's three — each invisible, each harmful, each requiring a distinct scientific response. TriCure™ is the only integrated system engineered to address all three simultaneously.",
  layers: [
    {
      id: "particulate",
      number: "",
      title: "Particulate Matter",
      description: "PM2.5, PM10, Dust & Pollen",
      detail: "Advanced filtration matrix captures microscopic particles down to 0.3 microns with 99.97% efficiency.",
      Icon: ParticulateIcon,
      badges: ["PM2.5 ≤ 0.3 µm", "HEPA H13", "MERV-16", "99.97% CAPTURE"],
      spec: "ISO 29463-3 · EN 1822 · ASHRAE 52.2",
      accentColor: "blue",
      stat: { value: "99.97", label: "% particle capture rate", animate: true },
    },
    {
      id: "microbial",
      number: "02",
      title: "Microbial Protection",
      description: "Bacteria, Viruses, Molds & Fungi",
      detail: "Medical-grade sterilization technology eliminates airborne pathogens, preventing cross-contamination.",
      Icon: MicrobialIcon,
      badges: ["UV-C 254nm", "HINS LIGHT", "BIOFILM GUARD", "≥99.9% KILL"],
      spec: "ASTM E2406 · NSF/ANSI 55 · EPA GUIDE 350",
      accentColor: "teal",
      stat: { value: "99.9", label: "% pathogen elimination", animate: true },
    },
    {
      id: "gas-odor",
      number: "03",
      title: "Gas & Odor Control",
      description: "VOCs, Sulfur, Smoke & Chemical Odors",
      detail: "High-density molecular adsorption media neutralizes volatile organic compounds and persistent odors.",
      Icon: GasOdorIcon,
      badges: ["VOC ≤ 50 ppb", "ACTIVATED CARBON", "PHOTOCATALYTIC", "TVOC SENSOR"],
      spec: "ISO 16000-9 · ANSI/ASHRAE 62.1 · CARB CERT.",
      accentColor: "green",
      stat: { value: "<50", label: "ppb VOC threshold maintained", animate: false },
    },
  ] satisfies TriCureLayer[],
  badge: "TriCure™ Technology",
  outcome: "Cleaner Indoor Air",
  closing:
    "Genuinely healthy air isn't about removing one pollutant — it comes from addressing all three categories, continuously and together.",
} as const;

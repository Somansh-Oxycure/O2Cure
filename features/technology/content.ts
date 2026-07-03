import {
  GasOdorIcon,
  MicrobialIcon,
  ParticulateIcon,
} from "@/features/technology/components/icons";
import type { TriCureLayer } from "@/features/technology/types";

/**
 * Chapter 4 — "Powered by TriCure™ Technology".
 * Copy stays curiosity-led and premium: it frames the three pollutant
 * categories and the single integrated system, without deep technical
 * claims. Shaped like future CMS content.
 */
export const technologyContent = {
  eyebrow: "Our Technology",
  heading: "Powered by TriCure™ Technology",
  supporting:
    "Indoor air pollution takes three distinct forms. TriCure™ Technology is engineered to address all of them — together, within one integrated purification system.",
  layers: [
    {
      id: "particulate",
      number: "01",
      title: "Particulate Matter",
      description: "Captures dust, pollen and fine PM2.5 particles.",
      Icon: ParticulateIcon,
    },
    {
      id: "microbial",
      number: "02",
      title: "Microbial Protection",
      description: "Neutralises airborne bacteria, viruses and mould.",
      Icon: MicrobialIcon,
    },
    {
      id: "gas-odor",
      number: "03",
      title: "Gas & Odor Control",
      description: "Breaks down VOCs, smoke and everyday odours.",
      Icon: GasOdorIcon,
    },
  ] satisfies TriCureLayer[],
  badge: "TriCure™ Technology",
  outcome: "Cleaner Indoor Air",
  closing:
    "Genuinely healthy air isn't about removing one pollutant — it comes from addressing all three categories, continuously and together.",
} as const;

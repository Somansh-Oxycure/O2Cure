import type { Product } from "@/features/products/types";

/**
 * Chapter 5 copy and product lineup — shaped like future CMS content.
 * Add or edit products here; carousel layout does not change.
 */
export const productsContent = {
  eyebrow: "Our Products",
  heading: "Find Your O₂Cure",
  supporting:
    "Designed for every environment. Built with the same trusted purification technology.",
  cta: "Explore Product",
} as const;

export const products: Product[] = [
  {
    id: "o2cure-home",
    name: "O₂Cure Home",
    purpose: "Quiet, continuous purification for the rooms you live in.",
    environment: "Residential",
    image: {
      src: "",
      alt: "O₂Cure Home premium air purifier render",
    },
    renderVariant: "tower",
  },
  {
    id: "o2cure-office",
    name: "O₂Cure Office",
    purpose: "Focused air quality for productive workspaces.",
    environment: "Corporate",
    image: {
      src: "",
      alt: "O₂Cure Office premium air purifier render",
    },
    renderVariant: "slim",
  },
  {
    id: "o2cure-industrial",
    name: "O₂Cure Industrial",
    purpose: "Controlled air performance for demanding floor plans.",
    environment: "Industrial",
    image: {
      src: "",
      alt: "O₂Cure Industrial premium air purifier render",
    },
    renderVariant: "console",
  },
  {
    id: "o2cure-clinical",
    name: "O₂Cure Clinical",
    purpose: "Trusted purification for care-critical environments.",
    environment: "Healthcare",
    image: {
      src: "",
      alt: "O₂Cure Clinical premium air purifier render",
    },
    renderVariant: "clinical",
  },
  {
    id: "o2cure-transit",
    name: "O₂Cure Transit",
    purpose: "Scale-ready air quality for shared public spaces.",
    environment: "Airports & Transit",
    image: {
      src: "",
      alt: "O₂Cure Transit premium air purifier render",
    },
    renderVariant: "compact",
  },
];

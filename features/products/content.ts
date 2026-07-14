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
    id: "hulk-air-purifier",
    name: "O2 Cure Hulk Air Purifier & Humidifier",
    purpose: "A smart, seven-stage filtration air purifier with an integrated humidifier that neutralizes microbes and maintains optimum moisture for spaces up to 850 sq ft.",
    environment: ["Residential", "Corporate"],
    image: {
      src: "/Hulk_Front_Angle-removebg.png",
      alt: "O2 Cure Hulk Air Purifier & Humidifier",
    },
    renderVariant: "tower",
  },
  {
    id: "max-cure",
    name: "O2Cure Max Cure – Fresh Air Filtration Unit",
    purpose: "A state-of-the-art multi-filtration unit designed to filter harmful outdoor pollutants and pressurize indoor spaces up to 2,500 sq ft.",
    environment: ["Corporate", "Industrial"],
    image: {
      src: "/product/Hybrid-Air-Purifier.jpg",
      alt: "O2Cure Max Cure – Fresh Air Filtration Unit",
    },
    renderVariant: "console",
  },
  {
    id: "elixir-air-purifier",
    name: "O2 Cure Elixir Air Purifier with Odor Sensing System & Humidifier",
    purpose: "An advanced six-stage filtration purifier equipped with an odor sensing system and humidifier for optimal air quality in spaces up to 450 sq ft.",
    environment: ["Residential"],
    image: {
      src: "/product/elixer.png",
      alt: "O2 Cure Elixir Air Purifier with Odor Sensing System & Humidifier",
    },
    renderVariant: "slim",
  },
  {
    id: "hybrid-air-purifier",
    name: "O2 Cure Hybrid Air Purifier",
    purpose: "A fully customizable, smart air purification solution built to alleviate respiratory triggers and optimize air quality in both homes and offices.",
    environment: ["Residential", "Corporate", "Industrial"],
    image: {
      src: "/product/Hybrid-Air-Purifier.jpg",
      alt: "O2 Cure Hybrid Air Purifier",
    },
    renderVariant: "console",
  },
  {
    id: "car-air-purifier",
    name: "Car Air Purifier with Advanced HEPA Filter + UV LED Technology",
    purpose: "A portable, USB-powered air purifier utilizing a hybrid of UV LED and HEPA technology for on-the-go protection against pathogens, pollutants, and odors.",
    environment: ["Car"],
    image: {
      src: "/product/car-air.png",
      alt: "Car Air Purifier with Advanced HEPA Filter + UV LED Technology",
    },
    renderVariant: "compact",
  },
  {
    id: "plug-play-max",
    name: "O2Cure Plug n Play (MAX) – Advanced Air Purifier with PHI & Bipolar Ionization Technology",
    purpose: "A zero-maintenance, in-duct HVAC purifier utilizing a hybrid of Photohydroionization (PHI) and Bipolar Ionization to actively eliminate pathogens and VOCs without mechanical filters.",
    environment: ["Corporate", "Industrial"],
    image: {
      src: "/product/plug-play.jpg",
      alt: "O2Cure Plug n Play (MAX) – Advanced Air Purifier with PHI & Bipolar Ionization Technology",
    },
    renderVariant: "compact",
  },
];

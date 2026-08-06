/**
 * Custom Solutions content — v2.
 * Aligned to the blueprint §3 data schema.
 * Ready to swap with Sanity CMS fetches without touching any component logic.
 */
import type {
  Solution,
  DiagnosticFilter,
  EnvironmentTab,
} from "./types";

// ─── Page meta ─────────────────────────────────────────────────────────────
export const solutionsPageMeta = {
  eyebrow: "Tailored Engineering",
  heading: "Custom Solutions",
  subheading:
    "Select your environment. We'll engineer the exact system your space requires.",
  seoTitle: "Custom Air Purification Solutions | O₂Cure",
  seoDescription:
    "O₂Cure engineers custom air purification systems for corporate, healthcare, residential, and mobility environments. NABL-certified. Zero-obligation diagnostic available.",
} as const;

// ─── Environment sector tabs (blueprint §1.2) ──────────────────────────────
export const environmentTabs: { id: EnvironmentTab; label: string }[] = [
  { id: "corporate", label: "Corporate & Office" },
  { id: "healthcare", label: "Healthcare & Clinical" },
  { id: "residential", label: "Residential" },
  { id: "mobility", label: "Mobility & Transport" },
];

// ─── Diagnostic filter pills (sidebar / mobile strip) ──────────────────────
// Blueprint §1.3: Fixed left-hand sidebar on desktop, horizontal pill strip on mobile.
export const diagnosticFilters: DiagnosticFilter[] = [
  // Corporate
  { id: "in-duct", label: "In-Duct HVAC", environments: ["corporate", "healthcare"] },
  { id: "standalone", label: "Standalone Units", environments: ["corporate", "residential", "mobility"] },
  { id: "large-open-plan", label: "Large Open Plan", environments: ["corporate"] },
  { id: "server-rooms", label: "Server Rooms", environments: ["corporate"] },
  // Healthcare
  { id: "clean-room", label: "Clean Room", environments: ["healthcare"] },
  { id: "icu-critical", label: "ICU & Critical Care", environments: ["healthcare"] },
  { id: "lab-pharma", label: "Lab & Pharma", environments: ["healthcare"] },
  // Residential
  { id: "whole-home", label: "Whole Home", environments: ["residential"] },
  { id: "bedroom", label: "Bedroom & Nursery", environments: ["residential"] },
  { id: "kitchen", label: "Kitchen & Living", environments: ["residential"] },
  // Mobility
  { id: "car", label: "Personal Vehicle", environments: ["mobility"] },
  { id: "fleet", label: "Fleet & Commercial", environments: ["mobility"] },
];

// ─── Solutions data (blueprint §3) ────────────────────────────────────────
export const solutions: Solution[] = [
  // ── Corporate ─────────────────────────────────────────────────────────
  {
    id: "reme-halo-01",
    systemName: "REME HALO® In-Duct HVAC Purifier",
    tagline: "Advanced oxidation plasma distributed through your entire HVAC network.",
    environmentTarget: ["corporate", "healthcare"],
    filterTags: ["in-duct", "large-open-plan"],
    integrationType: "In-Duct Central HVAC",
    capacityMaxSqFt: 6500,
    badges: ["Advanced Oxidation Plasma", "Dual Ionizers", "NABL Tested", "Zero Ozone"],
    image: { src: "/product/plug-play.jpg", alt: "REME HALO In-Duct purifier by O₂Cure" },
    ctaText: "Request Engineering Consultation",
    issueRelevance: {
      odor: 0.9,
      stuffiness: 0.85,
      "dust-pm": 0.7,
      vocs: 0.95,
      pathogens: 0.9,
      co2: 0.75,
      allergens: 0.8,
      humidity: 0.3,
    },
    issueImpact: {
      odor: "Eliminates up to 99% of odor-causing VOCs via Advanced Oxidation Plasma",
      stuffiness: "Improves whole-building air circulation through your existing HVAC",
      "dust-pm": "Reduces airborne particulates by up to 70% across the entire space",
      vocs: "Destroys VOCs and chemical contaminants at molecular level",
      pathogens: "99.9% reduction in airborne bacteria and viruses",
      co2: "Integrates with fresh-air dampers to optimize CO₂ levels",
      allergens: "Captures and destroys pollen, pet dander, and mold spores",
    },
  },
  {
    id: "plug-n-play-02",
    systemName: "Plug & Play MAX",
    tagline: "Zero-installation PHI-Cell® technology. Operational in under 60 seconds.",
    environmentTarget: ["corporate", "residential"],
    filterTags: ["standalone", "large-open-plan"],
    integrationType: "Ductless / Standalone",
    capacityMaxSqFt: 2500,
    badges: ["PHI-Cell® Technology", "Zero Installation", "NABL Tested"],
    image: { src: "/product/plug-play.jpg", alt: "O₂Cure Plug & Play MAX standalone purifier" },
    ctaText: "Speak with an Air Expert",
    issueRelevance: {
      odor: 0.85,
      stuffiness: 0.6,
      "dust-pm": 0.65,
      vocs: 0.9,
      pathogens: 0.85,
      co2: 0.4,
      allergens: 0.7,
      humidity: 0.2,
    },
    issueImpact: {
      odor: "PHI-Cell® technology actively seeks and destroys odor molecules",
      vocs: "Photohydroionization eliminates chemical fumes without filters",
      pathogens: "Active pathogen neutralization — not just filtration",
      "dust-pm": "Bipolar ionization causes particles to clump and fall",
      allergens: "Reduces airborne allergens by 75% within the coverage zone",
    },
  },
  {
    id: "max-cure-03",
    systemName: "O₂Cure Max Cure",
    tagline: "Multi-filtration fresh air unit — pressurizes indoor spaces against outdoor pollutants.",
    environmentTarget: ["corporate"],
    filterTags: ["in-duct", "server-rooms", "large-open-plan"],
    integrationType: "Fresh Air Filtration Unit",
    capacityMaxSqFt: 15000,
    badges: ["Positive Pressurization", "Multi-Stage Filtration", "NABL Tested"],
    image: { src: "/product/Hybrid-Air-Purifier.jpg", alt: "O₂Cure Max Cure fresh air filtration unit" },
    ctaText: "Request Engineering Consultation",
    issueRelevance: {
      odor: 0.7,
      stuffiness: 0.95,
      "dust-pm": 0.9,
      vocs: 0.8,
      pathogens: 0.75,
      co2: 0.95,
      allergens: 0.9,
      humidity: 0.4,
    },
    issueImpact: {
      stuffiness: "Brings fresh outdoor air in, continuously replacing stale indoor air",
      "dust-pm": "Multi-stage filtration removes 99%+ of PM2.5 and PM10",
      co2: "Continuous fresh air supply keeps CO₂ below 1000 ppm — optimal for focus",
      allergens: "HEPA-grade filtration stops outdoor pollen and pollutants at entry",
      vocs: "Activated carbon stage captures chemical fumes and VOCs",
    },
  },
  // ── Healthcare ────────────────────────────────────────────────────────
  {
    id: "clinical-01",
    systemName: "TriCure™ Clinical Protocol",
    tagline: "ISO Class 5–8 air safety validated for ICUs, operating theatres, and diagnostic labs.",
    environmentTarget: ["healthcare"],
    filterTags: ["clean-room", "icu-critical", "lab-pharma"],
    integrationType: "Custom AHU Integration",
    capacityMaxSqFt: 5000,
    badges: ["ISO Class 5–8", "99.97% Pathogen Neutralization", "HEPA H14", "NABL Tested"],
    image: { src: "/product/Hybrid-Air-Purifier.jpg", alt: "O₂Cure clinical-grade air purification system" },
    ctaText: "Request Engineering Consultation",
    issueRelevance: {
      odor: 0.8,
      stuffiness: 0.7,
      "dust-pm": 0.95,
      vocs: 0.85,
      pathogens: 1.0,
      co2: 0.6,
      allergens: 0.95,
      humidity: 0.5,
    },
    issueImpact: {
      pathogens: "99.97% pathogen neutralization — meets ISO Class 5 clean room standards",
      "dust-pm": "HEPA H14 filtration — removes particles as small as 0.1 microns",
      allergens: "Removes virtually all airborne allergens to sub-measurable levels",
      vocs: "Designed to handle harsh chemical environments in labs and pharma facilities",
    },
  },
  // ── Residential ───────────────────────────────────────────────────────
  {
    id: "hulk-res-01",
    systemName: "O₂Cure Hulk",
    tagline: "Seven-stage smart purification with integrated humidifier for whole-home protection.",
    environmentTarget: ["residential"],
    filterTags: ["whole-home", "bedroom", "kitchen"],
    integrationType: "Standalone Unit",
    capacityMaxSqFt: 850,
    badges: ["7-Stage Filtration", "Integrated Humidifier", "NABL Tested"],
    image: { src: "/Hulk_Front_Angle-removebg.png", alt: "O₂Cure Hulk air purifier and humidifier" },
    ctaText: "Speak with an Air Expert",
    issueRelevance: {
      odor: 0.85,
      stuffiness: 0.7,
      "dust-pm": 0.9,
      vocs: 0.75,
      pathogens: 0.85,
      co2: 0.5,
      allergens: 0.9,
      humidity: 0.95,
    },
    issueImpact: {
      odor: "7-stage filtration including activated carbon eliminates all household odors",
      "dust-pm": "HEPA + pre-filter captures 99.97% of dust, pet dander, and PM2.5",
      allergens: "Ideal for allergy and asthma sufferers — certified allergen reduction",
      humidity: "Built-in humidifier maintains 40–60% RH — optimal for health and comfort",
      pathogens: "UV + ionization stage neutralizes bacteria, viruses, and mold spores",
    },
  },
  {
    id: "elixir-res-02",
    systemName: "O₂Cure Elixir",
    tagline: "Odor-sensing six-stage filtration for bedrooms, nurseries, and compact living spaces.",
    environmentTarget: ["residential"],
    filterTags: ["bedroom", "kitchen"],
    integrationType: "Standalone Unit",
    capacityMaxSqFt: 450,
    badges: ["Odor Sensing", "6-Stage Filtration", "NABL Tested"],
    image: { src: "/product/elixer.png", alt: "O₂Cure Elixir air purifier" },
    ctaText: "Speak with an Air Expert",
    issueRelevance: {
      odor: 0.95,
      stuffiness: 0.6,
      "dust-pm": 0.8,
      vocs: 0.7,
      pathogens: 0.75,
      co2: 0.3,
      allergens: 0.8,
      humidity: 0.6,
    },
    issueImpact: {
      odor: "Built-in odor sensor auto-boosts fan when it detects cooking smells or VOCs",
      "dust-pm": "6-stage filtration reduces PM2.5 by 85%+ in bedrooms and nurseries",
      allergens: "Perfect for children's rooms — gentle yet highly effective allergen removal",
      pathogens: "Protects vulnerable family members with continuous germ neutralization",
    },
  },
  // ── Mobility ──────────────────────────────────────────────────────────
  {
    id: "car-purifier-01",
    systemName: "O₂Cure Car Purifier",
    tagline: "USB-powered HEPA + UV-LED protection against pathogens and pollutants in-cabin.",
    environmentTarget: ["mobility"],
    filterTags: ["car"],
    integrationType: "Portable / In-Vehicle",
    capacityMaxSqFt: 120,
    badges: ["HEPA + UV-LED", "Portable", "Zero Ozone"],
    image: { src: "/product/car-air.png", alt: "O₂Cure car air purifier" },
    ctaText: "Speak with an Air Expert",
    issueRelevance: {
      odor: 0.9,
      stuffiness: 0.6,
      "dust-pm": 0.85,
      vocs: 0.7,
      pathogens: 0.9,
      co2: 0.4,
      allergens: 0.85,
      humidity: 0.1,
    },
    issueImpact: {
      odor: "Eliminates in-cabin odors from food, smoke, and exhaust fumes",
      "dust-pm": "HEPA filter removes roadside PM2.5 and diesel particulates",
      pathogens: "UV-LED sterilizes airborne bacteria and viruses in real-time",
      allergens: "Filters pollen during commutes — ideal for allergy sufferers",
    },
  },
];

// ─── Calculator config ─────────────────────────────────────────────────────
export const calculatorConfig = {
  areaMin: 100,
  areaMax: 10000,
  areaStep: 100,
  /** Default area pre-filled when a solution is selected */
  defaultArea: 1500,
} as const;

/** Returns calculator output text matching blueprint §2.2 style */
export function getCalculatorOutput(areaSqFt: number, solution: Solution) {
  const units = Math.max(1, Math.ceil(areaSqFt / solution.capacityMaxSqFt));
  const summary = `For ${areaSqFt.toLocaleString()} sq. ft. → Requires ${units}× ${solution.systemName}`;
  return { units, systemName: solution.systemName, summary };
}

/**
 * Commercial page — mock data layer.
 * Shaped to mirror Sanity CMS document structure.
 */

// ─── Threat Vectors ────────────────────────────────────────────────────────
export interface ThreatVector {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  iconPath: string;
  iconViewBox: string;
}

export const threatVectors: ThreatVector[] = [
  {
    id: "sick-building",
    label: "Sick Building Syndrome & VOCs",
    shortLabel: "Sick Building",
    description:
      "Chemical off-gassing from furniture, carpets, and cleaning agents causing headaches and fatigue.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8l4-7v4h3l-4 7z", // Warning/Sick icon
  },
  {
    id: "pathogens",
    label: "Cross-Contamination & Pathogens",
    shortLabel: "Pathogens",
    description:
      "Airborne viruses, bacteria, and HAIs (Healthcare-Associated Infections) spreading through HVAC.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M17 8C8 10 5.9 16.17 3.82 20.04L5.71 21 7 18c.53.19 1.09.3 1.68.3 4 0 6.32-3.52 6.32-7.97C15 9.17 15 8.79 15 8H17zm-2.96 5c0 2.88-1.75 5.15-3.89 5.35C11.24 16.25 12.21 14 13.04 13 13.04 13 14.04 11 14.04 13z",
  },
  {
    id: "high-co2",
    label: "High CO₂ in Conference Rooms",
    shortLabel: "High CO₂",
    description:
      "Elevated carbon dioxide levels in meeting rooms leading to drowsiness and reduced productivity.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z",
  },
  {
    id: "industrial-dust",
    label: "Industrial Particulates & PM2.5",
    shortLabel: "PM2.5 / Dust",
    description:
      "Heavy outdoor smog infiltration or indoor industrial dust affecting heavy machinery and workers.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M3 12C3 7.03 7.03 3 12 3s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9zm9-7a7 7 0 100 14A7 7 0 0012 5zm-1 3h2v5h-2V8zm0 6h2v2h-2v-2z",
  },
  {
    id: "odours",
    label: "Commercial Kitchen / Gym Odours",
    shortLabel: "Odours & Fumes",
    description:
      "Persistent odours from cafeterias, gymnasiums, or chemical storage negatively impacting customer experience.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  },
  {
    id: "mould-facilities",
    label: "HVAC Mould & Duct Dampness",
    shortLabel: "Mould",
    description:
      "Moisture buildup inside AHU coils and commercial ductwork breeding toxic mould spores.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M6.5 10h-2v5h2v-5zm6 0h-2v5h2v-5zm8.5 7H2v2h19v-2zm-2.5-7h-2v5h2v-5zM11.5 1L2 6v2h19V6l-9.5-5z",
  },
];

// ─── Spatial Layouts ───────────────────────────────────────────────────────
export interface SpatialLayout {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  iconPath: string;
  iconViewBox: string;
}

export const spatialLayouts: SpatialLayout[] = [
  {
    id: "office",
    label: "Open-Plan Corporate Office",
    shortLabel: "Open Office",
    description: "Large workspaces with modular desks and multiple occupants up to 10,000 sq ft.",
    iconViewBox: "0 0 24 24",
    iconPath: "M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5v-2h2v2zm4 4H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2z",
  },
  {
    id: "hospitality",
    label: "Hospitality & Retail (Hotel, Mall)",
    shortLabel: "Hospitality / Retail",
    description: "High-footfall lobbies, retail floors, or dining areas requiring pristine aesthetics.",
    iconViewBox: "0 0 24 24",
    iconPath: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  },
  {
    id: "healthcare",
    label: "Healthcare Clinic / Hospital Ward",
    shortLabel: "Healthcare Facility",
    description: "Critical care zones, ICUs, or waiting rooms demanding clinical-grade sterilization.",
    iconViewBox: "0 0 24 24",
    iconPath: "M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z",
  },
  {
    id: "ahu",
    label: "Central AHU / Full Building Integration",
    shortLabel: "Central AHU",
    description: "Complete integration with large-tonnage Air Handling Units for entire facilities.",
    iconViewBox: "0 0 24 24",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93V18c0-.55.45-1 1-1s1 .45 1 1v1.93A8 8 0 014 12h2c.55 0 1 .45 1 1s-.45 1-1 1H4.07A8 8 0 0011 19.93zm8.93-7.93H18c-.55 0-1-.45-1-1s.45-1 1-1h1.93A8 8 0 0013 4.07V6c0 .55-.45 1-1 1s-1-.45-1-1V4.07A8 8 0 004.07 11H6c.55 0 1 .45 1 1s-.45 1-1 1H4.07A8 8 0 0012 20c4.41 0 8-3.59 8-8h-1.07z",
  },
  {
    id: "industrial",
    label: "Industrial / Warehouse Facility",
    shortLabel: "Industrial",
    description: "Large volume warehouses, manufacturing floors, and logistics centers.",
    iconViewBox: "0 0 24 24",
    iconPath: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  },
];

// ─── Recommendation Engine ─────────────────────────────────────────────────
export interface CommercialRecommendation {
  _type: "commercialRecommendation";
  productId: string;
  systemTier: "standard" | "premium" | "enterprise";
  systemName: string;
  tagline: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  cfmRange: string;
  coverageRange: string;
  nabl: boolean;
  tricurePillars: string[];
  badges: string[];
  primaryCta: string;
  secondaryCta: string;
}

const recommendations: CommercialRecommendation[] = [
  {
    _type: "commercialRecommendation",
    productId: "o2cure-max-cure-fresh-air-filtration-unit",
    systemTier: "standard",
    systemName: "O₂Cure Max Cure Commercial",
    tagline: "Positive-pressure fresh air filtration for meeting rooms",
    description:
      "Brings purified outdoor air indoors using positive pressure. Flushes out CO₂ from crowded conference rooms while filtering out PM2.5 and pathogens.",
    imageUrl:
      "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/18_Max-Cure.jpg",
    imageAlt: "Max Cure Fresh Air Unit",
    cfmRange: "300-600 CFM",
    coverageRange: "Up to 2,500 sq ft",
    nabl: true,
    tricurePillars: ["Particulate Capture", "Microbial Deactivation"],
    badges: ["Positive Pressure", "CO₂ Reduction", "Multi-Stage Filter"],
    primaryCta: "Consult an Enterprise Engineer",
    secondaryCta: "View Specs",
  },
  {
    _type: "commercialRecommendation",
    productId: "o2cure-plug-n-play-max-advanced-air-purifier-with-phi-bipolar-ionization-technology",
    systemTier: "premium",
    systemName: "O₂Cure Commercial Plug N Play MAX",
    tagline: "In-duct commercial purifier with dual PHI + Bipolar Ionization",
    description:
      "Interfaces directly with your floor's central HVAC system. Combines PHI and Bipolar Ionization to actively neutralise viruses, bacteria, and office odours.",
    imageUrl:
      "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/21_Plug-n-Play-MAX_1.jpg",
    imageAlt: "Plug N Play MAX integrated in central air system",
    cfmRange: "600–3,000+ CFM",
    coverageRange: "Up to 5,000 sq ft",
    nabl: true,
    tricurePillars: ["Particulate Capture", "VOC Neutralisation", "Microbial Deactivation"],
    badges: ["PHI + Bipolar", "Dual Technology", "In-Duct HVAC"],
    primaryCta: "Consult an Enterprise Engineer",
    secondaryCta: "View Specs",
  },
  {
    _type: "commercialRecommendation",
    productId: "guardian-air-in-duct-air-purification",
    systemTier: "enterprise",
    systemName: "Guardian Air+ Active AHU System",
    tagline: "PHI + Bipolar ionization for large facilities",
    description:
      "Heavy-duty in-duct system designed for large commercial AHUs, hospitals, and malls. Eliminates 99% of airborne germs across massive square footages.",
    imageUrl:
      "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/10_Guardian-Air-Plus.png",
    imageAlt: "Guardian Air+ central system",
    cfmRange: "Up to 26,000 CFM",
    coverageRange: "10,000+ sq ft",
    nabl: true,
    tricurePillars: ["Particulate Capture", "VOC Neutralisation", "Microbial Deactivation"],
    badges: ["Tested vs SARS-CoV-2", "PHI + BPI", "Central AHU Ready"],
    primaryCta: "Consult an Enterprise Engineer",
    secondaryCta: "View Specs",
  },
];

export interface DiagnosticState {
  threats: string[];
  layout: string;
  areaSqFt: number;
  occupancy: number;
}

export function getRecommendation(
  state: DiagnosticState
): CommercialRecommendation {
  const { layout, areaSqFt, threats } = state;

  // Very large facilities or AHU integration
  if (areaSqFt > 10000 || layout === "ahu" || layout === "industrial") {
    return recommendations[2]; // Guardian Air+
  }

  // Medium offices, healthcare
  if (layout === "office" || layout === "healthcare" || areaSqFt > 2500) {
    return recommendations[1]; // Plug N Play MAX
  }

  // Smaller meeting rooms with high CO2
  return recommendations[0]; // Max Cure Commercial
}

// ─── Social Proof ─────────────────────────────────────────────────────────
export interface Testimonial {
  _type: "testimonial";
  quote: string;
  author: string;
  role: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    _type: "testimonial",
    quote:
      "Sick building syndrome was causing a 12% drop in our workforce productivity. O2Cure's AHU integration completely eradicated VOCs and improved indoor air metrics overnight.",
    author: "Vikram Desai",
    role: "Director of Facilities, TechPark Solutions",
    location: "Bengaluru",
  },
  {
    _type: "testimonial",
    quote:
      "In healthcare, cross-contamination is our highest risk. The PHI cell technology deployed in our HVAC system reduced airborne pathogens below critical thresholds within hours.",
    author: "Dr. Ananya Krishnan",
    role: "Chief Medical Officer",
    location: "Mumbai",
  },
  {
    _type: "testimonial",
    quote:
      "The engineering team studied our commercial AHU blueprint and recommended an active purification system that scaled across our entire 50,000 sq ft lobby effortlessly.",
    author: "Rohan Mehta",
    role: "Hospitality Operations Head",
    location: "Hyderabad",
  },
];

export const certificationBadges = [
  "NABL Accredited",
  "FDA Cleared (Class II)",
  "ASHRAE Compliant",
  "Zero Ozone Emission",
  "CE Marked",
];

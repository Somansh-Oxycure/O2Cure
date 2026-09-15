/**
 * Residential page — mock data layer.
 * Shaped to mirror Sanity CMS document structure so a future migration
 * requires only swapping this import for a GROQ fetch.
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
    id: "particulate",
    label: "Traffic Smog & PM2.5",
    shortLabel: "Smog & Dust",
    description:
      "Outdoor urban pollution, construction dust, and ultrafine PM2.5 penetrating the home.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M3 12C3 7.03 7.03 3 12 3s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9zm9-7a7 7 0 100 14A7 7 0 0012 5zm-1 3h2v5h-2V8zm0 6h2v2h-2v-2z",
  },
  {
    id: "allergens",
    label: "Pollen & Allergens",
    shortLabel: "Allergies",
    description:
      "Seasonal pollen, dust mites, and microscopic irritants causing allergic reactions.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M17 8C8 10 5.9 16.17 3.82 20.04L5.71 21 7 18c.53.19 1.09.3 1.68.3 4 0 6.32-3.52 6.32-7.97C15 9.17 15 8.79 15 8H17zm-2.96 5c0 2.88-1.75 5.15-3.89 5.35C11.24 16.25 12.21 14 13.04 13 13.04 13 14.04 11 14.04 13z",
  },
  {
    id: "pets",
    label: "Pet Dander & Odours",
    shortLabel: "Pets",
    description:
      "Airborne pet dander, hair, and lingering odours from furry family members.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", // Using odor icon as base
  },
  {
    id: "kitchen",
    label: "Kitchen Smoke & VOCs",
    shortLabel: "Smoke & VOCs",
    description:
      "Cooking fumes, grease, and chemical VOCs off-gassing from paints or new furniture.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z", // Video/smoke shape placeholder
  },
  {
    id: "mould",
    label: "Mould & Dampness",
    shortLabel: "Mould",
    description:
      "Airborne mould spores, mildew, and bacteria thriving in humid or damp corners.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M6.5 10h-2v5h2v-5zm6 0h-2v5h2v-5zm8.5 7H2v2h19v-2zm-2.5-7h-2v5h2v-5zM11.5 1L2 6v2h19V6l-9.5-5z",
  },
  {
    id: "high-co2",
    label: "Poor Ventilation (High CO₂)",
    shortLabel: "Stale Air",
    description:
      "Closed windows leading to high CO₂ levels, staleness, and morning fatigue.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z",
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
    id: "personal",
    label: "Personal Space / Car / Nursery",
    shortLabel: "Personal Space",
    description: "Compact spaces, vehicle cabins, or baby nurseries up to 200 sq ft.",
    iconViewBox: "0 0 24 24",
    iconPath: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z",
  },
  {
    id: "zone",
    label: "Single Dedicated Zone",
    shortLabel: "Single Zone",
    description:
      "Master bedroom, home office, or living room up to 500 sq ft.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h3v3H5zm0-4h3v3H5zm0-4h3v3H5zm4 8h10v3H9zm0-4h10v3H9zm0-4h10v3H9z",
  },
  {
    id: "apartment",
    label: "Apartment / High-rise Flat",
    shortLabel: "Apartment",
    description:
      "Multi-story residential unit or mid-scale home up to 2,500 sq ft.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5v-2h2v2zm4 4H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2z",
  },
  {
    id: "villa",
    label: "Independent Villa / Large Home",
    shortLabel: "Villa / Large Home",
    description: "Standalone residential structure with full perimeter exposure up to 5,000+ sq ft.",
    iconViewBox: "0 0 24 24",
    iconPath: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  },
  {
    id: "hvac",
    label: "Full-Home HVAC Integration",
    shortLabel: "Central HVAC",
    description:
      "Whole-home central air integration with existing ductwork and AHU systems.",
    iconViewBox: "0 0 24 24",
    iconPath:
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93V18c0-.55.45-1 1-1s1 .45 1 1v1.93A8 8 0 014 12h2c.55 0 1 .45 1 1s-.45 1-1 1H4.07A8 8 0 0011 19.93zm8.93-7.93H18c-.55 0-1-.45-1-1s.45-1 1-1h1.93A8 8 0 0013 4.07V6c0 .55-.45 1-1 1s-1-.45-1-1V4.07A8 8 0 004.07 11H6c.55 0 1 .45 1 1s-.45 1-1 1H4.07A8 8 0 0012 20c4.41 0 8-3.59 8-8h-1.07z",
  },
];

// ─── Recommendation Engine ─────────────────────────────────────────────────
export interface ResidentialRecommendation {
  _type: "residentialRecommendation";
  productId: string;
  systemTier: "compact" | "standard" | "premium" | "enterprise";
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

const recommendations: ResidentialRecommendation[] = [
  {
    _type: "residentialRecommendation",
    productId: "o2-cure-reme-led-portable-air-purifier",
    systemTier: "compact",
    systemName: "O2 Cure REME LED Portable",
    tagline: "Compact REME LED purifier for personal spaces",
    description: "Compact, portable purifier featuring advanced REME LED Technology. Perfect for nurseries, vehicles, and small personal cabins to eliminate pathogens and odours at the source.",
    imageUrl: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/15_REME-LED-Portable_1.jpg",
    imageAlt: "Compact purifier in a modern setting",
    cfmRange: "N/A",
    coverageRange: "Up to 200 sq ft",
    nabl: false,
    tricurePillars: ["Microbial Deactivation", "VOC Neutralisation"],
    badges: ["REME LED Technology", "Portable", "Nursery Safe"],
    primaryCta: "Consult an Air Engineer",
    secondaryCta: "View Product Details",
  },
  {
    _type: "residentialRecommendation",
    productId: "o2-cure-elixir-air-purifier-with-odor-sensing-system-humidifier",
    systemTier: "standard",
    systemName: "O2 Cure Elixir Air Purifier",
    tagline: "High-grade HEPA H13 purifier with built-in humidifier",
    description: "Designed for bedrooms and living rooms. Features a true HEPA H13 filter specifically designed for PM2.5, alongside an integrated odour-sensing system for optimal comfort.",
    imageUrl: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/12_Elixir-Air-Purifier_1.jpg",
    imageAlt: "Elixir Air Purifier in a bright room",
    cfmRange: "100-250 CFM",
    coverageRange: "Up to 450 sq ft",
    nabl: false,
    tricurePillars: ["Particulate Capture", "VOC Neutralisation"],
    badges: ["HEPA H13 (PM2.5)", "Built-in Humidifier", "Multi-stage Filter"],
    primaryCta: "Consult an Air Engineer",
    secondaryCta: "View Product Details",
  },
  {
    _type: "residentialRecommendation",
    productId: "o2cure-max-cure-fresh-air-filtration-unit",
    systemTier: "premium",
    systemName: "O₂Cure Max Cure Fresh Air Unit",
    tagline: "Positive-pressure fresh air filtration for large homes",
    description: "Brings purified outdoor air indoors using positive pressure. Flushes out CO₂ and stale air while heavily filtering out PM2.5 and allergens for a truly revitalised home environment.",
    imageUrl: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/18_Max-Cure.jpg",
    imageAlt: "Max Cure Fresh Air Unit",
    cfmRange: "300-600 CFM",
    coverageRange: "Up to 2,500 sq ft",
    nabl: true,
    tricurePillars: ["Particulate Capture", "Microbial Deactivation"],
    badges: ["Positive Pressure", "Fresh Air Supply", "Multi-Stage Filter"],
    primaryCta: "Consult an Air Engineer",
    secondaryCta: "View Product Details",
  },
  {
    _type: "residentialRecommendation",
    productId: "o2-cure-hybrid-air-purifier",
    systemTier: "premium",
    systemName: "O2 Cure Hybrid Air Purifier",
    tagline: "Customisable floor-standing hybrid purifier",
    description: "Adapts to your space. Combines multiple purification technologies to eliminate particulate matter, odours, and pathogens.",
    imageUrl: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/14_Hybrid-Air-Purifier.jpg",
    imageAlt: "O2 Cure Hybrid Air Purifier",
    cfmRange: "200-400 CFM",
    coverageRange: "Up to 2,000 sq ft",
    nabl: true,
    tricurePillars: ["Particulate Capture", "VOC Neutralisation", "Microbial Deactivation"],
    badges: ["Customisable", "Multi-Tech", "Floor-Standing"],
    primaryCta: "Consult an Air Engineer",
    secondaryCta: "View Product Details",
  }
];

export interface DiagnosticState {
  threats: string[];
  layout: string;
  areaSqFt: number;
  occupancy: number;
}

export function getRecommendation(
  state: DiagnosticState
): ResidentialRecommendation {
  const { threats } = state;

  if (threats.includes("high-co2")) {
    return recommendations[2]; // Max Cure Fresh Air
  }

  return recommendations[3]; // Hybrid Air Purifier
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
      "We had persistent dust sensitivity issues for years. After the O2Cure installation, our allergist confirmed a measurable reduction in reactive episodes within 6 weeks.",
    author: "Priya Sharma",
    role: "Homeowner",
    location: "Bengaluru",
  },
  {
    _type: "testimonial",
    quote:
      "The engineering team studied our floor plan and recommended the exact system for our open-plan villa. The attention to spatial parameters was exceptional.",
    author: "Rohan Mehta",
    role: "Architect & Villa Owner",
    location: "Hyderabad",
  },
  {
    _type: "testimonial",
    quote:
      "Living on the 22nd floor means constant PM2.5 exposure. The ResidAir Pro genuinely transformed what we breathe at home. The data doesn't lie.",
    author: "Ananya Krishnan",
    role: "Pulmonologist & Resident",
    location: "Mumbai",
  },
];

export const certificationBadges = [
  "NABL Accredited",
  "WHO PM2.5 Compliant",
  "BIS Certified",
  "Zero Ozone Emission",
  "CE Marked",
];

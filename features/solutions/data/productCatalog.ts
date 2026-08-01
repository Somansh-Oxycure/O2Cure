/**
 * Product Catalogue — O2Cure Engineering Showcase
 *
 * Single source of truth for all product data, environment selectors,
 * and engineering filter definitions used by the premium product showcase page.
 * Swap individual arrays with Sanity/CMS fetches without touching component logic.
 */

// ─── Environment Sectors ─────────────────────────────────────────────────────

export type EnvironmentSectorId =
  | "all"
  | "corporate"
  | "healthcare"
  | "residential"
  | "industrial"
  | "education"
  | "datacenter";

export interface EnvironmentSector {
  id: EnvironmentSectorId;
  label: string;
  descriptor: string;
  /** Stat shown on the card */
  stat: string;
  image: string;
  alt: string;
}

export const environmentSectors: EnvironmentSector[] = [
  {
    id: "all",
    label: "All Products",
    descriptor: "Complete range of air purification solutions",
    stat: "Explore our full engineering catalogue",
    image: "/enviroment/commertial.png",
    alt: "All solutions",
  },
  {
    id: "corporate",
    label: "Corporate & Office",
    descriptor: "Open-plan workspaces, boardrooms & server facilities",
    stat: "30% of offices have Sick Building Syndrome",
    image: "/enviroment/commertial.png",
    alt: "Premium open-plan corporate office",
  },
  {
    id: "healthcare",
    label: "Healthcare & Clinical",
    descriptor: "ICUs, operating theatres, diagnostic labs & pharmacies",
    stat: "3× higher infection risk for healthcare professionals",
    image: "/enviroment/hospital.png",
    alt: "Clean, bright hospital corridor",
  },
  {
    id: "residential",
    label: "Residential",
    descriptor: "Apartments, villas, nurseries & whole-home solutions",
    stat: "Indoor air is 5× more polluted than outdoor air",
    image: "/enviroment/residential.png",
    alt: "Sunlit modern living room",
  },
  {
    id: "industrial",
    label: "Industrial & Manufacturing",
    descriptor: "Heavy industry, process plants, paint booths & warehouses",
    stat: "CPCB mandates PM control between 30–150 µg/m³",
    image: "/enviroment/industrial.png",
    alt: "Modern industrial facility with controlled environment",
  },
  {
    id: "education",
    label: "Education",
    descriptor: "Classrooms, auditoriums, libraries & campus facilities",
    stat: "13M school days lost annually due to asthma",
    image: "/enviroment/education.png",
    alt: "Contemporary university campus interior",
  },
  {
    id: "datacenter",
    label: "Data Centres",
    descriptor: "Server rooms, colocation facilities & network closets",
    stat: "Corrosive gases cause 55% of server downtime",
    image: "/enviroment/datacenters.png",
    alt: "Rows of servers in a modern data centre",
  },
];

// ─── Air Safety Challenges ──────────────────────────────────────────────────

export type AirChallengeId =
  "particulate" | "odor-gases" | "high-co2" | "pathogens";

export interface AirChallenge {
  id: AirChallengeId;
  label: string;
  shortDesc: string;
  icon: string; // unicode symbol or emoji placeholder
}

export const airChallenges: AirChallenge[] = [
  {
    id: "particulate",
    label: "Particulate / Pollution",
    shortDesc: "PM2.5, PM10, dust, smoke & construction debris",
    icon: "◉",
  },
  {
    id: "odor-gases",
    label: "Odor & Gases",
    shortDesc: "VOCs, formaldehyde, cooking fumes & chemical off-gassing",
    icon: "◎",
  },
  {
    id: "high-co2",
    label: "High CO₂",
    shortDesc: "Elevated CO₂ in high-occupancy spaces causing fatigue",
    icon: "⬡",
  },
  {
    id: "pathogens",
    label: "Pathogens / Microbials",
    shortDesc: "Airborne bacteria, viruses, mould spores & allergens",
    icon: "✦",
  },
];

// ─── Area Coverage Segments ─────────────────────────────────────────────────

export type AreaSegmentId = "compact" | "mid" | "large" | "enterprise";

export interface AreaSegment {
  id: AreaSegmentId;
  label: string;
  range: string;
  maxSqFt: number;
}

export const areaSegments: AreaSegment[] = [
  { id: "compact", label: "Compact", range: "< 500 sq. ft.", maxSqFt: 500 },
  {
    id: "mid",
    label: "Mid-Scale",
    range: "500 – 2,500 sq. ft.",
    maxSqFt: 2500,
  },
  {
    id: "large",
    label: "Large",
    range: "2,500 – 8,000 sq. ft.",
    maxSqFt: 8000,
  },
  {
    id: "enterprise",
    label: "Enterprise",
    range: "8,000+ sq. ft.",
    maxSqFt: Infinity,
  },
];

// ─── Integration Type Filters ───────────────────────────────────────────────

export type IntegrationTypeId =
  "in-duct" | "standalone" | "portable" | "fresh-air";

export interface IntegrationType {
  id: IntegrationTypeId;
  label: string;
  shortDesc: string;
}

export const integrationTypes: IntegrationType[] = [
  { id: "in-duct", label: "In-Duct / HVAC", shortDesc: "Installs inside your AC/HVAC duct" },
  { id: "standalone", label: "Standalone Unit", shortDesc: "Placed in a room, plug & operate" },
  { id: "portable", label: "Portable / In-Vehicle", shortDesc: "USB-powered, carry anywhere" },
  { id: "fresh-air", label: "Fresh Air Supply", shortDesc: "Pulls clean outdoor air in" },
];

// ─── Customer Type Filters ───────────────────────────────────────────────────

export type CustomerTypeId = "b2b" | "b2c" | "both";

export interface CustomerType {
  id: CustomerTypeId;
  label: string;
  shortDesc: string;
}

export const customerTypes: CustomerType[] = [
  { id: "b2b", label: "Business / Institutional", shortDesc: "For offices, hospitals, factories" },
  { id: "b2c", label: "Home / Personal", shortDesc: "For residences and personal use" },
  { id: "both", label: "Both", shortDesc: "Flexible for any setting" },
];

// ─── Product Catalogue ──────────────────────────────────────────────────────

export interface EngineeringSpec {
  key: string;
  value: string;
}

export interface ProductEntry {
  id: string;
  systemName: string;
  tagline: string;
  integrationType: IntegrationTypeId;
  customerType: CustomerTypeId;
  capacityMaxSqFt: number;
  /** Environment sectors this product is suitable for */
  environments: EnvironmentSectorId[];
  /** Air challenges this product addresses */
  challenges: AirChallengeId[];
  /** Technology certification badges */
  badges: string[];
  /** Concise engineering specs shown on the card */
  specs: EngineeringSpec[];
  image: { src: string; alt: string };
  primaryCta: string;
  /** Optional secondary action */
  secondaryCta?: string;
  /** 0–1 scores for each challenge handled */
  challengeScores: Partial<Record<AirChallengeId, number>>;
}

export const products: ProductEntry[] = [
  {
    id: "air-pollution-control-device-apcd",
    systemName: "Air Pollution Control Device (APCD)",
    tagline: "Smart outdoor air purification hub for public & institutional spaces",
    integrationType: "standalone",
    customerType: "b2b",
    capacityMaxSqFt: 50000,
    environments: ["corporate", "industrial", "education"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["IoT-Enabled", "Outdoor Rated", "EC Fan Technology"],
    specs: [
      { key: "Purification", value: "Up to 136,000 m³/day" },
      { key: "PM Reduction", value: "200 → 50 in 60 min" },
      { key: "Application", value: "B2B / Outdoor — Smart city, campuses, factories" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/01_Air-Pollution-Control-Device.png", alt: "Air Pollution Control Device (APCD)" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.95, "odor-gases": 0.7, pathogens: 0.7 },
  },
  {
    id: "bipolar-fc-3-air-ionizer",
    systemName: "Bipolar FC-3 Air Ionizer",
    tagline: "NPBI ionizer for fan coils & mini-splits — zero ozone, 7-year lifespan",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 3500,
    environments: ["corporate", "residential", "healthcare"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["UL 2998 Zero Ozone", "CARB Compliant", "NPBI Technology"],
    specs: [
      { key: "Ion Output", value: ">350 million ions/cc" },
      { key: "Capacity", value: "Up to 3,200 CFM / 8 tons" },
      { key: "Application", value: "B2B / HVAC — Fan coils, mini-splits, air handlers" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/02_Bipolar-FC-3-Air-Ionizer.png", alt: "Bipolar FC-3 Air Ionizer" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.75, "odor-gases": 0.8, pathogens: 0.9 },
  },
  {
    id: "car-air-purifier-with-advanced-hepa-filter-uv-led-technology",
    systemName: "Car Air Purifier — HEPA + UV LED",
    tagline: "USB-powered cabin purifier with HEPA + UV LED — 99.9% sterilisation in 30 seconds",
    integrationType: "portable",
    customerType: "b2c",
    capacityMaxSqFt: 100,
    environments: ["residential"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["HEPA + UV LED", "Rated 4.88/5", "USB Powered"],
    specs: [
      { key: "CADR", value: "8 CMH" },
      { key: "Sterilisation", value: "99.9% in 30 sec" },
      { key: "Price", value: "₹3,000 — Add to basket" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/03_Car-Air-Purifier_1.jpg", alt: "Car Air Purifier with HEPA + UV LED" },
    primaryCta: "Add to Basket",
    challengeScores: { particulate: 0.7, "odor-gases": 0.65, pathogens: 0.95 },
  },
  {
    id: "ci-2-air-ionizer-advanced-bipolar-ionization-for-hvac-air-purification",
    systemName: "CI-2 Air Ionizer",
    tagline: "Self-cleaning NPBI ionizer for fan coils & mini-splits up to 2,400 CFM",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 2500,
    environments: ["corporate", "residential", "healthcare", "education"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["UL 867 & UL 2998", "Self-Cleaning", "CARB Compliant"],
    specs: [
      { key: "Ion Output", value: ">160 million ions/cc" },
      { key: "Capacity", value: "Up to 2,400 CFM / 6 tons" },
      { key: "Application", value: "B2B / HVAC — Fan coils, mini-splits, ductless ACs" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/04_CI-2-Air-Ionizer.png", alt: "CI-2 Air Ionizer" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.7, "odor-gases": 0.75, pathogens: 0.9 },
  },
  {
    id: "dm-48-duct-mounted-npbi-air-purifier",
    systemName: "DM-48 Duct Mounted NPBI™",
    tagline: "Heavy-duty duct ioniser for 4,800 CFM systems — 8–10 year lifespan, zero maintenance",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 8000,
    environments: ["corporate", "industrial", "healthcare", "education", "residential"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["UL 2998 Zero Ozone", "Self-Cleaning", "8–10 Yr Lifespan"],
    specs: [
      { key: "Capacity", value: "Up to 4,800 CFM / 12 tons" },
      { key: "Voltage", value: "24V–240V multi-voltage" },
      { key: "Application", value: "B2B / HVAC — Duct-mounted, commercial & industrial" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/05_DM-48-Duct-Mounted-NPBI.png", alt: "DM-48 Duct Mounted NPBI™ Air Purifier" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.85, "odor-gases": 0.75, pathogens: 0.9 },
  },
  {
    id: "ductable-electronic-air-cleaner-deac-high-efficiency-pm2-5-air-purifier-for-hvac-ducts",
    systemName: "DEAC Ductable Electronic Air Cleaner",
    tagline: "Electrostatic duct purifier — >90% efficiency, 10-year life, no filter replacements",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 5000,
    environments: ["corporate", "healthcare", "education", "residential"],
    challenges: ["particulate", "pathogens"],
    badges: [">90% PM2.5 Efficiency", "No Filter Replacement", "BMS Compatible"],
    specs: [
      { key: "Filtration", value: ">90% at 0.01μm (PM2.5)" },
      { key: "Power", value: "≤39W" },
      { key: "Application", value: "B2B / HVAC — Commercial & residential ducts" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/06_Ductable-Electronic-Air-Cleaner.png", alt: "DEAC Ductable Electronic Air Cleaner" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.95, pathogens: 0.85 },
  },
  {
    id: "electronic-air-cleaner-eac-advanced-air-purification-for-hvac-systems",
    systemName: "EAC Electronic Air Cleaner",
    tagline: "MERV-14 equivalent AHU/FCU cleaner — retrofit-friendly, washable, zero filter waste",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 6000,
    environments: ["corporate", "healthcare", "industrial"],
    challenges: ["particulate", "pathogens"],
    badges: ["MERV-14 Equivalent", "Retrofit-Friendly", "Zero Filter Waste"],
    specs: [
      { key: "Efficiency", value: ">90% at 0.01μm" },
      { key: "Capacity", value: "1,000–4,000 CMH" },
      { key: "Application", value: "B2B / HVAC — AHU & FCU, retrofit" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/07_Electronic-Air-Cleaner.png", alt: "EAC Electronic Air Cleaner" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.95, pathogens: 0.85 },
  },
  {
    id: "fine-filter-eu5-f5-high-efficiency-air-filter-for-clean-rooms-hvac",
    systemName: "Fine Filter EU5/F5",
    tagline: "MERV-10 synthetic panel filter — 99% at 5μm, for clean rooms, pharma & HVAC",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 3000,
    environments: ["industrial", "healthcare", "datacenter"],
    challenges: ["particulate"],
    badges: ["MERV-10 Equivalent", "ASHRAE 52.2", "Custom Sizes"],
    specs: [
      { key: "Efficiency", value: "Up to 99% at 5μm" },
      { key: "Airflow", value: "500–2,000 CFM range" },
      { key: "Application", value: "B2B / Industrial — Clean rooms, pharma, food" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/08_Fine-Filter-EU5-F5.png", alt: "Fine Filter EU5/F5" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.9 },
  },
  {
    id: "fresh-air-energy-recovery-ventilator",
    systemName: "Fresh Air Energy Recovery Ventilator",
    tagline: "ERV with 6-stage filtration & 80% heat recovery — combats CO₂ and stale air",
    integrationType: "fresh-air",
    customerType: "b2b",
    capacityMaxSqFt: 4000,
    environments: ["corporate", "residential", "education"],
    challenges: ["particulate", "odor-gases", "high-co2", "pathogens"],
    badges: ["6-Stage Filtration", "80% Heat Recovery", "EC DC Fan"],
    specs: [
      { key: "PM2.5 Removal", value: "99% (6-stage filter)" },
      { key: "Energy Saving", value: "40% vs. conventional" },
      { key: "Application", value: "B2B / HVAC — Fresh air supply, all spaces" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/09_Fresh-Air-ERV.png", alt: "Fresh Air Energy Recovery Ventilator" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.9, "odor-gases": 0.8, "high-co2": 0.95, pathogens: 0.8 },
  },
  {
    id: "guardian-air-in-duct-air-purification",
    systemName: "Guardian Air+ In-Duct",
    tagline: "PHI + Bipolar ionization — eliminates 99% of airborne germs within 3 feet of source",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 8000,
    environments: ["residential", "corporate", "healthcare", "education"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["EPA Approved", "Tested vs SARS-CoV-2", "PHI + BPI"],
    specs: [
      { key: "Pathogen Kill", value: "Up to 99% within 3 feet" },
      { key: "Capacity", value: "Up to 26,000 CFM (AIR+ 9')" },
      { key: "Application", value: "B2B / HVAC — Residential to healthcare" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/10_Guardian-Air-Plus.png", alt: "Guardian Air+ In-Duct Air Purification" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.8, "odor-gases": 0.85, pathogens: 0.99 },
  },
  {
    id: "meac-electronic-air-cleaner-gxmeac-series",
    systemName: "MEAC GxMEAC Air Cleaner",
    tagline: "Micro-electrostatic AHU purifier — reusable collector, zero filter costs, SARS-CoV-2 tested",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 15000,
    environments: ["corporate", "healthcare", "industrial", "education"],
    challenges: ["particulate", "pathogens"],
    badges: ["SARS-CoV-2 Tested", "Reusable Collector", "AHU Compatible"],
    specs: [
      { key: "Technology", value: "Micro Electrostatic Precipitation" },
      { key: "Maintenance", value: "Zero filter replacements" },
      { key: "Application", value: "B2B / HVAC — Large AHU, hospitals, malls" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/11_MEAC.png", alt: "MEAC GxMEAC Electronic Air Cleaner" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.9, pathogens: 0.92 },
  },
  {
    id: "o2-cure-elixir-air-purifier-with-odor-sensing-system-humidifier",
    systemName: "O2 Cure Elixir — Purifier + Humidifier",
    tagline: "Odor-sensing home purifier with built-in humidifier — up to 450 sq ft",
    integrationType: "standalone",
    customerType: "b2c",
    capacityMaxSqFt: 450,
    environments: ["residential"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["Odor Sensor", "Built-in Humidifier", "D2C Online"],
    specs: [
      { key: "Coverage", value: "Up to 450 sq ft" },
      { key: "Special Feature", value: "Integrated odor sensing" },
      { key: "Application", value: "B2C / Residential — Bedroom, living room" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/12_Elixir-Air-Purifier_1.jpg", alt: "O2 Cure Elixir Air Purifier" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.85, "odor-gases": 0.9, pathogens: 0.8 },
  },
  {
    id: "o2-cure-hulk-air-purifier-humidifier",
    systemName: "O2 Cure Hulk — Purifier + Humidifier",
    tagline: "High-output standalone purifier with humidifier for large rooms up to 850 sq ft",
    integrationType: "standalone",
    customerType: "both",
    capacityMaxSqFt: 850,
    environments: ["residential", "corporate"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["Large Room Coverage", "Built-in Humidifier", "Light Commercial"],
    specs: [
      { key: "Coverage", value: "550–850 sq ft" },
      { key: "Type", value: "Standalone floor unit" },
      { key: "Application", value: "B2C + B2B / Halls, showrooms, large rooms" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/13_Hulk-Air-Purifier_1.jpg", alt: "O2 Cure Hulk Air Purifier" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.85, "odor-gases": 0.8, pathogens: 0.8 },
  },
  {
    id: "o2-cure-hybrid-air-purifier",
    systemName: "O2 Cure Hybrid Air Purifier",
    tagline: "Customisable floor-standing hybrid purifier — adapts to home or commercial use",
    integrationType: "standalone",
    customerType: "both",
    capacityMaxSqFt: 2000,
    environments: ["residential", "corporate", "education"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["Customisable", "Multi-Tech", "Floor-Standing"],
    specs: [
      { key: "Type", value: "Floor-standing standalone" },
      { key: "Flexibility", value: "Customisable tech stack" },
      { key: "Application", value: "B2C + B2B / Home, offices, schools" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/14_Hybrid-Air-Purifier.jpg", alt: "O2 Cure Hybrid Air Purifier" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.85, "odor-gases": 0.8, pathogens: 0.85 },
  },
  {
    id: "o2-cure-reme-led-portable-air-purifier",
    systemName: "O2 Cure REME LED Portable",
    tagline: "Compact REME LED purifier for nurseries, cabins & cars — active at the source",
    integrationType: "portable",
    customerType: "b2c",
    capacityMaxSqFt: 200,
    environments: ["residential"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["REME LED Technology", "Portable", "Nursery Safe"],
    specs: [
      { key: "Technology", value: "REME LED (RGF Environmental)" },
      { key: "Use Case", value: "Nurseries, cabins, vehicles" },
      { key: "Application", value: "B2C / Portable — Personal spaces" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/15_REME-LED-Portable_1.jpg", alt: "O2 Cure REME LED Portable Air Purifier" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.7, "odor-gases": 0.8, pathogens: 0.9 },
  },
  {
    id: "o2cure-eu4-pre-filters-merv-7-8-efficiency-for-superior-air-quality",
    systemName: "O2Cure EU4 Pre-Filters — MERV 7-8",
    tagline: "Synthetic MERV 7-8 pre-filter panels for HVAC — extends main filter life across any scale",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 8000,
    environments: ["corporate", "industrial", "datacenter", "healthcare"],
    challenges: ["particulate"],
    badges: ["MERV 7-8", "ASHRAE 52.2", "Custom Sizes"],
    specs: [
      { key: "Efficiency", value: "MERV 7-8 (Synthetic)" },
      { key: "Standard", value: "ASHRAE 52.2 / EN 779" },
      { key: "Application", value: "B2B / HVAC pre-filtration, residential to industrial" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/16_EU4-Pre-Filter.jpg", alt: "O2Cure EU4 Pre-Filters" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.8 },
  },
  {
    id: "o2cure-kitchen-exhaust-dry-scrubber",
    systemName: "O2Cure Kitchen Exhaust Dry Scrubber",
    tagline: "Commercial kitchen exhaust scrubber — removes grease, smoke, and cooking fumes at source",
    integrationType: "standalone",
    customerType: "b2b",
    capacityMaxSqFt: 3000,
    environments: ["corporate", "industrial"],
    challenges: ["particulate", "odor-gases"],
    badges: ["Grease Removal", "Odor Control", "Commercial Grade"],
    specs: [
      { key: "Type", value: "Dry scrubber for kitchen exhaust" },
      { key: "Targets", value: "Grease, smoke, cooking fumes" },
      { key: "Application", value: "B2B / Commercial kitchens & industrial" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/17_Kitchen-Exhaust-Dry-Scrubber.png", alt: "O2Cure Kitchen Exhaust Dry Scrubber" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.85, "odor-gases": 0.95 },
  },
  {
    id: "o2cure-max-cure-fresh-air-filtration-unit",
    systemName: "O2Cure Max Cure Fresh Air Unit",
    tagline: "Positive-pressure fresh air filtration — purified outdoor air for homes & offices up to 2,500 sq ft",
    integrationType: "fresh-air",
    customerType: "both",
    capacityMaxSqFt: 2500,
    environments: ["residential", "corporate"],
    challenges: ["particulate", "high-co2", "pathogens"],
    badges: ["Positive Pressure", "Fresh Air Supply", "Multi-Stage Filter"],
    specs: [
      { key: "Coverage", value: "Up to 2,500 sq ft" },
      { key: "Method", value: "Positive pressure fresh air supply" },
      { key: "Application", value: "B2B + B2C / Fresh air — Homes & offices" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/18_Max-Cure.jpg", alt: "O2Cure Max Cure Fresh Air Filtration Unit" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.9, "high-co2": 0.9, pathogens: 0.8 },
  },
  {
    id: "o2cure-molecular-filtration-unit",
    systemName: "O2Cure Molecular Filtration Unit",
    tagline: "Gas-phase molecular filtration for data centres, labs & control rooms — eliminates corrosive gases",
    integrationType: "standalone",
    customerType: "b2b",
    capacityMaxSqFt: 5000,
    environments: ["datacenter", "industrial", "corporate"],
    challenges: ["odor-gases", "particulate"],
    badges: ["Molecular Filtration", "Corrosive Gas Removal", "Mission-Critical"],
    specs: [
      { key: "Technology", value: "Gas-phase molecular filtration" },
      { key: "Target Gases", value: "Corrosive, reactive, odorous gases" },
      { key: "Application", value: "B2B / Data centres, control rooms, microelectronics" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/19_Molecular-Filtration-Unit.png", alt: "O2Cure Molecular Filtration Unit" },
    primaryCta: "Enquire for Price",
    challengeScores: { "odor-gases": 0.98, particulate: 0.75 },
  },
  {
    id: "o2cure-plug-play-air-purifier",
    systemName: "O2Cure Plug & Play Air Purifier",
    tagline: "Best-rated plug-in purifier — active PHI technology, no filters, just plug and breathe",
    integrationType: "standalone",
    customerType: "both",
    capacityMaxSqFt: 1000,
    environments: ["residential", "corporate"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["Best Reviewed SKU", "PHI Technology", "No Filter"],
    specs: [
      { key: "Technology", value: "PHI (Photo Hydro Ionization)" },
      { key: "Coverage", value: "Up to 1,000 sq ft" },
      { key: "Application", value: "B2C + B2B / Plug-in, homes & offices" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/20_Plug-and-Play-Air-Purifier_1.jpg", alt: "O2Cure Plug & Play Air Purifier" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.8, "odor-gases": 0.85, pathogens: 0.9 },
  },
  {
    id: "o2cure-plug-n-play-max-advanced-air-purifier-with-phi-bipolar-ionization-technology",
    systemName: "O2Cure Plug N Play MAX — PHI + Bipolar",
    tagline: "In-duct commercial purifier with dual PHI + Bipolar Ionization — for luxury homes to offices",
    integrationType: "in-duct",
    customerType: "both",
    capacityMaxSqFt: 3000,
    environments: ["residential", "corporate", "healthcare"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["PHI + Bipolar", "Dual Technology", "In-Duct"],
    specs: [
      { key: "Technology", value: "PHI + Bipolar Ionization" },
      { key: "Application", value: "B2B / HVAC — In-duct, commercial to luxury residential" },
      { key: "Flexibility", value: "Commercial to luxury residential" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/21_Plug-n-Play-MAX_1.jpg", alt: "O2Cure Plug N Play MAX" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.8, "odor-gases": 0.85, pathogens: 0.95 },
  },
  {
    id: "o2cure-self-charging-air-filter",
    systemName: "O2Cure Self-Charging Air Filter",
    tagline: "Passive electrostatic HVAC pre-filter — no power needed, green buildings certified",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 5000,
    environments: ["corporate", "industrial", "datacenter"],
    challenges: ["particulate"],
    badges: ["Passive Electrostatic", "No Power Needed", "Green Building"],
    specs: [
      { key: "Technology", value: "Passive electrostatic" },
      { key: "Power", value: "Zero — self-charging" },
      { key: "Application", value: "B2B / Industrial — HVAC pre-filter, green buildings" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/22_Self-Charging-Air-Filter.png", alt: "O2Cure Self-Charging Air Filter" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.85 },
  },
  {
    id: "o2cure-uvgi-emitters-advanced-uv-air-purification-solutions",
    systemName: "O2Cure UVGI Emitters",
    tagline: "In-duct UV germicidal irradiation — disinfects HVAC coils and airstream 24/7",
    integrationType: "in-duct",
    customerType: "b2b",
    capacityMaxSqFt: 4000,
    environments: ["healthcare", "corporate", "datacenter"],
    challenges: ["pathogens"],
    badges: ["UV Germicidal", "UVGI Technology", "24/7 Disinfection"],
    specs: [
      { key: "Technology", value: "UVGI (UV-C Germicidal Irradiation)" },
      { key: "Target", value: "Bacteria, viruses, mould on coils" },
      { key: "Application", value: "B2B / HVAC — In-duct germicidal UV" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/23_UVGI-Emitters.png", alt: "O2Cure UVGI Emitters" },
    primaryCta: "Enquire for Price",
    challengeScores: { pathogens: 0.99 },
  },
  {
    id: "reme-halo-by-o2cure-advanced-in-duct-air-purifier-for-homes-commercial-spaces",
    systemName: "REME HALO by O2Cure",
    tagline: "Award-winning REME HALO in-duct purifier — 4 model variants, homes to commercial spaces",
    integrationType: "in-duct",
    customerType: "both",
    capacityMaxSqFt: 3500,
    environments: ["residential", "corporate", "healthcare"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["REME Technology", "4 Model Variants", "Premium Grade"],
    specs: [
      { key: "Technology", value: "REME (Reflective Electro Magnetic Energy)" },
      { key: "Variants", value: "4 models for different duct sizes" },
      { key: "Application", value: "B2B + Residential / HVAC — In-duct" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/24_REME-HALO.jpg", alt: "REME HALO by O2Cure" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.85, "odor-gases": 0.85, pathogens: 0.95 },
  },
  {
    id: "reme-halo-led-next-generation-in-duct-active-air-purifier",
    systemName: "REME HALO LED",
    tagline: "Next-gen mercury-free LED REME purifier — quieter, greener, longer-lasting than original HALO",
    integrationType: "in-duct",
    customerType: "both",
    capacityMaxSqFt: 4000,
    environments: ["residential", "corporate", "healthcare"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["Mercury-Free LED", "REME LED Tech", "Low Maintenance"],
    specs: [
      { key: "Technology", value: "REME LED (mercury-free UV)" },
      { key: "Upgrade", value: "Quieter, greener vs. original HALO" },
      { key: "Application", value: "B2B + Residential / HVAC — Premium in-duct" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/25_REME-HALO-LED.png", alt: "REME HALO LED" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.85, "odor-gases": 0.85, pathogens: 0.95 },
  },
  {
    id: "replacement-of-phi-cell-plug-play",
    systemName: "PHI-CELL® Replacement — Plug & Play",
    tagline: "Official PHI-CELL® replacement for the O2Cure Plug & Play purifier — restores full performance",
    integrationType: "standalone",
    customerType: "b2c",
    capacityMaxSqFt: 1000,
    environments: ["residential"],
    challenges: ["particulate", "odor-gases", "pathogens"],
    badges: ["Genuine Replacement", "PHI-CELL® Technology", "Easy Swap"],
    specs: [
      { key: "Compatibility", value: "O2Cure Plug & Play Air Purifier" },
      { key: "Type", value: "PHI-CELL® consumable replacement" },
      { key: "Application", value: "B2C / Consumable — Performance restoration" },
    ],
    image: { src: "/O2Cure Product Images-20260728T120253Z-1-001/O2Cure Product Images/26_PHI-Cell-Replacement.png", alt: "PHI-CELL® Replacement" },
    primaryCta: "Enquire for Price",
    challengeScores: { particulate: 0.8, "odor-gases": 0.85, pathogens: 0.9 },
  },
];

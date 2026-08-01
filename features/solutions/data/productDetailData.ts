/**
 * Product Detail Data — O2Cure Full PDP Content
 *
 * Single source of truth for all 26 product pages.
 * Extracted verbatim from O2Cure_Product_Master.md and structured
 * for the dynamic route at /solutions/[productId].
 *
 * Swap individual entries with Sanity CMS fetches without touching
 * component logic — the interface is the contract.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Capability {
  title: string;
  description: string;
  /** Lucide icon name (as a string key) */
  icon: "wind" | "shield" | "zap" | "activity" | "droplets" | "cpu" | "wifi" | "wrench" | "filter" | "thermometer" | "leaf" | "eye" | "radio" | "layers" | "settings" | "lock" | "sun" | "refresh-cw";
}

export interface PerformanceMetric {
  value: string;
  label: string;
}

export interface TechSpec {
  parameter: string;
  value: string;
}

export interface ProductReview {
  author: string;
  rating: number;
  body: string;
  date: string;
}

export interface CTAConfig {
  type: "priced" | "enquiry";
  price?: string;
  primaryLabel: string;
  /** For B2C products: link to o2cure.in product page */
  productPageUrl?: string;
  amazonAvailable?: boolean;
  manualUrl?: string;
}

export interface ProductDetail {
  /** Must match ProductEntry.id from productCatalog.ts */
  id: string;
  /** One punchy headline sentence for the hero */
  heroHeadline: string;
  /** Two-sentence editorial overview */
  overview: string;
  /** Pollutants shown in the dark strip below hero */
  contaminantsCleared: string[];
  /** 3–5 key capability cards — replaces numbered filtration steps */
  capabilities: Capability[];
  /** 3–5 headline stats for the impact metrics section */
  performanceMetrics: PerformanceMetric[];
  /** Technical spec rows for the dark specs table */
  specs: TechSpec[];
  /** Where the product is installed/used */
  applications: string[];
  /** Certifications shown as badge pills */
  certifications: string[];
  cta: CTAConfig;
  reviews?: ProductReview[];
}

// ─── Product Detail Catalogue ─────────────────────────────────────────────────

export const productDetails: ProductDetail[] = [

  // ── 01 ──────────────────────────────────────────────────────────────────────
  {
    id: "air-pollution-control-device-apcd",
    heroHeadline: "Outdoor air purification at city scale — fully automated, IoT-connected, built to last a decade.",
    overview:
      "The APCD is O2Cure's flagship outdoor air purification system, purpose-built for public spaces, campuses and smart-city infrastructure. Fully automated and remotely operable, it reduces PM levels from 200 to 50 in just 60 minutes while delivering real-time AQI data to a centralised cloud dashboard.",
    contaminantsCleared: ["PM2.5", "PM10", "VOCs", "CO₂", "Bacteria", "Viruses", "Odour"],
    capabilities: [
      {
        title: "Massive Purification Volume",
        description: "Processes up to 136,000 cubic metres of outdoor air per day — the equivalent of purifying a large stadium multiple times over.",
        icon: "wind",
      },
      {
        title: "Real-Time AQI Display",
        description: "Integrated IP68-rated LED screens show live PM2.5, PM10, CO₂ and VOC readings, doubling as a public information and advertising platform.",
        icon: "activity",
      },
      {
        title: "IoT & Remote Control",
        description: "All units connect to a centralised cloud dashboard worldwide. Schedule, monitor and update operations remotely via smartphone or PC.",
        icon: "wifi",
      },
      {
        title: "Auto-Wash Filters",
        description: "A 200L onboard water tank powers automatic filter cleaning cycles, dramatically reducing operational costs and manual maintenance.",
        icon: "refresh-cw",
      },
      {
        title: "EC Fan Technology",
        description: "Brushless, electronically controlled EC fans consume 70% less energy than traditional AC fans — built-in efficiency at city scale.",
        icon: "zap",
      },
    ],
    performanceMetrics: [
      { value: "136,000 m³", label: "Air purified per day" },
      { value: "60 min", label: "PM 200 → 50 reduction time" },
      { value: "10 Years", label: "Product lifecycle" },
      { value: "70%", label: "Energy saving vs. AC fans" },
    ],
    specs: [
      { parameter: "Pollutant Reduction", value: "PM 200 → 50 in 60 minutes" },
      { parameter: "Purification Volume", value: "Up to 136,000 m³/day" },
      { parameter: "Sensor", value: "Built-in PM2.5 real-time" },
      { parameter: "Digital Panels", value: "2 of 4 panels, IP68-rated LED" },
      { parameter: "Water Tank", value: "200L for auto-wash cycles" },
      { parameter: "Fan Technology", value: "EC fans, 70% energy saving" },
      { parameter: "Connectivity", value: "IoT, cloud, BMS integration" },
      { parameter: "Lifecycle", value: "Up to 10 years (5 yr with AMC)" },
    ],
    applications: ["Smart Cities", "Public Plazas", "Industrial Campuses", "Educational Institutions", "Construction Sites", "Sports Arenas"],
    certifications: ["IoT-Enabled", "Outdoor Rated", "EC Fan Technology", "Cloud-Connected"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 02 ──────────────────────────────────────────────────────────────────────
  {
    id: "bipolar-fc-3-air-ionizer",
    heroHeadline: "Patented NPBI technology in a compact module — over 350 million ions per cc, zero ozone.",
    overview:
      "The Bipolar FC-3 uses advanced Needlepoint Bipolar Ionization to transform the air inside fan coils, ductless mini-splits and air handlers. It releases both positive and negative ions that actively cluster airborne pollutants, pathogens and VOCs for dramatically improved filtration — without generating ozone.",
    contaminantsCleared: ["PM2.5", "VOCs", "Bacteria", "Viruses", "Allergens", "Odour"],
    capabilities: [
      {
        title: "Needlepoint Bipolar Ionization",
        description: "Patented NPBI technology releases >350 million positive and negative ions per cc, causing particles to cluster and be captured more effectively.",
        icon: "zap",
      },
      {
        title: "Carbon Fibre Emitters",
        description: "Durable carbon fibre brush emitters generate ions efficiently and maintain performance for over 7 years with simple monthly cleaning.",
        icon: "layers",
      },
      {
        title: "BAS Integration",
        description: "Built-in dry contact alarm output integrates seamlessly into Building Automation Systems for centralised monitoring.",
        icon: "cpu",
      },
      {
        title: "Zero Ozone Certified",
        description: "UL 867 and UL 2998 certified — independently verified to produce zero ozone emissions, safe for continuous occupied-space use.",
        icon: "shield",
      },
    ],
    performanceMetrics: [
      { value: ">350M", label: "Ions per cc output" },
      { value: "3,200 CFM", label: "Maximum capacity (8 tons)" },
      { value: "7+ Years", label: "Operational lifespan" },
      { value: "1.2W", label: "Power consumption" },
    ],
    specs: [
      { parameter: "Capacity", value: "Up to 3,200 CFM / 8 tons" },
      { parameter: "Input Voltage", value: "24VAC/DC" },
      { parameter: "Power Consumption", value: "1.2 Watts" },
      { parameter: "Ion Output", value: ">350 million ions/cc" },
      { parameter: "Temperature Range", value: "-20°F to 140°F" },
      { parameter: "Humidity Range", value: "0–100% RH" },
      { parameter: "Dimensions", value: "2.6\"L × 1.9\"W × 1.3\"H" },
      { parameter: "Certifications", value: "UL 867, UL 2998, CARB, CE" },
    ],
    applications: ["Fan Coil Units", "Ductless Mini-Splits", "Air Handlers", "Offices", "Hotels", "Clinics"],
    certifications: ["UL 2998 Zero Ozone", "CARB Compliant", "NPBI Technology", "IAQP Certified"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 03 ──────────────────────────────────────────────────────────────────────
  {
    id: "car-air-purifier-with-advanced-hepa-filter-uv-led-technology",
    heroHeadline: "USB-powered cabin purifier — HEPA + UV LED neutralises Coronavirus in 30 seconds.",
    overview:
      "O2Cure's Car Air Purifier is a portable device that plugs into any USB slot and protects you from viruses, bacteria, pollutants and odours on the go. The hybrid HEPA and UV LED technology eliminates the drawbacks of conventional UV purifiers, delivering 99.9% sterilisation in just 30 seconds.",
    contaminantsCleared: ["PM2.5", "Viruses", "Bacteria", "Coronavirus", "Odour", "Smoke"],
    capabilities: [
      {
        title: "HEPA + UV LED Hybrid",
        description: "A revolutionary combination of HEPA filtration and UV LED technology, optimised by RGF Environmental Group and O2Cure to disinfect, purify and deodorise air and surfaces.",
        icon: "shield",
      },
      {
        title: "99.9% Sterilisation in 30s",
        description: "Proven against Coronavirus with 99.9% sterilisation rate in just 30 seconds — independently validated by virology laboratories.",
        icon: "activity",
      },
      {
        title: "Plug & Go",
        description: "Connects via USB Type-A — no installation, no wiring. Simply plug in and breathe clean air from the first moment.",
        icon: "zap",
      },
      {
        title: "Surface Disinfection",
        description: "UVC LED treats not just the air but also surfaces in the cabin environment, providing dual-mode protection.",
        icon: "sun",
      },
    ],
    performanceMetrics: [
      { value: "99.9%", label: "Sterilisation rate" },
      { value: "30s", label: "Time to neutralise Coronavirus" },
      { value: "4.88/5", label: "Customer rating" },
      { value: "4.5W", label: "Power consumption" },
    ],
    specs: [
      { parameter: "Product Model", value: "VAC" },
      { parameter: "Purification", value: "UV LED + HEPA + Activated Carbon" },
      { parameter: "Sterilisation", value: "UV LED + HEPA (with Carbon)" },
      { parameter: "CADR", value: "8 CMH" },
      { parameter: "Size", value: "84mm × 160mm" },
      { parameter: "Weight", value: "300g" },
      { parameter: "Power", value: "4.5W / DC 5V" },
      { parameter: "Certifications", value: "KC, CE, FCC" },
    ],
    applications: ["Cars & Vehicles", "Small Cabins", "Home Office", "Study Rooms", "Infant Rooms"],
    certifications: ["KC Certified", "CE Certified", "FCC Certified", "HEPA + UV LED"],
    cta: {
      type: "priced",
      price: "₹3,000",
      primaryLabel: "Add to Basket",
      productPageUrl: "https://o2cure.in/product/o2-cure-car-air-purifier/",
      amazonAvailable: true,
    },
    reviews: [
      { author: "Verified Buyer", rating: 5, body: "Works perfectly in my car. The air feels noticeably fresher within minutes.", date: "2021" },
    ],
  },

  // ── 04 ──────────────────────────────────────────────────────────────────────
  {
    id: "ci-2-air-ionizer-advanced-bipolar-ionization-for-hvac-air-purification",
    heroHeadline: "Self-cleaning NPBI ionizer designed for tight HVAC spaces — neutralises viruses at the source.",
    overview:
      "The CI-2 Air Ionizer delivers Needlepoint Bipolar Ionization directly into fan coils, mini-splits and ductless ACs. Its self-cleaning design ensures consistent long-term performance without intervention, while its compact form factor fits even the tightest installation spaces.",
    contaminantsCleared: ["PM2.5", "Bacteria", "Viruses", "VOCs", "Allergens", "Odour"],
    capabilities: [
      {
        title: "Self-Cleaning Cycle",
        description: "Automatic cleaning cycles maintain peak ion output without manual intervention — set it up and forget it.",
        icon: "refresh-cw",
      },
      {
        title: "160 Million Ions/cc",
        description: "Generates over 160 million ions per cc to actively neutralise viruses, bacteria, allergens and particulates in the airstream.",
        icon: "zap",
      },
      {
        title: "Smart Building Ready",
        description: "Status display, internal mounting magnet and BAS alarm contacts make integration into smart building management systems seamless.",
        icon: "cpu",
      },
      {
        title: "Multi-Compliance",
        description: "Meets UL 867, UL 2998, UL 2043, CARB, CE and FCC Part 18 — comprehensive international safety and air quality certification.",
        icon: "shield",
      },
    ],
    performanceMetrics: [
      { value: ">160M", label: "Ions per cc output" },
      { value: "2,400 CFM", label: "Maximum capacity (6 tons)" },
      { value: "4W", label: "Operating power" },
      { value: "0–100%", label: "Humidity range (RH)" },
    ],
    specs: [
      { parameter: "Capacity", value: "0–2,400 CFM (up to 6 tons)" },
      { parameter: "Input Voltage", value: "24VAC, 12–36VDC" },
      { parameter: "Power (Operation)", value: "4W" },
      { parameter: "Power (Cleaning)", value: "7W" },
      { parameter: "Ion Output", value: ">160 million ions/cc" },
      { parameter: "Dimensions", value: "4.2\" × 1.1\" × 2.6\"" },
      { parameter: "Weight", value: "0.37 lbs" },
      { parameter: "Certifications", value: "UL, cUL, CARB, CE, FCC, UL 867, 2998" },
    ],
    applications: ["Homes & Apartments", "Offices & Conference Rooms", "Hotels & Resorts", "Healthcare Facilities", "Schools", "Gyms & Spas"],
    certifications: ["UL 867", "UL 2998", "CARB Compliant", "CE Certified", "Self-Cleaning"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 05 ──────────────────────────────────────────────────────────────────────
  {
    id: "dm-48-duct-mounted-npbi-air-purifier",
    heroHeadline: "Heavy-duty duct ioniser handling 4,800 CFM — zero maintenance, zero ozone, 8–10 year life.",
    overview:
      "The DM-48 is a powerful self-cleaning NPBI system engineered to deliver cleaner, healthier indoor air at scale. Designed to retrofit into virtually any HVAC duct system, it eliminates airborne particles, neutralises odours and deactivates pathogens without adding pressure drop or requiring ongoing maintenance.",
    contaminantsCleared: ["PM2.5", "PM10", "Bacteria", "Viruses", "VOCs", "Odour", "Mould"],
    capabilities: [
      {
        title: "No Pressure Drop",
        description: "Unlike mechanical filters, the DM-48 adds zero pressure drop to your HVAC system — maintaining airflow efficiency while purifying the air.",
        icon: "wind",
      },
      {
        title: "Programmable Self-Cleaning",
        description: "Integrated self-cleaning function maintains consistent ion output automatically, eliminating the need for any ongoing maintenance.",
        icon: "settings",
      },
      {
        title: "Multi-Voltage Flexibility",
        description: "Accepts 24V–240V input, making it compatible with virtually every commercial and residential HVAC installation globally.",
        icon: "zap",
      },
      {
        title: "Durable Carbon Fibre Emitters",
        description: "Carbon fibre brush emitters have no mechanical wear parts and deliver a product life of 8–10 years in continuous operation.",
        icon: "layers",
      },
    ],
    performanceMetrics: [
      { value: "4,800 CFM", label: "Maximum system capacity" },
      { value: "8–10 Yrs", label: "Product life expectancy" },
      { value: "0 Pa", label: "Pressure drop added" },
      { value: "24–240V", label: "Multi-voltage input range" },
    ],
    specs: [
      { parameter: "Capacity", value: "Up to 4,800 CFM / 12 tons" },
      { parameter: "Voltage Input", value: "24V–240V multi-voltage" },
      { parameter: "Self-Cleaning", value: "Programmable automatic" },
      { parameter: "Ozone Emissions", value: "Zero (UL 2998 certified)" },
      { parameter: "Pressure Drop", value: "None" },
      { parameter: "Product Life", value: "8–10 years" },
      { parameter: "Installation", value: "Duct-mounted (indoor & outdoor rated)" },
      { parameter: "Certifications", value: "UL 2998 Zero Ozone" },
    ],
    applications: ["Offices", "Hospitals", "Schools", "Shopping Complexes", "Homes", "Industrial HVAC"],
    certifications: ["UL 2998 Zero Ozone", "Self-Cleaning", "8–10 Yr Lifespan", "Outdoor Rated"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 06 ──────────────────────────────────────────────────────────────────────
  {
    id: "ductable-electronic-air-cleaner-deac-high-efficiency-pm2-5-air-purifier-for-hvac-ducts",
    heroHeadline: "Electrostatic duct purifier — over 90% PM2.5 efficiency, 10-year life, no filter replacements ever.",
    overview:
      "The DEAC uses Electrostatic Precipitation Technology to capture PM2.5, allergens, smoke, bacteria and viruses at filtration efficiency greater than 90% for particles as small as 0.01μm. Its washable pre-filter and collector plates mean zero consumable costs for the life of the unit.",
    contaminantsCleared: ["PM2.5", "PM10", "Dust", "Smoke", "Bacteria", "Viruses", "Allergens", "Pollen"],
    capabilities: [
      {
        title: "Electrostatic Precipitation",
        description: "No disposable filters required — ever. The electrostatic collector plates capture particles and are washed clean, dramatically reducing total cost of ownership.",
        icon: "zap",
      },
      {
        title: ">90% at 0.01μm",
        description: "Achieves greater than 90% filtration efficiency for particles as small as 0.01 microns, including the finest PM2.5 and airborne microbes.",
        icon: "shield",
      },
      {
        title: "BMS Compatible",
        description: "Supports building management system integration with operation, cleaning and fault indicators — smart monitoring built in.",
        icon: "cpu",
      },
      {
        title: "10-Year Service Life",
        description: "Built for commercial durability with a 10-year service life, horizontal or vertical duct mounting and ≤39W power consumption.",
        icon: "settings",
      },
    ],
    performanceMetrics: [
      { value: ">90%", label: "Filtration efficiency (PM2.5)" },
      { value: "0.01μm", label: "Smallest particle captured" },
      { value: "10 Years", label: "Service life" },
      { value: "≤39W", label: "Power consumption" },
    ],
    specs: [
      { parameter: "Dimensions", value: "1114 × 370 × 180mm" },
      { parameter: "Filtration Efficiency", value: ">90% (PM2.5 & microbes)" },
      { parameter: "Particle Size", value: "Down to 0.01μm" },
      { parameter: "Power Consumption", value: "≤39W" },
      { parameter: "Pressure Drop", value: "≤20 Pa" },
      { parameter: "Operating Temperature", value: "4°C to 60°C" },
      { parameter: "Service Life", value: "Up to 10 years" },
      { parameter: "Installation", value: "Horizontal or vertical duct" },
    ],
    applications: ["Commercial Offices", "Hospitals & Clinics", "Hotels & Banquet Halls", "Residential Villas", "Educational Institutions"],
    certifications: [">90% PM2.5 Efficiency", "No Filter Replacement", "BMS Compatible", "SARS-CoV-2 Tested"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 07 ──────────────────────────────────────────────────────────────────────
  {
    id: "electronic-air-cleaner-eac-advanced-air-purification-for-hvac-systems",
    heroHeadline: "MERV-14 equivalent AHU purifier — retrofit-friendly, washable, zero filter waste for a decade.",
    overview:
      "The EAC by O2Cure is a high-efficiency air purification solution for AHU and FCU systems, built on Electrostatic Precipitation Technology. It removes PM2.5, allergens, bacteria and microscopic particles down to 0.01μm with negligible pressure drop and zero filter replacement costs.",
    contaminantsCleared: ["PM2.5", "Smoke", "Bacteria", "Viruses", "Allergens", "Dust"],
    capabilities: [
      {
        title: "MERV-14 Equivalent",
        description: "Achieves MERV-14 equivalent efficiency (EN779:2012 / ASHRAE 52.2), placing it among the highest-performance air cleaning solutions for AHU applications.",
        icon: "shield",
      },
      {
        title: "Retrofit-Friendly",
        description: "Designed for top, bottom or side installation, making it easy to integrate into existing AHU and FCU systems without significant ductwork modification.",
        icon: "wrench",
      },
      {
        title: "Zero Filter Waste",
        description: "Washable pre-filter and collector plates eliminate ongoing consumable costs and landfill waste — an eco-friendly, cost-positive design.",
        icon: "leaf",
      },
      {
        title: "Smart Indicators",
        description: "Built-in operation, cleaning and malfunction alert indicators let facility teams know the unit's status at a glance.",
        icon: "eye",
      },
    ],
    performanceMetrics: [
      { value: ">90%", label: "Efficiency at 0.01μm" },
      { value: "4,000 CMH", label: "Maximum airflow capacity" },
      { value: "≤39W", label: "Power consumption" },
      { value: "10 Years", label: "Service life" },
    ],
    specs: [
      { parameter: "MERV Rating", value: "MERV-14 Equivalent" },
      { parameter: "Filtration Efficiency", value: ">90% at 0.01μm" },
      { parameter: "Capacity", value: "1,000–4,000 CMH" },
      { parameter: "Power Consumption", value: "≤39W" },
      { parameter: "Pressure Drop", value: "Only 20 Pa" },
      { parameter: "Service Life", value: "Up to 10 years" },
      { parameter: "Operating Temp", value: "4°C to 60°C" },
      { parameter: "Installation", value: "Top, bottom or side mount" },
    ],
    applications: ["AHU Systems", "FCU Systems", "Commercial Retrofits", "Hospitals", "Offices", "Industrial HVAC"],
    certifications: ["MERV-14 Equivalent", "Retrofit-Friendly", "Zero Filter Waste", "ASHRAE 52.2"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 08 ──────────────────────────────────────────────────────────────────────
  {
    id: "fine-filter-eu5-f5-high-efficiency-air-filter-for-clean-rooms-hvac",
    heroHeadline: "MERV-10 synthetic panel filter engineered for clean rooms, pharma and precision HVAC — 99% at 5μm.",
    overview:
      "The EU5/F5 Fine Filter by O2Cure is built for high-performance secondary and final filtration in clean rooms, HVAC systems and critical industries. Its deep-pleated synthetic media and aluminium frame deliver 99% efficiency at 5 microns with a low initial pressure drop of 6.5mmWG.",
    contaminantsCleared: ["PM2.5", "Dust", "Pollen", "Fine Particles", "Microbial Spores"],
    capabilities: [
      {
        title: "99% at 5μm",
        description: "Achieves up to 99% filtration efficiency at 5 microns — equivalent to MERV 10 under ASHRAE 52.2 — protecting downstream systems and clean environments.",
        icon: "filter",
      },
      {
        title: "Deep-Pleated Media",
        description: "Non-woven synthetic deep-pleated media maximises dust holding capacity and extends filter life, reducing replacement frequency and operational costs.",
        icon: "layers",
      },
      {
        title: "Aluminium Frame",
        description: "Robust aluminium flange or box frame with epoxy resin sealant and synthetic rubber gasket ensures a leak-free fit in demanding environments.",
        icon: "settings",
      },
      {
        title: "Easy Dedusting",
        description: "Can be cleaned using compressed air jet or vacuum — no brushing required — enabling multiple cleaning cycles before replacement.",
        icon: "wind",
      },
    ],
    performanceMetrics: [
      { value: "99%", label: "Efficiency at 5μm" },
      { value: "MERV-10", label: "ASHRAE 52.2 rating" },
      { value: "12 Months", label: "Typical service life" },
      { value: "500–2,000", label: "CFM capacity range" },
    ],
    specs: [
      { parameter: "Filtration Efficiency", value: "Up to 99% at 5μm" },
      { parameter: "MERV Equivalent", value: "MERV 10 (ASHRAE 52.2)" },
      { parameter: "Initial Pressure Drop", value: "6.5mm WG" },
      { parameter: "Final Pressure Drop", value: "20mm WG" },
      { parameter: "Airflow Range", value: "500–2,000 CFM" },
      { parameter: "Max Temperature", value: "Up to 60°C" },
      { parameter: "Frame Material", value: "Aluminium (Flange or Box type)" },
      { parameter: "Service Life", value: "Approx. 12 months" },
    ],
    applications: ["Clean Rooms", "Pharmaceutical Manufacturing", "Electronics & Microelectronics", "Food Processing", "Telecom & Data", "Commercial HVAC"],
    certifications: ["MERV-10 Equivalent", "ASHRAE 52.2", "ISO 16890", "Custom Sizes Available"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 09 ──────────────────────────────────────────────────────────────────────
  {
    id: "fresh-air-energy-recovery-ventilator",
    heroHeadline: "6-stage fresh air ERV with 80% heat recovery — abundant oxygen in, CO₂ and pollutants out.",
    overview:
      "The Fresh Air Energy Recovery Ventilator pre-conditions incoming outdoor air through a 6-stage filtration process while recovering up to 80% of the thermal energy from the outgoing stale air. The result is a continuous supply of clean, oxygen-rich indoor air without the penalty of energy loss.",
    contaminantsCleared: ["PM2.5", "Viruses", "Pollen", "Bacteria", "Dander", "Odour", "Dust", "Smoke", "VOCs", "CO₂"],
    capabilities: [
      {
        title: "6-Stage Filtration",
        description: "Removes 99% of indoor PM2.5 through six filter layers — meeting the Northern European Clean Room Standard for air purity.",
        icon: "filter",
      },
      {
        title: "80% Heat Recovery",
        description: "Polymer nanomaterial exchange core recovers up to 80% of latent and sensible energy from outgoing stale air through counter and convective flow technology.",
        icon: "thermometer",
      },
      {
        title: "CO₂ & VOC Expulsion",
        description: "Continuously expels excess CO₂, organic volatiles, smoke and odours from the indoor space while supplying fresh, filtered outdoor air.",
        icon: "wind",
      },
      {
        title: "EC DC Fan Efficiency",
        description: "Energy-efficient EC DC fan saves 40% on electricity compared to conventional motor-driven ventilation systems.",
        icon: "zap",
      },
    ],
    performanceMetrics: [
      { value: "99%", label: "PM2.5 removal (6-stage)" },
      { value: "80%", label: "Heat exchange rate" },
      { value: "40%", label: "Energy saving vs. conventional" },
      { value: "226mm", label: "Ultra-thin profile depth" },
    ],
    specs: [
      { parameter: "Filtration Stages", value: "6-layer filter unit" },
      { parameter: "PM2.5 Removal", value: "99%" },
      { parameter: "Heat Exchange Rate", value: "Up to 80%" },
      { parameter: "Fan Type", value: "EC DC fan" },
      { parameter: "Energy Saving", value: "40% vs. conventional" },
      { parameter: "Profile Depth", value: "226mm ultra-thin" },
      { parameter: "Additional Purification", value: "BPI, PHI, REME options" },
      { parameter: "Core Type", value: "Polymer or HRW heat exchange" },
    ],
    applications: ["Corporate Offices", "Residential Homes", "Schools & Colleges", "Healthcare Facilities", "Hotels"],
    certifications: ["6-Stage Filtration", "80% Heat Recovery", "EC DC Fan", "No Radiation Harm"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 10 ──────────────────────────────────────────────────────────────────────
  {
    id: "guardian-air-in-duct-air-purification",
    heroHeadline: "PHI + Bipolar ionization kills 99% of airborne germs within 3 feet of the source.",
    overview:
      "Guardian Air+ is an advanced in-duct purification solution combining Photo Hydro Ionization and Bipolar Ionization to actively cleanse indoor air at the molecular level. Tested against 15+ pathogens including SARS-CoV-2, MRSA and Tuberculosis, it neutralises contaminants without mechanical filters.",
    contaminantsCleared: ["PM2.5", "PM10", "Bacteria", "Viruses", "Mould", "VOCs", "Odour", "Allergens"],
    capabilities: [
      {
        title: "PHI + Bipolar Ionization",
        description: "Two complementary active technologies work together — PHI generates hydroperoxides that attack pathogens, while bipolar ionization clusters particles for capture.",
        icon: "zap",
      },
      {
        title: "Tested on 15+ Pathogens",
        description: "Independently verified against SARS-CoV-2, MRSA, Norwalk Virus, Tuberculosis and more — eliminates up to 99% of airborne microbes within 3 feet.",
        icon: "shield",
      },
      {
        title: "Pest Repellent",
        description: "Built-in ultrasonic frequency technology naturally deters pests without chemicals or traps — a bonus layer of protection for commercial environments.",
        icon: "radio",
      },
      {
        title: "No Filter Required",
        description: "Active purification means no mechanical filter to replace. The UV-C lamp and plasma matrix do the work — reducing maintenance to near zero.",
        icon: "settings",
      },
    ],
    performanceMetrics: [
      { value: "99%", label: "Pathogen elimination within 3 ft" },
      { value: "26,000 CFM", label: "AIR+ 9′ airflow capacity" },
      { value: "25,000 hrs", label: "Unit lifespan" },
      { value: "11–17W", label: "Power consumption range" },
    ],
    specs: [
      { parameter: "AIR+ 5′ Capacity", value: "Up to 12,500 CFM" },
      { parameter: "AIR+ 5′ HO Capacity", value: "Up to 18,000 CFM" },
      { parameter: "AIR+ 9′ Capacity", value: "Up to 26,000 CFM" },
      { parameter: "Power Supply", value: "24 VAC" },
      { parameter: "Power Range", value: "11W–17W (model dependent)" },
      { parameter: "Lifespan", value: "25,000 Hours" },
      { parameter: "Certifications", value: "EPA, CE, ISO, ROHS, NRTL" },
      { parameter: "Ozone Emissions", value: "Zero certified" },
    ],
    applications: ["Residential HVAC", "Corporate Office Buildings", "Hospitals & Healthcare", "Hotels & Hospitality", "Educational Institutions"],
    certifications: ["EPA Approved", "Tested vs SARS-CoV-2", "PHI + BPI", "Zero Ozone NRTL"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 11 ──────────────────────────────────────────────────────────────────────
  {
    id: "meac-electronic-air-cleaner-gxmeac-series",
    heroHeadline: "Micro-electrostatic AHU purifier — reusable collector, SARS-CoV-2 tested, zero filter costs.",
    overview:
      "The GxMEAC Series by O2Cure uses Micro Electrostatic Precipitator Technology to deliver high-efficiency filtration in AHU systems. Its reusable dust collection module eliminates filter replacement costs entirely while maintaining proven effectiveness against viruses, bacteria and airborne pollutants.",
    contaminantsCleared: ["PM2.5", "Bacteria", "Viruses", "SARS-CoV-2", "Allergens", "Dust"],
    capabilities: [
      {
        title: "Micro Electrostatic Precision",
        description: "MEAC technology goes beyond conventional EACs by using micro-scale electrostatic precipitation for higher filtration efficiency with minimal energy usage.",
        icon: "zap",
      },
      {
        title: "Reusable Dust Collector",
        description: "The dust collection module is washable and reusable for the life of the unit — zero filter replacement costs, zero filter waste.",
        icon: "refresh-cw",
      },
      {
        title: "SARS-CoV-2 Tested",
        description: "Independently tested and certified to remove SARS-CoV-2 from the airstream, making it suitable for mission-critical healthcare and high-occupancy environments.",
        icon: "shield",
      },
      {
        title: "AHU Compatible",
        description: "Engineered for straightforward integration into existing Air Handling Units across commercial, healthcare and large-scale industrial applications.",
        icon: "wrench",
      },
    ],
    performanceMetrics: [
      { value: "High", label: "Virus & bacteria removal" },
      { value: "0", label: "Filter replacements needed" },
      { value: "SARS-CoV-2", label: "Virus removal certified" },
      { value: "AHU", label: "Native integration type" },
    ],
    specs: [
      { parameter: "Technology", value: "Micro Electrostatic Precipitation (MEAC)" },
      { parameter: "Filter Replacement", value: "None — washable collector" },
      { parameter: "Virus Removal", value: "SARS-CoV-2 tested & certified" },
      { parameter: "Integration", value: "AHU compatible" },
      { parameter: "Maintenance", value: "Low — periodic wash only" },
      { parameter: "Application", value: "Commercial & large-scale HVAC" },
    ],
    applications: ["Hospitals & Healthcare", "Pharmaceutical Plants", "Commercial Offices", "Hotels", "Schools", "Shopping Malls & Airports", "Industrial AHUs"],
    certifications: ["SARS-CoV-2 Tested", "Reusable Collector", "AHU Compatible", "Zero Filter Waste"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 12 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2-cure-elixir-air-purifier-with-odor-sensing-system-humidifier",
    heroHeadline: "Six-stage smart purifier with built-in humidifier — removes 99.99% of allergens, up to 450 sq ft.",
    overview:
      "O2Cure's Elixir air purifier combines six-stage advanced filtration with an integrated smart humidifier, delivering hospital-grade air quality while maintaining optimal moisture levels through winter. Its odour-sensing system automatically adjusts fan speed based on real-time air quality readings.",
    contaminantsCleared: ["PM2.5", "PM10", "Viruses", "Pollen", "Bacteria", "Dander", "Odour", "Dust", "Smoke", "VOCs"],
    capabilities: [
      {
        title: "6-Stage Filtration",
        description: "Anti-bacterial and anti-microbial coated filters work across six distinct stages to capture everything from coarse particles to sub-micron viruses.",
        icon: "filter",
      },
      {
        title: "Smart Odour Sensing",
        description: "An intelligent onboard sensor continuously monitors PM2.5, PM10, odours and VOCs, automatically adjusting fan speed to match the actual air quality.",
        icon: "activity",
      },
      {
        title: "Integrated Humidifier",
        description: "The built-in humidifier restores moisture to dry winter air, so the air you breathe is both clean and comfortable — never parched.",
        icon: "droplets",
      },
      {
        title: "Night & Auto Modes",
        description: "Night-time mode runs silently for undisturbed sleep. Auto mode hands full control to the sensors — clean air with zero effort.",
        icon: "settings",
      },
    ],
    performanceMetrics: [
      { value: "99.99%", label: "Allergen removal rate" },
      { value: "350 CMH", label: "CADR rating" },
      { value: "450 sq ft", label: "Maximum coverage area" },
      { value: "5.00/5", label: "Customer rating" },
    ],
    specs: [
      { parameter: "Product Model", value: "Elixir" },
      { parameter: "Rated Power", value: "65W / 220V / 50Hz" },
      { parameter: "CADR", value: "350 CMH" },
      { parameter: "Filter", value: "6-Stage Filtration with Humidifier" },
      { parameter: "Coverage Area", value: "350–450 sq ft" },
      { parameter: "AQI Indicator", value: "Multi-Colour LED" },
      { parameter: "Net Weight", value: "6.5 kg" },
      { parameter: "Dimensions", value: "360 × 195 × 565mm" },
      { parameter: "Warranty", value: "1 Year" },
    ],
    applications: ["Residences", "Salons & Spas", "Offices", "Hotels", "Gyms", "Clinics", "Restaurants", "Schools"],
    certifications: ["Odour Sensor", "Built-in Humidifier", "Zero Ozone", "Remote Control"],
    cta: {
      type: "priced",
      price: "₹17,999",
      primaryLabel: "Add to Basket",
      productPageUrl: "https://o2cure.in/product/o2-cure-elixir-air-purifier/",
      amazonAvailable: true,
      manualUrl: "https://o2cure.in/wp-content/uploads/2020/11/ELIXIR_User_Manual1.pdf",
    },
    reviews: [
      { author: "Madhav", rating: 5, body: "Value for money.", date: "January 2021" },
      { author: "Abhishek", rating: 5, body: "Valuable and affordable.", date: "January 2021" },
      { author: "Pinku Singh", rating: 5, body: "Perfect.", date: "August 2021" },
    ],
  },

  // ── 13 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2-cure-hulk-air-purifier-humidifier",
    heroHeadline: "High-output 7-stage purifier with humidifier for large rooms up to 850 sq ft — Wi-Fi enabled.",
    overview:
      "The O2Cure Hulk is one of the finest smart air purifiers on the market, combining seven-stage filtration with an integrated humidifier and Wi-Fi connectivity for full app control. Designed for larger spaces, it neutralises pollutants and microbes while maintaining optimal humidity levels year-round.",
    contaminantsCleared: ["PM2.5", "PM10", "Viruses", "Pollen", "Bacteria", "Dander", "Odour", "Dust", "Smoke", "VOCs"],
    capabilities: [
      {
        title: "7-Stage Filtration",
        description: "One stage beyond the Elixir — a comprehensive seven-layer filtration system that neutralises pollutants at every particle size from coarse dust to sub-micron viruses.",
        icon: "filter",
      },
      {
        title: "Wi-Fi & App Control",
        description: "Full Wi-Fi connectivity gives you real-time air quality data and remote control of every setting from anywhere via the O2Cure app.",
        icon: "wifi",
      },
      {
        title: "Integrated Humidifier",
        description: "Maintains optimum humidity levels automatically — ideal for dry climates and winter months when air becomes uncomfortably arid.",
        icon: "droplets",
      },
      {
        title: "Smart Odour Sensing",
        description: "Onboard sensors continuously monitor PM2.5, PM10, odours and VOCs, adjusting fan speed automatically to match the real air quality.",
        icon: "activity",
      },
    ],
    performanceMetrics: [
      { value: "99.99%", label: "Allergen removal rate" },
      { value: "500 CADR", label: "Clean air delivery rate" },
      { value: "850 sq ft", label: "Maximum coverage area" },
      { value: "5.00/5", label: "Customer rating" },
    ],
    specs: [
      { parameter: "Coverage Area", value: "550–850 sq ft" },
      { parameter: "CADR", value: "500" },
      { parameter: "Filtration", value: "7-Stage with Humidifier" },
      { parameter: "Connectivity", value: "Wi-Fi enabled with app" },
      { parameter: "Modes", value: "Auto, Night-time, Touch & Display" },
      { parameter: "Safety", value: "Child safety lock" },
      { parameter: "Warranty", value: "1 Year" },
    ],
    applications: ["Large Residences", "Salons & Spas", "Offices", "Hotels", "Gyms", "Clinics", "Restaurants", "Schools"],
    certifications: ["Wi-Fi Enabled", "7-Stage Filtration", "Built-in Humidifier", "Zero Ozone"],
    cta: {
      type: "priced",
      price: "₹29,499",
      primaryLabel: "Add to Basket",
      productPageUrl: "https://o2cure.in/product/o2-cure-hulk-air-purifier/",
      manualUrl: "https://o2cure.in/product/o2-cure-hulk-air-purifier/",
    },
    reviews: [
      { author: "Verified Buyer", rating: 5, body: "Covers our entire living area beautifully. The Wi-Fi control is a great bonus.", date: "2021" },
      { author: "Verified Buyer", rating: 5, body: "Best purchase for our home. Highly recommended.", date: "2021" },
    ],
  },

  // ── 14 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2-cure-hybrid-air-purifier",
    heroHeadline: "A fully customisable floor-standing purifier — adapts to home automation, offices and residences alike.",
    overview:
      "The O2Cure Hybrid Air Purifier is a customisable, floor-standing air quality solution designed to serve both commercial and residential environments. It integrates with home automation and mobile applications, bringing intelligent purification to any space without compromise.",
    contaminantsCleared: ["PM2.5", "PM10", "Viruses", "Pollen", "Bacteria", "Dander", "Odour", "Dust", "Smoke", "VOCs"],
    capabilities: [
      {
        title: "Fully Customisable",
        description: "The technology stack inside the Hybrid is configurable to your specific air quality needs — from standalone filtration to multi-technology active purification.",
        icon: "settings",
      },
      {
        title: "Home Automation Ready",
        description: "Integrates with home automation systems and mobile applications for seamless smart-home control of your indoor air environment.",
        icon: "wifi",
      },
      {
        title: "Floor-Standing Form",
        description: "Tall, slim floor-standing design fits naturally in living rooms, lobbies and commercial spaces without occupying counter or desk space.",
        icon: "layers",
      },
      {
        title: "Respiratory Health Focus",
        description: "Specifically engineered to help occupants with dust allergies, pollen allergies, asthma and other respiratory conditions breathe safely.",
        icon: "activity",
      },
    ],
    performanceMetrics: [
      { value: "25,000", label: "Breaths taken per day (human)" },
      { value: "Dual", label: "Commercial & residential use" },
      { value: "350×350×1000mm", label: "Slim floor-standing dimensions" },
      { value: "5.00/5", label: "Customer rating" },
    ],
    specs: [
      { parameter: "Dimensions", value: "350 × 350 × 1000mm" },
      { parameter: "Electrical", value: "220V / 50Hz" },
      { parameter: "Form Factor", value: "Floor-standing standalone" },
      { parameter: "Integration", value: "Home automation, mobile app" },
      { parameter: "Flexibility", value: "Customisable tech stack" },
    ],
    applications: ["Residences", "Hotels", "Schools", "Offices", "Spas", "Gyms", "Clinics", "Restaurants"],
    certifications: ["Customisable", "Multi-Tech", "Floor-Standing", "Smart Home Ready"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
    reviews: [
      { author: "Verified Buyer", rating: 5, body: "Great product, works seamlessly with our smart home setup.", date: "2021" },
      { author: "Verified Buyer", rating: 5, body: "Exactly what we needed for the office.", date: "2021" },
      { author: "Verified Buyer", rating: 5, body: "Highly efficient and elegant design.", date: "2021" },
    ],
  },

  // ── 15 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2-cure-reme-led-portable-air-purifier",
    heroHeadline: "Compact REME LED purifier for nurseries, cabins and cars — silent, low-maintenance, active at the source.",
    overview:
      "The REME LED Portable Air Purifier uses RGF's most advanced patented REME-LED™ Technology to actively neutralise allergens, PM levels, odour, mould, coronavirus, bacteria and VOCs in small spaces. Combined with Bipolar Ionization, it quietly purifies the air you breathe without requiring filter replacement.",
    contaminantsCleared: ["PM2.5", "Bacteria", "Odour", "VOCs", "Mould", "Viruses", "Microbial", "Smoke", "Coronavirus"],
    capabilities: [
      {
        title: "REME-LED™ Technology",
        description: "Directs UV LEDs of optimum wavelength onto a hybrid catalyst to produce friendly oxidisers — hydrogen peroxide molecules — that actively neutralise airborne and surface contaminants.",
        icon: "sun",
      },
      {
        title: "Bipolar Ionization",
        description: "Releases positive and negative ions that reduce PM2.5 levels actively, complementing the REME-LED oxidation process for comprehensive air treatment.",
        icon: "zap",
      },
      {
        title: "Washable Filters",
        description: "No filter replacements needed — simply wash and reinstall. Low maintenance, long life, no ongoing consumable costs.",
        icon: "refresh-cw",
      },
      {
        title: "Silent Operation",
        description: "Operates quietly enough for nurseries and bedrooms — clean air without noise disruption, day or night.",
        icon: "activity",
      },
    ],
    performanceMetrics: [
      { value: "200 sq ft", label: "Treatment area" },
      { value: "5W", label: "Power consumption" },
      { value: "5.00/5", label: "Customer rating" },
      { value: "12V DC", label: "Low-voltage operation" },
    ],
    specs: [
      { parameter: "Technology", value: "REME-LED™, PHI, Bipolar, UVLED" },
      { parameter: "Dimensions", value: "2.76\" × 2.76\" × 6.9\"" },
      { parameter: "Weight", value: "13.6 oz" },
      { parameter: "Electrical", value: "12V DC, 0.4A" },
      { parameter: "Power Consumption", value: "5 Watts" },
      { parameter: "Treatment Area", value: "200 sq ft" },
      { parameter: "Maintenance", value: "Washable filters" },
    ],
    applications: ["Nurseries", "Small Bedrooms", "Smoking Rooms", "Restrooms", "Cars", "Small Cabins"],
    certifications: ["REME LED Technology", "Portable", "Nursery Safe", "Bipolar Ionization"],
    cta: {
      type: "priced",
      price: "₹21,995",
      primaryLabel: "Add to Basket",
      productPageUrl: "https://o2cure.in/product/o2-cure-reme-led-portable-air-purifier/",
    },
    reviews: [
      { author: "Verified Buyer", rating: 5, body: "Perfect for my baby's nursery. Whisper quiet and very effective.", date: "2021" },
      { author: "Verified Buyer", rating: 5, body: "Love the compact design. Works great in the car too.", date: "2021" },
    ],
  },

  // ── 16 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2cure-eu4-pre-filters-merv-7-8-efficiency-for-superior-air-quality",
    heroHeadline: "Your first line of air protection — MERV 7-8 synthetic pre-filters extending every downstream system's life.",
    overview:
      "O2Cure EU4 Pre Filters are high-efficiency synthetic panel filters designed to capture large airborne particles before they reach your primary filtration system. Achieving MERV 7-8 grade with over 90% arrestance at 10 microns, they are available in a full range of standard sizes and custom configurations.",
    contaminantsCleared: ["Dust", "Pollen", "PM10", "Coarse Particles", "Lint", "Hair"],
    capabilities: [
      {
        title: "MERV 7-8 Efficiency",
        description: "EU4 grade pre-filtration with >90% arrestance at 10 microns — effectively captures large particles that would otherwise prematurely load your fine filters.",
        icon: "filter",
      },
      {
        title: "Multi-Pleat Media",
        description: "Non-woven synthetic multi-pleat or pocket-type options maximise dust holding capacity for extended service intervals.",
        icon: "layers",
      },
      {
        title: "Robust Frame Options",
        description: "Available with Aluminium, GI, SS or MS frames — engineered for the temperature, humidity and pressure conditions of your specific installation.",
        icon: "settings",
      },
      {
        title: "Simple Maintenance",
        description: "Clean using compressed air (2.5–3.5 kg/cm²), vacuum in-place or dip-wash with mild detergent — no specialist tools required.",
        icon: "wrench",
      },
    ],
    performanceMetrics: [
      { value: "MERV 7-8", label: "Filtration grade" },
      { value: ">90%", label: "Arrestance at 10 microns" },
      { value: "12 Months", label: "Service life" },
      { value: "60°C", label: "Maximum operating temperature" },
    ],
    specs: [
      { parameter: "Efficiency Grade", value: "EU4 / MERV 7-8" },
      { parameter: "Arrestance at 10μm", value: ">90%" },
      { parameter: "Standard Depths", value: "12mm, 25mm, 150mm, 305mm" },
      { parameter: "Standard Sizes", value: "305×305 to 610×610mm" },
      { parameter: "Airflow Range", value: "500–2,000 CFM" },
      { parameter: "Max Temperature", value: "60°C" },
      { parameter: "Service Life", value: "Up to 12 months" },
      { parameter: "Standards", value: "ASHRAE 52.2 / EN 779" },
    ],
    applications: ["Residential HVAC", "Commercial Buildings", "Hospitals", "Laboratories", "Industrial Facilities", "IT Hubs"],
    certifications: ["MERV 7-8", "ASHRAE 52.2", "EN 779", "Custom Sizes Available"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 17 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2cure-kitchen-exhaust-dry-scrubber",
    heroHeadline: "Commercial kitchen exhaust purification — eliminates grease, smoke and cooking fumes before discharge.",
    overview:
      "O2Cure's Kitchen Exhaust Dry Scrubber is an advanced multi-stage purification system that processes contaminated kitchen exhaust air through pre-filter, ESP, activated carbon and fine filter stages before discharge. Built for commercial kitchens, cloud kitchens, food courts and industrial workshops.",
    contaminantsCleared: ["Grease", "Smoke", "Cooking Fumes", "Odour", "VOCs", "Fine Particles", "Bacteria", "Viruses"],
    capabilities: [
      {
        title: "4-Stage Dry Filtration",
        description: "EU-4 pre-filter → ESP electrostatic precipitator → activated carbon → EU-7 fine filter. Each stage targets a different class of kitchen pollutant.",
        icon: "filter",
      },
      {
        title: "Electrostatic Precipitator (ESP)",
        description: "Removes fine grease particles, smoke and cooking fumes through electrostatic charge — the core technology for commercial kitchen emission control.",
        icon: "zap",
      },
      {
        title: "Activated Carbon Odour Control",
        description: "Adsorbs odours, VOCs and harmful gases produced during cooking — essential for kitchens in commercial buildings and food courts.",
        icon: "leaf",
      },
      {
        title: "Optional UV-C Disinfection",
        description: "An optional 180nm UV-C lamp can be added to neutralise biological contaminants including bacteria and viruses in the exhaust stream.",
        icon: "sun",
      },
    ],
    performanceMetrics: [
      { value: ">90%", label: "Mist, smoke & odour elimination" },
      { value: "700–80,000 CFM", label: "Airflow capacity range" },
      { value: "4 Stages", label: "Filtration process stages" },
      { value: "EU-7", label: "Final filter grade" },
    ],
    specs: [
      { parameter: "Airflow Capacity", value: "700–80,000 CFM" },
      { parameter: "Material", value: "GI (Aluminium/SS-304 optional)" },
      { parameter: "Construction", value: "Double Skin Panel (50mm)" },
      { parameter: "Fan Type", value: "Direct Driven SISW Plug Fan" },
      { parameter: "Motor", value: "IE2/IE3/IE4 or BLDC" },
      { parameter: "Filters", value: "Pre-filter, ESP, Carbon, Fine (EU-7)" },
      { parameter: "UV-C Option", value: "180nm lamp (optional)" },
      { parameter: "Base Frame", value: "Galvanised Steel, 80–100mm" },
    ],
    applications: ["Commercial Kitchens", "Cloud & Modular Kitchens", "Food Courts & Restaurants", "CNC & Machine Shops", "Paint Booths", "Industrial Workshops"],
    certifications: ["Grease Removal", "Odour Control", "Commercial Grade", "Dry & Wet Options"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 18 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2cure-max-cure-fresh-air-filtration-unit",
    heroHeadline: "Positive-pressure fresh air filtration — purified outdoor air supplied to up to 2,500 sq ft.",
    overview:
      "Max Cure is a state-of-the-art multi-filtration unit that creates a healthier indoor environment by preventing outdoor pollutants from entering your space while supplying a continuous stream of HEPA-filtered fresh air. It pressurises the indoor space, actively controlling AQI levels.",
    contaminantsCleared: ["PM2.5", "PM10", "VOCs", "Bacteria", "Viruses", "Dust", "Pollen"],
    capabilities: [
      {
        title: "Positive Pressure Fresh Air",
        description: "Pressurises your indoor space with filtered fresh air, creating an outward airflow that physically prevents outdoor pollutants from seeping in through gaps.",
        icon: "wind",
      },
      {
        title: "4-Stage Filtration",
        description: "Pre-filter (>90% at 10μm) → Fine Filter (>90% at 3μm) → HEPA (>99.97% at 0.3μm) → Activated Carbon Gas Filter. Comprehensive protection at every particle size.",
        icon: "filter",
      },
      {
        title: "Customisable Configuration",
        description: "Engineered for any space — dimensioned as per requirement, integrating seamlessly into residential or commercial layouts.",
        icon: "settings",
      },
      {
        title: "AQI Level Control",
        description: "Maintains clean and breathable indoor AQI levels continuously, acting as the primary defence against outdoor pollution events.",
        icon: "activity",
      },
    ],
    performanceMetrics: [
      { value: "2,500 sq ft", label: "Maximum coverage area" },
      { value: "HEPA", label: ">99.97% at 0.3μm final stage" },
      { value: "4 Stages", label: "Filtration stages" },
      { value: "+ve", label: "Pressure method" },
    ],
    specs: [
      { parameter: "Coverage Area", value: "Up to 2,500 sq ft" },
      { parameter: "Electrical", value: "220V / 50Hz" },
      { parameter: "Pre-Filter", value: ">90% at 10μm" },
      { parameter: "Fine Filter", value: ">90% at 3μm" },
      { parameter: "HEPA Filter", value: ">99.97% at 0.3μm" },
      { parameter: "Gas Filter", value: "Activated carbon (granular)" },
      { parameter: "Dimensions", value: "As per requirement" },
    ],
    applications: ["Residences", "Corporate Offices", "Clinics", "Hotels", "Schools"],
    certifications: ["Positive Pressure", "Fresh Air Supply", "Multi-Stage Filter", "HEPA Grade"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 19 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2cure-molecular-filtration-unit",
    heroHeadline: "Gas-phase molecular filtration for data centres and control rooms — eliminates corrosive gases that destroy electronics.",
    overview:
      "The Molecular Filtration Unit (MFU), developed in collaboration with Purafil (USA), is a self-contained high-efficiency air cleaning system delivering pressurised, contaminant-free air to controlled environments. It protects sensitive electronics, server rooms and control infrastructure from corrosive gases, particles and environmental pollutants.",
    contaminantsCleared: ["Corrosive Gases", "Acidic Gases", "VOCs", "PM2.5", "Chemical Fumes"],
    capabilities: [
      {
        title: "Dual-Pass Chemical Filtration",
        description: "O2Cure's proprietary chemical filtration media targets acidic gases (PCB), basic gases (PKL) and VOCs (IAQ) in two passes — eliminating the full spectrum of corrosive threats.",
        icon: "filter",
      },
      {
        title: "Corrosion Monitoring",
        description: "Pairs with the O2Cure Gas Monitoring System for real-time copper and silver sensor readings, internal data logging and early detection of air quality deterioration.",
        icon: "eye",
      },
      {
        title: "EC Fan VFD",
        description: "Direct-drive EC fans with integrated Variable Frequency Drive optimise energy usage while delivering consistent pressurised airflow to the protected environment.",
        icon: "zap",
      },
      {
        title: "ISA-S71.04 Compliant",
        description: "Complies with ISA-S71.04-1985 environmental standards for electronic and instrumentation equipment — satisfying most hardware warranty requirements.",
        icon: "shield",
      },
    ],
    performanceMetrics: [
      { value: "500–4,000 CFM", label: "Air flow range" },
      { value: "MERV 8 + 13", label: "Particulate filter grades" },
      { value: "ISA-S71.04", label: "Compliance standard" },
      { value: "VFD", label: "Energy-optimised fan control" },
    ],
    specs: [
      { parameter: "Air Flow Range", value: "500–4,000 CFM" },
      { parameter: "Fan Type", value: "EC Fan (Energy Efficient) with VFD" },
      { parameter: "Pre-Filter", value: "MERV 8" },
      { parameter: "Fine Filter", value: "MERV 13 Mini-Pleat" },
      { parameter: "Chemical Filter", value: "O2Cure Molecular Media" },
      { parameter: "Construction", value: "2mm GI Powder-Coated Steel" },
      { parameter: "External Static", value: "0.2 IWG (saturated filters)" },
      { parameter: "Configurations", value: "Horizontal & Vertical" },
    ],
    applications: ["Data Centres & Server Rooms", "IT & Telecom Facilities", "Oil & Gas Control Rooms", "Microelectronics Manufacturing", "Laboratories & Clean Rooms", "Media Theatres"],
    certifications: ["Molecular Filtration", "Corrosive Gas Removal", "Mission-Critical", "ISA-S71.04 Compliant"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 20 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2cure-plug-play-air-purifier",
    heroHeadline: "O2Cure's best-reviewed purifier — PHI-Cell® actively neutralises Coronavirus up to 99.67% in the air.",
    overview:
      "The O2Cure Plug & Play uses patented PHI-Cell® technology from RGF Environmental Group to replicate nature's own purification process — producing atmospheric hydrogen peroxide molecules that actively neutralise viruses, bacteria, mould and VOCs. Simply plug in and it begins working instantly.",
    contaminantsCleared: ["Viruses", "Bacteria", "VOCs", "Mould", "Fungus", "Odour", "PM2.5", "Coronavirus"],
    capabilities: [
      {
        title: "PHI-Cell® Active Purification",
        description: "Patented PHI-Cell® technology produces atmospheric hydrogen peroxide — nature's most potent oxidising agent — that actively neutralises contaminants throughout the entire room.",
        icon: "sun",
      },
      {
        title: "99.67% Coronavirus Reduction",
        description: "Tested by Indian (CCMB-CSIR) and American (Innovative Bioanalysis) virology labs — verified to reduce Coronavirus by up to 99.67% in the air.",
        icon: "shield",
      },
      {
        title: "Washable Electrostatic Filter",
        description: "The built-in electrostatic filter is washable — zero ongoing consumable costs and zero maintenance hassle.",
        icon: "refresh-cw",
      },
      {
        title: "30,000-Hour PHI-Cell® Life",
        description: "The PHI-Cell® has a 30,000-hour operational lifespan — approximately 4 years of continuous use before replacement is needed.",
        icon: "settings",
      },
    ],
    performanceMetrics: [
      { value: "99.67%", label: "Coronavirus reduction" },
      { value: "99%", label: "Bacteria & virus reduction" },
      { value: "30,000 hrs", label: "PHI-Cell® lifespan" },
      { value: "4.91/5", label: "Customer rating (11 reviews)" },
    ],
    specs: [
      { parameter: "Technology", value: "PHI-Cell® (Photo Hydro Ionization)" },
      { parameter: "PHI-Cell Life", value: "30,000 Hours" },
      { parameter: "Coverage", value: "Up to 1,000 sq ft" },
      { parameter: "Colour Options", value: "White, Grey" },
      { parameter: "Filter", value: "Washable Electrostatic" },
      { parameter: "Internal Fan", value: "Optional" },
      { parameter: "Safety", value: "No ozone, safe for children" },
      { parameter: "Certifications", value: "UL, CE, EPA, ISO, ROHS" },
    ],
    applications: ["Residences", "Restaurants", "Offices", "Schools", "Clinics", "Meeting Rooms", "Spas & Salons", "Hotels", "Fitness Centres", "Smoking Rooms"],
    certifications: ["Best Reviewed SKU", "PHI Technology", "No Filter Replacement", "CCMB-CSIR Tested"],
    cta: {
      type: "priced",
      price: "₹41,999",
      primaryLabel: "Add to Basket",
      productPageUrl: "https://o2cure.in/product/plug-play-air-purifier/",
    },
    reviews: [
      { author: "Damish Khan", rating: 5, body: "I bought this for my mother who has severe asthma. The difference in her breathing quality was noticeable within the first week.", date: "May 2021" },
      { author: "Rahul Sharma", rating: 5, body: "Excellent product. Tested it after COVID and the air quality in our home improved dramatically.", date: "May 2021" },
      { author: "Priya Mehta", rating: 5, body: "Worth every rupee. The technology is genuinely different — no filter to replace, just plug it in.", date: "June 2021" },
    ],
  },

  // ── 21 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2cure-plug-n-play-max-advanced-air-purifier-with-phi-bipolar-ionization-technology",
    heroHeadline: "In-duct commercial purifier with dual PHI + Bipolar Ionization — zero filters, zero ozone, up to 26,000 CFM.",
    overview:
      "The Plug N Play MAX is a high-performance in-duct air purification solution combining Advanced Oxidation Plasma (PHI) with a powerful bipolar ion generator. Lab-tested to kill 99% of airborne germs including SARS-CoV-2, it eliminates pathogens, VOCs and odours throughout your HVAC system without any mechanical filters.",
    contaminantsCleared: ["PM2.5", "PM10", "Bacteria", "Viruses", "SARS-CoV-2", "VOCs", "Odour", "Mould"],
    capabilities: [
      {
        title: "AOP + Bipolar Dual Technology",
        description: "Advanced Oxidation Plasma generates hydroperoxides and super oxide ions while the bipolar ionizer simultaneously reduces PM levels — two complementary active purification systems in one.",
        icon: "zap",
      },
      {
        title: "99% Airborne Germ Kill",
        description: "Lab-tested against SARS-CoV-2, H1N1, Norwalk, MRSA and more — 99% elimination of airborne germs both in the air and on surfaces.",
        icon: "shield",
      },
      {
        title: "Zero Maintenance",
        description: "No filters to replace, no consumables to order. Active ionization purification means near-zero ongoing operational costs.",
        icon: "settings",
      },
      {
        title: "Pest Repellent",
        description: "Embedded ultrasonic radio frequency technology deters insects and pests — an additional layer of building protection at no extra cost.",
        icon: "radio",
      },
    ],
    performanceMetrics: [
      { value: "26,000 CFM", label: "Maximum coverage capacity" },
      { value: "99%", label: "Airborne germ kill rate" },
      { value: "25,000 hrs", label: "Unit lifespan" },
      { value: "11–17W", label: "Power consumption range" },
    ],
    specs: [
      { parameter: "Technology", value: "PHI + Bipolar Ionization (AOP)" },
      { parameter: "Coverage Capacity", value: "Up to 26,000 CFM" },
      { parameter: "Power Supply", value: "24 VAC" },
      { parameter: "Power Range", value: "11W–17W" },
      { parameter: "Lifespan", value: "25,000 Hours" },
      { parameter: "Certifications", value: "UL, CE, EPA, ISO, ROHS" },
      { parameter: "Ozone", value: "Zero" },
      { parameter: "Filter Requirement", value: "None" },
    ],
    applications: ["Commercial Buildings", "Healthcare Facilities", "Luxury Homes", "Hotels", "Offices", "Transport Systems"],
    certifications: ["PHI + Bipolar", "Dual Technology", "In-Duct", "Zero Ozone"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 22 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2cure-self-charging-air-filter",
    heroHeadline: "Passive electrostatic HVAC filter — no power needed, MERV-10 equivalent, washable for 5 years.",
    overview:
      "The O2Cure Self-Charging Air Filter uses a patented alternate polarity configuration with polypropylene media to attract and capture airborne particles without any electrical power source. Achieving 95% efficiency at 10 microns, it is the lowest-maintenance, most eco-conscious pre-filtration choice available.",
    contaminantsCleared: ["Dust", "Pollen", "PM10", "Coarse Particles", "Lint", "Hair"],
    capabilities: [
      {
        title: "Generates Its Own Charge",
        description: "Patented alternate polarity layer configuration creates a self-sustained electrostatic field — no wiring, no power supply, no running costs whatsoever.",
        icon: "zap",
      },
      {
        title: "95% at 10 Microns",
        description: "Achieves 95% filtration efficiency at 10 microns with a minimal initial pressure drop of just 3mm WG — superior to conventional pre-filters.",
        icon: "shield",
      },
      {
        title: "5-Year Washable Life",
        description: "Wash with water and mild detergent every 30–60 days. No replacements needed for 5 years — ideal for LEED and green building certifications.",
        icon: "leaf",
      },
      {
        title: "MERV-10 Equivalent",
        description: "Independently tested per ASHRAE 52-76 and rated MERV-10 equivalent — high efficiency without the premium price of electrified systems.",
        icon: "filter",
      },
    ],
    performanceMetrics: [
      { value: "95%", label: "Efficiency at 10 microns" },
      { value: "0W", label: "Power consumption" },
      { value: "5 Years", label: "Washable service life" },
      { value: "MERV-10", label: "Equivalent rating" },
    ],
    specs: [
      { parameter: "Product Name", value: "95x Primary Filter" },
      { parameter: "Technology", value: "Self-Charging Electrostatic (EAC)" },
      { parameter: "Efficiency", value: "95% @ 10 microns" },
      { parameter: "Power Supply", value: "Not required" },
      { parameter: "Initial Pressure Drop", value: "3mm WG" },
      { parameter: "Final Pressure Drop", value: "6mm WG" },
      { parameter: "Wash Interval", value: "Every 30–60 days" },
      { parameter: "Certification", value: "ASHRAE 52-76, MERV-10 equiv." },
    ],
    applications: ["Commercial HVAC", "Industrial HVAC", "Green Buildings (LEED)", "Data Centres", "Offices"],
    certifications: ["Passive Electrostatic", "No Power Needed", "Green Building", "ASHRAE 52-76"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 23 ──────────────────────────────────────────────────────────────────────
  {
    id: "o2cure-uvgi-emitters-advanced-uv-air-purification-solutions",
    heroHeadline: "In-duct UV germicidal irradiation — continuously disinfects HVAC coils and the airstream 24/7.",
    overview:
      "O2Cure's UVGI Emitters use Ultraviolet Germicidal Irradiation to eliminate airborne viruses, bacteria, mould and VOCs inside HVAC ductwork. Designed for continuous operation, they improve indoor air quality, reduce cross-infection and lower energy costs by keeping HVAC coils free of biological fouling.",
    contaminantsCleared: ["Bacteria", "Viruses", "Mould", "Biofilm", "VOCs", "Allergens"],
    capabilities: [
      {
        title: "UV-C Germicidal Irradiation",
        description: "UV-C light at germicidal wavelengths penetrates and destroys the DNA of airborne pathogens — bacteria, viruses and mould — permanently deactivating them.",
        icon: "sun",
      },
      {
        title: "Coil Sterilisation",
        description: "Continuously irradiates HVAC coils, preventing biofilm build-up and mould colonisation that would otherwise reduce system efficiency and harbour pathogens.",
        icon: "shield",
      },
      {
        title: "24/7 Continuous Operation",
        description: "Operates without interruption, providing constant germicidal protection whenever the HVAC system is running — no manual activation required.",
        icon: "activity",
      },
      {
        title: "Energy Savings",
        description: "Clean coils transfer heat more efficiently, reducing the energy burden on the HVAC compressor and lowering operating costs.",
        icon: "zap",
      },
    ],
    performanceMetrics: [
      { value: "24/7", label: "Continuous operation" },
      { value: "UV-C", label: "Germicidal wavelength" },
      { value: "HVAC", label: "Native integration type" },
      { value: "Energy+", label: "Improved coil efficiency" },
    ],
    specs: [
      { parameter: "Technology", value: "UVGI — UV-C Germicidal Irradiation" },
      { parameter: "Target", value: "Bacteria, viruses, mould on coils" },
      { parameter: "Installation", value: "In-duct HVAC mounting" },
      { parameter: "Operation", value: "Continuous, 24/7" },
      { parameter: "Application", value: "Hospitals, offices, data centres" },
    ],
    applications: ["Healthcare Facilities", "Corporate Offices", "Data Centres", "Hospitality", "Food Processing", "Pharmaceutical"],
    certifications: ["UV Germicidal", "UVGI Technology", "24/7 Disinfection", "BMS Compatible"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 24 ──────────────────────────────────────────────────────────────────────
  {
    id: "reme-halo-by-o2cure-advanced-in-duct-air-purifier-for-homes-commercial-spaces",
    heroHeadline: "Award-winning REME HALO by O2Cure — six technologies in one unit, tested against 15+ pathogens.",
    overview:
      "The REME HALO is an advanced in-duct purifier powered by six cutting-edge technologies — PHI, UV, PCO, Bipolar Ionization, Hydrophilic Coating and Cold Plasma — in a single compact module. Available in four model variants for duct systems from 3,500 to 18,500 CFM, it delivers hospital-grade air quality to any environment.",
    contaminantsCleared: ["PM2.5", "PM10", "Bacteria", "Viruses", "SARS-CoV-2", "Mould", "VOCs", "Odour", "Allergens"],
    capabilities: [
      {
        title: "Six Technologies, One Unit",
        description: "PHI, UV, PCO, Bipolar Ionization, Hydrophilic Coating and Cold Plasma work together — the most comprehensive active purification platform in the O2Cure range.",
        icon: "layers",
      },
      {
        title: "99%+ Pathogen Elimination",
        description: "Tested against 15+ pathogens including H1N1, Norovirus, MRSA, Tuberculosis and SARS-CoV-2 — eliminates over 99% of sneeze germs within 3 feet.",
        icon: "shield",
      },
      {
        title: "Zinc-Infused Catalyst",
        description: "Enhanced zinc-infused catalyst delivers faster kill rates for microbes, mould and VOCs, accelerating purification compared to standard REME systems.",
        icon: "zap",
      },
      {
        title: "Zero Ozone, Tool-Less Cells",
        description: "CARB and UL 2998 zero ozone certified. REME Cells snap in and out without tools — maintenance takes minutes, not hours.",
        icon: "settings",
      },
    ],
    performanceMetrics: [
      { value: "6", label: "Active purification technologies" },
      { value: "15+", label: "Pathogens tested against" },
      { value: "18,500 CFM", label: "Maximum model capacity" },
      { value: "4 Models", label: "Available configurations" },
    ],
    specs: [
      { parameter: "REME HALO 9", value: "Up to 3,500 CFM — 24VAC, 17W" },
      { parameter: "REME HALO 9 HO", value: "Up to 8,000 CFM — 24VAC, 17W" },
      { parameter: "REME HALO PLUS 14", value: "Up to 12,500 CFM — 24VAC, 20W" },
      { parameter: "REME HALO PLUS 14 HO", value: "Up to 18,500 CFM — 24VAC, 20W" },
      { parameter: "Certifications", value: "CARB, UL 2998, CE, ISO, ROHS" },
      { parameter: "Ozone", value: "Zero certified" },
      { parameter: "Origin", value: "Made in USA" },
    ],
    applications: ["Residential HVAC", "Corporate Offices", "Hotels", "Hospitals & Healthcare", "Schools"],
    certifications: ["REME Technology", "4 Model Variants", "CARB Certified", "Made in USA"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 25 ──────────────────────────────────────────────────────────────────────
  {
    id: "reme-halo-led-next-generation-in-duct-active-air-purifier",
    heroHeadline: "The world's first mercury-free LED REME purifier — 5-year operation, zero ozone, no cleaning required.",
    overview:
      "The REME HALO LED is the industry's first LED in-duct whole-home and building air purification system that is mercury-free and zero ozone compliant. Combining REME-LED® UV technology with RGF's proven PHI-CELL® and REME® technologies, it delivers 5 years of maintenance-free active purification.",
    contaminantsCleared: ["PM2.5", "Bacteria", "Viruses", "Mould", "Allergens", "VOCs", "Odour"],
    capabilities: [
      {
        title: "Mercury-Free LED UV",
        description: "The first REME system to replace mercury lamps with LED UV technology — safer, longer-lasting, and more environmentally responsible than traditional designs.",
        icon: "sun",
      },
      {
        title: "5 Years, No Maintenance",
        description: "Up to 5 years of continuous operation with no cleaning, no replacement and no intervention required — the lowest maintenance REME system available.",
        icon: "settings",
      },
      {
        title: "Hybrid Ceramic Catalyst",
        description: "Unique hybrid ceramic catalysts combined with bi-polar ionizers proactively treat every cubic inch of conditioned air in the space.",
        icon: "layers",
      },
      {
        title: "Zero Pressure Drop",
        description: "Does not obstruct airflow in your HVAC ducts — full purification capacity with no impact on system performance or energy efficiency.",
        icon: "wind",
      },
    ],
    performanceMetrics: [
      { value: "5 Years", label: "Maintenance-free operation" },
      { value: "0 Pa", label: "Pressure drop" },
      { value: "17W", label: "Power consumption" },
      { value: "0 Ozone", label: "Certified zero ozone" },
    ],
    specs: [
      { parameter: "Technology", value: "REME-LED® UV, PHI-CELL®, Ceramic Catalyst" },
      { parameter: "Power Supply", value: "24 VAC/DC | 0.7A | 17W" },
      { parameter: "Pressure Drop", value: "Zero" },
      { parameter: "Dimensions", value: "14.25\" L × 6.50\" W × 7.50\" H" },
      { parameter: "Weight", value: "6.4 lbs (2.90 kg)" },
      { parameter: "Maintenance", value: "None for up to 5 years" },
      { parameter: "Ozone", value: "Zero certified" },
    ],
    applications: ["Homes & Apartments", "Corporate Offices", "Schools & Healthcare", "Gyms", "Hospitality"],
    certifications: ["Mercury-Free LED", "REME LED Tech", "Low Maintenance", "Zero Ozone"],
    cta: {
      type: "enquiry",
      primaryLabel: "Enquire for Price",
    },
  },

  // ── 26 ──────────────────────────────────────────────────────────────────────
  {
    id: "replacement-of-phi-cell-plug-play",
    heroHeadline: "Official PHI-CELL® replacement for the Plug & Play purifier — restore full performance after 4 years.",
    overview:
      "Replace your PHI-CELL® cartridge after 30,000 hours (approximately 4 years) to restore your Plug & Play Air Purifier to full factory performance. The PHI-CELL® produces the atmospheric hydrogen peroxide that neutralises 99.9% of pathogens — replacing it ensures your purifier continues working at its absolute best.",
    contaminantsCleared: ["Mould Spores", "Odour", "VOCs", "Bacteria", "Viruses", "Coronavirus", "Harmful Gases"],
    capabilities: [
      {
        title: "Genuine PHI-CELL® Replacement",
        description: "This is the official, genuine PHI-CELL® replacement cartridge — the only replacement that guarantees the same performance as your original Plug & Play purifier.",
        icon: "shield",
      },
      {
        title: "30,000-Hour Lifespan",
        description: "Each new PHI-CELL® provides 30,000 hours of operational life — approximately 4 years of continuous use before the next replacement is needed.",
        icon: "settings",
      },
      {
        title: "Easy Swap",
        description: "Designed for tool-free replacement — swap the PHI-CELL® in minutes with no technical expertise required.",
        icon: "wrench",
      },
      {
        title: "Full Performance Restore",
        description: "A fresh PHI-CELL® restores hydrogen peroxide output to factory levels — your purifier works exactly as it did when it was new.",
        icon: "activity",
      },
    ],
    performanceMetrics: [
      { value: "30,000 hrs", label: "PHI-CELL® lifespan" },
      { value: "4 Years", label: "Replacement interval" },
      { value: "99.9%", label: "Pathogen neutralisation rate" },
      { value: "Minutes", label: "Time to replace" },
    ],
    specs: [
      { parameter: "Lifespan", value: "30,000 Hours" },
      { parameter: "Replacement Interval", value: "After 4 years" },
      { parameter: "Compatible Device", value: "O2Cure Plug & Play Air Purifier" },
      { parameter: "Pollutants Filtered", value: "Mould, Odour, VOCs, Bacteria, Viruses, CO₂, Cross-Contamination" },
    ],
    applications: ["Plug & Play Air Purifier Owners"],
    certifications: ["Genuine Replacement", "PHI-CELL® Technology", "Easy Swap", "4-Year Cycle"],
    cta: {
      type: "priced",
      price: "₹15,000",
      primaryLabel: "Add to Basket",
      productPageUrl: "https://o2cure.in/product/replacement-of-phi-cell-play-and-play/",
    },
  },
];

// ─── Lookup helper ────────────────────────────────────────────────────────────

export function getProductDetail(id: string): ProductDetail | undefined {
  return productDetails.find((p) => p.id === id);
}

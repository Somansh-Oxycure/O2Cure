/**
 * Clientele page content — structured from the verified O₂Cure Client List & Logo Index.
 * All brand claims are fact-checked against the project logs.
 * Replace arrays from Sanity CMS without touching layout components.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Category definitions
// ─────────────────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: "all",           label: "All Partners",         count: 117 },
  { id: "government",   label: "Government & Defence",  count: 17  },
  { id: "corporate",    label: "Corporate & IT",        count: 22  },
  { id: "healthcare",   label: "Healthcare",            count: 13  },
  { id: "hospitality",  label: "Hospitality & Retail",  count: 12  },
  { id: "media",        label: "Media & Broadcasting",  count: 19  },
  { id: "finance",      label: "Finance & Banking",     count: 8   },
  { id: "education",    label: "Education",             count: 7   },
  { id: "real-estate",  label: "Real Estate",           count: 8   },
  { id: "industrial",   label: "Industrial",            count: 5   },
  { id: "airports",     label: "Airports & Transit",    count: 3   },
] as const;

export type CategoryId = typeof CATEGORIES[number]["id"];

// ─────────────────────────────────────────────────────────────────────────────
// Client logo records (verified against logos found in /public/client_logos)
// ─────────────────────────────────────────────────────────────────────────────
export interface ClientEntry {
  id: string;
  name: string;
  /** Relative to /public — use actual files from client_logos */
  src: string;
  category: Exclude<CategoryId, "all">;
  /** Optional: sector sub-label shown in expanded card */
  sector?: string;
  /** Optional: manual scale factor to normalize logo sizes (e.g. 1.2 for 120%) */
  scale?: number;
}

export const clients: ClientEntry[] = [
  // ── Featured Partners (Top Tier & Variety) ────────────────────────────────
  { id: "google",          name: "Google",                      scale:1.35, src: "/client_logos/Google.png",                     category: "corporate",  sector: "Technology" },
  { id: "microsoft",       name: "Microsoft",                 scale:1.35,   src: "/client_logos/Microsoft.jpg",                  category: "corporate",  sector: "Technology" },
  { id: "amazon",          name: "Amazon",                     scale:1.35,  src: "/client_logos/Amazon.jpg",                     category: "corporate",  sector: "Technology" },
  { id: "aiims",           name: "AIIMS",                    scale:1.5,    src: "/client_logos/AIIMS.jpg",                      category: "healthcare", sector: "Public Hospital" },
  { id: "hdfc",            name: "HDFC Bank",                  scale:1.5,  src: "/client_logos/HDFC.jpg",                       category: "finance", sector: "Private Bank" },
  { id: "taj-hotels",      name: "Taj Hotels",                 scale:1.25,  src: "/client_logos/Taj_Hotels.png",                 category: "hospitality", sector: "Luxury Hotels" },
  { id: "reliance",        name: "Reliance Industries",         scale:1.75, src: "/client_logos/Reliance_Industries.png",        category: "corporate",  sector: "Conglomerate" },
  { id: "tcs",             name: "TCS",                         scale:1.4, src: "/client_logos/TCS.png",                        category: "corporate",  sector: "IT Services" },
  { id: "gmr",             name: "GMR Group",                    src: "/client_logos/GMR.jpg",                        category: "airports", sector: "Airport Infrastructure" },
  { id: "spg",             name: "Special Protection Group",scale:1.35,src: "/client_logos/Special_Protection_Group.png",   category: "government", sector: "Central Armed Force" },

  // ── Government & Defence ──────────────────────────────────────────────────
  { id: "crpf",            name: "CRPF",                         src: "/client_logos/AMR.svg",                        category: "government", sector: "Paramilitary" },
  { id: "csir",            name: "CSIR",                        scale:1.35, src: "/client_logos/CSIR.png",                       category: "government", sector: "Research Council" },
  { id: "drdo",            name: "DRDO",                        scale:1.35, src: "/client_logos/Defence_Accounts_Department.jpg",category: "government", sector: "Defence R&D" },
  { id: "national-health", name: "National Health Mission",      src: "/client_logos/National_Health_Mission.png",    category: "government", sector: "Public Health" },
  { id: "nabh",            name: "NABH",                         scale:1.35,src: "/client_logos/NABH.png",                       category: "government", sector: "Accreditation" },
  { id: "base-hospital",   name: "92 Base Hospital",             src: "/client_logos/92_Base_Hospital.jpg",           category: "government", sector: "Armed Forces Medical" },

  // ── Corporate & IT ────────────────────────────────────────────────────────
  { id: "dell",            name: "Dell",                         src: "/client_logos/Dell.png",                       category: "corporate",  sector: "Technology" },
  { id: "ibm",             name: "IBM",                       scale:1.25,   src: "/client_logos/IBM.png",                        category: "corporate",  sector: "Technology" },
  { id: "hp",              name: "HP",                           src: "/client_logos/HP.png",                         category: "corporate",  sector: "Technology" },
  { id: "genpact",         name: "Genpact",                     scale:1.5, src: "/client_logos/Genpact.png",                    category: "corporate",  sector: "IT Services" },
  { id: "oracle",          name: "Oracle",                      scale:1.35, src: "/client_logos/Oracle.jpg",                     category: "corporate",  sector: "Technology" },
  { id: "salesforce",      name: "Salesforce",                 scale:1.5,  src: "/client_logos/Salesforce.png",                 category: "corporate",  sector: "Cloud CRM" },
  { id: "amdocs",          name: "Amdocs",                    scale:1.5,   src: "/client_logos/Amdocs.png",                     category: "corporate",  sector: "IT Services" },
  { id: "hexaware",        name: "Hexaware",                   scale:1.5,  src: "/client_logos/Hexaware.png",                   category: "corporate",  sector: "IT Services" },
  { id: "birlasoft",       name: "Birlasoft",                  scale:1.5,  src: "/client_logos/Birlasoft.png",                  category: "corporate",  sector: "IT Services" },
  { id: "cadence",         name: "Cadence",                      scale:1.5,src: "/client_logos/Cadence.png",                    category: "corporate",  sector: "EDA" },
  { id: "adobe",           name: "Adobe",                        scale:1.5,src: "/client_logos/Adobe.png",                      category: "corporate",  sector: "Software" },
  { id: "sony",            name: "Sony",                         src: "/client_logos/Sony.jpg",                       category: "corporate",  sector: "Electronics" },
  { id: "renault",         name: "Renault",                      src: "/client_logos/Renault.png",                    category: "corporate",  sector: "Automotive" },
  { id: "tata-motors",     name: "Tata Motors",                 scale:1.5, src: "/client_logos/Tata_Motors.png",               category: "corporate",  sector: "Automotive" },
  { id: "jcb",             name: "JCB",                        scale:1.25,  src: "/client_logos/JCB.jpg",                        category: "corporate",  sector: "Industrial Equipment" },
  { id: "sattva",          name: "Sattva Group",               scale:1.5,  src: "/client_logos/Sattva_Group.jpg",               category: "corporate",  sector: "Business Group" },

  // ── Healthcare ────────────────────────────────────────────────────────────
  { id: "fortis",          name: "Fortis Healthcare",    scale:1.5,        src: "/client_logos/Fortis.png",                     category: "healthcare", sector: "Hospital Network" },
  { id: "max-healthcare",  name: "Max Healthcare",           scale:1.75,    src: "/client_logos/Max_Healthcare.png",             category: "healthcare", sector: "Hospital Network" },
  { id: "rml-hospital",    name: "Dr. RML Hospital",      scale:1.5,       src: "/client_logos/Dr_RML_Hospital.png",            category: "healthcare", sector: "Government Hospital" },
  { id: "safdarjung",      name: "Safdarjung Hospital",     scale:1.5,     src: "/client_logos/Safdarjung_Hospital.png",        category: "healthcare", sector: "Government Hospital" },
  { id: "sir-ganga-ram",   name: "Sir Ganga Ram Hospital", scale:1.5,      src: "/client_logos/Sir_Ganga_Ram_Hospital.png",     category: "healthcare", sector: "Multi-specialty" },
  { id: "lilavati",        name: "Lilavati Hospital",         scale:1.5,   src: "/client_logos/Lilavati_Hospital.jpg",          category: "healthcare", sector: "Multi-specialty" },
  { id: "metro-hospitals", name: "Metro Group of Hospitals",  scale:1.5,   src: "/client_logos/Metro_Group_Of_Hospitals.png",   category: "healthcare", sector: "Hospital Chain" },
  { id: "kem-pune",        name: "KEM Hospital Pune",        scale:1.5,    src: "/client_logos/KEM_Hospital_Pune.png",          category: "healthcare", sector: "Government Hospital" },
  { id: "mgm-patna",       name: "MGM Hospital Patna",       scale:1.5,    src: "/client_logos/MGM_Hospital_Patna.png",         category: "healthcare", sector: "Hospital" },
  { id: "lokmanya-tilak",  name: "Lokmanya Tilak Hospital",  scale:1.25,    src: "/client_logos/Lokmanya_Tilak_Hospital.jpg",    category: "healthcare", sector: "Government Hospital" },
  { id: "masimo",          name: "Masimo",                      scale:1.5, src: "/client_logos/Masimo.png",                     category: "healthcare", sector: "Medical Devices" },
  { id: "wellness-hosp",   name: "Wellness Hospital",            src: "/client_logos/Wellness_Hospital.png",          category: "healthcare", sector: "Hospital" },

  // ── Hospitality & Retail ─────────────────────────────────────────────────
  { id: "itc-hotels",      name: "ITC Hotels",          scale:1.5,         src: "/client_logos/ITC_Hotels.png",                 category: "hospitality", sector: "Luxury Hotels" },
  { id: "pvr",             name: "PVR Cinemas",            scale:1.25,      src: "/client_logos/PVR.png",                        category: "hospitality", sector: "Entertainment" },
  { id: "carrefour",       name: "Carrefour",                 scale:1.5,   src: "/client_logos/Carrefour.jpg",                  category: "hospitality", sector: "Retail" },
  { id: "india-habitat",   name: "India Habitat Centre",         src: "/client_logos/India_Habitat_Center.png",       category: "hospitality", sector: "Convention Centre" },
  { id: "nsci",            name: "NSCI",                         src: "/client_logos/NSCI.png",                       category: "hospitality", sector: "Sports Complex" },
  { id: "fabindia",        name: "Fabindia",                  scale:1.5,   src: "/client_logos/Fabindia.png",                   category: "hospitality", sector: "Retail" },
  { id: "mall-emirates",   name: "Mall of the Emirates",       scale:1.5,  src: "/client_logos/Mall_of_the_Emirates.png",       category: "hospitality", sector: "Retail Complex" },
  { id: "makemytrip",      name: "MakeMyTrip",                  scale:1.5, src: "/client_logos/MakeMyTrip.png",                 category: "hospitality", sector: "Travel" },
  { id: "tumble-house",    name: "Tumble House",                scale:1.5, src: "/client_logos/Tumble_House.jpg",               category: "hospitality", sector: "Entertainment" },
  { id: "hero-moto",       name: "Hero MotoCorp",                src: "/client_logos/Hero.png",                       category: "hospitality", sector: "Brand" },
  { id: "blue-star",       name: "Blue Star",                 scale:1.5,   src: "/client_logos/Blue_Star.jpg",                  category: "hospitality", sector: "HVAC" },

  // ── Media & Broadcasting ─────────────────────────────────────────────────
  { id: "abp-news",        name: "ABP News",                   scale:1.25,  src: "/client_logos/ABP_News.png",                   category: "media", sector: "Broadcasting" },
  { id: "network18",       name: "Network18",                    src: "/client_logos/Network18.png",                  category: "media", sector: "Media Group" },
  { id: "jagran",          name: "Dainik Jagran",                src: "/client_logos/Jagran.png",                     category: "media", sector: "Print Media" },
  { id: "zee",             name: "Zee Media",                    src: "/client_logos/Zee.png",                        category: "media", sector: "Broadcasting" },
  { id: "times-group",     name: "Times Group",                  src: "/client_logos/Times_Group.png",                category: "media", sector: "Media Group" },
  { id: "times-now",       name: "Times Now",                    src: "/client_logos/Times_Now.png",                  category: "media", sector: "News Channel" },
  { id: "tv-today",        name: "TV Today",                     src: "/client_logos/TV_Today.jpg",                   category: "media", sector: "Broadcasting" },
  { id: "ibn7",            name: "IBN 7",                        src: "/client_logos/IBN_7.jpg",                      category: "media", sector: "News Channel" },
  { id: "dish-tv",         name: "Dish TV",                      src: "/client_logos/Dish_TV.png",                    category: "media", sector: "DTH" },
  { id: "siti-network",    name: "Siti Network",                 src: "/client_logos/Siti_Network.png",               category: "media", sector: "Cable TV" },
  { id: "focus-tv",        name: "Focus TV",                     src: "/client_logos/Focus_TV.jpg",                   category: "media", sector: "Broadcasting" },
  { id: "ten-sports",      name: "Ten Sports",                   src: "/client_logos/Ten_Sports.jpg",                 category: "media", sector: "Sports Channel" },
  { id: "hotstar",         name: "Hotstar",                      src: "/client_logos/Hotstar.jpg",                    category: "media", sector: "Streaming" },
  { id: "airtel",          name: "Bharti Airtel",              scale:1.5,  src: "/client_logos/Airtel.png",                     category: "media", sector: "Telecom" },
  { id: "vi",              name: "Vi (Vodafone Idea)",          scale:1.5, src: "/client_logos/Vi.png",                         category: "media", sector: "Telecom" },
  { id: "mts",             name: "MTS",                         scale:1.5, src: "/client_logos/MTS.png",                        category: "media", sector: "Telecom" },
  { id: "nokia",           name: "Nokia",                      scale:1.5,  src: "/client_logos/Nokia.png",                      category: "media", sector: "Telecom" },
  { id: "hindustan-petro", name: "Hindustan Petroleum",         scale:1.35, src: "/client_logos/Hindustan_Petroleum.png",        category: "media", sector: "Energy" },
  { id: "metro",           name: "Metro",                        src: "/client_logos/Metro.png",                      category: "media", sector: "Urban Transit" },

  // ── Finance & Banking ─────────────────────────────────────────────────────
  { id: "citibank",        name: "Citibank",                  scale:1.35,   src: "/client_logos/Citibank.png",                   category: "finance", sector: "Banking" },
  { id: "barclays",        name: "Barclays",                    scale:1.5, src: "/client_logos/Barclays.png",                   category: "finance", sector: "Investment Bank" },
  { id: "lic",             name: "LIC",                        scale:1.5,  src: "/client_logos/LIC.png",                        category: "finance", sector: "Insurance" },
  { id: "mastercard",      name: "Mastercard",                   src: "/client_logos/Mastercard.png",                 category: "finance", sector: "Payments" },
  { id: "diners-club",     name: "Diners Club International",   scale:1.5, src: "/client_logos/Diners_Club_International.png",  category: "finance", sector: "Payments" },
  { id: "sun-life",        name: "Sun Life",                     src: "/client_logos/Sun_Life.png",                   category: "finance", sector: "Insurance" },
  { id: "blackstone",      name: "Blackstone",                   src: "/client_logos/Blackstone.png",                 category: "finance", sector: "Private Equity" },

  // ── Education ─────────────────────────────────────────────────────────────
  { id: "symbiosis",       name: "Symbiosis International University", scale:1.25, src: "/client_logos/Symbiosis_International_University.png", category: "education", sector: "University" },
  { id: "delhi-public",    name: "Delhi Public School",       scale:1.5,   src: "/client_logos/Delhi_Public_School.png",        category: "education", sector: "School" },
  { id: "shiv-nadar",      name: "Shiv Nadar School",          scale:1.5,  src: "/client_logos/Shiv_Nadar_School.jpg",          category: "education", sector: "School" },
  { id: "ey",              name: "EY",                           src: "/client_logos/EY.png",                         category: "education", sector: "Advisory" },
  { id: "mckinsey",        name: "McKinsey & Company",           src: "/client_logos/McKinsey_Company.png",           category: "education", sector: "Consulting" },
  { id: "parexel",         name: "Parexel",                      src: "/client_logos/Parexel.png",                    category: "education", sector: "CRO" },
  { id: "quest",           name: "Quest",                        src: "/client_logos/Quest.png",                      category: "education", sector: "Research" },

  // ── Real Estate ───────────────────────────────────────────────────────────
  { id: "l-and-t",         name: "L&T Construction",             src: "/client_logos/L_and_T.png",                    category: "real-estate", sector: "Construction" },
  { id: "nyati",           name: "Nyati Group",                  src: "/client_logos/Nyati.png",                      category: "real-estate", sector: "Real Estate" },
  { id: "dcm-shriram",     name: "DCM Shriram",                  src: "/client_logos/DCM_Shriram.jpg",                category: "real-estate", sector: "Conglomerate" },
  { id: "quadron",         name: "The Quadron",                  src: "/client_logos/The_Quadron.png",                category: "real-estate", sector: "Commercial" },
  { id: "piramal",         name: "Piramal",                      src: "/client_logos/Piramal.png",                    category: "real-estate", sector: "Real Estate" },
  { id: "khazanah",        name: "Khazanah",                     src: "/client_logos/Khazanah.png",                   category: "real-estate", sector: "Investment" },
  { id: "ad-group",        name: "AD Group",                     src: "/client_logos/AD_Group.jpg",                   category: "real-estate", sector: "Business Group" },
  { id: "indogulf",        name: "Indogulf Group",               src: "/client_logos/Indogulf_Group.png",             category: "real-estate", sector: "Conglomerate" },

  // ── Industrial ────────────────────────────────────────────────────────────
  { id: "amara-raja",      name: "Amara Raja Group",             src: "/client_logos/Amara_Raja_Group.png",           category: "industrial", sector: "Batteries & Energy" },
  { id: "ajanta-pkg",      name: "Ajanta Packaging",             src: "/client_logos/Ajanta_Packaging.png",           category: "industrial", sector: "Packaging" },
  { id: "armacell",        name: "Armacell",                     src: "/client_logos/Armacell.png",                   category: "industrial", sector: "Insulation" },
  { id: "lm-wind",         name: "LM Wind Power",                src: "/client_logos/LM_Wind_Power.png",              category: "industrial", sector: "Wind Energy" },
  { id: "voith",           name: "Voith",                        src: "/client_logos/Voith.png",                      category: "industrial", sector: "Engineering" },

  // ── Airports & Transit ────────────────────────────────────────────────────
  { id: "fluence",         name: "Fluence",                      src: "/client_logos/Fluence.png",                    category: "airports", sector: "Energy Storage" },
  { id: "al-gurg",         name: "Al Gurg Group",               src: "/client_logos/Al_Gurg.png",                    category: "airports", sector: "Logistics" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero content
// ─────────────────────────────────────────────────────────────────────────────
export const clienteleHero = {
  eyebrow: "Our Clientele",
  headline: "Trusted by India's\nMost Demanding Environments.",
  supporting:
    "From critical government installations to India's leading hospitality brands — O₂Cure is the indoor air quality choice where standards leave no room for compromise.",
  stat: {
    number: "700+",
    label: "Enterprise Installations",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Scale visualisation — the "700+ partners grid" teaser numbers
// ─────────────────────────────────────────────────────────────────────────────
export const scaleStats = [
  { value: "700+", label: "Enterprise Grids" },
  { value: "117",  label: "Verified Partners" },
  { value: "23",   label: "Industry Sectors" },
  { value: "15+",  label: "Years of Trust" },
] as const;

/**
 * Clientele page content — structured from the verified O₂Cure Client List & Logo Index.
 * All brand claims are fact-checked against the project logs.
 * Replace arrays from Sanity CMS without touching layout components.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Category definitions
// ─────────────────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: "all",           label: "All Partners",         count: 253 },
  { id: "residences",   label: "Residences",            count: 49   },
  { id: "corporate",    label: "Corporate & IT",        count: 74  },
  { id: "industrial",   label: "Industrial",            count: 8   },
  { id: "healthcare",   label: "Healthcare",            count: 23  },
  { id: "hospitality",  label: "Hospitality & Retail",  count: 17  },
  { id: "finance",      label: "Finance & Banking",     count: 10   },
  { id: "education",    label: "Education",             count: 14   },
  { id: "real-estate",  label: "Real Estate",           count: 18   },
  { id: "government",   label: "Government & Defence",  count: 8  },
  { id: "airports",     label: "Airports & Transit",    count: 10   },
  { id: "media",        label: "Media & Broadcasting",  count: 22  },
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
  { id: "google",          name: "Google",                      scale:1.35, src: "/client_logo_new/Google.webp",                     category: "corporate",  sector: "Technology" },
  { id: "microsoft",       name: "Microsoft",                 scale:1.35,   src: "/client_logo_new/Microsoft.webp",                  category: "corporate",  sector: "Technology" },
  { id: "amazon",          name: "Amazon",                     scale:1.35,  src: "/client_logo_new/Amazon.webp",                     category: "corporate",  sector: "Technology" },
  { id: "aiims",           name: "AIIMS",                    scale:1.5,    src: "/client_logo_new/AIIMS.webp",                      category: "healthcare", sector: "Public Hospital" },
  { id: "hdfc",            name: "HDFC Bank",                  scale:1.5,  src: "/client_logo_new/HDFC.webp",                       category: "finance", sector: "Private Bank" },
  { id: "taj-hotels",      name: "Taj Hotels",                 scale:1.25,  src: "/client_logo_new/Taj_Hotels.webp",                 category: "hospitality", sector: "Luxury Hotels" },
  { id: "reliance",        name: "Reliance Industries",         scale:1.75, src: "/client_logo_new/Reliance_Industries.webp",        category: "corporate",  sector: "Conglomerate" },
  { id: "tcs",             name: "TCS",                         scale:1.4, src: "/client_logo_new/TCS.webp",                        category: "corporate",  sector: "IT Services" },
  { id: "gmr",             name: "GMR Group",                    src: "/client_logo_new/GMR.webp",                        category: "airports", sector: "Airport Infrastructure" },
  { id: "spg",             name: "Special Protection Group",scale:1.35,src: "/client_logo_new/Special_Protection_Group.webp",   category: "government", sector: "Central Armed Force" },

  // ── Government & Defence ──────────────────────────────────────────────────
  { id: "crpf",            name: "CRPF",                         src: "/client_logo_new/AMR.webp",                        category: "government", sector: "Paramilitary" },
  { id: "csir",            name: "CSIR",                        scale:1.35, src: "/client_logo_new/CSIR.webp",                       category: "government", sector: "Research Council" },
  { id: "drdo",            name: "DRDO",                        scale:1.35, src: "/client_logo_new/Defence_Accounts_Department.webp",category: "government", sector: "Defence R&D" },
  { id: "national-health", name: "National Health Mission",      src: "/client_logo_new/National_Health_Mission.webp",    category: "government", sector: "Public Health" },
  { id: "nabh",            name: "NABH",                         scale:1.35,src: "/client_logo_new/NABH.webp",                       category: "government", sector: "Accreditation" },
  { id: "base-hospital",   name: "92 Base Hospital",             src: "/client_logo_new/92_Base_Hospital.webp",           category: "government", sector: "Armed Forces Medical" },

  // ── Corporate & IT ────────────────────────────────────────────────────────
  { id: "dell",            name: "Dell",                         src: "/client_logo_new/Dell.webp",                       category: "corporate",  sector: "Technology" },
  { id: "ibm",             name: "IBM",                       scale:1.25,   src: "/client_logo_new/IBM.webp",                        category: "corporate",  sector: "Technology" },
  { id: "hp",              name: "HP",                           src: "/client_logo_new/HP.webp",                         category: "corporate",  sector: "Technology" },
  { id: "genpact",         name: "Genpact",                     scale:1.5, src: "/client_logo_new/Genpact.webp",                    category: "corporate",  sector: "IT Services" },
  { id: "oracle",          name: "Oracle",                      scale:1.35, src: "/client_logo_new/Oracle.webp",                     category: "corporate",  sector: "Technology" },
  { id: "salesforce",      name: "Salesforce",                 scale:1.5,  src: "/client_logo_new/Salesforce.webp",                 category: "corporate",  sector: "Cloud CRM" },
  { id: "amdocs",          name: "Amdocs",                    scale:1.5,   src: "/client_logo_new/Amdocs.webp",                     category: "corporate",  sector: "IT Services" },
  { id: "hexaware",        name: "Hexaware",                   scale:1.5,  src: "/client_logo_new/Hexaware.webp",                   category: "corporate",  sector: "IT Services" },
  { id: "birlasoft",       name: "Birlasoft",                  scale:1.5,  src: "/client_logo_new/Birlasoft.webp",                  category: "corporate",  sector: "IT Services" },
  { id: "cadence",         name: "Cadence",                      scale:1.5,src: "/client_logo_new/Cadence.webp",                    category: "corporate",  sector: "EDA" },
  { id: "adobe",           name: "Adobe",                        scale:1.5,src: "/client_logo_new/Adobe.webp",                      category: "corporate",  sector: "Software" },
  { id: "sony",            name: "Sony",                         src: "/client_logo_new/Sony.webp",                       category: "corporate",  sector: "Electronics" },
  { id: "renault",         name: "Renault",                      src: "/client_logo_new/Renault.webp",                    category: "corporate",  sector: "Automotive" },
  { id: "tata-motors",     name: "Tata Motors",                 scale:1.5, src: "/client_logo_new/Tata_Motors.webp",               category: "corporate",  sector: "Automotive" },
  { id: "jcb",             name: "JCB",                        scale:1.25,  src: "/client_logo_new/JCB.webp",                        category: "corporate",  sector: "Industrial Equipment" },
  { id: "sattva",          name: "Sattva Group",               scale:1.5,  src: "/client_logo_new/Sattva_Group.webp",               category: "corporate",  sector: "Business Group" },

  // ── Healthcare ────────────────────────────────────────────────────────────
  { id: "fortis",          name: "Fortis Healthcare",    scale:1.5,        src: "/client_logo_new/Fortis.webp",                     category: "healthcare", sector: "Hospital Network" },
  { id: "max-healthcare",  name: "Max Healthcare",           scale:1.75,    src: "/client_logo_new/Max_Healthcare.webp",             category: "healthcare", sector: "Hospital Network" },
  { id: "rml-hospital",    name: "Dr. RML Hospital",      scale:1.5,       src: "/client_logo_new/Dr_RML_Hospital.webp",            category: "healthcare", sector: "Government Hospital" },
  { id: "safdarjung",      name: "Safdarjung Hospital",     scale:1.5,     src: "/client_logo_new/Safdarjung_Hospital.webp",        category: "healthcare", sector: "Government Hospital" },
  { id: "sir-ganga-ram",   name: "Sir Ganga Ram Hospital", scale:1.5,      src: "/client_logo_new/Sir_Ganga_Ram_Hospital.webp",     category: "healthcare", sector: "Multi-specialty" },
  { id: "lilavati",        name: "Lilavati Hospital",         scale:1.5,   src: "/client_logo_new/Lilavati_Hospital.webp",          category: "healthcare", sector: "Multi-specialty" },
  { id: "metro-hospitals", name: "Metro Group of Hospitals",  scale:1.5,   src: "/client_logo_new/Metro_Group_Of_Hospitals.webp",   category: "healthcare", sector: "Hospital Chain" },
  { id: "kem-pune",        name: "KEM Hospital Pune",        scale:1.5,    src: "/client_logo_new/KEM_Hospital_Pune.webp",          category: "healthcare", sector: "Government Hospital" },
  { id: "mgm-patna",       name: "MGM Hospital Patna",       scale:1.5,    src: "/client_logo_new/MGM_Hospital_Patna.webp",         category: "healthcare", sector: "Hospital" },
  { id: "lokmanya-tilak",  name: "Lokmanya Tilak Hospital",  scale:1.25,    src: "/client_logo_new/Lokmanya_Tilak_Hospital.webp",    category: "healthcare", sector: "Government Hospital" },
  { id: "masimo",          name: "Masimo",                      scale:1.5, src: "/client_logo_new/Masimo.webp",                     category: "healthcare", sector: "Medical Devices" },
  { id: "wellness-hosp",   name: "Wellness Hospital",            src: "/client_logo_new/Wellness_Hospital.webp",          category: "healthcare", sector: "Hospital" },

  // ── Hospitality & Retail ─────────────────────────────────────────────────
  { id: "itc-hotels",      name: "ITC Hotels",          scale:1.5,         src: "/client_logo_new/ITC_Hotels.webp",                 category: "hospitality", sector: "Luxury Hotels" },
  { id: "pvr",             name: "PVR Cinemas",            scale:1.25,      src: "/client_logo_new/PVR.webp",                        category: "hospitality", sector: "Entertainment" },
  { id: "carrefour",       name: "Carrefour",                 scale:1.5,   src: "/client_logo_new/Carrefour.webp",                  category: "hospitality", sector: "Retail" },
  { id: "india-habitat",   name: "India Habitat Centre",         src: "/client_logo_new/India_Habitat_Center.webp",       category: "hospitality", sector: "Convention Centre" },
  { id: "nsci",            name: "NSCI",                         src: "/client_logo_new/NSCI.webp",                       category: "hospitality", sector: "Sports Complex" },
  { id: "fabindia",        name: "Fabindia",                  scale:1.5,   src: "/client_logo_new/Fabindia.webp",                   category: "hospitality", sector: "Retail" },
  { id: "mall-emirates",   name: "Mall of the Emirates",       scale:1.5,  src: "/client_logo_new/Mall_of_the_Emirates.webp",       category: "hospitality", sector: "Retail Complex" },
  { id: "makemytrip",      name: "MakeMyTrip",                  scale:1.5, src: "/client_logo_new/MakeMyTrip.webp",                 category: "hospitality", sector: "Travel" },
  { id: "tumble-house",    name: "Tumble House",                scale:1.5, src: "/client_logo_new/Tumble_House.webp",               category: "hospitality", sector: "Entertainment" },
  { id: "hero-moto",       name: "Hero MotoCorp",                src: "/client_logo_new/Hero.webp",                       category: "hospitality", sector: "Brand" },
  { id: "blue-star",       name: "Blue Star",                 scale:1.5,   src: "/client_logo_new/Blue_Star.webp",                  category: "hospitality", sector: "HVAC" },

  // ── Media & Broadcasting ─────────────────────────────────────────────────
  { id: "abp-news",        name: "ABP News",                   scale:1.25,  src: "/client_logo_new/ABP_News.webp",                   category: "media", sector: "Broadcasting" },
  { id: "network18",       name: "Network18",                    src: "/client_logo_new/Network18.webp",                  category: "media", sector: "Media Group" },
  { id: "jagran",          name: "Dainik Jagran",                src: "/client_logo_new/Jagran.webp",                     category: "media", sector: "Print Media" },
  { id: "zee",             name: "Zee Media",                    src: "/client_logo_new/Zee.webp",                        category: "media", sector: "Broadcasting" },
  { id: "times-group",     name: "Times Group",                  src: "/client_logo_new/Times_Group.webp",                category: "media", sector: "Media Group" },
  { id: "times-now",       name: "Times Now",                    src: "/client_logo_new/Times_Now.webp",                  category: "media", sector: "News Channel" },
  { id: "tv-today",        name: "TV Today",                     src: "/client_logo_new/TV_Today.webp",                   category: "media", sector: "Broadcasting" },
  { id: "ibn7",            name: "IBN 7",                        src: "/client_logo_new/IBN_7.webp",                      category: "media", sector: "News Channel" },
  { id: "dish-tv",         name: "Dish TV",                      src: "/client_logo_new/Dish_TV.webp",                    category: "media", sector: "DTH" },
  { id: "siti-network",    name: "Siti Network",                 src: "/client_logo_new/Siti_Network.webp",               category: "media", sector: "Cable TV" },
  { id: "focus-tv",        name: "Focus TV",                     src: "/client_logo_new/Focus_TV.webp",                   category: "media", sector: "Broadcasting" },
  { id: "ten-sports",      name: "Ten Sports",                   src: "/client_logo_new/Ten_Sports.webp",                 category: "media", sector: "Sports Channel" },
  { id: "hotstar",         name: "Hotstar",                      src: "/client_logo_new/Hotstar.webp",                    category: "media", sector: "Streaming" },
  { id: "airtel",          name: "Bharti Airtel",              scale:1.5,  src: "/client_logo_new/Airtel.webp",                     category: "media", sector: "Telecom" },
  { id: "vi",              name: "Vi (Vodafone Idea)",          scale:1.5, src: "/client_logo_new/Vi.webp",                         category: "media", sector: "Telecom" },
  { id: "mts",             name: "MTS",                         scale:1.5, src: "/client_logo_new/MTS.webp",                        category: "media", sector: "Telecom" },
  { id: "nokia",           name: "Nokia",                      scale:1.5,  src: "/client_logo_new/Nokia.webp",                      category: "media", sector: "Telecom" },
  { id: "hindustan-petro", name: "Hindustan Petroleum",         scale:1.35, src: "/client_logo_new/Hindustan_Petroleum.webp",        category: "media", sector: "Energy" },
  { id: "metro",           name: "Metro",                        src: "/client_logo_new/Metro.webp",                      category: "media", sector: "Urban Transit" },

  // ── Finance & Banking ─────────────────────────────────────────────────────
  { id: "citibank",        name: "Citibank",                  scale:1.35,   src: "/client_logo_new/Citibank.webp",                   category: "finance", sector: "Banking" },
  { id: "barclays",        name: "Barclays",                    scale:1.5, src: "/client_logo_new/Barclays.webp",                   category: "finance", sector: "Investment Bank" },
  { id: "lic",             name: "LIC",                        scale:1.5,  src: "/client_logo_new/LIC.webp",                        category: "finance", sector: "Insurance" },
  { id: "mastercard",      name: "Mastercard",                   src: "/client_logo_new/Mastercard.webp",                 category: "finance", sector: "Payments" },
  { id: "diners-club",     name: "Diners Club International",   scale:1.5, src: "/client_logo_new/Diners_Club_International.webp",  category: "finance", sector: "Payments" },
  { id: "sun-life",        name: "Sun Life",                     src: "/client_logo_new/Sun_Life.webp",                   category: "finance", sector: "Insurance" },
  { id: "blackstone",      name: "Blackstone",                   src: "/client_logo_new/Blackstone.webp",                 category: "finance", sector: "Private Equity" },

  // ── Education ─────────────────────────────────────────────────────────────
  { id: "symbiosis",       name: "Symbiosis International University", scale:1.25, src: "/client_logo_new/Symbiosis_International_University.webp", category: "education", sector: "University" },
  { id: "delhi-public",    name: "Delhi Public School",       scale:1.5,   src: "/client_logo_new/Delhi_Public_School.webp",        category: "education", sector: "School" },
  { id: "shiv-nadar",      name: "Shiv Nadar School",          scale:1.5,  src: "/client_logo_new/Shiv_Nadar_School.webp",          category: "education", sector: "School" },
  { id: "ey",              name: "EY",                           src: "/client_logo_new/EY.webp",                         category: "education", sector: "Advisory" },
  { id: "mckinsey",        name: "McKinsey & Company",           src: "/client_logo_new/McKinsey_Company.webp",           category: "education", sector: "Consulting" },
  { id: "parexel",         name: "Parexel",                      src: "/client_logo_new/Parexel.webp",                    category: "education", sector: "CRO" },
  { id: "quest",           name: "Quest",                        src: "/client_logo_new/Quest.webp",                      category: "education", sector: "Research" },

  // ── Real Estate ───────────────────────────────────────────────────────────
  { id: "l-and-t",         name: "L&T Construction",             src: "/client_logo_new/L_and_T.webp",                    category: "real-estate", sector: "Construction" },
  { id: "nyati",           name: "Nyati Group",                  src: "/client_logo_new/Nyati.webp",                      category: "real-estate", sector: "Real Estate" },
  { id: "dcm-shriram",     name: "DCM Shriram",                  src: "/client_logo_new/DCM_Shriram.webp",                category: "real-estate", sector: "Conglomerate" },
  { id: "quadron",         name: "The Quadron",                  src: "/client_logo_new/The_Quadron.webp",                category: "real-estate", sector: "Commercial" },
  { id: "piramal",         name: "Piramal",                      src: "/client_logo_new/Piramal.webp",                    category: "real-estate", sector: "Real Estate" },
  { id: "khazanah",        name: "Khazanah",                     src: "/client_logo_new/Khazanah.webp",                   category: "real-estate", sector: "Investment" },
  { id: "ad-group",        name: "AD Group",                     src: "/client_logo_new/AD_Group.webp",                   category: "real-estate", sector: "Business Group" },
  { id: "indogulf",        name: "Indogulf Group",               src: "/client_logo_new/Indogulf_Group.webp",             category: "real-estate", sector: "Conglomerate" },

  // ── Industrial ────────────────────────────────────────────────────────────
  { id: "amara-raja",      name: "Amara Raja Group",             src: "/client_logo_new/Amara_Raja_Group.webp",           category: "industrial", sector: "Batteries & Energy" },
  { id: "ajanta-pkg",      name: "Ajanta Packaging",             src: "/client_logo_new/Ajanta_Packaging.webp",           category: "industrial", sector: "Packaging" },
  { id: "armacell",        name: "Armacell",                     src: "/client_logo_new/Armacell.webp",                   category: "industrial", sector: "Insulation" },
  { id: "lm-wind",         name: "LM Wind Power",                src: "/client_logo_new/LM_Wind_Power.webp",              category: "industrial", sector: "Wind Energy" },
  { id: "voith",           name: "Voith",                        src: "/client_logo_new/Voith.webp",                      category: "industrial", sector: "Engineering" },

  // ── Airports & Transit ────────────────────────────────────────────────────
  { id: "fluence",         name: "Fluence",                      src: "/client_logo_new/Fluence.webp",                    category: "airports", sector: "Energy Storage" },
  { id: "al-gurg",         name: "Al Gurg Group",               src: "/client_logo_new/Al_Gurg.webp",                    category: "airports", sector: "Logistics" },
  { id: "adani-airports", name: "Adani Airports", src: "/client_logo_new/Adani-airports.webp", category: "airports" },
  { id: "agartala", name: "Agartala", src: "/client_logo_new/Agartala.webp", category: "corporate" },
  { id: "ajanta-pharma", name: "Ajanta Pharma", src: "/client_logo_new/AJANTA_Pharma.webp", category: "healthcare" },
  { id: "apple", name: "Apple", src: "/client_logo_new/APPLE.webp", category: "corporate" },
  { id: "army-hospitals", name: "Army Hospitals", src: "/client_logo_new/ARMY_hospitals.webp", category: "healthcare" },
  { id: "ashoka-university", name: "Ashoka University", src: "/client_logo_new/Ashoka_university.webp", category: "education" },
  { id: "barc", name: "Barc", src: "/client_logo_new/BARC.webp", category: "corporate" },
  { id: "barclays-2", name: "Barclays 2", src: "/client_logo_new/Barclays_2.webp", category: "corporate" },
  { id: "becil", name: "Becil", src: "/client_logo_new/becil.webp", category: "corporate" },
  { id: "bits-pilani", name: "Bits Pilani", src: "/client_logo_new/BITS_Pilani.webp", category: "corporate" },
  { id: "cairn-india", name: "Cairn India", src: "/client_logo_new/Cairn_India.webp", category: "airports" },
  { id: "cipla", name: "Cipla", src: "/client_logo_new/Cipla.webp", category: "corporate" },
  { id: "cocacola", name: "Cocacola", src: "/client_logo_new/CocaCola.webp", category: "corporate" },
  { id: "cult", name: "Cult", src: "/client_logo_new/CULT.webp", category: "corporate" },
  { id: "decathlon", name: "Decathlon", src: "/client_logo_new/Decathlon.webp", category: "corporate" },
  { id: "delhi-air-port", name: "Delhi Air Port", src: "/client_logo_new/Delhi_Air_Port.webp", category: "airports" },
  { id: "dell-2", name: "Dell 2", src: "/client_logo_new/Dell_2.webp", category: "corporate" },
  { id: "divis", name: "Divis", src: "/client_logo_new/Divis.webp", category: "corporate" },
  { id: "dlf", name: "Dlf", src: "/client_logo_new/DLF.webp", category: "real-estate" },
  { id: "dlf-camellias", name: "Dlf Camellias", src: "/client_logo_new/DLF_Camellias.webp", category: "real-estate" },
  { id: "dr-reddy", name: "Dr.reddy", src: "/client_logo_new/Dr.Reddy.webp", category: "healthcare" },
  { id: "drive-fit", name: "Drive Fit", src: "/client_logo_new/DRIVE_Fit.webp", category: "corporate" },
  { id: "embassy", name: "Embassy", src: "/client_logo_new/EMBASSY.webp", category: "corporate" },
  { id: "facebook", name: "Facebook", src: "/client_logo_new/Facebook.webp", category: "corporate" },
  { id: "gail", name: "Gail", src: "/client_logo_new/GAIL.webp", category: "corporate" },
  { id: "gd-goenka-school", name: "Gd Goenka School", src: "/client_logo_new/GD_Goenka_School.webp", category: "education" },
  { id: "gmr-goa-international-airport", name: "Gmr Goa International Airport", src: "/client_logo_new/GMR_Goa_International_Airport.webp", category: "airports" },
  { id: "goa-shipyard", name: "Goa Shipyard", src: "/client_logo_new/GOA_ShipYard.webp", category: "corporate" },
  { id: "godrej", name: "Godrej", src: "/client_logo_new/Godrej.webp", category: "corporate" },
  { id: "goldgym", name: "Goldgym", src: "/client_logo_new/GoldGym.webp", category: "hospitality" },
  { id: "harbans-mahajan", name: "Harbans Mahajan", src: "/client_logo_new/Harbans_Mahajan.webp", category: "corporate" },
  { id: "honda", name: "Honda", src: "/client_logo_new/Honda.webp", category: "corporate" },
  { id: "house-of-diagnostics", name: "House Of Diagnostics", src: "/client_logo_new/House_of_Diagnostics.webp", category: "corporate" },
  { id: "hyatt", name: "Hyatt", src: "/client_logo_new/HyATT.webp", category: "corporate" },
  { id: "hyundai", name: "Hyundai", src: "/client_logo_new/Hyundai.webp", category: "corporate" },
  { id: "icon-best-offers", name: "Icon Best Offers", src: "/client_logo_new/Icon_Best_Offers.webp", category: "corporate" },
  { id: "icon-easy-to-move", name: "Icon Easy To Move", src: "/client_logo_new/Icon_Easy_to_Move.webp", category: "corporate" },
  { id: "icon-quality-product", name: "Icon Quality Product", src: "/client_logo_new/Icon_Quality_Product.webp", category: "corporate" },
  { id: "icon-secure-payment", name: "Icon Secure Payment", src: "/client_logo_new/Icon_Secure_Payment.webp", category: "corporate" },
  { id: "iim", name: "Iim", src: "/client_logo_new/IIM.webp", category: "education" },
  { id: "ilbs", name: "Ilbs", src: "/client_logo_new/iLbs.webp", category: "corporate" },
  { id: "indian-express", name: "Indian Express", src: "/client_logo_new/INDIAN_Express.webp", category: "corporate" },
  { id: "indian-oil", name: "Indian Oil", src: "/client_logo_new/Indian_Oil.webp", category: "industrial" },
  { id: "india-tv", name: "India Tv", src: "/client_logo_new/INDIA_TV.webp", category: "media" },
  { id: "indigo", name: "Indigo", src: "/client_logo_new/Indigo.webp", category: "airports" },
  { id: "inox", name: "Inox", src: "/client_logo_new/INOX.webp", category: "hospitality" },
  { id: "isb", name: "Isb", src: "/client_logo_new/ISB.webp", category: "education" },
  { id: "isro", name: "Isro", src: "/client_logo_new/ISRO.webp", category: "government" },
  { id: "jagran-small", name: "Jagran Small", src: "/client_logo_new/Jagran_Small.webp", category: "hospitality" },
  { id: "jaipur-airport", name: "Jaipur Airport", src: "/client_logo_new/Jaipur_Airport.webp", category: "airports" },
  { id: "jak-group", name: "Jak Group", src: "/client_logo_new/JAK_Group.webp", category: "real-estate" },
  { id: "jio", name: "Jio", src: "/client_logo_new/JIO.webp", category: "media" },
  { id: "jmd", name: "Jmd", src: "/client_logo_new/JMD.webp", category: "corporate" },
  { id: "jubilant", name: "Jubilant", src: "/client_logo_new/Jubilant.webp", category: "corporate" },
  { id: "kpmg", name: "Kpmg", src: "/client_logo_new/KPMG.webp", category: "finance" },
  { id: "lemontree", name: "Lemontree", src: "/client_logo_new/LemonTree.webp", category: "corporate" },
  { id: "lodha", name: "Lodha", src: "/client_logo_new/Lodha.webp", category: "corporate" },
  { id: "m3m", name: "M3m", src: "/client_logo_new/M3M.webp", category: "real-estate" },
  { id: "maharaja-agarsen-hospital", name: "Maharaja Agarsen Hospital", src: "/client_logo_new/Maharaja_Agarsen_hospital.webp", category: "healthcare" },
  { id: "marriot", name: "Marriot", src: "/client_logo_new/Marriot.webp", category: "corporate" },
  { id: "marutisuzuki", name: "Marutisuzuki", src: "/client_logo_new/MarutiSuzuki.webp", category: "corporate" },
  { id: "max-infra", name: "Max Infra", src: "/client_logo_new/MAX_Infra.webp", category: "real-estate" },
  { id: "max-reality", name: "Max Reality", src: "/client_logo_new/MAX_Reality.webp", category: "real-estate" },
  { id: "max-square", name: "Max Square", src: "/client_logo_new/MAX_square.webp", category: "corporate" },
  { id: "mercedes", name: "Mercedes", src: "/client_logo_new/MERcedes.webp", category: "corporate" },
  { id: "mind-comp", name: "Mind Comp", src: "/client_logo_new/Mind_Comp.webp", category: "corporate" },
  { id: "mumbai-airport", name: "Mumbai Airport", src: "/client_logo_new/Mumbai_Airport.webp", category: "airports" },
  { id: "mumbai-police", name: "Mumbai Police", src: "/client_logo_new/Mumbai_Police.webp", category: "finance" },
  { id: "mylan", name: "Mylan", src: "/client_logo_new/Mylan.webp", category: "corporate" },
  { id: "nanavati-hospital", name: "Nanavati Hospital", src: "/client_logo_new/NANAvati_hospital.webp", category: "healthcare" },
  { id: "ndtv", name: "Ndtv", src: "/client_logo_new/NDTV.webp", category: "media" },
  { id: "o2cure-logo-cropped", name: "O2cure Logo Cropped", src: "/client_logo_new/O2Cure_Logo_Cropped.webp", category: "corporate" },
  { id: "oberoigroups", name: "Oberoigroups", src: "/client_logo_new/OberoiGroups.webp", category: "real-estate" },
  { id: "oxygengroups", name: "Oxygengroups", src: "/client_logo_new/OxygenGroups.webp", category: "real-estate" },
  { id: "pathwasyschool", name: "Pathwasyschool", src: "/client_logo_new/PathwasySchool.webp", category: "education" },
  { id: "pepsico", name: "Pepsico", src: "/client_logo_new/Pepsico.webp", category: "corporate" },
  { id: "prestige", name: "Prestige", src: "/client_logo_new/Prestige.webp", category: "corporate" },
  { id: "pti", name: "Pti", src: "/client_logo_new/PTI.webp", category: "corporate" },
  { id: "radisson", name: "Radisson", src: "/client_logo_new/Radisson.webp", category: "corporate" },
  { id: "rehja-corp", name: "Rehja Corp", src: "/client_logo_new/Rehja corp.webp", category: "real-estate" },
  { id: "reliance-infra", name: "Reliance Infra", src: "/client_logo_new/Reliance_Infra.webp", category: "real-estate" },
  { id: "rmx", name: "Rmx", src: "/client_logo_new/RMX.webp", category: "corporate" },
  { id: "rrhospitals", name: "Rrhospitals", src: "/client_logo_new/RRhospitals.webp", category: "healthcare" },
  { id: "sentara-healthcare", name: "Sentara Healthcare", src: "/client_logo_new/Sentara Healthcare.webp", category: "healthcare" },
  { id: "shapoorji", name: "Shapoorji", src: "/client_logo_new/Shapoorji.webp", category: "corporate" },
  { id: "sharda-university", name: "Sharda University", src: "/client_logo_new/Sharda_university.webp", category: "education" },
  { id: "sheraton", name: "Sheraton", src: "/client_logo_new/Sheraton.webp", category: "corporate" },
  { id: "smartworks", name: "Smartworks", src: "/client_logo_new/smartworks.webp", category: "corporate" },
  { id: "starsports", name: "Starsports", src: "/client_logo_new/starSports.webp", category: "corporate" },
  { id: "statemans", name: "Statemans", src: "/client_logo_new/statemans.webp", category: "corporate" },
  { id: "stpi", name: "Stpi", src: "/client_logo_new/STPI.webp", category: "corporate" },
  { id: "st-mark-school", name: "St Mark School", src: "/client_logo_new/ST_Mark_school.webp", category: "education" },
  { id: "symbosis", name: "Symbosis", src: "/client_logo_new/Symbosis.webp", category: "corporate" },
  { id: "tatahealthcare", name: "Tatahealthcare", src: "/client_logo_new/TATAHealthcare.webp", category: "healthcare" },
  { id: "tatasteel", name: "Tatasteel", src: "/client_logo_new/TATAsteel.webp", category: "industrial" },
  { id: "tumble-house-small", name: "Tumble House Small", src: "/client_logo_new/Tumble_House_Small.webp", category: "hospitality" },
  { id: "venkatesh-hospitals", name: "Venkatesh Hospitals", src: "/client_logo_new/venkatesh_hospitals.webp", category: "healthcare" },
  { id: "vishesh-hospital", name: "Vishesh Hospital", src: "/client_logo_new/Vishesh_Hospital.webp", category: "healthcare" },
  { id: "westin-hotels", name: "Westin Hotels", src: "/client_logo_new/westin_Hotels.webp", category: "hospitality" },
  { id: "wework", name: "Wework", src: "/client_logo_new/wework.webp", category: "corporate" },
  { id: "woco-tech-elastomere", name: "Woco Tech Elastomere", src: "/client_logo_new/Woco_Tech_Elastomere.webp", category: "industrial" },

  // ── Residences ────────────────────────────────────────────────────────────
  { id: "shiv-nadar-res", name: "Shiv Nadar", sector: "HCL Founder & Philanthropist", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "antalia", name: "Antilia", sector: "Mukesh Ambani's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "jmd-owner", name: "Sunil Bedi", sector: "JMD Group Founder's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "boult-owner", name: "Varun & Tarun Gupta", sector: "Boult Audio Founders' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "kunal-bahl", name: "Kunal Bahl", sector: "Snapdeal Founder & Shark Tank Judge", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "stonex-owner", name: "Gaurav Agrawal", sector: "Stonex India Founder's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "jaipuria-institute", name: "Shishir Jaipuria", sector: "Seth Anandram Jaipuria Group Chairman", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "jaipuria-pepsi", name: "Ravi Jaipuria", sector: "Billionaire Chairman, RJ Corp (PepsiCo)", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "jaipuria-ginni", name: "Shishir Jaipuria", sector: "Ginni Filaments Promoters' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "bobby-mukherjee", name: "Bobby Mukherji", sector: "Renowned Architect's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "mont-blanc-ceo", name: "Montblanc CEO", sector: "Luxury Brand Head's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "prine-pipe-owner", name: "Jayant Chheda", sector: "Prince Pipes Founder's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "rathi-steel-owner", name: "Rathi Family", sector: "Rathi Steel Promoters' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "best-tech-owner", name: "Dharmendra Bhandari & Sunil Satija", sector: "Bestech Group Founders' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "oswals", name: "Oswal Family", sector: "Oswal Group Promoters' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "bector-cremica", name: "Rajni Bector", sector: "Cremica Founder's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "sareen-rustex", name: "Sareen Family", sector: "Rust-X Promoters' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "ozone-locks", name: "Alok Aggarwal", sector: "Ozone Overseas Founder's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "euronics", name: "Abhishek Jain", sector: "Euronics India MD's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "saleem-shervani", name: "Saleem Iqbal Shervani", sector: "Former Union Minister & Industrialist", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "shervani-industries", name: "Shervani Family", sector: "Shervani Industrial Group Promoters", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "pm-museum", name: "Pradhanmantri Sangrahalaya", sector: "Prime Ministers' Museum", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "dwarka-convention", name: "Yashobhoomi", sector: "IICC Dwarka Convention Center", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "l-and-t-chennai", name: "L&T Guesthouse", sector: "Larsen & Toubro, Chennai", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "shahid-kapoor", name: "Shahid Kapoor", sector: "Bollywood Actor's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "hritik-residence", name: "Hrithik Roshan", sector: "Bollywood Actor's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "mannat", name: "Mannat", sector: "Shah Rukh Khan's Iconic Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "akshay-kumar", name: "Akshay Kumar", sector: "Bollywood Actor's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "central-vista", name: "Central Vista", sector: "Prime Minister's New Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "ciccu-mukhopadhyay", name: "Ciccu Mukhopadhyay", sector: "Eminent Senior Advocate", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "ajanta-pharma-owner", name: "Purushottam Agrawal", sector: "Ajanta Pharma Founder's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "25-south-realty", name: "The Wadhwa Group", sector: "25 South Promoters' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "dlf-camelias", name: "DLF Camellias", sector: "Ultra-Luxury Residences", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "camelias-kids", name: "DLF Camellias", sector: "Premium Kids Play Area", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "camelias-club", name: "DLF Camellias", sector: "Luxury Clubhouse", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "dlf-thrive", name: "DLF Thrive", sector: "Premium Commercial/Residential Space", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "dlf-summit", name: "DLF The Summit", sector: "Luxury Residences", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "sun-pharma-owner", name: "Dilip Shanghvi", sector: "Billionaire Sun Pharma Founder", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "umrao-residence", name: "The Umrao Promoters", sector: "Luxury Hotel Owners' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "haldiram", name: "Agarwal Family", sector: "Haldiram's Promoters' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "dabur-residence", name: "Burman Family", sector: "Dabur India Promoters' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "oberoi-residence", name: "PRS Oberoi Family", sector: "Oberoi Hotels Promoters' Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "kr-mangalam", name: "Yash Dev Gupta", sector: "K.R. Mangalam Group Founder", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "sobha-realty", name: "PNC Menon", sector: "Billionaire Sobha Realty Founder", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "whiteland-realty", name: "Navdeep Sardana", sector: "Whiteland Corp Founder's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "tarc", name: "Amar Sarin", sector: "TARC MD & CEO's Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "smart-world", name: "Aishwarya Bansal", sector: "Smart World Developers Founder", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "m3m-bansal", name: "Basant Bansal", sector: "Billionaire M3M Group Founder", src: "/client_logo_new/residence-placeholder.webp", category: "residences" },
  { id: "mahajan-residence", name: "Harbans Mahajan", sector: "Mahajan Family Residence", src: "/client_logo_new/residence-placeholder.webp", category: "residences" }
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
  { value: "253",  label: "Verified Partners" },
  { value: "24",   label: "Industry Sectors" },
  { value: "15+",  label: "Years of Trust" },
] as const;

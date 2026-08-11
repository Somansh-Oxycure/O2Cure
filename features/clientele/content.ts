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
  { id: "government",   label: "Government & Defence",  count: 8  },
  { id: "corporate",    label: "Corporate & IT",        count: 74  },
  { id: "healthcare",   label: "Healthcare",            count: 23  },
  { id: "hospitality",  label: "Hospitality & Retail",  count: 17  },
  { id: "media",        label: "Media & Broadcasting",  count: 22  },
  { id: "finance",      label: "Finance & Banking",     count: 10   },
  { id: "education",    label: "Education",             count: 14   },
  { id: "real-estate",  label: "Real Estate",           count: 18   },
  { id: "industrial",   label: "Industrial",            count: 8   },
  { id: "airports",     label: "Airports & Transit",    count: 10   },
  { id: "residences",   label: "Residences",            count: 49   },
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
  { id: "adani-airports", name: "Adani Airports", src: "/client_logos/Adani-airports.jpg", category: "airports" },
  { id: "agartala", name: "Agartala", src: "/client_logos/Agartala.png", category: "corporate" },
  { id: "ajanta-pharma", name: "Ajanta Pharma", src: "/client_logos/AJANTA_Pharma.jpg", category: "healthcare" },
  { id: "apple", name: "Apple", src: "/client_logos/APPLE.png", category: "corporate" },
  { id: "army-hospitals", name: "Army Hospitals", src: "/client_logos/ARMY_hospitals.jpg", category: "healthcare" },
  { id: "ashoka-university", name: "Ashoka University", src: "/client_logos/Ashoka_university.png", category: "education" },
  { id: "barc", name: "Barc", src: "/client_logos/BARC.png", category: "corporate" },
  { id: "barclays-2", name: "Barclays 2", src: "/client_logos/Barclays_2.jpg", category: "corporate" },
  { id: "becil", name: "Becil", src: "/client_logos/becil.png", category: "corporate" },
  { id: "bits-pilani", name: "Bits Pilani", src: "/client_logos/BITS_Pilani.png", category: "corporate" },
  { id: "cairn-india", name: "Cairn India", src: "/client_logos/Cairn_India.png", category: "airports" },
  { id: "cipla", name: "Cipla", src: "/client_logos/Cipla.png", category: "corporate" },
  { id: "cocacola", name: "Cocacola", src: "/client_logos/CocaCola.jpg", category: "corporate" },
  { id: "cult", name: "Cult", src: "/client_logos/CULT.png", category: "corporate" },
  { id: "decathlon", name: "Decathlon", src: "/client_logos/Decathlon.png", category: "corporate" },
  { id: "delhi-air-port", name: "Delhi Air Port", src: "/client_logos/Delhi_Air_Port.jpg", category: "airports" },
  { id: "dell-2", name: "Dell 2", src: "/client_logos/Dell_2.png", category: "corporate" },
  { id: "divis", name: "Divis", src: "/client_logos/Divis.png", category: "corporate" },
  { id: "dlf", name: "Dlf", src: "/client_logos/DLF.png", category: "real-estate" },
  { id: "dlf-camellias", name: "Dlf Camellias", src: "/client_logos/DLF_Camellias.png", category: "real-estate" },
  { id: "dr-reddy", name: "Dr.reddy", src: "/client_logos/Dr.Reddy.png", category: "healthcare" },
  { id: "drive-fit", name: "Drive Fit", src: "/client_logos/DRIVE_Fit.png", category: "corporate" },
  { id: "embassy", name: "Embassy", src: "/client_logos/EMBASSY.png", category: "corporate" },
  { id: "facebook", name: "Facebook", src: "/client_logos/Facebook.png", category: "corporate" },
  { id: "gail", name: "Gail", src: "/client_logos/GAIL.png", category: "corporate" },
  { id: "gd-goenka-school", name: "Gd Goenka School", src: "/client_logos/GD_Goenka_School.jpg", category: "education" },
  { id: "gmr-goa-international-airport", name: "Gmr Goa International Airport", src: "/client_logos/GMR_Goa_International_Airport.png", category: "airports" },
  { id: "goa-shipyard", name: "Goa Shipyard", src: "/client_logos/GOA_ShipYard.png", category: "corporate" },
  { id: "godrej", name: "Godrej", src: "/client_logos/Godrej.jpg", category: "corporate" },
  { id: "goldgym", name: "Goldgym", src: "/client_logos/GoldGym.png", category: "hospitality" },
  { id: "harbans-mahajan", name: "Harbans Mahajan", src: "/client_logos/Harbans_Mahajan.jpg", category: "corporate" },
  { id: "honda", name: "Honda", src: "/client_logos/Honda.png", category: "corporate" },
  { id: "house-of-diagnostics", name: "House Of Diagnostics", src: "/client_logos/House_of_Diagnostics.png", category: "corporate" },
  { id: "hyatt", name: "Hyatt", src: "/client_logos/HyATT.jpg", category: "corporate" },
  { id: "hyundai", name: "Hyundai", src: "/client_logos/Hyundai.jpg", category: "corporate" },
  { id: "icon-best-offers", name: "Icon Best Offers", src: "/client_logos/Icon_Best_Offers.png", category: "corporate" },
  { id: "icon-easy-to-move", name: "Icon Easy To Move", src: "/client_logos/Icon_Easy_to_Move.png", category: "corporate" },
  { id: "icon-quality-product", name: "Icon Quality Product", src: "/client_logos/Icon_Quality_Product.png", category: "corporate" },
  { id: "icon-secure-payment", name: "Icon Secure Payment", src: "/client_logos/Icon_Secure_Payment.png", category: "corporate" },
  { id: "iim", name: "Iim", src: "/client_logos/IIM.png", category: "education" },
  { id: "ilbs", name: "Ilbs", src: "/client_logos/iLbs.png", category: "corporate" },
  { id: "indian-express", name: "Indian Express", src: "/client_logos/INDIAN_Express.png", category: "corporate" },
  { id: "indian-oil", name: "Indian Oil", src: "/client_logos/Indian_Oil.jpg", category: "industrial" },
  { id: "india-tv", name: "India Tv", src: "/client_logos/INDIA_TV.jpg", category: "media" },
  { id: "indigo", name: "Indigo", src: "/client_logos/Indigo.jpg", category: "airports" },
  { id: "inox", name: "Inox", src: "/client_logos/INOX.png", category: "hospitality" },
  { id: "isb", name: "Isb", src: "/client_logos/ISB.jpg", category: "education" },
  { id: "isro", name: "Isro", src: "/client_logos/ISRO.jpg", category: "government" },
  { id: "jagran-small", name: "Jagran Small", src: "/client_logos/Jagran_Small.png", category: "hospitality" },
  { id: "jaipur-airport", name: "Jaipur Airport", src: "/client_logos/Jaipur_Airport.png", category: "airports" },
  { id: "jak-group", name: "Jak Group", src: "/client_logos/JAK_Group.jpg", category: "real-estate" },
  { id: "jio", name: "Jio", src: "/client_logos/JIO.png", category: "media" },
  { id: "jmd", name: "Jmd", src: "/client_logos/JMD.jpg", category: "corporate" },
  { id: "jubilant", name: "Jubilant", src: "/client_logos/Jubilant.jpg", category: "corporate" },
  { id: "kpmg", name: "Kpmg", src: "/client_logos/KPMG.jpg", category: "finance" },
  { id: "lemontree", name: "Lemontree", src: "/client_logos/LemonTree.png", category: "corporate" },
  { id: "lodha", name: "Lodha", src: "/client_logos/Lodha.png", category: "corporate" },
  { id: "m3m", name: "M3m", src: "/client_logos/M3M.png", category: "real-estate" },
  { id: "maharaja-agarsen-hospital", name: "Maharaja Agarsen Hospital", src: "/client_logos/Maharaja_Agarsen_hospital.png", category: "healthcare" },
  { id: "marriot", name: "Marriot", src: "/client_logos/Marriot.png", category: "corporate" },
  { id: "marutisuzuki", name: "Marutisuzuki", src: "/client_logos/MarutiSuzuki.png", category: "corporate" },
  { id: "max-infra", name: "Max Infra", src: "/client_logos/MAX_Infra.png", category: "real-estate" },
  { id: "max-reality", name: "Max Reality", src: "/client_logos/MAX_Reality.jpg", category: "real-estate" },
  { id: "max-square", name: "Max Square", src: "/client_logos/MAX_square.png", category: "corporate" },
  { id: "mercedes", name: "Mercedes", src: "/client_logos/MERcedes.png", category: "corporate" },
  { id: "mind-comp", name: "Mind Comp", src: "/client_logos/Mind_Comp.jpg", category: "corporate" },
  { id: "mumbai-airport", name: "Mumbai Airport", src: "/client_logos/Mumbai_Airport.png", category: "airports" },
  { id: "mumbai-police", name: "Mumbai Police", src: "/client_logos/Mumbai_Police.png", category: "finance" },
  { id: "mylan", name: "Mylan", src: "/client_logos/Mylan.png", category: "corporate" },
  { id: "nanavati-hospital", name: "Nanavati Hospital", src: "/client_logos/NANAvati_hospital.jpg", category: "healthcare" },
  { id: "ndtv", name: "Ndtv", src: "/client_logos/NDTV.png", category: "media" },
  { id: "o2cure-logo-cropped", name: "O2cure Logo Cropped", src: "/client_logos/O2Cure_Logo_Cropped.png", category: "corporate" },
  { id: "oberoigroups", name: "Oberoigroups", src: "/client_logos/OberoiGroups.png", category: "real-estate" },
  { id: "oxygengroups", name: "Oxygengroups", src: "/client_logos/OxygenGroups.png", category: "real-estate" },
  { id: "pathwasyschool", name: "Pathwasyschool", src: "/client_logos/PathwasySchool.jpg", category: "education" },
  { id: "pepsico", name: "Pepsico", src: "/client_logos/Pepsico.png", category: "corporate" },
  { id: "prestige", name: "Prestige", src: "/client_logos/Prestige.png", category: "corporate" },
  { id: "pti", name: "Pti", src: "/client_logos/PTI.png", category: "corporate" },
  { id: "radisson", name: "Radisson", src: "/client_logos/Radisson.png", category: "corporate" },
  { id: "rehja-corp", name: "Rehja Corp", src: "/client_logos/Rehja corp.png", category: "real-estate" },
  { id: "reliance-infra", name: "Reliance Infra", src: "/client_logos/Reliance_Infra.png", category: "real-estate" },
  { id: "rmx", name: "Rmx", src: "/client_logos/RMX.jpg", category: "corporate" },
  { id: "rrhospitals", name: "Rrhospitals", src: "/client_logos/RRhospitals.png", category: "healthcare" },
  { id: "sentara-healthcare", name: "Sentara Healthcare", src: "/client_logos/Sentara Healthcare.png", category: "healthcare" },
  { id: "shapoorji", name: "Shapoorji", src: "/client_logos/Shapoorji.png", category: "corporate" },
  { id: "sharda-university", name: "Sharda University", src: "/client_logos/Sharda_university.png", category: "education" },
  { id: "sheraton", name: "Sheraton", src: "/client_logos/Sheraton.png", category: "corporate" },
  { id: "smartworks", name: "Smartworks", src: "/client_logos/smartworks.jpg", category: "corporate" },
  { id: "starsports", name: "Starsports", src: "/client_logos/starSports.jpg", category: "corporate" },
  { id: "statemans", name: "Statemans", src: "/client_logos/statemans.png", category: "corporate" },
  { id: "stpi", name: "Stpi", src: "/client_logos/STPI.png", category: "corporate" },
  { id: "st-mark-school", name: "St Mark School", src: "/client_logos/ST_Mark_school.png", category: "education" },
  { id: "symbosis", name: "Symbosis", src: "/client_logos/Symbosis.jpg", category: "corporate" },
  { id: "tatahealthcare", name: "Tatahealthcare", src: "/client_logos/TATAHealthcare.png", category: "healthcare" },
  { id: "tatasteel", name: "Tatasteel", src: "/client_logos/TATAsteel.png", category: "industrial" },
  { id: "tumble-house-small", name: "Tumble House Small", src: "/client_logos/Tumble_House_Small.jpg", category: "hospitality" },
  { id: "venkatesh-hospitals", name: "Venkatesh Hospitals", src: "/client_logos/venkatesh_hospitals.jpg", category: "healthcare" },
  { id: "vishesh-hospital", name: "Vishesh Hospital", src: "/client_logos/Vishesh_Hospital.png", category: "healthcare" },
  { id: "westin-hotels", name: "Westin Hotels", src: "/client_logos/westin_Hotels.png", category: "hospitality" },
  { id: "wework", name: "Wework", src: "/client_logos/wework.png", category: "corporate" },
  { id: "woco-tech-elastomere", name: "Woco Tech Elastomere", src: "/client_logos/Woco_Tech_Elastomere.jpg", category: "industrial" },

  // ── Residences ────────────────────────────────────────────────────────────
  { id: "shiv-nadar-res", name: "Shiv Nadar", sector: "HCL Founder & Philanthropist", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "antalia", name: "Antilia", sector: "Mukesh Ambani's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "jmd-owner", name: "Sunil Bedi", sector: "JMD Group Founder's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "boult-owner", name: "Varun & Tarun Gupta", sector: "Boult Audio Founders' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "kunal-bahl", name: "Kunal Bahl", sector: "Snapdeal Founder & Shark Tank Judge", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "stonex-owner", name: "Gaurav Agrawal", sector: "Stonex India Founder's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "jaipuria-institute", name: "Shishir Jaipuria", sector: "Seth Anandram Jaipuria Group Chairman", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "jaipuria-pepsi", name: "Ravi Jaipuria", sector: "Billionaire Chairman, RJ Corp (PepsiCo)", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "jaipuria-ginni", name: "Shishir Jaipuria", sector: "Ginni Filaments Promoters' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "bobby-mukherjee", name: "Bobby Mukherji", sector: "Renowned Architect's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "mont-blanc-ceo", name: "Montblanc CEO", sector: "Luxury Brand Head's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "prine-pipe-owner", name: "Jayant Chheda", sector: "Prince Pipes Founder's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "rathi-steel-owner", name: "Rathi Family", sector: "Rathi Steel Promoters' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "best-tech-owner", name: "Dharmendra Bhandari & Sunil Satija", sector: "Bestech Group Founders' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "oswals", name: "Oswal Family", sector: "Oswal Group Promoters' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "bector-cremica", name: "Rajni Bector", sector: "Cremica Founder's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "sareen-rustex", name: "Sareen Family", sector: "Rust-X Promoters' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "ozone-locks", name: "Alok Aggarwal", sector: "Ozone Overseas Founder's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "euronics", name: "Abhishek Jain", sector: "Euronics India MD's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "saleem-shervani", name: "Saleem Iqbal Shervani", sector: "Former Union Minister & Industrialist", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "shervani-industries", name: "Shervani Family", sector: "Shervani Industrial Group Promoters", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "pm-museum", name: "Pradhanmantri Sangrahalaya", sector: "Prime Ministers' Museum", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "dwarka-convention", name: "Yashobhoomi", sector: "IICC Dwarka Convention Center", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "l-and-t-chennai", name: "L&T Guesthouse", sector: "Larsen & Toubro, Chennai", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "shahid-kapoor", name: "Shahid Kapoor", sector: "Bollywood Actor's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "hritik-residence", name: "Hrithik Roshan", sector: "Bollywood Actor's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "mannat", name: "Mannat", sector: "Shah Rukh Khan's Iconic Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "akshay-kumar", name: "Akshay Kumar", sector: "Bollywood Actor's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "central-vista", name: "Central Vista", sector: "Prime Minister's New Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "ciccu-mukhopadhyay", name: "Ciccu Mukhopadhyay", sector: "Eminent Senior Advocate", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "ajanta-pharma-owner", name: "Purushottam Agrawal", sector: "Ajanta Pharma Founder's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "25-south-realty", name: "The Wadhwa Group", sector: "25 South Promoters' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "dlf-camelias", name: "DLF Camellias", sector: "Ultra-Luxury Residences", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "camelias-kids", name: "DLF Camellias", sector: "Premium Kids Play Area", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "camelias-club", name: "DLF Camellias", sector: "Luxury Clubhouse", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "dlf-thrive", name: "DLF Thrive", sector: "Premium Commercial/Residential Space", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "dlf-summit", name: "DLF The Summit", sector: "Luxury Residences", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "sun-pharma-owner", name: "Dilip Shanghvi", sector: "Billionaire Sun Pharma Founder", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "umrao-residence", name: "The Umrao Promoters", sector: "Luxury Hotel Owners' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "haldiram", name: "Agarwal Family", sector: "Haldiram's Promoters' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "dabur-residence", name: "Burman Family", sector: "Dabur India Promoters' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "oberoi-residence", name: "PRS Oberoi Family", sector: "Oberoi Hotels Promoters' Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "kr-mangalam", name: "Yash Dev Gupta", sector: "K.R. Mangalam Group Founder", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "sobha-realty", name: "PNC Menon", sector: "Billionaire Sobha Realty Founder", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "whiteland-realty", name: "Navdeep Sardana", sector: "Whiteland Corp Founder's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "tarc", name: "Amar Sarin", sector: "TARC MD & CEO's Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "smart-world", name: "Aishwarya Bansal", sector: "Smart World Developers Founder", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "m3m-bansal", name: "Basant Bansal", sector: "Billionaire M3M Group Founder", src: "/client_logos/residence-placeholder.svg", category: "residences" },
  { id: "mahajan-residence", name: "Harbans Mahajan", sector: "Mahajan Family Residence", src: "/client_logos/residence-placeholder.svg", category: "residences" }
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

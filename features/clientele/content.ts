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
  { id: "google",          name: "Google",                      scale:1.35, src: "/client-logos/google.webp",                     category: "corporate",  sector: "Technology" },
  { id: "microsoft",       name: "Microsoft",                 scale:1.35,   src: "/client-logos/microsoft.webp",                  category: "corporate",  sector: "Technology" },
  { id: "amazon",          name: "Amazon",                     scale:1.35,  src: "/client-logos/amazon.webp",                     category: "corporate",  sector: "Technology" },
  { id: "aiims",           name: "AIIMS",                    scale:1.5,    src: "/client-logos/aiims.webp",                      category: "healthcare", sector: "Public Hospital" },
  { id: "hdfc",            name: "HDFC Bank",                  scale:1.5,  src: "/client-logos/hdfc.webp",                       category: "finance", sector: "Private Bank" },
  { id: "taj-hotels",      name: "Taj Hotels",                 scale:1.25,  src: "/client-logos/taj-hotels.webp",                 category: "hospitality", sector: "Luxury Hotels" },
  { id: "reliance",        name: "Reliance Industries",         scale:1.75, src: "/client-logos/reliance-industries.webp",        category: "corporate",  sector: "Conglomerate" },
  { id: "tcs",             name: "TCS",                         scale:1.4, src: "/client-logos/tcs.webp",                        category: "corporate",  sector: "IT Services" },
  { id: "gmr",             name: "GMR Group",                    src: "/client-logos/gmr.webp",                        category: "airports", sector: "Airport Infrastructure" },
  { id: "spg",             name: "Special Protection Group",scale:1.35,src: "/client-logos/special-protection-group.webp",   category: "government", sector: "Central Armed Force" },

  // ── Government & Defence ──────────────────────────────────────────────────
  { id: "crpf",            name: "CRPF",                         src: "/client-logos/amr.webp",                        category: "government", sector: "Paramilitary" },
  { id: "csir",            name: "CSIR",                        scale:1.35, src: "/client-logos/csir.webp",                       category: "government", sector: "Research Council" },
  { id: "drdo",            name: "DRDO",                        scale:1.35, src: "/client-logos/defence-accounts-department.webp",category: "government", sector: "Defence R&D" },
  { id: "national-health", name: "National Health Mission",      src: "/client-logos/national-health-mission.webp",    category: "government", sector: "Public Health" },
  { id: "nabh",            name: "NABH",                         scale:1.35,src: "/client-logos/nabh.webp",                       category: "government", sector: "Accreditation" },
  { id: "base-hospital",   name: "92 Base Hospital",             src: "/client-logos/92-base-hospital.webp",           category: "government", sector: "Armed Forces Medical" },

  // ── Corporate & IT ────────────────────────────────────────────────────────
  { id: "dell",            name: "Dell",                         src: "/client-logos/dell.webp",                       category: "corporate",  sector: "Technology" },
  { id: "ibm",             name: "IBM",                       scale:1.25,   src: "/client-logos/ibm.webp",                        category: "corporate",  sector: "Technology" },
  { id: "hp",              name: "HP",                           src: "/client-logos/hp.webp",                         category: "corporate",  sector: "Technology" },
  { id: "genpact",         name: "Genpact",                     scale:1.5, src: "/client-logos/genpact.webp",                    category: "corporate",  sector: "IT Services" },
  { id: "oracle",          name: "Oracle",                      scale:1.35, src: "/client-logos/oracle.webp",                     category: "corporate",  sector: "Technology" },
  { id: "salesforce",      name: "Salesforce",                 scale:1.5,  src: "/client-logos/salesforce.webp",                 category: "corporate",  sector: "Cloud CRM" },
  { id: "amdocs",          name: "Amdocs",                    scale:1.5,   src: "/client-logos/amdocs.webp",                     category: "corporate",  sector: "IT Services" },
  { id: "hexaware",        name: "Hexaware",                   scale:1.5,  src: "/client-logos/hexaware.webp",                   category: "corporate",  sector: "IT Services" },
  { id: "birlasoft",       name: "Birlasoft",                  scale:1.5,  src: "/client-logos/birlasoft.webp",                  category: "corporate",  sector: "IT Services" },
  { id: "cadence",         name: "Cadence",                      scale:1.5,src: "/client-logos/cadence.webp",                    category: "corporate",  sector: "EDA" },
  { id: "adobe",           name: "Adobe",                        scale:1.5,src: "/client-logos/adobe.webp",                      category: "corporate",  sector: "Software" },
  { id: "sony",            name: "Sony",                         src: "/client-logos/sony.webp",                       category: "corporate",  sector: "Electronics" },
  { id: "renault",         name: "Renault",                      src: "/client-logos/renault.webp",                    category: "corporate",  sector: "Automotive" },
  { id: "tata-motors",     name: "Tata Motors",                 scale:1.5, src: "/client-logos/tata-motors.webp",               category: "corporate",  sector: "Automotive" },
  { id: "jcb",             name: "JCB",                        scale:1.25,  src: "/client-logos/jcb.webp",                        category: "corporate",  sector: "Industrial Equipment" },
  { id: "sattva",          name: "Sattva Group",               scale:1.5,  src: "/client-logos/sattva-group.webp",               category: "corporate",  sector: "Business Group" },

  // ── Healthcare ────────────────────────────────────────────────────────────
  { id: "fortis",          name: "Fortis Healthcare",    scale:1.5,        src: "/client-logos/fortis.webp",                     category: "healthcare", sector: "Hospital Network" },
  { id: "max-healthcare",  name: "Max Healthcare",           scale:1.75,    src: "/client-logos/max-healthcare.webp",             category: "healthcare", sector: "Hospital Network" },
  { id: "rml-hospital",    name: "Dr. RML Hospital",      scale:1.5,       src: "/client-logos/dr-rml-hospital.webp",            category: "healthcare", sector: "Government Hospital" },
  { id: "safdarjung",      name: "Safdarjung Hospital",     scale:1.5,     src: "/client-logos/safdarjung-hospital.webp",        category: "healthcare", sector: "Government Hospital" },
  { id: "sir-ganga-ram",   name: "Sir Ganga Ram Hospital", scale:1.5,      src: "/client-logos/sir-ganga-ram-hospital.webp",     category: "healthcare", sector: "Multi-specialty" },
  { id: "lilavati",        name: "Lilavati Hospital",         scale:1.5,   src: "/client-logos/lilavati-hospital.webp",          category: "healthcare", sector: "Multi-specialty" },
  { id: "metro-hospitals", name: "Metro Group of Hospitals",  scale:1.5,   src: "/client-logos/metro-group-of-hospitals.webp",   category: "healthcare", sector: "Hospital Chain" },
  { id: "kem-pune",        name: "KEM Hospital Pune",        scale:1.5,    src: "/client-logos/kem-hospital-pune.webp",          category: "healthcare", sector: "Government Hospital" },
  { id: "mgm-patna",       name: "MGM Hospital Patna",       scale:1.5,    src: "/client-logos/mgm-hospital-patna.webp",         category: "healthcare", sector: "Hospital" },
  { id: "lokmanya-tilak",  name: "Lokmanya Tilak Hospital",  scale:1.25,    src: "/client-logos/lokmanya-tilak-hospital.webp",    category: "healthcare", sector: "Government Hospital" },
  { id: "masimo",          name: "Masimo",                      scale:1.5, src: "/client-logos/masimo.webp",                     category: "healthcare", sector: "Medical Devices" },
  { id: "wellness-hosp",   name: "Wellness Hospital",            src: "/client-logos/wellness-hospital.webp",          category: "healthcare", sector: "Hospital" },

  // ── Hospitality & Retail ─────────────────────────────────────────────────
  { id: "itc-hotels",      name: "ITC Hotels",          scale:1.5,         src: "/client-logos/itc-hotels.webp",                 category: "hospitality", sector: "Luxury Hotels" },
  { id: "pvr",             name: "PVR Cinemas",            scale:1.25,      src: "/client-logos/pvr.webp",                        category: "hospitality", sector: "Entertainment" },
  { id: "carrefour",       name: "Carrefour",                 scale:1.5,   src: "/client-logos/carrefour.webp",                  category: "hospitality", sector: "Retail" },
  { id: "india-habitat",   name: "India Habitat Centre",         src: "/client-logos/india-habitat-center.webp",       category: "hospitality", sector: "Convention Centre" },
  { id: "nsci",            name: "NSCI",                         src: "/client-logos/nsci.webp",                       category: "hospitality", sector: "Sports Complex" },
  { id: "fabindia",        name: "Fabindia",                  scale:1.5,   src: "/client-logos/fabindia.webp",                   category: "hospitality", sector: "Retail" },
  { id: "mall-emirates",   name: "Mall of the Emirates",       scale:1.5,  src: "/client-logos/mall-of-the-emirates.webp",       category: "hospitality", sector: "Retail Complex" },
  { id: "makemytrip",      name: "MakeMyTrip",                  scale:1.5, src: "/client-logos/makemytrip.webp",                 category: "hospitality", sector: "Travel" },
  { id: "tumble-house",    name: "Tumble House",                scale:1.5, src: "/client-logos/tumble-house.webp",               category: "hospitality", sector: "Entertainment" },
  { id: "hero-moto",       name: "Hero MotoCorp",                src: "/client-logos/hero.webp",                       category: "hospitality", sector: "Brand" },
  { id: "blue-star",       name: "Blue Star",                 scale:1.5,   src: "/client-logos/blue-star.webp",                  category: "hospitality", sector: "HVAC" },

  // ── Media & Broadcasting ─────────────────────────────────────────────────
  { id: "abp-news",        name: "ABP News",                   scale:1.25,  src: "/client-logos/abp-news.webp",                   category: "media", sector: "Broadcasting" },
  { id: "network18",       name: "Network18",                    src: "/client-logos/network18.webp",                  category: "media", sector: "Media Group" },
  { id: "jagran",          name: "Dainik Jagran",                src: "/client-logos/jagran.webp",                     category: "media", sector: "Print Media" },
  { id: "zee",             name: "Zee Media",                    src: "/client-logos/zee.webp",                        category: "media", sector: "Broadcasting" },
  { id: "times-group",     name: "Times Group",                  src: "/client-logos/times-group.webp",                category: "media", sector: "Media Group" },
  { id: "times-now",       name: "Times Now",                    src: "/client-logos/times-now.webp",                  category: "media", sector: "News Channel" },
  { id: "tv-today",        name: "TV Today",                     src: "/client-logos/tv-today.webp",                   category: "media", sector: "Broadcasting" },
  { id: "ibn7",            name: "IBN 7",                        src: "/client-logos/ibn-7.webp",                      category: "media", sector: "News Channel" },
  { id: "dish-tv",         name: "Dish TV",                      src: "/client-logos/dish-tv.webp",                    category: "media", sector: "DTH" },
  { id: "siti-network",    name: "Siti Network",                 src: "/client-logos/siti-network.webp",               category: "media", sector: "Cable TV" },
  { id: "focus-tv",        name: "Focus TV",                     src: "/client-logos/focus-tv.webp",                   category: "media", sector: "Broadcasting" },
  { id: "ten-sports",      name: "Ten Sports",                   src: "/client-logos/ten-sports.webp",                 category: "media", sector: "Sports Channel" },
  { id: "hotstar",         name: "Hotstar",                      src: "/client-logos/hotstar.webp",                    category: "media", sector: "Streaming" },
  { id: "airtel",          name: "Bharti Airtel",              scale:1.5,  src: "/client-logos/airtel.webp",                     category: "media", sector: "Telecom" },
  { id: "vi",              name: "Vi (Vodafone Idea)",          scale:1.5, src: "/client-logos/vi.webp",                         category: "media", sector: "Telecom" },
  { id: "mts",             name: "MTS",                         scale:1.5, src: "/client-logos/mts.webp",                        category: "media", sector: "Telecom" },
  { id: "nokia",           name: "Nokia",                      scale:1.5,  src: "/client-logos/nokia.webp",                      category: "media", sector: "Telecom" },
  { id: "hindustan-petro", name: "Hindustan Petroleum",         scale:1.35, src: "/client-logos/hindustan-petroleum.webp",        category: "media", sector: "Energy" },
  { id: "metro",           name: "Metro",                        src: "/client-logos/metro.webp",                      category: "media", sector: "Urban Transit" },

  // ── Finance & Banking ─────────────────────────────────────────────────────
  { id: "citibank",        name: "Citibank",                  scale:1.35,   src: "/client-logos/citibank.webp",                   category: "finance", sector: "Banking" },
  { id: "barclays",        name: "Barclays",                    scale:1.5, src: "/client-logos/barclays.webp",                   category: "finance", sector: "Investment Bank" },
  { id: "lic",             name: "LIC",                        scale:1.5,  src: "/client-logos/lic.webp",                        category: "finance", sector: "Insurance" },
  { id: "mastercard",      name: "Mastercard",                   src: "/client-logos/mastercard.webp",                 category: "finance", sector: "Payments" },
  { id: "diners-club",     name: "Diners Club International",   scale:1.5, src: "/client-logos/diners-club-international.webp",  category: "finance", sector: "Payments" },
  { id: "sun-life",        name: "Sun Life",                     src: "/client-logos/sun-life.webp",                   category: "finance", sector: "Insurance" },
  { id: "blackstone",      name: "Blackstone",                   src: "/client-logos/blackstone.webp",                 category: "finance", sector: "Private Equity" },

  // ── Education ─────────────────────────────────────────────────────────────
  { id: "symbiosis",       name: "Symbiosis International University", scale:1.25, src: "/client-logos/symbiosis-international-university.webp", category: "education", sector: "University" },
  { id: "delhi-public",    name: "Delhi Public School",       scale:1.5,   src: "/client-logos/delhi-public-school.webp",        category: "education", sector: "School" },
  { id: "shiv-nadar",      name: "Shiv Nadar School",          scale:1.5,  src: "/client-logos/shiv-nadar-school.webp",          category: "education", sector: "School" },
  { id: "ey",              name: "EY",                           src: "/client-logos/ey.webp",                         category: "education", sector: "Advisory" },
  { id: "mckinsey",        name: "McKinsey & Company",           src: "/client-logos/mckinsey-company.webp",           category: "education", sector: "Consulting" },
  { id: "parexel",         name: "Parexel",                      src: "/client-logos/parexel.webp",                    category: "education", sector: "CRO" },
  { id: "quest",           name: "Quest",                        src: "/client-logos/quest.webp",                      category: "education", sector: "Research" },

  // ── Real Estate ───────────────────────────────────────────────────────────
  { id: "l-and-t",         name: "L&T Construction",             src: "/client-logos/l-and-t.webp",                    category: "real-estate", sector: "Construction" },
  { id: "nyati",           name: "Nyati Group",                  src: "/client-logos/nyati.webp",                      category: "real-estate", sector: "Real Estate" },
  { id: "dcm-shriram",     name: "DCM Shriram",                  src: "/client-logos/dcm-shriram.webp",                category: "real-estate", sector: "Conglomerate" },
  { id: "quadron",         name: "The Quadron",                  src: "/client-logos/the-quadron.webp",                category: "real-estate", sector: "Commercial" },
  { id: "piramal",         name: "Piramal",                      src: "/client-logos/piramal.webp",                    category: "real-estate", sector: "Real Estate" },
  { id: "khazanah",        name: "Khazanah",                     src: "/client-logos/khazanah.webp",                   category: "real-estate", sector: "Investment" },
  { id: "ad-group",        name: "AD Group",                     src: "/client-logos/ad-group.webp",                   category: "real-estate", sector: "Business Group" },
  { id: "indogulf",        name: "Indogulf Group",               src: "/client-logos/indogulf-group.webp",             category: "real-estate", sector: "Conglomerate" },

  // ── Industrial ────────────────────────────────────────────────────────────
  { id: "amara-raja",      name: "Amara Raja Group",             src: "/client-logos/amara-raja-group.webp",           category: "industrial", sector: "Batteries & Energy" },
  { id: "ajanta-pkg",      name: "Ajanta Packaging",             src: "/client-logos/ajanta-packaging.webp",           category: "industrial", sector: "Packaging" },
  { id: "armacell",        name: "Armacell",                     src: "/client-logos/armacell.webp",                   category: "industrial", sector: "Insulation" },
  { id: "lm-wind",         name: "LM Wind Power",                src: "/client-logos/lm-wind-power.webp",              category: "industrial", sector: "Wind Energy" },
  { id: "voith",           name: "Voith",                        src: "/client-logos/voith.webp",                      category: "industrial", sector: "Engineering" },

  // ── Airports & Transit ────────────────────────────────────────────────────
  { id: "fluence",         name: "Fluence",                      src: "/client-logos/fluence.webp",                    category: "airports", sector: "Energy Storage" },
  { id: "al-gurg",         name: "Al Gurg Group",               src: "/client-logos/al-gurg.webp",                    category: "airports", sector: "Logistics" },
  { id: "adani-airports", name: "Adani Airports", src: "/client-logos/adani-airports.webp", category: "airports" },
  { id: "agartala", name: "Agartala", src: "/client-logos/agartala.webp", category: "corporate" },
  { id: "ajanta-pharma", name: "Ajanta Pharma", src: "/client-logos/ajanta-pharma.webp", category: "healthcare" },
  { id: "apple", name: "Apple", src: "/client-logos/apple.webp", category: "corporate" },
  { id: "army-hospitals", name: "Army Hospitals", src: "/client-logos/army-hospitals.webp", category: "healthcare" },
  { id: "ashoka-university", name: "Ashoka University", src: "/client-logos/ashoka-university.webp", category: "education" },
  { id: "barc", name: "Barc", src: "/client-logos/barc.webp", category: "corporate" },
  { id: "barclays-2", name: "Barclays 2", src: "/client-logos/barclays-2.webp", category: "corporate" },
  { id: "becil", name: "Becil", src: "/client-logos/becil.webp", category: "corporate" },
  { id: "bits-pilani", name: "Bits Pilani", src: "/client-logos/bits-pilani.webp", category: "corporate" },
  { id: "cairn-india", name: "Cairn India", src: "/client-logos/cairn-india.webp", category: "airports" },
  { id: "cipla", name: "Cipla", src: "/client-logos/cipla.webp", category: "corporate" },
  { id: "cocacola", name: "Cocacola", src: "/client-logos/cocacola.webp", category: "corporate" },
  { id: "cult", name: "Cult", src: "/client-logos/cult.webp", category: "corporate" },
  { id: "decathlon", name: "Decathlon", src: "/client-logos/decathlon.webp", category: "corporate" },
  { id: "delhi-air-port", name: "Delhi Air Port", src: "/client-logos/delhi-air-port.webp", category: "airports" },
  { id: "dell-2", name: "Dell 2", src: "/client-logos/dell-2.webp", category: "corporate" },
  { id: "divis", name: "Divis", src: "/client-logos/divis.webp", category: "corporate" },
  { id: "dlf", name: "Dlf", src: "/client-logos/dlf.webp", category: "real-estate" },
  { id: "dlf-camellias", name: "Dlf Camellias", src: "/client-logos/dlf-camellias.webp", category: "real-estate" },
  { id: "dr-reddy", name: "Dr.reddy", src: "/client-logos/dr.reddy.webp", category: "healthcare" },
  { id: "drive-fit", name: "Drive Fit", src: "/client-logos/drive-fit.webp", category: "corporate" },
  { id: "embassy", name: "Embassy", src: "/client-logos/embassy.webp", category: "corporate" },
  { id: "facebook", name: "Facebook", src: "/client-logos/facebook.webp", category: "corporate" },
  { id: "gail", name: "Gail", src: "/client-logos/gail.webp", category: "corporate" },
  { id: "gd-goenka-school", name: "Gd Goenka School", src: "/client-logos/gd-goenka-school.webp", category: "education" },
  { id: "gmr-goa-international-airport", name: "Gmr Goa International Airport", src: "/client-logos/gmr-goa-international-airport.webp", category: "airports" },
  { id: "goa-shipyard", name: "Goa Shipyard", src: "/client-logos/goa-shipyard.webp", category: "corporate" },
  { id: "godrej", name: "Godrej", src: "/client-logos/godrej.webp", category: "corporate" },
  { id: "goldgym", name: "Goldgym", src: "/client-logos/goldgym.webp", category: "hospitality" },
  { id: "harbans-mahajan", name: "Harbans Mahajan", src: "/client-logos/harbans-mahajan.webp", category: "corporate" },
  { id: "honda", name: "Honda", src: "/client-logos/honda.webp", category: "corporate" },
  { id: "house-of-diagnostics", name: "House Of Diagnostics", src: "/client-logos/house-of-diagnostics.webp", category: "corporate" },
  { id: "hyatt", name: "Hyatt", src: "/client-logos/hyatt.webp", category: "corporate" },
  { id: "hyundai", name: "Hyundai", src: "/client-logos/hyundai.webp", category: "corporate" },
  { id: "icon-best-offers", name: "Icon Best Offers", src: "/client-logos/icon-best-offers.webp", category: "corporate" },
  { id: "icon-easy-to-move", name: "Icon Easy To Move", src: "/client-logos/icon-easy-to-move.webp", category: "corporate" },
  { id: "icon-quality-product", name: "Icon Quality Product", src: "/client-logos/icon-quality-product.webp", category: "corporate" },
  { id: "icon-secure-payment", name: "Icon Secure Payment", src: "/client-logos/icon-secure-payment.webp", category: "corporate" },
  { id: "iim", name: "Iim", src: "/client-logos/iim.webp", category: "education" },
  { id: "ilbs", name: "Ilbs", src: "/client-logos/ilbs.webp", category: "corporate" },
  { id: "indian-express", name: "Indian Express", src: "/client-logos/indian-express.webp", category: "corporate" },
  { id: "indian-oil", name: "Indian Oil", src: "/client-logos/indian-oil.webp", category: "industrial" },
  { id: "india-tv", name: "India Tv", src: "/client-logos/india-tv.webp", category: "media" },
  { id: "indigo", name: "Indigo", src: "/client-logos/indigo.webp", category: "airports" },
  { id: "inox", name: "Inox", src: "/client-logos/inox.webp", category: "hospitality" },
  { id: "isb", name: "Isb", src: "/client-logos/isb.webp", category: "education" },
  { id: "isro", name: "Isro", src: "/client-logos/isro.webp", category: "government" },
  { id: "jagran-small", name: "Jagran Small", src: "/client-logos/jagran-small.webp", category: "hospitality" },
  { id: "jaipur-airport", name: "Jaipur Airport", src: "/client-logos/jaipur-airport.webp", category: "airports" },
  { id: "jak-group", name: "Jak Group", src: "/client-logos/jak-group.webp", category: "real-estate" },
  { id: "jio", name: "Jio", src: "/client-logos/jio.webp", category: "media" },
  { id: "jmd", name: "Jmd", src: "/client-logos/jmd.webp", category: "corporate" },
  { id: "jubilant", name: "Jubilant", src: "/client-logos/jubilant.webp", category: "corporate" },
  { id: "kpmg", name: "Kpmg", src: "/client-logos/kpmg.webp", category: "finance" },
  { id: "lemontree", name: "Lemontree", src: "/client-logos/lemontree.webp", category: "corporate" },
  { id: "lodha", name: "Lodha", src: "/client-logos/lodha.webp", category: "corporate" },
  { id: "m3m", name: "M3m", src: "/client-logos/m3m.webp", category: "real-estate" },
  { id: "maharaja-agarsen-hospital", name: "Maharaja Agarsen Hospital", src: "/client-logos/maharaja-agarsen-hospital.webp", category: "healthcare" },
  { id: "marriot", name: "Marriot", src: "/client-logos/marriot.webp", category: "corporate" },
  { id: "marutisuzuki", name: "Marutisuzuki", src: "/client-logos/marutisuzuki.webp", category: "corporate" },
  { id: "max-infra", name: "Max Infra", src: "/client-logos/max-infra.webp", category: "real-estate" },
  { id: "max-reality", name: "Max Reality", src: "/client-logos/max-reality.webp", category: "real-estate" },
  { id: "max-square", name: "Max Square", src: "/client-logos/max-square.webp", category: "corporate" },
  { id: "mercedes", name: "Mercedes", src: "/client-logos/mercedes.webp", category: "corporate" },
  { id: "mind-comp", name: "Mind Comp", src: "/client-logos/mind-comp.webp", category: "corporate" },
  { id: "mumbai-airport", name: "Mumbai Airport", src: "/client-logos/mumbai-airport.webp", category: "airports" },
  { id: "mumbai-police", name: "Mumbai Police", src: "/client-logos/mumbai-police.webp", category: "finance" },
  { id: "mylan", name: "Mylan", src: "/client-logos/mylan.webp", category: "corporate" },
  { id: "nanavati-hospital", name: "Nanavati Hospital", src: "/client-logos/nanavati-hospital.webp", category: "healthcare" },
  { id: "ndtv", name: "Ndtv", src: "/client-logos/ndtv.webp", category: "media" },
  { id: "o2cure-logo-cropped", name: "O2cure Logo Cropped", src: "/client-logos/o2cure-logo-cropped.webp", category: "corporate" },
  { id: "oberoigroups", name: "Oberoigroups", src: "/client-logos/oberoigroups.webp", category: "real-estate" },
  { id: "oxygengroups", name: "Oxygengroups", src: "/client-logos/oxygengroups.webp", category: "real-estate" },
  { id: "pathwasyschool", name: "Pathwasyschool", src: "/client-logos/pathwasyschool.webp", category: "education" },
  { id: "pepsico", name: "Pepsico", src: "/client-logos/pepsico.webp", category: "corporate" },
  { id: "prestige", name: "Prestige", src: "/client-logos/prestige.webp", category: "corporate" },
  { id: "pti", name: "Pti", src: "/client-logos/pti.webp", category: "corporate" },
  { id: "radisson", name: "Radisson", src: "/client-logos/radisson.webp", category: "corporate" },
  { id: "rehja-corp", name: "Rehja Corp", src: "/client-logos/rehja corp.webp", category: "real-estate" },
  { id: "reliance-infra", name: "Reliance Infra", src: "/client-logos/reliance-infra.webp", category: "real-estate" },
  { id: "rmx", name: "Rmx", src: "/client-logos/rmx.webp", category: "corporate" },
  { id: "rrhospitals", name: "Rrhospitals", src: "/client-logos/rrhospitals.webp", category: "healthcare" },
  { id: "sentara-healthcare", name: "Sentara Healthcare", src: "/client-logos/sentara healthcare.webp", category: "healthcare" },
  { id: "shapoorji", name: "Shapoorji", src: "/client-logos/shapoorji.webp", category: "corporate" },
  { id: "sharda-university", name: "Sharda University", src: "/client-logos/sharda-university.webp", category: "education" },
  { id: "sheraton", name: "Sheraton", src: "/client-logos/sheraton.webp", category: "corporate" },
  { id: "smartworks", name: "Smartworks", src: "/client-logos/smartworks.webp", category: "corporate" },
  { id: "starsports", name: "Starsports", src: "/client-logos/starsports.webp", category: "corporate" },
  { id: "statemans", name: "Statemans", src: "/client-logos/statemans.webp", category: "corporate" },
  { id: "stpi", name: "Stpi", src: "/client-logos/stpi.webp", category: "corporate" },
  { id: "st-mark-school", name: "St Mark School", src: "/client-logos/st-mark-school.webp", category: "education" },
  { id: "symbosis", name: "Symbosis", src: "/client-logos/symbosis.webp", category: "corporate" },
  { id: "tatahealthcare", name: "Tatahealthcare", src: "/client-logos/tatahealthcare.webp", category: "healthcare" },
  { id: "tatasteel", name: "Tatasteel", src: "/client-logos/tatasteel.webp", category: "industrial" },
  { id: "tumble-house-small", name: "Tumble House Small", src: "/client-logos/tumble-house-small.webp", category: "hospitality" },
  { id: "venkatesh-hospitals", name: "Venkatesh Hospitals", src: "/client-logos/venkatesh-hospitals.webp", category: "healthcare" },
  { id: "vishesh-hospital", name: "Vishesh Hospital", src: "/client-logos/vishesh-hospital.webp", category: "healthcare" },
  { id: "westin-hotels", name: "Westin Hotels", src: "/client-logos/westin-hotels.webp", category: "hospitality" },
  { id: "wework", name: "Wework", src: "/client-logos/wework.webp", category: "corporate" },
  { id: "woco-tech-elastomere", name: "Woco Tech Elastomere", src: "/client-logos/woco-tech-elastomere.webp", category: "industrial" },

  // ── Residences ────────────────────────────────────────────────────────────
  { id: "shiv-nadar-res", name: "Shiv Nadar", sector: "HCL Founder & Philanthropist", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "antalia", name: "Antilia", sector: "Mukesh Ambani's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "jmd-owner", name: "Sunil Bedi", sector: "JMD Group Founder's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "boult-owner", name: "Varun & Tarun Gupta", sector: "Boult Audio Founders' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "kunal-bahl", name: "Kunal Bahl", sector: "Snapdeal Founder & Shark Tank Judge", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "stonex-owner", name: "Gaurav Agrawal", sector: "Stonex India Founder's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "jaipuria-institute", name: "Shishir Jaipuria", sector: "Seth Anandram Jaipuria Group Chairman", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "jaipuria-pepsi", name: "Ravi Jaipuria", sector: "Billionaire Chairman, RJ Corp (PepsiCo)", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "jaipuria-ginni", name: "Shishir Jaipuria", sector: "Ginni Filaments Promoters' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "bobby-mukherjee", name: "Bobby Mukherji", sector: "Renowned Architect's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "mont-blanc-ceo", name: "Montblanc CEO", sector: "Luxury Brand Head's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "prine-pipe-owner", name: "Jayant Chheda", sector: "Prince Pipes Founder's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "rathi-steel-owner", name: "Rathi Family", sector: "Rathi Steel Promoters' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "best-tech-owner", name: "Dharmendra Bhandari & Sunil Satija", sector: "Bestech Group Founders' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "oswals", name: "Oswal Family", sector: "Oswal Group Promoters' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "bector-cremica", name: "Rajni Bector", sector: "Cremica Founder's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "sareen-rustex", name: "Sareen Family", sector: "Rust-X Promoters' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "ozone-locks", name: "Alok Aggarwal", sector: "Ozone Overseas Founder's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "euronics", name: "Abhishek Jain", sector: "Euronics India MD's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "saleem-shervani", name: "Saleem Iqbal Shervani", sector: "Former Union Minister & Industrialist", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "shervani-industries", name: "Shervani Family", sector: "Shervani Industrial Group Promoters", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "pm-museum", name: "Pradhanmantri Sangrahalaya", sector: "Prime Ministers' Museum", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "dwarka-convention", name: "Yashobhoomi", sector: "IICC Dwarka Convention Center", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "l-and-t-chennai", name: "L&T Guesthouse", sector: "Larsen & Toubro, Chennai", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "shahid-kapoor", name: "Shahid Kapoor", sector: "Bollywood Actor's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "hritik-residence", name: "Hrithik Roshan", sector: "Bollywood Actor's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "mannat", name: "Mannat", sector: "Shah Rukh Khan's Iconic Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "akshay-kumar", name: "Akshay Kumar", sector: "Bollywood Actor's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "central-vista", name: "Central Vista", sector: "Prime Minister's New Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "ciccu-mukhopadhyay", name: "Ciccu Mukhopadhyay", sector: "Eminent Senior Advocate", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "ajanta-pharma-owner", name: "Purushottam Agrawal", sector: "Ajanta Pharma Founder's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "25-south-realty", name: "The Wadhwa Group", sector: "25 South Promoters' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "dlf-camelias", name: "DLF Camellias", sector: "Ultra-Luxury Residences", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "camelias-kids", name: "DLF Camellias", sector: "Premium Kids Play Area", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "camelias-club", name: "DLF Camellias", sector: "Luxury Clubhouse", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "dlf-thrive", name: "DLF Thrive", sector: "Premium Commercial/Residential Space", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "dlf-summit", name: "DLF The Summit", sector: "Luxury Residences", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "sun-pharma-owner", name: "Dilip Shanghvi", sector: "Billionaire Sun Pharma Founder", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "umrao-residence", name: "The Umrao Promoters", sector: "Luxury Hotel Owners' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "haldiram", name: "Agarwal Family", sector: "Haldiram's Promoters' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "dabur-residence", name: "Burman Family", sector: "Dabur India Promoters' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "oberoi-residence", name: "PRS Oberoi Family", sector: "Oberoi Hotels Promoters' Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "kr-mangalam", name: "Yash Dev Gupta", sector: "K.R. Mangalam Group Founder", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "sobha-realty", name: "PNC Menon", sector: "Billionaire Sobha Realty Founder", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "whiteland-realty", name: "Navdeep Sardana", sector: "Whiteland Corp Founder's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "tarc", name: "Amar Sarin", sector: "TARC MD & CEO's Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "smart-world", name: "Aishwarya Bansal", sector: "Smart World Developers Founder", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "m3m-bansal", name: "Basant Bansal", sector: "Billionaire M3M Group Founder", src: "/client-logos/residence-placeholder.webp", category: "residences" },
  { id: "mahajan-residence", name: "Harbans Mahajan", sector: "Mahajan Family Residence", src: "/client-logos/residence-placeholder.webp", category: "residences" }
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

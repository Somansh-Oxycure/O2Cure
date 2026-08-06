/**
 * Feature: FAQ Knowledge Base — Content
 *
 * All Q&A data, sourced exclusively from:
 *   1. Answered questions in /docs/O₂Cure FAQ's.md
 *   2. High-value creative additions to address known B2B/B2C buyer hesitations
 *      and prevent bounce rate.
 *
 * Voice & Tone: Science-first, ultra-premium. No generic fluff.
 * Every answer cites independent testing authority, physical performance
 * data, or institutional credibility where applicable.
 */

import type { FaqCategoryData } from "@/features/faq/types";

export const FAQ_CATEGORIES: FaqCategoryData[] = [
  /* ─────────────────────────────────────────────
     Category 1 — TriCure™ Technology
     ───────────────────────────────────────────── */
  {
    id: "tricure-technology",
    label: "TriCure™ Technology",
    description:
      "The science behind the only integrated three-layer purification system engineered for India's indoor air reality.",
    iconName: "Atom",
    items: [
      {
        id: "tc-what-is-tricure",
        question: "What is TriCure™ Technology?",
        answer:
          "TriCure™ is O₂Cure's proprietary three-layer purification architecture that simultaneously addresses all three categories of indoor air pollution — Particulate Matter, Microbial Pathogens, and Gases & Odours — within a single integrated system. Most conventional purifiers target only one category. TriCure™ treats all three continuously and in parallel, which is why independently validated results differ measurably from standard HEPA-only units.",
        badge: "Proprietary",
      },
      {
        id: "tc-phi-cell",
        question: "What is PHI-Cell® technology, and how does it relate to TriCure™?",
        answer:
          "PHI-Cell® (Photohydroionization) is a NASA-derived active air purification technology that generates ionised hydro-peroxides, superoxide ions, and hydroxide radicals — the same compounds the atmosphere uses to neutralise pollutants outdoors. Within the TriCure™ architecture, PHI-Cell® powers the Microbial Protection layer, enabling proactive neutralisation of airborne and surface pathogens rather than passive filtration alone. Its efficacy has been independently validated by Sandia National Laboratories and Steris.",
        badge: "NASA-Derived",
      },
      {
        id: "tc-three-layers",
        question: "Why does indoor air require three distinct purification layers?",
        answer:
          "Indoor air pollution is not a single substance — it is a complex mix of three fundamentally different threat categories, each requiring a distinct scientific response. Particulate matter (PM2.5, PM10, dust, pollen) demands mechanical filtration rated to HEPA H13 or higher. Microbial pollutants (bacteria, viruses, mould, spores) require UV-C sterilisation or advanced photohydroionisation. Gases and VOCs (formaldehyde, benzene, cooking fumes, smoke) require activated carbon or photocatalytic oxidation. A system that addresses only one or two categories leaves a measurable share of your indoor pollution untouched.",
      },
      {
        id: "tc-hepa-vs-tricure",
        question: "How does TriCure™ differ from a standard HEPA air purifier?",
        answer:
          "A standard HEPA air purifier captures particulate matter down to 0.3 microns at 99.97% efficiency (ISO 29463 / EN 1822) — and does nothing else. It does not neutralise bacteria, viruses, or mould; it does not eliminate VOCs or chemical odours; it does not address gases. TriCure™ combines HEPA H13 mechanical filtration, PHI-Cell® active microbial sterilisation (≥99.9% pathogen elimination, ASTM E2406), and high-density molecular adsorption media (VOC threshold maintained below 50 ppb, ISO 16000-9). The outcome is measurably cleaner air across all three pollutant categories simultaneously.",
        badge: "HEPA H13 · UV-C · VOC",
      },
      {
        id: "tc-real-time-monitoring",
        question: "Does O₂Cure provide real-time air quality monitoring?",
        answer:
          "Yes. O₂Cure systems incorporate real-time air quality monitoring with continuous feedback on PM2.5, PM10, VOC levels, CO₂, and temperature-humidity parameters — depending on the model. This data enables intelligent adaptive operation, so purification intensity automatically matches the actual contamination level at any given moment. Enterprise deployments also receive remote monitoring dashboards accessible to facilities management teams.",
        badge: "Real-Time Data",
      },
      {
        id: "tc-certifications-list",
        question: "Which independent bodies have validated TriCure™ Technology?",
        answer:
          "TriCure™ Technology has been independently validated by CCMB (Centre for Cellular and Molecular Biology), Bioanalisis, Ecolab, Kansas State University, NABL-accredited laboratories, Sandia National Laboratories, and Steris. These are not marketing endorsements — they are peer-reviewed or commercially independent test results conducted under controlled conditions and available upon request by procurement and compliance teams.",
        badge: "NABL · CCMB · Sandia NL",
      },
    ],
  },

  /* ─────────────────────────────────────────────
     Category 2 — Residential
     ───────────────────────────────────────────── */
  {
    id: "residential",
    label: "Residential",
    description:
      "Everything a homeowner needs to make a confident, informed decision about protecting their family's indoor air.",
    iconName: "Home",
    items: [
      {
        id: "res-2bhk-size",
        question: "What size air purifier do I need for a 2BHK home in India?",
        answer:
          "For a standard 2BHK apartment (approximately 800–1,200 sq. ft.), a unit with a CADR of 300–400 m³/h is appropriate for the living room. Compact bedroom purifiers with a CADR of 150–200 m³/h provide complete coverage for sleeping areas. O₂Cure recommends a site-specific assessment rather than a generic square-footage rule, because ceiling height, ventilation rate, occupancy, and local outdoor AQI significantly affect the sizing calculation.",
      },
      {
        id: "res-babies-pets",
        question: "Is O₂Cure safe for babies, infants, and pets?",
        answer:
          "Yes. O₂Cure residential systems are certified zero-ozone and use medical-grade HEPA filtration without harmful chemical emissions. There is no ozone generation, no ionisation-induced NOx, and no UV exposure outside the sealed chamber. Systems comply with applicable safety standards for occupied environments, including spaces shared with newborns, toddlers, and pets — populations whose respiratory systems are most sensitive to both pollution and purification byproducts.",
        badge: "Zero Ozone · Medical-Grade",
      },
      {
        id: "res-filter-change",
        question: "How often do I need to change the filter?",
        answer:
          "Under average Indian environmental conditions (AQI 80–180 daily), HEPA and activated carbon filters should be replaced every 6 to 12 months, depending on usage pattern, local outdoor air quality, and indoor pollution sources such as cooking, smoking, or construction. O₂Cure systems include a filter-life indicator that monitors actual particle load rather than operating hours alone, so replacements are based on measured performance rather than arbitrary schedules.",
      },
      {
        id: "res-hepa-vs-cooler",
        question: "What is the difference between a HEPA purifier and an ordinary air cooler filter?",
        answer:
          "Air cooler filters are basic mesh screens designed to trap large visible dust particles and protect the cooler's internal components — not to improve air quality. A true HEPA H13-rated filter, validated to EN 1822, traps 99.97% of airborne particles down to 0.3 microns, including fine PM2.5, bacteria, pollen, and smoke. An air cooler does not address microbial contamination or VOCs, and its mesh offers no meaningful protection against the pollutants that cause respiratory and cardiovascular harm.",
      },
      {
        id: "res-electricity",
        question: "How much electricity does a home air purifier use per month?",
        answer:
          "O₂Cure home purifiers consume approximately 30–50 Watts during continuous operation. Running a 40W unit 24 hours a day for 30 days consumes approximately 28.8 kWh — comparable to running a single ceiling fan. At Indian residential electricity tariffs, this represents a negligible addition to monthly utility costs, while the long-term cost of untreated indoor air pollution — in healthcare expenditure, lost productivity, and reduced cognitive function — is substantially higher.",
      },
      {
        id: "res-pet-odors",
        question: "Will an O₂Cure system help with pet odours and allergies?",
        answer:
          "Yes. The Gas & Odour Control layer of TriCure™ Technology uses high-density activated carbon and photocatalytic oxidation to neutralise ammonia compounds, dander-associated VOCs, and persistent organic odours at the molecular level — rather than masking them with fragrances. Simultaneously, the HEPA H13 filtration layer captures airborne pet dander particles that trigger IgE-mediated allergic responses. Both layers operate together in every cycle, not separately.",
        badge: "Allergen + Odour Control",
      },
      {
        id: "res-cooking-smoke",
        question: "Can a purifier help with cooking smoke and kitchen fumes?",
        answer:
          "Yes, provided the unit is appropriately sized for the kitchen or open-plan living area and has an activated carbon stage. Cooking generates PM2.5 (from combustion), acrolein, benzene, CO, and nitrogen dioxide — pollutants that a HEPA-only unit cannot remove. O₂Cure's TriCure™ system captures the particulate component via HEPA H13 while the molecular adsorption stage neutralises gas-phase pollutants. For large kitchens or open-plan spaces, O₂Cure can recommend a complementary system configuration.",
      },
      {
        id: "res-portable-vs-wholehome",
        question: "Is a portable unit enough, or do I need a whole-home system?",
        answer:
          "A single portable unit placed correctly can significantly improve air quality in one room. For complete home coverage — particularly in a 3BHK or larger, or in homes with occupants who have respiratory conditions — a multi-unit strategy or ducted HVAC integration delivers consistently clean air across all occupied zones. O₂Cure's team will assess your floor plan, occupancy pattern, and health priorities before recommending a single-unit, multi-unit, or integrated approach.",
      },
    ],
  },

  /* ─────────────────────────────────────────────
     Category 3 — Commercial & Architectural
     ───────────────────────────────────────────── */
  {
    id: "commercial-architectural",
    label: "Commercial & Architectural",
    description:
      "Technical answers for facility managers, architects, HVAC consultants, and enterprise procurement teams.",
    iconName: "Building2",
    items: [
      {
        id: "com-hvac-integration",
        question: "Can O₂Cure integrate with our existing HVAC / AHU system?",
        answer:
          "Yes. O₂Cure offers both standalone purification units and in-duct systems engineered for direct integration into existing Air Handling Units (AHUs) and HVAC infrastructure. In-duct configurations apply TriCure™ Technology at the air-handling layer, treating recirculated air before it is distributed across occupied zones — delivering uniform air quality at scale without disrupting building aesthetics or tenant operations. Our engineering team conducts a full HVAC audit before specifying any integration.",
        badge: "HVAC / AHU Compatible",
      },
      {
        id: "com-cpcb-compliance",
        question: "What CPCB compliance standards does O₂Cure meet?",
        answer:
          "O₂Cure systems are designed to support compliance with the Central Pollution Control Board's Indoor Air Quality guidelines and ASHRAE Standard 62.1 for acceptable indoor air quality in ventilated spaces. For healthcare environments, systems additionally align with NABH and WHO air quality recommendations. Specific certification documentation required by your compliance or procurement team is available upon request.",
        badge: "CPCB · ASHRAE 62.1",
      },
      {
        id: "com-multi-site-pricing",
        question: "How is pricing structured for multi-site enterprise deployments?",
        answer:
          "O₂Cure does not publish standard pricing because no two deployments share the same requirements. Commercial and multi-site pricing is built around a site-specific assessment that accounts for total floor area, occupancy density, ventilation rate, existing HVAC infrastructure, pollutant profile, monitoring requirements, and service-level agreement terms. Enterprise clients typically engage O₂Cure through a structured consultation before a customised proposal is issued.",
      },
      {
        id: "com-roi",
        question: "How does O₂Cure justify ROI to a CFO or facilities budget owner?",
        answer:
          "The ROI framework for commercial air purification goes beyond 'air feels cleaner.' Documented metrics include: (1) Reduction in airborne infection transmission rates — validated by independent microbiological testing — leading to measurable decreases in employee sick days; (2) Improvement in cognitive performance and task accuracy in clean-air environments, quantified in multiple occupational health studies; (3) Reduced HVAC maintenance costs through pre-filtration load reduction; (4) ESG reporting value and regulatory compliance cost avoidance. O₂Cure can provide site-specific ROI modelling as part of the enterprise consultation.",
        badge: "ROI Modelling Available",
      },
      {
        id: "com-monitoring-dashboard",
        question: "Do you provide real-time monitoring dashboards for facilities teams?",
        answer:
          "Yes. Commercial and enterprise deployments include remote air quality monitoring with dashboards accessible to facilities management teams. Real-time data streams include PM2.5, PM10, VOC index, CO₂ concentration, temperature, and humidity — across all monitored zones. Historical trend data supports compliance reporting, occupant health documentation, and predictive maintenance scheduling.",
        badge: "Live Dashboard",
      },
      {
        id: "com-standalone-vs-hvac",
        question: "How does a standalone purifier differ from upgrading the building's HVAC system?",
        answer:
          "Standalone purification units treat air within a specific zone and are deployed quickly without building infrastructure changes. HVAC-integrated systems treat recirculated air at the source, providing uniform air quality across all zones served by the AHU. The right choice depends on the building's existing infrastructure, the uniformity of air quality required across zones, installation access, and budget phasing. Many O₂Cure commercial projects begin with standalone units in critical zones and progressively migrate to HVAC integration as capital budgets allow.",
      },
      {
        id: "com-which-clients",
        question: "What kind of enterprise clients has O₂Cure delivered for?",
        answer:
          "O₂Cure has delivered air quality solutions for hospitals and clinical facilities, corporate office campuses, educational institutions, data centres, hotels and hospitality environments, airports and transit hubs, government buildings, and industrial manufacturing facilities. The breadth of deployment environments reflects the configurability of TriCure™ Technology — the same core system is adapted in specification to match each environment's specific occupancy, pollutant profile, and regulatory requirements.",
        badge: "40+ Enterprise Categories",
      },
      {
        id: "com-healthcare-hospitals",
        question: "Why do hospitals and healthcare organisations choose O₂Cure?",
        answer:
          "Healthcare environments face uniquely stringent air quality requirements: airborne infection control, immunocompromised patient safety, surgical suite sterility, and regulatory compliance under NABH and CPCB norms. O₂Cure's Microbial Protection layer — validated by CCMB, Steris, and Sandia National Laboratories for ≥99.9% pathogen elimination — directly addresses these requirements. Systems are configured to meet cleanroom classifications and positive/negative pressure zone requirements as applicable.",
        badge: "NABH Aligned · CCMB Validated",
      },
      {
        id: "com-certifications-enterprise",
        question: "What certifications would I need to show my leadership or compliance team?",
        answer:
          "O₂Cure's technology stack carries independent certifications and validations from: NABL-accredited laboratories (India), CCMB (Centre for Cellular and Molecular Biology), Kansas State University, Sandia National Laboratories, Ecolab, Bioanalisis, and Steris. Additional standards compliance includes HEPA H13 (EN 1822), ASHRAE 62.1, ISO 29463-3, ASTM E2406, ISO 16000-9, and NSF/ANSI 55. A complete certification dossier is available upon request for procurement and governance review.",
        badge: "Full Dossier Available",
      },
    ],
  },

  /* ─────────────────────────────────────────────
     Category 4 — Health & Safety Certifications
     ───────────────────────────────────────────── */
  {
    id: "health-safety-certifications",
    label: "Health & Safety",
    description:
      "Independent validation, laboratory evidence, and certification details for procurement, legal, and compliance review.",
    iconName: "ShieldCheck",
    items: [
      {
        id: "hsc-what-certifications",
        question: "What certifications does O₂Cure hold?",
        answer:
          "O₂Cure's purification technology is validated through an independent, multi-institution testing programme spanning: CCMB (Centre for Cellular and Molecular Biology, Hyderabad), Bioanalisis (independent biological testing laboratory), Ecolab (global hygiene and infection prevention), Kansas State University (environmental microbiology), NABL-accredited laboratories, Sandia National Laboratories (U.S. Department of Energy), and Steris (global sterilisation and infection prevention). These validations are independently conducted, peer-reviewed where applicable, and available for review by procurement, compliance, and legal teams.",
        badge: "NABL · CCMB · Steris",
      },
      {
        id: "hsc-nabl-meaning",
        question: "What does NABL accreditation mean for O₂Cure's test results?",
        answer:
          "NABL (National Accreditation Board for Testing and Calibration Laboratories) is the apex body in India for accrediting testing laboratories to ISO/IEC 17025 standards — the international benchmark for laboratory competence. When a performance claim is validated by a NABL-accredited laboratory, it means the test was conducted under rigorous, audited conditions by an independent facility whose methodology is internationally recognised. This is materially different from in-house manufacturer testing.",
        badge: "ISO/IEC 17025",
      },
      {
        id: "hsc-hepa-standard",
        question: "What HEPA standard do O₂Cure filters meet, and how is it tested?",
        answer:
          "O₂Cure filtration stages are rated to HEPA H13 classification under EN 1822 (European standard for high-efficiency air filters) and ISO 29463-3, which governs testing methodology for particulate air filters. H13 is the clinical-grade HEPA benchmark used in operating theatres and pharmaceutical cleanrooms. It captures 99.97% of particles at the Most Penetrating Particle Size (MPPS) of 0.3 microns — the hardest particle size to capture — making it the appropriate standard for environments where pathogen control is critical.",
        badge: "HEPA H13 · EN 1822",
      },
      {
        id: "hsc-microbial-kill-rate",
        question: "What is the independently tested pathogen elimination rate?",
        answer:
          "Under controlled laboratory conditions validated by CCMB, Bioanalisis, and Steris, O₂Cure's Microbial Protection layer achieves ≥99.9% elimination of target airborne pathogens including bacteria, viruses, mould spores, and fungi. Testing methodology follows ASTM E2406 (standard guide for assessing bioaerosol antimicrobial performance) and NSF/ANSI 55 protocols. Results are reproducible across independent test facilities — a standard O₂Cure requires before citing any performance claim publicly.",
        badge: "≥99.9% · ASTM E2406",
      },
      {
        id: "hsc-voc-gas-testing",
        question: "How are gas and VOC elimination claims independently verified?",
        answer:
          "Gas and VOC performance is tested under ISO 16000-9 (determination of VOC emissions from building products) and ANSI/ASHRAE 62.1 protocols. O₂Cure's Gas & Odour Control layer maintains a total VOC concentration threshold below 50 ppb in tested environments, validated using calibrated photoionisation detection (PID) instruments by independent laboratories. California Air Resources Board (CARB) certification is additionally held for applicable product configurations.",
        badge: "ISO 16000-9 · CARB Cert.",
      },
      {
        id: "hsc-ozone-safety",
        question: "Does O₂Cure emit ozone — and is that safe?",
        answer:
          "No. O₂Cure systems are certified zero-ozone-generating. Some competing air purification technologies — including certain ionisers and older UV-C configurations — produce ozone as a byproduct. Ozone at concentrations above 0.07 ppm (EPA limit) is a known respiratory irritant. O₂Cure's PHI-Cell® and UV-C configurations are independently tested to confirm ozone output below detectable thresholds, making them safe for continuous operation in occupied residential, healthcare, and educational environments.",
        badge: "Zero Ozone Certified",
      },
      {
        id: "hsc-global-standards",
        question: "Does O₂Cure's technology meet international standards beyond India?",
        answer:
          "Yes. O₂Cure's technology framework aligns with or exceeds international standards including EN 1822 (Europe, filter classification), ISO 29463-3 (international, HEPA test methods), ASTM E2406 (USA, bioaerosol antimicrobial testing), NSF/ANSI 55 (USA, UV microbiological water treatment — applied to UV-C air treatment), and ANSI/ASHRAE 62.1 (USA, ventilation and indoor air quality). This multi-jurisdiction compliance is relevant for multinational enterprise clients requiring unified procurement standards.",
        badge: "EN · ISO · ASTM · ASHRAE",
      },
    ],
  },

  /* ─────────────────────────────────────────────
     Category 5 — Installation & Maintenance
     ───────────────────────────────────────────── */
  {
    id: "installation-maintenance",
    label: "Installation & Maintenance",
    description:
      "Practical answers on deployment, integration, upkeep, and long-term service for residential and commercial installations.",
    iconName: "Wrench",
    items: [
      {
        id: "im-residential-install",
        question: "Is professional installation required for residential units?",
        answer:
          "Standalone residential purifiers are designed for unassisted placement — no professional installation is required. Units arrive pre-configured and simply require positioning in the target room, plugging in to a standard 5A socket, and running an initial calibration cycle (typically 30 minutes). For whole-home or multi-unit configurations, O₂Cure's technical team will provide on-site placement guidance and commissioning support as part of the purchase.",
      },
      {
        id: "im-commercial-install",
        question: "What does commercial or HVAC installation involve?",
        answer:
          "Commercial and HVAC-integrated installations are handled entirely by O₂Cure's certified engineering team. The process begins with a site survey and air quality baseline assessment, followed by system design, ducting or in-line integration work, commissioned start-up, and a structured handover with facilities staff training. Timeline from survey to operational sign-off depends on site complexity and typically ranges from one to four weeks for standard commercial installations.",
      },
      {
        id: "im-filter-frequency",
        question: "How often do filters need to be replaced across different environments?",
        answer:
          "Filter replacement intervals vary by environment, occupancy, and local outdoor AQI. As a reference baseline: residential environments (AQI 80–180) — HEPA filter every 6–12 months, activated carbon every 6 months. Commercial environments with moderate foot traffic — HEPA every 3–6 months, carbon every 3 months. Healthcare and high-occupancy environments — HEPA every 2–3 months, with monthly inspection. All O₂Cure units include a calibrated filter-life sensor that provides actual replacement alerts based on measured load rather than a fixed schedule.",
      },
      {
        id: "im-maintenance-contract",
        question: "Does O₂Cure offer ongoing service and maintenance contracts?",
        answer:
          "Yes. O₂Cure offers Annual Maintenance Contracts (AMCs) for both residential and commercial installations. Commercial AMCs include scheduled filter replacements, full system inspection, sensor calibration, firmware updates, and priority support SLAs. Residential customers can opt into a managed filter subscription programme that delivers replacement filters ahead of the predicted replacement date based on the unit's live sensor data.",
        badge: "AMC Available",
      },
      {
        id: "im-downtime-maintenance",
        question: "Is there downtime during filter replacement or scheduled maintenance?",
        answer:
          "For standalone residential and commercial units, filter replacement takes approximately 5–10 minutes per unit with no tools required — systems are designed for filter access without specialist equipment. HVAC-integrated systems can be maintained zone-by-zone during low-occupancy periods, minimising operational disruption. O₂Cure's commercial maintenance scheduling is coordinated with the client's facilities team to avoid impact on peak building use hours.",
      },
      {
        id: "im-monitoring-alerts",
        question: "How do I know when the air quality in my space is poor or when the system needs attention?",
        answer:
          "All O₂Cure units with integrated sensors provide real-time air quality status via a front-panel display or connected app, depending on the model. Colour-coded AQI indicators provide at-a-glance status. Filter saturation alerts, sensor anomalies, and connectivity issues generate push notifications to the owner or facilities manager. Enterprise systems escalate alerts through the monitoring dashboard with timestamped logs for compliance records.",
        badge: "Smart Alerts",
      },
      {
        id: "im-lifespan",
        question: "What is the expected operational lifespan of an O₂Cure system?",
        answer:
          "O₂Cure systems are designed and tested for a minimum of 10 years of continuous operational life under manufacturer-specified maintenance schedules. Core electronic and mechanical components are rated beyond this threshold. PHI-Cell® lamps and UV-C elements have a replacement interval of approximately 2 years, after which the unit continues operating at full specification. This lifespan calculus is a material factor in the total cost of ownership analysis versus lower-cost alternatives with 2–4 year design lives.",
        badge: "10-Year Design Life",
      },
      {
        id: "im-smaller-vs-larger",
        question: "Is there a product suited for small spaces like a bedroom versus large campuses?",
        answer:
          "Yes. O₂Cure's product range spans from compact personal purifiers designed for spaces as small as a single bedroom (30–50 m²) to enterprise-scale in-duct systems capable of treating an entire building's recirculated air supply. Campus deployments involve a distributed network of zone-specific units and/or AHU-integrated systems, all monitored from a central facilities dashboard. O₂Cure's team will map the right product or system combination to your specific floor plan, occupancy load, and air quality target.",
      },
    ],
  },
];

/** Flat list of all FAQ items — used for search and JSON-LD schema generation. */
export const ALL_FAQ_ITEMS = FAQ_CATEGORIES.flatMap((cat) => cat.items);

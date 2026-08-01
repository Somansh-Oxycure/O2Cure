import type { AwardItem, PillarItem } from "@/features/about/types";

/**
 * About page copy and data — shaped like future Sanity CMS documents.
 * All body copy sourced verbatim from O2Cure_About_Page.md (captured 30 July 2026).
 * Headlines refined for cinematic brand voice per 05_AI_AGENT_INSTRUCTIONS.md.
 * Do NOT invent technical claims or figures not present in the source document.
 */

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const aboutHeroContent = {
  eyebrow: "About O₂Cure",
  /** Cinematic headline — distilled from the page's SEO H1 for brand voice */
  headline: "We Breathe 23,000 Times a Day.",
  headlineAccent: "Make Every Breath Count.",
  subline: "O₂Cure by Oxycure Pvt. Ltd.",
  /** Hero image from public/About us/ */
  imageSrc: "/About us/About_01_Who-We-Are.jpg",
  imageAlt:
    "O₂Cure — advancing cleaner, healthier indoor air for environments across India",
} as const;

// ─── Who We Are ───────────────────────────────────────────────────────────────

export const whoWeAreContent = {
  eyebrow: "Our Story",
  heading: "Advancing Air Quality Through Science",
  /**
   * Body paragraphs — verbatim from the live site, split into digestible
   * chunks per the typography rule: no giant paragraphs, max 2–3 lines.
   */
  paragraphs: [
    "O₂Cure is dedicated to advancing air quality through state-of-the-art purification technologies. Our mission is to address the growing challenge of air pollution by offering innovative solutions that combat harmful airborne contaminants both indoors and outdoors, including particulate matter (PM2.5), bacteria, viruses, allergens, and odors.",
    "With millions affected by respiratory conditions each year, we aim to create cleaner, safer environments for people around the world. Recognized for our commitment to quality and innovation, O₂Cure has a proven track record of delivering effective air management solutions.",
    "Backed by extensive research, our technologies are trusted globally for their performance and reliability. We take pride in leading the way in air purification, setting the standard for healthier, cleaner living spaces.",
    "Our solutions are ideal, tested, proven and backed by test results and testimonials for homes, offices, buildings, schools and other places.",
  ],
  buildingImageSrc: "/About us/About_07_About-Us-Building.jpg",
  buildingImageAlt: "O₂Cure headquarters — a commitment to cleaner environments",
  lifestyleImageSrc: "/About us/About_08_Inhaling-Fresh-Air.jpg",
  lifestyleImageAlt: "Person breathing fresh, purified air",
  wavePatternSrc: "/About us/About_09_Wave-Pattern.png",
} as const;

// ─── Awards & Recognitions ────────────────────────────────────────────────────

export const awardsContent = {
  eyebrow: "Recognition",
  heading: "Awards & Recognitions",
  supporting:
    "Our founder's vision for cleaner air has been recognised by some of India's most respected institutions.",
} as const;

export const awards: AwardItem[] = [
  {
    id: "award-forbes",
    title: "Forbes India",
    description:
      "An accomplished mechanical engineer and entrepreneur, Mr. Kartik launched O₂Cure to discourage uninformed buying and encourage locally manufactured purifiers.",
    readMoreHref:
      "https://www.forbesindia.com/media/supplement_pdf/entrepreneurs-2021.pdf",
    badgeSrc: "/About us/About_02_Award-Forbes-India.png",
    badgeAlt: "Forbes India award badge",
    badgeWidth: 300,
    badgeHeight: 300,
  },
  {
    id: "award-iaf",
    title: "Indian Achievers Award",
    description:
      "ZECO AIRCON extends its heartfelt gratitude to the Indian Achievers Forum (IAF) for awarding Mr. Kartik Singhal, director and founder of O₂Cure, with the Indian Achievers' Award.",
    readMoreHref: "https://www.iafindia.com/mr-kartik-singhal/",
    badgeSrc: "/About us/About_03_Award-Indian-Achievers.png",
    badgeAlt: "Indian Achievers Award badge",
    badgeWidth: 300,
    badgeHeight: 300,
  },
  {
    id: "award-business-year",
    title: "Business of the Year",
    description:
      "We are proud, delighted and overwhelmed to be nominated and awarded as \u201cThe Business of The Year\u201d among some of the top companies in the world.",
    readMoreHref: "https://businessleaderoftheyear.org/index.html",
    badgeSrc: "/About us/About_04_Award-Business-of-the-Year.png",
    badgeAlt: "The Business of the Year award badge",
    badgeWidth: 300,
    badgeHeight: 300,
  },
  {
    id: "award-entrepreneur-2021",
    title: "Entrepreneur Awards 2021",
    description:
      "Mr. Kartik Singhal has been awarded with Entrepreneur Awards 2021 for his vision and application of technology for fighting invisible air pollutants and the ongoing pandemic.",
    readMoreHref: "https://www.iafindia.com/mr-kartik-singhal/",
    badgeSrc: "/About us/About_05_Award-Entrepreneur-2021.jpg",
    badgeAlt: "Entrepreneur Awards 2021 badge",
    badgeWidth: 600,
    badgeHeight: 400,
  },
  {
    id: "award-jagran",
    title: "Jagran's Naya Bharat SME Awards 2021",
    description:
      "Our founder Mr. Kartik Singhal has been awarded Editor's Choice Budding Entrepreneur of the Year in the 1st edition of Jagran's Naya Bharat SME Awards 2021 — testimony to our pioneering work in air purification.",
    readMoreHref:
      "https://hi-in.facebook.com/o2cure/videos/882014089138022/",
    badgeSrc: "/About us/About_06_Award-Jagran-Naya-Bharat.jpg",
    badgeAlt: "Jagran Naya Bharat SME Awards 2021 — founder portrait",
    badgeWidth: 600,
    badgeHeight: 400,
  },
];

// ─── Vision, Mission, Uniqueness & Solutions ──────────────────────────────────

export const pillarsContent = {
  eyebrow: "Our Purpose",
  heading: "Built on Four Pillars",
  supporting:
    "Every decision we make is guided by these four commitments to cleaner, healthier air.",
} as const;

export const pillars: PillarItem[] = [
  {
    id: "pillar-vision",
    title: "Vision",
    description:
      "We aim to educate the world about the need for better air quality, by spreading appropriate knowledge of available technologies and effective solutions to combat deteriorating breathable air. Air purifiers are an essential survival tool.",
    index: 1,
  },
  {
    id: "pillar-mission",
    title: "Mission",
    description:
      "To reduce the number of lives lost every year due to respiratory health problems arising from airborne contaminants. O₂Cure targets to provide efficient and cost-effective solutions to make air cleaner and breathable.",
    index: 2,
  },
  {
    id: "pillar-uniqueness",
    title: "Uniqueness",
    description:
      "O₂Cure air purifiers are made for advanced solutions for bacteria, virus and other contaminants. We believe in thinking outside the box. Technologies that we offer are state of the art, patented, proven and used by thousands of families across the world.",
    index: 3,
  },
  {
    id: "pillar-solutions",
    title: "Solutions",
    description:
      "We provide complete solutions with personalised experience, offering a diverse range of customisable air purifiers and monitors. We consult, design and deploy solutions for respiratory health issues like asthma, pollen and dust allergies.",
    index: 4,
  },
];

import type { Metadata } from "next";

import {
  AboutHero,
  AwardsSection,
  PillarsSection,
  WhoWeAreSection,
} from "@/features/about";
import { FooterSection } from "@/features/footer";

// ─── SEO metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Air Purifiers In India | About Us | O2Cure",
  description:
    "Learn about O₂Cure by Oxycure Pvt. Ltd. — our mission to advance air quality through state-of-the-art purification technologies that protect homes, offices and critical environments across India.",
  keywords: [
    "O2Cure",
    "about O2Cure",
    "air purifier India",
    "indoor air quality",
    "Oxycure Pvt Ltd",
    "air purification technology",
    "Kartik Singhal",
    "NABL certified air purifier",
  ],
  alternates: {
    canonical: "https://o2cure.in/about",
  },
  openGraph: {
    title: "Air Purifiers In India | About Us | O2Cure",
    description:
      "Discover how O₂Cure is advancing indoor air quality through state-of-the-art purification technologies — from residences to healthcare and industrial environments.",
    type: "website",
    url: "https://o2cure.in/about",
    siteName: "O2Cure",
    images: [
      {
        url: "/About us/About_01_Who-We-Are.jpeg",
        width: 1200,
        height: 630,
        alt: "O₂Cure — advancing cleaner indoor air across India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About O₂Cure | Air Purification Technology | O2Cure",
    description:
      "Advancing indoor air quality through state-of-the-art purification technologies. Trusted by thousands of homes and enterprises across India.",
    images: ["/About us/About_01_Who-We-Are.jpeg"],
  },
};

// ─── JSON-LD structured data ───────────────────────────────────────────────────
const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About O₂Cure",
  description:
    "O₂Cure by Oxycure Pvt. Ltd. is dedicated to advancing air quality through state-of-the-art purification technologies that protect homes, offices, schools and critical environments.",
  url: "https://o2cure.in/about",
  publisher: {
    "@type": "Organization",
    "@id": "https://o2cure.in/#organization",
    name: "O2Cure",
    url: "https://o2cure.in",
    logo: {
      "@type": "ImageObject",
      url: "https://o2cure.in/O2cure-final-logo.png",
    },
    founder: {
      "@type": "Person",
      name: "Kartik Singhal",
    },
    award: [
      "Forbes India Entrepreneur 2021",
      "Indian Achievers Award",
      "Business of the Year",
      "Entrepreneur Awards 2021",
      "Jagran Naya Bharat SME Awards 2021 — Editor's Choice Budding Entrepreneur",
    ],
  },
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      <main
        id="about-main"
        className="flex min-h-screen flex-col bg-background"
      >
        {/* Section 1 — Hero */}
        <AboutHero />

        {/* Section 2 — Who We Are */}
        <WhoWeAreSection />

        {/* Section 3 — Awards & Recognitions */}
        <AwardsSection />

        {/* Section 4 — Vision, Mission, Uniqueness & Solutions */}
        <PillarsSection />

        {/* Footer */}
        <FooterSection />
      </main>
    </>
  );
}

import type { Metadata } from "next";

import { FooterSection } from "@/features/footer";
import { FaqPage } from "@/features/faq/components/FaqPage";
import { ALL_FAQ_ITEMS } from "@/features/faq/content";

/* ─────────────────────────────────────────────
   SEO Metadata
   ───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "FAQ — Indoor Air Quality & Purification | O₂Cure",
  description:
    "Science-backed answers to every question about indoor air purification, TriCure™ Technology, NABL-certified testing, installation, and commercial deployments. O₂Cure FAQ.",
  keywords: [
    "air purifier FAQ India",
    "indoor air quality questions",
    "TriCure technology",
    "HEPA purifier FAQ",
    "commercial air purification FAQ",
    "O2Cure FAQ",
    "air purifier for home India 2026",
    "NABL certified air purifier",
  ],
  alternates: {
    canonical: "https://o2cure.in/faq",
  },
  openGraph: {
    title: "FAQ — Indoor Air Quality & Purification | O₂Cure",
    description:
      "Science-backed answers about indoor air purification, TriCure™ Technology, NABL-certified testing, and O₂Cure commercial deployments.",
    url: "https://o2cure.in/faq",
    siteName: "O₂Cure",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Indoor Air Quality & Purification | O₂Cure",
    description:
      "Science-backed answers about indoor air purification, TriCure™ Technology, NABL-certified testing, and O₂Cure commercial deployments.",
  },
};

/* ─────────────────────────────────────────────
   FAQPage JSON-LD Structured Data
   Enables Google FAQ rich results in search.
   ───────────────────────────────────────────── */
function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/* ─────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────── */
export default function FaqRoute() {
  const faqJsonLd = getFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqPage />
      <FooterSection />
    </>
  );
}

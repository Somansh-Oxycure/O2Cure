/**
 * /commercial — Lead-focused Commercial Air Diagnostic page.
 *
 * Architecture:
 *  Server Component (metadata, JSON-LD, layout)
 *   └── Client Components (hero, diagnostic engine, social proof)
 *
 * Aesthetic: Corporate Light & Pure Edition — soft off-whites, morning-sky blues,
 * crisp greens. Zero dark-mode styles on this route.
 */
import type { Metadata } from "next";

import { CommercialStickyConsultBar } from "@/features/commercial/components/CommercialStickyConsultBar";
import { CommercialPageClient } from "@/features/commercial/components/CommercialPageClient";
import { FooterSection } from "@/features/footer/components/FooterSection";

// ─── SEO Metadata ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Commercial Air Purification Solutions | O2 Cure India",
  description:
    "Improve indoor air quality with O2 Cure's commercial air purification solutions. HVAC air filtration systems and office air purifiers for cleaner, healthier workplaces.",
  openGraph: {
    title: "Commercial Air Purification Solutions | O2 Cure India",
    description:
      "Improve indoor air quality with O2 Cure's commercial air purification solutions. HVAC air filtration systems and office air purifiers for cleaner, healthier workplaces.",
    type: "website",
    url: "https://o2cure.in/commercial-air-purifier",
    images: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "O2Cure Commercial Air Purification — modern office interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Air Purification Solutions | O2 Cure India",
    description:
      "Improve indoor air quality with O2 Cure's commercial air purification solutions. HVAC air filtration systems and office air purifiers for cleaner, healthier workplaces.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://o2cure.in/commercial-air-purifier",
  },
};

// ─── Structured Data ───────────────────────────────────────────────────────
function CommercialJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "O2Cure Commercial Air Purification",
    description:
      "Custom enterprise air purification systems engineered for commercial spaces — offices, hospitals, and central HVAC integration.",
    provider: {
      "@type": "Organization",
      "@id": "https://o2cure.in/#organization",
      name: "O2Cure",
      url: "https://o2cure.in",
    },
    serviceType: "Commercial Air Purification",
    areaServed: "IN",
    url: "https://o2cure.in/commercial",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function CommercialPage() {
  return (
    <>
      <CommercialJsonLd />
      <CommercialPageClient />
      
      {/* Global Footer */}
      <FooterSection />
      <CommercialStickyConsultBar />
    </>
  );
}

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
  title: "Commercial Air Purification — Enterprise Grade Air Engineering | O2Cure",
  description:
    "Diagnose your facility's air quality challenges in 3 steps. O2Cure engineers custom enterprise air purification systems for offices, hospitals, and large facilities.",
  openGraph: {
    title: "Commercial Air Purification | O2Cure",
    description:
      "Enterprise-grade air purity for every commercial space — open offices, hospitals, lobbies, and full AHU integration.",
    type: "website",
    url: "https://o2cure.in/commercial",
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
    title: "Commercial Air Purification | O2Cure",
    description:
      "3-step commercial air diagnostic. Custom system recommendation. Consult an Air Engineer.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://o2cure.in/commercial",
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

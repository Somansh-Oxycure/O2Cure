/**
 * /residential — Lead-focused Home Air Diagnostic page.
 *
 * Architecture:
 *  Server Component (metadata, JSON-LD, layout)
 *   └── Client Components (hero, diagnostic engine, social proof)
 *
 * Aesthetic: Light & Pure Edition — soft off-whites, morning-sky blues,
 * crisp greens. Zero dark-mode styles on this route.
 */
import type { Metadata } from "next";

import { StickyConsultBar } from "@/features/residential/components/StickyConsultBar";
import { ResidentialPageClient } from "@/features/residential/components/ResidentialPageClient";
import { FooterSection } from "@/features/footer/components/FooterSection";

// ─── SEO Metadata ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Residential Air Purification — Pure Air Engineered for Your Home | O2Cure",
  description:
    "Diagnose your home's air quality challenges in 3 steps. O2Cure engineers a custom spatial air purification system around your floor plan, occupancy, and specific threat vectors.",
  openGraph: {
    title: "Residential Air Purification | O2Cure",
    description:
      "Architectural-grade air purity for every type of home — villas, apartments, dedicated zones, and full HVAC integration.",
    type: "website",
    url: "https://o2cure.in/residential",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "O2Cure Residential Air Purification — bright modern home interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Residential Air Purification | O2Cure",
    description:
      "3-step home air diagnostic. Custom system recommendation. Consult an Air Engineer.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://o2cure.in/residential",
  },
};

// ─── Structured Data ───────────────────────────────────────────────────────
function ResidentialJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "O2Cure Residential Air Purification",
    description:
      "Custom spatial air purification systems engineered for residential homes — villas, apartments, and HVAC integration.",
    provider: {
      "@type": "Organization",
      "@id": "https://o2cure.in/#organization",
      name: "O2Cure",
      url: "https://o2cure.in",
    },
    serviceType: "Air Purification",
    areaServed: "IN",
    url: "https://o2cure.in/residential",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ResidentialPage() {
  return (
    <>
      <ResidentialJsonLd />

      {/*
        ResidentialPageClient manages the scroll-to-diagnostic behaviour
        triggered by the hero CTA — a thin client wrapper so the page
        itself stays a Server Component.
      */}
      <ResidentialPageClient />

      {/* Global Footer */}
      <FooterSection />

      {/* Sticky mobile CTA — appears after hero leaves viewport */}
      <StickyConsultBar />
    </>
  );
}

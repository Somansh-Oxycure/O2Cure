import type { Metadata } from "next";

import {
  ContactClientCarousel,
  ContactFormSection,
  ContactPageHero,
  TelemetryImpactBadges,
} from "@/features/contact";
import { FooterSection } from "@/features/footer";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Get in Touch | Air Quality Engineering Consultation | O₂Cure",
  description:
    "Request a free engineering consultation with O₂Cure's certified air quality specialists. Serving offices, hospitals, hotels, schools, homes and industrial facilities across India. Response guaranteed within 2 business hours.",
  keywords: [
    "O2Cure contact",
    "air quality consultation India",
    "HVAC engineering consultation",
    "indoor air purification Gurugram",
    "enterprise air quality solution",
    "hospital air purifier consultation",
    "commercial air quality India",
    "air diagnostics",
    "O2Cure get in touch",
  ],
  alternates: {
    canonical: "https://o2cure.in/contact",
  },
  openGraph: {
    title: "Request an Engineering Consultation | O₂Cure",
    description:
      "700+ enterprise deployments. 15+ years of HVAC engineering expertise. Request a free air quality assessment for your home, office, hospital or industrial facility.",
    type: "website",
    url: "https://o2cure.in/contact",
    siteName: "O₂Cure",
    images: [
      {
        url: "/O2cure-final-logo.png",
        width: 1200,
        height: 630,
        alt: "O₂Cure — engineering consultation for cleaner indoor air",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get in Touch | Air Quality Engineering | O₂Cure",
    description:
      "Schedule an air diagnostics consultation for your home or enterprise space. NABL-tested purification systems designed around your environment.",
    images: ["/O2cure-final-logo.png"],
  },
};

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Get in Touch — O₂Cure Engineering Consultation",
  description:
    "Request a free air quality engineering consultation from O₂Cure's certified specialists. Serving homes, offices, hospitals, hotels, schools and industrial facilities across India.",
  url: "https://o2cure.in/contact",
  publisher: {
    "@type": "Organization",
    name: "O₂Cure",
    url: "https://o2cure.in",
    logo: {
      "@type": "ImageObject",
      url: "https://o2cure.in/O2cure-final-logo.png",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-92173-39695",
        contactType: "sales",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
        contactOption: "TollFree",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sector 18",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122016",
      addressCountry: "IN",
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />

      <main
        id="contact-main"
        className="flex min-h-screen flex-col bg-background"
      >
        {/* Section 1 — Testimonials + Form */}
        <ContactFormSection />

        {/* Section 2 — Client Logo Carousel */}
        <ContactClientCarousel />

        {/* Section 3 — Impact Badges + SLA */}
        <TelemetryImpactBadges />

        {/* Footer */}
        <FooterSection />
      </main>
    </>
  );
}

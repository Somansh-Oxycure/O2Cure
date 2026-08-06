import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductShowcaseExplorer } from "@/features/solutions";
import { FooterSection } from "@/features/footer";
// ─── SEO metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Air Safety Engineering Solutions | O2Cure",
  description:
    "Browse O2Cure's precision-engineered air safety systems. Filter by environment sector, air challenge, spatial capacity, and integration architecture. NABL-certified. Zero-obligation consultation.",
  openGraph: {
    title: "Air Safety Engineering Solutions | O2Cure",
    description:
      "Precision-engineered air purification systems for corporate, healthcare, residential, industrial, education, and data centre environments.",
    type: "website",
    url: "https://o2cure.in/solutions",
    siteName: "O2Cure",
  },
  twitter: {
    card: "summary_large_image",
    title: "Air Safety Engineering Solutions | O2Cure",
    description:
      "Precision-engineered air purification systems for every environment. NABL-certified.",
  },
  alternates: { canonical: "https://o2cure.in/solutions" },
};

// ─── JSON-LD structured data ───────────────────────────────────────────────────
const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "O2Cure Air Safety Engineering Solutions",
  description:
    "NABL-certified air purification systems engineered for corporate, healthcare, residential, industrial, education, and data centre environments.",
  url: "https://o2cure.in/solutions",
  provider: {
    "@type": "Organization",
    name: "O2Cure",
    url: "https://o2cure.in",
  },
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <main
        id="solutions-main"
        className="flex min-h-screen flex-col bg-white pt-16"
      >
        {/* ── Page header ─────────────────────────────────────────────── */}
        <div className="border-b border-[#E5E7EB] bg-white px-5 py-5 md:px-10 md:py-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">
                Air Safety Engineering
              </p>
              <h1 className="text-[clamp(1.25rem,1.1rem+1vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-[#1C1C1C]">
                Solutions Catalogue
              </h1>
            </div>
            {/* Subtle cert badge — desktop only */}
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF5E4] text-[0.6rem] font-bold text-[#2A5C1D]" aria-hidden>✓</span>
              <p className="text-[0.68rem] font-semibold text-[#6B7280]">NABL-Certified</p>
            </div>
          </div>
        </div>

        {/* ── Product Showcase Explorer ────────────────────────────────── */}
        <section
          id="product-showcase"
          aria-label="Engineering solutions catalogue"
          className="flex flex-1 flex-col"
        >
          <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Loading catalogue...</div>}>
            <ProductShowcaseExplorer />
          </Suspense>
        </section>
        <FooterSection />
      </main>
    </>
  );
}

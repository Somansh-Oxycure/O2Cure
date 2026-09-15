import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductShowcaseExplorer } from "@/features/solutions";
import { FooterSection } from "@/features/footer";
// ─── SEO metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ env?: string }>;
}): Promise<Metadata> {
  const { env } = await searchParams;

  let canonical = "https://o2cure.in/products";
  let title = "Air Safety Engineering Solutions | O2Cure";
  let description =
    "Browse O2Cure's precision-engineered air safety systems. Filter by environment sector, air challenge, spatial capacity, and integration architecture. NABL-certified. Zero-obligation consultation.";

  if (env) {
    if (env === "residential") {
      canonical = "https://o2cure.in/residential-air-purifier";
    } else {
      canonical = `https://o2cure.in/products/${env}-air-purifier`;
    }

    switch (env) {
      case "corporate":
        title = "Corporate Air Purifiers & Air Quality Solutions | O2Cure";
        description = "Explore O2Cure corporate air purifiers and air quality solutions designed to create cleaner, healthier and safer indoor workplaces.";
        break;
      case "healthcare":
        title = "Healthcare Air Purifiers & Air Quality Solutions | O2Cure";
        description = "Discover O2Cure healthcare air purifiers and air quality solutions designed to support cleaner, healthier and safer healthcare environments.";
        break;
      case "residential":
        title = "Residential Air Purifiers & Air Quality Solutions | O2Cure";
        description = "Explore O2Cure residential air purifiers and air quality solutions designed to provide cleaner, healthier and safer indoor air for homes.";
        break;
      case "industrial":
        title = "Industrial Air Purifiers & Air Quality Solutions | O2Cure";
        description = "Discover O2Cure industrial air purifiers and air quality solutions designed to improve indoor air quality across industrial environments.";
        break;
      case "education":
        title = "Air Purifiers for Schools & Education | O2Cure";
        description = "Explore O2Cure air purifiers and air quality solutions designed to create cleaner, healthier and safer learning environments.";
        break;
      case "datacenter":
        title = "Data Center Air Purifiers & Air Quality Solutions | O2Cure";
        description = "Discover O2Cure air purification and air quality solutions designed to support cleaner, controlled environments for data centers.";
        break;
      default:
        const formattedEnv = env.charAt(0).toUpperCase() + env.slice(1);
        title = `${formattedEnv} Air Purifier & Purification Systems | O2Cure`;
        break;
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "O2Cure",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: { canonical },
  };
}

// ─── JSON-LD structured data ───────────────────────────────────────────────────
const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "O2Cure Air Safety Engineering Solutions",
  description:
    "NABL-certified air purification systems engineered for corporate, healthcare, residential, industrial, education, and data centre environments.",
  url: "https://o2cure.in/products",
  provider: {
    "@type": "Organization",
    "@id": "https://o2cure.in/#organization",
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
              <h2 className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">
                Air Safety Engineering
              </h2>
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

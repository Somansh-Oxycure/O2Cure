import type { Metadata } from "next";

import { BlogGrid, BlogHero, BlogNewsletter, liveBlogPosts } from "@/features/blog";
import { FooterSection } from "@/features/footer";

// ─── SEO metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Air Quality Blog & Research | O₂Cure Intelligence Archive",
  description:
    "35 peer-verified articles on indoor air quality, HEPA filtration science, PM2.5 health impacts, and B2B environment solutions — fact-checked by O₂Cure's technology team.",
  keywords: [
    "air quality blog",
    "indoor air quality India",
    "HEPA filter science",
    "PM2.5 health effects",
    "air purifier guide",
    "O2Cure blog",
    "air purification technology",
    "PHI technology",
    "REME HALO",
    "air quality research India",
  ],
  alternates: {
    canonical: "https://o2cure.in/blog",
  },
  openGraph: {
    title: "Air Quality Blog & Research | O₂Cure Intelligence Archive",
    description:
      "Science-led thinking on air, health and environments. 35 posts, 33,000+ words of verified indoor air quality intelligence from O₂Cure.",
    type: "website",
    url: "https://o2cure.in/blog",
    siteName: "O2Cure",
    images: [
      {
        url: "/blog/Blog_09_feat.jpg",
        width: 1200,
        height: 630,
        alt: "O₂Cure Intelligence Archive — air quality blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Air Quality Blog & Research | O₂Cure",
    description:
      "Science-led thinking on indoor air quality — 35 verified articles from O₂Cure's technology team.",
    images: ["/blog/Blog_09_feat.jpg"],
  },
};

// ─── JSON-LD structured data ──────────────────────────────────────────────────
const blogIndexJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "O₂Cure Intelligence Archive",
  description:
    "Science-led articles on indoor air quality, air purification technology, health impacts and B2B environment solutions.",
  url: "https://o2cure.in/blog",
  publisher: {
    "@type": "Organization",
    name: "O2Cure",
    url: "https://o2cure.in",
    logo: {
      "@type": "ImageObject",
      url: "https://o2cure.in/O2cure-final-logo.png",
    },
  },
  blogPost: liveBlogPosts.slice(0, 10).map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `https://o2cure.in/blog/${p.slug}`,
    datePublished: p.publishedAt,
    description: p.excerpt,
    image: p.featuredImage
      ? `https://o2cure.in${p.featuredImage}`
      : undefined,
  })),
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
      />

      <main
        id="blog-main"
        className="flex min-h-screen flex-col bg-background"
      >
        {/* Section 1 — Cinematic hero */}
        <BlogHero />

        {/* Section 2 & 3 — Category filter + post grid */}
        <BlogGrid posts={liveBlogPosts} />

        {/* Section 4 — Newsletter CTA */}
        <BlogNewsletter />

        {/* Footer */}
        <FooterSection />
      </main>
    </>
  );
}

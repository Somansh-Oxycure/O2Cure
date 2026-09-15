import type { Metadata } from "next";

/**
 * Central site configuration consumed by metadata, JSON-LD, sitemap and
 * robots. Update `url` before production deployment — it is a placeholder
 * until the final domain is confirmed.
 */
export const siteConfig = {
  name: "O₂Cure",
  tagline: "Take a Deep Breath",
  description:
    "O₂Cure designs premium indoor air purification technology built around the environments people actually breathe in.",
  /** Placeholder — replace with the confirmed production domain before launch. */
  url: "https://o2cure.in",
  logo: "/O2cure-final-logo.png",
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Buy Air Purifier in India | Air Cleaner & Purification Products | O2Cure",
    template: `%s | ${siteConfig.name}`,
  },
  description: "O2Cure offers the best air purifier in India with advanced air cleaner machines and air quality monitoring solutions to reduce indoor air pollution effectively. Buy Now!",
  applicationName: siteConfig.name,
  keywords: [
    "O₂Cure",
    "air purifier",
    "indoor air quality",
    "air purification technology",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Buy Air Purifier in India | Air Cleaner & Purification Products | O2Cure",
    description: "O2Cure offers the best air purifier in India with advanced air cleaner machines and air quality monitoring solutions to reduce indoor air pollution effectively. Buy Now!",
    images: [
      {
        url: siteConfig.logo,
        width: 1024,
        height: 1024,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Air Purifier in India | Air Cleaner & Purification Products | O2Cure",
    description: "O2Cure offers the best air purifier in India with advanced air cleaner machines and air quality monitoring solutions to reduce indoor air pollution effectively. Buy Now!",
    images: [siteConfig.logo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.png",
  },
  verification: {
    google: "82_-Rm4gd5nhNf9ei-8CxX1GobSzH7M4AyUw20b8dyU",
  },
};

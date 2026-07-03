import type { Metadata } from "next";

/**
 * Central site configuration consumed by metadata, JSON-LD, sitemap and
 * robots. Update `url` before production deployment — it is a placeholder
 * until the final domain is confirmed.
 */
export const siteConfig = {
  name: "O2Cure",
  tagline: "Take a Deep Breath",
  description:
    "O2Cure designs premium indoor air purification technology built around the environments people actually breathe in.",
  /** Placeholder — replace with the confirmed production domain before launch. */
  url: "https://www.o2cure.com",
  logo: "/O2cure-final-logo.png",
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "O2Cure",
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
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
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
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
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
    icon: siteConfig.logo,
  },
};

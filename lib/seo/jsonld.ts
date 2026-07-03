import { siteConfig } from "@/lib/seo/metadata";

/**
 * Organization structured data (schema.org). Rendered as a JSON-LD
 * <script> tag in the root layout so every page carries baseline
 * Organization data regardless of page-specific structured data added
 * later (e.g. Product schema once the Products feature exists).
 */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
  } as const;
}

import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/metadata";
import { getLiveSlugs } from "@/features/blog";
import { products } from "@/features/solutions/data/productCatalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // 1. Static Core Pages
  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/clientele`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/products`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/residential`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/commercial-air-purifier`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/personalised-finder`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // 2. Clean Solutions URLs (mapped via rewrites)
  const solutionsPages = [
    "/products/corporate-air-purifier",
    "/products/healthcare-air-purifier",
    "/residential-air-purifier",
    "/products/industrial-air-purifier",
    "/products/education-air-purifier",
    "/products/datacenter-air-purifier",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // 3. Dynamic Products Detail Pages
  const productDetailPages = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 4. Dynamic Blog Post Pages
  const blogPostPages = getLiveSlugs().map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...solutionsPages,
    ...productDetailPages,
    ...blogPostPages,
  ];
}


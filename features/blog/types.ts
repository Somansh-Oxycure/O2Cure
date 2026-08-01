/**
 * Blog feature types — shaped like future Sanity CMS documents.
 * Replace array values in content.ts without touching layout components.
 */

export type AuditStatus =
  | "refresh"
  | "rewrite"
  | "merge"
  | "retire";

export type BlogCategory =
  | "Science & Technology"
  | "Health & Wellbeing"
  | "B2B Environments"
  | "Air Quality";

export interface BlogPost {
  /** Unique identifier for React keys, URLs, and ARIA — kebab-case */
  slug: string;
  /** Original post number from the O2Cure blog (1–35) */
  postNumber: number;
  /**
   * Display title — stale-year titles have been de-dated for display.
   * The original title is preserved in originalTitle for audit purposes.
   */
  title: string;
  /** Verbatim original title from the live site */
  originalTitle: string;
  /** ISO 8601 date string of first publication */
  publishedAt: string;
  /**
   * Audit call from O2Cure_Blog_Archive.md Section 1.9.
   * Retire posts are kept in data but excluded from the public index.
   */
  auditStatus: AuditStatus;
  /** Single sentence description for card and SEO meta */
  excerpt: string;
  /** Relative path to featured image in public/blog/ — null if no image */
  featuredImage: string | null;
  /** Accessible alt text for the featured image */
  featuredImageAlt: string;
  /** Content category for the filter bar */
  category: BlogCategory;
  /** Approximate reading time in minutes — derived from word count */
  readingTimeMin: number;
  /** Word count sourced from the audit table */
  wordCount: number;
  /** Number of internal links reported in the audit */
  internalLinks: number;
  /** Number of internal links pointing to product pages */
  productLinks: number;
  /**
   * Full body copy sourced verbatim from O2Cure_Blog_Archive.md Part 2.
   * Paragraphs are split as an array for the prose renderer.
   * Null for retire-status posts (not rendered).
   */
  body: string[] | null;
  /** Canonical URL on the live o2cure.in site */
  canonicalUrl: string;
}

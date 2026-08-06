/**
 * Feature: FAQ Knowledge Base
 *
 * TypeScript types for FAQ categories and individual Q&A items.
 * Structured to match future Sanity CMS schema for content-driven updates.
 */

export type FaqCategory =
  | "tricure-technology"
  | "residential"
  | "commercial-architectural"
  | "health-safety-certifications"
  | "installation-maintenance";

export interface FaqItem {
  /** Unique identifier for JSON-LD schema generation. */
  id: string;
  question: string;
  /** May contain inline HTML for emphasis (e.g. <strong>, <em>). */
  answer: string;
  /**
   * Optional badge rendered beside the question — used to surface authority
   * signals (e.g. "NABL Verified", "UL Listed") without cluttering the answer.
   */
  badge?: string;
}

export interface FaqCategoryData {
  id: FaqCategory;
  label: string;
  /** Short description shown in the tab panel header. */
  description: string;
  /** Lucide icon name string — resolved at render time. */
  iconName: string;
  items: FaqItem[];
}

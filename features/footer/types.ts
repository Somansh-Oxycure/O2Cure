import type { NavLink } from "@/types/content";

/** Single footer navigation link — maps to a Sanity `link` object. */
export interface FooterLink extends NavLink {
  id: string;
  /** True for entries not yet wired to real pages (Careers, FAQs, etc.). */
  isPlaceholder?: boolean;
}

/** Grouped navigation column — maps to a Sanity `footerNavGroup` document. */
export interface FooterNavGroup {
  id: string;
  title: string;
  links: FooterLink[];
}

/** Social profile — maps to a Sanity `socialLink` object. */
export interface FooterSocialLink {
  id: string;
  label: string;
  href: string;
  platform: "linkedin" | "instagram" | "youtube";
}

/** Newsletter copy and labels — maps to a Sanity `footerNewsletter` object. */
export interface FooterNewsletterContent {
  heading: string;
  supporting: string;
  emailLabel: string;
  submitLabel: string;
  successHeading: string;
  successMessage: string;
}

/** Legal bar copy — maps to a Sanity `footerLegal` object. */
export interface FooterLegalContent {
  copyright: string;
  tagline: string;
}

/** Hero statement and CTA — maps to a Sanity `footerHero` object. */
export interface FooterHeroContent {
  headline: string;
  supporting: string;
  cta: NavLink;
}

/**
 * Canonical footer payload — mirrors a future `homepage.footer` Sanity document.
 * Components accept this shape so adapters can swap content without layout changes.
 */
export interface FooterContent {
  hero: FooterHeroContent;
  navigation: FooterNavGroup[];
  newsletter: FooterNewsletterContent;
  legal: FooterLegalContent;
  socialLinks: FooterSocialLink[];
}

export interface NewsletterSubmissionResult {
  success: boolean;
  message?: string;
}

/**
 * Pluggable newsletter boundary. Swap `simulatedNewsletterSubmission` for a
 * Sanity webhook, email service or API route later.
 */
export interface NewsletterSubmissionAdapter {
  subscribe(email: string): Promise<NewsletterSubmissionResult>;
}

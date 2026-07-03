/**
 * Shared content primitives. Shaped to resemble what a Sanity document
 * would eventually provide, so wiring up the real CMS later (Milestone
 * "Sanity-ready content/schema scaffolding") is a data change, not a
 * structural one. Nothing here is queried from Sanity yet.
 */

/** Mirrors Sanity's image reference shape closely enough to swap in later. */
export interface SanityImageLike {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** A single navigation entry, active or not. */
export interface NavLink {
  label: string;
  href: string;
  /** False until the destination page is implemented. */
  isActive: boolean;
}

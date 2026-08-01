/**
 * About feature types — shaped like future Sanity CMS documents.
 * Replace array values in content.ts without touching layout components.
 */

export interface AwardItem {
  /** Unique identifier for React keys and ARIA */
  id: string;
  /** Award organisation name used as card heading */
  title: string;
  /** Verbatim description from the live O2Cure site */
  description: string;
  /** External source URL for "Read More" link */
  readMoreHref: string;
  /** Relative path to badge image inside public/About us/ */
  badgeSrc: string;
  /** Accessible alt text for the badge image */
  badgeAlt: string;
  /** Badge intrinsic width (px) used by next/image */
  badgeWidth: number;
  /** Badge intrinsic height (px) used by next/image */
  badgeHeight: number;
}

export interface PillarItem {
  /** Unique identifier for React keys and ARIA */
  id: string;
  /** Short one-word label shown as the pillar title */
  title: string;
  /** Verbatim description from the live O2Cure site */
  description: string;
  /** Large decorative number or symbol shown above the title */
  index: number;
}

import type { SanityImageLike } from "@/types/content";

/** Client or partner logo — swap `logo.src` from CMS without layout changes. */
export interface ClientLogo {
  id: string;
  name: string;
  logo: SanityImageLike;
  href?: string;
}

/** Single recognition metric for the horizontal strip. */
export interface RecognitionMetric {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

/** Testimonial preview card — quote kept short (max three lines in UI). */
export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  company: string;
  avatar: SanityImageLike;
}

/** Certification badge — image optional; text fallback when `badge.src` is empty. */
export interface Certification {
  id: string;
  name: string;
  badge: SanityImageLike;
}

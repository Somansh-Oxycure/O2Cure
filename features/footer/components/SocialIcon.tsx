import type { FooterSocialLink } from "@/features/footer/types";
import { cn } from "@/lib/utils";

interface SocialIconProps {
  platform: FooterSocialLink["platform"];
  className?: string;
}

/**
 * Monochrome social glyphs — lucide-react no longer ships brand icons.
 */
export function SocialIcon({ platform, className }: SocialIconProps) {
  const shared = cn("size-4", className);

  switch (platform) {
    case "linkedin":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={shared}
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={shared}
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={shared}
        >
          <path d="M3 7.5c0-1.5 1-2.5 2.5-2.7C7.5 4.3 12 4.3 12 4.3s4.5 0 6.5.5c1.5.2 2.5 1.2 2.5 2.7v9c0 1.5-1 2.5-2.5 2.7-2 .5-6.5.5-6.5.5s-4.5 0-6.5-.5C4 19 3 18 3 16.5v-9Z" />
          <path d="m10 9.5 5 3-5 3v-6Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={shared}
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "x":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={shared}
        >
          <path d="M4 4l11.733 16h4.267l-11.733-16z" />
          <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
        </svg>
      );
  }
}

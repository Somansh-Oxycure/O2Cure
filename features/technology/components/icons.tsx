import type { SVGProps } from "react";

/**
 * Minimal single-weight line icons for the three TriCure™ layers.
 * All strokes use `currentColor` so the parent controls tint on hover.
 */

const baseProps: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/** Particulate Matter — fine particles drawn toward a filtration arc. */
export function ParticulateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 11h9M5 16h6M5 21h9" opacity={0.55} />
      <path d="M20.5 8.5a8 8 0 0 1 0 15" />
      <circle cx="8.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="16" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="21" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="24.5" cy="16" r="1.4" />
    </svg>
  );
}

/** Microbial Protection — a shield guarding an enclosed cell. */
export function MicrobialIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M16 4.5 26 8v7.5c0 6.2-4.2 9.9-10 12-5.8-2.1-10-5.8-10-12V8l10-3.5Z" />
      <circle cx="16" cy="14.5" r="3.4" />
      <path d="M16 11.1v-1.6M16 19.5v-1.6M12.6 14.5H11M21 14.5h-1.6" opacity={0.7} />
    </svg>
  );
}

/** Gas & Odor Control — rising vapor dissolving into clean air. */
export function GasOdorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M9 25c-1.8-1.2-1.6-3.4 0-4.4-2-1.3-1.6-3.9.5-4.6" opacity={0.75} />
      <path d="M16 26c-2-1.4-1.8-3.9 0-5-2.3-1.5-1.9-4.5.6-5.3-2.1-1.5-1.3-4.4 1.2-4.9" />
      <path d="M23 24c-1.6-1.1-1.4-3.1 0-4-1.8-1.2-1.4-3.5.4-4.2" opacity={0.75} />
      <path d="M6 10.5c0-2.5 2-4.5 4.5-4.5S15 8 15 10.5" opacity={0.5} />
    </svg>
  );
}

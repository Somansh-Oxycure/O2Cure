import type { ComponentType, SVGProps } from "react";

/** One of the three pollutant categories TriCure™ addresses. */
export interface TriCureLayer {
  /** Stable identifier, also used for aria wiring. */
  id: string;
  /** Display sequence, e.g. "01". */
  number: string;
  title: string;
  /** Single-line description — kept short and premium. */
  description: string;
  /** Extra detail to show on hover. */
  detail: string;
  /** Minimal line icon rendered with `currentColor`. */
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /**
   * B2B technical metadata badges — injected directly into the card like
   * aerospace telemetry tags. Kept under 4 per card for visual density balance.
   */
  badges: string[];
  /**
   * Secondary technical spec line shown below badges (e.g. ISO standard,
   * MERV rating, efficiency claim). Rendered in small monospace-style type.
   */
  spec: string;
  /** Accent color key for gradient wash and connector highlight. */
  accentColor: "blue" | "teal" | "green";
  /**
   * Hero stat shown in the animated counter when this layer's tab is active.
   * `value` is the numeric/formatted string to count up to; `label` is the
   * suffix / descriptor shown beside it.
   */
  stat: {
    /** The display value, e.g. "99.97" or "<50". */
    value: string;
    /** Unit / label, e.g. "% capture rate" or "ppb VOC limit". */
    label: string;
    /** Whether the value is numeric and should be animated. */
    animate: boolean;
  };
}

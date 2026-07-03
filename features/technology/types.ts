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
  /** Minimal line icon rendered with `currentColor`. */
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

import type { SanityImageLike } from "@/types/content";

/** Placeholder silhouette key — swap for `image.src` when final renders arrive. */
export type ProductRenderVariant =
  | "tower"
  | "slim"
  | "console"
  | "clinical"
  | "compact";

export interface Product {
  id: string;
  name: string;
  /** Single-line purpose — no specs, no pricing. */
  purpose: string;
  environment: string;
  /**
   * Premium render slot. Leave `src` empty to use the SVG placeholder for
   * `renderVariant`; set `src` later and the layout stays identical.
   */
  image: SanityImageLike;
  renderVariant: ProductRenderVariant;
}

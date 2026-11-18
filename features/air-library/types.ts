export type MediaType = "short" | "video" | "image";

export type MediaCategory =
  | "Air Audits"
  | "Office & Commercial"
  | "Home & Lifestyle"
  | "Air Science & AQI"
  | "Installations & Gallery";

export interface AirLibraryItem {
  id: string;
  title: string;
  description?: string;
  mediaType: MediaType;
  category: MediaCategory;
  /** YouTube URL or video ID for 'short' / 'video', or image path/URL for 'image' */
  src: string;
  /** Optional custom thumbnail override; auto-derived from YouTube ID if omitted */
  thumbnailUrl?: string;
  speaker?: string;
  tags?: string[];
  featured?: boolean;
}

import type { AirLibraryItem, MediaCategory, MediaType } from "./types";

export const AIR_LIBRARY_CATEGORIES: readonly ("All" | MediaCategory)[] = [
  "All",
  "Air Audits",
  "Office & Commercial",
  "Home & Lifestyle",
  "Air Science & AQI",
  "Installations & Gallery",
] as const;

export const AIR_LIBRARY_MEDIA_TYPES: readonly {
  id: "all" | MediaType;
  label: string;
}[] = [
  { id: "all", label: "All Media" },
  { id: "short", label: "Shorts" },
  { id: "video", label: "Videos" },
  { id: "image", label: "Photos" },
] as const;

/**
 * Extracts the 11-character YouTube video ID from Shorts, watch, share,
 * or embed URLs, or returns a cleaned raw ID.
 */
export function extractYouTubeId(urlOrId: string): string {
  const trimmed = urlOrId.trim();
  const patterns = [
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return trimmed.replace(/[^a-zA-Z0-9_-]/g, "");
}

/**
 * Resolves the display thumbnail URL for any Air Library item.
 * Uses custom thumbnailUrl if provided, derives YouTube hqdefault for video/short,
 * or returns the image src directly.
 */
export function getMediaThumbnail(item: AirLibraryItem): string {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  if (item.mediaType === "image") return item.src;

  const videoId = extractYouTubeId(item.src);
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Returns the privacy-friendly/clean YouTube embed URL for active playback.
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay = true): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=${
    autoplay ? 1 : 0
  }&rel=0&modestbranding=1&playsinline=1`;
}

/**
 * Returns the external YouTube watch/shorts URL for the given item.
 */
export function getYouTubeExternalUrl(item: AirLibraryItem): string {
  if (item.src.startsWith("http://") || item.src.startsWith("https://")) {
    return item.src;
  }
  const id = extractYouTubeId(item.src);
  return item.mediaType === "short"
    ? `https://www.youtube.com/shorts/${id}`
    : `https://www.youtube.com/watch?v=${id}`;
}

/**
 * Curated media entries for The Air Library.
 * Add YouTube Shorts, full-length videos (`mediaType: "video"`),
 * or photo entries (`mediaType: "image"`) below to automatically populate
 * the watch theater, filters, and archive grid.
 */
export const AIR_LIBRARY_ITEMS: AirLibraryItem[] = [
  {
    id: "fc51FZ69kkY",
    title: "Fresh Air Is Not Fresh Anymore. Here Is Why.",
    description:
      "Why ambient outdoor air brought straight inside rarely delivers clean breathing air—and what an indoor air audit reveals.",
    mediaType: "short",
    category: "Air Science & AQI",
    src: "https://www.youtube.com/shorts/fc51FZ69kkY",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Indoor Air Quality", "Air Audit", "Fresh Air"],
    featured: true,
  },
  {
    id: "PdC2_-5jLsE",
    title: "Why Does One Cold Spread Through the Whole Office?",
    description:
      "Exploring airborne circulation in sealed commercial workspaces around CyberHub and how proper indoor air treatment breaks the cycle.",
    mediaType: "short",
    category: "Office & Commercial",
    src: "https://www.youtube.com/shorts/PdC2_-5jLsE",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Office Air", "CyberHub", "Airborne Transmission"],
  },
  {
    id: "xDGBADvkqGw",
    title: "Cool Air, Nice Smell... But Is It Safe to Breathe?",
    description:
      "Air conditioning and artificial fragrances mask stale air without removing fine particulates or volatile compounds.",
    mediaType: "short",
    category: "Office & Commercial",
    src: "https://www.youtube.com/shorts/xDGBADvkqGw",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["CyberHub", "Air Quality", "Hidden Pollutants"],
  },
  {
    id: "CFxbInTfEME",
    title: "Post Diwali Air Pollution: Is Your Home Air Safe?",
    description:
      "Measuring how lingering festive particulate spikes penetrate residential interiors long after smoke clears outside.",
    mediaType: "short",
    category: "Home & Lifestyle",
    src: "https://www.youtube.com/shorts/CFxbInTfEME",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Home Air", "Diwali Smog", "Air Audit"],
  },
  {
    id: "CI1q_-FyEpE",
    title: "3 Things Polluting Your Home Air This Diwali",
    description:
      "Three everyday indoor triggers during the festive season that silently elevate particulate and chemical loads inside homes.",
    mediaType: "short",
    category: "Home & Lifestyle",
    src: "https://www.youtube.com/shorts/CI1q_-FyEpE",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Indoor Air Tips", "Home Pollution", "Air Audit"],
  },
  {
    id: "y3wwuVcxt1Y",
    title: "Gym Air Audit (Part 2): Fix Stuffy Air & Sweat Odour",
    description:
      "Part 2 of our gym air audit breaking down ventilation deficits, odour buildup, and active purification strategies.",
    mediaType: "short",
    category: "Air Audits",
    src: "https://www.youtube.com/shorts/y3wwuVcxt1Y",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Gym Air Audit", "Odour Control", "Ventilation"],
  },
  {
    id: "BRcFRQ8wJXk",
    title: "Is Bad Air Ruining Your Workout? Gym Air Truth",
    description:
      "High exertion amplifies pollutant intake—see what real-time readings uncover inside enclosed fitness studios.",
    mediaType: "short",
    category: "Air Audits",
    src: "https://www.youtube.com/shorts/BRcFRQ8wJXk",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Gym Air Audit", "Fitness & Health", "CO2 Levels"],
  },
  {
    id: "LFLdWeoLCB8",
    title: "This Everyday Household Habit Is Polluting Your Indoor Air",
    description:
      "A common daily routine at home that spikes fine particulate concentrations—and simple adjustments that protect your family.",
    mediaType: "short",
    category: "Home & Lifestyle",
    src: "https://www.youtube.com/shorts/LFLdWeoLCB8",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Home Habits", "Indoor Pollution", "Air Audit"],
  },
  {
    id: "CB6Cw3XGtJ8",
    title: "Air Pollution in India Is Not Just a Winter Problem",
    description:
      "Why indoor pollutants, VOCs, and regional particulates persist across seasons even when winter smog recedes.",
    mediaType: "short",
    category: "Air Science & AQI",
    src: "https://www.youtube.com/shorts/CB6Cw3XGtJ8",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Year-Round AQI", "India Air Quality", "Air Audit"],
  },
  {
    id: "XpJwB3-vX1c",
    title: "Why Does Smog Get Worse in Winters? | Un-Scripted Air Audit",
    description:
      "An un-scripted breakdown of winter temperature inversions and why trapped ground-level pollutants infiltrate indoors.",
    mediaType: "short",
    category: "Air Science & AQI",
    src: "https://www.youtube.com/shorts/XpJwB3-vX1c",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Winter Smog", "Temperature Inversion", "Air Audit"],
  },
  {
    id: "l8dBp8_P32U",
    title: "CADR, Decoded: Find the Right Air Purifier for Your Space",
    description:
      "How Clean Air Delivery Rate (CADR), room volume, and air changes per hour determine whether a purifier actually performs.",
    mediaType: "short",
    category: "Air Science & AQI",
    src: "https://www.youtube.com/shorts/l8dBp8_P32U",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["CADR", "Buying Guide", "Air Purifier Science"],
  },
  {
    id: "3K4GSlzYYzs",
    title: "Before You Buy a Purifier, Audit Your Air",
    description:
      "Why diagnosing specific pollutants, airflow patterns, and occupancy comes before selecting hardware.",
    mediaType: "short",
    category: "Air Audits",
    src: "https://www.youtube.com/shorts/3K4GSlzYYzs",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Air Audit", "Healthy Indoor Air", "Purifier Selection"],
  },
  {
    id: "DEOUAd5VYyQ",
    title: "Inside PepsiCo Gurugram: What Is Really in the Office Air",
    description:
      "A look inside a live enterprise air assessment at PepsiCo Gurugram and what the indoor metrics show.",
    mediaType: "short",
    category: "Office & Commercial",
    src: "https://www.youtube.com/shorts/DEOUAd5VYyQ",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Corporate Air Audit", "PepsiCo Gurugram", "Office AQI"],
  },
  {
    id: "8C6UXoqgS0w",
    title: "Are You Safe From Air Pollution on the 14th Floor?",
    description:
      "Testing the high-rise myth: why elevated apartments still experience severe PM2.5 infiltration.",
    mediaType: "short",
    category: "Home & Lifestyle",
    src: "https://www.youtube.com/shorts/8C6UXoqgS0w",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["High-Rise Living", "PM2.5", "AQI Myth"],
  },
  {
    id: "xznfFyeAPoI",
    title: "The Real Fix for Office Air (Not a Desk Purifier)",
    description:
      "Why small standalone desk units fall short in open offices—and how centralized HVAC-integrated purification scales.",
    mediaType: "short",
    category: "Office & Commercial",
    src: "https://www.youtube.com/shorts/xznfFyeAPoI",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Commercial HVAC", "Office Purification", "Air Audit"],
  },
  {
    id: "PEZGh8rmCQ8",
    title: "PM2.5 Is Not the Only Number That Matters",
    description:
      "Looking beyond particulate counts to CO₂, VOCs, microbial loads, and how each affects focus and health.",
    mediaType: "short",
    category: "Air Science & AQI",
    src: "https://www.youtube.com/shorts/PEZGh8rmCQ8",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["PM2.5", "VOCs & CO2", "Air Science"],
  },
  {
    id: "P6Chct9ZFCk",
    title: "Air Purifiers Are Not Just for Pollution Season",
    description:
      "Understanding year-round indoor triggers—dust, allergens, bio-aerosols, and off-gassing—beyond peak AQI months.",
    mediaType: "short",
    category: "Air Science & AQI",
    src: "https://www.youtube.com/shorts/P6Chct9ZFCk",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Year-Round Protection", "Indoor Air Quality", "AQI"],
  },
  {
    id: "lz6XPp9JhsE",
    title: "Stop Opening Windows for Fresh Air — Do This Instead",
    description:
      "When outdoor AQI is elevated, opening windows worsens indoor exposure. Here is how to ventilate safely.",
    mediaType: "short",
    category: "Home & Lifestyle",
    src: "https://www.youtube.com/shorts/lz6XPp9JhsE",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Ventilation", "Home Air Audit", "Fresh Air"],
  },
  {
    id: "U8Ij_MeD4Gg",
    title: "Animal Farm Air Truth | Un-Scripted Air Audit with Kartik",
    description:
      "An un-scripted field audit examining biological particulates, odours, and air quality realities in animal care environments.",
    mediaType: "short",
    category: "Air Audits",
    src: "https://www.youtube.com/shorts/U8Ij_MeD4Gg",
    speaker: "Kartik (Founder's Perspective)",
    tags: ["Field Air Audit", "Bio-Aerosols", "Healthy Indoor Air"],
  },
];

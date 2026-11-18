import type { Metadata } from "next";

import {
  AIR_LIBRARY_ITEMS,
  AirLibraryPage,
  extractYouTubeId,
  getMediaThumbnail,
  getYouTubeEmbedUrl,
  getYouTubeExternalUrl,
} from "@/features/air-library";

export const metadata: Metadata = {
  title: "The Air Library — Videos, Air Audits & Visual Archive | O₂Cure",
  description:
    "Explore O₂Cure's organised media library of un-scripted indoor air audits, commercial & residential air quality insights, and visual case studies.",
  keywords: [
    "O2Cure Air Library",
    "indoor air quality videos",
    "air audit shorts",
    "air purifier India videos",
    "O2Cure YouTube shorts",
    "indoor air science",
  ],
  alternates: {
    canonical: "https://o2cure.in/air-library",
  },
  openGraph: {
    title: "The Air Library — Videos, Air Audits & Visual Archive | O₂Cure",
    description:
      "Watch un-scripted indoor air audits, office & gym air insights, and indoor air science from O₂Cure.",
    url: "https://o2cure.in/air-library",
    siteName: "O₂Cure",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Air Library | O₂Cure",
    description:
      "Watch un-scripted indoor air audits, office & gym air insights, and indoor air science from O₂Cure.",
  },
};

function getAirLibraryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "The Air Library | O₂Cure",
    description:
      "Organised media library of indoor air audits, air quality science videos, and visual field documentation from O₂Cure.",
    url: "https://o2cure.in/air-library",
    publisher: {
      "@type": "Organization",
      "@id": "https://o2cure.in/#organization",
      name: "O₂Cure",
      url: "https://o2cure.in",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: AIR_LIBRARY_ITEMS.filter(
        (item) => item.mediaType !== "image",
      ).map((item, index) => {
        const videoId = extractYouTubeId(item.src);
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "VideoObject",
            name: item.title,
            description: item.description ?? item.title,
            thumbnailUrl: getMediaThumbnail(item),
            embedUrl: getYouTubeEmbedUrl(videoId, false),
            contentUrl: getYouTubeExternalUrl(item),
          },
        };
      }),
    },
  };
}

export default function AirLibraryRoute() {
  const jsonLd = getAirLibraryJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AirLibraryPage />
    </>
  );
}

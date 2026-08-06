import type { Metadata } from "next";

import { ClientelePage } from "@/features/clientele";

export const metadata: Metadata = {
  title: "Our Clientele | O₂Cure — Trusted by India's Leading Organisations",
  description:
    "Discover 700+ enterprise installations across government, healthcare, hospitality, corporate and more. O₂Cure is India's most trusted indoor air quality partner.",
  openGraph: {
    title: "Our Clientele | O₂Cure",
    description:
      "700+ enterprise installations. Trusted by India's most demanding environments — from AIIMS to Taj Hotels.",
    url: "https://o2cure.in/clientele",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Clientele | O₂Cure",
    description:
      "700+ enterprise installations. Trusted by India's most demanding environments.",
  },
  alternates: {
    canonical: "https://o2cure.in/clientele",
  },
};

export default function ClientelePageRoute() {
  return <ClientelePage />;
}

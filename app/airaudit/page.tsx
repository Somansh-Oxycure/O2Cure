import type { Metadata } from "next";

import { LandingGTM } from "@/components/analytics/LandingGTM";
import {
  AuditFaqSection,
  AuditFooter,
  AuditHeroSection,
  AuditStatsStrip,
  AuditStepsSection,
  SpaceCardsSection,
  TrustedBySection,
} from "@/features/audit";

export const metadata: Metadata = {
  title: "Free Indoor Air Quality Audit in Delhi NCR | O₂Cure",
  description:
    "Book a free on-site indoor air quality audit in Delhi NCR. We measure PM2.5, CO2 and VOCs and design a fix that works with your current set up. Response within 24 hours.",
  alternates: { canonical: "https://o2cure.in/airaudit" },
  openGraph: {
    title: "Book A Free Air Audit | O₂Cure",
    description:
      "A certified air quality engineer will respond within 24 hours.",
    type: "website",
    url: "https://o2cure.in/airaudit",
    siteName: "O₂Cure",
    images: [{ url: "/O2cure-final-logo.png", width: 1200, height: 630, alt: "O₂Cure" }],
  },
};

export default function AirAuditPage() {
  return (
    <>
      <LandingGTM />
      <main id="airaudit-main" className="flex min-h-screen flex-col bg-background">
        <AuditHeroSection />
        <AuditStatsStrip />
        <SpaceCardsSection />
        <AuditStepsSection />
        <TrustedBySection />
        <AuditFaqSection />
        <AuditFooter />
      </main>
    </>
  );
}

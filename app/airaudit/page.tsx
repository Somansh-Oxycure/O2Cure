import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { LandingGTM } from "@/components/analytics/LandingGTM";
import { AuditHeroSection } from "@/features/audit/components/AuditHeroSection";

const AuditStatsStrip = dynamic(() =>
  import("@/features/audit/components/AuditStatsStrip").then((m) => m.AuditStatsStrip)
);
const SpaceCardsSection = dynamic(() =>
  import("@/features/audit/components/SpaceCardsSection").then((m) => m.SpaceCardsSection)
);
const AuditStepsSection = dynamic(() =>
  import("@/features/audit/components/AuditStepsSection").then((m) => m.AuditStepsSection)
);
const TrustedBySection = dynamic(() =>
  import("@/features/audit/components/TrustedBySection").then((m) => m.TrustedBySection)
);
const AuditFaqSection = dynamic(() =>
  import("@/features/audit/components/AuditFaqSection").then((m) => m.AuditFaqSection)
);
const AuditFooter = dynamic(() =>
  import("@/features/audit/components/AuditFooter").then((m) => m.AuditFooter)
);

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

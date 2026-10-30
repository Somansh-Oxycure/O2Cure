import type { Metadata } from "next";

import { LandingGTM } from "@/components/analytics/LandingGTM";
import { ThankYouView } from "@/features/audit";

export const metadata: Metadata = {
  title: "Thank You | Free Air Quality Audit Booked | O₂Cure",
  description:
    "Your free indoor air quality audit request has been confirmed. A certified O₂Cure engineer will contact you within 24 hours.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtm.js?id=GTM-5FPLF3W6"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
`,
        }}
      />
      <LandingGTM />
      <ThankYouView />
    </>
  );
}

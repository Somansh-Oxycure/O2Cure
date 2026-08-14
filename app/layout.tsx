/* eslint-disable @next/next/next-script-for-ga */
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";

import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import SplashCursor from "@/components/motion/SplashCursor";
import { MotionConfigProvider } from "@/components/providers/MotionConfigProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { getOrganizationJsonLd } from "@/lib/seo/jsonld";
import { defaultMetadata } from "@/lib/seo/metadata";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = getOrganizationJsonLd();

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K8KCCK99');`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K8KCCK99"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <SmoothScrollProvider>
          <MotionConfigProvider>
            <SplashCursor
              DENSITY_DISSIPATION={3}
              VELOCITY_DISSIPATION={7}
              PRESSURE={0.45}
              CURL={2}
              SPLAT_RADIUS={0.07}
              SPLAT_FORCE={1500}
              COLOR_UPDATE_SPEED={30}
              RAINBOW_MODE={false}
              COLOR="#056473"
            />
            <Navbar />
            {children}
            <WhatsAppButton />
          </MotionConfigProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

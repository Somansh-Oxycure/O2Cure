import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

import { Navbar } from "@/components/layout/Navbar";
import SplashCursor from "@/components/motion/SplashCursor";
import { MotionConfigProvider } from "@/components/providers/MotionConfigProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { getOrganizationJsonLd } from "@/lib/seo/jsonld";
import { defaultMetadata } from "@/lib/seo/metadata";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
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
          </MotionConfigProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

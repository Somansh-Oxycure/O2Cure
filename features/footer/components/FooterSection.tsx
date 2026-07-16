"use client";

import { AnimatedGradientDivider } from "@/features/footer/components/AnimatedGradientDivider";
import { FooterBottomBar } from "@/features/footer/components/FooterBottomBar";
import { FooterNavigation } from "@/features/footer/components/FooterNavigation";
import { FooterParticles } from "@/features/footer/components/FooterParticles";
import { footerContent } from "@/features/footer/content";
import type { FooterContent } from "@/features/footer/types";

interface FooterSectionProps {
  content?: FooterContent;
}

/**
 * Chapter 9 — the calm final chapter of the homepage.
 * Story bridge: contact fades; particles thin; background brightens;
 * navigation and legal information.
 */
export function FooterSection({ content = footerContent }: FooterSectionProps) {
  return (
    <>
      {/* Story bridge — atmosphere brightens as CTA section recedes */}
      <div
        aria-hidden
        className="pointer-events-none relative h-[clamp(2rem,5vh,3rem)] overflow-hidden bg-background"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.92) 0%, rgba(248, 252, 255, 0.98) 55%, rgba(255, 255, 255, 1) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-full opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(180, 230, 215, 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <footer
        aria-label="Footer"
        className="relative bg-background pb-[clamp(2.5rem,5vw,4.5rem)] pt-[clamp(2rem,4vw,3.5rem)]"
      >
        <FooterParticles />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(180, 230, 215, 0.05) 0%, transparent 60%)",
          }}
        />

        <div className="relative px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
          <div className="mx-auto max-w-7xl">
            <div>
              <FooterNavigation groups={content.navigation} />
            </div>

            <AnimatedGradientDivider className="mx-auto mt-[clamp(2.5rem,5vw,4rem)] max-w-5xl" />

            <div className="mt-6 sm:mt-8">
              <FooterBottomBar
                legal={content.legal}
                socialLinks={content.socialLinks}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}


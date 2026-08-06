"use client";

import Image from "next/image";
import { AnimatedGradientDivider } from "@/features/footer/components/AnimatedGradientDivider";
import { FooterBottomBar } from "@/features/footer/components/FooterBottomBar";
import { FooterNavigation } from "@/features/footer/components/FooterNavigation";
import { FooterParticles } from "@/features/footer/components/FooterParticles";
import { SocialIcon } from "@/features/footer/components/SocialIcon";
import { footerContent } from "@/features/footer/content";
import type { FooterContent } from "@/features/footer/types";
import { formatBrandText } from "@/lib/brand";

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
        id="site-footer"
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
            <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
              <div className="flex max-w-xs flex-col items-start">
                <Image
                  src="/O2cure-final-logo.png"
                  alt="O2Cure"
                  width={160}
                  height={160}
                  priority
                  className="h-12 w-auto object-contain sm:h-14 lg:h-16"
                />
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground/80 font-medium">
                  {formatBrandText(content.hero.supporting)}
                </p>
                <div className="mt-8 flex items-center gap-5">
                  {content.socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="text-brand-green/80 transition-colors duration-300 hover:text-brand-green"
                    >
                      <SocialIcon platform={link.platform} className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex-1 lg:max-w-4xl">
                <FooterNavigation groups={content.navigation} />
              </div>
            </div>

            <AnimatedGradientDivider className="mx-auto mt-[clamp(2.5rem,5vw,4rem)] max-w-7xl" />

            <div className="mt-6 sm:mt-8">
              <FooterBottomBar
                legal={content.legal}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}


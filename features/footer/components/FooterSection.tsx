"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import { AnimatedGradientDivider } from "@/features/footer/components/AnimatedGradientDivider";
import { FooterBottomBar } from "@/features/footer/components/FooterBottomBar";
import { FooterNavigation } from "@/features/footer/components/FooterNavigation";
import { FooterParticles } from "@/features/footer/components/FooterParticles";
import { NewsletterSignup } from "@/features/footer/components/NewsletterSignup";
import { footerContent } from "@/features/footer/content";
import type { FooterContent } from "@/features/footer/types";

interface FooterSectionProps {
  content?: FooterContent;
}

/**
 * Chapter 9 — the calm final chapter of the homepage.
 * Story bridge: contact fades; particles thin; background brightens;
 * editorial statement leads before navigation and legal information.
 */
export function FooterSection({ content = footerContent }: FooterSectionProps) {
  const prefersReducedMotion = useReducedMotion();

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
        aria-labelledby="footer-hero-heading"
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
            {/* Hero statement — emotional ending before navigation */}
            <div className="mx-auto max-w-3xl text-center">
              <Reveal delay={0} distance={24} amount={0.25}>
                <h2
                  id="footer-hero-heading"
                  className="font-heading text-display text-foreground"
                >
                  {content.hero.headline}
                </h2>
              </Reveal>

              <Reveal delay={0.18} distance={20} amount={0.25}>
                <p className="mx-auto mt-4 max-w-2xl text-body-lg leading-relaxed text-muted-foreground sm:mt-5">
                  {content.hero.supporting}
                </p>
              </Reveal>

              <Reveal delay={0.34} distance={16} amount={0.25}>
                <motion.div
                  className="mt-6 sm:mt-8"
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.02 }
                  }
                  whileTap={
                    prefersReducedMotion ? undefined : { scale: 0.98 }
                  }
                  transition={{
                    duration: durations.fast,
                    ease: easings.premium,
                  }}
                >
                  <Button
                    type="button"
                    size="lg"
                    disabled={!content.hero.cta.isActive}
                    aria-disabled={!content.hero.cta.isActive}
                    className="min-w-[11rem] rounded-full border border-brand-green bg-transparent px-7 text-brand-green hover:bg-brand-green/10 hover:text-brand-green disabled:opacity-70"
                  >
                    {content.hero.cta.label}
                  </Button>
                </motion.div>
              </Reveal>
            </div>

            <AnimatedGradientDivider className="mx-auto mt-[clamp(2.5rem,5vw,4.5rem)] max-w-4xl" />

            <div className="mt-[clamp(2rem,4vw,3.5rem)]">
              <FooterNavigation groups={content.navigation} />
            </div>

            <div className="mt-[clamp(2.5rem,5vw,4.5rem)]">
              <NewsletterSignup content={content.newsletter} />
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

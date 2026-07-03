"use client";

import { Reveal } from "@/components/motion/Reveal";
import { SocialIcon } from "@/features/footer/components/SocialIcon";
import type {
  FooterLegalContent,
  FooterSocialLink,
} from "@/features/footer/types";
import { cn } from "@/lib/utils";

interface FooterBottomBarProps {
  legal: FooterLegalContent;
  socialLinks: FooterSocialLink[];
  revealDelay?: number;
  className?: string;
}

export function FooterBottomBar({
  legal,
  socialLinks,
  revealDelay = 0.68,
  className,
}: FooterBottomBarProps) {
  return (
    <Reveal delay={revealDelay} distance={14} amount={0.3}>
      <div
        className={cn(
          "flex flex-col items-center gap-6 text-center text-sm text-muted-foreground sm:gap-4 md:flex-row md:justify-between md:text-left",
          className,
        )}
      >
        <p className="order-1 md:order-none">{legal.copyright}</p>

        <p className="order-2 max-w-xs md:order-none md:max-w-none md:text-center">
          {legal.tagline}
        </p>

        <ul className="order-3 flex items-center gap-5 md:order-none">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground transition-colors duration-300 ease-premium hover:text-brand-blue"
              >
                <SocialIcon platform={link.platform} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

"use client";

import { Reveal } from "@/components/motion/Reveal";
import { SocialIcon } from "@/features/footer/components/SocialIcon";
import type {
  FooterLegalContent,
  FooterSocialLink,
} from "@/features/footer/types";
import { cn } from "@/lib/utils";
import { formatBrandText } from "@/lib/brand";

interface FooterBottomBarProps {
  legal: FooterLegalContent;
  revealDelay?: number;
  className?: string;
}

export function FooterBottomBar({
  legal,
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
        <p className="order-1 md:order-none">{formatBrandText(legal.copyright)}</p>

        <p className="order-2 max-w-xs md:order-none md:max-w-none md:text-center">
          {formatBrandText(legal.tagline)}
        </p>
      </div>
    </Reveal>
  );
}

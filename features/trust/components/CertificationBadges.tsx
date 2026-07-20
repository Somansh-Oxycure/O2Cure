"use client";

import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

import type { Certification } from "@/features/trust/types";

interface CertificationBadgesProps {
  certifications: Certification[];
}

function CertificationBadge({ certification }: { certification: Certification }) {
  const hasImage = Boolean(certification.badge.src);

  return (
    <li className="flex items-center justify-center">
      {hasImage ? (
        <Image
          src={certification.badge.src}
          alt={certification.badge.alt}
          width={certification.badge.width ?? 72}
          height={certification.badge.height ?? 72}
          className="h-12 w-auto max-w-[6rem] object-contain transition-transform duration-300 hover:scale-105 sm:h-16 sm:max-w-[8rem] lg:h-20 lg:max-w-[10rem]"
        />
      ) : (
        <span
          className={cn(
            "inline-flex min-w-[3.25rem] items-center justify-center rounded-md border border-border/60 px-3 py-1.5",
            "text-eyebrow font-medium tracking-[0.16em] text-muted-foreground",
            "transition-colors duration-500 ease-premium hover:text-foreground",
          )}
        >
          {certification.name}
        </span>
      )}
    </li>
  );
}

/**
 * Clean horizontal certification row — monochrome, restrained scale.
 */
export function CertificationBadges({ certifications }: CertificationBadgesProps) {
  return (
    <Reveal delay={0.1} distance={16} amount={0.3}>
      <ul
        className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-5 sm:gap-8 lg:gap-12"
        aria-label="Certifications"
      >
        {certifications.map((certification) => (
          <CertificationBadge key={certification.id} certification={certification} />
        ))}
      </ul>
    </Reveal>
  );
}

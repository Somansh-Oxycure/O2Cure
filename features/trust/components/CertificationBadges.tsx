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
          className="h-10 w-auto max-w-[4.5rem] object-contain grayscale opacity-70 transition-[filter,opacity] duration-500 ease-premium hover:grayscale-0 hover:opacity-100 sm:h-11"
        />
      ) : (
        <span
          className={cn(
            "inline-flex min-w-[3.25rem] items-center justify-center rounded-md border border-border/60 px-3 py-1.5",
            "text-eyebrow font-medium uppercase tracking-[0.16em] text-muted-foreground",
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
        className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-8 sm:gap-10 lg:gap-12"
        aria-label="Certifications"
      >
        {certifications.map((certification) => (
          <CertificationBadge key={certification.id} certification={certification} />
        ))}
      </ul>
    </Reveal>
  );
}

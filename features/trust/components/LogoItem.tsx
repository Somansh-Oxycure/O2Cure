"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import type { ClientLogo } from "@/features/trust/types";

interface LogoItemProps {
  logo: ClientLogo;
  className?: string;
}

/**
 * Single logo slot — monochrome by default, full colour and slightly
 * brighter on hover. No card chrome; the mark itself carries the rhythm.
 */
export function LogoItem({ logo, className }: LogoItemProps) {
  const hasImage = Boolean(logo.logo.src);

  const content = hasImage ? (
    <Image
      src={logo.logo.src}
      alt={logo.logo.alt}
      width={logo.logo.width ?? 160}
      height={logo.logo.height ?? 48}
      className={cn(
        "h-full w-full max-h-10 max-w-[9rem] object-contain sm:max-h-11 sm:max-w-[10rem]",
        logo.className
      )}
    />
  ) : (
    <span
      aria-hidden
      className="font-heading text-sm font-medium tracking-tight text-muted-foreground transition-colors duration-500 ease-premium group-hover:text-brand-blue sm:text-base"
    >
      {logo.name}
    </span>
  );

  const sharedClasses = cn(
    "group flex h-[clamp(3.5rem,8vw,5rem)] items-center justify-center px-2 transition-[filter,opacity] duration-500 ease-premium",
    hasImage
      ? "opacity-85 hover:opacity-100"
      : "opacity-80 hover:opacity-100",
    className,
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        className={sharedClasses}
        aria-label={logo.name}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <div className={sharedClasses} aria-label={logo.name}>
      {content}
    </div>
  );
}

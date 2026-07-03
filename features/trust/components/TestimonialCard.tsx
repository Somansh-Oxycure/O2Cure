"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import type { Testimonial } from "@/features/trust/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

function AvatarPlaceholder({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const hasImage = Boolean(testimonial.avatar.src);
  const initials = testimonial.clientName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (hasImage) {
    return (
      <Image
        src={testimonial.avatar.src}
        alt={testimonial.avatar.alt}
        width={testimonial.avatar.width ?? 48}
        height={testimonial.avatar.height ?? 48}
        className="size-12 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="flex size-12 items-center justify-center rounded-full bg-secondary text-xs font-medium tracking-wide text-muted-foreground"
    >
      {initials}
    </div>
  );
}

/**
 * Premium testimonial placeholder — short quote, attribution, avatar slot.
 */
export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-between rounded-2xl bg-secondary/35 px-7 py-8 sm:px-8 sm:py-9",
        className,
      )}
    >
      <blockquote className="line-clamp-3 font-heading text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed text-foreground">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4">
        <AvatarPlaceholder testimonial={testimonial} />
        <div>
          <p className="text-sm font-medium text-foreground">
            {testimonial.clientName}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

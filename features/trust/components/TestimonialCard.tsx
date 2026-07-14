"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import type { Testimonial } from "@/features/trust/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

/** Five-star row */
function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={cn(
            "size-4 transition-colors",
            i < rating ? "text-amber-400" : "text-border",
          )}
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/** Avatar with initial fallback */
function Avatar({ testimonial }: { testimonial: Testimonial }) {
  const hasImage = Boolean(testimonial.avatar.src);

  // Generate a deterministic hue from the name for a unique gradient per person
  const hue = testimonial.clientName
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;

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
        className="size-12 rounded-full object-cover ring-2 ring-white/20"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="flex size-12 items-center justify-center rounded-full text-sm font-semibold text-white shadow-md ring-2 ring-white/20"
      style={{
        background: `linear-gradient(135deg, hsl(${hue},55%,48%), hsl(${(hue + 40) % 360},55%,40%))`,
      }}
    >
      {initials}
    </div>
  );
}

/**
 * Premium testimonial card — glassmorphism accent border,
 * star rating, large quote icon, gradient shimmer on hover.
 */
export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-white px-7 py-8 shadow-soft transition-shadow duration-500 ease-premium hover:shadow-elevated sm:px-8 sm:py-9",
        className,
      )}
    >
      {/* Accent top-edge gradient */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-brand-green via-brand-blue to-brand-green bg-[length:200%_100%] transition-[background-position] duration-700 group-hover:bg-[position:100%_0]"
      />

      {/* Subtle corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-brand-blue/6 blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Large quote mark */}
      <div aria-hidden className="mb-5 text-brand-blue/15 leading-none">
        <svg
          width="42"
          height="32"
          viewBox="0 0 42 32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 32V19.2C0 8.533 6.133 2.133 18.4 0l2.133 3.467C13.867 4.8 10.133 8 9.6 13.333H18.4V32H0Zm22.4 0V19.2C22.4 8.533 28.533 2.133 40.8 0L42.933 3.467C36.267 4.8 32.533 8 32 13.333H40.8V32H22.4Z" />
        </svg>
      </div>

      {/* Stars */}
      <StarRating rating={testimonial.rating} />

      {/* Quote */}
      <blockquote className="mt-4 flex-1 text-[clamp(0.9375rem,0.875rem+0.3vw,1.0625rem)] leading-relaxed text-foreground/85 line-clamp-3 min-h-[4.5rem] sm:min-h-[5rem] lg:min-h-[5.25rem] overflow-hidden text-ellipsis">
        {testimonial.quote}
      </blockquote>

      {/* Attribution */}
      <figcaption className="mt-7 flex items-center gap-3.5 border-t border-border/30 pt-6">
        <Avatar testimonial={testimonial} />
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.clientName}
          </p>
          {testimonial.role && (
            <p className="mt-0.5 text-xs text-brand-blue font-medium">
              {testimonial.role}
            </p>
          )}
          <p className="mt-0.5 text-xs text-muted-foreground">
            {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

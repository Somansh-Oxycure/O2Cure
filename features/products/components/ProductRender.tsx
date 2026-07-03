"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import type { ProductRenderVariant } from "@/features/products/types";

interface ProductRenderProps {
  /** When set, replaces the SVG placeholder — layout unchanged. */
  src?: string;
  alt: string;
  variant: ProductRenderVariant;
  isActive?: boolean;
  className?: string;
}

const SILHOUETTES: Record<
  ProductRenderVariant,
  { body: string; accent?: string; detail?: string }
> = {
  tower: {
    body: "M 168 118 L 192 118 Q 198 118 200 124 L 208 360 Q 210 388 200 392 L 152 392 Q 142 388 144 360 Z",
    accent: "M 156 148 L 196 148 L 194 328 L 158 328 Z",
    detail: "M 176 108 Q 180 96 184 108",
  },
  slim: {
    body: "M 178 108 L 198 108 Q 204 108 206 116 L 214 368 Q 216 388 200 392 L 168 392 Q 152 388 154 368 L 162 116 Q 164 108 170 108 Z",
    accent: "M 168 140 L 200 140 L 198 340 L 170 340 Z",
  },
  console: {
    body: "M 118 248 L 282 248 Q 292 248 294 258 L 298 318 Q 300 338 280 342 L 120 342 Q 100 338 102 318 L 106 258 Q 108 248 118 248 Z",
    accent: "M 132 262 L 268 262 L 266 322 L 134 322 Z",
    detail: "M 148 228 L 252 228 Q 260 220 252 212 L 148 212 Q 140 220 148 228",
  },
  clinical: {
    body: "M 160 124 L 200 108 L 240 124 L 248 360 Q 250 388 200 396 Q 150 388 152 360 Z",
    accent: "M 172 156 L 228 156 L 224 340 L 176 340 Z",
    detail: "M 188 96 L 212 96",
  },
  compact: {
    body: "M 148 168 Q 200 148 252 168 L 260 328 Q 262 352 200 360 Q 138 352 140 328 Z",
    accent: "M 162 188 L 238 188 L 234 312 L 166 312 Z",
  },
};

/**
 * Fixed-aspect render slot. Drop a `src` on the product record to swap in
 * photography or 3D renders — the container dimensions never change.
 */
export function ProductRender({
  src,
  alt,
  variant,
  isActive = false,
  className,
}: ProductRenderProps) {
  return (
    <div
      data-slot="product-render"
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-2xl",
        "bg-gradient-to-b from-world-pure via-background to-accent/20",
        "ring-1 ring-border/50",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isActive ? 1 : 0.65,
          background: isActive
            ? "radial-gradient(ellipse 75% 65% at 50% 38%, rgba(120, 210, 185, 0.16) 0%, rgba(180, 230, 215, 0.06) 50%, transparent 72%)"
            : "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.55 0.12 248 / 0.06) 0%, transparent 70%)",
        }}
      />

      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 85vw, 320px"
          className="object-contain object-center p-6 sm:p-8"
          priority={isActive}
        />
      ) : (
        <PlaceholderSilhouette variant={variant} isActive={isActive} />
      )}

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent",
          "transition-opacity duration-700",
          isActive ? "opacity-40" : "opacity-70",
        )}
      />
    </div>
  );
}

function PlaceholderSilhouette({
  variant,
  isActive,
}: {
  variant: ProductRenderVariant;
  isActive: boolean;
}) {
  const shape = SILHOUETTES[variant];

  return (
    <svg
      viewBox="0 0 400 420"
      className="absolute inset-0 h-full w-full p-[12%]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`product-body-${variant}`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.98 0.008 240 / 0.9)" />
          <stop offset="55%" stopColor="oklch(0.9 0.02 240 / 0.45)" />
          <stop offset="100%" stopColor="oklch(0.82 0.05 235 / 0.2)" />
        </linearGradient>
        <linearGradient id={`product-accent-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.55 0.12 248 / 0.35)" />
          <stop offset="100%" stopColor="rgba(120, 210, 185, 0.25)" />
        </linearGradient>
        <filter id={`product-glow-${variant}`}>
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse
        cx="200"
        cy="368"
        rx="72"
        ry="10"
        fill="oklch(0 0 0 / 0.06)"
        opacity={isActive ? 0.9 : 0.5}
      />

      <path
        d={shape.body}
        fill={`url(#product-body-${variant})`}
        stroke="oklch(0.82 0.05 235 / 0.5)"
        strokeWidth="1"
        filter={isActive ? `url(#product-glow-${variant})` : undefined}
        opacity={isActive ? 1 : 0.75}
      />

      {shape.accent ? (
        <path
          d={shape.accent}
          fill={`url(#product-accent-${variant})`}
          opacity={isActive ? 0.85 : 0.55}
        />
      ) : null}

      {shape.detail ? (
        <path
          d={shape.detail}
          stroke="oklch(0.75 0.08 244 / 0.45)"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity={isActive ? 0.8 : 0.45}
        />
      ) : null}
    </svg>
  );
}

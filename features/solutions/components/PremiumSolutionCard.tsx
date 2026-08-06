"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductEntry } from "@/features/solutions/data/productCatalog";

interface SolutionCardProps {
  product: ProductEntry;
  index: number;
}

/**
 * SolutionCard — curiosity-first teaser.
 *
 * Mobile  (< md): Landscape layout — image left, content right.
 *   ┌──────────────────────────────────────────────┐
 *   │  ┌─────────────┐  [In-Duct]                  │
 *   │  │             │  REME HALO® Purifier         │
 *   │  │   Image     │  Advanced oxidation plasma…  │
 *   │  │             │  [NABL] [AOP]                │
 *   │  └─────────────┘  Up to 6,500 sq ft  Explore →│
 *   └──────────────────────────────────────────────┘
 *
 * Desktop (≥ md): Original vertical card layout.
 *   ┌────────────────────────────────┐
 *   │  [Integration tag]             │
 *   │                                │
 *   │      Product image             │
 *   │                                │
 *   │  Name                          │
 *   │  One-line hook                 │
 *   │  · Badge · Badge               │
 *   │  Coverage              Explore →│
 *   └────────────────────────────────┘
 */
export function SolutionCard({ product, index }: SolutionCardProps) {
  return (
    <Link
      href={`/solutions/${product.id}`}
      className="block"
      aria-label={`View ${product.systemName} details`}
    >
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{
          duration: 0.35,
          delay: index * 0.04,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
          "group relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-white cursor-pointer",
          "shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300",
          "hover:border-[#3A7D2A]/40 hover:shadow-[0_4px_16px_rgba(58,125,42,0.08)]",
          // Mobile: horizontal landscape; Desktop: vertical stack
          "flex flex-row md:flex-col"
        )}
        aria-label={product.systemName}
      >
        {/* ══════════════════════════════════════════════
            IMAGE ZONE
            Mobile: 38% width, full card height (flex-stretch)
            Desktop: full width, 3:2 aspect ratio
            ══════════════════════════════════════════════ */}
        <div
          className={cn(
            "relative shrink-0 overflow-hidden",
            "bg-gradient-to-b from-[#FAFAFA] to-[#F5F5F4]",
            // Mobile: fixed portion width; Desktop: full width + aspect
            "w-[38%] md:w-full md:[aspect-ratio:3/2]"
          )}
        >
          {/* Ambient brand glow on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 65%, rgba(58,125,42,0.05) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          {product.image.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.image.src}
              alt={product.image.alt}
              className={cn(
                "absolute inset-0 h-full w-full object-contain transition-transform duration-500",
                "p-3 md:p-5",
                "group-hover:scale-[1.03]"
              )}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E7EB] md:h-16 md:w-16">
                <span className="text-sm font-bold text-[#9CA3AF] md:text-xl">
                  {product.systemName.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Integration type badge */}
          <span
            className={cn(
              "absolute rounded-full border border-[#E5E7EB] bg-white/90 font-semibold uppercase tracking-[0.07em] text-[#6B7280] backdrop-blur-sm",
              // Mobile: smaller, tighter
              "left-2 top-2 px-1.5 py-0.5 text-[0.5rem]",
              // Desktop: a touch larger
              "md:left-2.5 md:top-2.5 md:px-2 md:py-0.5 md:text-[0.55rem] md:tracking-[0.08em]"
            )}
          >
            {integrationLabel(product.integrationType)}
          </span>
        </div>

        {/* ══════════════════════════════════════════════
            CONTENT ZONE
            ══════════════════════════════════════════════ */}
        <div className="flex flex-1 min-w-0 flex-col gap-2 p-3 md:gap-2.5 md:p-3.5">
          {/* Name + tagline */}
          <div>
            <h3 className="text-[0.88rem] font-bold leading-snug tracking-[-0.02em] text-[#1C1C1C] md:text-[0.9rem]">
              {product.systemName}
            </h3>
            <p className="mt-0.5 text-[0.7rem] leading-[1.45] text-[#9CA3AF] line-clamp-2 md:text-[0.75rem]">
              {product.tagline}
            </p>
          </div>

          {/* Science badges — 2 max for scannability */}
          <div className="flex flex-wrap gap-1">
            {product.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[#3A7D2A]/12 bg-[#EAF5E4] px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.05em] text-[#2A5C1D]"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Footer row — coverage + explore CTA */}
          <div className="mt-auto flex items-center justify-between border-t border-[#F5F5F4] pt-2">
            <span className="text-[0.65rem] font-semibold text-[#6B7280] md:text-[0.72rem]">
              {coverageLabel(product.capacityMaxSqFt)}
            </span>
            <span
              className={cn(
                "flex items-center gap-1 font-semibold",
                "text-[0.7rem] text-[#3A7D2A] transition-all duration-300 md:text-[0.72rem]",
                "group-hover:gap-2"
              )}
              aria-hidden
            >
              Explore
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function integrationLabel(type: string): string {
  const map: Record<string, string> = {
    "in-duct": "In-Duct",
    standalone: "Standalone",
    portable: "Portable",
    "fresh-air": "Fresh Air",
  };
  return map[type] ?? type;
}

function coverageLabel(sqFt: number): string {
  if (sqFt >= 10000) return `Up to ${(sqFt / 1000).toFixed(0)}k sq. ft.`;
  return `Up to ${sqFt.toLocaleString()} sq. ft.`;
}

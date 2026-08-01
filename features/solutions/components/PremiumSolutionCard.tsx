"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
 * ┌────────────────────────────────┐
 * │  [Integration tag]             │
 * │                                │
 * │      Product image             │
 * │                                │
 * │  Name                          │
 * │  One-line hook                 │
 * │  · Badge · Badge               │
 * │                        →       │
 * └────────────────────────────────┘
 *
 * Intentionally minimal — drives user to the product detail page.
 */
export function SolutionCard({ product, index }: SolutionCardProps) {
  return (
    <Link href={`/solutions/${product.id}`} className="block" aria-label={`View ${product.systemName} details`}>
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-white cursor-pointer
        shadow-[0_1px_2px_rgba(0,0,0,0.03)]
        transition-colors duration-300
        hover:border-[#3A7D2A]/50 hover:bg-[#FAFAFA]"
      aria-label={product.systemName}
    >
      {/* ── Product image ────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#FAFAFA] to-[#F5F5F4]"
        style={{ aspectRatio: "3/2" }}
      >
        {/* Ambient glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(ellipse 60% 55% at 50% 65%, rgba(58,125,42,0.04) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        {product.image.src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.image.src}
            alt={product.image.alt}
            className="absolute inset-0 h-full w-full object-contain p-5"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-5 opacity-40">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E5E7EB]">
              <span className="text-xl font-bold text-[#9CA3AF]">
                {product.systemName.substring(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Integration type — top-left */}
        <span className="absolute left-2.5 top-2.5 rounded-full border border-[#E5E7EB] bg-white/90 px-2 py-0.5
          text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-[#6B7280] backdrop-blur-sm">
          {integrationLabel(product.integrationType)}
        </span>
      </div>

      {/* ── Card body ────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        {/* Name + tagline */}
        <div>
          <h3 className="text-[0.9rem] font-bold leading-snug tracking-[-0.02em] text-[#1C1C1C]">
            {product.systemName}
          </h3>
          <p className="mt-1 text-[0.75rem] leading-[1.5] text-[#9CA3AF] line-clamp-2">
            {product.tagline}
          </p>
        </div>

        {/* Top 2 badges only — keeps it scannable */}
        <div className="flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-[#3A7D2A]/12 bg-[#EAF5E4] px-2.5 py-0.5
                text-[0.6rem] font-semibold uppercase tracking-[0.06em] text-[#2A5C1D]"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Explore link — pushed to bottom */}
        <div className="mt-auto flex items-center justify-between pt-1 border-t border-[#F5F5F4]">
          <span className="text-[0.72rem] font-semibold text-[#6B7280]">
            {coverageLabel(product.capacityMaxSqFt)}
          </span>
          <span
            className={cn(
              "flex items-center gap-1 text-[0.72rem] font-semibold",
              "text-[#3A7D2A] transition-all duration-300",
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

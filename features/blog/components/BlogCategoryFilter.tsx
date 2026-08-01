"use client";

import { motion } from "framer-motion";

import { easings } from "@/components/motion/easings";
import type { BlogCategory } from "@/features/blog/types";

const CATEGORIES: Array<"All" | BlogCategory> = [
  "All",
  "Science & Technology",
  "Health & Wellbeing",
  "B2B Environments",
  "Air Quality",
];

interface BlogCategoryFilterProps {
  activeCategory: "All" | BlogCategory;
  onChange: (cat: "All" | BlogCategory) => void;
  /** Total post counts per category for the badge */
  counts: Record<"All" | BlogCategory, number>;
}

export function BlogCategoryFilter({
  activeCategory,
  onChange,
  counts,
}: BlogCategoryFilterProps) {
  return (
    <nav
      aria-label="Blog category filter"
      className="sticky top-[72px] z-30 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        <div className="flex items-center gap-1.5 overflow-x-auto py-4 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <motion.button
                key={cat}
                id={`blog-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                onClick={() => onChange(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: easings.standard }}
                aria-pressed={isActive}
                className={[
                  "relative flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium",
                  "transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-brand-green text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                ].join(" ")}
              >
                {cat}
                <span
                  className={[
                    "inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[0.65rem] font-bold tabular-nums",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-border text-muted-foreground",
                  ].join(" ")}
                >
                  {counts[cat]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

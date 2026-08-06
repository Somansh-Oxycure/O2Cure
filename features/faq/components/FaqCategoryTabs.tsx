"use client";

import { motion } from "framer-motion";
import { Atom, Building2, Home, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { FaqCategoryData } from "@/features/faq/types";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Atom,
  Building2,
  Home,
  ShieldCheck,
  Wrench,
};

interface FaqCategoryTabsProps {
  categories: FaqCategoryData[];
  activeId: string;
  onTabChange: (id: string) => void;
}

/**
 * Sticky horizontal tab strip with brand-green active indicator.
 *
 * - Becomes sticky below the navbar (top-[72px]) once the hero scrolls away
 * - Active tab: bg-brand-green text-white pill
 * - Inactive tab: muted-foreground hover with smooth colour transition
 * - Animated pill indicator using layoutId for smooth shared-element transition
 * - Overflow scrolls horizontally on mobile with hidden scrollbar
 */
export function FaqCategoryTabs({
  categories,
  activeId,
  onTabChange,
}: FaqCategoryTabsProps) {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = stickyRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleTabClick = useCallback(
    (id: string) => {
      onTabChange(id);
      // Scroll the tab panel into view on mobile
      requestAnimationFrame(() => {
        document
          .getElementById("faq-panel-content")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [onTabChange],
  );

  return (
    <>
      {/* Intersection sentinel — placed above the tabs */}
      <div ref={stickyRef} className="h-px" aria-hidden />

      <div
        className={cn(
          "sticky top-[72px] z-30 transition-all duration-300",
          isSticky && "shadow-soft",
        )}
      >
        {/* Glass backdrop when sticky */}
        <div
          className={cn(
            "transition-all duration-300",
            isSticky
              ? "border-b border-border/50 bg-white/90 backdrop-blur-[20px]"
              : "bg-transparent",
          )}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
            <div
              className="no-scrollbar flex gap-1 overflow-x-auto py-3"
              role="tablist"
              aria-label="FAQ categories"
            >
              {categories.map((cat) => {
                const Icon = ICON_MAP[cat.iconName] ?? Atom;
                const isActive = cat.id === activeId;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    id={`tab-${cat.id}`}
                    aria-selected={isActive}
                    aria-controls={`tabpanel-${cat.id}`}
                    onClick={() => handleTabClick(cat.id)}
                    className={cn(
                      "relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
                      "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50",
                      isActive
                        ? "text-white"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {/* Active pill — shared element animation */}
                    {isActive && (
                      <motion.span
                        layoutId="faq-active-tab-pill"
                        className="absolute inset-0 rounded-full bg-brand-green"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon className="size-3.5" aria-hidden />
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

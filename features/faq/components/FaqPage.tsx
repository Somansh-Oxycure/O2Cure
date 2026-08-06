"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Atom, Building2, Home, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { FaqAccordion } from "@/features/faq/components/FaqAccordion";
import { FaqCategoryTabs } from "@/features/faq/components/FaqCategoryTabs";
import { FaqCta } from "@/features/faq/components/FaqCta";
import { FaqHero } from "@/features/faq/components/FaqHero";
import { FAQ_CATEGORIES, ALL_FAQ_ITEMS } from "@/features/faq/content";
import type { FaqCategory, FaqItem } from "@/features/faq/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Atom,
  Building2,
  Home,
  ShieldCheck,
  Wrench,
};

/**
 * FaqPage — "use client" orchestrator.
 *
 * Manages:
 * 1. Active category tab state
 * 2. Live search query — filters across all categories simultaneously
 * 3. Search results vs. tab-scoped accordion rendering
 * 4. Smooth category panel transitions via AnimatePresence
 */
export function FaqPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<FaqCategory>(
    FAQ_CATEGORIES[0].id,
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Normalised search query for comparison
  const normalisedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalisedQuery.length >= 2;

  // Search results — flat list across all categories
  const searchResults = useMemo<FaqItem[]>(() => {
    if (!isSearching) return [];
    return ALL_FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(normalisedQuery) ||
        item.answer.toLowerCase().includes(normalisedQuery) ||
        (item.badge && item.badge.toLowerCase().includes(normalisedQuery)),
    );
  }, [isSearching, normalisedQuery]);

  const activeCategory = useMemo(
    () => FAQ_CATEGORIES.find((cat) => cat.id === activeCategoryId)!,
    [activeCategoryId],
  );

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleTabChange = useCallback((id: string) => {
    setActiveCategoryId(id as FaqCategory);
    setSearchQuery(""); // clear search when switching tabs
  }, []);

  return (
    <main id="main-content" role="main">
      {/* Hero */}
      <FaqHero
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        totalQuestions={ALL_FAQ_ITEMS.length}
      />

      {/* Story bridge */}
      <div
        aria-hidden
        className="pointer-events-none h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"
      />

      {/* Tab strip */}
      {!isSearching && (
        <FaqCategoryTabs
          categories={FAQ_CATEGORIES}
          activeId={activeCategoryId}
          onTabChange={handleTabChange}
        />
      )}

      {/* Content area */}
      <div
        id="faq-panel-content"
        className="mx-auto max-w-6xl px-5 pb-4 pt-10 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]"
      >
        {/* ── Search results ── */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-8">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {searchResults.length}
                  </span>{" "}
                  {searchResults.length === 1 ? "result" : "results"} for{" "}
                  <span className="font-semibold text-brand-green">
                    &ldquo;{searchQuery.trim()}&rdquo;
                  </span>
                </p>
              </div>

              {searchResults.length > 0 ? (
                <FaqAccordion items={searchResults} defaultOpenId={searchResults[0]?.id} />
              ) : (
                <div className="flex flex-col items-center py-20 text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
                    <Atom className="size-6 text-muted-foreground" aria-hidden />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#0A0A0A]">
                    No results found
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Try a different search term, or browse by category using the
                    tabs below.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-6 rounded-full border border-border/70 px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-green/40 hover:text-brand-green"
                  >
                    Browse all categories
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* ── Category panel ── */
            <motion.div
              key={activeCategoryId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="tabpanel"
              id={`tabpanel-${activeCategoryId}`}
              aria-labelledby={`tab-${activeCategoryId}`}
            >
              {/* Category header */}
              <div className="mb-8 lg:mb-10">
                <div className="flex items-center gap-4">
                  {/* Icon block */}
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-brand-green/20 bg-accent">
                    {(() => {
                      const Icon = ICON_MAP[activeCategory.iconName] ?? Atom;
                      return <Icon className="size-5 text-brand-green" aria-hidden />;
                    })()}
                  </div>
                  <div>
                    {/* Section eyebrow above category name */}
                    <div className="mb-1 flex items-center gap-2">
                      <span className="h-px w-6 bg-brand-green/35" />
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-brand-green">
                        {activeCategory.label}
                      </span>
                    </div>
                    <p className="text-sm leading-snug text-muted-foreground">
                      {activeCategory.description}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="mt-6 h-px bg-gradient-to-r from-brand-green/20 via-border/60 to-transparent" />
              </div>

              {/* Accordion */}
              <FaqAccordion
                items={activeCategory.items}
                defaultOpenId={activeCategory.items[0]?.id}
              />

              {/* Category bottom nav — next category hint */}
              <CategoryNav
                categories={FAQ_CATEGORIES.map((c) => c.id)}
                activeId={activeCategoryId}
                onNavigate={(id) => setActiveCategoryId(id as FaqCategory)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Divider before CTA */}
      <div
        aria-hidden
        className="mx-auto mt-16 max-w-6xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      </div>

      {/* CTA */}
      <FaqCta />
    </main>
  );
}

/* ─────────────────────────────────────────────
   Internal sub-component: category prev/next navigation
   ───────────────────────────────────────────── */
function CategoryNav({
  categories,
  activeId,
  onNavigate,
}: {
  categories: string[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  const currentIndex = categories.indexOf(activeId);
  const nextId = categories[currentIndex + 1];
  const nextCategory = nextId
    ? FAQ_CATEGORIES.find((c) => c.id === nextId)
    : null;

  if (!nextCategory) return null;

  const Icon = ICON_MAP[nextCategory.iconName] ?? Atom;

  return (
    <motion.div
      className="mt-12 flex justify-end"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
    >
      <button
        type="button"
        onClick={() => {
          onNavigate(nextId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card/80 px-5 py-3 text-sm backdrop-blur-sm transition-all duration-200 hover:border-brand-green/30 hover:shadow-[0_4px_20px_-8px_rgba(58,125,42,0.15)]"
      >
        <span className="text-muted-foreground">Next:</span>
        <span className="flex items-center gap-2 font-semibold text-foreground group-hover:text-brand-green">
          <Icon className="size-4" aria-hidden />
          {nextCategory.label}
        </span>
        <span className="text-muted-foreground/50 transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </button>
    </motion.div>
  );
}

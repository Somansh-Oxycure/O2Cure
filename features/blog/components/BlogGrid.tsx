"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { easings } from "@/components/motion/easings";
import { BlogCategoryFilter } from "@/features/blog/components/BlogCategoryFilter";
import { BlogPostCard } from "@/features/blog/components/BlogPostCard";
import type { BlogCategory, BlogPost } from "@/features/blog/types";

type FilterCategory = "All" | BlogCategory;

interface BlogGridProps {
  posts: BlogPost[];
}

// ─── Build counts per category ─────────────────────────────────────────────
function buildCounts(posts: BlogPost[]): Record<FilterCategory, number> {
  const counts: Record<FilterCategory, number> = {
    All: posts.length,
    "Science & Technology": 0,
    "Health & Wellbeing": 0,
    "B2B Environments": 0,
    "Air Quality": 0,
  };
  for (const p of posts) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  return counts;
}

// ─── Section heading block ─────────────────────────────────────────────────
function SectionHeading() {
  return (
    <motion.div
      className="mb-12 md:mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easings.premium }}
    >
      {/* Eyebrow — matches homepage section heading style */}
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-10 bg-brand-green/70" aria-hidden />
        <span className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-brand-green">
          All Articles
        </span>
      </div>
      <h2
        className="font-heading font-bold tracking-[-0.02em] text-foreground"
        style={{ fontSize: "clamp(1.6rem, 1.2rem + 2vw, 2.5rem)" }}
      >
        Explore the Archive
      </h2>
      <p className="mt-3 max-w-xl text-base text-muted-foreground leading-relaxed">
        23 peer-verified articles spanning air science, health, technology and
        built environments — all fact-checked against O₂Cure's verified system
        files.
      </p>
    </motion.div>
  );
}

// ─── BlogGrid ─────────────────────────────────────────────────────────────
export function BlogGrid({ posts }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const counts = buildCounts(posts);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  // First post gets featured treatment only in "All" view
  const featuredPost =
    activeCategory === "All" ? filtered[0] : null;
  const gridPosts =
    activeCategory === "All" ? filtered.slice(1) : filtered;

  return (
    <section
      id="blog-grid"
      aria-labelledby="blog-grid-heading"
      className="relative bg-background"
    >
      {/* ── Category filter (sticky) ── */}
      <BlogCategoryFilter
        activeCategory={activeCategory}
        onChange={setActiveCategory}
        counts={counts}
      />

      {/* ── Main content ── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(3.5rem,2rem+4vw,6.5rem)]">
        <SectionHeading />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easings.standard }}
          >
            {/* ── Featured post (full-width) ── */}
            {featuredPost && (
              <div className="mb-8">
                <BlogPostCard post={featuredPost} featured index={0} />
              </div>
            )}

            {/* ── Grid ── */}
            {gridPosts.length > 0 ? (
              <div
                id="blog-grid-heading"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {gridPosts.map((post, i) => (
                  <BlogPostCard
                    key={post.slug}
                    post={post}
                    index={featuredPost ? i + 1 : i}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-lg font-semibold text-foreground">
                  No articles in this category yet.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check back soon — we publish regularly.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

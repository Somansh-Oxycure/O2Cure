/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { easings } from "@/components/motion/easings";
import type { BlogPost } from "@/features/blog/types";

interface BlogPostSidebarProps {
  relatedPosts: BlogPost[];
}

export function BlogPostSidebar({ relatedPosts }: BlogPostSidebarProps) {
  return (
    <aside
      id="post-sidebar"
      aria-label="Related articles and actions"
      className="flex flex-col gap-8"
    >
      {/* ── Author card ── */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: easings.premium }}
      >
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar placeholder — brand colour circle */}
          <div
            aria-hidden
            className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center"
          >
            <span className="text-lg font-bold text-white select-none">O₂</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">O₂Cure Editorial</p>
            <p className="text-xs text-muted-foreground">
              Science &amp; Technology Division
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All articles are fact-checked against O₂Cure's verified system files.
          No claim is published without a traceable source.
        </p>
      </motion.div>

      {/* ── Related articles ── */}
      {relatedPosts.length > 0 && (
        <motion.div
          className="rounded-2xl border border-border bg-card p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1, ease: easings.premium }}
        >
          {/* Section eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-6 bg-brand-green/60" aria-hidden />
            <span className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-brand-green">
              Related Articles
            </span>
          </div>

          <nav aria-label="Related articles">
            <ul className="flex flex-col gap-4">
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex items-start gap-3 outline-none focus-visible:underline"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {p.featuredImage && (
                        <Image
                          src={p.featuredImage}
                          alt={p.featuredImageAlt}
                          fill
                          sizes="80px"
                          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-brand-green">
                        {p.category}
                      </span>
                      <span className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
                        {p.title}
                      </span>
                      <span className="text-[0.7rem] text-muted-foreground">
                        {p.readingTimeMin} min read
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}

      {/* ── Solutions CTA ── */}
      <motion.div
        className="rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#0A2010] border border-brand-green/20 p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.2, ease: easings.premium }}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-6 bg-brand-green/60" aria-hidden />
          <span className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-brand-green">
            Ready to Act?
          </span>
        </div>
        <p className="text-base font-semibold text-white leading-snug mb-2">
          Find the right O₂Cure solution for your environment.
        </p>
        <p className="text-sm text-white/55 leading-relaxed mb-5">
          Our technology advisors can help you size and specify the right
          system for your space.
        </p>
        <Link
          href="/products"
          id="sidebar-solutions-cta"
          className={[
            "inline-flex items-center gap-2 rounded-xl bg-brand-green px-5 py-2.5",
            "text-sm font-semibold text-white transition-all duration-200",
            "hover:bg-brand-green-hover hover:gap-3",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring",
          ].join(" ")}
        >
          Explore Solutions
          <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 7h12M8 2l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </motion.div>
    </aside>
  );
}

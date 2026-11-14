"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { easings } from "@/components/motion/easings";
import type { BlogPost } from "@/features/blog/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface BlogPostHeaderProps {
  post: BlogPost;
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header
      id="post-hero"
      aria-labelledby="post-heading"
      className="w-full border-b border-border/60 bg-background pt-28 pb-8 sm:pt-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        {/* Breadcrumb + meta */}
        <motion.div
          className="mb-5 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: easings.premium }}
        >
          <Link
            href="/blog"
            className="font-medium text-foreground/75 transition-colors hover:text-brand-green"
          >
            Blog
          </Link>
          <span aria-hidden className="text-muted-foreground/50">
            /
          </span>
          <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
            {post.category}
          </span>
          <span aria-hidden className="text-muted-foreground/50">
            ·
          </span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden className="text-muted-foreground/50">
            ·
          </span>
          <span>{post.readingTimeMin} min read</span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          id="post-heading"
          className="max-w-4xl font-heading font-bold leading-[1.15] tracking-[-0.025em] text-foreground"
          style={{ fontSize: "clamp(1.85rem, 1.35rem + 2.2vw, 2.85rem)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: easings.premium }}
        >
          {post.title}
        </motion.h1>
      </div>
    </header>
  );
}

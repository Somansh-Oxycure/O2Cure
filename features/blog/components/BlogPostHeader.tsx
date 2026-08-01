"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { easings } from "@/components/motion/easings";
import type { AuditStatus, BlogPost } from "@/features/blog/types";

const AUDIT_LABELS: Record<AuditStatus, string> = {
  refresh: "Refresh",
  rewrite: "Rewrite",
  merge: "Consolidating",
  retire: "Retiring",
};

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
      className="relative flex min-h-[70vh] w-full items-end overflow-hidden bg-[#0A0A0A]"
    >
      {/* ── Background featured image ── */}
      {post.featuredImage ? (
        <div className="absolute inset-0">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.2) 100%)",
            }}
          />
        </div>
      ) : (
        /* No image — brand gradient background */
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[#0A1628] to-[#0A0F0A]"
        />
      )}

      {/* ── Bottom fade ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#F5F5F4]"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-4xl w-full px-5 sm:px-8 lg:px-12 pt-32 pb-12">
        {/* Breadcrumb + meta */}
        <motion.div
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/50"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easings.premium }}
        >
          <a href="/blog" className="hover:text-white/80 transition-colors">
            Blog
          </a>
          <span aria-hidden>/</span>
          <span className="text-brand-green font-medium">{post.category}</span>
          <span aria-hidden className="ml-2">·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTimeMin} min read</span>
          <span aria-hidden>·</span>
          <span
            className="rounded-full border border-white/20 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider"
            title={`Content audit status: ${AUDIT_LABELS[post.auditStatus]}`}
          >
            {AUDIT_LABELS[post.auditStatus]}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          id="post-heading"
          className="font-heading font-bold leading-[1.08] tracking-[-0.025em] text-white"
          style={{ fontSize: "clamp(1.75rem, 1.2rem + 3vw, 3.25rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: easings.premium }}
        >
          {post.title}
        </motion.h1>

        {/* Excerpt */}
        {post.excerpt && (
          <motion.p
            className="mt-5 max-w-2xl text-base text-white/60 leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easings.premium }}
          >
            {post.excerpt}
          </motion.p>
        )}
      </div>
    </header>
  );
}

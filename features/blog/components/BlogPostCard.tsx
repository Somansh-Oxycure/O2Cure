"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { easings } from "@/components/motion/easings";
import type { AuditStatus, BlogPost } from "@/features/blog/types";

// ─── Audit status badge ────────────────────────────────────────────────────
const AUDIT_LABELS: Record<AuditStatus, string> = {
  refresh: "Refresh",
  rewrite: "Rewrite",
  merge: "Consolidating",
  retire: "Retiring",
};

const AUDIT_COLOURS: Record<AuditStatus, string> = {
  refresh: "bg-accent text-accent-foreground",
  rewrite: "bg-brand-blue-light text-brand-blue-dark",
  merge: "bg-muted text-muted-foreground",
  retire: "bg-border text-muted-foreground",
};

function AuditBadge({ status }: { status: AuditStatus }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase",
        AUDIT_COLOURS[status],
      ].join(" ")}
      title={`Content audit status: ${AUDIT_LABELS[status]}`}
    >
      {AUDIT_LABELS[status]}
    </span>
  );
}

// ─── Reading time ──────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Card ─────────────────────────────────────────────────────────────────
interface BlogPostCardProps {
  post: BlogPost;
  /** When true the card gets full-width featured treatment */
  featured?: boolean;
  /** Framer Motion stagger index */
  index?: number;
}

export function BlogPostCard({
  post,
  featured = false,
  index = 0,
}: BlogPostCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: easings.premium,
      }}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl bg-card",
        "border border-border transition-shadow duration-300",
        "hover:shadow-elevated",
        featured ? "md:flex-row md:min-h-[380px]" : "",
      ].join(" ")}
    >
      {/* ── Featured image ── */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={[
          "relative overflow-hidden bg-muted",
          featured
            ? "aspect-[16/9] md:aspect-auto md:w-[52%] md:shrink-0"
            : "aspect-[16/9]",
        ].join(" ")}
      >
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            quality={80}
            sizes={
              featured
                ? "(min-width: 768px) 52vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          // No-image fallback — branded gradient
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-brand-blue-light to-accent"
          />
        )}
      </Link>

      {/* ── Text content ── */}
      <div
        className={[
          "flex flex-col gap-3 p-6",
          featured ? "md:justify-center md:p-10" : "",
        ].join(" ")}
      >
        {/* Category eyebrow + audit badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-brand-green">
            {post.category}
          </span>
          <AuditBadge status={post.auditStatus} />
        </div>

        {/* Title */}
        <h2
          className={[
            "font-heading font-semibold leading-snug tracking-[-0.01em] text-foreground",
            "transition-colors group-hover:text-brand-blue",
            featured ? "text-2xl md:text-3xl" : "text-[1.05rem]",
          ].join(" ")}
        >
          <Link href={href} className="outline-none focus-visible:underline">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            className={[
              "text-sm text-muted-foreground leading-relaxed",
              featured ? "line-clamp-3 max-w-lg" : "line-clamp-2",
            ].join(" ")}
          >
            {post.excerpt}
          </p>
        )}

        {/* Meta strip */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3 text-[0.72rem] text-muted-foreground">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTimeMin} min read</span>
          </div>

          {/* Arrow CTA */}
          <Link
            href={href}
            aria-label={`Read: ${post.title}`}
            className={[
              "flex items-center gap-1 text-[0.75rem] font-semibold text-brand-green",
              "transition-all duration-200 hover:gap-2",
              "outline-none focus-visible:underline",
            ].join(" ")}
          >
            Read
            <svg
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

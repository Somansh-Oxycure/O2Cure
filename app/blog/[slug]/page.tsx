import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  BlogPostBody,
  BlogPostHeader,
  BlogPostSidebar,
  getPostBySlug,
  getLiveSlugs,
  liveBlogPosts,
} from "@/features/blog";
import { FooterSection } from "@/features/footer";

// ─── Static params — pre-render all live post slugs ───────────────────────────
export function generateStaticParams() {
  return getLiveSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic SEO metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.auditStatus === "retire") {
    return { title: "Article Not Found | O₂Cure Blog" };
  }

  const ogImage = post.featuredImage
    ? `https://o2cure.in${post.featuredImage}`
    : "https://o2cure.in/blog/Blog_09_feat.jpg";

  return {
    title: `${post.title} | O₂Cure Blog`,
    description: post.excerpt || `Read this article on O₂Cure's blog — ${post.title}.`,
    keywords: [
      post.category,
      "air quality",
      "O2Cure",
      "indoor air quality India",
      "air purifier",
    ],
    alternates: {
      canonical: `https://o2cure.in/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | O₂Cure`,
      description: post.excerpt || "",
      type: "article",
      url: `https://o2cure.in/blog/${post.slug}`,
      siteName: "O2Cure",
      publishedTime: post.publishedAt,
      authors: ["O₂Cure Editorial"],
      section: post.category,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | O₂Cure`,
      description: post.excerpt || "",
      images: [ogImage],
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Retired or unknown posts → 404
  if (!post || post.auditStatus === "retire" || !post.body) {
    notFound();
  }

  // Related posts: same category, exclude self, max 3
  const relatedPosts = liveBlogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  // JSON-LD structured data — BlogPosting schema
  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://o2cure.in/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "O₂Cure",
      url: "https://o2cure.in",
    },
    publisher: {
      "@type": "Organization",
      name: "O2Cure",
      url: "https://o2cure.in",
      logo: {
        "@type": "ImageObject",
        url: "https://o2cure.in/O2cure-final-logo.png",
      },
    },
    image: post.featuredImage
      ? `https://o2cure.in${post.featuredImage}`
      : "https://o2cure.in/blog/Blog_09_feat.jpg",
    articleSection: post.category,
    wordCount: post.wordCount,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "Blog",
      name: "O₂Cure Intelligence Archive",
      url: "https://o2cure.in/blog",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />

      <main
        id="post-main"
        className="flex min-h-screen flex-col bg-background"
      >
        {/* ── Section 1: Post hero header ── */}
        <BlogPostHeader post={post} />

        {/* ── Section 2: Body + Sidebar ── */}
        <section
          id="post-content"
          aria-label="Article content"
          className="mx-auto max-w-7xl w-full px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(3rem,2rem+3vw,5.5rem)]"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            {/* Body */}
            <BlogPostBody paragraphs={post.body} />

            {/* Sticky sidebar */}
            <div className="lg:sticky lg:top-[5.5rem] lg:self-start">
              <BlogPostSidebar relatedPosts={relatedPosts} />
            </div>
          </div>
        </section>

        {/* ── Back to blog link ── */}
        <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)] pb-12">
          <a
            href="/blog"
            id="back-to-blog"
            className={[
              "inline-flex items-center gap-2 text-sm font-semibold text-brand-green",
              "transition-all duration-200 hover:gap-3",
              "outline-none focus-visible:underline",
            ].join(" ")}
          >
            <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M13 7H1M6 2L1 7l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Intelligence Archive
          </a>
        </div>

        {/* Footer */}
        <FooterSection />
      </main>
    </>
  );
}

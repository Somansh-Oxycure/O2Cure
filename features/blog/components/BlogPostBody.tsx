"use client";

import { motion } from "framer-motion";

import { easings } from "@/components/motion/easings";

interface BlogPostBodyProps {
  paragraphs: string[];
}

export function BlogPostBody({ paragraphs }: BlogPostBodyProps) {
  return (
    <article
      id="post-body"
      aria-label="Post content"
      className="prose-custom w-full"
    >
      {paragraphs.map((para, i) => {
        const trimmed = para.trim();
        const isBlockHtml =
          trimmed.startsWith("<h") ||
          trimmed.startsWith("<ul") ||
          trimmed.startsWith("<ol") ||
          trimmed.startsWith("<table") ||
          trimmed.startsWith("<div");
        const Component = isBlockHtml ? motion.div : motion.p;
        return (
          <Component
            key={i}
            className={[
              "text-[1.05rem] leading-[1.8] text-foreground",
              i === 0
                ? "text-[1.1rem] font-medium text-foreground/90"
                : "text-muted-foreground",
              i > 0 ? "mt-6" : "",
              "[&_a]:text-brand-green [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-green-dark",
              "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4",
              "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3",
              "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-foreground",
              "[&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:bg-muted/40 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2.5",
            ].join(" ")}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: Math.min(i * 0.05, 0.3),
              ease: easings.premium,
            }}
            dangerouslySetInnerHTML={{ __html: para }}
          />
        );
      })}
    </article>
  );
}

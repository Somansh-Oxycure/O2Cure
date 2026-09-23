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
      className="prose-custom mx-auto max-w-2xl"
    >
      {paragraphs.map((para, i) => {
        const isHeading = para.trim().startsWith("<h");
        const Component = isHeading ? motion.div : motion.p;
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

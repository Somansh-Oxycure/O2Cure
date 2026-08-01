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
      {paragraphs.map((para, i) => (
        <motion.p
          key={i}
          className={[
            "text-[1.05rem] leading-[1.8] text-foreground",
            i === 0
              ? "text-[1.1rem] font-medium text-foreground/90"
              : "text-muted-foreground",
            i > 0 ? "mt-6" : "",
          ].join(" ")}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: Math.min(i * 0.05, 0.3),
            ease: easings.premium,
          }}
        >
          {para}
        </motion.p>
      ))}
    </article>
  );
}

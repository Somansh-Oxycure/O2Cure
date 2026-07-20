"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  cardFocusSpring,
  carouselTween,
} from "@/features/products/animation/carouselMotion";
import { ProductRender } from "@/features/products/components/ProductRender";
import type { Product } from "@/features/products/types";

interface ProductCardProps {
  product: Product;
  isActive: boolean;
  reducedMotion: boolean;
  onSelect: () => void;
}

export function ProductCard({
  product,
  isActive,
  reducedMotion,
  onSelect,
}: ProductCardProps) {
  const transition = reducedMotion ? carouselTween : cardFocusSpring;

  return (
    <motion.article
      layout={false}
      role="group"
      aria-roledescription="slide"
      aria-label={`${product.name} — ${product.environment.join(", ")}`}
      aria-current={isActive ? "true" : undefined}
      animate={{
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.45,
        y: isActive ? 0 : 8,
        filter: isActive ? "blur(0px)" : "blur(3px)",
      }}
      transition={transition}
      className={cn(
        "flex w-[min(80vw,18rem)] shrink-0 flex-col sm:w-[min(68vw,20rem)] lg:w-[min(26vw,22rem)]",
        "cursor-grab active:cursor-grabbing",
      )}
      onClick={isActive ? undefined : onSelect}
    >
      {/* Unified card — image + info in one container */}
      <motion.div
        animate={{
          boxShadow: isActive
            ? "0 20px 60px -16px rgba(43,108,176,0.18), 0 4px 16px -4px rgba(0,0,0,0.10)"
            : "0 2px 8px rgba(0,0,0,0.05)",
        }}
        transition={transition}
        className={cn(
          "flex flex-col overflow-hidden rounded-3xl",
          "border border-border/60 bg-white",
          isActive && "border-border/80",
        )}
      >
        {/* Image area */}
        <div className="relative bg-gradient-to-b from-slate-50 to-white px-4 pt-5 pb-2">

          <ProductRender
            src={product.image.src || undefined}
            alt={product.image.alt}
            variant={product.renderVariant}
            isActive={isActive}
          />
        </div>

        {/* Info area */}
        <div
          className={cn(
            "flex flex-col gap-2 px-5 pb-5 pt-4",
            "border-t border-border/40 bg-white",
          )}
        >
          <h3 className="text-[0.95rem] font-semibold leading-snug tracking-tight text-foreground line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[0.78rem] leading-relaxed text-muted-foreground line-clamp-2">
            {product.purpose}
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {product.environment.map((env) => (
              <span
                key={env}
                className="inline-flex items-center rounded-full bg-brand-blue/8 border border-brand-blue/15 px-2 py-0.5 text-[9px] font-medium tracking-widest text-brand-blue/80"
              >
                {env}
              </span>
            ))}
          </div>

          <div
            className={cn(
              "mt-1 flex items-center gap-1.5 text-[0.78rem] font-medium text-brand-blue transition-opacity duration-300",
              isActive ? "opacity-100" : "opacity-0",
            )}
          >
            <span>Learn more</span>
            <ArrowRight className="size-3.5" />
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  cardFocusSpring,
  carouselTween,
} from "@/features/products/animation/carouselMotion";
import { ProductRender } from "@/features/products/components/ProductRender";
import { productsContent } from "@/features/products/content";
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
      aria-label={`${product.name} — ${product.environment}`}
      aria-current={isActive ? "true" : undefined}
      animate={{
        scale: isActive ? 1 : 0.88,
        opacity: isActive ? 1 : 0.52,
        y: isActive ? 0 : 12,
        filter: isActive ? "blur(0px)" : "blur(2.5px)",
      }}
      transition={transition}
      className={cn(
        "flex w-[min(85vw,20rem)] shrink-0 flex-col sm:w-[min(72vw,22rem)] lg:w-[min(28vw,24rem)]",
        "cursor-grab active:cursor-grabbing",
      )}
      onClick={isActive ? undefined : onSelect}
    >
      <motion.div
        animate={{
          boxShadow: isActive
            ? "0 24px 64px -24px oklch(0 0 0 / 0.22), 0 6px 16px -6px oklch(0 0 0 / 0.1)"
            : "0 1px 2px oklch(0 0 0 / 0.04), 0 12px 32px -12px oklch(0 0 0 / 0.08)",
        }}
        transition={transition}
        className="rounded-2xl"
      >
        <ProductRender
          src={product.image.src || undefined}
          alt={product.image.alt}
          variant={product.renderVariant}
          isActive={isActive}
        />
      </motion.div>

      <div
        className={cn(
          "mt-6 text-center transition-opacity duration-500 sm:mt-7",
          isActive ? "opacity-100" : "opacity-70",
        )}
      >
        <h3 className="font-heading text-h3 text-foreground">{product.name}</h3>
        <p className="mx-auto mt-2 max-w-[18rem] text-body-lg text-muted-foreground">
          {product.purpose}
        </p>

        <p className="mt-4">
          <span className="inline-flex items-center rounded-full border border-border/70 bg-secondary/60 px-3.5 py-1 text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
            {product.environment}
          </span>
        </p>

        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled
          aria-disabled="true"
          tabIndex={isActive ? 0 : -1}
          className="mt-6 min-w-[11rem] rounded-full border-border/80 bg-transparent px-7 sm:mt-7"
        >
          {productsContent.cta}
        </Button>
      </div>
    </motion.article>
  );
}

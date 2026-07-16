"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ProductCarousel } from "@/features/products/components/ProductCarousel";
import { productsContent } from "@/features/products/content";

/**
 * Chapter 5 — premium product showcase (not an ecommerce grid).
 */
export function ProductsSection() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative bg-background py-4"
    >
      {/* Subtle top separator line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(43,108,176,0.12) 30%, rgba(43,108,176,0.22) 50%, rgba(43,108,176,0.12) 70%, transparent 100%)",
        }}
      />

      <div className="px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        {/* Header — compact, structured */}
        <header className="mx-auto max-w-3xl text-center">
          <Reveal delay={0} distance={16}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              {productsContent.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.1} distance={20}>
            <h2
              id="products-heading"
              className="mt-3 font-heading text-h2 text-foreground"
            >
              {productsContent.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.2} distance={16}>
            <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              {productsContent.supporting}
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.35} distance={24} amount={0.1}>
          <ProductCarousel />
        </Reveal>
      </div>
    </section>
  );
}

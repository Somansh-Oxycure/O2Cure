"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ProductCarousel } from "@/features/products/components/ProductCarousel";
import { productsContent } from "@/features/products/content";

/**
 * Chapter 5 — premium product showcase (not an ecommerce grid).
 * Story bridge: technology particles dissolve; the section brightens as
 * the first product rises into view.
 */
export function ProductsSection() {
  return (
    <>
      {/* Story bridge — particles dissolve, atmosphere brightens */}
      <div
        aria-hidden
        className="pointer-events-none relative h-[clamp(3.5rem,8vh,5.5rem)] overflow-hidden bg-background"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(180, 230, 215, 0.08) 0%, rgba(255, 255, 255, 0.4) 45%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-full opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255, 255, 255, 0.65) 0%, transparent 70%)",
          }}
        />
      </div>

      <section
        id="products"
        aria-labelledby="products-heading"
        className="relative bg-background pb-section pt-section-sm"
      >
        <div className="px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
          <header className="mx-auto max-w-5xl text-center">
            <Reveal delay={0} distance={20}>
              <p className="text-eyebrow uppercase text-brand-blue">
                {productsContent.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.12} distance={24}>
              <h2
                id="products-heading"
                className="mt-4 font-heading text-h2 text-foreground sm:mt-5"
              >
                {productsContent.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.26} distance={20}>
              <p className="mx-auto mt-4 max-w-2xl text-body-lg text-muted-foreground sm:mt-5">
                {productsContent.supporting}
              </p>
            </Reveal>
          </header>

          <Reveal delay={0.42} distance={28} amount={0.15}>
            <ProductCarousel />
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { products } from "@/features/products/content";

const ALL_ENVIRONMENTS = ["All", "Residential", "Corporate", "Industrial", "Car"] as const;
type EnvFilter = (typeof ALL_ENVIRONMENTS)[number];

export function AllProductsSection() {
  const [activeFilter, setActiveFilter] = useState<EnvFilter>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return products;
    return products.filter((p) => p.environment.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section
      id="all-products"
      className="border-t border-[#E5E7EB] bg-white py-16 px-5 md:px-10"
      aria-label="All O2Cure Products"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#3A7D2A]">
              Our Products
            </p>
            <h2 className="text-[clamp(1.5rem,1.2rem+2vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[#1C1C1C]">
              Browse All Products
            </h2>
            <p className="mt-2 max-w-md text-[0.875rem] leading-[1.6] text-[#6B7280]">
              Designed for every environment. Built with the same trusted purification technology.
            </p>
          </div>

          {/* Filter chips */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter products by environment"
          >
            {ALL_ENVIRONMENTS.map((env) => {
              const isActive = activeFilter === env;
              return (
                <button
                  key={env}
                  id={`product-filter-${env.toLowerCase()}`}
                  onClick={() => setActiveFilter(env)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-[0.78rem] font-semibold",
                    "transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/40",
                    isActive
                      ? "border-[#3A7D2A] bg-[#3A7D2A] text-white shadow-[0_2px_8px_rgba(58,125,42,0.3)]"
                      : "border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#1C1C1C]"
                  )}
                >
                  {env}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#F5F5F4] to-[#EBEBEB]" style={{ height: 220 }}>
                  {product.image.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image.src}
                      alt={product.image.alt}
                      className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex flex-col items-center gap-2 opacity-20">
                        {[60, 80, 100, 80, 60].map((w, j) => (
                          <div
                            key={j}
                            className="h-1 rounded-full bg-[#3A7D2A]"
                            style={{ width: w }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Environment tags overlay */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {product.environment.map((env) => (
                      <span
                        key={env}
                        className="rounded-full border border-white/60 bg-white/80 px-2.5 py-0.5 text-[0.65rem] font-semibold text-[#1C1C1C] backdrop-blur-sm"
                      >
                        {env}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-[0.9rem] font-bold leading-snug text-[#1C1C1C] transition-colors group-hover:text-[#3A7D2A]">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-[1.5] text-[#6B7280] line-clamp-3">
                    {product.purpose}
                  </p>

                  <button
                    id={`product-explore-${product.id}`}
                    className={cn(
                      "mt-4 w-full rounded-xl border border-[#3A7D2A]/20 bg-[#EAF5E4]",
                      "py-2.5 text-[0.82rem] font-semibold text-[#2A5C1D]",
                      "transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "hover:bg-[#3A7D2A] hover:text-white hover:shadow-[0_4px_12px_rgba(58,125,42,0.25)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/50"
                    )}
                  >
                    Explore Product →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 py-20 text-center"
          >
            <p className="text-[0.95rem] font-semibold text-[#1C1C1C]">
              No products for this category yet.
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="text-[0.82rem] text-[#3A7D2A] underline-offset-2 hover:underline"
            >
              View all products
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ProductCard } from "@/features/products/components/ProductCard";
import { products } from "@/features/products/content";
import { useProductCarousel } from "@/features/products/hooks/useProductCarousel";

export function ProductCarousel() {
  const {
    activeIndex,
    viewportRef,
    trackRef,
    x,
    dragConstraints,
    goTo,
    goNext,
    goPrev,
    handleDragStart,
    handleDragEnd,
    canGoPrev,
    canGoNext,
    reducedMotion,
    isLayoutReady,
  } = useProductCarousel({ itemCount: products.length });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
    [goNext, goPrev],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.addEventListener("keydown", handleKeyDown);
    return () => viewport.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, viewportRef]);

  return (
    <div className="relative mx-auto mt-10 w-full max-w-[100rem] sm:mt-12 lg:mt-16">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[10%] bg-gradient-to-r from-background to-transparent sm:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[10%] bg-gradient-to-l from-background to-transparent sm:block" />

      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="O₂Cure product showcase"
        tabIndex={0}
        className="relative overflow-hidden px-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:px-0"
      >
        <motion.div
          ref={trackRef}
          className="flex cursor-grab touch-pan-y gap-4 active:cursor-grabbing sm:gap-6 lg:gap-8"
          style={{ x }}
          drag={isLayoutReady ? "x" : false}
          dragConstraints={dragConstraints}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isActive={index === activeIndex}
              reducedMotion={reducedMotion}
              onSelect={() => goTo(index)}
            />
          ))}
        </motion.div>
      </div>

      {/* Controls row */}
      <div
        className="mt-6 flex items-center justify-center gap-3 sm:mt-8"
        aria-hidden={false}
      >
        <CarouselArrow
          direction="prev"
          disabled={!canGoPrev}
          onClick={goPrev}
          label="Previous product"
        />

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Showing {products[activeIndex]?.name}, {activeIndex + 1} of{" "}
          {products.length}
        </p>

        <div className="flex items-center gap-1.5" role="tablist" aria-label="Products">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to ${product.name}`}
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                index === activeIndex
                  ? "w-6 bg-brand-blue"
                  : "w-1.5 bg-border hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div>

        <CarouselArrow
          direction="next"
          disabled={!canGoNext}
          onClick={goNext}
          label="Next product"
        />
      </div>
    </div>
  );
}

interface CarouselArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  label: string;
}

function CarouselArrow({
  direction,
  disabled,
  onClick,
  label,
}: CarouselArrowProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
      className="size-9 rounded-full border-border/70 bg-background/90 shadow-sm backdrop-blur-sm hover:border-brand-blue/40 hover:bg-brand-blue/5 disabled:opacity-30"
    >
      <Icon className="size-4" />
    </Button>
  );
}

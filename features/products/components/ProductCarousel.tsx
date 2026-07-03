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
    <div className="relative mx-auto mt-12 w-full max-w-[100rem] sm:mt-14 lg:mt-20">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[12%] bg-gradient-to-r from-background to-transparent sm:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[12%] bg-gradient-to-l from-background to-transparent sm:block" />

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
          className="flex cursor-grab touch-pan-y gap-6 active:cursor-grabbing sm:gap-8 lg:gap-10"
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

      <div
        className="mt-8 flex items-center justify-center gap-4 sm:mt-10"
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

        <div className="flex items-center gap-2" role="tablist" aria-label="Products">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to ${product.name}`}
              onClick={() => goTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                index === activeIndex
                  ? "w-7 bg-brand-blue"
                  : "w-2 bg-border hover:bg-muted-foreground/40",
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
      size="icon-lg"
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
      className="rounded-full border-border/80 bg-background/80 shadow-soft backdrop-blur-sm"
    >
      <Icon className="size-5" />
    </Button>
  );
}

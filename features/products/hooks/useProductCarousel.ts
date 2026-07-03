"use client";

import {
  animate,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  carouselSpring,
  carouselTween,
} from "@/features/products/animation/carouselMotion";

const SWIPE_OFFSET_THRESHOLD = 48;
const SWIPE_VELOCITY_THRESHOLD = 350;

function clampIndex(index: number, max: number) {
  return Math.max(0, Math.min(max, index));
}

interface UseProductCarouselOptions {
  itemCount: number;
}

export function useProductCarousel({ itemCount }: UseProductCarouselOptions) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [layout, setLayout] = useState({ stride: 0, centerOffset: 0 });

  const x = useMotionValue(0);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const firstCard = track.firstElementChild as HTMLElement | null;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const stride = cardWidth + gap;
    const centerOffset = (viewport.offsetWidth - cardWidth) / 2;

    setLayout({ stride, centerOffset });
  }, []);

  const getTargetX = useCallback(
    (index: number) => {
      if (layout.stride === 0) return 0;
      return layout.centerOffset - index * layout.stride;
    },
    [layout.centerOffset, layout.stride],
  );

  const animateToX = useCallback(
    (targetX: number) => {
      if (reducedMotion) {
        x.set(targetX);
        return;
      }
      animate(x, targetX, carouselSpring);
    },
    [reducedMotion, x],
  );

  useEffect(() => {
    measure();

    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(viewport);
    if (trackRef.current) observer.observe(trackRef.current);

    return () => observer.disconnect();
  }, [measure, itemCount]);

  useEffect(() => {
    if (isDragging || layout.stride === 0) return;
    animateToX(getTargetX(activeIndex));
  }, [activeIndex, animateToX, getTargetX, isDragging, layout.stride]);

  const animateToIndex = useCallback(
    (index: number) => {
      const next = clampIndex(index, itemCount - 1);
      setActiveIndex(next);
      if (layout.stride === 0) return;
      animateToX(getTargetX(next));
    },
    [animateToX, getTargetX, itemCount, layout.stride],
  );

  const goTo = useCallback(
    (index: number) => animateToIndex(index),
    [animateToIndex],
  );

  const goNext = useCallback(() => {
    animateToIndex(activeIndexRef.current + 1);
  }, [animateToIndex]);

  const goPrev = useCallback(() => {
    animateToIndex(activeIndexRef.current - 1);
  }, [animateToIndex]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (_event: PointerEvent, info: PanInfo) => {
      setIsDragging(false);

      if (layout.stride === 0) return;

      const current = activeIndexRef.current;
      const { offset, velocity } = info;
      const swipeByOffset = Math.abs(offset.x) > SWIPE_OFFSET_THRESHOLD;
      const swipeByVelocity = Math.abs(velocity.x) > SWIPE_VELOCITY_THRESHOLD;

      if (!swipeByOffset && !swipeByVelocity) {
        animateToIndex(current);
        return;
      }

      const direction = offset.x + velocity.x * 0.15 < 0 ? 1 : -1;
      animateToIndex(current + direction);
    },
    [animateToIndex, layout.stride],
  );

  const dragConstraints = {
    left: layout.centerOffset - (itemCount - 1) * layout.stride - layout.stride * 0.15,
    right: layout.centerOffset + layout.stride * 0.15,
  };

  const isLayoutReady = layout.stride > 0;

  return {
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
    canGoPrev: activeIndex > 0,
    canGoNext: activeIndex < itemCount - 1,
    reducedMotion,
    isLayoutReady,
    transition: reducedMotion ? carouselTween : carouselSpring,
  };
}

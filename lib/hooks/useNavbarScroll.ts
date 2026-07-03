"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/** Scroll distance before the navbar transitions to its frosted state (px). */
export const NAVBAR_SCROLL_THRESHOLD = 70;

/**
 * Efficient scroll-state detection for the global navbar.
 * Uses Framer Motion's `useScroll` (Lenis-compatible) instead of a raw
 * `window` scroll listener — updates React state only when crossing the
 * threshold, avoiding re-renders on every scroll frame.
 */
export function useNavbarScroll(threshold = NAVBAR_SCROLL_THRESHOLD) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  const updateScrolled = useCallback(
    (y: number) => {
      const next = y > threshold;
      if (next !== isScrolledRef.current) {
        isScrolledRef.current = next;
        setIsScrolled(next);
      }
    },
    [threshold],
  );

  useMotionValueEvent(scrollY, "change", updateScrolled);

  // Sync when the page loads already scrolled (e.g. refresh mid-page).
  useEffect(() => {
    updateScrolled(scrollY.get());
  }, [scrollY, updateScrolled]);

  return { isScrolled, scrollY };
}

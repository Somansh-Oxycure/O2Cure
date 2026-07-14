"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns scroll progress (0→1) for a given sticky-scroll container.
 *
 * Progress is:
 *   - 0   while the section has not yet entered the viewport
 *   - 0→1 as the user scrolls through the sticky section
 *   - 1   once the section is fully scrolled past
 *
 * Key fix: we anchor progress=0 to the moment the section's TOP edge
 * reaches the TOP of the viewport (i.e. the sticky panel "locks in").
 * Before that point, progress is always 0, so the animation never starts
 * in a mid-state even when the section is below the fold on page load.
 *
 * Uses a passive scroll listener — no scroll jacking.
 */
export function useScrollProgress(
  containerRef: React.RefObject<HTMLElement | null>,
): number {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // The sticky panel locks in when rect.top <= 0.
      // Before that, the section hasn't entered the "active zone" yet.
      if (rect.top > 0) {
        setProgress(0);
        return;
      }

      // Total scrollable travel = container height - viewport height
      // (this equals the extra height beyond 100vh, e.g. 280vh - 100vh = 180vh)
      const scrollable = rect.height - viewportHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      // scrolled = how far the top of the element has gone above the viewport
      const scrolled = -rect.top;
      const raw = scrolled / scrollable;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return progress;
}

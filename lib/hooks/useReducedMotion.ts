"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * SSR-safe `prefers-reduced-motion` hook for motion code that isn't driven
 * by Framer Motion (GSAP timelines, React Three Fiber scenes, Lenis setup).
 * Framer Motion components should prefer its built-in `useReducedMotion`
 * (already wired globally via MotionConfigProvider); this hook exists so
 * every other animation system can respect the same user preference.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    setPrefersReducedMotion(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Wires up Lenis for inertia-based smooth scrolling site-wide. Scroll-linked
 * animations (e.g. the Hero-to-Environment transition) should read scroll
 * progress via Framer Motion's `useScroll`, which already tracks native
 * scroll position — Lenis drives that position, no extra syncing needed.
 *
 * Users who prefer reduced motion get plain native browser scrolling —
 * smooth-scroll inertia can be disorienting for vestibular-sensitive users,
 * so it's treated as non-essential motion and skipped entirely rather than
 * just toned down.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

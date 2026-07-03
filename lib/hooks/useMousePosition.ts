"use client";

import { useEffect, useState } from "react";

export interface NormalizedPointer {
  /** -0.5 (left) to 0.5 (right) */
  x: number;
  /** -0.5 (top) to 0.5 (bottom) */
  y: number;
}

/**
 * Normalized viewport pointer position for subtle parallax.
 * Returns `{ x: 0, y: 0 }` when disabled (mobile / reduced motion).
 */
export function useMousePosition(enabled = true): NormalizedPointer {
  const [position, setPosition] = useState<NormalizedPointer>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled]);

  return position;
}

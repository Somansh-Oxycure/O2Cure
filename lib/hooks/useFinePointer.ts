"use client";

import { useEffect, useState } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

/**
 * True on desktop-like devices with a precise pointing device.
 * Used to gate mouse parallax — touch devices get floating animation only.
 */
export function useFinePointer(): boolean {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    setHasFinePointer(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setHasFinePointer(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  return hasFinePointer;
}

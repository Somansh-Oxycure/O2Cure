"use client";

import { useEffect, useState } from "react";

import { panelMotion as basePanelMotion } from "@/features/environment/animation/panelMotion";

type PanelHeights = {
  collapsedHeight: number;
  compressedHeight: number;
  expandedHeight: number;
  gap: number;
};

/**
 * Fits all seven collapsed panels within ~one viewport alongside the heading.
 */
export function usePanelHeights(): PanelHeights {
  const [heights, setHeights] = useState<PanelHeights>({
    collapsedHeight: basePanelMotion.collapsedHeight,
    compressedHeight: basePanelMotion.compressedHeight,
    expandedHeight: basePanelMotion.expandedHeight,
    gap: basePanelMotion.gap,
  });

  useEffect(() => {
    const update = () => {
      const available = window.innerHeight - 220;
      const collapsed = Math.min(
        120,
        Math.max(96, Math.floor((available - 6 * basePanelMotion.gap) / 7)),
      );

      setHeights({
        collapsedHeight: collapsed,
        compressedHeight: Math.max(88, collapsed - 12),
        expandedHeight: basePanelMotion.expandedHeight,
        gap: basePanelMotion.gap,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return heights;
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useFinePointer } from "@/lib/hooks/useFinePointer";

import { EnvironmentPanel } from "@/features/environment/components/EnvironmentPanel";
import { environments } from "@/features/environment/content";
import { usePanelHeights } from "@/features/environment/hooks/usePanelHeights";

/**
 * Stacked horizontal accordion panels.
 * - Desktop (fine pointer): hover to expand, first panel expanded by default
 * - Mobile: tap to accordion open/close
 */
export function EnvironmentPanelStack() {
  const useHover = useFinePointer();
  const panelHeights = usePanelHeights();
  const [expandedId, setExpandedId] = useState<string | null>(environments[0]?.id ?? null);
  // Track if user has interacted — don't override with default after that
  const hasInteracted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const expandedIdRef = useRef(expandedId);

  // Keep the ref of the active ID updated for the scroll handler
  useEffect(() => {
    expandedIdRef.current = expandedId;
  }, [expandedId]);

  // Scroll listener to automatically expand the card closest to the screen center
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const isVisible = containerRect.top < window.innerHeight && containerRect.bottom > 0;
      if (!isVisible) return;

      const totalRange = containerRect.height;
      if (totalRange <= 0) return;

      // Calculate progress of container scrolling through viewport center
      const focusPoint = window.innerHeight / 2;
      const progress = (focusPoint - containerRect.top) / totalRange;
      const clampedProgress = Math.max(0, Math.min(0.999, progress));
      const index = Math.floor(clampedProgress * environments.length);
      const closestId = environments[index]?.id ?? null;

      if (closestId && closestId !== expandedIdRef.current) {
        setExpandedId(closestId);
      }
    };

    let isScrolling = false;
    const onScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
          handleScroll();
          isScrolling = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial calculation on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleExpand = useCallback(
    (id: string) => {
      if (useHover) {
        hasInteracted.current = true;
        setExpandedId(id);
      }
    },
    [useHover],
  );

  const handleCollapse = useCallback(
    (id: string) => {
      if (useHover) {
        // Only collapse if the panel being un-hovered is still the expanded one
        setExpandedId((current) => (current === id ? null : current));
      }
    },
    [useHover],
  );

  const handleToggle = useCallback(
    (id: string) => {
      if (!useHover) {
        hasInteracted.current = true;
        setExpandedId((current) => (current === id ? null : id));
      }
    },
    [useHover],
  );

  const hasExpanded = expandedId !== null;

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col"
      style={{ gap: panelHeights.gap }}
      role="list"
    >
      {environments.map((environment, index) => {
        const isExpanded = expandedId === environment.id;
        const isCompressed = hasExpanded && !isExpanded;

        return (
          <div key={environment.id} role="listitem">
            <EnvironmentPanel
              environment={environment}
              isExpanded={isExpanded}
              isCompressed={isCompressed}
              heights={panelHeights}
              onExpand={() => handleExpand(environment.id)}
              onCollapse={() => handleCollapse(environment.id)}
              onToggle={() => handleToggle(environment.id)}
              useHover={useHover}
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
}

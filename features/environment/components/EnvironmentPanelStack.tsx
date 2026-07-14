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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // Track if user has interacted — don't override with default after that
  const hasInteracted = useRef(false);

  // Once fine pointer is detected on client, expand the first panel by default
  useEffect(() => {
    if (useHover && !hasInteracted.current) {
      setExpandedId(environments[0]?.id ?? null);
    }
  }, [useHover]);

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

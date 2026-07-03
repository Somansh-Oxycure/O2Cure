"use client";

import { useCallback, useState } from "react";

import { useFinePointer } from "@/lib/hooks/useFinePointer";

import { EnvironmentPanel } from "@/features/environment/components/EnvironmentPanel";
import { environments } from "@/features/environment/content";
import { usePanelHeights } from "@/features/environment/hooks/usePanelHeights";

/**
 * Stacked horizontal panels — hover expands on desktop, accordion on mobile.
 */
export function EnvironmentPanelStack() {
  const useHover = useFinePointer();
  const panelHeights = usePanelHeights();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = useCallback(
    (id: string) => {
      if (useHover) setExpandedId(id);
    },
    [useHover],
  );

  const handleCollapse = useCallback(() => {
    if (useHover) setExpandedId(null);
  }, [useHover]);

  const handleToggle = useCallback(
    (id: string) => {
      if (!useHover) {
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
      {environments.map((environment) => {
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
              onCollapse={handleCollapse}
              onToggle={() => handleToggle(environment.id)}
              useHover={useHover}
            />
          </div>
        );
      })}
    </div>
  );
}

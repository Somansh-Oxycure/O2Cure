"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EnvironmentTab } from "@/features/solutions/types";
import { environmentTabs } from "@/features/solutions/content";

interface EnvironmentTabBarProps {
  active: EnvironmentTab;
  onChange: (tab: EnvironmentTab) => void;
}

/**
 * EnvironmentTabBar — blueprint §1.2
 * Desktop: clean typographic tab row.
 * Mobile: horizontally scrollable tab strip.
 * Active: O2 Green text + underline. Inactive: #6B7280.
 */
export function EnvironmentTabBar({ active, onChange }: EnvironmentTabBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Select environment sector"
      className="relative w-full border-b border-[#E5E7EB] bg-white"
    >
      {/* Mobile fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-white to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-white to-transparent md:hidden" />

      <div
        className="
          flex overflow-x-auto px-4 [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
          md:justify-center md:overflow-visible md:px-0
        "
      >
        {environmentTabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              id={`env-tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`env-panel-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative shrink-0 px-5 py-4 text-[0.85rem] font-semibold",
                "tracking-[-0.01em] whitespace-nowrap transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/40 focus-visible:ring-offset-2",
                isActive
                  ? "text-[#3A7D2A]"
                  : "text-[#6B7280] hover:text-[#1C1C1C]"
              )}
            >
              {tab.label}
              {/* Active underline */}
              {isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3A7D2A]"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

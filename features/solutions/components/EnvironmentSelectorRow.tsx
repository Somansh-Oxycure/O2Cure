"use client";

import { useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  environmentSectors,
  type EnvironmentSectorId,
} from "@/features/solutions/data/productCatalog";

interface EnvironmentSelectorRowProps {
  active: EnvironmentSectorId;
  onChange: (id: EnvironmentSectorId) => void;
}

/**
 * EnvironmentSelectorRow
 *
 * A clean, horizontally scrollable row of static blocks with background images.
 * No expanding/collapsing animations, just simple, proper visual blocks.
 */
export function EnvironmentSelectorRow({
  active,
  onChange,
}: EnvironmentSelectorRowProps) {
  const handleSelect = useCallback(
    (id: EnvironmentSectorId) => {
      onChange(id);
    },
    [onChange]
  );

  return (
    <div
      className="relative w-full border-b border-[#E5E7EB] bg-white pt-5 pb-5"
      role="group"
      aria-label="Select environment sector"
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 overflow-x-auto px-5 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {environmentSectors.map((sector) => {
          const isActive = active === sector.id;
          return (
            <button
              key={sector.id}
              id={`env-sector-${sector.id}`}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(sector.id)}
              className={cn(
                "group relative flex h-28 w-44 shrink-0 flex-col justify-end overflow-hidden rounded-xl border-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A7D2A]/50",
                isActive
                  ? "border-[#3A7D2A] shadow-md"
                  : "border-transparent hover:border-[#D1D5DB] hover:shadow-sm"
              )}
            >
              {/* Background Image */}
              <Image
                src={sector.image}
                alt={sector.alt}
                fill
                className="object-cover"
                sizes="176px"
                priority={isActive}
              />
              
              {/* Gradient Overlay */}
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-300",
                  isActive
                    ? "bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.3)] to-transparent"
                    : "bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.1)] group-hover:from-[rgba(0,0,0,0.8)]"
                )}
              />

              {/* Text Content */}
              <div className="relative z-10 px-3 pb-3">
                <span className="block text-[0.85rem] font-bold leading-tight text-white">
                  {sector.label}
                </span>
                {isActive && (
                  <span className="mt-0.5 block text-[0.65rem] font-medium leading-snug text-white/80 line-clamp-1">
                    {sector.stat}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

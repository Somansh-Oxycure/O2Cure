"use client";

import { motion, AnimatePresence } from "framer-motion";
import { spatialLayouts, type SpatialLayout } from "../data/mock";

interface SpatialLayoutStepProps {
  selected: string;
  onChange: (id: string) => void;
}

function LayoutIcon({ path, viewBox }: { path: string; viewBox: string }) {
  return (
    <svg viewBox={viewBox} className="h-5 w-5 fill-current" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function LayoutChip({
  layout,
  isSelected,
  onSelect,
}: {
  layout: SpatialLayout;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      id={`layout-chip-${layout.id}`}
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`group relative flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
        isSelected
          ? "border-[#C5A059] bg-[#FDFBF7] shadow-md shadow-[#C5A059]/10"
          : "border-gray-200 bg-white hover:border-[#C5A059]/40 hover:bg-[#FDFBF7] hover:shadow-sm"
      }`}
    >
      {/* Radio dot */}
      <div
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-400 ${
          isSelected
            ? "border-[#C5A059] bg-[#C5A059]"
            : "border-gray-300 group-hover:border-[#C5A059]/50"
        }`}
        aria-hidden="true"
      >
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              className="h-2 w-2 rounded-full bg-white"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Icon */}
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-400 ${
          isSelected
            ? "bg-[#C5A059] text-white"
            : "bg-[#F7F5F0] text-[#8B7C62] group-hover:bg-[#F3EFE6] group-hover:text-[#C5A059]"
        }`}
      >
        <LayoutIcon path={layout.iconPath} viewBox={layout.iconViewBox} />
      </div>

      {/* Text */}
      <div>
        <p
          className={`text-[1.05rem] font-medium leading-snug transition-colors duration-400 ${
            isSelected ? "text-[#1A1C19]" : "text-[#4B5563] group-hover:text-[#1A1C19]"
          }`}
        >
          {layout.label}
        </p>
        <p className="mt-1 text-[0.8rem] leading-[1.4] text-gray-500 font-light">
          {layout.description}
        </p>
      </div>
    </button>
  );
}

export function SpatialLayoutStep({ selected, onChange }: SpatialLayoutStepProps) {
  return (
    <div className="pt-2">
      {/* Mobile: horizontal pill scroll */}
      <div
        className="flex gap-3 overflow-x-auto pb-4 no-scrollbar md:hidden"
        role="radiogroup"
        aria-label="Select spatial layout — horizontal scroll"
      >
        {spatialLayouts.map((l) => {
          const sel = selected === l.id;
          return (
            <button
              type="button"
              key={l.id}
              id={`layout-pill-${l.id}`}
              onClick={() => onChange(l.id)}
              aria-pressed={sel}
              className={`flex-shrink-0 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.85rem] font-medium whitespace-nowrap transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                sel
                  ? "border-[#C5A059] bg-[#C5A059] text-white shadow-md shadow-[#C5A059]/20"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#C5A059]/50 hover:bg-[#FDFBF7]"
              }`}
            >
              {l.shortLabel}
            </button>
          );
        })}
      </div>

      {/* Desktop: 2-column chip grid */}
      <div
        className="hidden grid-cols-2 gap-4 md:grid"
        role="radiogroup"
        aria-label="Select your spatial layout"
      >
        {spatialLayouts.map((l) => (
          <LayoutChip
            key={l.id}
            layout={l}
            isSelected={selected === l.id}
            onSelect={() => onChange(l.id)}
          />
        ))}
      </div>
    </div>
  );
}

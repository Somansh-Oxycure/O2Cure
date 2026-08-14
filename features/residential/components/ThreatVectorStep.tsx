"use client";

import { motion, AnimatePresence } from "framer-motion";
import { threatVectors, type ThreatVector } from "../data/mock";

interface ThreatVectorStepProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

function ThreatIcon({ path, viewBox }: { path: string; viewBox: string }) {
  return (
    <svg viewBox={viewBox} className="h-6 w-6 fill-current" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function ThreatCard({
  vector,
  isSelected,
  onToggle,
}: {
  vector: ThreatVector;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      id={`threat-card-${vector.id}`}
      onClick={onToggle}
      aria-pressed={isSelected}
      className={`group relative flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
        isSelected
          ? "border-[#C5A059] bg-[#FDFBF7] shadow-lg shadow-[#C5A059]/10 -translate-y-0.5"
          : "border-gray-200 bg-white hover:border-[#C5A059]/40 hover:bg-[#FDFBF7] hover:shadow-sm"
      }`}
    >
      {/* Selection indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A059]"
            aria-hidden="true"
          >
            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
          isSelected
            ? "bg-[#C5A059] text-white"
            : "bg-[#F7F5F0] text-[#8B7C62] group-hover:bg-[#F3EFE6] group-hover:text-[#C5A059]"
        }`}
      >
        <ThreatIcon path={vector.iconPath} viewBox={vector.iconViewBox} />
      </div>

      {/* Text */}
      <div className="pr-5">
        <p
          className={`text-[0.95rem] font-semibold leading-tight transition-colors duration-500 ${
            isSelected ? "text-[#1A1C19]" : "text-[#4B5563] group-hover:text-[#1A1C19]"
          }`}
        >
          {vector.label}
        </p>
        <p className="mt-1 text-[0.75rem] leading-[1.4] text-gray-500 font-light line-clamp-2">
          {vector.description}
        </p>
      </div>
    </button>
  );
}

export function ThreatVectorStep({ selected, onChange }: ThreatVectorStepProps) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="pt-2">
      {/* Mobile: horizontal pill scroll */}
      <div
        className="flex gap-3 overflow-x-auto pb-4 no-scrollbar md:hidden"
        role="group"
        aria-label="Select air quality threats — horizontal scroll"
      >
        {threatVectors.map((v) => {
          const sel = selected.includes(v.id);
          return (
            <button
              type="button"
              key={v.id}
              id={`threat-pill-${v.id}`}
              onClick={() => toggle(v.id)}
              aria-pressed={sel}
              className={`flex-shrink-0 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.85rem] font-medium whitespace-nowrap transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                sel
                  ? "border-[#C5A059] bg-[#C5A059] text-white shadow-md shadow-[#C5A059]/20"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#C5A059]/50 hover:bg-[#FDFBF7]"
              }`}
            >
              <span className={`text-[0.8rem] ${sel ? "text-white" : "text-[#8B7C62]"}`}>
                <ThreatIcon path={v.iconPath} viewBox={v.iconViewBox} />
              </span>
              {v.shortLabel}
            </button>
          );
        })}
      </div>

      {/* Desktop: card grid */}
      <div
        className="hidden grid-cols-2 gap-3 md:grid"
        role="group"
        aria-label="Select air quality threats"
      >
        {threatVectors.map((v) => (
          <ThreatCard
            key={v.id}
            vector={v}
            isSelected={selected.includes(v.id)}
            onToggle={() => toggle(v.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 10 }}
            className="mt-6 flex items-center gap-3 overflow-hidden"
          >
            <div className="h-[1px] flex-1 bg-gray-200" />
            <p className="text-[0.75rem] font-medium uppercase tracking-widest text-[#C5A059]">
              {selected.length} threat vector{selected.length > 1 ? "s" : ""} selected
            </p>
            <div className="h-[1px] flex-1 bg-gray-200" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

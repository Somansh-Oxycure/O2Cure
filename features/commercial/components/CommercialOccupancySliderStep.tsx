"use client";

import { useId } from "react";

interface CommercialOccupancySliderStepProps {
  areaSqFt: number;
  occupancy: number;
  onAreaChange: (v: number) => void;
  onOccupancyChange: (v: number) => void;
}

interface SliderProps {
  id: string;
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}

function PremiumSlider({
  id,
  label,
  sublabel,
  value,
  min,
  max,
  step,
  unit,
  format,
  onChange,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const display = format ? format(value) : value.toString();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#2563EB]/30">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <label
            htmlFor={id}
            className="block text-[0.95rem] font-medium text-[#0F172A]"
          >
            {label}
          </label>
          <p className="mt-1 text-[0.75rem] text-gray-500 font-light">{sublabel}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <span className="text-[1.75rem] font-medium leading-none tracking-tight text-[#2563EB]">
            {display}
          </span>
          <span className="ml-1.5 text-[0.8rem] font-medium text-gray-500">
            {unit}
          </span>
        </div>
      </div>

      {/* Track */}
      <div className="relative h-1.5 rounded-full bg-[#F1F5F9]">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] transition-all duration-200"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
        {/* Thumb */}
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full border-2 border-[#2563EB] bg-white shadow-md shadow-[#2563EB]/20 transition-all duration-200"
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Min / Max labels */}
      <div className="mt-3 flex justify-between text-[0.7rem] font-medium text-gray-400">
        <span>
          {format ? format(min) : min} {unit}
        </span>
        <span>
          {format ? format(max) : max} {unit}
        </span>
      </div>
    </div>
  );
}

export function CommercialOccupancySliderStep({
  areaSqFt,
  occupancy,
  onAreaChange,
  onOccupancyChange,
}: CommercialOccupancySliderStepProps) {
  const areaId = useId();
  const occupancyId = useId();

  return (
    <div className="space-y-5 pt-2">
      <PremiumSlider
        id={areaId}
        label="Carpet Area"
        sublabel="Total floor area to be purified"
        value={areaSqFt}
        min={500}
        max={100000}
        step={500}
        unit="sq ft"
        format={(v) => v.toLocaleString("en-IN")}
        onChange={onAreaChange}
      />
      <PremiumSlider
        id={occupancyId}
        label="Workforce / Occupancy"
        sublabel="Regular occupants including employees and visitors"
        value={occupancy}
        min={10}
        max={1500}
        step={10}
        unit="people"
        onChange={onOccupancyChange}
      />

      {/* Live CFM estimate */}
      <div className="flex items-start gap-4 rounded-xl border border-[#2563EB]/20 bg-[#F8FAFC] px-5 py-4">
        <svg
          className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563EB]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-[0.8rem] leading-[1.6] text-gray-600 font-light">
          <span className="font-medium text-[#0F172A]">
            Estimated air changes:{" "}
            <span className="text-[#2563EB]">{Math.ceil((areaSqFt * 9) / 500)}&times; per hour</span>
          </span>{" "}
          <br className="hidden sm:block" />
          based on {areaSqFt.toLocaleString("en-IN")} sq ft at 9 ft ceiling height
          with {occupancy} occupant{occupancy > 1 ? "s" : ""}.
        </p>
      </div>
    </div>
  );
}

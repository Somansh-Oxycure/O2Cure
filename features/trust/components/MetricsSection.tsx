"use client";

import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import { useLiveAirCounter } from "@/features/trust/hooks/useLiveAirCounter";

// ─────────────────────────────────────────────────────────────────────────────
// Animated counter hook
// ─────────────────────────────────────────────────────────────────────────────
function useAnimatedCount(value: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    return motionValue.on("change", (v) => setDisplayValue(Math.round(v)));
  }, [motionValue]);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    if (prefersReducedMotion) {
      motionValue.set(value);
      hasAnimated.current = true;
      return;
    }
    const controls = animate(motionValue, value, {
      duration: durations.slow,
      ease: easings.premium,
    });
    hasAnimated.current = true;
    return () => controls.stop();
  }, [isInView, value, motionValue, prefersReducedMotion]);

  return { ref, displayValue };
}

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────
function IconYears() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconProjects() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconHomes() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" /><path d="M9 22V12h6v10" />
    </svg>
  );
}
function IconArea() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h4v4H3zM17 3h4v4h-4zM3 17h4v4H3zM17 17h4v4h-4z" /><line x1="7" y1="5" x2="17" y2="5" /><line x1="7" y1="19" x2="17" y2="19" /><line x1="5" y1="7" x2="5" y2="17" /><line x1="19" y1="7" x2="19" y2="17" />
    </svg>
  );
}
function IconAir() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2" /><path d="M12.59 19.41A2 2 0 1 0 14 16H2" /><path d="M17.59 11.41A2 2 0 1 1 19 8H2" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Static stat card data
// ─────────────────────────────────────────────────────────────────────────────
interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  Icon: React.ComponentType;
}

const statItems: StatItem[] = [
  { id: "metric-years", value: 15, suffix: "+ Yrs", label: "Years of Excellence", Icon: IconYears },
  { id: "metric-projects", value: 300, suffix: "+", label: "Projects Completed", Icon: IconProjects },
  { id: "metric-homes", value: 2500, suffix: "+", label: "Homes Breathing Clean Air", Icon: IconHomes },
  { id: "metric-sqft", value: 10, suffix: " Mn sq. ft.", label: "Area Air Purified", Icon: IconArea },
];

// ─────────────────────────────────────────────────────────────────────────────
// Static stat card
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ item }: { item: StatItem }) {
  const { ref, displayValue } = useAnimatedCount(item.value);

  return (
    <div className="group relative flex flex-col justify-between gap-5 p-5 sm:p-6 bg-white border-r border-gray-100 last:border-r-0 transition-colors duration-300 hover:bg-[#f7fdf9]">
      {/* Icon + label row */}
      <div className="flex items-center gap-2.5 text-brand-green/70 group-hover:text-brand-green transition-colors duration-300">
        <item.Icon />
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
          {item.label}
        </span>
      </div>

      {/* Big number */}
      <p className="font-heading font-black leading-none tracking-tight text-[2.25rem] sm:text-[2.75rem] text-gray-900">
        {item.prefix}
        <span ref={ref}>{displayValue.toLocaleString("en-IN")}</span>
        <span className="text-brand-green">{item.suffix}</span>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Live counter bottom strip
// ─────────────────────────────────────────────────────────────────────────────
function LiveCounterStrip() {
  const litres = useLiveAirCounter();
  const formatted = litres.toLocaleString("en-IN");

  const [flash, setFlash] = useState(false);
  const prevRef = useRef(litres);
  useEffect(() => {
    if (litres !== prevRef.current) {
      prevRef.current = litres;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 300);
      return () => clearTimeout(t);
    }
  }, [litres]);

  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 px-5 sm:px-6 py-4 bg-[#f4fbf6] border-t border-emerald-100 overflow-hidden">
      {/* Shimmer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_linear_infinite]" />

      {/* Left: icon + label */}
      <div className="flex items-center gap-2.5 text-brand-green shrink-0">
        <IconAir />
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-gray-400">
          Litres of Air Purified — Live Counter
        </span>
        {/* Pulsing live dot */}
        <span className="relative flex h-1.5 w-1.5 ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
      </div>

      {/* Right: big live number */}
      <p
        className={`font-heading font-black leading-none tracking-tight text-[2rem] sm:text-[2.6rem] transition-colors duration-300 ${flash ? "text-brand-green" : "text-gray-900"
          }`}
      >
        {formatted}
        <span className="ml-2 text-base font-semibold text-brand-green/70">L</span>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
export function MetricsSection() {
  return (
    <section
      id="metrics"
      aria-labelledby="metrics-heading"
      className="relative bg-[#f5f5f4] pt-4 pb-20"
    >
      <div className="mx-auto max-w-7xl mt-10 sm:mt-14 lg:mt-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal delay={0} distance={18} amount={0.3}>

          {/* Header */}
          <div className="text-center mb-14">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Our Impact
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              {/* Trusted by industries, corporates and home */}
            </h2>
          </div>

          {/* Card container */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)]">

            {/* Top row: 4 stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
              {statItems.map((item) => (
                <StatCard key={item.id} item={item} />
              ))}
            </div>

            {/* Bottom row: live counter */}
            <LiveCounterStrip />

          </div>

        </Reveal>
      </div>

      {/* Hidden accessible heading */}
      <h2 id="metrics-heading" className="sr-only">Our Impact</h2>

      {/* Gradient to blend with the bottom section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
}

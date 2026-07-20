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
  { id: "metric-projects", value: 700, suffix: "+", label: "Projects Completed", Icon: IconProjects },
  { id: "metric-homes", value: 2500, suffix: "+", label: "Homes Breathing Clean Air", Icon: IconHomes },
  { id: "metric-sqft", value: 10, suffix: "M sq. ft.", label: "Area Air Purified", Icon: IconArea },
];

// ─────────────────────────────────────────────────────────────────────────────
// Static stat card
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ item }: { item: StatItem }) {
  const { ref, displayValue } = useAnimatedCount(item.value);

  return (
    <div className="group relative flex flex-col justify-between gap-4 p-4 sm:p-5 lg:p-6 bg-white transition-colors duration-300 hover:bg-[#f7fdf9]">
      {/* Icon + label row */}
      <div className="flex items-center gap-2.5 text-brand-green/70 group-hover:text-brand-green transition-colors duration-300">
        <item.Icon />
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
          {item.label}
        </span>
      </div>

      {/* Big number */}
      <p className="font-heading font-black leading-none tracking-tight text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] text-gray-900 tabular-nums">
        {item.prefix}
        <span ref={ref}>{displayValue.toLocaleString("en-IN")}</span>
        <span className={`text-brand-green ${item.id === "metric-sqft"
          ? "text-lg sm:text-xl lg:text-3xl font-bold tracking-normal inline-block ml-1"
          : ""
          }`}>
          {item.suffix}
        </span>
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
  const currentThreshold = Math.floor(litres / 100);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 300);
    return () => clearTimeout(t);
  }, [currentThreshold]);

  return (
    <div className="relative flex flex-col items-start gap-2 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 bg-[#f4fbf6] border-t border-emerald-100 overflow-hidden sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      {/* Shimmer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_linear_infinite]" />

      {/* Left: icon + label */}
      <div className="flex items-center gap-2 text-brand-green shrink-0">
        <IconAir />
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-gray-400">
          Litres of Air Purified — Live Counter
        </span>
        {/* Pulsing live dot */}
        <span className="relative flex h-1.5 w-1.5 ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
      </div>

      {/* Right: big live number */}
      <p className={`font-heading font-black leading-none tracking-tight text-[1.5rem] sm:text-[2rem] lg:text-[2.6rem] transition-colors duration-300 tabular-nums ${flash ? "text-brand-green" : "text-gray-900"
        }`}>
        {formatted}
        <span className="ml-1.5 text-sm sm:text-base font-semibold text-brand-green/70">L</span>
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
      <div className="mx-auto max-w-7xl mt-6 sm:mt-10 lg:mt-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal delay={0} distance={18} amount={0.3}>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
              At Scale
            </span>
            <h2 className="font-heading text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]">
              One Breath at a Time
            </h2>
          </div>

          {/* Card container */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)]">

            {/* Stat cards — single column on mobile, 2-col on sm, 4-col on lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {statItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`${
                    /* Mobile: bottom border except last */
                    i < statItems.length - 1 ? "border-b sm:border-b-0" : ""
                    } ${
                    /* sm+: right border except last in row */
                    "sm:[&:nth-child(odd)]:border-r"
                    } ${
                    /* sm 2-col: bottom border for top row */
                    i < 2 ? "sm:border-b lg:border-b-0" : ""
                    } ${
                    /* lg 4-col: right border except last */
                    i < statItems.length - 1 ? "lg:border-r" : ""
                    } border-gray-100`}
                >
                  <StatCard item={item} />
                </div>
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

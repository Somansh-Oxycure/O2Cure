"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useAnimatedCounter } from "@/features/trust/hooks/useAnimatedCounter";
import type { RecognitionMetric } from "@/features/trust/types";

interface RecognitionStripProps {
  metrics: RecognitionMetric[];
}

function RecognitionMetricItem({ metric, index }: { metric: RecognitionMetric; index: number }) {
  const { ref, displayValue } = useAnimatedCounter({ value: metric.value });

  const accentColors = [
    "from-brand-green/20 to-brand-blue/10",
    "from-brand-blue/20 to-brand-green/10",
    "from-brand-green/20 to-brand-blue/10",
    "from-brand-blue/20 to-brand-green/10",
  ];

  const numberColors = [
    "text-brand-green",
    "text-brand-blue",
    "text-brand-green",
    "text-brand-blue",
  ];

  return (
    <div
      className={`group relative flex flex-1 flex-col items-center text-center overflow-hidden rounded-2xl border border-border/30 bg-white px-6 py-8 shadow-soft transition-shadow duration-500 ease-premium hover:shadow-elevated sm:px-8 sm:py-10 w-full h-full`}
    >
      {/* Background gradient glow */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${accentColors[index % 4]} opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none`}
      />

      {/* Number */}
      <p
        className={`relative font-heading text-[clamp(2.25rem,1.8rem+1.5vw,3.25rem)] font-bold tracking-tight ${numberColors[index % 4]}`}
      >
        <span ref={ref}>
          {metric.prefix}
          {displayValue.toLocaleString("en-IN")}
          {metric.suffix}
        </span>
      </p>

      {/* Label */}
      <p className="relative mt-2 text-sm font-medium text-muted-foreground sm:text-base">
        {metric.label}
      </p>

      {/* Bottom accent line */}
      <div
        aria-hidden
        className={`absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r ${accentColors[index % 4].replace("/20", "").replace("/10", "")} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />
    </div>
  );
}

/**
 * Recognition metrics strip — used as a standalone section between
 * Environment and Trust, giving the numbers prominent placement.
 */
export function RecognitionStrip({ metrics }: RecognitionStripProps) {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
      <Reveal delay={0.04} distance={20} amount={0.2}>
        <ul
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:gap-8"
          aria-label="Recognition metrics"
        >
          {metrics.map((metric, index) => (
            <li key={metric.id} className="flex flex-col h-full">
              <RecognitionMetricItem metric={metric} index={index} />
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useAnimatedCounter } from "@/features/trust/hooks/useAnimatedCounter";
import type { RecognitionMetric } from "@/features/trust/types";

interface RecognitionStripProps {
  metrics: RecognitionMetric[];
}

function RecognitionMetricItem({ metric }: { metric: RecognitionMetric }) {
  const { ref, displayValue } = useAnimatedCounter({ value: metric.value });

  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-heading text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-semibold tracking-tight text-foreground">
        <span ref={ref}>
          {metric.prefix}
          {displayValue.toLocaleString("en-IN")}
          {metric.suffix}
        </span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        {metric.label}
      </p>
    </div>
  );
}

/**
 * Horizontal recognition strip — numbers animate once on viewport entry.
 */
export function RecognitionStrip({ metrics }: RecognitionStripProps) {
  return (
    <Reveal delay={0.08} distance={20} amount={0.25}>
      <div
        className="mx-auto max-w-5xl border-y border-border/50 py-12 sm:py-14"
        aria-label="Recognition metrics"
      >
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
          {metrics.map((metric) => (
            <li key={metric.id}>
              <RecognitionMetricItem metric={metric} />
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

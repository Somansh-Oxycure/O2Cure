"use client";

import { Clock, Home, LayoutGrid, Scan } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { useAnimatedCount } from "@/features/trust/components/MetricsSection";

/**
 * AuditStatsStrip — single-row impact metrics (same data and counter
 * behaviour as the home page MetricsSection, in the compact Figma layout).
 */

interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  Icon: typeof Clock;
}

const STATS: readonly Stat[] = [
  { id: "audit-stat-years", value: 15, suffix: "+ Yrs", label: "Years of Excellence", Icon: Clock },
  { id: "audit-stat-projects", value: 700, suffix: "+", label: "Projects Completed", Icon: LayoutGrid },
  { id: "audit-stat-homes", value: 2500, suffix: "+", label: "Homes Breathing Clean Air", Icon: Home },
  { id: "audit-stat-area", value: 10, suffix: "M sq. ft.", label: "Area Air Purified", Icon: Scan },
];

function StatItem({ stat }: { stat: Stat }) {
  const { ref, displayValue } = useAnimatedCount(stat.value);

  return (
    <div className="flex flex-col gap-3 px-5 py-5 sm:px-7 sm:py-6">
      <div className="flex items-center gap-2 text-brand-green">
        <stat.Icon className="size-3.5" aria-hidden />
        <span className="text-[0.6rem] font-medium tracking-wide text-muted-foreground sm:text-[0.65rem]">
          {stat.label}
        </span>
      </div>
      <p className="font-heading text-[1.6rem] font-bold leading-none tracking-tight text-[#14172B] tabular-nums sm:text-[2rem]">
        <span ref={ref}>{displayValue.toLocaleString("en-IN")}</span>
        <span className="ml-0.5 font-semibold text-brand-green">{stat.suffix}</span>
      </p>
    </div>
  );
}

export function AuditStatsStrip() {
  return (
    <section
      id="audit-stats"
      aria-label="O2Cure impact in numbers"
      className="bg-white px-4 py-8 sm:px-6 lg:px-8"
    >
      <Reveal delay={0} distance={16} amount={0.3}>
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-border rounded-3xl bg-[#F2F5F1] lg:grid-cols-4 lg:divide-x [&>div:nth-child(-n+2)]:border-b [&>div:nth-child(-n+2)]:border-border lg:[&>div:nth-child(-n+2)]:border-b-0">
          {STATS.map((stat) => (
            <div key={stat.id} id={stat.id}>
              <StatItem stat={stat} />
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

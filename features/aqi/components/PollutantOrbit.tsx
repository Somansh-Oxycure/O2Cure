"use client";

import { motion } from "framer-motion";

import { easings } from "@/components/motion/easings";
import type { PollutantReading } from "@/features/aqi/data/pollutants";
import { HERO_POLLUTION_COLORS } from "@/lib/particles/heroLanguage";
import { cn } from "@/lib/utils";

const ORBIT_ANGLES = [210, 270, 330, 30, 90, 150] as const;

interface PollutantOrbitProps {
  pollutants: PollutantReading[];
  className?: string;
}

export function PollutantOrbit({ pollutants, className }: PollutantOrbitProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {pollutants.map((pollutant, i) => {
        const angleDeg = ORBIT_ANGLES[i] ?? i * 60;
        const angleRad = ((angleDeg - 90) * Math.PI) / 180;
        const r = 18;
        const x = Math.cos(angleRad) * r;
        const y = Math.sin(angleRad) * r;

        return (
          <div
            key={pollutant.id}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}vmin), calc(-50% + ${y}vmin))`,
            }}
          >
            <PollutantLabel pollutant={pollutant} tintIndex={i} />
          </div>
        );
      })}
    </div>
  );
}

function PollutantLabel({
  pollutant,
  tintIndex,
}: {
  pollutant: PollutantReading;
  tintIndex: number;
}) {
  const tint =
    HERO_POLLUTION_COLORS[tintIndex % HERO_POLLUTION_COLORS.length]!;

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="relative flex h-4 w-8 items-center justify-center">
        {[0, 1, 2].map((n) => (
          <motion.span
            key={n}
            aria-hidden
            className="absolute rounded-full"
            style={{
              width: 2 + n * 2,
              height: 2 + n * 2,
              background: tint,
              filter: "blur(1px)",
            }}
            animate={{
              x: [0, (n - 1) * 4, 0],
              y: [0, -3 - n * 2, 0],
              opacity: [0.35, 0.7, 0.35],
            }}
            transition={{
              duration: 3.2 + n * 0.6,
              repeat: Infinity,
              ease: easings.idle,
              delay: n * 0.4,
            }}
          />
        ))}
      </div>

      <p className="text-eyebrow tracking-widest text-muted-foreground/80">
        {pollutant.name}
      </p>

      <p className="text-sm font-medium tabular-nums text-foreground/90">
        {pollutant.value}
        <span className="ml-1 text-xs font-normal text-muted-foreground">
          {pollutant.unit}
        </span>
      </p>
    </div>
  );
}

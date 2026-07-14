"use client";

import { Reveal } from "@/components/motion/Reveal";
import { LogoItem } from "@/features/trust/components/LogoItem";
import type { ClientLogo } from "@/features/trust/types";

interface LogoWallProps {
  logos: ClientLogo[];
}

/**
 * Premium infinite-scroll logo marquee — two rows, opposite directions,
 * fade masks on the sides for a polished bleed effect.
 */
export function LogoWall({ logos }: LogoWallProps) {
  // Split logos into two rows for a richer visual
  const half = Math.ceil(logos.length / 2);
  const row1 = logos.slice(0, half);
  const row2 = logos.slice(half);

  return (
    <Reveal delay={0} distance={20} amount={0.2}>
      <div className="relative overflow-hidden">
        {/* Left + right fade masks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent sm:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent sm:w-32"
        />

        {/* Row 1 — scrolls left */}
        <MarqueeRow logos={row1} direction="left" speed={100} />

        {/* Divider */}
        <div className="my-4 sm:my-5" />

        {/* Row 2 — scrolls right */}
        <MarqueeRow logos={row2} direction="right" speed={100} />
      </div>
    </Reveal>
  );
}

interface MarqueeRowProps {
  logos: ClientLogo[];
  direction: "left" | "right";
  speed: number; // seconds for one full cycle
}

function MarqueeRow({ logos, direction, speed }: MarqueeRowProps) {
  // Duplicate the array so the loop is seamless
  const doubled = [...logos, ...logos];

  return (
    <div
      className="flex w-full overflow-hidden"
      aria-hidden={direction === "right"} // only announce the first row to screen readers
    >
      <ul
        className="flex shrink-0 items-center"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((logo, i) => (
          <li key={`${logo.id}-${i}`} className="mx-4 flex w-32 shrink-0 items-center justify-center sm:mx-6 sm:w-40 lg:mx-8 lg:w-48">
            <LogoItem logo={logo} />
          </li>
        ))}
      </ul>

      {/* Aria-visible duplicate for seamless loop */}
      <ul
        className="flex shrink-0 items-center"
        aria-hidden
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((logo, i) => (
          <li key={`${logo.id}-dup-${i}`} className="mx-4 flex w-32 shrink-0 items-center justify-center sm:mx-6 sm:w-40 lg:mx-8 lg:w-48">
            <LogoItem logo={logo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

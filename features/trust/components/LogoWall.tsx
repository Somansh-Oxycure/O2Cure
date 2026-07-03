"use client";

import { Reveal } from "@/components/motion/Reveal";
import { LogoItem } from "@/features/trust/components/LogoItem";
import type { ClientLogo } from "@/features/trust/types";

interface LogoWallProps {
  logos: ClientLogo[];
}

/**
 * Premium logo wall — balanced responsive grid, generous spacing, no carousel.
 */
export function LogoWall({ logos }: LogoWallProps) {
  return (
    <ul
      className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-14"
      aria-label="Client and partner logos"
    >
      {logos.map((logo, index) => (
        <li key={logo.id} className="flex items-center justify-center">
          <Reveal delay={index * 0.05} distance={18} amount={0.2}>
            <LogoItem logo={logo} className="w-full" />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

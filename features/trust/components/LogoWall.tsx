/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
} from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LogoItem } from "@/features/trust/components/LogoItem";
import type { ClientLogo } from "@/features/trust/types";

interface LogoWallProps {
  logos: ClientLogo[];
}

/**
 * Premium infinite-scroll logo marquee — two rows, opposite directions,
 * fade masks on the sides for a polished bleed effect. Drag to pan!
 */
export function LogoWall({ logos }: LogoWallProps) {
  // Split logos into two rows for a richer visual
  const half = Math.ceil(logos.length / 2);
  const row1 = logos.slice(0, half);
  const row2 = logos.slice(half);

  // Speed: lower is faster. Changed from 100 to 40 for a faster marquee
  const speed = 40;

  return (
    <Reveal delay={0} distance={20} amount={0.2}>
      <div className="relative overflow-hidden">
        {/* Left + right fade masks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24 lg:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24 lg:w-32"
        />

        {/* Row 1 — scrolls left */}
        <MarqueeRow logos={row1} direction="left" speed={speed} />

        {/* Divider */}
        <div className="my-4 sm:my-5" />

        {/* Row 2 — scrolls right */}
        <MarqueeRow logos={row2} direction="right" speed={speed} />
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
  const [contentWidth, setContentWidth] = useState(0);
  const measureRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!measureRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setContentWidth(entry.contentRect.width);
    });
    observer.observe(measureRef.current);
    return () => observer.disconnect();
  }, []);

  const x = useMotionValue(0);
  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!contentWidth) return;
    
    let currentX = x.get();

    // Auto-scroll if not dragging
    if (!isDragging.current) {
      const velocity = contentWidth / speed;
      const moveBy = (direction === "left" ? -1 : 1) * velocity * (delta / 1000);
      currentX += moveBy;
      x.set(currentX);
    }

    // Seamless wrap
    // Ensure x always stays between -contentWidth and 0
    if (currentX <= -contentWidth || currentX > 0) {
      x.set(wrap(-contentWidth, 0, currentX));
    }
  });

  return (
    <div className="flex w-full overflow-hidden cursor-grab active:cursor-grabbing [&_img]:pointer-events-none">
      <motion.div
        className="flex"
        style={{ x }}
        drag="x"
        onDragStart={() => {
          isDragging.current = true;
        }}
        onDragEnd={() => {
          isDragging.current = false;
        }}
        dragElastic={0}
        dragMomentum={true}
      >
        <ul ref={measureRef} className="flex shrink-0 items-center">
          {logos.map((logo, i) => (
            <li
              key={`${logo.id}-${i}`}
              className="mx-2 flex w-20 shrink-0 items-center justify-center sm:mx-5 sm:w-36 lg:mx-8 lg:w-48"
            >
              <LogoItem logo={logo} />
            </li>
          ))}
        </ul>
        <ul className="flex shrink-0 items-center" aria-hidden>
          {logos.map((logo, i) => (
            <li
              key={`${logo.id}-dup-${i}`}
              className="mx-2 flex w-20 shrink-0 items-center justify-center sm:mx-5 sm:w-36 lg:mx-8 lg:w-48"
            >
              <LogoItem logo={logo} />
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

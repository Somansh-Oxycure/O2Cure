"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  wrap,
} from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

import type { Certification } from "@/features/trust/types";

interface CertificationBadgesProps {
  certifications: Certification[];
}

function CertificationBadge({ certification }: { certification: Certification }) {
  const hasImage = Boolean(certification.badge.src);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {hasImage ? (
        <Image
          src={certification.badge.src}
          alt={certification.badge.alt}
          width={certification.badge.width ?? 72}
          height={certification.badge.height ?? 72}
          className="h-12 w-auto max-w-[6rem] object-contain transition-transform duration-300 hover:scale-105 sm:h-16 sm:max-w-[8rem] lg:h-20 lg:max-w-[10rem]"
        />
      ) : (
        <span
          className={cn(
            "inline-flex min-w-[3.25rem] items-center justify-center rounded-md border border-border/60 px-3 py-1.5",
            "text-eyebrow font-medium tracking-[0.16em] text-muted-foreground",
            "transition-colors duration-500 ease-premium hover:text-foreground",
          )}
        >
          {certification.name}
        </span>
      )}
    </div>
  );
}

/**
 * Premium infinite-scroll certification marquee. Drag to pan!
 */
export function CertificationBadges({ certifications }: CertificationBadgesProps) {
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
  const speed = 40; // seconds for one full cycle

  useAnimationFrame((t, delta) => {
    if (!contentWidth) return;
    
    let currentX = x.get();

    // Auto-scroll if not dragging
    if (!isDragging.current) {
      const velocity = contentWidth / speed;
      const moveBy = -1 * velocity * (delta / 1000);
      currentX += moveBy;
      x.set(currentX);
    }

    // Seamless wrap
    if (currentX <= -contentWidth || currentX > 0) {
      x.set(wrap(-contentWidth, 0, currentX));
    }
  });

  return (
    <Reveal delay={0.1} distance={16} amount={0.3}>
      <div className="relative mx-auto w-full overflow-hidden">
        {/* Left + right fade masks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24 lg:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24 lg:w-32"
        />

        <div className="flex w-full overflow-hidden cursor-grab active:cursor-grabbing [&_img]:pointer-events-none py-4">
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
            <ul ref={measureRef} className="flex shrink-0 items-center gap-12 sm:gap-16 lg:gap-24 px-6 sm:px-8 lg:px-12">
              {certifications.map((certification, i) => (
                <li
                  key={`${certification.id}-${i}`}
                  className="flex shrink-0 items-center justify-center"
                >
                  <CertificationBadge certification={certification} />
                </li>
              ))}
            </ul>
            <ul className="flex shrink-0 items-center gap-12 sm:gap-16 lg:gap-24 px-6 sm:px-8 lg:px-12" aria-hidden>
              {certifications.map((certification, i) => (
                <li
                  key={`${certification.id}-dup-${i}`}
                  className="flex shrink-0 items-center justify-center"
                >
                  <CertificationBadge certification={certification} />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
}

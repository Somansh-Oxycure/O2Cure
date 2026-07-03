"use client";

import { motion, useReducedMotion } from "framer-motion";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";

const PARTICLES = [
  { left: "14%", top: "22%", size: 4, delay: 0 },
  { left: "38%", top: "12%", size: 5, delay: 0.4 },
  { left: "62%", top: "28%", size: 4, delay: 0.8 },
  { left: "82%", top: "18%", size: 3, delay: 1.2 },
  { left: "52%", top: "42%", size: 3, delay: 0.6 },
] as const;

interface AmbientParticlesProps {
  className?: string;
}

/**
 * Soft clean-air motes that continue drifting behind the success message.
 */
export function AmbientParticles({ className = "" }: AmbientParticlesProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-brand-green/20 blur-[0.5px]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.35 }
              : {
                  y: [0, -18, -6, -22],
                  opacity: [0.2, 0.45, 0.25, 0.4],
                }
          }
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: easings.idle,
            delay: particle.delay,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 40%, rgba(180, 230, 215, 0.14) 0%, transparent 72%)",
        }}
      />
    </div>
  );
}

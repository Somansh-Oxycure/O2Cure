"use client";

import { motion, useReducedMotion } from "framer-motion";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";

const PARTICLES = [
  { left: "18%", top: "28%", size: 3, delay: 0 },
  { left: "48%", top: "16%", size: 3, delay: 0.6 },
  { left: "72%", top: "34%", size: 2, delay: 1.1 },
] as const;

interface FooterParticlesProps {
  className?: string;
}

/**
 * Very subtle clean-air motes — lower density than Hero or Contact success.
 */
export function FooterParticles({ className = "" }: FooterParticlesProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-brand-blue/10 blur-[0.5px]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.2 }
              : {
                  y: [0, -14, -4, -18],
                  opacity: [0.12, 0.28, 0.16, 0.24],
                }
          }
          transition={{
            duration: 10 + index * 1.5,
            repeat: Infinity,
            ease: easings.idle,
            delay: particle.delay,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(180, 230, 215, 0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

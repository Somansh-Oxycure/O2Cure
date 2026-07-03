"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import type { ConsultationHighlight } from "@/features/contact/types";

interface ConsultationHighlightsProps {
  highlights: ConsultationHighlight[];
}

/**
 * Simple text rows with subtle icons — not feature cards.
 */
export function ConsultationHighlights({
  highlights,
}: ConsultationHighlightsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ul className="mt-10 space-y-4 sm:mt-12 sm:space-y-5">
      {highlights.map((highlight, index) => (
        <Reveal key={highlight.id} delay={0.28 + index * 0.06} distance={16}>
          <li className="flex items-center gap-3">
            <motion.span
              aria-hidden
              className="flex size-5 shrink-0 items-center justify-center rounded-full border border-brand-green/30 text-brand-green"
              initial={false}
              whileInView={
                prefersReducedMotion
                  ? undefined
                  : { scale: [0.92, 1], opacity: [0.6, 1] }
              }
              viewport={{ once: true, amount: 0.8 }}
              transition={{
                duration: durations.fast,
                ease: easings.premium,
                delay: index * 0.05,
              }}
            >
              <Check className="size-3" strokeWidth={2.25} />
            </motion.span>
            <span className="text-body-lg text-foreground/85">
              {highlight.label}
            </span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

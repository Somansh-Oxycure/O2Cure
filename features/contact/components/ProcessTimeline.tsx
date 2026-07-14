"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/features/contact/content";

export function ProcessTimeline() {
  return (
    <div className="mt-12 sm:mt-16">
      <Reveal delay={0.5} distance={20}>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          What happens next?
        </h3>
      </Reveal>
      
      <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-border">
        {processSteps.map((step, index) => (
          <Reveal key={step.id} delay={0.6 + index * 0.1} distance={15}>
            <div className="relative flex items-start space-x-4">
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[3px] border-background bg-brand-green/20">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              </div>
              <div className="pt-0.5">
                <h4 className="text-sm font-medium text-foreground">
                  {step.title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

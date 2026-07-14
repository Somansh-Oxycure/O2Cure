"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { trustMetrics } from "@/features/contact/content";

export function TrustIndicators() {
  return (
    <div className="mt-10 flex flex-col space-y-6 sm:mt-12 sm:space-y-8">
      <Reveal delay={0.3} distance={20}>
        <div className="flex items-center space-x-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
            <Clock className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground text-white">
              Engineers are online
            </p>
            <p className="text-xs  text-white">
              Typical response time: {trustMetrics.find(m => m.id === "metric-response")?.value || "< 15 mins"}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.4} distance={20}>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-h3 font-semibold text-foreground">
              {trustMetrics.find(m => m.id === "metric-businesses")?.value || "500+"}
            </p>
            <p className="text-xs text-muted-foreground">Businesses Protected</p>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="size-4 text-brand-green" />
              <p className="text-sm font-medium text-foreground">FDA Compliant</p>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <CheckCircle2 className="size-4 text-brand-green" />
              <p className="text-sm font-medium text-foreground">ISO Certified</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

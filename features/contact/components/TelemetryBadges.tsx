/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { formatBrandText } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Shield, Zap } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";

/**
 * TelemetryImpactBadges — impact metrics strip in light/white theme.
 * Fact-checked against project docs.
 */

const IMPACT_METRICS = [
  {
    id: "metric-deployments",
    value: "700+",
    label: "Enterprise Deployments",
    sublabel: "Across 20+ cities in India",
  },
  {
    id: "metric-hvac",
    value: "15+",
    label: "Years HVAC Engineering",
    sublabel: "Oxycure Pvt. Ltd. — established 2009",
  },
  {
    id: "metric-throughput",
    value: "10M+",
    label: "Litres Processed / Hr",
    sublabel: "Combined purification throughput",
  },
  {
    id: "metric-clients",
    value: "117",
    label: "Enterprise Partners",
    sublabel: "Govt, IT, Healthcare & more",
  },
] as const;

const CERT_BADGES = [
  { id: "cert-nabl", label: "NABL Certified" },
  { id: "cert-ul",   label: "UL Listed"       },
  { id: "cert-ce",   label: "CE Marked"        },
  { id: "cert-rohs", label: "RoHS Compliant"   },
] as const;

export function TelemetryImpactBadges() {
  return (
    <section
      id="contact-impact"
      aria-label="O₂Cure impact metrics"
      className="bg-background py-6"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">

        {/* Metric strip */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {IMPACT_METRICS.map((metric, i) => (
            <Reveal key={metric.id} delay={i * 0.08} distance={12}>
              <div className="flex flex-col items-start bg-background p-6 sm:p-7 transition-colors duration-300 hover:bg-accent/40">
                <span className="font-heading text-[clamp(1.9rem,3.5vw,2.6rem)] font-bold leading-none tracking-[-0.03em] text-brand-green">
                  {metric.value}
                </span>
                <span className="mt-1.5 text-[0.82rem] font-semibold text-foreground">
                  {metric.label}
                </span>
                <span className="mt-0.5 text-[0.7rem] text-muted-foreground">
                  {metric.sublabel}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cert chips + SLA */}
        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Cert chips */}
          <div className="flex flex-wrap gap-2">
            {CERT_BADGES.map((cert) => (
              <span
                key={cert.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/50 px-3 py-1 text-[0.66rem] font-semibold tracking-wide text-muted-foreground"
              >
                <Shield className="size-2.5 text-brand-green shrink-0" />
                {cert.label}
              </span>
            ))}
          </div>

          {/* SLA Response Guarantee */}
          <div className="inline-flex items-center gap-3 rounded-2xl border border-brand-green/20 bg-[#EAF5E4] px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green/15">
              <Zap className="size-3.5 text-brand-green" />
            </div>
            <div>
              <p className="text-[0.74rem] font-bold text-foreground leading-none">
                Response Guarantee
              </p>
              <p className="mt-0.5 text-[0.66rem] leading-snug text-muted-foreground">
                {formatBrandText("An O2Cure specialist will reach out within 24 hours")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

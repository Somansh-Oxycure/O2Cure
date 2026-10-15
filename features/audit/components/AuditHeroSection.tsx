import { Clock } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { AuditBookingForm } from "@/features/audit/components/AuditBookingForm";
import { formatBrandText } from "@/lib/brand";

/**
 * AuditHeroSection — Section 1 of the Free Air Audit landing page.
 * Left: logo, eyebrow, headline, supporting copy, SLA badge.
 * Right: booking form card.
 */
export function AuditHeroSection() {
  return (
    <section
      id="audit-hero"
      aria-labelledby="audit-hero-heading"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#F2F5F1] py-28 lg:py-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-24 top-1/4 h-[560px] w-[560px] opacity-60 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(58,125,42,0.14) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-[clamp(3rem,8vw,9rem)] lg:px-[clamp(2rem,5vw,4rem)]">
        {/* Left column */}
        <div className="flex flex-col">
          <Reveal delay={0} distance={16}>
            <Image
              src="/O2cure-final-logo.png"
              alt="O2Cure — Take a Deep Breath"
              width={150}
              height={110}
              priority
              className="mb-14 h-auto w-[110px] sm:w-[130px]"
            />
          </Reveal>

          <Reveal delay={0.08} distance={16}>
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden className="h-px w-5 bg-brand-green/60" />
              <span className="text-[1.05rem] font-semibold tracking-[0.14em] text-brand-green">
                Get in Touch
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.16} distance={22}>
            <h1
              id="audit-hero-heading"
              className="font-heading text-[clamp(2.2rem,4.4vw,3.4rem)] font-normal leading-[1.18] tracking-[-0.01em] text-foreground"
            >
              Free Indoor Air Quality Audit in Delhi NCR
            </h1>
          </Reveal>

          <Reveal delay={0.26} distance={18}>
            <p className="mt-6 max-w-xs text-[0.82rem] leading-relaxed text-muted-foreground">
              We measure PM2.5, CO2 and VOCs on-site and design a fix that works
              with your current set up.
            </p>
          </Reveal>

          <Reveal delay={0.36} distance={14}>
            <div className="mt-14 inline-flex max-w-full items-center gap-3 rounded-full border border-brand-green/20 bg-[#E6F2DF] py-3 pl-4 pr-8">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-green/15">
                <Clock className="size-4 text-brand-green" aria-hidden />
              </span>
              <div>
                <p className="text-[0.78rem] font-semibold text-foreground">
                  24-Hour Response Guarantee
                </p>
                <p className="mt-0.5 text-[0.64rem] text-muted-foreground">
                  {formatBrandText(
                    "An O2Cure Air Quality Specialist will reach out personally",
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right column */}
        <Reveal delay={0.14} distance={24}>
          <AuditBookingForm className="mx-auto max-w-[540px] lg:ml-auto" />
        </Reveal>
      </div>
    </section>
  );
}

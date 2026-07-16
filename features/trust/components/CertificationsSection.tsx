"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CertificationBadges } from "@/features/trust/components/CertificationBadges";
import { certifications } from "@/features/trust/content";

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative bg-background py-4"
    >
      <div className="px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        {/* ── Certifications ── */}
        <div>
          <Reveal delay={0.06} distance={14} amount={0.3}>
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
                <p
                  id="certifications-heading"
                  className="text-eyebrow font-semibold uppercase tracking-widest text-muted-foreground text-xs"
                >
                  Certiffied &amp; Compliant
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
              </div>
              <CertificationBadges certifications={certifications} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

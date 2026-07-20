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
              <div className="mb-8 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-brand-green/35" />
                <p
                  id="certifications-heading"
                  className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green"
                >
                  Our Certificates
                </p>
                <span className="h-px w-10 bg-brand-green/35" />
              </div>
              <CertificationBadges certifications={certifications} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

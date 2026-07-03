"use client";

import { Reveal } from "@/components/motion/Reveal";
import type { ContactDetail } from "@/features/contact/types";

interface ContactInfoProps {
  details: ContactDetail[];
}

export function ContactInfo({ details }: ContactInfoProps) {
  return (
    <dl className="mt-10 space-y-6 sm:mt-12 sm:space-y-7">
      {details.map((detail, index) => (
        <Reveal key={detail.id} delay={0.18 + index * 0.05} distance={18}>
          <div className="grid gap-1.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="text-sm font-medium tracking-wide text-muted-foreground">
              {detail.label}
            </dt>
            <dd className="text-body-lg text-foreground">
              {detail.href ? (
                <a
                  href={detail.href}
                  className="transition-colors duration-300 ease-premium hover:text-brand-blue"
                >
                  {detail.value}
                </a>
              ) : (
                detail.value
              )}
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}

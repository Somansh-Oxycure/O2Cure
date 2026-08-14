/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { easings } from "@/components/motion/easings";
import { formatBrandText } from "@/lib/brand";
import { AdvancedEnquiryForm } from "@/features/contact/components/AdvancedEnquiryForm";

/**
 * ContactFormSection — two-column editorial layout in the site's standard light theme.
 * Left: trust signals, highlights, contact details, maps. Right: form.
 */

const CONTACT_DETAILS = [
  {
    id: "hq-phone",
    icon: Phone,
    label: "Direct Line",
    value: "918010111177",
    href: "tel:918010111177",
    sub: "WhatsApp available — Mon–Sat, 9 AM–7 PM IST",
  },
  {
    id: "hq-email",
    icon: Mail,
    label: "Email",
    value: "info@o2cure.in",
    href: "mailto:info@o2cure.in",
    sub: "Responses within 24 hours",
  },
  {
    id: "hq-address",
    icon: MapPin,
    label: "Headquarters",
    value: "Gurugram, Haryana, India",
    href: "https://maps.google.com/?q=O2Cure+Gurugram+Haryana",
    sub: "Sector 18, Gurugram — 122016",
  },
] as const;

const CONSULTATION_HIGHLIGHTS = [
  "Site-specific air quality assessment",
  "One-to-one with an HVAC-certified engineer",
  "Zero-obligation recommendations",
  "Full-environment purification design",
] as const;

export function ContactFormSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="relative bg-background pt-32 pb-8 overflow-hidden"
    >
      {/* Very subtle warm tint */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-0 top-0 w-[500px] h-[500px] opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(58,125,42,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,1.05fr)] lg:gap-[clamp(2.5rem,5vw,6rem)] xl:gap-20 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <Reveal delay={0} distance={16}>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-brand-green/40" aria-hidden />
                <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
                  Get in Touch
                </span>
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={0.08} distance={22}>
              <h2
                id="contact-form-heading"
                className="font-heading text-[clamp(1.9rem,4vw,3rem)] leading-[1.06] tracking-[-0.03em] text-foreground"
              >
                Speak with an{" "}
                <span className="text-brand-green">air quality</span>
                <br />
                engineer today.
              </h2>
            </Reveal>

            {/* Supporting text */}
            <Reveal delay={0.18} distance={18}>
              <p className="mt-4 max-w-md text-[0.9rem] leading-relaxed text-muted-foreground">
                Our specialists design purification systems calibrated to your space,
                your occupancy, and the pollution load your environment will carry
                for the next decade.
              </p>
            </Reveal>

            {/* Highlights */}
            <Reveal delay={0.28} distance={16}>
              <ul className="mt-6 flex flex-col gap-2.5">
                {CONSULTATION_HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-brand-green" />
                    <span className="text-[0.84rem] font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Response badge */}
            <Reveal delay={0.36} distance={14}>
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-brand-green/20 bg-[#EAF5E4] px-4 py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/15">
                  <Clock className="size-4 text-brand-green" />
                </div>
                <div>
                  <p className="text-[0.78rem] font-semibold text-foreground">
                    24-Hour Response Guarantee
                  </p>
                  <p className="text-[0.67rem] text-muted-foreground mt-0.5">
                    {formatBrandText("An O2Cure Air Quality Specialist will reach out personally")}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Contact details */}
            <Reveal delay={0.44} distance={14}>
              <div className="mt-8 flex flex-col gap-4">
                {CONTACT_DETAILS.map((detail) => (
                  <a
                    key={detail.id}
                    href={detail.href}
                    target={detail.id === "hq-address" ? "_blank" : undefined}
                    rel={detail.id === "hq-address" ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-3.5 transition-opacity duration-200 hover:opacity-75"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-accent/50 transition-colors duration-200 group-hover:border-brand-green/30 group-hover:bg-[#EAF5E4]">
                      <detail.icon className="size-4 text-muted-foreground group-hover:text-brand-green transition-colors duration-200" />
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase">
                        {detail.label}
                      </p>
                      <p className="text-[0.84rem] font-semibold text-foreground mt-0.5">
                        {detail.value}
                      </p>
                      <p className="text-[0.67rem] text-muted-foreground mt-0.5">{detail.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>


          </div>

          {/* ── Right column — form ── */}
          <Reveal delay={0.12} distance={24}>
            <AdvancedEnquiryForm />
          </Reveal>

        </div>

        {/* Full width Google Maps */}
        <Reveal delay={0.2} distance={24}>
          <div className="mt-12 lg:mt-16 w-full overflow-hidden rounded-[2rem] border border-border shadow-soft">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.4098600975217!2d76.99521207519491!3d28.406887194292267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d6de183c9b7%3A0x85dae1b41c626485!2zT-KCgkN1cmU!5e0!3m2!1sen!2sin!4v1785932523215!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="O₂Cure Gurugram Headquarters Location"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

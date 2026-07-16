"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/features/contact/components/EnquiryForm";
import { contactContent } from "@/features/contact/content";

/**
 * Chapter 7 — contact section.
 * Redesigned with new "Get in touch / Feel the magic in the air" heading style,
 * the long manifesto copy, checklist highlights, and a 24-hour response badge.
 */
export function ContactSection() {
  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative flex items-center bg-[#050B08] py-4 text-white overflow-hidden"
      >
        {/* Background Gradients & Ambient Effects */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[700px] opacity-20 blur-[140px]"
            style={{
              background:
                "radial-gradient(circle, rgba(180, 230, 215, 0.45) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute right-0 bottom-0 w-[500px] h-[500px] opacity-10 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 80%)",
            }}
          />
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative w-full px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_minmax(0,1fr)] lg:gap-[clamp(2rem,4vw,5rem)] xl:gap-16 items-start lg:items-center">

            {/* ── Left column ── */}
            <div className="flex flex-col z-10">

              {/* Eyebrow */}
              <Reveal delay={0} distance={20}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green/80">
                  {contactContent.eyebrow}
                </p>
              </Reveal>

              {/* Main heading */}
              <Reveal delay={0.1} distance={28}>
                <h2
                  id="contact-heading"
                  className="mt-2 font-heading text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.05] tracking-tight"
                >
                  {contactContent.eyebrowMagic}
                </h2>
              </Reveal>

              {/* Supporting paragraph */}
              <Reveal delay={0.28} distance={20}>
                <p className="mt-4 max-w-lg text-sm sm:text-[0.9375rem] leading-relaxed text-white/60">
                  {contactContent.supporting}
                </p>
              </Reveal>

              {/* Checklist highlights */}
              <Reveal delay={0.38} distance={20}>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {contactContent.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 className="size-4 shrink-0 text-brand-green" />
                      <span className="text-sm font-medium text-white/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* 24-hour response badge */}
              <Reveal delay={0.46} distance={20}>
                <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      We respond within 24 hours
                    </p>
                    <p className="text-xs text-white/50">
                      An airvenger specialist will reach out personally
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── Right column — Enquiry form ── */}
            <div className="relative z-10 lg:pt-2">
              <EnquiryForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

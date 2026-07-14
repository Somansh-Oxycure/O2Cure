"use client";

import { Reveal } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/features/contact/components/EnquiryForm";
import { ProcessTimeline } from "@/features/contact/components/ProcessTimeline";
import { TrustIndicators } from "@/features/contact/components/TrustIndicators";
import { contactContent } from "@/features/contact/content";

/**
 * Chapter 7 — redesigned contact section.
 * A premium SaaS conversion experience focusing on trust building
 * and a multi-step progressive form.
 */
export function ContactSection() {
  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative min-h-[calc(100vh-80px)] flex items-center bg-[#050B08] py-12 text-white overflow-hidden"
      >
        {/* Background Gradients & Ambient Effects */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[600px] opacity-20 blur-[120px]"
            style={{
              background: "radial-gradient(circle, rgba(180, 230, 215, 0.4) 0%, transparent 70%)"
            }}
          />
          <div
            className="absolute right-0 bottom-0 w-[500px] h-[500px] opacity-10 blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 80%)"
            }}
          />
        </div>

        <div className="relative w-full px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:gap-[clamp(3rem,6vw,7rem)] xl:gap-24 items-center">
            
            {/* Left column — Trust building, FAQs */}
            <div className="flex flex-col z-10">
              <Reveal delay={0} distance={20}>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-green">
                  {contactContent.eyebrow}
                </p>
              </Reveal>

              <Reveal delay={0.12} distance={24}>
                <h2
                  id="contact-heading"
                  className="mt-4 max-w-xl font-heading text-4xl leading-tight sm:text-5xl sm:mt-5"
                >
                  {contactContent.heading}
                </h2>
              </Reveal>

              <Reveal delay={0.26} distance={20}>
                <p className="mt-6 max-w-lg text-lg text-white/70">
                  {contactContent.supporting}
                </p>
              </Reveal>

              <TrustIndicators />
            </div>

            {/* Right column — The multi-step Enquiry form */}
            <div className="relative z-10 lg:pt-2">
               <EnquiryForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

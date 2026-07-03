"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ConsultationHighlights } from "@/features/contact/components/ConsultationHighlights";
import { ContactInfo } from "@/features/contact/components/ContactInfo";
import { EnquiryForm } from "@/features/contact/components/EnquiryForm";
import {
  consultationHighlights,
  contactContent,
  contactDetails,
} from "@/features/contact/content";

/**
 * Chapter 7 — final homepage invitation.
 * Story bridge: trust logos fade; remaining particles dissolve into
 * soft ambient light as the page reaches its cleanest visual state.
 */
export function ContactSection() {
  return (
    <>
      {/* Story bridge — logos dissolve, atmosphere brightens */}
      <div
        aria-hidden
        className="pointer-events-none relative h-[clamp(3.5rem,8vh,5.5rem)] overflow-hidden bg-background"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(248, 252, 251, 0.5) 0%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0.95) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-full opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 85% 120% at 50% 0%, rgba(255, 255, 255, 0.85) 0%, rgba(180, 230, 215, 0.08) 45%, transparent 75%)",
          }}
        />
        <div className="absolute inset-0">
          <span className="absolute left-[22%] top-[30%] size-1 rounded-full bg-brand-green/15 blur-[0.5px]" />
          <span className="absolute left-[58%] top-[20%] size-1 rounded-full bg-brand-blue/12 blur-[0.5px]" />
          <span className="absolute left-[74%] top-[35%] size-1.5 rounded-full bg-brand-green/10 blur-[0.5px]" />
        </div>
      </div>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative bg-background pb-section pt-section-sm"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(180, 230, 215, 0.06) 0%, transparent 65%)",
          }}
        />

        <div className="relative px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-[clamp(3rem,6vw,7rem)] xl:gap-24">
            {/* Left column — invitation copy, contact details, highlights */}
            <div className="flex flex-col">
              <Reveal delay={0} distance={20}>
                <p className="text-eyebrow uppercase text-brand-blue">
                  {contactContent.eyebrow}
                </p>
              </Reveal>

              <Reveal delay={0.12} distance={24}>
                <h2
                  id="contact-heading"
                  className="mt-4 max-w-xl font-heading text-h2 text-foreground sm:mt-5"
                >
                  {contactContent.heading}
                </h2>
              </Reveal>

              <Reveal delay={0.26} distance={20}>
                <p className="mt-4 max-w-lg text-body-lg text-muted-foreground sm:mt-5">
                  {contactContent.supporting}
                </p>
              </Reveal>

              <ContactInfo details={contactDetails} />

              <ConsultationHighlights highlights={consultationHighlights} />
            </div>

            {/* Right column — premium enquiry form */}
            <div className="lg:pt-2">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

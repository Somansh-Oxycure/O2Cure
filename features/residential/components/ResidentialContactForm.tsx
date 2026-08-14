"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ResidentialEnquiryForm } from "./ResidentialEnquiryForm";

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
  "Zero-obligation bespoke recommendations",
  "Full-environment purification design",
] as const;

export function ResidentialContactForm() {
  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="relative bg-white pt-24 pb-20 overflow-hidden border-t border-gray-100"
    >
      {/* Very subtle warm tint */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-0 top-0 w-[500px] h-[500px] opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(197,160,89,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,1.05fr)] lg:gap-[clamp(2.5rem,5vw,6rem)] xl:gap-20 items-start">
          {/* ── Left column ── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-[1px] w-8 bg-[#C5A059]" aria-hidden />
              <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[#C5A059]">
                Get in Touch
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              id="contact-form-heading"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#1A1C19]"
            >
              Speak with an{" "}
              <span className="text-[#C5A059]">air quality</span>
              <br />
              engineer today.
            </motion.h2>

            {/* Supporting text */}
            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="mt-5 max-w-md text-[0.95rem] leading-[1.7] text-gray-500 font-light"
            >
              Our specialists design purification systems calibrated to your bespoke space,
              your occupancy, and the precise pollution load your environment carries.
            </motion.p>

            {/* Highlights */}
            <motion.ul 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28 }}
              className="mt-8 flex flex-col gap-3"
            >
              {CONSULTATION_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-[#C5A059]" />
                  <span className="text-[0.9rem] font-medium text-[#1A1C19]">{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* Response badge */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36 }}
              className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-[#C5A059]/20 bg-[#FDFBF7] px-5 py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C5A059]/10">
                <Clock className="h-5 w-5 text-[#C5A059]" />
              </div>
              <div>
                <p className="text-[0.8rem] font-semibold text-[#1A1C19]">
                  24-Hour Response Guarantee
                </p>
                <p className="text-[0.7rem] text-gray-500 mt-1 font-light">
                  An O2Cure Environmental Specialist will reach out personally
                </p>
              </div>
            </motion.div>

            {/* Contact details */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.44 }}
              className="mt-10 flex flex-col gap-6"
            >
              {CONTACT_DETAILS.map((detail) => (
                <a
                  key={detail.id}
                  href={detail.href}
                  target={detail.id === "hq-address" ? "_blank" : undefined}
                  rel={detail.id === "hq-address" ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-4 transition-opacity duration-200 hover:opacity-80"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-[#FDFBF7] transition-colors duration-200 group-hover:border-[#C5A059]/30 group-hover:bg-[#C5A059]/5">
                    <detail.icon className="h-4 w-4 text-gray-400 group-hover:text-[#C5A059] transition-colors duration-200" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-widest text-[#8B7C62] uppercase">
                      {detail.label}
                    </p>
                    <p className="text-[0.85rem] font-semibold text-[#1A1C19] mt-1">
                      {detail.value}
                    </p>
                    <p className="text-[0.7rem] text-gray-500 mt-1 font-light">{detail.sub}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — form ── */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="rounded-3xl border border-[#C5A059]/20 bg-white p-6 shadow-xl shadow-[#C5A059]/5 md:p-8"
          >
            {/* Using the ResidentialEnquiryForm */}
            <ResidentialEnquiryForm />
          </motion.div>
        </div>

        {/* Full width Google Maps */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 lg:mt-24 w-full overflow-hidden rounded-[2rem] border border-gray-200 shadow-sm"
        >
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
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { certificationBadges } from "../data/mock";
import { clients } from "../../clientele/content";

export function CommercialSocialProofSection() {
  const commercialClients = clients.filter(c => c.category !== "residences");

  return (
    <section
      id="commercial-social-proof"
      className="bg-white py-12 md:py-16"
      aria-label="Client Testimonials and Certifications"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-14 max-w-xl text-center mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#2563EB]"
          >
            Validation & Peace of Mind
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[clamp(1.5rem,1.2rem+1.5vw,2.25rem)] font-semibold tracking-[-0.02em] text-[#0F172A]"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-3 mb-6 text-[0.95rem] leading-[1.65] text-gray-500 font-light"
          >
            From multinational corporate parks to critical healthcare facilities — trusted by the most demanding enterprises for precision air purity.
          </motion.p>
          <motion.a
            href="/clientele"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#2563EB] bg-[#2563EB] px-6 py-2.5 text-[0.85rem] font-medium text-white transition-all duration-300 hover:bg-[#1D4ED8]"
          >
            View All Clients
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>

        {/* Clientele Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {commercialClients.slice(0, 15).map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative flex items-center justify-center h-28 rounded-2xl border border-gray-100 bg-[#F8FAFC]/50 p-4 text-center transition-all duration-300 hover:border-[#2563EB]/30 hover:shadow-md overflow-hidden"
            >
              <div className="flex h-full w-full items-center justify-center transition-all duration-300">
                {/* For residences, many have placeholder logos in mock. If we have real ones we'd use Image, else we just show name */}
                {client.src.includes('placeholder') ? (
                  <div className="h-12 w-12 rounded-full bg-[#2563EB]/20 flex items-center justify-center">
                    <span className="text-[#2563EB] font-medium text-lg">{client.name.charAt(0)}</span>
                  </div>
                ) : (
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={140}
                    height={70}
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-2">
                <p className="text-[0.85rem] font-semibold text-[#0F172A] line-clamp-2">{client.name}</p>
                {client.sector && (
                  <p className="mt-1 text-[0.7rem] font-medium text-[#2563EB] line-clamp-2 leading-tight uppercase tracking-wide">{client.sector}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-3 md:gap-4"
          aria-label="Certifications and standards"
        >
          {certificationBadges.map((badge) => (
            <div
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[0.72rem] font-medium text-gray-500"
            >
              <svg
                className="h-3.5 w-3.5 fill-[#2563EB]"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

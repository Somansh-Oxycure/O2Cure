"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { certificationBadges } from "../data/mock";
import { clients } from "../../clientele/content";

export function SocialProofSection() {
  const residentialClients = clients.filter(c => c.category === "residences");

  return (
    <section
      id="residential-social-proof"
      className="bg-white py-20 md:py-28"
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
            className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#C5A059]"
          >
            Validation & Peace of Mind
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[clamp(1.5rem,1.2rem+1.5vw,2.25rem)] font-semibold tracking-[-0.02em] text-[#1A1C19]"
          >
            Chosen by India's Elite
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-3 text-[0.95rem] leading-[1.65] text-gray-500 font-light"
          >
            From bespoke single bedrooms to landmark villas — trusted by the most discerning homeowners for precision air purity.
          </motion.p>
        </div>

        {/* Clientele Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {residentialClients.slice(0, 15).map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-[#FDFBF7]/50 p-5 text-center transition-all duration-300 hover:border-[#C5A059]/30 hover:bg-white hover:shadow-sm"
            >
              <div className="flex h-12 items-center justify-center opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                {/* For residences, many have placeholder logos in mock. If we have real ones we'd use Image, else we just show name */}
                {client.src.includes('placeholder') ? (
                  <div className="h-8 w-8 rounded-full bg-[#C5A059]/20 flex items-center justify-center">
                    <span className="text-[#C5A059] font-medium text-xs">{client.name.charAt(0)}</span>
                  </div>
                ) : (
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={80}
                    height={40}
                    className="max-h-full w-auto object-contain"
                  />
                )}
              </div>
              <div>
                <p className="text-[0.75rem] font-semibold text-[#1A1C19] line-clamp-1">{client.name}</p>
                {client.sector && (
                  <p className="mt-0.5 text-[0.65rem] text-gray-500 line-clamp-2 leading-tight">{client.sector}</p>
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
                className="h-3.5 w-3.5 fill-[#C5A059]"
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

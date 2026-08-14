"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ResidentialHeroProps {
  onBeginDiagnostic: () => void;
}

export function ResidentialHero({ onBeginDiagnostic }: ResidentialHeroProps) {
  return (
    <section
      id="residential-hero"
      className="relative min-h-[92vh] w-full overflow-hidden flex items-end justify-start pb-16 md:pb-24"
      aria-label="Residential Air Purification Hero"
    >
      {/* Premium Background Image with Slow Pan */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <Image
          src="/residential/HERP_New.png"
          alt="Luxurious, healthy home interior — O2Cure residential air purification"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Cinematic Gradient Overlay - Localized strictly to left/bottom for text readability */}
        <div className="absolute left-0 bottom-0 top-0 w-full md:w-[65%] lg:w-[55%] bg-gradient-to-t from-black/90 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent" />
      </motion.div>

      {/* Content bottom left, text shadow for readability */}
      <div className="relative z-10 w-full max-w-2xl px-6 md:px-12 text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start justify-end drop-shadow-lg"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-4 flex items-center gap-3"
          >
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
              TRUSTED HOME AIR EXPERTS
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,2.5rem+2vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white max-w-lg"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}
          >
            Cleanest Air for Your Family
          </motion.h1>


          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              id="begin-diagnosis-cta"
              onClick={onBeginDiagnostic}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#C5A059] px-8 py-3.5 text-[0.95rem] font-semibold tracking-wide text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:bg-[#A88746] hover:-translate-y-0.5"
              aria-label="Begin your home air assessment"
            >
              <span className="relative z-10">Begin Assessment</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <a
              href="/products"
              id="explore-products-cta"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-transparent px-8 py-3 text-[0.95rem] font-medium tracking-wide text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white shadow-[0_4px_20px_rgb(0,0,0,0.2)]"
            >
              Explore All Products
            </a>
          </motion.div>

          {/* Trust/Solution message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8"
          >
            <p className="text-[0.7rem] font-semibold text-white/90 tracking-widest uppercase flex items-center flex-wrap gap-2.5" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              <span>Architectural Grade</span>
              <span className="text-[#C5A059]">→</span>
              <span>Whisper Quiet</span>
              <span className="text-[#C5A059]">→</span>
              <span>Zero Ozone</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

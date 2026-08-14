"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CommercialStickyConsultBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("commercial-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToDiagnostic = () => {
    document
      .getElementById("diagnostic-engine")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          role="complementary"
          aria-label="Sticky consultation call to action"
        >
          {/* Frosted glass backdrop */}
          <div className="border-t border-[#E5E7EB]/60 bg-white/80 px-4 pb-6 pt-4 backdrop-blur-xl">
            <button
              type="button"
              id="sticky-consult-cta"
              onClick={scrollToDiagnostic}
              className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#2563EB] py-4 text-[0.9rem] font-semibold text-white shadow-lg shadow-[#2563EB]/25 transition-all duration-300 active:scale-[0.98]"
              aria-label="Request consultation — scroll to diagnostic tool"
            >
              Request Consultation
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

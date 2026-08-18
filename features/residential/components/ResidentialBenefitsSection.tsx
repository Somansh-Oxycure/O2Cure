"use client";

import { motion } from "framer-motion";
import { Heart, Moon, ShieldCheck, Leaf, Wind, Smartphone } from "lucide-react";

const BENEFITS = [
  {
    id: "health",
    name: "Complete Viral Protection",
    description: "Create a safe haven. Our systems actively neutralize 99.9% of airborne viruses and bacteria before they can affect your loved ones.",
    icon: ShieldCheck,
  },
  {
    id: "sleep",
    name: "Better Sleep",
    description: "Experience the calming effect of fresh air and ventilation. Reduced allergens and optimized oxygen levels promote uninterrupted, deeper sleep cycles.",
    icon: Moon,
  },
  {
    id: "allergy",
    name: "Allergy & Asthma Relief",
    description: "Breathe freely again. We eliminate microscopic dust, pollen, and pet dander, providing immediate relief for sensitive respiratory systems.",
    icon: Heart,
  },
  {
    id: "freshness",
    name: "Pristine, Odor-Free Living",
    description: "Enjoy a home that always smells naturally fresh. Advanced carbon matrices effortlessly remove cooking odors, pet smells, and urban smog.",
    icon: Leaf,
  },
  {
    id: "pm-levels",
    name: "PM & Pollutant Reduction",
    description: "Significantly reduce PM2.5, PM10, and other harmful indoor pollutants. Ensure your family breathes air free from harmful microscopic particles.",
    icon: Wind,
  },
  {
    id: "monitoring",
    name: "Real-Time Air Monitoring",
    description: "Keep track of your indoor air quality with real-time data. Stay continuously informed about the exact purity levels of the air your family breathes directly from your smartphone.",
    icon: Smartphone,
  },
];

export function ResidentialBenefitsSection() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 md:text-center max-w-3xl md:mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex md:justify-center items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-[#10B981]" />
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#10B981]">
              A Healthier Home
            </p>
            <div className="hidden md:block h-[1px] w-8 bg-[#10B981]" />
          </motion.div>
          <motion.h2
            id="benefits-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,3vw,3rem)] font-bold text-[#0F172A] tracking-tight"
          >
            Nurture Your Family's Well-being
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-[1.05rem] leading-[1.7] text-slate-500 font-light"
          >
            True luxury is peace of mind. Transform your home into a sanctuary where every breath actively contributes to your family's vitality, longevity, and health.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="group relative rounded-3xl border border-slate-100 bg-[#F8FAFC] p-8 hover:bg-white hover:border-[#10B981]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#10B981] shadow-sm group-hover:bg-[#10B981] group-hover:text-white transition-colors duration-300">
                <benefit.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-[1.15rem] font-semibold text-[#0F172A]">
                {benefit.name}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-slate-500 font-light group-hover:text-slate-600 transition-colors duration-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

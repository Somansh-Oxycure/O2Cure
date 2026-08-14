"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Wind, Activity } from "lucide-react";

const TECHNOLOGIES = [
  {
    id: "phi",
    name: "PHI-Cell® Technology",
    description: "Proprietary Photohydroionization actively neutralizes airborne and surface pathogens by creating advanced hydro-peroxides.",
    icon: Zap,
  },
  {
    id: "tricure",
    name: "TriCure™ Technology",
    description: "Our proprietary 3-stage architectural filtration system neutralizing particulates, microbes, and VOCs simultaneously.",
    icon: Activity,
  },
  {
    id: "hepa",
    name: "Medical-Grade HEPA",
    description: "H13/H14 HEPA filtration captures 99.97% of particles down to 0.3 microns, ensuring compliance with strict healthcare standards.",
    icon: Shield,
  },
  {
    id: "voc",
    name: "Activated Carbon VOC Filters",
    description: "Deep-bed carbon matrices absorb chemical off-gassing, formaldehyde, and industrial odors commonly found in new commercial builds.",
    icon: Wind,
  },
];

export function CommercialTechnologySection() {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-20" aria-labelledby="tech-heading">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 md:text-center max-w-3xl md:mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex md:justify-center items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-[#3B82F6]" />
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">
              Core Enterprise Technologies
            </p>
            <div className="hidden md:block h-[1px] w-8 bg-[#3B82F6]" />
          </motion.div>
          <motion.h2
            id="tech-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,3vw,3rem)] font-bold text-[#0F172A] tracking-tight"
          >
            Advanced Air Engineering for Massive Scale
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-[1.05rem] leading-[1.7] text-slate-500 font-light"
          >
            Our enterprise solutions integrate directly with your central AHUs and standalone systems, leveraging cutting-edge active and passive purification methods.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TECHNOLOGIES.map((tech, i) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="group relative rounded-3xl border border-slate-200 bg-white p-8 hover:border-[#3B82F6]/30 hover:shadow-md transition-all duration-300"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F5F9] text-[#3B82F6] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                <tech.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-[1.1rem] font-semibold text-[#0F172A]">
                {tech.name}
              </h3>
              <p className="text-[0.9rem] leading-relaxed text-slate-500 font-light transition-colors duration-300">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

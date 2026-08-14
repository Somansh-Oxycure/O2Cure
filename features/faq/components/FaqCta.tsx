"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

/**
 * FAQ page CTA band.
 *
 * Positioned at the bottom of the FAQ page — mirrors the homepage CTA section's
 * editorial calm, using brand-green gradient, premium typography, and soft ambient glow.
 * Invites exploration rather than hard-selling.
 */
export function FaqCta() {
  return (
    <section
      aria-labelledby="faq-cta-heading"
      className="relative overflow-hidden bg-background py-[clamp(4rem,8vw,7rem)]"
    >
      {/* Story bridge — subtle gradient fade from content above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(245,245,244,0.6) 0%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(58,125,42,0.06) 0%, rgba(43,108,176,0.03) 50%, transparent 70%)",
          }}
        />
        {/* Particle motes */}
        <span className="absolute left-[18%] top-[30%] size-1.5 rounded-full bg-brand-green/25 blur-[0.5px]" />
        <span className="absolute left-[75%] top-[40%] size-1 rounded-full bg-brand-blue/20 blur-[0.5px]" />
        <span className="absolute left-[50%] top-[20%] size-2 rounded-full bg-brand-green/[0.12] blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        {/* Eyebrow — identical to homepage section heading pattern */}
        <motion.div
          className="mb-5 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="h-px w-10 bg-brand-green/35" />
          <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
            Still Have Questions?
          </span>
          <span className="h-px w-10 bg-brand-green/35" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="faq-cta-heading"
          className="font-heading text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        >
          Let our experts guide you
          <br />
          <span className="text-brand-green">to the right solution.</span>
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          className="mx-auto mt-5 max-w-xl text-body-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        >
          Whether you&apos;re protecting a bedroom or an entire hospital wing,
          our team will help you select, size, and deploy the right O₂Cure
          solution for your specific environment.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
        >
          {/* Primary */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_-8px_rgba(58,125,42,0.4)] transition-all duration-300 hover:bg-brand-green-hover hover:shadow-[0_6px_32px_-8px_rgba(58,125,42,0.5)]"
          >
            <MessageCircle className="size-4" aria-hidden />
            Get in Touch
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>

          {/* Secondary */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:border-brand-green/40 hover:bg-white hover:text-brand-green"
          >
            Explore Solutions
          </Link>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.p
          className="mt-7 text-xs text-muted-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          No commitment required · Expert consultation · Response within 24 hours
        </motion.p>
      </div>
    </section>
  );
}

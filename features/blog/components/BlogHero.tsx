"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { easings } from "@/components/motion/easings";

// ─── Floating particles — mirrors AboutHero & homepage pattern ──────────────
function HeroParticles() {
  const prefersReducedMotion = useReducedMotion();

  const particles = [
    { left: "8%",  top: "20%", size: 3, delay: 0    },
    { left: "86%", top: "15%", size: 2, delay: 0.7  },
    { left: "72%", top: "68%", size: 3, delay: 1.2  },
    { left: "24%", top: "70%", size: 2, delay: 0.4  },
    { left: "92%", top: "48%", size: 1.5, delay: 1.0 },
    { left: "5%",  top: "52%", size: 2, delay: 1.5  },
    { left: "48%", top: "82%", size: 1.5, delay: 0.2 },
    { left: "60%", top: "28%", size: 2, delay: 0.9  },
  ];

  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-blue-light/25"
          style={{
            left: p.left,
            top: p.top,
            width: p.size * 2,
            height: p.size * 2,
          }}
          animate={{ opacity: [0.15, 0.6, 0.15], y: [0, -12, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5 + p.delay,
            delay: p.delay,
            ease: easings.idle,
          }}
        />
      ))}
    </div>
  );
}

// ─── Scroll indicator — identical to AboutHero ──────────────────────────────
function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8, ease: easings.premium }}
      aria-hidden
    >
      <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/50 uppercase">
        Scroll
      </span>
      <motion.div
        className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent"
        animate={prefersReducedMotion ? {} : { scaleY: [1, 0.4, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: easings.idle }}
      />
    </motion.div>
  );
}

// ─── BlogHero ────────────────────────────────────────────────────────────────
export function BlogHero() {
  return (
    <section
      id="blog-hero"
      aria-labelledby="blog-hero-heading"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* ── Background featured image ── */}
      <div className="absolute inset-0">
        <Image
          src="/blog/Blog_09_feat.jpg"
          alt="Clean indoor air environment — O₂Cure intelligence archive"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay — angled, left-to-right */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.60) 55%, rgba(10,10,10,0.40) 100%)",
          }}
        />
        {/* Bottom fade to background */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#F5F5F4]"
        />
        {/* Brand-blue vignette — mirrors homepage aesthetic */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-15"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 0% 55%, rgba(43,108,176,0.30) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* ── Floating particles ── */}
      <HeroParticles />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)] pt-32 pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easings.premium }}
          >
            <span className="h-px w-10 bg-brand-blue/70" aria-hidden />
            <span className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-brand-blue-light/80">
              The Intelligence Archive
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            id="blog-hero-heading"
            className="font-heading font-bold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2.5rem, 2rem + 3.5vw, 5rem)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: easings.premium }}
          >
            Science-Led Thinking
            <br />
            <span className="text-brand-blue-light/90">
              on Air, Health &amp; Environments.
            </span>
          </motion.h1>

          {/* Sub-line */}
          <motion.p
            className="mt-7 text-base font-medium tracking-wide text-white/55 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easings.premium }}
          >
            35 posts &middot; 33,000+ words &middot; four years of O₂Cure's
            air&nbsp;quality intelligence — fact-checked and professionally
            curated.
          </motion.p>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}

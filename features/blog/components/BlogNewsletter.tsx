"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { easings } from "@/components/motion/easings";

// ─── BlogNewsletter ────────────────────────────────────────────────────────
export function BlogNewsletter() {
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section
      id="blog-newsletter"
      aria-labelledby="blog-newsletter-heading"
      className="relative overflow-hidden bg-[#0A0F0A]"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(58,125,42,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Floating particles */}
      {!prefersReducedMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {[
            { left: "10%", top: "30%", delay: 0 },
            { left: "88%", top: "20%", delay: 0.8 },
            { left: "55%", top: "70%", delay: 1.3 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-brand-green/30"
              style={{ left: p.left, top: p.top }}
              animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5 + p.delay,
                delay: p.delay,
                ease: easings.idle,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,2rem+5vw,8rem)]">
        <motion.div
          className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: easings.premium }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brand-green/60" aria-hidden />
            <span className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-brand-green">
              Every Breath Matters
            </span>
            <span className="h-px w-8 bg-brand-green/60" aria-hidden />
          </div>

          {/* Heading */}
          <h2
            id="blog-newsletter-heading"
            className="font-heading font-bold tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(1.6rem, 1rem + 2.5vw, 2.6rem)" }}
          >
            Stay Updated on Air Quality Intelligence
          </h2>

          <p className="text-base text-white/55 leading-relaxed max-w-lg">
            Receive research-backed articles on indoor air health, product
            updates and seasonal air quality guidance — delivered to your inbox.
          </p>

          {/* Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: easings.premium }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/10 px-8 py-6"
            >
              <span className="text-2xl" aria-hidden>✓</span>
              <p className="font-semibold text-white">
                Thank you for subscribing.
              </p>
              <p className="text-sm text-white/55">
                Our team will be in touch with curated air quality insights.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md"
              noValidate
              aria-label="Newsletter subscription"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Your email address"
                    className={[
                      "w-full rounded-xl border bg-white/8 px-4 py-3 text-sm text-white",
                      "placeholder:text-white/35 outline-none transition-colors",
                      "focus:border-brand-green focus:bg-white/12",
                      error ? "border-red-400" : "border-white/15",
                    ].join(" ")}
                  />
                  {error && (
                    <p role="alert" className="mt-1.5 text-left text-xs text-red-400">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  id="newsletter-submit"
                  className={[
                    "shrink-0 rounded-xl bg-brand-green px-6 py-3 text-sm font-semibold text-white",
                    "transition-all duration-200 hover:bg-brand-green-hover",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring",
                  ].join(" ")}
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}

          <p className="text-[0.7rem] text-white/30 tracking-wide">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

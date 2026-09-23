"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

/* ── HeroVideo ───────────────────────────────────────────────────────────────
 *  Full-screen video hero that sits behind the transparent navbar.
 *  - h-[100svh] fills the viewport height exactly
 *  Video source: Cloudinary CDN
 * ─────────────────────────────────────────────────────────────────────────── */

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      aria-label="O2Cure hero video"
      className="relative h-[100svh] min-h-[500px] w-full overflow-hidden bg-black"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/iofrjtqv/video/upload/v1790162015/website-Video-Draft-BB2_1.webm"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "50% 20%" }}
        aria-hidden
      />

      {/* Subtle bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Hero Content - Subtle Bottom Left */}
      <div className="pointer-events-none absolute bottom-12 left-6 z-10 flex flex-col items-start justify-end md:bottom-16 md:left-12 lg:left-16 xl:left-[5vw]">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-[clamp(1.25rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-tight text-white/95 drop-shadow whitespace-nowrap"
        >
          Great Spaces Start With Great Air
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 pointer-events-auto"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-brand-green bg-brand-green px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
          >
            Talk To An Air Expert
          </Link>
        </motion.div>
      </div>

      {/* Mute / unmute button */}
      <motion.button
        type="button"
        aria-label={muted ? "Unmute video" : "Mute video"}
        onClick={toggleMute}
        className="absolute bottom-8 right-6 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {muted ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </motion.button>

      {/* Scroll chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-heading text-[0.6rem] font-semibold tracking-[0.2em] text-white/40">
            Scroll
          </span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="animate-bounce" style={{ color: "rgba(255,255,255,0.35)" }}>
            <path d="M4 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

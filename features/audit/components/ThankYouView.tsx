"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Gauge,
  Headphones,
  Home,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import { AuditFooter } from "@/features/audit/components/AuditFooter";
import { formatBrandText } from "@/lib/brand";

interface SubmissionDetails {
  name?: string;
  phone?: string;
  email?: string;
  segment?: string;
  city?: string;
  environment?: string;
  roomsOrArea?: string;
  referenceId?: string;
  submittedAt?: string;
}

export function ThankYouView() {
  const prefersReducedMotion = useReducedMotion();
  const [submission, setSubmission] = useState<SubmissionDetails | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Retrieve stored lead details for personalization
    try {
      const stored = sessionStorage.getItem("o2cure_audit_submission");
      if (stored) {
        setSubmission(JSON.parse(stored));
      }
    } catch {
      // ignore
    }

    // 2. Push conversion event to Google Tag Manager dataLayer
    const gtmWindow = window as unknown as { dataLayer?: unknown[] };
    gtmWindow.dataLayer = gtmWindow.dataLayer || [];
    gtmWindow.dataLayer.push({
      event: "conversion_airaudit",
      event_category: "Lead Generation",
      event_action: "Form Submitted",
      event_label: "Air Audit Thank You Page",
      page_path: "/thankyou",
    });
  }, []);

  const referenceCode =
    submission?.referenceId ||
    `AUD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  const greetingName = submission?.name ? `, ${submission.name.trim()}` : "";

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F5F1] text-foreground">
      {/* Top Bar with O2Cure Logo */}
      <header className="w-full border-b border-border/40 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/airaudit"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
            aria-label="Back to Free Air Audit"
          >
            <Image
              src="/O2cure-final-logo.png"
              alt="O₂Cure"
              width={140}
              height={100}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-3.5 py-1 text-[0.72rem] font-semibold text-brand-green">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-green" />
            </span>
            Request Received
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Hero Confirmation Card */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.base, ease: easings.premium }}
            className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(58,125,42,0.22)] sm:p-10 lg:p-12"
          >
            {/* Ambient radiant glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand-green/10 blur-3xl"
            />

            <div className="relative flex flex-col items-center text-center">
              {/* Checkmark icon with pulsing glowing rings */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.15,
                  duration: 0.5,
                  ease: easings.premium,
                }}
                className="relative mb-6 flex size-20 items-center justify-center rounded-full bg-brand-green/15 sm:size-24"
              >
                <div className="absolute inset-0 animate-pulse rounded-full bg-brand-green/10" />
                <div className="flex size-14 items-center justify-center rounded-full bg-brand-green text-white shadow-[0_8px_20px_-6px_rgba(58,125,42,0.8)] sm:size-16">
                  <CheckCircle2 className="size-8 sm:size-10" strokeWidth={2.4} />
                </div>
              </motion.div>

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF5E8] px-3.5 py-1 text-[0.74rem] font-bold tracking-wide uppercase text-brand-green">
                <Sparkles className="size-3.5" />
                Air Audit Confirmed
              </div>

              {/* Headline */}
              <h1 className="mt-4 font-heading text-[clamp(1.9rem,3.8vw,2.9rem)] font-bold leading-tight tracking-[-0.02em] text-[#14172B]">
                Thank You{greetingName}!
              </h1>
              <p className="mt-2 text-[clamp(1.1rem,2vw,1.35rem)] font-medium text-foreground">
                Your Free On-Site Air Quality Audit is Booked.
              </p>

              {/* Reassuring copy */}
              <p className="mx-auto mt-3 max-w-xl text-[0.88rem] leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                {formatBrandText(
                  "A certified O2Cure Air Quality Engineer will reach out within 24 hours to review your space dynamics and confirm your visit time.",
                )}
              </p>

              {/* Reference ID Pill */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-border bg-[#F5F7F4] px-4 py-1.5 text-xs">
                  <span className="text-muted-foreground">Booking Ref:</span>
                  <span className="font-mono font-bold tracking-wider text-foreground">
                    #{referenceCode}
                  </span>
                </div>
                {submission?.city && (
                  <div className="flex items-center gap-1.5 rounded-full border border-border bg-[#F5F7F4] px-3.5 py-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 text-brand-green" />
                    <span>{submission.city}</span>
                  </div>
                )}
                {submission?.roomsOrArea && (
                  <div className="flex items-center gap-1.5 rounded-full border border-border bg-[#F5F7F4] px-3.5 py-1.5 text-xs text-muted-foreground">
                    <Home className="size-3.5 text-brand-green" />
                    <span>{submission.roomsOrArea}</span>
                  </div>
                )}
                {!submission?.roomsOrArea && submission?.environment && (
                  <div className="flex items-center gap-1.5 rounded-full border border-border bg-[#F5F7F4] px-3.5 py-1.5 text-xs text-muted-foreground">
                    <Building2 className="size-3.5 text-brand-green" />
                    <span className="capitalize">{submission.environment}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Diagnostic Snapshot Matrix */}
            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-border/50 pt-8 sm:grid-cols-4 sm:gap-4">
              <div className="flex flex-col items-center rounded-2xl bg-[#F8FAF7] p-4 text-center">
                <Clock className="size-5 text-brand-green" />
                <span className="mt-2 text-xs font-bold text-foreground">
                  Within 24 Hours
                </span>
                <span className="text-[0.68rem] text-muted-foreground">
                  Response SLA
                </span>
              </div>
              <div className="flex flex-col items-center rounded-2xl bg-[#F8FAF7] p-4 text-center">
                <ShieldCheck className="size-5 text-brand-green" />
                <span className="mt-2 text-xs font-bold text-foreground">
                  100% Free
                </span>
                <span className="text-[0.68rem] text-muted-foreground">
                  Zero Obligation
                </span>
              </div>
              <div className="flex flex-col items-center rounded-2xl bg-[#F8FAF7] p-4 text-center">
                <Gauge className="size-5 text-brand-green" />
                <span className="mt-2 text-xs font-bold text-foreground">
                  PM2.5, CO₂, VOCs
                </span>
                <span className="text-[0.68rem] text-muted-foreground">
                  Calibrated Testing
                </span>
              </div>
              <div className="flex flex-col items-center rounded-2xl bg-[#F8FAF7] p-4 text-center">
                <MapPin className="size-5 text-brand-green" />
                <span className="mt-2 text-xs font-bold text-foreground">
                  Delhi NCR
                </span>
                <span className="text-[0.68rem] text-muted-foreground">
                  On-Site Inspection
                </span>
              </div>
            </div>
          </motion.div>

          {/* What Happens Next Roadmap */}
          <motion.section
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: durations.base,
              ease: easings.premium,
            }}
            aria-labelledby="next-steps-heading"
            className="mt-8 rounded-[2rem] border border-border/60 bg-white p-6 sm:p-10"
          >
            <h2
              id="next-steps-heading"
              className="text-center font-heading text-xl font-bold tracking-[-0.01em] text-[#14172B] sm:text-2xl"
            >
              What Happens Next?
            </h2>
            <p className="mt-1 text-center text-xs text-muted-foreground sm:text-sm">
              Your 3-step pathway to cleaner, healthier indoor air
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative flex flex-col rounded-2xl border border-border/50 bg-[#F9FBF8] p-5">
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white shadow-soft">
                    01
                  </span>
                  <Headphones className="size-4 text-brand-green" />
                </div>
                <h3 className="mt-4 text-[0.92rem] font-bold text-[#14172B]">
                  Pre-Audit Discovery Call
                </h3>
                <p className="mt-2 text-[0.76rem] leading-relaxed text-muted-foreground">
                  Our certified air quality specialist contacts you to discuss
                  your space dimensions, existing HVAC/ventilation, and specific
                  concerns.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col rounded-2xl border border-border/50 bg-[#F9FBF8] p-5">
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white shadow-soft">
                    02
                  </span>
                  <Wind className="size-4 text-brand-green" />
                </div>
                <h3 className="mt-4 text-[0.92rem] font-bold text-[#14172B]">
                  On-Site Diagnostic Testing
                </h3>
                <p className="mt-2 text-[0.76rem] leading-relaxed text-muted-foreground">
                  Our engineer visits with calibrated particle counters to
                  measure PM2.5, PM10, CO₂, TVOCs, humidity, and airflow patterns
                  across your rooms.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col rounded-2xl border border-border/50 bg-[#F9FBF8] p-5">
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white shadow-soft">
                    03
                  </span>
                  <FileText className="size-4 text-brand-green" />
                </div>
                <h3 className="mt-4 text-[0.92rem] font-bold text-[#14172B]">
                  Custom Air Blueprint
                </h3>
                <p className="mt-2 text-[0.76rem] leading-relaxed text-muted-foreground">
                  Receive a clear, transparent air audit report and tailored
                  TriCure™ recommendations engineered for your layout — completely
                  free of charge.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Immediate Assistance Box */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: durations.base,
              ease: easings.premium,
            }}
            className="mt-8 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-brand-green/20 bg-[#E8F3E4] p-6 text-center sm:flex-row sm:text-left sm:p-8"
          >
            <div>
              <span className="text-[0.72rem] font-bold uppercase tracking-wider text-brand-green">
                Need Faster Assistance?
              </span>
              <h3 className="mt-1 text-base font-bold text-foreground sm:text-lg">
                Connect Directly with an Air Quality Engineer
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:max-w-md">
                If you have an urgent requirement or need immediate on-site
                scheduling, our team is available on WhatsApp and phone.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="https://wa.me/918010111177?text=Hi%20O2Cure%20team,%20I%20just%20booked%20a%20Free%20Air%20Audit%20and%20would%20like%20to%20schedule%20it"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-transform hover:scale-105"
              >
                <MessageSquare className="size-4" />
                WhatsApp Us
              </a>
              <a
                href="tel:+918010111177"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-foreground/15 bg-white px-5 text-xs font-bold text-foreground transition-colors hover:bg-foreground/5"
              >
                <Phone className="size-3.5 text-brand-green" />
                +91 8010 111 177
              </a>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-white px-7 text-xs font-bold tracking-wide uppercase text-foreground shadow-soft transition-all hover:border-foreground/30 hover:shadow-elevated"
            >
              <Home className="size-3.5 text-muted-foreground" />
              Return to Homepage
            </Link>
            <Link
              href="/products"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand-green px-7 text-xs font-bold tracking-wide uppercase text-white shadow-[0_10px_24px_-10px_rgba(58,125,42,0.7)] transition-all hover:bg-brand-green-hover hover:shadow-elevated"
            >
              <span>Explore TriCure™ Solutions</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>

      {/* Landing Footer */}
      <AuditFooter />
    </div>
  );
}

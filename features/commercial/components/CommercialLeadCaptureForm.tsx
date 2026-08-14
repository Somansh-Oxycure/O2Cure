"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";

interface CommercialLeadCaptureFormProps {
  systemName: string;
  onSubmit?: (data: LeadFormData) => void;
}

export interface LeadFormData {
  name: string;
  companyName: string;
  phone: string;
  city: string;
  systemName: string;
}

export function CommercialLeadCaptureForm({ systemName, onSubmit }: CommercialLeadCaptureFormProps) {
  const nameId = useId();
  const phoneId = useId();
  const cityId = useId();

  const companyNameId = useId();
  const [form, setForm] = useState({ name: "", companyName: "", phone: "", city: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission — replace with real API call
    await new Promise((r) => setTimeout(r, 1000));
    onSubmit?.({ ...form, systemName });
    setSubmitted(true);
    setLoading(false);
  };

  const inputBase =
    "w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3.5 text-[0.9rem] text-[#0F172A] placeholder-gray-400 outline-none transition-all duration-400 focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10 hover:border-[#2563EB]/40";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-[#2563EB]/20 bg-[#F8FAFC] p-10 text-center shadow-lg shadow-black/5"
        role="status"
        aria-live="polite"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2563EB] shadow-md shadow-[#2563EB]/20">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-[1.4rem] font-semibold text-[#0F172A]">
            Request Received
          </p>
          <p className="mt-2 text-[0.9rem] leading-[1.6] text-gray-500 font-light">
            An O2Cure Environmental Specialist will review your spatial
            parameters and contact you shortly.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-black/5 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-[1px] w-6 bg-[#2563EB]" />
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Consultation
          </p>
        </div>
        <h3 className="text-[1.5rem] font-medium tracking-tight text-[#0F172A]">
          Request Your Architectural Plan
        </h3>
        <p className="mt-2 text-[0.85rem] leading-[1.6] text-gray-500 font-light">
          Speak with our specialists to review your parameters and finalise the system layout.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor={nameId}
            className="mb-2 block text-[0.75rem] font-medium uppercase tracking-[0.05em] text-[#475569]"
          >
            Full Name
          </label>
          <input
            id={nameId}
            type="text"
            required
            autoComplete="name"
            placeholder="E.g., Rohan Mehta"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputBase}
          />
        </div>

        {/* Company Name */}
        <div>
          <label
            htmlFor={companyNameId}
            className="mb-2 block text-[0.75rem] font-medium uppercase tracking-[0.05em] text-[#475569]"
          >
            Company / Organization
          </label>
          <input
            id={companyNameId}
            type="text"
            required
            autoComplete="organization"
            placeholder="E.g., TechCorp India"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className={inputBase}
          />
        </div>

        {/* Phone / WhatsApp */}
        <div>
          <label
            htmlFor={phoneId}
            className="mb-2 block text-[0.75rem] font-medium uppercase tracking-[0.05em] text-[#475569]"
          >
            Phone / WhatsApp
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[0.85rem] font-medium text-gray-400">
              +91
            </span>
            <input
              id={phoneId}
              type="tel"
              required
              autoComplete="tel"
              placeholder="98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={`${inputBase} pl-12`}
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label
            htmlFor={cityId}
            className="mb-2 block text-[0.75rem] font-medium uppercase tracking-[0.05em] text-[#475569]"
          >
            City / Area
          </label>
          <input
            id={cityId}
            type="text"
            required
            autoComplete="address-level2"
            placeholder="Bengaluru, Delhi, Mumbai…"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className={inputBase}
          />
        </div>

        {/* System pre-fill badge */}
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#2563EB]/20 bg-[#F8FAFC] px-4 py-3">
          <svg className="h-4 w-4 flex-shrink-0 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[0.75rem] text-gray-500 font-light">
            Consulting on:{" "}
            <span className="font-medium text-[#0F172A]">{systemName}</span>
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="lead-form-submit"
          disabled={loading || !form.name || !form.companyName || !form.phone || !form.city}
          className="group mt-6 relative w-full overflow-hidden rounded-xl bg-[#2563EB] py-4 text-[0.95rem] font-medium text-white shadow-lg shadow-[#2563EB]/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2563EB]/30 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Submit consultation request"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                </svg>
                Sending…
              </>
            ) : (
              <>
                Consult an Air Engineer
                <svg className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
}

/**
 * Chapter 7 — enquiry form and contact content types.
 * Shaped like future CMS / CRM payloads so adapters can map fields
 * without redesigning the UI.
 */

export type EnvironmentType =
  | "residential"
  | "corporate"
  | "industrial"
  | "healthcare"
  | "education"
  | "government"
  | "airports-transit";

export interface EnvironmentOption {
  value: EnvironmentType;
  label: string;
}

/** Canonical enquiry payload — mirrors a future API / CRM lead shape. */
export interface EnquiryFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  environment: EnvironmentType | "";
  message: string;
}

export type EnquiryFormField = keyof EnquiryFormData;

export type EnquiryFormErrors = Partial<Record<EnquiryFormField, string>>;

export interface EnquirySubmissionResult {
  success: boolean;
  referenceId?: string;
  message?: string;
}

/**
 * Pluggable submission boundary. Swap `simulatedEnquirySubmission` for a
 * Sanity webhook, CRM client, email service or API route later.
 */
export interface EnquirySubmissionAdapter {
  submit(data: EnquiryFormData): Promise<EnquirySubmissionResult>;
}

export interface ContactDetail {
  id: string;
  label: string;
  value: string;
  href?: string;
}

export interface ConsultationHighlight {
  id: string;
  label: string;
}

// New premium SaaS section types
export interface TrustMetric {
  id: string;
  value: string;
  label: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  src: string;
}

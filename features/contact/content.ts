import type {
  ClientLogo,
  ConsultationHighlight,
  ContactDetail,
  EnvironmentOption,
  ProcessStep,
  TrustMetric,
} from "@/features/contact/types";

/**
 * Chapter 7 copy and contact content — shaped like future CMS documents.
 * Replace values here (or wire to Sanity) without touching layout components.
 */
export const contactContent = {
  eyebrow: "GET IN TOUCH",
  heading: "Let's Build a Healthier Space Together",
  supporting:
    "Take the first step towards perfect air quality. No commitments, just expert guidance tailored to your specific environment.",
  form: {
    submitLabel: "Request Consultation",
    nextLabel: "Continue",
    successHeading: "We're on it.",
    successMessage: "An engineer will contact you shortly to discuss your space.",
  },
} as const;

export const contactDetails: ContactDetail[] = [
  {
    id: "contact-phone",
    label: "Phone",
    value: "+91 11 4567 8900",
    href: "tel:+911145678900",
  },
  {
    id: "contact-email",
    label: "Email",
    value: "hello@o2cure.com",
    href: "mailto:hello@o2cure.com",
  },
];

export const consultationHighlights: ConsultationHighlight[] = [
  { id: "highlight-guidance", label: "Expert guidance" },
  { id: "highlight-recommendations", label: "Tailored recommendations" },
  { id: "highlight-response", label: "Fast response" },
];

export const environmentOptions: EnvironmentOption[] = [
  { value: "residential", label: "Residential" },
  { value: "corporate", label: "Corporate" },
  { value: "industrial", label: "Industrial" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "government", label: "Government" },
  { value: "airports-transit", label: "Airports & Transit" },
];

export const emptyEnquiryForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  environment: "",
  message: "",
} as const;

export const trustMetrics: TrustMetric[] = [
  {
    id: "metric-businesses",
    value: "500+",
    label: "Businesses Protected",
  },
  {
    id: "metric-response",
    value: "< 15m",
    label: "Avg. Response Time",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "We analyze your space",
    description: "Our experts review your requirements and identify potential air quality challenges.",
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "Tailored strategy",
    description: "You receive a customized solution plan with zero obligation to commit.",
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "Seamless implementation",
    description: "If you proceed, we handle everything from delivery to expert installation.",
  }
];

// Placeholder for client logos; in a real scenario, use actual SVG/PNG paths.
export const clientLogos: ClientLogo[] = [
  { id: "logo-1", name: "TechCorp", src: "/logos/techcorp.svg" },
  { id: "logo-2", name: "HealthPlus", src: "/logos/healthplus.svg" },
  { id: "logo-3", name: "EduSpace", src: "/logos/eduspace.svg" },
];

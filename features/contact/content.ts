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
  eyebrowMagic: "Feel the magic in the air",
  heading: "Get in touch",
  supporting:
    "A home built today will breathe for 25 years. A hospital wing will run for 40. A factory floor doesn't get rebuilt every decade. Everywhere, air quality is worsening faster than most infrastructure plans account for. Our airvengers don't sell you a product for today's problem. They design a purification system calibrated to your space, your occupancy, and the pollution load your environment will carry for the next 10 to 20 years.",
  highlights: [
    "Full-environment assessment",
    "One-to-one with a specialist",
  ],
  form: {
    submitLabel: "Request Free Consultation",
    nextLabel: "Continue",
    successHeading: "We're on it.",
    successMessage: "An engineer will contact you within 24 hours to discuss your space.",
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
  problemDescription: "",
} as const;

export const trustMetrics: TrustMetric[] = [
  {
    id: "metric-businesses",
    value: "500+",
    label: "Businesses Protected",
  },
  {
    id: "metric-response",
    value: "< 24h",
    label: "Response Time",
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

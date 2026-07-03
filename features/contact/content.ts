import type {
  ConsultationHighlight,
  ContactDetail,
  EnvironmentOption,
} from "@/features/contact/types";

/**
 * Chapter 7 copy and contact content — shaped like future CMS documents.
 * Replace values here (or wire to Sanity) without touching layout components.
 */
export const contactContent = {
  eyebrow: "GET IN TOUCH",
  heading: "Let's Build a Healthier Space Together",
  supporting:
    "Whether you're protecting a home, workplace or critical facility, our team is ready to help you choose the right solution.",
  form: {
    submitLabel: "Request Consultation",
    successHeading: "Thank you.",
    successMessage: "Our team will contact you shortly.",
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
  {
    id: "contact-office",
    label: "Office Location",
    value: "New Delhi, India",
  },
  {
    id: "contact-hours",
    label: "Business Hours",
    value: "Mon–Fri, 9:00 AM – 6:00 PM IST",
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

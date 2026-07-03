import type {
  Certification,
  ClientLogo,
  RecognitionMetric,
  Testimonial,
} from "@/features/trust/types";

/**
 * Chapter 6 copy and trust content — shaped like future CMS documents.
 * Replace arrays here (or wire to Sanity) without touching layout components.
 */
export const trustContent = {
  eyebrow: "TRUSTED BY",
  heading: "Trusted Where Air Quality Matters Most",
  supporting:
    "O₂Cure solutions protect homes, businesses and critical environments across India.",
} as const;

export const clientLogos: ClientLogo[] = [
  {
    id: "logo-tata",
    name: "Tata Group",
    logo: { src: "", alt: "Tata Group logo" },
  },
  {
    id: "logo-infosys",
    name: "Infosys",
    logo: { src: "", alt: "Infosys logo" },
  },
  {
    id: "logo-apollo",
    name: "Apollo Hospitals",
    logo: { src: "", alt: "Apollo Hospitals logo" },
  },
  {
    id: "logo-dlf",
    name: "DLF",
    logo: { src: "", alt: "DLF logo" },
  },
  {
    id: "logo-marriott",
    name: "Marriott",
    logo: { src: "", alt: "Marriott logo" },
  },
  {
    id: "logo-bial",
    name: "BIAL",
    logo: { src: "", alt: "Bangalore International Airport logo" },
  },
  {
    id: "logo-phoenix",
    name: "Phoenix Mills",
    logo: { src: "", alt: "Phoenix Mills logo" },
  },
  {
    id: "logo-oberoi",
    name: "Oberoi Hotels",
    logo: { src: "", alt: "Oberoi Hotels logo" },
  },
];

export const recognitionMetrics: RecognitionMetric[] = [
  {
    id: "metric-years",
    label: "Years of Innovation",
    value: 15,
    suffix: "+",
  },
  {
    id: "metric-installations",
    label: "Installations",
    value: 2500,
    suffix: "+",
  },
  {
    id: "metric-cities",
    label: "Cities Served",
    value: 40,
    suffix: "+",
  },
  {
    id: "metric-projects",
    label: "Projects Completed",
    value: 300,
    suffix: "+",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-healthcare",
    quote:
      "Air quality is non-negotiable in our care environments. O₂Cure delivers quiet, reliable performance we can stand behind.",
    clientName: "Dr. Ananya Mehta",
    company: "Regional Healthcare Group",
    avatar: { src: "", alt: "Portrait of Dr. Ananya Mehta" },
  },
  {
    id: "testimonial-hospitality",
    quote:
      "Guests notice the difference immediately. The systems run discreetly while keeping our spaces feeling fresh and considered.",
    clientName: "Rahul Kapoor",
    company: "Premium Hospitality Collective",
    avatar: { src: "", alt: "Portrait of Rahul Kapoor" },
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-iso",
    name: "ISO",
    badge: { src: "", alt: "ISO certification badge" },
  },
  {
    id: "cert-ce",
    name: "CE",
    badge: { src: "", alt: "CE certification badge" },
  },
  {
    id: "cert-rohs",
    name: "RoHS",
    badge: { src: "", alt: "RoHS certification badge" },
  },
];

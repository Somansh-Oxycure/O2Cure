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
    id: "logo-google",
    name: "Google",
    logo: { src: "/Clients/google.svg", alt: "Google logo", width: 160, height: 48 },
  },
  {
    id: "logo-microsoft",
    name: "Microsoft",
    logo: { src: "/Clients/microsoft.svg", alt: "Microsoft logo", width: 160, height: 48 },
  },
  {
    id: "logo-amazon",
    name: "Amazon",
    logo: { src: "/Clients/Amazon_logo.svg", alt: "Amazon logo", width: 160, height: 48 },
  },
  {
    id: "logo-salesforce",
    name: "Salesforce",
    logo: { src: "/Clients/salesforce.svg", alt: "Salesforce logo", width: 160, height: 48 },
    className: "scale-150",
  },
  {
    id: "logo-tcs",
    name: "Tata Consultancy Services",
    logo: { src: "/Clients/Tata_Consultancy_Services_old_logo.svg", alt: "TCS logo", width: 160, height: 48 },
    className: "scale-150",

  },
  {
    id: "logo-tata-motors",
    name: "Tata Motors",
    logo: { src: "/Clients/Tata_Motors_Logo.svg", alt: "Tata Motors logo", width: 160, height: 48 },
  },
  {
    id: "logo-reliance",
    name: "Reliance Industries",
    logo: { src: "/Clients/reliance-industries-logo.svg", alt: "Reliance Industries logo", width: 160, height: 48 },
    className: "scale-450",
  },
  {
    id: "logo-hdfc",
    name: "HDFC Bank",
    logo: { src: "/Clients/HDFC_Bank_Logo.svg", alt: "HDFC Bank logo", width: 160, height: 48 },
  },
  {
    id: "logo-airtel",
    name: "Airtel",
    logo: { src: "/Clients/Airtel_Logo.svg", alt: "Airtel logo", width: 160, height: 48 },
    className: "scale-150",
  },
  {
    id: "logo-taj",
    name: "Taj Hotels",
    logo: { src: "/Clients/Taj_Hotels_logo.svg", alt: "Taj Hotels logo", width: 160, height: 48 },
    className: "scale-150",

  },
  {
    id: "logo-makemytrip",
    name: "MakeMyTrip",
    logo: { src: "/Clients/Makemytrip_logo.svg", alt: "MakeMyTrip logo", width: 160, height: 48 },
  },
  {
    id: "logo-pvr",
    name: "PVR Cinemas",
    logo: { src: "/Clients/pvr-cinemas-seeklogo-2.svg", alt: "PVR Cinemas logo", width: 160, height: 48 },
    className: "scale-300",

  },
  {
    id: "logo-abp",
    name: "ABP News",
    logo: { src: "/Clients/ABP_News_logo.svg", alt: "ABP News logo", width: 160, height: 48 },
    className: "scale-150",

  },
  {
    id: "logo-adobe",
    name: "Adobe",
    logo: { src: "/Clients/Adobe_Corporate_logo.svg", alt: "Adobe logo", width: 160, height: 48 },
  },
  {
    id: "logo-dell",
    name: "Dell",
    logo: { src: "/Clients/Dell_Logo.svg", alt: "Dell logo", width: 160, height: 48 },
    className: "scale-150",

  },
  {
    id: "logo-genpact",
    name: "Genpact",
    logo: { src: "/Clients/Genpact_logo.svg", alt: "Genpact logo", width: 160, height: 48 },
    className: "scale-150",
  },
  {
    id: "logo-hp",
    name: "HP",
    logo: { src: "/Clients/HP_logo_2025.svg", alt: "HP logo", width: 160, height: 48 },
    className: "scale-150",

  },
  {
    id: "logo-ibm",
    name: "IBM",
    logo: { src: "/Clients/IBM_logo.svg", alt: "IBM logo", width: 160, height: 48 },
    className: "scale-150",
  },
  {
    id: "logo-vi",
    name: "Vodafone Idea",
    logo: { src: "/Clients/Vodafone_Idea_logo.svg", alt: "Vodafone Idea logo", width: 160, height: 48 },
    className: "scale-150",
  },
  // {
  //   id: "logo-clipart",
  //   name: "Partner Client",
  //   logo: { src: "/Clients/clipart2119705.png", alt: "Partner Client logo", width: 160, height: 48 },
  // },
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
    label: "Installations Completed",
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
    label: "Enterprise Projects",
    value: 300,
    suffix: "+",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-healthcare",
    quote:
      "Air quality is non-negotiable in our care environments. O₂Cure delivers quiet, reliable performance we can stand behind — our staff and patients notice the difference every single day.",
    clientName: "Dr. Ananya Mehta",
    role: "Chief Medical Officer",
    company: "Apollo Healthcare Group",
    rating: 5,
    avatar: { src: "", alt: "Portrait of Dr. Ananya Mehta" },
  },
  {
    id: "testimonial-hospitality",
    quote:
      "Guests notice the difference immediately. The systems run discreetly while keeping our spaces feeling fresh and considered. O₂Cure has become an essential part of our five-star promise.",
    clientName: "Rahul Kapoor",
    role: "General Manager",
    company: "Taj Hotels & Resorts",
    rating: 5,
    avatar: { src: "", alt: "Portrait of Rahul Kapoor" },
  },
  {
    id: "testimonial-tech",
    quote:
      "We deployed O₂Cure across three campuses in Bengaluru. The real-time AQI dashboards gave our facilities team full visibility, and employee satisfaction scores on indoor air quality jumped by 38%.",
    clientName: "Priya Nair",
    role: "VP Workplace Experience",
    company: "Microsoft India",
    rating: 5,
    avatar: { src: "", alt: "Portrait of Priya Nair" },
  },
  {
    id: "testimonial-retail",
    quote:
      "Footfall is everything in our multiplexes. Since installing O₂Cure, we've seen measurable improvements in how long guests stay and how positively they rate their experience online.",
    clientName: "Sandeep Verma",
    role: "Head of Operations",
    company: "PVR Cinemas",
    rating: 5,
    avatar: { src: "", alt: "Portrait of Sandeep Verma" },
  },
  {
    id: "testimonial-banking",
    quote:
      "Our branch interiors demand the highest hygiene standards. O₂Cure's filtration systems have exceeded every benchmark we set — the installation and after-sales support was equally exceptional.",
    clientName: "Kavita Sharma",
    role: "Head of Facilities",
    company: "HDFC Bank",
    rating: 5,
    avatar: { src: "", alt: "Portrait of Kavita Sharma" },
  },
  {
    id: "testimonial-travel",
    quote:
      "Clean cabin air is a brand promise for us. O₂Cure helped us deliver on that promise at scale across our lounges and offices. The product is premium, the service is seamless.",
    clientName: "Arjun Bhatia",
    role: "Director of Brand Experience",
    company: "MakeMyTrip",
    rating: 5,
    avatar: { src: "", alt: "Portrait of Arjun Bhatia" },
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-ccmb",
    name: "CCMB",
    badge: { src: "/certificate/Ccmb_emblem.png", alt: "CCMB certification badge" },
  },
  {
    id: "cert-bioanalisis",
    name: "Bioanalisis",
    badge: { src: "/certificate/Bioanalisis.png", alt: "Bioanalisis certification badge" },
  },
  {
    id: "cert-ecolab",
    name: "Ecolab",
    badge: { src: "/certificate/Ecolab.svg", alt: "Ecolab certification badge" },
  },
  {
    id: "cert-kansas",
    name: "Kansas State University",
    badge: { src: "/certificate/Kansas_State_University-Logo.wine.svg", alt: "Kansas State University certification badge" },
  },
  {
    id: "cert-nabl",
    name: "NABL",
    badge: { src: "/certificate/NABL.png", alt: "NABL certification badge" },
  },
  {
    id: "cert-sandia",
    name: "Sandia National Laboratories",
    badge: { src: "/certificate/Sandia_National_Laboratories_logo.svg", alt: "Sandia National Laboratories certification badge" },
  },
  {
    id: "cert-steris",
    name: "Steris",
    badge: { src: "/certificate/Steris_logo.svg", alt: "Steris certification badge" },
  },
];

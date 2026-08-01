import type { FooterContent } from "@/features/footer/types";

/**
 * Chapter 9 copy and footer content — shaped like future CMS documents.
 * Replace values here (or wire to Sanity) without touching layout components.
 */
export const footerContent: FooterContent = {
  hero: {
    headline: "Every Breath Matters.",
    supporting:
      "Creating healthier indoor spaces through intelligent air purification for homes, workplaces and critical environments.",
    cta: {
      label: "Get Consultation",
      href: "/contact",
      isActive: false,
    },
  },
  navigation: [
    {
      id: "nav-solutions",
      title: "Solutions",
      links: [
        {
          id: "sol-corporate",
          label: "Corporate & Office",
          href: "/solutions?env=corporate",
          isActive: true,
        },
        {
          id: "sol-healthcare",
          label: "Healthcare & Clinical",
          href: "/solutions?env=healthcare",
          isActive: true,
        },
        {
          id: "sol-residential",
          label: "Residential",
          href: "/solutions?env=residential",
          isActive: true,
        },
        {
          id: "sol-industrial",
          label: "Industrial & Manufacturing",
          href: "/solutions?env=industrial",
          isActive: true,
        },
        {
          id: "sol-education",
          label: "Education",
          href: "/solutions?env=education",
          isActive: true,
        },
        {
          id: "sol-datacenter",
          label: "Data Centres",
          href: "/solutions?env=datacenter",
          isActive: true,
        },
      ],
    },
    {
      id: "nav-company",
      title: "Company",
      links: [
        {
          id: "co-about",
          label: "About Us",
          href: "/about",
          isActive: true,
        },
        {
          id: "co-technology",
          label: "Technology",
          href: "/#technology",
          isActive: true,
        },
        {
          id: "co-aqi",
          label: "AQI",
          href: "/#aqi-effect",
          isActive: true,
        },
      ],
    },
    {
      id: "nav-support",
      title: "Support",
      links: [
        {
          id: "sup-contact",
          label: "Contact",
          href: "/#contact",
          isActive: true,
        },
        {
          id: "sup-faqs",
          label: "FAQs",
          href: "/faq",
          isActive: true,
        },
        {
          id: "sup-terms",
          label: "Terms & Conditions",
          href: "/terms-and-conditions",
          isActive: true,
        },
      ],
    },
    {
      id: "nav-connect",
      title: "Connect",
      links: [
        {
          id: "con-phone",
          label: "Phone",
          href: "tel:+911145678900",
          isActive: true,
        },
        {
          id: "con-email",
          label: "Email",
          href: "mailto:hello@o2cure.com",
          isActive: true,
        },
        {
          id: "con-linkedin",
          label: "LinkedIn",
          href: "https://linkedin.com/company/o2cure",
          isActive: true,
        },
        {
          id: "con-instagram",
          label: "Instagram",
          href: "https://instagram.com/o2cure",
          isActive: true,
        },
        {
          id: "con-youtube",
          label: "YouTube",
          href: "https://youtube.com/@o2cure",
          isActive: true,
        },
      ],
    },
  ],
  newsletter: {
    heading: "Stay Updated",
    supporting:
      "Receive updates on healthier indoor environments, product launches and air quality insights.",
    emailLabel: "Email address",
    submitLabel: "Subscribe",
    successHeading: "You're subscribed.",
    successMessage: "We'll share insights on healthier indoor living.",
  },
  legal: {
    copyright: "© 2026 O₂Cure. All rights reserved.",
    tagline: "Made with care for healthier living.",
  },
  socialLinks: [
    {
      id: "social-linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/company/o2cure",
      platform: "linkedin",
    },
    {
      id: "social-instagram",
      label: "Instagram",
      href: "https://instagram.com/o2cure",
      platform: "instagram",
    },
    {
      id: "social-youtube",
      label: "YouTube",
      href: "https://youtube.com/@o2cure",
      platform: "youtube",
    },
  ],
};

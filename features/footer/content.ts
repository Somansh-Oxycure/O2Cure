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
          id: "sol-residential",
          label: "Residential",
          href: "/solutions/residential",
          isActive: false,
        },
        {
          id: "sol-corporate",
          label: "Corporate",
          href: "/solutions/corporate",
          isActive: false,
        },
        {
          id: "sol-industrial",
          label: "Industrial",
          href: "/solutions/industrial",
          isActive: false,
        },
        {
          id: "sol-healthcare",
          label: "Healthcare",
          href: "/solutions/healthcare",
          isActive: false,
        },
        {
          id: "sol-education",
          label: "Education",
          href: "/solutions/education",
          isActive: false,
        },
        {
          id: "sol-government",
          label: "Government",
          href: "/solutions/government",
          isActive: false,
        },
        {
          id: "sol-airports",
          label: "Airports & Transit",
          href: "/solutions/airports-transit",
          isActive: false,
        },
      ],
    },
    {
      id: "nav-company",
      title: "Company",
      links: [
        {
          id: "co-about",
          label: "About",
          href: "/about",
          isActive: false,
        },
        {
          id: "co-technology",
          label: "Technology",
          href: "/technology",
          isActive: false,
        },
        {
          id: "co-products",
          label: "Products",
          href: "/products",
          isActive: false,
        },
        {
          id: "co-resources",
          label: "Resources",
          href: "/resources",
          isActive: false,
        },
        {
          id: "co-careers",
          label: "Careers",
          href: "#",
          isActive: false,
          isPlaceholder: true,
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
          href: "/contact",
          isActive: false,
        },
        {
          id: "sup-faqs",
          label: "FAQs",
          href: "#",
          isActive: false,
          isPlaceholder: true,
        },
        {
          id: "sup-privacy",
          label: "Privacy Policy",
          href: "/privacy",
          isActive: false,
        },
        {
          id: "sup-terms",
          label: "Terms & Conditions",
          href: "/terms",
          isActive: false,
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

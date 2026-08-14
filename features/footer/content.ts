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
      title: "Products",
      links: [
        {
          id: "sol-corporate",
          label: "Corporate & Office",
          href: "/products?env=corporate",
          isActive: true,
        },
        {
          id: "sol-healthcare",
          label: "Healthcare & Clinical",
          href: "/products?env=healthcare",
          isActive: true,
        },
        {
          id: "sol-residential",
          label: "Residential",
          href: "/products?env=residential",
          isActive: true,
        },
        {
          id: "sol-industrial",
          label: "Industrial & Manufacturing",
          href: "/products?env=industrial",
          isActive: true,
        },
        {
          id: "sol-education",
          label: "Education",
          href: "/products?env=education",
          isActive: true,
        },
        {
          id: "sol-datacenter",
          label: "Data Centres",
          href: "/products?env=datacenter",
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
        // {
        //   id: "co-technology",
        //   label: "Technology",
        //   href: "/#technology",
        //   isActive: true,
        // },
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
          href: "/contact",
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
          href: "tel:918010111177",
          isActive: true,
        },
        {
          id: "con-email",
          label: "Email",
          href: "mailto:info@o2cure.in",
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
      id: "social-facebook",
      label: "Facebook",
      href: "https://www.facebook.com/o2cure",
      platform: "facebook",
    },
    {
      id: "social-x",
      label: "X (Twitter)",
      href: "https://x.com/cure_o2",
      platform: "x",
    },
    {
      id: "social-instagram",
      label: "Instagram",
      href: "https://www.instagram.com/o2_cure/",
      platform: "instagram",
    },
    {
      id: "social-youtube",
      label: "YouTube",
      href: "https://www.youtube.com/channel/UC8vNYiYmzdapnOIflSIELtA",
      platform: "youtube",
    },
    {
      id: "social-linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/o2cure",
      platform: "linkedin",
    },
  ],
};

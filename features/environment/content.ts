import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Plane,
} from "lucide-react";

/**
 * Chapter 2 copy and environment data — shaped like future CMS content.
 */
export const environmentContent = {
  heading: "Where do you breathe?",
  supporting: "Choose the environment that best represents your space.",
  cta: "Explore Solutions",
} as const;

export type Environment = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  image: {
    /** Primary image shown when the panel is expanded */
    src: string;
    alt: string;
    /** Optional alternate image displayed in the collapsed/peek state */
    collapsedSrc?: string;
  };
};

export const environments: Environment[] = [
  {
    id: "residential",
    name: "Residential",
    description: "Homes and living spaces where clean air feels personal.",
    icon: Home,
    image: {
      src: "/residential.png",
      alt: "Sunlit modern living room with clean architectural lines",
      collapsedSrc: "/residential2.png",
    },
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Offices and workplaces built for focus and clarity.",
    icon: Building2,
    image: {
      src: "/corporate.png",
      alt: "Premium open-plan office with natural light",
      collapsedSrc: "/corporate2.png",
    },
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Production floors that demand controlled air at scale.",
    icon: Factory,
    image: {
      src: "/industrial.png",
      alt: "Modern industrial facility with controlled environment",
    },
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Clinical environments where every breath carries weight.",
    icon: HeartPulse,
    image: {
      src: "/medical.png",
      alt: "Bright, minimal hospital corridor",
    },
  },
  {
    id: "education",
    name: "Education",
    description: "Campuses and classrooms designed for clearer minds.",
    icon: GraduationCap,
    image: {
      src: "/education.png",
      alt: "Contemporary university campus interior",
      collapsedSrc: "/education2.png",
    },
  },
  {
    id: "government",
    name: "Government",
    description: "Public interiors trusted by the communities they serve.",
    icon: Landmark,
    image: {
      src: "/hospitality.png",
      alt: "Modern civic building with glass facade",
    },
  },
  {
    id: "airports-transit",
    name: "Airports & Transit",
    description: "Terminals and transit hubs moving millions through cleaner air.",
    icon: Plane,
    image: {
      src: "/airport.png",
      alt: "Spacious airport terminal with natural light",
    },
  },
];

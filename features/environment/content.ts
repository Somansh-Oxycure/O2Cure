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
    src: string;
    alt: string;
  };
};

export const environments: Environment[] = [
  {
    id: "residential",
    name: "Residential",
    description: "Homes and living spaces where clean air feels personal.",
    icon: Home,
    image: {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85&auto=format&fit=crop",
      alt: "Sunlit modern living room with clean architectural lines",
    },
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Offices and workplaces built for focus and clarity.",
    icon: Building2,
    image: {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format&fit=crop",
      alt: "Premium open-plan office with natural light",
    },
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Production floors that demand controlled air at scale.",
    icon: Factory,
    image: {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=85&auto=format&fit=crop",
      alt: "Modern industrial facility with controlled environment",
    },
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Clinical environments where every breath carries weight.",
    icon: HeartPulse,
    image: {
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=85&auto=format&fit=crop",
      alt: "Bright, minimal hospital corridor",
    },
  },
  {
    id: "education",
    name: "Education",
    description: "Campuses and classrooms designed for clearer minds.",
    icon: GraduationCap,
    image: {
      src: "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=85&auto=format&fit=crop",
      alt: "Contemporary university campus interior",
    },
  },
  {
    id: "government",
    name: "Government",
    description: "Public interiors trusted by the communities they serve.",
    icon: Landmark,
    image: {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85&auto=format&fit=crop",
      alt: "Modern civic building with glass facade",
    },
  },
  {
    id: "airports-transit",
    name: "Airports & Transit",
    description: "Terminals and transit hubs moving millions through cleaner air.",
    icon: Plane,
    image: {
      src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=85&auto=format&fit=crop",
      alt: "Spacious airport terminal with natural light",
    },
  },
];

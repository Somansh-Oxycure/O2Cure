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
    description: "Indoor air is 5x* more polluted than outdoor air",
    icon: Home,
    image: {
      src: "/enviroment/residential.png",
      alt: "Sunlit modern living room with clean architectural lines",
      collapsedSrc: "/enviroment/residential.png",
    },
  },
  {
    id: "commertial",
    name: "Commertial",
    description: "30% of offices worldwide have Sick building syndrome ",
    icon: Building2,
    image: {
      src: "/enviroment/commertial.png",
      alt: "Premium open-plan office with natural light",
      collapsedSrc: "/enviroment/commertial.png",
    },
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "CPCB requires industries to control PM levels between 30-150",
    icon: Factory,
    image: {
      src: "/enviroment/industrial.png",
      alt: "Modern industrial facility with controlled environment",
      collapsedSrc: "/enviroment/industrial.png",
    },
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Healthcare professionals face upto 3x higher risk of infection.",
    icon: HeartPulse,
    image: {
      src: "/enviroment/hospital.png",
      alt: "Bright, minimal hospital corridor",
      collapsedSrc: "/enviroment/hospital.png",
    },
  },
  {
    id: "education",
    name: "Education",
    description: " Asthma is one the leading cause of school absenteeism accounting for 13 millionn school days annually.",
    icon: GraduationCap,
    image: {
      src: "/enviroment/education.png",
      alt: "Contemporary university campus interior",
      collapsedSrc: "/enviroment/education.png",
    },
  },
  {
    id: "Datacenter",
    name: "Data Centers",
    description: "Corrosive gases cause 55% of server downtime. 1 hour of server downtime can cause USD 300,000.",
    icon: Landmark,
    image: {
      src: "/enviroment/datacenters.png",
      alt: "Modern civic building with glass facade",
      collapsedSrc: "/enviroment/datacenters.png",
    },
  },

];

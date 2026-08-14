/**
 * Public surface of the residential feature.
 * Import from here — never reach into sub-folders directly.
 */
export { ResidentialHero } from "./components/ResidentialHero";
export { DiagnosticEngine } from "./components/DiagnosticEngine";
export { ThreatVectorStep } from "./components/ThreatVectorStep";
export { SpatialLayoutStep } from "./components/SpatialLayoutStep";
export { OccupancySliderStep } from "./components/OccupancySliderStep";
export { DiagnosticResultSection } from "./components/DiagnosticResultSection";
export { LeadCaptureForm } from "./components/LeadCaptureForm";
export { SocialProofSection } from "./components/SocialProofSection";
export { StickyConsultBar } from "./components/StickyConsultBar";

export type { LeadFormData } from "./components/LeadCaptureForm";
export type {
  ThreatVector,
  SpatialLayout,
  ResidentialRecommendation,
  DiagnosticState,
  Testimonial,
} from "./data/mock";
export { getRecommendation, threatVectors, spatialLayouts, testimonials, certificationBadges } from "./data/mock";

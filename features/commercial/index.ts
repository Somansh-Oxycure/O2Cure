/**
 * Public surface of the commercial feature.
 * Import from here — never reach into sub-folders directly.
 */
export { CommercialHero } from "./components/CommercialHero";
export { CommercialDiagnosticEngine } from "./components/CommercialDiagnosticEngine";
export { CommercialThreatVectorStep } from "./components/CommercialThreatVectorStep";
export { CommercialSpatialLayoutStep } from "./components/CommercialSpatialLayoutStep";
export { CommercialOccupancySliderStep } from "./components/CommercialOccupancySliderStep";
export { CommercialDiagnosticResultSection } from "./components/CommercialDiagnosticResultSection";
export { CommercialLeadCaptureForm } from "./components/CommercialLeadCaptureForm";
export { CommercialSocialProofSection } from "./components/CommercialSocialProofSection";
export { CommercialStickyConsultBar } from "./components/CommercialStickyConsultBar";
export { CommercialTechnologySection } from "./components/CommercialTechnologySection";

export type { LeadFormData } from "./components/CommercialLeadCaptureForm";
export type {
  ThreatVector,
  SpatialLayout,
  CommercialRecommendation,
  DiagnosticState,
  Testimonial,
} from "./data/mock";
export { getRecommendation, threatVectors, spatialLayouts, testimonials, certificationBadges } from "./data/mock";

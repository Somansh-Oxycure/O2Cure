/**
 * Public surface of the solutions feature — v2.
 */
export { SolutionsExplorer } from "./components/SolutionsExplorer";
export { ProductShowcaseExplorer } from "./components/ProductShowcaseExplorer";
export { SolutionCanvas } from "./components/SolutionCanvas";
export { SolutionPickerList } from "./components/SolutionPickerList";
export { EnvironmentTabBar } from "./components/EnvironmentTabBar";
export { DiagnosticSidebar, MobileDiagnosticBar } from "./components/DiagnosticFilterBar";
export { AirIssueFinder } from "./components/AirIssueFinder";
export { AllProductsSection } from "./components/AllProductsSection";

export type {
  Solution,
  EnvironmentTab,
  DiagnosticFilter,
  CalculatorState,
  CalculatorOutput,
  IssueId,
  AirIssueWizardState,
  RecommendationResult,
} from "./types";

export {
  solutionsPageMeta,
  solutions,
  environmentTabs,
  diagnosticFilters,
  calculatorConfig,
  getCalculatorOutput,
} from "./content";

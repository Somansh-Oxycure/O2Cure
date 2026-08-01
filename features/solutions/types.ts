/**
 * Custom Solutions — types (v2, aligned to blueprint §3 data schema).
 * Shaped to mirror the Sanity CMS document structure defined in the blueprint.
 */
import type { SanityImageLike } from "@/types/content";

// ─── Environment sector tabs (blueprint §1.2) ───────────────────────────────
export type EnvironmentTab =
  | "corporate"
  | "healthcare"
  | "residential"
  | "mobility";

// ─── Diagnostic filter pill (sidebar / mobile strip) ───────────────────────
export interface DiagnosticFilter {
  id: string;
  label: string;
  /** Which environment tabs this filter belongs to */
  environments: EnvironmentTab[];
}

// ─── Science / certification badge (blueprint §2.3) ────────────────────────
export type ScienceBadge = string; // e.g. "NABL TESTED", "99.9% MICROBIAL CONTAINMENT"

// ─── Air Issue IDs — used by the Air Issue Finder wizard ──────────────────
export type IssueId =
  | "odor"
  | "stuffiness"
  | "dust-pm"
  | "vocs"
  | "pathogens"
  | "co2"
  | "allergens"
  | "humidity";

// ─── Solution entry — mirrors blueprint §3 mock schema ────────────────────
export interface Solution {
  id: string;
  systemName: string;
  /** Short, one-line description — kept intentionally brief per blueprint */
  tagline: string;
  environmentTarget: EnvironmentTab[];
  /** Tags from the sidebar that match this solution */
  filterTags: string[];
  integrationType: string;
  /** Maximum sq ft coverage for calculator pre-fill */
  capacityMaxSqFt: number;
  badges: ScienceBadge[];
  image: SanityImageLike;
  ctaText: string;
  /**
   * Relevance score per air issue (0–1).
   * 1 = this product directly addresses the issue.
   * 0 = not relevant at all.
   */
  issueRelevance: Partial<Record<IssueId, number>>;
  /**
   * Human-readable impact description per issue.
   * Shown in the wizard results panel.
   */
  issueImpact?: Partial<Record<IssueId, string>>;
}

// ─── Calculator state ──────────────────────────────────────────────────────
export interface CalculatorState {
  areaSqFt: number;
}

export interface CalculatorOutput {
  units: number;
  systemName: string;
  summary: string;
}

// ─── Air Issue Finder wizard state ────────────────────────────────────────
export interface AirIssueWizardState {
  selectedIssues: IssueId[];
  occupants: number;
  areaSqFt: number;
  spaceType: EnvironmentTab;
}

export interface RecommendationResult {
  solution: Solution;
  score: number; // 0–100
  unitsNeeded: number;
  matchedIssues: IssueId[];
  primaryReason: string;
}

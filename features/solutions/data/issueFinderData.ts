/**
 * Air Issue Finder — issue definitions, recommendation engine, and space config.
 * Pure client-side logic — no external dependencies.
 */
import type { IssueId, Solution, RecommendationResult, AirIssueWizardState } from "../types";
import { solutions } from "../content";

// ─── Issue definitions ─────────────────────────────────────────────────────

export interface AirIssue {
  id: IssueId;
  emoji: string;
  label: string;
  description: string;
  color: string; // accent color for card
  bgColor: string;
  borderColor: string;
}

export const airIssues: AirIssue[] = [
  {
    id: "odor",
    emoji: "🤢",
    label: "Bad Odors",
    description: "Cooking smells, musty odors, or persistent unpleasant scents",
    color: "#D97706",
    bgColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  {
    id: "stuffiness",
    emoji: "😮‍💨",
    label: "Stuffiness & Poor Ventilation",
    description: "Air feels heavy, stale, or like there's never enough fresh air",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
  },
  {
    id: "dust-pm",
    emoji: "🌫️",
    label: "Dust & Fine Particles",
    description: "Visible dust, PM2.5/PM10 pollution, or hazy indoor air",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
  },
  {
    id: "vocs",
    emoji: "🧪",
    label: "Chemical Fumes / VOCs",
    description: "Paint fumes, cleaning products, formaldehyde, or industrial chemicals",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  {
    id: "pathogens",
    emoji: "🦠",
    label: "Bacteria & Viruses",
    description: "Concern about airborne infections, mold, or pathogen transmission",
    color: "#059669",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
  },
  {
    id: "co2",
    emoji: "💨",
    label: "CO₂ Buildup",
    description: "Drowsiness, headaches, or difficulty concentrating in enclosed spaces",
    color: "#0891B2",
    bgColor: "#ECFEFF",
    borderColor: "#A5F3FC",
  },
  {
    id: "allergens",
    emoji: "🌿",
    label: "Allergens & Pollen",
    description: "Sneezing, runny nose, itchy eyes, or asthma triggers indoors",
    color: "#3A7D2A",
    bgColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
  {
    id: "humidity",
    emoji: "💧",
    label: "Humidity Imbalance",
    description: "Dry skin/throat in winter, or dampness and mold in monsoon season",
    color: "#0369A1",
    bgColor: "#F0F9FF",
    borderColor: "#BAE6FD",
  },
];

// ─── Space type display map ────────────────────────────────────────────────

export const spaceTypeOptions = [
  { id: "residential" as const, label: "🏠 Home", description: "Apartment or house" },
  { id: "corporate" as const, label: "🏢 Office", description: "Workplace or commercial" },
  { id: "healthcare" as const, label: "🏥 Healthcare", description: "Clinic or hospital" },
  { id: "mobility" as const, label: "🚗 Vehicle", description: "Car or transport" },
];

// ─── Recommendation engine ─────────────────────────────────────────────────

/**
 * Score a solution against the user's selected issues.
 * Returns 0–100 score, higher = better match.
 *
 * Factors:
 * 1. Average relevance for selected issues (primary weight: 60%)
 * 2. Bonus for matching all selected issues (completeness: 20%)
 * 3. Penalty if area coverage is severely undersized (20%)
 * 4. Extra boost if space type matches the solution's environmentTarget
 */
function scoreSolution(
  sol: Solution,
  selectedIssues: IssueId[],
  areaSqFt: number,
  spaceType: string,
  occupants: number
): { score: number; matchedIssues: IssueId[] } {
  if (selectedIssues.length === 0) return { score: 0, matchedIssues: [] };

  // Issue relevance scoring
  const matchedIssues: IssueId[] = [];
  let totalRelevance = 0;
  for (const issue of selectedIssues) {
    const relevance = sol.issueRelevance[issue] ?? 0;
    totalRelevance += relevance;
    if (relevance >= 0.6) matchedIssues.push(issue);
  }

  const avgRelevance = totalRelevance / selectedIssues.length;

  // Completeness bonus — reward products addressing ALL issues
  const completenessRatio = matchedIssues.length / selectedIssues.length;

  // Area coverage factor
  const unitsNeeded = Math.ceil(areaSqFt / sol.capacityMaxSqFt);
  // No penalty up to 3 units needed. Above that, slight penalty.
  const areaPenalty = unitsNeeded > 3 ? 0.85 : 1;

  // Environment match bonus
  const envMatch = sol.environmentTarget.includes(spaceType as any) ? 1.15 : 0.9;

  // CO2 boost for many occupants
  let occupantBoost = 1;
  if (selectedIssues.includes("co2") && occupants > 8) {
    // Large groups need fresh air / CO2 solutions more
    if (sol.issueRelevance.co2 && sol.issueRelevance.co2 >= 0.8) {
      occupantBoost = 1.2;
    }
  }

  const rawScore =
    avgRelevance * 0.5 +
    completenessRatio * 0.3 +
    (sol.issueRelevance[selectedIssues[0]] ?? 0) * 0.2; // top issue weight

  const finalScore = Math.min(100, Math.round(rawScore * areaPenalty * envMatch * occupantBoost * 100));

  return { score: finalScore, matchedIssues };
}

/**
 * Build a primary reason string for why this product was recommended.
 */
function buildPrimaryReason(
  sol: Solution,
  matchedIssues: IssueId[],
  unitsNeeded: number,
  selectedIssues: IssueId[]
): string {
  const topIssue = selectedIssues.find((i) => matchedIssues.includes(i)) ?? selectedIssues[0];
  const impact = sol.issueImpact?.[topIssue];
  if (impact) return impact;

  const issueLabel = airIssues.find((a) => a.id === topIssue)?.label ?? topIssue;
  return `Highly effective for ${issueLabel} — addresses ${matchedIssues.length} of your ${selectedIssues.length} selected concern${selectedIssues.length > 1 ? "s" : ""}`;
}

/**
 * Main recommendation function.
 * Returns top 3 matched solutions sorted by score, descending.
 */
export function getRecommendations(state: AirIssueWizardState): RecommendationResult[] {
  const { selectedIssues, areaSqFt, spaceType, occupants } = state;

  const scored = solutions.map((sol) => {
    const { score, matchedIssues } = scoreSolution(sol, selectedIssues, areaSqFt, spaceType, occupants);
    const unitsNeeded = Math.max(1, Math.ceil(areaSqFt / sol.capacityMaxSqFt));
    return {
      solution: sol,
      score,
      unitsNeeded,
      matchedIssues,
      primaryReason: buildPrimaryReason(sol, matchedIssues, unitsNeeded, selectedIssues),
    };
  });

  // Sort by score descending, take top 3, filter out 0-score
  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

// ─── Impact analysis helpers ───────────────────────────────────────────────

export interface ImpactStat {
  label: string;
  value: string;
  color: string;
}

/**
 * Returns 2–3 impact stats for a recommendation result to display visually.
 */
export function getImpactStats(result: RecommendationResult): ImpactStat[] {
  const stats: ImpactStat[] = [];
  const { solution, matchedIssues, unitsNeeded } = result;

  // Coverage stat
  stats.push({
    label: "Issues Addressed",
    value: `${matchedIssues.length} of ${result.matchedIssues.length + (Object.keys(solution.issueRelevance).length - matchedIssues.length > 0 ? 0 : 0)} concerns`,
    color: "#3A7D2A",
  });

  // Top relevance stat
  const topIssue = matchedIssues[0];
  if (topIssue) {
    const relevance = solution.issueRelevance[topIssue] ?? 0;
    const pct = Math.round(relevance * 100);
    stats.push({
      label: `${airIssues.find((i) => i.id === topIssue)?.label ?? topIssue} Effectiveness`,
      value: `${pct}% effective`,
      color: pct >= 90 ? "#059669" : pct >= 70 ? "#D97706" : "#6B7280",
    });
  }

  // Units needed
  if (unitsNeeded > 1) {
    stats.push({
      label: "Units Required",
      value: `${unitsNeeded}× units for your space`,
      color: "#7C3AED",
    });
  }

  return stats;
}

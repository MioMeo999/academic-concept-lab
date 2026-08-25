export type AtlasBranch = {
  id: string;
  discipline: string;
  label: string;
  description: string;
  order: number;
};

/**
 * Visible branches are deliberately scoped to the discipline that currently
 * has enough records to justify them. Empty future branches do not belong in
 * the registry yet.
 */
export const ATLAS_BRANCHES = [
  {
    id: "perception-organisation",
    discipline: "music-psych",
    label: "Perception & Organisation",
    description: "How listeners organise sound into groups, streams, and perceptual wholes.",
    order: 1,
  },
  {
    id: "musical-structure-grammar",
    discipline: "music-psych",
    label: "Musical Structure & Grammar",
    description: "How tonal and formal structure makes musical relations available to a listener.",
    order: 2,
  },
  {
    id: "expectation-prediction",
    discipline: "music-psych",
    label: "Expectation & Prediction",
    description: "How learned, formal, and predictive accounts explain musical expectation.",
    order: 3,
  },
] as const satisfies readonly AtlasBranch[];

export function getBranch(id: string, discipline?: string) {
  return ATLAS_BRANCHES.find((branch) => branch.id === id && (!discipline || branch.discipline === discipline));
}

export function getBranchesForDiscipline(discipline: string) {
  return ATLAS_BRANCHES.filter((branch) => branch.discipline === discipline);
}

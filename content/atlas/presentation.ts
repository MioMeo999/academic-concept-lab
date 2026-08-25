import type { AnyRecord } from "../types";
import { DISCIPLINES, type Discipline } from "../disciplines";
import { getBranchesForDiscipline, type AtlasBranch } from "./branches";

export type AtlasRecordGroup = {
  id: string;
  label: string;
  description: string;
  records: AnyRecord[];
};

export type DisciplineRecordGroup = {
  discipline: Discipline;
  records: AnyRecord[];
};

export type BranchRecordGroup = {
  branch: AtlasBranch;
  records: AnyRecord[];
};

export type DisciplineOrientation = {
  summary: string;
  themes: readonly string[];
};

/**
 * These are presentation groups, not claims about the records' ontology.
 * They keep the first atlas surface question-led while the registry remains
 * the source of truth for discipline and branch membership.
 */
const OB_PRESENTATION_GROUPS = [
  {
    id: "work-fit",
    label: "How do people and work fit?",
    description: "Fit lenses ask how a person and a work context line up.",
    recordIds: ["person-environment-fit", "person-organisation-fit"],
  },
  {
    id: "work-experience",
    label: "How does work shape experience and behaviour?",
    description: "These records trace how work conditions and events become experience and action.",
    recordIds: ["job-demands-resources", "workplace-design", "affective-events-theory"],
  },
  {
    id: "motivation-exchange",
    label: "How are motivation and exchange organised?",
    description: "Motivation and exchange lenses focus on what sustains participation and relationships at work.",
    recordIds: ["self-determination-theory", "social-exchange-theory"],
  },
  {
    id: "study-evidence",
    label: "What does a specific study show?",
    description: "The evidence record keeps one investigation's design, finding, and limits together.",
    recordIds: ["tuned-out-or-dialed-in"],
  },
] as const;

export const DISCIPLINE_ORIENTATIONS: Record<string, DisciplineOrientation> = {
  ob: {
    summary: "How people fit work, how work shapes experience, and how motivation and exchange are organised.",
    themes: ["fit at work", "work experience", "motivation", "social exchange"],
  },
  "music-psych": {
    summary: "How listeners organise sound, build musical structure, and form expectations through learning.",
    themes: ["perception", "musical structure", "expectation", "learning"],
  },
  "qual-methods": {
    summary: "Interpretive practices for making close, defensible sense of qualitative material.",
    themes: [],
  },
  psychobiology: {
    summary: "Biological pathways through which psychological states are regulated.",
    themes: [],
  },
};

export function getDisciplineOrientation(disciplineId: string) {
  return DISCIPLINE_ORIENTATIONS[disciplineId];
}

export function getDisciplineRecordCount(records: AnyRecord[], disciplineId: string) {
  return records.filter((record) => record.discipline === disciplineId).length;
}

export function groupRecordsByDiscipline(
  records: AnyRecord[],
  disciplines: Record<string, Discipline> = DISCIPLINES,
): DisciplineRecordGroup[] {
  return Object.values(disciplines)
    .map((discipline) => ({
      discipline,
      records: records.filter((record) => record.discipline === discipline.id),
    }))
    .filter((group) => group.records.length > 0);
}

export function groupRecordsByBranch(records: AnyRecord[], disciplineId: string): BranchRecordGroup[] {
  return getBranchesForDiscipline(disciplineId).map((branch) => ({
    branch,
    records: records.filter((record) => record.primaryBranch === branch.id),
  }));
}

export function getUnbranchedRecords(records: AnyRecord[], disciplineId: string) {
  return records.filter((record) => record.discipline === disciplineId && !record.primaryBranch);
}

export function getPresentationGroupsForDiscipline(records: AnyRecord[], disciplineId: string): AtlasRecordGroup[] {
  if (disciplineId !== "ob") return [];

  return OB_PRESENTATION_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    description: group.description,
    records: group.recordIds
      .map((id) => records.find((record) => record.id === id))
      .filter((record): record is AnyRecord => Boolean(record)),
  })).filter((group) => group.records.length > 0);
}

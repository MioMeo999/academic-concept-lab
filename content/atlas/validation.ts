import { DISCIPLINES } from "../disciplines";
import { RECORDS } from "../records";
import type { AnyRecord, LiteratureStanding } from "../types";
import { ATLAS_BRANCHES, type AtlasBranch } from "./branches";
import { KNOWLEDGE_FORM_LABELS } from "./knowledgeForms";
import { LEARNING_PATHS, type LearningPath } from "./learningPaths";
import {
  ATLAS_RELATIONS,
  canonicalRelationKey,
  RELATION_TYPES,
  type AtlasRelation,
  type RelationProvenance,
} from "./relations";

export const CORE_MUSIC_PSYCHOLOGY_RECORD_IDS = [
  "meyers-expectancy-theory",
  "auditory-scene-analysis",
  "tonal-hierarchy",
  "gestalt-principles-in-music",
  "generative-theory-of-tonal-music",
  "narmours-implication-realization-theory",
  "hurons-itpra-theory",
  "statistical-learning-of-music",
  "idyom-information-dynamics-of-music",
  "predictive-processing-in-music",
] as const;

export const LITERATURE_STANDINGS: readonly LiteratureStanding[] = [
  "historical-anchor",
  "foundational",
  "influential",
  "active-developing",
  "contested",
];

export type AtlasValidationOptions = {
  branches?: readonly AtlasBranch[];
  relations?: readonly AtlasRelation[];
  paths?: readonly LearningPath[];
};

export function validateRelations(records: readonly AnyRecord[], relations: readonly AtlasRelation[]) {
  const issues: string[] = [];
  const recordIds = new Set(records.map((record) => record.id));
  const keys = new Set<string>();

  for (const relation of relations) {
    if (!recordIds.has(relation.from)) issues.push(`relation source missing: ${relation.from}`);
    if (!recordIds.has(relation.to)) issues.push(`relation target missing: ${relation.to}`);
    if (relation.from === relation.to) issues.push(`relation self-edge: ${relation.from}`);
    if (!(relation.type in RELATION_TYPES)) issues.push(`relation type invalid: ${relation.type}`);
    if (!["source-grounded", "editorial-synthesis", "proposed"].includes(relation.provenance)) {
      issues.push(`relation provenance invalid: ${relation.provenance}`);
    }
    const key = canonicalRelationKey(relation);
    if (keys.has(key)) issues.push(`duplicate relation: ${key}`);
    keys.add(key);
  }

  return issues;
}

export function validateAtlasMetadata(
  records: readonly AnyRecord[] = RECORDS,
  options: AtlasValidationOptions = {},
) {
  const branches = options.branches ?? ATLAS_BRANCHES;
  const relations = options.relations ?? ATLAS_RELATIONS;
  const paths = options.paths ?? LEARNING_PATHS;
  const issues: string[] = [];
  const recordMap = new Map(records.map((record) => [record.id, record] as const));
  const branchMap = new Map<string, AtlasBranch>();
  const branchOrders = new Map<string, number[]>();

  for (const branch of branches) {
    if (branchMap.has(branch.id)) issues.push(`duplicate branch: ${branch.id}`);
    branchMap.set(branch.id, branch);
    if (!DISCIPLINES[branch.discipline]) issues.push(`branch discipline invalid: ${branch.discipline}`);
    if (!Number.isFinite(branch.order)) issues.push(`branch order invalid: ${branch.id}`);
    branchOrders.set(branch.discipline, [...(branchOrders.get(branch.discipline) ?? []), branch.order]);
  }

  for (const [discipline, orders] of branchOrders) {
    const sorted = [...orders].sort((a, b) => a - b);
    if (new Set(orders).size !== orders.length) issues.push(`duplicate branch order: ${discipline}`);
    if (orders.some((order, index) => order !== sorted[index])) issues.push(`branch order is not deterministic: ${discipline}`);
  }

  for (const record of records) {
    if (record.primaryBranch) {
      const branch = branchMap.get(record.primaryBranch);
      if (!branch) issues.push(`record branch missing: ${record.id}`);
      else if (branch.discipline !== record.discipline) issues.push(`record / branch discipline mismatch: ${record.id}`);
    }
    if (record.knowledgeForm && !Object.prototype.hasOwnProperty.call(KNOWLEDGE_FORM_LABELS, record.knowledgeForm)) {
      issues.push(`knowledge form invalid: ${record.id}`);
    }
    if (record.literatureStanding) {
      if (new Set(record.literatureStanding).size !== record.literatureStanding.length) issues.push(`duplicate literature standing: ${record.id}`);
      for (const standing of record.literatureStanding) {
        if (!LITERATURE_STANDINGS.includes(standing)) issues.push(`literature standing invalid: ${record.id}`);
      }
    }
  }

  for (const id of CORE_MUSIC_PSYCHOLOGY_RECORD_IDS) {
    const record = recordMap.get(id);
    if (!record) {
      issues.push(`core record missing: ${id}`);
      continue;
    }
    if (record.discipline !== "music-psych") issues.push(`core record discipline invalid: ${id}`);
    if (record.kind !== "theory") issues.push(`core record kind changed: ${id}`);
    if (!record.primaryBranch) issues.push(`core record branch missing: ${id}`);
    if (!record.knowledgeForm) issues.push(`core record knowledge form missing: ${id}`);
  }

  issues.push(...validateRelations(records, relations));

  const pathIds = new Set<string>();
  for (const path of paths) {
    if (pathIds.has(path.id)) issues.push(`duplicate learning path: ${path.id}`);
    pathIds.add(path.id);
    if (!DISCIPLINES[path.discipline]) issues.push(`path discipline invalid: ${path.id}`);
    if (path.recordIds.length === 0) issues.push(`empty learning path: ${path.id}`);
    if (new Set(path.recordIds).size !== path.recordIds.length) issues.push(`duplicate record in path: ${path.id}`);
    for (const id of path.recordIds) {
      const record = recordMap.get(id);
      if (!record) issues.push(`path record missing: ${path.id}:${id}`);
      else if (record.discipline !== path.discipline) issues.push(`path discipline mismatch: ${path.id}:${id}`);
    }
  }

  return issues;
}

export function assertAtlasMetadataValid(records: readonly AnyRecord[] = RECORDS) {
  const issues = validateAtlasMetadata(records);
  if (issues.length > 0) throw new Error(issues.join("\n"));
}

export type { RelationProvenance };

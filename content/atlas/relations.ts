import { RECORDS } from "../records";

export const RELATION_TYPES = {
  informs: { direction: "directed", forwardLabel: "informs", reverseLabel: "is informed by" },
  formalises: { direction: "directed", forwardLabel: "formalises", reverseLabel: "is formalised by" },
  extends: { direction: "directed", forwardLabel: "extends", reverseLabel: "is extended by" },
  "computationally-implements": {
    direction: "directed",
    forwardLabel: "computationally implements",
    reverseLabel: "is computationally implemented by",
  },
  complements: { direction: "symmetric", forwardLabel: "complements", reverseLabel: "complements" },
  contrasts: { direction: "symmetric", forwardLabel: "contrasts with", reverseLabel: "contrasts with" },
  bridges: { direction: "symmetric", forwardLabel: "bridges", reverseLabel: "bridges" },
} as const;

export type RelationType = keyof typeof RELATION_TYPES;
export type RelationDirection = (typeof RELATION_TYPES)[RelationType]["direction"];
export type RelationProvenance = "source-grounded" | "editorial-synthesis" | "proposed";

export type AtlasRelation = {
  from: string;
  to: string;
  type: RelationType;
  provenance: RelationProvenance;
  explanation?: string;
  sourceIds?: readonly string[];
};

export const ATLAS_RELATIONS = [
  { from: "meyers-expectancy-theory", to: "narmours-implication-realization-theory", type: "informs", provenance: "source-grounded" },
  { from: "meyers-expectancy-theory", to: "hurons-itpra-theory", type: "informs", provenance: "source-grounded" },
  { from: "idyom-information-dynamics-of-music", to: "statistical-learning-of-music", type: "computationally-implements", provenance: "source-grounded" },
  { from: "narmours-implication-realization-theory", to: "idyom-information-dynamics-of-music", type: "contrasts", provenance: "editorial-synthesis" },
  { from: "gestalt-principles-in-music", to: "auditory-scene-analysis", type: "complements", provenance: "editorial-synthesis" },
  { from: "gestalt-principles-in-music", to: "tonal-hierarchy", type: "complements", provenance: "editorial-synthesis" },
  { from: "generative-theory-of-tonal-music", to: "narmours-implication-realization-theory", type: "complements", provenance: "editorial-synthesis" },
  { from: "statistical-learning-of-music", to: "tonal-hierarchy", type: "bridges", provenance: "proposed" },
  { from: "statistical-learning-of-music", to: "predictive-processing-in-music", type: "bridges", provenance: "editorial-synthesis" },
  { from: "idyom-information-dynamics-of-music", to: "predictive-processing-in-music", type: "complements", provenance: "editorial-synthesis" },
] as const satisfies readonly AtlasRelation[];

export type ResolvedAtlasRelation = AtlasRelation & {
  relatedRecordId: string;
  label: string;
  orientation: "forward" | "reverse";
};

/** Symmetric edges have one stable key regardless of endpoint order. */
export function canonicalRelationKey(relation: AtlasRelation) {
  const endpoints = RELATION_TYPES[relation.type].direction === "symmetric"
    ? [relation.from, relation.to].sort()
    : [relation.from, relation.to];
  return `${relation.type}:${endpoints[0]}:${endpoints[1]}`;
}

export function getRelationsForRecord(recordId: string): ResolvedAtlasRelation[] {
  const resolved: ResolvedAtlasRelation[] = [];
  for (const relation of ATLAS_RELATIONS) {
    if (relation.from === recordId) {
      resolved.push({
        ...relation,
        relatedRecordId: relation.to,
        label: RELATION_TYPES[relation.type].forwardLabel,
        orientation: "forward" as const,
      });
    }
    else if (relation.to === recordId) {
      resolved.push({
        ...relation,
        relatedRecordId: relation.from,
        label: RELATION_TYPES[relation.type].direction === "symmetric"
          ? RELATION_TYPES[relation.type].forwardLabel
          : RELATION_TYPES[relation.type].reverseLabel,
        orientation: "reverse" as const,
      });
    }
  }
  return resolved;
}

export function getRelatedRecordsForRecord(recordId: string) {
  return getRelationsForRecord(recordId).flatMap((relation) => {
    const record = RECORDS.find((candidate) => candidate.id === relation.relatedRecordId);
    return record ? [{ ...relation, record }] : [];
  });
}

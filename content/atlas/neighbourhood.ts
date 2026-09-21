import { DISCIPLINES } from "../disciplines";
import { RECORDS } from "../records";
import type { AnyRecord } from "../types";
import { ATLAS_BRANCHES } from "./branches";
import { getRelatedRecordsForRecord } from "./relations";

export type KnowledgeNeighbour = {
  record: AnyRecord;
  relationLabel: string;
  relationBody?: string;
  direction: "outgoing" | "incoming" | "atlas";
  source: "explicit" | "derived";
  sourceTitle?: string;
  provenance?: string;
};

export type KnowledgeNeighbourhood = {
  neighbours: KnowledgeNeighbour[];
  fallback: {
    href: string;
    label: string;
    body: string;
  };
};

const MAX_NEIGHBOURS = 4;

function explicitLinks(record: AnyRecord) {
  return "relatedTo" in record ? record.relatedTo ?? [] : [];
}

function resolveRecord(records: readonly AnyRecord[], reference: string) {
  return records.find((candidate) => candidate.id === reference || candidate.slug === reference);
}

/**
 * Build the small, truthful ending of a record page. Explicit record links
 * come first, then incoming explicit links, then the typed atlas ledger, and
 * finally a same-branch atlas cue. The last step is labelled as proximity so
 * it cannot be mistaken for a record-to-record claim.
 */
export function getKnowledgeNeighbourhood(record: AnyRecord, records: readonly AnyRecord[] = RECORDS): KnowledgeNeighbourhood {
  const byId = new Map(records.map((candidate) => [candidate.id, candidate] as const));
  const neighbours: KnowledgeNeighbour[] = [];
  const seen = new Set<string>();

  const add = (neighbour: KnowledgeNeighbour) => {
    if (neighbours.length >= MAX_NEIGHBOURS || seen.has(neighbour.record.id) || neighbour.record.id === record.id) return;
    seen.add(neighbour.record.id);
    neighbours.push(neighbour);
  };

  for (const link of explicitLinks(record)) {
    const target = byId.get(link.recordId) ?? resolveRecord(records, link.recordId);
    if (target) {
      add({
        record: target,
        relationLabel: link.relation,
        relationBody: link.body,
        direction: "outgoing",
        source: "explicit",
      });
    }
  }

  for (const source of records) {
    for (const link of explicitLinks(source)) {
      if (link.recordId !== record.id && link.recordId !== record.slug) continue;
      add({
        record: source,
        relationLabel: link.relation,
        relationBody: link.body,
        direction: "incoming",
        source: "explicit",
        sourceTitle: source.title,
      });
    }
  }

  for (const relation of getRelatedRecordsForRecord(record.id)) {
    add({
      record: relation.record,
      relationLabel: relation.label,
      relationBody: relation.explanation,
      direction: "atlas",
      source: "explicit",
      provenance: relation.provenance,
    });
  }

  if (record.primaryBranch && neighbours.length < MAX_NEIGHBOURS) {
    const branch = ATLAS_BRANCHES.find((candidate) => candidate.id === record.primaryBranch);
    if (branch) {
      for (const candidate of records) {
        if (candidate.primaryBranch !== branch.id) continue;
        add({
          record: candidate,
          relationLabel: "same atlas branch",
          relationBody: branch.description,
          direction: "atlas",
          source: "derived",
          provenance: "atlas proximity",
        });
      }
    }
  }

  const discipline = DISCIPLINES[record.discipline];
  const fallbackLabel = discipline ? `Explore ${discipline.name} in the Library` : "Browse the full Library";
  const fallbackHref = discipline
    ? `/concept-lab/library?discipline=${encodeURIComponent(record.discipline)}`
    : "/concept-lab/library";

  return {
    neighbours,
    fallback: {
      href: fallbackHref,
      label: fallbackLabel,
      body: "A field link keeps discovery open without claiming that every record in the field is directly related.",
    },
  };
}

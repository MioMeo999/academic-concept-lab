import assert from "node:assert/strict";
import test from "node:test";
import { getKnowledgeNeighbourhood } from "../content/atlas/neighbourhood";
import { getRelatedRecordsForRecord } from "../content/atlas/relations";
import { RECORDS } from "../content/records";

const record = (id: string) => {
  const found = RECORDS.find((candidate) => candidate.id === id);
  assert.ok(found, `missing record ${id}`);
  return found;
};

test("neighbourhood prefers several explicit outgoing relations", () => {
  const result = getKnowledgeNeighbourhood(record("affective-events-theory"));
  assert.deepEqual(result.neighbours.slice(0, 3).map((item) => item.record.id), [
    "person-environment-fit",
    "job-demands-resources",
    "workplace-design",
  ]);
  assert.ok(result.neighbours.slice(0, 3).every((item) => item.direction === "outgoing"));
});

test("incoming relations are retained without reversing their wording", () => {
  const result = getKnowledgeNeighbourhood(record("person-environment-fit"));
  assert.ok(result.neighbours.length > 0);
  assert.ok(result.neighbours.some((item) => item.direction === "incoming" && item.sourceTitle === "Person–Organisation Fit"));
  assert.equal(result.neighbours.find((item) => item.sourceTitle === "Person–Organisation Fit")?.relationLabel, "is a subtype of");
});

test("different record kinds remain visible in a direct relation", () => {
  const result = getKnowledgeNeighbourhood(record("hpa-axis"));
  const relation = result.neighbours.find((item) => item.record.id === "job-demands-resources");
  assert.equal(relation?.record.kind, "theory");
  assert.equal(relation?.direction, "outgoing");
});

test("typed atlas relations remain available as canonical relation metadata", () => {
  const relation = getRelatedRecordsForRecord("statistical-learning-of-music").find((item) => item.relatedRecordId === "predictive-processing-in-music");
  assert.equal(relation?.type, "bridges");
  assert.equal(relation?.orientation, "forward");
  assert.equal(relation?.provenance, "editorial-synthesis");
});

test("legacy slug references still resolve to their registered record", () => {
  const result = getKnowledgeNeighbourhood(record("hurons-itpra-theory"));
  assert.ok(result.neighbours.some((item) => item.record.id === "statistical-learning-of-music" && item.direction === "incoming"));
});

test("records without defensible relations receive a field fallback", () => {
  const result = getKnowledgeNeighbourhood(record("ipa"));
  assert.deepEqual(result.neighbours, []);
  assert.equal(result.fallback.href, "/concept-lab/library?discipline=qual-methods");
});

test("neighbourhoods stay bounded", () => {
  for (const current of RECORDS) {
    assert.ok(getKnowledgeNeighbourhood(current).neighbours.length <= 4, current.id);
  }
});

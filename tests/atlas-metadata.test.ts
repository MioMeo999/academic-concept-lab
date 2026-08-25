import assert from "node:assert/strict";
import test from "node:test";
import { RECORDS, recordHref } from "../content/records";
import {
  ATLAS_BRANCHES,
  ATLAS_RELATIONS,
  CORE_MUSIC_PSYCHOLOGY_RECORD_IDS,
  getBranch,
  getBranchesForDiscipline,
  getKnowledgeFormLabel,
  getLearningPathsForDiscipline,
  getRelatedRecordsForRecord,
  getRelationsForRecord,
  KNOWLEDGE_FORM_LABELS,
  LEARNING_PATHS,
  validateAtlasMetadata,
} from "../content/atlas";

const recordById = new Map(RECORDS.map((record) => [record.id, record]));

test("atlas metadata validates against the current record registry", () => {
  assert.deepEqual(validateAtlasMetadata(RECORDS), []);
});

test("music psychology branches are ordered, scoped, and labelled", () => {
  assert.deepEqual(ATLAS_BRANCHES.map((branch) => branch.id), [
    "perception-organisation",
    "musical-structure-grammar",
    "expectation-prediction",
  ]);
  assert.equal(new Set(ATLAS_BRANCHES.map((branch) => branch.id)).size, ATLAS_BRANCHES.length);
  assert.deepEqual(getBranchesForDiscipline("music-psych").map((branch) => branch.label), [
    "Perception & Organisation",
    "Musical Structure & Grammar",
    "Expectation & Prediction",
  ]);
  assert.equal(getBranch("expectation-prediction")?.discipline, "music-psych");
  assert.equal(getBranch("expectation-prediction", "ob"), undefined);
});

test("knowledge forms expose the controlled values and display labels", () => {
  assert.deepEqual(Object.keys(KNOWLEDGE_FORM_LABELS), [
    "theory",
    "framework",
    "formal-model",
    "computational-model",
    "perceptual-tradition",
  ]);
  assert.equal(getKnowledgeFormLabel("computational-model"), "Computational model");
  assert.equal(getKnowledgeFormLabel("perceptual-tradition"), "Perceptual tradition");
});

test("the ten core records have stable branch and form classifications", () => {
  const expected = {
    "meyers-expectancy-theory": ["expectation-prediction", "theory"],
    "auditory-scene-analysis": ["perception-organisation", "framework"],
    "tonal-hierarchy": ["musical-structure-grammar", "framework"],
    "gestalt-principles-in-music": ["perception-organisation", "perceptual-tradition"],
    "generative-theory-of-tonal-music": ["musical-structure-grammar", "formal-model"],
    "narmours-implication-realization-theory": ["expectation-prediction", "formal-model"],
    "hurons-itpra-theory": ["expectation-prediction", "theory"],
    "statistical-learning-of-music": ["expectation-prediction", "framework"],
    "idyom-information-dynamics-of-music": ["expectation-prediction", "computational-model"],
    "predictive-processing-in-music": ["expectation-prediction", "framework"],
  } as const;

  assert.deepEqual([...CORE_MUSIC_PSYCHOLOGY_RECORD_IDS].sort(), Object.keys(expected).sort());
  for (const id of CORE_MUSIC_PSYCHOLOGY_RECORD_IDS) {
    const record = recordById.get(id);
    assert.ok(record);
    assert.equal(record.kind, "theory");
    assert.deepEqual([record.primaryBranch, record.knowledgeForm], expected[id]);
  }
});

test("literature standing stays plural and follows accepted record identity", () => {
  const expected = {
    "meyers-expectancy-theory": ["historical-anchor"],
    "auditory-scene-analysis": ["foundational"],
    "tonal-hierarchy": [],
    "gestalt-principles-in-music": [],
    "generative-theory-of-tonal-music": ["foundational"],
    "narmours-implication-realization-theory": ["foundational"],
    "hurons-itpra-theory": ["foundational"],
    "statistical-learning-of-music": ["foundational"],
    "idyom-information-dynamics-of-music": ["influential"],
    "predictive-processing-in-music": ["influential"],
  } as const;

  for (const [id, standing] of Object.entries(expected)) {
    assert.deepEqual(recordById.get(id)?.literatureStanding ?? [], standing);
  }
});

test("Music Preference remains unassigned to a premature branch", () => {
  const musicPreference = recordById.get("music-preference");
  assert.ok(musicPreference);
  assert.equal(musicPreference.primaryBranch, undefined);
  assert.equal(musicPreference.knowledgeForm, "framework");
  assert.equal(musicPreference.knowledgeFormQualifier, "Research field / person–music fit and preference");
  assert.equal(musicPreference.literatureStanding, undefined);
});

test("typed relations preserve direction and generate reciprocal labels", () => {
  assert.equal(ATLAS_RELATIONS.length, 10);
  const idyomForward = getRelationsForRecord("idyom-information-dynamics-of-music").find(
    (relation) => relation.type === "computationally-implements",
  );
  assert.equal(idyomForward?.relatedRecordId, "statistical-learning-of-music");
  assert.equal(idyomForward?.label, "computationally implements");
  assert.equal(idyomForward?.orientation, "forward");

  const statisticalReverse = getRelationsForRecord("statistical-learning-of-music").find(
    (relation) => relation.type === "computationally-implements",
  );
  assert.equal(statisticalReverse?.label, "is computationally implemented by");
  assert.equal(statisticalReverse?.orientation, "reverse");

  const gestaltRelations = getRelatedRecordsForRecord("gestalt-principles-in-music");
  assert.deepEqual(gestaltRelations.filter((relation) => relation.type === "complements").map((relation) => relation.relatedRecordId), [
    "auditory-scene-analysis",
    "tonal-hierarchy",
  ]);
  assert.ok(gestaltRelations.every((relation) => relation.provenance === "editorial-synthesis"));
});

test("symmetric relation duplicates are rejected regardless of endpoint order", () => {
  const symmetric = ATLAS_RELATIONS.find((relation) => relation.type === "complements");
  assert.ok(symmetric);
  const duplicate = { ...symmetric, from: symmetric.to, to: symmetric.from };
  const issues = validateAtlasMetadata(RECORDS, { relations: [...ATLAS_RELATIONS, duplicate] });
  assert.ok(issues.some((issue) => issue.startsWith("duplicate relation:")));
});

test("learning paths preserve the approved deterministic order", () => {
  assert.deepEqual(LEARNING_PATHS.map((path) => path.id), [
    "organise-sound",
    "musical-expectation",
    "learn-model-predict",
  ]);
  assert.deepEqual(getLearningPathsForDiscipline("music-psych").map((path) => [...path.recordIds]), [
    ["gestalt-principles-in-music", "auditory-scene-analysis", "tonal-hierarchy", "generative-theory-of-tonal-music"],
    ["meyers-expectancy-theory", "narmours-implication-realization-theory", "hurons-itpra-theory"],
    ["statistical-learning-of-music", "idyom-information-dynamics-of-music", "predictive-processing-in-music"],
  ]);
});

test("core theory slugs and route vocabulary remain stable", () => {
  for (const id of CORE_MUSIC_PSYCHOLOGY_RECORD_IDS) {
    const record = recordById.get(id);
    assert.ok(record);
    const expectedSlug = id === "hurons-itpra-theory" ? "hurons-itpra-theory-of-expectation" : id;
    assert.equal(record.slug, expectedSlug);
    assert.equal(recordHref(record), `/concept-lab/theory/${expectedSlug}`);
  }
});

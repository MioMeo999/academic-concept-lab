/* ---------------------------------------------------------------------------
   Content model.

   Two record kinds share a shell but not a template, because a theory and an
   empirical study are different objects: a theory has no sample, date or
   result, and a study's method has to stay welded to its finding.

   The theory template is SECTION-DRIVEN. Every block marked optional below
   renders only if the record carries data for it, and section numbers plus the
   contents rail are generated from whatever survives. That is why
   Person–Environment Fit runs to 9 sections and Job Demands–Resources to 11
   off one template.
   ------------------------------------------------------------------------- */

export type RecordKind = "theory" | "study";

export type ProvenanceGlyph = "●" | "■" | "▲" | "✦" | "?";

/** Where a claim came from. Required on every record — it is the field that
 *  makes everything else on the page trustworthy. */
export type Provenance = {
  glyph: ProvenanceGlyph;
  colour: string;
  label: string;
  note: string;
};

export type Source = {
  citation: string;
  contribution: string;
  doi?: string;
};

/** Fields every record carries, whatever its kind. */
type RecordBase = {
  id: string;
  kind: RecordKind;
  slug: string;
  title: string;
  hook: string;
  oneSentence: string;
  discipline: string;
  topics: string[];
  /** Chips on the library card. */
  facts: string[];
  provenance: Provenance[];
};

/* ---------------- theory ---------------- */

/** An interactive teaching model. Never a calculation — see `caption`. */
export type TheoryDemo = {
  type: "scale-pair" | "dual-path";
  start?: number;
  label: string;
  options: string[];
  caption: string;
  /** scale-pair only: the word circled between the two figures. */
  centre?: string;
};

export type Origin = {
  year: string;
  author: string;
  work: string;
  contribution: string;
};

export type CoreProcess = {
  id: string;
  title: string;
  person: string;
  environment: string;
  explanation: string;
};

export type FitTarget = {
  id: string;
  icon: string;
  colour: string;
  title: string;
  question: string;
  example: string;
};

export type Category = {
  title: string;
  icon: string;
  colour: string;
  definition: string;
  examples: string[];
};

export type Pathway = {
  title: string;
  icon: string;
  colour: string;
  blurb: string;
  steps: string[];
};

export type DemandType = {
  title: string;
  colour: string;
  definition: string;
  examples: string[];
  relates: string;
};

export type Interaction = { kicker: string; title: string; body: string };

export type Expansion = { title: string; icon: string; colour: string; body: string };

export type TheoryRecord = RecordBase & {
  kind: "theory";

  /* required */
  ideaLede: string;
  originsNote: string;
  origins: Origin[];
  trailLede: string;
  oversimplifications: string[];
  oversimplificationsLede: string;
  qualifications: string[];
  minimumReading: Source[];
  minimumReadingLabel?: string;
  fullSources: Source[];

  /* optional blocks — include only what this theory actually has */
  demo?: TheoryDemo;
  categories?: Category[];
  categoriesLede?: string;
  categoriesNote?: string;
  pathways?: Pathway[];
  pathwaysLede?: string;
  pathwaysCaution?: string;
  demandTypes?: DemandType[];
  demandTypesLede?: string;
  demandTypesNote?: string;
  interactions?: Interaction[];
  interactionsLede?: string;
  expansions?: Expansion[];
  expansionsLede?: string;
  coreProcesses?: CoreProcess[];
  fitTargets?: FitTarget[];
  workAdjustment?: string;
};

/* ---------------- empirical study ---------------- */

export type Study = {
  label: string;
  n: string;
  design: string;
  location: string;
  locIcon: string;
  sample: string;
  question: string;
  method: string;
  role: string;
  result: string;
  strength: string;
  limitation: string;
};

export type ClaimEvidence = {
  status: string;
  fill: string;
  stroke: string;
  tilt: string;
  claim: string;
  evidence: string;
};

export type PaperRecord = RecordBase & {
  kind: "study";
  citation: { authors: string; journal: string; volume: string; year: number; doi: string };
  openMaterials: string;
  researchQuestion: string;
  theoreticalFoundation: string;
  conceptualModel: string[];
  hypotheses: string[];
  studies: Study[];
  crossStudyFindings: string[];
  robustness: string[];
  alternativeExplanations: { icon: string; colour: string; text: string }[];
  claimEvidencePairs: ClaimEvidence[];
  strengths: string[];
  limitations: string[];
  contributions: string[];
  implications: string[];
};

export type AnyRecord = TheoryRecord | PaperRecord;

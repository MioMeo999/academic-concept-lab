/* ---------------------------------------------------------------------------
   Content model.

   Three record kinds share a shell but not a template, because they are
   different objects:

     a theory is a LENS     — no sample, date or result; it has to demonstrate
     a study is an ARGUMENT — its method must stay welded to its finding
     a method is a PRACTICE — you get better at it by doing it, so the page has
                              to be usable at the desk, not only readable

   Forcing any of the three into another's shape loses what makes it that kind
   of thing.

   The theory template is SECTION-DRIVEN. Every block marked optional below
   renders only if the record carries data for it, and section numbers plus the
   contents rail are generated from whatever survives. That is why
   Person–Environment Fit runs to 9 sections and Job Demands–Resources to 11
   off one template.
   ------------------------------------------------------------------------- */

export type RecordKind = "theory" | "study" | "method";

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
  /** Optional badge for a record whose standing needs flagging up front —
   *  e.g. a research field rather than a single theory. */
  statusChip?: string;
  provenance: Provenance[];
};

/* ---------------- theory ---------------- */

/** An interactive teaching model. Never a calculation — see `caption`. */
/** A facet of a multi-dimensional model, one per segmented-control option. */
export type Facet = { initial: string; label: string; body: string };

/** dual-path only: the two lines whose weight moves as the control changes. */
export type DemoRoad = { label: string; sub: string; colour: string; icon: string };

export type TheoryDemo = {
  type: "scale-pair" | "dual-path" | "facets";
  start?: number;
  label: string;
  options: string[];
  caption: string;
  /** scale-pair only: the word circled between the two figures. */
  centre?: string;
  /** facets only: supplied by the record, since the content is record-specific. */
  facets?: Facet[];
  /** dual-path only: override the two roads. Defaults to Job Demands–Resources. */
  roads?: [DemoRoad, DemoRoad];
  /** dual-path only: `a`/`b` are the two roads' weights, 0–1, one per option. */
  states?: { a: number; b: number; t: string }[];
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

/* Some records are not a single theory at all but a research field with
   converging questions and competing answers. Saying so on the record's face is
   more honest than flattening it into a framework it does not have. */
export type ConceptualStatus = {
  flag: string;
  body: string;
  questions: string[];
};

/* Where one name covers two different literatures, the page's first job is to
   say which one it is — and to send the reader to the right place for the
   other, rather than pretending the ambiguity does not exist. */
export type Disambiguation = {
  flag: string;
  covered: { title: string; blurb: string; items: string[] };
  notCovered: { title: string; blurb: string; items: string[]; sources: Source[] };
  note: string;
};

/* An ordered set of models within a field — e.g. a four-factor structure
   superseded by a five-factor one — where the succession is itself the point. */
export type Model = {
  year: string;
  name: string;
  source: string;
  body: string;
  note?: string;
};

/* A literature that applies the field to a particular setting, anchored to the
   studies that make it up rather than stated as settled conclusions. */
export type AppliedWork = {
  year: string;
  authors: string;
  work: string;
  body: string;
};

/* Blocks carry generic headings so they can be reused across records; a record
   overrides them by key. Without this, reusing the two-category block outside
   Job Demands–Resources would render "Everything in a job goes in one of two
   buckets" over content about music. */
export type Headings = Record<string, { toc: string; title: string }>;

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
  headings?: Headings;
  /** Reading order by block key. Keys omitted keep their declared position. */
  order?: string[];
  /** Which block the demo sits in. Defaults to `models` if present, else `idea`. */
  demoIn?: string;
  conceptualStatus?: ConceptualStatus;
  disambiguation?: Disambiguation;
  models?: Model[];
  modelsLede?: string;
  modelsNote?: string;
  applied?: AppliedWork[];
  appliedLede?: string;
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

/* ---------------- research method ---------------- */

/** The intellectual commitments a method rests on. */
export type Commitment = { title: string; icon: string; colour: string; body: string };

/** A step in the procedure. `rule` marks a step whose order is load-bearing. */
export type ProcedureStep = { n: string; title: string; body: string };

/** One column of a close-reading pass, and what it asks of the reader. */
export type CraftColumn = { title: string; asks: string; colour: string };

/** A term the field has revised. Using the old one dates the work. */
export type TermShift = { was: string; now: string; note: string };

/** A marker of quality, for auditing your own analysis or someone else's. */
export type QualityMarker = { n: string; title: string; body: string };

/** Two ways of writing the same finding — one flat, one doing real work. */
export type ThemeContrast = { weak: string[]; strong: string[]; note: string };

/** A stage in learning the method by doing it. */
export type LearningStage = { n: string; title: string; body: string; read?: string };

/** A published study worth reading to see the method done well. */
export type Exemplar = { year: string; authors: string; work: string; body: string };

/** A candidate research question, and whether the method actually fits it. */
export type QuestionFit = { question: string; fits: boolean; why: string };

export type MethodRecord = RecordBase & {
  kind: "method";
  /** e.g. "IPA" — used where the full name will not fit. */
  abbr?: string;
  ideaLede: string;
  originsNote: string;

  commitments?: Commitment[];
  commitmentsLede?: string;
  doubleHermeneutic?: { quote: string; body: string };

  questionFit?: QuestionFit[];
  questionFitLede?: string;
  questionFitNote?: string;

  procedure?: ProcedureStep[];
  procedureLede?: string;
  cardinalRule?: string;

  craft?: CraftColumn[];
  craftLede?: string;
  attendTo?: string[];

  terminology?: TermShift[];
  terminologyLede?: string;

  qualityMarkers?: QualityMarker[];
  qualityMarkersLede?: string;

  themeContrast?: ThemeContrast;
  themeContrastLede?: string;

  stages?: LearningStage[];
  stagesLede?: string;

  exemplars?: Exemplar[];
  exemplarsLede?: string;

  misuses: string[];
  misusesLede: string;
  qualifications: string[];

  coreReading: Source[];
  coreReadingLabel?: string;
  fullSources: Source[];

  headings?: Headings;
  order?: string[];
};

export type AnyRecord = TheoryRecord | PaperRecord | MethodRecord;

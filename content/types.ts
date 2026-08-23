/* ---------------------------------------------------------------------------
   Content model.

   Four record kinds share a shell but not a template, because they are
   different objects:

     a theory is a LENS      — no sample, date or result; it has to demonstrate
     a study is an ARGUMENT  — its method must stay welded to its finding
     a method is a PRACTICE  — you get better at it by doing it, so the page
                               has to be usable at the desk, not only readable
     a mechanism is a PATHWAY — it does not explain why something happens, but
                               through what. A biological system is not a
                               psychological theory, and labelling it as one
                               would contradict the record's own first line.

   Mechanism shares the theory template: the two differ in what they ARE, and
   so in label, colour and filter — but their content happens to decompose into
   the same section blocks. The template splits when a record needs it to, not
   before.

   Forcing any of the three into another's shape loses what makes it that kind
   of thing.

   The theory template is SECTION-DRIVEN. Every block marked optional below
   renders only if the record carries data for it, and section numbers plus the
   contents rail are generated from whatever survives. That is why
   Person–Environment Fit runs to 9 sections and Job Demands–Resources to 11
   off one template.
   ------------------------------------------------------------------------- */

export type RecordKind = "theory" | "study" | "method" | "mechanism";

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

/** A small classification exercise whose explanation matters more than a score. */
export type ClassificationItem = {
  scenario: string;
  answer: "feature" | "event";
  explanation: string;
};

export type ClassificationExercise = {
  items: ClassificationItem[];
  note: string;
};

/** A model that can be drawn in stages while retaining a linear text reading. */
export type ModelStage = {
  label: string;
  body: string;
  colour: string;
};

export type ModelTopologyEdge = {
  from: number;
  to: number;
  label?: string;
};

export type ModelTopology = {
  edges: ModelTopologyEdge[];
  temporalContext: ModelStage;
};

export type ModelReveal = {
  stages: ModelStage[];
  linear: string[];
  caption: string;
  topology?: ModelTopology;
};

export type SimpleModel = {
  lede: string;
  first: string;
  second: string;
  note: string;
};

export type WorkdayEvent = {
  time: string;
  label: string;
  detail: string;
  tone: "steady" | "negative" | "positive" | "activated";
};

export type WorkdayTimeline = {
  events: WorkdayEvent[];
  caption: string;
  takeaway: string;
};

export type ConceptComparison = {
  label: string;
  title: string;
  body: string;
  colour: string;
};

export type ConceptComparisonBlock = {
  lede: string;
  cards: ConceptComparison[];
  note: string;
};

export type ReactionContrast = {
  event: string;
  perspectives: { label: string; reading: string; reaction: string }[];
  takeaway: string;
  boundary: string;
};

export type EvidenceXray = {
  title: string;
  label: "empirical study" | "process model" | "review";
  citation: string;
  design?: string;
  testedLabel: string;
  tested: string;
  foundLabel: string;
  found: string;
  notTested: string;
  doi?: string;
};

/** A small, deterministic musical phrase used by an audio teaching example. */
export type AudioNote = {
  pitch: number;
  beats: number;
};

/** A scheduled synthetic tone used by reusable music-perception examples. */
export type AudioEvent = {
  pitch: number;
  start: number;
  duration: number;
};

export type AudioPreset = {
  label: string;
  body: string;
  events: AudioEvent[];
  variable: string;
  controls: string;
  colour: string;
};

export type TonalProbe = {
  pitchClass: string;
  note: string;
  midi: number;
  role: string;
  body: string;
  colour: string;
};

export type TonalContext = {
  id: string;
  label: string;
  body: string;
  events: AudioEvent[];
  controls: string;
  colour: string;
  role?: string;
};

export type AudioChoice = {
  label: string;
  body: string;
  notes: AudioNote[];
};

export type MeyerBranch = {
  label: string;
  body: string;
  colour: string;
};

export type MeyerOutcome = {
  label: string;
  title: string;
  body: string;
  notes: AudioNote[];
  colour: string;
};

export type MeyerRecordContent = {
  opening: {
    lede: string;
    context: AudioNote[];
    choices: AudioChoice[];
    note: string;
  };
  embodied: {
    lede: string;
    points: string[];
    note: string;
  };
  branches: {
    lede: string;
    current: string;
    items: MeyerBranch[];
    note: string;
  };
  style: {
    lede: string;
    cards: MeyerBranch[];
    note: string;
  };
  outcomes: {
    lede: string;
    context: AudioNote[];
    variants: MeyerOutcome[];
    question: string;
    note: string;
  };
  delay: {
    lede: string;
    steps: string[];
    note: string;
  };
  resolution: {
    lede: string;
    note: string;
  };
  meaning: {
    lede: string;
    stages: { label: string; question: string; body: string; colour: string }[];
    note: string;
  };
  gestalt: {
    lede: string;
    cards: MeyerBranch[];
    note: string;
  };
  listener: {
    lede: string;
    cards: MeyerBranch[];
    note: string;
  };
  evidence: {
    lede: string;
    items: EvidenceXray[];
  };
  scope: {
    lede: string;
    explains: string[];
    stops: string[];
    note: string;
  };
  lineage: {
    lede: string;
    nodes: MeyerBranch[];
    note: string;
  };
  explains: string[];
  stops: string[];
};

export type ASACard = { label: string; body: string; colour: string };

export type ASARecordContent = {
  opening: { lede: string; presets: AudioPreset[]; note: string };
  problem: { lede: string; layers: ASACard[]; note: string };
  source: { lede: string; source: ASACard; stream: ASACard; note: string };
  grouping: { lede: string; sequential: string[]; simultaneous: string[]; note: string };
  cues: { lede: string; sequential: string[]; simultaneous: string[]; note: string };
  competition: { lede: string; cards: ASACard[]; note: string };
  bistability: { lede: string; states: ASACard[]; note: string };
  groupFuse: { lede: string; presets: AudioPreset[]; question: string; note: string };
  oldNew: { lede: string; steps: string[]; note: string };
  organisation: { lede: string; primitive: string[]; schema: string[]; note: string };
  attention: { lede: string; cards: ASACard[]; note: string };
  music: { lede: string; cards: ASACard[]; note: string };
  evidence: { lede: string; items: EvidenceXray[] };
  scope: { lede: string; explains: string[]; stops: string[]; note: string };
  lineage: { lede: string; nodes: ASACard[]; note: string };
};

export type TonalCard = { label: string; body: string; colour: string };

export type TonalProfileItem = {
  note: string;
  pitchClass: string;
  role: string;
  level: "anchor" | "triad" | "diatonic" | "nondiatonic";
  body: string;
};

export type TonalRecordContent = {
  opening: { lede: string; context: TonalContext; probes: TonalProbe[]; note: string };
  context: { lede: string; cards: TonalCard[]; note: string };
  measurement: { lede: string; cards: TonalCard[]; note: string };
  probeLab: { lede: string; context: TonalContext; probes: TonalProbe[]; note: string };
  profile: { lede: string; items: TonalProfileItem[]; note: string };
  sameNote: { lede: string; probe: TonalProbe; contexts: TonalContext[]; note: string };
  dimensions: { lede: string; cards: TonalCard[]; note: string };
  representation: { lede: string; cards: TonalCard[]; note: string };
  neighbourhood: { lede: string; note: string; levels: { label: string; body: string; relations: string[] }[] };
  keySpace: { lede: string; note: string };
  dynamics: { lede: string; note: string; states: TonalCard[] };
  distribution: { lede: string; note: string; cards: TonalCard[] };
  development: { lede: string; note: string; cards: TonalCard[] };
  culture: { lede: string; note: string; cards: TonalCard[] };
  process: { lede: string; note: string; cards: TonalCard[] };
  scope: { lede: string; explains: string[]; stops: string[]; note: string };
  lineage: { lede: string; note: string; nodes: TonalCard[] };
};

export type ScopeMap = {
  lede: string;
  map: string[];
  stops: string[];
  note: string;
};

export type SDTOpeningCase = { label: string; quote: string; body: string };

export type SDTMotive = {
  statement: string;
  regulation: string;
  explanation: string;
  relativeAutonomy: string;
  motivationKind: "intrinsic" | "extrinsic" | "amotivation";
  family: "autonomous" | "controlled" | "amotivation";
  colour: string;
};

export type SDTRegulation = {
  label: string;
  descriptor: string;
  body: string;
  kind: "amotivation" | "controlled" | "autonomous" | "intrinsic";
  colour: string;
};

export type SDTInternalisation = {
  lede: string;
  branches: { label: string; quote: string; body: string; colour: string }[];
  note: string;
};

export type SDTNeed = {
  label: string;
  question: string;
  meaning: string;
  distinction: string;
  colour: string;
};

export type SDTMatrixCase = {
  label: string;
  title: string;
  body: string;
  colour: string;
};

export type SDTContextModel = {
  contextItems: string[];
  personItems: string[];
  experiences: { label: string; body: string; colour: string }[];
  outcomes: string[];
  note: string;
};

export type SDTRewardComparison = {
  reward: string;
  cases: { label: string; quote: string; meaning: string; body: string; colour: string }[];
  note: string;
};

export type SDTNeedComparison = {
  pairs: { label: string; low: string; thwart: string; body: string; colour: string }[];
  note: string;
};

export type SDTWorkModel = {
  context: string[];
  person: string[];
  needs: string[];
  motivations: string[];
  outcomes: string[];
  note: string;
};

export type SDTMiniTheory = {
  acronym: string;
  title: string;
  question: string;
  emphasis: "core" | "neighbour";
  colour: string;
};

export type SDTScope = {
  explains: string[];
  stops: string[];
  note: string;
};

export type SDTRecordContent = {
  opening: { cases: SDTOpeningCase[]; note: string };
  motives: SDTMotive[];
  regulations: SDTRegulation[];
  internalisation: SDTInternalisation;
  needs: SDTNeed[];
  autonomyMatrix: { cases: SDTMatrixCase[]; note: string };
  context: SDTContextModel;
  rewards: SDTRewardComparison;
  needComparison: SDTNeedComparison;
  workModel: SDTWorkModel;
  miniTheories: SDTMiniTheory[];
  scope: SDTScope;
};

export type SETOpeningCase = { label: string; quote: string; body: string };
export type SETReciprocityMode = { label: string; short: string; body: string };
export type SETResource = { label: string; body: string };
export type SETRuleCase = { label: string; rule: string; body: string };
export type SETDimension = { label: string; body: string };
export type SETPowerModel = {
  values: string[];
  alternatives: string[];
  note: string;
};
export type SETHedonicCell = { label: string; body: string; colour: string };
export type SETConstraintExample = { desired: string; constrained: string; body: string };
export type SETChainStep = { label: string; body: string };
export type SETAuditCase = { label: string; claim: string; answers: string[]; verdict: string };
export type SETFamilyNode = { label: string; kind: "root" | "branch" | "synthesis" | "remedy"; body: string };
export type SETScope = { explains: string[]; stops: string[]; note: string };

export type SETRecordContent = {
  opening: { cases: SETOpeningCase[]; note: string };
  reciprocity: SETReciprocityMode[];
  resources: SETResource[];
  rules: SETRuleCase[];
  dimensions: SETDimension[];
  power: SETPowerModel;
  relationshipStages: SETChainStep[];
  hedonic: SETHedonicCell[];
  constraints: SETConstraintExample[];
  chain: SETChainStep[];
  audit: SETAuditCase[];
  family: SETFamilyNode[];
  scope: SETScope;
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

/** A term the field has revised, or a colloquial name that will not find the
 *  literature. Used by both theory and method records. */
export type TermShift = { was: string; now: string; note: string };

/* One record's explicit relation to another already in the library — e.g. a
   subtype of a broader framework. Turns a flat list of records into a
   structure the reader can navigate. */
export type RecordLink = { recordId: string; relation: string; body: string };

/** How a construct is actually measured, and what each approach can and cannot
 *  tell you. Every measurable thing has one of these. */
export type Measure = { method: string; tells: string; caution: string };

/** A schematic signalling chain: nodes with the messenger carried between
 *  them, plus the loop that regulates it. Deliberately schematic — see the
 *  caption rendered beneath it. */
export type Cascade = {
  nodes: { label: string; sub: string }[];
  messengers: string[];
  feedback: string;
  caption: string;
};

/* Blocks carry generic headings so they can be reused across records; a record
   overrides them by key. Without this, reusing the two-category block outside
   Job Demands–Resources would render "Everything in a job goes in one of two
   buckets" over content about music. */
export type Headings = Record<string, { toc: string; title: string }>;

export type TheoryRecord = RecordBase & {
  kind: "theory" | "mechanism";

  /* required */
  /** Optional: a record whose conceptual-status or cascade block already does
   *  this work skips the generic opener rather than rendering a blank one. */
  ideaLede?: string;
  originsNote?: string;
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
  relatedTo?: RecordLink[];
  relatedToLede?: string;
  cascade?: Cascade;
  cascadeLede?: string;
  measures?: Measure[];
  measuresLede?: string;
  measuresNote?: string;
  terminology?: TermShift[];
  terminologyLede?: string;
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
  classification?: ClassificationExercise;
  simpleModel?: SimpleModel;
  modelReveal?: ModelReveal;
  workday?: WorkdayTimeline;
  conceptComparison?: ConceptComparisonBlock;
  reactionContrast?: ReactionContrast;
  evidenceXrays?: EvidenceXray[];
  scopeMap?: ScopeMap;
  meyer?: MeyerRecordContent;
  asa?: ASARecordContent;
  tonal?: TonalRecordContent;
  sdt?: SDTRecordContent;
  set?: SETRecordContent;
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
/** A marker of quality, for auditing your own analysis or someone else's. */
export type QualityMarker = { n: string; title: string; body: string };

/** Two ways of writing the same finding — one flat, one doing real work. */
export type ThemeContrast = { weak: string[]; strong: string[]; note: string };

/** A stage in learning the method by doing it. */
export type LearningStage = { n: string; title: string; body: string; read?: string };

/** A published study worth reading to see the method done well. */
export type Exemplar = { year: string; authors: string; work: string; body: string };

/* Where several approaches share a family name and differ in their assumptions
   rather than only their steps. Naming which one you are doing is a
   methodological commitment, not a label. */
export type School = { name: string; blurb: string; marks: string[]; isThis: boolean };

/** An extract, the label that only names its topic, and the code that makes a
 *  claim about it. The contrast teaches faster than the rule does. */
export type CodingExample = { extract: string; weak: string; strong: string };

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

  schools?: School[];
  schoolsLede?: string;
  schoolsNote?: string;

  codingExamples?: CodingExample[];
  codingExamplesLede?: string;
  codingExamplesNote?: string;

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

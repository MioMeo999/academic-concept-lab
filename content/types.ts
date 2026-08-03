export type ProvenanceKind =
  | "source"
  | "paraphrase"
  | "editorial"
  | "analogy"
  | "reconstruction"
  | "unresolved";

export type Provenance = {
  kind: ProvenanceKind;
  label: string;
  note: string;
};

export type Source = {
  citation: string;
  contribution: string;
  doi?: string;
};

export type TheoryRecord = {
  id: string;
  title: string;
  hook: string;
  oneSentence: string;
  originsNote: string;
  origins: Array<{ year: string; author: string; title: string; contribution: string }>;
  coreProcesses: Array<{ id: "da" | "ns"; title: string; person: string; environment: string; explanation: string }>;
  fitTargets: Array<{ id: string; title: string; example: string; question: string }>;
  workAdjustment: string;
  oversimplifications: string[];
  qualifications: string[];
  minimumReading: Source[];
  fullSources: Source[];
  provenance: Provenance[];
};

export type Study = {
  id: string;
  label: string;
  design: string;
  location: string;
  sample: string;
  question: string;
  method: string;
  role: string;
  result: string;
  strength: string;
  limitation: string;
};

export type PaperRecord = {
  id: string;
  title: string;
  hook: string;
  oneSentence: string;
  citation: { authors: string; journal: string; year: number; doi: string };
  researchQuestion: string;
  theoreticalFoundation: string;
  conceptualModel: string[];
  hypotheses: string[];
  studies: Study[];
  crossStudyFindings: string[];
  robustness: string[];
  alternativeExplanations: string[];
  strengths: string[];
  limitations: string[];
  claimEvidencePairs: Array<{ claim: string; evidence: string; status: string }>;
  contributions: string[];
  implications: string[];
  openMaterials: string;
  provenance: Provenance[];
};

import type { AnyRecord, RecordKind } from "./types";
import { personEnvironmentFit, jobDemandsResources } from "./theory";
import { musicPreference } from "./music-preference";
import { workplaceDesign } from "./workplace-design";
import { personOrganisationFit } from "./person-organisation-fit";
import { ipa } from "./ipa";
import { rta } from "./rta";
import { hpaAxis } from "./hpa-axis";
import { tunedOutPaper } from "./paper";
import { affectiveEventsTheory } from "./affective-events-theory";
import { selfDeterminationTheory } from "./self-determination-theory";
import { socialExchangeTheory } from "./social-exchange-theory";
import { meyersExpectancyTheory } from "./meyers-expectancy-theory";
import { auditorySceneAnalysis } from "./auditory-scene-analysis";
import { tonalHierarchy } from "./tonal-hierarchy";
import { gestaltPrinciplesInMusic } from "./gestalt-principles-in-music";
import { generativeTheoryOfTonalMusic } from "./generative-theory-of-tonal-music";
import { narmoursImplicationRealizationTheory } from "./narmours-implication-realization-theory";
import { huronsItpraTheory } from "./hurons-itpra-theory-of-expectation";
import { statisticalLearningOfMusic } from "./statistical-learning-of-music";
import { idyom } from "./idyom";
import { predictiveProcessingInMusic } from "./predictive-processing-in-music";

/**
 * The registry. Adding a record means appending one entry here — it then
 * appears in the library, in search, in the filters, in saved, and in the
 * "elsewhere" block on every other record, with no route or template change.
 */
export const RECORDS: AnyRecord[] = [personEnvironmentFit, personOrganisationFit, jobDemandsResources, workplaceDesign, musicPreference, affectiveEventsTheory, selfDeterminationTheory, socialExchangeTheory, meyersExpectancyTheory, auditorySceneAnalysis, tonalHierarchy, gestaltPrinciplesInMusic, generativeTheoryOfTonalMusic, narmoursImplicationRealizationTheory, huronsItpraTheory, statisticalLearningOfMusic, idyom, predictiveProcessingInMusic, hpaAxis, ipa, rta, tunedOutPaper];

export const KIND: Record<RecordKind, {
  label: string; nav: string; colour: string; fill: string; stroke: string; cls: string; path: string; cta: string;
}> = {
  theory: {
    label: "Theory record", nav: "Theory", colour: "var(--teal)",
    fill: "#2E7D8F", stroke: "#22606E", cls: "teal", path: "theory", cta: "Read the theory",
  },
  study: {
    label: "Study record", nav: "Study", colour: "var(--red)",
    fill: "#E24E1B", stroke: "#B23C10", cls: "red", path: "study", cta: "Read the evidence",
  },
  method: {
    label: "Method record", nav: "Research method", colour: "var(--gold-deep)",
    fill: "#C9922A", stroke: "#9C7018", cls: "gold", path: "method", cta: "Learn the method",
  },
  mechanism: {
    label: "Mechanism record", nav: "Mechanism", colour: "var(--plum-deep)",
    fill: "#8A5470", stroke: "#6E3E58", cls: "plum", path: "mechanism", cta: "Trace the pathway",
  },
};

export function recordHref(r: AnyRecord) {
  return `/concept-lab/${KIND[r.kind].path}/${r.slug}`;
}

export function findRecord(kind: RecordKind, slug: string) {
  return RECORDS.find((r) => r.kind === kind && r.slug === slug);
}

export function otherRecords(r: AnyRecord) {
  return RECORDS.filter((x) => x.id !== r.id);
}

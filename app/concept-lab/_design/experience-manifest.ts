import type { ArtAssetId } from "./art-manifest";

/**
 * SAME HAND · DIFFERENT MIND
 *
 * Mature experiences share the hand: type system, white canvas, material
 * vocabulary, provenance language, accessibility contract, quiet scholarship
 * and editorial discipline. They do not share a mind: hero geometry, section
 * geometry, visual metaphor, interaction form, art placement, page rhythm and
 * mobile narrative sequence remain specific to the knowledge.
 */

/** candidate = designed and verified, awaiting human review; not yet a benchmark. */
export type ExperienceStatus = "benchmark" | "frozen" | "candidate";
export type ExperienceOwner =
  | { kind: "surface"; id: "home" | "about" }
  | { kind: "record"; id: "gestalt-principles-in-music" | "reflexive-thematic-analysis" | "affective-events-theory" | "job-demands-resources" | "hpa-axis" | "ipa" | "tonal-hierarchy" };

export type ExperienceManifestEntry = {
  experienceId: "home" | "about" | "gestalt" | "rta" | "aet" | "jdr" | "hpa" | "ipa" | "tonal";
  owner: ExperienceOwner;
  route: string;
  /** Historical provenance only; retired routes are not runtime destinations. */
  historicalBenchmarkRoute?: string;
  status: ExperienceStatus;
  knowledgeIdentity: string;
  pageThesis: string;
  primaryGeometry: string;
  persistentObject?: string;
  primaryVerb: string;
  primaryInteraction: string;
  whatChanges: readonly string[];
  whatStaysConstant: readonly string[];
  artIntensity: string;
  artAssetIds: readonly ArtAssetId[];
  handwritingRole: string;
  annotationRole: string;
  mobileStrategy: string;
  quietEnding: string;
  doNotFlattenInto: readonly string[];
};

export const EXPERIENCE_MANIFEST: readonly ExperienceManifestEntry[] = [
  {
    experienceId: "home",
    owner: { kind: "surface", id: "home" },
    route: "/concept-lab",
    status: "benchmark",
    knowledgeIdentity: "Site-level knowledge atlas.",
    pageThesis: "Ideas, evidence, methods and people become navigable without losing their kind or trail.",
    primaryGeometry: "An expansive orientation field that opens into disciplines, record kinds, selected entry points and provenance.",
    primaryVerb: "orient → explore",
    primaryInteraction: "Choose a discipline, record kind or starting record and enter the live atlas.",
    whatChanges: ["entry field", "record kind", "next useful place to explore"],
    whatStaysConstant: ["white canvas", "traceable record identity", "shared editorial shell"],
    artIntensity: "Immersive opening with selective territory and record-form fragments.",
    artAssetIds: ["home-atlas-head-globe", "home-organisation-systems", "home-record-forms", "home-provenance-sources"],
    handwritingRole: "Short marginal observations that make relations and curiosity visible.",
    annotationRole: "Orient the reader toward connections without turning the atlas art into a map of empirical evidence.",
    mobileStrategy: "Reflow the opening field and let the live headings and links remain primary as fragments quieten.",
    quietEnding: "Provenance and a restrained footer close the atlas after exploration.",
    doNotFlattenInto: ["a marketing hero with feature cards", "a generic academic dashboard", "a single fixed landing-page template"],
  },
  {
    experienceId: "about",
    owner: { kind: "surface", id: "about" },
    route: "/concept-lab/about",
    status: "benchmark",
    knowledgeIdentity: "Epistemic transparency: show how we know.",
    pageThesis: "Nothing loses its trail; visual explanation remains bounded by evidence and uncertainty remains designed space.",
    primaryGeometry: "Distinct editorial geometries for classification, source-to-record transformation, provenance, explanatory boundaries, uncertainty and orientation.",
    primaryVerb: "trace → distinguish",
    primaryInteraction: "Read forward through the explanation and backward through the evidence; use semantic navigation and skip links.",
    whatChanges: ["kind of knowledge object", "stage in the source-to-record trail", "provenance boundary"],
    whatStaysConstant: ["live HTML scholarship", "source responsibility", "white research-desk canvas"],
    artIntensity: "Quiet fragments, paper/source traces and restrained graphite marks; no major authored raster artwork.",
    artAssetIds: [],
    handwritingRole: "Marginal inquiry and qualification, never canonical content.",
    annotationRole: "Explain kinds of knowing and where a visual explanation stops.",
    mobileStrategy: "Recompose fragments around readable live stages rather than shrinking a desktop field.",
    quietEnding: "Unresolved questions and reader orientation leave the page open without adding interaction for its own sake.",
    doNotFlattenInto: ["developer documentation", "a provenance icon legend without explanation", "a static workflow poster"],
  },
  {
    experienceId: "gestalt",
    owner: { kind: "record", id: "gestalt-principles-in-music" },
    route: "/concept-lab/theory/gestalt-principles-in-music",
    status: "benchmark",
    knowledgeIdentity: "Music Psychology: grouping, whole/part and relational perception.",
    pageThesis: "The part changes with the whole; perceptual organisation emerges from relations rather than isolated features.",
    primaryGeometry: "A perceptual field that moves from whole/part comparison through grouping behaviour and an interactive listening experiment into quieter scholarship.",
    persistentObject: "The same musical material and relational field.",
    primaryVerb: "group → reinterpret",
    primaryInteraction: "Compare organisation, inspect grouping principles and move the same cue structure through the live experiment.",
    whatChanges: ["perceptual role", "grouping cue", "boundary or competing organisation"],
    whatStaysConstant: ["same event/material", "live principle labels", "whole-part relation"],
    artIntensity: "Territory-level listening field with restrained procedural overlays and quiet evidence.",
    artAssetIds: ["home-music-signal-wide"],
    handwritingRole: "Questions and perceptual observations at the field margins.",
    annotationRole: "Name grouping behaviour without making six principles read as a feature-card grid.",
    mobileStrategy: "Preserve the shared field while re-sequencing comparison, grouping and experiment vertically.",
    quietEnding: "History, evidence, limits, sources and provenance slow the page into scholarship.",
    doNotFlattenInto: ["six feature cards", "a universal theory-page template", "a decorative music poster"],
  },
  {
    experienceId: "rta",
    owner: { kind: "record", id: "reflexive-thematic-analysis" },
    route: "/concept-lab/method/reflexive-thematic-analysis",
    historicalBenchmarkRoute: "/reflexive-ta-target",
    status: "frozen",
    knowledgeIdentity: "Reflexive / revisable knowledge.",
    pageThesis: "ANALYSIS LEAVES TRACES. The page remembers the analysis.",
    primaryGeometry: "Positioned interpretation → theme as organising meaning → revisable worktable → researcher/reflexivity → theme construction → divergence → methodological stance and critique → proof sheet → sources/provenance.",
    persistentObject: "The material being revisited as codes, themes, interpretations and analytic decisions change.",
    primaryVerb: "revisit → interpret → revise",
    primaryInteraction: "Move through a recursive analytic journey whose marks retain earlier readings and methodological choices.",
    whatChanges: ["code and theme relations", "interpretive emphasis", "researcher position and reading"],
    whatStaysConstant: ["same data material", "reflexive responsibility", "live method language"],
    artIntensity: "Rich authored opening and worktable fields that resolve into quiet methodological scholarship.",
    artAssetIds: ["rta-interpretive-field"],
    handwritingRole: "Researcher voice, caution, revision and interpretive marginalia.",
    annotationRole: "Leave visible traces of analytic movement without turning handwriting into the method's canonical copy.",
    mobileStrategy: "Re-sequence the analytic argument while preserving recursive return, readable stages and source boundaries.",
    quietEnding: "Quality, sources, provenance and further reading provide scholarly resolution without pretending analysis is final.",
    doNotFlattenInto: ["a linear pipeline", "a generic method template", "a theme bucket or decorative worktable"],
  },
  {
    experienceId: "aet",
    owner: { kind: "record", id: "affective-events-theory" },
    route: "/concept-lab/theory/affective-events-theory",
    historicalBenchmarkRoute: "/aet-visual-rebuild",
    status: "frozen",
    knowledgeIdentity: "Temporal / event-driven knowledge.",
    pageThesis: "THE PAGE REMEMBERS WHAT HAPPENED.",
    primaryGeometry: "One person · one workday · many moments: stable environment, event, reaction, residue, later evaluation and action.",
    persistentObject: "One constructed working world that remains recognisable as attention moves through time and relation.",
    primaryVerb: "notice → locate → interpret → remember",
    primaryInteraction: "READ THE MAP → READ UNDER IT, with event, route, timing and underlying processes remaining in the same field.",
    whatChanges: ["event focus", "affective reaction", "behavioural route", "temporal reading"],
    whatStaysConstant: ["same workplace", "canonical relationship ledger", "the distinction between illustration and evidence"],
    artIntensity: "Cinematographic authored workplace fields with live labels and a quieter scholarly lower half.",
    artAssetIds: ["aet-opening-workplace", "aet-event-reaction", "aet-two-clocks", "aet-workday-strip", "aet-macrostructure-cinematography"],
    handwritingRole: "Selective event, residue and contextual notes attached to the lived field.",
    annotationRole: "Anchor work event, affective reaction, contextual dispositions, evaluation and later action without rasterising theory labels.",
    mobileStrategy: "Environment → event → reaction → affect-driven response → evaluation → deliberate action; preserve the stable map beneath the reading.",
    quietEnding: "Relationship ledger, evidence, boundaries, sources and provenance move the page from experience into scholarship.",
    doNotFlattenInto: ["a generic causal flowchart", "a universal storyboard", "a single outcome scale", "a purely decorative workplace illustration"],
  },
  {
    experienceId: "jdr",
    owner: { kind: "record", id: "job-demands-resources" },
    route: "/concept-lab/theory/job-demands-resources",
    status: "candidate",
    knowledgeIdentity: "Organisational Behaviour: functional categories and parallel processes.",
    pageThesis: "ONE JOB · TWO CURRENTS. Conditions are sorted by what they do, and each category sets off its own process.",
    primaryGeometry: "One authored working world read five ways: a field of conditions, one desk where a condition changes category, two parallel currents, a fork of one effort, and a junction where resources change the relationship — then a model that widens across dated sources.",
    persistentObject: "The same drawn workplace and the same desk.",
    primaryVerb: "sort → follow → compare",
    primaryInteraction: "Change who is doing the work, follow either current, place a demand on its route, turn the resource dial, step through the dated sources.",
    whatChanges: ["category of one condition", "focused process", "demand route", "route weight under resources", "state of the model by year"],
    whatStaysConstant: ["same workplace", "both processes present", "the demand held high", "canonical definitions and sources"],
    artIntensity: "Rich authored fields for the opening and three interactions; quiet typographic scholarship from the limits onward.",
    artAssetIds: ["jdr-working-world", "jdr-two-currents", "jdr-challenge-hindrance", "jdr-resource-interaction"],
    handwritingRole: "Short margin notes that name misreadings (not one dial; the type decides the advice).",
    annotationRole: "Keep marginalia in the artwork illustrative; all theory labels stay live HTML.",
    mobileStrategy: "Drawings become thumb-pannable strips in labelled, focusable containers; the sorting desk moves above both category columns.",
    quietEnding: "Cautions, qualifications, the dated trail, sources and provenance.",
    doNotFlattenInto: ["a burnout-versus-engagement dial", "a two-column pros and cons card", "a generic causal flowchart"],
  },
  {
    experienceId: "hpa",
    owner: { kind: "record", id: "hpa-axis" },
    route: "/concept-lab/mechanism/hpa-axis",
    status: "candidate",
    knowledgeIdentity: "Psychobiology: a regulated neuroendocrine pathway.",
    pageThesis: "A LOOP, NOT A LINE. Through what — not why.",
    primaryGeometry: "An acronym opening that steps down like the cascade; a sticky drawn descent walked step by step with its feedback loop; SAM and HPA as different timescales; one schematic day carrying the rhythms and the windows each measure looks through.",
    persistentObject: "The same cascade drawing, then the same schematic day.",
    primaryVerb: "descend → return → measure",
    primaryInteraction: "Scroll down the steps while the drawing lights each link; choose a timescale; choose a measure and see the time window it looks through.",
    whatChanges: ["lit link of the pathway", "timescale read on the day", "measurement window"],
    whatStaysConstant: ["whole pathway visible", "same day curve", "no concentration values"],
    artIntensity: "One procedural pencil field carries the descent; the rest is code-drawn schematic line work and typography.",
    artAssetIds: ["hpa-cascade-loop"],
    handwritingRole: "A few margin notes: through what — not why; carry this one.",
    annotationRole: "Keep schematic status explicit next to every drawn pathway and curve.",
    mobileStrategy: "The cascade appears once above the steps; step pips mark position; day strips pan sideways; the seven measures stack as a readable table.",
    quietEnding: "Chronic ≠ high, contradicted shortcuts, the dated trail, sources and provenance.",
    doNotFlattenInto: ["an anatomy illustration", "a three-box flowchart", "a stress score"],
  },
  {
    experienceId: "ipa",
    owner: { kind: "record", id: "ipa" },
    route: "/concept-lab/method/interpretative-phenomenological-analysis",
    status: "candidate",
    knowledgeIdentity: "Qualitative method: interpretative, idiographic practice.",
    pageThesis: "ONE PERSON AT A TIME · A READING OF A READING.",
    primaryGeometry: "Nested loops of the double hermeneutic; three commitments that can be lifted out; a line read three ways; a question sieve; a stack of case sheets that enforces idiography; a slow four-column pass over one constructed extract.",
    persistentObject: "The case — first one participant's sheet, then the stack of cases.",
    primaryVerb: "judge → read closely → distil",
    primaryInteraction: "Lift a commitment, move the researcher's loop, judge questions, step the procedure (and try the forbidden shortcut), foreground a column and find features in the extract, audit a draft.",
    whatChanges: ["distance between the two readings", "procedure stage", "foregrounded analytic column", "marked language feature"],
    whatStaysConstant: ["the participant's words", "all procedure steps readable", "constructed material labelled as not data"],
    artIntensity: "One procedural pencil field for the opening; the rest is typographic worktable and quiet method scholarship.",
    artAssetIds: ["ipa-double-hermeneutic"],
    handwritingRole: "The researcher's voice: verdicts on readings, scope of the current step.",
    annotationRole: "Mark the difference between paraphrase, interpretation and theory without claiming any reading is final.",
    mobileStrategy: "The case sheets stay pinned while the procedure list scrolls; the four columns become labelled rows with the chosen column foregrounded.",
    quietEnding: "Misuses, what IPA does not claim, core reading and provenance.",
    doNotFlattenInto: ["a generic coding pipeline", "the RTA worktable", "a list of steps without the case"],
  },
  {
    experienceId: "tonal",
    owner: { kind: "record", id: "tonal-hierarchy" },
    route: "/concept-lab/theory/tonal-hierarchy",
    status: "candidate",
    knowledgeIdentity: "Music Psychology: context-dependent tonal function.",
    pageThesis: "HOME IS A RELATION. Each pitch keeps its identity; the context decides its distance from home.",
    primaryGeometry: "One tonal field — twelve spokes and orbits of relative fit — that opens with no context, organises when given one, and is re-read as the teaching profile, as a held C4 across four contexts, beside a probe lab, key neighbourhoods and moving home.",
    persistentObject: "The same tonal field and the same twelve pitch classes.",
    primaryVerb: "listen → locate → re-read",
    primaryInteraction: "Hear context and probes, give the tones a context, rate probes on a keyboard, change the context before the same C4, step through key-space and dynamic stages.",
    whatChanges: ["distance of each tone from home", "context before the held probe", "key-space level", "balance between tonal regions"],
    whatStaysConstant: ["each pitch class's spoke", "the physical C4 probe", "no empirical profile values"],
    artIntensity: "One procedural pencil field reused throughout; live tone markers carry every label.",
    artAssetIds: ["tonal-field"],
    handwritingRole: "Short readings of role (tonic / scale degree 1; the same C4).",
    annotationRole: "Name roles and boundaries without implying liking, probability or neural geometry.",
    mobileStrategy: "The field stays square; the context choice sits above the field it changes; comparison tables and lists carry the static reading path.",
    quietEnding: "Profile ≠ process, the evidence ledger, scope boundary, lineage, cautions, the trail and provenance.",
    doNotFlattenInto: ["a bar chart of note heights", "a card per concept", "a universal Western default"],
  },
];

export function getExperience(experienceId: ExperienceManifestEntry["experienceId"]): ExperienceManifestEntry {
  const experience = EXPERIENCE_MANIFEST.find((candidate) => candidate.experienceId === experienceId);
  if (!experience) throw new Error(`Unknown experience manifest entry: ${experienceId}`);
  return experience;
}

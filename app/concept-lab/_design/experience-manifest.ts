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

export type ExperienceStatus = "benchmark" | "frozen";
export type ExperienceOwner =
  | { kind: "surface"; id: "home" | "about" }
  | { kind: "record"; id: "gestalt-principles-in-music" | "reflexive-thematic-analysis" | "affective-events-theory" };

export type ExperienceManifestEntry = {
  experienceId: "home" | "about" | "gestalt" | "rta" | "aet";
  owner: ExperienceOwner;
  route: string;
  benchmarkRoute?: string;
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
    benchmarkRoute: "/reflexive-ta-target",
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
    benchmarkRoute: "/aet-visual-rebuild",
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
];

export function getExperience(experienceId: ExperienceManifestEntry["experienceId"]): ExperienceManifestEntry {
  const experience = EXPERIENCE_MANIFEST.find((candidate) => candidate.experienceId === experienceId);
  if (!experience) throw new Error(`Unknown experience manifest entry: ${experienceId}`);
  return experience;
}

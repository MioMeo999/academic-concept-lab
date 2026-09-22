/**
 * Canonical metadata for authored Concept Lab teaching artwork.
 *
 * This describes the visual material and its possible readings. It does not
 * carry scholarly claims. A consuming component still decides whether a
 * particular use is decorative, contextual or explanatory.
 */

export const ART_ASSET_IDS = [
  "home-atlas-head-globe",
  "home-organisation-systems",
  "home-record-forms",
  "home-provenance-sources",
  "home-music-signal-wide",
  "aet-opening-workplace",
  "aet-event-reaction",
  "aet-two-clocks",
  "aet-workday-strip",
  "aet-macrostructure-cinematography",
  "rta-interpretive-field",
] as const;

export type ArtAssetId = typeof ART_ASSET_IDS[number];
export type ArtMaterialRole = "scene" | "field" | "fragment-source" | "atmosphere" | "teaching-analogy";
export type ArtAccessibilityRole = "decorative" | "explanatory" | "contextual";
export type ArtEpistemicRole = "teaching" | "editorial" | "atmosphere" | "source-reproduction" | "interface";
export type ArtEvidenceStatus = "not-empirical-evidence" | "source-reproduction";
export type ArtAssetStatus = "active" | "frozen" | "benchmark-support";

export type ArtCrop = {
  id: string;
  bounds: readonly [number, number, number, number];
  conceptualRole: string;
};

export type ArtAsset = {
  id: ArtAssetId;
  src: `/${string}`;
  owner: string;
  dimensions: { width: number; height: number };
  conceptualRole: string;
  materialRole: ArtMaterialRole;
  accessibilityRole: ArtAccessibilityRole;
  baseDescription: string;
  longDescription?: string;
  epistemicRole: ArtEpistemicRole;
  evidenceStatus: ArtEvidenceStatus;
  cropCandidates: readonly ArtCrop[];
  responsiveGuidance: string;
  provenanceNote: string;
  status: ArtAssetStatus;
};

export const ART_ASSETS: readonly ArtAsset[] = [
  {
    id: "home-atlas-head-globe",
    src: "/visual-language/home/home-atlas-head-globe.webp",
    owner: "home",
    dimensions: { width: 1672, height: 941 },
    conceptualRole: "Establishes the atlas as one connected field of ideas, people, evidence and disciplines.",
    materialRole: "scene",
    accessibilityRole: "explanatory",
    baseDescription: "A coloured-pencil field with a human head, brain, globe, music and connected disciplines.",
    epistemicRole: "teaching",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [
      { id: "home-opening-field", bounds: [0, 0, 1672, 941], conceptualRole: "The whole atlas opening." },
      { id: "home-music-territory", bounds: [165, 284, 367, 240], conceptualRole: "A music and sound fragment for the discipline field." },
    ],
    responsiveGuidance: "Keep the head and connected field legible at the opening; preserve the white margin around the source on narrow screens.",
    provenanceNote: "Authored Concept Lab teaching artwork. It is a visual orientation, not a map of empirical relationships.",
    status: "benchmark-support",
  },
  {
    id: "home-organisation-systems",
    src: "/visual-language/home/home-organisation-systems.webp",
    owner: "home",
    dimensions: { width: 1536, height: 1024 },
    conceptualRole: "Makes organisational behaviour feel social, layered and relational.",
    materialRole: "fragment-source",
    accessibilityRole: "contextual",
    baseDescription: "People work together around a table while organisational layers and relationships recede behind them.",
    epistemicRole: "teaching",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [
      { id: "home-organisation-discipline", bounds: [310, 340, 590, 330], conceptualRole: "The organisational behaviour territory fragment." },
    ],
    responsiveGuidance: "Use the crop as a quiet territory fragment; never let it compete with the discipline heading or live themes.",
    provenanceNote: "Authored teaching material for the Home atlas; it does not depict a reported workplace or study sample.",
    status: "benchmark-support",
  },
  {
    id: "home-record-forms",
    src: "/visual-language/home/home-record-forms.webp",
    owner: "home",
    dimensions: { width: 1672, height: 941 },
    conceptualRole: "Gives Theory, Mechanism, Method and Study distinct material postures.",
    materialRole: "fragment-source",
    accessibilityRole: "contextual",
    baseDescription: "A coloured-pencil sheet of four visual fragments: a lens, a pathway, a magnifying glass and research documents.",
    epistemicRole: "teaching",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [
      { id: "home-theory-form", bounds: [65, 245, 390, 315], conceptualRole: "A lens for seeing and framing." },
      { id: "home-mechanism-form", bounds: [480, 270, 365, 300], conceptualRole: "A pathway between things." },
      { id: "home-method-form", bounds: [925, 285, 290, 300], conceptualRole: "A practice for investigating material." },
      { id: "home-study-form", bounds: [1315, 210, 325, 380], conceptualRole: "Documents and charts as an argument from evidence." },
    ],
    responsiveGuidance: "Keep each form fragment subordinate to its live title and explanation; retain semantic asymmetry without collapsing the four forms into cards.",
    provenanceNote: "Authored teaching analogy for the four record kinds; it does not stand in for a source or finding.",
    status: "benchmark-support",
  },
  {
    id: "home-provenance-sources",
    src: "/visual-language/home/home-provenance-sources.webp",
    owner: "home",
    dimensions: { width: 1672, height: 941 },
    conceptualRole: "Connects provenance and scholarship to visible source material.",
    materialRole: "fragment-source",
    accessibilityRole: "contextual",
    baseDescription: "A graphite stack of books labelled publications, research, archives, data and ideas.",
    epistemicRole: "editorial",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [
      { id: "home-source-books", bounds: [15, 279, 355, 258], conceptualRole: "A small source stack beside the provenance explanation." },
    ],
    responsiveGuidance: "Keep the books beside the live provenance text and let the text remain the accessible source of the claim.",
    provenanceNote: "Editorial source metaphor; the drawn labels are not citations and must not replace live references.",
    status: "benchmark-support",
  },
  {
    id: "home-music-signal-wide",
    src: "/visual-language/home/home-music-signal-wide.webp",
    owner: "gestalt-principles-in-music",
    dimensions: { width: 800, height: 500 },
    conceptualRole: "Provides a listening field in which grouping, whole/part and competing organisation can be read.",
    materialRole: "field",
    accessibilityRole: "explanatory",
    baseDescription: "A coloured-pencil listening profile with a human face, musical notation and sound events gathering into perceptual groups.",
    epistemicRole: "teaching",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [
      { id: "gestalt-listening-field", bounds: [0, 0, 800, 500], conceptualRole: "The shared perceptual field for Gestalt grouping." },
    ],
    responsiveGuidance: "Use the full field for orientation and allow later uses to become quieter or decorative when live labels carry the grouping meaning.",
    provenanceNote: "Authored teaching artwork for Gestalt-specific visual explanation, not a recording or empirical result.",
    status: "benchmark-support",
  },
  {
    id: "aet-opening-workplace",
    src: "/aet-visual-rebuild-assets/aet-opening-workplace.png",
    owner: "affective-events-theory",
    dimensions: { width: 1774, height: 887 },
    conceptualRole: "Establishes one continuous workplace in which conditions and events coexist.",
    materialRole: "scene",
    accessibilityRole: "contextual",
    baseDescription: "A constructed workplace with people, desks, meeting areas and a stable field of working conditions.",
    epistemicRole: "teaching",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [{ id: "aet-opening-world", bounds: [0, 0, 1774, 887], conceptualRole: "The stable workplace field." }],
    responsiveGuidance: "Preserve the stable field while allowing mobile crops to foreground the currently discussed relation.",
    provenanceNote: "Authored teaching construction for AET; it is not a reported case or measured workday.",
    status: "frozen",
  },
  {
    id: "aet-event-reaction",
    src: "/aet-visual-rebuild-assets/aet-event-reaction.png",
    owner: "affective-events-theory",
    dimensions: { width: 1774, height: 887 },
    conceptualRole: "Shows one workplace event opening into different affective readings.",
    materialRole: "field",
    accessibilityRole: "explanatory",
    baseDescription: "A shared workplace event branches into two hand-drawn reaction paths.",
    epistemicRole: "teaching",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [{ id: "aet-same-event-reaction", bounds: [0, 0, 1774, 887], conceptualRole: "The same event, different reaction field." }],
    responsiveGuidance: "Keep the shared event visible when a reaction route is focused; focus must not imply that the other reading disappeared.",
    provenanceNote: "Authored AET teaching artwork; it illustrates a conceptual contrast rather than reporting reaction data.",
    status: "frozen",
  },
  {
    id: "aet-two-clocks",
    src: "/aet-visual-rebuild-assets/aet-two-clocks.png",
    owner: "affective-events-theory",
    dimensions: { width: 1536, height: 1024 },
    conceptualRole: "Keeps affect-driven and judgement-driven routes parallel rather than placing them on one scale.",
    materialRole: "field",
    accessibilityRole: "explanatory",
    baseDescription: "Two coloured-pencil currents move around a shared centre at different temporal qualities.",
    epistemicRole: "teaching",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [{ id: "aet-parallel-currents", bounds: [0, 0, 1536, 1024], conceptualRole: "Parallel affective and judgement-driven routes." }],
    responsiveGuidance: "Retain a readable residual trace of the unfocused current at every width.",
    provenanceNote: "Authored AET teaching artwork; colour and route shape do not encode measured effect size.",
    status: "frozen",
  },
  {
    id: "aet-workday-strip",
    src: "/aet-visual-rebuild-assets/aet-workday-strip.png",
    owner: "affective-events-theory",
    dimensions: { width: 2164, height: 727 },
    conceptualRole: "Makes within-person time and residue visible across one constructed workday.",
    materialRole: "field",
    accessibilityRole: "explanatory",
    baseDescription: "A temporal strip of workplace fragments from coffee and messages to meetings, papers and a late working desk.",
    epistemicRole: "teaching",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [{ id: "aet-workday-sequence", bounds: [0, 0, 2164, 727], conceptualRole: "One workday remembered through moments." }],
    responsiveGuidance: "Mobile may re-sequence moments vertically while preserving the order and the persistent workday reference.",
    provenanceNote: "Authored AET teaching artwork; residue is a visual prompt, not a mood score or longitudinal measure.",
    status: "frozen",
  },
  {
    id: "aet-macrostructure-cinematography",
    src: "/aet-visual-rebuild-assets/aet-macrostructure-illustrated-workday-cinematography.png",
    owner: "affective-events-theory",
    dimensions: { width: 1942, height: 809 },
    conceptualRole: "Carries the macrostructure from environment through event, reaction, response, evaluation and later action.",
    materialRole: "scene",
    accessibilityRole: "explanatory",
    baseDescription: "A continuous coloured-pencil and graphite workplace drawing showing one person moving through a stable context, event, reaction, response, evaluation and later action.",
    epistemicRole: "teaching",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [
      { id: "aet-macrostructure-field", bounds: [0, 0, 1942, 809], conceptualRole: "The complete AET macrostructure field." },
    ],
    responsiveGuidance: "Desktop may show the continuous field; mobile uses the approved cinematic vertical crop sequence without replacing the source artwork.",
    provenanceNote: "Approved authored AET teaching artwork; labels and theory relationships remain live HTML.",
    status: "frozen",
  },
  {
    id: "rta-interpretive-field",
    src: "/reflexive-ta-target-assets/rta-interpretive-field.png",
    owner: "reflexive-thematic-analysis",
    dimensions: { width: 1774, height: 887 },
    conceptualRole: "Makes the researcher, data, position and context one interpretive field.",
    materialRole: "field",
    accessibilityRole: "contextual",
    baseDescription: "A researcher inside a coloured-pencil interpretive field where data, position and context shape the reading.",
    epistemicRole: "teaching",
    evidenceStatus: "not-empirical-evidence",
    cropCandidates: [{ id: "rta-interpretive-opening", bounds: [0, 0, 1774, 887], conceptualRole: "The opening interpretive field." }],
    responsiveGuidance: "Keep the researcher and surrounding field legible; the live method copy remains the canonical account on narrow screens.",
    provenanceNote: "Authored RTA teaching artwork; it does not reproduce participant data or establish a finding.",
    status: "frozen",
  },
] as const;

export function getArtAsset(id: ArtAssetId): ArtAsset {
  const asset = ART_ASSETS.find((candidate) => candidate.id === id);
  if (!asset) throw new Error(`Unknown art asset: ${id}`);
  return asset;
}

/** Resolve a documented crop without creating a second editable geometry source. */
export function getArtCrop(assetId: ArtAssetId, cropId: string): ArtCrop["bounds"] {
  const asset = getArtAsset(assetId);
  const crop = asset.cropCandidates.find((candidate) => candidate.id === cropId);
  if (!crop) throw new Error(`Unknown art crop: ${assetId}/${cropId}`);
  return crop.bounds;
}

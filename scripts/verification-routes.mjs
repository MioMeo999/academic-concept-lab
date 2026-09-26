/**
 * The browser harness deliberately keeps a small, named route set rather than
 * guessing visual coverage from implementation details.  The representative
 * set is a stable smoke surface; full-site adds every currently registered
 * record route without turning route discovery into a visual assumption.
 */

export const VIEWPORTS = [
  { id: "desktop-1440", label: "1440", width: 1440, height: 900, tier: "desktop" },
  { id: "desktop-1024", label: "1024", width: 1024, height: 800, tier: "desktop" },
  { id: "tablet-768", label: "768", width: 768, height: 1024, tier: "desktop" },
  { id: "mobile-390", label: "390", width: 390, height: 844, tier: "mobile" },
  { id: "mobile-360", label: "360", width: 360, height: 800, tier: "mobile" },
];

const probe = (id, kind, selector, accessibleTarget, expectedChange, options = {}) => ({
  id,
  kind,
  selector,
  accessibleTarget,
  expectedChange,
  keyboardMethod: options.keyboardMethod ?? "Enter",
  stableSelector: options.stableSelector,
  expectedHrefPrefix: options.expectedHrefPrefix,
  reducedMotion: options.reducedMotion ?? false,
  optional: options.optional ?? false,
});

export const CONCEPTUAL_PROBES = {
  aetMap: probe(
    "aet-map-toggle",
    "toggle",
    '.aev-map-toggle button[aria-pressed]:nth-child(2)',
    "Read under it",
    "aria-pressed changes to true and the same macrostructure remains visible",
    { stableSelector: ".aev-interactive-macro-map", reducedMotion: true },
  ),
  gestaltListening: probe(
    "gestalt-grouping-mode",
    "toggle",
    '.studio-switcher[role="group"] button:nth-child(2)',
    "Cue conflict comparison",
    "aria-pressed changes to true and the grouping comparison mode changes",
    { stableSelector: ".studio-visual", reducedMotion: true },
  ),
  rtaPhase: probe(
    "rta-phase-tab",
    "toggle",
    '#rta-phases [role="tab"]:nth-child(2)',
    "second recursive analysis phase",
    "aria-selected changes to true and the analysis panel changes",
    { stableSelector: "#rta-analysis-panel" },
  ),
  tunedOutAttribution: probe(
    "tuned-out-attribution-reading",
    "toggle",
    '#model [data-attribution-control="leisure"]',
    "Leisure attribution",
    "aria-pressed changes while both the shared event and alternative reading remain present",
    { stableSelector: "#model [data-model-reading]", reducedMotion: true },
  ),
  tunedOutStudy: probe(
    "tuned-out-study-selection",
    "toggle",
    '#studies [data-study-control="1"]',
    "Study 2",
    "the selected study and its evidence sheet change without removing the study sequence",
    { stableSelector: "#studies [data-study-panel]", reducedMotion: true },
  ),
  tunedOutClaim: probe(
    "tuned-out-claim-evidence",
    "toggle",
    '#claims [data-claim-control="1"]',
    "second claim and its evidence status",
    "the evidence register changes to the selected claim and documented status",
    { stableSelector: "#claims [data-claim-panel]", reducedMotion: true },
  ),
  jdrSortByFunction: probe(
    "jdr-sort-by-function",
    "toggle",
    '#sorting [role="group"] button:nth-child(2)',
    "An expert",
    "aria-pressed changes and close supervision moves to the demand side while the same desk crop stays in view",
    { stableSelector: "#sorting figure", reducedMotion: true },
  ),
  hpaRhythm: probe(
    "hpa-rhythm-timescale",
    "toggle",
    '#rhythm [role="group"] button:nth-child(3)',
    "Ultradian pulses",
    "aria-pressed changes and the same schematic day is re-read as pulses without removing the daily curve",
    { stableSelector: "#rhythm svg", reducedMotion: true },
  ),
  ipaCommitment: probe(
    "ipa-lift-commitment",
    "toggle",
    '#what-it-meant [role="group"] button:nth-child(3)',
    "Idiography",
    "aria-pressed changes and the lifted commitment stays drawn as a residual trace beside the other two",
    { stableSelector: "#what-it-meant figure svg", reducedMotion: true },
  ),
  tonalSameNote: probe(
    "tonal-same-note-context",
    "toggle",
    '#same-note [role="group"] button:nth-child(4)',
    "D major context",
    "aria-pressed changes and the held C4 moves to a new distance in the same tonal field",
    { stableSelector: "#same-note [role=\"img\"]", reducedMotion: true },
  ),
  neighbourhoodRelation: probe(
    "knowledge-neighbourhood-relation",
    "link",
    ".knowledge-neighbourhood-list .knowledge-neighbour-record a",
    "first related record link",
    "link is keyboard reachable and resolves to an intended record",
    { expectedHrefPrefix: "/concept-lab/", optional: true },
  ),
  neighbourhoodFallback: probe(
    "knowledge-neighbourhood-fallback",
    "link",
    ".knowledge-neighbourhood-fallback a",
    "broader field fallback link",
    "fallback link is keyboard reachable and resolves to Library",
    { expectedHrefPrefix: "/concept-lab/library", optional: true },
  ),
  save: probe(
    "save-restore",
    "save",
    "button.savebtn",
    "Save for later",
    "aria-pressed changes and remains true after reload",
  ),
};

const surface = (id, route, reason, interaction = "none", probes = []) => ({ id, route, reason, interaction, probes });
const record = (id, kind, slug, reason, interaction = "none", probes = []) => ({
  id,
  route: `/concept-lab/${kind}/${slug}`,
  reason,
  interaction,
  probes,
});

export const REPRESENTATIVE_ROUTES = [
  surface("home", "/concept-lab", "Site-level atlas orientation and entry points."),
  surface("library", "/concept-lab/library", "Library discovery surface; neighbourhood probes run on a representative record page.", "none"),
  surface("saved", "/concept-lab/saved", "Personal working pile with empty and saved states."),
  surface("about", "/concept-lab/about", "Epistemic transparency, provenance and skip-link behaviour."),
  record("jdr", "theory", "job-demands-resources", "Redesigned theory: one authored working world read as categories, currents, demand types and interactions.", "jdr", [CONCEPTUAL_PROBES.jdrSortByFunction, CONCEPTUAL_PROBES.save]),
  record("pe-fit", "theory", "person-environment-fit", "Generic theory route, correspondence interaction and save/restore.", "save", [CONCEPTUAL_PROBES.save, CONCEPTUAL_PROBES.neighbourhoodRelation, CONCEPTUAL_PROBES.neighbourhoodFallback]),
  record("aet", "theory", "affective-events-theory", "Frozen temporal/event-driven benchmark.", "aet", [CONCEPTUAL_PROBES.aetMap]),
  record("gestalt", "theory", "gestalt-principles-in-music", "Music benchmark with perceptual/listening interaction.", "gestalt", [CONCEPTUAL_PROBES.gestaltListening]),
  record("specialized-music", "theory", "tonal-hierarchy", "Redesigned music theory: one tonal field re-read across contexts, with probe-tone lab and key space.", "tonal", [CONCEPTUAL_PROBES.tonalSameNote, CONCEPTUAL_PROBES.save]),
  record("rta", "method", "reflexive-thematic-analysis", "Frozen reflexive method benchmark.", "rta", [CONCEPTUAL_PROBES.rtaPhase]),
  record("ipa", "method", "interpretative-phenomenological-analysis", "Redesigned method practice: double hermeneutic, case-by-case procedure and the four-column close pass.", "ipa", [CONCEPTUAL_PROBES.ipaCommitment, CONCEPTUAL_PROBES.save]),
  record("hpa-axis", "mechanism", "hpa-axis", "Redesigned mechanism: sticky cascade descent, feedback loop, rhythms and windows of measurement.", "hpa", [CONCEPTUAL_PROBES.hpaRhythm, CONCEPTUAL_PROBES.save]),
  record("tuned-out", "study", "tuned-out-or-dialed-in", "Study route with interactive observer readings, three-study evidence dossier, and provenance.", "tuned-out-study", [CONCEPTUAL_PROBES.tunedOutAttribution, CONCEPTUAL_PROBES.tunedOutStudy, CONCEPTUAL_PROBES.tunedOutClaim, CONCEPTUAL_PROBES.save]),
];

export const FULL_SITE_ROUTES = [
  ...REPRESENTATIVE_ROUTES,
  record("person-organisation-fit", "theory", "person-organisation-fit", "Registered theory route."),
  record("workplace-design", "theory", "workplace-design", "Registered theory route."),
  record("music-preference", "theory", "music-preference", "Registered theory route."),
  record("self-determination", "theory", "self-determination-theory", "Registered theory route."),
  record("social-exchange", "theory", "social-exchange-theory", "Registered theory route."),
  record("meyer-expectancy", "theory", "meyers-expectancy-theory", "Registered theory route."),
  record("auditory-scene-analysis", "theory", "auditory-scene-analysis", "Registered music theory route."),
  record("generative-tonal", "theory", "generative-theory-of-tonal-music", "Registered music theory route."),
  record("narmour", "theory", "narmours-implication-realization-theory", "Registered music theory route."),
  record("huron", "theory", "hurons-itpra-theory-of-expectation", "Registered music theory route."),
  record("statistical-learning", "theory", "statistical-learning-of-music", "Registered music theory route."),
  record("idyom", "theory", "idyom-information-dynamics-of-music", "Registered music theory route."),
  record("predictive-processing", "theory", "predictive-processing-in-music", "Registered music theory route."),
];

export const REQUIRED_REPRESENTATIVE_IDS = [
  "home",
  "library",
  "saved",
  "about",
  "jdr",
  "pe-fit",
  "aet",
  "gestalt",
  "specialized-music",
  "rta",
  "ipa",
  "hpa-axis",
  "tuned-out",
];

export function routesForMode(mode) {
  if (mode === "representative") return REPRESENTATIVE_ROUTES;
  if (mode === "full-site") return FULL_SITE_ROUTES;
  throw new Error(`Unknown verification mode: ${mode}`);
}

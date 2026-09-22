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

const surface = (id, route, reason, interaction = "none") => ({ id, route, reason, interaction });
const record = (id, kind, slug, reason, interaction = "none") => ({
  id,
  route: `/concept-lab/${kind}/${slug}`,
  reason,
  interaction,
});

export const REPRESENTATIVE_ROUTES = [
  surface("home", "/concept-lab", "Site-level atlas orientation and entry points."),
  surface("library", "/concept-lab/library", "Knowledge-neighbourhood discovery and relation fallback.", "neighbourhood"),
  surface("saved", "/concept-lab/saved", "Personal working pile with empty and saved states."),
  surface("about", "/concept-lab/about", "Epistemic transparency, provenance and skip-link behaviour."),
  record("pe-fit", "theory", "person-environment-fit", "Generic theory route, correspondence interaction and save/restore.", "save"),
  record("aet", "theory", "affective-events-theory", "Frozen temporal/event-driven benchmark.", "aet"),
  record("gestalt", "theory", "gestalt-principles-in-music", "Music benchmark with perceptual/listening interaction.", "gestalt"),
  record("specialized-music", "theory", "tonal-hierarchy", "Specialized music theory with interactive probe examples.", "record"),
  record("rta", "method", "reflexive-thematic-analysis", "Frozen reflexive method benchmark.", "rta"),
  record("ipa", "method", "interpretative-phenomenological-analysis", "Generic method route and quiet scholarship.", "record"),
  record("hpa-axis", "mechanism", "hpa-axis", "Mechanism route with structured explanatory sections.", "record"),
  record("tuned-out", "study", "tuned-out-or-dialed-in", "Study route with evidence and provenance.", "record"),
];

export const FULL_SITE_ROUTES = [
  ...REPRESENTATIVE_ROUTES,
  record("person-organisation-fit", "theory", "person-organisation-fit", "Registered theory route."),
  record("job-demands-resources", "theory", "job-demands-resources", "Registered theory route."),
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

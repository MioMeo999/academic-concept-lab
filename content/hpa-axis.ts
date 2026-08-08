import type { TheoryRecord } from "./types";

/* ---------------------------------------------------------------------------
   The first mechanism record. It exists as its own kind because the record's
   own first claim is that the HPA axis is not a psychological theory — filing
   it under "Theory record" would contradict the page.

   The diagram is a schematic, not anatomy. See Cascade.tsx for why.
   ------------------------------------------------------------------------- */
export const hpaAxis: TheoryRecord = {
  id: "hpa-axis",
  kind: "mechanism",
  slug: "hpa-axis",
  title: "The HPA Axis",
  hook: "Not why stress affects the body — through what. This is the pathway the psychology has to travel down.",
  oneSentence:
    "The hypothalamic–pituitary–adrenal axis is a neuroendocrine regulatory system: a hormonal cascade, under brain control and its own negative feedback, through which appraised demand becomes a physiological response.",
  discipline: "psychobiology",
  statusChip: "A system, not a theory",
  topics: ["HPA axis", "cortisol", "stress physiology", "allostatic load", "cortisol awakening response", "social-evaluative threat", "Trier Social Stress Test", "glucocorticoids"],
  facts: ["CRH → ACTH → cortisol", "rhythmic even at rest", "chronic ≠ high cortisol", "1981 → 2019"],

  order: [
    "conceptualStatus", "relatedTo", "cascade", "disambiguation", "fitTargets",
    "interactions", "categories", "expansions", "measures",
    "trail", "oversimplifications", "qualifications", "sources", "provenance",
  ],

  headings: {
    conceptualStatus: { toc: "What this is", title: "A system, not a theory" },
    relatedTo: { toc: "Where it sits", title: "Where a mechanism sits among theories" },
    cascade: { toc: "The cascade", title: "Three glands and a messenger each" },
    disambiguation: { toc: "Not fight-or-flight", title: "This is not the fight-or-flight system" },
    fitTargets: { toc: "The brain decides", title: "The brain decides before the glands move" },
    interactions: { toc: "What cortisol does", title: "What cortisol actually does" },
    categories: { toc: "Switching off", title: "How it switches itself off" },
    expansions: { toc: "Its own rhythm", title: "It has a rhythm even when nothing is wrong" },
    measures: { toc: "Measuring it", title: "Measuring it, and what each measure can say" },
  },

  conceptualStatus: {
    flag: "The HPA axis is not a psychological theory.",
    body: "It is a <b>neuroendocrine regulatory system</b> — a piece of physiology. Theories of stress, allostasis and social-evaluative threat explain <i>when and why</i> it becomes activated; the HPA axis describes the biological pathway those processes run down. Reading it as a theory of stress is the first and most consequential mistake available here, which is why this record is filed as a mechanism rather than a theory.",
    questions: [
      "What the pathway <b>is</b> — which structures, which messengers, in what order.",
      "What the brain contributes <b>before</b> any hormone moves.",
      "What cortisol actually <b>does</b>, which is not one thing.",
      "How activity is <b>measured</b>, and what each measure can honestly support.",
    ],
  },

  relatedToLede:
    "A mechanism earns its place by being the route something else travels. This one is a strong candidate for a pathway another record on this site describes only in psychological terms.",
  relatedTo: [
    {
      recordId: "job-demands-resources",
      relation: "is a candidate pathway for",
      body: "Job Demands–Resources describes a <b>health-impairment process</b>: sustained demands, incomplete recovery, exhaustion, and eventually health complaints. That account is entirely psychological — it names no biology. The HPA axis is one of the systems through which such a route could physically operate. <b>Treat this as our editorial connection</b>: neither record's cited sources make the link, and demonstrating it in a given setting would take evidence this page does not have.",
    },
  ],

  ideaLede: "",
  originsNote: "",

  cascadeLede:
    "The short version is three letters, three glands and three arrows — and the short version is where most misunderstandings begin, because it hides both the brain at the top and the loop up the side.",
  cascade: {
    nodes: [
      { label: "Hypothalamus", sub: "CRH neurons in the paraventricular nucleus" },
      { label: "Anterior pituitary", sub: "releases into the bloodstream" },
      { label: "Adrenal cortex", sub: "glucocorticoid synthesis" },
      { label: "Body and brain", sub: "metabolism · immunity · cardiovascular · cognition" },
    ],
    messengers: ["CRH", "ACTH", "cortisol"],
    feedback: "negative feedback",
    caption:
      "Schematic, not anatomy. The vertical order and the direction of travel are real; organ shape, position and scale are not depicted and should not be inferred. The dashed line is negative feedback — cortisol acting back on the pituitary, hypothalamus and wider brain circuitry to regulate further activity, which is what makes this a regulated system rather than a one-way chain.",
  },

  disambiguation: {
    flag: "The HPA axis is often described as “the fight-or-flight system”. It is not. Fight-or-flight is the <b>sympathetic–adrenomedullary (SAM)</b> route, which is faster, chemically different, and does a different job. The two interact constantly, and conflating them makes the timing of any stress finding impossible to reason about.",
    covered: {
      title: "This page: the HPA axis",
      blurb: "An endocrine cascade. Slower, longer-acting, concerned with energy regulation, immune modulation and sustained adaptation.",
      items: ["hypothalamus → pituitary → adrenal cortex", "cortisol", "minutes and longer", "energy and immune regulation"],
    },
    notCovered: {
      title: "Not this page: the SAM system",
      blurb: "A neural route. Near-instant, mobilising the cardiovascular system and arousal — the thing people actually mean by fight-or-flight.",
      items: ["sympathetic nerves → adrenal medulla", "adrenaline and noradrenaline", "seconds", "immediate arousal"],
      sources: [],
    },
    note:
      "The honest formulation is that a stress response is a <b>coordinated central, autonomic, endocrine and immune event</b>, of which the HPA axis is one component operating on its own timescale.",
  },

  fitTargets: [
    { id: "pvn", icon: "i-star", colour: "var(--plum-deep)", title: "Hypothalamus / PVN", question: "The endocrine output point that starts the cascade.", example: "CRH-producing neurons in the paraventricular nucleus." },
    { id: "amyg", icon: "i-warn", colour: "var(--red)", title: "Amygdala", question: "Threat and salience processing.", example: "Can facilitate stress responding." },
    { id: "hipp", icon: "i-book", colour: "var(--teal)", title: "Hippocampus", question: "Context, memory, and aspects of glucocorticoid feedback.", example: "Why the same event read differently on a different day lands differently." },
    { id: "pfc", icon: "i-q", colour: "var(--teal)", title: "Prefrontal cortex", question: "Appraisal and higher-order regulation.", example: "Where controllability and predictability get weighed." },
    { id: "bstem", icon: "i-arrowb", colour: "var(--pen-3)", title: "Brainstem", question: "Integrates physiological and homeostatic stress signals.", example: "The body's own state feeding into the response." },
  ],

  interactionsLede:
    "Sapolsky, Romero and Munck's review is the correction to “cortisol causes the stress response”. Glucocorticoids do at least four different jobs, and which one you see depends on timing and on which physiological system you are looking at.",
  interactions: [
    { kicker: "permissive", title: "Making other responses possible", body: "Baseline glucocorticoid presence enables other stress responses to work at all. The hormone is doing something before any stressor arrives." },
    { kicker: "stimulatory", title: "Amplifying an ongoing response", body: "During a response, glucocorticoids can increase the activity of other systems rather than damp them." },
    { kicker: "suppressive", title: "Containing the response", body: "They also restrain responses — including immune and inflammatory ones — which is where the “stress suppresses immunity” shorthand comes from, and why it is only part of the picture." },
    { kicker: "preparative", title: "Readying the next one", body: "Some actions shape how the organism will respond to a <i>future</i> challenge rather than the present one." },
  ],

  categoriesLede:
    "Cortisol does not simply rise. It binds to receptors throughout the body and brain and contributes to regulating its own further release.",
  categoriesNote:
    "Feedback is not one on/off switch. It is better understood as a distributed <b>network</b> involving hypothalamic and limbic mechanisms — which is why feedback can be altered in some conditions without cortisol output being uniformly high or low.",
  categories: [
    {
      title: "MR — mineralocorticoid receptors",
      icon: "i-check", colour: "var(--teal)",
      definition: "Higher affinity for cortisol, and so substantially occupied at basal levels. Associated with maintaining the system's ordinary tone rather than with terminating a response.",
      examples: ["high affinity", "occupied at baseline", "tonic regulation"],
    },
    {
      title: "GR — glucocorticoid receptors",
      icon: "i-x", colour: "var(--red)",
      definition: "Lower affinity, so meaningfully occupied when cortisol is elevated. GR-mediated negative feedback is particularly important during and after a stress response.",
      examples: ["lower affinity", "engaged when elevated", "shutting the response down"],
    },
  ],

  expansionsLede:
    "This is the fact most often missing from an introductory account: cortisol is not released only when something goes wrong. Healthy HPA activity is <span class=\"hl-t\">rhythmic at three timescales at once</span>, and a measurement that ignores them is close to meaningless.",
  expansions: [
    { title: "Circadian", icon: "i-globe", colour: "var(--plum-deep)", body: "Roughly a 24-hour pattern: generally higher around the start of the active period, declining across the day. A single sample without a time of day attached cannot be interpreted." },
    { title: "The awakening response (CAR)", icon: "i-star", colour: "var(--red)", body: "After waking, cortisol normally rises substantially over roughly the first 30–45 minutes. Measuring it depends on precise timing — inaccuracy about the moment of waking compromises the measure." },
    { title: "Ultradian", icon: "i-arrowb", colour: "var(--teal)", body: "Cortisol is released in pulses rather than as a smooth curve. This has consequences: receptors and gene transcription respond differently to pulsatile than to continuous exposure." },
  ],

  measuresLede:
    "Each of these answers a different question. Choosing one is choosing which question you are asking, and the commonest error in reading this literature is treating any of them as “how stressed the person is”.",
  measuresNote:
    "Hellhammer and colleagues' warning is the one to carry: <b>salivary cortisol is a biomarker related to HPA functioning — not a direct measurement of the HPA axis.</b> A great many regulatory processes sit between hypothalamic activity, ACTH, and the cortisol that eventually appears in saliva.",
  measures: [
    { method: "Salivary cortisol", tells: "Free cortisol at one moment.", caution: "Extremely timing-sensitive; meaningless without the clock." },
    { method: "Blood cortisol", tells: "Circulating cortisol.", caution: "The venepuncture is itself a stressor." },
    { method: "Urinary cortisol", tells: "Secretion integrated across a period.", caution: "Little temporal resolution." },
    { method: "Hair cortisol", tells: "Accumulated exposure over months.", caution: "Answers a months-scale question only." },
    { method: "Cortisol awakening response", tells: "The rise across the first 30–45 minutes after waking.", caution: "Requires exact sampling against actual waking time." },
    { method: "Diurnal slope", tells: "The shape of the decline across the day.", caution: "Requires repeated samples at known times." },
    { method: "Reactivity", tells: "Change from before to after a challenge.", caution: "Needs a clean baseline and disciplined timing." },
  ],

  trailLede:
    "Four decades from a peptide isolated in 1981 to an integrated account of the human stress response — and one meta-analysis in the middle that connected the physiology to psychology.",
  origins: [
    { year: "1981", author: "Vale, Spiess, Rivier &amp; Rivier", work: "Characterization of a 41-residue ovine hypothalamic peptide · Science", contribution: "Isolation and characterisation of corticotropin-releasing factor — the biochemical link between hypothalamus and pituitary that made the cascade concrete." },
    { year: "1993", author: "Kirschbaum, Pirke &amp; Hellhammer", work: "The “Trier Social Stress Test” · Neuropsychobiology", contribution: "The paradigm: a speech and mental arithmetic before evaluators, built to create the social evaluation and uncontrollability that reliably elicit an HPA response." },
    { year: "1998", author: "Bruce S. McEwen", work: "Protective and damaging effects of stress mediators · New England Journal of Medicine", contribution: "Allostasis and allostatic load — the systems that protect during short-term challenge become costly when activated too often or regulated poorly." },
    { year: "2000", author: "Sapolsky, Romero &amp; Munck", work: "How do glucocorticoids influence stress responses? · Endocrine Reviews", contribution: "Permissive, suppressive, stimulatory and preparative actions. The correction to any account in which cortisol does one thing." },
    { year: "2004", author: "Dickerson &amp; Kemeny", work: "Acute stressors and cortisol responses · Psychological Bulletin", contribution: "A synthesis of 208 laboratory studies: social-evaluative threat and uncontrollability are the characteristics that most reliably produce pronounced responses and slower recovery." },
    { year: "2007", author: "Miller, Chen &amp; Zhou", work: "If it goes up, must it come down? · Psychological Bulletin", contribution: "Chronic stress does not simply mean high cortisol. Direction depends on time since onset, stressor characteristics, controllability, threat and subjective distress." },
    { year: "2009", author: "Ulrich-Lai &amp; Herman", work: "Neural regulation of endocrine and autonomic stress responses · Nature Reviews Neuroscience", contribution: "The circuitry: stress-response systems overlap with memory and reward, so prior experience and anticipated outcomes shape the physiological response." },
    { year: "2019", author: "Russell &amp; Lightman", work: "The human stress response · Nature Reviews Endocrinology", contribution: "The best single modern overview — acute and chronic stress, circadian and ultradian rhythms, and cortisol physiology in one account." },
  ],

  oversimplificationsLede:
    "Five statements that sound like summaries of this literature and are contradicted by it. The first two are almost universal outside the field.",
  oversimplifications: [
    "<b>Cortisol is not “the stress hormone” in the sense of being bad.</b> The HPA axis is an adaptive system; glucocorticoids redistribute resources to meet actual or anticipated demand, and activation is fundamental to successful adaptation.",
    "<b>Chronic stress does not simply mean high cortisol.</b> Depending on time since onset and the nature of the stressor, chronic conditions have been associated with raised activity, lowered activity, or altered rhythms — which is why the field says <i>dysregulation</i> rather than <i>high</i>.",
    "<b>A cortisol value is not a stress score.</b> Reactivity, recovery, awakening response, diurnal slope and long-term output answer different questions; none is a number for how stressed someone is.",
    "<b>The HPA axis is not fight-or-flight.</b> That is the sympathetic–adrenomedullary route, running on seconds rather than minutes with different mediators entirely.",
    "<b>Not every unpleasant task activates it.</b> Social-evaluative threat and uncontrollability are what reliably do — difficulty and discomfort alone often do not.",
  ],
  qualifications: [
    "Measurement sits several steps downstream of the thing of interest. Salivary cortisol indexes HPA functioning; it does not measure the axis, and inference from one to the other has to be argued rather than assumed.",
    "Much of the mechanistic detail comes from animal work, and how completely it transfers to humans is not uniform across the components described here.",
    "Because activity is rhythmic at three timescales, a study's sampling schedule substantially determines what it can find. Comparisons between studies using different schedules are weaker than they look.",
    "The relationship between HPA measures and psychological constructs is indirect in both directions: appraisal shapes the response, and the response is read back through instruments with their own limits.",
  ],

  minimumReadingLabel: "The two to start with today",
  minimumReading: [
    { citation: "Russell, G., &amp; Lightman, S. (2019). The human stress response. <i>Nature Reviews Endocrinology, 15</i>, 525–534.", contribution: "The whole map: acute and chronic stress, circadian and ultradian rhythms, cortisol physiology." },
    { citation: "Dickerson, S. S., &amp; Kemeny, M. E. (2004). Acute stressors and cortisol responses: A theoretical integration and synthesis of laboratory research. <i>Psychological Bulletin, 130</i>(3), 355–391.", contribution: "How psychological experience connects to HPA response — social-evaluative threat and uncontrollability.", doi: "10.1037/0033-2909.130.3.355" },
    { citation: "Sapolsky, R. M., Romero, L. M., &amp; Munck, A. U. (2000). How do glucocorticoids influence stress responses? <i>Endocrine Reviews, 21</i>(1), 55–89.", contribution: "What cortisol actually does — permissive, suppressive, stimulatory, preparative." },
    { citation: "Miller, G. E., Chen, E., &amp; Zhou, E. S. (2007). If it goes up, must it come down? Chronic stress and the hypothalamic–pituitary–adrenocortical axis in humans. <i>Psychological Bulletin, 133</i>(1), 25–45.", contribution: "Why chronic stress is not simply high cortisol.", doi: "10.1037/0033-2909.133.1.25" },
  ],
  fullSources: [
    { citation: "Vale, W., Spiess, J., Rivier, C., &amp; Rivier, J. (1981). Characterization of a 41-residue ovine hypothalamic peptide that stimulates secretion of corticotropin and β-endorphin. <i>Science, 213</i>, 1394–1397.", contribution: "Isolation of CRF/CRH." },
    { citation: "Kirschbaum, C., Pirke, K. M., &amp; Hellhammer, D. H. (1993). The “Trier Social Stress Test” — A tool for investigating psychobiological stress responses in a laboratory setting. <i>Neuropsychobiology, 28</i>, 76–81.", contribution: "The standard laboratory paradigm.", doi: "10.1159/000119004" },
    { citation: "McEwen, B. S. (1998). Protective and damaging effects of stress mediators. <i>New England Journal of Medicine, 338</i>, 171–179.", contribution: "Allostasis and allostatic load.", doi: "10.1056/NEJM199801153380307" },
    { citation: "Sapolsky, R. M., Romero, L. M., &amp; Munck, A. U. (2000). How do glucocorticoids influence stress responses? Integrating permissive, suppressive, stimulatory, and preparative actions. <i>Endocrine Reviews, 21</i>(1), 55–89.", contribution: "The four classes of glucocorticoid action." },
    { citation: "Dickerson, S. S., &amp; Kemeny, M. E. (2004). Acute stressors and cortisol responses. <i>Psychological Bulletin, 130</i>(3), 355–391.", contribution: "Meta-analysis of 208 laboratory studies.", doi: "10.1037/0033-2909.130.3.355" },
    { citation: "Miller, G. E., Chen, E., &amp; Zhou, E. S. (2007). If it goes up, must it come down? <i>Psychological Bulletin, 133</i>(1), 25–45.", contribution: "Chronic stress and HPA dysregulation.", doi: "10.1037/0033-2909.133.1.25" },
    { citation: "Hellhammer, D. H., Wüst, S., &amp; Kudielka, B. M. (2009). Salivary cortisol as a biomarker in stress research. <i>Psychoneuroendocrinology, 34</i>, 163–171.", contribution: "What salivary cortisol can and cannot indicate.", doi: "10.1016/j.psyneuen.2008.10.026" },
    { citation: "Ulrich-Lai, Y. M., &amp; Herman, J. P. (2009). Neural regulation of endocrine and autonomic stress responses. <i>Nature Reviews Neuroscience, 10</i>, 397–409.", contribution: "The brain circuitry regulating the axis.", doi: "10.1038/nrn2647" },
    { citation: "Herman, J. P., McKlveen, J. M., Solomon, M. B., Carvalho-Netto, E., &amp; Myers, B. (2012). Neural regulation of the stress response: Glucocorticoid feedback mechanisms. <i>Brazilian Journal of Medical and Biological Research, 45</i>, 292–298.", contribution: "Feedback as a distributed network." },
    { citation: "Stalder, T., &amp; Kirschbaum, C. (2012). Analysis of cortisol in hair — state of the art and future directions. <i>Brain, Behavior, and Immunity, 26</i>, 1019–1029.", contribution: "Hair cortisol for longer-term exposure." },
    { citation: "Stalder, T., et al. (2016). Assessment of the cortisol awakening response: Expert consensus guidelines. <i>Psychoneuroendocrinology, 63</i>, 414–432.", contribution: "The methodological standard for CAR.", doi: "10.1016/j.psyneuen.2015.10.010" },
    { citation: "Herman, J. P., et al. (2016). Regulation of the hypothalamic–pituitary–adrenocortical stress response. <i>Comprehensive Physiology.</i>", contribution: "Detailed physiological account of HPA regulation." },
    { citation: "Russell, G., &amp; Lightman, S. (2019). The human stress response. <i>Nature Reviews Endocrinology, 15</i>, 525–534.", contribution: "Modern integrated overview." },
  ],

  provenance: [
    { glyph: "●", colour: "var(--red)", label: "Source-grounded", note: "The cascade and its messengers, the regulatory regions, the four classes of glucocorticoid action, the three rhythms, the measurement approaches and their cautions are drawn from the cited works and attributed to the paper that established each." },
    { glyph: "■", colour: "var(--teal)", label: "Plain-language paraphrase", note: "Mechanisms are restated in ordinary words rather than quoted. No hormone concentration, effect size or reference range appears anywhere on this page — this is an explanation of a system, not a clinical reference." },
    { glyph: "▲", colour: "var(--pen-3)", label: "Schematic", note: "The cascade diagram shows order and direction of travel only. Organ shape, position and relative scale are deliberately not depicted, and nothing about anatomy should be inferred from it." },
    { glyph: "✦", colour: "var(--pen-3)", label: "Editorial framing", note: "Filing this as a mechanism rather than a theory is our decision, following the distinction the record itself opens with. The link to Job Demands–Resources' health-impairment route is also ours: it is a plausible pathway, not a claim either record's sources make." },
    { glyph: "?", colour: "var(--pen-3)", label: "Contested / unresolved", note: "How far animal mechanistic work transfers to humans varies by component, and the direction of chronic-stress effects on HPA activity remains dependent on factors the literature is still mapping." },
  ],
};

import type { IdyomDistribution, IdyomRecordContent, Source, TheoryRecord } from "./types";
import { assertProbabilityDistribution } from "@/app/concept-lab/_components/idyomMath";

const contextA: IdyomDistribution = {
  label: "Context A",
  entries: [
    { event: "A", probability: 0.8 },
    { event: "B", probability: 0.1 },
    { event: "C", probability: 0.1 },
  ],
  actualEvent: "B",
};

const contextB: IdyomDistribution = {
  label: "Context B",
  entries: [
    { event: "A", probability: 0.45 },
    { event: "B", probability: 0.1 },
    { event: "C", probability: 0.45 },
  ],
  actualEvent: "B",
};

assertProbabilityDistribution([...contextA.entries]);
assertProbabilityDistribution([...contextB.entries]);

const cards = (items: [string, string, string][]) => items.map(([label, body, colour]) => ({ label, body, colour }));

const evidence = [
  {
    title: "Improved statistical modelling of monophonic music",
    label: "process model" as const,
    citation: "Pearce & Wiggins (2004), Journal of New Music Research, 33, 367–385",
    design: "Computational development of variable-order statistical models for melodic structure.",
    testedLabel: "what it established",
    tested: "A route for modelling melodic regularities with statistical language-model techniques.",
    foundLabel: "what it contributed",
    found: "The methodological foundation from which later expectation modelling developed.",
    notTested: "It was not a direct test of a complete human expectation mechanism.",
    doi: "10.1080/0929821052000343840",
  },
  {
    title: "Expectation in Melody",
    label: "process model" as const,
    citation: "Pearce & Wiggins (2006), Music Perception, 23(5), 377–405",
    design: "Computational comparison of IDyOM predictions with existing melodic-expectation datasets.",
    testedLabel: "what it compared",
    tested: "IDyOM against a simplified implementation of Schellenberg’s I–R-derived predictors.",
    foundLabel: "what it found",
    found: "IDyOM accounted for several datasets as well as or better than the comparison model under the tested configurations.",
    notTested: "It did not test the entire Narmour theoretical architecture as one undivided object.",
    doi: "10.1525/mp.2006.23.5.377",
  },
  {
    title: "Auditory Expectation",
    label: "process model" as const,
    citation: "Pearce & Wiggins (2012), Topics in Cognitive Science, 4(4), 625–652",
    design: "Theoretical and computational synthesis of IDyOM’s architecture, representations, learning configurations, and evidence.",
    testedLabel: "what it explains",
    tested: "How learned statistical regularities can produce distributions over possible musical continuations and information measures.",
    foundLabel: "what it makes explicit",
    found: "LTM, STM, variable-order contexts, PPM-style back-off, viewpoints, IC, entropy, and their empirical relationships.",
    notTested: "It did not establish that human memory literally implements the IDyOM system.",
    doi: "10.1111/j.1756-8765.2012.01214.x",
  },
  {
    title: "Predictive uncertainty in auditory sequence processing",
    label: "empirical study" as const,
    citation: "Hansen & Pearce (2014), Frontiers in Psychology, 5, 1052",
    design: "Human judgments of uncertainty and unexpectedness compared with model-derived entropy and information content.",
    testedLabel: "what it measured",
    tested: "Whether model entropy could serve as an estimate of predictive uncertainty before an event.",
    foundLabel: "what it found",
    found: "High-entropy contexts generally produced greater inferred uncertainty than low-entropy contexts; the relationship to explicit introspective uncertainty was more conditional.",
    notTested: "Entropy was not shown to be a direct readout of a listener’s conscious feeling.",
    doi: "10.3389/fpsyg.2014.01052",
  },
  {
    title: "Statistical learning and probabilistic prediction in music cognition",
    label: "review" as const,
    citation: "Pearce (2018), Statistical learning and probabilistic prediction in music cognition",
    design: "Integrative review of statistical learning, probabilistic prediction, enculturation, and predictive-processing relationships.",
    testedLabel: "what it connects",
    tested: "Model-based prediction with broader questions about stylistic enculturation and musical cognition.",
    foundLabel: "what it cautions",
    found: "A computationally plausible model can fit behaviour without being proven as the brain’s literal mechanism.",
    notTested: "It did not turn IDyOM into a complete hierarchical predictive-coding theory.",
  },
] satisfies IdyomRecordContent["evidence"]["items"];

const minimumReading: Source[] = [
  { citation: "Pearce & Wiggins (2012). <i>Auditory Expectation</i>.", contribution: "Canonical synthesis of the mature model, its measures, architecture, and boundaries.", doi: "10.1111/j.1756-8765.2012.01214.x" },
  { citation: "Pearce & Wiggins (2006). <i>Expectation in Melody</i>.", contribution: "Historical comparison of learned statistical and simplified rule-based expectation models.", doi: "10.1525/mp.2006.23.5.377" },
  { citation: "Hansen & Pearce (2014). <i>Predictive uncertainty in auditory sequence processing</i>.", contribution: "Bounded evidence about model entropy and inferred predictive uncertainty.", doi: "10.3389/fpsyg.2014.01052" },
  { citation: "Pearce (2018). <i>Statistical learning and probabilistic prediction in music cognition</i>.", contribution: "Integrative account of learning, prediction, enculturation, and mechanism boundaries." },
  { citation: "Pearce & Wiggins (2004). <i>Improved methods for statistical modelling of monophonic music</i>.", contribution: "Early computational foundation for variable-order melodic modelling.", doi: "10.1080/0929821052000343840" },
];

const fullSources: Source[] = [
  ...minimumReading,
  { citation: "Pearce (2005). <i>The construction and evaluation of statistical models of melodic structure in music perception and composition</i>.", contribution: "Doctoral model-development work on statistical structure, expectation, and composition." },
  { citation: "Pearce, M. T. (official IDyOM project). <i>IDyOM documentation and tutorial</i>.", contribution: "Implementation vocabulary for configurations, viewpoints, information content, entropy, and model outputs." },
];

const data: IdyomRecordContent = {
  identity: {
    knowledgeForm: "Computational cognitive model / probabilistic model of musical expectation",
    status: "Influential computational model of musical expectation",
    discipline: "Music Psychology",
    branch: "Expectation & Prediction",
  },
  opening: {
    lede: "IDyOM does not ask the model to name one inevitable next note. It asks what probability distribution a learned model assigns to possible next events, given a representation and a context.",
    cards: cards([
      ["LEARN", "Regularities are induced from a selected corpus and representation.", "var(--teal)"],
      ["CONTEXT", "The current musical history supplies the evidence available now.", "var(--red)"],
      ["DISTRIBUTION", "Possible next events receive probabilities rather than one deterministic answer.", "var(--gold-deep)"],
    ]),
    note: "✦ Concept Lab synthesis. This rhythm is a teaching arrangement, not a literal neural algorithm.",
  },
  distribution: {
    lede: "The foundational move is from a single guessed continuation to a distribution over alternatives.",
    cards: cards([
      ["CURRENT CONTEXT", "What has just happened, under the chosen event representation.", "var(--teal)"],
      ["LEARNED MODEL", "Regularities available from long-term and/or current-piece learning.", "var(--red)"],
      ["NEXT EVENTS", "A, B, C, and other candidates can share probability mass.", "var(--gold-deep)"],
    ]),
    note: "● Source-grounded model claim, with plain-language translation. A model probability is not an objective probability in the world or a guaranteed report of subjective belief.",
  },
  uncertainty: {
    lede: "Before an event arrives, the question is not yet how unexpected that event was. The question is how spread out the model’s predictive distribution is.",
    cards: cards([
      ["LOW ENTROPY", "One or a few outcomes dominate the distribution.", "var(--teal)"],
      ["HIGH ENTROPY", "Probability mass is distributed across more alternatives.", "var(--red)"],
      ["THE BOUNDARY", "Entropy describes the distribution; it is not event-specific surprise, tension, or emotion.", "var(--plum-deep)"],
    ]),
    note: "● Entropy is the expected information of the predictive distribution. ■ Human uncertainty evidence is treated as a comparison between a model measure and a psychological measurement.",
  },
  information: {
    lede: "After the event occurs, information content asks how unexpected that actual event was under the model.",
    cards: cards([
      ["HIGH PROBABILITY", "The event was well supported, so its information content is low.", "var(--teal)"],
      ["LOW PROBABILITY", "The event was weakly supported, so its information content is high.", "var(--red)"],
      ["NOT A FEELING", "Information-theoretic surprisal is not automatically conscious surprise, startle, dislike, or a Huron response.", "var(--plum-deep)"],
    ]),
    note: "● Source-grounded model claim: IC(e|c) = −log₂ P(e|c). ✦ The phrase model-based unexpectedness keeps the psychological boundary visible.",
  },
  signature: {
    lede: "Hold the actual event constant while changing the predictive distribution around it. The same event can carry the same information in contexts with different overall uncertainty.",
    contexts: [contextA, contextB],
    note: "▲ Constructed information-theoretic teaching example. The probabilities are not an IDyOM stimulus, participant data, or a claim about a listener’s feeling.",
  },
  learning: {
    lede: "The probabilities have a history. IDyOM learns statistical regularities from data rather than receiving a complete theory of musical meaning in advance.",
    cards: cards([
      ["CORPUS", "A selected dataset supplies observations of musical events and contexts.", "var(--teal)"],
      ["REGULARITIES", "Counts and conditional structure support probabilistic prediction.", "var(--red)"],
      ["COMPRESSED EXPECTATION", "Low-information sequences are more compressible under a good model; this is an intuition, not a claim that listeners consciously compress melodies.", "var(--gold-deep)"],
    ]),
    note: "● The computational roots include statistical language modelling and compression. ✦ The compression explanation is a teaching bridge, not a complete psychological mechanism.",
  },
  memories: {
    lede: "IDyOM can keep two kinds of learned evidence visible: regularities from a pretraining corpus and regularities emerging within the current melody.",
    cards: cards([
      ["LONG-TERM MODEL", "Pretraining-corpus history: a model of longer-term learned statistical regularities.", "var(--teal)"],
      ["SHORT-TERM MODEL", "Incremental learning from the current piece; normally reset for a new piece.", "var(--red)"],
      ["INTERPRETIVE LIMIT", "LTM is not autobiographical memory, and STM is not a literal human working-memory module.", "var(--plum-deep)"],
    ]),
    note: "● Faithful model explanation. Corpus and stimulus settings are configuration-dependent; there is no single permanent ‘IDyOM corpus.’",
  },
  configurations: {
    lede: "The named configurations make different learning histories possible without turning the record into a configuration manual.",
    items: [
      { label: "STM", body: "Current-piece learning only.", colour: "var(--red)" },
      { label: "LTM", body: "Pretrained long-term model only.", colour: "var(--teal)" },
      { label: "BOTH", body: "STM combined with a fixed LTM.", colour: "var(--gold-deep)" },
      { label: "LTM+", body: "LTM continues incremental learning during exposure.", colour: "var(--plum-deep)" },
      { label: "BOTH+", body: "STM combined with the updating LTM+ configuration.", colour: "var(--teal)" },
    ],
    note: "● Configuration distinction from the IDyOM architecture. IDyOM can combine distributions through entropy-sensitive weighting; no arbitrary 50/50 mixture is implied.",
  },
  microWorld: {
    lede: "Imagine a corpus in which X → Y has strong prior support. A new piece repeatedly establishes X → Z. The teaching point is the changing relationship between old evidence and current exposure.",
    stages: [
      { label: "EARLY CURRENT PIECE", body: "LTM still carries the older X → Y history; STM has little evidence for X → Z.", strength: "low" },
      { label: "LATER CURRENT PIECE", body: "The current sequence has supplied more local evidence for X → Z; STM now supports that pattern more strongly.", strength: "high" },
    ],
    note: "▲ Pedagogical statistical micro-world. No numeric values are presented as IDyOM output, and no invented mixture weights are shown.",
  },
  context: {
    lede: "How much history should count? IDyOM’s variable-order modelling balances specific evidence against the sparsity of long contexts.",
    cards: cards([
      ["SHORT CONTEXT", "More observations and more robust evidence, but less specificity.", "var(--teal)"],
      ["LONG CONTEXT", "More specific evidence when the history has been seen, but greater sparsity.", "var(--red)"],
      ["VARIABLE ORDER", "Predictions can incorporate evidence across context lengths rather than choosing one fixed order for every situation.", "var(--gold-deep)"],
    ]),
    note: "● Variable-order Markov modelling, interpolated smoothing, and escape/back-off are treated as computational features, not as a claim about literal human memory.",
  },
  backoff: {
    lede: "PPM-style back-off begins with the most specific matching history, then retains shorter-context evidence when a long match is sparse or unavailable.",
    cards: cards([
      ["MOST SPECIFIC", "Use longer matching history when it carries usable evidence.", "var(--teal)"],
      ["BACK OFF", "Move through shorter contexts when the longer history is insufficient.", "var(--red)"],
      ["DISTRIBUTE", "The result is not winner-take-all longest-match selection; available evidence is combined through the model’s smoothing strategy.", "var(--gold-deep)"],
    ]),
    note: "● Conceptual account of PPM*. Method C can remain an advanced historical detail; its full escape mathematics is not required for the core lesson.",
  },
  viewpoints: {
    lede: "A musical event is not one inevitable object. IDyOM can model different event features and relations through a supplied repertoire of viewpoints.",
    cards: cards([
      ["BASIC VIEWPOINT", "Literal features such as pitch, note-start time, duration, or mode.", "var(--teal)"],
      ["DERIVED VIEWPOINT", "A computed relation such as pitch interval or inter-onset interval.", "var(--red)"],
      ["LINKED VIEWPOINT", "A cross-product or conjunction such as pitch interval × scale degree.", "var(--gold-deep)"],
      ["THREADED VIEWPOINT", "A selection rule, such as the scale degree of the first note in each bar.", "var(--plum-deep)"],
    ]),
    note: "● Viewpoint categories and selection are grounded in the IDyOM model vocabulary. The available ontology is supplied by researchers; the model does not freely invent any musical concept from raw sound.",
  },
  representation: {
    lede: "The model only knows what you represent — and it can choose among the representations you make available.",
    cards: cards([
      ["SAME NOTES", "One sequence can be encoded as absolute pitches or as intervals between pitches.", "var(--teal)"],
      ["DIFFERENT PATTERN", "The resulting symbolic regularities, probabilities, and information values can change with the viewpoint.", "var(--red)"],
      ["NO UNIVERSAL WINNER", "Good prediction under one representation does not by itself prove that representation is psychologically correct.", "var(--plum-deep)"],
    ]),
    note: "✦ Static Concept Lab representation interlude. It is a boundary demonstration, not a third major interaction or a claim that one viewpoint is always superior.",
  },
  corpus: {
    lede: "A corpus is a selected dataset, not a cultural mind. Its probability structure depends on sampling, genre, period, size, encoding, viewpoints, and configuration.",
    cards: cards([
      ["SELECTED DATA", "A corpus is what a study chose to include, not everything a listener has heard.", "var(--teal)"],
      ["MODELLED STYLE", "Claims about ‘Western music’ or a whole culture require evidence that the corpus can support them.", "var(--red)"],
      ["LEARNING ≠ CULTURE", "Statistical exposure can be one contribution to enculturation without being the whole social or psychological process.", "var(--plum-deep)"],
    ]),
    note: "✦ Corpus/culture boundary. Do not turn one study corpus into a permanent IDyOM property or an account of a cultural mind.",
  },
  evidence: {
    lede: "The evidence trail contains computational foundations, model comparisons, human uncertainty measures, and integrative reviews. Each source supports a different link.",
    items: evidence,
    note: "■ Evidence X-ray. Computational fit, human measurement, and theoretical interpretation remain distinct forms of evidence.",
  },
  narmour: {
    lede: "IDyOM did not ‘replace’ Narmour. The historical comparison asks whether a learned statistical model can account for expectation patterns that a simplified rule-based implementation also tries to predict.",
    cards: cards([
      ["NARMOUR", "A rule-like account of melodic implication and realisation.", "var(--teal)"],
      ["IDyOM", "A learned probabilistic account whose predictions depend on corpus, viewpoint, context, and configuration.", "var(--red)"],
      ["SAFE CONCLUSION", "The 2006 comparison favoured IDyOM on several tested datasets/configurations; it did not disprove the entire Narmour architecture.", "var(--plum-deep)"],
    ]),
    note: "■ Faithful historical comparison. Do not report the 2006 fit values as a universal percentage of musical expectation.",
  },
  mechanism: {
    lede: "A model that predicts well can still leave open how human listeners produce their expectations.",
    cards: cards([
      ["MODEL FIT", "The system’s outputs can resemble patterns in behavioural or physiological data.", "var(--teal)"],
      ["MECHANISM", "A mechanistic claim says how a listener or brain generates the response.", "var(--red)"],
      ["MEMORY LIMIT", "IDyOM can preserve exact sequential information more completely than human memory plausibly does.", "var(--plum-deep)"],
      ["NOT PREDICTIVE CODING", "IDyOM has conceptual parallels with predictive processing but is not a hierarchical cortical architecture.", "var(--gold-deep)"],
    ]),
    note: "? Open mechanism boundary. Pearce’s integrative discussion supports computational plausibility without establishing mechanistic identity.",
  },
  finalModel: {
    lede: "The final map keeps corpus and representation as outer constraints, then lets long- and short-term evidence meet in a distribution before separating entropy from information content.",
    steps: cards([
      ["LONG-TERM MODEL", "Corpus history", "var(--teal)"],
      ["SHORT-TERM MODEL", "Current melody", "var(--red)"],
      ["VARIABLE-LENGTH CONTEXT", "Specific and robust evidence", "var(--gold-deep)"],
      ["DISTRIBUTION", "Possible next events", "var(--plum-deep)"],
      ["ENTROPY / IC", "Before-event uncertainty / after-event information", "var(--red)"],
      ["NEW CONTEXT", "The observed event supplies the next update", "var(--teal)"],
    ]),
    constraints: ["CORPUS", "REPRESENTATION / VIEWPOINTS"],
    note: "✦ Concept Lab synthesis, not a literal brain pathway. The loop indicates model updating and continued experience, not a complete neural account.",
  },
  explains: {
    lede: "IDyOM is most useful when the question is how learned regularities can support probabilistic musical expectation.",
    cards: cards([
      ["EXPLAINS WELL", "How corpus exposure, context, viewpoints, and smoothing can generate distributions over continuations.", "var(--teal)"],
      ["CONNECTS TO", "Behavioural expectation, inferred uncertainty, stylistic enculturation, and information-theoretic measures.", "var(--gold-deep)"],
      ["DOES NOT COMPLETE", "Emotion, meaning, culture, neural implementation, creativity, or every form of musical structure.", "var(--red)"],
    ]),
    note: "✦ Concept Lab synthesis of explanatory reach, with ■ bounded links to the evidence base.",
  },
  stops: {
    lede: "The record is finished only when the model’s stopping points are as visible as its predictive power.",
    cards: cards([
      ["PROBABILITY ≠ FEELING", "Model output is not a direct readout of subjective expectation.", "var(--teal)"],
      ["IC ≠ EMOTION", "Information content is not automatically tension, startle, pleasure, or dislike.", "var(--red)"],
      ["CORPUS ≠ CULTURE", "A dataset is not a cultural mind or a listener’s complete history.", "var(--gold-deep)"],
      ["FIT ≠ BRAIN", "Predictive similarity does not establish that humans implement IDyOM literally.", "var(--plum-deep)"],
    ]),
    note: "? The unresolved questions are part of the model’s honest scope: representation, memory, mechanism, cultural learning, and relation to predictive processing remain qualified.",
  },
};

export const idyom: TheoryRecord = {
  id: "idyom-information-dynamics-of-music",
  kind: "theory",
  slug: "idyom-information-dynamics-of-music",
  title: "IDyOM — Information Dynamics of Music",
  hook: "What did the model expect?",
  oneSentence: "A computational cognitive model that learns musical regularities and estimates probability distributions, entropy, and information content for possible next events.",
  discipline: "music-psych",
  topics: ["musical expectation", "statistical learning", "information theory", "probabilistic prediction", "enculturation", "music cognition"],
  facts: ["prediction = distribution", "entropy ≠ IC", "LTM + STM", "viewpoints matter", "fit ≠ brain"],
  statusChip: "Influential computational model of musical expectation",
  origins: [
    { year: "2004", author: "Pearce · Wiggins", work: "Improved statistical modelling of monophonic music", contribution: "Variable-order statistical modelling foundation." },
    { year: "2005", author: "Pearce", work: "Doctoral model-development work", contribution: "Construction and evaluation of statistical models of melodic structure." },
    { year: "2006", author: "Pearce · Wiggins", work: "Expectation in Melody", contribution: "Computational comparison of learned statistical and simplified rule-based predictors." },
    { year: "2012", author: "Pearce · Wiggins", work: "Auditory Expectation", contribution: "Mature IDyOM architecture, measures, viewpoints, and evidence synthesis." },
    { year: "2018", author: "Pearce", work: "Statistical learning and probabilistic prediction", contribution: "Integrative account of enculturation and mechanism boundaries." },
  ],
  trailLede: "IDyOM is a developmental computational programme rather than a one-paper invention. Its architecture grew through statistical modelling, model comparison, and later cognitive interpretation.",
  oversimplificationsLede: "Do not leave with these shortcuts.",
  oversimplifications: [
    "IDyOM does not predict one inevitable next note; it predicts a distribution.",
    "Entropy is not the same thing as information content, tension, or felt uncertainty.",
    "Information content is not automatically conscious surprise, emotion, or a Huron response.",
    "LTM and STM are model configurations, not literal autobiographical and working-memory boxes.",
    "A corpus is not a culture, and a viewpoint is not a complete account of musical perception.",
    "PPM/back-off is a computational strategy, not a claim that human memory uses a PPM tree.",
    "IDyOM is not statistical learning itself, predictive coding, information theory itself, or generative AI.",
    "A good predictive fit does not establish that the brain literally implements IDyOM.",
  ],
  qualifications: [
    "The probability distribution depends on corpus, representation, viewpoint, configuration, and context.",
    "The 2006 comparisons are dataset- and configuration-bound; they are not a universal accuracy claim.",
    "Hansen and Pearce’s entropy result concerns model-derived uncertainty and psychological measurement, not a direct conscious-uncertainty meter.",
    "The LTM/STM micro-world is qualitative unless an actual documented IDyOM run is added later.",
    "The relationship between IDyOM, predictive processing, human memory, and neural implementation remains an open interpretive question.",
  ],
  minimumReading,
  minimumReadingLabel: "If you read five things",
  fullSources,
  relatedToLede: "These records share the expectation and learning neighbourhood but answer different questions.",
  relatedTo: [
    { recordId: "statistical-learning-of-music", relation: "is a specific model within the broader framework of", body: "Statistical Learning of Music surveys the wider research framework; IDyOM is one formal computational implementation of learned probabilistic prediction." },
    { recordId: "narmours-implication-realization-theory", relation: "contrasts learned probabilities with", body: "Narmour provides a rule-like account of melodic implication; IDyOM estimates context-sensitive distributions from learned regularities." },
    { recordId: "hurons-itpra-theory", relation: "estimates the predictive side of", body: "Huron maps response systems around expectation; IDyOM asks what a learned model assigns probability to and how informative the outcome is." },
    { recordId: "tonal-hierarchy", relation: "can learn regularities related to", body: "IDyOM may reflect enculturated tonal structure, but tonal hierarchy is not reducible to a corpus frequency table." },
  ],
  idyom: data,
  provenance: [
    { glyph: "●", colour: "var(--teal)", label: "source-grounded model claims", note: "Claims about IDyOM’s architecture, probability distributions, IC, entropy, LTM/STM, variable-order contexts, PPM-style back-off, viewpoints, and its status as a computational model are grounded in Pearce and Wiggins and the official IDyOM documentation." },
    { glyph: "■", colour: "var(--red)", label: "empirical findings and faithful explanations", note: "The 2006 model comparison, Hansen and Pearce’s uncertainty findings, and later relationships between model measures and human responses remain attached to their designs, measures, and limitations." },
    { glyph: "▲", colour: "var(--gold-deep)", label: "constructed teaching examples", note: "The same-IC/different-entropy distributions and the old-experience/new-pattern micro-world are original teaching devices, not published stimuli, IDyOM output, participant data, or tests of visitor learning." },
    { glyph: "✦", colour: "var(--plum-deep)", label: "Concept Lab synthesis", note: "The LEARN → CONTEXT → DISTRIBUTION → EVENT → INFORMATION → UPDATE rhythm, final model map, cross-record relations, and explanatory sequence arrange the evidence for teaching." },
    { glyph: "?", colour: "var(--pen-3)", label: "unresolved mechanism and interpretation", note: "The relation between model fit and human mechanism, exact memory correspondence, viewpoint psychology, corpus and culture, and IDyOM’s relation to predictive processing remain qualified rather than resolved." },
  ],
};

export default idyom;

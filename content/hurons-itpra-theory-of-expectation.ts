import type { AudioEvent, ASACard, EvidenceXray, HuronRecordContent, Source, TheoryRecord } from "./types";

const note = (pitch: number, start: number): AudioEvent => ({ pitch, start, duration: 0.42 });

const timingPresets: HuronRecordContent["opening"]["timing"]["presets"] = [
  {
    label: "On-time outcome",
    body: "The tonic arrives at the construction’s expected onset. The musical context and outcome identity stay fixed; only the timing condition changes.",
    events: [note(60, 0), note(64, 1), note(67, 2), note(67, 3), note(72, 4)],
    variable: "outcome timing",
    colour: "var(--teal)",
    expectedOnset: "4.00 s",
    actualOnset: "4.00 s",
    delay: "0 ms",
    tempo: "60 BPM construction pulse",
    pitch: "C4–E4–G4–G4 → C5 · MIDI 60, 64, 67, 67, 72 · C5 ≈ 523.25 Hz",
    timbre: "Triangle oscillator",
    gain: "0.12 peak in the shared AudioExample envelope",
    held: "Preceding context, pitch, harmony, timbre, gain, outcome identity, and tone duration",
    markers: [{ after: 4, label: "expected = actual", colour: "var(--teal)" }],
  },
  {
    label: "Delayed outcome",
    body: "The same tonic arrives after a silent interval. The delay is a constructed teaching manipulation, not a claim about a universal physiological latency.",
    events: [note(60, 0), note(64, 1), note(67, 2), note(67, 3), note(72, 5.5)],
    variable: "outcome timing",
    colour: "var(--red)",
    expectedOnset: "4.00 s",
    actualOnset: "5.50 s",
    delay: "1.50 s",
    tempo: "60 BPM construction pulse",
    pitch: "C4–E4–G4–G4 → C5 · MIDI 60, 64, 67, 67, 72 · C5 ≈ 523.25 Hz",
    timbre: "Triangle oscillator",
    gain: "0.12 peak in the shared AudioExample envelope",
    held: "Preceding context, pitch, harmony, timbre, gain, outcome identity, and tone duration",
    markers: [{ after: 4, label: "expected onset", colour: "var(--gold-deep)" }],
  },
];

const surpriseEvents: AudioEvent[] = [note(60, 0), note(64, 1), note(67, 2), note(67, 3), note(68, 4)];

const cards = (items: [string, string, string][]): ASACard[] => items.map(([label, body, colour]) => ({ label, body, colour }));

const evidence: EvidenceXray[] = [
  {
    title: "Huron (2006) · Sweet Anticipation",
    label: "process model",
    citation: "Huron, D. (2006). <i>Sweet Anticipation: Music and the Psychology of Expectation</i>. MIT Press.",
    design: "Canonical book-length integrative theory, not one participant experiment.",
    testedLabel: "what it proposes",
    tested: "Five functionally distinct expectation-related response systems, their proposed biological functions, expectation sources, prediction effect, and contrastive valence.",
    foundLabel: "what it contributes",
    found: "A broad functional and temporal vocabulary for mixed feeling states around anticipated and realised events.",
    notTested: "That five isolated physiological modules have been independently validated or that the theory is a complete computable emotion model.",
  },
  {
    title: "Steinbeis, Koelsch & Sloboda (2006)",
    label: "empirical study",
    citation: "Steinbeis, N., Koelsch, S., &amp; Sloboda, J. A. (2006). The role of harmonic expectancy violations in musical emotions. <i>Journal of Cognitive Neuroscience, 18</i>(8), 1380–1393.",
    design: "24 participants; musicians and nonmusicians; matched versions of six Bach chorales; subjective ratings, EDA, heart rate, and EEG.",
    testedLabel: "what it tested",
    tested: "Whether expected, unexpected, and very unexpected harmonic events differ in subjective, physiological, and neural measures.",
    foundLabel: "what it found",
    found: "Tension, emotionality, and EDA increased with harmonic unexpectedness; ERP differences indexed detection and stylistic processing.",
    notTested: "Five separate ITPRA response systems, contrastive valence as a full mechanism, or the learner’s individual ITPRA state.",
    doi: "10.1162/jocn.2006.18.8.1380",
  },
  {
    title: "Koelsch et al. (2008)",
    label: "empirical study",
    citation: "Koelsch, S., Kilches, S., Steinbeis, N., &amp; Schelinski, S. (2008). Effects of unexpected chords and of performer’s expression on brain responses and electrodermal activity. <i>PLOS ONE, 3</i>(7), e2631.",
    design: "Unexpected chords in piano-sonata excerpts, with expressive and non-expressive performance conditions; ERP and skin-conductance measures.",
    testedLabel: "what it tested",
    tested: "Whether unexpected chords in naturalistic musical contexts produce distinct neural and physiological responses.",
    foundLabel: "what it found",
    found: "Unexpected chords elicited ERP and skin-conductance differences; syntactic processing and emotional effects were not identical processes.",
    notTested: "A direct demonstration of Imagination, Tension, Prediction, Reaction, and Appraisal as five isolated systems.",
    doi: "10.1371/journal.pone.0002631",
  },
  {
    title: "Pearce and colleagues · statistical learning",
    label: "review",
    citation: "Pearce, M. T. (2018). Statistical learning and probabilistic prediction in music cognition. <i>Annals of the New York Academy of Sciences</i>.",
    design: "Computational and behavioural synthesis of learned musical regularities and probabilistic prediction, including IDyOM.",
    testedLabel: "what it supports",
    tested: "How long-term style knowledge and short-term learning within a piece can generate expectations about possible continuations.",
    foundLabel: "what it contributes",
    found: "A formal bridge from exposure and learning to expectedness and predictive probability.",
    notTested: "The complete ITPRA architecture or a one-to-one mapping from IDyOM variables to response systems.",
    doi: "10.1111/nyas.13654",
  },
  {
    title: "Cheung et al. (2019) · surprise and pleasure",
    label: "empirical study",
    citation: "Cheung, V. K. M., et al. (2019). Uncertainty and surprise jointly predict musical pleasure and brain activity. <i>Current Biology, 29</i>(23), 4084–4092.",
    design: "Computational quantification of chord uncertainty and surprise in a large popular-music corpus, with behavioural and fMRI analyses.",
    testedLabel: "what it tested",
    tested: "Whether uncertainty and surprise jointly relate to musical pleasure and neural activity.",
    foundLabel: "what it found",
    found: "Pleasure varied nonlinearly with uncertainty and surprise, supporting a more complex relationship than unexpectedness equals bad or good.",
    notTested: "Huron’s proposed contrastive-valence sequence or separate prediction, reaction, and appraisal responses.",
    doi: "10.1016/j.cub.2019.09.067",
  },
  {
    title: "Aversa (2009) · critical review",
    label: "review",
    citation: "Aversa, E. (2009). Review of David Huron, <i>Sweet Anticipation</i>. <i>Music Theory Online, 15</i>(3).",
    design: "Critical interpretive review focused on expectation, prediction effect, pleasure, and compositional implications.",
    testedLabel: "what it helps inspect",
    tested: "The scope and explanatory ambition of Huron’s account, including its distinction between expectation-related pleasure and pleasure more generally.",
    foundLabel: "what it contributes",
    found: "A useful boundary against treating expectation as the only route to musical pleasure.",
    notTested: "A primary empirical test of ITPRA.",
  },
];

const huron: HuronRecordContent = {
  identity: {
    knowledgeForm: "Integrative theory / functional framework of expectation-related response systems",
    status: "Foundational integrative theory of musical expectation",
    discipline: "Psychology of Music",
    branch: "Expectation & Prediction",
  },
  finalModelNote: "✦ Concept Lab synthesis: this temporal map arranges Huron’s proposed response systems for teaching; it is not a five-stage algorithm, a physiological trace, or a claim that every listener experiences one identical sequence.",
  opening: {
    lede: "Waiting for something to happen can feel different from the instant it happens, and different again from deciding what it meant later. Huron’s ITPRA theory asks us to keep those moments apart.",
    question: "What happens before an expected event — and after it arrives?",
    note: "● Huron’s theory is about functionally distinct response systems around anticipated outcomes. It is not simply an emotion theory or a five-stage processing algorithm.",
    timing: {
      lede: "Start with the smallest useful manipulation: keep the musical outcome the same, but let it arrive on time or after a controlled delay.",
      presets: timingPresets,
      question: "What changed while nothing happened?",
      note: "▲ Original controlled teaching example. The delay illustrates a pre-outcome preparation question; it does not measure the learner’s physiological tension.",
    },
  },
  overview: {
    lede: "ITPRA names five functionally distinct response systems. Their different jobs help explain why expectation can contain anticipation, preparation, surprise, immediate action, and later evaluation without collapsing into one feeling.",
    cards: cards([
      ["IMAGINATION", "Possible futures are represented in advance; motivation can be deferred toward a later outcome.", "var(--teal)"],
      ["TENSION", "Attention and arousal prepare for an uncertain, important, or imminent outcome.", "var(--gold-deep)"],
      ["PREDICTION", "After onset, predictive accuracy can be reinforced or penalised.", "var(--red)"],
      ["REACTION", "After onset, a fast conservative response addresses possible danger or opportunity.", "var(--red)"],
      ["APPRAISAL", "Later context-sensitive evaluation can confirm, modify, or reverse an immediate response.", "var(--plum-deep)"],
    ]),
    note: "■ Faithful explanation. The five labels are not five equal boxes, and they do not imply one mandatory emotional outcome.",
  },
  timeline: {
    lede: "The outcome onset is the hinge. Imagination may extend far back; tension operates near the hinge; Prediction and Reaction begin after it; Appraisal forms a slower tail that may recur.",
    windows: [
      { key: "imagination", label: "IMAGINATION", epoch: "before outcome", question: "What might happen?", body: "Possible futures and their consequences can be represented well before the event.", function: "future-oriented motivation", boundary: "not simply literal musical imagery", colour: "var(--teal)", start: 0, end: 70 },
      { key: "tension", label: "TENSION", epoch: "approaching outcome", question: "Am I prepared?", body: "Attention and arousal adjust as uncertainty, importance, and imminence change.", function: "preparation", boundary: "not generic musical tension or GTTM prolongation", colour: "var(--gold-deep)", start: 38, end: 70 },
      { key: "prediction", label: "PREDICTION RESPONSE", epoch: "after onset", question: "Was I accurate?", body: "The response concerns the accuracy of the prior prediction, not the act of predicting.", function: "reinforcement of forecasting", boundary: "not conscious satisfaction alone", colour: "var(--red)", start: 70, end: 84 },
      { key: "reaction", label: "REACTION RESPONSE", epoch: "after onset", question: "What should I do now?", body: "A fast, conservative response addresses possible worst-case outcomes or short-lived opportunities.", function: "rapid protection or capture", boundary: "not identical to prediction error", colour: "var(--red)", start: 70, end: 84 },
      { key: "appraisal", label: "APPRAISAL", epoch: "later / recurring", question: "What does it mean?", body: "Broader social, environmental, and contextual information can revise the immediate story.", function: "inclusive evaluation", boundary: "not simply a liking rating", colour: "var(--plum-deep)", start: 70, end: 100 },
    ],
    note: "✦ The overlapping bands and parallel P/R split are a teaching synthesis of Huron’s temporal architecture, not universal timing data.",
  },
  imagination: {
    lede: "Imagination Response makes possible futures available before the outcome. In Huron’s general theory, this supports motivation and deferred gratification; in fast music, it need not mean that a listener consciously imagines a literal next note.",
    cards: cards([
      ["REPRESENT", "Possible outcomes and consequences can be held in advance.", "var(--teal)"],
      ["MOTIVATE", "A desirable future can organise present behaviour even when the reward is delayed.", "var(--teal)"],
      ["BOUNDARY", "Music may evoke mostly rapid Tension–Prediction–Reaction activity, with less conscious projection or retrospective appraisal.", "var(--plum-deep)"],
    ]),
    note: "● Huron’s functional proposal, with ■ faithful musical qualification. Imagination Response is not equated with musical imagery.",
  },
  tension: {
    lede: "Tension Response is preparatory. As an outcome becomes more uncertain, important, or imminent, the organism may adjust attention and arousal to be ready for what arrives.",
    cards: cards([
      ["UNCERTAINTY", "How many outcomes remain possible, and how unclear is the future?", "var(--gold-deep)"],
      ["IMPORTANCE", "How much would the outcome matter if it occurred?", "var(--gold-deep)"],
      ["IMMINENCE", "How close is the moment when preparation must become action?", "var(--gold-deep)"],
      ["NOT THIS", "Not harmonic dissonance, all subjective musical tension, or GTTM prolongational tension.", "var(--red)"],
    ]),
    note: "● Huron’s proposed preparation function. The term is kept separate from neighbouring musical uses of ‘tension.’",
  },
  outcome: {
    lede: "At outcome onset, the theory does not ask one question. It opens at least three: Was the prediction accurate? What immediate response is appropriate? What does the event mean in its wider context?",
    cards: cards([
      ["PREDICTION HAPPENS BEFORE", "A listener’s expectation is formed before the event arrives.", "var(--teal)"],
      ["THE RESPONSE HAPPENS AFTER", "Prediction Response evaluates accuracy only once the outcome can be compared with the expectation.", "var(--red)"],
      ["THE SAME EVENT", "Prediction, Reaction, and Appraisal can assign different meanings or valences to one outcome.", "var(--plum-deep)"],
    ]),
    note: "■ Faithful explanation. Outcome onset is the temporal hinge, not the start of a rigid three-step post-event algorithm.",
  },
  prediction: {
    lede: "Prediction Response is an auto-evaluative response to predictive accuracy. Huron proposes that accurate prediction is reinforced and failed prediction is penalised because accurate forecasting is biologically useful.",
    cards: cards([
      ["ACCURATE", "A correct forecast can carry positive reinforcement even when the event itself is not pleasant.", "var(--teal)"],
      ["FAILED", "A surprising outcome can carry initially negative predictive value because preparation failed.", "var(--red)"],
      ["NOT THE ACT", "The prediction is prior; the Prediction Response is the after-onset evaluation of accuracy.", "var(--gold-deep)"],
    ]),
    note: "● Huron’s theoretical proposal. ‘Reinforcement’ is not reduced to conscious satisfaction or treated as a complete account of liking.",
  },
  parallel: {
    lede: "Prediction and Reaction begin at the same temporal hinge but solve different problems. The acronym’s order should not be mistaken for a mandatory P-then-R sequence.",
    cards: cards([
      ["PREDICTION", "How accurate was the expectation?", "var(--red)"],
      ["REACTION", "What immediate response is appropriate under uncertainty about danger or opportunity?", "var(--red)"],
      ["PARALLEL", "One outcome can be surprising while also calling for a rapid protective or opportunistic response.", "var(--plum-deep)"],
    ]),
    note: "● Huron explicitly treats P and R as co-occurring post-outcome responses; ITRPA would be more temporally literal but is less pronounceable.",
  },
  appraisal: {
    lede: "Appraisal is slower, broader, and more context-sensitive. It can draw on social, environmental, and personal information that was unavailable to the immediate reaction.",
    cards: cards([
      ["INTEGRATE", "What happened, in this context, and what consequences follow?", "var(--plum-deep)"],
      ["REVISE", "Later understanding can confirm, modify, or reverse the first response.", "var(--plum-deep)"],
      ["PERSIST", "Appraisal-related feelings can recur long after the event and can change with new knowledge.", "var(--gold-deep)"],
      ["NOT LIKING", "Appraisal is not a single pleasantness rating; it is a wider evaluation of significance.", "var(--red)"],
    ]),
    note: "■ Faithful explanation of a slower contextual response. The page should not infer the learner’s appraisal from a button click.",
  },
  surprise: {
    lede: "Keep the outcome fixed and change only the question. This interaction is a conceptual lens-switch, not a test of the learner’s nervous system.",
    event: "C-major context → A♭4 surprise · MIDI 68 · approximately 415.30 Hz · controlled triangle timbre · moderate gain",
    events: surpriseEvents,
    lenses: [
      { label: "Prediction Response", question: "Was this what the preceding context predicted?", body: "Under Huron’s framework, this lens asks about the accuracy of the prior expectation and its proposed reinforcement value.", boundary: "It does not measure whether the learner actually felt positive or negative reinforcement.", colour: "var(--red)" },
      { label: "Reaction Response", question: "What immediate functional question does Huron’s model assign here?", body: "Under Huron’s framework, this lens asks what rapid response would be appropriate if the event might signal danger or a short-lived opportunity.", boundary: "It does not claim that the learner experienced a real protective reaction.", colour: "var(--red)" },
      { label: "Appraisal Response", question: "How might broader context change the interpretation?", body: "Under Huron’s framework, this lens asks what the event means after social, musical, and contextual information is considered.", boundary: "It does not diagnose the learner’s appraisal or emotional state.", colour: "var(--plum-deep)" },
    ],
    note: "▲ One original, safe constructed event held identical across the three lenses. No right answer, score, diagnosis, or physiological inference.",
  },
  valence: {
    lede: "Different systems need not agree. A predictive failure or fast reaction can be negative while later appraisal is benign or positive; Huron calls the possible contrast a route by which surprise can intensify pleasure.",
    steps: [
      { label: "UNEXPECTED OUTCOME", body: "The event diverges from the prior expectation.", colour: "var(--red)" },
      { label: "PREDICTION AND/OR REACTION", body: "Initial negative predictive value and/or a fast conservative response may coexist.", colour: "var(--red)" },
      { label: "LATER APPRAISAL", body: "Context can make the same outcome benign, meaningful, funny, awe-inspiring, or welcome.", colour: "var(--plum-deep)" },
      { label: "POSSIBLE CONTRASTIVE VALENCE", body: "The contrast may enhance a positive experience; it is not a mandatory emotional pathway.", colour: "var(--teal)" },
    ],
    note: "● Contrastive valence is Huron’s explanatory proposal. Later surprise-and-pleasure findings are convergent evidence about musical expectancy, not direct validation of this ITPRA mechanism.",
  },
  sourcesOfExpectation: {
    lede: "ITPRA describes response systems. Huron’s four expectation types describe where an expectation comes from. Keep these as a parallel source layer, not four stages before Imagination.",
    sources: [
      { label: "SCHEMATIC", question: "How does this kind of music usually go?", body: "Generalised knowledge of stylistic and musical regularities acquired through long-term exposure.", memory: "long-term / semantic knowledge", colour: "var(--teal)" },
      { label: "VERIDICAL", question: "How does this particular piece go?", body: "Memory for a familiar work or rendition, including the knowledge that follows repeated listening.", memory: "episodic / work-specific memory", colour: "var(--gold-deep)" },
      { label: "DYNAMIC", question: "What has this piece taught me so far?", body: "Patterns learned within the currently unfolding work through repetition, sequence, ostinato, or motive.", memory: "short-term / unfolding context", colour: "var(--red)" },
      { label: "CONSCIOUS", question: "What do I explicitly know will probably happen?", body: "Declarative or extra-musical knowledge, such as programme information or explicit training.", memory: "working memory / explicit knowledge", colour: "var(--plum-deep)" },
    ],
    note: "● Huron’s expectation-source distinction. These sources may operate concurrently and may conflict.",
  },
  schematicVeridical: {
    lede: "A familiar deceptive cadence can be expected in one sense and unexpected in another.",
    cards: cards([
      ["VERIDICALLY EXPECTED", "I know this exact piece or rendition, so I can anticipate the deceptive cadence because I remember how it goes.", "var(--gold-deep)"],
      ["SCHEMATICALLY UNEXPECTED", "The same event may be unusual within the stylistic grammar I have learned across many pieces.", "var(--teal)"],
      ["CONFLICT", "One event can fulfil a work-specific expectation while violating a broader stylistic one.", "var(--red)"],
    ]),
    note: "▲ Original abstract demonstration. It uses no copyrighted musical example and does not turn schematic and veridical expectation into competing stages.",
  },
  dynamic: {
    lede: "A novel style can still become locally predictable. Dynamic expectation grows inside the current piece, while statistical learning supplies a bridge to future computational records.",
    cards: cards([
      ["REPEAT", "An ostinato, sequence, or motive can teach the listener a local regularity.", "var(--red)"],
      ["LEARN", "The current piece establishes expectations that may not have existed before the piece began.", "var(--gold-deep)"],
      ["DO NOT COLLAPSE", "Dynamic expectation is not identical to Narmour’s local interval implication and is not itself an IDyOM calculation.", "var(--plum-deep)"],
    ]),
    note: "■ Faithful bridge. Statistical-learning work supports learned expectation; it does not validate the complete ITPRA architecture.",
  },
  evidence: {
    lede: "The evidence supports a careful two-level conclusion: expectancy violations can have cognitive, subjective, physiological, and neural consequences; that does not independently demonstrate five isolated ITPRA systems.",
    items: evidence,
    note: "■ Evidence X-ray boundary. Each study remains attached to its design and measure rather than being used as proof of the whole theory.",
  },
  adaptive: {
    lede: "Huron gives each response system a proposed adaptive function. Present these as theoretical evolutionary interpretations, not as five experimentally isolated brain modules.",
    cards: cards([
      ["MOTIVATE", "Imagination supports future-oriented action and deferred gratification.", "var(--teal)"],
      ["PREPARE", "Tension tunes attention and arousal to uncertainty, importance, and imminence.", "var(--gold-deep)"],
      ["REINFORCE", "Prediction rewards accurate forecasting and penalises failed forecasting.", "var(--red)"],
      ["PROTECT", "Reaction buys time when slower appraisal could miss danger or opportunity.", "var(--red)"],
      ["EVALUATE", "Appraisal integrates the outcome with broader biological and contextual significance.", "var(--plum-deep)"],
    ]),
    note: "● Functional/evolutionary proposals from Huron, not direct evidence for five distinct evolved neural adaptations.",
  },
  scope: {
    lede: "ITPRA is strongest as a temporal and functional vocabulary for the mixed feelings around expectation, anticipation, surprise, and later evaluation. It stops short of being a complete emotion, neural, or learning theory.",
    explains: ["pre-outcome anticipation and preparation", "predictive success and failure", "parallel immediate response questions", "slower contextual appraisal", "mixed-valence responses and possible pleasant surprise", "multiple sources of musical expectation", "links among structure, learning, expectation, and affect"],
    stops: ["a complete theory of emotion", "a complete neural model", "exact prediction content for every listener", "a complete theory of musical learning", "a universal explanation of musical pleasure", "validation of five isolated response modules", "predictive processing or IDyOM under another name"],
    note: "? The theory’s functional architecture and physiological status remain open to further operationalisation and empirical refinement.",
  },
};

const minimumReading: Source[] = [
  { citation: "Huron, D. (2006). <i>Sweet Anticipation: Music and the Psychology of Expectation</i>. MIT Press.", contribution: "Canonical ITPRA theory, expectation sources, prediction effect, and contrastive valence." },
  { citation: "Steinbeis, N., Koelsch, S., &amp; Sloboda, J. A. (2006). The role of harmonic expectancy violations in musical emotions. <i>Journal of Cognitive Neuroscience, 18</i>(8), 1380–1393.", contribution: "Convergent expectancy-violation evidence across subjective, physiological, and neural measures.", doi: "10.1162/jocn.2006.18.8.1380" },
  { citation: "Pearce, M. T. (2018). Statistical learning and probabilistic prediction in music cognition. <i>Annals of the New York Academy of Sciences</i>.", contribution: "Learned expectation and the bridge to statistical models.", doi: "10.1111/nyas.13654" },
  { citation: "Aversa, E. (2009). Review of David Huron, <i>Sweet Anticipation</i>. <i>Music Theory Online, 15</i>(3).", contribution: "Critical scope boundary around prediction effect and musical pleasure." },
];

export const huronsItpraTheory: TheoryRecord = {
  id: "hurons-itpra-theory",
  kind: "theory",
  slug: "hurons-itpra-theory-of-expectation",
  title: "Huron’s ITPRA Theory of Expectation",
  hook: "Expectation is not one feeling.",
  oneSentence: "An integrative theory of how imagination, preparation, predictive accuracy, immediate reaction, and later appraisal can unfold around an anticipated musical outcome.",
  discipline: "music-psych",
  topics: ["Huron", "ITPRA", "musical expectation", "prediction", "appraisal", "contrastive valence"],
  facts: ["outcome-centred time", "P + R parallel", "four expectation sources", "mixed valence"],
  statusChip: "Foundational integrative theory",
  origins: [
    { year: "1956", author: "Leonard Meyer", work: "Emotion and Meaning in Music", contribution: "Broader implication, expectation, delay, fulfilment, meaning, and affect tradition." },
    { year: "2006", author: "David Huron", work: "Sweet Anticipation", contribution: "Integrative ITPRA account of expectation-related response systems and musical affect." },
    { year: "2006–2008", author: "Steinbeis · Koelsch · Sloboda", work: "Expectancy-violation evidence", contribution: "Convergent subjective, physiological, and neural consequences of harmonic unexpectedness." },
    { year: "2012–2018", author: "Pearce and colleagues", work: "Statistical learning and IDyOM", contribution: "Formal learned-probability bridge for musical expectation." },
  ],
  trailLede: "The trail moves from Meyer’s expectation-and-affect tradition through Huron’s temporal response architecture and into convergent expectancy evidence and statistical learning.",
  oversimplificationsLede: "Do not leave with these shortcuts.",
  oversimplifications: [
    "ITPRA is not <b>I → T → P → R → A</b> as a rigid processing algorithm.",
    "Prediction Response is not the same thing as making a prediction.",
    "Prediction and Reaction can begin together after outcome onset.",
    "Tension Response is not harmonic dissonance or GTTM prolongational tension.",
    "Appraisal is not simply a liking rating.",
    "Expected does not mean pleasant, and unexpected does not mean unpleasant overall.",
    "Contrastive valence is a proposal for some mixed-valence experiences, not a universal pleasure mechanism.",
    "Schematic, veridical, dynamic, and conscious are expectation sources, not ITPRA stages.",
    "Expectancy-violation evidence does not validate five isolated ITPRA systems.",
    "ITPRA is not predictive processing, IDyOM, a complete learning theory, or a complete emotion theory.",
  ],
  qualifications: [
    "The response systems are functional theoretical constructs; their physiological independence remains unresolved.",
    "Huron’s adaptive explanations are proposals, not five experimentally established evolved modules.",
    "Contrastive valence should remain attributed to Huron and separated from later surprise-and-pleasure findings.",
    "Constructed audio and timelines teach distinctions; they do not measure the learner’s tension, reaction, appraisal, or physiology.",
    "Statistical learning supports learned expectation but does not establish the full ITPRA architecture.",
  ],
  minimumReading,
  minimumReadingLabel: "If you read five things",
  fullSources: [
    ...minimumReading,
    { citation: "Koelsch, S., Kilches, S., Steinbeis, N., &amp; Schelinski, S. (2008). Effects of unexpected chords and of performer’s expression on brain responses and electrodermal activity. <i>PLOS ONE, 3</i>(7), e2631.", contribution: "Naturalistic unexpected-chord evidence across ERP and skin conductance.", doi: "10.1371/journal.pone.0002631" },
    { citation: "Cheung, V. K. M., et al. (2019). Uncertainty and surprise jointly predict musical pleasure and brain activity. <i>Current Biology, 29</i>(23), 4084–4092.", contribution: "Complex uncertainty/surprise and pleasure relationship; not a direct ITPRA test.", doi: "10.1016/j.cub.2019.09.067" },
    { citation: "Miles, L. K., et al. (2017). A statistical analysis of the relationship between harmonic surprise and preference in popular music. <i>Frontiers in Human Neuroscience, 11</i>, 263.", contribution: "Statistical evidence compatible with both absolute and contrastive surprise hypotheses.", doi: "10.3389/fnhum.2017.00263" },
    { citation: "Pearce, M. T., &amp; Wiggins, G. A. (2012). Auditory expectation: The information dynamics of music perception and cognition. <i>Topics in Cognitive Science</i>.", contribution: "IDyOM and learned probabilistic expectation as a neighbouring computational programme.", doi: "10.1111/j.1756-8765.2012.01214.x" },
    { citation: "Clarke, E. (2008). Sweet Anticipation: Music and the Psychology of Expectation — review. <i>Music Analysis, 27</i>, 389–392.", contribution: "Critical review of the book’s scope and ambition.", doi: "10.1111/j.1468-2249.2009.00288.x" },
    { citation: "Meyer, L. B. (1956). <i>Emotion and Meaning in Music</i>. University of Chicago Press.", contribution: "Historical precursor for expectation, implication, delay, and affect." },
  ],
  relatedToLede: "These records share the expectation neighbourhood but answer different questions.",
  relatedTo: [
    { recordId: "meyers-expectancy-theory", relation: "develops the expectation-and-affect tradition of", body: "Meyer asks how implication, delay, and fulfilment contribute to meaning and affect; Huron asks what functionally distinct response systems unfold around an expected outcome." },
    { recordId: "narmours-implication-realization-theory", relation: "complements with a response-dynamics lens", body: "Narmour asks what a melodic interval implies locally; Huron asks what happens before and after an expectation is realised or violated." },
    { recordId: "generative-theory-of-tonal-music", relation: "contrasts structural hierarchy with", body: "GTTM models hierarchical musical organisation; Huron models expectation-related response dynamics. Huron’s Tension Response is not GTTM prolongational tension." },
  ],
  huron,
  provenance: [
    { glyph: "●", colour: "var(--teal)", label: "Huron theory", note: "Claims about ITPRA, response functions, expectation sources, prediction effect, contrastive valence, and adaptive proposals are attributed to Huron’s theoretical framework." },
    { glyph: "■", colour: "var(--red)", label: "empirical evidence", note: "Study summaries describe what expectancy-violation and statistical-learning work measured or modelled; they do not establish five isolated ITPRA systems." },
    { glyph: "▲", colour: "var(--gold-deep)", label: "constructed teaching example", note: "The on-time/delayed timing comparison, unexpected chord, timing markers, and lens-switch interaction are original teaching devices, not published Huron experiments." },
    { glyph: "✦", colour: "var(--plum-deep)", label: "Concept Lab synthesis", note: "The outcome-centred timeline, parallel source layer, overlapping response bands, and final architecture arrange the theory for learning and are not source diagrams." },
    { glyph: "?", colour: "var(--pen-3)", label: "bounded or unresolved", note: "The physiological independence of the systems, exact operationalisation, contrastive-valence mechanism, and universal emotional consequences remain open or qualified." },
  ],
};

export default huronsItpraTheory;

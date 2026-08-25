import type { ASACard, EvidenceXray, NarmourCandidate, NarmourRecordContent, TheoryRecord } from "./types";

function events(pitches: number[]) {
  return pitches.map((pitch, index) => ({ pitch, start: index * 0.6, duration: 0.42 }));
}

const relation = (label: string, status: NarmourCandidate["relations"][number]["status"], detail: string) => ({ label, status, detail });

const smallCandidates: NarmourCandidate[] = [
  {
    label: "E4 · continue nearby",
    body: "C4 → D4 → E4 continues upward with another small, nearby interval. It is a clear example of several small-interval tendencies aligning.",
    events: events([60, 62, 64]),
    physicalMovement: "up → up",
    intervalSizes: "2 st → 2 st",
    relations: [
      relation("REGISTRAL-DIRECTION IMPLICATION", "REALIZED", "The realised interval continues upward after a small upward implicative interval."),
      relation("INTERVALLIC-DIFFERENCE IMPLICATION", "REALIZED", "The realised interval is similar in size to the implicative interval."),
      relation("REGISTRAL RETURN", "DENIED", "The third tone does not return toward the opening C4."),
      relation("PROXIMITY", "REALIZED", "E4 is two semitones from D4."),
    ],
    colour: "var(--teal)",
  },
  {
    label: "C4 · return",
    body: "C4 → D4 → C4 changes direction and returns exactly to the opening pitch. The same continuation can realise return while denying the small-interval direction tendency.",
    events: events([60, 62, 60]),
    physicalMovement: "up → down",
    intervalSizes: "2 st → 2 st",
    relations: [
      relation("REGISTRAL-DIRECTION IMPLICATION", "DENIED", "The realised interval reverses instead of continuing upward."),
      relation("INTERVALLIC-DIFFERENCE IMPLICATION", "REALIZED", "The realised interval remains similar in size."),
      relation("REGISTRAL RETURN", "REALIZED", "The third tone returns exactly to C4."),
      relation("PROXIMITY", "REALIZED", "C4 is two semitones from D4."),
    ],
    colour: "var(--gold-deep)",
  },
  {
    label: "G4 · larger continuation",
    body: "C4 → D4 → G4 continues upward but expands to a five-semitone realised interval. Direction is realised; similarity of size and proximity are not strongly supported.",
    events: events([60, 62, 67]),
    physicalMovement: "up → up",
    intervalSizes: "2 st → 5 st",
    relations: [
      relation("REGISTRAL-DIRECTION IMPLICATION", "REALIZED", "The realised interval continues upward."),
      relation("INTERVALLIC-DIFFERENCE IMPLICATION", "DENIED", "The realised interval is not closely similar in size to 2 semitones."),
      relation("REGISTRAL RETURN", "DENIED", "The third tone does not return toward C4."),
      relation("PROXIMITY", "NOT STRONGLY DIAGNOSTIC", "Five semitones is less proximate than the nearby candidates in this teaching set."),
    ],
    colour: "var(--red)",
  },
];

const largeCandidates: NarmourCandidate[] = [
  {
    label: "A4 · continue upward",
    body: "C4 → G4 → A4 continues upward after the large leap. It realises proximity and a smaller realised interval, but denies the large-interval reversal tendency and return.",
    events: events([60, 67, 69]),
    physicalMovement: "up → up",
    intervalSizes: "7 st → 2 st",
    relations: [
      relation("REGISTRAL-DIRECTION IMPLICATION", "DENIED", "Physical direction continues upward, but a large upward implicative interval tends toward reversal."),
      relation("INTERVALLIC-DIFFERENCE IMPLICATION", "REALIZED", "The realised interval is substantially smaller than the 7-semitone implicative interval."),
      relation("REGISTRAL RETURN", "DENIED", "A4 does not return toward the opening C4."),
      relation("PROXIMITY", "REALIZED", "A4 is two semitones from G4."),
    ],
    colour: "var(--teal)",
  },
  {
    label: "F4 · small reversal",
    body: "C4 → G4 → F4 reverses direction with a small realised interval. It realises reversal, proximity, and smaller motion without producing exact registral return.",
    events: events([60, 67, 65]),
    physicalMovement: "up → down",
    intervalSizes: "7 st → 2 st",
    relations: [
      relation("REGISTRAL-DIRECTION IMPLICATION", "REALIZED", "The realised interval reverses after the large upward implicative interval."),
      relation("INTERVALLIC-DIFFERENCE IMPLICATION", "REALIZED", "The realised interval is smaller than the implicative interval."),
      relation("REGISTRAL RETURN", "NOT STRONGLY DIAGNOSTIC", "F4 moves down from G4 but does not return to the opening C4."),
      relation("PROXIMITY", "REALIZED", "F4 is two semitones from G4."),
    ],
    colour: "var(--gold-deep)",
  },
  {
    label: "C4 · exact return",
    body: "C4 → G4 → C4 reverses direction and returns exactly to the opening pitch. It realises return and reversal while denying proximity and smaller realised motion.",
    events: events([60, 67, 60]),
    physicalMovement: "up → down",
    intervalSizes: "7 st → 7 st",
    relations: [
      relation("REGISTRAL-DIRECTION IMPLICATION", "REALIZED", "The realised interval reverses after the large upward implicative interval."),
      relation("INTERVALLIC-DIFFERENCE IMPLICATION", "DENIED", "The realised interval is not smaller than the 7-semitone implicative interval."),
      relation("REGISTRAL RETURN", "REALIZED", "The third tone returns exactly to C4."),
      relation("PROXIMITY", "DENIED", "C4 is seven semitones from G4."),
    ],
    colour: "var(--plum-deep)",
  },
];

const cards = (items: [string, string, string][]): ASACard[] => items.map(([label, body, colour]) => ({ label, body, colour }));

const evidence: EvidenceXray[] = [
  { title: "Narmour (1990, 1992)", label: "process model", citation: "Narmour, E. (1990). <i>The Analysis and Cognition of Basic Melodic Structures: The Implication–Realization Model</i>; Narmour, E. (1992). <i>The Analysis and Cognition of Melodic Complexity: The Implication–Realization Model</i>. University of Chicago Press.", design: "Canonical formal theory and analytic architecture, not a single participant experiment.", testedLabel: "what it proposes", tested: "A formal account of melodic implication and realisation, including bottom-up and top-down systems, closure, archetypes, and complex melodic structures.", foundLabel: "what it contributes", found: "A cognitive-theoretical vocabulary for how local melodic intervals generate, realise, deny, and renew implications.", notTested: "That the theory’s full architecture is a deterministic algorithm or that every listener produces one identical analysis." },
  { title: "Narmour (1991)", label: "process model", citation: "Narmour, E. (1991). The top-down and bottom-up systems of musical implication: Building on Meyer’s theory of emotional syntax. <i>Music Perception, 9</i>(1), 1–26.", design: "Authorial theoretical clarification.", testedLabel: "what it clarifies", tested: "How two expectation systems contribute to musical implication and how conflict can occur within or between them.", foundLabel: "what it contributes", found: "The explicit bottom-up/top-down architecture and its relation to Meyer’s broader expectation tradition.", notTested: "A modern empirical proof of innate universality.", doi: "10.2307/40286156" },
  { title: "Cuddy & Lunney (1995)", label: "empirical study", citation: "Cuddy, L. L., &amp; Lunney, C. A. (1995). Expectancies generated by melodic intervals: Perceptual judgments of melodic continuity. <i>Perception &amp; Psychophysics, 57</i>(4), 451–462.", design: "24 participants; 12 musically trained and 12 untrained; eight two-tone intervals; 25 chromatic continuation tones; continuation ratings.", testedLabel: "what it tested", tested: "Whether quantified bottom-up predictors derived from Narmour’s model accounted for local continuity judgments.", foundLabel: "what it found", found: "Support for three Narmour-derived principles and a modified fourth; tonal-harmonic predictors also mattered; no significant training-group difference.", notTested: "The complete I–R theory, top-down style, complex archetypes, or universal innate status.", doi: "10.3758/BF03213071" },
  { title: "Schellenberg (1996)", label: "empirical study", citation: "Schellenberg, E. G. (1996). Expectancy in melody: Tests of the implication-realization model. <i>Cognition, 58</i>(1), 75–125.", design: "Three experiments using melodic materials from British and Chinese folk songs and Webern Lieder; continuation judgments.", testedLabel: "what it tested", tested: "Whether quantified I–R-derived principles predicted listeners’ continuation judgments across styles, training levels, and cultural groups.", foundLabel: "what it found", found: "The quantified model predicted judgments, but substantial collinearity showed that a simpler model could retain predictive performance.", notTested: "That Narmour was falsified, or that every original predictor is psychologically independent.", doi: "10.1016/0010-0277(95)00665-6" },
  { title: "Schellenberg (1997)", label: "process model", citation: "Schellenberg, E. G. (1997). Simplifying the implication-realization model of melodic expectancy. <i>Music Perception, 14</i>(3), 295–318.", design: "Reanalysis and simplification of quantified I–R predictors across previously examined continuation data.", testedLabel: "what it tested", tested: "Whether predictive information could be compressed without losing performance in the tested datasets.", foundLabel: "what it found", found: "A two-factor empirical model centred on pitch proximity and pitch reversal retained predictive accuracy.", notTested: "That Narmour’s full theory is identical to the two-factor model.", doi: "10.2307/40285723" },
  { title: "Schellenberg et al. (2002)", label: "empirical study", citation: "Schellenberg, E. G., Adachi, M., Purdy, K. T., &amp; McKinnon, M. C. (2002). Expectancy in melody: Tests of children and adults. <i>Journal of Experimental Psychology: General, 131</i>(4), 511–537.", design: "Adults and children rated continuation tones; children also sang continuations to two-tone stimuli.", testedLabel: "what it tested", tested: "How proximity and reversal-related expectations appear across development, and whether the simplified model predicts as well as the original.", foundLabel: "what it found", found: "Proximity appeared across tested ages; reversal-related expectations were stronger or more developed among older listeners; the two-factor model equalled or exceeded the original model.", notTested: "That proximity is definitively innate or reversal is purely learned.", doi: "10.1037/0096-3445.131.4.511" },
  { title: "Pearce & Wiggins (2006)", label: "review", citation: "Pearce, M. T., &amp; Wiggins, G. A. (2006). Expectation in melody: The influence of context and learning. <i>Music Perception, 23</i>(5), 377–405.", design: "Theoretical and computational critique of rule-like and learned accounts of melodic expectation.", testedLabel: "what it critiques", tested: "Whether rigid bottom-up rules can adequately capture context and the listener’s musical experience.", foundLabel: "what it contributes", found: "A statistical-learning boundary in which learned distributions may explain patterns attributed to separate bottom-up and top-down systems.", notTested: "That statistical learning disproves I–R or that local perceptual tendencies are irrelevant.", doi: "10.1525/mp.2006.23.5.377" },
];

const narmour: NarmourRecordContent = {
  analysisNote: "Constructed teaching examples. These controlled three-tone stimuli are original synthetic examples, not reproductions of a published Narmour experiment.",
  finalModelNote: "This branched architecture is Concept Lab synthesis: a teaching map of the theory’s relations, not a neural processing diagram or a claim that the theory is a deterministic pipeline.",
  identity: {
    knowledgeForm: "Formal cognitive theory / model of melodic implication and expectancy",
    status: "Foundational formal cognitive model",
    discipline: "Music Psychology / Music Cognition",
    branch: "Expectation & Prediction",
  },
  opening: {
    lede: "Begin with a tiny melodic problem: after two tones, what kinds of third tone feel more available? Narmour’s Implication–Realization Theory does not name one correct answer. It describes several local tendencies that a continuation may fulfil, partially fulfil, or deny.",
    question: "Which continuation feels more strongly implied?",
    note: "The question is about perceived implication, not musical ability or a correct-note score.",
  },
  twoNotes: {
    lede: "Two tones can point forward without pointing to one exact pitch. The first interval is implicative when it remains open enough to generate further relations; closure and nonclosure matter.",
    cards: cards([
      ["IMPLICATIVE INTERVAL", "A–B: the interval whose direction, size, proximity, return, and closure relations can generate implications.", "var(--teal)"],
      ["REALISED INTERVAL", "B–C: the next interval that may realise, partially realise, or deny those implications.", "var(--red)"],
      ["OPEN / NONCLOSED", "Not every two-note interval is automatically an implicative interval. An open relation keeps the chain available.", "var(--gold-deep)"],
    ]),
    note: "Plain-language teaching comes first. Full Narmourian symbology belongs behind an advanced view, if it is needed at all.",
  },
  thirdNote: {
    lede: "The third tone does not reveal whether the first interval was ‘right.’ It gives the listener a new relation to hear: what was realised, what was denied, and what remains open.",
    cards: cards([
      ["REALISE", "A relation implied by A–B is fulfilled by B–C.", "var(--teal)"],
      ["PARTIALLY REALISE", "Several tendencies are active; a continuation may fit some but not all.", "var(--gold-deep)"],
      ["DENY", "A tendency is not fulfilled. Denial is not an error or a bad melody.", "var(--red)"],
    ]),
    note: "One continuation can realise one principle while denying another. That is the central interaction logic of the page.",
  },
  implications: {
    lede: "C4 → D4 does not point to E4 alone. It can support concurrent implications about continuation, interval size, proximity, return, closure, and learned stylistic expectation.",
    cards: cards([
      ["DIRECTION", "Will the next interval continue upward or reverse?", "var(--teal)"],
      ["SIZE", "Will the next interval be similar in size or smaller?", "var(--gold-deep)"],
      ["PROXIMITY · RETURN · CLOSURE", "Will the next tone remain nearby, return toward the opening pitch, or reduce the active implication?", "var(--red)"],
      ["STYLE", "What does a learned idiom make available in this context?", "var(--plum-deep)"],
    ]),
    note: "Concept Lab synthesis: one interval generates a field of tendencies, not a single arrow to one note.",
  },
  small: {
    lede: "A clearly small implicative interval tends to invite continuation in the same direction, a relatively similar interval size, and a nearby next pitch.",
    cards: cards([
      ["C4 → D4", "Ascending 2 semitones: a small teaching example, not a hard perceptual category.", "var(--teal)"],
      ["CONTINUE", "E4 keeps the direction and remains nearby: several tendencies align.", "var(--gold-deep)"],
      ["RETURN CAN COMPETE", "C4 returns exactly but reverses direction: return is realised while direction is denied.", "var(--red)"],
    ]),
    note: "In the common quantified operationalisation, small means ≤5 semitones. Use TENDS TO, never MUST: this tested convention is not a biological switch.",
  },
  large: {
    lede: "A clearly large implicative interval tends to invite reversal and smaller realised motion, with possible registral-return relations. A large leap does not require immediate return.",
    cards: cards([
      ["C4 → G4", "Ascending 7 semitones: a clearly large teaching example.", "var(--red)"],
      ["REVERSE", "F4 reverses direction with a small realised interval.", "var(--gold-deep)"],
      ["RETURN", "C4 reverses and returns exactly, but denies proximity and smaller realised motion.", "var(--plum-deep)"],
    ]),
    note: "In the common quantified operationalisation, large means ≥7 semitones; 6 semitones is a threshold/neither case. These are tested conventions, not deterministic biological states.",
  },
  testable: {
    lede: "Researchers made part of I–R testable by converting some bottom-up relations into quantified predictors. This is an empirical operationalisation layer, not a replacement for Narmour’s full theory.",
    cards: cards([
      ["NARMOUR’S THEORY", "Implication, realisation, closure, bottom-up/top-down systems, process, reversal, archetypes, complex structures, and learned schemas.", "var(--plum-deep)"],
      ["QUANTIFIED LAYER", "Registral direction, intervallic difference, registral return, proximity, and closure.", "var(--teal)"],
      ["LATER SIMPLIFICATION", "Schellenberg’s empirical model compressed predictive information into pitch proximity and pitch reversal.", "var(--red)"],
    ]),
    note: "Do not call this section ‘Narmour’s Five Laws.’ The five predictors do not have identical theoretical status in the original architecture.",
  },
  moreThanDirection: {
    lede: "Direction is only one relation. The same physical movement can fulfil or deny a registral-direction implication depending on the size and direction of the implicative interval.",
    cards: cards([
      ["PHYSICAL MOVEMENT", "What the melody actually does: up → up, or up → down.", "var(--teal)"],
      ["REGISTRAL-DIRECTION IMPLICATION", "Whether that movement fulfils the tendency generated by the implicative interval.", "var(--red)"],
      ["PROXIMITY ≠ RETURN", "A small realised interval can be proximate without returning to the opening pitch; an exact return can be distant.", "var(--gold-deep)"],
      ["CLOSURE", "Teach qualitatively: direction change and relatively smaller realised motion can increase closure, but do not use an unverified closure score.", "var(--plum-deep)"],
    ]),
    note: "Closure is deliberately omitted from the checked Realise/Deny matrix because the page does not need false precision about competing operational definitions.",
  },
  realiseDeny: {
    lede: "Hold C4 → G4 fixed and inspect three continuations. Each one makes a different subset of relations visible. None is simply ‘the Narmour answer.’",
    question: "Which relations did this continuation realise, deny, or leave non-diagnostic?",
    note: "The matrix reports the standard large→smaller and return/proximity contrasts used for this constructed teaching example. Closure is taught separately rather than scored.",
  },
  process: {
    lede: "Once the basic three-note problem is clear, introduce Narmour’s native vocabulary. Process and reversal describe different organisations of local intervallic behaviour; they are not labels for every ascending fragment or every direction change.",
    cards: cards([
      ["PROCESS", "Continuation-oriented organisation: local tendencies carry forward in a relatively coherent direction or interval relation.", "var(--teal)"],
      ["REVERSAL", "Reversal-oriented organisation: a change in direction or intervallic behaviour becomes structurally salient.", "var(--red)"],
      ["ADVANCED VIEW", "If symbols and archetype labels are retained, reveal only the small set needed to explain process, reversal, and registral return.", "var(--plum-deep)"],
    ]),
    note: "Public teaching uses plain-language relations first. The full symbol system is not the learning goal.",
  },
  systems: {
    lede: "Narmour’s full theory has two expectation systems. Bottom-up local relations and top-down learned style converge on implication; neither is a chronological stage after the other.",
    cards: cards([
      ["BOTTOM-UP", "Local, parametric, relatively automatic relations involving direction, size, proximity, return, and closure.", "var(--teal)"],
      ["TOP-DOWN", "Learned stylistic and schematic knowledge: tonality, idiom, motivic familiarity, meter, phrase structure, and learned schemas.", "var(--gold-deep)"],
      ["CONFLICT", "Conflict can occur within a system or between systems. A style-based expectation can pull against a local interval tendency.", "var(--red)"],
      ["HISTORICAL CLAIM", "Narmour proposed bottom-up universality/innateness; later developmental and learning evidence qualifies its status.", "var(--plum-deep)"],
    ]),
    note: "Narmour’s theoretical proposal is not presented as settled modern fact.",
  },
  loop: {
    lede: "The theory does not stop after the third tone. The realised event becomes part of the next context, so melodic expectation keeps moving.",
    note: "Concept Lab synthesis. This is recursive explanatory motion, not a claim that I–R is identical to predictive coding, IDyOM, or Huron’s ITPRA model.",
  },
  cuddy: { lede: "Cuddy and Lunney tested quantified portions of the bottom-up model in a controlled continuation-rating task.", evidence: evidence[2], note: "Evidence for quantified local predictors, not confirmation of the complete I–R theory." },
  schellenberg96: { lede: "Schellenberg showed that a quantified I–R model could predict continuation judgments across materials and listener groups, while also exposing redundancy among its predictors.", evidence: evidence[3], note: "Predictive success and overspecification can coexist." },
  schellenberg97: { lede: "Schellenberg’s later empirical simplification retained predictive performance with pitch proximity and pitch reversal. Here pitch reversal is described qualitatively as a composite of reversal after proximity is disrupted and symmetric or registral-return-like patterns; no unverified formula or weights are shown. It should not be retroactively attributed to Narmour.", evidence: evidence[4], note: "A simplified empirical model is not the full theory it simplifies." },
  development: { lede: "Developmental evidence separates the trajectories of proximity and reversal without turning either into a simple innate/learned binary. The reversal result concerns direction changes after disruption of proximity and symmetric patterns.", evidence: evidence[5], note: "Proximity across tested ages does not prove innateness; older reversal expectations do not prove pure learning." },
  styleLearning: {
    lede: "Minimal three-tone experiments deliberately strip away much of real musical context. Return to the top-down system before treating their predictors as a complete account of expectation.",
    cards: cards([
      ["REAL MELODIES", "Carry tonality, style, motivic familiarity, meter, phrase structure, and learned schemas.", "var(--gold-deep)"],
      ["I–R TRADITION", "Explicit local implication principles interact with a learned stylistic system.", "var(--teal)"],
      ["STATISTICAL LEARNING", "Learned distributions over musical sequences offer a different explanation for some expectation patterns.", "var(--red)"],
      ["RESPONSIBLE SYNTHESIS", "Local perceptual tendencies and learned statistical regularities may both contribute; neither is declared the winner here.", "var(--plum-deep)"],
    ]),
    note: "Future records may address Statistical Learning of Music and IDyOM. They are not imported into this page.",
  },
  scope: {
    lede: "I–R is strongest as a formal account of local and chained melodic implication. Its evidence and concepts should not be expanded into a complete theory of music, emotion, or syntax.",
    explains: ["local melodic expectancy and continuation/reversal tendencies", "realisation and denial as relations among intervals", "proximity, registral return, intervallic difference, and aspects of closure", "interaction between local perceptual tendencies and learned style", "a formal bridge from Meyer’s broad implication tradition"],
    stops: ["one exact next-note prediction", "complete tonal cognition or musical syntax", "complete emotion theory", "universal innate melodic grammar", "the claim that five predictors are independent or exhaustive", "the claim that Schellenberg’s two-factor model is Narmour’s theory"],
    note: "The theory’s explanatory reach is bounded by the tested materials, operationalisations, listener populations, and historical version being described.",
  },
  families: [
    { label: "Small · C4 → D4", interval: "C4 → D4", semitones: 2, body: "A small ascending implicative interval: continuation, similar size, and proximity are tendencies to inspect.", candidates: smallCandidates },
    { label: "Large · C4 → G4", interval: "C4 → G4", semitones: 7, body: "A large ascending implicative interval: reversal, smaller motion, proximity, and possible return are tendencies to inspect.", candidates: largeCandidates },
  ],
  matrix: { lede: "The same C4 → G4 implicative interval can be followed by three different continuations. Read physical movement separately from what the large-interval implications predict.", candidates: largeCandidates, note: "Closure is not a matrix row. Its qualitative relation to direction change and smaller realised motion is taught separately because this record avoids an unverified score." },
};

export const narmoursImplicationRealizationTheory: TheoryRecord = {
  id: "narmours-implication-realization-theory",
  kind: "theory",
  slug: "narmours-implication-realization-theory",
  title: "Narmour’s Implication–Realization Theory",
  hook: "Continue — or reverse? What does one melodic interval imply about what may follow?",
  oneSentence: "A formal cognitive model of melodic implication and expectancy in which local intervals generate multiple tendencies that a following interval may realise, partially realise, or deny within learned musical context.",
  discipline: "music-psych",
  primaryBranch: "expectation-prediction",
  knowledgeForm: "formal-model",
  knowledgeFormQualifier: "Cognitive model of melodic implication",
  literatureStanding: ["foundational"],
  statusChip: "Foundational formal cognitive model",
  topics: ["Narmour", "implication–realization", "melodic expectancy", "music cognition", "melodic structure"],
  facts: ["one interval ≠ one note", "tendencies, not laws", "bottom-up × top-down", "realise some · deny others", "five predictors ≠ full theory"],
  origins: [
    { year: "1956", author: "Leonard B. Meyer", work: "Emotion and Meaning in Music", contribution: "Broad tradition of musical implication, expectation, delay, fulfilment, frustration, meaning, and affect." },
    { year: "1990", author: "Eugene Narmour", work: "The Analysis and Cognition of Basic Melodic Structures", contribution: "Formal account of basic melodic implication–realisation relations and bottom-up tendencies." },
    { year: "1991", author: "Eugene Narmour", work: "The Top-Down and Bottom-Up Systems of Musical Implication", contribution: "Explicit account of two interacting expectation systems and their possible conflicts." },
    { year: "1992", author: "Eugene Narmour", work: "The Analysis and Cognition of Melodic Complexity", contribution: "Extension from basic relations to complex melodic structures, archetypes, and learned stylistic implication." },
    { year: "1995", author: "Cuddy & Lunney", work: "Expectancies Generated by Melodic Intervals", contribution: "Quantified local bottom-up predictors tested against continuation ratings." },
    { year: "1996–1997", author: "Schellenberg", work: "Expectancy in Melody", contribution: "Model evaluation, redundancy critique, and empirical simplification to pitch proximity and pitch reversal." },
    { year: "2002", author: "Schellenberg, Adachi, Purdy & McKinnon", work: "Expectancy in Melody: Tests of Children and Adults", contribution: "Developmental comparison of proximity and reversal-related expectations." },
  ],
  trailLede: "The trail moves from Meyer’s broad implication tradition through Narmour’s formal melodic architecture, quantified local tests, model simplification, developmental evidence, and statistical-learning critiques.",
  oversimplificationsLede: "The dangerous shortcuts turn a relational theory into a five-law dashboard, a correct-note quiz, or a claim that every expectation is innate.",
  oversimplifications: [
    "Narmour’s full theory is not the same thing as five quantified predictors.",
    "One interval does not predict one exact next note.",
    "Small intervals tend to continue; they do not have to continue.",
    "Large intervals tend to reverse; they do not have to reverse.",
    "Physical direction is not the same as fulfilment of a registral-direction implication.",
    "Realisation is not correctness, and denial is not error.",
    "Closure is not automatically cadence, tonic arrival, or phrase boundary.",
    "Bottom-up and top-down systems interact; bottom-up is not a proven innate pipeline stage.",
    "Schellenberg’s two-factor model is not Narmour’s two-factor theory.",
    "Statistical learning is a later boundary, not a simple disproof or replacement.",
  ],
  qualifications: [
    "Exact interval thresholds are operational conventions used in particular tests, not universal biological boundaries.",
    "The tritone is treated as neither small nor large in the common quantified implementation.",
    "Closure is taught qualitatively and omitted from the checked matrix in this version.",
    "The evidence base is strongest for selected local predictors, not the full top-down and complex-structure architecture.",
    "Developmental and cross-style evidence qualifies universality without resolving the innate/learned question.",
  ],
  minimumReadingLabel: "If you read five things",
  minimumReading: [
    { citation: "Narmour, E. (1990). <i>The Analysis and Cognition of Basic Melodic Structures</i>; Narmour, E. (1992). <i>The Analysis and Cognition of Melodic Complexity</i>. University of Chicago Press.", contribution: "The two-volume formal I–R theory: basic and complex melodic structures." },
    { citation: "Narmour, E. (1991). The top-down and bottom-up systems of musical implication. <i>Music Perception, 9</i>(1), 1–26.", contribution: "The two-system architecture and its relation to Meyer.", doi: "10.2307/40286156" },
    { citation: "Cuddy, L. L., &amp; Lunney, C. A. (1995). Expectancies generated by melodic intervals. <i>Perception &amp; Psychophysics, 57</i>(4), 451–462.", contribution: "Quantified local predictors tested with continuation ratings.", doi: "10.3758/BF03213071" },
    { citation: "Schellenberg, E. G. (1996, 1997). Expectancy in melody; Simplifying the implication-realization model. <i>Cognition, 58</i>(1), 75–125; <i>Music Perception, 14</i>(3), 295–318.", contribution: "Predictive success, collinearity, and the proximity/reversal simplification.", doi: "10.1016/0010-0277(95)00665-6; 10.2307/40285723" },
    { citation: "Schellenberg, E. G., Adachi, M., Purdy, K. T., &amp; McKinnon, M. C. (2002). Expectancy in melody: Tests of children and adults. <i>JEP: General, 131</i>(4), 511–537.", contribution: "Developmental evidence concerning proximity and reversal.", doi: "10.1037/0096-3445.131.4.511" },
  ],
  fullSources: [
    { citation: "Meyer, L. B. (1956). <i>Emotion and Meaning in Music</i>. University of Chicago Press.", contribution: "Broader implication, expectation, delay, fulfilment, meaning, and affect tradition." },
    { citation: "Narmour, E. (1990). <i>The Analysis and Cognition of Basic Melodic Structures: The Implication–Realization Model</i>. University of Chicago Press.", contribution: "Canonical formal theory of basic melodic structures." },
    { citation: "Narmour, E. (1991). The top-down and bottom-up systems of musical implication. <i>Music Perception, 9</i>(1), 1–26.", contribution: "Authorial clarification of two interacting expectation systems.", doi: "10.2307/40286156" },
    { citation: "Narmour, E. (1992). <i>The Analysis and Cognition of Melodic Complexity: The Implication–Realization Model</i>. University of Chicago Press.", contribution: "Complex structures, archetypes, and stylistic/schematic implications." },
    { citation: "Cuddy, L. L., &amp; Lunney, C. A. (1995). Expectancies generated by melodic intervals. <i>Perception &amp; Psychophysics, 57</i>(4), 451–462.", contribution: "Quantified local bottom-up predictors tested in a continuation-rating task.", doi: "10.3758/BF03213071" },
    { citation: "Schellenberg, E. G. (1996). Expectancy in melody: Tests of the implication-realization model. <i>Cognition, 58</i>(1), 75–125.", contribution: "Model evaluation across musical materials, styles, and listener groups; redundancy critique.", doi: "10.1016/0010-0277(95)00665-6" },
    { citation: "Schellenberg, E. G. (1997). Simplifying the implication-realization model of melodic expectancy. <i>Music Perception, 14</i>(3), 295–318.", contribution: "Empirical simplification to pitch proximity and pitch reversal.", doi: "10.2307/40285723" },
    { citation: "Schellenberg, E. G., Adachi, M., Purdy, K. T., &amp; McKinnon, M. C. (2002). Expectancy in melody: Tests of children and adults. <i>Journal of Experimental Psychology: General, 131</i>(4), 511–537.", contribution: "Developmental evidence concerning proximity and reversal-related expectations.", doi: "10.1037/0096-3445.131.4.511" },
    { citation: "Pearce, M. T., &amp; Wiggins, G. A. (2006). Expectation in melody: The influence of context and learning. <i>Music Perception, 23</i>(5), 377–405.", contribution: "Statistical-learning and context boundary for rule-like I–R implementations.", doi: "10.1525/mp.2006.23.5.377" },
  ],
  relatedTo: [
    { recordId: "meyers-expectancy-theory", relation: "formalises a local melodic portion of", body: "Meyer supplies the broader implication, expectation, delay, fulfilment, meaning, and affect tradition; Narmour develops a formal melodic implication–realisation architecture." },
    { recordId: "gestalt-principles-in-music", relation: "shares perceptual context with", body: "Proximity, continuation, similarity, and closure help frame the history, but I–R is not Gestalt psychology." },
    { recordId: "tonal-hierarchy", relation: "addresses a different expectation question from", body: "Tonal Hierarchy asks how stable or fitting a pitch is in tonal context; I–R asks what a melodic interval implies about continuation." },
    { recordId: "generative-theory-of-tonal-music", relation: "addresses a different structural problem from", body: "GTTM describes hierarchical tonal structure; I–R describes local and chained melodic implication and realisation." },
  ],
  provenance: [
    { glyph: "●", colour: "var(--teal)", label: "original theory", note: "Claims about Narmour’s implication–realisation architecture, bottom-up/top-down systems, closure, process, reversal, and complex structures are grounded in the canonical theory sources." },
    { glyph: "■", colour: "var(--gold-deep)", label: "faithful paraphrase", note: "The five-principle operationalisation, developmental findings, collinearity critique, and statistical-learning boundary paraphrase the cited empirical and theoretical literature." },
    { glyph: "▲", colour: "var(--red)", label: "constructed teaching example", note: "C4 → D4, C4 → G4, their candidate continuations, and all audio are original synthetic teaching examples, not published stimuli." },
    { glyph: "✦", colour: "var(--plum-deep)", label: "Concept Lab synthesis", note: "The branched interaction model, implication loop, and three-layer historical visual are editorial synthesis that keeps the theory and later operationalisations distinct." },
    { glyph: "?", colour: "var(--pen-3)", label: "bounded or unresolved", note: "Innateness, universality, exact closure scoring, exact pitch-reversal weighting, and the relation between local rules and learned statistical structure remain qualified rather than settled." },
  ],
  narmour,
};

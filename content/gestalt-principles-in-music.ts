import type { AudioEvent, AudioPreset, GestaltRecordContent, TheoryRecord } from "./types";

const note = (pitch: number, start: number, duration = 0.16): AudioEvent => ({ pitch, start, duration });

const boundaryA: AudioEvent[] = [
  note(60, 0), note(62, .24), note(64, .48), note(65, .72),
  note(67, 1.20), note(69, 1.44), note(67, 1.68), note(65, 1.92),
];

const boundaryB: AudioEvent[] = [
  note(60, 0), note(62, .24), note(64, .48), note(65, .72),
  note(67, .96), note(69, 1.44), note(67, 1.68), note(65, 1.92),
];

const registerSequence = [60, 62, 64, 65, 67, 79, 77, 75];
const regularRegister: AudioEvent[] = registerSequence.map((pitch, index) => note(pitch, index * .24));
const conflictRegister: AudioEvent[] = registerSequence.map((pitch, index) => note(pitch, index === 5 ? 1.44 : index === 6 ? 1.68 : index === 7 ? 1.92 : index === 4 ? 1.20 : index * .24));

const boundaryPresets: AudioPreset[] = [
  {
    label: "Gap after event 04",
    body: "The notes, register, timbre, and gain stay the same. A larger temporal gap appears after event 04, offering one candidate boundary.",
    events: boundaryA,
    variable: "temporal spacing only",
    controls: "MIDI 60–69 sequence; 160-ms triangle tones; 240-ms ordinary onset interval; one 480-ms interval after event 04; 0.12 peak gain.",
    colour: "var(--teal)",
    markers: [{ after: 4, label: "B" }],
  },
  {
    label: "Gap after event 05",
    body: "The same notes appear in the same order, with the same total duration. Moving the larger gap changes which events are available as a group.",
    events: boundaryB,
    variable: "temporal spacing only",
    controls: "MIDI 60–69 sequence; 160-ms triangle tones; 240-ms ordinary onset interval; one 480-ms interval after event 05; 0.12 peak gain.",
    colour: "var(--red)",
    markers: [{ after: 5, label: "B" }],
  },
];

const conflictPresets: AudioPreset[] = [
  {
    label: "A · time favours X",
    body: "A larger gap after event 04 suggests boundary X. The pitch contour remains close and does not introduce the competing register break.",
    events: boundaryA,
    variable: "proximity → boundary X",
    controls: "MIDI 60, 62, 64, 65, 67, 69, 67, 65; one 480-ms gap after event 04; 160-ms triangle tones; 0.12 peak gain.",
    colour: "var(--teal)",
    markers: [{ after: 4, label: "X" }],
  },
  {
    label: "B · register favours Y",
    body: "The timing is regular, but a large register change between events 05 and 06 suggests boundary Y.",
    events: regularRegister,
    variable: "register change → boundary Y",
    controls: "MIDI 60, 62, 64, 65, 67, 79, 77, 75; 240-ms onset intervals; 160-ms triangle tones; 0.12 peak gain.",
    colour: "var(--gold-deep)",
    markers: [{ after: 5, label: "Y" }],
  },
  {
    label: "C · the cues conflict",
    body: "Now the larger gap still suggests X, while the register change still suggests Y. The point is not to find a winner but to notice the competing organisation.",
    events: conflictRegister,
    variable: "proximity X × register change Y",
    controls: "Same MIDI sequence, timbre, duration, gain, and register change as B; one 480-ms gap after event 04; 160-ms triangle tones; 0.12 peak gain.",
    colour: "var(--red)",
    markers: [{ after: 4, label: "X" }, { after: 5, label: "Y" }],
  },
];

const card = (label: string, body: string, colour: string) => ({ label, body, colour });

const gestaltContent: GestaltRecordContent = {
  opening: {
    lede: "Begin with a small sound experiment. The same synthetic notes can support different groupings when one temporal gap moves. There is no score and no musical-ability interpretation.",
    presets: boundaryPresets,
    note: "The notes did not change. The grouping cue did. This is an original constructed audio teaching example, not a reproduction of Wertheimer’s historical tapping stimulus.",
  },
  problem: {
    lede: "Listeners do not ordinarily experience a sequence as a pile of isolated atoms. Perception organises events into groups, boundaries, figures, and larger wholes.",
    cards: [
      card("SENSORY EVENTS", "Successive or simultaneous sounds arrive as physical events with relationships in time, pitch, intensity, and form.", "var(--gold-deep)"),
      card("PERCEPTUAL ORGANISATION", "Some events become available as belonging together, while others are separated or placed in another organisation.", "var(--teal)"),
      card("THE BOUNDARY", "A listener experiences a grouping; that grouping need not be identical to a silence, a score mark, or one objectively correct division.", "var(--red)"),
    ],
    note: "Wertheimer’s original grouping problem asks how stimulus factors influence experienced organisation. Gestalt is broader than ASA: it asks how elements form groups and wholes, while ASA develops an auditory framework for streams and source-related organisation.",
  },
  whole: {
    lede: "The familiar slogan says that the whole is more than the sum of the parts. A more precise lesson is that the perceptual role of a part can depend on the whole in which it is organised.",
    cases: [
      { label: "ORGANISATION A", before: "60 · 62 · 64", central: "65", after: "— 67 · 69", role: "the central event can feel like the end of a local group", colour: "var(--teal)" },
      { label: "ORGANISATION B", before: "60 · 62 — 64", central: "65", after: "· 67 · 69", role: "the same event can feel like a continuation into the next group", colour: "var(--red)" },
    ],
    note: "The event itself is unchanged; its perceptual role is relational. This is a faithful whole–part teaching interpretation, not a claim that wholes are mystical entities.",
  },
  proximity: {
    lede: "Temporal proximity is a relational tendency: closer events often group together, and a longer gap often creates a candidate boundary. The effect depends on the surrounding pattern.",
    cards: [
      card("CLOSER EVENTS", "A short interval can make neighbouring events available as one local unit.", "var(--teal)"),
      card("LONGER GAP", "A pause or expanded interval can make a boundary more available without guaranteeing that every listener hears it there.", "var(--red)"),
      card("NO MAGIC NUMBER", "Do not turn a tendency into a universal millisecond threshold. Other cues and the wider configuration matter.", "var(--gold-deep)"),
    ],
    note: "Wertheimer explicitly extends proximity to auditory organisation through tapping-style examples. The timing interaction above is a constructed teaching example, not a historical replication.",
  },
  similarity: {
    lede: "Similarity is multidimensional. Like events may group by pitch or register, timbre, intensity, articulation, duration, or rhythmic character, depending on the material.",
    cards: [
      card("LIKE WITH LIKE", "Similar events can become perceptually related even when their temporal spacing is held constant.", "var(--teal)"),
      card("NOT JUST PITCH", "Similarity is a family of possible relations, not a synonym for same pitch.", "var(--gold-deep)"),
      card("REINFORCE OR OPPOSE", "Similarity can support proximity or point toward a competing organisation.", "var(--red)"),
    ],
    note: "Wertheimer describes similarity as a tendency for like parts to band together and explicitly connects it to auditory experience. The exact cue weight is material- and listener-dependent.",
  },
  conflict: {
    lede: "A short melody can make the competition visible. Time can pull toward one boundary while a register change pulls toward another.",
    presets: conflictPresets,
    question: "Where does the phrase break for you?",
    note: "The three conditions are a controlled Concept Lab construction. They make cue competition observable without scoring or collecting a perceptual answer.",
  },
  laws: {
    lede: "Historical writing used words such as laws, factors, and principles of organisation. Modern teaching should emphasise perceptual tendencies, grouping factors, and relative constraints.",
    cards: [
      card("CAN REINFORCE", "Two cues can point toward the same grouping and make it more prominent.", "var(--teal)"),
      card("CAN COMPETE", "Different cues can favour different boundaries or organisations.", "var(--red)"),
      card("CAN STAY AMBIGUOUS", "A percept may be weak, graded, unstable, or different across listeners.", "var(--gold-deep)"),
    ],
    note: "The cue-conflict interaction is the teaching evidence for a non-deterministic account. Do not write: if proximity X, then group Y always.",
  },
  continuation: {
    lede: "Good continuation asks which unfolding contour or trajectory preserves the organisation already in progress. It is a perceptual question before it becomes a question about musical expectation.",
    options: [
      card("CONTINUE THE DIRECTION", "A continuation that preserves the established direction can feel more coherent.", "var(--teal)"),
      card("CONTINUE THE SMOOTHNESS", "A gradual contour can remain within one organisation more readily than an abrupt break.", "var(--gold-deep)"),
      card("CHANGE THE ORGANISATION", "A sharp change can make a new group, line, or figure more available.", "var(--red)"),
    ],
    note: "Good continuation is about how an unfolding pattern is organised. Meyer asks what that organisation implies about possible future events and how delay or fulfilment can affect meaning and affect.",
  },
  closure: {
    lede: "An incomplete or interrupted configuration may be organised toward a bounded or coherent whole. In music, this can connect to phrase experience without making closure identical to tonal resolution.",
    cards: [
      card("PERCEPTUAL CLOSURE", "Elements can be organised as a bounded figure or completed configuration.", "var(--teal)"),
      card("MUSICAL BRIDGE", "Meyer later uses completion and closure in a music-specific account of pattern, expectation, and meaning.", "var(--gold-deep)"),
      card("KEEP DISTINCT", "Closure is not automatically tonic, cadence, tonal resolution, expectancy fulfilment, or emotional release.", "var(--red)"),
    ],
    note: "Closure is retained as a compact perceptual bridge, not a second Tonal Hierarchy or Meyer record.",
  },
  pragnanz: {
    lede: "Why does one organisation feel better or more stable than another? Prägnanz is best taught as a historical ambition and a theoretical problem.",
    historical: "Organisation tends toward a relatively ‘good’ form under prevailing conditions. This includes a concern with relative simplicity or minimum organisation, but not a rule that the brain always picks the objectively simplest object.",
    problem: "‘Good’ and ‘simple’ were not specified precisely enough to serve as a complete deterministic mechanism. A later formalisation must say what is being optimised and under which conditions.",
    later: ["simplicity", "minimum principles", "likelihood", "Bayesian interpretations", "self-organisation"],
    note: "Later frameworks are shown only as reformulations of an enduring problem. They are not classical Gestalt concepts and are not taught in depth here.",
  },
  hierarchy: {
    lede: "A local group can become part of a larger group. This restrained hierarchy moves from events to motives, phrases, and larger sections without pretending that one local cue explains an entire piece.",
    levels: [
      card("EVENTS", "Individual notes, attacks, or sound events.", "var(--teal)"),
      card("SMALL GROUPS / MOTIVES", "Locally related events become a unit that can recur or contrast.", "var(--gold-deep)"),
      card("PHRASES", "Smaller units can be heard as parts of a larger bounded organisation.", "var(--red)"),
      card("LARGER SECTIONS", "Higher grouping is possible, but complete musical form requires more than this local perceptual account.", "var(--plum-deep)"),
    ],
    note: "The general part–whole possibility fits Gestalt. Explicit recursive musical hierarchy and formal rule systems belong to later theories such as GTTM.",
  },
  gttm: {
    lede: "Lerdahl and Jackendoff formalised aspects of musical grouping through grouping well-formedness rules and grouping preference rules. This is a historical bridge, not a compressed GTTM record.",
    stages: [
      card("GESTALT", "Broad perceptual organisation ideas: proximity, similarity, continuation, whole–part relations.", "var(--teal)"),
      card("MUSIC-SPECIFIC ADAPTATION", "Musical grouping applies those ideas to timing, attack, register, length, and larger structure.", "var(--gold-deep)"),
      card("GTTM PREFERENCE RULES", "A formal music-cognitive system proposes defeasible constraints rather than absolute laws.", "var(--red)"),
      card("TESTABLE PREDICTIONS", "Later studies compare rule-derived boundary predictions with listeners’ actual segmentation.", "var(--plum-deep)"),
    ],
    note: "GTTM preference rules can reinforce, conflict, vary in strength, and be overridden. Later rules are not already present in Wertheimer’s 1923 paper.",
  },
  deliege: {
    lede: "Deliège is later musical grouping evidence, not Gestalt confirmation. The study tests whether formal grouping-rule predictions correspond to listener segmentation.",
    evidence: {
      title: "Deliège (1987)", label: "empirical study", citation: "Deliège, I. (1987). Grouping conditions in listening to music: An approach to Lerdahl and Jackendoff’s grouping preference rules. <i>Music Perception, 4</i>(4), 325–359.", design: "Two experiments: Western art-music repertoire in the first, then simple melodic sequences designed to create conflicts among rule pairs in the second; musicians and nonmusicians were compared.", testedLabel: "what it tested", tested: "Whether listener segmentations followed later Lerdahl and Jackendoff grouping-rule predictions, whether both listener groups used them, and whether the rules covered grouping situations equally well.", foundLabel: "what it found", found: "Several rules showed perceptual relevance, but salience differed; nonmusicians had more difficulty with repertoire material; the groups were not radically different; additional principles appeared necessary; some length-based rules were problematic.", notTested: "Direct validation of classical Gestalt psychology, a universal law list, or a complete account of musical segmentation.", doi: "10.2307/40285378",
    },
    note: "Faithful summary of later GTTM-rule testing. ‘Gestalt principles were experimentally validated’ is not an acceptable description.",
  },
  frankland: {
    lede: "Frankland and Cohen quantify four local GTTM grouping rules and compare them with listeners’ boundary placements. The value of the study is that formal grouping predictions can be tested and may contribute unequally.",
    evidence: {
      title: "Frankland & Cohen (2004)", label: "empirical study", citation: "Frankland, B. W., &amp; Cohen, A. J. (2004). Parsing of melody: Quantification and testing of the local grouping rules of Lerdahl and Jackendoff’s <i>A Generative Theory of Tonal Music</i>. <i>Music Perception, 21</i>(4), 499–543.", design: "Experiment 1: n = 123, with two familiar nursery-rhyme melodies and one unfamiliar tonal melody. Experiment 2: n = 33, with different familiar and unfamiliar melodies, including an unfamiliar tonal melody from the classical repertoire; listeners marked boundaries across repetitions.", testedLabel: "what it tested", tested: "Rest, attack-point, register-change, and length-change rules against listeners’ actual melody-boundary placements.", foundLabel: "what it found", found: "Attack-point and Rest were substantially more useful predictors in the tested materials than Register change or Length change. Musical training mattered only for the unfamiliar classical melody in Experiment 2.", notTested: "That proximity won universally, that all GTTM rules contribute equally, or that the results directly validate classical Gestalt theory.", doi: "10.1525/mp.2004.21.4.499",
    },
    note: "Material- and task-specific evidence about later formalised musical grouping rules, not a general law of perception.",
  },
  culture: {
    lede: "Iversen, Patel, and Ohgushi show why a fixed, culture-invariant account is too strong. Their evidence concerns rhythmic auditory grouping biases in native English- and Japanese-speaking listeners.",
    cards: [
      card("GROUP DIFFERENCE", "The listener groups differed in their preferences for simple rhythmic tone sequences, especially for duration patterns.", "var(--teal)"),
      card("POSSIBLE EXPERIENCE", "The authors proposed that native-language rhythmic experience may help explain the pattern.", "var(--gold-deep)"),
      card("CAREFUL BOUNDARY", "The result may reflect experience and culture; it does not prove that language causes the difference or that all grouping is learned.", "var(--red)"),
    ],
    note: "Use this evidence narrowly: some auditory grouping biases can be shaped by experience. Do not infer that no grouping principle is universal.",
  },
  scope: {
    lede: "Gestalt is useful for perceptual organisation, but it should not be expanded into a complete theory of music cognition.",
    explains: ["why musical events form groups", "local segmentation and candidate boundaries", "temporal and similarity-based grouping", "organisation by continuation", "aspects of perceptual closure", "competing grouping interpretations", "broad part–whole relationships", "conceptual foundations for later musical grouping theories"],
    stops: ["complete musical grammar", "tonality or tonal function", "musical expectancy", "emotion or affect", "auditory source recovery", "whole-piece formal analysis", "one objectively correct segmentation", "a universal grouping threshold"],
    note: "This stopping point protects the record’s identity: a perceptual tradition and principle family, not one unified music-specific causal theory.",
  },
  lineage: {
    lede: "What came after Gestalt is a branching history, not one theory becoming progressively more correct.",
    nodes: [
      card("CLASSICAL GESTALT", "Wertheimer, Koffka, and Köhler develop a broad tradition of perceptual organisation and part–whole analysis.", "var(--teal)"),
      card("MUSIC FORMALISATION", "Meyer and GTTM adapt selected organisational ideas to musical continuation, closure, grouping, and structure.", "var(--gold-deep)"),
      card("EMPIRICAL TESTS", "Deliège and Frankland & Cohen test later musical grouping predictions against listener segmentation.", "var(--red)"),
      card("EXPERIENCE BOUNDARY", "Iversen et al. show why rhythmic grouping cannot simply be treated as culture-invariant.", "var(--plum-deep)"),
    ],
    note: "Historically layered synthesis. The layers connect, but none is presented as the final or complete version of the others.",
  },
};

export const gestaltPrinciplesInMusic: TheoryRecord = {
  id: "gestalt-principles-in-music",
  kind: "theory",
  slug: "gestalt-principles-in-music",
  title: "Gestalt Principles in Music",
  hook: "Where is the boundary? Why do separate musical events become perceptual groups at all?",
  oneSentence: "A perceptual tradition and principle family for understanding how musical events become groups, boundaries, and larger wholes through interacting cues rather than one deterministic law.",
  discipline: "music-psych",
  topics: ["music cognition", "perceptual organisation", "auditory grouping", "Gestalt psychology"],
  facts: ["events → groups", "cues compete", "whole changes part", "boundaries are percepts", "Gestalt ≠ GTTM"],
  statusChip: "borrowed perceptual framework",
  ideaLede: "Gestalt Principles in Music is a music-facing teaching record about perceptual organisation. It borrows a broad Gestalt tradition without pretending that the tradition is one unified music-specific causal theory.",
  originsNote: "The historical chain runs from classical Gestalt grouping ideas through music-specific adaptations, later GTTM grouping preference rules, empirical tests of those rules, and evidence that experience can shape some rhythmic grouping biases.",
  trailLede: "The evidence trail is historically layered: Wertheimer’s grouping problem; Koffka and Köhler’s broader whole–part tradition; Meyer and GTTM’s music-specific adaptations; Deliège and Frankland & Cohen’s tests of later musical grouping rules; and Iversen et al.’s experience boundary.",
  origins: [
    { year: "1923", author: "Max Wertheimer", work: "Laws of Organization in Perceptual Forms", contribution: "Primary historical anchor for proximity, similarity, auditory extension, cooperation, opposition, and configuration." },
    { year: "1935", author: "Kurt Koffka", work: "Principles of Gestalt Psychology", contribution: "Classical whole–part and functional-whole framing." },
    { year: "1956", author: "Leonard B. Meyer", work: "Emotion and Meaning in Music", contribution: "Later music-specific use of continuation, completion, closure, expectation, meaning, and affect." },
    { year: "1983", author: "Fred Lerdahl & Ray Jackendoff", work: "A Generative Theory of Tonal Music", contribution: "Formal musical grouping structure and grouping preference rules." },
    { year: "1987", author: "Irene Deliège", work: "Grouping Conditions in Listening to Music", contribution: "Empirical tests of later musical grouping-rule predictions." },
    { year: "2004", author: "Bradley W. Frankland & Annabel J. Cohen", work: "Parsing of Melody", contribution: "Quantified tests of four local GTTM grouping rules." },
    { year: "2008", author: "Iversen, Patel & Ohgushi", work: "Perception of Rhythmic Grouping Depends on Auditory Experience", contribution: "Evidence that some rhythmic grouping biases vary with listener experience and culture." },
  ],
  gestalt: gestaltContent,
  oversimplificationsLede: "These shortcuts turn a flexible perceptual tradition into a false law book.",
  oversimplifications: [
    "There are exactly <b>five Gestalt laws</b> and they explain all musical form.",
    "Wertheimer invented the modern textbook law list and later GTTM rules were already present in 1923.",
    "Proximity <b>always determines</b> the boundary.",
    "Similarity means <b>same pitch</b> only.",
    "Grouping has a universal millisecond threshold.",
    "A phrase boundary must be a silence, physical cut, or composer’s explicit mark.",
    "The whole is just parts plus extra value.",
    "Prägnanz means the simplest interpretation always wins.",
    "Closure means tonic resolution or cadence.",
    "Good continuation means musical expectancy.",
    "Gestalt is Meyer, ASA, or GTTM under another name.",
    "Deliège and Frankland & Cohen proved classical Gestalt laws.",
    "All grouping is innate, or all grouping is culturally learned.",
    "Every listener should segment a melody identically.",
  ],
  qualifications: [
    "The two audio interactions are original synthetic constructions, not historical recordings, replications, or published experimental evidence.",
    "The opening manipulation changes temporal spacing only; the cue-conflict conditions document their pitch, timing, timbre, gain, and duration controls separately.",
    "Deliège and Frankland & Cohen concern later GTTM grouping-rule predictions, not direct validation of classical Gestalt psychology.",
    "Prägnanz remains an historically important but under-specified theoretical ambition.",
    "Iversen et al. support a narrow experience/culture boundary for rhythmic grouping, not a complete account of all Gestalt principles.",
    "The final diagram is a Concept Lab synthesis and should not be attributed to one original author.",
  ],
  minimumReadingLabel: "If you read six things",
  minimumReading: [
    { citation: "Wertheimer, M. (1923). Laws of organization in perceptual forms. In <i>A Source Book of Gestalt Psychology</i> (1938 translation), 71–88.", contribution: "Primary historical source for proximity, similarity, auditory extension, cooperation, opposition, and whole–part organisation." },
    { citation: "Koffka, K. (1935). <i>Principles of Gestalt Psychology</i>.", contribution: "Classical whole–part and functional-whole framing." },
    { citation: "Wagemans, J., et al. (2012). A century of Gestalt psychology in visual perception: I. Perceptual grouping and figure-ground organization. <i>Psychological Bulletin, 138</i>(6), 1172–1217.", contribution: "Contemporary review and clarification of perceptual grouping and figure–ground organisation.", doi: "10.1037/a0029333" },
    { citation: "Lerdahl, F., &amp; Jackendoff, R. (1983). <i>A Generative Theory of Tonal Music</i>.", contribution: "Music-specific formalisation of grouping structure and preference rules." },
    { citation: "Deliège, I. (1987). Grouping conditions in listening to music: An approach to Lerdahl and Jackendoff’s grouping preference rules. <i>Music Perception, 4</i>(4), 325–359.", contribution: "Empirical tests of later musical grouping-rule predictions; not Gestalt confirmation.", doi: "10.2307/40285378" },
    { citation: "Frankland, B. W., &amp; Cohen, A. J. (2004). Parsing of melody: Quantification and testing of the local grouping rules of Lerdahl and Jackendoff’s <i>A Generative Theory of Tonal Music</i>. <i>Music Perception, 21</i>(4), 499–543.", contribution: "Quantified listener tests of four local GTTM grouping rules; not direct validation of classical Gestalt psychology.", doi: "10.1525/mp.2004.21.4.499" },
  ],
  fullSources: [
    { citation: "Wagemans, J., et al. (2012). A century of Gestalt psychology in visual perception: II. Conceptual and theoretical foundations. <i>Psychological Bulletin, 138</i>(6), 1218–1252.", contribution: "Contemporary discussion of whole–part relations, Prägnanz, emergence, self-organisation, and the need for clearer theoretical foundations." },
    { citation: "Meyer, L. B. (1956). <i>Emotion and Meaning in Music</i>. University of Chicago Press.", contribution: "Later music-specific bridge for continuation, completion, closure, expectation, meaning, and affect." },
    { citation: "Jackendoff, R., &amp; Lerdahl, F. (2006). The capacity for music: What is it, and what’s special about it? <i>Cognition, 100</i>(1), 33–72.", contribution: "Clarifies GTTM grouping as defeasible preference rules and distinguishes general Gestalt grouping from music-specific organisation.", doi: "10.1016/j.cognition.2005.11.005" },
    { citation: "Bregman, A. S. (1990). <i>Auditory Scene Analysis: The Perceptual Organization of Sound</i>. MIT Press.", contribution: "Related auditory-specific framework for sequential and simultaneous organisation, streams, source inference, schemas, and attention." },
    { citation: "Iversen, J. R., Patel, A. D., &amp; Ohgushi, K. (2008). Perception of rhythmic grouping depends on auditory experience. <i>Journal of the Acoustical Society of America, 124</i>(4), 2263–2271.", contribution: "Narrow evidence that rhythmic grouping preferences differ between native English- and Japanese-speaking listeners and may reflect auditory experience.", doi: "10.1121/1.2973189" },
  ],
  relatedToLede: "This record sits beside other music-psychology lenses. The connections are useful precisely because the records ask different psychological questions.",
  relatedTo: [
    { recordId: "meyers-expectancy-theory", relation: "connects perceptual organisation to", body: "Gestalt asks how events become organised patterns; Meyer asks what those organised relations imply about future events, meaning, and affect." },
    { recordId: "auditory-scene-analysis", relation: "provides a broad neighbour to", body: "Gestalt is a broad perceptual tradition; ASA is an auditory-specific framework for streams, source-related organisation, mixtures, and attention." },
    { recordId: "tonal-hierarchy", relation: "keeps a different organisation from", body: "A note can belong to a perceptual group and have a tonal function. Generic grouping and context-dependent tonal hierarchy are different questions." },
  ],
  provenance: [
    { glyph: "●", colour: "var(--red)", label: "Source-grounded historical and theoretical claims", note: "Wertheimer, Koffka, Wagemans, Meyer, GTTM, ASA, Prägnanz, whole–part framing, and authorship distinctions are tied to the cited historical and review sources." },
    { glyph: "■", colour: "var(--teal)", label: "Source-grounded empirical findings and faithful explanations", note: "Deliège, Frankland & Cohen, and Iversen et al. are presented as bounded evidence about later musical grouping predictions or rhythmic experience, not as direct proof of classical Gestalt theory." },
    { glyph: "▲", colour: "var(--gold-deep)", label: "Constructed teaching and audio examples", note: "The temporal-gap and cue-conflict stimuli are original synthetic examples. Their pitch, timing, duration, timbre, gain, manipulated cue, and held constants are documented in the content data." },
    { glyph: "✦", colour: "var(--pen-3)", label: "Concept Lab synthesis", note: "The branched competitive model, whole–part visual, historically layered evidence X-ray, section sequence, and relations to nearby records are editorial teaching arrangements." },
    { glyph: "?", colour: "var(--pen-3)", label: "Debated, broad, or under-specified", note: "Prägnanz, exact cue weights, universal versus learned grouping, listener variation, and the boundaries of transfer from Gestalt to music remain explicitly qualified." },
  ],
};

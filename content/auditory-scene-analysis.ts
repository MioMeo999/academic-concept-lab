import type { ASARecordContent, AudioEvent, AudioPreset, TheoryRecord } from "./types";

const streamPattern = (a: number, b: number, duration: number, spacing: number, repetitions: number): AudioEvent[] =>
  Array.from({ length: repetitions * 3 }, (_, index) => ({
    pitch: index % 3 === 1 ? b : a,
    start: index * spacing,
    duration,
  }));

const streamPresets: AudioPreset[] = [
  {
    label: "Close + slow",
    body: "The high and low events remain close in pitch and comfortably spaced in time: an integrated, galloping pattern may be more available.",
    events: streamPattern(60, 64, 0.24, 0.48, 4),
    variable: "frequency separation + presentation rate",
    controls: "A = MIDI 60 / 261.6 Hz; B = MIDI 64 / 329.6 Hz; 240-ms triangle tones; 480-ms onset spacing; four ABA cycles; 0.12 peak gain.",
    colour: "var(--teal)",
  },
  {
    label: "Intermediate",
    body: "The same ABA structure now has more frequency separation and a quicker pace. The sequence may support an integrated or a segregated organisation.",
    events: streamPattern(60, 67, 0.12, 0.24, 4),
    variable: "frequency separation + presentation rate",
    controls: "A = MIDI 60 / 261.6 Hz; B = MIDI 67 / 392.0 Hz; 120-ms triangle tones; 240-ms onset spacing; four ABA cycles; 0.12 peak gain.",
    colour: "var(--gold-deep)",
  },
  {
    label: "Far + fast",
    body: "The high and low events are far apart and arrive quickly. A high repeating stream and a low repeating stream may become more available.",
    events: streamPattern(60, 76, 0.08, 0.16, 4),
    variable: "frequency separation + presentation rate",
    controls: "A = MIDI 60 / 261.6 Hz; B = MIDI 76 / 659.3 Hz; 80-ms triangle tones; 160-ms onset spacing; four ABA cycles; 0.12 peak gain.",
    colour: "var(--red)",
  },
];

const groupFusePresets: AudioPreset[] = [
  {
    label: "Synchronous components",
    body: "All four components begin together. They may be heard as one complex, instrument-like sound, though synchrony is one cue among several.",
    events: [57, 69, 76, 81].map((pitch) => ({ pitch, start: 0, duration: 0.82 })),
    variable: "onset / offset synchrony",
    controls: "MIDI 57, 69, 76, and 81; 820-ms triangle components; all start at 0 ms and stop together; 0.12 peak gain per component.",
    colour: "var(--teal)",
  },
  {
    label: "Target enters late",
    body: "The same four component pitches are used, but the highest component enters 160 ms later. It may stand apart more clearly from the continuing complex.",
    events: [57, 69, 76].map((pitch) => ({ pitch, start: 0, duration: 0.82 })).concat({ pitch: 81, start: 0.16, duration: 0.66 }),
    variable: "onset / offset synchrony",
    controls: "MIDI 57, 69, 76, and 81; same triangle timbre and peak gain; base components start at 0 ms; target starts at 160 ms; same end time.",
    colour: "var(--red)",
  },
];

const asaContent: ASARecordContent = {
  opening: {
    lede: "Start with a repeating synthetic pattern, not a definition. The same ABA structure can be organised as one coherent sequence or as separate high and low streams. No percept is a test answer.",
    presets: streamPresets,
    note: "At intermediate settings, individual differences and context matter. You may hear one organisation, two streams, or a percept that changes while the sound stays the same.",
  },
  problem: {
    lede: "Auditory scene analysis names both a problem and a perceptual process: how an auditory system organises a mixture, and the organisation that results.",
    layers: [
      { label: "THE WORLD", body: "Multiple sound-producing events overlap: voices, instruments, machines, footsteps, and environmental sounds.", colour: "var(--gold-deep)" },
      { label: "THE EAR", body: "Their acoustic energy is mixed before it reaches the listener. The ear receives one physical mixture, not a set of labelled source tracks.", colour: "var(--red)" },
      { label: "THE PERCEPTUAL PROBLEM", body: "Which pieces of acoustic evidence belong together, and which should be organised as separate sounds or streams?", colour: "var(--teal)" },
    ],
    note: "Faithful explanation of Bregman’s distinction between the ASA problem and the perceptual process that addresses it.",
  },
  source: {
    lede: "A physical source exists in the environment. An auditory stream is a perceptual interpretation of acoustic evidence that may correspond to a sound-producing event.",
    source: { label: "PHYSICAL SOURCE", body: "An object or event in the environment that produces acoustic energy. It belongs to the world, whether or not the listener identifies it correctly.", colour: "var(--gold-deep)" },
    stream: { label: "AUDITORY STREAM", body: "A coherent perceptual organisation that binds acoustic qualities into something the listener can follow as a sound, sequence, or object.", colour: "var(--red)" },
    note: "The auditory system tries to organise evidence in ways that correspond to sound-producing events. A stream is not an objectively verified source.",
  },
  grouping: {
    lede: "Bregman’s framework has two major organisational dimensions. They answer different questions, but they can compete and interact over the same acoustic material.",
    sequential: ["Which events across time belong to the same continuing stream?", "Melody, voice over time, and alternating tone sequences."],
    simultaneous: ["Which components arriving together belong to one perceived sound?", "Harmonic complexes, instrument timbres, and concurrent voices."],
    note: "Sequential and simultaneous organisation are both required for a complete ASA account; sequential streaming is not the whole theory.",
  },
  cues: {
    lede: "Do not memorise a fixed list of cues. Notice what each family helps organise, and why no single acoustic property settles the percept by itself.",
    sequential: ["frequency / pitch similarity", "spectral or timbral similarity", "temporal spacing and rate", "intensity continuity", "spatial continuity", "smooth change"],
    simultaneous: ["onset and offset synchrony", "harmonic or spectral regularity", "common modulation", "spatial information"],
    note: "These are functional cue families, not universal decision rules. Only the relationships needed for the teaching architecture are retained.",
  },
  competition: {
    lede: "Cues can collaborate, but they can also pull the same elements toward different organisations. Context matters: the surrounding events can change what a fixed pair of tones belongs with.",
    cards: [
      { label: "FREQUENCY", body: "Nearby events may be grouped together, but proximity is interpreted within the surrounding frequency–time field.", colour: "var(--teal)" },
      { label: "TIMING", body: "Temporal spacing and synchrony can support continuity or make components seem to arrive as separate events.", colour: "var(--red)" },
      { label: "CONTINUITY", body: "Smooth changes can bind events across time; abrupt changes can make a new organisation more available.", colour: "var(--gold-deep)" },
      { label: "HARMONICITY", body: "A regular spectral relation can support fusion, but it works with other cues rather than ruling alone.", colour: "var(--plum-deep)" },
    ],
    note: "No fixed pairwise distance alone determines stream membership. “Cues pull” is a Concept Lab synthesis, not a neural voting algorithm.",
  },
  bistability: {
    lede: "At intermediate conditions, the same repeating sequence may support both integrated and segregated percepts. You may hear the percept reorganise even though the acoustic stimulus remains unchanged; you may not.",
    states: [
      { label: "ONE-STREAM PERCEPT", body: "The sequence is heard as one coherent pattern, such as a galloping rhythm.", colour: "var(--teal)" },
      { label: "TWO-STREAM PERCEPT", body: "The same sequence is heard as high and low streams with their own continuing patterns.", colour: "var(--red)" },
    ],
    note: "Bistability and build-up are important clues, not promises about what every listener will hear. Attention, stimulus changes, and listener differences matter.",
  },
  groupFuse: {
    lede: "Sequential streaming is not the only question. In a simple synthetic complex sound, changing onset synchrony can change whether one component feels fused with the rest or stands apart.",
    presets: groupFusePresets,
    question: "Does the target feel like part of one sound, or more like something standing apart?",
    note: "The manipulation is onset / offset synchrony inside a complex synthetic sound. It is a constructed teaching example, not a universal harmonicity test.",
  },
  oldNew: {
    lede: "Bregman’s old-plus-new heuristic is specific to overlapping signals. When new energy enters an ongoing spectrum, continuing components may be treated as old and the residue as a candidate new sound.",
    steps: ["ONGOING SOUND", "ADDITIONAL ENERGY ENTERS", "MIXTURE", "CONTINUING OLD + CANDIDATE NEW"],
    note: "This is a Bregman-specific grouping heuristic. It is not prediction error, subtractive predictive coding, or Bayesian residual inference.",
  },
  organisation: {
    lede: "Bregman distinguished relatively stimulus-driven primitive organisation from schema-based organisation shaped by learned patterns, familiar sounds, language, music, expectations, and task-relevant knowledge.",
    primitive: ["general acoustic regularities", "relatively stimulus-driven grouping", "proposed unlearned / built-in basis"],
    schema: ["familiar voices, language, and melodies", "learned musical patterns and expectations", "knowledge and task relevance"],
    note: "Primitive and schema-based organisation are overlapping influences, not a mandatory temporal pipeline. The strength and generality of innateness claims remain bounded.",
  },
  attention: {
    lede: "The historical and later evidence should remain visible together. Some stream formation can occur without deliberate attention, yet attention can substantially affect stream strength, selection, and build-up.",
    cards: [
      { label: "STIMULUS-DRIVEN", body: "Acoustic regularities can organise parts of a mixture without the listener voluntarily selecting every stream first.", colour: "var(--teal)" },
      { label: "ATTENTION-SENSITIVE", body: "Attending to a stream or a competing task can change streaming and its build-up; the exact mechanism remains under debate.", colour: "var(--red)" },
      { label: "NOT VOLUNTARY CONTROL", body: "Listeners cannot simply choose any organisation they want, and attention does not settle every grouping decision.", colour: "var(--gold-deep)" },
    ],
    note: "Do not conclude either that ASA is completely pre-attentive or that it requires attention in all cases. Later evidence complicates both extremes.",
  },
  music: {
    lede: "Grouping changes which musical pattern becomes perceptually available. Bregman and Campbell connected stream formation to implied polyphony, and later synthesis states that melodies and rhythms are formed within auditory streams.",
    cards: [
      { label: "COMPOUND MELODY", body: "Alternating high and low events can be heard as implied polyphony: one physical line, more than one perceptual strand.", colour: "var(--teal)" },
      { label: "MELODY + RHYTHM", body: "Melodic and rhythmic relationships become easier to follow within a stream than across streams.", colour: "var(--red)" },
      { label: "THE BOUNDARY", body: "ASA helps explain what musical pattern is available. It does not by itself explain musical meaning, expectation, emotion, or preference.", colour: "var(--gold-deep)" },
    ],
    note: "ASA asks what belongs together? Meyer’s Expectancy Theory asks where the organised music seems to go?",
  },
  evidence: {
    lede: "These layers support selected parts of the framework. They should not be presented as one experiment that proves every ASA claim.",
    items: [
      {
        title: "Bregman (1990)", label: "process model", citation: "Bregman, A. S. (1990). <i>Auditory Scene Analysis: The Perceptual Organization of Sound</i>. MIT Press.", design: "Canonical theoretical framework spanning sequential grouping, simultaneous grouping, schemas, attention, allocation, music, and speech.", testedLabel: "what it provides", tested: "A unified conceptual framework for organising the perceptual problem of mixed sound.", foundLabel: "what it argues", found: "Auditory organisation uses multiple regularities and can produce streams and perceptual objects from mixtures.", notTested: "A complete modern neural theory, universal thresholds, or perfect source recovery." },
      {
        title: "Bregman & Campbell (1971)", label: "empirical study", citation: "Bregman, A. S., &amp; Campbell, J. (1971). Primary auditory stream segregation and perception of order in rapid sequences of tones. <i>Journal of Experimental Psychology, 89</i>(2), 244–249.", design: "Experiment 1: 32 McGill student volunteers. Experiment 2: 21 summer-course students. Rapid cycles of high- and low-frequency 100-ms sine-wave tones.", testedLabel: "what it tested", tested: "Whether temporal-order judgments were easier within an apparent stream than across high and low streams.", foundLabel: "what it found", found: "Within-stream order relations were recovered more successfully than relations crossing the apparent streams.", notTested: "An inability to perceive all cross-stream order, a universal threshold, or every part of Bregman’s framework.", doi: "10.1037/h0031163" },
      {
        title: "van Noorden (1975)", label: "empirical study", citation: "van Noorden, L. P. A. S. (1975). <i>Temporal Coherence in the Perception of Tone Sequences</i>. Institute for Perception Research, Eindhoven.", design: "Classic tone-sequence parameter-space account relating frequency separation to temporal conditions.", testedLabel: "what it tested", tested: "How alternating tones remain temporally coherent or segregate as frequency and timing relations change.", foundLabel: "what it provides", found: "A qualitative architecture of integration, segregation, and ambiguous regions.", notTested: "Immutable modern thresholds that apply identically to every pattern and listener." },
      {
        title: "Carlyon (2004)", label: "review", citation: "Carlyon, R. P. (2004). How the brain separates sounds. <i>Trends in Cognitive Sciences, 8</i>(10), 465–471.", design: "Later review of auditory streaming, neural correlates, and attention.", testedLabel: "what it reviews", tested: "Evidence that streaming has early auditory correlates while also being strongly affected by attention.", foundLabel: "what it cautions", found: "Stimulus-driven and attention-sensitive accounts both matter.", notTested: "A final resolution of whether ASA requires attention in every circumstance.", doi: "10.1016/j.tics.2004.08.008" },
      {
        title: "Moore & Gockel (2012)", label: "review", citation: "Moore, B. C. J., &amp; Gockel, H. (2012). Properties of auditory stream formation. <i>Philosophical Transactions of the Royal Society B, 367</i>(1591), 919–931.", design: "Later review of fission/fusion, frequency separation, bistability, build-up, multiple cues, and context.", testedLabel: "what it reviews", tested: "How successive sounds form one or more streams across stimulus and attentional conditions.", foundLabel: "what it contributes", found: "Intermediate settings can be bistable, segregation often builds up, and multiple acoustic and contextual factors matter.", notTested: "A single deterministic law or a complete source-separation algorithm.", doi: "10.1098/rstb.2011.0355" },
    ],
  },
  scope: {
    lede: "ASA is powerful when the question is perceptual organisation. It becomes misleading when it is asked to explain everything that happens after a stream is available.",
    explains: ["how mixed sound becomes perceptually organised", "why events group across time", "why simultaneous components fuse or separate", "competing organisations and bistable percepts", "changes in perceived melody and rhythm", "aspects of speech and polyphonic organisation"],
    stops: ["one stream = one verified physical source", "universal frequency or timing thresholds", "a complete contemporary neural theory", "old-plus-new as predictive coding", "attention as complete voluntary control", "musical meaning, expectation, emotion, or preference", "modern AI stem separation as simply Bregman implemented"],
    note: "Stream segregation is one ASA phenomenon, not the whole framework. Bregman’s perceptual problem and current engineering systems should remain historically distinct.",
  },
  lineage: {
    lede: "What came after Bregman is a branching history, not a single march toward a final algorithm.",
    nodes: [
      { label: "BREGMAN ASA", body: "Perceptual organisation of mixtures through sequential and simultaneous grouping, schemas, attention, and allocation.", colour: "var(--teal)" },
      { label: "LATER STREAMING MODELS", body: "Temporal-coherence, fission/fusion, build-up, and cue-interaction research refine the streaming phenomena.", colour: "var(--red)" },
      { label: "NEURAL ACCOUNTS", body: "Later work examines auditory-cortex correlates, event-related responses, and attention-sensitive mechanisms.", colour: "var(--gold-deep)" },
      { label: "COMPUTATIONAL ASA", body: "Engineering and modelling approaches use different algorithms to organise or separate sound; they are not automatically Bregman’s theory.", colour: "var(--plum-deep)" },
    ],
    note: "Bregman’s perceptual problem helped motivate later work, but later streaming models, neural accounts, computational ASA, machine source separation, and AI stem separation retain distinct identities.",
  },
};

export const auditorySceneAnalysis: TheoryRecord = {
  id: "auditory-scene-analysis",
  kind: "theory",
  slug: "auditory-scene-analysis",
  title: "Auditory Scene Analysis",
  hook: "How many streams do you hear? The ears receive a mixture. Why do we hear separate sounds?",
  oneSentence: "Bregman’s foundational framework explains how listeners organise overlapping acoustic evidence into perceptual streams and objects through interacting sequential, simultaneous, learned, and attention-sensitive processes.",
  discipline: "music-psych",
  primaryBranch: "perception-organisation",
  knowledgeForm: "framework",
  knowledgeFormQualifier: "Auditory perceptual organisation",
  literatureStanding: ["foundational"],
  topics: ["auditory perception", "music cognition", "streaming", "perceptual organisation"],
  facts: ["one mixture", "two grouping problems", "cues compete", "streams ≠ sources", "music inside streams"],
  statusChip: "foundational theoretical framework",
  ideaLede: "Auditory Scene Analysis is both the problem of organising a mixed acoustic scene and Bregman’s name for the perceptual process that produces streams and auditory objects.",
  originsNote: "This record teaches Bregman’s historical perceptual framework. Later streaming, neural, computational, and AI approaches remain connected as distinct developments rather than being folded backward into the 1990 theory.",
  order: ["opening", "problem", "source", "grouping", "cues", "competition", "split", "bistability", "groupFuse", "oldNew", "organisation", "attention", "music", "evidence", "scope", "lineage", "trail", "oversimplifications", "qualifications", "sources", "related", "provenance"],
  asa: asaContent,
  trailLede: "A line of inquiry runs from early stream-segregation experiments through Bregman’s framework into temporal-coherence research, attention studies, music applications, neural accounts, and computational approaches.",
  origins: [
    { year: "1971", author: "Bregman & Campbell", work: "Primary auditory stream segregation and perception of order in rapid sequences of tones", contribution: "Historical empirical foundation for stream segregation and within-stream order perception." },
    { year: "1975", author: "L. P. A. S. van Noorden", work: "Temporal Coherence in the Perception of Tone Sequences", contribution: "Classic frequency-separation × temporal-condition parameter space." },
    { year: "1990", author: "Albert S. Bregman", work: "Auditory Scene Analysis", contribution: "Canonical framework integrating sequential and simultaneous organisation, schemas, attention, music, speech, and allocation." },
    { year: "2004", author: "Robert P. Carlyon", work: "How the brain separates sounds", contribution: "Later review connecting streaming, early auditory correlates, and attention." },
    { year: "2012", author: "Brian C. J. Moore & Hedwig Gockel", work: "Properties of auditory stream formation", contribution: "Later review of fission/fusion, bistability, build-up, cues, and context." },
  ],
  oversimplificationsLede: "Eight shortcuts would make ASA easier to say and harder to understand.",
  oversimplifications: [
    "ASA is just <b>stream segregation</b>. It also includes simultaneous organisation, schemas, attention, allocation, and perceptual objects.",
    "One stream equals <b>one physical source</b>. A stream is a perceptual organisation that may correspond to a source.",
    "<b>Frequency difference alone</b> determines grouping. Timing, timbre, synchrony, space, continuity, context, and the surrounding pattern matter.",
    "Primitive organisation happens <b>before</b> schema-based organisation in a fixed pipeline. Bregman’s distinctions are better treated as overlapping influences.",
    "Every sequence <b>starts as one stream and inevitably splits</b>. Build-up is a tendency, and bistability complicates a one-way story.",
    "Old-plus-new is <b>predictive coding</b>. It is a specific heuristic for overlapping signals.",
    "Attention lets listeners <b>choose any stream voluntarily</b>. Attention affects organisation without giving complete control.",
    "Modern AI source separation is <b>Bregman implemented</b>. Engineering systems may solve related problems with different algorithms.",
  ],
  qualifications: [
    "The audio examples are original synthetic teaching reconstructions, not the Bregman and Ahad recordings and not empirical replications.",
    "At intermediate frequency/rate settings, listeners may differ and may not experience a spontaneous perceptual switch.",
    "Build-up is a tendency affected by attention, stimulus history, and listener differences rather than an inevitable law.",
    "Primitive and schema-based organisation are Bregman’s historical categories; the strength and generality of innateness claims remain qualified.",
    "Exclusive allocation belongs mainly in the boundary section and requires exceptions such as duplex perception.",
    "ASA explains perceptual organisation; it does not automatically explain musical meaning, expectation, emotion, or preference.",
  ],
  minimumReadingLabel: "If you read six things",
  minimumReading: [
    { citation: "Bregman, A. S. (1990). <i>Auditory Scene Analysis: The Perceptual Organization of Sound</i>. MIT Press.", contribution: "Canonical framework source for the ASA problem, streams, grouping, schemas, attention, music, speech, and allocation." },
    { citation: "Bregman, A. S. (2008). Auditory scene analysis. In <i>The Senses: A Comprehensive Reference</i>, 3, 861–870.", contribution: "Author-led clarification of mixtures, streams, cue cooperation/competition, sequential and simultaneous organisation, attention, music, and innate-process proposals." },
    { citation: "Bregman, A. S., &amp; Campbell, J. (1971). Primary auditory stream segregation and perception of order in rapid sequences of tones. <i>Journal of Experimental Psychology, 89</i>(2), 244–249.", contribution: "Historical experiment linking stream segregation to within- versus across-stream order judgments.", doi: "10.1037/h0031163" },
    { citation: "van Noorden, L. P. A. S. (1975). <i>Temporal Coherence in the Perception of Tone Sequences</i>.", contribution: "Classic parameter-space foundation for frequency separation, temporal coherence, and segregation possibilities." },
    { citation: "Carlyon, R. P. (2004). How the brain separates sounds. <i>Trends in Cognitive Sciences, 8</i>(10), 465–471.", contribution: "Later review of streaming, early auditory correlates, and attention.", doi: "10.1016/j.tics.2004.08.008" },
    { citation: "Moore, B. C. J., &amp; Gockel, H. (2012). Properties of auditory stream formation. <i>Philosophical Transactions of the Royal Society B, 367</i>(1591), 919–931.", contribution: "Later review of multiple cues, bistability, build-up, context, and attention.", doi: "10.1098/rstb.2011.0355" },
  ],
  fullSources: [
    { citation: "Bregman, A. S. (1978). Auditory streaming: Competition among alternative organizations. <i>Perception &amp; Psychophysics, 23</i>, 391–398.", contribution: "Earlier study of competition among alternative auditory organisations." },
    { citation: "Bregman, A. S., &amp; Ahad, P. A. (1996). <i>Demonstrations of Auditory Scene Analysis</i>. MIT Press.", contribution: "Historical demonstration reference; production examples do not reuse its recordings." },
    { citation: "Darwin, C. J. (1997). Auditory grouping. <i>Trends in Cognitive Sciences, 1</i>(9), 327–333.", contribution: "Later grouping perspective relevant to speech and natural listening." },
    { citation: "Alain, C., Arnott, S. R., &amp; Picton, T. W. (2001). Bottom-up and top-down influences on auditory scene analysis. <i>Journal of Experimental Psychology: Human Perception and Performance, 27</i>, 1072–1089.", contribution: "Selective later evidence for the attention and neural boundary; not a complete neuroscience review." },
  ],
  relatedToLede: "ASA is the Perception & Organisation branch of the Music Psychology Atlas. Its principal existing connection is Meyer’s Expectancy Theory.",
  relatedTo: [
    { recordId: "meyers-expectancy-theory", relation: "complements with a perceptual-organisation lens", body: "ASA asks what belongs together; Meyer asks where the organised music seems to go. The records are adjacent and answer different questions." },
  ],
  provenance: [
    { glyph: "●", colour: "var(--red)", label: "Source-grounded framework and findings", note: "Bregman’s framework, the study designs and samples, the later reviews, and the music-application claims are tied to the cited theoretical, empirical, and review sources." },
    { glyph: "■", colour: "var(--teal)", label: "Faithful explanation", note: "The problem/process distinction, source/stream boundary, cue families, primitive/schema distinction, attention boundary, and old-plus-new explanation paraphrase the cited literature." },
    { glyph: "▲", colour: "var(--gold-deep)", label: "Constructed teaching and audio examples", note: "The synthetic ABA presets, complex-sound onset comparison, static percept alternatives, and cue visuals are original teaching constructions, not empirical replications." },
    { glyph: "✦", colour: "var(--pen-3)", label: "Concept Lab synthesis", note: "The branched final topology, “Cues Pull” metaphor, Atlas connection, and page sequence are editorial arrangements made to teach the cited literature." },
    { glyph: "?", colour: "var(--pen-3)", label: "Debated or bounded", note: "Bistability, build-up, attention, innateness, exact thresholds, exclusive allocation, and the relation between psychological ASA and engineering systems remain qualified." },
  ],
};

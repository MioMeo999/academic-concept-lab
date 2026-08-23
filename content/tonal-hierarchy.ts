import type { AudioEvent, EvidenceXray, TonalCard, TonalContext, TonalProbe, TonalProfileItem, TheoryRecord } from "./types";

function scaleEvents(pitches: number[], duration = 0.18, gap = 0.05): AudioEvent[] {
  return pitches.map((pitch, index) => ({ pitch, start: index * (duration + gap), duration }));
}

function chordProgression(chords: number[][], duration = 0.42, gap = 0.18): AudioEvent[] {
  return chords.flatMap((chord, chordIndex) => chord.map((pitch) => ({ pitch, start: chordIndex * (duration + gap), duration })));
}

const cMajorContext: TonalContext = {
  id: "c-major-scale",
  label: "C major · scale context",
  body: "A short synthetic C-major context establishes a tonal home before the probe arrives.",
  events: scaleEvents([60, 62, 64, 65, 67, 69, 71, 72]),
  controls: "C4–C5 ascending scale; 180-ms triangle tones; 50-ms gaps; 500-ms probe delay; probe held for 500 ms.",
  colour: "var(--teal)",
};

const cMajorCadence: TonalContext = {
  id: "c-major-cadence",
  label: "C major · IV–V–I",
  body: "F major, G major, then C major make the C-major context explicit for the fixed C probe.",
  events: chordProgression([[65, 69, 72], [67, 71, 74], [60, 64, 67]]),
  controls: "Three simultaneous triads; 420-ms triangle components; 180-ms gaps; 500-ms probe delay; same C4 probe and 500-ms duration.",
  colour: "var(--teal)",
  role: "tonic / scale degree 1",
};

const fMajorCadence: TonalContext = {
  id: "f-major-cadence",
  label: "F major · ii–V–I",
  body: "G minor, C major, then F major establish F as the current tonal centre.",
  events: chordProgression([[67, 70, 74], [60, 64, 67], [65, 69, 72]]),
  controls: "Three simultaneous triads; 420-ms triangle components; 180-ms gaps; 500-ms probe delay; same C4 probe and 500-ms duration.",
  colour: "var(--gold-deep)",
  role: "dominant / scale degree 5",
};

const aMinorCadence: TonalContext = {
  id: "a-minor-cadence",
  label: "A minor · iv–V–i",
  body: "D minor, E major, then A minor establish an A-minor context in which C belongs to the tonic triad.",
  events: chordProgression([[62, 65, 69], [64, 68, 71], [57, 60, 64]]),
  controls: "Three simultaneous triads; 420-ms triangle components; 180-ms gaps; 500-ms probe delay; same C4 probe and 500-ms duration.",
  colour: "var(--plum-deep)",
  role: "mediant / tonic-triad member",
};

const dMajorCadence: TonalContext = {
  id: "d-major-cadence",
  label: "D major · IV–V–I",
  body: "G major, A major, then D major establish D major, where C natural falls outside the diatonic collection.",
  events: chordProgression([[67, 71, 74], [69, 73, 76], [62, 66, 69]]),
  controls: "Three simultaneous triads; 420-ms triangle components; 180-ms gaps; 500-ms probe delay; same C4 probe and 500-ms duration.",
  colour: "var(--red)",
  role: "nondiatonic / chromatic tone",
};

const probes: TonalProbe[] = [
  { pitchClass: "C", note: "C4", midi: 60, role: "tonic", body: "The central reference tone in this C-major teaching context.", colour: "var(--red)" },
  { pitchClass: "C♯", note: "C♯4", midi: 61, role: "nondiatonic tone", body: "Outside the C-major diatonic collection in this context.", colour: "var(--red)" },
  { pitchClass: "D", note: "D4", midi: 62, role: "other diatonic tone", body: "Inside the scale, but not a member of the tonic triad.", colour: "var(--gold-deep)" },
  { pitchClass: "D♯", note: "D♯4", midi: 63, role: "nondiatonic tone", body: "Outside the C-major diatonic collection in this context.", colour: "var(--red)" },
  { pitchClass: "E", note: "E4", midi: 64, role: "tonic-triad member", body: "A member of the C-major tonic triad with a different role from C.", colour: "var(--teal)" },
  { pitchClass: "F", note: "F4", midi: 65, role: "other diatonic tone", body: "Inside the scale, but not a member of the tonic triad.", colour: "var(--gold-deep)" },
  { pitchClass: "F♯", note: "F♯4", midi: 66, role: "nondiatonic tone", body: "Outside the C-major diatonic collection in this context.", colour: "var(--red)" },
  { pitchClass: "G", note: "G4", midi: 67, role: "tonic-triad member", body: "A member of the C-major tonic triad with a strong but non-tonic role.", colour: "var(--teal)" },
  { pitchClass: "G♯", note: "G♯4", midi: 68, role: "nondiatonic tone", body: "Outside the C-major diatonic collection in this context.", colour: "var(--red)" },
  { pitchClass: "A", note: "A4", midi: 69, role: "other diatonic tone", body: "Inside the scale, but not a member of the tonic triad.", colour: "var(--gold-deep)" },
  { pitchClass: "A♯", note: "A♯4", midi: 70, role: "nondiatonic tone", body: "Outside the C-major diatonic collection in this context.", colour: "var(--red)" },
  { pitchClass: "B", note: "B4", midi: 71, role: "other diatonic tone", body: "Inside the scale, but not a member of the tonic triad.", colour: "var(--gold-deep)" },
];

const tonalEvidence: EvidenceXray[] = [
  { title: "Krumhansl & Shepard (1979)", label: "empirical study", citation: "Krumhansl, C. L., &amp; Shepard, R. N. (1979). Quantification of the hierarchy of tonal functions within a diatonic context. <i>Journal of Experimental Psychology: Human Perception and Performance, 5</i>(4), 579–594.", design: "24 Stanford undergraduates; C-major scale contexts; test tones across an octave; completion ratings; a quarter-tone condition.", testedLabel: "what it tested", tested: "Whether context-dependent completion judgments reflected tonal-function hierarchy beyond pitch-height distance.", foundLabel: "what it found", found: "Ratings reflected pitch-height distance, octave equivalence, and a hierarchy of tonic, tonic-triad, diatonic, and nondiatonic functions.", notTested: "Liking, universal probability of the next note, or a complete key-finding mechanism.", doi: "10.1037//0096-1523.5.4.579" },
  { title: "Krumhansl (1979)", label: "empirical study", citation: "Krumhansl, C. L. (1979). The psychological representation of musical pitch in a tonal context. <i>Cognitive Psychology, 11</i>(3), 346–374.", design: "Similarity judgments and related memory tasks in explicit tonal contexts, analysed through multidimensional scaling.", testedLabel: "what it tested", tested: "Whether pitch relations in a tonal context reflect more than physical frequency distance.", foundLabel: "what it found", found: "Pitch height, chroma, triad membership, and diatonic membership contributed to a tonality-specific psychological representation.", notTested: "A literal neural geometry or a single process that detects every key.", doi: "10.1016/0010-0285(79)90016-1" },
  { title: "Krumhansl & Kessler (1982)", label: "empirical study", citation: "Krumhansl, C. L., &amp; Kessler, E. J. (1982). Tracing the dynamic changes in perceived tonal organization in a spatial representation of musical keys. <i>Psychological Review, 89</i>(4), 334–368.", design: "Two experiments, 24 participants overall: Experiment 1 N=10 and Experiment 2 N=14; 12 probes, 7-point fit ratings, and 10 nine-chord sequences in Experiment 2.", testedLabel: "what it tested", tested: "How tonal profiles relate to major/minor keys and how tonal organisation develops across chord sequences.", foundLabel: "what it found", found: "Profile similarity supported key relations represented in a four-dimensional toroidal topology; successive chords changed the balance among tonal interpretations.", notTested: "A literal brain map, one fixed profile throughout a piece, or a complete algorithm of key finding.", doi: "10.1037/0033-295X.89.4.334" },
  { title: "Krumhansl & Keil (1982)", label: "empirical study", citation: "Krumhansl, C. L., &amp; Keil, F. C. (1982). Acquisition of the hierarchy of tonal functions in music. <i>Memory &amp; Cognition, 10</i>(3), 243–251.", design: "Children and adults judged how good short tone sequences sounded as melodies.", testedLabel: "what it tested", tested: "Whether differentiation among scale, tonic-triad, and other tones varied with age and musical experience.", foundLabel: "what it found", found: "Observed differentiation increased from scale versus nonscale distinctions toward tonic-triad and other-scale distinctions, with adult octave-equivalence and temporal asymmetries.", notTested: "An innate universal staircase or a developmental version of the adult probe-tone experiment.", doi: "10.3758/BF03197636" },
  { title: "Castellano, Bharucha & Krumhansl (1984)", label: "empirical study", citation: "Castellano, M. A., Bharucha, J. J., &amp; Krumhansl, C. L. (1984). Tonal hierarchies in the music of North India. <i>Journal of Experimental Psychology: General, 113</i>(3), 394–412.", design: "Indian and Western listeners rated probes in the contexts of 10 North Indian rags.", testedLabel: "what it tested", tested: "How immediate musical structure and culturally learned tonal organisation contribute to probe-tone judgments.", foundLabel: "what it found", found: "Both groups used explicit contextual information such as tone duration; Indian listeners additionally showed sensitivity to culturally specific rag and thāṭ relations.", notTested: "Western major/minor hierarchy as universal tonal cognition, or unfamiliar listeners’ inability to hear structure.", doi: "10.1037//0096-3445.113.3.394" },
  { title: "Butler (1989)", label: "review", citation: "Butler, D. (1989). Describing the perception of tonality in music: A critique of the tonal hierarchy theory and a proposal for a theory of intervallic rivalry. <i>Music Perception, 6</i>(3), 219–241.", design: "Critical theoretical commentary on tonal hierarchy and probe-tone evidence.", testedLabel: "what it critiques", tested: "Whether a probe profile specifies the mental process of recognising a tonal centre as music unfolds.", foundLabel: "what it contributes", found: "The response task may be ambiguous and tonal hierarchy alone does not specify the complete time-dependent key-finding process.", notTested: "The existence of context-dependent tonal organisation itself.", doi: "10.2307/40285588" },
  { title: "Temperley & Marvin (2008)", label: "empirical study", citation: "Temperley, D., &amp; Marvin, E. W. (2008). Pitch-class distribution and the identification of key. <i>Music Perception, 25</i>(3), 193–212.", design: "Listeners judged keys of melodies generated from pitch-class distributions characteristic of tonal music.", testedLabel: "what it tested", tested: "Whether pitch-class distribution alone could account for human key identification.", foundLabel: "what it found", found: "Distribution supported above-chance key identification but did not provide a complete explanation of human key finding.", notTested: "Tonal hierarchy as identical to frequency counts.", doi: "10.1525/mp.2008.25.3.193" },
];

const tonalProfile: TonalProfileItem[] = probes.map((probe) => ({
  note: probe.note,
  pitchClass: probe.pitchClass,
  role: probe.role,
  level: probe.pitchClass === "C" ? "anchor" : ["E", "G"].includes(probe.pitchClass) ? "triad" : ["D", "F", "A", "B"].includes(probe.pitchClass) ? "diatonic" : "nondiatonic",
  body: probe.body,
}));

const card = (label: string, body: string, colour = "var(--teal)"): TonalCard => ({ label, body, colour });

export const tonalHierarchy: TheoryRecord = {
  id: "tonal-hierarchy",
  kind: "theory",
  slug: "tonal-hierarchy",
  title: "Tonal Hierarchy",
  hook: "Which note feels like home — and what changes when the musical context changes?",
  oneSentence: "The Krumhansl tradition uses context-dependent pitch judgments to model tonal stability, pitch relations, key similarity, and changing tonal organisation.",
  discipline: "music-psych",
  statusChip: "empirical cognitive framework",
  topics: ["tonal hierarchy", "probe-tone method", "pitch perception", "key profiles", "music cognition"],
  facts: ["fit ≠ liking", "context changes function", "profiles are patterns", "keys have neighbourhoods", "home can move"],
  order: ["opening", "context", "measurement", "profile", "sameNote", "dimensions", "representation", "neighbourhood", "keySpace", "dynamics", "distribution", "development", "culture", "process", "evidenceXrays", "scope", "stops", "lineage", "trail", "oversimplifications", "qualifications", "sources", "related", "provenance"],
  trailLede: "The research trail moves from probe-tone judgments and psychological pitch representation to key profiles, dynamic tonal organisation, development, cultural boundaries, and later critiques of key finding.",
  originsNote: "This record teaches Tonal Hierarchy as an empirical cognitive framework and representational research programme. The probe profile is not presented as a complete causal theory of key detection.",
  oversimplificationsLede: "The most dangerous shortcuts are the ones that turn a context-dependent measurement into a universal property of a note.",
  oversimplifications: [
    "The tonic is simply the most pleasant note.",
    "Probe-tone ratings are liking or emotional-valence ratings.",
    "Tonal stability equals expectancy or probability of the next note.",
    "A profile is a property of a physical pitch rather than a pattern produced in context.",
    "Western major/minor hierarchy is universal tonal cognition.",
    "The Krumhansl torus is a literal map inside the brain.",
    "Tonal hierarchy equals pitch-class frequency counts.",
    "A probe profile completely explains how a listener finds a key.",
    "Tonal Hierarchy and Meyer’s Expectancy Theory are the same account.",
  ],
  qualifications: [
    "Broad hierarchy levels contain internal variation; the qualitative profile is not a table of identical ratings.",
    "The opening C-major context is a constructed teaching example, not a universal tonal starting point.",
    "Developmental evidence concerns observed differentiation in one study, not immutable innate stages.",
    "Cross-cultural results show both immediate contextual sensitivity and culturally specific organisation.",
    "Exact empirical profile values require direct source verification before they are displayed.",
  ],
  minimumReadingLabel: "If you read seven things",
  minimumReading: tonalEvidence.slice(0, 7).map(({ citation, found, doi }) => ({ citation, contribution: found, doi })),
  fullSources: [
    { citation: "Krumhansl, C. L. (1990). <i>Cognitive Foundations of Musical Pitch</i>. Oxford University Press.", contribution: "Canonical synthesis of tonal hierarchies, pitch relations, key distances, harmonic hierarchies, modulation, and music cognition." },
  ],
  origins: [
    { year: "1979", author: "Krumhansl & Shepard", work: "Quantification of the hierarchy of tonal functions within a diatonic context", contribution: "Probe-tone completion ratings and the interaction of pitch height, octave equivalence, and tonal function." },
    { year: "1979", author: "Carol L. Krumhansl", work: "The psychological representation of musical pitch in a tonal context", contribution: "Similarity and memory evidence for a context-specific psychological organisation of pitch." },
    { year: "1982", author: "Krumhansl & Kessler", work: "Tracing the dynamic changes in perceived tonal organization", contribution: "Major/minor profiles, key similarity, toroidal representation, and changing tonal interpretations." },
    { year: "1984", author: "Castellano, Bharucha & Krumhansl", work: "Tonal hierarchies in the music of North India", contribution: "A cultural boundary showing immediate structure and learned musical organisation together." },
    { year: "1989 → later", author: "Butler and key-finding research", work: "Profile, process, and distributional boundaries", contribution: "Later critique and modelling keep tonal representation distinct from a complete temporal key-finding mechanism." },
  ],
  relatedToLede: "Tonal Hierarchy joins the Music Psychology Atlas beside Meyer’s expectancy account and Auditory Scene Analysis; each answers a different question.",
  relatedTo: [
    { recordId: "meyers-expectancy-theory", relation: "complements with a temporal implication lens", body: "Tonal Hierarchy asks how stable or well-fitting a pitch is inside the current context; Meyer asks what the current event may imply about what happens next." },
    { recordId: "auditory-scene-analysis", relation: "complements with a perceptual-organisation lens", body: "ASA asks which sounds belong together; Tonal Hierarchy asks how pitches are functionally organised once a tonal context is available." },
  ],
  evidenceXrays: tonalEvidence,
  conceptualStatus: {
    flag: "This is an empirical cognitive framework, not one monolithic causal theory.",
    body: "The Krumhansl tradition connects measurement practices, representational models, key-space relations, developmental evidence, cultural comparisons, and later critiques. The record keeps those contributions connected without pretending they form one complete process theory.",
    questions: ["What does a probe profile measure?", "How does a listener find a key over time?", "How do exposure and culture shape tonal organisation?"],
  },
  tonal: {
    opening: {
      lede: "Begin with a short synthetic context. Hear four probes without their theory labels first, and notice that “home” is a teaching metaphor for contextual tonal fit—not a measure of liking or musical ability.",
      context: cMajorContext,
      probes: [probes[0], probes[4], probes[2], probes[6]],
      note: "▲ Constructed tonal teaching example. The interaction reconstructs the logic of context followed by probe; it does not reproduce Krumhansl & Shepard’s published experiment.",
    },
    context: {
      lede: "A physical pitch does not carry one fixed tonal job. A key supplies a context in which the same pitch can become a tonic, a chord member, a diatonic neighbour, or a chromatic outsider.",
      cards: [card("KEY", "The tonal system currently organising the music. It is more than a list of seven notes."), card("TONIC", "The central reference tone in the current key — the note that acts as the strongest home base.", "var(--red)"), card("DIATONIC", "Inside the current seven-note scale. Diatonic does not mean every tone has the same stability.", "var(--gold-deep)"), card("CHROMATIC / NONDIATONIC", "Outside the current diatonic collection. Its role still depends on context, not on a universal badness property.", "var(--plum-deep)"), card("TRIAD", "A three-note chord. Tonic-triad membership is one psychological relation among several, not the whole explanation.", "var(--teal)" )],
      note: "■ Plain-language bridge: tonal function emerges from pitch × tonal context.",
    },
    measurement: {
      lede: "The hard distinction is not just what people hear. It is what the researcher observes, what pattern is built from those observations, and what psychological interpretation is made afterward.",
      cards: [card("LEVEL 1 · BEHAVIOURAL RESPONSE", "A participant gives a context-dependent judgment: “How well does this tone complete or fit the preceding context?” This is an observed rating.", "var(--red)"), card("LEVEL 2 · EMPIRICAL PROFILE", "Ratings across pitch classes are aggregated into a probe-tone profile. This is a pattern of responses, not a psychological construct by itself.", "var(--teal)"), card("LEVEL 3 · PSYCHOLOGICAL INTERPRETATION", "The structured profile is interpreted as evidence concerning tonal function, tonal hierarchy, relative tonal stability, and psychological organisation.", "var(--gold-deep)"), card("TASK WORDING MATTERS", "Krumhansl & Shepard (1979) asked how well a test tone completed a preceding C-major scale. Krumhansl & Kessler (1982) asked how well a probe followed, fitted, or went with preceding scale, chord, and cadence contexts. This accessible lab reconstructs the logic; it is not an exact replication.", "var(--plum-deep)")],
      note: "Probe-tone judgments provide an empirical window onto perceived tonal organisation. Rating ≠ profile ≠ tonal stability.",
    },
    probeLab: {
      lede: "The historical logic is simple enough to reconstruct without turning the learner into a research participant: play one stable context, choose a probe, optionally rate fit, then compare the emerging pattern with a canonical qualitative teaching representation.",
      context: cMajorContext,
      probes,
      note: "▲ Concept Lab reconstruction of probe-tone logic. It uses accessible wording and synthetic sound rather than claiming to replicate one published experiment.",
    },
    profile: {
      lede: "The qualitative profile below preserves internal variation without copying unsourced numerical Krumhansl–Kessler values. The visual height is a teaching representation of relative tonal centrality / fit, not physical frequency, loudness, probability, pleasure, or neural activation.",
      items: tonalProfile,
      note: "✦ Concept Lab teaching representation; no exact empirical profile values are shown.",
    },
    sameNote: {
      lede: "Hold the physical probe at C4. Change only the preceding tonal context. The point is not that every listener must give identical ratings; it is that tonal role is relational.",
      probe: probes[0],
      contexts: [cMajorCadence, fMajorCadence, aMinorCadence, dMajorCadence],
      note: "▲ Constructed context comparison. Probe pitch, register, timbre, loudness, context length, delay, and probe duration are held constant; tonal context is manipulated.",
    },
    dimensions: {
      lede: "Tonal function is important, but the fuller Krumhansl & Shepard result also retained other psychological dimensions of pitch.",
      cards: [card("PITCH HEIGHT", "How near the probe is in register to the context tones can influence the judgment, especially with less musical or less harmonically rich sounds.", "var(--red)"), card("CHROMA / OCTAVE EQUIVALENCE", "Tones an octave apart share pitch-class identity, but octave equivalence does not erase every register effect.", "var(--teal)"), card("TONAL FUNCTION", "Tonic-triad membership and diatonic membership reorganise the meaning of a pitch inside the established tonal system.", "var(--gold-deep)" )],
      note: "● The response pattern is not explained by tonal hierarchy alone.",
    },
    representation: {
      lede: "Krumhansl’s similarity work widened the picture: psychological pitch relations reflected pitch height, chroma, tonic-triad membership, and diatonic membership.",
      cards: [card("CLOSE CLUSTER", "Tonic-triad tones tended to form a relatively close psychological grouping in the tonal context.", "var(--red)"), card("FARTHER DIATONIC REGION", "Other diatonic tones remained related to the key but were differentiated from the tonic triad.", "var(--gold-deep)"), card("WIDER NONDIATONIC REGION", "Nondiatonic tones were less closely related in the representation; this is a psychological scaling result, not a physical map.", "var(--plum-deep)" )],
      note: "■ Historical multidimensional scaling should be described as a psychological representation, not literal neural geometry.",
    },
    neighbourhood: {
      lede: "Once pitch profiles are understood, move one level up: keys themselves can have psychological neighbourhoods.",
      note: "Interkey distance is a psychological similarity relation derived from patterns of ratings, not physical distance between keys.",
      levels: [
        { label: "Local neighbourhood", body: "C major sits beside a few related regions. Start with a usable local map, not a torus.", relations: ["G major · fifth-related", "F major · fifth-related", "A minor · relative", "C minor · parallel"] },
        { label: "Circle of fifths", body: "Fifth-related keys form one important family of profile similarity.", relations: ["F major", "C major", "G major", "D major", "A major"] },
        { label: "Major / minor links", body: "Relative and parallel major/minor relations add another dimension to the neighbourhood.", relations: ["C major ↔ A minor", "C major ↔ C minor", "F major ↔ D minor", "G major ↔ E minor"] },
        { label: "Advanced: toroidal space", body: "A higher-dimensional representation preserves several relations that one flat circle cannot preserve simultaneously.", relations: ["circle of fifths", "relative relation", "parallel relation", "psychological similarity"] },
      ],
    },
    keySpace: {
      lede: "Krumhansl & Kessler’s intercorrelated major/minor profiles were analysed with multidimensional scaling. The resulting four-dimensional solution was represented with a toroidal topology.",
      note: "● The torus is a mathematical representation of psychological similarity relations. It is not a donut-shaped neural storage site.",
    },
    dynamics: {
      lede: "Tonal organisation is dynamic. As successive chords arrive, earlier evidence remains relevant while new evidence accumulates and alternative key interpretations compete.",
      states: [card("C-major-like interpretation", "Early harmonic evidence supports one region, but the current interpretation is still provisional.", "var(--teal)"), card("Competing regions", "New chords can keep the first interpretation active while increasing the strength of a related or contrasting alternative.", "var(--gold-deep)"), card("Updated tonal organisation", "A modulation may gradually become dominant; the last chord alone is not the whole perceived key.", "var(--red)" )],
      note: "▲ Lightweight progressive visual based on the dynamic-profile logic of Krumhansl & Kessler Experiment 2; not a deterministic modulation trajectory.",
    },
    distribution: {
      lede: "Musical corpora contain structured differences in pitch-class occurrence, duration, and harmonic use. These regularities offer one plausible learning route, but they are not the whole explanation.",
      cards: [card("MUSICAL EXPOSURE", "Listeners encounter repeated relationships in the musical environments they hear.", "var(--teal)"), card("DISTRIBUTIONAL EXPERIENCE", "Occurrence, duration, and harmonic use can make some relationships more available in a context.", "var(--gold-deep)"), card("INTERNALISED REGULARITIES", "A learned schema is a plausible synthesis, not a claim that tonal hierarchy equals frequency counts.", "var(--red)" )],
      note: "✦ / ? Concept Lab synthesis bounded by correlational and key-identification evidence: distribution helps, but is insufficient as a complete process model.",
    },
    development: {
      lede: "Krumhansl & Keil studied developmental differentiation through judgments of how good short tone sequences sounded as melodies. This was not simply the adult probe-tone task administered to children.",
      cards: [card("YOUNGER CHILDREN", "Scale versus nonscale tones were differentiated.", "var(--teal)"), card("OLDER CHILDREN", "Tonic-triad tones were additionally differentiated from other scale tones.", "var(--gold-deep)"), card("ADULTS", "Further differentiation, octave equivalence, and temporal asymmetries appeared in the adult organisation.", "var(--red)" )],
      note: "● Developmental evidence for increasing differentiation of tonal functions in this study; not an innate universal stage model.",
    },
    culture: {
      lede: "C major is a controlled opening example, not the visual default for the entire page. North Indian evidence widens the frame beyond Western major/minor harmony.",
      cards: [card("IMMEDIATE CONTEXT", "Indian and Western listeners’ ratings reflected structural information made available in the rag contexts, including tone-duration patterns.", "var(--teal)"), card("CULTURAL ORGANISATION", "Indian listeners additionally showed sensitivity to culturally specific rag and thāṭ relations.", "var(--red)"), card("BOUNDARY", "Unfamiliar listeners can perceive structure, but Western hierarchy is not universal tonal cognition.", "var(--gold-deep)" )],
      note: "● / ? Cross-cultural evidence supports both immediate contextual sensitivity and learned, culture-specific organisation. No North Indian audio imitation is proposed.",
    },
    process: {
      lede: "A probe profile may describe a representation without fully specifying the process that builds it. Butler’s critique is a boundary on inference, not a rejection of context-dependent tonal organisation.",
      cards: [card("PROFILE", "A structured pattern in fit/completion ratings across pitch classes.", "var(--teal)"), card("PROCESS QUESTION", "How does a listener recognise, maintain, or revise a tonal centre as music unfolds?", "var(--red)"), card("CRITICAL CONTRIBUTION", "Probe-task ambiguity and short-term memory may matter; the complete time-dependent computation remains under-specified.", "var(--gold-deep)" )],
      note: "? The profile does not by itself provide a complete psychological computation of key finding.",
    },
    scope: {
      lede: "Tonal Hierarchy is useful for understanding context-dependent pitch organisation, but it should not be expanded into a general theory of music cognition.",
      explains: ["context-dependent pitch fit", "relative tonal stability", "tonic centrality", "differentiation among tonal functions", "psychological pitch relations", "major/minor tonal profiles", "psychological similarity among keys", "dynamic changes in tonal organisation"],
      stops: ["all melody perception", "all harmonic processing", "all musical expectation", "musical emotion or preference", "universal tonality", "complete key finding", "literal neural key-space geometry"],
      note: "The framework explains a powerful family of representational relationships; it does not settle every process that follows from them.",
    },
    lineage: {
      lede: "What came after Krumhansl is a branching history: later work extends, critiques, models, and culturally reframes the research programme without collapsing every development into one theory.",
      nodes: [card("Krumhansl tradition", "Probe-tone measurement, pitch representation, tonal profiles, and key relations.", "var(--teal)"), card("Critical and dynamic accounts", "Butler and related work ask how tonal centres are recognised over time and how profiles may be under-specified.", "var(--red)"), card("Distributional / computational boundaries", "Later key-identification models test distribution, transitions, and process without making them identical to the original framework.", "var(--gold-deep)" )],
      note: "✦ Concept Lab synthesis: extensions and critiques retain distinct identities and should not be presented as one finished causal theory.",
    },
  },
  provenance: [
    { glyph: "●", colour: "var(--red)", label: "Source-grounded framework and findings", note: "The probe-tone studies, pitch-representation study, key-space findings, developmental evidence, cross-cultural evidence, critique, and later distributional boundary are tied to cited sources." },
    { glyph: "■", colour: "var(--teal)", label: "Faithful explanation", note: "The rating/profile/interpretation distinction, context-dependent function, fit boundary, key-neighbourhood explanation, and profile/process distinction paraphrase the literature." },
    { glyph: "▲", colour: "var(--gold-deep)", label: "Constructed teaching and audio examples", note: "The C-major opening, 12-probe lab, qualitative profile, same-C context comparison, and dynamic visual are original teaching constructions, not empirical replications." },
    { glyph: "✦", colour: "var(--pen-3)", label: "Concept Lab synthesis", note: "The CONTEXT → FIT → HIERARCHY → SPACE → SHIFT rhythm, final integrative architecture, and Atlas relations are editorial arrangements made to teach the cited research." },
    { glyph: "?", colour: "var(--pen-3)", label: "Debated or bounded", note: "Exact learning mechanisms, universal claims, developmental stages, numerical profile display, and the complete key-finding process remain qualified or unresolved." },
  ],
};

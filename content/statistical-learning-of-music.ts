import type {
  AudioEvent,
  EvidenceXray,
  Source,
  StatisticalRecordContent,
  StatisticalStream,
  StatisticalWorld,
  TheoryRecord,
} from "./types";

const toneDuration = 0.24;
const ioI = 0.32;
const streamUnitSequence = ["ABC", "DEF", "GHI", "ABC", "GHI", "DEF", "DEF", "ABC", "GHI", "GHI", "DEF", "ABC"];
const streamNotes = streamUnitSequence.flatMap((unit) => unit.split(""));
const pitchMapping: Record<string, number> = { A: 70, B: 63, C: 73, D: 65, E: 60, F: 61, G: 71, H: 66, I: 68 };
const pitchLabels = Object.keys(pitchMapping);
const withinPairs = new Set(["AB", "BC", "DE", "EF", "GH", "HI"]);

function frequencyForMidi(midi: number) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function countPairs(sequence: string[]) {
  const counts = new Map<string, number>();
  for (let index = 0; index < sequence.length - 1; index += 1) {
    const pair = `${sequence[index]}${sequence[index + 1]}`;
    counts.set(pair, (counts.get(pair) ?? 0) + 1);
  }
  return counts;
}

function auditIntervals(sequence: string[], kind: "within" | "boundary") {
  const deltas: number[] = [];
  for (let index = 0; index < sequence.length - 1; index += 1) {
    const pair = `${sequence[index]}${sequence[index + 1]}`;
    if ((withinPairs.has(pair) ? "within" : "boundary") === kind) {
      deltas.push(pitchMapping[sequence[index + 1]] - pitchMapping[sequence[index]]);
    }
  }
  const absolute = deltas.map((delta) => Math.abs(delta));
  const distribution = [...new Set(absolute)].sort((a, b) => a - b).map((value) => `${value} st × ${absolute.filter((item) => item === value).length}`).join(" · ");
  return {
    direction: `${deltas.filter((delta) => delta > 0).length} up / ${deltas.filter((delta) => delta < 0).length} down`,
    mean: `${(absolute.reduce((sum, value) => sum + value, 0) / absolute.length).toFixed(2)} semitones`,
    range: `${Math.min(...absolute)}–${Math.max(...absolute)} semitones`,
    distribution,
  };
}

function createStream(): StatisticalStream {
  const pairCounts = countPairs(streamNotes);
  const opportunities = new Map<string, number>();
  for (let index = 0; index < streamNotes.length - 1; index += 1) {
    const from = streamNotes[index];
    const pair = `${from}${streamNotes[index + 1]}`;
    const kind = withinPairs.has(pair) ? "within" : "boundary";
    const key = `${kind}:${from}`;
    opportunities.set(key, (opportunities.get(key) ?? 0) + 1);
  }
  const transitions = [...pairCounts.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([pair, count]) => {
    const kind = withinPairs.has(pair) ? "within" as const : "boundary" as const;
    const possible = opportunities.get(`${kind}:${pair[0]}`) ?? count;
    return {
      from: pair[0],
      to: pair[1],
      count,
      opportunities: possible,
      probability: `${(count / possible).toFixed(2)} (${count}/${possible})`,
      kind,
    };
  });
  const events: AudioEvent[] = streamNotes.map((label, index) => ({ pitch: pitchMapping[label], start: index * ioI, duration: toneDuration }));
  return {
    units: ["ABC", "DEF", "GHI"].map((label) => ({ label, notes: label.split("") })),
    unitSequence: streamUnitSequence,
    noteSequence: streamNotes,
    events,
    eventFrequencies: pitchLabels.map((label) => ({ label, count: streamNotes.filter((note) => note === label).length, share: `${(streamNotes.filter((note) => note === label).length / streamNotes.length).toFixed(2)} (${streamNotes.filter((note) => note === label).length}/${streamNotes.length})` })),
    transitions,
    withinAudit: auditIntervals(streamNotes, "within"),
    boundaryAudit: auditIntervals(streamNotes, "boundary"),
    pitchMapping: pitchLabels.map((label) => ({ label, midi: pitchMapping[label], frequency: `${frequencyForMidi(pitchMapping[label]).toFixed(2)} Hz` })),
    audioSpec: {
      duration: "0.24 s per tone",
      ioI: "0.32 s between onsets",
      timbre: "one shared triangle oscillator",
      gain: "0.12 peak in the shared AudioExample envelope",
      envelope: "same short attack/release on every tone; no boundary-specific articulation",
    },
    acousticAudit: [
      "No pause or extra gap occurs at a unit boundary; every onset uses the same 0.32 s IOI.",
      "Tone duration, gain, oscillator type, attack, and release are invariant across all positions.",
      "The pitch mapping is deliberately non-monotonic rather than A < B < C < … < I.",
      "Within-unit intervals average 5.00 semitones; boundary intervals also average 5.00 semitones.",
      "Within-unit directions are 12 up / 12 down; boundary directions are 6 up / 5 down.",
      "The maximum interval is 10 semitones both within units and across boundaries; no register reset marks a boundary.",
    ],
    note: "▲ Constructed Saffran-style teaching demonstration. The units and probabilities are generated from this original stream, not copied from a published stimulus.",
  };
}

function createWorld(label: string, counts: [string, string, number][]): StatisticalWorld {
  const pairs = counts.map(([from, to, count]) => ({ from, to, count }));
  const sequence = counts.flatMap(([from, to, count]) => Array.from({ length: count }, () => [from, to])).flat();
  const worldPitch: Record<string, number> = { X: 60, W: 64, Y: 67, Z: 71 };
  const events: AudioEvent[] = sequence.map((value, index) => ({ pitch: worldPitch[value], start: index * 0.18, duration: 0.13 }));
  const marginalTotals = ["Y", "Z"].map((target) => ({ label: target, count: pairs.filter((pair) => pair.to === target).reduce((sum, pair) => sum + pair.count, 0) }));
  const xOpportunities = pairs.filter((pair) => pair.from === "X").reduce((sum, pair) => sum + pair.count, 0);
  const conditionals = ["Y", "Z"].map((target) => {
    const count = pairs.find((pair) => pair.from === "X" && pair.to === target)?.count ?? 0;
    return { label: `P(${target} | X)`, count, opportunities: xOpportunities, probability: `${(count / xOpportunities).toFixed(2)} (${count}/${xOpportunities})` };
  });
  return { label, pairs, sequence, events, marginalTotals, conditionals, framingTransitions: Math.max(sequence.length - 1 - counts.reduce((sum, [, , count]) => sum + count, 0), 0), note: "▲ Pedagogical micro-world. The 39 destination→source links connect the played pairs but do not change the controlled X→Y / X→Z comparison." };
}

const stream = createStream();
const worlds: [StatisticalWorld, StatisticalWorld] = [
  createWorld("WORLD A", [["X", "Y", 16], ["X", "Z", 4], ["W", "Y", 4], ["W", "Z", 16]]),
  createWorld("WORLD B", [["X", "Y", 4], ["X", "Z", 16], ["W", "Y", 16], ["W", "Z", 4]]),
];

const cards = (items: [string, string, string][]) => items.map(([label, body, colour]) => ({ label, body, colour }));

const evidence: EvidenceXray[] = [
  {
    title: "Saffran et al. (1999)",
    label: "empirical study",
    citation: "Saffran, J. R., Johnson, E. K., Aslin, R. N., &amp; Newport, E. L. (1999). Statistical learning of tone sequences by human infants and adults. <i>Cognition, 70</i>(1), 27–52.",
    design: "Continuous non-linguistic auditory sequences organised into tone words; adults and 8-month-old infants were tested for segmentation.",
    testedLabel: "what it tested",
    tested: "Whether statistical information could support segmentation when ordinary acoustic word-boundary cues were absent.",
    foundLabel: "what it found",
    found: "Adults and infants showed sensitivity to statistically defined tone groupings.",
    notTested: "Whether the webpage visitor learns the constructed stream, or whether one universal TP algorithm explains the behaviour.",
    doi: "10.1016/S0010-0277(98)00075-4",
  },
  {
    title: "Tillmann, Bharucha & Bigand (2000)",
    label: "process model",
    citation: "Tillmann, B., Bharucha, J. J., &amp; Bigand, E. (2000). Implicit learning of tonality: A self-organizing approach. <i>Psychological Review, 107</i>(4), 885–913.",
    design: "A self-organising computational network exposed to simultaneous and sequential tonal combinations.",
    testedLabel: "what it modelled",
    tested: "Whether exposure could produce internal organisation resembling observed tone, chord, key, memory, relatedness, and expectancy findings.",
    foundLabel: "what it contributes",
    found: "A computationally plausible route from tonal exposure to structured internal activation.",
    notTested: "That human listeners use this exact network or that tonality is only a frequency table.",
    doi: "10.1037/0033-295X.107.4.885",
  },
  {
    title: "Loui, Wessel & Hudson Kam (2010)",
    label: "empirical study",
    citation: "Loui, P., Wessel, D. L., &amp; Hudson Kam, C. L. (2010). Humans rapidly learn grammatical structure in a new musical scale. <i>Music Perception, 27</i>(5), 377–388.",
    design: "Novel Bohlen–Pierce scale and finite-state musical grammars followed by recognition, generalisation, event-frequency, and preference tests.",
    testedLabel: "what it tested",
    tested: "Whether brief passive exposure can produce knowledge of a previously unfamiliar musical system.",
    foundLabel: "what it found",
    found: "After approximately 25–30 minutes, participants showed structural learning and preference effects that were not identical outcomes.",
    notTested: "Full cultural enculturation, a universal relation between learning and liking, or the visitor’s learning from this page.",
    doi: "10.1525/mp.2010.27.5.377",
  },
  {
    title: "Pearce (2018)",
    label: "review",
    citation: "Pearce, M. T. (2018). Statistical learning and probabilistic prediction in music cognition: Mechanisms of stylistic enculturation. <i>Annals of the New York Academy of Sciences, 1423</i>(1), 378–395.",
    design: "Integrative review of exposure, learned musical models, probabilistic prediction, enculturation, and IDyOM simulations.",
    testedLabel: "what it separates",
    tested: "The statistical-learning hypothesis from the probabilistic-prediction hypothesis.",
    foundLabel: "what it contributes",
    found: "A formal bridge from learned regularities to predictions about musical events across short and long timescales.",
    notTested: "Causal proof that human listeners acquired their knowledge through the same mechanism as an IDyOM model.",
    doi: "10.1111/nyas.13654",
  },
  {
    title: "Krumhansl (2015)",
    label: "review",
    citation: "Krumhansl, C. L. (2015). Statistics, structure, and style in music. <i>Music Perception, 33</i>(1), 20–31.",
    design: "Critical theoretical essay on statistical learning, psychological measurement, tonality, and musical structure.",
    testedLabel: "what it cautions",
    tested: "Whether simple unidimensional sequential statistics are sufficient for music cognition.",
    foundLabel: "what it highlights",
    found: "Hierarchy, non-adjacent relationships, pitch–time interaction, and changing probabilities complicate adjacent-event accounts.",
    notTested: "That statistical learning is irrelevant or that all learning mechanisms are known.",
    doi: "10.1525/mp.2015.33.1.20",
  },
  {
    title: "Perruchet & Christiansen (2019)",
    label: "review",
    citation: "Perruchet, P. (2019). What mechanisms underlie implicit statistical learning? Transitional probabilities versus chunks in language learning. <i>Topics in Cognitive Science, 11</i>(3), 520–535; Christiansen, M. H. (2019). Implicit statistical learning: A tale of two literatures. <i>Topics in Cognitive Science, 11</i>(3), 468–481.",
    design: "Mechanism-focused reviews of transitional-probability, chunking, implicit-learning, and memory-based accounts.",
    testedLabel: "what they debate",
    tested: "Whether observed statistical sensitivity uniquely establishes pairwise probability computation.",
    foundLabel: "what they contribute",
    found: "Chunking and basic learning/memory mechanisms remain serious alternatives or complements to a literal TP account.",
    notTested: "A single replacement mechanism that settles the music literature.",
    doi: "10.1111/tops.12403; 10.1111/tops.12332",
  },
  {
    title: "Morgan et al. (2019)",
    label: "empirical study",
    citation: "Morgan, E., Fogel, A., Nair, A., &amp; Patel, A. D. (2019). Statistical learning and Gestalt-like principles predict melodic expectations. <i>Cognition, 189</i>, 23–34.",
    design: "Computational predictors compared in a musical cloze task in which listeners produced the note they expected next.",
    testedLabel: "what it tested",
    tested: "Whether melodic expectations are better explained by Gestalt-like principles, statistical learning, or both.",
    foundLabel: "what it contributes",
    found: "The evidence supports coexistence of current perceptual constraints and learned melodic statistics.",
    notTested: "A strict nature-versus-learning split, or a complete account of every musical expectation.",
    doi: "10.1016/j.cognition.2018.12.015",
  },
];

const minimumReading: Source[] = [
  { citation: "Saffran, J. R., Johnson, E. K., Aslin, R. N., &amp; Newport, E. L. (1999). Statistical learning of tone sequences by human infants and adults. <i>Cognition, 70</i>(1), 27–52.", contribution: "Foundational non-linguistic auditory evidence for statistically supported segmentation.", doi: "10.1016/S0010-0277(98)00075-4" },
  { citation: "Tillmann, B., Bharucha, J. J., &amp; Bigand, E. (2000). Implicit learning of tonality: A self-organizing approach. <i>Psychological Review, 107</i>(4), 885–913.", contribution: "Computational demonstration linking tonal exposure to organised tonal relationships.", doi: "10.1037/0033-295X.107.4.885" },
  { citation: "Loui, P., Wessel, D. L., &amp; Hudson Kam, C. L. (2010). Humans rapidly learn grammatical structure in a new musical scale. <i>Music Perception, 27</i>(5), 377–388.", contribution: "Rapid learning in a novel musical system, including the learning/preference boundary.", doi: "10.1525/mp.2010.27.5.377" },
  { citation: "Pearce, M. T. (2018). Statistical learning and probabilistic prediction in music cognition: Mechanisms of stylistic enculturation. <i>Annals of the New York Academy of Sciences, 1423</i>(1), 378–395.", contribution: "Explicit separation of learned regularities from online probabilistic prediction.", doi: "10.1111/nyas.13654" },
  { citation: "Krumhansl, C. L. (2015). Statistics, structure, and style in music. <i>Music Perception, 33</i>(1), 20–31.", contribution: "Critical boundary around hierarchy, non-adjacent structure, pitch–time interaction, and changing probabilities.", doi: "10.1525/mp.2015.33.1.20" },
];

const fullSources: Source[] = [
  ...minimumReading,
  { citation: "Perruchet, P. (2019). What mechanisms underlie implicit statistical learning? Transitional probabilities versus chunks in language learning. <i>Topics in Cognitive Science, 11</i>(3), 520–535.", contribution: "Mechanism debate about pairwise transitional probabilities and chunk-based alternatives.", doi: "10.1111/tops.12403" },
  { citation: "Christiansen, M. H. (2019). Implicit statistical learning: A tale of two literatures. <i>Topics in Cognitive Science, 11</i>(3), 468–481.", contribution: "Statistically based chunking and the relationship between learning and memory.", doi: "10.1111/tops.12332" },
  { citation: "Morgan, E., Fogel, A., Nair, A., &amp; Patel, A. D. (2019). Statistical learning and Gestalt-like principles predict melodic expectations. <i>Cognition, 189</i>, 23–34.", contribution: "Convergent statistical-learning and Gestalt-like predictors of melodic expectation.", doi: "10.1016/j.cognition.2018.12.015" },
];

const statistical: StatisticalRecordContent = {
  identity: {
    knowledgeForm: "Research framework / mechanism family",
    status: "Foundational research framework in music cognition",
    discipline: "Music Psychology",
    branch: "Expectation & Prediction",
  },
  opening: {
    lede: "You were not handed a probability table. Yet repeated exposure can make some continuations feel more available, some sequences easier to group, and some musical worlds more familiar than others.",
    cards: cards([
      ["THE QUESTION", "How can exposure make regularities usable without explicit instruction?", "var(--teal)"],
      ["THE STATUS", "A multi-contributor research framework / mechanism family — not one canonical theory.", "var(--red)"],
      ["THE RHYTHM", "EXPOSURE → REGULARITY → LEARNING → EXPECTATION → UPDATE", "var(--gold-deep)"],
    ]),
    note: "✦ Concept Lab synthesis. The cycle arranges the learning problem for teaching; it is not a literal neural algorithm.",
  },
  exposure: {
    lede: "A listener can become sensitive to distributional and sequential structure simply because those patterns keep occurring in experience. The page should keep the exposure history visible rather than treating expectation as appearing from nowhere.",
    cards: cards([
      ["DISTRIBUTION", "Which events, combinations, or structures occur more often?", "var(--teal)"],
      ["SEQUENCE", "Which event tends to follow which context?", "var(--red)"],
      ["NO CLASSROOM REQUIRED", "Formal instruction and verbal rule knowledge are not prerequisites for every form of learning.", "var(--gold-deep)"],
      ["NO GUARANTEE", "Exposure supplies information; it does not guarantee learning, awareness, or agreement with one mechanism.", "var(--plum-deep)"],
    ]),
    note: "■ Plain-language explanation of the research problem. Incidental and implicit are related descriptions, not automatic synonyms.",
  },
  frequency: {
    lede: "Start with the simplest statistic: how common is an event across the whole stream? Frequency can support familiarity, but it does not tell us what is likely after a particular context.",
    cards: cards([
      ["P(B)", "HOW COMMON IS B OVERALL?", "var(--teal)"],
      ["COUNTER", "Count appearances across the complete stream, not only after one preceding event.", "var(--gold-deep)"],
      ["NOT THE WHOLE STORY", "Frequency is not automatically familiarity, liking, tonality, or expectation.", "var(--red)"],
    ]),
    note: "■ Plain-language paraphrase. The counter is a teaching representation, not a claim that listeners consciously tally events.",
  },
  transition: {
    lede: "Now narrow the question. Transitional probability asks how likely B is after A, given that A occurred and given the opportunities for A to be followed.",
    cards: cards([
      ["P(B | A)", "HOW LIKELY IS B AFTER A?", "var(--red)"],
      ["HIGH", "If A is almost always followed by B, A → B carries strong conditional information.", "var(--teal)"],
      ["MANY OPTIONS", "If several events follow A, each individual continuation can be less predictable even when the stream is familiar.", "var(--gold-deep)"],
    ]),
    note: "■ The formula is a compact description of a relation. It does not imply conscious probability calculation or one agreed neural implementation.",
  },
  comparison: {
    lede: "The hardest distinction is often the smallest one: an event can be common overall but unlikely after this context, or rare overall but highly predictable after another.",
    cards: cards([
      ["COMMON OVERALL", "B appears many times across the stream, but several events compete after A.", "var(--teal)"],
      ["LIKELY AFTER A", "Z is rare across the whole stream, yet X strongly narrows the next-event possibilities.", "var(--red)"],
      ["THE LESSON", "COMMON ≠ LIKELY NEXT", "var(--gold-deep)"],
    ]),
    note: "▲ Constructed comparison. The examples teach marginal versus conditional probability; they are not observations from a published musical corpus.",
  },
  hiddenLanguage: {
    lede: "A continuous stream can contain statistically coherent units without a pause, accent, loudness change, timbre change, or special articulation at the unit boundary.",
    stream,
    note: "▲ Constructed Saffran-style teaching demonstration. The stream exposes information a learner could exploit; it does not establish that the visitor learned it.",
  },
  segmentation: {
    lede: "Saffran et al. provide foundational evidence that adults and 8-month-old infants can use statistical information to segment continuous non-linguistic tone sequences. The result supports learning capacity, not mature musical enculturation in infancy.",
    cards: cards([
      ["CONTINUOUS INPUT", "The tone stream contains no ordinary acoustic word-boundary cue.", "var(--teal)"],
      ["STATISTICAL CUE", "Relations among tones provide information about possible recurring units.", "var(--red)"],
      ["BOUNDARY", "Statistical learning is connected to segmentation, but segmentation is not the whole field.", "var(--gold-deep)"],
    ]),
    note: "■ Foundational empirical evidence, faithfully bounded. The constructed interaction is not the Saffran experiment and does not copy one exact probability condition.",
  },
  enculturation: {
    lede: "Years of listening can make a style’s regularities feel usable without turning a musical culture into one homogeneous probability distribution.",
    cards: cards([
      ["STYLE", "Listeners acquire expectations through overlapping genres, communities, training, and personal histories.", "var(--teal)"],
      ["CULTURE", "Different exposure histories can support different internal expectations.", "var(--red)"],
      ["NOT ALL CULTURE", "Social, perceptual, cognitive, motor, and cultural processes may contribute alongside statistical learning.", "var(--plum-deep)"],
    ]),
    note: "✦ Concept Lab synthesis of the enculturation problem. Culture-sensitive does not mean a simple Western/non-Western binary.",
  },
  clocks: {
    lede: "A current piece can teach local regularities over seconds or minutes. A musical environment can shape style-sensitive expectations over months, years, or a lifetime. These clocks can interact; they are not separate brain modules.",
    cards: cards([
      ["SHORT-TERM", "Current piece, current exposure, current context.", "var(--red)"],
      ["LONG-TERM", "Style, culture, training, and accumulated listening history.", "var(--teal)"],
      ["SCALE WARNING", "A few minutes of artificial exposure are not a miniature complete culture.", "var(--gold-deep)"],
    ]),
    note: "■ Faithful distinction between dynamic learning and long-term stylistic learning; the visual arrangement is editorial.",
  },
  newWorld: {
    lede: "Loui, Wessel, and Hudson Kam tested whether people could learn structure in a novel musical system rather than merely rely on familiar Western tonal knowledge.",
    cards: cards([
      ["NEW SCALE", "The Bohlen–Pierce scale reduced reliance on familiar Western tonal regularities.", "var(--teal)"],
      ["BRIEF EXPOSURE", "Approximately 25–30 minutes of passive exposure preceded the tests.", "var(--red)"],
      ["WHAT WAS MEASURED", "Recognition, generalisation, event-frequency sensitivity, and preference were treated as distinguishable outcomes.", "var(--gold-deep)"],
    ]),
    note: "■ Reported study boundary. Brief controlled exposure can produce measurable structural knowledge; it does not create a complete new musical culture.",
  },
  liking: {
    lede: "Structural learning and preference can move together in some conditions and separate in others. The useful correction is not that learning never changes liking, but that learning is not liking.",
    cards: cards([
      ["LEARNING", "Recognition, generalisation, and sensitivity to structural regularities.", "var(--teal)"],
      ["PREFERENCE", "Affective or evaluative response to repeated or novel musical material.", "var(--red)"],
      ["DO NOT COLLAPSE", "Statistically likely does not automatically mean preferred, and familiarity does not automatically mean liked.", "var(--plum-deep)"],
    ]),
    note: "■ Loui et al. provide a bounded learning/preference lesson. Exposure can change preference, but preference is not a direct readout of learning.",
  },
  worlds: {
    lede: "Hold the current context constant and reverse only the exposure history. The marginal frequency of Y and Z stays matched while the conditional distribution after X changes.",
    worlds,
    testContext: "CURRENT CONTEXT = X",
    audioSpec: "Both worlds use the same X/W/Y/Z pitch mapping, 0.13 s tones, 0.18 s IOI, triangle timbre, gain, and envelope. Only the exposure sequence changes.",
    note: "▲ Pedagogical micro-world. It illustrates exposure-dependent conditional expectation; it does not claim that the visitor has acquired either expectation.",
  },
  prediction: {
    lede: "Learning and prediction are adjacent but different processes. The statistical-learning hypothesis concerns acquiring regularities; the probabilistic-prediction hypothesis concerns using learned models during current listening.",
    cards: cards([
      ["LEARNING", "EXPERIENCE → LEARNED REGULARITIES / REPRESENTATION", "var(--teal)"],
      ["PREDICTION", "LEARNED MODEL → ONLINE EXPECTATION", "var(--red)"],
      ["BOUNDARY", "A model that predicts a listener’s behaviour is not automatically evidence that human learning used the same mechanism.", "var(--plum-deep)"],
    ]),
    note: "● Pearce’s SLH / PPH distinction, with ■ plain-language translation. The architecture is a teaching model, not a universally accepted representational format.",
  },
  tonalGestalt: {
    lede: "Statistical learning can sit beside tonal hierarchy and Gestalt-like perception without replacing either. What the current input affords and what experience has taught can jointly shape expectation.",
    cards: cards([
      ["TONAL HIERARCHY", "Exposure may contribute to tonal knowledge, but tonal organisation is not an event-frequency table.", "var(--teal)"],
      ["GESTALT", "WHAT GROUPS NOW? Current perceptual cues can support grouping and expectation.", "var(--gold-deep)"],
      ["STATISTICAL LEARNING", "WHAT HAS EXPERIENCE TAUGHT YOU TO GROUP? Learned distributions can add style-sensitive organisation.", "var(--red)"],
      ["NEIGHBOURS", "Meyer, Narmour, and Huron answer different expectation questions; this record asks where learned regularities may come from.", "var(--plum-deep)"],
    ]),
    note: "✦ Editorial synthesis supported by the neighbouring literatures. It is not a strict nature-versus-learning opposition and does not redefine the existing records.",
  },
  mechanism: {
    lede: "The field has strong evidence for sensitivity to statistical structure and weaker agreement about what computational mechanism produces it.",
    cards: cards([
      ["SUPPORTED", "Sensitivity to regularities after exposure is well supported across experimental paradigms.", "var(--teal)"],
      ["NOT SETTLED", "One agreed mechanism — literal pairwise TP calculation — has not been established.", "var(--red)"],
      ["CANDIDATES", "Transitional sensitivity, chunking, associative learning, memory-based processing, connectionist learning, and Bayesian approaches remain part of the debate.", "var(--gold-deep)"],
      ["TERMS OVERLAP", "Statistical and implicit-learning traditions overlap, but they historically emphasised different explanatory commitments.", "var(--plum-deep)"],
    ]),
    note: "? Contested mechanism. Perruchet and Christiansen are used to keep the debate open, not to install one replacement account as settled fact.",
  },
  realMusic: {
    lede: "A → B is a useful teaching lens. It is not a complete model of real musical structure.",
    cards: cards([
      ["HIERARCHY", "Musical relations can operate across levels rather than only between adjacent events.", "var(--teal)"],
      ["NON-ADJACENT", "Events separated in time can still matter to a listener’s organisation and expectation.", "var(--red)"],
      ["MULTI-DIMENSIONAL", "Pitch, time, meter, harmony, phrase structure, and style interact.", "var(--gold-deep)"],
      ["CHANGING", "Probabilities can change across a composition; deviations from norms can matter aesthetically.", "var(--plum-deep)"],
    ]),
    note: "■ Krumhansl’s boundary is a caution against reducing music cognition to adjacent note bigrams, not a rejection of statistical learning.",
  },
  explains: {
    lede: "Statistical learning is useful when the question is how exposure can make regularities available for later organisation and expectation.",
    cards: cards([
      ["EXPLAINS WELL", "Sensitivity after exposure, continuous-stream segmentation, local expectation, and rapid artificial-system learning.", "var(--teal)"],
      ["ALSO CONNECTS", "Familiarity-sensitive processing, style learning, aspects of enculturation, and possible contributions to tonal knowledge.", "var(--gold-deep)"],
      ["NOT COMPLETE", "It does not by itself explain all syntax, emotion, preference, creativity, expertise, culture, or expectation.", "var(--red)"],
    ]),
    note: "✦ Concept Lab synthesis of explanatory reach. Each proposed connection remains weaker than a claim that the framework explains the whole phenomenon.",
  },
  stops: {
    lede: "The framework becomes more useful when its stopping points are visible.",
    cards: cards([
      ["NOT CONSCIOUS ARITHMETIC", "Notation represents a relation; it does not describe a required conscious operation.", "var(--red)"],
      ["NOT IDyOM", "IDyOM is a specific computational model; statistical learning is the broader framework.", "var(--plum-deep)"],
      ["NOT PREDICTIVE PROCESSING", "Predictive processing is a broader architecture involving hierarchical prediction and prediction error.", "var(--gold-deep)"],
      ["STILL OPEN", "The unity of the mechanism, the representational format, causal enculturation claims, and domain-generality remain qualified.", "var(--teal)"],
    ]),
    note: "? Open questions are part of the record, not defects to be hidden behind a smooth final diagram.",
  },
  model: {
    lede: "The page’s final map links exposure to learned regularities and prediction while keeping short- and long-term experience visible. It is a Concept Lab synthesis, not a literal neural pathway.",
    steps: cards([
      ["EXPERIENCE", "Current pieces and accumulated style/cultural exposure supply different timescales of information.", "var(--teal)"],
      ["SENSITIVITY", "The learner becomes responsive to frequencies, transitions, patterns, and other regularities.", "var(--red)"],
      ["LEARNED REPRESENTATION", "Different theories implement learning and representation differently; no universal format is assumed.", "var(--gold-deep)"],
      ["PROBABILISTIC EXPECTATION", "The learned regularities can influence possible continuations and musical organisation.", "var(--plum-deep)"],
      ["NEW EXPERIENCE", "Listening supplies further input, so the system is represented as a loop rather than a one-way endpoint.", "var(--teal)"],
    ]),
    note: "✦ Concept Lab synthesis. Exact learning mechanisms and representational formats remain debated.",
  },
  evidence: {
    lede: "The evidence trail contains experiments, computational models, reviews, and comparative predictors. They support different links in the explanation and should not be treated as interchangeable proof.",
    items: evidence,
    note: "■ Evidence X-ray. Human exposure experiments, computational fit, and theoretical critique remain visibly distinct.",
  },
};

export const statisticalLearningOfMusic: TheoryRecord = {
  id: "statistical-learning-of-music",
  kind: "theory",
  slug: "statistical-learning-of-music",
  title: "Statistical Learning of Music",
  hook: "How did your ear learn the pattern?",
  oneSentence: "A multi-contributor research framework examining how exposure to distributional and sequential regularities can shape musical organisation, segmentation, familiarity, and probabilistic expectation.",
  discipline: "music-psych",
  topics: ["statistical learning", "musical expectation", "segmentation", "enculturation", "implicit learning", "probabilistic prediction"],
  facts: ["frequency ≠ transition", "exposure shapes expectation", "learning ≠ liking", "two clocks", "mechanism debated"],
  statusChip: "Research framework / mechanism family",
  origins: [
    { year: "1999", author: "Saffran · Johnson · Aslin · Newport", work: "Tone-sequence statistical learning", contribution: "Foundational non-linguistic auditory evidence for statistically supported segmentation in adults and infants." },
    { year: "2000", author: "Tillmann · Bharucha · Bigand", work: "Self-organising tonal learning", contribution: "Computational demonstration linking tonal exposure to organised tonal relationships." },
    { year: "2010", author: "Loui · Wessel · Hudson Kam", work: "Novel musical-system learning", contribution: "Rapid learning and generalisation in the Bohlen–Pierce system." },
    { year: "2018 → present", author: "Pearce and related traditions", work: "Statistical learning, prediction, and enculturation", contribution: "Formal bridge from exposure-dependent regularities to probabilistic musical expectation, alongside continuing mechanism debate." },
  ],
  trailLede: "The trail is a research landscape rather than a founder story: auditory experiments, computational models, artificial-system learning, integrative prediction accounts, and critical mechanism reviews converge on a family of questions.",
  oversimplificationsLede: "Do not leave with these shortcuts.",
  oversimplifications: [
    "Statistical learning is not conscious arithmetic or a requirement to verbalise the rule.",
    "Statistical learning is not automatically unconscious and is not identical to implicit learning.",
    "Event frequency is not transitional probability, and transitional probability is not the only statistic.",
    "Statistical learning is not segmentation only, and learning is not liking.",
    "A few minutes of laboratory exposure are not complete musical enculturation.",
    "Tonal hierarchy is not a frequency table, and real music is not only adjacent A → B transitions.",
    "Statistical learning is not IDyOM, predictive processing, or one proven domain-general module.",
    "Clicking Play does not demonstrate that a visitor learned the stream or acquired a probability model.",
  ],
  qualifications: [
    "The framework’s status is multi-contributor and plural; no single author is its founder or sole theorist.",
    "Sensitivity to regularities is better established than one agreed computational mechanism.",
    "IDyOM simulations are consistent with learned-probability accounts but do not by themselves provide causal evidence for the human learning mechanism.",
    "The constructed audio streams are original teaching devices and are not reproductions of Saffran’s published stimuli.",
    "The two interactions display controlled examples; they do not diagnose learning, awareness, musical ability, or preference.",
  ],
  minimumReading,
  minimumReadingLabel: "If you read five things",
  fullSources,
  relatedToLede: "These records share the expectation and organisation neighbourhood but answer different questions.",
  relatedTo: [
    { recordId: "meyers-expectancy-theory", relation: "asks where expectation can come from alongside", body: "Meyer explains why implication, delay, and fulfilment matter for musical meaning; this record asks how exposure may make regularities available for expectation." },
    { recordId: "narmours-implication-realization-theory", relation: "complements local implication with", body: "Narmour models local melodic continuation; statistical learning models how exposure can shape knowledge of recurring distributions and sequences." },
    { recordId: "hurons-itpra-theory-of-expectation", relation: "provides a learning bridge for", body: "Huron maps response systems around expectation; this record separates acquiring regularities from using them to predict." },
    { recordId: "tonal-hierarchy", relation: "offers a possible exposure-based contribution to", body: "Statistical properties may contribute to tonal knowledge, but tonal hierarchy remains contextual, hierarchical, and non-reducible to event counts." },
    { recordId: "gestalt-principles-in-music", relation: "complements with learned history beside", body: "Gestalt-like current perceptual relations and exposure-dependent statistical regularities can jointly shape melodic grouping and expectation." },
  ],
  statistical,
  provenance: [
    { glyph: "●", colour: "var(--teal)", label: "source-grounded framework claims", note: "Claims about the status of the research tradition, Saffran’s tone-sequence evidence, Tillmann’s computational model, Loui’s novel-system study, Pearce’s hypotheses, and Krumhansl’s structural cautions are attributed to the named sources." },
    { glyph: "■", colour: "var(--red)", label: "empirical findings and faithful explanations", note: "Plain-language summaries preserve the distinction between what an experiment or model showed, what it measured, and what it did not establish." },
    { glyph: "▲", colour: "var(--gold-deep)", label: "constructed teaching systems", note: "The Hidden Musical Language stream, the World A / World B sequences, probability counters, and audio controls are original pedagogical constructions, not published stimuli or tests of visitor learning." },
    { glyph: "✦", colour: "var(--plum-deep)", label: "Concept Lab synthesis", note: "The exposure → regularity → learning → expectation architecture, relations among neighbouring records, visual sequence, and final loop arrange the literature for teaching." },
    { glyph: "?", colour: "var(--pen-3)", label: "contested or unresolved mechanism", note: "The exact computational mechanism, representational format, degree of domain-generality, relation between statistical and implicit learning, and causal interpretation of enculturation remain qualified." },
  ],
};

export default statisticalLearningOfMusic;

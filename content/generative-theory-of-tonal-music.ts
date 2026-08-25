import type {
  ASACard,
  EvidenceXray,
  GTTMAnalysisSpec,
  GTTMRecordContent,
  GTTMSurfaceEvent,
  TheoryRecord,
} from "./types";

const pitches = [60, 64, 67, 64, 65, 69, 67, 65, 67, 71, 69, 67, 64, 62, 60, 60];
const noteNames = ["C4", "E4", "G4", "E4", "F4", "A4", "G4", "F4", "G4", "B4", "A4", "G4", "E4", "D4", "C4", "C4"];
const harmonies = ["I", "I", "I", "I", "IV", "IV", "IV", "IV", "V", "V", "V", "V", "I", "I", "I", "I"];

const surfaceEvents: GTTMSurfaceEvent[] = pitches.map((pitch, index) => ({
  id: index + 1,
  pitch,
  start: index * 0.625,
  duration: 0.48,
  note: noteNames[index],
  harmony: harmonies[index],
  beat: `${(index % 4) + 1}`,
}));

const analysis: GTTMAnalysisSpec = {
  surface: {
    events: surfaceEvents,
    key: "C major",
    meter: "4/4",
    tempo: "96 BPM · quarter-note tactus",
    timbre: "neutral triangle oscillator",
    gain: "constant peak gain 0.12; no expressive dynamics",
    harmony: "proposed teaching context: I | IV | V | I by bar; no backing chord track",
  },
  grouping: {
    local: ["events 1–4", "events 5–8", "events 9–12", "events 13–16"],
    higher: ["events 1–8", "events 9–16", "events 1–16"],
    boundaries: ["after 4", "after 8", "after 12", "after 16"],
    rationale: "The four-bar phrase supplies local groups, two larger halves, and a whole-phrase boundary. These are a constructed pedagogical analysis, not a claim that every listener must hear one grouping.",
  },
  meter: {
    tactus: "quarter-note tactus in 4/4",
    levels: ["beat: events 1, 2, 3, 4…", "bar: events 1, 5, 9, 13", "half-bar: events 1, 3, 5, 7…", "phrase: events 1 and 9"],
    strengths: ["bar starts are strong within the phrase", "beats 2 and 4 are weaker than beats 1 and 3", "metrical strength is not the same thing as loudness"],
    relation: "Meter offers a hierarchy of temporal positions; it does not itself decide grouping, pitch importance, or prolongational tension.",
  },
  timeSpans: {
    spans: ["bar 1: events 1–4", "bar 2: events 5–8", "bar 3: events 9–12", "bar 4: events 13–16", "higher spans: 1–8 and 9–16", "whole span: 1–16"],
    heads: ["bar 1 → event 1 C (I)", "bar 2 → event 5 F (IV)", "bar 3 → event 9 G (V)", "bar 4 → event 16 C (I)"],
    dependency: "This time-span reduction is a pedagogical choice that uses grouping, meter, and tonal context to select structurally important events. Alternative analyses remain possible.",
    tree: {
      label: "event 1 · C · whole phrase",
      sub: "I · span 1–16",
      relation: "head",
      children: [
        { label: "event 1 · C", sub: "I · span 1–8", relation: "span", children: [{ label: "event 1 · C", sub: "bar 1", relation: "head" }, { label: "event 5 · F", sub: "bar 2 · IV", relation: "head" }] },
        { label: "event 9 · G", sub: "V · span 9–16", relation: "span", children: [{ label: "event 9 · G", sub: "bar 3", relation: "head" }, { label: "event 16 · C", sub: "bar 4 · I", relation: "head" }] },
      ],
    },
  },
  prolongation: {
    relations: ["events 1–4 elaborate a local I region", "event 5 begins IV: a progression from I to IV", "event 9 begins V: a progression from IV to V", "event 16 restores I: a progression from V to I", "events 6–8, 10–12, and 13–15 are treated as local elaborations in this teaching map"],
    interpretation: "This relation map asks how tones elaborate, prolong, or progress within a tonal span. It is not the same tree as time-span reduction, and neither tree turns subordinate tones into deleted events.",
    tree: {
      label: "tonal relation map · C major",
      sub: "I → IV → V → I",
      relation: "head",
      children: [
        { label: "I region · events 1–4", sub: "event 1 C anchors; event 4 E closes the local elaboration", relation: "strong prolongation" },
        { label: "IV region · events 5–8", sub: "event 5 F", relation: "progression" },
        { label: "V region · events 9–12", sub: "event 9 G", relation: "progression" },
        { label: "I region · events 13–16", sub: "event 16 C", relation: "progression" },
      ],
    },
  },
  reductions: [
    { label: "Surface", body: "All sixteen events remain. This is the audible phrase that every other state refers back to.", included: Array.from({ length: 16 }, (_, index) => index + 1) },
    { label: "Light reduction", body: "The four bar-heads plus the final cadence point remain: 1, 5, 9, 13, 16. The subordinate events are not erased from the original phrase.", included: [1, 5, 9, 13, 16] },
    { label: "Deeper reduction", body: "A compact I–IV–V–I path remains: 1, 5, 9, 16. This is a pedagogical sonification of the proposed time-span analysis.", included: [1, 5, 9, 16] },
    { label: "Structural skeleton", body: "The broadest outline keeps tonic–dominant–tonic: 1, 9, 16. It shows a relation, not a claim that the other notes disappear perceptually.", included: [1, 9, 16] },
  ],
};

const card = (label: string, body: string, colour = "var(--teal)"): ASACard => ({ label, body, colour });

const evidence: EvidenceXray[] = [
  { title: "Lerdahl & Jackendoff (1983)", label: "process model", citation: "Lerdahl, F., &amp; Jackendoff, R. (1983). <i>A Generative Theory of Tonal Music</i>. MIT Press.", design: "Formal theory and analytic framework; not a single participant study.", testedLabel: "what it proposes", tested: "A listener-oriented formal vocabulary for grouping, meter, time-span reduction, and prolongational reduction in tonal music.", foundLabel: "what it contributes", found: "A structured account of how a surface can be assigned nested descriptions and preferences by an experienced listener.", notTested: "That every listener constructs the same analysis, or that the formal rules alone predict every real-time judgment." },
  { title: "Palmer & Krumhansl (1987)", label: "empirical study", citation: "Palmer, C., &amp; Krumhansl, C. L. (1987). Independent prosodic and pitch contributions to musical phrase perception. <i>Journal of Experimental Psychology: Human Perception and Performance, 13</i>(1), 116–126.", design: "Two experiments on temporal and pitch contributions to phrase-completion judgments.", testedLabel: "what it tested", tested: "Whether phrase judgments reflect separable temporal/prosodic and pitch-context information.", foundLabel: "what it found", found: "Temporal and pitch information each contributed to listeners’ phrase-completion judgments.", notTested: "A direct validation of every GTTM rule or a complete analysis algorithm.", doi: "10.1037//0096-1523.13.1.116" },
  { title: "Palmer & Krumhansl (1990)", label: "empirical study", citation: "Palmer, C., &amp; Krumhansl, C. L. (1990). Mental representations for musical meter. <i>Journal of Experimental Psychology: Human Perception and Performance, 16</i>(4), 728–741.", design: "Experiments using temporal judgments and musical materials to examine metrical representation.", testedLabel: "what it tested", tested: "Whether listeners represent meter as a multilevel temporal hierarchy rather than a flat sequence of beats.", foundLabel: "what it found", found: "Judgments supported an internalised multilevel metrical organisation.", notTested: "That metrical strength is loudness, or that meter alone determines grouping and reduction.", doi: "10.1037//0096-1523.16.4.728" },
  { title: "Bigand & Poulin-Charronnat (2006)", label: "review", citation: "Bigand, E., &amp; Poulin-Charronnat, B. (2006). Are we ‘experienced listeners’? A review of the musical capacities that do not depend on formal musical training. <i>Cognition, 100</i>(1), 100–130.", design: "Review of behavioural and cognitive work on musical processing and experience.", testedLabel: "what it reviews", tested: "How musical knowledge, tonal stability, structure, expectancy, and experience are described across music-cognition research.", foundLabel: "what it contributes", found: "A bridge between formal music-theoretic descriptions and evidence about listeners’ tonal expectations and representations.", notTested: "A single settled cognitive implementation of GTTM’s full architecture.", doi: "10.1016/j.cognition.2005.11.007" },
  { title: "Hamanaka, Hirata & Tojo (2006; online 2007)", label: "process model", citation: "Hamanaka, M., Hirata, K., &amp; Tojo, S. (2006). Implementing ‘A Generative Theory of Tonal Music’. <i>Journal of New Music Research, 35</i>(4), 249–277.", design: "Computational implementation work that formalises selected GTTM analyses.", testedLabel: "what it tests", tested: "Whether parts of GTTM can be operationalised as a computational analysis system.", foundLabel: "what it contributes", found: "An important boundary case: formalisation can make some rules executable, while analytic preferences and ambiguity remain modelling choices.", notTested: "A proof that a computational output is the listener’s unique mental representation.", doi: "10.1080/09298210701563238" },
  { title: "Deliège (1987) · Frankland & Cohen (2004)", label: "empirical study", citation: "Deliège, I. (1987). Grouping conditions in listening to music: An approach to Lerdahl &amp; Jackendoff’s grouping preference rules. <i>Music Perception, 4</i>(4), 325–359; Frankland, B. W., &amp; Cohen, A. J. (2004). Parsing of melody: Quantification and testing of the local grouping rules of Lerdahl and Jackendoff’s A Generative Theory of Tonal Music. <i>Music Perception, 21</i>(4), 499–543.", design: "Listener and rule-focused studies that examine aspects of formalised grouping.", testedLabel: "what they test", tested: "Whether selected grouping conditions and local rules align with listeners’ segmentation or parsing responses.", foundLabel: "what they contribute", found: "Evidence and criticism for component rules, not a blanket confirmation of the whole generative architecture.", notTested: "The full four-structure theory, prolongational reduction, or universal listener agreement.", doi: "10.2307/40285378; 10.1525/mp.2004.21.4.499" },
];

const gttm: GTTMRecordContent = {
  analysis,
  opening: {
    lede: "GTTM begins with a musical surface and asks what an experienced listener might organise beneath it. The same sixteen notes can be described through several structures; the structures are related, but they answer different questions.",
    lenses: [
      { key: "group", label: "Grouping", question: "Where do events belong together?", colour: "var(--teal)" },
      { key: "meter", label: "Meter", question: "Which temporal positions are stronger?", colour: "var(--gold-deep)" },
      { key: "importance", label: "Importance", question: "Which events head larger spans?", colour: "var(--red)" },
      { key: "relation", label: "Tension · relation", question: "How do tones elaborate or progress?", colour: "var(--plum-deep)" },
    ],
    note: "▲ The audio is held constant. Selecting a lens changes the representation and the question, not the sound itself.",
  },
  generative: {
    lede: "Generative does not mean that the theory composes a melody for you. It means that a finite vocabulary of formal operations is intended to generate a structured description from a musical surface.",
    cards: [
      card("SURFACE", "The sounding events available to the listener: pitches, durations, attacks, and the surrounding tonal context."),
      card("STRUCTURE", "A hierarchy of groups, metrical positions, selected heads, and tonal relations that makes the surface intelligible."),
      card("LISTENER", "The theory idealises an experienced listener who can hear tonal and metrical organisation; it does not describe a blank ear."),
    ],
    note: "■ Faithful theory summary. The formal vocabulary is an analytic and cognitive proposal, not a claim that listening is literally a serial parser.",
  },
  listener: {
    lede: "The listener in GTTM is neither a passive microphone nor an unconstrained interpreter. Musical knowledge, tonal experience, and attention make some organisations available, while the formal rules constrain what counts as a well-formed analysis.",
    cards: [
      card("HEARS", "A patterned surface rather than isolated pitches."),
      card("ORGANISES", "Events into nested groups and temporal hierarchies."),
      card("PREFERS", "Some analyses over others when competing structures are possible."),
      card("REVISES", "An interpretation when later context changes what an earlier event can mean."),
    ],
    note: "✦ Editorial synthesis: experienced listening is the bridge between formal descriptions and psychological interpretation; the page does not treat it as a measured individual trait.",
  },
  groupingMeter: {
    lede: "Grouping and meter are not two names for the same segmentation. Grouping asks where events form units; meter asks how temporal positions are hierarchically weighted. They can support each other or pull apart.",
    grouping: ["nested units: local groups → groups of groups", "boundaries can be suggested by duration, register, contour, or closure", "a group boundary is not automatically a metrical downbeat"],
    meter: ["metrical levels can coexist: beat, half-bar, bar, phrase", "strength is a temporal relation, not an intensity setting", "metrical position can influence a later reduction without deciding it alone"],
    note: "■ These are distinct structures in GTTM. The constructed phrase uses a regular 4/4 meter so the distinction can be heard and inspected without changing the audio.",
  },
  rules: {
    lede: "A formal rule can make an analysis well-formed without making it the only preferred analysis. GTTM’s preference rules are therefore not interchangeable with strict constraints.",
    cards: [
      card("WELL-FORMEDNESS", "Does the proposed grouping or reduction satisfy the structural conditions of the theory?", "var(--teal)"),
      card("PREFERENCE", "Among possible well-formed analyses, which one best fits the listener’s intuitions and the musical cues?", "var(--red)"),
      card("CONFLICT", "When cues disagree, different listeners or contexts may support different analyses; ambiguity is part of the boundary, not a rendering bug.", "var(--gold-deep)"),
      card("TRANSFORMATION", "Subordinate transformational rules help resolve local conflicts; they do not turn the model into a single universal decision tree.", "var(--plum-deep)"),
    ],
    note: "■ The distinction between well-formedness and preference is essential: a preference rule can guide interpretation without functioning as a deterministic law.",
  },
  spans: {
    lede: "Grouping and meter make time spans available. Time-span segmentation is an intermediate bridge: it packages events into spans and selects heads for a reduction. It is not a fifth structure alongside grouping, meter, time-span reduction, and prolongation.",
    cards: [
      card("SEGMENT", "Use grouping and metrical boundaries to define local and higher spans."),
      card("SELECT A HEAD", "Choose the event that represents each span in the proposed reduction."),
      card("KEEP THE ALTERNATIVE", "A selected head is a structural representation, not proof that other events are cognitively absent."),
    ],
    note: "▲ The heads shown on this page are a constructed pedagogical analysis of one phrase. They are labelled as such so the teaching visual does not masquerade as a unique canonical parse.",
  },
  reduction: {
    lede: "Reduction changes the level of description. It does not delete the sounding notes from the musical surface, and it does not mean that subordinate notes are simply inaudible. Listen for what the representation foregrounds at each level.",
    note: "▲ PEDAGOGICAL SONIFICATION OF A CONSTRUCTED GTTM-STYLE TIME-SPAN ANALYSIS. The reduced playbacks select representative events; they are not recordings of the original performance and do not claim that subordinate notes disappear.",
  },
  prolongation: {
    lede: "Time-span reduction asks which event represents a span. Prolongational reduction asks how events relate as elaboration, continuation, or progression in a tonal space. Those questions overlap in a finished analysis but are not the same operation.",
    cards: [
      card("PROLONGATION", "A tone or harmony remains structurally active while other material elaborates it."),
      card("PROGRESSION", "The relation moves from one tonal region to another, as in the constructed I → IV → V → I path."),
      card("TENSION ≠ EMOTION", "Tonal tension is a relation inside a musical description. It is not automatically a listener’s felt anxiety, arousal, or mood."),
      card("TWO TREES", "The time-span tree and the prolongational relation map below are intentionally different representations of the same passage."),
    ],
    note: "■ This page uses ‘tension’ in the formal tonal-relational sense. A listener’s emotional response would require a different claim and different evidence.",
  },
  finalModel: {
    lede: "GTTM is best read as an interacting architecture, not as a single pipeline in which one structure simply causes the next. The surface supports several descriptions, and those descriptions constrain and inform one another.",
    stages: [
      card("SURFACE", "the sounding phrase", "var(--teal)"),
      card("GROUPING + METER", "units and temporal hierarchy", "var(--gold-deep)"),
      card("TIME-SPAN REDUCTION", "relative importance within spans", "var(--red)"),
      card("PROLONGATIONAL REDUCTION", "tonal elaboration and progression", "var(--plum-deep)"),
    ],
    note: "✦ Concept Lab synthesis: a map of interacting descriptions, not a movie of four mental stages unfolding one after another.",
  },
  evidence: { lede: "The evidence is component-wise. Studies of phrase perception, meter, grouping, tonal cognition, and computational formalisation can illuminate parts of the proposal without validating the entire architecture in one stroke.", items: evidence },
  scope: {
    lede: "GTTM is powerful when the question is how a tonal surface may be represented as nested, listener-oriented structure. Its boundaries become clearer when the page stops treating a formal analysis as a complete psychology of music.",
    explains: ["a vocabulary for grouping, meter, time-span, and prolongational descriptions", "why one surface can support multiple levels of organisation", "how formal constraints and listener preferences can coexist", "why reduction is a change of representation rather than deletion"],
    stops: ["a universal algorithm that predicts every listener’s parse", "a complete account of emotion, timbre, performance, or social meaning", "proof that Western tonal grammar is culturally neutral", "a claim that one constructed teaching analysis is the only correct analysis"],
    note: "? Open question: how should formal rules, learned tonal knowledge, real-time processing, performance variation, and culturally diverse musical grammars be related without collapsing one into another?",
  },
  lineage: {
    lede: "The framework sits at a boundary between formal music theory, cognitive psychology, and later computational and empirical work. Its intellectual trail is a conversation, not a one-way march toward confirmation.",
    nodes: [
      card("Schenkerian reduction", "A tonal-structural ancestor that supplies influential ideas about hierarchy and prolongation, but is not identical to GTTM.", "var(--plum-deep)"),
      card("Generative linguistics", "A bounded methodological analogy: formal rules and structural descriptions, not a claim that music is language.", "var(--teal)"),
      card("Gestalt + tonal cognition", "Perceptual organisation and context-dependent stability help motivate listener-oriented questions without becoming the same theory.", "var(--gold-deep)"),
      card("Computational GTTM", "Implementations make selected rules executable and expose where preferences, ambiguity, and idiom remain modelling choices.", "var(--red)"),
    ],
    note: "■ Relation map, not identity claim. See the related records for Gestalt Principles in Music, Auditory Scene Analysis, Tonal Hierarchy, and Meyer’s Expectancy Theory.",
  },
};

export const generativeTheoryOfTonalMusic: TheoryRecord = {
  id: "generative-theory-of-tonal-music",
  kind: "theory",
  slug: "generative-theory-of-tonal-music",
  title: "A Generative Theory of Tonal Music",
  hook: "What structure does an experienced listener hear beneath a tonal surface?",
  oneSentence: "A formal cognitive theory that relates a tonal surface to multiple interacting hierarchical descriptions—grouping, meter, time-span reduction, and prolongational reduction—through the intuitions of an experienced listener.",
  discipline: "music-psych",
  primaryBranch: "musical-structure-grammar",
  knowledgeForm: "formal-model",
  knowledgeFormQualifier: "Cognitive and music-theoretic structural model",
  literatureStanding: ["foundational"],
  statusChip: "Foundational formal cognitive theory",
  topics: ["GTTM", "music cognition", "tonal music", "musical structure", "formal theory"],
  facts: ["four structures", "reduction ≠ deletion", "listener-oriented", "formal ≠ deterministic", "tonal grammar has boundaries"],
  origins: [
    { year: "1983", author: "Lerdahl & Jackendoff", work: "A Generative Theory of Tonal Music", contribution: "A formal framework for describing grouping, meter, time-span reduction, and prolongational reduction in tonal music." },
    { year: "1986", author: "Clarke", work: "Theory, Analysis and the Psychology of Music", contribution: "A critical evaluation that helped make the theory’s psychological ambitions and analytic commitments explicit." },
    { year: "2006", author: "Jackendoff & Lerdahl", work: "The capacity for music: What is it, and what’s special about it?", contribution: "A later account of musical cognition that situates formal musical structure within broader questions about human capacity." },
    { year: "2008", author: "Hamanaka, Hirata & Tojo", work: "Implementing ‘A Generative Theory of Tonal Music’", contribution: "Computational formalisation that clarifies what can be operationalised and where analytic choices remain." },
  ],
  trailLede: "The trail runs from Schenkerian structural thought and generative linguistic analogy through formal listener-oriented analysis, psychological evaluation, computational implementation, and component-specific evidence.",
  oversimplificationsLede: "The most tempting shortcuts turn a formal framework into a literal listening algorithm, or a reduction into a claim that the music’s notes have vanished.",
  oversimplifications: [
    "GTTM is not a recipe that every listener runs in the same order to produce one correct tree.",
    "Grouping, meter, time-span, and prolongation are not four sequential causes in a single downstream chain.",
    "A time-span head represents a span; it does not erase the subordinate surface events.",
    "‘Tonal tension’ in this framework is not a synonym for emotion.",
    "The constructed C-major phrase on this page demonstrates the vocabulary; it does not establish a universal tonal grammar.",
  ],
  qualifications: [
    "The exact analysis of a passage can remain underdetermined when cues conflict.",
    "The listener ideal is experienced and culturally situated, not a neutral universal observer.",
    "Empirical evidence supports particular components and tasks; it does not automatically validate the whole theory.",
    "Computational implementations operationalise selected rules and parameters, not the totality of musical understanding.",
    "Performance, timbre, dynamics, non-tonal idioms, and culture can change what a formal tonal analysis can reasonably claim.",
  ],
  minimumReadingLabel: "If you read five things",
  minimumReading: [
    { citation: "Lerdahl, F., &amp; Jackendoff, R. (1983). <i>A Generative Theory of Tonal Music</i>. MIT Press.", contribution: "The foundational formal framework and its four principal structural descriptions." },
    { citation: "Palmer, C., &amp; Krumhansl, C. L. (1987). Independent prosodic and pitch contributions to musical phrase perception. <i>JEP:HPP, 13</i>(1), 116–126.", contribution: "Component evidence about temporal and pitch contributions to phrase perception.", doi: "10.1037//0096-1523.13.1.116" },
    { citation: "Palmer, C., &amp; Krumhansl, C. L. (1990). Mental representations for musical meter. <i>JEP:HPP, 16</i>(4), 728–741.", contribution: "Evidence for multilevel metrical representation.", doi: "10.1037//0096-1523.16.4.728" },
    { citation: "Bigand, E., &amp; Poulin-Charronnat, B. (2006). Are we ‘experienced listeners’? A review of the musical capacities that do not depend on formal musical training. <i>Cognition, 100</i>(1), 100–130.", contribution: "A bridge between formal music theory and evidence about musical experience and cognition.", doi: "10.1016/j.cognition.2005.11.007" },
    { citation: "Hamanaka, M., Hirata, K., &amp; Tojo, S. (2006). Implementing ‘A Generative Theory of Tonal Music’. <i>Journal of New Music Research, 35</i>(4), 249–277.", contribution: "A computational boundary case for formalising selected GTTM rules.", doi: "10.1080/09298210701563238" },
  ],
  fullSources: [
    { citation: "Lerdahl, F., &amp; Jackendoff, R. (1983). <i>A Generative Theory of Tonal Music</i>. MIT Press.", contribution: "The foundational formal framework and its four principal structural descriptions." },
    { citation: "Clarke, E. F. (1986). Theory, analysis and the psychology of music: A critical evaluation of Lerdahl &amp; Jackendoff. <i>Psychology of Music, 14</i>(1), 3–16.", contribution: "Critical evaluation of the theory’s psychological and analytic commitments." },
    { citation: "Palmer, C., &amp; Krumhansl, C. L. (1987). Independent prosodic and pitch contributions to musical phrase perception. <i>JEP:HPP, 13</i>(1), 116–126.", contribution: "Component evidence about temporal and pitch contributions to phrase perception.", doi: "10.1037//0096-1523.13.1.116" },
    { citation: "Palmer, C., &amp; Krumhansl, C. L. (1990). Mental representations for musical meter. <i>JEP:HPP, 16</i>(4), 728–741.", contribution: "Evidence for multilevel metrical representation.", doi: "10.1037//0096-1523.16.4.728" },
    { citation: "Deliège, I. (1987). Grouping conditions in listening to music. <i>Music Perception, 4</i>(4), 325–359.", contribution: "Listener-focused examination of grouping conditions related to GTTM rules.", doi: "10.2307/40285378" },
    { citation: "Frankland, B. W., &amp; Cohen, A. J. (2004). Parsing of melody. <i>Music Perception, 21</i>(4), 499–543.", contribution: "Quantification and testing of selected local grouping rules.", doi: "10.1525/mp.2004.21.4.499" },
    { citation: "Bigand, E., &amp; Poulin-Charronnat, B. (2006). Are we ‘experienced listeners’? A review of the musical capacities that do not depend on formal musical training. <i>Cognition, 100</i>(1), 100–130.", contribution: "A bridge between formal music theory and evidence about musical experience and cognition.", doi: "10.1016/j.cognition.2005.11.007" },
    { citation: "Jackendoff, R., &amp; Lerdahl, F. (2006). The capacity for music: What is it, and what’s special about it? <i>Cognition, 100</i>(1), 33–72.", contribution: "A later account of musical capacity and the relation between formal structure and cognition.", doi: "10.1016/j.cognition.2005.11.005" },
    { citation: "Hamanaka, M., Hirata, K., &amp; Tojo, S. (2006). Implementing ‘A Generative Theory of Tonal Music’. <i>Journal of New Music Research, 35</i>(4), 249–277.", contribution: "A computational boundary case for formalising selected GTTM rules.", doi: "10.1080/09298210701563238" },
    { citation: "Lerdahl, F. (2009). Genesis of a theory of music. <i>Music Perception, 26</i>(3), 187–194.", contribution: "Reflection on the theory’s construction and formal ambitions.", doi: "10.1525/mp.2009.26.3.187" },
    { citation: "Hansen, N. C. (2011). The legacy of Lerdahl &amp; Jackendoff’s A Generative Theory of Tonal Music. <i>Danish Yearbook of Musicology, 38</i>, 33–55.", contribution: "Historical and critical account of the framework’s legacy." },
  ],
  relatedTo: [
    { recordId: "gestalt-principles-in-music", relation: "shares perceptual organisation questions with", body: "Gestalt principles help frame organisation and grouping, but do not become GTTM’s formal reduction system." },
    { recordId: "auditory-scene-analysis", relation: "sits beside", body: "Auditory Scene Analysis addresses organisation of acoustic mixtures; GTTM addresses hierarchical descriptions of tonal music." },
    { recordId: "tonal-hierarchy", relation: "shares tonal-cognition territory with", body: "Tonal Hierarchy models context-dependent pitch stability; GTTM uses tonal relations inside a broader structural architecture." },
    { recordId: "meyers-expectancy-theory", relation: "connects to expectation through", body: "Meyer’s theory asks how musical structure can imply expectation and meaning; GTTM supplies one formal vocabulary for structure, not a complete expectancy theory." },
  ],
  provenance: [
    { glyph: "●", colour: "var(--teal)", label: "original framework", note: "The formal distinctions among grouping, meter, time-span reduction, and prolongational reduction are grounded in Lerdahl & Jackendoff’s 1983 book." },
    { glyph: "■", colour: "var(--gold-deep)", label: "faithful paraphrase", note: "The listener ideal, well-formedness/preference distinction, bounded generative analogy, and reduction caveat paraphrase the framework and later critical discussions." },
    { glyph: "▲", colour: "var(--red)", label: "pedagogical construction", note: "The sixteen-note C-major phrase, its selected heads, the two reduction trees, and the reduction sonifications are constructed teaching materials, not source analyses." },
    { glyph: "✦", colour: "var(--plum-deep)", label: "Concept Lab synthesis", note: "The interaction principle, compact lineage map, and final ‘map, not a movie’ framing are editorial synthesis that keeps the formal architecture and evidence boundaries visible." },
    { glyph: "?", colour: "var(--pen-3)", label: "open boundary", note: "Questions about culture, idiom, real-time processing, ambiguity, emotion, and computational completeness remain unresolved or require evidence beyond this record." },
  ],
  gttm,
};

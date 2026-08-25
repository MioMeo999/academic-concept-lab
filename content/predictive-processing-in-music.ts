import type { EvidenceXray, PredictiveCard, PredictiveProcessingRecordContent, Source, TheoryRecord } from "./types";

const card = (label: string, body: string, colour: string): PredictiveCard => ({ label, body, colour });

const source = (citation: string, contribution: string, doi?: string): Source => ({ citation, contribution, doi });

const xray = (item: EvidenceXray): EvidenceXray => item;

const minimumReading: Source[] = [
  source(
    "Vuust, P., Østergaard, L., Pallesen, K. J., Bailey, C., &amp; Roepstorff, A. (2009). <i>Predictive coding of music — brain responses to rhythmic incongruity.</i> Cortex, 45(1), 80–92.",
    "Music-specific rhythmic-incongruity anchor: MMNm, P3am, and expertise differences.",
    "10.1016/j.cortex.2008.05.014",
  ),
  source(
    "Rohrmeier, M. A., &amp; Koelsch, S. (2012). <i>Predictive information processing in music cognition: A critical review.</i> International Journal of Psychophysiology, 83(2), 164–175.",
    "Critical boundary around feature-based, temporal, polyphonic, and higher-order musical prediction.",
    "10.1016/j.ijpsycho.2011.12.010",
  ),
  source(
    "Koelsch, S., Vuust, P., &amp; Friston, K. (2019). <i>Predictive processes and the peculiar case of music.</i> Trends in Cognitive Sciences, 23(1), 63–77.",
    "Precision filtering, active listening, and first-order versus second-order predictions.",
    "10.1016/j.tics.2018.10.006",
  ),
  source(
    "Vuust, P., Heggli, O. A., Friston, K. J., &amp; Kringelbach, M. L. (2022). <i>Music in the brain.</i> Nature Reviews Neuroscience, 23, 287–305.",
    "Current PCM synthesis across perception, action, emotion, learning, expertise, and interaction.",
    "10.1038/s41583-022-00578-5",
  ),
  source(
    "Ishida, K., Ishida, T., &amp; Nittono, H. (2024). <i>Decoding predicted musical notes from omitted stimulus potentials.</i> Scientific Reports, 14, 11164.",
    "Omission evidence about discriminable expected-note information, including the 25/24 participant distinction.",
    "10.1038/s41598-024-61989-1",
  ),
];

const fullSources: Source[] = [
  ...minimumReading,
  source("Rao, R. P. N., &amp; Ballard, D. H. (1999). <i>Predictive coding in the visual cortex.</i> Nature Neuroscience, 2, 79–87.", "General hierarchical predictive-coding foundation.", "10.1038/4580"),
  source("Friston, K. (2005). <i>A theory of cortical responses.</i> Philosophical Transactions of the Royal Society B, 360, 815–836.", "General inference and sensory-cause foundation.", "10.1098/rstb.2005.1622"),
  source("Feldman, H., &amp; Friston, K. J. (2010). <i>Attention, uncertainty, and free-energy.</i> Frontiers in Human Neuroscience, 4, 215.", "Theoretical account of attention and precision.", "10.3389/fnhum.2010.00215"),
  source("Clark, A. (2013). <i>Whatever next? Predictive brains, situated agents, and the future of cognitive science.</i> Behavioral and Brain Sciences, 36, 181–204.", "Broad predictive-brain framing and its conceptual challenges.", "10.1017/S0140525X12000477"),
  source("Vuust, P., &amp; Witek, M. A. G. (2014). <i>Rhythmic complexity and predictive coding.</i> Frontiers in Psychology, 5, 1111.", "Rhythm, meter, syncopation, polyrhythm, and groove application.", "10.3389/fpsyg.2014.01111"),
  source("Savage, P. E., &amp; Fujii, S. (2022). <i>Towards a cross-cultural framework for predictive coding of music.</i> Nature Reviews Neuroscience, 23, 641.", "Cross-cultural critique and extension of PCM.", "10.1038/s41583-022-00622-4"),
  source("Vuust, P., Heggli, O. A., Friston, K. J., &amp; Kringelbach, M. L. (2022). <i>Reply to ‘Towards a cross-cultural framework for predictive coding of music’.</i> Nature Reviews Neuroscience, 23, 641–642.", "Reply acknowledging the relevance of the cross-cultural extension without settling validity.", "10.1038/s41583-022-00621-5"),
  source("Furutachi, S., &amp; Hofer, S. B. (2026). <i>Rethinking Predictive Processing.</i> Annual Review of Neuroscience, 49, 471–494.", "Current constructive critique of definitions, signal interpretation, and mechanistic evidence.", "10.1146/annurev-neuro-102124-031410"),
];

const signals = [
  xray({
    title: "Rhythmic incongruity and expertise",
    label: "empirical study",
    citation: "Vuust et al. (2009)",
    design: "MEG analysis of event-related responses to rhythmic incongruity under strong metric anticipation, comparing expert jazz musicians with rhythmically unskilled non-musicians.",
    testedLabel: "what it tested",
    tested: "Whether rhythmic violations and expertise differences would be reflected in MMNm and later P3am responses.",
    foundLabel: "what it found",
    found: "MMNm and P3am responses were reported, with quantitative and qualitative response differences between the groups.",
    notTested: "A complete predictive-processing circuit, a neural precision parameter, or whether expertise differences were caused by training rather than predisposition.",
    doi: "10.1016/j.cortex.2008.05.014",
  }),
  xray({
    title: "The note that never came",
    label: "empirical study",
    citation: "Ishida, Ishida & Nittono (2024)",
    design: "25 non-musicians heard familiar and unfamiliar melodies in which four target pitches (E, F, A, C) could be presented or omitted at the same position; omission-N1 analysis used all 25, while decoding used 24.",
    testedLabel: "what it tested",
    tested: "Whether omission-period activity carried discriminable information about the identity of an expected musical note, and whether familiarity changed that information.",
    foundLabel: "what it found",
    found: "Omission N1 was larger for familiar melodies; four-note decoding was higher in familiar contexts, approximately 30.2% versus 25% chance in the significant interval, compared with approximately 24.0% for unfamiliar contexts.",
    notTested: "That the full predictive-processing architecture was proven, or that the signal was a pure, uniquely identified neural prediction error. Familiar and unfamiliar melodies also differed in rhythmic and harmonic structure.",
    doi: "10.1038/s41598-024-61989-1",
  }),
];

const content: PredictiveProcessingRecordContent = {
  identity: {
    knowledgeForm: "Theoretical framework / theory family applied to music cognition",
    status: "Influential integrative predictive framework",
    discipline: "Music Psychology",
    branch: "Expectation & Prediction",
  },
  opening: {
    lede: "Music perception can be understood as an ongoing negotiation between what a listener’s model predicts and what the sound actually provides. The point is not that a listener consciously narrates every forecast. The point is that perception is shaped by hypotheses, sensory evidence, mismatch, and the changing influence assigned to that mismatch.",
    cards: [
      card("PREDICTIVE PROCESSING", "A broad family of accounts about generative models, prediction, error, uncertainty, inference, and sometimes action.", "var(--teal)"),
      card("PREDICTIVE CODING", "A prominent hierarchical neural or computational implementation family involving predictions and error signalling.", "var(--red)"),
      card("PCM", "Predictive Coding of Music: a music-specific formulation developed especially by Vuust and collaborators.", "var(--gold-deep)"),
    ],
    note: "● The terminology boundary is source-grounded; the nested record identity and teaching sequence are ✦ Concept Lab synthesis.",
  },
  nextNote: {
    lede: "A next-note guess is one visible consequence of prediction, not the whole idea. Higher-level model states can predict the lower-level sensory or representational activity expected under a current hypothesis.",
    cards: [
      card("MUSIC UNFOLDS", "Because music happens in time, temporal forecasting matters unusually much.", "var(--teal)"),
      card("BUT NOT ONLY FUTURE", "Predictive coding also concerns expected sensory activity under a present perceptual hypothesis.", "var(--red)"),
      card("THE HARDER CASE", "Polyphony, formal structure, and higher-order predictions are not equally specified by existing models.", "var(--plum-deep)"),
    ],
    note: "■ Faithful explanation of the framework and the critical boundary identified by Rohrmeier & Koelsch.",
  },
  generative: {
    lede: "A generative model contains hypotheses about hidden or latent causes that could produce sensory observations. In music, meter, tonal context, phrase organisation, and style-sensitive expectation are useful teaching examples—not one established cortical hierarchy.",
    cards: [
      card("HIDDEN CAUSES", "The model asks what underlying state could make the current sound intelligible.", "var(--teal)"),
      card("MUSICAL EXAMPLES", "Meter, tonal context, phrase organisation, and style can be used as explanatory examples at different scales.", "var(--gold-deep)"),
      card("NOT GENERATIVE AI", "Here generative means predicting sensory consequences from hypothesised causes. It does not mean an LLM, diffusion model, or music generator.", "var(--red)"),
    ],
    note: "✦ The musical examples are explanatory, not a claim that one fixed hierarchy has been established in the cortex.",
  },
  messagePassing: {
    lede: "Predictive coding proposes a simplified message-passing motif: higher-level states send predictions downward, while mismatch information travels upward. The motif is useful because it makes direction visible; it is not a complete anatomical diagram.",
    cards: [
      card("PREDICTIONS DOWN", "Higher-level model states generate expectations about lower-level or sensory states.", "var(--teal)"),
      card("ERRORS UP", "Lower-level mismatch signals can carry information about what the current model failed to explain.", "var(--red)"),
      card("NO FIXED MUSICAL MAP", "Style → phrase → harmony → note → acoustics remains a pedagogical hierarchy, not a settled cortical wiring diagram.", "var(--plum-deep)"),
    ],
    note: "● Canonical predictive-coding proposal, rendered as a ✦ simplified Concept Lab representation. Direction is meaningful; anatomy and musical level are not fixed here.",
  },
  error: {
    lede: "Prediction error is the mismatch or residual between an expected state and an observed or represented state. The useful question is not ‘did the listener fail?’ but ‘what did the current model fail to explain?’",
    cards: [
      card("ERROR IS INFORMATION", "A mismatch can guide inference, attention, learning, or model revision.", "var(--red)"),
      card("NOT BAD MUSIC", "Prediction error is not a value judgment, dislike, or an automatic emotional response.", "var(--teal)"),
      card("NOT CONSCIOUS SURPRISE", "A signal can be part of a predictive architecture without becoming a reportable feeling.", "var(--gold-deep)"),
      card("IDyOM IS DIFFERENT", "IDyOM information content is −log₂ P(realised event | context). Predictive-coding error is a model–input discrepancy in a generative/message-passing architecture.", "var(--plum-deep)"),
    ],
    note: "✦ The IDyOM boundary is a Concept Lab synthesis from the two models’ constructs. They may covary in some settings, but IC is not neural prediction error.",
  },
  precision: {
    lede: "Precision asks: how much should this error matter? In many formulations, precision modulates the gain or influence of prediction-error information. Under particular Gaussian assumptions it relates to inverse variance, but it is not only conscious confidence, IDyOM entropy, or attention itself.",
    cards: [
      card("RELIABILITY", "A more reliable signal can have more influence in updating the current inference.", "var(--teal)"),
      card("INVERSE VARIANCE", "In a Gaussian teaching formulation, narrower uncertainty means higher precision. This is a mathematical relation, not a subjective confidence meter.", "var(--gold-deep)"),
      card("NOT ENTROPY", "IDyOM entropy describes uncertainty over a probability distribution; predictive precision weights information inside a generative inference architecture.", "var(--red)"),
    ],
    note: "● The precision account is grounded in predictive-processing formulations; the comparison with IDyOM is ✦ Concept Lab synthesis.",
  },
  firstSecond: {
    lede: "Koelsch, Vuust &amp; Friston distinguish predictions about perceptual content from predictions about the precision or certainty assigned to those content predictions.",
    cards: [
      card("FIRST-ORDER", "What perceptual content is expected: a sound, pattern, onset, or other represented state.", "var(--teal)"),
      card("SECOND-ORDER", "How certain or reliable the system expects that first-order prediction to be.", "var(--red)"),
      card("DO NOT COLLAPSE", "First-order does not mean note and second-order does not mean emotion. The distinction is content versus precision.", "var(--plum-deep)"),
    ],
    note: "● Faithful explanation of the 2019 music-focused predictive-coding account.",
  },
  attention: {
    lede: "Predictive-processing accounts often describe attention as optimising or modulating the precision assigned to relevant prediction errors. This helps explain why active listening can select uncertainty-resolving features, but it remains a theoretical account rather than a settled identity claim.",
    cards: [
      card("SELECT", "Attention can change which prediction-error signals receive influence.", "var(--teal)"),
      card("WEIGHT", "The account concerns the precision assigned to information, not attention as a magical spotlight.", "var(--gold-deep)"),
      card("QUALIFY", "Attention has not been proven to be nothing but precision weighting.", "var(--red)"),
    ],
    note: "● The attention account is theoretical; the qualification is required by the evidence boundary.",
  },
  precisionInteraction: {
    lede: "Hold the physical test event constant. Only the history that makes the onset more or less predictable changes. Select a context to inspect the same +120 ms displacement against a narrow or broad constructed prediction envelope.",
    contexts: [
      {
        label: "CONTEXT A · REGULAR",
        history: "A steady, strongly constraining temporal history.",
        sigmaMs: 35,
        targetOffsetMs: 120,
        colour: "var(--teal)",
        interpretation: "The same deviation lies farther from the centre of a narrow expectation envelope.",
      },
      {
        label: "CONTEXT B · OPEN",
        history: "A less regular, less temporally constraining history.",
        sigmaMs: 90,
        targetOffsetMs: 120,
        colour: "var(--red)",
        interpretation: "The same deviation lies inside a broader expectation envelope.",
      },
    ],
    note: "▲ Constructed Gaussian predictive-processing illustration. Same expected mean, target acoustics, and +120 ms displacement; the envelopes are not brain distributions and do not predict a neural response magnitude.",
  },
  omission: {
    lede: "A model can specify an expected sensory event even when no sound arrives. The omission is therefore not an unusual acoustic object; it is a mismatch between predicted input and actual silence.",
    preceding: ["beat", "beat", "beat", "beat"],
    expected: "target note",
    note: "▲ Constructed teaching example. It illustrates an expected event and its absence; it does not diagnose the visitor’s neural activity.",
  },
  hierarchy: {
    lede: "Musical prediction may operate across representational levels and timescales. These levels can be nested or interacting without forming one universal fixed hierarchy.",
    cards: [
      card("LOWER / FAST", "Acoustic feature, onset, pitch, and local rhythmic pattern.", "var(--teal)"),
      card("MIDDLE", "Meter, melodic pattern, and harmony can organise events over longer windows.", "var(--gold-deep)"),
      card("HIGHER / SLOW", "Phrase and style are useful explanatory levels, not anatomically assigned destinations.", "var(--red)"),
    ],
    note: "✦ Concept Lab explanatory hierarchy. Do not read style → phrase → harmony → note → acoustics as an established cortical hierarchy.",
  },
  zeroError: {
    lede: "If the brain minimises error, why not listen to one note forever? Predictive-processing accounts do not imply a search for a world with no novelty. Errors can support inference and learning, be weighted differently, occur in changing environments, and become structured or predictable themselves.",
    cards: [
      card("INFERENCE", "A mismatch can help select the explanation that best fits current input.", "var(--teal)"),
      card("LEARNING", "An error can matter when precision, context, and history make updating useful.", "var(--gold-deep)"),
      card("STRUCTURED UNCERTAINTY", "Music can make deviation, return, and surprise part of a larger predictable design.", "var(--red)"),
    ],
    note: "✦ Concept Lab synthesis. Zero prediction error is not equivalent to maximum pleasure.",
  },
  pcm: {
    lede: "Predictive Coding of Music is a music-specific formulation within the broader predictive-processing and predictive-coding tradition. Its development is a sequence of related formulations, not one unchanged model.",
    cards: [
      card("2009 · RHYTHMIC INCONGRUITY", "Vuust et al. connect rhythmic violations, MMNm/P3am responses, and expertise to a predictive-coding interpretation.", "var(--teal)"),
      card("2014 · RHYTHM / METER", "Vuust & Witek develop rhythm, meter, syncopation, polyrhythm, and groove as predictive-coding applications.", "var(--gold-deep)"),
      card("2019 → 2022 · EXPANSION", "Precision, attention, active listening, action, emotion, learning, interaction, melody, and harmony enter later PCM syntheses.", "var(--red)"),
    ],
    note: "● Historical progression grounded in the named sources. PCM is not all predictive processing, and the papers should not be flattened into one identical architecture.",
  },
  culture: {
    lede: "Priors have a history. The same musical event can have different predictive consequences for listeners with different exposure, training, familiarity, and cultural histories. Culture is not a single homogeneous prior.",
    cards: [
      card("EXPERIENCE", "Learned regularities can shape which continuations are available or precise.", "var(--teal)"),
      card("CULTURAL HISTORY", "Different musical environments can support different expectations without reducing a culture to one statistical mind.", "var(--red)"),
      card("CROSS-CULTURAL EXCHANGE", "Savage & Fujii propose a cross-cultural extension; the Vuust et al. reply acknowledges its relevance. The exchange does not empirically settle cross-cultural validity.", "var(--plum-deep)"),
    ],
    note: "● Source-grounded cultural boundary and reply; the experience → expectation arrangement is ✦ Concept Lab synthesis.",
  },
  activeInference: {
    lede: "Perceptual inference updates beliefs to better explain sensory input. Active inference extends the frame so action or sensory sampling can also alter observations or help bring them into line with expected states.",
    cards: [
      card("PERCEPTUAL INFERENCE", "Update the model to explain what arrives.", "var(--teal)"),
      card("ACTIVE INFERENCE", "Movement, tapping, and ensemble coordination can be compact bridges to action and sampling.", "var(--gold-deep)"),
      card("KEEP IT SUBORDINATE", "Active listening is not automatically active inference, and free energy is not the protagonist of this record.", "var(--red)"),
    ],
    note: "■ Faithful conceptual extension, kept subordinate to the music-focused predictive-processing record.",
  },
  signals: {
    lede: "Neural and behavioural signals can be compatible with predictive accounts without uniquely identifying the computation that produced them. The evidence needs to stay attached to its design and measurement.",
    items: signals,
    note: "■ Evidence X-ray. MMN/MMNm, ERAN, P3-related signals, and omission responses can be relevant to predictive accounts; none is prediction error by definition.",
  },
  critical: {
    lede: "Predictive processing is powerful enough to organise a research programme, but not specific enough to end the argument by itself. Two critical boundaries keep the record intellectually honest.",
    cards: [
      card("ROHRMEIER + KOELSCH", "Prediction is comparatively tractable for some basic single-stream features, but polyphony, higher-order structure, and formal prediction are less straightforward.", "var(--teal)"),
      card("FURUTACHI + HOFER · 2026", "Definitions vary, neurophysiological evidence is not uniformly consistent, and apparently similar prediction-error responses may reflect different computations.", "var(--red)"),
      card("CONSTRUCTIVE STATUS", "The current task is stronger mechanistic discrimination—not declaring predictive processing debunked.", "var(--plum-deep)"),
    ],
    note: "? Contested / unresolved mechanism. The 2026 review was first published online on 16 April 2026 and appears in Annual Review of Neuroscience 49, 471–494.",
  },
  finalModel: {
    lede: "The final map keeps learned experience and current context outside the loop, then shows predictions, mismatch, precision, update, attention, and action as interacting parts of an explanatory framework.",
    nodes: [
      card("LEARNED EXPERIENCE + CURRENT CONTEXT", "Experience-dependent hypotheses about possible causes.", "var(--teal)"),
      card("GENERATIVE MODEL", "Hidden-cause hypotheses that can predict sensory consequences.", "var(--teal)"),
      card("TOP-DOWN PREDICTION", "Expected lower-level or sensory state.", "var(--gold-deep)"),
      card("ACTUAL INPUT", "What the current sound provides—including silence at an expected onset.", "var(--red)"),
      card("PREDICTION ERROR × ESTIMATED PRECISION", "Mismatch whose influence depends on reliability and uncertainty.", "var(--red)"),
      card("PERCEPTUAL UPDATE / ATTENTION / ACTION", "Inference, learning, selective weighting, and possible sampling.", "var(--plum-deep)"),
      card("UPDATED MODEL ↺", "The loop continues; not every discrepancy produces a major rewrite.", "var(--teal)"),
    ],
    note: "✦ Concept Lab synthesis, not a literal cortical circuit. Higher ↕ middle ↕ lower is a teaching relation, not an anatomical claim.",
  },
};

export const predictiveProcessingInMusic: TheoryRecord = {
  id: "predictive-processing-in-music",
  kind: "theory",
  slug: "predictive-processing-in-music",
  title: "Predictive Processing in Music",
  hook: "Don’t just hear it. Predict it.",
  oneSentence: "A broad predictive framework for understanding music perception as an ongoing interaction among generative models, sensory input, prediction errors, precision, learning, and possible action.",
  discipline: "music-psych",
  topics: ["predictive processing", "predictive coding", "predictive coding of music", "musical expectation", "precision", "music cognition"],
  facts: ["model → predict", "error is information", "precision changes the weight", "omissions count", "PCM ≠ all PP"],
  statusChip: "Influential integrative predictive framework",
  origins: [
    { year: "1999", author: "Rao · Ballard", work: "Hierarchical predictive coding", contribution: "A general computational account of higher-level predictions and lower-level residual errors." },
    { year: "2009", author: "Vuust et al.", work: "Rhythmic incongruity", contribution: "A music-specific predictive-coding interpretation of MMNm, P3am, and expertise differences." },
    { year: "2012", author: "Rohrmeier · Koelsch", work: "Critical review", contribution: "Prediction is not equally tractable across feature, temporal, polyphonic, and formal levels." },
    { year: "2014", author: "Vuust · Witek", work: "Rhythm and meter", contribution: "Predictive coding applied to rhythmic complexity, syncopation, polyrhythm, and groove." },
    { year: "2019", author: "Koelsch · Vuust · Friston", work: "Precision and active listening", contribution: "Content predictions, precision predictions, attention, and listening as an active epistemic process." },
    { year: "2022 →", author: "PCM and its critics", work: "Music in the brain / cross-cultural exchange", contribution: "Expanded PCM and a necessary reminder that priors depend on experience and culture." },
  ],
  trailLede: "This is a branching research landscape, not a founder story. General predictive-coding foundations, music-specific PCM formulations, empirical expectancy studies, and critical reviews answer related but non-identical questions.",
  oversimplificationsLede: "Do not leave with these shortcuts.",
  oversimplifications: [
    "Predictive Processing is not only a next-note guessing theory.",
    "A generative model is not generative AI.",
    "Prediction error is not cognitive failure, bad music, dislike, or conscious surprise by definition.",
    "Precision is not IDyOM entropy and is not attention itself.",
    "IDyOM information content is not neural prediction error.",
    "MMN, MMNm, ERAN, P3-related signals, and omission responses are not prediction error by definition.",
    "PCM is not all predictive processing, and Vuust is not a single founder of the whole framework.",
    "Zero prediction error is not maximum pleasure, and predictive processing does not explain all of music.",
  ],
  qualifications: [
    "The mapping from a measured neural response to a specific predictive-processing computation remains debated.",
    "Musical examples of meter, phrase, harmony, and style are teaching examples unless a source establishes the precise relation.",
    "The same physical deviation can have different precision-weighted influence in a constructed model; no neural response magnitude is implied.",
    "Ishida et al. used familiar and unfamiliar melodies that differed in more than melody alone, including rhythmic and harmonic structure.",
    "The relation between IDyOM probabilities, human predictive processing, and neural implementation remains an open interpretive question.",
    "Cross-cultural extension is necessary, but the Savage/Fujii and Vuust et al. exchange does not settle cross-cultural validity.",
    "Active inference and free energy are kept as subordinate extensions rather than the main theory of this record.",
    "The 2026 critical review calls for stronger mechanistic discrimination; it does not debunk predictive processing.",
  ],
  minimumReading,
  minimumReadingLabel: "If you read five things",
  fullSources,
  relatedToLede: "These records share the expectation, organisation, and learning neighbourhood but answer different questions.",
  relatedTo: [
    { recordId: "statistical-learning-of-music", relation: "provides a learning bridge for", body: "Statistical Learning of Music asks how exposure may make regularities available; Predictive Processing asks how generative models use predictions and weighted errors during perception." },
    { recordId: "idyom-information-dynamics-of-music", relation: "contrasts a computational model with", body: "IDyOM estimates probabilities, entropy, and information content. Those quantities may relate to prediction, but IC is not neural prediction error and entropy is not precision." },
    { recordId: "hurons-itpra-theory", relation: "complements with a response-cycle lens", body: "Huron maps functional responses around expectation; Predictive Processing maps generative prediction, mismatch, precision, and model updating. They are not translations of one another." },
    { recordId: "meyers-expectancy-theory", relation: "complements with a meaning-and-affect lens", body: "Meyer asks how expectation, delay, and fulfilment contribute to musical meaning; Predictive Processing offers a broader account of inference and mismatch." },
    { recordId: "narmours-implication-realization-theory", relation: "complements local implication with", body: "Narmour focuses on melodic implication and realisation; Predictive Processing supplies a broader hierarchical predictive frame without replacing that local account." },
    { recordId: "tonal-hierarchy", relation: "shares context-sensitive organisation with", body: "Tonal Hierarchy asks how pitch stability depends on tonal context; Predictive Processing can treat such context as part of a generative hypothesis without reducing it to one hierarchy." },
    { recordId: "gestalt-principles-in-music", relation: "keeps perceptual organisation beside", body: "Current sensory grouping and learned priors may jointly constrain inference. Predictive Processing does not simply defeat Gestalt organisation." },
    { recordId: "generative-theory-of-tonal-music", relation: "sits beside a formal structural account", body: "GTTM formalises selected descriptions of tonal structure; it is not a predictive-coding implementation or a fixed cortical hierarchy." },
  ],
  predictiveProcessing: content,
  provenance: [
    { glyph: "●", colour: "var(--teal)", label: "source-grounded model and historical claims", note: "Claims about predictive-coding message passing, generative models, PCM formulations, precision accounts, and the named literature are attached to the cited sources and their stated scope." },
    { glyph: "■", colour: "var(--red)", label: "empirical results and faithful explanations", note: "The Vuust et al. rhythmic-incongruity evidence, Ishida et al. omission findings, critical review boundaries, and attention account remain attached to their designs, measures, and qualifications." },
    { glyph: "▲", colour: "var(--gold-deep)", label: "constructed interactions and pedagogical models", note: "The +120 ms precision comparison and present-versus-omitted note are original teaching devices. They are not published stimuli, neural measurements, audio experiments, or diagnoses of visitor responses." },
    { glyph: "✦", colour: "var(--plum-deep)", label: "Concept Lab synthesis", note: "The MODEL → PREDICT → COMPARE → ERROR → WEIGHT → UPDATE rhythm, final model, explanatory hierarchy, and cross-record relations arrange the literature for teaching." },
    { glyph: "?", colour: "var(--pen-3)", label: "contested or unresolved mechanism", note: "The exact cortical implementation, the interpretation of MMN/ERAN/P3 and omission signals, precision and attention mechanisms, PCM’s scope, active inference, free energy, and cross-cultural generalisation remain qualified." },
  ],
};

export default predictiveProcessingInMusic;

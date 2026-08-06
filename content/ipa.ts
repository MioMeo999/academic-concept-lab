import type { MethodRecord } from "./types";

/* ---------------------------------------------------------------------------
   The first method record. A method is a practice, so this page is built to be
   usable at the desk: the procedure is a sequence you can follow, the craft
   section is the four-column pass itself, and the quality markers are an audit
   you can run against your own analysis.

   The interactive is the judgement a learner most needs and most often gets
   wrong — whether a question is an IPA question at all.
   ------------------------------------------------------------------------- */
export const ipa: MethodRecord = {
  id: "ipa",
  kind: "method",
  slug: "interpretative-phenomenological-analysis",
  title: "Interpretative Phenomenological Analysis",
  abbr: "IPA",
  hook: "How do you study what an experience meant to someone — without either just paraphrasing them or burying them in theory?",
  oneSentence:
    "IPA examines how a person makes sense of a personally significant experience, combining phenomenology, hermeneutics and idiography in detailed, case-by-case analysis.",
  discipline: "qual-methods",
  statusChip: "Learn by doing",
  topics: ["qualitative", "phenomenology", "hermeneutics", "idiography", "interviews", "lived experience", "double hermeneutic", "experiential statements"],
  facts: ["one case at a time", "double hermeneutic", "4 quality markers", "1996 → 2022"],

  order: [
    "idea", "commitments", "questionFit", "procedure", "craft",
    "terminology", "qualityMarkers", "themeContrast", "stages", "exemplars",
    "misuses", "qualifications", "sources", "provenance",
  ],

  headings: {
    idea: { toc: "What it is", title: "Not what happened — what it meant" },
    commitments: { toc: "Three commitments", title: "Three commitments, and one relationship" },
    questionFit: { toc: "Is it an IPA question?", title: "Is your question an IPA question?" },
    procedure: { toc: "The procedure", title: "The procedure, and the rule that governs it" },
    craft: { toc: "The close pass", title: "The close pass: four columns" },
    terminology: { toc: "Current terms", title: "Say it the way the field says it now" },
    qualityMarkers: { toc: "Four markers", title: "Four markers of a high-quality analysis" },
    themeContrast: { toc: "Themes that work", title: "Themes that do work, and themes that do not" },
    stages: { toc: "Learn by doing", title: "A learn-by-doing pathway" },
    exemplars: { toc: "Read these", title: "Watch it done well" },
  },

  ideaLede:
    "Most qualitative analysis asks what participants said and sorts it. IPA asks something narrower and harder: <span class=\"hl-t\">how did this person make sense of this experience</span>, and what did it mean to them? Competence comes from working closely through individual cases, not from memorising a coding procedure — which is why this page is arranged as a practice rather than a summary.",
  originsNote:
    "IPA was formally proposed in 1996 as a position between purely cognitive accounts and strongly discursive ones. The procedure and its vocabulary have moved considerably since; the 1996 paper is where you go to understand why the approach exists, not how to run it today.",

  commitmentsLede:
    "Three intellectual commitments, held together. Drop any one and what remains is ordinary thematic coding wearing IPA's name.",
  commitments: [
    { title: "Phenomenology", icon: "i-eye", colour: "var(--teal)", body: "The object of study is lived experience — how something appeared to and mattered for the person who lived it, rather than whether their account is factually accurate." },
    { title: "Hermeneutics", icon: "i-q", colour: "var(--gold-deep)", body: "The account has to be interpreted, not merely reported. Meaning is not lying on the surface waiting to be collected, and the interpretation must stay demonstrably tied to what the participant said." },
    { title: "Idiography", icon: "i-person", colour: "var(--red)", body: "The commitment to the particular. One case is worked through in depth and on its own terms before the next is opened, and before anything is said across cases." },
  ],
  doubleHermeneutic: {
    quote: "The participant is trying to make sense of an experience, while the researcher is trying to make sense of the participant's sense-making.",
    body: "This is the relationship the three commitments produce, and the reason the researcher is neither a neutral recorder nor a free theorist. <b>Giving voice</b> means working to understand the participant's concerns and experiential world; <b>making sense</b> means building a grounded psychological interpretation of that account. Doing only the first is paraphrase. Doing only the second buries the participant under theory.",
  },

  questionFitLede:
    "This is the judgement learners most often get wrong, and it is settled before any data is collected. Click a question to see whether IPA is the right instrument for it.",
  questionFitNote:
    "A question can be excellent and still be wrong for IPA. The ones that do not fit are better served by reflexive thematic analysis, framework analysis, grounded theory or a quantitative design — the mismatch is about instrument and question, not about quality.",
  questionFit: [
    { question: "How do professional musicians make sense of experiencing chronic performance-related pain?", fits: true, why: "A specific, personally significant experience; asks about sense-making; involves embodiment and professional identity; the group is bounded and shares the relevant circumstance." },
    { question: "How do international employees experience and interpret belonging in a new organisation?", fits: true, why: "Identity and transition, interpreted by the person living it. Depth and nuance are what the question wants, not prevalence." },
    { question: "How do artist-facilitators make sense of moments when a community workshop does not unfold as expected?", fits: true, why: "A bounded, emotionally significant experience, and the question is explicitly about how it was understood." },
    { question: "How do employees experience having workplace music selected for them?", fits: true, why: "A particular experience with emotional and relational texture, asked of a group who share the circumstance." },
    { question: "How do musicians understand changes in their professional identities following migration?", fits: true, why: "Identity, transition and biography — the material IPA handles best, and a question about understanding rather than incidence." },
    { question: "What themes occur in employees' opinions about workplace music?", fits: false, why: "Opinions collected across a sample, not one person's sense-making of a significant experience. This is reflexive thematic analysis territory." },
    { question: "What are the main barriers to implementing a programme?", fits: false, why: "An applied, content-mapping question. Framework analysis will answer it faster and more usefully." },
    { question: "How frequently do workers experience distraction?", fits: false, why: "A prevalence question. IPA has nothing to say about how often something happens in a population." },
    { question: "What organisational factors predict music use?", fits: false, why: "Prediction across cases — a quantitative question by construction." },
    { question: "How can several stakeholder perspectives be synthesised into one programme model?", fits: false, why: "Synthesis across perspectives is the opposite of the idiographic commitment. Grounded theory or framework analysis fits better." },
  ],

  procedureLede:
    "A simplified contemporary sequence. Note that steps 1–6 concern <b>one participant</b>, and step 6 sends you back to the start.",
  cardinalRule:
    "Do not code all transcripts at once and merge them straight into collective themes. IPA's idiographic commitment requires serious case-level work to be finished first — this is the single most common way a study stops being IPA while still claiming the name.",
  procedure: [
    { n: "01", title: "Read and reread", body: "One participant's account, repeatedly, before writing anything analytic. You are becoming familiar with a person, not processing a document." },
    { n: "02", title: "Exploratory notes", body: "Detailed annotation of what is being described, how it is said, and what it might mean." },
    { n: "03", title: "Experiential statements", body: "Formulate concise statements capturing both the participant's concern and your reading of it." },
    { n: "04", title: "Find the connections", body: "Look for relationships among the statements — clustering, contrast, sequence, tension." },
    { n: "05", title: "Personal Experiential Themes", body: "Develop PETs for this case, evidenced in this person's words." },
    { n: "06", title: "Begin the next case afresh", body: "Bracket what you found. The next participant is not a confirmation exercise." },
    { n: "07", title: "Convergence and divergence", body: "Only now look across cases — and preserve difference rather than smoothing it away." },
    { n: "08", title: "Build the account", body: "Write an interpretative account that a reader can trace back to the extracts supporting it." },
  ],

  craftLede:
    "The analytic engine of IPA is a slow, four-column pass over a short stretch of transcript — three to five pages of one rich interview is plenty to learn on.",
  craft: [
    { title: "Transcript", asks: "The participant's words", colour: "var(--pen)" },
    { title: "Descriptive", asks: "What is being described?", colour: "var(--teal)" },
    { title: "Linguistic", asks: "How is it expressed?", colour: "var(--gold-deep)" },
    { title: "Conceptual", asks: "What might this mean?", colour: "var(--red)" },
  ],
  attendTo: [
    "metaphors", "pronouns", "hesitations", "laughter", "self-correction",
    "temporal shifts", "changes in emotional position", "contradictions",
    "unusually vivid expressions", "things that are hard to articulate",
  ],

  terminologyLede:
    "The 2022 texts revised the vocabulary to describe the analysis more accurately. The process was not replaced; the words were sharpened. Researchers starting new projects are advised to use the current terms — old vocabulary dates a manuscript immediately.",
  terminology: [
    { was: "Emergent theme", now: "Experiential statement", note: "The unit produced by close reading of one case. The change stresses that it is a statement about experience, not a label spotted in text." },
    { was: "Superordinate theme (within a case)", now: "Personal Experiential Theme (PET)", note: "A cluster of related experiential statements for one participant — personal, and belonging to that case." },
    { was: "Master theme (across cases)", now: "Group Experiential Theme (GET)", note: "Developed only after case-level work, and only while preserving convergence and divergence between individuals." },
  ],

  qualityMarkersLede:
    "Nizza, Farr and Smith's four markers are the most useful single page to keep beside you while analysing and writing — they work equally well for auditing your own draft or judging someone else's paper.",
  qualityMarkers: [
    { n: "01", title: "A compelling, unfolding narrative", body: "The analysis moves and develops rather than listing. A reader should feel taken somewhere." },
    { n: "02", title: "A vigorous experiential or existential account", body: "The writing stays with experience and what it was like, rather than retreating into abstraction." },
    { n: "03", title: "Close analytic reading of participants' words", body: "Extracts are analysed, not merely displayed — attention to the particular language used." },
    { n: "04", title: "Attention to convergence and divergence", body: "Both similarity and difference across participants are shown, with the particular preserved." },
  ],

  themeContrastLede:
    "A theme name is an analytic claim. If yours could head a chapter in any qualitative report on any topic, it is not doing the work.",
  themeContrast: {
    weak: ["Theme 1: Challenges", "Theme 2: Emotions", "Theme 3: Support"],
    strong: [
      "Being publicly competent while privately losing control",
      "Music as a temporary shelter from organisational intrusion",
      "Performing cultural authenticity while questioning one's authority",
      "The body becoming an unreliable professional partner",
    ],
    note: "The stronger formulations say both <b>what matters</b> and <b>how it is experienced</b>. They carry tension, and they could not be transplanted onto a different study without becoming false.",
  },

  stagesLede:
    "Competence develops through engagement with cases, so the pathway is built around doing rather than reading. Each stage has a small, finishable output.",
  stages: [
    { n: "01", title: "Learn the sensibility", body: "Understand that IPA is not “coding interview data”. It is a disciplined movement between description and interpretation that protects the particularity of the case.", read: "Smith & Nizza, chs. 1–2 · Smith (2004) · Larkin, Watts & Clifton (2006)" },
    { n: "02", title: "Learn to recognise a good account", body: "Take one exemplar and mark each paragraph: is the author presenting material, reading language closely, interpreting, linking moments in the account, comparing cases, or in dialogue with psychological concepts?", read: "Eatough & Smith (2006) or Smith & Osborn (2007)" },
    { n: "03", title: "Analyse one short case", body: "Three to five pages of one rich transcript, worked in four columns. Then formulate a small number of experiential statements that hold both the participant's concern and your interpretation." },
    { n: "04", title: "Build a case narrative", body: "Cluster statements into PETs. For each, ask: what is the central experiential claim, why does it matter to this person, how does it unfold, what complicates it, what language supports it — and am I saying more than the material permits?" },
    { n: "05", title: "Audit against the markers", body: "Run the four markers over your own draft. If your themes read as a flat list, the analysis is not finished.", read: "Nizza, Farr & Smith (2021)" },
  ],

  exemplarsLede:
    "Instructions are not enough. IPA becomes legible when you watch a good paper move between quotation, close linguistic reading and interpretation — so read at least one exemplar before analysing anything of your own.",
  exemplars: [
    { year: "2006", authors: "Eatough & Smith", work: "“I was like a wild wild person”: Understanding feelings of anger using IPA · British Journal of Psychology", body: "The best teacher for metaphor, embodied language, emotional complexity and contradiction inside a single account." },
    { year: "2007", authors: "Smith & Osborn", work: "Pain as an assault on the self · Psychology &amp; Health", body: "A classic exemplar: how analysis moves from bodily experience into identity, biography and sense of self without losing contact with the participant's language." },
    { year: "2015", authors: "Taylor", work: "Using IPA in a mixed-methods design to explore music in the lives of mature-age amateur keyboard players · Music Education Research", body: "Combines IPA with music-specific elicitation — Rivers of Musical Experience, conversational repertory grids, audio-stimulus recall — showing how to help participants articulate experience that ordinary questioning does not reach." },
    { year: "2023", authors: "De Kock et al.", work: "Lived experiences of musicians with pain · International Journal of Qualitative Studies on Health and Well-being", body: "Five professional violinists making sense of pain — musical identity, professional practice, bodily experience and wellbeing meeting in one account." },
    { year: "2024", authors: "Berber", work: "An IPA of foreign IT professionals' work experiences in Germany · Human Relations", body: "IPA in an organisational journal: eleven professionals interpreting roles, workplace relationships, perceived injustice and career positioning, with individual perspectives preserved alongside broader experiential themes." },
  ],

  misusesLede:
    "Five ways a study stops being IPA while still claiming the name. The first two account for most of them.",
  misuses: [
    "<b>Coding every transcript at once</b> and merging into group themes. This abandons idiography, and it is the most common failure by a wide margin.",
    "<b>Paraphrasing participants</b> and calling it analysis. Presenting what someone said, tidied, is giving voice without making sense.",
    "<b>Importing a theory</b> that overwhelms the account. Interpretation has to remain demonstrably connected to the participant's words.",
    "<b>Flat, transplantable themes</b> — “Challenges”, “Barriers”, “Emotions”. A theme that would fit any study is a claim about nothing.",
    "<b>Using IPA for the wrong question.</b> Prevalence, prediction and synthesis across stakeholders are not IPA questions, however qualitative the data.",
  ],
  qualifications: [
    "IPA makes no claim to representativeness. Samples are small, purposive and relatively homogeneous by design, and the point is depth in a bounded group — not generalisation to a population.",
    "The interpretation is the researcher's, and a different analyst would produce a different — not necessarily worse — account. Transparency about the interpretative route is what substitutes for reproducibility here.",
    "Accounts are what participants could articulate on that day, to that interviewer. Experience that is hard to put into words is under-represented by construction, which is partly why elicitation methods have been developed around it.",
    "The terminology has changed twice; much published work uses older vocabulary, so read older papers for their analysis rather than their labels.",
  ],

  coreReadingLabel: "The eight to own",
  coreReading: [
    { citation: "Smith, J. A., Flowers, P., &amp; Larkin, M. (2022). <i>Interpretative Phenomenological Analysis: Theory, Method and Research</i> (2nd ed.). SAGE.", contribution: "The definitive reference. Where you justify methodological decisions from." },
    { citation: "Smith, J. A., &amp; Nizza, I. E. (2022). <i>Essentials of Interpretative Phenomenological Analysis.</i> American Psychological Association.", contribution: "Shorter and procedural, with worked examples. Read this one first." },
    { citation: "Smith, J. A. (1996). Beyond the divide between cognition and discourse. <i>Psychology &amp; Health, 11</i>(2), 261–271.", contribution: "The original formulation — read for why IPA exists, not for current procedure." },
    { citation: "Smith, J. A. (2004). Reflecting on the development of interpretative phenomenological analysis. <i>Qualitative Research in Psychology, 1</i>(1), 39–54.", contribution: "The clearest short account of IPA as idiographic, inductive and interrogative." },
    { citation: "Larkin, M., Watts, S., &amp; Clifton, E. (2006). Giving voice and making sense in interpretative phenomenological analysis. <i>Qualitative Research in Psychology, 3</i>(2), 102–120.", contribution: "What “interpretative” actually means — and the two failure modes it guards against." },
    { citation: "Smith, J. A. (2019). Participants and researchers searching for meaning. <i>Qualitative Research in Psychology, 16</i>(2), 166–181.", contribution: "The advanced treatment of the double hermeneutic." },
    { citation: "Smith, J. A. (2011). Evaluating the contribution of interpretative phenomenological analysis. <i>Health Psychology Review, 5</i>(1), 9–27.", contribution: "Distinguishes stronger from weaker applications — useful for reading others' papers critically." },
    { citation: "Nizza, I. E., Farr, J., &amp; Smith, J. A. (2021). Achieving excellence in interpretative phenomenological analysis: Four markers of high quality. <i>Qualitative Research in Psychology, 18</i>(3), 369–386.", contribution: "Keep this beside you while analysing and writing." },
  ],
  fullSources: [
    { citation: "Smith, J. A., Flowers, P., &amp; Larkin, M. (2022). <i>Interpretative Phenomenological Analysis: Theory, Method and Research</i> (2nd ed.). SAGE.", contribution: "Definitive methodology text; revises the 2009 edition substantially." },
    { citation: "Smith, J. A., &amp; Nizza, I. E. (2022). <i>Essentials of Interpretative Phenomenological Analysis.</i> APA.", contribution: "Step-by-step practical introduction." },
    { citation: "Smith, J. A. (1996). Beyond the divide between cognition and discourse: Using interpretative phenomenological analysis in health psychology. <i>Psychology &amp; Health, 11</i>(2), 261–271.", contribution: "Original methodological formulation." },
    { citation: "Smith, J. A. (2004). Reflecting on the development of interpretative phenomenological analysis and its contribution to qualitative research in psychology. <i>Qualitative Research in Psychology, 1</i>(1), 39–54.", contribution: "Idiographic, inductive, interrogative." },
    { citation: "Larkin, M., Watts, S., &amp; Clifton, E. (2006). Giving voice and making sense in interpretative phenomenological analysis. <i>Qualitative Research in Psychology, 3</i>(2), 102–120.", contribution: "The two commitments of interpretation." },
    { citation: "Larkin, M., Eatough, V., &amp; Osborn, M. (2011). Interpretative phenomenological analysis and embodied, active, situated cognition. <i>Theory &amp; Psychology, 21</i>(3), 318–337.", contribution: "Embodiment, space, movement, sensory experience — the theoretical source for bodily and situated topics." },
    { citation: "Smith, J. A. (2011). Evaluating the contribution of interpretative phenomenological analysis. <i>Health Psychology Review, 5</i>(1), 9–27.", contribution: "Quality criteria; stronger versus weaker applications." },
    { citation: "Smith, J. A. (2011). Evaluating the contribution of interpretative phenomenological analysis: A reply to the commentaries and further development of criteria. <i>Health Psychology Review, 5</i>, 55–61.", contribution: "Companion response extending the criteria." },
    { citation: "Smith, J. A. (2019). Participants and researchers searching for meaning: Conceptual developments for interpretative phenomenological analysis. <i>Qualitative Research in Psychology, 16</i>(2), 166–181.", contribution: "The double hermeneutic developed." },
    { citation: "Nizza, I. E., Farr, J., &amp; Smith, J. A. (2021). Achieving excellence in interpretative phenomenological analysis: Four markers of high quality. <i>Qualitative Research in Psychology, 18</i>(3), 369–386.", contribution: "The contemporary quality framework." },
    { citation: "Smith, J. A., &amp; Osborn, M. (2008). Interpretative phenomenological analysis. In J. A. Smith (Ed.), <i>Qualitative Psychology: A Practical Guide to Research Methods</i> (2nd ed., pp. 53–80). SAGE.", contribution: "Long the standard concise how-to; use alongside the 2022 texts, as terminology has changed." },
    { citation: "Pietkiewicz, I., &amp; Smith, J. A. (2014). A practical guide to using interpretative phenomenological analysis in qualitative research psychology. <i>Psychological Journal, 20</i>(1), 7–14.", contribution: "Accessible overview of design, interviewing, analysis and reporting." },
    { citation: "Eatough, V., &amp; Smith, J. A. (2006). “I was like a wild wild person”: Understanding feelings of anger using interpretative phenomenological analysis. <i>British Journal of Psychology, 97</i>, 483–498.", contribution: "Exemplar: metaphor, embodied language, contradiction." },
    { citation: "Smith, J. A., &amp; Osborn, M. (2007). Pain as an assault on the self. <i>Psychology &amp; Health, 22</i>(5), 517–534.", contribution: "Exemplar: body, identity and biography." },
    { citation: "Taylor, A. (2015). Using interpretative phenomenological analysis in a mixed-methods research design to explore music in the lives of mature-age amateur keyboard players. <i>Music Education Research, 17</i>(4), 437–452.", contribution: "Exemplar: IPA with music-specific elicitation methods." },
    { citation: "De Kock, S., et al. (2023). Lived experiences of musicians with pain: An interpretative phenomenological analysis. <i>International Journal of Qualitative Studies on Health and Well-being.</i>", contribution: "Exemplar: five violinists, pain and musical identity." },
    { citation: "Berber, A. (2024). An interpretative phenomenological analysis of foreign IT professionals' work experiences in Germany. <i>Human Relations.</i>", contribution: "Exemplar: IPA in an organisational setting." },
  ],

  provenance: [
    { glyph: "●", colour: "var(--red)", label: "Source-grounded", note: "The three commitments, the double hermeneutic, the analytic sequence, the revised terminology, the four quality markers and each exemplar's focus are drawn from the cited works and the IPA research group's own guidance, attributed to the work that introduced them." },
    { glyph: "■", colour: "var(--teal)", label: "Plain-language paraphrase", note: "Procedure steps and quality markers are restated in ordinary words rather than quoted. The double-hermeneutic formulation is a compressed paraphrase of Smith (2019), not a quotation." },
    { glyph: "▲", colour: "var(--pen-3)", label: "Worked illustration", note: "The example research questions and the weak-versus-strong theme names are teaching illustrations. They are not findings, and no study is being characterised through them." },
    { glyph: "✦", colour: "var(--pen-3)", label: "Editorial framing", note: "Arranging the page as a practice — procedure, craft, audit, pathway — is our choice, as is the “five ways a study stops being IPA” framing. Both organise the guidance rather than reporting a cited claim." },
    { glyph: "?", colour: "var(--pen-3)", label: "Contested / unresolved", note: "How far interpretation may travel from the account is a live disagreement within qualitative psychology, and the boundary between IPA and reflexive thematic analysis is drawn differently by different authors." },
  ],
};

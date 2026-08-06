import type { MethodRecord } from "./types";

/* ---------------------------------------------------------------------------
   The second method record, and the one that tested whether the method
   template flexes. Two blocks were added for it — `schools` (a family name
   covering approaches that differ in assumptions, not just steps) and
   `codingExamples` (extract, topic label, analytic code). Both are reusable;
   neither is RTA-specific.

   The interactive is the school picker rather than another question sorter,
   because claiming reflexive TA while reporting inter-rater reliability is the
   commonest way this method is misreported.
   ------------------------------------------------------------------------- */
export const rta: MethodRecord = {
  id: "reflexive-thematic-analysis",
  kind: "method",
  slug: "reflexive-thematic-analysis",
  title: "Reflexive Thematic Analysis",
  abbr: "RTA",
  hook: "Themes do not emerge from data. Someone makes them — and this is the version of thematic analysis that says so out loud.",
  oneSentence:
    "Reflexive Thematic Analysis develops patterns of shared meaning across a dataset, treating themes as produced through interpretation rather than discovered, and the researcher's subjectivity as an analytic resource rather than a contaminant.",
  discipline: "qual-methods",
  statusChip: "Often misreported",
  topics: ["qualitative", "thematic analysis", "coding", "reflexivity", "Braun and Clarke", "semantic and latent", "codebook", "coding reliability"],
  facts: ["themes are made, not found", "6 recursive phases", "3 schools of TA", "2006 → 2022"],

  order: [
    "idea", "commitments", "schools", "procedure", "craft",
    "codingExamples", "themeContrast", "terminology", "misuses",
    "stages", "exemplars", "qualifications", "sources", "provenance",
  ],

  headings: {
    idea: { toc: "What it is", title: "Patterns you build, not patterns you find" },
    commitments: { toc: "What it rests on", title: "Five commitments that make it reflexive" },
    schools: { toc: "Which TA?", title: "Three approaches wearing one family name" },
    procedure: { toc: "The six phases", title: "Six phases, and why they are not six boxes" },
    craft: { toc: "Choices", title: "The choices that have to cohere" },
    codingExamples: { toc: "Coding", title: "A label names the topic; a code makes a claim" },
    themeContrast: { toc: "Themes that work", title: "A theme is not a topic with quotes attached" },
    terminology: { toc: "How to say it", title: "Say it the way the method actually works" },
    misuses: { toc: "How it goes wrong", title: "Seven ways it gets misreported" },
    stages: { toc: "Learn by doing", title: "Four exercises to learn it on real material" },
    exemplars: { toc: "Read this", title: "Watch it done, once" },
  },

  ideaLede:
    "Most qualitative reports say themes “emerged”. In reflexive TA they cannot, because <span class=\"hl-t\">nothing is lying in the data waiting to be found</span>. A theme is built: several observations gathered into an interpretative claim organised around a central concept. Saying so is not modesty — it is what makes the analytic work visible enough to judge.",
  originsNote:
    "The 2006 paper established thematic analysis as an explicitly described, theoretically flexible method, and it is still worth reading for that. But researchers began combining its procedures with assumptions drawn from incompatible forms of TA, so Braun and Clarke later articulated the approach explicitly as <i>reflexive</i> TA. Cite 2006 for history; do not use it alone to justify a contemporary study.",

  commitmentsLede:
    "Five commitments, and they hang together. Drop the first and the rest stop making sense — which is exactly how a study ends up claiming this method while doing another one.",
  commitments: [
    { title: "Themes are produced", icon: "i-star", colour: "var(--gold-deep)", body: "Patterns of meaning are constructed through analysis rather than discovered. “Themes emerged” hides the work that made them, and hidden work cannot be assessed." },
    { title: "The researcher interprets", icon: "i-person", colour: "var(--teal)", body: "Analysis is unavoidably shaped by who does it. Two theoretically informed researchers may produce different — and equally defensible — readings of the same dataset." },
    { title: "Subjectivity is a resource", icon: "i-eye", colour: "var(--red)", body: "Your standpoint, assumptions and questions are part of the instrument, to be examined reflexively rather than scrubbed out as contamination." },
    { title: "Coding is recursive", icon: "i-arrowb", colour: "var(--teal)", body: "Codes and themes evolve as understanding develops. You move backwards and forwards through the phases; the sequence is a rhythm, not a checklist." },
    { title: "Quality is coherence", icon: "i-check", colour: "var(--gold-deep)", body: "A convincing analysis rests on conceptual coherence, depth, reflexivity and a persuasive account — not on two coders converging on the same labels." },
  ],

  schoolsLede:
    "“Thematic analysis” names at least three approaches that differ in what they assume about meaning, knowledge and the researcher — not merely in their steps. Pick one below and see what it commits you to.",
  schoolsNote:
    "These are not three techniques for the same job. The commonest methodological error is to claim reflexive TA while also reporting independent coders, consensus resolution, a fixed codebook, inter-rater reliability, or themes that “emerged”. That combination signals conceptual mixing unless it is very carefully justified.",
  schools: [
    {
      name: "Coding-reliability TA",
      isThis: false,
      blurb: "Treats coding as something that can be standardised and verified. Defensible within some positivist or post-positivist designs — but it is not this method, and its quality language does not transfer.",
      marks: ["predesigned coding frame", "multiple independent coders", "coding agreement", "inter-rater reliability", "consensus procedures", "coding treated as standardisable"],
    },
    {
      name: "Codebook TA",
      isThis: false,
      blurb: "Sits between the two: a structured coding framework, but more interpretative latitude than coding-reliability approaches allow. Framework analysis, template analysis and matrix analysis are usually of this kind.",
      marks: ["structured coding framework", "some interpretative latitude", "framework analysis", "template analysis", "matrix analysis"],
    },
    {
      name: "Reflexive TA",
      isThis: true,
      blurb: "Coding and theme development are interpretative and evolving. There is no fixed codebook and no claim that one coding solution is objectively correct — the analysis is judged on coherence and depth instead.",
      marks: ["no fixed codebook", "coding evolves", "themes as organising concepts", "no coder-agreement test", "reflexivity throughout"],
    },
  ],

  procedureLede:
    "Six phases — better understood as a movement you travel back and forth through as the interpretation develops.",
  cardinalRule:
    "The phases are recursive, not sequential. Researchers routinely return to earlier phases as themes develop, and a methods section that recites the six phases as six completed boxes usually signals an analysis that was performed mechanically rather than thought through.",
  procedure: [
    { n: "01", title: "Familiarise yourself with the dataset", body: "Read and reread; listen to recordings where you have them. Note early observations, contradictions, repetitions and tensions, and record your own reactions. The purpose is not to identify final themes now." },
    { n: "02", title: "Coding", body: "Label features analytically relevant to the research question. Codes may be semantic or latent, inductive or deductive, experiential or critical — or a coherent combination. A code should express an analytic idea, not restate the topic." },
    { n: "03", title: "Generating initial themes", body: "Explore how codes might combine into broader patterns of shared meaning. A candidate theme needs a central organising concept, relevance to the question, enough supporting material, an interpretative argument and internal coherence. Frequency alone does not make one." },
    { n: "04", title: "Developing and reviewing themes", body: "Check each candidate against the coded extracts and the whole dataset: clear central idea, distinct from the others, contributing to the analytic story. Themes can be split, merged, abandoned or substantially rethought." },
    { n: "05", title: "Refining, defining and naming", body: "Fix what the theme claims, where its boundaries fall, what is inside and outside it, how it relates to the others and what job it does in answering the question. A strong name carries the argument, not just the topic." },
    { n: "06", title: "Writing up", body: "Writing is part of the analysis. Integrate claims, carefully selected extracts, interpretation of those extracts, connections across the dataset, theory where it helps, and a reflexive account of how you worked. A quotation does not prove a theme by itself." },
  ],

  craftLede:
    "Thematic analysis is flexible, and that flexibility is a responsibility rather than a licence. There is no automatically correct design — but the parts have to fit together, and you have to be able to say which choices you made and why.",
  craft: [
    { title: "Semantic", asks: "What is explicitly said?", colour: "var(--teal)" },
    { title: "Latent", asks: "What assumptions organise it?", colour: "var(--red)" },
    { title: "Inductive", asks: "Led by the material", colour: "var(--gold-deep)" },
    { title: "Deductive", asks: "Informed by theory", colour: "var(--pen)" },
  ],
  attendTo: [
    "ontology", "epistemology", "research question", "sampling", "data collection",
    "inductive / deductive orientation", "semantic / latent focus",
    "experiential / critical interest", "scope of the analysis",
  ],

  codingExamplesLede:
    "The difference between a topic label and a code is the difference between filing something and saying something about it. Same extract, two readings.",
  codingExamplesNote:
    "The middle column names what the extract is <i>about</i>. The right-hand column makes a claim about what is going on in it — which is what a code has to do if the themes built from it are going to say anything. These three extracts are constructed illustrations, not data from any study.",
  codingExamples: [
    { extract: "We stopped following the plan because they seemed tired.", weak: "Changing plan", strong: "Treating participant energy as permission to improvise" },
    { extract: "I wasn't sure whether I was leading or accompanying.", weak: "Leadership", strong: "Professional authority becoming relationally unstable" },
    { extract: "Only afterwards did I realise the dance had changed my playing.", weak: "Music and dance", strong: "Recognising collaboration retrospectively" },
  ],

  themeContrastLede:
    "A theme is a pattern of shared meaning organised around a central concept — not everything participants said about one topic. If the name could head a section of any qualitative report, it is a container rather than a claim.",
  themeContrast: {
    weak: ["Challenges", "Benefits", "Participant responses", "Music and dance"],
    strong: [
      "Reading the room while surrendering the plan",
      "Professional confidence constructed through moments of uncertainty",
      "Abandoning the plan to preserve the purpose",
    ],
    note: "Try writing each candidate as a sentence beginning <i>“This theme captures a pattern in which…”</i>. If you cannot finish it without listing topics, you have a category rather than a theme.",
  },

  terminologyLede:
    "Some phrasing is not a style preference — it contradicts the method. These three substitutions do most of the work.",
  terminology: [
    { was: "Themes emerged from the data", now: "We developed three themes through recursive engagement", note: "Not cosmetic. “Emerged” implies the themes were already there and the researcher merely noticed them, which is precisely what this method denies." },
    { was: "Thematic analysis (unspecified), citing 2006", now: "Reflexive thematic analysis, citing the contemporary sources", note: "Naming the school tells a reader which assumptions apply. Unqualified “TA” resting on the 2006 paper alone is the commonest source of conceptual mixing." },
    { was: "Inter-rater reliability · coding accuracy · unbiased coding", now: "Reflexive engagement; collaboration that deepens interpretation", note: "Collaborative RTA is possible and often good. But difference between researchers is analytically productive, not an error to be resolved into one correct solution." },
  ],

  misusesLede:
    "Seven failures the quality literature keeps finding in published thematic analyses. The first is the most common, and the last is the most consequential.",
  misuses: [
    "<b>“Themes emerged from the data.”</b> Hides the analytic work and contradicts the method's central claim.",
    "<b>Interview questions used as themes.</b> “Workshop planning”, “participant responses” — this reproduces the interview schedule instead of reporting what you concluded about it.",
    "<b>Frequency treated as importance.</b> The most-mentioned issue is not automatically the most analytically important; a rare tension can illuminate the whole dataset.",
    "<b>Quotations presented as self-evident.</b> An extract followed straight by another extract is not analysis. Interpret the wording, the contrasts, the metaphors, the positioning.",
    "<b>Too many themes and subthemes.</b> A fragmented structure usually means codes were promoted directly into themes without building organising concepts.",
    "<b>Claiming RTA while measuring coder agreement.</b> The quality criteria of one school applied to another.",
    "<b>Mixing incompatible quality language.</b> “Objective themes”, “coding accuracy”, “bias-free” — these belong to a different set of assumptions and quietly undo the ones you claimed.",
  ],

  stagesLede:
    "RTA is recursive rather than formulaic, so it is learned on real material in small passes. Each exercise has a finishable output.",
  stages: [
    { n: "01", title: "Code one short reflection twice", body: "Take two or three pages. First pass: code what is explicitly being communicated — adapting to participant energy, uncertainty about structure, noticing quiet participants. Second pass: ask what assumptions and tensions organise the account — responsiveness functioning as a measure of professionalism, uncertainty reframed as creative sensitivity, silence destabilising a facilitator's sense of competence. Compare the two sets." },
    { n: "02", title: "Build three candidate themes", body: "Select related codes and complete the sentence <i>“This theme captures a pattern in which…”</i>. Then name it so the name carries the argument — “Abandoning the plan to preserve the purpose” rather than “Planning”." },
    { n: "03", title: "Challenge every theme", body: "Is this a shared meaning or a shared topic? What is its central organising concept? What does it explain? Which extracts complicate it? Is it distinct from the others? Does it answer the research question? Could you explain it in two sentences? Have you interpreted, or catalogued?" },
    { n: "04", title: "Keep a reflexive memo", body: "After each session: what drew your attention, what you expected, what surprised you, how your position shapes the reading, whether you are protecting or criticising your own decisions, which assumptions came from theory, and what changed since last time. Reflexivity is this — not a ceremonial paragraph in the methods section." },
  ],

  exemplarsLede:
    "One worked example is enough to see the movement from extract to code to candidate theme, and how the analytic narrative is assembled.",
  exemplars: [
    { year: "2022", authors: "Byrne", work: "A worked example of Braun and Clarke's approach to reflexive thematic analysis · Quality &amp; Quantity", body: "The most widely used accessible demonstration: extracts to codes, candidate themes, theme mapping, recursive revision, and the misunderstandings that arise when researchers rely on the 2006 article alone. Read it as an <b>illustration</b> — Braun and Clarke's own work remains the methodological authority." },
  ],

  qualifications: [
    "The flexibility of the method will not carry your design. Because no configuration is automatically correct, the coherence between question, orientation and analysis has to be argued rather than assumed.",
    "Different researchers may produce different, equally defensible analyses. That is a property of the approach rather than a defect — but it means the account has to show its reasoning, since it cannot appeal to reproducibility.",
    "RTA is not automatically the right choice, and its authors do not claim it is. Grounded theory, IPA, framework and template analysis, content analysis and discourse approaches answer different questions and produce different kinds of knowledge.",
    "Publication dates around the 2022 book differ between editions and catalogues, with some listing 2021. Cite the date printed in the edition you actually consulted.",
  ],

  coreReadingLabel: "The eight, in reading order",
  coreReading: [
    { citation: "Braun, V., &amp; Clarke, V. (2022). <i>Thematic Analysis: A Practical Guide.</i> SAGE.", contribution: "The definitive contemporary text and your principal methodological authority." },
    { citation: "Braun, V., &amp; Clarke, V. (2006). Using thematic analysis in psychology. <i>Qualitative Research in Psychology, 3</i>(2), 77–101.", contribution: "The original six-phase formulation. Read for history — not as sole justification.", doi: "10.1191/1478088706qp063oa" },
    { citation: "Braun, V., &amp; Clarke, V. (2019). Reflecting on reflexive thematic analysis. <i>Qualitative Research in Sport, Exercise and Health, 11</i>(4), 589–597.", contribution: "The clearest account of why it is “reflexive” and what changed since 2006.", doi: "10.1080/2159676X.2019.1628806" },
    { citation: "Braun, V., &amp; Clarke, V. (2022). Conceptual and design thinking for thematic analysis. <i>Qualitative Psychology, 9</i>(1), 3–26.", contribution: "Designing a study whose parts cohere. Essential for doctoral work.", doi: "10.1037/qup0000196" },
    { citation: "Braun, V., &amp; Clarke, V. (2021). One size fits all? What counts as quality practice in (reflexive) thematic analysis? <i>Qualitative Research in Psychology, 18</i>(3), 328–352.", contribution: "Compulsory before writing a methods or findings section.", doi: "10.1080/14780887.2020.1769238" },
    { citation: "Braun, V., &amp; Clarke, V. (2021). Can I use TA? Should I use TA? Should I not use TA? <i>Counselling and Psychotherapy Research, 21</i>(1), 37–47.", contribution: "Comparing RTA with IPA, grounded theory, framework, template and content analysis.", doi: "10.1002/capr.12360" },
    { citation: "Braun, V., Clarke, V., Hayfield, N., &amp; Terry, G. (2019). Thematic analysis. In P. Liamputtong (Ed.), <i>Handbook of Research Methods in Health Social Sciences</i> (pp. 843–860). Springer.", contribution: "A concise map when you need less than the full textbook.", doi: "10.1007/978-981-10-5251-4_103" },
    { citation: "Byrne, D. (2022). A worked example of Braun and Clarke's approach to reflexive thematic analysis. <i>Quality &amp; Quantity, 56</i>, 1391–1412.", contribution: "The practical demonstration.", doi: "10.1007/s11135-021-01182-y" },
  ],
  fullSources: [
    { citation: "Braun, V., &amp; Clarke, V. (2022). <i>Thematic Analysis: A Practical Guide.</i> SAGE.", contribution: "Definitive contemporary account; some catalogues list 2021." },
    { citation: "Braun, V., &amp; Clarke, V. (2006). Using thematic analysis in psychology. <i>Qualitative Research in Psychology, 3</i>(2), 77–101.", contribution: "Foundational six-phase formulation.", doi: "10.1191/1478088706qp063oa" },
    { citation: "Braun, V., &amp; Clarke, V. (2019). Reflecting on reflexive thematic analysis. <i>Qualitative Research in Sport, Exercise and Health, 11</i>(4), 589–597.", contribution: "The move to an explicitly reflexive approach.", doi: "10.1080/2159676X.2019.1628806" },
    { citation: "Braun, V., &amp; Clarke, V. (2021). One size fits all? What counts as quality practice in (reflexive) thematic analysis? <i>Qualitative Research in Psychology, 18</i>(3), 328–352.", contribution: "Quality criteria and the common failures.", doi: "10.1080/14780887.2020.1769238" },
    { citation: "Braun, V., &amp; Clarke, V. (2021). Can I use TA? Should I use TA? Should I not use TA? <i>Counselling and Psychotherapy Research, 21</i>(1), 37–47.", contribution: "Choosing knowingly between pattern-based approaches.", doi: "10.1002/capr.12360" },
    { citation: "Braun, V., &amp; Clarke, V. (2022). Conceptual and design thinking for thematic analysis. <i>Qualitative Psychology, 9</i>(1), 3–26.", contribution: "Coherent design across ontology, question, sampling and orientation.", doi: "10.1037/qup0000196" },
    { citation: "Braun, V., &amp; Clarke, V. (2023). Toward good practice in thematic analysis: Avoiding common problems and be(com)ing a knowing researcher. <i>International Journal of Transgender Health, 24</i>(1), 1–6.", contribution: "Concise final check; published online 2022, assigned to a 2023 issue.", doi: "10.1080/26895269.2022.2129597" },
    { citation: "Braun, V., Clarke, V., Hayfield, N., &amp; Terry, G. (2019). Thematic analysis. In P. Liamputtong (Ed.), <i>Handbook of Research Methods in Health Social Sciences</i> (pp. 843–860). Springer.", contribution: "Concise handbook overview.", doi: "10.1007/978-981-10-5251-4_103" },
    { citation: "Byrne, D. (2022). A worked example of Braun and Clarke's approach to reflexive thematic analysis. <i>Quality &amp; Quantity, 56</i>, 1391–1412.", contribution: "Applied illustration of the phases in practice.", doi: "10.1007/s11135-021-01182-y" },
    { citation: "Braun, V., &amp; Clarke, V. (2013). <i>Successful Qualitative Research: A Practical Guide for Beginners.</i> SAGE.", contribution: "Broader qualitative foundation — questions, interviewing, transcription, reflexivity, writing." },
  ],

  provenance: [
    { glyph: "●", colour: "var(--red)", label: "Source-grounded", note: "The three schools, the six phases, the semantic/latent and inductive/deductive orientations, the design components that must cohere, and the catalogue of common problems are drawn from the cited works and attributed to the paper that introduced them." },
    { glyph: "■", colour: "var(--teal)", label: "Plain-language paraphrase", note: "Phases, commitments and quality problems are restated in ordinary words rather than quoted. The terminology substitutions render the sources' guidance as usable phrasing." },
    { glyph: "▲", colour: "var(--pen-3)", label: "Worked illustration", note: "The three coded extracts and every theme name shown are constructed teaching illustrations. They are not data, not findings, and no study is characterised through them." },
    { glyph: "✦", colour: "var(--pen-3)", label: "Editorial framing", note: "Arranging the page as a practice, leading with the school picker, and the “seven ways it gets misreported” framing are ours. They organise the guidance rather than reporting a cited claim." },
    { glyph: "?", colour: "var(--pen-3)", label: "Contested / unresolved", note: "Where the boundary falls between reflexive and codebook TA, and how far collaborative coding is compatible with reflexive assumptions, remain matters of live methodological debate." },
  ],
};

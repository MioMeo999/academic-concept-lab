import type { TheoryRecord } from "./types";

/* ---------------------------------------------------------------------------
   Musical preference is not one theory, and this record says so on its face.
   The `conceptualStatus` block exists for exactly this case: a body of work
   with converging questions and competing answers, which would be
   misrepresented by being flattened into a single framework.

   Given a third theory, records now live one per file rather than accumulating
   in theory.ts.
   ------------------------------------------------------------------------- */
export const musicPreference: TheoryRecord = {
  id: "music-preference",
  kind: "theory",
  slug: "music-preference",
  title: "Music Preference and Person–Music Fit",
  hook: "Your taste feels like yours alone — so why does it fall into patterns that can be measured?",
  oneSentence:
    "Musical preference is not a single theory but a research field: how preferences are structured, why people differ, what shapes them, and what happens when people choose their own music.",
  discipline: "music-psych",
  statusChip: "Research field",
  topics: ["music preference", "personality", "MUSIC model", "STOMP", "familiarity", "identity", "music at work", "self-selection"],
  facts: ["a field, not one theory", "4 → 5 factor models", "1995 → 2011", "7 sources"],

  /* Read in this order: say what the field is, show the structure and how it
     was measured, then what shapes it, what it is for and how it develops —
     and only then the applied literature and the synthesis. */
  order: [
    "conceptualStatus", "idea", "models",
    "expansions", "interactions", "pathways",
    "applied", "categories",
    "trail", "oversimplifications", "qualifications", "sources", "provenance",
  ],

  headings: {
    idea: { toc: "The shape of taste", title: "Taste has a shape" },
    models: { toc: "The models", title: "Two attempts to map the structure" },
    applied: { toc: "Music at work", title: "When the listening happens at work" },
    expansions: { toc: "What shapes it", title: "Five things that shape a preference" },
    interactions: { toc: "What it is for", title: "Preference as something music does for you" },
    pathways: { toc: "How it develops", title: "How a taste gets built" },
    categories: { toc: "Person–Music Fit", title: "Person–Music Fit: the two sides" },
  },

  conceptualStatus: {
    flag: "This is a field, not a theory.",
    body: "There is no single “theory of musical preference” to state, and no founding paper that settles it. What exists is a body of work with converging questions and competing answers. Presenting it as one framework would be tidier — and wrong. Read the sections below as strands of an argument still running, not as parts of one machine.",
    questions: [
      "How musical preferences are <b>structured</b> — whether taste has dimensions, and what they are.",
      "Why people <b>differ</b> in their preferences.",
      "How <b>personality, familiarity, culture, musical properties and listening functions</b> influence preference.",
      "How <b>preferred or self-selected</b> music affects experience and behaviour.",
    ],
  },

  ideaLede:
    "Ask one person what music they like and you get a list of genres. Ask a few thousand and the lists stop looking arbitrary: preferences <span class=\"hl-t\">cluster</span>. The field's founding move was to treat taste as something with a measurable structure rather than a bag of personal quirks.",
  originsNote:
    "The field has no single founding paper. It draws on personality psychology, music perception, developmental and social psychology, and — separately and more recently — organisational research on listening at work. Those strands do not always talk to each other.",

  demo: {
    type: "facets",
    start: 0,
    label: "The five MUSIC dimensions",
    options: ["M", "U", "S", "I", "C"],
    caption: "Rentfrow, Goldberg & Levitin (2011). Dimension characters are paraphrased; genre names are shorthand for describing them, never their definition.",
    facets: [
      { initial: "M", label: "Mellow", body: "Smooth, slow-moving, low-arousal music. The dimension describes a quality of sound — unhurried, soft-edged, calm — rather than a list of genres that happen to sound that way." },
      { initial: "U", label: "Unpretentious", body: "Straightforward, sincere, unadorned music that does not draw attention to its own cleverness. Easy to mistake for a judgement about the listener; it is a description of the sound." },
      { initial: "S", label: "Sophisticated", body: "Complex, inventive, frequently instrumental music that rewards attention to its structure. Note that “sophisticated” names the music's density, not the listener's discernment." },
      { initial: "I", label: "Intense", body: "Loud, forceful, high-energy music, often distorted, with drive and aggression in the sound itself." },
      { initial: "C", label: "Contemporary", body: "Rhythmic and percussive, often electronic or vocal-forward, oriented to the present moment rather than to a tradition." },
    ],
  },

  modelsLede:
    "Two structures, eight years apart. The gap between them is not just an extra factor — it is a change in <span class=\"hl\">what was measured</span>, and that is the more interesting part.",
  modelsNote:
    "The two models were built from different evidence: one from what people say about <i>genre names</i>, the other from how they respond to <i>music</i>. Genre labels carry social baggage that sound does not, and they drift over time and between groups. Treating the two as interchangeable measurements of the same thing is the commonest error in reading this literature.",
  models: [
    {
      year: "2003",
      name: "A four-factor structure",
      source: "Rentfrow & Gosling · Journal of Personality and Social Psychology",
      body: "Introduced the <b>Short Test of Music Preferences (STOMP)</b> and identified an influential four-factor structure of genre preferences. It opened the modern personality-and-preference literature and remains the best starting point for it.",
      note: "Built on preferences for <b>genre labels</b>.",
    },
    {
      year: "2011",
      name: "The MUSIC five-factor model",
      source: "Rentfrow, Goldberg & Levitin · Journal of Personality and Social Psychology",
      body: "Proposed five dimensions — <b>M</b>ellow, <b>U</b>npretentious, <b>S</b>ophisticated, <b>I</b>ntense, <b>C</b>ontemporary. Explore them in the control above.",
      note: "Built on responses to <b>musical excerpts</b>, not genre labels alone.",
    },
  ],

  expansionsLede:
    "No single one of these explains a preference. They are the five levers the literature keeps returning to, and they interact.",
  expansions: [
    { title: "Personality", icon: "i-person", colour: "var(--teal)", body: "The strand STOMP opened: preferences and personality traits are related. The relationships are real but modest — personality shapes taste, it does not determine it." },
    { title: "Familiarity", icon: "i-arrowb", colour: "var(--red)", body: "What you have already heard shapes what you like. Repeated exposure is among the most reliable influences on liking, which makes a taste partly a record of what has been available to you." },
    { title: "Culture", icon: "i-globe", colour: "var(--teal)", body: "The repertoire on offer, and what it means to like it, differ by place and group. A structure recovered in one population is a claim about that population until it is tested elsewhere." },
    { title: "Musical properties", icon: "i-star", colour: "var(--red)", body: "Tempo, complexity, energy and timbre belong to the music, not the listener. The 2011 model matters partly because it measured responses to these rather than to names." },
    { title: "Listening functions", icon: "i-head", colour: "var(--teal)", body: "What a listener wants the music to do — concentrate, recover, feel something, be someone. This is the lever that turns preference from a trait into a choice made in a situation." },
  ],

  interactionsLede:
    "One influential account inverts the usual question. Instead of asking what kind of person likes this music, it asks what this music is <i>for</i>.",
  interactions: [
    {
      kicker: "Schäfer & Sedlmeier (2009)",
      title: "Preference follows function",
      body: "People may prefer music partly because it fulfils valued psychological and social functions. On this account taste is not only an aesthetic fact about a person — it is a record of what they have needed music to do.",
    },
    {
      kicker: "the functions most often named",
      title: "Identity and connection",
      body: "Two recur throughout: <b>identity expression</b> — music as a way of saying who you are, to yourself and to others — and <b>social connection</b>, where shared taste works as a bond and a signal of belonging.",
    },
  ],

  pathwaysLede:
    "Taste is not issued at birth. The developmental work asks how and why preferences change through childhood and adolescence — and why they move most when identity is most in question.",
  pathwaysCaution:
    "This account covers childhood and adolescence. Extending it into a claim that adult taste is fixed goes beyond what the cited work supports.",
  pathways: [
    {
      title: "How a preference gets built",
      icon: "i-arrowb",
      colour: "var(--teal)",
      blurb: "Hargreaves, North and Tarrant trace preference change through childhood and adolescence, where familiarity, social identity and shifting social contexts do most of the work.",
      steps: ["Early exposure and familiarity", "Adolescence: identity formation", "Music as a group-membership signal", "Changing social contexts reshape taste"],
    },
  ],

  appliedLede:
    "A separate and much smaller literature asks what happens when the listening is done <b>at work</b>, by choice, on personal equipment. It is the strand closest to workplace research — and where preference stops being about taste and starts being about control.",
  applied: [
    {
      year: "1995",
      authors: "Oldham, Cummings, Mischel, Schmidtke & Zhou",
      work: "Listen while you work? Quasi-experimental relations between personal-stereo headset use and employee work responses · Journal of Applied Psychology",
      body: "An early and important organisational study of <b>individually controlled</b> music listening at work. Part of its significance is the framing: headset use treated as a work condition the employee chooses, not as background music the organisation supplies.",
    },
    {
      year: "2005",
      authors: "Lesiuk",
      work: "The effect of music listening on work performance · Psychology of Music",
      body: "A workplace field study connecting music listening with positive affect, perceived work quality and time spent on tasks.",
    },
    {
      year: "2011",
      authors: "Haake",
      work: "Individual music listening in workplace settings: An exploratory survey of offices in the UK · Musicae Scientiae",
      body: "An exploratory survey of UK offices examining <b>why</b> employees listen, <b>when</b> they listen, and how they balance personal needs against colleagues and organisational considerations — the point at which a private preference becomes a shared social problem.",
    },
  ],

  categoriesLede:
    "Pulling the strands together: what a listener brings, and what a situation offers. Neither side alone settles the outcome — which is the same logic Person–Environment Fit applies to workplaces.",
  categoriesNote:
    "“Person–Music Fit” is our organising frame for this page, not an established named theory in the literature. The parallel with Person–Environment Fit is a deliberate editorial choice: a way of arranging the field for teaching, not a claim any cited author has made.",
  categories: [
    {
      title: "What the person brings",
      icon: "i-person",
      colour: "var(--teal)",
      definition: "The listener's side: the structure of their taste, the personality it relates to, what is already familiar, what they want the music to do right now, and how much they need to be the one deciding.",
      examples: ["taste structure", "personality", "familiarity", "listening goals", "need for control"],
    },
    {
      title: "What the situation offers",
      icon: "i-building",
      colour: "var(--red)",
      definition: "The setting's side: what music is actually available, what the task demands of attention, who else is in the room, and how much control over any of it the person really has.",
      examples: ["music available", "task demands", "the social setting", "actual control", "colleagues' claims"],
    },
  ],

  trailLede:
    "Seven works across sixteen years, and two literatures that only partly overlap: the structural and developmental work on taste, and the organisational work on listening at work.",
  origins: [
    { year: "1995", author: "Oldham, Cummings, Mischel, Schmidtke &amp; Zhou", work: "Listen while you work? · Journal of Applied Psychology", contribution: "An early organisational study of individually controlled music listening at work." },
    { year: "2003", author: "Rentfrow &amp; Gosling", work: "The do re mi's of everyday life · Journal of Personality and Social Psychology", contribution: "Introduced the Short Test of Music Preferences and an influential four-factor structure of genre preferences. The starting point for the modern personality-and-preference literature." },
    { year: "2005", author: "Lesiuk", work: "The effect of music listening on work performance · Psychology of Music", contribution: "A workplace field study connecting music listening with positive affect, perceived work quality and time spent on tasks." },
    { year: "2009", author: "Schäfer &amp; Sedlmeier", work: "From the functions of music to music preference · Psychology of Music", contribution: "A function-based explanation: people may prefer music partly because it fulfils valued psychological and social functions, including identity expression and social connection." },
    { year: "2010", author: "Hargreaves, North &amp; Tarrant", work: "How and why do musical preferences change in childhood and adolescence? · in Music Perception and Cognition", contribution: "Preference development, social identity, familiarity and changing social contexts." },
    { year: "2011", author: "Rentfrow, Goldberg &amp; Levitin", work: "The structure of musical preferences: A five-factor model · Journal of Personality and Social Psychology", contribution: "Introduced the MUSIC model — Mellow, Unpretentious, Sophisticated, Intense, Contemporary — using responses to musical excerpts rather than relying only on genre labels." },
    { year: "2011", author: "Haake", work: "Individual music listening in workplace settings · Musicae Scientiae", contribution: "An exploratory survey of UK offices: why and when employees listen, and how they balance personal needs with colleagues and organisational considerations." },
  ],

  oversimplificationsLede:
    "Five things this field does not license — and the first is the one this page is built to prevent.",
  oversimplifications: [
    "There is <b>no single theory</b> of musical preference. Treating any one model as “the” theory misrepresents a field that has not settled.",
    "The MUSIC dimensions are <b>not genre lists</b>. Genre names are shorthand for describing a dimension's character, never its definition.",
    "Preference measured by <b>genre label</b> and preference measured by <b>listening</b> are not the same measurement — the five-factor model exists partly because of that gap.",
    "<b>Liking</b> music and that music being <b>good for a task</b> are different claims. Preference does not by itself imply a performance benefit.",
    "<b>“Person–Music Fit” is our framing</b> for this page, not an established named theory. Do not cite it as one.",
  ],
  qualifications: [
    "Much of the structural work rests on samples that are not globally representative. How far any factor structure generalises across cultures is an open question, not a settled result.",
    "Genre categories drift over time and between groups, so instruments built on genre labels age in ways instruments built on sound may not.",
    "The workplace strand is small and methodologically mixed — a quasi-experiment, a field study and a survey — and reads better as three partial views than as a consolidated body of evidence.",
    "Whether self-selected music helps or hinders appears to depend on the task, the person and the degree of control. Those interactions are not fully mapped, and the honest summary is that it depends.",
  ],

  minimumReadingLabel: "If you read four things",
  minimumReading: [
    { citation: "Rentfrow, P. J., &amp; Gosling, S. D. (2003). The do re mi's of everyday life: The structure and personality correlates of music preferences. <i>Journal of Personality and Social Psychology, 84</i>(6), 1236–1256.", contribution: "The starting point — STOMP and the four-factor structure.", doi: "10.1037/0022-3514.84.6.1236" },
    { citation: "Rentfrow, P. J., Goldberg, L. R., &amp; Levitin, D. J. (2011). The structure of musical preferences: A five-factor model. <i>Journal of Personality and Social Psychology, 100</i>(6), 1139–1157.", contribution: "The MUSIC model, built from responses to musical excerpts.", doi: "10.1037/a0022406" },
    { citation: "Schäfer, T., &amp; Sedlmeier, P. (2009). From the functions of music to music preference. <i>Psychology of Music, 37</i>(3), 279–300.", contribution: "Why preference may follow function rather than trait.", doi: "10.1177/0305735608097247" },
    { citation: "Haake, A. B. (2011). Individual music listening in workplace settings: An exploratory survey of offices in the UK. <i>Musicae Scientiae, 15</i>(1), 107–129.", contribution: "The workplace case: why, when, and at what social cost people listen at work.", doi: "10.1177/1029864911398065" },
  ],
  fullSources: [
    { citation: "Rentfrow, P. J., &amp; Gosling, S. D. (2003). The do re mi's of everyday life. <i>Journal of Personality and Social Psychology, 84</i>(6), 1236–1256.", contribution: "STOMP; four-factor structure of genre preferences.", doi: "10.1037/0022-3514.84.6.1236" },
    { citation: "Rentfrow, P. J., Goldberg, L. R., &amp; Levitin, D. J. (2011). The structure of musical preferences: A five-factor model. <i>Journal of Personality and Social Psychology, 100</i>(6), 1139–1157.", contribution: "The MUSIC model, from responses to excerpts.", doi: "10.1037/a0022406" },
    { citation: "Schäfer, T., &amp; Sedlmeier, P. (2009). From the functions of music to music preference. <i>Psychology of Music, 37</i>(3), 279–300.", contribution: "Function-based account of preference.", doi: "10.1177/0305735608097247" },
    { citation: "Hargreaves, D. J., North, A. C., &amp; Tarrant, M. (2010). How and why do musical preferences change in childhood and adolescence? In M. R. Jones et al. (Eds.), <i>Music Perception and Cognition</i>.", contribution: "Preference development, social identity and familiarity." },
    { citation: "Oldham, G. R., Cummings, A., Mischel, L. J., Schmidtke, J. M., &amp; Zhou, J. (1995). Listen while you work? <i>Journal of Applied Psychology, 80</i>(5), 547–564.", contribution: "Personal-stereo headset use and employee work responses.", doi: "10.1037/0021-9010.80.5.547" },
    { citation: "Lesiuk, T. (2005). The effect of music listening on work performance. <i>Psychology of Music, 33</i>(2), 173–191.", contribution: "Field study of music listening and work responses.", doi: "10.1177/0305735605050650" },
    { citation: "Haake, A. B. (2011). Individual music listening in workplace settings. <i>Musicae Scientiae, 15</i>(1), 107–129.", contribution: "Survey of listening in UK offices.", doi: "10.1177/1029864911398065" },
  ],

  provenance: [
    { glyph: "●", colour: "var(--red)", label: "Source-grounded", note: "Model names, dates, journals, the STOMP and MUSIC structures, and the focus of each workplace study are drawn from the seven cited works, each attributed to the work that introduced it." },
    { glyph: "■", colour: "var(--teal)", label: "Plain-language paraphrase", note: "The five MUSIC dimensions are characterised in ordinary words. Those characterisations describe the dimensions' qualities, not their statistical definition, and any genre named is illustrative shorthand rather than a factor's content." },
    { glyph: "✦", colour: "var(--pen-3)", label: "Editorial framing", note: "“Person–Music Fit”, the two-sided table, and the parallel drawn with Person–Environment Fit are ours. They arrange the field for teaching; no cited author proposes them, and they should not be cited as a named theory." },
    { glyph: "?", colour: "var(--pen-3)", label: "Contested / unresolved", note: "The field has no single agreed theory. Cross-cultural generality of the factor structures, and whether self-selected music helps or hinders at work, are open questions rather than settled findings." },
  ],
};

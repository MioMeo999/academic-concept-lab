import type { TheoryRecord } from "./types";

/* ---------------------------------------------------------------------------
   The record that gave the library internal structure. P–O fit is explicitly a
   subtype of Person–Environment Fit, which is already record #1 — so rather
   than restating the parent framework, this page links to it and says what the
   relation is. The `relatedTo` block exists for that.

   It also opens on a naming correction, because "employee–organisation
   compatibility" is a fine plain-language gloss and a poor search term.
   ------------------------------------------------------------------------- */
export const personOrganisationFit: TheoryRecord = {
  id: "person-organisation-fit",
  kind: "theory",
  slug: "person-organisation-fit",
  title: "Person–Organisation Fit",
  hook: "Why do organisations fill up with people who resemble each other — and what does that cost them?",
  oneSentence:
    "Person–Organisation fit concerns compatibility between an individual and the organisation they work in — especially values, culture, goals, personality and needs — and is normally treated as a subtype of Person–Environment fit.",
  discipline: "ob",
  statusChip: "Subtype of P–E Fit",
  topics: ["person-organisation fit", "values congruence", "organisational culture", "attraction selection attrition", "supplementary fit", "complementary fit", "organizational culture profile", "recruitment"],
  facts: ["a subtype of P–E fit", "Attraction–Selection–Attrition", "1987 → 2023", "7 sources"],

  order: [
    "terminology", "relatedTo", "idea", "pathways", "categories",
    "models", "fitTargets", "trail", "oversimplifications", "qualifications",
    "sources", "provenance",
  ],
  demoIn: "models",

  headings: {
    terminology: { toc: "What to call it", title: "Call it Person–Organisation fit" },
    relatedTo: { toc: "Where it sits", title: "This sits inside a bigger framework" },
    idea: { toc: "The idea", title: "Compatibility with a particular employer" },
    pathways: { toc: "How it happens", title: "How organisations come to resemble themselves" },
    categories: { toc: "Two ways to fit", title: "Two quite different ways of fitting" },
    models: { toc: "Measuring it", title: "Which fit are you actually measuring?" },
    fitTargets: { toc: "Not the only fit", title: "P–O is one target among several" },
  },

  terminologyLede:
    "Two naming problems get in the way before the literature does. Both are easy to fix and both will otherwise cost you search results.",
  terminology: [
    {
      was: "Employee–organisation compatibility",
      now: "Person–Organisation fit (P–O fit)",
      note: "The plain-language phrasing is a good way to <i>explain</i> the idea and a poor way to <i>find</i> it. The standard academic term is Person–Organisation fit, abbreviated P–O fit — search, cite and write with that.",
    },
    {
      was: "“Fit”, unqualified",
      now: "Name the target: P–O, P–J, P–G or P–V",
      note: "Kristof's review distinguishes fit with the organisation from fit with the job, the group and the vocation. Unqualified “fit” hides which one is meant, and a finding about one is not evidence about another.",
    },
  ],

  relatedToLede:
    "P–O fit is not a free-standing framework. It is a narrowing of a broader one, and reading it without that parent is how people end up rediscovering distinctions the parent already makes.",
  relatedTo: [
    {
      recordId: "person-environment-fit",
      relation: "is a subtype of",
      body: "P–O fit takes Person–Environment fit and fixes the “environment” as the organisation, concentrating on values, culture, goals, personality and needs. The parent's two forms of correspondence — <b>demands–abilities</b> and <b>needs–supplies</b> — carry straight over, which is why the measurement section on this page has to distinguish them.",
    },
  ],

  ideaLede:
    "The question is not whether someone can do the job. It is whether they and <span class=\"hl-t\">this particular employer</span> are compatible — in what they value, how they operate, and what each wants from the other.",
  originsNote:
    "Unlike its parent framework, this one has identifiable founding papers. Schneider's 1987 argument that organisations are shaped by the people in them, and Chatman's 1989 formulation, are the two the literature keeps returning to.",

  pathwaysLede:
    "Schneider's Attraction–Selection–Attrition framework explains something odd about organisations: they become homogeneous without anyone deciding they should.",
  pathwaysCaution:
    "The uncomfortable part is the framework's own conclusion. A process that reliably produces good fit also reliably produces sameness — and ASA does not claim that sameness is desirable. Selecting hard on fit is also selecting hard against difference.",
  pathways: [
    {
      title: "Attraction–Selection–Attrition",
      icon: "i-group",
      colour: "var(--teal)",
      blurb: "Three sorting stages, running continuously. Nobody administers the cycle; it is what happens when individuals and organisations each act on their own perceptions of compatibility.",
      steps: [
        "Attraction — people seek out organisations they perceive as compatible",
        "Selection — organisations choose those who appear to fit",
        "Attrition — those who do not fit leave",
        "The organisation becomes more homogeneous",
      ],
    },
  ],

  categoriesLede:
    "Kristof's review separates two things the word “fit” runs together. They are not degrees of the same thing — they pull in opposite directions.",
  categoriesNote:
    "This is where the ASA cost becomes visible. Hiring for <b>supplementary</b> fit adds resemblance; hiring for <b>complementary</b> fit adds what is missing. An organisation that recruits mainly on “culture fit” is choosing the first and calling it the second.",
  categories: [
    {
      title: "Supplementary fit",
      icon: "i-group",
      colour: "var(--teal)",
      definition: "The person and the organisation are <b>similar</b> — shared values, comparable goals, a matching way of doing things. Fit as resemblance.",
      examples: ["shared values", "cultural similarity", "comparable goals", "matching personality"],
    },
    {
      title: "Complementary fit",
      icon: "i-arrowb",
      colour: "var(--red)",
      definition: "The person supplies what the organisation lacks, or the organisation supplies what the person needs. Fit as <b>fitting together</b>, not as being alike.",
      examples: ["needs–supplies", "demands–abilities", "filling a gap", "meeting a need"],
    },
  ],

  modelsLede:
    "Two influential answers to a harder question than it looks: what exactly are you measuring when you measure fit? Use the control to separate three perceptions that survey items routinely merge.",
  modelsNote:
    "Asking someone “do you fit here?” does not tell you which of the three you captured. That matters because they are empirically distinguishable rather than one construct — so a study that measures one and discusses another has changed the subject without saying so.",
  models: [
    {
      year: "1991",
      name: "The Organizational Culture Profile",
      source: "O'Reilly, Chatman & Caldwell · Academy of Management Journal",
      body: "A <b>profile comparison</b> approach: characterise the person's values as a profile, characterise the organisation's the same way, and assess fit as the correspondence between the two.",
      note: "Fit as a computed comparison, not as something the person reports.",
    },
    {
      year: "2002",
      name: "Subjective fit perceptions",
      source: "Cable & DeRue · Journal of Applied Psychology",
      body: "Examines the convergent and discriminant validity of <b>perceived</b> fit, separating three perceptions that had often been treated as interchangeable.",
      note: "Fit as something the person judges — and three different judgements at that.",
    },
  ],

  demo: {
    type: "facets",
    start: 0,
    label: "Three fit perceptions",
    options: ["V", "N", "D"],
    caption: "Cable & DeRue (2002), paraphrased. The three are distinguishable rather than one construct; no magnitude or effect size is shown.",
    facets: [
      { initial: "V", label: "Value congruence", body: "Do my values match this organisation's? The classic P–O fit perception — similarity between what the person holds important and what the organisation does. This is the one people usually mean by “culture fit”." },
      { initial: "N", label: "Needs–supplies fit", body: "Does this place give me what I need? Whether the organisation supplies what the person wants from work — development, autonomy, security, recognition. A complementary judgement, not a similarity one." },
      { initial: "D", label: "Demands–abilities fit", body: "Can I do what is being asked? Whether the person's abilities meet the demands the work makes. Also complementary — and the one most easily confused with simple competence." },
    ],
  },

  fitTargets: [
    { id: "org", icon: "i-building", colour: "var(--teal)", title: "Person–Organisation", question: "Is this person compatible with this employer?", example: "Values, culture, goals and needs — the subject of this page." },
    { id: "job", icon: "i-person", colour: "var(--red)", title: "Person–Job", question: "Do the demands and supplies of this specific role correspond with this person?", example: "The role's requirements against the person's abilities, and the role's rewards against their needs." },
    { id: "group", icon: "i-group", colour: "var(--teal)", title: "Person–Group", question: "How does this person correspond with the immediate work group?", example: "The team they work beside daily, which may differ sharply from the organisation as a whole." },
    { id: "voc", icon: "i-globe", colour: "var(--red)", title: "Person–Vocation", question: "How does this person correspond with the occupation itself?", example: "The career field across employers — a person can fit the profession and not the firm." },
  ],

  trailLede:
    "Seven works across thirty-six years: two founding formulations, a measurement instrument, the integrative review that organised the field, a validity study, a meta-analysis, and a recent reckoning with what is still unresolved.",
  origins: [
    { year: "1987", author: "Benjamin Schneider", work: "The people make the place · Personnel Psychology", contribution: "Introduced the Attraction–Selection–Attrition framework: people are attracted to, selected by, and remain in organisations where they perceive compatibility." },
    { year: "1989", author: "Jennifer A. Chatman", work: "Improving interactional organizational research: A model of person–organization fit · Academy of Management Review", contribution: "One of the central theoretical formulations of P–O fit." },
    { year: "1991", author: "O'Reilly, Chatman &amp; Caldwell", work: "People and organizational culture: A profile comparison approach · Academy of Management Journal", contribution: "Introduced the Organizational Culture Profile, comparing personal and organisational value profiles." },
    { year: "1996", author: "Amy L. Kristof", work: "Person–organization fit: An integrative review of its conceptualizations, measurement, and implications · Personnel Psychology", contribution: "The essential conceptual review. Integrates supplementary and complementary fit, and distinguishes P–O fit from person–job, person–group and person–vocation fit." },
    { year: "2002", author: "Cable &amp; DeRue", work: "The convergent and discriminant validity of subjective fit perceptions · Journal of Applied Psychology", contribution: "Distinguishes P–O value congruence, needs–supplies fit and demands–abilities fit as separable perceptions." },
    { year: "2005", author: "Kristof-Brown, Zimmerman &amp; Johnson", work: "Consequences of individuals' fit at work · Personnel Psychology", contribution: "The key meta-analysis for comparing P–O fit with other forms of workplace fit." },
    { year: "2023", author: "Kristof-Brown, Schneider &amp; Su", work: "Person–organization fit theory and research: Conundrums, conclusions, and calls to action · Personnel Psychology", contribution: "A contemporary assessment of the conceptual and methodological problems that remain in P–O fit research." },
  ],

  oversimplificationsLede:
    "Five conclusions the literature does not support — and the third is the one that turns a research finding into bad hiring practice.",
  oversimplifications: [
    "<b>“Employee–organisation compatibility” is not the theory's name.</b> It is a serviceable gloss, but the formal construct is Person–Organisation fit.",
    "<b>Fit is not the same as similarity.</b> Supplementary and complementary fit make different claims, and only the first is about resemblance.",
    "<b>Good fit is not automatically good.</b> ASA's own logic says a process that maximises fit also produces homogeneity — which the framework does not present as a benefit.",
    "<b>A perception of fit is not objective congruence.</b> What someone reports about fitting in and a computed comparison of value profiles are different measurements that need not agree.",
    "<b>Evidence about P–O fit is not evidence about P–J, P–G or P–V fit.</b> The targets are separable, and the review that separates them is the field's own.",
  ],
  qualifications: [
    "The 2023 assessment is titled around <i>conundrums</i> for a reason: how fit should be conceptualised and measured is not settled, and the field's own senior figures say so.",
    "Much of the evidence is cross-sectional and self-reported, with perceived fit and its supposed outcomes often collected from the same person at the same moment.",
    "Fit is defined as a property of a relationship but is usually measured on one side of it — the person's. The organisation rarely gets asked.",
    "Whether to measure fit as profile similarity, as a direct perception, or as a difference score remains contested, and the choice changes what is found. Difference scores in particular have drawn sustained methodological criticism.",
  ],

  minimumReadingLabel: "If you read four things",
  minimumReading: [
    { citation: "Kristof, A. L. (1996). Person–organization fit: An integrative review of its conceptualizations, measurement, and implications. <i>Personnel Psychology, 49</i>(1), 1–49.", contribution: "The essential conceptual review — start here.", doi: "10.1111/j.1744-6570.1996.tb01790.x" },
    { citation: "Schneider, B. (1987). The people make the place. <i>Personnel Psychology, 40</i>(3), 437–453.", contribution: "Attraction–Selection–Attrition, and why organisations become homogeneous.", doi: "10.1111/j.1744-6570.1987.tb00609.x" },
    { citation: "Cable, D. M., &amp; DeRue, D. S. (2002). The convergent and discriminant validity of subjective fit perceptions. <i>Journal of Applied Psychology, 87</i>(5), 875–884.", contribution: "What you are actually measuring when you measure perceived fit.", doi: "10.1037/0021-9010.87.5.875" },
    { citation: "Kristof-Brown, A. L., Schneider, B., &amp; Su, R. (2023). Person–organization fit theory and research: Conundrums, conclusions, and calls to action. <i>Personnel Psychology.</i>", contribution: "Where the field currently thinks it stands, and what it has not solved.", doi: "10.1111/peps.12581" },
  ],
  fullSources: [
    { citation: "Schneider, B. (1987). The people make the place. <i>Personnel Psychology, 40</i>(3), 437–453.", contribution: "The Attraction–Selection–Attrition framework.", doi: "10.1111/j.1744-6570.1987.tb00609.x" },
    { citation: "Chatman, J. A. (1989). Improving interactional organizational research: A model of person–organization fit. <i>Academy of Management Review, 14</i>(3), 333–349.", contribution: "A central theoretical formulation of P–O fit.", doi: "10.2307/258171" },
    { citation: "O'Reilly, C. A., Chatman, J., &amp; Caldwell, D. F. (1991). People and organizational culture: A profile comparison approach to assessing person–organization fit. <i>Academy of Management Journal, 34</i>(3), 487–516.", contribution: "The Organizational Culture Profile.", doi: "10.2307/256404" },
    { citation: "Kristof, A. L. (1996). Person–organization fit: An integrative review of its conceptualizations, measurement, and implications. <i>Personnel Psychology, 49</i>(1), 1–49.", contribution: "Integrative review; supplementary and complementary fit; the fit targets.", doi: "10.1111/j.1744-6570.1996.tb01790.x" },
    { citation: "Cable, D. M., &amp; DeRue, D. S. (2002). The convergent and discriminant validity of subjective fit perceptions. <i>Journal of Applied Psychology, 87</i>(5), 875–884.", contribution: "Value congruence, needs–supplies and demands–abilities as separable perceptions.", doi: "10.1037/0021-9010.87.5.875" },
    { citation: "Kristof-Brown, A. L., Zimmerman, R. D., &amp; Johnson, E. C. (2005). Consequences of individuals' fit at work. <i>Personnel Psychology, 58</i>(2), 281–342.", contribution: "Meta-analysis across workplace fit targets.", doi: "10.1111/j.1744-6570.2005.00672.x" },
    { citation: "Kristof-Brown, A. L., Schneider, B., &amp; Su, R. (2023). Person–organization fit theory and research: Conundrums, conclusions, and calls to action. <i>Personnel Psychology.</i>", contribution: "Contemporary assessment of unresolved conceptual and methodological problems.", doi: "10.1111/peps.12581" },
  ],

  provenance: [
    { glyph: "●", colour: "var(--red)", label: "Source-grounded", note: "The ASA framework, the supplementary–complementary distinction, the fit targets, the Organizational Culture Profile and the three subjective fit perceptions are drawn from the seven cited works, each attributed to the paper that introduced it." },
    { glyph: "■", colour: "var(--teal)", label: "Plain-language paraphrase", note: "Definitions and the ASA stages are restated in ordinary words rather than quoted. No effect size, correlation or meta-analytic magnitude appears anywhere on this page, because none was supplied." },
    { glyph: "▲", colour: "var(--pen-3)", label: "Teaching analogy", note: "The three-perception control is an explanatory device. It separates constructs; it does not score a person, an organisation or a relationship between them." },
    { glyph: "✦", colour: "var(--pen-3)", label: "Editorial framing", note: "Opening on the naming correction, and the observation that recruiting on “culture fit” selects supplementary fit while describing it as complementary, are ours. The underlying distinction is Kristof's; the application to hiring language is our reading." },
    { glyph: "?", colour: "var(--pen-3)", label: "Contested / unresolved", note: "How fit should be conceptualised and measured remains open, and the 2023 review is explicitly framed around conundrums rather than conclusions." },
  ],
};

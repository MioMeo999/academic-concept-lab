import type { TheoryRecord } from "./types";

export const affectiveEventsTheory: TheoryRecord = {
  id: "affective-events-theory",
  kind: "theory",
  slug: "affective-events-theory",
  title: "Affective Events Theory",
  hook: "Why can the same job feel completely different from one hour to the next?",
  oneSentence: "Affective Events Theory (AET) explains how work features and events become changing affective experiences, attitudes, and behaviour over time.",
  discipline: "ob",
  topics: ["workplace affect", "work events", "job satisfaction", "within-person variation", "organisational behaviour"],
  facts: ["events are proximal", "affect moves", "2 behavioural routes", "1996 → present", "macrostructure ≠ mechanism"],
  order: [
    "idea", "classification", "simpleModel", "modelReveal", "workday", "conceptComparison",
    "pathways", "interactions", "reactionContrast", "evidenceXrays", "scopeMap",
    "trail", "oversimplifications", "qualifications", "sources", "provenance",
  ],
  headings: {
    idea: { toc: "Two truths", title: "Two truths about the same job" },
    classification: { toc: "Feature or event?", title: "Feature or event?" },
    simpleModel: { toc: "The first shortcut", title: "The simple model — and why it is not enough" },
    modelReveal: { toc: "Build the model", title: "Build the AET macrostructure" },
    workday: { toc: "One workday", title: "One workday, many affective moments" },
    conceptComparison: { toc: "Affect ≠ satisfaction", title: "Affect is not job satisfaction" },
    pathways: { toc: "Two routes", title: "Two behavioural routes" },
    interactions: { toc: "Dispositions", title: "People do not enter events as blank slates" },
    reactionContrast: { toc: "Different reactions", title: "The same event does not guarantee the same reaction" },
    evidenceXrays: { toc: "Evidence X-ray", title: "What has actually been tested?" },
    scopeMap: { toc: "Where it stops", title: "A map, not every mechanism" },
    trail: { toc: "The trail", title: "The trail from stable attitudes to moving affect" },
    oversimplifications: { toc: "Don’t conclude", title: "Don’t conclude" },
    qualifications: { toc: "Still open", title: "Still open" },
  },

  ideaLede: "You can <span class=\"hl-t\">like your job</span> and still be furious at 10:43. AET begins with the question that makes those two statements compatible: what happens to affect between the overall judgement and the moment?",
  originsNote: "AET is best taught as an organising macrostructure. Later process work adds detail beneath its arrows; it does not turn the original map into a complete prediction machine.",

  classification: {
    note: "The classification is about the kind of thing described, not about whether a particular person will react positively or negatively.",
    items: [
      { scenario: "High autonomy", answer: "feature", explanation: "A relatively enduring aspect of the work situation. It may shape which events occur and how the job is evaluated, but it is not itself a guaranteed emotional episode." },
      { scenario: "An unexpected criticism arrives", answer: "event", explanation: "A change in what is being experienced. It becomes affectively significant through the person’s interpretation, not simply because criticism happened." },
      { scenario: "A supportive supervisor", answer: "feature", explanation: "A recurring relationship quality in the work environment. Individual encounters with that supervisor can still become separate events." },
      { scenario: "A customer suddenly escalates a complaint", answer: "event", explanation: "A change in the work episode that may interrupt the current affective pattern. The theory does not prescribe one reaction for everyone." },
      { scenario: "Heavy workload", answer: "feature", explanation: "A relatively enduring condition or demand. A particular deadline or interruption within it can be an event." },
      { scenario: "A manager praises a presentation", answer: "event", explanation: "A discrete occurrence that may shift affect. Its meaning and intensity depend on the person and the situation." },
      { scenario: "The meeting is unexpectedly cancelled", answer: "event", explanation: "A change in the current plan. Whether it matters affectively depends on relevance, goals, interpretation, and context." },
      { scenario: "A role gives repeated opportunities to decide how work is done", answer: "feature", explanation: "A pattern in the work environment rather than one moment. It can be assessed directly and can also affect which events become likely." },
    ],
  },

  simpleModel: {
    lede: "The first arrow is useful because it puts the work event back into the story.",
    first: "work event",
    second: "affective reaction",
    note: "But AET is not only an event → emotion story. Work features, attitudes, behaviour, dispositions, and time all belong in the explanation.",
  },

  modelReveal: {
    stages: [
      { label: "Work-environment features", body: "Relatively enduring aspects of the setting, such as autonomy, support, participation, or overload.", colour: "var(--teal)" },
      { label: "Work events", body: "Changes or occurrences that become affectively significant within what the person is currently experiencing.", colour: "var(--red)" },
      { label: "Affective reactions", body: "Changing moods and emotions, including the intensity and direction of an affective episode.", colour: "var(--red)" },
      { label: "Work attitudes", body: "Evaluative judgements such as job satisfaction: related to affect, but not the same construct.", colour: "var(--teal)" },
      { label: "Affect-driven behaviour", body: "A route from current affective experience toward momentary responses and behaviour.", colour: "var(--red)" },
      { label: "Judgement-driven behaviour", body: "A route through an overall evaluation or attitude toward more deliberate choices and behaviour.", colour: "var(--teal)" },
      { label: "Dispositions", body: "Person-level tendencies that can shape baseline affect, salience, interpretation, and response patterns.", colour: "var(--gold-deep)" },
      { label: "Time and cycles", body: "Affect fluctuates through endogenous patterns and exogenous event shocks. Time is part of the theory, not background decoration.", colour: "var(--plum-deep)" },
    ],
    linear: [
      "Features can influence the likelihood of events and can also feed directly into work attitudes through evaluation.",
      "Events can alter the current affective pattern.",
      "Affective reactions can contribute to work attitudes and can also influence behaviour more directly.",
      "Work attitudes can influence behaviour through a judgement-driven route.",
      "Dispositions and time shape the affective experience around these relationships.",
    ],
    topology: {
      edges: [
        { from: 0, to: 1 },
        { from: 0, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 3, to: 5 },
        { from: 6, to: 2, label: "Affective reactions / affective experience" },
      ],
      temporalContext: {
        label: "Time and cycles",
        body: "Affect fluctuates through endogenous patterns and exogenous event shocks.",
        colour: "var(--plum-deep)",
      },
    },
    caption: "Source-grounded relationships are shown as proposed theoretical directions. Arrow presence is not effect magnitude or proof of causation.",
  },

  workday: {
    events: [
      { time: "09:05", label: "Routine begins", detail: "The job is broadly the same. Affect is relatively steady at the start of this constructed day.", tone: "steady" },
      { time: "10:43", label: "Unexpected criticism", detail: "A change interrupts the current episode and may produce a sharp negative reaction.", tone: "negative" },
      { time: "12:15", label: "Supportive exchange", detail: "A different encounter may help the person recover or shift toward a more positive state.", tone: "positive" },
      { time: "15:20", label: "Difficult deadline", detail: "Renewed activation appears around a new demand. The curve is schematic, not a measurement.", tone: "activated" },
    ],
    takeaway: "The job may be broadly the same across the day. The person’s affective experience may not be.",
    caption: "▲ Teaching illustration. The line of the day is a visual prompt for within-person variation, not empirical data or a scale.",
  },

  conceptComparison: {
    lede: "AET keeps four ideas close enough to compare, but separate enough not to collapse into one another.",
    cards: [
      { label: "right now", title: "Current mood / emotion", body: "A momentary affective state or reaction. It can change within a workday and need not equal the person’s overall view of the job.", colour: "var(--red)" },
      { label: "across moments", title: "Accumulated affective experience", body: "A history or representation of affective episodes that can contribute to a broader evaluation. The exact integration process remains open.", colour: "var(--plum-deep)" },
      { label: "about the job", title: "Beliefs and evaluations", body: "What the person thinks the job offers, demands, or means, including comparisons with standards, values, or goals.", colour: "var(--gold-deep)" },
      { label: "overall judgement", title: "Job satisfaction", body: "An evaluative work attitude. It can reflect affective experience and beliefs, but it is not simply a mood score.", colour: "var(--teal)" },
    ],
    note: "The four-part distinction is a faithful teaching separation of constructs discussed across the foundational and empirical sources; it is not a mechanical formula for satisfaction.",
  },

  pathwaysLede: "AET places two routes beside one another: one closer to current affective experience, the other closer to an overall judgement. Real behaviour can draw on both.",
  pathwaysCaution: "These are relative routes of influence, not mutually exclusive boxes. A thoughtful decision can be affectively coloured, and an immediate response can still involve cognition.",
  pathways: [
    {
      title: "Affect-driven route",
      icon: "i-star",
      colour: "var(--red)",
      blurb: "Current affective experience can influence behaviour without first becoming a global attitude toward the job.",
      steps: ["Affective reaction", "Current state colours attention, regulation, or response", "Affect-driven behaviour"],
    },
    {
      title: "Judgement-driven route",
      icon: "i-q",
      colour: "var(--teal)",
      blurb: "Work features and beliefs can contribute to an overall job evaluation, which can then shape more deliberate behaviour.",
      steps: ["Features and beliefs", "Work attitude / job satisfaction", "Judgement-driven behaviour"],
    },
  ],

  interactionsLede: "People do not enter each event as blank slates. AET includes person-level dispositions and established patterns, while leaving the full interpretation process open for later elaboration.",
  interactions: [
    { kicker: "baseline", title: "Affect has a history", body: "Dispositions and established affective cycles can influence the level from which a new event is experienced. They are context, not destiny." },
    { kicker: "salience", title: "Relevance is person-sensitive", body: "What becomes affectively significant depends partly on the person’s concerns, values, goals, and situation. AET does not reduce this to a fixed trait score." },
    { kicker: "pattern", title: "Response is not a blank slate", body: "Individual differences may shape interpretation, intensity, regulation, and recurring response patterns. The theory does not license deterministic predictions from personality alone." },
  ],

  reactionContrast: {
    event: "The same delayed feedback arrives.",
    perspectives: [
      { label: "Person A", reading: "Useful guidance that arrived late.", reaction: "A possible moment of concern followed by constructive engagement." },
      { label: "Person B", reading: "A threat to competence or status.", reaction: "A possible angry or anxious reaction, with attention pulled toward the perceived threat." },
    ],
    takeaway: "The same event does not guarantee the same affective reaction.",
    boundary: "AET places interpretation, dispositions, and affect in the larger map, but does not fully specify why, how, and when one event produces one particular emotion in one particular person.",
  },

  evidenceXrays: [
    {
      title: "Weiss, Nicholas & Daus (1999)",
      label: "empirical study",
      citation: "Organizational Behavior and Human Decision Processes, 78(1), 1–24",
      design: "Diary reports from 24 managerial workers, four times per workday across 16 workdays.",
      testedLabel: "what did it test?",
      tested: "Episodic pleasant mood, job beliefs, job satisfaction, dispositional happiness, affect intensity, and temporal affect patterns.",
      foundLabel: "what did it find?",
      found: "Pleasant mood and job beliefs made independent contributions to overall satisfaction; temporal variation and recurring cycles were observable.",
      notTested: "Specific work events or direct event → affect causation. The study also left the process by which episodes become a global judgement unresolved.",
      doi: "10.1006/obhd.1999.2824",
    },
    {
      title: "Wegge et al. (2006)",
      label: "empirical study",
      citation: "British Journal of Management, 17, 237–254",
      design: "Cross-sectional field study of 2,091 call-centre representatives in 85 UK call centres.",
      testedLabel: "what did it test?",
      tested: "Whether positive emotion, negative emotion, job satisfaction, work features, and selected outcomes were distinguishable and related.",
      foundLabel: "what did it find?",
      found: "Several predicted construct distinctions and relationships were supported, including partial mediation by positive emotions for some feature–satisfaction relationships.",
      notTested: "Within-person event dynamics, specific affective events, direct temporal event → affect causation, or strong causal mediation.",
      doi: "10.1111/j.1467-8551.2006.00489.x",
    },
    {
      title: "Beal et al. (2005)",
      label: "process model",
      citation: "Journal of Applied Psychology, 90(6), 1054–1068",
      design: "Theoretical elaboration of within-person performance episodes rather than a new AET field test.",
      testedLabel: "what did it propose?",
      tested: "An episodic process model linking immediate affect to performance through attention, regulation, and resource allocation.",
      foundLabel: "what did it add?",
      found: "A way to reason about what may happen beneath the broad affect → behaviour relationship during a particular performance episode.",
      notTested: "Complete empirical validation of AET or a universal account of every affective-performance episode.",
      doi: "10.1037/0021-9010.90.6.1054",
    },
  ],

  scopeMap: {
    lede: "AET gives the reader a map of the territory. It does not claim to specify every mechanism under every arrow.",
    map: ["Work conditions matter", "Events matter", "Affect moves within a person", "Attitudes differ from momentary affect", "Behaviour can follow more than one route", "Time and individual differences matter"],
    stops: ["the complete appraisal sequence", "a universal event taxonomy", "every attention or regulation mechanism", "a deterministic prediction from traits", "effect magnitude from a diagram arrow"],
    note: "Later work on appraisal, emotion regulation, attention, event structure, motivation, and context can elaborate the macrostructure. Those elaborations should not be silently presented as though they were all specified by the 1996 model.",
  },

  trailLede: "The trail runs from a 1996 organising framework to diary studies, field tests, process models, and within-person research that treats affective fluctuation as something to explain rather than discard as noise.",
  origins: [
    { year: "1996", author: "Weiss &amp; Cropanzano", work: "Affective Events Theory · Research in Organizational Behavior", contribution: "Introduced the foundational macrostructure linking work features, events, affective reactions, attitudes, behaviour, dispositions, and time." },
    { year: "1999", author: "Weiss, Nicholas &amp; Daus", work: "Affective experiences and job satisfaction · Organizational Behavior and Human Decision Processes", contribution: "Diary evidence separating episodic mood, job beliefs, satisfaction, and affective variation over time." },
    { year: "2005", author: "Weiss &amp; Beal", work: "Reflections on Affective Events Theory · Research on Emotion in Organizations", contribution: "An authorial reflection that helps position AET as an organising framework rather than a complete set of precise process predictions." },
    { year: "2005", author: "Beal, Weiss, Barros &amp; MacDermid", work: "An Episodic Process Model of Affective Influences on Performance · Journal of Applied Psychology", contribution: "A process-level elaboration of how immediate affect may influence within-person performance episodes." },
    { year: "2005", author: "Ashton-James &amp; Ashkanasy", work: "What Lies Beneath? · Research on Emotion in Organizations", contribution: "A process-analysis strand that motivates looking beneath the macrostructure. The page uses it as a clarification anchor, not as a replacement theory." },
    { year: "2006", author: "Wegge et al.", work: "A Test of Basic Assumptions of AET in Call Centre Work · British Journal of Management", contribution: "Large field evidence concerning construct distinction and relationships among work features, affect, satisfaction, and outcomes." },
    { year: "2020", author: "Dalal, Alaybek &amp; Lievens", work: "Within-Person Performance at Short Timeframes · Annual Review of Organizational Psychology and Organizational Behavior", contribution: "Later synthesis connecting AET to within-person performance variability and the need for further structural, process, and timeframe work." },
  ],

  oversimplificationsLede: "Six shortcuts make the theory easier to say and harder to understand.",
  oversimplifications: [
    "AET is not only <b>event → emotion</b>. The macrostructure also includes work features, attitudes, behaviour, dispositions, and time.",
    "A <b>work feature</b> is not the same as a work event. A feature is relatively enduring; an event is a change in what is being experienced.",
    "<b>Job satisfaction is not a mood.</b> It is an evaluative work attitude that can be informed by affective experience and beliefs.",
    "Affect-driven and judgement-driven behaviour are <b>relative routes</b>, not mutually exclusive boxes and not a claim that one route is always stronger.",
    "AET includes dispositions and appraisal-related discussion. The safer boundary is that it does not fully specify the complete event-to-affect micro-process.",
    "The arrows in the macrostructure do not supply <b>effect sizes</b>, and a supportive study of one path is not blanket validation of the whole map.",
  ],

  qualifications: [
    "The foundational macrostructure is an organising framework, not a complete algorithm for predicting a specific person’s emotion from a specific event.",
    "The 1999 diary study supports affect, attitudes, and temporal variation but contains no direct work-event measures.",
    "The 2006 field study supports several distinctions and relationships but is cross-sectional and cannot establish the full temporal causal chain.",
    "Experience-sampling and diary designs are useful because they make within-person fluctuation visible; they also bring recall, burden, sampling, and common-method issues.",
    "Mood and emotion are related but not interchangeable, and their structure and measurement remain active scholarly questions.",
    "Later appraisal, regulation, attention, motivational, and event-structure work should be labelled as elaboration beneath AET’s map, not silently folded into the original theory.",
  ],

  minimumReadingLabel: "If you read five things",
  minimumReading: [
    { citation: "Weiss, H. M., &amp; Cropanzano, R. (1996). Affective Events Theory: A theoretical discussion of the structure, causes and consequences of affective experiences at work. <i>Research in Organizational Behavior, 18</i>, 1–74.", contribution: "The foundational macrostructure and its distinctions." },
    { citation: "Weiss, H. M., Nicholas, J. P., &amp; Daus, C. S. (1999). An examination of the joint effects of affective experiences and job beliefs on job satisfaction and variations in affective experiences over time. <i>Organizational Behavior and Human Decision Processes, 78</i>(1), 1–24.", contribution: "Diary evidence for affect, satisfaction, and temporal variation.", doi: "10.1006/obhd.1999.2824" },
    { citation: "Wegge, J., van Dick, R., Fisher, G. K., West, M. A., &amp; Dawson, J. F. (2006). A test of basic assumptions of Affective Events Theory in call centre work. <i>British Journal of Management, 17</i>, 237–254.", contribution: "A large field test of several basic assumptions.", doi: "10.1111/j.1467-8551.2006.00489.x" },
    { citation: "Beal, D. J., Weiss, H. M., Barros, E., &amp; MacDermid, S. M. (2005). An episodic process model of affective influences on performance. <i>Journal of Applied Psychology, 90</i>(6), 1054–1068.", contribution: "A process-level elaboration for within-person performance episodes.", doi: "10.1037/0021-9010.90.6.1054" },
    { citation: "Dalal, R. S., Alaybek, B., &amp; Lievens, F. (2020). Within-person performance at short timeframes. <i>Annual Review of Organizational Psychology and Organizational Behavior, 7</i>, 421–449.", contribution: "A later synthesis of AET and within-person performance variability.", doi: "10.1146/annurev-orgpsych-012119-045350" },
  ],
  fullSources: [
    { citation: "Weiss, H. M., &amp; Cropanzano, R. (1996). Affective Events Theory: A theoretical discussion of the structure, causes and consequences of affective experiences at work. <i>Research in Organizational Behavior, 18</i>, 1–74.", contribution: "Foundational theory." },
    { citation: "Weiss, H. M., Nicholas, J. P., &amp; Daus, C. S. (1999). An examination of the joint effects of affective experiences and job beliefs on job satisfaction and variations in affective experiences over time. <i>Organizational Behavior and Human Decision Processes, 78</i>(1), 1–24.", contribution: "Diary study of affect, beliefs, satisfaction, and temporal patterns.", doi: "10.1006/obhd.1999.2824" },
    { citation: "Weiss, H. M., &amp; Beal, D. J. (2005). Reflections on Affective Events Theory. In <i>The Effect of Affect in Organizational Settings</i>, 1–21.", contribution: "Authorial reflection and clarification of AET’s organising role.", doi: "10.1016/S1746-9791(05)01101-6" },
    { citation: "Ashton-James, C. E., &amp; Ashkanasy, N. M. (2005). What lies beneath? A process analysis of Affective Events Theory. In <i>The Effect of Affect in Organizational Settings</i>, 23–46.", contribution: "Process-analysis clarification layer.", doi: "10.1016/S1746-9791(05)01102-8" },
    { citation: "Beal, D. J., Weiss, H. M., Barros, E., &amp; MacDermid, S. M. (2005). An episodic process model of affective influences on performance. <i>Journal of Applied Psychology, 90</i>(6), 1054–1068.", contribution: "Within-person performance episode and process elaboration.", doi: "10.1037/0021-9010.90.6.1054" },
    { citation: "Wegge, J., van Dick, R., Fisher, G. K., West, M. A., &amp; Dawson, J. F. (2006). A test of basic assumptions of Affective Events Theory in call centre work. <i>British Journal of Management, 17</i>, 237–254.", contribution: "Large field test of construct distinctions and relationships.", doi: "10.1111/j.1467-8551.2006.00489.x" },
    { citation: "Fisher, C. D. (2002). Real-time affect at work: A neglected phenomenon in organisational behaviour. <i>Australian Journal of Management, 27</i>(1_suppl), 1–10.", contribution: "Experience-sampling logic for momentary affect.", doi: "10.1177/031289620202701S01" },
    { citation: "Miner, A. G., Glomb, T. M., &amp; Hulin, C. L. (2005). Experience sampling mood and its correlates at work. <i>Journal of Occupational and Organizational Psychology</i>.", contribution: "Within- and between-person experience-sampling approach derived from AET propositions.", doi: "10.1348/096317905X40105" },
    { citation: "Dalal, R. S., Alaybek, B., &amp; Lievens, F. (2020). Within-person performance at short timeframes. <i>Annual Review of Organizational Psychology and Organizational Behavior, 7</i>, 421–449.", contribution: "Later synthesis of dynamic affect, performance, structure, process, and timeframe questions.", doi: "10.1146/annurev-orgpsych-012119-045350" },
  ],

  relatedToLede: "AET is a different level of explanation from the neighbouring records below: it asks how work conditions and events are lived as affective experience over time.",
  relatedTo: [
    { recordId: "person-environment-fit", relation: "complements", body: "Person–Environment Fit asks about correspondence between a person and a setting. AET asks how that setting and its events are experienced from one moment to the next." },
    { recordId: "job-demands-resources", relation: "offers a different level of explanation from", body: "Job Demands–Resources Theory organises demands, resources, strain, and motivation. AET adds affective episodes, event shocks, attitudes, and within-person timing." },
    { recordId: "workplace-design", relation: "helps explain affective episodes within", body: "Physical features such as noise, privacy, and density can be part of the work environment. AET supplies a lens for asking when those conditions become affectively significant." },
  ],

  provenance: [
    { glyph: "●", colour: "var(--red)", label: "Source-grounded theory", note: "The macrostructure, construct distinctions, temporal logic, dispositions, and two behavioural routes are grounded in Weiss & Cropanzano (1996) and the cited AET literature." },
    { glyph: "■", colour: "var(--teal)", label: "Faithful explanation", note: "Plain-language explanations preserve the distinction between work features, work events, affective reactions, attitudes, beliefs, and behaviour without treating the arrows as effect sizes." },
    { glyph: "▲", colour: "var(--red)", label: "Teaching construction", note: "The opening statements, classification examples, workday, and same-event comparison are constructed illustrations. They are not reported cases or study data." },
    { glyph: "✦", colour: "var(--pen-3)", label: "Concept Lab synthesis", note: "The progressive reveal, the four-part affect/satisfaction comparison, and the organisation of later process work are editorial teaching frames built from the cited sources." },
    { glyph: "?", colour: "var(--pen-3)", label: "Open boundary", note: "The complete event-to-affect micro-process, precise appraisal sequence, event taxonomy, individual moderators, and causal strength of the full map remain under-specified or require further evidence." },
  ],
};

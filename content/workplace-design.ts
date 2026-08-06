import type { TheoryRecord } from "./types";

/* ---------------------------------------------------------------------------
   "Workplace design" names two different literatures, and readers arrive at it
   meaning either. So the record's first block is a disambiguation: what this
   page covers, what it does not, and where to go for the other — with the job
   design originals listed there rather than quietly dropped.
   ------------------------------------------------------------------------- */
export const workplaceDesign: TheoryRecord = {
  id: "workplace-design",
  kind: "theory",
  slug: "workplace-design",
  title: "Workplace Design: The Physical Environment",
  hook: "Two literatures answer to the same name. Only one of them is about the room you are sitting in.",
  oneSentence:
    "Physical workplace design concerns how the built environment of work — layout, noise, privacy, light, density, temperature — shapes what employees experience, how satisfied they are, and how well they can do the work.",
  discipline: "ob",
  statusChip: "Commonly confused",
  topics: ["office design", "open plan", "privacy", "noise", "acoustics", "workspace stress", "environmental psychology", "physical environment"],
  facts: ["physical, not job design", "1979 → 2013", "the privacy trade-off", "7 sources"],

  /* Disambiguate first, then define, then the elements, the mechanism, and the
     trade-off the literature is actually arguing about. */
  order: [
    "disambiguation", "idea", "expansions", "pathways", "interactions",
    "trail", "oversimplifications", "qualifications", "sources", "provenance",
  ],
  demoIn: "interactions",

  headings: {
    disambiguation: { toc: "Two things, one name", title: "Two literatures answer to “workplace design”" },
    idea: { toc: "The idea", title: "The room is a work condition" },
    expansions: { toc: "The elements", title: "What counts as the physical environment" },
    pathways: { toc: "The mechanism", title: "How a room becomes a performance problem" },
    interactions: { toc: "The trade-off", title: "The trade-off the open plan cannot escape" },
  },

  disambiguation: {
    flag: "<b>Physical workplace design</b> and <b>work (job) design</b> are different objects with overlapping names. A finding about one is not evidence about the other, and conflating them is the most common error in this area. This page is about the first.",
    covered: {
      title: "This page: the physical environment",
      blurb: "The built setting the work happens in — what the room does to the person in it.",
      items: ["layout", "noise", "privacy", "lighting", "density", "acoustics", "furniture", "temperature", "spatial configuration"],
    },
    notCovered: {
      title: "Not this page: work or job design",
      blurb: "How tasks and roles are structured — what the job asks of the person doing it. A separate literature with its own foundational papers.",
      items: ["autonomy", "feedback", "skill variety", "task significance", "complexity", "interdependence"],
      sources: [
        { citation: "Hackman, J. R., &amp; Oldham, G. R. (1976). Motivation through the design of work: Test of a theory. <i>Organizational Behavior and Human Performance, 16</i>(2), 250–279.", contribution: "The job characteristics model — the originating work-design paper.", doi: "10.1016/0030-5073(76)90016-7" },
        { citation: "Morgeson, F. P., &amp; Humphrey, S. E. (2006). The Work Design Questionnaire. <i>Journal of Applied Psychology, 91</i>(6), 1321–1339.", contribution: "A comprehensive measure of job design and the nature of work.", doi: "10.1037/0021-9010.91.6.1321" },
      ],
    },
    note: "The two do meet in practice — an open-plan room can undercut the autonomy a job nominally grants — but they meet as <i>separate</i> causes. Keep the evidence bases apart before you combine them.",
  },

  ideaLede:
    "Most organisational research treats the workplace as a social and task environment and stops there. This literature takes the <span class=\"hl-t\">building</span> seriously: the desk, the distance to the next person, the sound reaching your ear are conditions of work in the same sense a deadline is.",
  originsNote:
    "The field sits between management research and environmental psychology. Its foundational papers appeared in management journals — Administrative Science Quarterly, the Academy of Management Journal and Review — while its methods and concepts come substantially from the psychology of the built environment.",

  expansionsLede:
    "The environment is not one variable. These are the dimensions the literature measures, and they do not move together — a room can be quiet and cramped, or spacious and unbearable.",
  expansions: [
    { title: "Layout and configuration", icon: "i-building", colour: "var(--teal)", body: "Open plan, cellular, or something between; who sits near whom; what is visible from where. The variable Oldham and Brass could study because a real organisation changed it." },
    { title: "Noise and acoustics", icon: "i-head", colour: "var(--red)", body: "Not just loudness but intelligibility: overheard speech is more disruptive than steady sound, which is why an open room can be quiet by the meter and impossible to think in." },
    { title: "Privacy", icon: "i-eye", colour: "var(--red)", body: "Visual and acoustic — being unseen and being unheard are separate goods. Sundstrom, Burt and Kamp connected architectural privacy to both satisfaction and performance." },
    { title: "Density and crowding", icon: "i-group", colour: "var(--teal)", body: "People per square metre, and the felt experience of it. Density is a measurement; crowding is what it does to the person." },
    { title: "Light and temperature", icon: "i-star", colour: "var(--teal)", body: "Ambient conditions that are rarely anyone's job to manage, and which employees generally cannot change for themselves." },
    { title: "Furniture and workstation", icon: "i-person", colour: "var(--red)", body: "The immediate physical support for the body doing the work — the scale at which ergonomics and organisational research meet." },
  ],

  pathwaysLede:
    "Vischer's contribution is an explicit mechanism rather than another correlation. It explains <i>why</i> a poor environment should matter, in a currency organisations already understand: effort.",
  pathwaysCaution:
    "This is a proposed mechanism, not a measured pathway. The model organises the evidence; it is not itself a finding about how much stress a given room produces.",
  pathways: [
    {
      title: "The workspace-stress mechanism",
      icon: "i-warn",
      colour: "var(--red)",
      blurb: "An environment that fails to support the task does not stop the work happening — it makes the work cost more. That additional effort, spent on coping with the room rather than on the job, is workspace stress.",
      steps: ["Environment poorly supports the task", "More effort needed for the same work", "Workspace stress", "Performance and wellbeing affected"],
    },
  ],

  interactionsLede:
    "Open-plan offices are justified by communication and paid for in privacy. The question the literature actually asks is not which is better, but whether the gain covers the cost. Move the control below.",
  interactions: [
    {
      kicker: "the case for opening the plan",
      title: "Communication and awareness",
      body: "Open layouts are adopted for good reasons: easier communication, visibility of colleagues, incidental awareness of what others are doing — plus space efficiency, which is rarely the stated reason and often the real one.",
    },
    {
      kicker: "the bill that arrives with it",
      title: "Noise, distraction, lost privacy",
      body: "The same absence of barriers that carries conversation also carries interruption. Privacy is lost in both senses at once: you can be seen, and you can be overheard.",
    },
    {
      kicker: "Kim & de Dear (2013)",
      title: "The gain may not cover the cost",
      body: "Their key contribution is to test the trade-off rather than assume it balances: <b>increased communication opportunities may not compensate</b> for the noise, distraction and reduced privacy that come with them. The benefit is real; the accounting is what fails.",
    },
  ],

  demo: {
    type: "dual-path",
    start: 0,
    label: "Degree of enclosure",
    options: ["enclosed", "mixed", "fully open"],
    caption: "Teaching analogy — the two lines show direction of relationship only. No magnitude is shown, and nothing here is calculated.",
    roads: [
      { label: "communication opportunity", sub: "contact · visibility · awareness", colour: "var(--teal)", icon: "i-group" },
      { label: "privacy and quiet", sub: "unseen · unheard · uninterrupted", colour: "var(--red)", icon: "i-eye" },
    ],
    states: [
      { a: 0.2, b: 0.92, t: "Enclosed offices: privacy and quiet are high, and contact with colleagues is something you have to go and arrange. The cost here is isolation, not distraction." },
      { a: 0.55, b: 0.55, t: "A mixed layout trades some of each. Most real offices sit somewhere along here, and the interesting question becomes which tasks each zone is actually for." },
      { a: 0.9, b: 0.18, t: "Fully open: contact and awareness are maximal, privacy and quiet minimal. The 2013 finding is that the first does not automatically pay for the second." },
    ],
  },

  trailLede:
    "Seven works across thirty-four years — from a naturally occurring office move nobody could have staged, to a systematic review, to a direct test of the trade-off.",
  origins: [
    { year: "1979", author: "Oldham &amp; Brass", work: "Employee reactions to an open-plan office · Administrative Science Quarterly", contribution: "One of the earliest influential field studies showing that changes to office layout can influence employees' perceptions, satisfaction, motivation and social experiences. A naturally occurring quasi-experiment — the organisation moved, and the researchers were there." },
    { year: "1980", author: "Sundstrom, Burt &amp; Kamp", work: "Privacy at work: Architectural correlates of job satisfaction and job performance · Academy of Management Journal", contribution: "A foundational study connecting architectural privacy to satisfaction and to performance." },
    { year: "1984", author: "Davis", work: "The influence of the physical environment in offices · Academy of Management Review", contribution: "The best single conceptual paper for an introduction to physical workplace design — it organises the area rather than adding another correlation to it." },
    { year: "1986", author: "Sundstrom", work: "Work places: The psychology of the physical environment in offices and factories · Cambridge University Press", contribution: "A major book-length treatment of environmental psychology in organisational settings." },
    { year: "2005", author: "De Croon, Sluiter, Kuijer &amp; Frings-Dresen", work: "The effect of office concepts on worker health and performance: A systematic review · Ergonomics", contribution: "A widely used systematic review of office concepts and worker outcomes." },
    { year: "2007", author: "Vischer", work: "The effects of the physical environment on job performance: Towards a theoretical model of workspace stress · Stress and Health", contribution: "Supplies an explicit theoretical mechanism: poorly supportive environments create workspace stress and increase the effort required to perform work." },
    { year: "2013", author: "Kim &amp; de Dear", work: "Workspace satisfaction: The privacy–communication trade-off in open-plan offices · Journal of Environmental Psychology", contribution: "Explains why increased communication opportunities in open offices may not compensate for noise, distraction and reduced privacy." },
  ],

  oversimplificationsLede:
    "Five conclusions this literature does not support — and the first two are the ones that get quoted in office-redesign decks.",
  oversimplifications: [
    "<b>Open-plan is not simply bad</b>, and it is not simply good. The trade-off is the finding; the verdict depends on what the work needs.",
    "<b>Communication gains do not automatically offset privacy costs.</b> That is the specific claim of the 2013 paper, and it is a claim about compensation, not about whether communication improves.",
    "<b>Physical workplace design is not job design.</b> A study of autonomy is not evidence about acoustics, however similar the two names sound.",
    "<b>Satisfaction and performance are different outcomes</b> and do not always move together. A room people like is not automatically a room they work well in.",
    "<b>An “office concept” is not one thing.</b> Studies apply the same label to rooms that differ enormously, which limits what any review can pool.",
  ],
  qualifications: [
    "Real offices resist experimental control, which is exactly why the 1979 naturally occurring change was valuable — and why studies of that quality are rare.",
    "Much of the evidence is cross-sectional and self-reported, so satisfaction is measured far more reliably than performance is.",
    "The offices of 1979, 1986, 2005 and 2013 are not the same object. Technology, density norms and expectations about where work happens have all moved, and older findings may not transfer intact.",
    "Because “office concept” is defined so variably across studies, systematic reviews in this area are pooling less comparable material than the method usually assumes.",
  ],

  minimumReadingLabel: "If you read four things",
  minimumReading: [
    { citation: "Davis, T. R. V. (1984). The influence of the physical environment in offices. <i>Academy of Management Review, 9</i>(2), 271–283.", contribution: "The conceptual starting point — read this first.", doi: "10.5465/AMR.1984.4277654" },
    { citation: "Vischer, J. C. (2007). The effects of the physical environment on job performance: Towards a theoretical model of workspace stress. <i>Stress and Health, 23</i>(3), 175–184.", contribution: "The mechanism: unsupportive environments raise the effort work costs." },
    { citation: "Kim, J., &amp; de Dear, R. (2013). Workspace satisfaction: The privacy–communication trade-off in open-plan offices. <i>Journal of Environmental Psychology, 36</i>, 18–26.", contribution: "The trade-off tested rather than assumed.", doi: "10.1016/j.jenvp.2013.06.007" },
    { citation: "De Croon, E. M., Sluiter, J. K., Kuijer, P. P. F. M., &amp; Frings-Dresen, M. H. W. (2005). The effect of office concepts on worker health and performance: A systematic review. <i>Ergonomics, 48</i>(2), 119–134.", contribution: "What the accumulated evidence does and does not establish.", doi: "10.1080/00140130512331319409" },
  ],
  fullSources: [
    { citation: "Oldham, G. R., &amp; Brass, D. J. (1979). Employee reactions to an open-plan office: A naturally occurring quasi-experiment. <i>Administrative Science Quarterly, 24</i>(2), 267–284.", contribution: "Early field evidence that layout changes affect perceptions, satisfaction and motivation." },
    { citation: "Sundstrom, E., Burt, R. E., &amp; Kamp, D. (1980). Privacy at work: Architectural correlates of job satisfaction and job performance. <i>Academy of Management Journal, 23</i>(1), 101–117.", contribution: "Architectural privacy linked to satisfaction and performance.", doi: "10.2307/255498" },
    { citation: "Davis, T. R. V. (1984). The influence of the physical environment in offices. <i>Academy of Management Review, 9</i>(2), 271–283.", contribution: "Foundational conceptual treatment.", doi: "10.5465/AMR.1984.4277654" },
    { citation: "Sundstrom, E. (1986). <i>Work places: The psychology of the physical environment in offices and factories.</i> Cambridge University Press.", contribution: "Book-length treatment of environmental psychology at work." },
    { citation: "De Croon, E. M., Sluiter, J. K., Kuijer, P. P. F. M., &amp; Frings-Dresen, M. H. W. (2005). The effect of office concepts on worker health and performance: A systematic review of the literature. <i>Ergonomics, 48</i>(2), 119–134.", contribution: "Systematic review of office concepts and worker outcomes.", doi: "10.1080/00140130512331319409" },
    { citation: "Vischer, J. C. (2007). The effects of the physical environment on job performance: Towards a theoretical model of workspace stress. <i>Stress and Health, 23</i>(3), 175–184.", contribution: "Workspace-stress mechanism." },
    { citation: "Kim, J., &amp; de Dear, R. (2013). Workspace satisfaction: The privacy–communication trade-off in open-plan offices. <i>Journal of Environmental Psychology, 36</i>, 18–26.", contribution: "Direct treatment of the open-plan trade-off.", doi: "10.1016/j.jenvp.2013.06.007" },
  ],

  provenance: [
    { glyph: "●", colour: "var(--red)", label: "Source-grounded", note: "Dates, journals, study designs and each work's contribution are drawn from the seven cited works, plus the two job-design originals listed in the disambiguation. Each claim is attributed to the work that made it." },
    { glyph: "■", colour: "var(--teal)", label: "Plain-language paraphrase", note: "The workspace-stress mechanism and the privacy–communication trade-off are restated in ordinary words. The elements of the environment are the dimensions this literature commonly measures, not findings from any single study." },
    { glyph: "▲", colour: "var(--pen-3)", label: "Teaching analogy", note: "The enclosure control shows direction of relationship only. No magnitude, effect size or optimum is shown, and none is implied — the position of any real office on it is not something this page can tell you." },
    { glyph: "✦", colour: "var(--pen-3)", label: "Editorial framing", note: "Opening with the physical-versus-job-design disambiguation is our choice, as is the observation that space efficiency is often the unstated reason for open plan. Both organise the area rather than reporting a cited finding." },
    { glyph: "?", colour: "var(--pen-3)", label: "Contested / unresolved", note: "Whether open-plan layouts help or harm on balance remains unsettled, and the heterogeneity of “office concept” across studies limits how far any review can settle it." },
  ],
};

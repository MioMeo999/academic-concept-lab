import type { TheoryRecord } from "./types";

export const personEnvironmentFit: TheoryRecord = {
  id:"person-environment-fit", kind:"theory", slug:"person-environment-fit",
  title:"Person–Environment Fit",
  hook:"Why can the same workplace energise one person and drain another?",
  oneSentence:"Person–Environment Fit concerns the degree and form of correspondence between characteristics of a person and characteristics of an environment.",
  discipline:"ob",
  topics:["fit","correspondence","work adjustment","vocational psychology"],
  facts:["2 forms of correspondence","4 fit targets","1909 → 2008","no founding paper"],
  ideaLede:"Person–Environment Fit concerns the <span class=\"hl-t\">degree and form of correspondence</span> between characteristics of a person and characteristics of an environment.",
  trailLede:"Seven markers across 99 years — and <span class=\"hl\">no single starting point</span>.",
  oversimplificationsLede:"Four shortcuts the framework does not justify. These are the ones a reader reaches for on their own.",
  minimumReadingLabel:"If you read three things",
  demo:{ type:"scale-pair", start:1, centre:"fit", label:"Correspondence state",
    options:["under-supplied","correspondence","over-supplied"],
    caption:"the doorway doesn’t change. the fit does." },
  originsNote:"There is no single universally accepted founding paper. The framework developed through vocational psychology, field theory, occupational stress and work-adjustment research.",
  origins:[
    { year:"1909", author:"Frank Parsons", work:"Choosing a Vocation", contribution:"A systematic case for understanding people, occupations, and the relationship between them." },
    { year:"1936", author:"Kurt Lewin", work:"Principles of Topological Psychology", contribution:"The broad interactionist foundation: behaviour is a function of person and environment — B = f(P,E)." },
    { year:"1982", author:"French, Caplan &amp; Harrison", work:"The Mechanisms of Job Stress and Strain", contribution:"Distinguished demands–abilities fit from needs–supplies fit." },
    { year:"1984", author:"Dawis &amp; Lofquist", work:"A Psychological Theory of Work Adjustment", contribution:"Linked abilities and requirements, needs and reinforcers, satisfaction and satisfactoriness." },
    { year:"1991", author:"Jeffrey R. Edwards", work:"Person–Job Fit", contribution:"A major conceptual, literature, and measurement treatment of person–job fit." },
    { year:"2005", author:"Kristof-Brown, Zimmerman &amp; Johnson", work:"Consequences of Individuals’ Fit at Work", contribution:"Meta-analysed person–job, organisation, group, and supervisor fit." },
    { year:"2008", author:"Jeffrey R. Edwards", work:"P–E Fit in Organizations", contribution:"Assessed theoretical progress and sharpened the framework’s open questions." }
  ],
  coreProcesses:[
    { id:"da", title:"Demands ↔ abilities", person:"What the person can do", environment:"What the setting asks", explanation:"Correspondence concerns abilities on the person side and demands or requirements on the environment side." },
    { id:"ns", title:"Needs ↔ supplies", person:"What the person needs", environment:"What the setting supplies", explanation:"Correspondence concerns needs, goals, or preferences and the resources or reinforcers available in the environment." }
  ],
  fitTargets:[
    { id:"job", icon:"i-person", colour:"var(--red)", title:"Job", question:"Do the role’s demands and supplies correspond with this person?", example:"A complex analysis role asks for — and uses — the analyst’s pattern-finding ability." },
    { id:"organisation", icon:"i-building", colour:"var(--teal)", title:"Organisation", question:"How does the person correspond with the wider organisation?", example:"A person seeking autonomy enters an organisation that delegates real decision authority." },
    { id:"group", icon:"i-group", colour:"var(--red)", title:"Group", question:"How does the person correspond with the immediate work group?", example:"A reflective newcomer joins a team that makes room for preparation before discussion." },
    { id:"supervisor", icon:"i-super", colour:"var(--teal)", title:"Supervisor", question:"How does the person correspond with the supervisor relationship?", example:"An employee needing frequent feedback works with a supervisor who provides clear, timely guidance." }
  ],
  workAdjustment:"Work-adjustment research treats correspondence as a continuing relationship: employees bring abilities and needs; work environments bring requirements and reinforcers. Satisfaction and satisfactoriness are related but distinct viewpoints.",
  oversimplifications:[
    "Fit is <b>not a fixed virtue</b> possessed by either the person or the workplace alone.",
    "<b>More of an attribute is not automatically better</b>; correspondence depends on what is being compared.",
    "Different fit targets are <b>not interchangeable</b>, and a good match with one does not guarantee a good match with another.",
    "A visual balance is a <b>teaching analogy</b>, not a validated score or prediction of an outcome."
  ],
  qualifications:[
    "The framework includes multiple traditions rather than one uncontested origin story.",
    "The sources here establish core distinctions and fit targets; they do not justify every later classification used in the broader literature.",
    "Claims about consequences depend on construct definitions, measurement, context, and study design."
  ],
  minimumReading:[
    { citation:"Edwards, J. R. (1991). <i>Person–Job Fit.</i>", contribution:"Conceptual integration and methodological critique." },
    { citation:"Kristof-Brown, Zimmerman, &amp; Johnson (2005).", contribution:"Meta-analysis across four workplace fit targets.", doi:"10.1111/j.1744-6570.2005.00672.x" },
    { citation:"Edwards, J. R. (2008). <i>Person–Environment Fit in Organizations.</i>", contribution:"Assessment of theoretical progress.", doi:"10.5465/19416520802211503" }
  ],
  fullSources:[
    { citation:"Parsons, F. (1909). <i>Choosing a Vocation.</i>", contribution:"Vocational matching." },
    { citation:"Lewin, K. (1936). <i>Principles of Topological Psychology.</i>", contribution:"Interactionist foundation." },
    { citation:"French, Caplan, &amp; Harrison (1982). <i>The Mechanisms of Job Stress and Strain.</i>", contribution:"Demands–abilities and needs–supplies." },
    { citation:"Dawis &amp; Lofquist (1984). <i>A Psychological Theory of Work Adjustment.</i>", contribution:"Work-adjustment correspondence." },
    { citation:"Edwards (1991). <i>Person–Job Fit.</i>", contribution:"Conceptual and methodological treatment." },
    { citation:"Kristof-Brown, Zimmerman, &amp; Johnson (2005).", contribution:"Meta-analysis of fit at work.", doi:"10.1111/j.1744-6570.2005.00672.x" },
    { citation:"Edwards (2008). <i>Person–Environment Fit in Organizations.</i>", contribution:"Theoretical review.", doi:"10.5465/19416520802211503" }
  ],
  provenance:[
    { glyph:"●", colour:"var(--red)", label:"Source-grounded", note:"Dates, distinctions, titles, and fit targets are drawn from the cited literature supplied in the brief." },
    { glyph:"■", colour:"var(--teal)", label:"Plain-language paraphrase", note:"Explanations compress technical distinctions without presenting them as quotations." },
    { glyph:"▲", colour:"var(--pen-3)", label:"Teaching analogy", note:"Calibration, balance, and landscape visuals explain correspondence but do not calculate outcomes." },
    { glyph:"?", colour:"var(--pen-3)", label:"Contested / unresolved", note:"No single universally accepted founding paper is claimed." }
  ]
};

export const jobDemandsResources: TheoryRecord = {
  id:"job-demands-resources", kind:"theory", slug:"job-demands-resources",
  title:"Job Demands–Resources Theory",
  hook:"What in a job burns people out — and what in the same job protects them?",
  oneSentence:"Job Demands–Resources theory holds that whatever the occupation, working conditions sort into job demands and job resources, and that these set off two different processes — one that drains health, one that builds motivation.",
  discipline:"ob",
  topics:["burnout","work engagement","job design","demands","resources","job crafting","challenge and hindrance"],
  facts:["2 categories","2 processes","2001 → 2023","challenge ≠ hindrance"],
  ideaLede:"Every job is different. JD–R’s claim is that the <span class=\"hl-t\">categories</span> are not — sort any job’s conditions into demands and resources, and two well-described processes follow.",
  trailLede:"Five markers in twenty-two years, and an unusually clear arc: a model of burnout that kept widening until it became a general theory of working conditions.",
  oversimplificationsLede:"Five shortcuts the theory does not license — and the first two are the ones people reach for immediately.",
  minimumReadingLabel:"If you read four things",
  originsNote:"JD–R began in 2001 as a model of burnout and was progressively widened into a general theory. Its defining move is that it does <i>not</i> fix which demands or resources matter: the two categories are meant to be filled in per occupation, which is what let it travel far beyond the jobs it was first built on.",

  demo:{ type:"dual-path", start:0, label:"Resource level, demands held high",
    options:["resources scarce","resources adequate","resources rich"],
    caption:"Teaching analogy — JD–R describes directions of relationship. The line weights are not magnitudes, and nothing here is calculated." },

  categoriesLede:"The classification is functional, not a fixed list. Something counts as a demand or a resource by what it <i>does</i> in that job.",
  categoriesNote:"The same feature can switch sides. Close supervision is a resource to a novice and a demand to an expert — so the sorting has to be done per occupation, not inherited from another study.",
  categories:[
    { title:"Job demands", icon:"i-warn", colour:"var(--red)",
      definition:"Physical, psychological, social or organisational aspects of the job that require sustained physical or mental effort, and therefore carry physiological or psychological costs.",
      examples:["workload","time pressure","emotional demands","role ambiguity","poor physical environment"] },
    { title:"Job resources", icon:"i-star", colour:"var(--teal)",
      definition:"Aspects of the job that help achieve work goals, reduce demands and their associated costs, or stimulate personal growth, learning and development.",
      examples:["autonomy","performance feedback","social support","supervisory coaching","development opportunities"] }
  ],

  pathwaysLede:"The two processes run in parallel. They are not two ends of one scale — the same person can be both exhausted and engaged.",
  pathwaysCaution:"Because the routes are separate, removing demands does not by itself produce engagement, and adding resources does not by itself cure exhaustion. Each road has to be worked on in its own terms.",
  pathways:[
    { title:"The health-impairment process", icon:"i-warn", colour:"var(--red)",
      blurb:"Chronic job demands exhaust the employee’s mental and physical resources. Sustained effort has a cost, and where there is no recovery the cost accumulates.",
      steps:["High job demands","Sustained effort, incomplete recovery","Exhaustion / burnout","Health complaints"] },
    { title:"The motivational process", icon:"i-star", colour:"var(--teal)",
      blurb:"Job resources are motivating in two ways at once — intrinsically, because they support growth and learning, and extrinsically, because they help get the work done.",
      steps:["Job resources","Intrinsic and extrinsic motivation","Work engagement","Commitment and performance"] }
  ],

  demandTypesLede:"The 2010 extension split the demands category in two, and it changed what the theory recommends. Both kinds are demanding; only one of them is worth reducing.",
  demandTypesNote:"“Reduce job demands” is bad advice if the demand is a challenge. Strip out the stretching parts of a role and you remove the engagement along with the strain.",
  demandTypes:[
    { title:"Challenge demands", colour:"var(--teal)",
      definition:"Demanding, but with the potential for mastery, learning and future gain. They cost effort and offer something back for it.",
      examples:["workload","time pressure","high responsibility","job complexity"],
      relates:"engagement <i>and</i> strain — they push in both directions at once." },
    { title:"Hindrance demands", colour:"var(--red)",
      definition:"Obstacles that get in the way of goals and effort without offering anything in return. They cost effort and give nothing back.",
      examples:["role ambiguity","role conflict","red tape","organisational hassles"],
      relates:"burnout, and negatively to engagement — cost with no upside." }
  ],

  interactionsLede:"The two categories do not only act separately. Each changes what the other does — which is where most of the practical advice in JD–R actually comes from.",
  interactions:[
    { kicker:"resources → weaken the strain link", title:"The buffering hypothesis",
      body:"Job resources weaken the relationship between demands and strain. The demands are unchanged; what changes is how much they cost. Autonomy, support and feedback make a heavy job less damaging without making it lighter." },
    { kicker:"demands → strengthen the motivation link", title:"The boosting hypothesis",
      body:"Job resources matter <i>most</i> when demands are high. In an undemanding job, resources have little to act on; in a hard one, they become the difference between engagement and exhaustion. The demands are what make the resources count." }
  ],

  expansionsLede:"By the 2023 review, the model had grown a set of moving parts the 2001 version did not have — mostly by taking seriously that employees are not passive recipients of their working conditions.",
  expansions:[
    { title:"Personal resources", icon:"i-person", colour:"var(--teal)",
      body:"Self-efficacy, optimism and resilience operate alongside job resources, with broadly similar effects — the person brings resources too, not just the job." },
    { title:"Job crafting", icon:"i-arrowb", colour:"var(--red)",
      body:"Employees actively change their own demands and resources: seeking more of what helps, reducing hindrances, taking on challenges. The arrows run backwards as well as forwards." },
    { title:"Self-regulation", icon:"i-check", colour:"var(--teal)",
      body:"How people manage their own effort, attention and recovery becomes part of the model rather than something outside it." },
    { title:"Multilevel processes", icon:"i-group", colour:"var(--teal)",
      body:"Demands and resources exist at individual, team and organisational levels, and processes at one level shape the others." },
    { title:"Daily fluctuations", icon:"i-flask", colour:"var(--red)",
      body:"Demands and resources shift day to day and within days. Much of the action is short-term variation inside one job, not stable differences between jobs." }
  ],

  origins:[
    { year:"2001", author:"Demerouti, Bakker, Nachreiner &amp; Schaufeli", work:"The Job Demands–Resources model of burnout · Journal of Applied Psychology", contribution:"The original core paper. Proposed that working conditions can be broadly classified as job demands or job resources, and described two processes: a health-impairment process associated with demands, and a motivational process associated with resources." },
    { year:"2007", author:"Bakker &amp; Demerouti", work:"The Job Demands–Resources model: State of the art · Journal of Managerial Psychology", contribution:"Established JD–R as a flexible general model rather than one concerned only with burnout." },
    { year:"2010", author:"Crawford, LePine &amp; Rich", work:"Linking job demands and resources to employee engagement and burnout · Journal of Applied Psychology", contribution:"A theoretical extension and meta-analytic test. Particularly valuable because it distinguishes challenge demands from hindrance demands." },
    { year:"2014", author:"Bakker, Demerouti &amp; Sanz-Vergel", work:"Burnout and work engagement: The JD–R approach · Annual Review of Organizational Psychology and Organizational Behavior", contribution:"An especially useful review for explaining the parallel pathways to burnout and to work engagement." },
    { year:"2023", author:"Bakker &amp; Demerouti", work:"Job Demands–Resources Theory: Ten years later · Annual Review of Organizational Psychology and Organizational Behavior", contribution:"The strongest recent overview of the expanded theory, including personal resources, job crafting, self-regulation, multilevel processes and daily fluctuations." }
  ],

  oversimplifications:[
    "Demands are <b>not simply bad</b>. Challenge demands relate to engagement as well as strain — the type of demand decides the advice.",
    "Resources are <b>not a fixed list</b>. What functions as a resource depends on the job and on which demand it is meeting.",
    "JD–R is <b>not only a theory of burnout</b>. The motivational route is a full half of the model, not a footnote to it.",
    "Burnout and engagement are <b>not opposite ends of one scale</b>. They are separate outcomes of separate processes, and can occur together.",
    "The model describes <b>relationships among working conditions</b> — it is not a formula that predicts a particular person’s outcome."
  ],
  qualifications:[
    "The classification is functional rather than fixed, so evidence for any specific demand or resource has to come from studies in that kind of work — it does not transfer automatically between occupations.",
    "Much of the supporting evidence rests on self-report and on cross-sectional designs, while the theory is routinely stated in causal language. The wording often runs ahead of the designs used to test it.",
    "The same flexibility that lets JD–R apply to any job has drawn the criticism that it is difficult to falsify: with the categories defined by function, almost any finding can be accommodated after the fact.",
    "The later additions — personal resources, crafting, daily variation — widen the theory considerably, and how far the original two-process evidence carries over to the expanded version is a live question."
  ],

  minimumReading:[
    { citation:"Demerouti, E., Bakker, A. B., Nachreiner, F., &amp; Schaufeli, W. B. (2001). The Job Demands–Resources model of burnout. <i>Journal of Applied Psychology, 86</i>(3), 499–512.", contribution:"The original source — the two categories and the two processes.", doi:"10.1037/0021-9010.86.3.499" },
    { citation:"Bakker, A. B., &amp; Demerouti, E. (2007). The Job Demands–Resources model: State of the art. <i>Journal of Managerial Psychology, 22</i>(3), 309–328.", contribution:"The basic expanded model — JD–R as a general framework.", doi:"10.1108/02683940710733115" },
    { citation:"Bakker, A. B., Demerouti, E., &amp; Sanz-Vergel, A. I. (2014). Burnout and work engagement: The JD–R approach. <i>Annual Review of Organizational Psychology and Organizational Behavior, 1</i>, 389–411.", contribution:"Burnout and engagement — the clearest account of the parallel pathways.", doi:"10.1146/annurev-orgpsych-031413-091235" },
    { citation:"Bakker, A. B., &amp; Demerouti, E. (2023). Job Demands–Resources Theory: Ten years later. <i>Annual Review of Organizational Psychology and Organizational Behavior, 10</i>, 25–53.", contribution:"The contemporary version, with the expansions.", doi:"10.1146/annurev-orgpsych-120920-053933" }
  ],
  fullSources:[
    { citation:"Demerouti, E., Bakker, A. B., Nachreiner, F., &amp; Schaufeli, W. B. (2001). The Job Demands–Resources model of burnout. <i>Journal of Applied Psychology, 86</i>(3), 499–512.", contribution:"Original core paper; the two categories and two processes.", doi:"10.1037/0021-9010.86.3.499" },
    { citation:"Bakker, A. B., &amp; Demerouti, E. (2007). The Job Demands–Resources model: State of the art. <i>Journal of Managerial Psychology, 22</i>(3), 309–328.", contribution:"JD–R as a flexible general model, not only about burnout.", doi:"10.1108/02683940710733115" },
    { citation:"Crawford, E. R., LePine, J. A., &amp; Rich, B. L. (2010). Linking job demands and resources to employee engagement and burnout: A theoretical extension and meta-analytic test. <i>Journal of Applied Psychology, 95</i>(5), 834–848.", contribution:"Distinguishes challenge demands from hindrance demands.", doi:"10.1037/a0019364" },
    { citation:"Bakker, A. B., Demerouti, E., &amp; Sanz-Vergel, A. I. (2014). Burnout and work engagement: The JD–R approach. <i>Annual Review of Organizational Psychology and Organizational Behavior, 1</i>, 389–411.", contribution:"The parallel pathways to burnout and work engagement.", doi:"10.1146/annurev-orgpsych-031413-091235" },
    { citation:"Bakker, A. B., &amp; Demerouti, E. (2023). Job Demands–Resources Theory: Ten years later. <i>Annual Review of Organizational Psychology and Organizational Behavior, 10</i>, 25–53.", contribution:"Expanded theory: personal resources, job crafting, self-regulation, multilevel processes, daily fluctuations.", doi:"10.1146/annurev-orgpsych-120920-053933" }
  ],

  provenance:[
    { glyph:"●", colour:"var(--red)", label:"Source-grounded", note:"The two categories, the two processes, the challenge–hindrance distinction and the 2023 expansions are drawn from the five cited papers, with each attributed to the paper that introduced it." },
    { glyph:"■", colour:"var(--teal)", label:"Plain-language paraphrase", note:"Definitions of demands and resources are restated in ordinary words rather than quoted. Example demands and resources are the standard ones used across this literature, not findings from any single study." },
    { glyph:"▲", colour:"var(--pen-3)", label:"Teaching analogy", note:"The two-road diagram and the resource dial illustrate direction of relationship only. No magnitude, effect size or prediction is shown, and none is implied." },
    { glyph:"✦", colour:"var(--pen-3)", label:"Editorial critique", note:"The falsifiability concern and the note about causal language outrunning study design are our editorial reading of the literature, marked as ours rather than attributed to the cited authors." }
  ]
};

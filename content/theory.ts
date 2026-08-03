import type { TheoryRecord } from "./types";

export const personEnvironmentFit: TheoryRecord = {
  id: "person-environment-fit",
  title: "Person–Environment Fit",
  hook: "Why can the same workplace energise one person and drain another?",
  oneSentence:
    "Person–Environment Fit concerns the degree and form of correspondence between characteristics of a person and characteristics of an environment.",
  originsNote:
    "There is no single universally accepted founding paper. The framework developed through vocational psychology, field theory, occupational stress and work-adjustment research.",
  origins: [
    { year: "1909", author: "Frank Parsons", title: "Choosing a Vocation", contribution: "A systematic case for understanding people, occupations, and the relationship between them." },
    { year: "1936", author: "Kurt Lewin", title: "Principles of Topological Psychology", contribution: "The broad interactionist foundation: behaviour is a function of person and environment — B = f(P,E)." },
    { year: "1982", author: "French, Caplan & Harrison", title: "The Mechanisms of Job Stress and Strain", contribution: "Distinguished demands–abilities fit from needs–supplies fit." },
    { year: "1984", author: "Dawis & Lofquist", title: "A Psychological Theory of Work Adjustment", contribution: "Linked abilities and requirements, needs and reinforcers, satisfaction and satisfactoriness." },
    { year: "1991", author: "Jeffrey R. Edwards", title: "Person–Job Fit", contribution: "A major conceptual, literature, and measurement treatment of person–job fit." },
    { year: "2005", author: "Kristof-Brown, Zimmerman & Johnson", title: "Consequences of Individuals’ Fit at Work", contribution: "Meta-analysed person–job, organisation, group, and supervisor fit." },
    { year: "2008", author: "Jeffrey R. Edwards", title: "P–E Fit in Organizations", contribution: "Assessed theoretical progress and sharpened the framework’s open questions." },
  ],
  coreProcesses: [
    { id: "da", title: "Demands–abilities", person: "What the person can do", environment: "What the setting asks", explanation: "Correspondence concerns abilities on the person side and demands or requirements on the environment side." },
    { id: "ns", title: "Needs–supplies", person: "What the person needs", environment: "What the setting supplies", explanation: "Correspondence concerns needs, goals, or preferences and the resources or reinforcers available in the environment." },
  ],
  fitTargets: [
    { id: "job", title: "Job", question: "Do the role’s demands and supplies correspond with this person?", example: "A complex analysis role asks for — and uses — the analyst’s pattern-finding ability." },
    { id: "organisation", title: "Organisation", question: "How does the person correspond with the wider organisation?", example: "A person seeking autonomy enters an organisation that delegates real decision authority." },
    { id: "group", title: "Group", question: "How does the person correspond with the immediate work group?", example: "A reflective newcomer joins a team that makes room for preparation before discussion." },
    { id: "supervisor", title: "Supervisor", question: "How does the person correspond with the supervisor relationship?", example: "An employee needing frequent feedback works with a supervisor who provides clear, timely guidance." },
  ],
  workAdjustment:
    "Work-adjustment research treats correspondence as a continuing relationship: employees bring abilities and needs; work environments bring requirements and reinforcers. Satisfaction and satisfactoriness are related but distinct viewpoints.",
  oversimplifications: [
    "Fit is not a fixed virtue possessed by either the person or the workplace alone.",
    "More of an attribute is not automatically better; correspondence depends on what is being compared.",
    "Different fit targets are not interchangeable, and a good match with one does not guarantee a good match with another.",
    "A visual balance is a teaching analogy, not a validated score or prediction of an outcome.",
  ],
  qualifications: [
    "The framework includes multiple traditions rather than one uncontested origin story.",
    "The sources here establish core distinctions and fit targets; they do not justify every later classification used in the broader literature.",
    "Claims about consequences depend on construct definitions, measurement, context, and study design.",
  ],
  minimumReading: [
    { citation: "Edwards, J. R. (1991). Person–Job Fit.", contribution: "Conceptual integration and methodological critique." },
    { citation: "Kristof-Brown, Zimmerman, & Johnson (2005).", contribution: "Meta-analysis across four workplace fit targets.", doi: "10.1111/j.1744-6570.2005.00672.x" },
    { citation: "Edwards, J. R. (2008). Person–Environment Fit in Organizations.", contribution: "Assessment of theoretical progress.", doi: "10.5465/19416520802211503" },
  ],
  fullSources: [
    { citation: "Parsons, F. (1909). Choosing a Vocation.", contribution: "Vocational matching." },
    { citation: "Lewin, K. (1936). Principles of Topological Psychology.", contribution: "Interactionist foundation." },
    { citation: "French, Caplan, & Harrison (1982). The Mechanisms of Job Stress and Strain.", contribution: "Demands–abilities and needs–supplies." },
    { citation: "Dawis & Lofquist (1984). A Psychological Theory of Work Adjustment.", contribution: "Work-adjustment correspondence." },
    { citation: "Edwards (1991). Person–Job Fit.", contribution: "Conceptual and methodological treatment." },
    { citation: "Kristof-Brown, Zimmerman, & Johnson (2005).", contribution: "Meta-analysis of fit at work.", doi: "10.1111/j.1744-6570.2005.00672.x" },
    { citation: "Edwards (2008). Person–Environment Fit in Organizations.", contribution: "Theoretical review.", doi: "10.5465/19416520802211503" },
  ],
  provenance: [
    { kind: "source", label: "Source-grounded", note: "Dates, distinctions, titles, and fit targets are drawn from the cited literature supplied in the brief." },
    { kind: "paraphrase", label: "Plain-language paraphrase", note: "Explanations compress technical distinctions without presenting them as quotations." },
    { kind: "analogy", label: "Teaching analogy", note: "Calibration, balance, and landscape visuals explain correspondence but do not calculate outcomes." },
    { kind: "unresolved", label: "Contested / unresolved", note: "No single universally accepted founding paper is claimed." },
  ],
};

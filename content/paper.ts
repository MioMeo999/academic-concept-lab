import type { PaperRecord } from "./types";

export const tunedOutPaper: PaperRecord = {
  id: "tuned-out-or-dialed-in",
  title: "Tuned Out or Dialed In",
  hook: "Music may help you work. But what do your coworkers think it means?",
  oneSentence:
    "Music listening at work is an ambiguous social cue; coworkers’ leisure or productivity attributions shape perceived engagement and subsequently influence judgments and interpersonal reactions.",
  citation: {
    authors: "Oguz Gencay, Trevor Foulk & Michael Schaerer",
    journal: "Personnel Psychology, 79(2), 223–250",
    year: 2026,
    doi: "10.1111/peps.70025",
  },
  researchQuestion: "How do observers interpret and react to coworkers who listen to music while working?",
  theoreticalFoundation:
    "Attribution theory explains why the same visible behaviour can invite different causal explanations. The listener’s private purpose is not directly observable, so coworkers may infer leisure, productivity, both, or neither.",
  conceptualModel: ["Music listening", "Leisure / productivity attributions", "Perceived cognitive engagement", "Perceived performance / withdrawal", "Support / incivility"],
  hypotheses: [
    "Observers will judge listeners as less engaged when listening is attributed to leisure rather than productivity.",
    "Lower perceived engagement will relate to lower perceived performance and higher perceived withdrawal.",
    "Those judgments will transmit effects to observer support and observer incivility.",
  ],
  studies: [
    { id: "s1", label: "Study 1", design: "Dyadic field study", location: "Turkey", sample: "205 complete employee–coworker dyads", question: "Does naturally occurring music listening relate to perceived engagement differently depending on coworkers’ open-ended attributions?", method: "Targets reported their listening; observers reported perceived engagement and why they believed the target listened.", role: "Initial field evidence for the attribution-dependent engagement link.", result: "Listening was associated with lower perceived engagement when observers made leisure rather than productivity attributions.", strength: "Naturally occurring behaviour and paired employee–coworker reports.", limitation: "Cross-sectional evidence cannot establish causality." },
    { id: "s2", label: "Study 2", design: "Preregistered online experiment", location: "United States", sample: "293 full-time employees", question: "Do experimentally supplied leisure or productivity explanations change the full perceptual and behavioural pathway?", method: "Participants saw non-listening, leisure-attributed listening, or productivity-attributed listening conditions and evaluated the target.", role: "Causal test of the full perceptual and behavioural model.", result: "Leisure-attributed listening reduced perceived engagement relative to the other conditions; productivity-attributed listening did not produce the same penalty.", strength: "Preregistered manipulation and full-model test, including behavioural and intention-based outcomes.", limitation: "A hypothetical workplace scenario; some downstream outcomes measured intentions." },
    { id: "s3", label: "Study 3", design: "Preregistered two-day dyadic field experiment", location: "United States", sample: "150 employee–coworker dyads", question: "Does the process appear when listening is manipulated in ongoing workplaces?", method: "Targets were instructed to listen or refrain; observers reported perceptions and targets reported later treatment.", role: "Field-based causal and interpersonal evidence.", result: "Productivity attributions could preserve or enhance perceived engagement in this setting; leisure attributions produced the more consistent negative pattern.", strength: "Combines experimental assignment with real coworker relationships and target-reported treatment.", limitation: "Short two-day window and a sample restricted by field-study eligibility." },
  ],
  crossStudyFindings: [
    "Negative reactions were more consistent when listening was attributed to leisure.",
    "Productivity attributions often protected listeners from negative judgments, but positive enhancement was not consistent in every study.",
    "Perceived engagement connected attribution to later judgments of performance and withdrawal, which related to support and incivility.",
  ],
  robustness: ["Actual engagement", "Headphone use", "Headphone type", "Social accounts", "Body movements", "Environmental noise", "Observers’ own listening behaviour", "Coworker and supervisor observers", "Validation of leisure and productivity attribution categories"],
  alternativeExplanations: [
    "Headphone use alone did not account for the reported pattern in the supplemental tests.",
    "The authors examined positive as well as negative pathways and tested observer roles beyond coworkers.",
    "Contextual cues such as noise and social explanations may help shape attributions rather than merely follow them.",
  ],
  strengths: ["Multi-method package across field and experimental designs", "Preregistered Studies 2 and 3", "Dyadic data in Studies 1 and 3", "Open data, materials, code, outputs, and supplemental material"],
  limitations: ["Study 1 is cross-sectional", "Study 2 relies on a hypothetical scenario and partly intention-based outcomes", "Study 3 captures a short field window", "Observer perception is not proof of the listener’s actual motive, engagement, or performance", "Attributions and effects may vary across workplaces, cultures, tasks, and norms"],
  claimEvidencePairs: [
    { claim: "Music listening is uniformly harmful at work.", evidence: "Not established. The pattern depends on what observers infer, and productivity attributions often remove the penalty.", status: "Not supported" },
    { claim: "Leisure attributions can carry social costs.", evidence: "Supported across the study package through engagement, performance/withdrawal, and interpersonal pathways.", status: "Convergent evidence" },
    { claim: "Observers know the listener’s real purpose.", evidence: "Not established. Attribution concerns observers’ explanations, which may diverge from actual motives.", status: "Important distinction" },
    { claim: "Productivity attribution always improves judgments.", evidence: "Not established. It often protected listeners, while positive enhancement was not uniform across studies.", status: "Qualified" },
  ],
  contributions: ["Moves music-at-work research from listener-only effects to social observer effects", "Shows how an ambiguous cue becomes consequential through attribution", "Connects perceived engagement to performance, withdrawal, support, and incivility judgments"],
  implications: ["Visible work habits can be judged through explanations observers construct", "A truthful social account may reduce ambiguity when workplace norms permit it", "Managers should avoid treating observer impressions as direct measures of actual engagement"],
  openMaterials: "https://researchbox.org/5962",
  provenance: [
    { kind: "source", label: "Directly reported", note: "Citation, sample sizes, designs, preregistration status, and study-level conclusions are grounded in the published article and open materials." },
    { kind: "paraphrase", label: "Plain-language paraphrase", note: "Mechanisms and results are restated without reproducing article text." },
    { kind: "reconstruction", label: "Original diagram", note: "Editorial reconstruction based on the cited source; no published figure or table is reproduced." },
    { kind: "editorial", label: "Editorial interpretation", note: "The Observer Lens is a learning aid, not a diagnostic tool or deterministic prediction." },
  ],
};

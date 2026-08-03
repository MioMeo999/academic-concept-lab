"use client";

import { useEffect, useMemo, useState } from "react";
import { tunedOutPaper as paper } from "@/content/paper";
import { personEnvironmentFit as theory } from "@/content/theory";
import type { Provenance, Study } from "@/content/types";

export type PrototypeId = "editorial-atlas" | "analytical-studio" | "illustrated-journal";
export type PrototypeMode = "theory" | "study";

const prototypeRecords: Array<{
  id: PrototypeId;
  code: string;
  name: string;
  descriptor: string;
  strength: string;
  tradeoff: string;
  principles: string[];
}> = [
  {
    id: "editorial-atlas",
    code: "A",
    name: "Living Editorial Atlas",
    descriptor: "Chapter-led inquiry with intellectual drama and generous reading space.",
    strength: "Strongest all-round candidate, especially for theory.",
    tradeoff: "Its expressive pacing requires disciplined editorial production.",
    principles: ["Editorial rhythm", "Spatial narrative", "Layered annotation"],
  },
  {
    id: "analytical-studio",
    code: "B",
    name: "Analytical Research Studio",
    descriptor: "A precise research-product language for inspecting methods and evidence.",
    strength: "Strongest candidate for empirical transparency.",
    tradeoff: "Its structure can feel clinical without carefully paced interpretation.",
    principles: ["Study anatomy", "Visible evidence states", "Calm precision"],
  },
  {
    id: "illustrated-journal",
    code: "C",
    name: "Illustrated Learning Journal",
    descriptor: "A sophisticated visual notebook that turns abstractions into memorable scenes.",
    strength: "Strongest candidate for approachability and recall.",
    tradeoff: "Illustration needs sustained craft to preserve scholarly authority.",
    principles: ["Conceptual metaphor", "Human annotation", "Reflective prompts"],
  },
];

const comparisonRows = [
  ["Readability", "Excellent", "Excellent", "Very good"],
  ["Conceptual clarity", "Excellent", "Very good", "Excellent"],
  ["Empirical transparency", "Very good", "Excellent", "Good"],
  ["Memorability", "Very good", "Good", "Excellent"],
  ["Visual originality", "Excellent", "Very good", "Excellent"],
  ["Mobile suitability", "Very good", "Excellent", "Very good"],
  ["Accessibility", "Excellent", "Excellent", "Very good"],
  ["Technical complexity", "Moderate", "Moderate", "Higher"],
  ["Scalability", "Very good", "Excellent", "Moderate"],
];

const typeMeta = {
  source: ["●", "Source claim"],
  finding: ["■", "Reported finding"],
  author: ["▲", "Author interpretation"],
  platform: ["◆", "Platform explanation"],
  critique: ["✦", "Editorial critique"],
  connection: ["↗", "Proposed connection"],
  question: ["?", "Open question"],
} as const;

type StatementKind = keyof typeof typeMeta;

function prototypeRoute(id: PrototypeId, mode: PrototypeMode) {
  return `/concept-lab/prototypes/${id}/${mode}`;
}

function StatementTypeLabel({ kind }: { kind: StatementKind }) {
  const [icon, label] = typeMeta[kind];
  return <span className={`statement-label statement-${kind}`}><span aria-hidden="true">{icon}</span>{label}</span>;
}

function DiagramTextAlternative({ children }: { children: React.ReactNode }) {
  return <details className="diagram-alternative"><summary>Read this diagram as text</summary><div>{children}</div></details>;
}

function PrototypeHeader({ prototype, mode }: { prototype?: PrototypeId; mode?: PrototypeMode }) {
  const [query, setQuery] = useState("");
  const pageKey = prototype && mode ? `${prototype}:${mode}` : "prototype-index";
  const [saved, setSaved] = useState(false);
  const searchItems = useMemo(() => mode === "study" ? [
    ["Research question", "#glance"], ["Study anatomy", "#study-anatomy"], ["Procedure", "#procedure"], ["Evidence", "#evidence"], ["Limitations", "#boundaries"], ["Sources", "#research-details"],
  ] : [
    ["Central proposition", "#glance"], ["Origins", "#origins"], ["Construct map", "#constructs"], ["Mechanisms", "#mechanisms"], ["Critique", "#critique"], ["Sources", "#research-details"],
  ], [mode]);
  const results = query.trim() ? searchItems.filter(([label]) => label.toLowerCase().includes(query.toLowerCase())) : [];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try { setSaved(localStorage.getItem(`acl-saved:${pageKey}`) === "true"); } catch { /* device storage is optional */ }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pageKey]);

  const toggleSaved = () => {
    const next = !saved;
    setSaved(next);
    try { localStorage.setItem(`acl-saved:${pageKey}`, String(next)); } catch { /* device storage is optional */ }
  };

  return (
    <header className="prototype-header">
      <a className="prototype-brand" href="/concept-lab" aria-label="Academic Concept Lab home"><span>ACL</span><strong>Academic Concept Lab</strong></a>
      <nav aria-label="Prototype navigation">
        <a href="/concept-lab/prototypes" aria-current={!prototype ? "page" : undefined}>Prototypes</a>
        {prototype && <a href={prototypeRoute(prototype, "theory")} aria-current={mode === "theory" ? "page" : undefined}>Theory</a>}
        {prototype && <a href={prototypeRoute(prototype, "study")} aria-current={mode === "study" ? "page" : undefined}>Empirical study</a>}
      </nav>
      <div className="prototype-tools">
        {prototype && <div className="prototype-search">
          <label><span className="sr-only">Search this record</span><input type="search" placeholder="Find in record" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          {results.length > 0 && <div className="search-results" aria-label="Search results">{results.map(([label, href]) => <a href={href} key={href} onClick={() => setQuery("")}>{label}</a>)}</div>}
        </div>}
        <button className="save-control" type="button" aria-pressed={saved} onClick={toggleSaved}><span aria-hidden="true">{saved ? "★" : "☆"}</span>{saved ? "Saved" : "Save"}</button>
      </div>
    </header>
  );
}

function PrototypeSwitcher({ current, mode }: { current: PrototypeId; mode: PrototypeMode }) {
  return <nav className="prototype-switcher" aria-label="Compare visual prototypes">{prototypeRecords.map((item) => <a key={item.id} href={prototypeRoute(item.id, mode)} aria-current={current === item.id ? "page" : undefined}><span>{item.code}</span><b>{item.name}</b></a>)}</nav>;
}

function ReadingDepthNavigation() {
  return <nav className="reading-depth" aria-label="Reading depth"><a href="#glance"><span>01</span><b>At a glance</b><small>Orientation</small></a><a href="#explore"><span>02</span><b>Explore the research</b><small>Main journey</small></a><a href="#research-details"><span>03</span><b>Research details</b><small>Sources + boundaries</small></a></nav>;
}

function LayerHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return <div className="layer-heading"><span>{number}</span><div><p>Reading layer</p><h2>{title}</h2><p>{description}</p></div></div>;
}

function PrototypeHero({ prototype, mode }: { prototype: PrototypeId; mode: PrototypeMode }) {
  const record = prototypeRecords.find((item) => item.id === prototype)!;
  return <section className="prototype-hero" id="glance">
    <div className="prototype-kicker"><span>{record.code} / {mode === "theory" ? "Living Concept Atlas" : "Evidence X-ray"}</span><span>{record.name}</span></div>
    <div className="hero-copy">
      <StatementTypeLabel kind="source" />
      {mode === "theory" ? <><h1>{theory.title}</h1><p className="hero-question">{theory.hook}</p><blockquote>{theory.oneSentence}</blockquote></> : <><h1>{paper.title}</h1><p className="hero-question">{paper.hook}</p><blockquote>{paper.oneSentence}</blockquote></>}
    </div>
    {mode === "theory" ? <div className="theory-hero-model" role="img" aria-label="Person and environment overlap to create correspondence, shown as two intersecting fields."><div className="person-field"><span>Person</span><b>P</b></div><div className="environment-field"><span>Environment</span><b>E</b></div><div className="correspondence-field">correspondence</div><i>B = f(P,E)</i></div> : <div className="study-hero-model" role="img" aria-label="A visible cue is interpreted by an observer, shaping judgments and later interpersonal reactions."><span>visible cue</span><i aria-hidden="true">→</i><span>attribution</span><i aria-hidden="true">→</i><span>judgment</span><i aria-hidden="true">→</i><span>reaction</span></div>}
    <div className="hero-boundary"><StatementTypeLabel kind="platform" /><p>{mode === "theory" ? "The visual overlap is a teaching model. It does not calculate a validated fit score." : "This page maps the published study package. Observer judgments are not proof of listeners’ actual motives or performance."}</p></div>
  </section>;
}

function ConceptMap() {
  const nodes = [
    ...theory.coreProcesses.map((item) => ({ id: item.id, title: item.title, question: `${item.person} ↔ ${item.environment}`, explanation: item.explanation, example: "Core form of correspondence" })),
    ...theory.fitTargets.map((item) => ({ id: item.id, title: item.title, question: item.question, explanation: item.example, example: "Environmental target" })),
  ];
  const [selectedId, setSelectedId] = useState(nodes[0].id);
  const selected = nodes.find((node) => node.id === selectedId)!;
  return <div className="concept-map-component">
    <div className="concept-map-visual" role="group" aria-label="Select a Person–Environment Fit construct">
      <div className="map-core" aria-hidden="true">P ↔ E</div>
      {nodes.map((node, index) => <button key={node.id} className={`map-node map-node-${index + 1}`} type="button" aria-pressed={selectedId === node.id} onClick={() => setSelectedId(node.id)}><span>{node.title}</span></button>)}
    </div>
    <article className="concept-reading" aria-live="polite"><p>{selected.example}</p><h3>{selected.title}</h3><strong>{selected.question}</strong><p>{selected.explanation}</p><StatementTypeLabel kind="platform" /></article>
    <DiagramTextAlternative><ul>{nodes.map((node) => <li key={node.id}><strong>{node.title}:</strong> {node.question}. {node.explanation}</li>)}</ul></DiagramTextAlternative>
  </div>;
}

function TheoryTimeline() {
  return <ol className="prototype-timeline">{theory.origins.map((item, index) => <li key={`${item.year}-${item.author}`}><span>{item.year}</span><div><small>Chapter {String(index + 1).padStart(2, "0")}</small><h3>{item.author}</h3><p>{item.title}</p><p>{item.contribution}</p></div></li>)}</ol>;
}

function MechanismSequence() {
  return <div className="mechanism-sequence"><div><span>01</span><h3>Person side</h3><p>Abilities, needs, goals, and preferences.</p></div><div><span>02</span><h3>Environment side</h3><p>Demands, requirements, supplies, and reinforcers.</p></div><div><span>03</span><h3>Correspondence</h3><p>{theory.workAdjustment}</p></div><div><span>04</span><h3>Two viewpoints</h3><p>Satisfaction for the person; satisfactoriness for the environment.</p></div></div>;
}

function TheoryComparison() {
  return <div className="theory-comparison"><div className="comparison-axis"><p>Form</p><p>Person side</p><p>Environment side</p><p>Meaning</p></div>{theory.coreProcesses.map((item) => <article key={item.id}><h3>{item.title}</h3><p>{item.person}</p><p>{item.environment}</p><p>{item.explanation}</p></article>)}</div>;
}

function ProvenanceLegend({ items }: { items: Provenance[] }) {
  const kind: Record<Provenance["kind"], StatementKind> = { source: "source", paraphrase: "platform", editorial: "critique", analogy: "platform", reconstruction: "platform", unresolved: "question" };
  return <div className="prototype-provenance">{items.map((item) => <article key={item.label}><StatementTypeLabel kind={kind[item.kind]} /><h3>{item.label}</h3><p>{item.note}</p></article>)}</div>;
}

function TheoryPrototype() {
  return <>
    <section className="depth-layer explore-layer" id="explore"><LayerHeading number="02" title="Explore the research" description="Move from the framework’s intellectual origins to its constructs, mechanisms, and practical examples." />
      <section className="prototype-chapter" id="origins"><div className="chapter-intro"><StatementTypeLabel kind="platform" /><p>Why the theory was needed</p><h2>People cannot be understood apart from the environments they encounter.</h2><p>{theory.originsNote}</p></div><TheoryTimeline /></section>
      <section className="prototype-chapter" id="constructs"><div className="chapter-intro"><StatementTypeLabel kind="platform" /><p>Central constructs</p><h2>Fit is a family of comparisons, not one generic match.</h2><p>Select a construct or target. The adjacent explanation updates without hiding the complete text alternative.</p></div><ConceptMap /></section>
      <section className="prototype-chapter" id="mechanisms"><div className="chapter-intro"><StatementTypeLabel kind="platform" /><p>Mechanisms</p><h2>Correspondence is examined from both sides of a relationship.</h2></div><MechanismSequence /><TheoryComparison /></section>
      <section className="prototype-chapter example-chapter"><div className="chapter-intro"><StatementTypeLabel kind="platform" /><p>Worked examples</p><h2>The same person can fit differently across environmental targets.</h2></div><div className="worked-examples">{theory.fitTargets.map((target) => <article key={target.id}><span>{target.title}</span><h3>{target.question}</h3><p>{target.example}</p></article>)}</div></section>
    </section>
    <section className="depth-layer detail-layer" id="research-details"><LayerHeading number="03" title="Research details" description="Keep critique, unresolved questions, source notes, and provenance connected to the explanatory journey." />
      <section className="prototype-chapter" id="critique"><div className="chapter-intro"><StatementTypeLabel kind="critique" /><p>Criticism and limitations</p><h2>Four shortcuts that the framework does not justify.</h2></div><div className="critique-field">{theory.oversimplifications.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div></section>
      <section className="prototype-chapter detail-grid"><article><StatementTypeLabel kind="question" /><h2>Open questions and qualifications</h2><ul>{theory.qualifications.map((item) => <li key={item}>{item}</li>)}</ul></article><article><StatementTypeLabel kind="source" /><h2>Measurement approaches</h2><p>Not yet added to the editorial record. The current sources establish distinctions and targets but do not provide a complete measurement inventory.</p></article><article><StatementTypeLabel kind="connection" /><h2>Neighbouring theories</h2><p>Not yet added to the editorial record. Connections should be sourced before comparison.</p></article><article><StatementTypeLabel kind="platform" /><h2>Contemporary applications</h2><p>The current record supports job, organisation, group, and supervisor examples. Outcome claims remain dependent on definition, context, measurement, and design.</p></article></section>
      <SourceDetails mode="theory" />
      <ProvenanceLegend items={theory.provenance} />
    </section>
  </>;
}

function StudyAnatomy() {
  const [selectedId, setSelectedId] = useState(paper.studies[0].id);
  const selected = paper.studies.find((study) => study.id === selectedId)!;
  const moveTab = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? paper.studies.length - 1 : event.key === "ArrowRight" ? (index + 1) % paper.studies.length : (index - 1 + paper.studies.length) % paper.studies.length;
    setSelectedId(paper.studies[nextIndex].id);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role='tab']");
    tabs?.[nextIndex]?.focus();
  };
  return <div className="study-anatomy-component">
    <div className="study-tabs" role="tablist" aria-label="Study package">{paper.studies.map((study, index) => <button key={study.id} id={`prototype-${study.id}-tab`} role="tab" aria-selected={selectedId === study.id} aria-controls={`prototype-${study.id}-panel`} tabIndex={selectedId === study.id ? 0 : -1} onClick={() => setSelectedId(study.id)} onKeyDown={(event) => moveTab(event, index)}><span>0{index + 1}</span><b>{study.design}</b><small>{study.sample}</small></button>)}</div>
    <StudyDetail study={selected} />
    <div className="all-studies"><h3>Complete three-study sequence</h3>{paper.studies.map((study) => <article key={study.id}><b>{study.label} · {study.design}</b><p>{study.question}</p><p><strong>Result:</strong> {study.result}</p></article>)}</div>
  </div>;
}

function StudyDetail({ study }: { study: Study }) {
  return <article className="selected-study" role="tabpanel" id={`prototype-${study.id}-panel`} aria-labelledby={`prototype-${study.id}-tab`}><div><p>{study.location} · {study.label}</p><h3>{study.design}</h3><strong>{study.sample}</strong></div><dl><div><dt>Research question</dt><dd>{study.question}</dd></div><div><dt>Method</dt><dd>{study.method}</dd></div><div><dt>Role in the argument</dt><dd>{study.role}</dd></div><div><dt>Principal result</dt><dd>{study.result}</dd></div><div><dt>Strength</dt><dd>{study.strength}</dd></div><div><dt>Limitation</dt><dd>{study.limitation}</dd></div></dl></article>;
}

function ProcedureTimeline() {
  return <ol className="procedure-timeline">{paper.studies.map((study, index) => <li key={study.id}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{study.label} · {study.location}</small><h3>{study.design}</h3><p>{study.method}</p><b>{study.sample}</b></div></li>)}</ol>;
}

function VariableMap() {
  return <div className="variable-map" role="img" aria-label="Conceptual pathway from music listening through attribution and perceived engagement to judgments and interpersonal reactions.">{paper.conceptualModel.map((stage, index) => <div key={stage}><span>{String(index + 1).padStart(2, "0")}</span><p>{stage}</p>{index < paper.conceptualModel.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>;
}

type Evidence = {
  claim: string; result: string; analysis: string; direction: string; magnitude: string; uncertainty: string; hypothesis: string; status: string; explanation: string; caveat: string;
};

const evidenceRecords: Evidence[] = paper.claimEvidencePairs.map((pair, index) => ({
  claim: pair.claim,
  result: pair.evidence,
  analysis: index === 1 ? "Converging field and experimental evidence across the study package." : "Claim assessed against the combined study package and reported robustness checks.",
  direction: index === 1 ? "More negative under leisure attribution" : index === 3 ? "Conditional / inconsistent enhancement" : "No uniform direction established",
  magnitude: "No effect size reported in the current editorial record.",
  uncertainty: paper.limitations[Math.min(index, paper.limitations.length - 1)],
  hypothesis: index === 1 ? "Consistent with the tested attribution pathway" : "Boundary or qualification",
  status: pair.status,
  explanation: index === 1 ? "The social cost is linked to the explanation observers construct, not listening in isolation." : "The evidence does not support converting an observer pathway into a universal verdict.",
  caveat: "Observer perception is not direct evidence of the listener’s actual motive, engagement, or performance.",
}));

function EvidenceCard({ evidence, index }: { evidence: Evidence; index: number }) {
  return <article className="evidence-card"><header><span>E{String(index + 1).padStart(2, "0")}</span><StatementTypeLabel kind="finding" /></header><h3>{evidence.claim}</h3><p className="supporting-result">{evidence.result}</p><dl><div><dt>Analysis / test</dt><dd>{evidence.analysis}</dd></div><div><dt>Effect direction</dt><dd>{evidence.direction}</dd></div><div><dt>Effect magnitude</dt><dd>{evidence.magnitude}</dd></div><div><dt>Uncertainty</dt><dd>{evidence.uncertainty}</dd></div><div><dt>Hypothesis status</dt><dd>{evidence.hypothesis} · {evidence.status}</dd></div></dl><div className="evidence-interpretation"><StatementTypeLabel kind="platform" /><p>{evidence.explanation}</p></div><aside><strong>Relevant caveat</strong><p>{evidence.caveat}</p></aside></article>;
}

function ClaimEvidenceLink() {
  return <div className="claim-evidence-links">{paper.hypotheses.map((hypothesis, index) => <article key={hypothesis}><span>H{index + 1}</span><div><h3>{hypothesis}</h3><p><strong>Linked cross-study finding:</strong> {paper.crossStudyFindings[index]}</p></div></article>)}</div>;
}

function LimitationBoundary() {
  return <div className="limitation-boundaries">{paper.limitations.map((limitation, index) => <article key={limitation}><span>{String(index + 1).padStart(2, "0")}</span><div><StatementTypeLabel kind="critique" /><p>{limitation}</p><small>Interpret conclusions within this boundary.</small></div></article>)}</div>;
}

function ShowsVsUncertain() {
  return <div className="shows-uncertain"><article><StatementTypeLabel kind="finding" /><h2>What this paper shows</h2><ul>{paper.crossStudyFindings.map((item) => <li key={item}>{item}</li>)}</ul></article><article><StatementTypeLabel kind="question" /><h2>What remains uncertain</h2><ul>{paper.claimEvidencePairs.filter((item) => /Not established|Not supported|Qualified/.test(`${item.status} ${item.evidence}`)).map((item) => <li key={item.claim}><strong>{item.claim}</strong> {item.evidence}</li>)}</ul></article></div>;
}

function StudyPrototype() {
  return <>
    <section className="depth-layer explore-layer" id="explore"><LayerHeading number="02" title="Explore the research" description="Follow the question through the study package, procedures, variables, hypotheses, findings, and evidence boundaries." />
      <section className="prototype-chapter question-chapter"><div className="chapter-intro"><StatementTypeLabel kind="source" /><p>Research question</p><h2>{paper.researchQuestion}</h2><p>{paper.theoreticalFoundation}</p></div><div className="attribution-contrast"><article><span>Leisure attribution</span><p>Enjoyment, entertainment, or passing time.</p></article><article><span>Productivity attribution</span><p>Focus, concentration, or productive work.</p></article><aside><StatementTypeLabel kind="platform" /><p>The two explanations are distinct and not necessarily mutually exclusive.</p></aside></div></section>
      <section className="prototype-chapter" id="study-anatomy"><div className="chapter-intro"><StatementTypeLabel kind="source" /><p>Study anatomy</p><h2>Three designs build one cumulative argument.</h2><p>Use the selector for close inspection; the complete sequence remains visible underneath.</p></div><StudyAnatomy /></section>
      <section className="prototype-chapter" id="procedure"><div className="chapter-intro"><StatementTypeLabel kind="platform" /><p>Procedure timeline</p><h2>Field observation, controlled scenario, then field experiment.</h2></div><ProcedureTimeline /></section>
      <section className="prototype-chapter"><div className="chapter-intro"><StatementTypeLabel kind="platform" /><p>Variable map</p><h2>Trace the proposed path from cue to social consequence.</h2></div><VariableMap /><DiagramTextAlternative><ol>{paper.conceptualModel.map((stage) => <li key={stage}>{stage}</li>)}</ol></DiagramTextAlternative></section>
      <section className="prototype-chapter" id="evidence"><div className="chapter-intro"><StatementTypeLabel kind="finding" /><p>Hypothesis-to-result mapping</p><h2>Every central claim should lead to its supporting evidence and constraint.</h2></div><ClaimEvidenceLink /><div className="evidence-grid">{evidenceRecords.map((evidence, index) => <EvidenceCard key={evidence.claim} evidence={evidence} index={index} />)}</div></section>
    </section>
    <section className="depth-layer detail-layer" id="research-details"><LayerHeading number="03" title="Research details" description="Inspect limitations, robustness checks, the interpretation boundary, and the full source trail." />
      <section className="prototype-chapter" id="boundaries"><div className="chapter-intro"><StatementTypeLabel kind="critique" /><p>Limitation boundaries</p><h2>Pair every conclusion with the condition that constrains it.</h2></div><LimitationBoundary /></section>
      <ShowsVsUncertain />
      <section className="prototype-chapter robustness-section"><div><StatementTypeLabel kind="source" /><h2>Robustness evidence</h2><div className="robustness-list">{paper.robustness.map((item) => <span key={item}>{item}</span>)}</div></div><div><StatementTypeLabel kind="author" /><h2>Author contributions and implications</h2><ul>{[...paper.contributions, ...paper.implications].map((item) => <li key={item}>{item}</li>)}</ul></div></section>
      <SourceDetails mode="study" />
      <ProvenanceLegend items={paper.provenance} />
    </section>
  </>;
}

function SourceDetails({ mode }: { mode: PrototypeMode }) {
  if (mode === "study") return <section className="source-details"><div><StatementTypeLabel kind="source" /><p>Published article</p><h2>{paper.citation.authors} ({paper.citation.year})</h2><p>{paper.citation.journal}</p><a href={`https://doi.org/${paper.citation.doi}`}>DOI {paper.citation.doi}</a></div><div><StatementTypeLabel kind="source" /><p>Open materials</p><h2>ResearchBox #5962</h2><p>Data, code, materials, outputs, supplemental material, and preregistrations where provided by the authors.</p><a href={paper.openMaterials}>Inspect open materials</a></div></section>;
  return <section className="source-details"><div><StatementTypeLabel kind="source" /><p>Minimum reading</p><h2>Start with three anchor texts.</h2>{theory.minimumReading.map((source) => <article key={source.citation}><h3>{source.citation}</h3><p>{source.contribution}</p>{source.doi && <a href={`https://doi.org/${source.doi}`}>DOI {source.doi}</a>}</article>)}</div><div><StatementTypeLabel kind="source" /><p>Full source trail</p><h2>Follow the intellectual development.</h2>{theory.fullSources.map((source) => <article key={source.citation}><h3>{source.citation}</h3><p>{source.contribution}</p></article>)}</div></section>;
}

export function PrototypePage({ prototype, mode }: { prototype: PrototypeId; mode: PrototypeMode }) {
  const record = prototypeRecords.find((item) => item.id === prototype)!;
  return <div className={`prototype-site prototype-${prototype} mode-${mode}`}>
    <a href="#prototype-main" className="skip-link">Skip to content</a>
    <PrototypeHeader prototype={prototype} mode={mode} />
    <PrototypeSwitcher current={prototype} mode={mode} />
    <main id="prototype-main"><ReadingDepthNavigation /><PrototypeHero prototype={prototype} mode={mode} /><div className="glance-summary"><article><span>Platform identity</span><h2>{mode === "theory" ? "Living Concept Atlas" : "Evidence X-ray"}</h2><p>{record.descriptor}</p></article><article><span>Intended strength</span><h2>{record.strength}</h2><p>{record.tradeoff}</p></article></div>{mode === "theory" ? <TheoryPrototype /> : <StudyPrototype />}</main>
    <footer><div><strong>Academic Concept Lab</strong><p>Evidence before spectacle. Interpretation with provenance.</p></div><a href="/concept-lab/prototypes">Compare all prototypes</a></footer>
  </div>;
}

export function PrototypeIndex() {
  return <div className="prototype-index"><a href="#prototype-index-main" className="skip-link">Skip to content</a><PrototypeHeader />
    <main id="prototype-index-main">
      <section className="index-hero"><p>Design study / 01</p><h1>One research atlas.<br/><em>Three visual arguments.</em></h1><p>Each direction uses the same Person–Environment Fit theory record and the same three-study empirical paper. Only the visual and interaction language changes.</p><div><a href="#directions">Compare directions</a><a href="/concept-lab">Return to preserved prototype</a></div></section>
      <section className="integrity-strip"><span>Shared across all prototypes</span><p>Content schema</p><p>Academic terminology</p><p>Claim labels</p><p>Provenance</p><p>Reading depth</p><p>Accessibility</p></section>
      <section className="prototype-directions" id="directions"><div className="index-section-heading"><p>Controlled prototypes</p><h2>Same evidence.<br/>Different instruments.</h2></div>{prototypeRecords.map((item, index) => <article className={`direction-card direction-${item.id}`} key={item.id}><div className="direction-visual" aria-hidden="true"><span>{item.code}</span><div><i/><i/><i/></div><b>{index === 0 ? "B = f(P,E)" : index === 1 ? "claim → evidence" : "see it / name it"}</b></div><div className="direction-copy"><p>{item.descriptor}</p><h3>{item.name}</h3><ul>{item.principles.map((principle) => <li key={principle}>{principle}</li>)}</ul><div><strong>Intended strength</strong><p>{item.strength}</p><strong>Key trade-off</strong><p>{item.tradeoff}</p></div><nav aria-label={`${item.name} prototypes`}><a href={prototypeRoute(item.id, "theory")}>Open theory <span>→</span></a><a href={prototypeRoute(item.id, "study")}>Open empirical study <span>→</span></a></nav></div></article>)}</section>
      <section className="prototype-matrix" aria-labelledby="matrix-title"><div><p>Comparison matrix</p><h2 id="matrix-title">Evaluate without declaring a winner.</h2><p>These ratings describe the intended design characteristics, not research findings.</p></div><div className="matrix-scroll"><table><thead><tr><th>Criterion</th>{prototypeRecords.map((item) => <th key={item.id}><span>{item.code}</span>{item.name}</th>)}</tr></thead><tbody>{comparisonRows.map(([criterion, ...values]) => <tr key={criterion}><th>{criterion}</th>{values.map((value, index) => <td key={`${criterion}-${index}`}><span>{value}</span></td>)}</tr>)}</tbody></table></div></section>
    </main><footer><strong>Academic Concept Lab</strong><p>A living editorial research atlas for theory and empirical evidence.</p></footer>
  </div>;
}

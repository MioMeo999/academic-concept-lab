"use client";

import { useEffect, useMemo, useState } from "react";
import { personEnvironmentFit as theory } from "@/content/theory";
import { tunedOutPaper as paper } from "@/content/paper";
import type { Provenance, Study } from "@/content/types";

type Concept = "editorial" | "lab" | "theatre";
type Depth = "quick" | "guided" | "deep";
type PageKind = "theory" | "paper";

const concepts: Array<{ id: Concept; letter: string; name: string; short: string }> = [
  { id: "editorial", letter: "A", name: "Editorial Observatory", short: "Type-led long-form inquiry" },
  { id: "lab", letter: "B", name: "Interactive Concept Lab", short: "Tactile learning instrument" },
  { id: "theatre", letter: "C", name: "Illustrated Research Theatre", short: "Narrative scenes + evidence x-ray" },
];

const depths: Array<{ id: Depth; label: string; hint: string }> = [
  { id: "quick", label: "Quick Look", hint: "≈ 1 min" },
  { id: "guided", label: "Guided", hint: "default" },
  { id: "deep", label: "Deep Dive", hint: "methods + sources" },
];

function getInitialConcept(): Concept {
  if (typeof window === "undefined") return "editorial";
  const value = new URLSearchParams(window.location.search).get("concept");
  return value === "lab" || value === "theatre" ? value : "editorial";
}

function getInitialDepth(): Depth {
  if (typeof window === "undefined") return "guided";
  const value = new URLSearchParams(window.location.search).get("depth");
  return value === "quick" || value === "deep" ? value : "guided";
}

function useViewSettings() {
  const [concept, setConceptState] = useState<Concept>("editorial");
  const [depth, setDepthState] = useState<Depth>("guided");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setConceptState(getInitialConcept());
      setDepthState(getInitialDepth());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const updateUrl = (nextConcept: Concept, nextDepth: Depth) => {
    const url = new URL(window.location.href);
    url.searchParams.set("concept", nextConcept);
    url.searchParams.set("depth", nextDepth);
    window.history.replaceState({}, "", url);
  };

  const setConcept = (value: Concept) => {
    setConceptState(value);
    updateUrl(value, depth);
  };
  const setDepth = (value: Depth) => {
    setDepthState(value);
    updateUrl(concept, value);
  };

  return { concept, depth, setConcept, setDepth };
}

function Controls({ concept, depth, onConcept, onDepth }: { concept: Concept; depth: Depth; onConcept: (value: Concept) => void; onDepth: (value: Depth) => void }) {
  return (
    <div className="controls" aria-label="Reading controls">
      <div className="concept-switcher" role="group" aria-label="Visual direction">
        {concepts.map((item) => (
          <button key={item.id} className={concept === item.id ? "is-active" : ""} aria-pressed={concept === item.id} onClick={() => onConcept(item.id)} title={item.name}>
            <b>{item.letter}</b><span>{item.name}</span>
          </button>
        ))}
      </div>
      <div className="depth-switcher" role="group" aria-label="Reading depth">
        {depths.map((item) => (
          <button key={item.id} className={depth === item.id ? "is-active" : ""} aria-pressed={depth === item.id} onClick={() => onDepth(item.id)}>
            <span>{item.label}</span><small>{item.hint}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProvenanceLabel({ kind = "reconstruction", children }: { kind?: Provenance["kind"]; children: React.ReactNode }) {
  return <span className={`provenance-tag provenance-${kind}`}>{children}</span>;
}

function Header({ kind, concept, depth, onConcept, onDepth }: { kind: PageKind; concept: Concept; depth: Depth; onConcept: (value: Concept) => void; onDepth: (value: Depth) => void }) {
  return (
    <header className="site-header">
      <a href="/concept-lab" className="lab-mark" aria-label="Concept Lab home"><span>CL</span><strong>Concept Lab</strong></a>
      <nav aria-label="Prototype pages">
        <a className={kind === "theory" ? "is-current" : ""} href={`/concept-lab/theory/person-environment-fit?concept=${concept}&depth=${depth}`}>Theory</a>
        <a className={kind === "paper" ? "is-current" : ""} href={`/concept-lab/paper/tuned-out-or-dialed-in?concept=${concept}&depth=${depth}`}>Empirical paper</a>
      </nav>
      <Controls concept={concept} depth={depth} onConcept={onConcept} onDepth={onDepth} />
    </header>
  );
}

function Visible({ depth, min, children }: { depth: Depth; min: Depth; children: React.ReactNode }) {
  const rank = { quick: 0, guided: 1, deep: 2 };
  return rank[depth] >= rank[min] ? <>{children}</> : null;
}

function SectionHeading({ number, eyebrow, title, intro }: { number?: string; eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="section-heading">
      {number && <span className="section-number" aria-hidden="true">{number}</span>}
      <div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>
    </div>
  );
}

function TheoryTimeline() {
  return (
    <ol className="origins-timeline">
      {theory.origins.map((origin, index) => (
        <li key={origin.year} style={{ "--i": index } as React.CSSProperties}>
          <span className="origin-year">{origin.year}</span>
          <div><p>{origin.author}</p><h3>{origin.title}</h3><span>{origin.contribution}</span></div>
        </li>
      ))}
    </ol>
  );
}

function FitCalibrator() {
  const [mode, setMode] = useState<"da" | "ns">("da");
  const [person, setPerson] = useState(62);
  const [environment, setEnvironment] = useState(62);
  const record = theory.coreProcesses.find((item) => item.id === mode)!;
  const difference = environment - person;
  const summary = Math.abs(difference) < 7
    ? `Stronger correspondence: the two settings are close.`
    : difference > 0
      ? `${mode === "da" ? "Demands exceed abilities" : "Supplies exceed needs"} in this conceptual example.`
      : `${mode === "da" ? "Abilities exceed demands" : "Needs exceed supplies"} in this conceptual example.`;

  return (
    <div className="calibrator">
      <div className="calibrator-top">
        <div role="group" aria-label="Fit form" className="tactile-toggle">
          {theory.coreProcesses.map((item) => <button key={item.id} onClick={() => setMode(item.id)} aria-pressed={mode === item.id} className={mode === item.id ? "is-active" : ""}>{item.title}</button>)}
        </div>
        <ProvenanceLabel kind="analogy">Conceptual teaching model — not an outcome score</ProvenanceLabel>
      </div>
      <div className="calibration-stage" aria-hidden="true">
        <div className="orbit orbit-person" style={{ "--value": `${person}%` } as React.CSSProperties}><span>P</span></div>
        <div className="orbit orbit-environment" style={{ "--value": `${environment}%` } as React.CSSProperties}><span>E</span></div>
        <div className="match-field" style={{ "--match": `${100 - Math.abs(difference)}%` } as React.CSSProperties}>correspondence</div>
      </div>
      <div className="slider-pair">
        <label><span><b>Person</b> {record.person}</span><input type="range" min="0" max="100" value={person} onChange={(event) => setPerson(Number(event.target.value))} aria-describedby="fit-summary" /></label>
        <label><span><b>Environment</b> {record.environment}</span><input type="range" min="0" max="100" value={environment} onChange={(event) => setEnvironment(Number(event.target.value))} aria-describedby="fit-summary" /></label>
      </div>
      <p id="fit-summary" className="live-summary" aria-live="polite"><strong>{summary}</strong> {record.explanation}</p>
    </div>
  );
}

function FitConstellation() {
  const [target, setTarget] = useState(theory.fitTargets[0]);
  return (
    <div className="fit-constellation">
      <div className="constellation-map" role="group" aria-label="Fit targets">
        <div className="person-core" aria-hidden="true">P</div>
        {theory.fitTargets.map((item, index) => (
          <button key={item.id} className={`target target-${index} ${target.id === item.id ? "is-active" : ""}`} aria-pressed={target.id === item.id} onClick={() => setTarget(item)}><span>{item.title}</span></button>
        ))}
      </div>
      <div className="target-reading" aria-live="polite"><p className="eyebrow">Selected fit target</p><h3>{target.title}</h3><p>{target.question}</p><blockquote>{target.example}</blockquote></div>
    </div>
  );
}

function TheoryTheatre() {
  return (
    <div className="theatre-strip" role="img" aria-label="The same person moves through four changing work environments; correspondence changes with the job, organisation, group, and supervisor.">
      <svg viewBox="0 0 960 330" aria-hidden="true">
        <path className="sketch-line" d="M28 260 C170 230 230 286 370 250 S620 206 930 260" />
        <path className="sketch-line faint" d="M44 273 C180 246 250 300 392 263 S650 225 920 274" />
        <g className="scene-person"><circle cx="115" cy="130" r="24"/><path d="M115 155v70m-34 64 34-64 42 60m-76-94 34 20 46-30"/></g>
        <g className="scene scene-1"><rect x="222" y="126" width="112" height="92" rx="8"/><path d="M237 165h82M260 126V99h35v27"/><text x="278" y="245">JOB</text></g>
        <g className="scene scene-2"><path d="M390 218V118l63-40 64 40v100z"/><path d="M422 218v-48h62v48"/><text x="453" y="245">ORGANISATION</text></g>
        <g className="scene scene-3"><circle cx="614" cy="137" r="18"/><circle cx="660" cy="112" r="18"/><circle cx="704" cy="143" r="18"/><path d="M614 155v62m46-87v87m44-56v56"/><text x="660" y="245">GROUP</text></g>
        <g className="scene scene-4"><path d="M776 209h120V112H776zM790 127h92v60h-92z"/><circle cx="824" cy="86" r="18"/><path d="M824 104v54"/><text x="836" y="245">SUPERVISOR</text></g>
        <path className="sketch-arrow" d="M147 120c35-32 56-31 75-12M335 91c25-20 37-24 59-16M519 79c36-26 68-21 95-8M722 78c28-24 42-26 66-16" />
      </svg>
      <p className="margin-note">The person is not “a fit” in isolation. The relationship changes as the environment changes.</p>
    </div>
  );
}

function ObserverLens() {
  const [lens, setLens] = useState<"leisure" | "productivity" | "ambiguous">("ambiguous");
  const copy = {
    leisure: { label: "Leisure lens", engagement: "Engagement judged lower", outcome: "Less support / more incivility becomes more plausible in the model", note: "The more consistent negative pattern across studies." },
    productivity: { label: "Productivity lens", engagement: "Engagement penalty is reduced or absent", outcome: "Negative downstream judgments are often prevented", note: "Positive enhancement was not consistent in every study." },
    ambiguous: { label: "Unspecified / ambiguous", engagement: "Purpose remains unresolved", outcome: "The observer has insufficient attributional information", note: "Listening alone is not a deterministic signal." },
  }[lens];

  return (
    <div className={`observer-lens lens-${lens}`}>
      <div className="lens-scene" aria-hidden="true">
        <div className="window-lines" />
        <div className="worker"><span className="head"/><span className="body"/><span className="earbud"/><span className="music-note">♪</span></div>
        <div className="desk"><span/></div>
        <div className="observer"><span className="head"/><span className="body"/><i className="look-line"/></div>
        <div className="thought">{lens === "leisure" ? "passing time?" : lens === "productivity" ? "finding focus?" : "why?"}</div>
      </div>
      <div className="lens-controls" role="group" aria-label="Observer attribution lens">
        {(["leisure", "productivity", "ambiguous"] as const).map((value) => <button key={value} onClick={() => setLens(value)} aria-pressed={lens === value} className={lens === value ? "is-active" : ""}>{value === "leisure" ? "Leisure lens" : value === "productivity" ? "Productivity lens" : "Unspecified"}</button>)}
      </div>
      <ol className="pathway" aria-label="Conceptual pathway">
        <li><small>01</small><span>Music listening</span></li><li><small>02</small><span>{copy.label}</span></li><li><small>03</small><span>{copy.engagement}</span></li><li><small>04</small><span>Performance / withdrawal judged</span></li><li><small>05</small><span>{copy.outcome}</span></li>
      </ol>
      <p className="live-summary" aria-live="polite"><strong>{copy.note}</strong> Explanatory reconstruction of the paper’s model — not a diagnostic tool or deterministic prediction.</p>
    </div>
  );
}

function StudyMap() {
  const [selected, setSelected] = useState<Study>(paper.studies[0]);
  return (
    <div className="study-map">
      <div className="study-rail" role="tablist" aria-label="Three-study evidence map">
        {paper.studies.map((study, index) => <button key={study.id} role="tab" id={`${study.id}-tab`} aria-selected={study.id === selected.id} aria-controls={`${study.id}-panel`} tabIndex={study.id === selected.id ? 0 : -1} onClick={() => setSelected(study)}><span>0{index + 1}</span><b>{study.design}</b><small>{study.sample}</small></button>)}
      </div>
      <article className="study-detail" role="tabpanel" id={`${selected.id}-panel`} aria-labelledby={`${selected.id}-tab`}>
        <div className="study-title"><p className="eyebrow">{selected.location} · {selected.label}</p><h3>{selected.design}</h3><strong>{selected.sample}</strong></div>
        <dl>
          <div><dt>Question</dt><dd>{selected.question}</dd></div><div><dt>Method</dt><dd>{selected.method}</dd></div><div><dt>Role in the argument</dt><dd>{selected.role}</dd></div><div><dt>Principal result</dt><dd>{selected.result}</dd></div><div className="strength"><dt>Strength</dt><dd>{selected.strength}</dd></div><div className="limitation"><dt>Limitation</dt><dd>{selected.limitation}</dd></div>
        </dl>
      </article>
    </div>
  );
}

function PaperTheatre() {
  const scenes = [
    ["01", "A worker puts on earphones."], ["02", "Private purpose stays private."], ["03", "A coworker observes the same cue."], ["04", "Different explanations form."], ["05", "Engagement is judged."], ["06", "Treatment can change."], ["07", "Three studies test the process."],
  ];
  return <div className="storyboard" aria-label="Illustrated seven-step workplace story">{scenes.map(([number, text], index) => <div className={`story-frame frame-${index}`} key={number}><span>{number}</span><div className="story-doodle" aria-hidden="true"><i/><b>{index === 0 ? "♫" : index === 1 ? "?" : index === 2 ? "◉" : index === 3 ? "↯" : index === 4 ? "≈" : index === 5 ? "↔" : "✓"}</b></div><p>{text}</p></div>)}</div>;
}

function Takeaway({ children, caveat }: { children: React.ReactNode; caveat: string }) {
  return <aside className="takeaway"><div><p className="eyebrow">Main takeaway</p><p>{children}</p></div><div className="caveat"><p className="eyebrow">Crucial caveat</p><p>{caveat}</p></div></aside>;
}

function ProvenancePanel({ items }: { items: Provenance[] }) {
  return <div className="provenance-panel">{items.map((item) => <div key={item.kind}><ProvenanceLabel kind={item.kind}>{item.label}</ProvenanceLabel><p>{item.note}</p></div>)}</div>;
}

function TheoryExperience({ concept, depth }: { concept: Concept; depth: Depth }) {
  return (
    <>
      <section className="hero theory-hero" id="overview">
        <div className="hero-index"><span>THEORY / 001</span><span>{concepts.find((c) => c.id === concept)?.name}</span></div>
        <h1>{theory.title}</h1><p className="hero-hook">{theory.hook}</p><p className="one-sentence">{theory.oneSentence}</p>
        {concept === "editorial" && <div className="formula-moment"><span>B</span><i>=</i><b>f(P,E)</b><small>Behaviour emerges in relation</small></div>}
        {concept === "lab" && <FitCalibrator />}
        {concept === "theatre" && <TheoryTheatre />}
        <Takeaway caveat="Correspondence is relational; it is not a fixed virtue or a universal score.">The same person can correspond differently with different environments — and on different dimensions.</Takeaway>
      </section>

      <Visible depth={depth} min="guided">
        <section id="origins" className="content-section origins-section"><SectionHeading number="01" eyebrow="Historical origins" title="No single starting gun" intro={theory.originsNote}/><TheoryTimeline /></section>
        <section id="fit-forms" className="content-section"><SectionHeading number="02" eyebrow="Core processes" title="Two questions, not one generic fit" intro="What the environment asks of a person is different from what it gives a person."/>{concept !== "lab" && <FitCalibrator />}</section>
        <section id="targets" className="content-section"><SectionHeading number="03" eyebrow="Fit targets" title="Fit with what, exactly?" intro="A job, organisation, group, and supervisor are distinct environmental targets."/><FitConstellation /></section>
        <section id="correspondence" className="content-section split-copy"><SectionHeading number="04" eyebrow="Work adjustment" title="Correspondence is ongoing"/><p className="lead-copy">{theory.workAdjustment}</p><div className="dual-outcomes"><div><span>Person’s view</span><b>Satisfaction</b><p>Does the environment supply what the person needs?</p></div><div><span>Environment’s view</span><b>Satisfactoriness</b><p>Do the person’s abilities meet environmental requirements?</p></div></div></section>
        <section id="misreadings" className="content-section caution-section"><SectionHeading number="05" eyebrow="What this does not mean" title="Four tempting shortcuts"/><ol className="oversimplifications">{theory.oversimplifications.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol></section>
      </Visible>
      <Visible depth={depth} min="deep">
        <section id="evidence" className="content-section deep-section"><SectionHeading number="06" eyebrow="Evidence boundary" title="Established here / still requiring evidence"/><div className="evidence-columns"><div><h3>What the provided sources establish</h3><ul><li>Interaction between person and environment as a broad foundation.</li><li>Demands–abilities and needs–supplies as core forms.</li><li>Job, organisation, group, and supervisor as distinct fit targets.</li></ul></div><div><h3>What requires further evidence</h3><ul>{theory.qualifications.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
        <section id="sources" className="content-section sources-section"><SectionHeading number="07" eyebrow="Minimum reading + full sources" title="Follow the intellectual trail"/><div className="reading-list"><div><h3>Minimum reading</h3>{theory.minimumReading.map((source) => <article key={source.citation}><b>{source.citation}</b><p>{source.contribution}</p>{source.doi && <a href={`https://doi.org/${source.doi}`}>DOI {source.doi}</a>}</article>)}</div><div><h3>Full source trail</h3>{theory.fullSources.map((source) => <article key={source.citation}><b>{source.citation}</b><p>{source.contribution}</p></article>)}</div></div><ProvenancePanel items={theory.provenance}/></section>
      </Visible>
    </>
  );
}

function PaperExperience({ concept, depth }: { concept: Concept; depth: Depth }) {
  return (
    <>
      <section className="hero paper-hero" id="overview">
        <div className="hero-index"><span>PAPER / 001</span><span>{paper.citation.journal}</span></div>
        <h1><span>Tuned Out</span><i>or</i><span>Dialed In?</span></h1><p className="hero-hook">{paper.hook}</p><p className="one-sentence">{paper.oneSentence}</p>
        <div className="paper-citation"><b>{paper.citation.authors}</b><span>{paper.citation.year} · DOI {paper.citation.doi}</span></div>
        {concept === "theatre" ? <PaperTheatre /> : <ObserverLens />}
        <Takeaway caveat="Observer judgments may differ from listeners’ actual motives, engagement, and performance.">Music listening is an ambiguous social cue. What observers think it means shapes what follows.</Takeaway>
      </section>

      <Visible depth={depth} min="guided">
        {concept === "theatre" && <section id="lens" className="content-section"><SectionHeading number="01" eyebrow="Paper X-Ray" title="Put the observed behaviour under a lens"/><ObserverLens /></section>}
        <section id="problem" className="content-section feature-opening"><SectionHeading number={concept === "theatre" ? "02" : "01"} eyebrow="Problem" title="Research watched the listener. This paper watches the room."/><p className="lead-copy">Most prior work asks what music does to the person listening. This research asks a different question: <strong>{paper.researchQuestion}</strong></p><div className="listener-observer"><div><span>Inside</span><h3>Listener effects</h3><p>Actual attention, affect, motivation, or performance.</p></div><div className="turn-arrow">→</div><div><span>Across</span><h3>Observer effects</h3><p>Attributions, impressions, judgments, and interpersonal treatment.</p></div></div></section>
        <section id="attribution" className="content-section"><SectionHeading number={concept === "theatre" ? "03" : "02"} eyebrow="Attribution" title="Visible behaviour; invisible purpose" intro={paper.theoreticalFoundation}/><div className="attribution-pair"><div><span>Leisure attribution</span><p>Enjoyment, entertainment, or passing time.</p></div><div><span>Productivity attribution</span><p>Focus, concentration, or productive work.</p></div></div><p className="nuance-note">The two attributions are distinct and are not necessarily mutually exclusive.</p></section>
        <section id="model" className="content-section model-section"><SectionHeading number={concept === "theatre" ? "04" : "03"} eyebrow="Conceptual model" title="From a cue to a social consequence"/><div className="static-pathway">{paper.conceptualModel.map((stage, index) => <div key={stage}><span>0{index + 1}</span><p>{stage}</p></div>)}</div><ProvenanceLabel>Editorial reconstruction based on the cited source.</ProvenanceLabel></section>
        <section id="studies" className="content-section studies-section"><SectionHeading number={concept === "theatre" ? "05" : "04"} eyebrow="Studies" title="Three designs, one cumulative argument" intro="Select a study to inspect its question, role, result, strength, and limitation."/><StudyMap /></section>
        <section id="findings" className="content-section findings-section"><SectionHeading number={concept === "theatre" ? "06" : "05"} eyebrow="Across studies" title="The pattern is conditional, not uniformly negative"/><div className="finding-stack">{paper.crossStudyFindings.map((finding, index) => <article key={finding}><span>F{index + 1}</span><p>{finding}</p></article>)}</div></section>
        <section id="limits" className="content-section caution-section"><SectionHeading number={concept === "theatre" ? "07" : "06"} eyebrow="What the paper does not establish" title="Do not turn a social process into a verdict"/><div className="claim-grid">{paper.claimEvidencePairs.map((pair) => <article key={pair.claim}><span>{pair.status}</span><h3>{pair.claim}</h3><p>{pair.evidence}</p></article>)}</div></section>
      </Visible>
      <Visible depth={depth} min="deep">
        <section id="hypotheses" className="content-section deep-section"><SectionHeading number="08" eyebrow="Hypotheses" title="The tested chain"/><ol className="hypothesis-list">{paper.hypotheses.map((item, index) => <li key={item}><span>H{index + 1}</span><p>{item}</p></li>)}</ol></section>
        <section id="robustness" className="content-section"><SectionHeading number="09" eyebrow="Supplemental + robustness evidence" title="The model was pressed from several sides"/><div className="robustness-cloud">{paper.robustness.map((item) => <span key={item}>{item}</span>)}</div><div className="alternative-list">{paper.alternativeExplanations.map((item) => <p key={item}>{item}</p>)}</div></section>
        <section id="assessment" className="content-section"><SectionHeading number="10" eyebrow="Assessment" title="Strengths, limitations, contributions"/><div className="assessment-grid"><div><h3>Strengths</h3><ul>{paper.strengths.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Limitations</h3><ul>{paper.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Theoretical contributions</h3><ul>{paper.contributions.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Practical implications</h3><ul>{paper.implications.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
        <section id="materials" className="content-section sources-section"><SectionHeading number="11" eyebrow="Open materials + source details" title="Audit the research trail"/><div className="source-banner"><div><p>Published article</p><h3>{paper.citation.authors} ({paper.citation.year})</h3><a href={`https://doi.org/${paper.citation.doi}`}>DOI {paper.citation.doi}</a></div><div><p>Data · code · materials · preregistrations</p><h3>ResearchBox #5962</h3><a href={paper.openMaterials}>Open materials</a></div></div><ProvenancePanel items={paper.provenance}/></section>
      </Visible>
    </>
  );
}

function Contents({ kind }: { kind: PageKind }) {
  const links = kind === "theory" ? [["overview", "In one sentence"], ["origins", "Origins"], ["fit-forms", "Fit forms"], ["targets", "Targets"], ["misreadings", "Misreadings"], ["sources", "Sources"]] : [["overview", "At a glance"], ["problem", "Problem"], ["attribution", "Attribution"], ["model", "Model"], ["studies", "Studies"], ["limits", "Evidence boundary"], ["materials", "Materials"]];
  return <aside className="contents"><p>On this page</p>{links.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside>;
}

export function ContentPage({ kind }: { kind: PageKind }) {
  const { concept, depth, setConcept, setDepth } = useViewSettings();
  return (
    <div className={`concept-page concept-${concept}`} data-depth={depth}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header kind={kind} concept={concept} depth={depth} onConcept={setConcept} onDepth={setDepth}/>
      <Contents kind={kind}/>
      <main id="main-content">{kind === "theory" ? <TheoryExperience concept={concept} depth={depth}/> : <PaperExperience concept={concept} depth={depth}/>}</main>
      <footer><a href="/concept-lab">Compare all concepts</a><span>Concept Lab · evidence before spectacle</span></footer>
    </div>
  );
}

const criteria = ["Academic clarity", "Visual distinctiveness", "Learning engagement", "Theory scalability", "Paper scalability", "Mobile suitability", "Accessibility", "Performance", "Academic credibility"];

export function ConceptLabHome() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [preferred, setPreferred] = useState<Concept | "">("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setRatings(JSON.parse(localStorage.getItem("concept-lab-ratings") || "{}"));
        setPreferred((localStorage.getItem("concept-lab-preferred") || "") as Concept | "");
      } catch { /* local-only preference can fail silently */ }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const rate = (concept: Concept, criterion: string, value: number) => {
    const next = { ...ratings, [`${concept}:${criterion}`]: value };
    setRatings(next); localStorage.setItem("concept-lab-ratings", JSON.stringify(next));
  };
  const prefer = (concept: Concept) => { setPreferred(concept); localStorage.setItem("concept-lab-preferred", concept); };
  const averages = useMemo(() => Object.fromEntries(concepts.map((concept) => {
    const values = criteria.map((criterion) => ratings[`${concept.id}:${criterion}`]).filter(Boolean);
    return [concept.id, values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : "—"];
  })), [ratings]);

  return (
    <div className="lab-home">
      <header className="home-header"><div className="lab-mark"><span>CL</span><strong>Concept Lab</strong></div><p>Academic learning · identity experiment 01</p></header>
      <main>
        <section className="home-hero"><p className="eyebrow">Three directions · one evidence base</p><h1>How should rigorous research <em>feel</em>?</h1><p>Compare three visual languages across the same theory and empirical paper. Art direction changes; academic claims do not.</p><div className="home-links"><a href="/concept-lab/theory/person-environment-fit?concept=editorial">Start with the theory <span>→</span></a><a href="/concept-lab/paper/tuned-out-or-dialed-in?concept=editorial">Start with the paper <span>→</span></a></div></section>
        <section className="concept-previews" aria-labelledby="directions-title"><div className="preview-intro"><p className="eyebrow">The directions</p><h2 id="directions-title">Same evidence.<br/>Three tempos.</h2></div>{concepts.map((concept, index) => <article className={`preview-card preview-${concept.id}`} key={concept.id}><div className="preview-art" aria-hidden="true"><span>{concept.letter}</span><i/><b>{index === 0 ? "B=f(P,E)" : index === 1 ? "P ↔ E" : "same person / new scene"}</b></div><div><p>{concept.short}</p><h3>{concept.name}</h3><p>{index === 0 ? "A calm, asymmetrical long-form reading space where type and chapter rhythm carry the argument." : index === 1 ? "A responsive research instrument where visitors manipulate correspondence and attribution." : "A paper-and-ink story that opens difficult ideas through scenes, then reveals the evidence beneath."}</p><div className="preview-actions"><a href={`/concept-lab/theory/person-environment-fit?concept=${concept.id}`}>Open theory</a><a href={`/concept-lab/paper/tuned-out-or-dialed-in?concept=${concept.id}`}>Open paper</a></div><button className={preferred === concept.id ? "preferred is-active" : "preferred"} onClick={() => prefer(concept.id)} aria-pressed={preferred === concept.id}>{preferred === concept.id ? "★ Preferred direction" : "☆ Mark preferred"}</button></div></article>)}</section>
        <section className="comparison" aria-labelledby="compare-title"><div><p className="eyebrow">Local decision tool</p><h2 id="compare-title">Compare with intent</h2><p>Ratings stay on this device. Use 1 for weak and 5 for exceptional.</p></div><div className="matrix-wrap"><table><thead><tr><th>Criterion</th>{concepts.map((concept) => <th key={concept.id}><span>{concept.letter}</span>{concept.name}<small>avg {averages[concept.id]}</small></th>)}</tr></thead><tbody>{criteria.map((criterion) => <tr key={criterion}><th>{criterion}</th>{concepts.map((concept) => <td key={concept.id}><label><span className="sr-only">Rate {concept.name} for {criterion}</span><select value={ratings[`${concept.id}:${criterion}`] || ""} onChange={(event) => rate(concept.id, criterion, Number(event.target.value))}><option value="">—</option>{[1,2,3,4,5].map((number) => <option key={number} value={number}>{number}</option>)}</select></label></td>)}</tr>)}</tbody></table></div></section>
      </main>
      <footer><p>Built to compare identity before committing to a platform-wide redesign.</p><p>Ratings and preference: localStorage only.</p></footer>
    </div>
  );
}

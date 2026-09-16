"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { gestaltPrinciplesInMusic as record } from "@/content/gestalt-principles-in-music";
import { RECORDS, recordHref } from "@/content/records";
import type { ASACard, AudioEvent, EvidenceXray, Provenance } from "@/content/types";

const content = record.gestalt!;

const LOCAL_COLOURS: Record<string, string> = {
  "var(--teal)": "var(--c-teal)",
  "var(--teal-deep)": "var(--c-teal)",
  "var(--gold-deep)": "var(--c-yellow)",
  "var(--red)": "var(--c-vermilion)",
  "var(--red-deep)": "var(--c-vermilion)",
  "var(--plum-deep)": "var(--c-violet)",
};

function localColour(colour: string) {
  return LOCAL_COLOURS[colour] ?? "var(--c-blue)";
}

function HtmlText({ html, className, tag = "p" }: { html: string; className?: string; tag?: "p" | "span" | "div" | "li" }) {
  const Tag = tag;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function PencilStroke({ d, colour = "var(--c-blue)", width = 5, opacity = 0.86, className = "" }: { d: string; colour?: string; width?: number; opacity?: number; className?: string }) {
  return <path className={className} d={d} fill="none" stroke={colour} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} />;
}

function PencilCircle({ colour = "var(--c-vermilion)", className = "" }: { colour?: string; className?: string }) {
  return (
    <svg className={`pencil-circle ${className}`} viewBox="0 0 160 92" aria-hidden="true">
      <PencilStroke colour={colour} width={3.2} d="M13 46C11 20 47 8 83 9c42 1 65 15 64 38-1 27-38 37-78 36C30 82 15 70 13 46Z" opacity={0.83} />
      <PencilStroke colour={colour} width={1.8} d="M17 48C22 23 50 14 88 15c37 1 57 12 56 31-2 21-33 31-75 31-34 0-50-9-52-29Z" opacity={0.55} />
    </svg>
  );
}

function HeroGroupingFigure() {
  const notes = [
    { x: 74, y: 264, fill: "var(--c-blue)" },
    { x: 137, y: 238, fill: "var(--c-blue)" },
    { x: 200, y: 218, fill: "var(--c-teal)" },
    { x: 263, y: 198, fill: "var(--c-yellow)" },
    { x: 420, y: 168, fill: "var(--c-vermilion)" },
    { x: 483, y: 184, fill: "var(--c-vermilion)" },
    { x: 546, y: 207, fill: "var(--c-violet)" },
    { x: 609, y: 231, fill: "var(--c-violet)" },
  ];

  return (
    <figure className="hero-figure">
      <svg viewBox="0 0 700 470" role="img" aria-labelledby="hero-figure-title hero-figure-desc">
        <title id="hero-figure-title">Two candidate perceptual groups separated by an uncertain middle</title>
        <desc id="hero-figure-desc">Eight events travel along a rising and falling contour. A long white interval sits between event four and event five; layered pencil contours suggest two possible groupings.</desc>
        <path d="M44 320H657" className="diagram-rule" />
        <path d="M61 326c68 31 187 37 261-19 18-14 33-31 48-55" className="diagram-contour diagram-contour-blue" />
        <path d="M398 246c30-27 60-49 97-50 55-1 102 32 158 73" className="diagram-contour diagram-contour-red" />
        <path d="M53 333c88 21 177 24 246-26 29-21 46-44 62-74" className="diagram-contour diagram-contour-blue diagram-contour-light" />
        <path d="M404 256c43-35 66-46 99-44 52 4 91 34 147 78" className="diagram-contour diagram-contour-red diagram-contour-light" />
        {notes.map((note, index) => (
          <g key={`${note.x}-${note.y}`}>
            <line x1={note.x} x2={note.x} y1={note.y + 28} y2={320} className="event-stem" />
            <ellipse cx={note.x - 5} cy={note.y + 27} rx="13" ry="9" transform={`rotate(-18 ${note.x - 5} ${note.y + 27})`} fill={note.fill} className="event-head" />
            <text x={note.x} y="354" textAnchor="middle" className="event-index">{String(index + 1).padStart(2, "0")}</text>
          </g>
        ))}
        <path d="M276 112c26-17 64-22 98-10" className="gap-bracket" />
        <path d="M276 112l8-13m-8 13 14 0m84-10-9-9m9 9-1 14" className="gap-bracket" />
        <text x="329" y="87" textAnchor="middle" className="diagram-hand-note">uncertain middle</text>
        <text x="104" y="407" className="diagram-caption">events become groups</text>
        <text x="463" y="407" className="diagram-caption">the boundary is perceived</text>
        <PencilStroke d="M101 415c49 5 95 5 136 0" colour="var(--c-yellow)" width={7} opacity={0.62} />
        <PencilStroke d="M463 415c59 4 112 4 151-1" colour="var(--c-sky)" width={7} opacity={0.54} />
      </svg>
      <figcaption><span className="mark mark-teaching">▲</span> Original schematic: the gap is a candidate boundary, not a universal answer.</figcaption>
    </figure>
  );
}

function ProvenanceNote({ mark, children }: { mark: string; children: React.ReactNode }) {
  return <p className={`inline-provenance provenance-${mark === "●" ? "source" : mark === "■" ? "finding" : mark === "▲" ? "teaching" : mark === "✦" ? "synthesis" : "open"}`}><span aria-hidden="true">{mark}</span>{children}</p>;
}

function CardRows({ cards }: { cards: ASACard[] }) {
  return (
    <div className="card-rows">
      {cards.map((card) => (
        <article className="card-row" key={card.label} style={{ "--accent": localColour(card.colour) } as CSSProperties}>
          <span className="row-index" aria-hidden="true" />
          <div>
            <h3>{card.label}</h3>
            <HtmlText html={card.body} />
          </div>
        </article>
      ))}
    </div>
  );
}

function EventsSvg({ events, mode, open }: { events: AudioEvent[]; mode: "proximity" | "conflict"; open?: boolean }) {
  const total = Math.max(...events.map((event) => event.start + event.duration), 1);
  const minPitch = Math.min(...events.map((event) => event.pitch));
  const maxPitch = Math.max(...events.map((event) => event.pitch));
  const xFor = (time: number) => 58 + (time / total) * 584;
  const yFor = (pitch: number) => 185 - ((pitch - minPitch) / Math.max(maxPitch - minPitch, 1)) * 76;
  const markerAfter = mode === "proximity" ? (open ? 4 : undefined) : undefined;
  const markerX = markerAfter ? xFor((events[markerAfter - 1].start + events[markerAfter - 1].duration + events[markerAfter].start) / 2) : 0;
  const pitchPath = events.map((event, index) => `${index === 0 ? "M" : "L"}${xFor(event.start)} ${yFor(event.pitch)}`).join(" ");

  return (
    <svg className="events-svg" viewBox="0 0 700 300" role="img" aria-label={mode === "proximity" ? `Eight events shown in time. ${open ? "A longer gap after event four offers a candidate boundary." : "The events keep a regular interval."}` : "The same constructed melody is shown with timing and register cues that can favour different boundaries."}>
      <line x1="44" x2="658" y1="224" y2="224" className="events-baseline" />
      {mode === "conflict" && <path d={pitchPath} className="pitch-trace" />}
      {events.map((event, index) => {
        const x = xFor(event.start);
        const y = mode === "conflict" ? 178 : 158;
        return (
          <g key={`${event.pitch}-${event.start}-${index}`}>
            <line x1={x} x2={x} y1={y + 21} y2="224" className="event-stem" />
            <ellipse cx={x - 4} cy={y + 20} rx="11" ry="8" transform={`rotate(-17 ${x - 4} ${y + 20})`} className={`event-head ${mode === "conflict" && event.pitch > 70 ? "event-head-high" : ""}`} />
            <text x={x} y="256" textAnchor="middle" className="event-index">{String(index + 1).padStart(2, "0")}</text>
          </g>
        );
      })}
      {mode === "proximity" && open && (
        <>
          <line x1={markerX} x2={markerX} y1="59" y2="238" className="candidate-line" />
          <text x={markerX} y="45" textAnchor="middle" className="candidate-label">candidate boundary</text>
          <path d={`M${xFor(events[0].start) - 12} 121c62 39 166 37 ${markerX - 20} 0`} className="group-contour group-contour-blue" />
          <path d={`M${markerX + 20} 121c61 40 125 41 ${xFor(events[7].start) + 8} 0`} className="group-contour group-contour-red" />
        </>
      )}
      {mode === "proximity" && !open && <path d="M44 116c159 43 306 41 516 0" className="group-contour group-contour-blue" />}
      {mode === "conflict" && <>
        <path d={`M46 115c76 33 142 39 ${xFor(events[3].start) - 13} 5`} className="group-contour group-contour-blue" />
        <path d={`M${xFor(events[4].start) + 16} 119c73 31 151 35 238 2`} className="group-contour group-contour-red" />
      </>}
    </svg>
  );
}

function ProximityDemo() {
  const [open, setOpen] = useState(false);
  const regular = content.conflict.presets[1]?.events ?? [];
  const gap = content.opening.presets[0]?.events ?? [];
  return (
    <div className="interactive-study">
      <div className="study-header">
        <div>
          <span className="study-number">01</span>
          <h3>Near · gap · near</h3>
        </div>
        <span className="study-type">constructed teaching example</span>
      </div>
      <EventsSvg events={open ? gap : regular} mode="proximity" open={open} />
      <div className="study-controls" role="group" aria-label="Temporal spacing example">
        <button type="button" aria-pressed={!open} onClick={() => setOpen(false)}>Keep the interval regular</button>
        <button type="button" aria-pressed={open} onClick={() => setOpen(true)}>Open the gap after event 04</button>
      </div>
      <p className="study-state" aria-live="polite">
        <span className="state-mark" aria-hidden="true">{open ? "✦" : "·"}</span>
        {open ? "A longer interval now offers one candidate boundary. The notes themselves did not change." : "With no enlarged interval, the sequence has less temporal pressure toward a boundary."}
      </p>
      <HtmlText html={content.proximity.note} className="study-note" />
    </div>
  );
}

function CueConflictDemo() {
  const [selected, setSelected] = useState(2);
  const preset = content.conflict.presets[selected] ?? content.conflict.presets[0];
  const markerLabels = preset?.markers?.map((marker) => marker.label).join(" and ") ?? "no marked boundary";
  return (
    <div className="conflict-study">
      <div className="conflict-copy">
        <span className="study-number study-number-red">02</span>
        <h3>Two readings<br /><em>at once</em></h3>
        <p>{content.conflict.question}</p>
        <p className="conflict-explanation" aria-live="polite">{preset?.body}</p>
      </div>
      <div className="conflict-visual">
        <EventsSvg events={preset?.events ?? []} mode="conflict" />
        <div className="cue-legend"><span><i className="legend-line legend-blue" /> timing / proximity</span><span><i className="legend-line legend-red" /> register / similarity</span></div>
      </div>
      <div className="study-controls conflict-controls" role="group" aria-label="Cue conflict conditions">
        {content.conflict.presets.map((option, index) => (
          <button key={option.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>
            {option.label}
          </button>
        ))}
      </div>
      <p className="study-state conflict-state" aria-live="polite"><span className="state-mark state-mark-red" aria-hidden="true">{markerLabels.includes("X") ? "X" : "Y"}</span>Candidate {markerLabels}; neither reading is presented as the correct answer.</p>
      <HtmlText html={content.conflict.note} className="study-note" />
    </div>
  );
}

function WholePartFigure() {
  return (
    <figure className="whole-figure">
      <div className="whole-figure-label">same event · another organisation</div>
      {content.whole.cases.map((item) => (
        <div className="whole-row" key={item.label} style={{ "--accent": localColour(item.colour) } as CSSProperties}>
          <span className="whole-row-label">{item.label}</span>
          <div className="whole-sequence" aria-label={`${item.before}, ${item.central}, ${item.after}`}>
            <span>{item.before}</span>
            <strong>{item.central}<PencilCircle colour={localColour(item.colour)} /></strong>
            <span>{item.after}</span>
          </div>
          <p>{item.role}</p>
        </div>
      ))}
      <figcaption><span className="mark mark-synthesis">✦</span> The event is unchanged; its perceptual role is relational.</figcaption>
    </figure>
  );
}

function EvidenceLedger({ evidence }: { evidence: EvidenceXray }) {
  return (
    <article className="evidence-entry">
      <div className="evidence-entry-head">
        <div><span className="evidence-label">{evidence.label}</span><h3>{evidence.title}</h3></div>
        {evidence.doi && <a href={`https://doi.org/${evidence.doi}`} target="_blank" rel="noreferrer">DOI</a>}
      </div>
      <HtmlText html={evidence.citation} className="citation" />
      <div className="evidence-columns">
        {evidence.design && <div><h4>Design</h4><p>{evidence.design}</p></div>}
        <div><h4>{evidence.testedLabel}</h4><p>{evidence.tested}</p></div>
        <div className="finding"><h4>{evidence.foundLabel}</h4><p>{evidence.found}</p></div>
        <div className="not-tested"><h4>Not tested</h4><p>{evidence.notTested}</p></div>
      </div>
    </article>
  );
}

function ScopeBoundary() {
  return (
    <div className="scope-layout">
      <div className="scope-list scope-in">
        <h3>Within the lens</h3>
        <ul>{content.scope.explains.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      <div className="scope-drawing" aria-hidden="true">
        <svg viewBox="0 0 220 270">
          <path d="M111 12C176 14 208 58 202 130c-5 68-43 115-98 123C46 260 12 212 15 137 18 62 51 10 111 12Z" className="scope-contour" />
          <path d="M108 28c46 0 76 39 73 99-3 58-32 98-72 105-46 7-78-33-76-96 2-65 29-106 75-108Z" className="scope-contour scope-contour-light" />
          <text x="110" y="125" textAnchor="middle" className="scope-hand">useful</text>
          <text x="110" y="148" textAnchor="middle" className="scope-hand scope-hand-small">but bounded</text>
        </svg>
      </div>
      <div className="scope-list scope-out">
        <h3>It stops before</h3>
        <ul>{content.scope.stops.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div>
  );
}

function MarkLegend({ provenance }: { provenance: Provenance[] }) {
  return (
    <div className="provenance-ledger">
      {provenance.map((item) => (
        <div className="provenance-row" key={item.glyph}>
          <span className={`provenance-glyph glyph-${item.glyph === "●" ? "source" : item.glyph === "■" ? "finding" : item.glyph === "▲" ? "teaching" : item.glyph === "✦" ? "synthesis" : "open"}`} aria-hidden="true">{item.glyph}</span>
          <h3>{item.label}</h3>
          <p>{item.note}</p>
        </div>
      ))}
    </div>
  );
}

function OriginLineage() {
  const origins = record.origins.slice(0, 5);
  return (
    <div className="lineage-layout">
      <div className="lineage-line" aria-hidden="true">
        {origins.map((origin, index) => <span key={origin.year} className={index === origins.length - 1 ? "lineage-point lineage-point-last" : "lineage-point"} style={{ "--accent": ["var(--c-blue)", "var(--c-teal)", "var(--c-yellow)", "var(--c-vermilion)", "var(--c-violet)"][index] } as CSSProperties}><i>{origin.year}</i></span>)}
      </div>
      <div className="lineage-origins">
        {origins.map((origin) => <div key={origin.year}><strong>{origin.author}</strong><span>{origin.work}</span><p>{origin.contribution}</p></div>)}
      </div>
    </div>
  );
}

function ReferenceList() {
  return (
    <ol className="reference-list">
      {record.minimumReading.map((source, index) => (
        <li key={source.citation}>
          <span className="reference-number">{String(index + 1).padStart(2, "0")}</span>
          <div><HtmlText html={source.citation} /><p>{source.contribution}</p>{source.doi && <a href={`https://doi.org/${source.doi}`} target="_blank" rel="noreferrer">{source.doi}</a>}</div>
        </li>
      ))}
    </ol>
  );
}

export function ChromaticGestaltExploration() {
  const related = useMemo(() => record.relatedTo ?? [], []);

  return (
    <div className="acl-chromatic">
      <header className="chromatic-header">
        <Link className="chromatic-brand" href="/concept-lab"><span className="brand-mark" aria-hidden="true">∿</span><span>Academic Concept Lab</span></Link>
        <p className="exploration-status"><span className="status-dot" aria-hidden="true" /> parallel visual exploration · not production</p>
        <Link className="canonical-link" href={recordHref(record)}>Compare canonical record</Link>
      </header>

      <nav className="chapter-nav" aria-label="Exploration sections">
        <a href="#opening"><span>01</span>Question</a>
        <a href="#organisation"><span>02</span>Organisation</a>
        <a href="#evidence"><span>03</span>Evidence</a>
        <a href="#boundary"><span>04</span>Boundary</a>
        <a href="#trace"><span>05</span>Trace</a>
      </nav>

      <main>
        <section className="chromatic-hero" id="opening">
          <div className="hero-copy">
            <p className="record-meta">Music psychology <span>/</span> perceptual tradition</p>
            <h1>Gestalt<br /><em>Principles</em><br />in Music</h1>
            <p className="hero-question">{record.hook}</p>
            <p className="hero-deck">{record.oneSentence}</p>
            <div className="hero-note"><span aria-hidden="true">?</span><p>Start with the space between events.<br /><em>What changed?</em></p></div>
          </div>
          <HeroGroupingFigure />
          <div className="hero-bottomline"><span>an isolated visual study</span><span>same content · new composition</span></div>
        </section>

        <section className="statement-section quiet-section">
          <div className="section-marker"><span>read first</span><i aria-hidden="true">01</i></div>
          <div className="statement-copy">
            <p className="lede-large">{content.problem.lede}</p>
            <ProvenanceNote mark="●">Wertheimer’s grouping problem is the source-grounded starting point. The arrangements below are teaching reconstructions.</ProvenanceNote>
          </div>
          <CardRows cards={content.problem.cards} />
        </section>

        <section className="whole-section" id="organisation">
          <div className="section-marker marker-yellow"><span>the central distinction</span><i aria-hidden="true">02</i></div>
          <div className="whole-copy">
            <h2>The whole changes<br /><em>the role of the part.</em></h2>
            <p>{content.whole.lede}</p>
          </div>
          <WholePartFigure />
          <HtmlText html={content.whole.note} className="section-note" />
        </section>

        <section className="proximity-section">
          <div className="section-marker marker-blue"><span>make the cue move</span><i aria-hidden="true">03</i></div>
          <div className="section-intro split-intro">
            <div><h2>Proximity is<br /><em>a tendency.</em></h2></div>
            <p>{content.proximity.lede}</p>
          </div>
          <ProximityDemo />
        </section>

        <section className="similarity-section quiet-section">
          <div className="section-marker marker-green"><span>not just pitch</span><i aria-hidden="true">04</i></div>
          <div className="similarity-layout">
            <div><h2>Like with like<br /><em>can still compete.</em></h2><p>{content.similarity.lede}</p></div>
            <CardRows cards={content.similarity.cards} />
          </div>
          <ProvenanceNote mark="✦">Concept Lab synthesis: similarity is kept open as a family of possible relations, so the page does not make one cue look like the entire theory.</ProvenanceNote>
        </section>

        <section className="conflict-section">
          <div className="section-marker marker-red"><span>the pressure point</span><i aria-hidden="true">05</i></div>
          <div className="section-intro conflict-intro"><h2>No cue acts alone.</h2><p>{content.conflict.lede}</p></div>
          <CueConflictDemo />
        </section>

        <section className="evidence-section" id="evidence">
          <div className="section-marker marker-violet"><span>quiet scholarship</span><i aria-hidden="true">06</i></div>
          <div className="evidence-intro"><h2>Evidence<br /><em>keeps its edges.</em></h2><p>Later studies can test formal grouping predictions. They do not retroactively prove a complete classical Gestalt law book.</p></div>
          <div className="evidence-ledger">
            <EvidenceLedger evidence={content.deliege.evidence} />
            <EvidenceLedger evidence={content.frankland.evidence} />
          </div>
          <ProvenanceNote mark="■">These are bounded summaries of later GTTM grouping-rule tests. The evidence is not presented as direct validation of classical Gestalt psychology.</ProvenanceNote>
        </section>

        <section className="scope-section" id="boundary">
          <div className="section-marker marker-teal"><span>keep the boundary visible</span><i aria-hidden="true">07</i></div>
          <div className="scope-intro"><h2>Useful<br /><em>but bounded.</em></h2><p>{content.scope.lede}</p></div>
          <ScopeBoundary />
          <HtmlText html={content.scope.note} className="section-note" />
        </section>

        <section className="lineage-section quiet-section">
          <div className="section-marker marker-orange"><span>historical layers</span><i aria-hidden="true">08</i></div>
          <div className="lineage-intro"><h2>Not one theory<br /><em>becoming final.</em></h2><p>{content.lineage.lede}</p></div>
          <OriginLineage />
          <div className="lineage-branches">
            {content.lineage.nodes.map((node) => <article key={node.label} style={{ "--accent": localColour(node.colour) } as CSSProperties}><span>{node.label}</span><HtmlText html={node.body} /></article>)}
          </div>
          <HtmlText html={content.lineage.note} className="section-note" />
        </section>

        <section className="trace-section" id="trace">
          <div className="section-marker marker-graphite"><span>scholarly apparatus</span><i aria-hidden="true">09</i></div>
          <div className="trace-intro"><h2>Where every claim<br /><em>came from.</em></h2><p>Colour can help a reader move through a page, but it cannot carry provenance alone. The mark is always written out.</p></div>
          <MarkLegend provenance={record.provenance} />
        </section>

        <section className="references-section quiet-section">
          <div className="section-marker marker-yellow"><span>if you read six things</span><i aria-hidden="true">10</i></div>
          <div className="references-intro"><h2>References<br /><em>as a landing.</em></h2><p>These sources anchor the historical, theoretical, and empirical claims on the record.</p></div>
          <ReferenceList />
        </section>

        <section className="related-section">
          <div className="section-marker marker-blue"><span>ideas in conversation</span><i aria-hidden="true">11</i></div>
          <div className="related-head"><h2>One lens<br /><em>among others.</em></h2><p>{record.relatedToLede}</p></div>
          <div className="related-list">
            {related.map((relation) => {
              const target = RECORDS.find((candidate) => candidate.id === relation.recordId);
              if (!target) return null;
              return <Link href={recordHref(target)} key={relation.recordId} className="related-item"><span>{relation.relation}</span><strong>{target.title}</strong><p>{relation.body}</p></Link>;
            })}
          </div>
        </section>
      </main>

      <footer className="chromatic-footer">
        <div><span className="footer-brand">Academic Concept Lab</span><p>Chromatic Scholarly Sketch · isolated visual exploration · September 2026</p></div>
        <Link href="/concept-lab/theory/gestalt-principles-in-music">View the canonical record</Link>
      </footer>
    </div>
  );
}

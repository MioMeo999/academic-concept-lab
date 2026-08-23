"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import type { ASACard, NarmourCandidate, NarmourRecordContent, Source, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { AudioExample } from "./AudioExample";
import { EvidenceXray } from "./TheoryPatterns";
import { Bullet, Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function Mark({ children }: { children: string }) {
  return <span className="narmour-mark" aria-hidden="true">{children}</span>;
}

function Note({ glyph, children }: { glyph: string; children: string }) {
  return <p className="narmour-note"><Mark>{glyph}</Mark> {children}</p>;
}

function Cards({ items }: { items: ASACard[] }) {
  return <div className="narmour-card-grid">{items.map((item, index) => <article className={`narmour-card sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ "--narmour-colour": item.colour } as CSSProperties} key={item.label}><span className="k">{item.label}</span><Rich className="read" as="p" html={item.body} /></article>)}</div>;
}

function List({ items, colour = "var(--teal)" }: { items: string[]; colour?: string }) {
  return <ul className="narmour-list">{items.map((item) => <li key={item} style={{ "--narmour-colour": colour } as CSSProperties}><span aria-hidden="true">→</span><Rich as="span" html={item} /></li>)}</ul>;
}

function SourceList({ items }: { items: Source[] }) {
  return <>{items.map((source, index) => <div className="src-item" key={`${source.citation}-${index}`}><span className="n">{index + 1}</span><div><Rich className="c" as="div" html={source.citation} /><div className="w">{source.contribution}</div>{source.doi && <div className="doi">doi {source.doi}</div>}</div></div>)}</>;
}

function noteName(pitch: number) {
  const names = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  return `${names[pitch % 12]}${Math.floor(pitch / 12) - 1}`;
}

function PitchRelationVisual({ candidate }: { candidate: NarmourCandidate }) {
  const intervals = candidate.events.slice(0, -1).map((event, index) => {
    const next = candidate.events[index + 1];
    const distance = Math.abs(next.pitch - event.pitch);
    const direction = next.pitch > event.pitch ? "up" : next.pitch < event.pitch ? "down" : "same";
    return { distance, direction };
  });
  const notes = candidate.events.map((event, index) => ({ name: noteName(event.pitch), index }));
  return (
    <div className="narmour-pitch-visual" role="img" aria-label={`${notes.map((note) => note.name).join(" to ")}; physical movement ${candidate.physicalMovement}; interval sizes ${candidate.intervalSizes}.`}>
      <div className="narmour-pitch-nodes">
        {notes.map((note, index) => (
          <span className="narmour-pitch-node" key={`${note.name}-${note.index}`}>
            <b>{note.name}</b>
            <small>tone {index + 1}</small>
          </span>
        ))}
      </div>
      <div className="narmour-pitch-connectors" aria-hidden="true">
        {intervals.map((interval, index) => <span className="narmour-pitch-connector" key={`${interval.distance}-${index}`}><b>→</b><small>{interval.distance} st · {interval.direction}</small></span>)}
      </div>
      <p className="narmour-text-fallback"><b>Read the contour:</b> {notes.map((note) => note.name).join(" → ")} · {candidate.physicalMovement} · {candidate.intervalSizes}.</p>
    </div>
  );
}

function RelationRows({ candidate }: { candidate: NarmourCandidate }) {
  return <div className="narmour-relation-list" aria-label="Relations in this continuation">{candidate.relations.map((relation) => <div className="narmour-relation-row" data-status={relation.status} key={relation.label}><div><span className="k">{relation.label}</span><strong>{relation.status}</strong></div><p>{relation.detail}</p></div>)}</div>;
}

function ImplicationCompare({ data }: { data: NarmourRecordContent }) {
  const [familyIndex, setFamilyIndex] = useState(0);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const family = data.families[familyIndex];
  const candidate = family.candidates[candidateIndex] ?? family.candidates[0];

  return (
    <div className="narmour-interaction">
      <div className="narmour-interaction-header">
        <div><span className="k">CONTROLLED COMPARISON</span><h3>Which continuation feels more strongly implied?</h3></div>
        <span className="narmour-interaction-tag">no correct note</span>
      </div>
      <div className="narmour-family-buttons" role="group" aria-label="Choose the fixed implicative interval">
        {data.families.map((item, index) => <button type="button" key={item.label} aria-pressed={index === familyIndex} onClick={() => { setFamilyIndex(index); setCandidateIndex(0); }}>{item.label}</button>)}
      </div>
      <p className="narmour-stimulus-copy"><b>{family.interval}</b> · {family.body}</p>
      <div className="narmour-candidate-buttons" role="group" aria-label={`Choose a continuation after ${family.interval}`}>
        {family.candidates.map((item, index) => <button type="button" key={item.label} aria-pressed={index === candidateIndex} onClick={() => setCandidateIndex(index)}>{item.label}</button>)}
      </div>
      <AudioExample key={`${family.label}-${candidate.label}`} label={candidate.label} events={candidate.events} description={candidate.body} colour={candidate.colour} />
      <PitchRelationVisual candidate={candidate} />
      <div className="narmour-analysis-grid">
        <div><span className="k">PHYSICAL MOVEMENT</span><strong>{candidate.physicalMovement}</strong><p>What the melody actually does.</p></div>
        <div><span className="k">INTERVAL SIZES</span><strong>{candidate.intervalSizes}</strong><p>Compare the implicative and realised intervals.</p></div>
      </div>
      <RelationRows candidate={candidate} />
      <details className="narmour-static-fallback" open>
        <summary>Read the fixed stimulus and audio specification</summary>
        <p><b>Pitch mapping:</b> equal-tempered MIDI at A4 = 440 Hz: C4 = 60 / 261.63 Hz, D4 = 62 / 293.66 Hz, E4 = 64 / 329.63 Hz, F4 = 65 / 349.23 Hz, G4 = 67 / 392.00 Hz, A4 = 69 / 440.00 Hz.</p>
        <p><b>Held constant:</b> triangle timbre · 0.12 gain · 420 ms tone duration · 600 ms onset-to-onset IOI · C4-centred register where possible · no harmony or probe-timing manipulation.</p>
        <p><b>Manipulated variable:</b> the candidate third tone after a fixed two-tone interval. The relation panel identifies which tendency each candidate tests; physical movement is kept separate from registral-direction fulfilment.</p>
      </details>
    </div>
  );
}

function RealisationMatrix({ data }: { data: NarmourRecordContent }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selected = data.matrix.candidates[selectedIndex] ?? data.matrix.candidates[0];
  const relationFor = (candidate: NarmourCandidate, label: string) => candidate.relations.find((relation) => relation.label === label);
  const columns = ["REGISTRAL-DIRECTION IMPLICATION", "INTERVALLIC-DIFFERENCE IMPLICATION", "REGISTRAL RETURN", "PROXIMITY"];

  return (
    <div className="narmour-matrix-wrap">
      <div className="narmour-candidate-buttons" role="group" aria-label="Choose a continuation to hear in the realization matrix">
        {data.matrix.candidates.map((candidate, index) => <button type="button" key={candidate.label} aria-pressed={index === selectedIndex} onClick={() => setSelectedIndex(index)}>{candidate.label}</button>)}
      </div>
      <AudioExample key={selected.label} label={`Fixed C4 → G4 · ${selected.label}`} events={selected.events} description={selected.body} colour={selected.colour} />
      <div className="narmour-matrix" role="table" aria-label="Realization and denial matrix for continuations after C4 to G4">
        <div className="narmour-matrix-row narmour-matrix-head" role="row">
          <span role="columnheader">CONTINUATION</span><span role="columnheader">PHYSICAL MOVEMENT</span>{columns.map((column) => <span role="columnheader" key={column}>{column}</span>)}
        </div>
        {data.matrix.candidates.map((candidate) => <div className={`narmour-matrix-row ${candidate.label === selected.label ? "selected" : ""}`} role="row" key={candidate.label}>
          <div role="cell" data-label="CONTINUATION"><b>{candidate.label}</b><small>{candidate.intervalSizes}</small></div>
          <div role="cell" data-label="PHYSICAL MOVEMENT"><strong>{candidate.physicalMovement}</strong><small>what happens</small></div>
          {columns.map((column) => {
            const relation = relationFor(candidate, column);
            return relation ? <div role="cell" data-label={column} key={column}><span className="narmour-status" data-status={relation.status}><b>{relation.status}</b><small>{relation.detail}</small></span></div> : <div role="cell" data-label={column} key={column}>—</div>;
          })}
        </div>)}
      </div>
      <div className="narmour-closure-boundary"><span className="k">CLOSURE · SEPARATE QUALITATIVE RELATION</span><p>Closure is not scored as a table row here. Direction change and relatively smaller realised motion can affect closure, but this record does not claim an exact closure classification for these synthetic examples.</p></div>
      <Note glyph="▲">{data.matrix.note}</Note>
    </div>
  );
}

function SystemVisual() {
  return <div className="narmour-system-map" role="img" aria-label="A branched expectation model: local bottom-up relations and learned top-down style converge on multiple melodic implications, with possible conflict within or between systems."><div className="narmour-system-source">melodic surface + listener context</div><div className="narmour-system-branches"><div><b>bottom-up</b><small>local interval relations</small></div><div><b>top-down</b><small>style · schema · tonality</small></div></div><div className="narmour-system-join" aria-hidden="true">↘ &nbsp; ↙</div><div className="narmour-system-convergence"><b>multiple implications</b><small>not one chronological pipeline</small></div><div className="narmour-system-conflict">↔ conflict can occur within or between systems</div></div>;
}

function LoopVisual() {
  return <div className="narmour-loop" role="img" aria-label="Implication loop: interval, implication, realization or denial, new context, and new implication."><div><b>interval</b><small>A → B</small></div><span aria-hidden="true">→</span><div><b>implication</b><small>what may follow?</small></div><span aria-hidden="true">→</span><div><b>realise / deny</b><small>B → C</small></div><span aria-hidden="true">→</span><div><b>new context</b><small>C becomes the next starting point</small></div><strong className="narmour-loop-return" aria-hidden="true">↺</strong><p>new context → new implication</p></div>;
}

function FinalModel() {
  return <div className="narmour-final-model" role="img" aria-label="Branched I-R model: melodic surface and learned context feed bottom-up and top-down systems, which converge on multiple implications; the next event may realize, partially realize, or deny them, creating a new context and new implications. Closure is a relation that can weaken or terminate an active implication, not a downstream outcome node."><div className="narmour-final-surface">melodic surface + learned context</div><div className="narmour-final-branches"><div><b>bottom-up</b><small>local interval relations</small></div><div><b>top-down</b><small>style and schematic knowledge</small></div></div><div className="narmour-final-join" aria-hidden="true">↘ &nbsp; ↙</div><div className="narmour-final-node">multiple simultaneous implications<small>direction · size · proximity · return · closure · style</small></div><div className="narmour-final-arrow" aria-hidden="true">↓</div><div className="narmour-final-node red">next melodic event<small>realise · partially realise · deny</small></div><div className="narmour-final-arrow" aria-hidden="true">↓</div><div className="narmour-final-context">new context ↺ new implication</div><aside><b>closure</b> can weaken or terminate an active implication; it is not a final outcome node.</aside></div>;
}

export function NarmourBody({ record: r }: { record: TheoryRecord }) {
  const data = r.narmour;
  if (!data) return null;
  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "Continue — or reverse?", "Continue — or reverse?", "var(--red)", <><Rich className="lede" as="p" html={data.opening.lede} /><div className="narmour-identity"><div><span className="k">KNOWLEDGE FORM</span><p>{data.identity.knowledgeForm}</p></div><div><span className="k">STATUS</span><p>{data.identity.status}</p></div><div><span className="k">DISCIPLINE</span><p>{data.identity.discipline}</p></div><div><span className="k">ATLAS BRANCH</span><p>{data.identity.branch}</p></div></div><p className="narmour-question">{data.opening.question}</p><Note glyph="?">{data.opening.note}</Note><ImplicationCompare data={data} /><Note glyph="▲">{data.analysisNote}</Note></>);
  add("twoNotes", "Two notes can point forward", "Two notes can point forward", "var(--teal)", <><Rich className="lede" as="p" html={data.twoNotes.lede} /><Cards items={data.twoNotes.cards} /><PitchRelationVisual candidate={{ ...data.families[0].candidates[0], label: "A → B → C" }} /><Note glyph="■">{data.twoNotes.note}</Note></>);
  add("thirdNote", "The third note answers", "The third note answers", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.thirdNote.lede} /><PitchRelationVisual candidate={data.families[0].candidates[0]} /><Cards items={data.thirdNote.cards} /><Note glyph="■">{data.thirdNote.note}</Note></>);
  add("implications", "One interval, several implications", "One interval, several implications", "var(--teal)", <><Rich className="lede" as="p" html={data.implications.lede} /><Cards items={data.implications.cards} /><Note glyph="✦">{data.implications.note}</Note></>);
  add("small", "Small moves tend to continue", "Small moves tend to continue", "var(--teal)", <><Rich className="lede" as="p" html={data.small.lede} /><Cards items={data.small.cards} /><Note glyph="?">{data.small.note}</Note></>);
  add("large", "Big leaps often turn back", "Big leaps often turn back", "var(--red)", <><Rich className="lede" as="p" html={data.large.lede} /><Cards items={data.large.cards} /><Note glyph="?">{data.large.note}</Note></>);
  add("testable", "How researchers made I–R testable", "How researchers made I–R testable", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.testable.lede} /><Cards items={data.testable.cards} /><Note glyph="■">{data.testable.note}</Note></>);
  add("moreThanDirection", "More than direction", "More than direction", "var(--teal)", <><Rich className="lede" as="p" html={data.moreThanDirection.lede} /><Cards items={data.moreThanDirection.cards} /><Note glyph="?">{data.moreThanDirection.note}</Note></>);
  add("realiseDeny", "Realise some · deny others", "Realise some · deny others", "var(--red)", <><Rich className="lede" as="p" html={data.realiseDeny.lede} /><p className="narmour-question">{data.realiseDeny.question}</p><RealisationMatrix data={data} /><Note glyph="▲">{data.realiseDeny.note}</Note></>);
  add("process", "Process and reversal", "Process and reversal", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.process.lede} /><Cards items={data.process.cards} /><Note glyph="■">{data.process.note}</Note></>);
  add("systems", "Two sources of expectation", "Two sources of expectation", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.systems.lede} /><SystemVisual /><Cards items={data.systems.cards} /><Note glyph="●">{data.systems.note}</Note></>);
  add("loop", "Expectation keeps moving", "Expectation keeps moving", "var(--teal)", <><Rich className="lede" as="p" html={data.loop.lede} /><LoopVisual /><Note glyph="✦">{data.loop.note}</Note></>);
  add("cuddy", "Can we test the principles?", "Can we test the principles?", "var(--red)", <><Rich className="lede" as="p" html={data.cuddy.lede} /><EvidenceXray items={[data.cuddy.evidence]} /><Note glyph="■">{data.cuddy.note}</Note></>);
  add("schellenberg96", "Do we need all five?", "Do we need all five?", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.schellenberg96.lede} /><EvidenceXray items={[data.schellenberg96.evidence]} /><Note glyph="■">{data.schellenberg96.note}</Note></>);
  add("schellenberg97", "A simpler empirical model", "A simpler empirical model", "var(--teal)", <><Rich className="lede" as="p" html={data.schellenberg97.lede} /><EvidenceXray items={[data.schellenberg97.evidence]} /><Note glyph="■">{data.schellenberg97.note}</Note></>);
  add("development", "Do these expectations develop?", "Do these expectations develop?", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.development.lede} /><EvidenceXray items={[data.development.evidence]} /><Note glyph="■">{data.development.note}</Note></>);
  add("styleLearning", "Where does style enter?", "Where does style enter?", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.styleLearning.lede} /><Cards items={data.styleLearning.cards} /><Note glyph="?">{data.styleLearning.note}</Note></>);
  add("scope", "What I–R explains — and where it stops", "What I–R explains — and where it stops", "var(--teal)", <><Rich className="lede" as="p" html={data.scope.lede} /><FinalModel /><Note glyph="✦">{data.finalModelNote}</Note><div className="narmour-scope-grid"><div className="sk-box teal"><p className="k">I–R helps explain</p><List items={data.scope.explains} /></div><div className="sk-box red"><p className="k">Where I–R stops</p><List items={data.scope.stops} colour="var(--red)" /></div></div><Note glyph="?">{data.scope.note}</Note></>);
  add("trail", "The intellectual / evidence trail", "The intellectual / evidence trail", "var(--teal)", <><Rich className="lede" as="p" html={r.trailLede} /><div className="trail">{r.origins.map((origin) => <div className="trail-item" key={`${origin.year}-${origin.author}`}><span className="trail-year">{origin.year}</span><div><Rich as="h3" html={origin.author} /><Rich className="work" as="span" html={origin.work} /><Rich as="p" html={origin.contribution} /></div></div>)}</div></>);
  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", <><Rich className="lede" as="p" html={r.oversimplificationsLede} /><div className="grid2 narmour-misconception-grid">{r.oversimplifications.map((item, index) => <div className={index % 2 ? "tilt-r2" : "tilt-l2"} key={item}><Cloud colour="#E24E1B"><div className="narmour-cloud-row"><Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} /><Rich className="read" as="p" html={item} /></div></Cloud></div>)}</div></>);
  add("qualifications", "Still open", "Still open", "var(--teal)", <div className="narmour-scope-list">{r.qualifications.map((item) => <Bullet key={item} icon="i-q" colour="var(--teal)" html={item} />)}</div>);
  const minimumCitations = new Set(r.minimumReading.map((source) => source.citation));
  add("sources", "Sources", "Sources", "var(--teal)", <><div className="sk-box tilt-l2 narmour-source-box"><div className="narmour-source-heading"><Icon id="i-book" style={{ width: 26, height: 26, color: "var(--red)" }} /><h3>{r.minimumReadingLabel ?? "If you read five things"}</h3></div><SourceList items={r.minimumReading} /></div><div className="narmour-more-sources"><span className="k">the rest of the trail</span><SourceList items={r.fullSources.filter((source) => !minimumCitations.has(source.citation))} /></div></>);
  const related = (r.relatedTo ?? []).map((link) => ({ link, target: RECORDS.find((record) => record.id === link.recordId) })).filter((item) => item.target);
  if (related.length) add("related", "Related records", "Related records", "var(--teal)", <><p className="lede">These records sit beside I–R Theory without becoming interchangeable.</p>{related.map(({ link, target }) => { const kind = KIND[target!.kind]; return <a className="rel-card" href={recordHref(target!)} key={link.recordId}><span className="rel-relation">this record {link.relation}</span><span className="rel-title">{target!.title}</span><span className="rel-hook">{target!.hook}</span><Rich className="rel-body read" as="span" html={link.body} /><span className="rel-go" style={{ color: kind.colour }}>{kind.cta} →</span></a>; })}</>);
  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", <div className="prov narmour-provenance">{r.provenance.map((item) => <div className="prov-item" key={item.label} data-reveal="rise"><span className="g" style={{ color: item.colour }}>{item.glyph}</span><div><h4>{item.label}</h4><p>{item.note}</p></div></div>)}</div>);

  const toc = blocks.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`] as [string, string, string]);
  return <RecordShell record={r} toc={toc}>{blocks.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}

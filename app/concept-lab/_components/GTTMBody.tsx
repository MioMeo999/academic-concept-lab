"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import type { ASACard, GTTMLens, GTTMRecordContent, GTTMTreeNode, Source, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { AudioExample } from "./AudioExample";
import { EvidenceXray } from "./TheoryPatterns";
import { Bullet, Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function Mark({ children }: { children: string }) {
  return <span className="gttm-mark" aria-hidden="true">{children}</span>;
}

function Note({ glyph, children }: { glyph: string; children: string }) {
  return <p className="gttm-note"><Mark>{glyph}</Mark> {children}</p>;
}

function Cards({ items }: { items: ASACard[] }) {
  return <div className="gttm-card-grid">{items.map((item, index) => <article className={`gttm-card sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ "--gttm-colour": item.colour } as CSSProperties} key={item.label}><span className="k">{item.label}</span><Rich className="read" as="p" html={item.body} /></article>)}</div>;
}

function List({ items, colour = "var(--teal)" }: { items: string[]; colour?: string }) {
  return <ul className="gttm-list">{items.map((item) => <li key={item} style={{ "--gttm-colour": colour } as CSSProperties}><span aria-hidden="true">→</span><Rich as="span" html={item} /></li>)}</ul>;
}

function SurfaceCells({ events, included, heads = [] }: { events: GTTMRecordContent["analysis"]["surface"]["events"]; included?: number[]; heads?: number[] }) {
  return <div className="gttm-surface-cells" aria-hidden="true">{events.map((event) => <span className={`${included && !included.includes(event.id) ? "muted" : ""} ${heads.includes(event.id) ? "head" : ""}`} key={event.id}><b>{event.note}</b><small>{event.id}</small></span>)}</div>;
}

function GroupingVisual({ events }: { events: GTTMRecordContent["analysis"]["surface"]["events"] }) {
  return <div className="gttm-grouping-visual" role="img" aria-label="Sixteen events grouped into four local groups of four, then two larger groups of eight and one whole phrase.">
    <SurfaceCells events={events} />
    <div className="gttm-bracket-row">{["events 1–4", "events 5–8", "events 9–12", "events 13–16"].map((label) => <span key={label}>{label}</span>)}</div>
    <div className="gttm-grouping-higher"><span>events 1–8</span><span>events 9–16</span><strong>events 1–16 · whole phrase</strong></div>
    <p className="gttm-text-fallback">Local groups: 1–4 · 5–8 · 9–12 · 13–16. Higher groups: 1–8 · 9–16 · 1–16.</p>
  </div>;
}

function MeterVisual({ events }: { events: GTTMRecordContent["analysis"]["surface"]["events"] }) {
  return <div className="gttm-meter-visual" role="img" aria-label="Metrical hierarchy with stronger positions at the beginnings of four bars, nested within beat and phrase levels.">
    <div className="gttm-meter-labels"><span>phrase</span><span>bar</span><span>beat</span></div>
    <div className="gttm-meter-rows"><div className="phrase"><i /><i /><i /><i /></div><div className="bar">{events.map((event) => <i className={event.id % 4 === 1 ? "strong" : ""} key={event.id} />)}</div><div className="beat">{events.map((event) => <i className={event.id % 2 === 1 ? "medium" : ""} key={event.id} />)}</div></div>
    <p className="gttm-text-fallback">Bar starts: events 1, 5, 9, 13. Meter gives temporal strength; it does not mean those events are louder.</p>
  </div>;
}

function LensVisual({ lens, data }: { lens: GTTMLens; data: GTTMRecordContent["analysis"] }) {
  if (lens.key === "group") return <GroupingVisual events={data.surface.events} />;
  if (lens.key === "meter") return <MeterVisual events={data.surface.events} />;
  if (lens.key === "importance") return <div className="gttm-importance-visual" role="img" aria-label="Time-span heads select events 1, 5, 9, 13, and 16 as representative events for nested spans."><SurfaceCells events={data.surface.events} heads={[1, 5, 9, 13, 16]} /><div className="gttm-importance-lines"><span>bar 1 → 1 C</span><span>bar 2 → 5 F</span><span>bar 3 → 9 G</span><span>bar 4 → 16 C</span></div><p className="gttm-text-fallback">Heads are a proposed time-span representation: 1, 5, 9, 13, 16. Other analyses remain possible.</p></div>;
  return <div className="gttm-relation-visual" role="img" aria-label="Prolongational relation map showing I progressing to IV, then V, then I, with local elaborations inside each region."><div className="gttm-relation-path"><span>I<br /><small>events 1–4</small></span><b aria-hidden="true">→</b><span>IV<br /><small>events 5–8</small></span><b aria-hidden="true">→</b><span>V<br /><small>events 9–12</small></span><b aria-hidden="true">→</b><span>I<br /><small>events 13–16</small></span></div><p className="gttm-text-fallback">Local elaboration is represented inside each region; progression connects I → IV → V → I.</p></div>;
}

function OneSurfaceFourStructures({ data }: { data: GTTMRecordContent }) {
  const [selected, setSelected] = useState<"group" | "meter" | "importance" | "relation">("group");
  const lens = data.opening.lenses.find((item) => item.key === selected) ?? data.opening.lenses[0];
  return <div className="gttm-four-structures">
    <AudioExample label="Fixed surface · sixteen-note phrase" events={data.analysis.surface.events} description="C4–E4–G4–E4 | F4–A4–G4–F4 | G4–B4–A4–G4 | E4–D4–C4–C4. The same audio stays fixed while the representation changes." colour="var(--teal)" />
    <div className="gttm-lens-buttons" role="group" aria-label="Choose a GTTM structural lens">{data.opening.lenses.map((item) => <button key={item.key} type="button" aria-pressed={item.key === selected} onClick={() => setSelected(item.key)}>{item.label}</button>)}</div>
    <div className="gttm-lens-result" style={{ "--gttm-colour": lens.colour } as CSSProperties} aria-live="polite"><div><span className="k">{lens.label}</span><strong>{lens.question}</strong></div><LensVisual lens={lens} data={data.analysis} /></div>
    <details className="gttm-static-fallback"><summary>Read the fixed surface and all four questions</summary><p><b>Surface:</b> C major · 4/4 · 96 BPM · triangle tones · constant gain.</p>{data.opening.lenses.map((item) => <p key={item.key}><b>{item.label}:</b> {item.question}</p>)}</details>
    <Note glyph="▲">{data.opening.note}</Note>
  </div>;
}

function TreeVisual({ title, root }: { title: string; root: GTTMTreeNode }) {
  const render = (node: GTTMTreeNode, depth = 0): ReactNode => <li key={`${node.label}-${depth}`}><div className="gttm-tree-node"><strong>{node.label}</strong>{node.relation && <span>{node.relation}</span>}{node.sub && <small>{node.sub}</small>}</div>{node.children && <ul>{node.children.map((child) => render(child, depth + 1))}</ul>}</li>;
  return <div className="gttm-tree" role="img" aria-label={`${title}: ${root.label}. ${root.children?.map((child) => child.label).join("; ") ?? ""}`}><p className="k">{title}</p><ul>{render(root)}</ul><details className="gttm-static-fallback"><summary>Read this structure as text</summary><p>{root.label} {root.sub ? `(${root.sub})` : ""}. {root.children?.map((child) => `${child.label}${child.sub ? ` (${child.sub})` : ""}`).join("; ")}</p></details></div>;
}

function ReductionLevels({ data }: { data: GTTMRecordContent }) {
  const [selected, setSelected] = useState(0);
  const current = data.analysis.reductions[selected] ?? data.analysis.reductions[0];
  const events = data.analysis.surface.events.filter((event) => current.included.includes(event.id));
  return <div className="gttm-reduction">
    <div className="gttm-reduction-buttons" role="group" aria-label="Choose a reduction level">{data.analysis.reductions.map((state, index) => <button type="button" key={state.label} aria-pressed={index === selected} onClick={() => setSelected(index)}>{state.label}</button>)}</div>
    <div className="gttm-reduction-state" aria-live="polite"><span className="k">{current.label}</span><Rich as="p" className="read" html={current.body} /><AudioExample key={current.label} label={`${current.label} · selected events ${current.included.join(", ")}`} events={events} description="A pedagogical sonification of the selected representative events; the original surface remains the same sixteen-note phrase." colour={selected > 1 ? "var(--plum-deep)" : "var(--red)"} /></div>
    <details className="gttm-static-fallback" open><summary>Read all four reduction levels</summary>{data.analysis.reductions.map((state) => <p key={state.label}><b>{state.label}:</b> {state.body}</p>)}</details>
    <Note glyph="▲">{data.reduction.note}</Note>
  </div>;
}

function FinalModel({ data }: { data: GTTMRecordContent }) {
  return <div className="gttm-final-model" role="img" aria-label="A branched GTTM architecture: a tonal surface supports grouping and meter; these interact with time-span reduction, which is distinct from prolongational reduction; well-formedness, preference, experience, and culture frame the descriptions.">
    <p className="k"><Mark>✦</Mark> Concept Lab synthesis · interacting architecture</p>
    <div className="gttm-final-surface">tonal surface<br /><small>the same phrase can receive several descriptions</small></div>
    <div className="gttm-final-branches"><div><b>grouping</b><small>units · boundaries · hierarchy</small></div><div><b>meter</b><small>temporal levels · strength</small></div></div>
    <div className="gttm-final-join" aria-hidden="true">↘ &nbsp; ↙</div>
    <div className="gttm-final-span">time-span reduction<small>representative heads within nested spans</small></div>
    <div className="gttm-final-cross"><span>↔</span> related, not identical <span>↔</span></div>
    <div className="gttm-final-prolong">prolongational reduction<small>elaboration · prolongation · progression</small></div>
    <aside className="gttm-final-frame"><span>well-formedness</span><b>·</b><span>preference</span><b>·</b><span>listener experience</span><b>·</b><span>idiom / culture</span><small>constraints and context frame the map; they are not late downstream nodes</small></aside>
    <div className="gttm-final-copy">{data.finalModel.note}</div>
  </div>;
}

function SourceList({ items }: { items: Source[] }) {
  return <>{items.map((source, index) => <div className="src-item" key={`${source.citation}-${index}`}><span className="n">{index + 1}</span><div><Rich className="c" as="div" html={source.citation} /><div className="w">{source.contribution}</div>{source.doi && <div className="doi">doi {source.doi}</div>}</div></div>)}</>;
}

export function GTTMBody({ record: r }: { record: TheoryRecord }) {
  const data = r.gttm;
  if (!data) return null;
  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "One surface · four structures", "One surface · four structures", "var(--teal)", <><Rich className="lede" as="p" html={data.opening.lede} /><p className="gttm-identity"><b>Knowledge form:</b> formal cognitive theory / music-theoretic cognitive framework. <b>Provisional branch:</b> Perception &amp; Organisation ↔ Formal Musical Structure &amp; Grammar.</p><OneSurfaceFourStructures data={data} /></>);
  add("generative", "Generative does not mean compose", "Generative does not mean compose", "var(--red)", <><Rich className="lede" as="p" html={data.generative.lede} /><Cards items={data.generative.cards} /><Note glyph="■">{data.generative.note}</Note></>);
  add("listener", "Who is the experienced listener?", "Who is the experienced listener?", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.listener.lede} /><Cards items={data.listener.cards} /><Note glyph="✦">{data.listener.note}</Note></>);
  add("groupingMeter", "A phrase boundary isn’t a beat", "A phrase boundary isn’t a beat", "var(--teal)", <><Rich className="lede" as="p" html={data.groupingMeter.lede} /><div className="gttm-two-lists"><div className="sk-box teal"><p className="k">GROUPING</p><List items={data.groupingMeter.grouping} /></div><div className="sk-box gold"><p className="k">METER</p><List items={data.groupingMeter.meter} colour="var(--gold-deep)" /></div></div><Note glyph="■">{data.groupingMeter.note}</Note></>);
  add("rules", "Well-formed or preferred?", "Well-formed or preferred?", "var(--red)", <><Rich className="lede" as="p" html={data.rules.lede} /><Cards items={data.rules.cards} /><Note glyph="■">{data.rules.note}</Note></>);
  add("spans", "From groups + beats to time spans", "From groups + beats to time spans", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.spans.lede} /><Cards items={data.spans.cards} /><TreeVisual title="Pedagogical time-span tree" root={data.analysis.timeSpans.tree} /><Note glyph="▲">{data.spans.note}</Note></>);
  add("reduction", "What survives the reduction?", "What survives the reduction?", "var(--red)", <><Rich className="lede" as="p" html={data.reduction.lede} /><ReductionLevels data={data} /></>);
  add("prolongation", "Where does the tonal tension go?", "Where does the tonal tension go?", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.prolongation.lede} /><TreeVisual title="Pedagogical prolongational relation map" root={data.analysis.prolongation.tree} /><Cards items={data.prolongation.cards} /><Note glyph="■">{data.prolongation.note}</Note></>);
  add("finalModel", "A map, not a movie", "A map, not a movie", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.finalModel.lede} /><FinalModel data={data} /><Note glyph="✦">{data.finalModel.note}</Note></>);
  add("evidence", "Does the evidence support it?", "Does the evidence support it?", "var(--red)", <><Rich className="lede" as="p" html={data.evidence.lede} /><EvidenceXray items={data.evidence.items} /></>);
  add("scope", "What GTTM explains", "What GTTM explains", "var(--teal)", <><Rich className="lede" as="p" html={data.scope.lede} /><div className="gttm-scope-grid"><div className="sk-box teal"><p className="k">GTTM helps explain</p><List items={data.scope.explains} /></div><div className="sk-box red"><p className="k">Where GTTM stops</p><List items={data.scope.stops} colour="var(--red)" /></div></div><Note glyph="?">{data.scope.note}</Note></>);
  add("lineage", "From Schenker to cognition", "From Schenker to cognition", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.lineage.lede} /><div className="gttm-lineage">{data.lineage.nodes.map((node, index) => <div className="gttm-lineage-node" style={{ "--gttm-colour": node.colour } as CSSProperties} key={node.label}><span className="gttm-lineage-number">0{index + 1}</span><strong>{node.label}</strong><Rich as="p" className="read" html={node.body} /></div>)}</div><Note glyph="■">{data.lineage.note}</Note></>);
  add("trail", "The intellectual / evidence trail", "The intellectual / evidence trail", "var(--teal)", <><Rich className="lede" as="p" html={r.trailLede} /><div className="trail">{r.origins.map((origin) => <div className="trail-item" key={`${origin.year}-${origin.author}`}><span className="trail-year">{origin.year}</span><div><Rich as="h3" html={origin.author} /><Rich className="work" as="span" html={origin.work} /><Rich as="p" html={origin.contribution} /></div></div>)}</div></>);
  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", <><Rich className="lede" as="p" html={r.oversimplificationsLede} /><div className="grid2 gttm-misconception-grid">{r.oversimplifications.map((item, index) => <div className={index % 2 ? "tilt-r2" : "tilt-l2"} key={item}><Cloud colour="#E24E1B"><div className="gttm-cloud-row"><Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} /><Rich className="read" as="p" html={item} /></div></Cloud></div>)}</div></>);
  add("qualifications", "Still open", "Still open", "var(--teal)", <div className="gttm-scope-list">{r.qualifications.map((item) => <Bullet key={item} icon="i-q" colour="var(--teal)" html={item} />)}</div>);
  const minimumCitations = new Set(r.minimumReading.map((source) => source.citation));
  add("sources", "Sources", "Sources", "var(--teal)", <><div className="sk-box tilt-l2 gttm-source-box"><div className="gttm-source-heading"><Icon id="i-book" style={{ width: 26, height: 26, color: "var(--red)" }} /><h3>{r.minimumReadingLabel ?? "If you read five things"}</h3></div><SourceList items={r.minimumReading} /></div><div className="gttm-more-sources"><span className="k">the rest of the trail</span><SourceList items={r.fullSources.filter((source) => !minimumCitations.has(source.citation))} /></div></>);
  const related = (r.relatedTo ?? []).map((link) => ({ link, target: RECORDS.find((record) => record.id === link.recordId) })).filter((item) => item.target);
  if (related.length) add("related", "Related records", "Related records", "var(--teal)", <><p className="lede">These records sit beside GTTM without becoming interchangeable.</p>{related.map(({ link, target }) => { const kind = KIND[target!.kind]; return <a className="rel-card" href={recordHref(target!)} key={link.recordId}><span className="rel-relation">this record {link.relation}</span><span className="rel-title">{target!.title}</span><span className="rel-hook">{target!.hook}</span><Rich className="rel-body read" as="span" html={link.body} /><span className="rel-go" style={{ color: kind.colour }}>{kind.cta} →</span></a>; })}</>);
  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", <div className="prov gttm-provenance">{r.provenance.map((item) => <div className="prov-item" key={item.label} data-reveal="rise"><span className="g" style={{ color: item.colour }}>{item.glyph}</span><div><h4>{item.label}</h4><p>{item.note}</p></div></div>)}</div>);

  const toc = blocks.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`] as [string, string, string]);
  return <RecordShell record={r} toc={toc}>{blocks.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}

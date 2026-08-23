import type { CSSProperties, ReactNode } from "react";
import type { Source, TonalCard, TonalProfileItem, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { ContextualRoleCompare } from "./ContextualRoleCompare";
import { KeyNeighbourhood } from "./KeyNeighbourhood";
import { ProbeToneLab } from "./ProbeToneLab";
import { RecordShell } from "./RecordShell";
import { TonalShiftVisual } from "./TonalShiftVisual";
import { Bullet, Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";

type Block = { key: string; title: string; colour: string; body: ReactNode };

function SourceList({ items }: { items: Source[] }) {
  return <>{items.map((source, index) => <div className="src-item" key={`${source.citation}-${index}`}><span className="n">{index + 1}</span><div><Rich className="c" as="div" html={source.citation} /><div className="w">{source.contribution}</div>{source.doi && <div className="doi">doi {source.doi}</div>}</div></div>)}</>;
}

function Cards({ items }: { items: TonalCard[] }) {
  return <div className="tonal-card-grid">{items.map((item, index) => <article className={`tonal-card sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ "--tonal-colour": item.colour } as CSSProperties} key={item.label}><span className="k">{item.label}</span><Rich className="read" as="p" html={item.body} /></article>)}</div>;
}

function Note({ children }: { children: string }) {
  return <p className="tonal-note">{children}</p>;
}

function Flow({ items }: { items: string[] }) {
  return <div className="tonal-flow" role="img" aria-label={items.join(" then ")}>{items.map((item, index) => <span key={item}><strong>{item}</strong>{index < items.length - 1 && <b aria-hidden="true">↓</b>}</span>)}</div>;
}

function TonalProfile({ items }: { items: TonalProfileItem[] }) {
  const groups = [
    ["anchor", "TONIC · strongest anchor"],
    ["triad", "OTHER TONIC-TRIAD TONES · high relative fit"],
    ["diatonic", "OTHER DIATONIC TONES · differentiated middle region"],
    ["nondiatonic", "NONDIATONIC TONES · generally lower fit"],
  ] as const;
  return <div className="tonal-profile" role="list" aria-label="Qualitative probe-tone profile"><div className="tonal-profile-legend">✦ Concept Lab teaching representation · relative tonal centrality / fit</div><div className="tonal-profile-groups">{groups.map(([level, label]) => <div className={`tonal-profile-group ${level}`} key={level}><span className="k">{label}</span><div className="tonal-profile-items">{items.filter((item) => item.level === level).map((item) => <article className="tonal-profile-item" role="listitem" key={item.pitchClass}><span className="tonal-profile-ink" aria-hidden="true" /><strong>{item.note}</strong><small>{item.role}</small><p>{item.body}</p></article>)}</div></div>)}</div></div>;
}

function FinalModel() {
  return <div className="tonal-final-model" role="img" aria-label="Concept Lab synthesis: musical context leads to behavioural probe judgments, then an empirical profile and inferred psychological organisation; pitch hierarchy relates laterally to key space, more context updates organisation, and the profile is not the complete key-finding process.">
    <p className="k">✦ Concept Lab synthesis</p>
    <div className="tonal-final-core"><span>musical context</span><b aria-hidden="true">↓</b><span>behavioural probe judgments</span><b aria-hidden="true">↓</b><span>empirical probe-tone profile</span><b aria-hidden="true">↓</b><span>inferred psychological organisation</span></div>
    <div className="tonal-final-lateral"><span>pitch-class hierarchy</span><b>↔</b><span>key relationships / key space</span></div>
    <div className="tonal-final-temporal"><span>more musical context</span><b>↔</b><span>updated tonal organisation</span></div>
    <div className="tonal-final-influences"><span>pitch height</span><span>chroma / octave equivalence</span><span>musical experience</span><span>local distribution</span><span>enculturation</span><span>cultural system</span></div>
    <p className="tonal-final-boundary">PROFILE ≠ COMPLETE KEY-FINDING PROCESS</p>
  </div>;
}

export function TonalBody({ record: r }: { record: TheoryRecord }) {
  const data = r.tonal;
  if (!data) return null;
  const blocks: Block[] = [];
  const add = (key: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, title, colour, body });

  add("opening", "Which note feels like home?", "var(--teal)", <><Rich className="lede" as="p" html={data.opening.lede} /><ProbeToneLab title="Which note feels like home?" description="Listen first. Labels stay hidden until you ask for the teaching interpretation." context={data.opening.context} probes={data.opening.probes} showRoles={false} /><Note>{data.opening.note}</Note></>);

  add("context", "Context changes the notes", "var(--red)", <><Rich className="lede" as="p" html={data.context.lede} /><div className="tonal-context-equation"><span>PITCH</span><b>×</b><span>TONAL CONTEXT</span><b>→</b><strong>FUNCTION</strong></div><Cards items={data.context.cards} /><Note>{data.context.note}</Note></>);

  add("measurement", "How do you measure ‘home’?", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.measurement.lede} /><Flow items={["TONAL CONTEXT", "PROBE TONE", "FIT / COMPLETION JUDGMENT", "REPEAT ACROSS PITCH CLASSES", "EMPIRICAL PROBE-TONE PROFILE", "INFERENCE ABOUT TONAL ORGANISATION"]} /><Cards items={data.measurement.cards} /><ProbeToneLab description="One stable C-major context, twelve probes, optional local ratings, and a separate qualitative teaching pattern." context={data.probeLab.context} probes={data.probeLab.probes} allowRatings showRoles /><Note>{data.measurement.note} {data.probeLab.note}</Note></>);

  add("profile", "The tonal landscape", "var(--teal)", <><Rich className="lede" as="p" html={data.profile.lede} /><TonalProfile items={data.profile.items} /><Note>{data.profile.note}</Note></>);

  add("sameNote", "Same note. Different home.", "var(--red)", <><Rich className="lede" as="p" html={data.sameNote.lede} /><ContextualRoleCompare probe={data.sameNote.probe} contexts={data.sameNote.contexts} description="The physical C4 probe stays constant while the preceding context changes." /><Note>{data.sameNote.note}</Note></>);

  add("dimensions", "Tonal function isn’t the only pitch dimension", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.dimensions.lede} /><Cards items={data.dimensions.cards} /><Note>{data.dimensions.note}</Note></>);

  add("representation", "Tones have hierarchy", "var(--teal)", <><Rich className="lede" as="p" html={data.representation.lede} /><Cards items={data.representation.cards} /><Note>{data.representation.note}</Note></>);

  add("neighbourhood", "Keys have neighbourhoods", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.neighbourhood.lede} /><KeyNeighbourhood levels={data.neighbourhood.levels} /><Note>{data.neighbourhood.note}</Note></>);

  add("keySpace", "Why a flat map isn’t enough", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.keySpace.lede} /><div className="tonal-space-explain"><div className="tonal-space-circle"><span>circle of fifths</span><span>relative</span><span>parallel</span></div><div><span className="k">ADVANCED KEY-SPACE</span><strong>four-dimensional solution → toroidal representation</strong><p>The torus preserves several psychological similarity relations at once. It is not a literal neural map.</p></div></div><Note>{data.keySpace.note}</Note></>);

  add("dynamics", "Home can move", "var(--red)", <><Rich className="lede" as="p" html={data.dynamics.lede} /><TonalShiftVisual states={data.dynamics.states} /><Note>{data.dynamics.note}</Note></>);

  add("distribution", "Where does the hierarchy come from?", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.distribution.lede} /><div className="tonal-exposure-flow"><span>MUSICAL EXPOSURE</span><b>↓</b><span>STRUCTURED DISTRIBUTIONAL EXPERIENCE</span><b>↓</b><span>INTERNALISED TONAL REGULARITIES</span></div><Cards items={data.distribution.cards} /><Note>{data.distribution.note}</Note></>);

  add("development", "The hierarchy comes into focus", "var(--teal)", <><Rich className="lede" as="p" html={data.development.lede} /><Cards items={data.development.cards} /><Note>{data.development.note}</Note></>);

  add("culture", "Culture changes the map", "var(--red)", <><Rich className="lede" as="p" html={data.culture.lede} /><Cards items={data.culture.cards} /><Note>{data.culture.note}</Note></>);

  add("process", "A profile is not a process", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.process.lede} /><div className="tonal-profile-process"><div><span className="k">PROFILE</span><strong>pattern in ratings</strong><p>Describes expressed tonal organisation.</p></div><b>≠</b><div><span className="k">PROCESS</span><strong>key-finding over time</strong><p>Asks how a tonal centre is recognised, maintained, or revised.</p></div></div><Cards items={data.process.cards} /><Note>{data.process.note}</Note></>);

  add("scope", "What Tonal Hierarchy explains", "var(--teal)", <><Rich className="lede" as="p" html={data.scope.lede} /><div className="tonal-scope-grid"><div className="sk-box teal tilt-l2"><p className="k">EXPLAINS WELL</p><ul>{data.scope.explains.map((item) => <li key={item}>→ {item}</li>)}</ul></div></div></>);

  add("stops", "Where it stops", "var(--red)", <><Rich className="lede" as="p" html={data.scope.lede} /><div className="tonal-scope-grid"><div className="sk-box red tilt-r2"><p className="k">DOES NOT ESTABLISH</p><ul>{data.scope.stops.map((item) => <li key={item}>→ {item}</li>)}</ul></div></div><Note>{data.scope.note}</Note></>);

  add("lineage", "What came after Krumhansl?", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.lineage.lede} /><div className="tonal-lineage">{data.lineage.nodes.map((node, index) => <article key={node.label} style={{ "--tonal-colour": node.colour } as CSSProperties}><span className="k">0{index + 1}</span><strong>{node.label}</strong><Rich className="read" as="p" html={node.body} /></article>)}</div><FinalModel /><Note>{data.lineage.note}</Note></>);

  add("trail", "The intellectual trail", "var(--teal)", <><Rich className="lede" as="p" html={r.trailLede} /><div className="trail">{r.origins.map((origin) => <div className="trail-item" key={`${origin.year}-${origin.author}`}><span className="trail-year">{origin.year}</span><div><Rich as="h3" html={origin.author} /><Rich className="work" as="span" html={origin.work} /><Rich as="p" html={origin.contribution} /></div></div>)}</div></>);

  add("oversimplifications", "Don’t conclude", "var(--red)", <><Rich className="lede" as="p" html={r.oversimplificationsLede} /><div className="grid2 tonal-misconception-grid">{r.oversimplifications.map((item, index) => <div className={index % 2 ? "tilt-r2" : "tilt-l2"} key={item}><Cloud colour="#E24E1B"><div className="tonal-cloud-row"><Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} /><Rich className="read" as="p" html={item} /></div></Cloud></div>)}</div></>);

  add("qualifications", "Still open", "var(--teal)", <div className="tonal-scope-list">{r.qualifications.map((item) => <Bullet key={item} icon="i-q" colour="var(--teal)" html={item} />)}</div>);

  add("sources", "Sources", "var(--teal)", <><div className="sk-box tilt-l2 tonal-source-box"><div className="tonal-source-heading"><Icon id="i-book" style={{ width: 26, height: 26, color: "var(--red)" }} /><h3>{r.minimumReadingLabel ?? "If you read seven things"}</h3></div><SourceList items={r.minimumReading} /></div><div className="tonal-more-sources"><span className="k">the rest of the trail</span><SourceList items={r.fullSources.filter((source) => !r.minimumReading.some((minimum) => minimum.citation === source.citation))} /></div></>);

  const related = (r.relatedTo ?? []).map((link) => ({ link, target: RECORDS.find((record) => record.id === link.recordId) })).filter((item) => item.target);
  if (related.length) add("related", "Related records", "var(--teal)", <><p className="lede">This record sits beside other Concept Lab lenses, but the connections do not make the records interchangeable.</p>{related.map(({ link, target }) => { const kind = KIND[target!.kind]; return <a className="rel-card" href={recordHref(target!)} key={link.recordId}><span className="rel-relation">this record {link.relation}</span><span className="rel-title">{target!.title}</span><span className="rel-hook">{target!.hook}</span><Rich className="rel-body read" as="span" html={link.body} /><span className="rel-go" style={{ color: kind.colour }}>{kind.cta} →</span></a>; })}</>);

  add("provenance", "Where every claim came from", "var(--teal)", <div className="prov tonal-provenance">{r.provenance.map((item) => <div className="prov-item" key={item.label} data-reveal="rise"><span className="g" style={{ color: item.colour }}>{item.glyph}</span><div><h4>{item.label}</h4><p>{item.note}</p></div></div>)}</div>);

  const ordered = r.order ? [...blocks].sort((a, b) => { const rank = (key: string) => { const index = r.order!.indexOf(key); return index < 0 ? Number.MAX_SAFE_INTEGER : index; }; return rank(a.key) - rank(b.key); }) : blocks;
  const toc = ordered.map((block, index) => [pad2(index + 1), block.title, `s${index + 1}`] as [string, string, string]);
  return <RecordShell record={r} toc={toc}>{ordered.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}

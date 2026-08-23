import type { CSSProperties, ReactNode } from "react";
import type { ASACard, Source, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { AudioPresetCompare } from "./AudioPresetCompare";
import { RecordShell } from "./RecordShell";
import { Bullet, Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { EvidenceXray } from "./TheoryPatterns";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function Mark({ children }: { children: string }) {
  return <span className="gestalt-mark" aria-hidden="true">{children}</span>;
}
function Note({ glyph, children }: { glyph: string; children: string }) {
  return <p className="gestalt-inline-note"><Mark>{glyph}</Mark> {children}</p>;
}

function Cards({ items }: { items: ASACard[] }) {
  return (
    <div className="gestalt-card-grid">
      {items.map((item, index) => (
        <article className={`gestalt-card sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ "--gestalt-colour": item.colour } as CSSProperties} key={item.label}>
          <span className="k">{item.label}</span>
          <Rich className="read" as="p" html={item.body} />
        </article>
      ))}
    </div>
  );
}

function WholeVisual({ cases }: { cases: { label: string; before: string; central: string; after: string; role: string; colour: string }[] }) {
  return (
    <div className="gestalt-whole-visual" role="img" aria-label="The same central musical event has different perceptual roles inside two surrounding organisations.">
      {cases.map((item) => (
        <div className="gestalt-whole-case" style={{ "--gestalt-colour": item.colour } as CSSProperties} key={item.label}>
          <span className="k">{item.label}</span>
          <div className="gestalt-whole-sequence" aria-hidden="true">
            <span>{item.before}</span><strong>{item.central}</strong><span>{item.after}</span>
          </div>
          <p>{item.role}</p>
        </div>
      ))}
      <div className="gestalt-whole-caption"><b>same event</b> · different surrounding organisation · different perceptual role</div>
    </div>
  );
}

function ContinuationVisual({ options }: { options: ASACard[] }) {
  return (
    <div className="gestalt-continuation" role="img" aria-label="An unfolding contour can continue smoothly, change direction, or become a new organisation.">
      <svg viewBox="0 0 360 110" preserveAspectRatio="none" aria-hidden="true">
        <path d="M8 82 C52 80 55 35 96 38 S146 86 184 70 S230 24 268 35 S310 78 352 30" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" />
        <path d="M8 82 C52 80 55 35 96 38 S146 86 184 70" fill="none" stroke="var(--red)" strokeWidth="5" strokeLinecap="round" opacity=".22" />
        <circle cx="184" cy="70" r="5" fill="var(--red)" />
      </svg>
      <div className="gestalt-continuation-options">
        {options.map((option) => <div key={option.label} style={{ "--gestalt-colour": option.colour } as CSSProperties}><span className="k">{option.label}</span><Rich as="p" className="read" html={option.body} /></div>)}
      </div>
    </div>
  );
}

function PragnanzVisual({ data }: { data: { historical: string; problem: string; later: string[] } }) {
  return (
    <div className="gestalt-pragnanz">
      <div className="gestalt-pragnanz-step historical"><span className="k"><Mark>●</Mark> HISTORICAL AMBITION</span><p>{data.historical}</p></div>
      <div className="gestalt-pragnanz-arrow" aria-hidden="true">↓</div>
      <div className="gestalt-pragnanz-step problem"><span className="k"><Mark>?</Mark> THE PROBLEM</span><p>{data.problem}</p></div>
      <div className="gestalt-pragnanz-arrow" aria-hidden="true">↓</div>
      <div className="gestalt-pragnanz-later"><span className="k">LATER REFORMULATIONS</span><div>{data.later.map((item) => <span key={item}>{item}</span>)}</div></div>
    </div>
  );
}

function FinalModel() {
  return (
    <div className="gestalt-final-model" role="img" aria-label="Concept Lab synthesis: musical events support multiple possible organisations; proximity, similarity, and continuation can reinforce or compete; grouping can be preferred or ambiguous; groups can become groups of groups; context, experience, attention, and musical structure influence the organisation.">
      <p className="k"><Mark>✦</Mark> Concept Lab synthesis</p>
      <div className="gestalt-final-path"><span>musical events</span><b aria-hidden="true">↓</b><span>multiple possible organisations</span></div>
      <div className="gestalt-final-cues">
        <div><strong>proximity</strong><small>temporal relation</small></div>
        <div><strong>similarity</strong><small>like with like</small></div>
        <div><strong>continuation</strong><small>trajectory / contour</small></div>
      </div>
      <div className="gestalt-final-knot"><span>↘</span><strong>reinforcement / competition</strong><span>↙</span></div>
      <div className="gestalt-final-result"><strong>preferred or ambiguous grouping</strong><small>groups · boundaries · figures</small></div>
      <div className="gestalt-final-down" aria-hidden="true">↓</div>
      <div className="gestalt-final-hierarchy"><span>groups</span><span>of</span><strong>groups</strong></div>
      <aside className="gestalt-final-influences"><span>CONTEXT</span><b>↔</b><span>PAST EXPERIENCE</span><b>↔</b><span>ATTENTION</span><b>↔</b><span>MUSICAL STRUCTURE</span><small>side influences, not late downstream outcomes</small></aside>
    </div>
  );
}

function SourceList({ items }: { items: Source[] }) {
  return (
    <>
      {items.map((source, index) => (
        <div className="src-item" key={`${source.citation}-${index}`}>
          <span className="n">{index + 1}</span>
          <div>
            <Rich className="c" as="div" html={source.citation} />
            <div className="w">{source.contribution}</div>
            {source.doi && <div className="doi">doi {source.doi}</div>}
          </div>
        </div>
      ))}
    </>
  );
}

function List({ items, colour = "var(--teal)" }: { items: string[]; colour?: string }) {
  return <ul className="gestalt-list">{items.map((item) => <li key={item} style={{ "--gestalt-colour": colour } as CSSProperties}><span aria-hidden="true">→</span><Rich as="span" html={item} /></li>)}</ul>;
}

export function GestaltBody({ record: r }: { record: TheoryRecord }) {
  const data = r.gestalt;
  if (!data) return null;

  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "Where is the boundary?", "Where is the boundary?", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.opening.lede} />
      <AudioPresetCompare title="Same notes · different grouping" description="Choose a condition, listen if you can, and inspect the marked candidate boundary in the visual timeline." presets={data.opening.presets} />
      <p className="gestalt-callout">Where do you hear the group boundary?</p>
      <Note glyph="▲">{data.opening.note}</Note>
    </>
  ));

  add("problem", "Why did you hear a group?", "Why did you hear a group?", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.problem.lede} />
      <Cards items={data.problem.cards} />
      <Note glyph="●">{data.problem.note}</Note>
    </>
  ));

  add("whole", "The whole changes the part", "The whole changes the part", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.whole.lede} />
      <WholeVisual cases={data.whole.cases} />
      <Note glyph="■">{data.whole.note}</Note>
    </>
  ));

  add("proximity", "Closer events often group", "Closer events often group", "var(--gold-deep)", (
    <>
      <Rich className="lede" as="p" html={data.proximity.lede} />
      <Cards items={data.proximity.cards} />
      <Note glyph="●">{data.proximity.note}</Note>
    </>
  ));

  add("similarity", "Like can go with like", "Like can go with like", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.similarity.lede} />
      <Cards items={data.similarity.cards} />
      <Note glyph="●">{data.similarity.note}</Note>
    </>
  ));

  add("conflict", "When the cues disagree", "When the cues disagree", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.conflict.lede} />
      <AudioPresetCompare title="Time × register" description="A, B, and C isolate a temporal cue, a register cue, and their conflict. The labels X and Y mark the boundaries each cue favours." presets={data.conflict.presets} />
      <p className="gestalt-question">{data.conflict.question}</p>
      <Note glyph="✦">{data.conflict.note}</Note>
    </>
  ));

  add("laws", "These aren’t strict laws", "These aren’t strict laws", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.laws.lede} />
      <Cards items={data.laws.cards} />
      <Note glyph="✦">{data.laws.note}</Note>
    </>
  ));

  add("continuation", "What counts as a good continuation?", "What counts as a good continuation?", "var(--gold-deep)", (
    <>
      <Rich className="lede" as="p" html={data.continuation.lede} />
      <ContinuationVisual options={data.continuation.options} />
      <div className="gestalt-bridge"><span>GESTALT</span><b>how is the unfolding pattern organised?</b><span>MEYER</span><b>what can that organisation imply?</b></div>
      <Note glyph="●">{data.continuation.note}</Note>
    </>
  ));

  add("closure", "When does a pattern feel complete?", "When does a pattern feel complete?", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.closure.lede} />
      <Cards items={data.closure.cards} />
      <Note glyph="●">{data.closure.note}</Note>
    </>
  ));

  add("pragnanz", "Why does one organisation feel better?", "Why does one organisation feel ‘better’?", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.pragnanz.lede} />
      <PragnanzVisual data={data.pragnanz} />
      <Note glyph="✦">{data.pragnanz.note}</Note>
    </>
  ));

  add("hierarchy", "Groups become groups of groups", "Groups become groups of groups", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.hierarchy.lede} />
      <Cards items={data.hierarchy.levels} />
      <Note glyph="●">{data.hierarchy.note}</Note>
    </>
  ));

  add("gttm", "From Gestalt to musical grouping rules", "From Gestalt to musical grouping rules", "var(--plum-deep)", (
    <>
      <Rich className="lede" as="p" html={data.gttm.lede} />
      <div className="gestalt-lineage">{data.gttm.stages.map((stage, index) => <div key={stage.label} className="gestalt-lineage-stage" style={{ "--gestalt-colour": stage.colour } as CSSProperties}><span className="gestalt-lineage-number">0{index + 1}</span><strong>{stage.label}</strong><Rich as="p" className="read" html={stage.body} />{index < data.gttm.stages.length - 1 && <span className="gestalt-lineage-arrow" aria-hidden="true">↘</span>}</div>)}</div>
      <Note glyph="●">{data.gttm.note}</Note>
    </>
  ));

  add("deliege", "What listeners actually do", "What listeners actually do: Deliège", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.deliege.lede} />
      <div className="gestalt-evidence-label">LATER MUSICAL GROUPING EVIDENCE · NOT GESTALT CONFIRMATION</div>
      <EvidenceXray items={[data.deliege.evidence]} />
      <Note glyph="■">{data.deliege.note}</Note>
    </>
  ));

  add("frankland", "Testing formalised grouping rules", "Testing formalised grouping rules: Frankland & Cohen", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.frankland.lede} />
      <div className="gestalt-evidence-label">TESTING FORMALISED MUSICAL GROUPING RULES</div>
      <EvidenceXray items={[data.frankland.evidence]} />
      <Note glyph="■">{data.frankland.note}</Note>
    </>
  ));

  add("culture", "Experience changes grouping", "Experience changes grouping", "var(--gold-deep)", (
    <>
      <Rich className="lede" as="p" html={data.culture.lede} />
      <Cards items={data.culture.cards} />
      <Note glyph="■">{data.culture.note}</Note>
    </>
  ));

  add("scope", "What Gestalt explains", "What Gestalt explains", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.scope.lede} />
      <div className="gestalt-scope-grid"><div className="sk-box teal tilt-l2"><p className="k">Gestalt helps explain</p><List items={data.scope.explains} /></div><div className="sk-box red tilt-r2"><p className="k">Where Gestalt stops</p><List items={data.scope.stops} colour="var(--red)" /></div></div>
      <Note glyph="?">{data.scope.note}</Note>
    </>
  ));

  add("lineage", "What came after Gestalt?", "What came after Gestalt?", "var(--plum-deep)", (
    <>
      <Rich className="lede" as="p" html={data.lineage.lede} />
      <div className="gestalt-lineage">{data.lineage.nodes.map((node, index) => <div key={node.label} className="gestalt-lineage-stage" style={{ "--gestalt-colour": node.colour } as CSSProperties}><span className="gestalt-lineage-number">0{index + 1}</span><strong>{node.label}</strong><Rich as="p" className="read" html={node.body} />{index < data.lineage.nodes.length - 1 && <span className="gestalt-lineage-arrow" aria-hidden="true">↘</span>}</div>)}</div>
      <FinalModel />
      <Note glyph="✦">{data.lineage.note}</Note>
    </>
  ));

  add("trail", "The intellectual / evidence trail", "The intellectual / evidence trail", "var(--teal)", (
    <><Rich className="lede" as="p" html={r.trailLede} /><div className="trail">{r.origins.map((origin) => <div className="trail-item" key={`${origin.year}-${origin.author}`}><span className="trail-year">{origin.year}</span><div><Rich as="h3" html={origin.author} /><Rich className="work" as="span" html={origin.work} /><Rich as="p" html={origin.contribution} /></div></div>)}</div></>
  ));

  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", (
    <><Rich className="lede" as="p" html={r.oversimplificationsLede} /><div className="grid2 gestalt-misconception-grid">{r.oversimplifications.map((item, index) => <div className={index % 2 ? "tilt-r2" : "tilt-l2"} key={item}><Cloud colour="#E24E1B"><div className="gestalt-cloud-row"><Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} /><Rich className="read" as="p" html={item} /></div></Cloud></div>)}</div></>
  ));

  add("qualifications", "Still open", "Still open", "var(--teal)", <div className="gestalt-scope-list">{r.qualifications.map((item) => <Bullet key={item} icon="i-q" colour="var(--teal)" html={item} />)}</div>);

  const minimumCitations = new Set(r.minimumReading.map((source) => source.citation));
  add("sources", "Sources", "Sources", "var(--teal)", (
    <><div className="sk-box tilt-l2 gestalt-source-box"><div className="gestalt-source-heading"><Icon id="i-book" style={{ width: 26, height: 26, color: "var(--red)" }} /><h3>{r.minimumReadingLabel ?? "If you read six things"}</h3></div><SourceList items={r.minimumReading} /></div><div className="gestalt-more-sources"><span className="k">the rest of the trail</span><SourceList items={r.fullSources.filter((source) => !minimumCitations.has(source.citation))} /></div></>
  ));

  const related = (r.relatedTo ?? []).map((link) => ({ link, target: RECORDS.find((record) => record.id === link.recordId) })).filter((item) => item.target);
  if (related.length) {
    add("related", "Related records", "Related records", "var(--teal)", (
      <><p className="lede">These records sit beside Gestalt without becoming interchangeable.</p>{related.map(({ link, target }) => { const kind = KIND[target!.kind]; return <a className="rel-card" href={recordHref(target!)} key={link.recordId}><span className="rel-relation">this record {link.relation}</span><span className="rel-title">{target!.title}</span><span className="rel-hook">{target!.hook}</span><Rich className="rel-body read" as="span" html={link.body} /><span className="rel-go" style={{ color: kind.colour }}>{kind.cta} →</span></a>; })}</>
    ));
  }

  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", <div className="prov gestalt-provenance">{r.provenance.map((item) => <div className="prov-item" key={item.label} data-reveal="rise"><span className="g" style={{ color: item.colour }}>{item.glyph}</span><div><h4>{item.label}</h4><p>{item.note}</p></div></div>)}</div>);

  const toc = blocks.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`] as [string, string, string]);
  return <RecordShell record={r} toc={toc}>{blocks.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}

import type { CSSProperties, ReactNode } from "react";
import type { ASACard, Source, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { AudioPresetCompare } from "./AudioPresetCompare";
import { RecordShell } from "./RecordShell";
import { Bullet, Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { EvidenceXray } from "./TheoryPatterns";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function Mark({ children }: { children: string }) {
  return <span className="asa-mark">{children}</span>;
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

function Cards({ items }: { items: ASACard[] }) {
  return (
    <div className="asa-card-grid">
      {items.map((item, index) => (
        <article className={`asa-card sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ "--asa-colour": item.colour } as CSSProperties} key={item.label}>
          <span className="k">{item.label}</span>
          <Rich className="read" as="p" html={item.body} />
        </article>
      ))}
    </div>
  );
}

function List({ items, colour = "var(--teal)" }: { items: string[]; colour?: string }) {
  return (
    <ul className="asa-list">
      {items.map((item) => <li key={item} style={{ "--asa-colour": colour } as CSSProperties}><span aria-hidden="true">→</span><Rich as="span" html={item} /></li>)}
    </ul>
  );
}

function ProblemVisual({ layers }: { layers: ASACard[] }) {
  return (
    <div className="asa-problem-visual" role="img" aria-label="The world contains multiple sound-producing events; the ear receives one acoustic mixture; the perceptual problem is deciding which evidence belongs together.">
      {layers.map((layer, index) => (
        <div className="asa-problem-layer" style={{ "--asa-colour": layer.colour } as CSSProperties} key={layer.label}>
          <span className="k">{layer.label}</span>
          <Rich className="read" as="p" html={layer.body} />
          {index < layers.length - 1 && <span className="asa-down" aria-hidden="true">↓</span>}
        </div>
      ))}
    </div>
  );
}

function SourceStreamVisual({ source, stream }: { source: ASACard; stream: ASACard }) {
  return (
    <div className="asa-source-stream" role="img" aria-label="Physical sources belong to the world; auditory streams are perceptual organisations built from a mixed acoustic field.">
      <div className="asa-source-world">
        <span className="asa-world-tag">WORLD</span>
        <span className="asa-source-dot" aria-hidden="true" />
        <span className="asa-source-dot" aria-hidden="true" />
        <span className="asa-source-dot" aria-hidden="true" />
        <Rich as="p" className="read" html={source.body} />
      </div>
      <div className="asa-mixture-field">
        <span className="asa-world-tag">MIXED ACOUSTIC FIELD</span>
        <span className="asa-mixture-line one" aria-hidden="true" />
        <span className="asa-mixture-line two" aria-hidden="true" />
        <span className="asa-mixture-line three" aria-hidden="true" />
      </div>
      <div className="asa-percept-layer">
        <span className="asa-world-tag">PERCEPT</span>
        <span className="asa-strand" aria-hidden="true" />
        <span className="asa-strand" aria-hidden="true" />
        <Rich as="p" className="read" html={stream.body} />
      </div>
    </div>
  );
}

function GroupingVisual() {
  return (
    <div className="asa-grouping-visual" role="img" aria-label="Sequential organisation groups events across time; simultaneous organisation groups components arriving together; both contribute to auditory streams and perceptual objects.">
      <div className="asa-grouping-side sequential"><span className="k">SEQUENTIAL</span><strong>across time</strong><span>melody · voice · alternating tones</span></div>
      <div className="asa-grouping-centre" aria-hidden="true">↘ both organise ↙</div>
      <div className="asa-grouping-side simultaneous"><span className="k">SIMULTANEOUS</span><strong>at one moment</strong><span>harmonic complex · timbre · concurrent voices</span></div>
      <div className="asa-grouping-result"><span className="k">AVAILABLE PERCEPTS</span><strong>streams · objects · patterns</strong></div>
    </div>
  );
}

function CuePullVisual({ cards }: { cards: ASACard[] }) {
  return (
    <div className="asa-cue-pull" role="img" aria-label="Acoustic cues can pull the same events toward competing organisations; context changes how the cues combine.">
      <div className="asa-cue-column">
        <span className="k">GROUP WITH A?</span>
        {cards.slice(0, 2).map((card) => <span className="asa-cue-pill" key={card.label}>{card.label}</span>)}
      </div>
      <div className="asa-cue-knot"><span>CUES PULL</span><small>context changes the organisation</small></div>
      <div className="asa-cue-column">
        <span className="k">GROUP WITH B?</span>
        {cards.slice(2).map((card) => <span className="asa-cue-pill" key={card.label}>{card.label}</span>)}
      </div>
    </div>
  );
}

function BistabilityVisual({ states }: { states: ASACard[] }) {
  return (
    <div className="asa-bistability" role="img" aria-label="At intermediate conditions, one unchanged repeating stimulus may support integrated or segregated percepts, and the percept may reorganise.">
      <div className="asa-bistability-stimulus"><span className="k">IDENTICAL STIMULUS</span><strong>same repeating sequence</strong></div>
      <div className="asa-bistability-arrow" aria-hidden="true">↕</div>
      <div className="asa-bistability-states">{states.map((state) => <div className="asa-bistability-state" style={{ "--asa-colour": state.colour } as CSSProperties} key={state.label}><span className="k">{state.label}</span><Rich as="p" className="read" html={state.body} /></div>)}</div>
    </div>
  );
}

function OldNewVisual({ steps }: { steps: string[] }) {
  return (
    <div className="asa-old-new" role="img" aria-label="Bregman’s old-plus-new heuristic: an ongoing sound continues while additional energy enters, leaving a mixture that may be organised as continuing old plus candidate new sound.">
      {steps.map((step, index) => <span key={step}><b>{step}</b>{index < steps.length - 1 && <i aria-hidden="true">↓</i>}</span>)}
    </div>
  );
}

function FinalModel() {
  return (
    <div className="asa-final-model" role="img" aria-label="Concept Lab synthesis of Auditory Scene Analysis: acoustic mixture feeds sequential and simultaneous organisation, which compete and cooperate to produce streams and perceptual objects, while schemas, attention, and context interact with the organisation.">
      <p className="k"><Mark>✦</Mark> Concept Lab synthesis</p>
      <div className="asa-final-path"><span>multiple sound-producing events</span><b aria-hidden="true">↓</b><span>acoustic mixture</span><b aria-hidden="true">↓</b><span>acoustic evidence</span></div>
      <div className="asa-final-dual">
        <div><span className="k">SEQUENTIAL</span><strong>across time</strong><small>events group into continuing strands</small></div>
        <div><span className="k">SIMULTANEOUS</span><strong>at one moment</strong><small>components fuse or stand apart</small></div>
      </div>
      <div className="asa-final-converge"><span>↘</span><strong>competing / cooperating organisations</strong><span>↙</span></div>
      <div className="asa-final-stream"><strong>auditory streams / perceptual objects</strong><small>not guaranteed physical sources</small></div>
      <div className="asa-final-patterns"><span>melody</span><span>rhythm</span><span>speech</span><span>source interpretation</span></div>
      <aside className="asa-final-influences"><span>SCHEMAS</span><b>↔</b><span>ATTENTION</span><b>↔</b><span>CONTEXT</span><small>interact with organisation</small></aside>
      <div className="asa-final-loop">↺ bistable reorganisation remains possible</div>
    </div>
  );
}

export function ASABody({ record: r }: { record: TheoryRecord }) {
  const data = r.asa;
  if (!data) return null;
  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "How many streams do you hear?", "How many streams do you hear?", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.opening.lede} />
      <AudioPresetCompare title="Stream Splitter" description="The structural pattern stays the same while frequency separation and presentation rate change." presets={data.opening.presets} />
      <p className="asa-inline-note"><Mark>▲</Mark> Constructed synthetic streaming examples. They illustrate possible organisations; they are not a test, replication, or score.</p>
      <p className="asa-callout">What organisation is available to you right now?</p>
      <p className="asa-note">{data.opening.note}</p>
    </>
  ));

  add("problem", "The ears receive a mixture", "The ears receive a mixture", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.problem.lede} />
      <ProblemVisual layers={data.problem.layers} />
      <p className="asa-inline-note"><Mark>■</Mark> {data.problem.note}</p>
    </>
  ));

  add("source", "A stream is not a source", "A stream is not a source", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.source.lede} />
      <SourceStreamVisual source={data.source.source} stream={data.source.stream} />
      <p className="asa-inline-note"><Mark>■</Mark> {data.source.note}</p>
    </>
  ));

  add("grouping", "Two ways to group sound", "Two ways to group sound", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.grouping.lede} />
      <GroupingVisual />
      <div className="asa-two-lists"><div><span className="k">SEQUENTIAL ORGANISATION</span><List items={data.grouping.sequential} /></div><div><span className="k">SIMULTANEOUS ORGANISATION</span><List items={data.grouping.simultaneous} colour="var(--red)" /></div></div>
      <p className="asa-inline-note"><Mark>●</Mark> {data.grouping.note}</p>
    </>
  ));

  add("cues", "What makes sounds belong together?", "What makes sounds belong together?", "var(--gold-deep)", (
    <>
      <Rich className="lede" as="p" html={data.cues.lede} />
      <div className="asa-two-lists"><div><span className="k">ACROSS TIME</span><List items={data.cues.sequential} /></div><div><span className="k">AT ONE MOMENT</span><List items={data.cues.simultaneous} colour="var(--red)" /></div></div>
      <p className="asa-inline-note"><Mark>●</Mark> {data.cues.note}</p>
    </>
  ));

  add("competition", "Cues pull", "Cues pull", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.competition.lede} />
      <CuePullVisual cards={data.competition.cards} />
      <Cards items={data.competition.cards} />
      <p className="asa-inline-note"><Mark>✦</Mark> {data.competition.note}</p>
    </>
  ));

  add("split", "Split the stream", "Split the stream", "var(--teal)", (
    <>
      <p className="lede">The same ABA-style structure can become more integrated or more segregated as frequency separation and presentation rate change. These presets show tendencies, not universal category boundaries.</p>
      <AudioPresetCompare title="Frequency × rate" description="Change one dimension at a time when comparing presets; the combined state changes both." presets={data.opening.presets} />
      <p className="asa-inline-note"><Mark>●</Mark> The qualitative architecture follows the frequency-and-temporal relations studied in classic streaming work; it is not a modern threshold map.</p>
    </>
  ));

  add("bistability", "Same sound, different organisation", "Same sound, different organisation", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.bistability.lede} />
      <BistabilityVisual states={data.bistability.states} />
      <p className="asa-inline-note"><Mark>?</Mark> {data.bistability.note}</p>
    </>
  ));

  add("groupFuse", "Group or fuse?", "Group or fuse?", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.groupFuse.lede} />
      <AudioPresetCompare title="Group or fuse?" description="The same synthetic complex sound changes onset synchrony while its component pitches remain constant." presets={data.groupFuse.presets} />
      <p className="asa-question">{data.groupFuse.question}</p>
      <p className="asa-inline-note"><Mark>▲</Mark> {data.groupFuse.note}</p>
    </>
  ));

  add("oldNew", "Old + new", "Old + new", "var(--gold-deep)", (
    <>
      <Rich className="lede" as="p" html={data.oldNew.lede} />
      <OldNewVisual steps={data.oldNew.steps} />
      <p className="asa-inline-note"><Mark>●</Mark> {data.oldNew.note}</p>
    </>
  ));

  add("organisation", "What does the listener already know?", "What does the listener already know?", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.organisation.lede} />
      <div className="asa-organisation-visual">
        <div className="asa-organisation-card primitive"><span className="k">PRIMITIVE</span><List items={data.organisation.primitive} /></div>
        <div className="asa-organisation-card schema"><span className="k">SCHEMA-BASED</span><List items={data.organisation.schema} colour="var(--red)" /></div>
        <div className="asa-organisation-overlap">overlapping influences — not a mandatory pipeline</div>
      </div>
      <p className="asa-inline-note"><Mark>?</Mark> {data.organisation.note}</p>
    </>
  ));

  add("attention", "Does attention control the stream?", "Does attention control the stream?", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.attention.lede} />
      <Cards items={data.attention.cards} />
      <p className="asa-inline-note"><Mark>?</Mark> {data.attention.note}</p>
    </>
  ));

  add("music", "Music exists inside streams", "Music exists inside streams", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.music.lede} />
      <Cards items={data.music.cards} />
      <div className="asa-meyer-bridge"><span>ASA</span><b>what belongs together?</b><span>MEYER</span><b>where does the organised music seem to go?</b></div>
      <p className="asa-inline-note"><Mark>●</Mark> {data.music.note}</p>
    </>
  ));

  add("evidence", "Does the evidence support it?", "Does the evidence support it?", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.evidence.lede} />
      <EvidenceXray items={data.evidence.items} />
    </>
  ));

  add("scope", "What ASA explains", "What ASA explains", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.scope.lede} />
      <div className="asa-scope-grid"><div className="sk-box teal tilt-l2"><p className="k">ASA helps explain</p><List items={data.scope.explains} /></div><div className="sk-box red tilt-r2"><p className="k">ASA does not settle</p><List items={data.scope.stops} colour="var(--red)" /></div></div>
      <p className="asa-inline-note"><Mark>?</Mark> {data.scope.note}</p>
    </>
  ));

  add("lineage", "What came after Bregman?", "What came after Bregman?", "var(--plum-deep)", (
    <>
      <Rich className="lede" as="p" html={data.lineage.lede} />
      <div className="asa-lineage">{data.lineage.nodes.map((node, index) => <div className="asa-lineage-node" style={{ "--asa-colour": node.colour } as CSSProperties} key={node.label}><span className="k">0{index + 1}</span><strong>{node.label}</strong><Rich as="p" className="read" html={node.body} />{index < data.lineage.nodes.length - 1 && <span className="asa-lineage-connector" aria-hidden="true">↘</span>}</div>)}</div>
      <FinalModel />
      <p className="asa-inline-note"><Mark>✦</Mark> {data.lineage.note}</p>
    </>
  ));

  add("trail", "The intellectual trail", "The intellectual trail", "var(--teal)", (
    <><Rich className="lede" as="p" html={r.trailLede} /><div className="trail">{r.origins.map((origin) => <div className="trail-item" key={`${origin.year}-${origin.author}`}><span className="trail-year">{origin.year}</span><div><Rich as="h3" html={origin.author} /><Rich className="work" as="span" html={origin.work} /><Rich as="p" html={origin.contribution} /></div></div>)}</div></>
  ));

  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", (
    <><Rich className="lede" as="p" html={r.oversimplificationsLede} /><div className="grid2 asa-misconception-grid">{r.oversimplifications.map((item, index) => <div className={index % 2 ? "tilt-r2" : "tilt-l2"} key={item}><Cloud colour="#E24E1B"><div className="asa-cloud-row"><Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} /><Rich className="read" as="p" html={item} /></div></Cloud></div>)}</div></>
  ));

  add("qualifications", "Still open", "Still open", "var(--teal)", <div className="asa-scope-list">{r.qualifications.map((item) => <Bullet key={item} icon="i-q" colour="var(--teal)" html={item} />)}</div>);

  add("sources", "Sources", "Sources", "var(--teal)", (
    <><div className="sk-box tilt-l2 asa-source-box"><div className="asa-source-heading"><Icon id="i-book" style={{ width: 26, height: 26, color: "var(--red)" }} /><h3>{r.minimumReadingLabel ?? "If you read six things"}</h3></div><SourceList items={r.minimumReading} /></div><div className="asa-more-sources"><span className="k">the rest of the trail</span><SourceList items={r.fullSources.filter((source) => !r.minimumReading.some((minimum) => minimum.citation === source.citation))} /></div></>
  ));

  const related = (r.relatedTo ?? []).map((link) => ({ link, target: RECORDS.find((record) => record.id === link.recordId) })).filter((item) => item.target);
  if (related.length) {
    add("related", "Related records", "Related records", "var(--teal)", (
      <><p className="lede">This record sits beside other Concept Lab lenses, but the connections do not make the records interchangeable.</p>{related.map(({ link, target }) => { const kind = KIND[target!.kind]; return <a className="rel-card" href={recordHref(target!)} key={link.recordId}><span className="rel-relation">this record {link.relation}</span><span className="rel-title">{target!.title}</span><span className="rel-hook">{target!.hook}</span><Rich className="rel-body read" as="span" html={link.body} /><span className="rel-go" style={{ color: kind.colour }}>{kind.cta} →</span></a>; })}</>
    ));
  }

  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", <div className="prov asa-provenance">{r.provenance.map((item) => <div className="prov-item" key={item.label} data-reveal="rise"><span className="g" style={{ color: item.colour }}>{item.glyph}</span><div><h4>{item.label}</h4><p>{item.note}</p></div></div>)}</div>);

  const ordered = r.order ? [...blocks].sort((a, b) => { const rank = (key: string) => { const index = r.order!.indexOf(key); return index < 0 ? Number.MAX_SAFE_INTEGER : index; }; return rank(a.key) - rank(b.key); }) : blocks;
  const toc = ordered.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`] as [string, string, string]);

  return <RecordShell record={r} toc={toc}>{ordered.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}

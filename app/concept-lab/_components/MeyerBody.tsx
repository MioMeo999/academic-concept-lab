import type { CSSProperties, ReactNode } from "react";
import type { Source, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { AudioExample } from "./AudioExample";
import { RecordShell } from "./RecordShell";
import { Bullet, Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { EvidenceXray } from "./TheoryPatterns";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function Mark({ children }: { children: string }) {
  return <span className="music-mark">{children}</span>;
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

function Cards({ items }: { items: { label: string; body: string; colour: string }[] }) {
  return (
    <div className="music-card-grid">
      {items.map((item, index) => (
        <article className={`music-card sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ "--music-colour": item.colour } as CSSProperties} key={item.label}>
          <span className="k">{item.label}</span>
          <Rich className="read" as="p" html={item.body} />
        </article>
      ))}
    </div>
  );
}

function AudioChoices({ context, choices }: { context: import("@/content/types").AudioNote[]; choices: import("@/content/types").AudioChoice[] }) {
  return (
    <div className="music-audio-choice-grid">
      {choices.map((choice, index) => (
        <AudioExample
          key={choice.label}
          label={`${String(index + 1).padStart(2, "0")} · ${choice.label}`}
          notes={[...context, ...choice.notes]}
          description={choice.body}
          colour={index % 2 ? "var(--red)" : "var(--teal)"}
        />
      ))}
    </div>
  );
}

function BranchingVisual({ current, items }: { current: string; items: { label: string; body: string; colour: string }[] }) {
  return (
    <div className="music-branching" role="img" aria-label="One musical event leading to several qualitative possible continuations">
      <div className="music-current-event">
        <span className="k">current event</span>
        <strong>{current}</strong>
      </div>
      <div className="music-branch-lines" aria-hidden="true">
        {items.map((item) => <span key={item.label}>↘</span>)}
      </div>
      <div className="music-branch-grid">
        {items.map((item, index) => (
          <article className="music-branch-card" style={{ "--music-colour": item.colour } as CSSProperties} key={item.label}>
            <span className="music-branch-index">0{index + 1}</span>
            <strong>{item.label}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function MeaningTimeline({ stages, note }: { stages: { label: string; question: string; body: string; colour: string }[]; note: string }) {
  return (
    <div className="music-meaning-wrap">
      <div className="music-meaning-timeline" aria-label="Hypothetical, evident, and determinate meaning over time">
        {stages.map((stage, index) => (
          <article className="music-meaning-stage" style={{ "--music-colour": stage.colour } as CSSProperties} key={stage.label}>
            <span className="k">{stage.label}</span>
            <h3>{stage.question}</h3>
            <p>{stage.body}</p>
            {index < stages.length - 1 && <span className="music-meaning-forward" aria-hidden="true">↓</span>}
          </article>
        ))}
        <div className="music-retro-arrow" aria-hidden="true"><span>later context reaches back</span> ↶</div>
      </div>
      <p className="music-inline-note"><Mark>■</Mark> {note}</p>
    </div>
  );
}

function FinalModel({ data }: { data: import("@/content/types").MeyerRecordContent }) {
  return (
    <div className="music-final-model" aria-label="Concept Lab synthesis of Meyer’s expectancy account">
      <p className="k"><Mark>✦</Mark> Concept Lab synthesis</p>
      <div className="music-final-frame">
        <span className="music-final-context">style + experience</span>
        <span className="music-final-arrow" aria-hidden="true">↓</span>
        <span className="music-final-context">current musical event</span>
        <span className="music-final-arrow" aria-hidden="true">↓</span>
        <span className="music-final-context">several possible continuations</span>
        <span className="music-final-arrow" aria-hidden="true">↓</span>
        <span className="music-final-context">expectation / tendency</span>
      </div>
      <div className="music-final-branches">
        {data.outcomes.variants.map((variant) => <span key={variant.label} style={{ "--music-colour": variant.colour } as CSSProperties}>{variant.label.toLowerCase()}</span>)}
      </div>
      <div className="music-final-after">
        <span>changing uncertainty / tension</span>
        <span aria-hidden="true">↓</span>
        <span>later clarification</span>
        <span aria-hidden="true">↓</span>
        <strong>changing affect + musical meaning</strong>
      </div>
      <div className="music-final-time">time frames every relationship; later context can revise the earlier event’s meaning</div>
    </div>
  );
}

export function MeyerBody({ record: r }: { record: TheoryRecord }) {
  const data = r.meyer;
  if (!data) return null;
  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "Where does this want to go?", "Where does this want to go?", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.opening.lede} />
      <div className="music-opening-context">
        <AudioExample label="The unresolved setup" notes={data.opening.context} description="A short synthetic tonal context pauses before its continuation." />
      </div>
      <AudioChoices context={data.opening.context} choices={data.opening.choices} />
      <p className="music-inline-note"><Mark>▲</Mark> Constructed tonal teaching examples. They illustrate expectation inside one learned tonal style; they are not a test of the listener and not empirical evidence.</p>
      <p className="music-callout">You were already listening to music that had not happened yet.</p>
      <p className="music-note">{data.opening.note}</p>
    </>
  ));

  add("embodied", "Music points forward", "Music points forward", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.embodied.lede} />
      <div className="music-point-list">
        {data.embodied.points.map((point, index) => <div className="music-point" key={point}><span>{String(index + 1).padStart(2, "0")}</span><Rich className="read" as="p" html={point} /></div>)}
      </div>
      <p className="music-inline-note"><Mark>●</Mark> {data.embodied.note}</p>
    </>
  ));

  add("branches", "One moment, several futures", "One moment, several futures", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.branches.lede} />
      <BranchingVisual current={data.branches.current} items={data.branches.items} />
      <p className="music-inline-note"><Mark>✦</Mark> {data.branches.note}</p>
    </>
  ));

  add("style", "Where did that expectation come from?", "Where did that expectation come from?", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.style.lede} />
      <Cards items={data.style.cards} />
      <p className="music-inline-note"><Mark>●</Mark> {data.style.note}</p>
    </>
  ));

  add("outcomes", "Same setup, different outcome", "Same setup, different outcome", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.outcomes.lede} />
      <div className="music-outcome-context">
        <AudioExample label="Shared musical setup" notes={data.outcomes.context} description="The same opening context used before the continuation changes." />
      </div>
      <div className="music-outcome-grid">
        {data.outcomes.variants.map((variant) => (
          <article className="music-outcome" style={{ "--music-colour": variant.colour } as CSSProperties} key={variant.label}>
            <span className="k">{variant.label}</span>
            <h3>{variant.title}</h3>
            <AudioExample label={variant.title} notes={[...data.outcomes.context, ...variant.notes]} description={variant.body} colour={variant.colour} />
          </article>
        ))}
      </div>
      <p className="music-question">{data.outcomes.question}</p>
      <p className="music-note">{data.outcomes.note}</p>
    </>
  ));

  add("delay", "Why delay feels unfinished", "Why delay feels unfinished", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.delay.lede} />
      <div className="music-process">
        {data.delay.steps.map((step, index) => <div className="music-process-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><Rich className="read" as="p" html={step} />{index < data.delay.steps.length - 1 && <b aria-hidden="true">↓</b>}</div>)}
      </div>
      <p className="music-inline-note"><Mark>■</Mark> {data.delay.note}</p>
    </>
  ));

  add("resolution", "Then it resolves", "Then it resolves", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.resolution.lede} />
      <div className="music-resolution sk-box tilt-r2">
        <div className="music-resolution-loop"><span>active tendency</span><b aria-hidden="true">→</b><span>continuation arrives</span><b aria-hidden="true">→</b><span>meaning becomes clearer</span></div>
        <Rich className="read" as="p" html={data.resolution.note} />
      </div>
    </>
  ));

  add("meaning", "Meaning rewrites itself", "Meaning rewrites itself", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.meaning.lede} />
      <MeaningTimeline stages={data.meaning.stages} note={data.meaning.note} />
      <FinalModel data={data} />
    </>
  ));

  add("gestalt", "The Gestalt underneath", "The Gestalt underneath", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={data.gestalt.lede} />
      <Cards items={data.gestalt.cards} />
      <p className="music-inline-note"><Mark>■</Mark> {data.gestalt.note}</p>
    </>
  ));

  add("listener", "Style lives in the listener", "Style lives in the listener", "var(--gold-deep)", (
    <>
      <Rich className="lede" as="p" html={data.listener.lede} />
      <Cards items={data.listener.cards} />
      <div className="music-style-guard"><span>SAME SOUND</span><b aria-hidden="true">↔</b><span>DIFFERENT LEARNING HISTORY</span><b aria-hidden="true">↔</b><span>DIFFERENT EXPECTANCY STRUCTURE</span></div>
      <p className="music-inline-note"><Mark>●</Mark> {data.listener.note}</p>
    </>
  ));

  add("evidence", "Does expectancy really change experience?", "Does expectancy really change experience?", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.evidence.lede} />
      <EvidenceXray items={data.evidence.items} />
    </>
  ));

  add("scope", "Expectation is not the whole emotion story", "Expectation is not the whole emotion story", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={data.scope.lede} />
      <div className="music-scope-grid">
        <div className="sk-box teal tilt-l2"><p className="k">Meyer helps explain</p><ul>{data.scope.explains.map((item) => <li key={item}><span>✓</span><Rich as="span" html={item} /></li>)}</ul></div>
        <div className="sk-box red tilt-r2"><p className="k">Meyer does not settle</p><ul>{data.scope.stops.map((item) => <li key={item}><span>?</span><Rich as="span" html={item} /></li>)}</ul></div>
      </div>
      <p className="music-inline-note"><Mark>?</Mark> {data.scope.note}</p>
    </>
  ));

  add("lineage", "What came after Meyer?", "What came after Meyer?", "var(--plum-deep)", (
    <>
      <Rich className="lede" as="p" html={data.lineage.lede} />
      <div className="music-lineage">
        {data.lineage.nodes.map((node, index) => (
          <div className="music-lineage-node" style={{ "--music-colour": node.colour } as CSSProperties} key={node.label}>
            <span className="music-lineage-number">0{index + 1}</span>
            <strong>{node.label}</strong>
            <p>{node.body}</p>
            {index < data.lineage.nodes.length - 1 && <span className="music-lineage-connector" aria-hidden="true">↘</span>}
          </div>
        ))}
      </div>
      <p className="music-inline-note"><Mark>✦</Mark> {data.lineage.note}</p>
    </>
  ));

  add("explains", "What Meyer explains", "What Meyer explains", "var(--teal)", (
    <div className="music-scope-list">{data.explains.map((item) => <Bullet key={item} icon="i-check" colour="var(--teal)" html={item} />)}</div>
  ));

  add("stops", "Where Meyer stops", "Where Meyer stops", "var(--red)", (
    <div className="music-scope-list">{data.stops.map((item) => <Bullet key={item} icon="i-warn" colour="var(--red)" html={item} />)}</div>
  ));

  add("trail", "The intellectual trail", "The intellectual trail", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={r.trailLede} />
      <div className="trail">{r.origins.map((origin) => <div className="trail-item" key={`${origin.year}-${origin.author}`}><span className="trail-year">{origin.year}</span><div><Rich as="h3" html={origin.author} /><Rich className="work" as="span" html={origin.work} /><Rich as="p" html={origin.contribution} /></div></div>)}</div>
    </>
  ));

  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={r.oversimplificationsLede} />
      <div className="grid2 music-misconception-grid">{r.oversimplifications.map((item, index) => <div className={index % 2 ? "tilt-r2" : "tilt-l2"} key={item}><Cloud colour="#E24E1B"><div className="music-cloud-row"><Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} /><Rich className="read" as="p" html={item} /></div></Cloud></div>)}</div>
    </>
  ));

  add("qualifications", "Still open", "Still open", "var(--teal)", <div className="music-scope-list">{r.qualifications.map((item) => <Bullet key={item} icon="i-q" colour="var(--teal)" html={item} />)}</div>);

  add("sources", "Sources", "Sources", "var(--teal)", (
    <>
      <div className="sk-box tilt-l2 music-source-box"><div className="music-source-heading"><Icon id="i-book" style={{ width: 26, height: 26, color: "var(--red)" }} /><h3>{r.minimumReadingLabel ?? "If you read five things"}</h3></div><SourceList items={r.minimumReading} /></div>
      <div className="music-more-sources"><span className="k">the rest of the trail</span><SourceList items={r.fullSources.filter((source) => !r.minimumReading.some((minimum) => minimum.citation === source.citation))} /></div>
    </>
  ));

  const related = (r.relatedTo ?? []).map((link) => ({ link, target: RECORDS.find((record) => record.id === link.recordId) })).filter((item) => item.target);
  if (related.length) {
    add("related", "Related records", "Related records", "var(--teal)", (
      <>
        <p className="lede">This record sits beside other Concept Lab lenses, but those links are not claims that the theories are interchangeable.</p>
        {related.map(({ link, target }) => {
          const kind = KIND[target!.kind];
          return <a className="rel-card" href={recordHref(target!)} key={link.recordId}><span className="rel-relation">this record {link.relation}</span><span className="rel-title">{target!.title}</span><span className="rel-hook">{target!.hook}</span><Rich className="rel-body read" as="span" html={link.body} /><span className="rel-go" style={{ color: kind.colour }}>{kind.cta} →</span></a>;
        })}
      </>
    ));
  }

  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", <div className="prov music-provenance">{r.provenance.map((item) => <div className="prov-item" key={item.label} data-reveal="rise"><span className="g" style={{ color: item.colour }}>{item.glyph}</span><div><h4>{item.label}</h4><p>{item.note}</p></div></div>)}</div>);

  const ordered = r.order ? [...blocks].sort((a, b) => {
    const rank = (key: string) => { const index = r.order!.indexOf(key); return index < 0 ? Number.MAX_SAFE_INTEGER : index; };
    return rank(a.key) - rank(b.key);
  }) : blocks;
  const toc = ordered.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`] as [string, string, string]);

  return (
    <RecordShell record={r} toc={toc}>
      {ordered.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}
    </RecordShell>
  );
}

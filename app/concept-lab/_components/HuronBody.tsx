"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import type { HuronLens, HuronRecordContent, HuronResponseWindow, HuronTimingPreset, Source, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { AudioExample } from "./AudioExample";
import { Rich, SecHead, Divider, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";
import { EvidenceXray as EvidenceCards } from "./TheoryPatterns";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function Mark({ children }: { children: string }) {
  return <span className="huron-mark">{children}</span>;
}

function Note({ glyph, children }: { glyph: string; children: ReactNode }) {
  return <p className="huron-note"><Mark>{glyph}</Mark> {children}</p>;
}

function Cards({ items }: { items: { label: string; body: string; colour: string }[] }) {
  return (
    <div className="huron-card-grid">
      {items.map((item, index) => (
        <article className={`huron-card sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ "--huron-colour": item.colour } as CSSProperties} key={item.label}>
          <span className="k">{item.label}</span>
          <p className="read">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

function Identity({ data }: { data: HuronRecordContent }) {
  return (
    <div className="huron-identity">
      <div><span className="k">KNOWLEDGE FORM</span><p>{data.identity.knowledgeForm}</p></div>
      <div><span className="k">STATUS</span><p>{data.identity.status}</p></div>
      <div><span className="k">DISCIPLINE</span><p>{data.identity.discipline}</p></div>
      <div><span className="k">ATLAS BRANCH</span><p>{data.identity.branch}</p></div>
    </div>
  );
}

function TimingStrip({ preset }: { preset: HuronTimingPreset }) {
  const delayed = preset.delay !== "0 ms";
  const actual = delayed ? 82 : 70;
  return (
    <div className="huron-timing-strip" role="img" aria-label={`${preset.label}: expected onset ${preset.expectedOnset}; actual onset ${preset.actualOnset}; delay ${preset.delay}.`}>
      <div className="huron-timing-axis"><span>context</span><span>expected arrival</span><span>outcome</span></div>
      <div className="huron-timing-track">
        <span className="huron-timing-context" />
        {delayed && <span className="huron-timing-expected" style={{ "--huron-left": "70%" } as CSSProperties}><b>expected</b></span>}
        <span className="huron-timing-actual" style={{ "--huron-left": `${actual}%` } as CSSProperties}><b>{delayed ? "actual" : "expected = actual"}</b></span>
        <span className="huron-timing-outcome" style={{ "--huron-left": `${actual}%` } as CSSProperties}>C5</span>
      </div>
      <p className="huron-timing-caption">Expected: {preset.expectedOnset} · actual: {preset.actualOnset} · delay: {preset.delay}</p>
    </div>
  );
}

function WaitForIt({ data }: { data: HuronRecordContent["opening"]["timing"] }) {
  const [selected, setSelected] = useState(0);
  const preset = data.presets[selected] ?? data.presets[0];
  if (!preset) return null;
  return (
    <div className="huron-interaction">
      <div className="huron-interaction-heading">
        <div><span className="k">▲ CONSTRUCTED TEACHING EXAMPLE</span><h3>Wait for it.</h3><p>{data.lede}</p></div>
        <span className="huron-interaction-state" aria-live="polite">{String(selected + 1).padStart(2, "0")} / {String(data.presets.length).padStart(2, "0")}</span>
      </div>
      <div className="huron-preset-buttons" role="group" aria-label="Wait for it timing conditions">
        {data.presets.map((option, index) => <button type="button" key={option.label} aria-pressed={index === selected} onClick={() => setSelected(index)}>{option.label}</button>)}
      </div>
      <p className="huron-interaction-question">{data.question}</p>
      <TimingStrip preset={preset} />
      <AudioExample key={preset.label} label={preset.label} events={preset.events} description={preset.body} colour={preset.colour} markers={preset.markers} />
      <div className="huron-audio-spec">
        <p><b>Timing:</b> expected {preset.expectedOnset} · actual {preset.actualOnset} · delay {preset.delay} · {preset.tempo}.</p>
        <p><b>Pitch / frequency:</b> {preset.pitch}.</p>
        <p><b>Held constant:</b> {preset.held}.</p>
        <p><b>Timbre / gain:</b> {preset.timbre} · {preset.gain}.</p>
        <p><b>Manipulated:</b> {preset.variable}.</p>
      </div>
      <Note glyph="▲">{data.note.replace("▲ ", "")}</Note>
    </div>
  );
}

function ResponseTimeline({ windows }: { windows: HuronResponseWindow[] }) {
  const row: Record<string, number> = { imagination: 1, tension: 2, prediction: 3, reaction: 4, appraisal: 5 };
  return (
    <div className="huron-timeline" role="img" aria-label="Outcome-centred ITPRA timeline. Imagination extends toward the outcome, tension operates near it, Prediction and Reaction begin after onset in parallel, and Appraisal forms a slower tail.">
      <div className="huron-timeline-axis"><span>long before</span><span>approaching outcome</span><b>OUTCOME ONSET</b><span>later / recurring</span></div>
      <div className="huron-timeline-lanes">
        <span className="huron-outcome-line" aria-hidden="true" />
        {windows.map((window) => (
          <article className={`huron-response-window huron-${window.key}`} key={window.key} style={{ "--huron-start": `${window.start}%`, "--huron-width": `${window.end - window.start}%`, "--huron-colour": window.colour, gridRow: row[window.key] } as CSSProperties}>
            <div><b>{window.label}</b><span>{window.epoch}</span></div>
            <p>{window.question}</p>
            <small>{window.body}</small>
          </article>
        ))}
      </div>
      <div className="huron-timeline-text">
        {windows.map((window) => <div key={window.key}><b>{window.label}</b><span>{window.function}</span><small>Boundary: {window.boundary}</small></div>)}
      </div>
    </div>
  );
}

function LensSwitch({ lenses }: { lenses: HuronLens[] }) {
  const [selected, setSelected] = useState(0);
  const lens = lenses[selected] ?? lenses[0];
  if (!lens) return null;
  return (
    <div className="huron-lens-interaction">
      <div className="huron-lens-buttons" role="group" aria-label="Choose an ITPRA question">
        {lenses.map((option, index) => <button type="button" key={option.label} aria-pressed={index === selected} onClick={() => setSelected(index)}>{option.label}</button>)}
      </div>
      <div className="huron-lens-result" aria-live="polite" style={{ "--huron-colour": lens.colour } as CSSProperties}>
        <span className="k">{lens.label}</span>
        <h3>{lens.question}</h3>
        <p>{lens.body}</p>
        <p className="huron-boundary">{lens.boundary}</p>
      </div>
    </div>
  );
}

function SurpriseInteraction({ data }: { data: HuronRecordContent["surprise"] }) {
  return (
    <div className="huron-interaction huron-surprise-interaction">
      <div className="huron-interaction-heading">
        <div><span className="k">▲ SAME SAFE EVENT · THREE QUESTIONS</span><h3>One surprise. Three responses.</h3><p>{data.lede}</p></div>
      </div>
      <AudioExample label="Fixed context + A♭4 surprise" events={data.events} description={data.event} colour="var(--red)" />
      <LensSwitch lenses={data.lenses} />
      <Note glyph="▲">{data.note.replace("▲ ", "")}</Note>
    </div>
  );
}

function ValenceTrace({ data }: { data: HuronRecordContent["valence"] }) {
  return (
    <div className="huron-valence-model" role="img" aria-label="A possible, non-deterministic valence contrast: initial predictive or reactive valence may differ from later appraisal, which may create contrastive enhancement.">
      <p className="k">possible contrast, not a required path</p>
      <div className="huron-valence-steps">
        {data.steps.map((step) => <article key={step.label} style={{ "--huron-colour": step.colour } as CSSProperties}><b>{step.label}</b><p>{step.body}</p></article>)}
      </div>
    </div>
  );
}

function SourceChannels({ sources }: { sources: HuronRecordContent["sourcesOfExpectation"]["sources"] }) {
  return (
    <div className="huron-source-channels" role="img" aria-label="Four concurrent expectation sources: schematic, veridical, dynamic, and conscious.">
      {sources.map((source) => <article key={source.label} style={{ "--huron-colour": source.colour } as CSSProperties}><span className="k">{source.label}</span><h3>{source.question}</h3><p>{source.body}</p><small>{source.memory}</small></article>)}
    </div>
  );
}

function FinalModel({ data }: { data: HuronRecordContent }) {
  return (
    <div className="huron-final-model" role="img" aria-label="Concept Lab synthesis: parallel expectation sources feed an outcome-centred timeline with imagination and tension before onset, prediction and reaction in parallel after onset, and a slower appraisal tail.">
      <p className="k"><Mark>✦</Mark> Concept Lab synthesis</p>
      <SourceChannels sources={data.sourcesOfExpectation.sources} />
      <ResponseTimeline windows={data.timeline.windows} />
      <p className="huron-final-boundary">{data.finalModelNote}</p>
    </div>
  );
}

function SourceList({ items }: { items: Source[] }) {
  return <>{items.map((source, index) => <div className="src-item" key={`${source.citation}-${index}`}><span className="n">{index + 1}</span><div><Rich className="c" as="div" html={source.citation} /><div className="w">{source.contribution}</div>{source.doi && <div className="doi">doi {source.doi}</div>}</div></div>)}</>;
}

export function HuronBody({ record: r }: { record: TheoryRecord }) {
  const data = r.huron;
  if (!data) return null;
  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "Wait for it", "Wait for it", "var(--red)", <><Rich className="lede" as="p" html={data.opening.lede} /><Identity data={data} /><p className="huron-question">{data.opening.question}</p><Note glyph="●">{data.opening.note.replace("● ", "")}</Note><WaitForIt data={data.opening.timing} /></>);
  add("overview", "Expectation isn’t one feeling", "Expectation isn’t one feeling", "var(--teal)", <><Rich className="lede" as="p" html={data.overview.lede} /><Cards items={data.overview.cards} /><Note glyph="■">{data.overview.note.replace("■ ", "")}</Note></>);
  add("timeline", "The outcome hinge", "The outcome hinge", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.timeline.lede} /><ResponseTimeline windows={data.timeline.windows} /><Note glyph="✦">{data.timeline.note.replace("✦ ", "")}</Note></>);
  add("imagination", "Before the event: imagine", "Before the event: imagine", "var(--teal)", <><Rich className="lede" as="p" html={data.imagination.lede} /><Cards items={data.imagination.cards} /><Note glyph="●">{data.imagination.note.replace("● ", "")}</Note></>);
  add("tension", "As it approaches: prepare", "As it approaches: prepare", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.tension.lede} /><Cards items={data.tension.cards} /><Note glyph="●">{data.tension.note.replace("● ", "")}</Note></>);
  add("outcome", "Then the outcome arrives", "Then the outcome arrives", "var(--red)", <><Rich className="lede" as="p" html={data.outcome.lede} /><Cards items={data.outcome.cards} /><Note glyph="■">{data.outcome.note.replace("■ ", "")}</Note></>);
  add("prediction", "Prediction happens before — response after", "Prediction happens before — response after", "var(--red)", <><Rich className="lede" as="p" html={data.prediction.lede} /><Cards items={data.prediction.cards} /><Note glyph="●">{data.prediction.note.replace("● ", "")}</Note></>);
  add("parallel", "Two fast questions at onset", "Two fast questions at onset", "var(--red)", <><Rich className="lede" as="p" html={data.parallel.lede} /><Cards items={data.parallel.cards} /><Note glyph="●">{data.parallel.note.replace("● ", "")}</Note></>);
  add("appraisal", "Then context changes the story", "Then context changes the story", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.appraisal.lede} /><Cards items={data.appraisal.cards} /><Note glyph="■">{data.appraisal.note.replace("■ ", "")}</Note></>);
  add("surprise", "One surprise, three responses", "One surprise, three responses", "var(--red)", <><Rich className="lede" as="p" html={data.surprise.lede} /><SurpriseInteraction data={data.surprise} /></>);
  add("valence", "Why can surprise feel good?", "Why can surprise feel good?", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.valence.lede} /><ValenceTrace data={data.valence} /><Note glyph="●">{data.valence.note.replace("● ", "")}</Note></>);
  add("sourcesOfExpectation", "Where did the expectation come from?", "Where did the expectation come from?", "var(--teal)", <><Rich className="lede" as="p" html={data.sourcesOfExpectation.lede} /><SourceChannels sources={data.sourcesOfExpectation.sources} /><Note glyph="●">{data.sourcesOfExpectation.note.replace("● ", "")}</Note></>);
  add("schematicVeridical", "One event, different expectations", "One event, different expectations", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.schematicVeridical.lede} /><Cards items={data.schematicVeridical.cards} /><Note glyph="▲">{data.schematicVeridical.note.replace("▲ ", "")}</Note></>);
  add("dynamic", "How does music teach you what to expect?", "How does music teach you what to expect?", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.dynamic.lede} /><Cards items={data.dynamic.cards} /><Note glyph="■">{data.dynamic.note.replace("■ ", "")}</Note></>);
  add("evidence", "Can we measure expectancy effects?", "Can we measure expectancy effects?", "var(--red)", <><Rich className="lede" as="p" html={data.evidence.lede} /><EvidenceCards items={data.evidence.items} /><Note glyph="■">{data.evidence.note.replace("■ ", "")}</Note></>);
  add("adaptive", "Five adaptations — or a useful theory?", "Five adaptations — or a useful theory?", "var(--plum-deep)", <><Rich className="lede" as="p" html={data.adaptive.lede} /><Cards items={data.adaptive.cards} /><Note glyph="●">{data.adaptive.note.replace("● ", "")}</Note></>);
  add("scope", "What ITPRA explains", "What ITPRA explains", "var(--teal)", <><Rich className="lede" as="p" html={data.scope.lede} /><FinalModel data={data} /><div className="huron-scope-grid"><div className="sk-box teal"><p className="k">ITPRA helps explain</p><ul>{data.scope.explains.map((item) => <li key={item}>✓ {item}</li>)}</ul></div><div className="sk-box red"><p className="k">Where it stops</p><ul>{data.scope.stops.map((item) => <li key={item}>? {item}</li>)}</ul></div></div><Note glyph="?">{data.scope.note.replace("? ", "")}</Note></>);
  add("trail", "The intellectual / evidence trail", "The intellectual / evidence trail", "var(--teal)", <><Rich className="lede" as="p" html={r.trailLede} /><div className="huron-trail">{r.origins.map((origin) => <div className="huron-trail-item" key={`${origin.year}-${origin.author}`}><span>{origin.year}</span><div><Rich as="h3" html={origin.author} /><i>{origin.work}</i><p>{origin.contribution}</p></div></div>)}</div></>);
  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", <><Rich className="lede" as="p" html={r.oversimplificationsLede} /><div className="huron-misconceptions">{r.oversimplifications.map((item, index) => <div className="sk-box" key={item}><span className="huron-misconception-number">0{index + 1}</span><Rich className="read" as="p" html={item} /></div>)}</div></>);
  add("qualifications", "Still open", "Still open", "var(--plum-deep)", <><div className="huron-qualifications">{r.qualifications.map((item) => <p key={item}>? {item}</p>)}</div></>);
  add("sources", "Sources", "Sources", "var(--teal)", <><p className="k">{r.minimumReadingLabel ?? "Minimum reading"}</p><div className="huron-source-list"><SourceList items={r.minimumReading} /></div><details className="huron-more-sources"><summary>Show the full source trail</summary><SourceList items={r.fullSources} /></details></>);
  if (r.relatedTo?.length) add("related", "Related records", "Related records", "var(--teal)", <><p className="lede">{r.relatedToLede}</p><div className="huron-related">{r.relatedTo.map((link) => { const target = RECORDS.find((record) => record.id === link.recordId); if (!target) return null; const kind = KIND[target.kind]; return <a href={recordHref(target)} key={link.recordId}><span className="k">{link.relation}</span><h3>{target.title}</h3><p>{link.body}</p><strong style={{ color: kind.colour }}>{kind.cta} →</strong></a>; })}</div></>);
  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", <div className="prov huron-provenance">{r.provenance.map((item) => <div className="prov-item" key={item.label} data-reveal="rise"><span className="g" style={{ color: item.colour }}>{item.glyph}</span><div><h4>{item.label}</h4><p>{item.note}</p></div></div>)}</div>);

  const toc: [string, string, string][] = blocks.map((block, index) => [`${String(index + 1).padStart(2, "0")}`, block.toc, `s${index + 1}`]);
  return <RecordShell record={r} toc={toc}>{blocks.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}

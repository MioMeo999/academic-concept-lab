"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import type { Source, StatisticalRecordContent, StatisticalSection, StatisticalStream, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { AudioExample } from "./AudioExample";
import { EvidenceXray as EvidenceCards } from "./TheoryPatterns";
import { Divider, Rich, SecHead, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function Mark({ children }: { children: string }) {
  return <span className="stat-mark">{children}</span>;
}

function Note({ text, fallback = "■" }: { text: string; fallback?: string }) {
  const match = text.match(/^([●■▲✦?])\s*/);
  const glyph = match?.[1] ?? fallback;
  const body = match ? text.slice(match[0].length) : text;
  return <p className="stat-note"><Mark>{glyph}</Mark> {body}</p>;
}

function Cards({ items }: { items: StatisticalSection["cards"] }) {
  return (
    <div className="stat-card-grid">
      {items.map((item, index) => (
        <article className={`stat-card sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ "--stat-colour": item.colour } as CSSProperties} key={item.label}>
          <span className="k">{item.label}</span>
          <p className="read">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

function Identity({ data }: { data: StatisticalRecordContent["identity"] }) {
  return (
    <div className="stat-identity">
      <div><span className="k">KNOWLEDGE FORM</span><p>{data.knowledgeForm}</p></div>
      <div><span className="k">STATUS</span><p>{data.status}</p></div>
      <div><span className="k">DISCIPLINE</span><p>{data.discipline}</p></div>
      <div><span className="k">ATLAS BRANCH</span><p>{data.branch}</p></div>
    </div>
  );
}

function SectionIntro({ data }: { data: StatisticalSection }) {
  return <><Rich className="lede" as="p" html={data.lede} /><Cards items={data.cards} /><Note text={data.note} /></>;
}

function ProbabilityRows({ stream }: { stream: StatisticalStream }) {
  const rows = stream.transitions;
  return (
    <div className="stat-transition-list" aria-label="Computed transition counts and probabilities">
      {rows.map((row) => (
        <div className={`stat-transition-row ${row.kind}`} key={`${row.from}-${row.to}`}>
          <span className="stat-transition-pair"><b>{row.from} → {row.to}</b><small>{row.kind === "within" ? "within unit" : "across unit boundary"}</small></span>
          <span><b>{row.count} / {row.opportunities}</b><small>{row.probability}</small></span>
        </div>
      ))}
    </div>
  );
}

function FrequencyRows({ stream }: { stream: StatisticalStream }) {
  return (
    <div className="stat-frequency-grid" aria-label="Computed event frequencies">
      {stream.eventFrequencies.map((item) => (
        <div className="stat-frequency-cell" key={item.label}>
          <b>{item.label}</b><span>{item.count}</span><small>{item.share} of stream</small>
        </div>
      ))}
    </div>
  );
}

function StreamLab({ data }: { data: StatisticalRecordContent["hiddenLanguage"] }) {
  const [lens, setLens] = useState<"sound" | "structure">("sound");
  const { stream } = data;
  return (
    <div className="stat-lab sk-box tilt-l2">
      <div className="stat-lab-head">
        <div><p className="k">▲ constructed Saffran-style teaching demonstration</p><h3>A hidden musical language</h3></div>
        <span className="stat-lab-state" aria-live="polite">{lens === "sound" ? "sound lens" : "structure lens"}</span>
      </div>
      <div className="stat-lens-buttons" role="group" aria-label="Choose a lens for the hidden musical language">
        <button type="button" aria-pressed={lens === "sound"} onClick={() => setLens("sound")}>Sound</button>
        <button type="button" aria-pressed={lens === "structure"} onClick={() => setLens("structure")}>Statistical structure</button>
      </div>
      <AudioExample
        key={lens}
        label="One continuous stream"
        events={stream.events}
        description="The same tone duration, IOI, timbre, gain, and articulation continue across the entire stream. No acoustic marker announces a unit boundary."
        colour="var(--teal)"
      />
      {lens === "sound" ? (
        <div className="stat-sound-note"><span className="k">WHAT THE SOUND GIVES YOU</span><p>It gives you a continuous sequence of tones. The abstract units are not marked by pauses, accents, loudness, timbre, or special articulation.</p></div>
      ) : (
        <div className="stat-structure-view">
          <div className="stat-unit-grid">
            {stream.units.map((unit) => <div className="stat-unit-card" key={unit.label}><span className="k">candidate unit</span><b>{unit.label}</b><span>{unit.notes.join(" · ")}</span></div>)}
          </div>
          <p className="k stat-sequence-label">actual unit order · {stream.unitSequence.length} units / {stream.noteSequence.length} tones</p>
          <div className="stat-unit-sequence" aria-label={`Unit sequence ${stream.unitSequence.join(", ")}`}>
            {stream.unitSequence.map((unit, index) => <span key={`${unit}-${index}`}>{unit}</span>)}
          </div>
          <p className="k stat-sequence-label">event frequency</p>
          <FrequencyRows stream={stream} />
          <p className="k stat-sequence-label">actual pair counts and conditional probabilities</p>
          <ProbabilityRows stream={stream} />
          <div className="stat-audit-grid">
            <div><span className="k">within-unit intervals</span><p>{stream.withinAudit.direction} · mean {stream.withinAudit.mean} · range {stream.withinAudit.range}</p><small>{stream.withinAudit.distribution}</small></div>
            <div><span className="k">boundary intervals</span><p>{stream.boundaryAudit.direction} · mean {stream.boundaryAudit.mean} · range {stream.boundaryAudit.range}</p><small>{stream.boundaryAudit.distribution}</small></div>
          </div>
        </div>
      )}
      <details className="stat-details"><summary>Read the audio specification and boundary audit</summary><div className="stat-spec-grid">{Object.entries(stream.audioSpec).map(([label, value]) => <div key={label}><span className="k">{label}</span><p>{value}</p></div>)}</div><div className="stat-pitch-grid">{stream.pitchMapping.map((item) => <span key={item.label}><b>{item.label}</b> MIDI {item.midi} · {item.frequency}</span>)}</div><ul>{stream.acousticAudit.map((item) => <li key={item}>{item}</li>)}</ul></details>
      <Note text={data.note} />
    </div>
  );
}

function WorldLab({ data }: { data: StatisticalRecordContent["worlds"] }) {
  const [selected, setSelected] = useState(0);
  const world = data.worlds[selected] ?? data.worlds[0];
  return (
    <div className="stat-world-lab sk-box tilt-r2">
      <div className="stat-lab-head"><div><p className="k">▲ pedagogical micro-world</p><h3>Same context. Different history.</h3></div><span className="stat-lab-state" aria-live="polite">{world.label}</span></div>
      <div className="stat-world-buttons" role="group" aria-label="Choose an exposure world">
        {data.worlds.map((option, index) => <button type="button" key={option.label} aria-pressed={index === selected} onClick={() => setSelected(index)}>{option.label}</button>)}
      </div>
      <p className="stat-world-question">{data.testContext}</p>
      <AudioExample key={world.label} label={`${world.label} exposure sequence`} events={world.events} description="The pitch mapping, timing, timbre, gain, and envelope are held constant. The exposure history changes the controlled source→outcome counts." colour={selected ? "var(--red)" : "var(--teal)"} />
      <div className="stat-world-pairs">
        {world.pairs.map((pair) => <div key={`${pair.from}-${pair.to}`}><span>{pair.from} → {pair.to}</span><b>{pair.count}</b></div>)}
      </div>
      <div className="stat-world-calculation">
        {world.conditionals.map((item) => <div key={item.label}><span className="k">{item.label}</span><strong>{item.probability}</strong><span className="stat-prob-bar"><i style={{ width: `${(item.count / item.opportunities) * 100}%` }} /></span></div>)}
      </div>
      <div className="stat-marginal-row"><span className="k">matched marginal totals</span>{world.marginalTotals.map((item) => <b key={item.label}>{item.label} total = {item.count}</b>)}</div>
      <p className="stat-world-reveal"><b>{data.testContext}</b> · {world.label}: {world.conditionals[0].label.replace("P(Y | X)", "Y")} is {world.conditionals[0].probability}; {world.conditionals[1].label.replace("P(Z | X)", "Z")} is {world.conditionals[1].probability}.</p>
      <details className="stat-details"><summary>Read the sequence validation note</summary><p>{world.note}</p><p>{data.audioSpec}</p></details>
      <Note text={data.note} />
    </div>
  );
}

function FinalModel({ data }: { data: StatisticalRecordContent["model"] }) {
  return (
    <div className="stat-final-model" aria-label="Concept Lab synthesis of exposure, learned regularities, expectation, and new experience">
      <p className="k"><Mark>✦</Mark> Concept Lab synthesis</p>
      <p className="lede">{data.lede}</p>
      <div className="stat-model-flow">
        {data.steps.map((step, index) => <span key={step.label} className="stat-model-step"><span className="stat-model-node" style={{ "--stat-colour": step.colour } as CSSProperties}><b>{step.label}</b><small>{step.body}</small></span>{index < data.steps.length - 1 && <span className="stat-model-arrow" aria-hidden="true">↓</span>}</span>)}
      </div>
      <p className="stat-model-loop">↺ new experience supplies further input</p>
      <Note text={data.note} />
    </div>
  );
}

function SourceList({ items }: { items: Source[] }) {
  return <>{items.map((source, index) => <div className="src-item" key={`${source.citation}-${index}`}><span className="n">{index + 1}</span><div><Rich className="c" as="div" html={source.citation} /><div className="w">{source.contribution}</div>{source.doi && <div className="doi">doi {source.doi}</div>}</div></div>)}</>;
}

export function StatisticalBody({ record: r }: { record: TheoryRecord }) {
  const data = r.statistical;
  if (!data) return null;
  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "How did your ear learn?", "How did your ear learn the pattern?", "var(--teal)", <><SectionIntro data={data.opening} /><Identity data={data.identity} /></>);
  add("exposure", "No one explained the rule", "No one had to explain the rule", "var(--teal)", <SectionIntro data={data.exposure} />);
  add("frequency", "Some sounds occur more often", "Some sounds occur more often", "var(--gold-deep)", <SectionIntro data={data.frequency} />);
  add("transition", "What follows what?", "What tends to follow what?", "var(--red)", <SectionIntro data={data.transition} />);
  add("comparison", "Common ≠ predictable", "Common isn’t the same as predictable", "var(--red)", <SectionIntro data={data.comparison} />);
  add("hiddenLanguage", "A hidden musical language", "A hidden musical language", "var(--teal)", <><Rich className="lede" as="p" html={data.hiddenLanguage.lede} /><StreamLab data={data.hiddenLanguage} /></>);
  add("segmentation", "Where did the boundary come from?", "Where did the boundary come from?", "var(--teal)", <SectionIntro data={data.segmentation} />);
  add("enculturation", "Years of listening", "Years of listening change the model", "var(--teal)", <SectionIntro data={data.enculturation} />);
  add("clocks", "Two clocks of learning", "Two clocks of learning", "var(--gold-deep)", <SectionIntro data={data.clocks} />);
  add("newWorld", "A new musical world", "Can you learn a new musical world?", "var(--red)", <SectionIntro data={data.newWorld} />);
  add("liking", "Learning isn’t liking", "Learning isn’t liking", "var(--red)", <SectionIntro data={data.liking} />);
  add("worlds", "Same context, different history", "Same context. Different history.", "var(--teal)", <><Rich className="lede" as="p" html={data.worlds.lede} /><WorldLab data={data.worlds} /></>);
  add("prediction", "Learning isn’t prediction", "Learning isn’t prediction", "var(--red)", <><SectionIntro data={data.prediction} /><FinalModel data={data.model} /></>);
  add("tonalGestalt", "Tonal hierarchy, Gestalt, expectation", "Tonal hierarchy, Gestalt, and expectation", "var(--gold-deep)", <SectionIntro data={data.tonalGestalt} />);
  add("mechanism", "Does the brain count probabilities?", "Does the brain really count probabilities?", "var(--plum-deep)", <SectionIntro data={data.mechanism} />);
  add("realMusic", "Real music is more than A → B", "Real music is more than A → B", "var(--teal)", <SectionIntro data={data.realMusic} />);
  add("explains", "What it explains", "What statistical learning explains", "var(--teal)", <SectionIntro data={data.explains} />);
  add("stops", "Where the framework stops", "Where the framework stops", "var(--red)", <SectionIntro data={data.stops} />);
  add("trail", "The intellectual trail", "The intellectual trail", "var(--teal)", <><Rich className="lede" as="p" html={r.trailLede} /><div className="stat-trail">{r.origins.map((origin) => <div className="stat-trail-item" key={`${origin.year}-${origin.author}`}><span>{origin.year}</span><div><Rich as="h3" html={origin.author} /><i>{origin.work}</i><p>{origin.contribution}</p></div></div>)}</div></>);
  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", <><Rich className="lede" as="p" html={r.oversimplificationsLede} /><div className="stat-misconceptions">{r.oversimplifications.map((item, index) => <div className="sk-box" key={item}><span>{String(index + 1).padStart(2, "0")}</span><Rich className="read" as="p" html={item} /></div>)}</div></>);
  add("qualifications", "Still open", "Still open", "var(--plum-deep)", <div className="stat-open-list">{r.qualifications.map((item) => <p key={item}><Mark>?</Mark> {item}</p>)}</div>);
  add("evidence", "Evidence X-ray", "What has actually been tested?", "var(--teal)", <><Rich className="lede" as="p" html={data.evidence.lede} /><EvidenceCards items={data.evidence.items} /><Note text={data.evidence.note} /></>);
  add("sources", "Sources", "Sources", "var(--teal)", <><div className="sk-box tilt-l2"><div className="stat-source-heading"><span className="k">if you read five things</span><h3>Start here</h3></div><SourceList items={r.minimumReading} /></div><div className="stat-source-trail"><span className="k">the full trail</span><SourceList items={r.fullSources} /></div></>);
  if (r.relatedTo?.length) add("related", "Related records", "Related records", "var(--teal)", <><p className="lede">{r.relatedToLede}</p><div className="stat-related">{r.relatedTo.map((link) => { const target = RECORDS.find((record) => record.id === link.recordId); if (!target) return null; const kind = KIND[target.kind]; return <a href={recordHref(target)} key={link.recordId}><span className="k">{link.relation}</span><h3>{target.title}</h3><p>{link.body}</p><strong style={{ color: kind.colour }}>{kind.cta} →</strong></a>; })}</div></>);
  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", <div className="prov stat-provenance">{r.provenance.map((item) => <div className="prov-item" key={item.label}><span className="g" style={{ color: item.colour }}>{item.glyph}</span><div><h4>{item.label}</h4><p>{item.note}</p></div></div>)}</div>);

  const toc: [string, string, string][] = blocks.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`]);
  return <RecordShell record={r} toc={toc}>{blocks.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}

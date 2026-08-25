"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import type { PredictivePrecisionContext, PredictiveProcessingRecordContent, PredictiveSection, Source, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { Divider, Rich, SecHead, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function Mark({ children }: { children: string }) {
  return <span className="pp-mark" aria-hidden="true">{children}</span>;
}

function Note({ text, fallback = "■" }: { text: string; fallback?: string }) {
  const match = text.match(/^([●■▲✦?])\s*/);
  const glyph = match?.[1] ?? fallback;
  const body = match ? text.slice(match[0].length) : text;
  return <p className="pp-note"><Mark>{glyph}</Mark> {body}</p>;
}

function Cards({ data }: { data: PredictiveSection }) {
  return (
    <>
      <Rich className="lede" as="p" html={data.lede} />
      <div className="pp-card-grid">
        {data.cards.map((item, index) => (
          <article className={`pp-card sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ "--pp-colour": item.colour } as CSSProperties} key={item.label}>
            <span className="k">{item.label}</span>
            <p className="read">{item.body}</p>
          </article>
        ))}
      </div>
      <Note text={data.note} />
    </>
  );
}

function Identity({ data }: { data: PredictiveProcessingRecordContent["identity"] }) {
  return (
    <div className="pp-identity">
      <div><span className="k">KNOWLEDGE FORM</span><p>{data.knowledgeForm}</p></div>
      <div><span className="k">STATUS</span><p>{data.status}</p></div>
      <div><span className="k">DISCIPLINE</span><p>{data.discipline}</p></div>
      <div><span className="k">ATLAS BRANCH</span><p>{data.branch}</p></div>
    </div>
  );
}

function MessagePassing() {
  return (
    <figure className="pp-message-map" aria-labelledby="pp-message-caption">
      <div className="pp-message-node teal"><b>HIGHER-LEVEL MODEL</b><span>hypothesis about a current state</span></div>
      <div className="pp-message-arrow" aria-hidden="true"><span>prediction ↓</span><i>↓</i></div>
      <div className="pp-message-node gold"><b>LOWER-LEVEL / SENSORY STATE</b><span>expected activity under that hypothesis</span></div>
      <div className="pp-message-arrow up" aria-hidden="true"><span>prediction error ↑</span><i>↑</i></div>
      <div className="pp-message-node red"><b>HIGHER LEVEL</b><span>receives mismatch information</span></div>
      <figcaption id="pp-message-caption">● Canonical predictive-coding motif, simplified for teaching. Direction is meaningful; this is not a complete established cortical circuit.</figcaption>
    </figure>
  );
}

function normalPath(sigma: number) {
  const points = Array.from({ length: 25 }, (_, index) => -180 + index * 15);
  const peak = 1;
  return points.map((x, index) => {
    const density = Math.exp(-0.5 * ((x / sigma) ** 2)) / peak;
    const px = x + 180;
    const py = 84 - density * 60;
    return `${index === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`;
  }).join(" ");
}

function PrecisionContext({ context, focused, onFocus }: { context: PredictivePrecisionContext; focused: boolean; onFocus: () => void }) {
  const standardisedDisplacement = context.targetOffsetMs / context.sigmaMs;
  const targetX = 180 + context.targetOffsetMs;
  return (
    <article className={`pp-precision-context ${focused ? "is-focused" : ""}`} style={{ "--pp-colour": context.colour } as CSSProperties}>
      <button type="button" className="pp-context-button" aria-pressed={focused} onClick={onFocus}>
        <span className="k">{context.label}</span>
        <strong>{context.history}</strong>
      </button>
      <svg className="pp-envelope" viewBox="0 0 360 100" role="img" aria-label={`${context.label}: constructed prediction envelope with expected onset at zero and the same target event 120 milliseconds late`}>
        <line x1="180" x2="180" y1="12" y2="88" className="pp-mean" />
        <path d={normalPath(context.sigmaMs)} className="pp-curve" />
        <line x1={targetX} x2={targetX} y1="16" y2="88" className="pp-target" />
        <text x="180" y="98" textAnchor="middle">expected 0 ms</text>
        <text x={targetX} y="12" textAnchor="middle">+120 ms</text>
      </svg>
      <div className="pp-envelope-stats"><span>σ = {context.sigmaMs} ms</span><span>same target: +120 ms</span></div>
      <p className="read">The target is {standardisedDisplacement.toFixed(2)}σ from the shared expected mean. {context.interpretation}</p>
    </article>
  );
}

function PrecisionInteraction({ data }: { data: PredictiveProcessingRecordContent["precisionInteraction"] }) {
  const [focus, setFocus] = useState(0);
  const selected = data.contexts[focus];
  return (
    <figure className="pp-interaction pp-precision-interaction sk-box tilt-l2">
      <div className="pp-interaction-head">
        <div><p className="k"><Mark>▲</Mark> constructed Gaussian predictive-processing illustration</p><h3>Same deviation. Different precision.</h3></div>
        <span className="pp-state" aria-live="polite">{selected.label}</span>
      </div>
      <Rich className="read" as="p" html={data.lede} />
      <div className="pp-control-row" role="group" aria-label="Choose a rhythmic context to inspect">
        {data.contexts.map((context, index) => <button type="button" key={context.label} aria-pressed={focus === index} onClick={() => setFocus(index)}>{context.label}</button>)}
      </div>
      <div className="pp-constant-strip" aria-label="Constants held across both contexts">
        <span>same target event</span><span>same pitch</span><span>same duration</span><span>same timbre</span><span>same gain</span><span>same +120 ms displacement</span>
      </div>
      <div className="pp-precision-grid">
        {data.contexts.map((context, index) => <PrecisionContext context={context} focused={focus === index} onFocus={() => setFocus(index)} key={context.label} />)}
      </div>
      <figcaption className="pp-caption">{data.note}</figcaption>
    </figure>
  );
}

function OmissionInteraction({ data }: { data: PredictiveProcessingRecordContent["omission"] }) {
  const [condition, setCondition] = useState<"present" | "omitted">("present");
  return (
    <figure className="pp-interaction pp-omission-interaction sk-box tilt-r2">
      <div className="pp-interaction-head">
        <div><p className="k"><Mark>▲</Mark> constructed teaching example</p><h3>The note that never came.</h3></div>
        <span className="pp-state" aria-live="polite">{condition === "present" ? "expected event present" : "expected event omitted"}</span>
      </div>
      <Rich className="read" as="p" html={data.lede} />
      <div className="pp-control-row" role="group" aria-label="Choose whether the expected target is present">
        <button type="button" aria-pressed={condition === "present"} onClick={() => setCondition("present")}>Expected event present</button>
        <button type="button" aria-pressed={condition === "omitted"} onClick={() => setCondition("omitted")}>Expected event omitted</button>
      </div>
      <div className="pp-omission-sequence" aria-live="polite">
        <div className="pp-beats" aria-label={`Four preceding ${data.preceding.join(", ")} events followed by an expected onset`}>
          {data.preceding.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
          <i aria-hidden="true">→</i>
          <span className="pp-expected-marker">expected onset</span>
        </div>
        <div className={`pp-target-state ${condition}`}><span className="k">AT THE EXPECTED ONSET</span><strong>{condition === "present" ? data.expected : "NO SENSORY EVENT ARRIVED HERE"}</strong><p>{condition === "present" ? "The expected target is present." : "Predicted input ≠ actual silence."}</p></div>
      </div>
      <figcaption className="pp-caption">{data.note}</figcaption>
    </figure>
  );
}

function EvidenceCards({ items }: { items: PredictiveProcessingRecordContent["signals"]["items"] }) {
  return (
    <div className="pp-evidence-grid">
      {items.map((item, index) => (
        <article className={`pp-evidence sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} key={item.title}>
          <header><span className="pp-evidence-kind">{item.label}</span><span className="pp-evidence-number">0{index + 1}</span><h3>{item.title}</h3></header>
          <p className="model-src">{item.citation}</p>
          {item.design && <p className="read pp-evidence-design"><b>Design:</b> {item.design}</p>}
          <div className="pp-evidence-inner"><div><span className="k">{item.testedLabel}</span><p className="read">{item.tested}</p></div><div><span className="k">{item.foundLabel}</span><p className="read">{item.found}</p></div><div className="pp-evidence-limit"><span className="k">what it did not test</span><p className="read">{item.notTested}</p></div></div>
          {item.doi && <p className="doi">doi {item.doi}</p>}
        </article>
      ))}
    </div>
  );
}

function FinalModel({ data }: { data: PredictiveProcessingRecordContent["finalModel"] }) {
  const [context, model, prediction, actual, error, update, updated] = data.nodes;
  return (
    <figure className="pp-final-model sk-box tilt-l2" aria-labelledby="pp-final-caption">
      <p className="k"><Mark>✦</Mark> Concept Lab synthesis</p>
      <Rich className="lede" as="p" html={data.lede} />
      <div className="pp-final-map">
        <span className="pp-final-node" style={{ "--pp-colour": context.colour } as CSSProperties}><b>{context.label}</b><small>{context.body}</small></span>
        <span className="pp-final-arrow">↓</span>
        <span className="pp-final-node" style={{ "--pp-colour": model.colour } as CSSProperties}><b>{model.label}</b><small>{model.body}</small></span>
        <span className="pp-final-arrow"><span>predicts</span> ↓</span>
        <div className="pp-final-compare">
          <span className="pp-final-node" style={{ "--pp-colour": prediction.colour } as CSSProperties}><b>{prediction.label}</b><small>{prediction.body}</small></span>
          <span className="pp-final-compare-word">compare ↕</span>
          <span className="pp-final-node" style={{ "--pp-colour": actual.colour } as CSSProperties}><b>{actual.label}</b><small>{actual.body}</small></span>
        </div>
        <span className="pp-final-arrow"><span>mismatch</span> ↓</span>
        <span className="pp-final-node" style={{ "--pp-colour": error.colour } as CSSProperties}><b>{error.label}</b><small>{error.body}</small></span>
        <div className="pp-final-branches">
          <span className="pp-final-node" style={{ "--pp-colour": update.colour } as CSSProperties}><b>{update.label}</b><small>{update.body}</small></span>
          <span className="pp-final-node" style={{ "--pp-colour": updated.colour } as CSSProperties}><b>{updated.label}</b><small>{updated.body}</small></span>
        </div>
      </div>
      <p className="pp-final-loop">↺ updated model → new predictions; attention / action can alter sampling</p>
      <figcaption id="pp-final-caption">{data.note}</figcaption>
    </figure>
  );
}

function SourceList({ items }: { items: Source[] }) {
  return <>{items.map((item, index) => <div className="src-item" key={`${item.citation}-${index}`}><span className="n">{index + 1}</span><div><Rich className="c" as="div" html={item.citation} /><div className="w">{item.contribution}</div>{item.doi && <div className="doi">doi {item.doi}</div>}</div></div>)}</>;
}

function Trail({ record }: { record: TheoryRecord }) {
  return <><Rich className="lede" as="p" html={record.trailLede} /><div className="pp-trail">{record.origins.map((origin) => <div className="pp-trail-item" key={`${origin.year}-${origin.author}`}><span>{origin.year}</span><div><Rich as="h3" html={origin.author} /><i>{origin.work}</i><p>{origin.contribution}</p></div></div>)}</div></>;
}

function Related({ record }: { record: TheoryRecord }) {
  return (
    <>
      <Rich className="lede" as="p" html={record.relatedToLede ?? ""} />
      <div className="pp-related">
        {(record.relatedTo ?? []).map((link) => {
          const target = RECORDS.find((item) => item.id === link.recordId);
          if (!target) return null;
          const kind = KIND[target.kind];
          return <a href={recordHref(target)} key={link.recordId}><span className="k">{link.relation}</span><h3>{target.title}</h3><p>{link.body}</p><strong style={{ color: kind.colour }}>{kind.cta} →</strong></a>;
        })}
      </div>
    </>
  );
}

export function PredictiveProcessingBody({ record: r }: { record: TheoryRecord }) {
  const data = r.predictiveProcessing;
  if (!data) return null;
  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "Don’t just hear it. Predict it.", "Don’t just hear it. Predict it.", "var(--teal)", <><Cards data={data.opening} /><Identity data={data.identity} /></>);
  add("nextNote", "Prediction is bigger than next-note expectation", "Prediction is bigger than next-note expectation", "var(--teal)", <Cards data={data.nextNote} />);
  add("generative", "What caused this sound?", "What caused this sound? Generative models", "var(--gold-deep)", <Cards data={data.generative} />);
  add("messagePassing", "Predictions travel down; errors travel up", "Predictions travel down; unexplained information travels up", "var(--red)", <><Cards data={data.messagePassing} /><MessagePassing /></>);
  add("error", "Error is information", "Error is information. Prediction error", "var(--red)", <Cards data={data.error} />);
  add("precisionInteraction", "Same deviation. Different precision.", "Same deviation. Different precision.", "var(--red)", <><Rich className="lede" as="p" html={data.precisionInteraction.lede} /><PrecisionInteraction data={data.precisionInteraction} /></>);
  add("precision", "Which error should matter?", "Which error should matter? Precision", "var(--gold-deep)", <Cards data={data.precision} />);
  add("firstSecond", "What are you predicting about your prediction?", "What are you predicting about your prediction?", "var(--teal)", <Cards data={data.firstSecond} />);
  add("attention", "Attention changes the weight", "Attention changes the weight", "var(--gold-deep)", <Cards data={data.attention} />);
  add("omission", "The note that never came", "The note that never came", "var(--red)", <><Rich className="lede" as="p" html={data.omission.lede} /><OmissionInteraction data={data.omission} /></>);
  add("hierarchy", "Prediction happens at more than one level", "Prediction happens at more than one level", "var(--teal)", <Cards data={data.hierarchy} />);
  add("zeroError", "Why not listen to one note forever?", "If the brain minimises error, why not listen to one note forever?", "var(--red)", <Cards data={data.zeroError} />);
  add("pcm", "Predictive Coding of Music", "Predictive Coding of Music", "var(--teal)", <Cards data={data.pcm} />);
  add("culture", "Your priors have a history", "Your priors have a history", "var(--gold-deep)", <Cards data={data.culture} />);
  add("activeInference", "Perception can lead to action", "Perception can lead to action", "var(--plum-deep)", <Cards data={data.activeInference} />);
  add("signals", "What do the brain signals actually show?", "What do the brain signals actually show?", "var(--red)", <><Rich className="lede" as="p" html={data.signals.lede} /><EvidenceCards items={data.signals.items} /><Note text={data.signals.note} /></>);
  add("critical", "A powerful framework — but how specific?", "A powerful framework — but how specific?", "var(--plum-deep)", <Cards data={data.critical} />);
  add("finalModel", "What Predictive Processing explains — and where it stops", "What Predictive Processing explains — and where it stops", "var(--plum-deep)", <><FinalModel data={data.finalModel} /><div className="pp-scope-grid"><div><span className="k">EXPLAINS WELL</span><p className="read">Context-sensitive perception, musical expectation, sensory prediction, violation responses, uncertainty, learning, attention, rhythm and meter, some groove, expertise, omission, and perception–action coupling.</p></div><div><span className="k">DOES NOT COMPLETE</span><p className="read">All music, emotion, reward, aesthetics, culture, social interaction, creativity, or every neural computation.</p></div></div><p className="pp-scope-note"><Mark>✦</Mark> The framework is a powerful organising lens, not a complete explanation of music.</p></>);
  add("trail", "The intellectual trail", "The intellectual trail", "var(--teal)", <Trail record={r} />);
  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", <><Rich className="lede" as="p" html={r.oversimplificationsLede} /><div className="pp-misconceptions">{r.oversimplifications.map((item, index) => <div className="sk-box" key={item}><span>{String(index + 1).padStart(2, "0")}</span><p className="read">{item}</p></div>)}</div></>);
  add("qualifications", "Still open", "Still open", "var(--plum-deep)", <div className="pp-open-list">{r.qualifications.map((item) => <p key={item}><Mark>?</Mark> {item}</p>)}</div>);
  add("sources", "Sources", "Sources", "var(--teal)", <><div className="sk-box tilt-l2"><div className="pp-source-heading"><span className="k">{r.minimumReadingLabel ?? "If you read five things"}</span><h3>Start here</h3></div><SourceList items={r.minimumReading} /></div><div className="pp-source-trail"><span className="k">the full trail</span><SourceList items={r.fullSources} /></div></>);
  add("related", "Related records", "Related records", "var(--teal)", <Related record={r} />);
  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", <div className="prov pp-provenance">{r.provenance.map((item) => <div className="prov-item" key={item.label}><span className="g" style={{ color: item.colour }} aria-hidden="true">{item.glyph}</span><div><h3>{item.label}</h3><p>{item.note}</p></div></div>)}</div>);

  const toc: [string, string, string][] = blocks.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`]);
  return <RecordShell record={r} toc={toc}>{blocks.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}

export default PredictiveProcessingBody;

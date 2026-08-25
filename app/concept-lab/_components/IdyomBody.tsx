"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import type { IdyomDistribution, IdyomRecordContent, IdyomSection, Source, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { entropyBits, informationBits, probabilitySum, assertProbabilityDistribution } from "./idyomMath";
import { Divider, Rich, SecHead, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function Mark({ children }: { children: string }) {
  return <span className="idyom-mark" aria-hidden="true">{children}</span>;
}

function Note({ text, fallback = "■" }: { text: string; fallback?: string }) {
  const match = text.match(/^([●■▲✦?])\s*/);
  const glyph = match?.[1] ?? fallback;
  const body = match ? text.slice(match[0].length) : text;
  return <p className="idyom-note"><Mark>{glyph}</Mark> {body}</p>;
}

function Cards({ items }: { items: IdyomSection["cards"] }) {
  return (
    <div className="idyom-card-grid">
      {items.map((item, index) => (
        <article className={`idyom-card sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ "--idyom-colour": item.colour } as CSSProperties} key={item.label}>
          <span className="k">{item.label}</span>
          <p className="read">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

function SectionIntro({ data }: { data: IdyomSection }) {
  return <><Rich className="lede" as="p" html={data.lede} /><Cards items={data.cards} /><Note text={data.note} /></>;
}

function Identity({ data }: { data: IdyomRecordContent["identity"] }) {
  return (
    <div className="idyom-identity">
      <div><span className="k">KNOWLEDGE FORM</span><p>{data.knowledgeForm}</p></div>
      <div><span className="k">STATUS</span><p>{data.status}</p></div>
      <div><span className="k">DISCIPLINE</span><p>{data.discipline}</p></div>
      <div><span className="k">ATLAS BRANCH</span><p>{data.branch}</p></div>
    </div>
  );
}

function DistributionBars({ data }: { data: IdyomDistribution }) {
  const sum = probabilitySum([...data.entries]);
  assertProbabilityDistribution([...data.entries]);
  return (
    <div className="idyom-distribution" role="group" aria-label={`${data.label} probability distribution`}>
      <div className="idyom-distribution-head"><span className="k">{data.label}</span><span>sum = {sum.toFixed(3)}</span></div>
      {data.entries.map((entry) => (
        <div className={`idyom-prob-row ${entry.event === data.actualEvent ? "actual" : ""}`} key={entry.event}>
          <span className="idyom-prob-label">{entry.event}{entry.event === data.actualEvent ? " · actual" : ""}</span>
          <span className="idyom-prob-track" aria-hidden="true"><i style={{ width: `${entry.probability * 100}%` }} /></span>
          <b>{entry.probability.toFixed(2)}</b>
        </div>
      ))}
    </div>
  );
}

function SignatureInteraction({ data }: { data: IdyomRecordContent["signature"] }) {
  const [lens, setLens] = useState<"distribution" | "measures">("distribution");
  const results = data.contexts.map((context) => ({
    context,
    entropy: entropyBits([...context.entries]),
    information: informationBits([...context.entries], context.actualEvent),
  }));
  return (
    <figure className="idyom-signature sk-box tilt-l2">
      <div className="idyom-interaction-head">
        <div><p className="k"><Mark>▲</Mark> constructed information-theoretic teaching example</p><h3>Same surprise. Different uncertainty.</h3></div>
        <span className="idyom-state" aria-live="polite">{lens === "distribution" ? "distribution lens" : "measure lens"}</span>
      </div>
      <div className="idyom-toggle" role="group" aria-label="Choose a lens for the IDyOM comparison">
        <button type="button" aria-pressed={lens === "distribution"} onClick={() => setLens("distribution")}>Distributions</button>
        <button type="button" aria-pressed={lens === "measures"} onClick={() => setLens("measures")}>Entropy + IC</button>
      </div>
      <div className="idyom-context-grid">
        {results.map(({ context, entropy, information }) => (
          <article className="idyom-context-card" key={context.label}>
            <h3>{context.label}</h3>
            {lens === "distribution" ? <DistributionBars data={context} /> : (
              <div className="idyom-measure-pair" role="group" aria-label={`${context.label} calculated measures`}>
                <div><span className="k">ENTROPY H(P)</span><strong>{entropy.toFixed(6)} bits</strong><small>uncertainty before the event</small></div>
                <div><span className="k">IC(B)</span><strong>{information.toFixed(6)} bits</strong><small>information carried by the actual event</small></div>
              </div>
            )}
          </article>
        ))}
      </div>
      <p className="idyom-signature-reveal"><b>The actual event B carries {results[0].information.toFixed(6)} bits in both contexts.</b> The distributions have different entropy: {results[0].entropy.toFixed(6)} versus {results[1].entropy.toFixed(6)} bits.</p>
      <figcaption className="idyom-caption">{data.note}</figcaption>
    </figure>
  );
}

function MicroWorld({ data }: { data: IdyomRecordContent["microWorld"] }) {
  const [stage, setStage] = useState(0);
  const current = data.stages[stage];
  return (
    <div className="idyom-microworld sk-box tilt-r2">
      <div className="idyom-interaction-head">
        <div><p className="k"><Mark>▲</Mark> pedagogical statistical micro-world</p><h3>Old experience. New pattern.</h3></div>
        <span className="idyom-state" aria-live="polite">{current.label}</span>
      </div>
      <p className="read idyom-micro-lede">{data.lede}</p>
      <div className="idyom-toggle" role="group" aria-label="Move through the current piece">
        {data.stages.map((item, index) => <button type="button" key={item.label} aria-pressed={stage === index} onClick={() => setStage(index)}>{index === 0 ? "Early" : "Later"} current piece</button>)}
      </div>
      <div className="idyom-memory-compare">
        <div className="idyom-memory-column ltm"><span className="k">LTM · corpus history</span><strong>X → Y</strong><p>Prior support remains visible.</p></div>
        <div className="idyom-memory-column stm"><span className="k">STM · current piece</span><strong>X → Z</strong><span className={`idyom-strength ${current.strength}`}>{current.strength === "low" ? "little local evidence" : "stronger local evidence"}</span><p>{current.body}</p></div>
      </div>
      <p className="idyom-caption">{data.note}</p>
    </div>
  );
}

function FinalModel({ data }: { data: IdyomRecordContent["finalModel"] }) {
  const [ltm, stm, context, distribution, measures, update] = data.steps;
  return (
    <div className="idyom-final-model" role="group" aria-label="Concept Lab synthesis of the IDyOM model">
      <p className="k"><Mark>✦</Mark> Concept Lab synthesis</p>
      <p className="lede">{data.lede}</p>
      <div className="idyom-constraints" role="group" aria-label="Outer constraints on the model"><span>{data.constraints[0]}</span><span>{data.constraints[1]}</span></div>
      <div className="idyom-model-map">
        <div className="idyom-model-memory">
          {[ltm, stm].map((step) => <span className="idyom-model-node" style={{ "--idyom-colour": step.colour } as CSSProperties} key={step.label}><b>{step.label}</b><small>{step.body}</small></span>)}
        </div>
        <span className="idyom-model-arrow" aria-hidden="true">↓</span>
        <span className="idyom-model-node" style={{ "--idyom-colour": context.colour } as CSSProperties}><b>{context.label}</b><small>{context.body}</small></span>
        <span className="idyom-model-arrow" aria-hidden="true">↓</span>
        <span className="idyom-model-node" style={{ "--idyom-colour": distribution.colour } as CSSProperties}><b>{distribution.label}</b><small>{distribution.body}</small></span>
        <div className="idyom-model-branches">
          {[measures, update].map((step) => <span className="idyom-model-node" style={{ "--idyom-colour": step.colour } as CSSProperties} key={step.label}><b>{step.label}</b><small>{step.body}</small></span>)}
        </div>
      </div>
      <p className="idyom-model-loop">↺ the observed event becomes new context</p>
      <Note text={data.note} />
    </div>
  );
}

function EvidenceCards({ items }: { items: IdyomRecordContent["evidence"]["items"] }) {
  return (
    <div className="idyom-evidence-grid">
      {items.map((item, index) => (
        <article className={`idyom-evidence sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} key={item.title}>
          <header><span className="idyom-evidence-kind">{item.label}</span><span className="idyom-evidence-number">0{index + 1}</span><h3>{item.title}</h3></header>
          <p className="model-src">{item.citation}</p>
          {item.design && <p className="read idyom-evidence-design"><b>Design:</b> {item.design}</p>}
          <div className="idyom-evidence-grid-inner"><div><span className="k">{item.testedLabel}</span><p className="read">{item.tested}</p></div><div><span className="k">{item.foundLabel}</span><p className="read">{item.found}</p></div><div className="idyom-evidence-limit"><span className="k">what it did not test</span><p className="read">{item.notTested}</p></div></div>
          {item.doi && <p className="doi">doi {item.doi}</p>}
        </article>
      ))}
    </div>
  );
}

function SourceList({ items }: { items: Source[] }) {
  return <>{items.map((source, index) => <div className="src-item" key={`${source.citation}-${index}`}><span className="n">{index + 1}</span><div><Rich className="c" as="div" html={source.citation} /><div className="w">{source.contribution}</div>{source.doi && <div className="doi">doi {source.doi}</div>}</div></div>)}</>;
}

export function IdyomBody({ record: r }: { record: TheoryRecord }) {
  const data = r.idyom;
  if (!data) return null;
  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "What did the model expect?", "What did the model expect?", "var(--teal)", <><SectionIntro data={data.opening} /><Identity data={data.identity} /></>);
  add("distribution", "It doesn’t guess one note", "It doesn’t guess one note", "var(--teal)", <SectionIntro data={data.distribution} />);
  add("uncertainty", "Before the note: uncertainty", "Before the note: uncertainty", "var(--gold-deep)", <SectionIntro data={data.uncertainty} />);
  add("information", "After the note: information", "After the note: information", "var(--red)", <SectionIntro data={data.information} />);
  add("signature", "Same surprise, different uncertainty", "Same surprise. Different uncertainty.", "var(--red)", <><Rich className="lede" as="p" html={data.signature.lede} /><SignatureInteraction data={data.signature} /></>);
  add("learning", "Where did the probabilities come from?", "Where did the probabilities come from?", "var(--teal)", <SectionIntro data={data.learning} />);
  add("memories", "Two memories of music", "Two memories of music", "var(--teal)", <SectionIntro data={data.memories} />);
  add("configurations", "Five configurations", "Five configurations, not five minds", "var(--gold-deep)", <><Rich className="lede" as="p" html={data.configurations.lede} /><div className="idyom-config-grid">{data.configurations.items.map((item) => <article className="idyom-config" key={item.label} style={{ "--idyom-colour": item.colour } as CSSProperties}><b>{item.label}</b><p>{item.body}</p></article>)}</div><Note text={data.configurations.note} /></>);
  add("microWorld", "Old experience, new pattern", "Old experience. New pattern.", "var(--red)", <><Rich className="lede" as="p" html={data.microWorld.lede} /><MicroWorld data={data.microWorld} /></>);
  add("context", "How much context should count?", "How much context should count?", "var(--teal)", <SectionIntro data={data.context} />);
  add("backoff", "When the longest memory fails", "When the longest memory fails", "var(--gold-deep)", <SectionIntro data={data.backoff} />);
  add("viewpoints", "What counts as a musical event?", "What counts as a musical event?", "var(--teal)", <SectionIntro data={data.viewpoints} />);
  add("representation", "The model only knows what you represent", "The model only knows what you represent", "var(--red)", <SectionIntro data={data.representation} />);
  add("corpus", "A corpus isn’t a culture", "A corpus isn’t a culture", "var(--plum-deep)", <SectionIntro data={data.corpus} />);
  add("evidence", "Does it predict human expectations?", "Does it predict human expectations?", "var(--teal)", <><Rich className="lede" as="p" html={data.evidence.lede} /><EvidenceCards items={data.evidence.items} /><Note text={data.evidence.note} /></>);
  add("narmour", "Did IDyOM replace Narmour?", "Did IDyOM replace Narmour?", "var(--red)", <SectionIntro data={data.narmour} />);
  add("mechanism", "A model that predicts well isn’t necessarily the brain", "A model that predicts well isn’t necessarily the brain", "var(--plum-deep)", <SectionIntro data={data.mechanism} />);
  add("finalModel", "The final model", "The final IDyOM map", "var(--plum-deep)", <FinalModel data={data.finalModel} />);
  add("explains", "What IDyOM explains", "What IDyOM explains", "var(--teal)", <SectionIntro data={data.explains} />);
  add("stops", "Where IDyOM stops", "Where IDyOM stops", "var(--red)", <SectionIntro data={data.stops} />);
  add("trail", "The intellectual trail", "The intellectual trail", "var(--teal)", <><Rich className="lede" as="p" html={r.trailLede} /><div className="idyom-trail">{r.origins.map((origin) => <div className="idyom-trail-item" key={`${origin.year}-${origin.author}`}><span>{origin.year}</span><div><Rich as="h3" html={origin.author} /><i>{origin.work}</i><p>{origin.contribution}</p></div></div>)}</div></>);
  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", <><Rich className="lede" as="p" html={r.oversimplificationsLede} /><div className="idyom-misconceptions">{r.oversimplifications.map((item, index) => <div className="sk-box" key={item}><span>{String(index + 1).padStart(2, "0")}</span><p className="read">{item}</p></div>)}</div></>);
  add("qualifications", "Still open", "Still open", "var(--plum-deep)", <div className="idyom-open-list">{r.qualifications.map((item) => <p key={item}><Mark>?</Mark> {item}</p>)}</div>);
  add("sources", "Sources", "Sources", "var(--teal)", <><div className="sk-box tilt-l2"><div className="idyom-source-heading"><span className="k">{r.minimumReadingLabel ?? "if you read five things"}</span><h3>Start here</h3></div><SourceList items={r.minimumReading} /></div><div className="idyom-source-trail"><span className="k">the full trail</span><SourceList items={r.fullSources} /></div></>);
  if (r.relatedTo?.length) add("related", "Related records", "Related records", "var(--teal)", <><p className="lede">{r.relatedToLede}</p><div className="idyom-related">{r.relatedTo.map((link) => { const target = RECORDS.find((record) => record.id === link.recordId); if (!target) return null; const kind = KIND[target.kind]; return <a href={recordHref(target)} key={link.recordId}><span className="k">{link.relation}</span><h3>{target.title}</h3><p>{link.body}</p><strong style={{ color: kind.colour }}>{kind.cta} →</strong></a>; })}</div></>);
  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", <div className="prov idyom-provenance">{r.provenance.map((item) => <div className="prov-item" key={item.label}><span className="g" style={{ color: item.colour }} aria-hidden="true">{item.glyph}</span><div><h3>{item.label}</h3><p>{item.note}</p></div></div>)}</div>);

  const toc: [string, string, string][] = blocks.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`]);
  return <RecordShell record={r} toc={toc}>{blocks.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}

"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import { predictiveProcessingInMusic as record } from "@/content/predictive-processing-in-music";
import { RECORDS, recordHref } from "@/content/records";
import type { EvidenceXray, PredictiveCard, Provenance } from "@/content/types";
import { PigmentField } from "@/app/chromatic-editorial/_components/PigmentField";

const content = record.predictiveProcessing!;

const COLOURS: Record<string, string> = {
  "var(--teal)": "var(--pp-green)",
  "var(--teal-deep)": "var(--pp-green)",
  "var(--gold-deep)": "var(--pp-yellow)",
  "var(--red)": "var(--pp-red)",
  "var(--red-deep)": "var(--pp-red)",
  "var(--plum-deep)": "var(--pp-violet)",
  "var(--pen-3)": "var(--pp-quiet)",
};

function colour(value: string) {
  return COLOURS[value] ?? "var(--pp-blue)";
}

function HtmlText({ html, className, tag = "p" }: { html: string; className?: string; tag?: "p" | "span" | "div" }) {
  const Tag = tag;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function MaterialSwatch({ tone, label, role }: { tone: "blue" | "red" | "yellow"; label: string; role: string }) {
  return (
    <div className="ppv2-swatch">
      <PigmentField tone={tone} />
      <span>{label}</span>
      <small>{role}</small>
    </div>
  );
}

function PencilArrow({ colour: stroke, d, className = "" }: { colour: string; d: string; className?: string }) {
  return <path className={className} d={d} fill="none" stroke={stroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".84" />;
}

function PredictionLoop() {
  return (
    <figure className="ppv2-loop-figure">
      <PigmentField tone="blue" className="ppv2-wash ppv2-wash-blue" />
      <PigmentField tone="yellow" className="ppv2-wash ppv2-wash-yellow" />
      <PigmentField tone="violet" className="ppv2-pencil-ring" />
      <svg viewBox="0 0 720 540" role="img" aria-labelledby="ppv2-loop-title ppv2-loop-desc">
        <title id="ppv2-loop-title">A teaching loop for predictive processing in music</title>
        <desc id="ppv2-loop-desc">Predictions meet perception. A mismatch becomes prediction error, whose influence is weighted by precision before the model updates.</desc>
        <path d="M83 286C101 118 229 53 360 69c111 14 203 78 252 192" className="ppv2-loop-line ppv2-loop-blue" />
        <path d="M612 274C614 420 505 492 365 477c-130-14-235-88-275-204" className="ppv2-loop-line ppv2-loop-red" />
        <PencilArrow colour="var(--pp-blue)" d="M332 61l-20 10m20-10-8 22" />
        <PencilArrow colour="var(--pp-red)" d="M84 289l17-8m-17 8 8 16" />
        <PencilArrow colour="var(--pp-green)" d="M366 477l18-7m-18 7 8 16" />
        <circle cx="350" cy="271" r="112" className="ppv2-loop-core" />
        <circle cx="350" cy="271" r="91" className="ppv2-loop-core-light" />
        <text x="350" y="246" textAnchor="middle" className="ppv2-loop-core-title">prediction</text>
        <text x="350" y="278" textAnchor="middle" className="ppv2-loop-core-title">⇄ perception</text>
        <text x="350" y="307" textAnchor="middle" className="ppv2-loop-core-sub">a generative model meets input</text>
        <g className="ppv2-loop-label ppv2-loop-label-top"><text x="356" y="24" textAnchor="middle">top-down hypothesis</text><path d="M356 34v20" /></g>
        <g className="ppv2-loop-label ppv2-loop-label-right"><text x="642" y="285">mismatch</text><text x="642" y="307">becomes error</text><path d="M625 296h-30" /></g>
        <g className="ppv2-loop-label ppv2-loop-label-bottom"><text x="359" y="522" textAnchor="middle">update · attend · act</text><path d="M359 506v-20" /></g>
        <g className="ppv2-loop-label ppv2-loop-label-left"><text x="32" y="234">actual</text><text x="32" y="255">input</text><path d="M83 246h-28" /></g>
      </svg>
      <figcaption><span className="ppv2-mark ppv2-mark-synthesis">✦</span> Concept Lab reconstruction: direction matters; this is not a literal cortical circuit.</figcaption>
    </figure>
  );
}

function CardRows({ cards, className = "" }: { cards: PredictiveCard[]; className?: string }) {
  return (
    <div className={`ppv2-card-rows ${className}`}>
      {cards.map((card) => (
        <article className="ppv2-card-row" key={card.label} style={{ "--accent": colour(card.colour) } as CSSProperties}>
          <span className="ppv2-card-dot" aria-hidden="true" />
          <div><h3>{card.label}</h3><HtmlText html={card.body} /></div>
        </article>
      ))}
    </div>
  );
}

function PrecisionInteraction() {
  const [selected, setSelected] = useState(0);
  const context = content.precisionInteraction.contexts[selected];
  const envelopeWidth = context.sigmaMs === 35 ? 94 : 238;
  return (
    <div className="ppv2-precision-study">
      <div className="ppv2-study-heading"><span className="ppv2-study-number">03</span><div><span className="ppv2-study-kind">constructed Gaussian illustration</span><h3>Same deviation.<br /><em>Different precision.</em></h3></div></div>
      <div className="ppv2-precision-visual">
        <svg viewBox="0 0 720 260" role="img" aria-label={`The same plus 120 millisecond timing displacement shown inside a ${context.sigmaMs === 35 ? "narrow" : "broad"} expectation envelope.`}>
          <line x1="54" x2="666" y1="152" y2="152" className="ppv2-precision-axis" />
          <path d="M55 152C155 152 206 65 360 65s205 87 305 87" className="ppv2-precision-curve" style={{ stroke: selected === 0 ? "var(--pp-green)" : "var(--pp-red)" }} />
          <ellipse cx="360" cy="152" rx={envelopeWidth} ry="62" className="ppv2-precision-envelope" style={{ stroke: selected === 0 ? "var(--pp-green)" : "var(--pp-red)" }} />
          <line x1="360" x2="360" y1="66" y2="210" className="ppv2-precision-mean" />
          <line x1={selected === 0 ? "520" : "520"} x2="520" y1="92" y2="210" className="ppv2-precision-target" />
          <PencilArrow colour="var(--pp-yellow)" d="M360 222c49 0 98-1 151-1" />
          <text x="360" y="46" textAnchor="middle" className="ppv2-precision-label">expected mean</text>
          <text x="520" y="236" textAnchor="middle" className="ppv2-precision-label ppv2-precision-label-target">same +120 ms displacement</text>
          <text x="360" y="176" textAnchor="middle" className="ppv2-precision-axis-label">less certain ← history → more certain</text>
        </svg>
      </div>
      <div className="ppv2-study-tabs" role="group" aria-label="Prediction history contexts">
        {content.precisionInteraction.contexts.map((option, index) => <button key={option.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{option.label}</button>)}
      </div>
      <div className="ppv2-study-result" aria-live="polite"><strong>{context.history}</strong><p>{context.interpretation}</p><span>σ = {context.sigmaMs} ms · target offset = +{context.targetOffsetMs} ms</span></div>
      <HtmlText html={content.precisionInteraction.note} className="ppv2-study-footnote" />
    </div>
  );
}

function OmissionInteraction() {
  const [omitted, setOmitted] = useState(true);
  return (
    <div className="ppv2-omission-study">
      <div className="ppv2-omission-copy"><span className="ppv2-study-number ppv2-study-number-red">04</span><h3>The note<br /><em>that never came.</em></h3><p>{content.omission.lede}</p></div>
      <div className="ppv2-omission-visual">
        <svg viewBox="0 0 690 220" role="img" aria-label={omitted ? "Four preceding beats followed by an expected target note that is omitted as silence." : "Four preceding beats followed by the expected target note."}>
          <line x1="30" x2="650" y1="118" y2="118" className="ppv2-omission-line" />
          {content.omission.preceding.map((beat, index) => <g key={`${beat}-${index}`}><circle cx={90 + (index * 86)} cy="118" r="13" className="ppv2-beat" /><text x={90 + (index * 86)} y="165" textAnchor="middle" className="ppv2-beat-label">{beat}</text></g>)}
          <g className={omitted ? "ppv2-target-is-omitted" : "ppv2-target-is-present"}><circle cx="520" cy="118" r="18" className="ppv2-target" /><text x="520" y="165" textAnchor="middle" className="ppv2-beat-label">{content.omission.expected}</text><text x="520" y="67" textAnchor="middle" className="ppv2-target-note">{omitted ? "silence" : "expected event"}</text></g>
          {omitted && <path d="M495 94c16-17 34-18 50-3m-46 17c14-11 27-12 41-2" className="ppv2-omission-cross" />}
        </svg>
        <div className="ppv2-study-tabs" role="group" aria-label="Omission example state"><button type="button" aria-pressed={!omitted} onClick={() => setOmitted(false)}>Let it arrive</button><button type="button" aria-pressed={omitted} onClick={() => setOmitted(true)}>Omit the target note</button></div>
        <p className="ppv2-study-result" aria-live="polite"><strong>{omitted ? "The model can specify an event even when the sound is absent." : "The expected event is now part of the sensory input."}</strong></p>
        <HtmlText html={content.omission.note} className="ppv2-study-footnote" />
      </div>
    </div>
  );
}

function EvidenceEntry({ item }: { item: EvidenceXray }) {
  return (
    <article className="ppv2-evidence-entry">
      <div className="ppv2-evidence-head"><div><span>{item.label}</span><h3>{item.title}</h3></div>{item.doi && <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noreferrer">source DOI</a>}</div>
      <p className="ppv2-evidence-citation">{item.citation}</p>
      <div className="ppv2-evidence-grid"><div><h4>Design</h4><p>{item.design}</p></div><div><h4>{item.testedLabel}</h4><p>{item.tested}</p></div><div className="ppv2-found"><h4>{item.foundLabel}</h4><p>{item.found}</p></div><div className="ppv2-caution"><h4>Not tested</h4><p>{item.notTested}</p></div></div>
    </article>
  );
}

function ProvenanceList({ items }: { items: Provenance[] }) {
  return <div className="ppv2-provenance-list">{items.map((item) => <div className="ppv2-provenance-row" key={item.glyph}><span className={`ppv2-provenance-glyph ppv2-glyph-${item.glyph === "●" ? "source" : item.glyph === "■" ? "finding" : item.glyph === "▲" ? "teaching" : item.glyph === "✦" ? "synthesis" : "open"}`} aria-hidden="true">{item.glyph}</span><h3>{item.label}</h3><p>{item.note}</p></div>)}</div>;
}

function FinalModel() {
  const nodes = content.finalModel.nodes;
  return (
    <figure className="ppv2-final-model">
      <svg viewBox="0 0 900 400" role="img" aria-label="A schematic pathway from learned experience and current context through a generative model, prediction, actual input, prediction error and precision, to update, attention and action.">
        <path d="M78 211C221 94 329 100 430 202s211 111 390-8" className="ppv2-final-thread" />
        {nodes.map((node, index) => { const x = 60 + index * 126; const y = index % 2 === 0 ? 170 : 260; return <g key={node.label}><circle cx={x} cy={y} r="28" className="ppv2-final-node" style={{ stroke: colour(node.colour) }} /><text x={x} y={y + 4} textAnchor="middle" className="ppv2-final-number">{String(index + 1).padStart(2, "0")}</text></g>; })}
      </svg>
      <div className="ppv2-final-labels">{nodes.map((node) => <div key={node.label} style={{ "--accent": colour(node.colour) } as CSSProperties}><span>{node.label}</span><HtmlText html={node.body} /></div>)}</div>
      <figcaption><span className="ppv2-mark ppv2-mark-synthesis">✦</span> {content.finalModel.note}</figcaption>
    </figure>
  );
}

export function PredictiveEditorialExploration() {
  return (
    <div className="ppv2-page">
      <header className="ppv2-header"><Link className="ppv2-brand" href="/concept-lab"><span>∿</span> Academic Concept Lab</Link><div className="ppv2-header-center"><b>Iteration 02</b><span>Chromatic scholarly sketch</span></div><Link className="ppv2-canonical" href={recordHref(record)}>Canonical record</Link></header>

      <main>
        <section className="ppv2-hero">
          <div className="ppv2-hero-copy"><p className="ppv2-meta">Music psychology · expectation &amp; prediction</p><h1>Predictive<br /><em>Processing</em><br />in Music</h1><p className="ppv2-hook">{record.hook}</p><p className="ppv2-deck">{record.oneSentence}</p><div className="ppv2-hero-note"><span aria-hidden="true">↗</span><p>We do not just perceive the world.<br /><em>We predict it.</em></p></div></div>
          <PredictionLoop />
          <div className="ppv2-hero-index"><span>01</span><span>the loop is the subject</span><span>not a finished answer</span></div>
        </section>

        <section className="ppv2-material-strip" aria-label="Visual material key"><div className="ppv2-strip-label"><span>Material key</span><strong>colour as a thinking tool</strong></div><MaterialSwatch tone="blue" label="cobalt" role="prediction / structure" /><MaterialSwatch tone="red" label="vermilion" role="mismatch / emphasis" /><MaterialSwatch tone="yellow" label="lemon" role="attention / highlight" /><div className="ppv2-strip-note"><span className="ppv2-mark ppv2-mark-source">●</span> print carries the claim<br /><span className="ppv2-mark ppv2-mark-synthesis">✦</span> pencil carries the intervention</div></section>

        <section className="ppv2-opening ppv2-light-section"><div className="ppv2-section-rail"><span>read the distinction</span><b>02</b></div><div className="ppv2-opening-grid"><div><h2>Prediction is<br /><em>not a guess.</em></h2><p>{content.opening.lede}</p><p className="ppv2-source-line"><span className="ppv2-mark ppv2-mark-source">●</span> The terminology boundary is source-grounded; the nested record identity is Concept Lab synthesis.</p></div><CardRows cards={content.opening.cards} /></div></section>

        <section className="ppv2-message-section"><div className="ppv2-section-rail ppv2-rail-red"><span>make direction visible</span><b>03</b></div><div className="ppv2-message-grid"><div><h2>Downward<br /><em>hypotheses.</em></h2><p>{content.messagePassing.lede}</p></div><div className="ppv2-message-figure"><PigmentField tone="red" className="ppv2-message-wash" /><svg viewBox="0 0 480 380" role="img" aria-label="A simplified two-way message-passing diagram. Predictions travel down; errors travel up."><path d="M120 85c63-37 175-37 239 2" className="ppv2-message-arrow ppv2-message-arrow-blue" /><path d="M362 285c-69 36-178 33-244-5" className="ppv2-message-arrow ppv2-message-arrow-red" /><PencilArrow colour="var(--pp-blue)" d="M353 87l-14-2m14 2-5 13" /><PencilArrow colour="var(--pp-red)" d="M110 280l15 1m-15-1 7-12" /><text x="240" y="132" textAnchor="middle" className="ppv2-message-title">predictions down</text><text x="240" y="250" textAnchor="middle" className="ppv2-message-title ppv2-message-title-red">errors up</text><rect x="147" y="156" width="186" height="73" className="ppv2-message-box" /><text x="240" y="185" textAnchor="middle" className="ppv2-message-box-text">model ↔ input</text><text x="240" y="208" textAnchor="middle" className="ppv2-message-box-sub">a teaching motif</text></svg><figcaption><span className="ppv2-mark ppv2-mark-synthesis">✦</span> Direction is meaningful here; anatomy and musical level are not fixed.</figcaption></div></div><CardRows cards={content.messagePassing.cards} className="ppv2-message-cards" /></section>

        <section className="ppv2-interactions ppv2-light-section"><div className="ppv2-section-rail ppv2-rail-yellow"><span>two working studies</span><b>04</b></div><div className="ppv2-interaction-intro"><h2>When the world<br /><em>deviates.</em></h2><p>{content.error.lede}</p></div><div className="ppv2-study-stack"><PrecisionInteraction /><OmissionInteraction /></div></section>

        <section className="ppv2-evidence"><div className="ppv2-section-rail ppv2-rail-green"><span>quiet scholarship</span><b>05</b></div><div className="ppv2-evidence-intro"><h2>Compatible<br /><em>is not unique.</em></h2><p>{content.signals.lede}</p></div><div className="ppv2-evidence-list">{content.signals.items.map((item) => <EvidenceEntry key={item.title} item={item} />)}</div><p className="ppv2-evidence-note"><span className="ppv2-mark ppv2-mark-finding">■</span> {content.signals.note}</p></section>

        <section className="ppv2-critique ppv2-light-section"><div className="ppv2-section-rail ppv2-rail-violet"><span>keep the model honest</span><b>06</b></div><div className="ppv2-critique-grid"><div><h2>A powerful frame<br /><em>not the last word.</em></h2><p>{content.critical.lede}</p></div><CardRows cards={content.critical.cards} /></div><p className="ppv2-open-note"><span className="ppv2-mark ppv2-mark-open">?</span> {content.critical.note}</p></section>

        <section className="ppv2-final"><div className="ppv2-section-rail ppv2-rail-blue"><span>the map, redrawn</span><b>07</b></div><div className="ppv2-final-intro"><h2>Learned history<br /><em>meets now.</em></h2><p>{content.finalModel.lede}</p></div><FinalModel /></section>

        <section className="ppv2-trace ppv2-light-section"><div className="ppv2-section-rail ppv2-rail-graphite"><span>scholarly apparatus</span><b>08</b></div><div className="ppv2-trace-intro"><h2>Where the marks<br /><em>come from.</em></h2><p>Colour can help a reader move through the page. It cannot stand in for provenance.</p></div><ProvenanceList items={record.provenance} /></section>

        <section className="ppv2-sources"><div className="ppv2-section-rail ppv2-rail-yellow"><span>minimum reading</span><b>09</b></div><div className="ppv2-sources-intro"><h2>Leave with<br /><em>good questions.</em></h2><p>{record.trailLede}</p></div><ol className="ppv2-source-list">{record.minimumReading.map((source, index) => <li key={source.citation}><span>{String(index + 1).padStart(2, "0")}</span><div><HtmlText html={source.citation} /><p>{source.contribution}</p>{source.doi && <a href={`https://doi.org/${source.doi}`} target="_blank" rel="noreferrer">{source.doi}</a>}</div></li>)}</ol></section>

        <section className="ppv2-related"><div className="ppv2-section-rail ppv2-rail-blue"><span>ideas in conversation</span><b>10</b></div><div className="ppv2-related-intro"><h2>Not alone<br /><em>in the atlas.</em></h2><p>{record.relatedToLede}</p></div><div className="ppv2-related-list">{(record.relatedTo ?? []).slice(0, 4).map((relation) => { const target = RECORDS.find((candidate) => candidate.id === relation.recordId); if (!target) return null; return <Link className="ppv2-related-item" href={recordHref(target)} key={target.id}><span>{relation.relation}</span><strong>{target.title}</strong><p>{relation.body}</p></Link>; })}</div></section>
      </main>

      <footer className="ppv2-footer"><div><span>Academic Concept Lab</span><p>Chromatic scholarly sketch · iteration 02 · isolated preview</p></div><div><Link href="/chromatic-editorial">Compare iteration 01</Link><Link href={recordHref(record)}>View canonical record</Link></div></footer>
    </div>
  );
}

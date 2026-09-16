"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import { recordHref, RECORDS } from "@/content/records";
import type { EvidenceXray, PredictiveProcessingRecordContent, Source, TheoryRecord } from "@/content/types";

type Mark = "●" | "■" | "▲" | "✦" | "?";

const MARK_META: Record<Mark, { name: string; className: string }> = {
  "●": { name: "Source-grounded", className: "is-source" },
  "■": { name: "Empirical finding", className: "is-finding" },
  "▲": { name: "Constructed example", className: "is-constructed" },
  "✦": { name: "Concept Lab synthesis", className: "is-synthesis" },
  "?": { name: "Open / debated", className: "is-open" },
};

const FLOW_COLOURS: Record<string, string> = {
  "var(--teal)": "var(--ink-celadon-deep)",
  "var(--red)": "var(--ink-cinnabar)",
  "var(--gold-deep)": "var(--ink-ochre)",
  "var(--plum-deep)": "var(--ink-violet)",
  "var(--pen-3)": "var(--ink-black)",
};

function Rich({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function MarkNote({ mark, children }: { mark: Mark; children: React.ReactNode }) {
  const meta = MARK_META[mark];
  return (
    <p className={`ink-note ${meta.className}`}>
      <span className="ink-note-glyph" aria-hidden="true">{mark}</span>
      <span><strong>{meta.name}.</strong> {children}</span>
    </p>
  );
}

function MountainField() {
  return (
    <figure className="ink-mountain-figure">
      {/* This is a decorative transparent local asset; Vinext's image optimizer
          is not available in the dev worker, so the prototype keeps it native. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ink-mountain-wash" src="/experiments/assets/pigment/blue-brush.webp" alt="" aria-hidden="true" />
      <svg viewBox="0 0 720 500" role="img" aria-label="A constructed landscape of layered mountains, mist, and a river path representing a theory that moves from model to prediction to update.">
        <path className="ink-mountain-far" d="M20 158c56-46 84-18 128-48 48-33 64-4 109-43 42-36 77-17 113-36 59-31 89 10 144-14 48-21 94 4 182-11" />
        <path className="ink-mountain-mid" d="M4 213c53-48 92-19 138-53 39-29 62 8 98-22 42-35 79 3 119-32 50-43 96-4 139-32 38-25 74 1 118-20 38-18 65 6 100-10" />
        <path className="ink-mountain-near" d="M35 269c43-39 72-9 118-47 43-36 67 3 108-27 47-35 73 10 119-26 41-33 72 5 113-23 37-26 71-4 116-29 38-21 66-4 91-9" />
        <path className="ink-peak" d="M102 256 162 116l45 101 70-161 75 169 62-105 50 137 64-73 54 83" />
        <path className="ink-tree" d="M111 250v-82m-22 24c15-15 29-18 45-14m-40-5c8-15 16-23 25-29m-12 48c17 1 31 7 42 19m-79 1c10-11 18-15 29-15M567 269v-91m-24 28c17-13 33-16 52-11m-45-7c9-15 18-23 30-30m-17 49c19 3 34 10 44 21" />
        <path className="ink-river-line" d="M598 470c-53-42-96-72-157-95-66-25-103-29-150-54-56-30-102-67-124-108" />
        <path className="ink-river-line ink-river-faint" d="M585 485c-54-35-97-60-153-79-63-22-111-31-158-57-50-27-83-57-109-95" />
        <rect className="ink-red-seal" x="590" y="81" width="44" height="44" />
        <path className="ink-red-seal-grid" d="M598 89h28v28h-28Zm0 9h28M598 107h28M607 89v28M616 89v28" />
        <text className="ink-seal-text" x="612" y="107" textAnchor="middle">A</text>
        <text className="ink-map-label" x="48" y="330">model</text>
        <text className="ink-map-label" x="325" y="405">mismatch</text>
        <text className="ink-map-label" x="500" y="462">update</text>
      </svg>
      <figcaption>Ink is a path here: it keeps the reading moving while the empty field keeps uncertainty visible.</figcaption>
    </figure>
  );
}

function KnowledgeRiver({ nodes }: { nodes: PredictiveProcessingRecordContent["finalModel"]["nodes"] }) {
  const visible = nodes.slice(1, 7);
  return (
    <figure className="ink-river-map" aria-labelledby="ink-river-caption">
      <svg viewBox="0 0 1040 180" aria-hidden="true" preserveAspectRatio="none">
        <path className="ink-flow-river" d="M16 114c72-56 121 36 194-8s121 40 194-5 126 34 194-11 113 28 180-8 102 14 144-10" />
        <path className="ink-flow-river ink-flow-river-light" d="M16 129c72-54 121 34 194-7s121 38 194-4 126 32 194-10 113 26 180-8 102 12 144-9" />
        {visible.map((node, index) => {
          const x = 58 + index * 185;
          return <circle key={node.label} className={`ink-flow-dot ink-flow-dot-${index % 3}`} cx={x} cy={index % 2 === 0 ? 104 : 82} r="6" />;
        })}
      </svg>
      <div className="ink-flow-labels">
        {visible.map((node, index) => (
          <div className="ink-flow-label" key={node.label} style={{ "--flow-colour": FLOW_COLOURS[node.colour] ?? "var(--ink-black)" } as CSSProperties}>
            <span className="ink-flow-number">0{index + 1}</span>
            <h3>{node.label}</h3>
            <p>{node.body}</p>
          </div>
        ))}
      </div>
      <figcaption id="ink-river-caption">
        <span className="ink-inline-mark is-synthesis" aria-hidden="true">✦</span>
        Concept Lab synthesis. The river gives the sequence direction; it is not a literal cortical circuit or a claim that every stage has been separately demonstrated.
      </figcaption>
    </figure>
  );
}

function PrecisionStudy({ data }: { data: PredictiveProcessingRecordContent["precisionInteraction"] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = data.contexts[selectedIndex];
  const spread = selected.sigmaMs === 35 ? 84 : 196;
  const targetX = 726;

  return (
    <figure className="ink-precision" aria-labelledby="ink-precision-title">
      <div className="ink-precision-copy">
        <p className="ink-kicker"><span className="ink-inline-mark is-constructed" aria-hidden="true">▲</span> constructed teaching example</p>
        <h3 id="ink-precision-title">Same deviation.<br />Different precision.</h3>
        <p>{data.lede}</p>
        <div className="ink-precision-controls" role="group" aria-label="Choose a rhythmic context to inspect">
          {data.contexts.map((context, index) => (
            <button
              key={context.label}
              type="button"
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              {context.label}
            </button>
          ))}
        </div>
      </div>
      <div className="ink-precision-visual">
        <svg viewBox="0 0 860 240" role="img" aria-label={`${selected.label}: a constructed prediction envelope with the same target event 120 milliseconds late`}>
          <line className="ink-precision-axis" x1="74" x2="786" y1="173" y2="173" />
          <line className="ink-precision-mean" x1="430" x2="430" y1="40" y2="188" />
          <rect className="ink-precision-envelope" x={430 - spread} y="69" width={spread * 2} height="66" rx="33" />
          <line className="ink-precision-target" x1={targetX} x2={targetX} y1="38" y2="191" />
          <circle className="ink-precision-expected" cx="430" cy="102" r="7" />
          <circle className="ink-precision-actual" cx={targetX} cy="102" r="8" />
          <text x="430" y="214" textAnchor="middle">expected onset · 0 ms</text>
          <text x={targetX} y="28" textAnchor="middle">same target · +120 ms</text>
          <text x="74" y="194">less predictable</text>
          <text x="786" y="194" textAnchor="end">more predictable</text>
        </svg>
        <p className="ink-precision-result"><strong>{selected.label}</strong> — {selected.interpretation}</p>
      </div>
      <figcaption>{data.note}</figcaption>
    </figure>
  );
}

function EvidenceRegister({ items }: { items: EvidenceXray[] }) {
  return (
    <div className="ink-evidence-register">
      {items.map((item, index) => (
        <article className="ink-evidence-row" key={item.title}>
          <div className="ink-evidence-index"><span>0{index + 1}</span><small>{item.label}</small></div>
          <div className="ink-evidence-source">
            <h3>{item.title}</h3>
            <p className="ink-citation">{item.citation}</p>
            <p>{item.design}</p>
          </div>
          <div className="ink-evidence-claim">
            <p><strong>{item.testedLabel}</strong> {item.tested}</p>
            <p><strong>{item.foundLabel}</strong> {item.found}</p>
            <p className="ink-evidence-limit"><strong>Not tested</strong> {item.notTested}</p>
            {item.doi ? <p className="ink-doi">doi {item.doi}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function SourceTrail({ items }: { items: Source[] }) {
  return (
    <div className="ink-source-trail">
      {items.map((item, index) => (
        <article className="ink-source-row" key={`${item.citation}-${index}`}>
          <span className="ink-source-number">{String(index + 1).padStart(2, "0")}</span>
          <div><Rich html={item.citation} /><p>{item.contribution}</p></div>
          {item.doi ? <span className="ink-doi">{item.doi}</span> : null}
        </article>
      ))}
    </div>
  );
}

function RelatedRecords({ record }: { record: TheoryRecord }) {
  const related = (record.relatedTo ?? []).slice(0, 3).map((item) => ({
    item,
    record: RECORDS.find((candidate) => candidate.id === item.recordId),
  })).filter((entry): entry is { item: NonNullable<TheoryRecord["relatedTo"]>[number]; record: TheoryRecord } => Boolean(entry.record));

  return (
    <div className="ink-related-list">
      {related.map(({ item, record: target }) => (
        <Link className="ink-related-row" href={recordHref(target)} key={target.id}>
          <span>{item.relation}</span>
          <strong>{target.title}</strong>
          <p>{item.body}</p>
        </Link>
      ))}
    </div>
  );
}

function MarkKey({ record }: { record: TheoryRecord }) {
  return (
    <div className="ink-mark-key" aria-label="Provenance key">
      {record.provenance.map((item) => {
        const mark = item.glyph as Mark;
        const meta = MARK_META[mark];
        return (
          <div className={`ink-mark-key-item ${meta.className}`} key={item.label}>
            <span className="ink-mark-key-glyph" aria-hidden="true">{mark}</span>
            <div><strong>{meta.name}</strong><span>{item.label}</span></div>
          </div>
        );
      })}
    </div>
  );
}

export function InkWorldPage({ record }: { record: TheoryRecord }) {
  const data = record.predictiveProcessing;
  const [held, setHeld] = useState(false);
  if (!data) return null;

  const riverNodes = data.finalModel.nodes;
  const discipline = data.identity.discipline;

  return (
    <article className="ink-page">
      <div className="ink-frame">
        <section className="ink-hero" id="top">
          <div className="ink-hero-copy">
            <p className="ink-kicker">Field note 01 / {discipline}</p>
            <h1>Predictive<br /><em>Processing</em><small>in music</small></h1>
            <p className="ink-hero-question">{record.hook}</p>
            <p className="ink-hero-deck">{record.oneSentence}</p>
            <div className="ink-hero-actions">
              <a className="ink-primary-link" href="#map">Follow the model</a>
              <button className="ink-hold-button" type="button" aria-pressed={held} onClick={() => setHeld((value) => !value)}>
                <span aria-hidden="true">{held ? "●" : "○"}</span> {held ? "Held in this study" : "Hold this note"}
              </button>
            </div>
          </div>
          <div className="ink-hero-landscape">
            <MountainField />
            <p className="ink-hero-margin-note">A theory of expectation,<br />not a next-note oracle.</p>
          </div>
        </section>

        <section className="ink-meta-band" aria-label="Record metadata">
          <div className="ink-meta-index"><span>01</span><p>One theory<br />many timescales</p></div>
          <dl>
            <div><dt>Knowledge form</dt><dd>{data.identity.knowledgeForm}</dd></div>
            <div><dt>Standing</dt><dd>{data.identity.status}</dd></div>
            <div><dt>Atlas branch</dt><dd>{data.identity.branch}</dd></div>
            <div>
              <dt>Short form</dt>
              <dd>{record.facts.map((fact, index) => <span className="ink-meta-fact" key={fact}>{fact}{index < record.facts.length - 1 ? "" : null}</span>)}</dd>
            </div>
          </dl>
        </section>

        <nav className="ink-contents" aria-label="On this page">
          <span>Trace this record</span>
          <a href="#map"><b>01</b> The model</a>
          <a href="#quiet"><b>02</b> The quiet distinction</a>
          <a href="#precision"><b>03</b> The same event</a>
          <a href="#evidence"><b>04</b> Evidence</a>
          <a href="#trail"><b>05</b> The trail</a>
        </nav>

        <section className="ink-movement ink-map-movement" id="map">
          <div className="ink-rail"><span>01</span><i>CONSTRUCTED MAP</i></div>
          <div className="ink-movement-main">
            <p className="ink-kicker">The intellectual structure can become spatial</p>
            <h2>Prediction is a river,<br /><em>not a single guess.</em></h2>
            <p className="ink-lede">A listener’s model does not simply wait for a note. It moves between learned experience, current context, expected input, mismatch, precision, and update. The page follows that movement.</p>
            <KnowledgeRiver nodes={riverNodes} />
          </div>
        </section>

        <section className="ink-movement ink-quiet-movement" id="quiet">
          <div className="ink-rail"><span>02</span><i>QUIET DISTINCTION</i></div>
          <div className="ink-quiet-layout">
            <div className="ink-quiet-copy">
              <p className="ink-kicker">Where the page takes a breath</p>
              <h2>The next note is only<br /><em>one visible edge.</em></h2>
              <p className="ink-lede">A next-note guess is one consequence of prediction, not the definition of predictive processing. The framework also concerns the sensory activity expected under a present hypothesis, the uncertainty assigned to that expectation, and what happens when the model meets the world.</p>
              <div className="ink-quiet-columns">
                <div><span className="ink-small-label">Predictive processing</span><p>A broad family of accounts about generative models, prediction, error, uncertainty, inference, and sometimes action.</p></div>
                <div><span className="ink-small-label">Predictive coding</span><p>A prominent hierarchical neural or computational implementation family involving predictions and error signalling.</p></div>
                <div><span className="ink-small-label">PCM</span><p>Predictive Coding of Music: a music-specific formulation developed especially by Vuust and collaborators.</p></div>
              </div>
              <MarkNote mark="●">The terminology boundary is source-grounded; this ordering is a Concept Lab teaching sequence.</MarkNote>
            </div>
            <aside className="ink-margin-aside">
              <span className="ink-vertical-stroke" aria-hidden="true" />
              <p>not every<br />forecast is<br />a theory.</p>
              <span className="ink-aside-mark" aria-hidden="true">?</span>
            </aside>
          </div>
        </section>

        <section className="ink-movement ink-precision-movement" id="precision">
          <div className="ink-rail"><span>03</span><i>WORKING EXAMPLE</i></div>
          <div className="ink-movement-main">
            <p className="ink-kicker">Change one condition, keep the event fixed</p>
            <h2>What does precision<br /><em>do to an error?</em></h2>
            <p className="ink-lede">The quiet power of the example is that the target never changes. Only the context changes the width of the expectation envelope.</p>
            <PrecisionStudy data={data.precisionInteraction} />
          </div>
        </section>

        <section className="ink-movement ink-evidence-movement" id="evidence">
          <div className="ink-rail"><span>04</span><i>EVIDENCE REGISTER</i></div>
          <div className="ink-movement-main">
            <p className="ink-kicker">Keep the signal attached to its design</p>
            <h2>What the signals can—<br /><em>and cannot—show.</em></h2>
            <p className="ink-lede">A measured neural or behavioural signal can be compatible with a predictive account without uniquely identifying the computation that produced it. The evidence needs its question, design, result, and limit in the same field of view.</p>
            <EvidenceRegister items={data.signals.items} />
            <MarkNote mark="■">{data.signals.note.replace(/^■\s*/, "")}</MarkNote>
          </div>
        </section>

        <section className="ink-movement ink-trail-movement" id="trail">
          <div className="ink-rail"><span>05</span><i>SCHOLARLY TRAIL</i></div>
          <div className="ink-movement-main">
            <p className="ink-kicker">The bibliography is a landing, not a dump</p>
            <h2>The trail is part<br /><em>of the page.</em></h2>
            <p className="ink-lede">This is a branching research landscape, not a founder story. General predictive-coding foundations, music-specific formulations, empirical expectancy studies, and critical reviews answer related but non-identical questions.</p>
            <SourceTrail items={record.minimumReading} />
          </div>
        </section>

        <section className="ink-movement ink-provenance-movement" id="provenance">
          <div className="ink-rail"><span>06</span><i>READ THE MARKS</i></div>
          <div className="ink-movement-main">
            <p className="ink-kicker">A visual language with epistemic brakes</p>
            <h2>Ink can signal<br /><em>how to trust a line.</em></h2>
            <p className="ink-lede">The accents are not a mood palette. They carry the same five provenance distinctions that keep the canonical lab honest: what the source says, what was observed, what was constructed for teaching, what the Lab arranged, and what remains open.</p>
            <MarkKey record={record} />
            <div className="ink-provenance-notes">
              {record.provenance.map((item) => <div key={item.label}><span className={`ink-inline-mark ${MARK_META[item.glyph as Mark].className}`} aria-hidden="true">{item.glyph}</span><p>{item.note}</p></div>)}
            </div>
          </div>
        </section>

        <section className="ink-movement ink-related-movement" aria-labelledby="ink-related-title">
          <div className="ink-rail"><span>↗</span><i>NEIGHBOURING RECORDS</i></div>
          <div className="ink-movement-main">
            <p className="ink-kicker">One world, different intellectual weather</p>
            <h2 id="ink-related-title">Leave the page<br /><em>through a different path.</em></h2>
            <RelatedRecords record={record} />
          </div>
        </section>
      </div>
    </article>
  );
}

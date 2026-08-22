"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type {
  ClassificationExercise,
  ConceptComparisonBlock,
  EvidenceXray as EvidenceXrayData,
  ModelReveal as ModelRevealData,
  ReactionContrast as ReactionContrastData,
  ScopeMap as ScopeMapData,
  SimpleModel,
  WorkdayTimeline,
} from "@/content/types";

function Mark({ children }: { children: string }) {
  return <span className="aet-mark">{children}</span>;
}

export function FeatureEventExercise({ data }: { data: ClassificationExercise }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<"feature" | "event" | null>(null);
  const item = data.items[index];
  const answer = item.answer === "feature" ? "Work feature" : "Work event";

  return (
    <div className="aet-exercise sk-box tilt-l" aria-label="Feature or event classification exercise">
      <div className="aet-exercise-top">
        <div>
          <p className="k">constructed teaching examples</p>
          <p className="read aet-example-note"><Mark>▲</Mark> No example is guaranteed to produce a particular reaction.</p>
        </div>
        <span className="aet-progress" aria-live="polite">{index + 1} / {data.items.length}</span>
      </div>

      <div className="aet-example-tabs" role="group" aria-label="Examples">
        {data.items.map((example, n) => (
          <button
            key={example.scenario}
            type="button"
            className="facet-key aet-example-tab"
            aria-label={`Example ${n + 1}: ${example.scenario}`}
            aria-pressed={n === index}
            onClick={() => { setIndex(n); setChoice(null); }}
          >
            {String(n + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      <p className="aet-scenario">“{item.scenario}”</p>

      <div className="aet-choice" role="group" aria-label="Choose a classification">
        <button type="button" aria-pressed={choice === "feature"} onClick={() => setChoice("feature")}>
          Work feature
        </button>
        <button type="button" aria-pressed={choice === "event"} onClick={() => setChoice("event")}>
          Work event
        </button>
      </div>

      <div className={`aet-answer ${choice ? "is-answered" : ""}`} aria-live="polite">
        {choice ? (
          <>
            <p className="k">the useful distinction</p>
            <p className="aet-answer-title">{answer}</p>
            <p className="read">{item.explanation}</p>
          </>
        ) : (
          <p className="read aet-answer-prompt">Choose a side, then read the reason.</p>
        )}
      </div>

      <details className="aet-static-fallback">
        <summary>Read the teaching key</summary>
        <ul>
          {data.items.map((example) => (
            <li key={example.scenario}>
              <strong>{example.scenario}</strong> — {example.answer === "feature" ? "work feature" : "work event"}. {example.explanation}
            </li>
          ))}
        </ul>
      </details>

      <p className="k aet-note">{data.note}</p>
    </div>
  );
}

export function SimpleModel({ data }: { data: SimpleModel }) {
  return (
    <div className="aet-simple-model sk-box tilt-r2">
      <p className="k">a useful first approximation</p>
      <p className="lede" style={{ marginTop: ".35rem" }}>{data.lede}</p>
      <div className="aet-simple-flow" aria-label={`${data.first}, followed by ${data.second}`}>
        <span>{data.first}</span>
        <span className="aet-down" aria-hidden="true">↓</span>
        <span>{data.second}</span>
      </div>
      <p className="aet-almost">Almost.</p>
      <p className="read aet-small-note">{data.note}</p>
    </div>
  );
}

export function ModelReveal({ data }: { data: ModelRevealData }) {
  const [shown, setShown] = useState(0);
  const [reduced, setReduced] = useState(false);
  const last = data.stages.length - 1;
  const showTopology = Boolean(data.topology && shown >= last);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(media.matches);
      if (media.matches) setShown(last);
    };
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, [last]);

  const revealNext = () => setShown((value) => Math.min(value + 1, last));

  return (
    <figure className={`aet-model sk-box tilt-l ${reduced ? "is-reduced" : ""}`}>
      <div className="aet-model-controls" role="group" aria-label="Build the Affective Events Theory model">
        <button type="button" onClick={revealNext} disabled={shown >= last}>Draw the next piece</button>
        <button type="button" onClick={() => setShown(last)} disabled={shown >= last}>Show the whole map</button>
      </div>

      {showTopology ? (
        <div className="aet-model-topology" aria-label="Affective Events Theory branched macrostructure">
          {Array.from(new Set(data.topology!.edges.map((edge) => edge.from))).map((from) => {
            const source = data.stages[from];
            const edges = data.topology!.edges.filter((edge) => edge.from === from);
            return (
              <div className="aet-topology-group" key={source.label}>
                <div className="aet-topology-source" style={{ "--aet-colour": source.colour } as CSSProperties}>
                  <span className="aet-model-label">{source.label}</span>
                  <span className="aet-model-body">{source.body}</span>
                </div>
                <div className="aet-topology-edges" aria-label={`${source.label} relationships`}>
                  {edges.map((edge) => {
                    const target = data.stages[edge.to];
                    return (
                      <div className="aet-topology-edge" key={`${edge.from}-${edge.to}-${edge.label ?? ""}`}>
                        <span className="aet-topology-arrow" aria-hidden="true">→</span>
                        <span className="aet-topology-target" style={{ "--aet-colour": target.colour } as CSSProperties}>
                          {edge.label ?? target.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <aside className="aet-topology-context" style={{ "--aet-colour": data.topology!.temporalContext.colour } as CSSProperties}>
            <span className="aet-model-label">{data.topology!.temporalContext.label}</span>
            <span className="aet-model-body">{data.topology!.temporalContext.body}</span>
            <span className="aet-topology-context-note">frames the relationships above — not a downstream outcome</span>
          </aside>
        </div>
      ) : (
        <div className="aet-model-visual" aria-label="Progressive Affective Events Theory model">
          {data.stages.map((stage, index) => (
            <span key={stage.label} className="aet-model-piece">
              <span
                className={`aet-model-node ${index <= shown ? "is-visible" : "is-next"}`}
                style={{ "--aet-colour": stage.colour } as CSSProperties}
                aria-hidden={index <= shown ? undefined : "true"}
              >
                <span className="aet-model-label">{stage.label}</span>
                <span className="aet-model-body">{stage.body}</span>
              </span>
              {index < last && <span className="aet-model-arrow" aria-hidden="true">↓</span>}
            </span>
          ))}
        </div>
      )}

      <div className="aet-linear" aria-label="Linear text alternative for the Affective Events Theory model">
        <p className="k">read it as a sentence</p>
        <ol>
          {data.linear.map((line, index) => <li key={line}><b>{String(index + 1).padStart(2, "0")}</b>{line}</li>)}
        </ol>
      </div>
      <figcaption className="aet-caption"><Mark>●</Mark> {data.caption}</figcaption>
    </figure>
  );
}

export function WorkdayTimeline({ data }: { data: WorkdayTimeline }) {
  return (
    <figure className="aet-workday sk-box tilt-r">
      <div className="aet-workday-head">
        <p className="k">teaching illustration</p>
        <span className="aet-badge"><Mark>▲</Mark> not empirical data</span>
      </div>
      <div className="aet-workday-list" role="list" aria-label="A constructed workday timeline">
        {data.events.map((event) => (
          <article className={`aet-workday-event ${event.tone}`} key={`${event.time}-${event.label}`} role="listitem" data-reveal="rise">
            <div className="aet-workday-time">{event.time}</div>
            <div className="aet-workday-dot" aria-hidden="true" />
            <div className="aet-workday-card">
              <h3>{event.label}</h3>
              <p className="read">{event.detail}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="aet-workday-takeaway"><span>↗</span> {data.takeaway}</p>
      <figcaption className="aet-caption">{data.caption}</figcaption>
    </figure>
  );
}

export function ConceptComparison({ data }: { data: ConceptComparisonBlock }) {
  return (
    <div>
      <p className="lede">{data.lede}</p>
      <div className="aet-comparison-grid">
        {data.cards.map((card, index) => (
          <article className={`aet-comparison sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} key={card.title} style={{ "--aet-colour": card.colour } as CSSProperties}>
            <span className="k">{card.label}</span>
            <h3>{card.title}</h3>
            <p className="read">{card.body}</p>
          </article>
        ))}
      </div>
      <p className="aet-inline-note"><Mark>■</Mark> {data.note}</p>
    </div>
  );
}

export function ReactionContrast({ data }: { data: ReactionContrastData }) {
  return (
    <div className="aet-reaction sk-box red tilt-l2">
      <p className="k"><Mark>▲</Mark> constructed teaching example</p>
      <p className="lede" style={{ marginTop: ".35rem" }}>{data.event}</p>
      <div className="aet-reaction-grid">
        {data.perspectives.map((person, index) => (
          <article className="aet-perspective" key={person.label}>
            <span className="k">{person.label}</span>
            <p className="read"><b>reads it as:</b> {person.reading}</p>
            <p className="read"><b>possible reaction:</b> {person.reaction}</p>
            <span className="aet-perspective-number">0{index + 1}</span>
          </article>
        ))}
      </div>
      <p className="aet-inline-note"><Mark>✦</Mark> {data.takeaway}</p>
      <p className="aet-boundary"><Mark>?</Mark> {data.boundary}</p>
    </div>
  );
}

export function EvidenceXray({ items }: { items: EvidenceXrayData[] }) {
  return (
    <div className="aet-xrays">
      {items.map((item, index) => (
        <article className={`aet-xray sk-box ${index % 2 ? "tilt-r2" : "tilt-l2"}`} key={item.title}>
          <header className="aet-xray-head">
            <div>
              <span className={`aet-xray-kind ${item.label === "process model" ? "model" : "study"}`}>{item.label}</span>
              <h3>{item.title}</h3>
            </div>
            <span className="aet-xray-number">0{index + 1}</span>
          </header>
          <p className="model-src">{item.citation}</p>
          {item.design && <p className="read aet-xray-design"><b>Design:</b> {item.design}</p>}
          <div className="aet-xray-grid">
            <div><span className="k">{item.testedLabel}</span><p className="read">{item.tested}</p></div>
            <div><span className="k">{item.foundLabel}</span><p className="read">{item.found}</p></div>
            <div className="aet-xray-limit"><span className="k">what it did not test</span><p className="read">{item.notTested}</p></div>
          </div>
          {item.doi && <p className="doi">doi {item.doi}</p>}
        </article>
      ))}
    </div>
  );
}

export function ScopeMap({ data }: { data: ScopeMapData }) {
  return (
    <div>
      <p className="lede">{data.lede}</p>
      <div className="aet-scope-grid">
        <div className="sk-box teal tilt-l2">
          <p className="k">AET gives us the map</p>
          <ul>{data.map.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
        </div>
        <div className="sk-box red tilt-r2">
          <p className="k">the map stops here</p>
          <ul>{data.stops.map((item) => <li key={item}><span>?</span>{item}</li>)}</ul>
        </div>
      </div>
      <p className="aet-inline-note"><Mark>■</Mark> {data.note}</p>
    </div>
  );
}

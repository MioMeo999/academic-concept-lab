"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type {
  SDTMatrixCase,
  SDTMiniTheory,
  SDTMotive,
  SDTNeed,
  SDTRegulation,
  SDTRewardComparison,
} from "@/content/types";

function Mark({ children }: { children: string }) {
  return <span className="sdt-mark">{children}</span>;
}

export function SDTMotiveSelector({ items }: { items: SDTMotive[] }) {
  const [index, setIndex] = useState(0);
  const selected = items[index];

  return (
    <div className="sdt-selector sk-box tilt-l" aria-label="Explore different kinds of motivation">
      <div className="sdt-selector-head">
        <p className="k">choose the reason</p>
        <span className="sdt-badge"><Mark>▲</Mark> teaching examples</span>
      </div>
      <div className="sdt-selector-options" role="group" aria-label="Motivational statements">
        {items.map((item, itemIndex) => (
          <button
            type="button"
            className="sdt-statement"
            aria-pressed={itemIndex === index}
            key={item.statement}
            onClick={() => setIndex(itemIndex)}
          >
            “{item.statement}”
          </button>
        ))}
      </div>
      <div className={`sdt-selector-answer ${selected.family}`} aria-live="polite">
        <p className="k">likely reading</p>
        <h3>{selected.regulation}</h3>
        <p className="sdt-answer-meta">{selected.motivationKind} · {selected.relativeAutonomy} · {selected.family} motivation</p>
        <p className="read">{selected.explanation}</p>
      </div>
      <details className="sdt-static-fallback">
        <summary>Read all six explanations</summary>
        <ul>
          {items.map((item) => (
            <li key={item.statement}><strong>“{item.statement}”</strong> — {item.regulation}. {item.explanation}</li>
          ))}
        </ul>
      </details>
      <p className="sdt-note"><Mark>?</Mark> Real behaviour can draw on mixed motives; these statements isolate useful teaching contrasts rather than diagnose a person.</p>
    </div>
  );
}

function RegulationNode({ item, visible }: { item: SDTRegulation; visible: boolean }) {
  return (
    <div className={`sdt-regulation-node ${visible ? "is-visible" : "is-next"}`} aria-hidden={visible ? undefined : "true"} style={{ "--sdt-colour": item.colour } as CSSProperties}>
      <span className="sdt-regulation-label">{item.label}</span>
      <span className="sdt-regulation-descriptor">{item.descriptor}</span>
      <span className="sdt-regulation-body">{item.body}</span>
    </div>
  );
}

export function SDTRegulationLandscape({ items }: { items: SDTRegulation[] }) {
  const last = items.length - 1;
  const [shown, setShown] = useState(0);
  const [reduced, setReduced] = useState(false);

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
    <figure className={`sdt-regulation sk-box tilt-r ${reduced ? "is-reduced" : ""}`}>
      <div className="sdt-model-controls" role="group" aria-label="Build the regulation architecture">
        <button type="button" onClick={revealNext} disabled={shown >= last}>Draw the next piece</button>
        <button type="button" onClick={() => setShown(last)} disabled={shown >= last}>Show the whole landscape</button>
      </div>
      <div className="sdt-autonomy-axis" aria-hidden="true">
        <span>least autonomous</span><span>relative autonomy</span><span>more autonomous</span>
      </div>
      <div className="sdt-regulation-visual" aria-label="Regulation forms ordered by relative autonomy">
        {items.map((item, index) => (
          <span className="sdt-regulation-piece" key={item.label}>
            <RegulationNode item={item} visible={index <= shown} />
            {index < last && <span className="sdt-regulation-arrow" aria-hidden="true">→</span>}
          </span>
        ))}
      </div>
      <div className="sdt-regulation-legend">
        <span><b>controlled</b> external + introjected</span>
        <span><b>autonomous</b> identified + integrated + intrinsic</span>
      </div>
      <div className="sdt-linear" aria-label="Text alternative for the regulation architecture">
        <p className="k">read it as a landscape, not a staircase</p>
        <ol>
          {items.map((item, index) => <li key={item.label}><b>{String(index + 1).padStart(2, "0")}</b>{item.label}: {item.body}</li>)}
        </ol>
      </div>
      <figcaption className="sdt-caption"><Mark>●</Mark> Relative autonomy is the organising dimension. This is not a required developmental sequence; integrated regulation remains extrinsic.</figcaption>
    </figure>
  );
}

export function SDTNeedSelector({ items }: { items: SDTNeed[] }) {
  const [index, setIndex] = useState(0);
  const selected = items[index];

  return (
    <div className="sdt-needs">
      <div className="sdt-need-tabs" role="group" aria-label="Three basic psychological needs">
        {items.map((item, itemIndex) => (
          <button type="button" key={item.label} aria-pressed={itemIndex === index} onClick={() => setIndex(itemIndex)} style={{ "--sdt-colour": item.colour } as CSSProperties}>
            {item.label}
          </button>
        ))}
      </div>
      <article className="sdt-need-detail sk-box tilt-l" style={{ "--sdt-colour": selected.colour } as CSSProperties} aria-live="polite">
        <span className="k">the psychological experience</span>
        <h3>{selected.question}</h3>
        <p className="lede">{selected.meaning}</p>
        <p className="read"><b>Not the same as:</b> {selected.distinction}</p>
      </article>
      <details className="sdt-static-fallback">
        <summary>Read all three needs</summary>
        <ul>{items.map((item) => <li key={item.label}><strong>{item.label}:</strong> {item.question} {item.meaning} Not the same as {item.distinction}</li>)}</ul>
      </details>
    </div>
  );
}

export function SDTAutonomyMatrix({ cases, note }: { cases: SDTMatrixCase[]; note: string }) {
  return (
    <figure className="sdt-matrix-wrap">
      <div className="sdt-matrix-y" aria-hidden="true"><span>more independent</span><span>more interdependent</span></div>
      <div className="sdt-matrix" aria-label="Autonomy and independence are different dimensions">
        {cases.map((item) => (
          <article className="sdt-matrix-case sk-box" key={item.label} style={{ "--sdt-colour": item.colour } as CSSProperties}>
            <span className="k">{item.label}</span>
            <h3>{item.title}</h3>
            <p className="read">{item.body}</p>
          </article>
        ))}
        <span className="sdt-matrix-x sdt-matrix-control" aria-hidden="true">controlled</span>
        <span className="sdt-matrix-x sdt-matrix-autonomous" aria-hidden="true">autonomous</span>
      </div>
      <figcaption className="sdt-caption"><Mark>▲</Mark> {note}</figcaption>
    </figure>
  );
}

export function SDTRewardComparison({ data }: { data: SDTRewardComparison }) {
  const [index, setIndex] = useState(0);
  const selected = data.cases[index];

  return (
    <div className="sdt-reward sk-box tilt-r">
      <div className="sdt-reward-head">
        <span className="k">the nominal reward</span>
        <strong>{data.reward}</strong>
      </div>
      <div className="sdt-reward-tabs" role="group" aria-label="Reward contexts">
        {data.cases.map((item, itemIndex) => <button type="button" key={item.label} aria-pressed={itemIndex === index} onClick={() => setIndex(itemIndex)}>{item.label}</button>)}
      </div>
      <div className="sdt-reward-answer" aria-live="polite" style={{ "--sdt-colour": selected.colour } as CSSProperties}>
        <p className="k">possible functional significance</p>
        <h3>{selected.meaning}</h3>
        <p className="lede">“{selected.quote}”</p>
        <p className="read">{selected.body}</p>
      </div>
      <details className="sdt-static-fallback">
        <summary>Read both contexts</summary>
        <ul>{data.cases.map((item) => <li key={item.label}><strong>{item.label}:</strong> “{item.quote}” — {item.meaning}. {item.body}</li>)}</ul>
      </details>
      <p className="sdt-note"><Mark>?</Mark> {data.note}</p>
    </div>
  );
}

export function SDTMiniTheoryConstellation({ items }: { items: SDTMiniTheory[] }) {
  return (
    <div className="sdt-constellation" aria-label="The six mini-theories of Self-Determination Theory">
      <div className="sdt-constellation-core sk-box tilt-l">
        <span className="k">the macro-theory</span>
        <strong>Self-Determination Theory</strong>
        <span className="read">Six connected questions, not one universal mediation chain.</span>
      </div>
      <div className="sdt-mini-grid">
        {items.map((item) => (
          <article className={`sdt-mini ${item.emphasis}`} key={item.acronym} style={{ "--sdt-colour": item.colour } as CSSProperties}>
            <span className="sdt-mini-acronym">{item.acronym}</span>
            <h3>{item.title}</h3>
            <p className="read">{item.question}</p>
            {item.emphasis === "core" && <span className="sdt-mini-note">doing the most work here</span>}
          </article>
        ))}
      </div>
      <p className="sdt-caption"><Mark>✦</Mark> This constellation is a Concept Lab teaching arrangement. OIT, BPNT, and CET are the central lenses for this record; the other three remain neighbouring parts of the wider SDT family.</p>
    </div>
  );
}

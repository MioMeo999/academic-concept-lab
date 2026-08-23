"use client";

import { useState } from "react";

export function KeyNeighbourhood({ levels }: { levels: { label: string; body: string; relations: string[] }[] }) {
  const [level, setLevel] = useState(0);
  const current = levels[level] ?? levels[0];
  if (!current) return null;

  return (
    <div className="tonal-key-space" aria-live="polite">
      <div className="tonal-level-buttons" role="group" aria-label="Progressive key-space view">
        {levels.map((item, index) => <button type="button" aria-pressed={index === level} key={item.label} onClick={() => setLevel(index)}>{item.label}</button>)}
      </div>
      <div className="tonal-key-space-state"><span className="k">{current.label}</span><p>{current.body}</p></div>
      <div className={`tonal-neighbourhood-map level-${level}`} role="img" aria-label={`Psychological key neighbourhood, ${current.label}`}>
        <span className="tonal-key-node central">C major</span>
        {current.relations.map((relation, index) => <span className={`tonal-key-node relation-${index % 6}`} key={relation}>{relation}</span>)}
        {level === levels.length - 1 && <div className="tonal-torus-lines" aria-hidden="true"><i /><i /><i /></div>}
      </div>
      <details className="tonal-static-fallback"><summary>Read the key-space explanation</summary><p>{current.body}</p><p>{current.relations.join(" · ")}</p>{level === levels.length - 1 && <p>The torus is a mathematical representation of psychological similarity relations, not a literal neural map.</p>}</details>
    </div>
  );
}

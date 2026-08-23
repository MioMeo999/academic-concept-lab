"use client";

import { useState } from "react";
import type { TonalCard } from "@/content/types";

export function TonalShiftVisual({ states }: { states: TonalCard[] }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="tonal-shift-visual" aria-live="polite">
      <div className="tonal-shift-buttons" role="group" aria-label="Home can move stages">
        {states.map((state, index) => <button type="button" aria-pressed={selected === index} key={state.label} onClick={() => setSelected(index)}>{state.label}</button>)}
      </div>
      <div className="tonal-shift-track">
        {states.map((state, index) => <article className={`tonal-shift-state ${selected === index ? "selected" : ""}`} key={state.label}><span className="k">0{index + 1}</span><strong>{state.label}</strong><p>{state.body}</p>{index < states.length - 1 && <span className="tonal-shift-arrow" aria-hidden="true">→</span>}</article>)}
      </div>
      <p className="tonal-shift-caption">The visual is a Concept Lab synthesis of dynamic tonal organisation; it is not a deterministic modulation path.</p>
    </div>
  );
}

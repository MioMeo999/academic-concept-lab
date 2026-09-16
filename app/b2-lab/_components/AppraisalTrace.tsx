"use client";

import { useState } from "react";
import { Pigment, Intervention } from "./Pigment";
import { Note } from "./Type";

export const appraisalPossibilities = [
  { label: "Confirm", title: "The later reading can agree.", body: "Broader contextual information can confirm the earlier interpretation.", path: "M20 57 C120 54 175 63 280 61 S420 57 570 58" },
  { label: "Revise", title: "The later reading can change.", body: "Broader context can modify the interpretation without erasing the earlier response.", path: "M20 28 C120 25 160 80 270 88 S430 58 570 78" },
  { label: "Reverse", title: "The later reading can turn.", body: "Broader context can reverse an initial evaluation. That possibility does not require a pleasant outcome.", path: "M20 28 C120 25 150 135 290 125 S440 110 570 143" },
];

export function AppraisalTrace({ compact = false }: { compact?: boolean }) {
  const [choice, setChoice] = useState(1);
  const current = appraisalPossibilities[choice];
  return <div className={`b2-appraisal ${compact ? "b2-compact" : ""}`}>
    <div className="b2-appraisal-intro"><div><span className="b2-eyebrow">Later / slower / revisitable</span><h3>Appraisal</h3></div><p>Social, musical and personal context can change the meaning of an outcome. The earlier response remains part of the account.</p></div>
    <div className="b2-trace-composition"><div className="b2-retained" data-retained-response><span className="b2-eyebrow">Earlier response · retained</span><p>An immediate response has already occurred.</p><Pigment tone="cobalt" seed={64} className="b2-retained-mark" /></div><div className="b2-trace-difference"><svg viewBox="0 0 600 175" preserveAspectRatio="none" aria-hidden="true"><path d="M20 28 C120 25 175 34 280 32 S420 28 570 29" className="b2-prior-line" /><path d={current.path} className="b2-current-line" /></svg><Intervention tone="violet">retained, not overwritten</Intervention></div><div className="b2-appraisal-current" aria-live="polite" aria-atomic="true"><span className="b2-eyebrow">One possible later reading</span><h4>{current.title}</h4><p>{current.body}</p></div></div>
    <div className="b2-choice-row" role="group" aria-label="Inspect a possible appraisal relationship">{appraisalPossibilities.map((possibility, i) => <button key={possibility.label} type="button" onClick={() => setChoice(i)} aria-pressed={choice === i}>{possibility.label}</button>)}</div>
    <Note glyph="✦">Local teaching construction of a source-grounded distinction. Lines retain an earlier response beside a possible later reading. They are not valence scores, time measurements, evidence strength or a report of your feelings.</Note>
    <p className="b2-trace-equivalent"><strong>Text equivalent:</strong> later Appraisal may confirm, revise or reverse an earlier interpretation. Earlier Prediction and Reaction are not erased. These are possibilities, not a mandatory emotional pathway.</p>
  </div>;
}

import type { HuronRecordContent } from "@/content/types";
import { Pigment, Intervention } from "./Pigment";
import { Note } from "./Type";

export function OutcomeHinge({ windows }: { windows: HuronRecordContent["timeline"]["windows"] }) {
  const before = windows.filter(item => ["imagination", "tension"].includes(item.key));
  const parallel = windows.filter(item => ["prediction", "reaction"].includes(item.key));
  return <div className="b2-hinge-composition">
    <div className="b2-before"><span className="b2-eyebrow">Before the outcome</span>{before.map(item => <div className={`b2-preparation b2-${item.key}`} key={item.key}><h3>{item.label.toLowerCase()}</h3><p className="b2-functional-question">{item.question}</p><p>{item.body}</p><span className="b2-small">{item.boundary}</span></div>)}</div>
    <div className="b2-hinge"><div className="b2-hinge-line" aria-hidden="true" /><span className="b2-eyebrow">Outcome onset</span><span className="b2-outcome-word">the<br /><em>event</em></span><Intervention tone="ochre">one arrival</Intervention></div>
    <div className="b2-parallel" aria-label="Prediction and Reaction: parallel responses after onset"><span className="b2-eyebrow b2-parallel-label">After onset · in parallel</span><span className="b2-parallel-sign" aria-hidden="true">∥</span>{parallel.map((item, i) => <article key={item.key} data-parallel-response={item.key}><Pigment tone={i === 0 ? "cobalt" : "vermilion"} seed={12 + i} className="b2-response-mark" /><h3>{item.key === "prediction" ? "Prediction" : "Reaction"}</h3><p className="b2-functional-question">{item.question}</p><p>{item.body}</p><span className="b2-small">{item.function} · {item.boundary}</span></article>)}</div>
    <Note glyph="●" className="b2-hinge-note">Huron’s functional distinction: Prediction Response evaluates an earlier forecast; Reaction addresses the immediate functional situation. They can begin together after onset. This composition encodes no measured latency or five independently verified modules.</Note>
  </div>;
}

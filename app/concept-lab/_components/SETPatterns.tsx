"use client";

import { useState } from "react";
import type { SETAuditCase, SETPowerModel, SETReciprocityMode, SETRuleCase } from "@/content/types";

export function SETReciprocitySelector({ items }: { items: SETReciprocityMode[] }) {
  const [index, setIndex] = useState(0);
  const selected = items[index];

  return (
    <div className="set-selector sk-box tilt-l" aria-label="Explore three meanings of reciprocity">
      <div className="set-selector-head"><p className="k">which reciprocity?</p><span className="set-badge">teaching distinction</span></div>
      <div className="set-tabs" role="group" aria-label="Reciprocity meanings">
        {items.map((item, itemIndex) => <button type="button" key={item.label} aria-pressed={itemIndex === index} onClick={() => setIndex(itemIndex)}><span>{item.short}</span>{item.label}</button>)}
      </div>
      <div className="set-answer" aria-live="polite"><p className="k">selected meaning</p><h3>{selected.label}</h3><p className="read">{selected.body}</p></div>
      <details className="set-fallback"><summary>Read all three meanings</summary><ul>{items.map((item) => <li key={item.label}><b>{item.label}:</b> {item.body}</li>)}</ul></details>
      <p className="set-note">Gouldner supplies the foundational norm of reciprocity; this later three-part organisation should not be attributed to Gouldner alone.</p>
    </div>
  );
}

type PowerState = { aValue: number; aAlternative: number; bValue: number; bAlternative: number };

function dependence(value: number, alternative: number) {
  return value + alternative;
}

function powerReading(state: PowerState) {
  const a = dependence(state.aValue, state.aAlternative);
  const b = dependence(state.bValue, state.bAlternative);
  const balance = a === b ? "balanced power" : a > b ? "A has more relational power" : "B has more relational power";
  const mutual = a >= 3 && b >= 3 ? "high mutual dependence" : a <= 1 && b <= 1 ? "low mutual dependence" : "mixed mutual dependence";
  return { balance, mutual };
}

function PowerSelect({ label, value, options, onChange }: { label: string; value: number; options: string[]; onChange: (value: number) => void }) {
  return <label className="set-control"><span>{label}</span><select value={value} onChange={(event) => onChange(Number(event.target.value))}>{options.map((option, index) => <option value={index} key={option}>{option}</option>)}</select></label>;
}

export function SETPowerDependenceLab({ model }: { model: SETPowerModel }) {
  const [state, setState] = useState<PowerState>({ aValue: 2, aAlternative: 2, bValue: 2, bAlternative: 2 });
  const reading = powerReading(state);
  const setPreset = (low: boolean) => setState(low ? { aValue: 0, aAlternative: 0, bValue: 0, bAlternative: 0 } : { aValue: 2, aAlternative: 2, bValue: 2, bAlternative: 2 });

  return (
    <div className="set-power sk-box tilt-r" aria-label="Power and dependence teaching lab">
      <div className="set-power-head"><div><p className="k">relational control</p><h3>Who needs whom?</h3></div><span className="set-badge">no numeric power score</span></div>
      <p className="read">Set the value each actor receives through the other person and the alternatives available elsewhere. The labels are teaching conditions, not a measurement instrument.</p>
      <div className="set-power-controls">
        <fieldset><legend>Actor A depends on B</legend><PowerSelect label="value mediated by B" value={state.aValue} options={model.values} onChange={(value) => setState({ ...state, aValue: value })} /><PowerSelect label="alternatives for A" value={state.aAlternative} options={model.alternatives} onChange={(value) => setState({ ...state, aAlternative: value })} /></fieldset>
        <fieldset><legend>Actor B depends on A</legend><PowerSelect label="value mediated by A" value={state.bValue} options={model.values} onChange={(value) => setState({ ...state, bValue: value })} /><PowerSelect label="alternatives for B" value={state.bAlternative} options={model.alternatives} onChange={(value) => setState({ ...state, bAlternative: value })} /></fieldset>
      </div>
      <div className="set-preset" role="group" aria-label="Power dependence presets"><span className="k">compare balanced conditions</span><button type="button" onClick={() => setPreset(false)}>balanced + high mutual dependence</button><button type="button" onClick={() => setPreset(true)}>balanced + low mutual dependence</button></div>
      <div className="set-power-result" aria-live="polite"><span className="k">current relational reading</span><strong>{reading.balance}</strong><strong>{reading.mutual}</strong></div>
      <p className="set-note">{model.note} Power balance and total mutual dependence are different questions: two actors can have balanced power while both depend heavily on one another, or while neither depends much.</p>
    </div>
  );
}

export function SETRuleSelector({ items }: { items: SETRuleCase[] }) {
  const [index, setIndex] = useState(0);
  const selected = items[index];
  return (
    <div className="set-rule sk-box tilt-l" aria-label="Exchange rules">
      <p className="k">same action. different rule?</p>
      <div className="set-tabs set-rule-tabs" role="group" aria-label="Exchange rule cases">{items.map((item, itemIndex) => <button type="button" key={item.label} aria-pressed={itemIndex === index} onClick={() => setIndex(itemIndex)}>{item.label}</button>)}</div>
      <div className="set-answer" aria-live="polite"><p className="k">rule of response</p><h3>{selected.rule}</h3><p className="read">{selected.body}</p></div>
      <details className="set-fallback"><summary>Read every rule</summary><ul>{items.map((item) => <li key={item.label}><b>{item.label}:</b> {item.rule}. {item.body}</li>)}</ul></details>
    </div>
  );
}

export function SETTheoryAudit({ items }: { items: SETAuditCase[] }) {
  const [index, setIndex] = useState(0);
  const selected = items[index];
  return (
    <div className="set-audit sk-box tilt-r" aria-label="Social Exchange Theory audit">
      <p className="k">claim under inspection</p>
      <div className="set-tabs set-audit-tabs" role="group" aria-label="Claims to audit">{items.map((item, itemIndex) => <button type="button" key={item.label} aria-pressed={itemIndex === index} onClick={() => setIndex(itemIndex)}>{item.label}</button>)}</div>
      <blockquote>{selected.claim}</blockquote>
      <div className="set-audit-grid">{selected.answers.map((answer, answerIndex) => <div className="set-audit-item" key={answer}><span>{String(answerIndex + 1).padStart(2, "0")}</span><p>{answer}</p></div>)}</div>
      <div className="set-verdict"><span className="k">audit reading</span><p className="read">{selected.verdict}</p></div>
      <details className="set-fallback"><summary>Read both audit cases</summary><ul>{items.map((item) => <li key={item.label}><b>{item.label}:</b> {item.claim} — {item.verdict}</li>)}</ul></details>
    </div>
  );
}

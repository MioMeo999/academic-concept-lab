"use client";

import { useState } from "react";
import type { SETPowerModel } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import { powerReading, type PowerState } from "./power";
import s from "./set.module.css";

export function Lab({ power, emerson }: { power: SETPowerModel; emerson: { label: string; body: string; source: string } }) {
  const [state, setState] = useState<PowerState>({ aValue: 2, aAlt: 2, bValue: 2, bAlt: 2 });
  const update = (key: keyof PowerState) => (value: string) => setState((current) => ({ ...current, [key]: Number(value) }));
  const reading = powerReading(state);
  const options = (values: string[]) => values.map((label, index) => ({ value: String(index), label }));
  const selected = (values: string[], index: number) => {
    const value = values[index];
    if (!value) throw new Error("Social Exchange Theory has an invalid teaching-choice index");
    return value;
  };
  const conclusion = reading.balance === "balanced power"
    ? "The selected conditions leave the two dependencies balanced. Balance does not tell us whether the mutual dependence is high or low."
    : reading.balance === "B has more relational power"
      ? "A depends more on B than B depends on A in this constructed comparison; the relative advantage belongs to the relation, not to B as a fixed trait."
      : "B depends more on A than A depends on B in this constructed comparison; the relative advantage belongs to the relation, not to A as a fixed trait.";

  return (
    <div className={s.lab}>
      <p className={s.labIntro}>Power is read through dependence: what each party values from the other, and what alternatives each has. Change one condition at a time to see the relation change.</p>
      <div className={s.labControls}>
        <fieldset className={s.labSide} data-side="a">
          <legend>Actor A</legend>
          <p className={s.smallHead}>What A values through B</p>
          <Choices<string> label="How much A values what passes through B" value={String(state.aValue)} onChange={update("aValue")} options={options(power.values)} />
          <p className={s.smallHead}>Other places A could get it</p>
          <Choices<string> label="How many alternatives A has to B" value={String(state.aAlt)} onChange={update("aAlt")} options={options(power.alternatives)} />
        </fieldset>
        <fieldset className={s.labSide} data-side="b">
          <legend>Actor B</legend>
          <p className={s.smallHead}>What B values through A</p>
          <Choices<string> label="How much B values what passes through A" value={String(state.bValue)} onChange={update("bValue")} options={options(power.values)} />
          <p className={s.smallHead}>Other places B could get it</p>
          <Choices<string> label="How many alternatives B has to A" value={String(state.bAlt)} onChange={update("bAlt")} options={options(power.alternatives)} />
        </fieldset>
      </div>

      <div className={s.labReading} aria-live="polite" aria-atomic="true" data-balance={reading.balance}>
        <p className={s.smallHead}>The relation changes with both dependencies</p>
        <div className={s.dependencePair}>
          <p><span>A depends on B</span><strong>{selected(power.values, state.aValue)} · {selected(power.alternatives, state.aAlt)}</strong></p>
          <p><span>B depends on A</span><strong>{selected(power.values, state.bValue)} · {selected(power.alternatives, state.bAlt)}</strong></p>
        </div>
        <h3 className={s.labVerdict}><b>{reading.balance}</b></h3>
        <p>{conclusion}</p>
        <p className={s.labMutual}><span>Mutual dependence</span>{reading.mutual}</p>
      </div>

      <p className={s.teachingNote}><Glyph g="▲" /> The low, moderate and higher readings are categories in this constructed teaching exercise, not measurements or effect sizes. {power.note}</p>
      <p className={s.srcNote} role="note"><span className={s.srcKick}><Glyph g="●" /> {emerson.label}</span> {emerson.body} <span className={s.srcBy}>{emerson.source}</span></p>
    </div>
  );
}

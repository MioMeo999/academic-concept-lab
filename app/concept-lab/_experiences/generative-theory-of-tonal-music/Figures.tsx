"use client";

import { useState } from "react";
import type { ASACard, GTTMAnalysisSpec, GTTMLens } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { useTones } from "../../_folio/useTones";
import * as hand from "../../_folio/hand";
import { GroupingOverlay, MeterOverlay, Notes, RelationOverlay, Roll, SpanOverlay } from "./Roll";
import { BAR_HEADS, ROLL, xOfEvent } from "./geometry";
import s from "./gttm.module.css";

/* ---------------------------------------------------------------------------
   The same sixteen notes, read again and again.

   The sound never changes. Each figure draws something different around the
   same phrase — a question asked of it — and, where the reader can hear it,
   plays the record's own constructed events with the record's own timing.
   ------------------------------------------------------------------------- */

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 6, wander = 1.1) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

// event 1 is at 0 s and each following event a step later: 0.625 s
const STEP = 0.625;
const xAt = (t: number) => xOfEvent(1) + ((t - 0.24) / STEP) * ROLL.dx;

function Player({ tones, id, events, label }: { tones: ReturnType<typeof useTones>; id: string; events: GTTMAnalysisSpec["surface"]["events"]; label: string }) {
  const on = tones.playing === id;
  return (
    <div className={s.player}>
      <button type="button" className={s.play} onClick={() => void tones.play(id, events)} aria-label={`${on ? "Replay" : "Play"} ${label}`}>{on ? "Replay" : "Play"}</button>
      <button type="button" className={s.stopBtn} onClick={tones.stop} disabled={!on}>Stop</button>
      <span className={s.playState} aria-live="polite">{on ? "playing" : tones.unavailable ? "audio unavailable — read the notes below" : "ready"}</span>
    </div>
  );
}

const nowIn = (events: GTTMAnalysisSpec["surface"]["events"], at: number, playing: boolean) => (playing ? events.find((e) => at >= e.start && at <= e.start + e.duration)?.id : undefined);
const Playhead = ({ at }: { at: number }) => (at > 0 ? <path className={s.playhead} d={L(xAt(at), 26, xAt(at), ROLL.h - 24, 900, 6, 0.3)} /> : null);

/* ------------------------------------------------------------------------
   The opening: one surface, four questions
   --------------------------------------------------------------------- */

export function LensRoll({ analysis, lenses, note }: { analysis: GTTMAnalysisSpec; lenses: GTTMLens[]; note: string }) {
  const [lens, setLens] = useState<GTTMLens["key"]>("group");
  const tones = useTones();
  const ev = analysis.surface.events;
  const now = nowIn(ev, tones.at, tones.playing === "surface");
  const reading = {
    group: `${analysis.grouping.local.join(" · ")} — then ${analysis.grouping.higher.join(" · ")}.`,
    meter: `${analysis.meter.levels.join(" · ")}.`,
    importance: `${analysis.timeSpans.heads.join(" · ")}.`,
    relation: `${analysis.prolongation.relations.slice(0, 4).join(" · ")}.`,
  }[lens];
  const l = lenses.find((x) => x.key === lens)!;

  return (
    <div className={s.lensRoll} data-lens={lens} style={{ "--hue": l.colour } as React.CSSProperties}>
      <figure className={s.lensFigure}>
        <Roll label={`The sixteen-note phrase in ${analysis.surface.key}, ${analysis.surface.meter}. Lens: ${l.label}. ${l.question}`}>
          <g className={s.lensLayer} data-lens="group" data-on={lens === "group" || undefined}><GroupingOverlay /></g>
          <g className={s.lensLayer} data-lens="meter" data-on={lens === "meter" || undefined}><MeterOverlay /></g>
          <g className={s.lensLayer} data-lens="importance" data-on={lens === "importance" || undefined}><SpanOverlay stage={2} events={ev} /></g>
          <g className={s.lensLayer} data-lens="relation" data-on={lens === "relation" || undefined}><RelationOverlay events={ev} /></g>
          <Notes events={ev} now={now} heads={lens === "importance" ? BAR_HEADS : []} />
          <Playhead at={tones.playing === "surface" ? tones.at : 0} />
        </Roll>
      </figure>
      <div className={s.lensPanel}>
        <Choices<GTTMLens["key"]> label="Which question?" value={lens} onChange={setLens} options={lenses.map((x) => ({ value: x.key, label: x.label, hint: x.question }))} />
        <Player tones={tones} id="surface" events={ev} label="the sixteen-note phrase" />
        <p className={s.reading} aria-live="polite">{reading}</p>
        <p className={s.figNote}>{note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Grouping and meter: two structures over one phrase
   --------------------------------------------------------------------- */

export function StructureRoll({ analysis }: { analysis: GTTMAnalysisSpec }) {
  const [show, setShow] = useState<"group" | "meter" | "both">("both");
  const ev = analysis.surface.events;
  return (
    <div className={s.structure} data-show={show}>
      <figure className={s.structureFigure}>
        <Roll label="The same sixteen notes with nested groups drawn above and metrical levels drawn below.">
          <g className={s.lensLayer} data-on={show !== "meter" || undefined}><GroupingOverlay /></g>
          <g className={s.lensLayer} data-on={show !== "group" || undefined}><MeterOverlay /></g>
          <Notes events={ev} />
        </Roll>
      </figure>
      <div className={s.structurePanel}>
        <Choices<"group" | "meter" | "both"> label="Which structure?" value={show} onChange={setShow} options={[{ value: "group", label: "Grouping", hint: "where events belong together" }, { value: "meter", label: "Meter", hint: "which positions are stronger" }, { value: "both", label: "Both", hint: "they are not the same segmentation" }]} />
        <p className={s.reading} aria-live="polite">{show === "group" ? analysis.grouping.rationale : show === "meter" ? analysis.meter.relation : "Groups end after events 4, 8, 12 and 16; bars begin at events 1, 5, 9 and 13. Here the phrase is regular, so the two line up — without being the same thing."}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Time spans: segment, choose a head, keep the alternative
   --------------------------------------------------------------------- */

export function SpanSteps({ analysis, cards }: { analysis: GTTMAnalysisSpec; cards: ASACard[] }) {
  const [step, setStep] = useState(0);
  const ev = analysis.surface.events;
  return (
    <div className={s.spanSteps} data-step={step}>
      <figure className={s.structureFigure}>
        <Roll short label={`Time-span reduction, step ${step + 1}: ${cards[step].label.toLowerCase()}.`}>
          <SpanOverlay stage={(step + 1) as 1 | 2 | 3} events={ev} />
          <Notes events={ev} heads={step >= 1 ? BAR_HEADS : []} />
        </Roll>
      </figure>
      <div className={s.structurePanel}>
        <Choices<string> label="Step through a time-span reduction" value={String(step)} onChange={(v) => setStep(Number(v))} options={cards.map((c, i) => ({ value: String(i), label: c.label, hint: `step ${i + 1}` }))} />
        <ol className={s.stepList} aria-label="The three steps, in the record's words">
          {cards.map((c, i) => (
            <li key={c.label} data-on={i <= step || undefined} style={{ "--hue": c.colour } as React.CSSProperties}>
              <b>{c.label}</b> {c.body}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Reduction is a change of level, not a deletion
   --------------------------------------------------------------------- */

export function Reductions({ analysis }: { analysis: GTTMAnalysisSpec }) {
  const [i, setI] = useState(0);
  const tones = useTones();
  const st = analysis.reductions[i];
  const ev = analysis.surface.events;
  const kept = ev.filter((e) => st.included.includes(e.id));
  const id = `reduction-${i}`;
  const now = nowIn(kept, tones.at, tones.playing === id);
  return (
    <div className={s.reductions} data-level={i}>
      <figure className={s.structureFigure}>
        <Roll short label={`${st.label}: ${st.included.length} of the sixteen events kept in play; the other ${16 - st.included.length} are drawn faint and remain in the phrase.`}>
          <Notes events={ev} included={st.included} now={now} />
          <Playhead at={tones.playing === id ? tones.at : 0} />
        </Roll>
      </figure>
      <div className={s.structurePanel}>
        <Choices<string> label="Level of description" value={String(i)} onChange={(v) => { tones.stop(); setI(Number(v)); }} options={analysis.reductions.map((r, k) => ({ value: String(k), label: r.label, hint: `${r.included.length} of 16` }))} />
        <Player tones={tones} id={id} events={kept} label={`${st.label}: events ${st.included.join(", ")}`} />
        <p className={s.reading} aria-live="polite">{st.body}</p>
      </div>
      <ol className={s.levels} aria-label="All four levels, in the record's words">
        {analysis.reductions.map((r, k) => (
          <li key={r.label} data-on={k === i || undefined}>
            <b>{r.label}</b>
            <span>{r.body}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------------
   An architecture, not a pipeline
   --------------------------------------------------------------------- */

const NODE = [
  { x: 40, y: 110, w: 130, h: 70 },
  { x: 300, y: 20, w: 150, h: 64 },
  { x: 300, y: 118, w: 150, h: 64 },
  { x: 300, y: 216, w: 150, h: 64 },
];
const mid = (n: (typeof NODE)[number]): [number, number] => [n.x + n.w / 2, n.y + n.h / 2];
const edge = (i: number, side: "r" | "l" | "t" | "b") => {
  const n = NODE[i];
  return side === "r" ? [n.x + n.w, n.y + n.h / 2] : side === "l" ? [n.x, n.y + n.h / 2] : side === "t" ? [n.x + n.w / 2, n.y] : [n.x + n.w / 2, n.y + n.h];
};

export function Architecture({ stages }: { stages: ASACard[] }) {
  const [mode, setMode] = useState<"pipeline" | "interacting">("interacting");
  const arrow = (a: [number, number], b: [number, number], seed: number, both = false) => {
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    return (
      <g key={seed}>
        <path d={L(a[0], a[1], b[0], b[1], seed, 5, 1)} filter="url(#folio-pencil)" />
        <path d={hand.arrowHead(b[0], b[1], ang, { size: 10, seed })} filter="url(#folio-pencil)" />
        {both && <path d={hand.arrowHead(a[0], a[1], ang + Math.PI, { size: 10, seed: seed + 1 })} filter="url(#folio-pencil)" />}
      </g>
    );
  };
  return (
    <div className={s.architecture} data-mode={mode}>
      <figure className={s.architectureFigure}>
        <svg className={s.roll} viewBox="0 0 520 300" role="img" aria-label={mode === "pipeline" ? "Four boxes in a chain: the surface, then grouping and meter, then time-span reduction, then prolongational reduction, each feeding the next. This is what the theory is not." : "Four boxes: the surface feeds three descriptions — grouping and meter, time-span reduction, prolongational reduction — and those three connect to one another in both directions."}>
          <g className={s.arrows} data-mode="pipeline" data-on={mode === "pipeline" || undefined}>
            {arrow(edge(0, "r") as [number, number], edge(1, "l") as [number, number], 10)}
            {arrow(edge(1, "b") as [number, number], edge(2, "t") as [number, number], 14)}
            {arrow(edge(2, "b") as [number, number], edge(3, "t") as [number, number], 18)}
          </g>
          <g className={s.arrows} data-mode="interacting" data-on={mode === "interacting" || undefined}>
            {[1, 2, 3].map((k) => arrow(edge(0, "r") as [number, number], edge(k, "l") as [number, number], 30 + k * 4))}
            {arrow(edge(1, "b") as [number, number], edge(2, "t") as [number, number], 50, true)}
            {arrow(edge(2, "b") as [number, number], edge(3, "t") as [number, number], 54, true)}
            <path d={hand.curve([[NODE[1].x + NODE[1].w, mid(NODE[1])[1]], [NODE[1].x + NODE[1].w + 44, mid(NODE[2])[1]], [NODE[3].x + NODE[3].w, mid(NODE[3])[1]]], { seed: 60, wander: 0.5 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(NODE[3].x + NODE[3].w, mid(NODE[3])[1], Math.PI + 0.35, { size: 10, seed: 61 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(NODE[1].x + NODE[1].w, mid(NODE[1])[1], -0.35, { size: 10, seed: 62 })} filter="url(#folio-pencil)" />
          </g>
          {NODE.map((n, i) => (
            <g key={i} className={s.archNode} style={{ "--hue": stages[i].colour } as React.CSSProperties}>
              <path className={s.archFill} d={`M${n.x} ${n.y}h${n.w}v${n.h}h${-n.w}z`} />
              <path className={s.archEdge} d={L(n.x, n.y, n.x + n.w, n.y, 70 + i * 4, 6, 1) + L(n.x + n.w, n.y, n.x + n.w, n.y + n.h, 71 + i * 4, 4, 1) + L(n.x + n.w, n.y + n.h, n.x, n.y + n.h, 72 + i * 4, 6, 1) + L(n.x, n.y + n.h, n.x, n.y, 73 + i * 4, 4, 1)} filter="url(#folio-pencil)" />
              <text className={s.archNum} x={n.x + n.w / 2} y={n.y + n.h / 2 + 8} textAnchor="middle" aria-hidden="true">{String(i + 1).padStart(2, "0")}</text>
            </g>
          ))}
        </svg>
      </figure>
      <div className={s.architecturePanel}>
        <Choices<"pipeline" | "interacting"> label="Read the architecture as" value={mode} onChange={setMode} options={[{ value: "interacting", label: "Interacting descriptions", hint: "the theory" }, { value: "pipeline", label: "A pipeline", hint: "what it is not" }]} />
        <ol className={s.stages} aria-label="The four descriptions, in the record's words">
          {stages.map((c, i) => (
            <li key={c.label} style={{ "--hue": c.colour } as React.CSSProperties}>
              <span className={s.stageNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <b>{c.label}</b> {c.body}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

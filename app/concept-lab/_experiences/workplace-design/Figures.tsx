"use client";

import { useState, type CSSProperties } from "react";
import type { Expansion, Interaction, TheoryDemo } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import { Rich } from "../../_components/Sketch";
import * as hand from "../../_folio/hand";
import { AdjacencyLayer, FurnitureLayer, LightLayer, PlanBase, People, Partitions, SightLayer, SoundLayer, SpaceLayer, StrandsAndBubbles } from "./Plan";
import { CROWDED, SPARSE, TALK_CROWDED, TALK_SPARSE, type Pt } from "./geometry";
import s from "./wp.module.css";

/* ---------------------------------------------------------------------------
   The same room, read three more ways.

   The mixer takes the room's six conditions one at a time and lets two of them
   — noise and crowding — be set apart from each other. The stress figure puts
   one worker at one desk and lets the room stop supporting the task. The
   trade-off figure takes the partitions away. Nothing here is a measurement:
   marks carry direction, and where a weight is drawn it is a weight, not a
   quantity.
   ------------------------------------------------------------------------- */

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 6, wander = 1.2) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

/* ------------------------------------------------------------------------
   Six conditions of one room
   --------------------------------------------------------------------- */

type Layer = "layout" | "noise" | "privacy" | "density" | "light" | "furniture";
type Noise = "quiet" | "steady" | "talk";
type Crowd = "spacious" | "cramped";
// the record's six elements, in its own order
const LAYERS: Layer[] = ["layout", "noise", "privacy", "density", "light", "furniture"];

export function RoomMixer({ elements }: { elements: Expansion[] }) {
  const [focus, setFocus] = useState<Layer>("layout");
  const [noise, setNoise] = useState<Noise>("quiet");
  const [crowd, setCrowd] = useState<Crowd>("cramped");
  const ids = crowd === "cramped" ? CROWDED : SPARSE;
  const talkers = noise === "talk" ? (crowd === "cramped" ? TALK_CROWDED : TALK_SPARSE) : [];
  const preset = noise === "quiet" && crowd === "cramped" ? "qc" : noise === "talk" && crowd === "spacious" ? "su" : "";

  const apply = (p: string) => {
    if (p === "qc") { setNoise("quiet"); setCrowd("cramped"); setFocus("density"); }
    if (p === "su") { setNoise("talk"); setCrowd("spacious"); setFocus("noise"); }
  };

  const crowdText = crowd === "cramped" ? "Twelve people share the room" : "Four people have the room to themselves";
  const noiseText = { quiet: "and nothing carries across it.", steady: "and a steady sound fills it, the same at every desk.", talk: "and talk carries from desk to desk, in words." }[noise];
  const note = preset === "qc"
    ? "The record's first example: quiet, and cramped. The meter says quiet; the room is still crowded."
    : preset === "su"
      ? "The record's second example: spacious, and unbearable. One way it can happen: plenty of room, and talk that carries."
      : "Set the two apart and the room is read differently. The conditions do not move together.";
  const label = `One office plan with twelve desks, three windows along the top wall and a door in the bottom wall. ${crowdText} ${noiseText} Focus: ${elements[LAYERS.indexOf(focus)].title.toLowerCase()}.`;

  return (
    <div className={s.mixer} data-focus={focus} data-noise={noise} data-crowd={crowd}>
      <figure className={s.mixerFigure}>
        <svg className={s.planSvg} viewBox="0 0 640 400" role="img" aria-label={label}>
          <PlanBase />
          <g className={s.mixLayer} data-layer="layout"><AdjacencyLayer /></g>
          <g className={s.mixLayer} data-layer="density"><SpaceLayer ids={ids} /></g>
          <g className={s.mixLayer} data-layer="noise"><SoundLayer mode={noise} talkers={talkers} /></g>
          <g className={s.mixLayer} data-layer="privacy"><SightLayer ids={ids} /></g>
          <g className={s.mixLayer} data-layer="light"><LightLayer /></g>
          <g className={s.mixLayer} data-layer="furniture"><FurnitureLayer /></g>
          <People ids={ids} />
        </svg>
      </figure>

      <div className={s.mixerPanel}>
        <Choices<Layer>
          label="Which condition of the room?"
          value={focus}
          onChange={setFocus}
          options={LAYERS.map((l, i) => ({ value: l, label: elements[i].title }))}
        />
        <div className={s.dials}>
          <p className={s.dialKick}>Set two of them apart</p>
          <Choices<Noise> label="Noise" value={noise} onChange={setNoise} options={[{ value: "quiet", label: "quiet" }, { value: "steady", label: "steady sound" }, { value: "talk", label: "overheard talk" }]} />
          <Choices<Crowd> label="Crowding" value={crowd} onChange={setCrowd} options={[{ value: "spacious", label: "spacious" }, { value: "cramped", label: "cramped" }]} />
          <Choices<string> label="The record's two examples" value={preset} onChange={apply} options={[{ value: "qc", label: "Quiet and cramped" }, { value: "su", label: "Spacious and unbearable" }]} />
        </div>
        <p className={s.mixReading} aria-live="polite">{crowdText}, {noiseText} {note}</p>
      </div>

      <ol className={s.elements} aria-label="The six conditions, in the record's words">
        {elements.map((e, i) => (
          <li key={e.title} data-on={LAYERS[i] === focus || undefined}>
            <h3>{e.title}</h3>
            <p>{e.body}</p>
          </li>
        ))}
      </ol>
      <p className={s.figNote}><Glyph g="▲" /> The plan, its people and every mark on it are a teaching drawing. Noise, sight and light are drawn as direction and reach, never as a measurement; the record names the dimensions but gives no room settings.</p>
    </div>
  );
}

/* ------------------------------------------------------------------------
   A room that stops supporting the task
   --------------------------------------------------------------------- */

const coil = (x0: number, x1: number, y: number, turns: number): string => {
  const pts: Pt[] = [];
  const n = turns * 14;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * turns * Math.PI * 2;
    pts.push([x0 + ((x1 - x0) * i) / n + Math.cos(a) * 9, y + Math.sin(a) * 11]);
  }
  return hand.curve(pts, { seed: 4, wander: 0.3 });
};

export function WorkspaceStress({ steps, caption }: { steps: string[]; caption: string }) {
  const [level, setLevel] = useState(0);
  const shoulder = (cx: number, cy: number, rx: number, ry: number, seed: number) => hand.curve(Array.from({ length: 11 }, (_, i) => { const t = Math.PI + (i / 10) * Math.PI; return [cx + Math.cos(t) * rx, cy - Math.sin(t) * ry] as Pt; }), { seed, wander: 0.4 });
  const label = [
    "One person at one desk in a calm room. The work and the effort it costs are the same length, and performance and wellbeing are undisturbed.",
    "One person at one desk. A window throws glare on the screen, a neighbour's talk carries across, and the neighbours sit close. The work and the effort it costs are still the same length.",
    "One person at one desk, with glare, carried talk and close neighbours. The work keeps its length, but the effort it costs now runs on into a long red coil of extra effort.",
    "One person at one desk, with glare, carried talk and close neighbours. The extra effort beyond the work is labelled workspace stress.",
    "One person at one desk, with glare, carried talk and close neighbours. The extra effort is labelled workspace stress, and performance and wellbeing are drawn with ripples round them: affected.",
  ][level];

  return (
    <div className={s.stress} data-level={level}>
      <figure className={s.stressFigure}>
        <div className={s.stressStage}>
          <svg className={s.stressSvg} viewBox="0 0 640 300" role="img" aria-label={label}>
            {/* the workstation, from above */}
            <path className={s.stressWindow} d={L(40, 30, 140, 30, 11, 5, 0.6) + L(40, 36, 140, 36, 12, 5, 0.6)} filter="url(#folio-pencil)" />
            <path className={s.stressInk} d={L(56, 116, 268, 116, 1, 8, 1) + L(268, 116, 268, 164, 2, 4, 1) + L(268, 164, 56, 164, 3, 8, 1) + L(56, 164, 56, 116, 4, 4, 1)} filter="url(#folio-pencil)" />
            <path className={s.stressInk} d={L(124, 124, 190, 124, 5, 4, 0.6) + L(190, 124, 190, 144, 6, 3, 0.6) + L(190, 144, 124, 144, 7, 4, 0.6) + L(124, 144, 124, 124, 8, 3, 0.6)} filter="url(#folio-pencil)" />
            <path className={s.stressPaper} d={L(72, 124, 108, 124, 9, 3, 0.5) + L(108, 124, 108, 156, 10, 3, 0.5) + L(108, 156, 72, 156, 13, 3, 0.5) + L(72, 156, 72, 124, 14, 3, 0.5) + L(78, 134, 102, 134, 15, 2, 0.3) + L(78, 142, 102, 142, 16, 2, 0.3) + L(78, 150, 94, 150, 17, 2, 0.3)} filter="url(#folio-pencil)" />
            <path className={s.stressFill} d={`${shoulder(160, 228, 40, 24, 20)}Z`} />
            <path className={s.stressInk} d={shoulder(160, 228, 40, 24, 21)} filter="url(#folio-pencil)" />
            <path className={s.stressInk} d={hand.ring(160, 204, 17, 18, { seed: 22 })} filter="url(#folio-pencil)" />

            {/* 1 · what the room does when it does not support the task */}
            <g className={s.stressStep} data-on={level >= 1 || undefined}>
              {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} className={s.stressRay} d={L(50 + i * 16, 42, 128 + i * 9, 112, 30 + i, 4, 0.6)} filter="url(#folio-pencil)" />)}
              {[26, 46, 68].map((r, k) => <path key={r} className={s.stressRing} style={{ opacity: 0.95 - k * 0.24 }} d={hand.ring(292, 208, r, r, { seed: 40 + k, wobble: 0.03 })} filter="url(#folio-pencil)" />)}
              <path className={s.stressFill} d={`${shoulder(292, 246, 32, 20, 50)}Z`} />
              <path className={s.stressInk} d={shoulder(292, 246, 32, 20, 51)} filter="url(#folio-pencil)" />
              <path className={s.stressInk} d={hand.ring(292, 224, 14, 15, { seed: 52 })} filter="url(#folio-pencil)" />
              <path className={s.stressFill} d={`${shoulder(38, 246, 32, 20, 53)}Z`} />
              <path className={s.stressInk} d={shoulder(38, 246, 32, 20, 54)} filter="url(#folio-pencil)" />
            </g>

            {/* the same work, and what it costs */}
            <path className={s.workLine} d={L(360, 90, 500, 90, 60, 6, 0.8)} filter="url(#folio-pencil)" />
            <path className={s.workLine} d={L(360, 170, 500, 170, 61, 6, 0.8)} filter="url(#folio-pencil)" />
            <path className={s.sameEnd} d={L(500, 66, 500, 196, 62, 6, 0.6)} />
            {/* 2 · more effort for the same work */}
            <g className={s.stressStep} data-on={level >= 2 || undefined}>
              <path className={s.stressCoil} d={coil(500, 612, 170, 5)} filter="url(#folio-pencil)" />
            </g>
            {/* 4 · performance and wellbeing */}
            {[400, 540].map((x, i) => (
              <g key={x}>
                <path className={s.outcome} d={hand.ring(x, 254, 18, 18, { seed: 70 + i })} filter="url(#folio-pencil)" />
                <g className={s.stressStep} data-on={level >= 4 || undefined}>
                  {[28, 38].map((r, k) => <path key={r} className={s.ripple} d={hand.ring(x, 254, r, r, { seed: 80 + i * 2 + k, wobble: 0.04 })} filter="url(#folio-pencil)" />)}
                </g>
              </g>
            ))}
          </svg>
          <span className={s.stressLabel} style={{ left: "56%", top: "22%" } as CSSProperties}>the work</span>
          <span className={s.stressLabel} style={{ left: "56%", top: "62%" } as CSSProperties}>the effort it costs</span>
          <span className={s.stressLabel} data-when="step" data-on={level >= 3 || undefined} style={{ left: "77%", top: "44%" } as CSSProperties}>workspace stress</span>
          <span className={s.stressLabel} style={{ left: "77%", top: "22%" } as CSSProperties}>same work</span>
          <span className={s.stressLabel} style={{ left: "62.5%", top: "93%", transform: "translateX(-50%)" } as CSSProperties}>performance</span>
          <span className={s.stressLabel} style={{ left: "84.4%", top: "93%", transform: "translateX(-50%)" } as CSSProperties}>wellbeing</span>
        </div>
      </figure>

      <div className={s.stressPanel}>
        <Choices<string>
          className={s.stressChoices}
          label="Walk the mechanism, one step at a time"
          value={String(level)}
          onChange={(v) => setLevel(Number(v))}
          options={[{ value: "0", label: "A room that supports the task", hint: "the counterfactual" }, ...steps.map((st, i) => ({ value: String(i + 1), label: st, hint: `step ${i + 1}` }))]}
        />
        <p className={s.stressReading} aria-live="polite">
          {[
            "The room supports the task, so the effort it costs matches the work. This is the counterfactual; the record describes only what happens when support fails.",
            "The room stops supporting the task: glare on the screen, talk that carries, neighbours close. The work is exactly as long as it was.",
            "The same work now costs more: the extra is effort spent coping with the room rather than doing the job. What changed is not the work but what it costs.",
            "That additional effort, spent on the room rather than on the job, is what Vischer calls workspace stress.",
            "Performance and wellbeing are affected. The record says affected, and no more: this drawing shows no direction and no amount.",
          ][level]}
        </p>
        <ol className={s.chain} aria-label="The mechanism, in four steps">
          {steps.map((st, i) => (
            <li key={st} data-on={level > i || undefined}>
              <span className={s.chainNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span>{st}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className={s.figNote}><Glyph g="▲" /> {caption}</p>
    </div>
  );
}

/* ------------------------------------------------------------------------
   The trade-off the open plan cannot escape
   --------------------------------------------------------------------- */

const ENCLOSURE = ["enclosed", "mixed", "open"] as const;

export function Tradeoff({ demo, interactions }: { demo: TheoryDemo; interactions: Interaction[] }) {
  const [i, setI] = useState(0);
  const st = demo.states![i];
  const roads = demo.roads!;
  const state = ENCLOSURE[i];
  return (
    <div className={s.trade} data-state={state}>
      <figure className={s.tradeFigure}>
        <svg className={s.planSvg} viewBox="0 0 640 400" role="img" aria-label={`The office plan, ${demo.options[i]}: ${st.t}`}>
          <PlanBase />
          <Partitions state={state} />
          <StrandsAndBubbles ids={CROWDED} comm={st.a} privacy={st.b} />
          <People ids={CROWDED} />
        </svg>
      </figure>

      <div className={s.tradePanel}>
        <Choices<string>
          label={demo.label}
          value={String(i)}
          onChange={(v) => setI(Number(v))}
          options={demo.options.map((o, k) => ({ value: String(k), label: o }))}
        />
        <p className={s.srOnly} aria-live="polite">{st.t}</p>
        <ol className={s.states} aria-label="The three layouts, in the record's words">
          {demo.options.map((o, k) => (
            <li key={o} data-on={k === i || undefined}>
              <b>{o}</b> {demo.states![k].t}
            </li>
          ))}
        </ol>
        <ul className={s.roads} aria-label="What the two lines on the plan stand for">
          <li className={s.roadComm}>
            <svg viewBox="0 0 60 16" aria-hidden="true"><path d={L(3, 8, 57, 8, 3, 4, 0.6)} style={{ strokeWidth: 1.4 + st.a * 4.6, strokeDasharray: st.a < 0.3 ? "2 10" : st.a < 0.7 ? "9 6" : "none" }} /></svg>
            <span><b>{roads[0].label}</b><i>{roads[0].sub}</i></span>
          </li>
          <li className={s.roadPriv}>
            <svg viewBox="0 0 60 16" aria-hidden="true"><path d={hand.ring(30, 8, 22, 6, { seed: 4, wobble: 0.02 })} style={{ strokeWidth: 1.1 + st.b * 3.6, strokeDasharray: st.b > 0.8 ? "none" : st.b > 0.4 ? "10 6" : "3 12" }} /></svg>
            <span><b>{roads[1].label}</b><i>{roads[1].sub}</i></span>
          </li>
        </ul>
        <p className={s.figNote}><Glyph g="▲" /> {demo.caption}</p>
      </div>

      <ol className={s.ledger}>
        {interactions.map((x, k) => (
          <li key={x.title} data-finding={k === 2 || undefined}>
            <p className={s.ledgerKick}>{x.kicker}</p>
            <h3>{x.title}</h3>
            <Rich as="p" html={x.body} />
          </li>
        ))}
      </ol>
    </div>
  );
}

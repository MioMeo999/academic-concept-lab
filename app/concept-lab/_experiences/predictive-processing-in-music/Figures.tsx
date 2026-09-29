"use client";

import { useId, useState } from "react";
import type { PredictiveCard, PredictiveOmissionInteraction, PredictivePrecisionContext } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import * as hand from "../../_folio/hand";
import { EmptySlot, GhostNote, L, SoundNote, Spike, box } from "./Marks";
import { SIGMA, WINDOW, contextAt, envelopePoints, ladderRungs, omissionSlots, standardised, xOfMs, PLOT } from "./geometry";
import s from "./pp.module.css";

/* ---------------------------------------------------------------------------
   Prediction and what arrives.

   Three figures on one idea: a model expects, the sound arrives, and what is
   left between them is information. The record's two constructed examples —
   the same displacement against a narrow and a broad expectation, and an
   expected note that is present or absent — are drawn as they are described;
   the ladder is the record's simplified message-passing motif.
   ------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------
   The ladder: predictions travel down, what is left over travels up
   --------------------------------------------------------------------- */

type Flow = "down" | "up" | "both";

export function Ladder({ levels, directions }: { levels: PredictiveCard[]; directions: PredictiveCard[] }) {
  const [flow, setFlow] = useState<Flow>("both");
  const rungs = ladderRungs(levels);
  const ys = [26, 130, 234];
  const h = 62;
  const xl = 150, xr = 490;
  const arrow = (x: number, y1: number, y2: number, dir: 1 | -1, seed: number, cls: string) => (
    <g className={cls}>
      <path d={hand.curve([[x, y1], [x + (dir === 1 ? -5 : 5), (y1 + y2) / 2], [x, y2]], { seed, wander: 0.4 })} filter="url(#folio-pencil)" />
      <path d={hand.arrowHead(x, y2, dir === 1 ? Math.PI / 2 : -Math.PI / 2, { size: 10, seed: seed + 1 })} filter="url(#folio-pencil)" />
    </g>
  );
  return (
    <div className={s.ladder} data-flow={flow}>
      <figure className={s.ladderFigure}>
        <svg className={s.diagram} viewBox="0 0 640 380" role="img" aria-label="A ladder of three levels — higher and slow, middle, lower and fast — with the sound at the bottom. Predictions travel down the ladder from each level to the next, and what is left over between a prediction and what arrives travels back up. The levels are a teaching hierarchy, not an anatomical map.">
          {rungs.map((lv, i) => (
            <g key={lv.label} className={s.rung}>
              <path className={s.rungFill} d={`M${xl + 20} ${ys[i]} h300 v${h} h-300 z`} />
              <path className={s.rungBox} d={box(xl + 20, ys[i], 300, h, 10 + i * 4)} filter="url(#folio-pencil)" />
              <text className={s.rungLabel} x={xl + 170} y={ys[i] + 38} textAnchor="middle">{lv.label.toLowerCase()}</text>
            </g>
          ))}
          {/* the sound, at the bottom */}
          <path className={s.wave} d={hand.curve(Array.from({ length: 21 }, (_, k) => [xl + 20 + k * 15, 350 + Math.sin(k * 0.9) * 9 * (0.6 + 0.4 * Math.sin(k * 0.3))] as [number, number]), { seed: 40, wander: 0.5 })} filter="url(#folio-pencil)" />
          <text className={s.diagSub} x={xl + 170} y="378" textAnchor="middle">the sound arrives</text>
          {/* predictions down: the left rail */}
          {arrow(xl + 6, ys[0] + h, ys[1], 1, 60, s.railDown)}
          {arrow(xl + 6, ys[1] + h, ys[2], 1, 64, s.railDown)}
          {arrow(xl + 6, ys[2] + h, 338, 1, 68, s.railDown)}
          <text className={s.railLabelDown} x={xl - 8} y={ys[1] + 4} textAnchor="end">prediction</text>
          {/* what is left over, up: the right rail */}
          {arrow(xr - 6, 338, ys[2] + h, -1, 72, s.railUp)}
          {arrow(xr - 6, ys[2], ys[1] + h, -1, 76, s.railUp)}
          {arrow(xr - 6, ys[1], ys[0] + h, -1, 80, s.railUp)}
          <text className={s.railLabelUp} x={xr + 8} y={ys[1] + 4}>error</text>
        </svg>
      </figure>
      <div className={s.ladderPanel}>
        <Choices<Flow> label="Which way does it travel?" value={flow} onChange={setFlow} options={[
          { value: "down", label: "Predictions down", hint: "from the model" },
          { value: "up", label: "Errors up", hint: "what was left over" },
          { value: "both", label: "Both, at once", hint: "a motif, not a wiring diagram" },
        ]} />
        <p className={s.sr} aria-live="polite">{flow === "down" ? "Showing predictions travelling down." : flow === "up" ? "Showing what is left over travelling up." : "Showing both directions at once."}</p>
        <ul className={s.directions} aria-label="What travels which way, in the record's words">
          {directions.map((c, i) => (
            <li key={c.label} data-on={(i === 0 ? flow !== "up" : i === 1 ? flow !== "down" : true) || undefined} style={{ "--hue": c.colour } as React.CSSProperties}>
              <b>{c.label}</b> {c.body}
            </li>
          ))}
        </ul>
        <ul className={s.levelList} aria-label="The three levels, from the higher and slower to the lower and faster, in the record's words">
          {rungs.map((lv) => <li key={lv.label}><b>{lv.label}</b> {lv.body}</li>)}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   The note that never came
   --------------------------------------------------------------------- */

export function Ghost({ data }: { data: PredictiveOmissionInteraction }) {
  const [present, setPresent] = useState(true);
  const slots = omissionSlots(present, data.preceding.length);
  const xs = slots.map((_, i) => 130 + i * 106);
  const yGhost = 92, yHeard = 176, yBase = 262;
  return (
    <div className={s.omission} data-present={present}>
      <figure className={s.omissionFigure}>
        <svg className={s.diagram} viewBox="0 0 640 300" role="img" aria-label={`Four preceding ${data.preceding.join(", ")} events followed by an expected onset. The model expects a ${data.expected} there, drawn as a dashed ghost. ${present ? "The expected target is present, so nothing is left over." : "No sensory event arrives, so what is left over is the mismatch between predicted input and actual silence."}`}>
          <text className={s.tag} x="6" y={yGhost + 4}>expected</text>
          <text className={s.tag} x="6" y={yHeard + 4}>heard</text>
          <text className={s.tag} x="6" y={yBase - 4}>mismatch</text>
          <path className={s.slotBand} d={`M${xs[xs.length - 1] - 44} 34 h88 v${yBase + 16 - 34} h-88 z`} />
          <text className={s.diagSub} x={xs[xs.length - 1]} y="26" textAnchor="middle">expected onset</text>
          <path className={s.baseline} d={L(60, yBase, 612, yBase, 3, 14, 0.5)} />
          {slots.map((slot, i) => {
            const last = i === slots.length - 1;
            return (
              <g key={i}>
                <GhostNote x={xs[i]} y={yGhost} seed={i} />
                <path className={s.predDown} d={hand.curve([[xs[i], yGhost + 20], [xs[i] + 3, (yGhost + yHeard) / 2], [xs[i], yHeard - 22]], { seed: 100 + i, wander: 0.3 })} data-last={last || undefined} filter="url(#folio-pencil)" />
                {slot.heard ? <SoundNote x={xs[i]} y={yHeard} seed={i} /> : <EmptySlot x={xs[i]} y={yHeard} seed={i} />}
                {slot.expected === slot.heard ? <circle className={s.zero} cx={xs[i]} cy={yBase} r="3.4" /> : <Spike x={xs[i]} base={yBase} h={38} seed={i} />}
              </g>
            );
          })}
        </svg>
      </figure>
      <div className={s.omissionPanel}>
        <Choices<string> label="Choose whether the expected target is present" value={present ? "present" : "omitted"} onChange={(v) => setPresent(v === "present")} options={[
          { value: "present", label: "Expected event present", hint: "ghost and sound agree" },
          { value: "omitted", label: "Expected event omitted", hint: "a ghost with no sound" },
        ]} />
        <p className={s.sr} aria-live="polite">{present ? "Showing the expected event present." : "Showing the expected event omitted."}</p>
        <dl className={s.states} aria-label="What is at the expected onset, in each state">
          <div data-on={present || undefined}><dt>Expected event present</dt><dd><b>{data.expected}</b> The expected target is present.</dd></div>
          <div data-on={!present || undefined}><dt>Expected event omitted</dt><dd><b>NO SENSORY EVENT ARRIVED HERE</b> Predicted input ≠ actual silence.</dd></div>
        </dl>
        <ol className={s.beats} aria-label={`Four preceding ${data.preceding.join(", ")} events followed by an expected onset`}>
          {data.preceding.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
          <li className={s.beatArrow} aria-hidden="true">→</li>
          <li className={s.expectedMark}>expected onset</li>
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   The same deviation, a different precision
   --------------------------------------------------------------------- */

const ticks = [-120, -60, 0, 60, 120];

export function Precision({ contexts, constants }: { contexts: [PredictivePrecisionContext, PredictivePrecisionContext]; constants: string[] }) {
  const [a, b] = contexts;
  const [sigma, setSigma] = useState(a.sigmaMs);
  const uid = useId();
  const on = contextAt(contexts, sigma);
  const ctx = on >= 0 ? contexts[on] : null;
  const target = a.targetOffsetMs;
  const d = standardised(target, sigma);
  const hue = ctx ? ctx.colour : "var(--pen-2)";
  const pts = envelopePoints(sigma, 4);
  const curve = `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}`;
  const area = `${curve}L${xOfMs(WINDOW)} ${PLOT.base}L${xOfMs(-WINDOW)} ${PLOT.base}Z`;
  const ref = (c: PredictivePrecisionContext) => `M${envelopePoints(c.sigmaMs, 6).map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}`;
  const tx = xOfMs(target), mx = xOfMs(0);
  return (
    <>
    <div className={s.precision} data-on={on}>
      <figure className={s.precisionFigure}>
        <svg className={s.diagram} viewBox="0 0 640 320" role="img" aria-label={`A constructed Gaussian expectation envelope centred on the expected onset, with a standard deviation of ${sigma} milliseconds. The same target, ${target} milliseconds late, lies ${d.toFixed(2)} standard deviations from the expected mean. The two constructed contexts, ${a.sigmaMs} and ${b.sigmaMs} milliseconds, stay drawn as faint dashed envelopes.`}>
          <path className={s.refA} d={ref(a)} />
          <path className={s.refB} d={ref(b)} />
          <text className={s.tag} x="60" y="68">the two contexts, dashed</text>
          <path className={s.refA} d="M62 88h30" />
          <text className={s.tag} x="100" y="92">σ = {a.sigmaMs} ms</text>
          <path className={s.refB} d="M62 108h30" />
          <text className={s.tag} x="100" y="112">σ = {b.sigmaMs} ms</text>
          <path className={s.envFill} d={area} style={{ "--hue": hue } as React.CSSProperties} />
          <path className={s.envCurve} d={curve} style={{ "--hue": hue } as React.CSSProperties} filter="url(#folio-pencil)" />
          <path className={s.axis} d={L(PLOT.x0 - 10, PLOT.base, PLOT.x1 + 10, PLOT.base, 5, 14, 0.5)} />
          {ticks.map((t) => (
            <g key={t}>
              <path className={s.tickMark} d={`M${xOfMs(t)} ${PLOT.base}v6`} />
              <text className={s.tag} x={xOfMs(t)} y={PLOT.base + 22} textAnchor="middle">{t === 0 ? "0" : t > 0 ? `+${t}` : `−${Math.abs(t)}`}</text>
            </g>
          ))}
          <text className={s.tag} x={PLOT.x1 + 6} y={PLOT.base + 22}>ms</text>
          <path className={s.meanLine} d={`M${mx} ${PLOT.base}V52`} />
          <text className={s.diagSub} x={mx} y="42" textAnchor="middle">expected 0 ms</text>
          <path className={s.targetLine} d={`M${tx} ${PLOT.base}V60`} />
          <text className={s.diagTag} x={tx} y="52" textAnchor="middle">+{target} ms</text>
          <g className={s.reach}>
            <path d={hand.curve([[mx, PLOT.base + 44], [(mx + tx) / 2, PLOT.base + 50], [tx, PLOT.base + 44]], { seed: 12, wander: 0.4 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(tx, PLOT.base + 44, 0, { size: 9, seed: 13 })} filter="url(#folio-pencil)" />
            <text className={s.diagTag} x={(mx + tx) / 2} y={PLOT.base + 68} textAnchor="middle">{d.toFixed(2)}σ</text>
          </g>
        </svg>
      </figure>
      <div className={s.precisionPanel}>
        <Choices<string> label="Choose a rhythmic context to inspect" value={on >= 0 ? String(on) : ""} onChange={(v) => setSigma(contexts[Number(v)].sigmaMs)} options={contexts.map((c, i) => ({ value: String(i), label: c.label, hint: `σ = ${c.sigmaMs} ms` }))} />
        <div className={s.dose}>
          <label htmlFor={uid}>Width of the expectation, σ: <b>{sigma} ms</b></label>
          <input id={uid} className={s.range} type="range" min={SIGMA.min} max={SIGMA.max} step={1} value={sigma} onChange={(e) => setSigma(Number(e.target.value))} aria-valuetext={`${sigma} milliseconds${ctx ? `, ${ctx.label.toLowerCase()}` : ""}`} />
        </div>
        <p className={s.reading} aria-live="polite">The target is {d.toFixed(2)}σ from the shared expected mean. {ctx ? ctx.interpretation : "At this width the same relation holds: the wider the expectation, the fewer σ the same displacement spans."}</p>
      </div>
    </div>
    <div className={s.precisionStatic}>
        <p className={s.smallHead}>Constants held across both contexts</p>
        <ul className={s.constants} aria-label="Constants held across both contexts">{constants.map((c) => <li key={c}>{c}</li>)}</ul>
        <div className={s.contexts}>
          {contexts.map((c, i) => (
            <article key={c.label} className={s.context} data-on={on === i || undefined} style={{ "--hue": c.colour } as React.CSSProperties}>
              <p className={s.contextHead}><b>{c.label}</b></p>
              <p className={s.contextHistory}>{c.history}</p>
              <p className={s.contextStats}><span>σ = {c.sigmaMs} ms</span><span>same target: +{c.targetOffsetMs} ms</span></p>
              <p className={s.contextBody}>The target is {standardised(c.targetOffsetMs, c.sigmaMs).toFixed(2)}σ from the shared expected mean. {c.interpretation}</p>
            </article>
          ))}
        </div>
    </div>
    </>
  );
}

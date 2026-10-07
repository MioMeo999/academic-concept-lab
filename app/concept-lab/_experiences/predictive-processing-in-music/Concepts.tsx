"use client";

import { useState } from "react";
import type { PredictiveCard } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import * as hand from "../../_folio/hand";
import { L, box } from "./Marks";
import s from "./pp.module.css";

/* ---------------------------------------------------------------------------
   The concept figures: what perception can do about a mismatch, and the whole
   framework as one circuit. Both belong to the record's editorial synthesis
   (✦): teaching maps, not diagrams of any cortical wiring.
   ------------------------------------------------------------------------- */

const wave = (x0: number, x1: number, y: number, amp: number, phase: number, seed: number) =>
  hand.curve(Array.from({ length: 17 }, (_, k) => [x0 + (k / 16) * (x1 - x0), y + Math.sin(k * 0.95 + phase) * amp * (0.55 + 0.45 * Math.sin(k * 0.4 + phase))] as [number, number]), { seed, wander: 0.5 });

/* ------------------------------------------------------------------------
   Two things to do about a mismatch: update the model, or change the input
   --------------------------------------------------------------------- */

type Way = "perceive" | "act";

export function Inference({ perceive, act, keep }: { perceive: string; act: string; keep: string }) {
  const [way, setWay] = useState<Way>("perceive");
  return (
    <div className={s.inference} data-way={way}>
      <figure className={s.inferenceFigure}>
        <svg className={s.diagram} viewBox="0 0 640 270" role="img" aria-label={way === "perceive" ? "Perceptual inference: the model predicts the sound, what is left over comes back, and the model is updated to explain what arrived." : "Active inference: the model predicts the sound, and instead of only updating, action or sampling changes the sound so that it comes into line with what was expected."}>
          <g className={s.modelCloud}>
            <path className={s.cloudFill} d={hand.ring(136, 132, 96, 58, { seed: 11, wobble: 0.07 })} />
            <path className={s.cloudInk} d={hand.ring(136, 132, 96, 58, { seed: 11, wobble: 0.07 })} filter="url(#folio-pencil)" />
            <text className={s.diagHead} x="136" y="138" textAnchor="middle">the model</text>
            <g className={s.edit} data-on={way === "perceive" || undefined}>
              <path d={hand.curve([[76, 58], [96, 44], [120, 52], [104, 66], [88, 60]], { seed: 21, wander: 0.4 })} filter="url(#folio-pencil)" />
              <path d={hand.arrowHead(88, 60, 3.5, { size: 8, seed: 23 })} filter="url(#folio-pencil)" />
              <text className={s.diagSub} x="134" y="48">updated</text>
            </g>
          </g>
          <g className={s.sound}>
            <path className={s.waveActual} d={wave(400, 604, 132, way === "act" ? 20 : 30, way === "act" ? 0.4 : 1.8, 31)} filter="url(#folio-pencil)" />
            <path className={s.waveGhost} d={wave(400, 604, 132, 20, 0.4, 32)} />
            <text className={s.diagHead} x="502" y="200" textAnchor="middle">the sound</text>
          </g>
          <g className={s.predArrow}>
            <path d={hand.curve([[236, 108], [316, 92], [392, 108]], { seed: 41, wander: 0.4 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(393, 108, 0.35, { size: 11, seed: 42 })} filter="url(#folio-pencil)" />
            <text className={s.diagTag} x="314" y="80" textAnchor="middle">prediction</text>
          </g>
          <g className={s.errArrow} data-dim={way === "act" || undefined}>
            <path d={hand.curve([[392, 160], [316, 178], [236, 158]], { seed: 43, wander: 0.4 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(235, 158, Math.PI - 0.35, { size: 11, seed: 44 })} filter="url(#folio-pencil)" />
            <text className={s.diagTag} x="314" y="204" textAnchor="middle">what was left over</text>
          </g>
          <g className={s.actGroup} data-on={way === "act" || undefined}>
            <path className={s.stick} d={L(560, 30, 520, 84, 51, 4, 0.5)} filter="url(#folio-pencil)" />
            <circle className={s.stickTip} cx="518" cy="86" r="7" />
            <path d={hand.curve([[210, 76], [330, 26], [500, 34]], { seed: 52, wander: 0.5 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(502, 34, 0.1, { size: 11, seed: 53 })} filter="url(#folio-pencil)" />
            <text className={s.diagTag} x="360" y="22" textAnchor="middle">act · sample</text>
          </g>
        </svg>
      </figure>
      <div className={s.inferencePanel}>
        <Choices<Way> label="Two things to do about a mismatch" value={way} onChange={setWay} options={[
          { value: "perceive", label: "Update the model", hint: "perceptual inference" },
          { value: "act", label: "Change the input", hint: "active inference" },
        ]} />
        <p className={s.reading} aria-live="polite">{way === "perceive" ? perceive : act}</p>
        <p className={s.figNote}>{keep}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   The whole, as one circuit
   --------------------------------------------------------------------- */

// the seven parts, as they are lettered inside the figure (one or two lines)
const LINES: string[][] = [["experience + context"], ["generative model"], ["top-down prediction"], ["actual input"], ["prediction error", "× precision"], ["perceptual update", "attention · action"], ["updated model"]];
const SHORT = ["experience + context", "generative model", "top-down prediction", "actual input", "prediction error × precision", "perceptual update / attention / action", "updated model"];
// where each of the seven nodes sits: x, y, w, h
const NODES: [number, number, number, number][] = [
  [16, 18, 176, 50],   // learned experience + current context
  [250, 18, 176, 50],  // generative model
  [462, 112, 164, 54], // top-down prediction
  [482, 262, 144, 56], // actual input
  [236, 262, 162, 56], // prediction error × precision
  [16, 262, 156, 56],  // perceptual update / attention / action
  [16, 118, 176, 54],  // updated model
];

export function Circuit({ nodes }: { nodes: PredictiveCard[] }) {
  const [at, setAt] = useState(0);
  const mid = (i: number): [number, number] => [NODES[i][0] + NODES[i][2] / 2, NODES[i][1] + NODES[i][3] / 2];
  const arrow = (pts: [number, number][], angle: number, seed: number, key: string) => (
    <g key={key} className={s.circuitArrow}>
      <path d={hand.curve(pts, { seed, wander: 0.4 })} filter="url(#folio-pencil)" />
      <path d={hand.arrowHead(pts[pts.length - 1][0], pts[pts.length - 1][1], angle, { size: 10, seed: seed + 1 })} filter="url(#folio-pencil)" />
    </g>
  );
  return (
    <div className={s.circuit} data-step={at}>
      <figure className={s.circuitFigure}>
        <svg className={s.diagram} viewBox="0 0 640 340" role="img" aria-label="The framework as one circuit: learned experience and current context feed a generative model; the model makes a top-down prediction; the prediction is compared with the actual input; the mismatch, weighted by its estimated precision, drives perceptual update, attention or action; and the updated model makes the next prediction.">
          {nodes.map((n, i) => (
            <g key={n.label} className={s.node} data-on={i === at || undefined} style={{ "--hue": n.colour } as React.CSSProperties}>
              <path className={s.nodeFill} d={`M${NODES[i][0]} ${NODES[i][1]} h${NODES[i][2]} v${NODES[i][3]} h-${NODES[i][2]} z`} />
              <path className={s.nodeBox} d={box(NODES[i][0], NODES[i][1], NODES[i][2], NODES[i][3], 200 + i * 5)} filter="url(#folio-pencil)" />
              <text className={s.nodeText} x={mid(i)[0]} y={mid(i)[1]} textAnchor="middle">
                {LINES[i].length === 1
                  ? <tspan x={mid(i)[0]} dy=".35em">{LINES[i][0]}</tspan>
                  : LINES[i].map((line, k) => <tspan key={line} x={mid(i)[0]} dy={k === 0 ? "-.25em" : "1.2em"}>{line}</tspan>)}
              </text>
              <circle className={s.nodeBadge} cx={NODES[i][0]} cy={NODES[i][1]} r="10" />
              <text className={s.nodeNum} x={NODES[i][0]} y={NODES[i][1] + 4} textAnchor="middle">{i + 1}</text>
            </g>
          ))}
          {arrow([[194, 44], [222, 42], [248, 44]], 0.05, 300, "a")}
          {arrow([[428, 46], [520, 62], [540, 110]], 1.35, 310, "b")}
          {arrow([[546, 168], [550, 214], [548, 260]], Math.PI / 2, 320, "c")}
          {arrow([[480, 292], [442, 294], [400, 291]], Math.PI, 330, "d")}
          {arrow([[234, 292], [204, 294], [174, 291]], Math.PI, 340, "e")}
          {arrow([[96, 260], [94, 216], [96, 176]], -Math.PI / 2, 350, "f")}
          {arrow([[194, 132], [228, 100], [262, 70]], -0.9, 360, "g")}
          <text className={s.diagSub} x="566" y="222">compare</text>
          <text className={s.diagSub} x="440" y="281" textAnchor="middle">mismatch</text>
          <text className={s.diagSub} x="330" y="150" textAnchor="middle">↺ the loop continues</text>
        </svg>
      </figure>
      <div className={s.circuitPanel}>
        <Choices<string> compact label="Follow the circuit" value={String(at)} onChange={(v) => setAt(Number(v))} options={nodes.map((n, i) => ({ value: String(i), label: String(i + 1), hint: SHORT[i] }))} />
        <ol className={s.circuitList} aria-label="The seven parts of the circuit, in the record's words">
          {nodes.map((n, i) => <li key={n.label} data-on={i === at || undefined} style={{ "--hue": n.colour } as React.CSSProperties}><b>{n.label}</b> {n.body}</li>)}
        </ol>
      </div>
    </div>
  );
}

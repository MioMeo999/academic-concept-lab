"use client";

import { useId, useState } from "react";
import type { PredictivePrecisionContext } from "@/content/types";
import { rng, rule, toPath, wander } from "../../_lib/marks";
import { PIGMENT } from "../Pigment";

/* ---------------------------------------------------------------------------
   PREDICTIVE PROCESSING · Envelope and arrival

   The record's quantity is not "how big was the error". It is: the same
   physical deviation is more or less influential depending on how confident
   the model was. Density would be the wrong material for that, because density
   reads as strength. Spread is the right material.

   So both conditions deposit exactly the same number of marks. Under a regular
   history they crowd; under an open history the same ink spreads. The arrival
   is one glyph, instanced, at the same displacement in both. What the reader
   compares is how far outside the crowd it falls.

   The cloud is a constructed Gaussian, which is what the record says it is.
   It is not a brain distribution and predicts no neural response magnitude.
   ------------------------------------------------------------------------ */

const W = 860;
const H = 250;
const BASE = 168;
const T_MIN = -1780;
const T_MAX = 440;
const PX = W / (T_MAX - T_MIN);
const BEATS = [-1600, -1200, -800, -400];
const SAMPLES = 120;

const x = (ms: number) => (ms - T_MIN) * PX;

const STEM = [toPath(wander(0, 0, 0, 62, rng(701), 1.2)), toPath(wander(0.9, 3, 0.2, 59, rng(709), 1))];
const ARRIVAL = [toPath(wander(0, 0, 0, 76, rng(719), 1.3)), toPath(wander(1.1, 3, 0.3, 73, rng(727), 1.1))];

/** Deterministic standard normal, Box–Muller over the project's own RNG. */
function normals(count: number, seed: number) {
  const r = rng(seed);
  const out: number[] = [];
  while (out.length < count) {
    const u = Math.max(1e-9, r());
    const v = r();
    const m = Math.sqrt(-2 * Math.log(u));
    out.push(m * Math.cos(2 * Math.PI * v));
    if (out.length < count) out.push(m * Math.sin(2 * Math.PI * v));
  }
  return out;
}

const SPREAD = normals(SAMPLES, 8081);
const BAND = normals(SAMPLES, 9091);

type Mode = 0 | 1 | 2;

export function Envelope({
  contexts,
  omission,
}: {
  contexts: [PredictivePrecisionContext, PredictivePrecisionContext];
  omission: { lede: string; preceding: string[]; expected: string; note: string };
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [mode, setMode] = useState<Mode>(0);

  const isOmission = mode === 2;
  const ctx = contexts[isOmission ? 0 : mode];
  const sigma = ctx.sigmaMs;
  const offset = ctx.targetOffsetMs;

  return (
    <figure className="at-figure">
      <div className="at-controls" role="group" aria-label="Listening context">
        <button type="button" aria-pressed={mode === 0} onClick={() => setMode(0)}>
          {contexts[0].label}
        </button>
        <button type="button" aria-pressed={mode === 1} onClick={() => setMode(1)}>
          {contexts[1].label}
        </button>
        <button type="button" aria-pressed={mode === 2} onClick={() => setMode(2)}>
          Event omitted
        </button>
      </div>

      <p className="at-sr" id={`${uid}t`}>
        {isOmission
          ? "The expected onset with no event arriving. "
          : `${ctx.label}: a ${sigma} millisecond envelope with the target ${offset} milliseconds late. `}
        Four preceding beats lead to an expected onset drawn as a construction line. The prediction envelope is a
        constructed Gaussian with a standard deviation of {sigma} milliseconds, deposited as {SAMPLES} marks.
        {isOmission
          ? " No event arrives; the predicted position is left unfilled."
          : ` The target arrives ${offset} milliseconds after the expected onset and is drawn as a single firm mark.`}
      </p>
      <div className="at-scroller" style={{ marginTop: "1.5rem" }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${uid}t`} style={{ minWidth: "37rem" }}>

        <defs>
          <g id={`${uid}beat`}>
            {STEM.map((d, i) => (
              <path key={i} d={d} fill="none" stroke={PIGMENT.graphite} strokeWidth={i ? 1 : 1.8} strokeLinecap="round" opacity={i ? 0.42 : 0.88} />
            ))}
          </g>
          <g id={`${uid}arr`}>
            {ARRIVAL.map((d, i) => (
              <path key={i} d={d} fill="none" stroke={PIGMENT.rose} strokeWidth={i ? 1.2 : 2.4} strokeLinecap="round" opacity={i ? 0.55 : 1} />
            ))}
          </g>
        </defs>

        {/* Baseline. */}
        <path d={rule(6, BASE, W - 6, 811, 0.7)} fill="none" stroke={PIGMENT.graphite} strokeWidth={1} opacity={0.4} />

        {/* Four preceding beats: the history that makes an onset predictable. */}
        {BEATS.map((b, i) => (
          <g key={b}>
            <use href={`#${uid}beat`} x={x(b)} y={BASE - 62} />
            <text x={x(b)} y={BASE + 22} textAnchor="middle" fontFamily="var(--at-sans)" fontSize={9.5} letterSpacing="0.09em" fill={PIGMENT.graphite} opacity={0.55}>
              {omission.preceding[i] ?? "beat"}
            </text>
          </g>
        ))}

        {/* The expected onset: construction, kept. It is scaffolding the page
            has decided not to erase, because the record's whole point is that
            the model specifies a position whether or not anything lands on it. */}
        <g className="at-layer">
          <path
            d={`M${x(0)} 24 L${x(0)} ${BASE + 6}`}
            stroke={PIGMENT.ultramarine}
            strokeWidth={1}
            strokeDasharray="3.5 4.5"
            opacity={0.8}
          />
          <text x={x(0) - 6} y={20} textAnchor="end" fontFamily="var(--at-sans)" fontSize={10} letterSpacing="0.1em" fill={PIGMENT.ultramarine}>
            EXPECTED ONSET
          </text>
        </g>

        {/* The envelope. Same ink in both conditions; only its spread changes. */}
        <g className="at-layer at-swap" key={sigma}>
          {SPREAD.map((z, i) => {
            const ms = z * sigma;
            if (ms < T_MIN || ms > T_MAX) return null;
            const px = x(ms);
            const yc = BASE - 34 - BAND[i] * 13;
            const len = 7 + Math.abs(BAND[i]) * 3;
            return (
              <path
                key={i}
                d={`M${px.toFixed(1)} ${(yc - len / 2).toFixed(1)} L${(px + (BAND[i] * 0.6)).toFixed(1)} ${(yc + len / 2).toFixed(1)}`}
                stroke={PIGMENT.ultramarine}
                strokeWidth={0.95}
                strokeLinecap="round"
                opacity={0.5}
              />
            );
          })}
        </g>

        {/* The arrival, or its absence. */}
        {isOmission ? (
          <g className="at-layer">
            <path
              d={`M${x(0) - 13} ${BASE - 78} L${x(0) - 13} ${BASE - 4} M${x(0) + 13} ${BASE - 78} L${x(0) + 13} ${BASE - 4}`}
              stroke={PIGMENT.rose}
              strokeWidth={1.3}
              strokeLinecap="round"
              opacity={0.9}
            />
            <text x={x(0) + 22} y={BASE - 46} fontFamily="var(--at-hand)" fontSize={20} fill={PIGMENT.rose}>
              nothing arrives here
            </text>
          </g>
        ) : (
          <>
            <use href={`#${uid}arr`} x={x(offset)} y={BASE - 76} />
            <text x={x(offset) + 8} y={BASE - 84} fontFamily="var(--at-sans)" fontSize={10} letterSpacing="0.1em" fill={PIGMENT.rose}>
              TARGET · {offset} MS LATE
            </text>
          </>
        )}

        {/* The interval between prediction and input, marked as a span rather
            than asserted as a magnitude of anything. */}
        {!isOmission && (
          <g className="at-layer">
            <path d={`M${x(0)} ${BASE + 34} L${x(offset)} ${BASE + 34}`} stroke={PIGMENT.graphite} strokeWidth={1.1} opacity={0.75} />
            <path d={`M${x(0)} ${BASE + 30} L${x(0)} ${BASE + 38} M${x(offset)} ${BASE + 30} L${x(offset)} ${BASE + 38}`} stroke={PIGMENT.graphite} strokeWidth={1.1} opacity={0.75} />
            <text x={(x(0) + x(offset)) / 2} y={BASE + 52} textAnchor="middle" fontFamily="var(--at-sans)" fontSize={9.5} letterSpacing="0.1em" fill={PIGMENT.graphite} opacity={0.75}>
              SAME DISPLACEMENT IN BOTH CONTEXTS
            </text>
          </g>
        )}
        </svg>
      </div>

      <figcaption>
        {isOmission ? (
          <>
            <b>The omission.</b> {omission.lede} The predicted position is still drawn, because the model still specifies it.
            What is missing is the firm mark, not the expectation.
          </>
        ) : (
          <>
            <b>{ctx.label}.</b> {ctx.history} {ctx.interpretation} Both conditions deposit exactly {SAMPLES} marks: the ink is
            held constant and only its <b>spread</b> changes, so nothing here can be read as one context being darker,
            stronger, or more certain of an answer.
          </>
        )}
      </figcaption>

      <dl className="at-conditions">
        <dt>Changed</dt>
        <dd>
          <b>{isOmission ? "Whether a sensory event arrives at the expected onset." : `The width of the constructed prediction envelope (σ = ${sigma} ms).`}</b>
        </dd>
        <dt>Held constant</dt>
        <dd>
          {isOmission
            ? "The four preceding beats and the expected position."
            : `The target, its pitch, duration, timbre and gain, and the +${offset} ms displacement.`}
        </dd>
        <dt>Cannot establish</dt>
        <dd>
          A neural response magnitude, a distribution in the brain, a measurement of the reader&rsquo;s confidence, or a
          reproduction of any published omission study. {isOmission ? omission.note.replace(/^▲\s*/, "") : ""}
        </dd>
      </dl>
    </figure>
  );
}

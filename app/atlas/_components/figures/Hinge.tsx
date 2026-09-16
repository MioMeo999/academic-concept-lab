"use client";

import { useId, useState } from "react";
import type { HuronResponseWindow } from "@/content/types";
import { hatch, partialBox, passes, rng, rule, toPath, wander } from "../../_lib/marks";
import { PIGMENT, type Pigment } from "../Pigment";

/* ---------------------------------------------------------------------------
   ITPRA · The outcome hinge

   The failure mode this record invites is a five-stage pipeline: five boxes,
   five arrows, five modules, one after another. The record says the opposite.
   Prediction and Reaction begin *together* at the outcome; Appraisal is slower
   and can recur; the ordering is functional and approximate, not an algorithm
   and not a neural trace.

   So the figure is built around one firm vertical: the hinge. Every lane is
   registered to it. Prediction and Reaction share a left edge exactly on it,
   in the same pigment at opposite hatch angles — same moment, different
   question. Appraisal runs past the right edge without closing, and overdraws
   part of the Prediction lane on a second pass: a later reading revising an
   earlier one without erasing it.
   ------------------------------------------------------------------------ */

const W = 860;
const H = 330;
const PAD_L = 96;
const PAD_R = 34;
const LANE_H = 40;
const LANE_GAP = 12;
const TOP = 34;

const t = (v: number) => PAD_L + (v / 100) * (W - PAD_L - PAD_R);

const LANE_PIGMENT: Record<string, Pigment> = {
  imagination: "viridian",
  tension: "ochre",
  prediction: "vermilion",
  reaction: "vermilion",
  appraisal: "violet",
};

const LANE_ANGLE: Record<string, number> = {
  imagination: -28,
  tension: -28,
  prediction: -34,
  reaction: 34,
  appraisal: -20,
};

const HINGE = toPath(wander(0, 0, 1.2, 244, rng(1201), 1.6));

export function Hinge({ windows, hingeLabel }: { windows: HuronResponseWindow[]; hingeLabel: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [selected, setSelected] = useState<string | null>(null);

  const hinge = t(70);
  const active = windows.find((w) => w.key === selected) ?? null;

  return (
    <figure className="at-figure">
      <div className="at-controls" role="group" aria-label="Response window">
        <button type="button" aria-pressed={selected === null} onClick={() => setSelected(null)}>
          All five
        </button>
        {windows.map((w) => (
          <button key={w.key} type="button" aria-pressed={selected === w.key} onClick={() => setSelected(w.key)}>
            {w.label.charAt(0) + w.label.slice(1).toLowerCase().split(" ")[0]}
          </button>
        ))}
      </div>

      <p className="at-sr" id={`${uid}t`}>
        Five response windows registered to the outcome onset. A vertical hinge marks the outcome onset. Imagination
        extends furthest before it; Tension approaches it; Prediction and Reaction both begin exactly at it and run in
        parallel; Appraisal begins there too and continues past the right-hand edge of the plate without closing. The
        horizontal axis is functional order, not measured time.
      </p>
      <div className="at-scroller" style={{ marginTop: "1.5rem" }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${uid}t`} style={{ minWidth: "40rem" }}>

        {windows.map((w, i) => {
          const y = TOP + i * (LANE_H + LANE_GAP);
          const x0 = t(w.start);
          const x1 = t(w.end);
          const width = Math.max(14, x1 - x0);
          const dim = selected !== null && selected !== w.key;
          const pigment = LANE_PIGMENT[w.key] ?? "graphite";
          const open = w.key === "appraisal";
          const field = hatch({
            w: width + 10,
            h: LANE_H + 6,
            gap: w.key === "tension" ? 3.4 : 4,
            seed: 1300 + i * 53,
            jitter: 1.4,
            broken: w.key === "appraisal" ? 0.35 : 0.15,
            pressure: [0.19, 0.58],
            weight: 0.85,
            // Tension crowds towards the hinge because it is approaching it in
            // time. The ramp is about proximity to the outcome, not about how
            // much of anything there is.
            ramp: w.key === "tension" ? "in" : "none",
            max: 200,
          });
          const clip = `${uid}l${i}`;

          return (
            <g key={w.key} opacity={dim ? 0.2 : 1} className="at-swap">
              <g>
                <clipPath id={clip}>
                  <rect x={x0} y={y} width={width + (open ? 20 : 0)} height={LANE_H} rx={2} />
                </clipPath>
                <g className="at-layer" clipPath={`url(#${clip})`} stroke={PIGMENT[pigment]} fill="none" strokeLinecap="round">
                  <g transform={`translate(${x0 + width / 2} ${y + LANE_H / 2}) rotate(${LANE_ANGLE[w.key] ?? -28})`}>
                    {field.strokes.map((s, si) => (
                      <path key={si} d={s.d} strokeWidth={s.w} opacity={s.p} />
                    ))}
                  </g>
                </g>
              </g>

              {/* The lane's own boundary. Appraisal declines to close on the
                  right, because the record says it can recur later and is not
                  finished by the end of the event. */}
              <g className="at-layer">
                <path
                  d={partialBox(x0, y, width, LANE_H, open ? "right" : "none", 16, 1400 + i * 7)}
                  fill="none"
                  stroke={PIGMENT[pigment]}
                  strokeWidth={1.05}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.8}
                />
              </g>

              <text
                x={PAD_L - 12}
                y={y + LANE_H / 2 + 2}
                textAnchor="end"
                fontFamily="var(--at-sans)"
                fontSize={10.5}
                fontWeight={700}
                letterSpacing="0.09em"
                fill={PIGMENT.graphite}
              >
                {w.label}
              </text>
              <text
                x={PAD_L - 12}
                y={y + LANE_H / 2 + 15}
                textAnchor="end"
                fontFamily="var(--at-sans)"
                fontSize={9}
                letterSpacing="0.06em"
                fill={PIGMENT.graphite}
                opacity={0.55}
              >
                {w.epoch}
              </text>
            </g>
          );
        })}

        {/* Appraisal's second pass: a later reading laid over an earlier one.
            It is offset and translucent, and the earlier marks stay legible
            underneath — revision, not deletion. */}
        {(selected === null || selected === "appraisal") && (
          <g className="at-layer" opacity={0.75}>
            {passes(2, 1777, 1.4).map((p, i) => (
              <path
                key={i}
                d={toPath(wander(t(84), TOP + 2 * (LANE_H + LANE_GAP) + LANE_H * 0.5, t(72), TOP + 4 * (LANE_H + LANE_GAP) + 6, rng(1801 + i), 2.4))}
                transform={`translate(${p.dx} ${p.dy})`}
                fill="none"
                stroke={PIGMENT.violet}
                strokeWidth={i ? 0.9 : 1.4}
                strokeLinecap="round"
                opacity={p.o * 0.85}
              />
            ))}
            <text x={t(86)} y={TOP + 2 * (LANE_H + LANE_GAP) + LANE_H * 0.5 - 8} fontFamily="var(--at-hand)" fontSize={19} fill={PIGMENT.violet}>
              a later reading can revise this one
            </text>
          </g>
        )}

        {/* The hinge. Every lane is registered to it; it belongs to none of
            them, so it is graphite. */}
        <g className="at-layer">
          {passes(2, 1901, 0.9).map((p, i) => (
            <path
              key={i}
              d={HINGE}
              transform={`translate(${hinge + p.dx} ${TOP - 22 + p.dy})`}
              fill="none"
              stroke={PIGMENT.graphite}
              strokeWidth={i ? 1.1 : 2}
              strokeLinecap="round"
              opacity={i ? 0.5 : 0.95}
            />
          ))}
          <text x={hinge + 7} y={TOP - 28} fontFamily="var(--at-sans)" fontSize={10.5} fontWeight={700} letterSpacing="0.12em" fill={PIGMENT.graphite}>
            {hingeLabel}
          </text>
        </g>

        {/* The axis is functional order. Saying so on the plate is cheaper than
            letting a reader take it for milliseconds. */}
        <path d={rule(PAD_L, H - 22, W - PAD_R, 1999, 0.7)} fill="none" stroke={PIGMENT.graphite} strokeWidth={0.9} opacity={0.35} />
        <text x={PAD_L} y={H - 6} fontFamily="var(--at-sans)" fontSize={9.5} letterSpacing="0.1em" fill={PIGMENT.graphite} opacity={0.6}>
          FUNCTIONAL ORDER — NOT MEASURED TIME
        </text>
        <text x={W - PAD_R} y={H - 6} textAnchor="end" fontFamily="var(--at-sans)" fontSize={9.5} letterSpacing="0.1em" fill={PIGMENT.graphite} opacity={0.6}>
          LATER, AND RECURRING →
        </text>
        </svg>
      </div>

      <figcaption>
        {active ? (
          <>
            <b>{active.label}.</b> {active.body} <b>Asks:</b> {active.question} <b>Function:</b> {active.function}{" "}
            <b>Boundary:</b> {active.boundary}.
          </>
        ) : (
          <>
            <b>The hinge is the only fixed point.</b> Prediction and Reaction share a left edge exactly on it — they are two
            questions about one instant, not two steps — and they are drawn in the same pigment at opposite hatch angles for
            that reason. Appraisal begins there too and is left open on the right because the record says it can recur.
            Nothing here is a five-stage algorithm, and the five lanes are not five independently verified systems.
          </>
        )}
      </figcaption>
    </figure>
  );
}

"use client";

import { useId, useState } from "react";
import type { AudioPreset } from "@/content/types";
import { blob, hatch, partialBox, passes, rng, rule, toPath, wander } from "../../_lib/marks";
import { PIGMENT } from "../Pigment";

/* ---------------------------------------------------------------------------
   GESTALT · Competing organisations

   The record's problem is that the same events can support more than one
   organisation, that cues can reinforce or compete, and that an unresolved
   reading is a legitimate outcome rather than a failed example. So the figure
   is built the other way round from a normal diagram: the *events* are the
   thing held fixed, and what changes is the organisation drawn over them.

   The event glyph is defined once and instanced with <use>, so the marks in
   every condition are mechanically the same mark. Only the arrangement and the
   drawn organisations change.

   Where two organisations claim the same span, their pigment overlaps and
   accumulates. That darker band is not strength of evidence and not
   probability — it is the span in which two readings are simultaneously in
   play, and the caption says so.
   ------------------------------------------------------------------------ */

const W = 760;
const H = 250;
const PAD_X = 40;
const BASE_Y = 176;

function xFor(start: number, span: number) {
  return PAD_X + (start / span) * (W - PAD_X * 2);
}

function yFor(pitch: number) {
  // MIDI 58–81 across the plot. Fixed, so a register step is visible as a step.
  const t = (pitch - 58) / 23;
  return BASE_Y - t * 96;
}

/** The event mark: one firm pass and one lighter return over it. Generated
 *  once at module scope so every instance on the page is byte-identical. */
const EVENT_STEM = [
  toPath(wander(0, 0, 0, 42, rng(91), 1.15)),
  toPath(wander(0.9, 2.5, 0.3, 39.5, rng(137), 1.05)),
];

/** A vertical boundary proposal, drawn rather than ruled. */
const BOUNDARY_LINE = toPath(wander(0, 0, 0.5, 144, rng(311), 1.5));

type Organisation = {
  id: string;
  pigment: "ultramarine" | "viridian";
  label: string;
  splitAfter: number;
};

export function Organisations({ presets }: { presets: AudioPreset[] }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [condition, setCondition] = useState(0);
  const [assert, setAssert] = useState<"both" | "time" | "register">("both");

  const preset = presets[condition];
  const isConflict = (preset.markers?.length ?? 0) > 1;
  const span = Math.max(...preset.events.map((e) => e.start + e.duration)) || 1;

  // The organisations a condition puts on the table, read from the record's
  // own markers rather than invented here.
  const organisations: Organisation[] = (preset.markers ?? []).map((m) => ({
    id: m.label,
    pigment: m.label === "Y" ? "viridian" : "ultramarine",
    label: m.label === "Y" ? "register proposes a boundary here" : "time proposes a boundary here",
    splitAfter: m.after,
  }));

  const shown = organisations.filter((o) => {
    if (!isConflict || assert === "both") return true;
    return assert === "time" ? o.id !== "Y" : o.id !== "X";
  });

  const eventXs = preset.events.map((e) => xFor(e.start, span));

  return (
    <figure className="at-figure">
      <div className="at-controls" role="group" aria-label="Grouping condition">
        {presets.map((p, i) => (
          <button key={p.label} type="button" aria-pressed={i === condition} onClick={() => setCondition(i)}>
            {p.label}
          </button>
        ))}
      </div>

      {isConflict && (
        <>
          <span className="at-controls__legend">Separate the two organisations in the conflict condition</span>
          <div className="at-controls" role="group" aria-label="Which organisation to assert" style={{ marginTop: "0.5rem" }}>
            <button type="button" aria-pressed={assert === "both"} onClick={() => setAssert("both")}>
              Both, as drawn
            </button>
            <button type="button" aria-pressed={assert === "time"} onClick={() => setAssert("time")}>
              Temporal grouping only
            </button>
            <button type="button" aria-pressed={assert === "register"} onClick={() => setAssert("register")}>
              Register grouping only
            </button>
          </div>
        </>
      )}

      {/* The figure's text equivalent lives in the document, not in an SVG
          <title>: it is read by anything, it survives the drawing being
          removed, and it does not depend on SVG accessibility support. */}
      <p className="at-sr" id={`${uid}t`}>
        {preset.label}: {preset.events.length} events with the drawn organisations for this condition. {preset.body}{" "}
        {shown.length > 1
          ? "Two organisations are drawn over the same events, and they overlap across the events both claim."
          : "One organisation is drawn over the events."}
      </p>
      <div className="at-scroller" style={{ marginTop: "1.6rem" }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${uid}t`} style={{ minWidth: "34rem" }}>

        <defs>
          {/* One event glyph, instanced everywhere. Re-used, never re-authored:
              the record's claim is that the events themselves did not change,
              so they had better be the same geometry. */}
          <g id={`${uid}ev`}>
            {EVENT_STEM.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={PIGMENT.graphite}
                strokeWidth={i ? 1.05 : 1.85}
                strokeLinecap="round"
                opacity={i ? 0.45 : 0.92}
              />
            ))}
          </g>
        </defs>

        {/* The drawn organisations sit behind the events, because they are a
            reading of them rather than an annotation on top. */}
        {shown.map((org) => {
          const groups: [number, number][] = [
            [0, org.splitAfter - 1],
            [org.splitAfter, preset.events.length - 1],
          ];
          return (
            <g key={org.id}>
              {groups.map(([a, b], gi) => {
                if (b < a) return null;
                const x1 = eventXs[a] - 20;
                const x2 = eventXs[b] + 20;
                const cx = (x1 + x2) / 2;
                const w = x2 - x1;
                const ys = preset.events.slice(a, b + 1).map((e) => yFor(e.pitch));
                const cy = (Math.min(...ys) + Math.max(...ys)) / 2 - 4;
                const h = Math.max(74, Math.max(...ys) - Math.min(...ys) + 76);
                const seed = 200 + org.splitAfter * 17 + gi * 5;
                const field = hatch({
                  w: w + 20,
                  h: h + 16,
                  gap: 3.8,
                  seed,
                  jitter: 1.5,
                  broken: 0.18,
                  pressure: [0.2, 0.56],
                  weight: 0.85,
                  max: 260,
                });
                const clip = `${uid}c${org.id}${gi}`;
                return (
                  <g key={gi}>
                    {/* The clip sits outside the blended group: nested inside
                        one it resolves inconsistently and the field silently
                        paints nothing. */}
                    <clipPath id={clip}>
                      <path d={blob(w / 2 + 6, h / 2 + 4, seed + 61, 0.11)} transform={`translate(${cx} ${cy})`} />
                    </clipPath>
                    <g className="at-layer" clipPath={`url(#${clip})`} stroke={PIGMENT[org.pigment]} fill="none" strokeLinecap="round">
                      <g transform={`translate(${cx} ${cy}) rotate(${org.id === "Y" ? 34 : -30})`}>
                        {field.strokes.map((s, i) => (
                          <path key={i} d={s.d} strokeWidth={s.w} opacity={s.p} />
                        ))}
                      </g>
                    </g>
                  </g>
                );
              })}

              {/* The proposed boundary itself: a firm double-passed rule that
                  stops short of the baseline, because it is a claim about the
                  events and not a cut through the page. */}
              <g className="at-layer">
                {passes(2, org.splitAfter * 31 + 3, 1).map((p, i) => {
                  const bx = (eventXs[org.splitAfter - 1] + eventXs[org.splitAfter]) / 2;
                  return (
                    <path
                      key={i}
                      d={BOUNDARY_LINE}
                      transform={`translate(${bx + p.dx} ${52 + p.dy})`}
                      fill="none"
                      stroke={PIGMENT[org.pigment]}
                      strokeWidth={i ? 1 : 1.7}
                      strokeDasharray="8 5.5"
                      strokeLinecap="round"
                      opacity={p.o * 0.95}
                    />
                  );
                })}
                <text
                  x={(eventXs[org.splitAfter - 1] + eventXs[org.splitAfter]) / 2 + 8}
                  y={org.id === "Y" ? 226 : 44}
                  fill={PIGMENT[org.pigment]}
                  fontFamily="var(--at-hand)"
                  fontSize={18}
                >
                  {org.label}
                </text>
              </g>
            </g>
          );
        })}

        {/* Where two organisations both claim a span, the record says the
            reading is open. The span is bounded, and the boundary declines to
            close on its right — the shape of a claim not fully asserted. */}
        {isConflict && assert === "both" && (
          <g className="at-layer">
            <path
              d={partialBox(
                (eventXs[3] + eventXs[4]) / 2 - 6,
                34,
                (eventXs[5] + eventXs[4]) / 2 - (eventXs[3] + eventXs[4]) / 2 + 30,
                26,
                "right",
                9,
                777,
              )}
              fill="none"
              stroke={PIGMENT.graphite}
              strokeWidth={1.1}
              strokeLinecap="round"
              opacity={0.75}
            />
          </g>
        )}

        {/* Baseline, then the events. */}
        <path d={rule(PAD_X - 14, BASE_Y + 26, W - PAD_X + 14, 47, 0.7)} fill="none" stroke={PIGMENT.graphite} strokeWidth={1} opacity={0.45} />
        {preset.events.map((e, i) => (
          <g key={i}>
            <use href={`#${uid}ev`} x={eventXs[i]} y={yFor(e.pitch) - 21} />
            <text
              x={eventXs[i]}
              y={BASE_Y + 44}
              textAnchor="middle"
              fill={PIGMENT.graphite}
              fontFamily="var(--at-sans)"
              fontSize={9.5}
              letterSpacing="0.09em"
              opacity={0.62}
            >
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        ))}
        </svg>
      </div>

      <figcaption>
        <b>{preset.label}.</b> {preset.body}{" "}
        {isConflict && assert === "both" ? (
          <>
            Both organisations are drawn. Where their fields cross, two readings are in play across the same events. The
            darker band is <b>how much is in play, not how strong anything is</b>, and the bracket above it is left open
            because the record does not award the conflict to either cue.
          </>
        ) : isConflict ? (
          <>Only one organisation is asserted. The other is not reduced or refuted — it has been set aside for inspection.</>
        ) : (
          <>The eight event marks are one glyph, instanced. Nothing about them changes between conditions; the arrangement does.</>
        )}
      </figcaption>

      <dl className="at-conditions">
        <dt>Changed</dt>
        <dd>
          <b>{preset.variable}</b>
        </dd>
        <dt>Held constant</dt>
        <dd>{preset.controls}</dd>
        <dt>Cannot establish</dt>
        <dd>
          A universal boundary, a perceptual score, a judgement of the reader&rsquo;s musical ability, or a replication of any
          published experiment. This is a constructed teaching example.
        </dd>
      </dl>
    </figure>
  );
}

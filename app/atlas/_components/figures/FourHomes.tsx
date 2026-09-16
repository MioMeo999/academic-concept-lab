"use client";

import { useId, useState } from "react";
import type { TonalContext, TonalProbe } from "@/content/types";
import { blob, hatch, rng, rule, toPath, wander } from "../../_lib/marks";
import { PIGMENT, type Pigment } from "../Pigment";

/* ---------------------------------------------------------------------------
   TONAL HIERARCHY · One note, four homes

   The record's claim is relational: the same physical pitch takes a different
   contextual role depending on what preceded it. A figure that draws the note
   differently in each context would assert the opposite of that.

   So the probe is one glyph, instanced four times, sitting on one registration
   line that runs the full width of the plate. Nothing about it moves. What
   changes is the pigment mass beside it — and that mass is not invented: it is
   drawn from the actual MIDI events the record stores for each context.

   There are no rating values here, and no rings, orbits, spiral or torus. The
   record's profile is a set of ordinal role categories, not a measured curve,
   and drawing it as a curve would manufacture data the record does not have.
   ------------------------------------------------------------------------ */

const W = 940;
const H = 360;
const TOP = 46;
const BASE = 250;
const LO = 56;
const HI = 78;

function yFor(pitch: number) {
  return BASE - ((pitch - LO) / (HI - LO)) * (BASE - TOP);
}

/** The probe mark. One geometry, generated once, instanced everywhere. */
const PROBE = [toPath(wander(0, 0, 0, 34, rng(401), 1.05)), toPath(wander(0.8, 2, 0.2, 32, rng(409), 0.95))];
const EVENT = toPath(wander(0, 0, 13, 0, rng(419), 0.7));

const FIELD_PIGMENTS: Pigment[] = ["violet", "ochre", "violet", "ochre"];

export function FourHomes({
  probe,
  contexts,
  probeLabel,
}: {
  probe: TonalProbe;
  contexts: TonalContext[];
  probeLabel: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [held, setHeld] = useState(true);
  const [focus, setFocus] = useState<number | null>(null);

  const colW = W / contexts.length;
  const probeY = yFor(probe.midi);

  return (
    <figure className="at-figure">
      <div className="at-controls" role="group" aria-label="Registration">
        <button type="button" aria-pressed={held} onClick={() => setHeld((v) => !v)}>
          {held ? "Hide the registration" : "Show what was held"}
        </button>
        {contexts.map((c, i) => (
          <button key={c.id} type="button" aria-pressed={focus === i} onClick={() => setFocus(focus === i ? null : i)}>
            {c.label.split("·")[0].trim()}
          </button>
        ))}
      </div>

      <p className="at-sr" id={`${uid}t`}>
        The same probe pitch under {contexts.length} different tonal contexts. Each panel draws one context from the
        record&rsquo;s stored events as a pigment mass, followed by the same probe mark at the same height. The probe is
        identical in every panel; only the preceding context differs.
        {contexts.map((c) => ` ${c.label}: ${c.role ?? "role stated in the text below"}.`).join("")}
      </p>
      <div className="at-scroller">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${uid}t`} style={{ minWidth: "42rem" }}>

          <defs>
            <g id={`${uid}probe`}>
              {PROBE.map((d, i) => (
                <path key={i} d={d} fill="none" stroke={PIGMENT.graphite} strokeWidth={i ? 1.1 : 2.1} strokeLinecap="round" opacity={i ? 0.5 : 1} />
              ))}
            </g>
          </defs>

          {/* The registration line. It exists to make one claim checkable by
              eye: the probe did not move. */}
          {held && (
            <g className="at-layer">
              <path
                d={rule(8, probeY, W - 8, 433, 0.6)}
                fill="none"
                stroke={PIGMENT.graphite}
                strokeWidth={0.9}
                strokeDasharray="3.5 5"
                opacity={0.5}
              />
              <text x={10} y={probeY - 9} fill={PIGMENT.graphite} fontFamily="var(--at-sans)" fontSize={10.5} letterSpacing="0.12em" opacity={0.7}>
                {probeLabel}
              </text>
            </g>
          )}

          {contexts.map((ctx, ci) => {
            const x0 = ci * colW;
            const dim = focus !== null && focus !== ci;
            const span = Math.max(...ctx.events.map((e) => e.start + e.duration)) || 1;
            const evX = (start: number) => x0 + 26 + (start / span) * (colW * 0.52);
            const pitches = ctx.events.map((e) => e.pitch);
            const yTop = yFor(Math.max(...pitches));
            const yBot = yFor(Math.min(...pitches));
            const cx = x0 + 26 + colW * 0.26;
            const cy = (yTop + yBot) / 2;
            const fw = colW * 0.62;
            const fh = Math.max(58, yBot - yTop + 54);
            const seed = 500 + ci * 37;
            const pigment = FIELD_PIGMENTS[ci % FIELD_PIGMENTS.length];
            const field = hatch({
              w: fw + 14,
              h: fh + 12,
              gap: 3.7,
              seed,
              jitter: 1.4,
              broken: 0.2,
              pressure: [0.19, 0.56],
              weight: 0.85,
              max: 240,
            });
            const clip = `${uid}k${ci}`;
            const probeX = x0 + colW - 46;

            return (
              <g key={ctx.id} opacity={dim ? 0.24 : 1} className="at-swap">
                {/* Panel division: a hairline, not a box. */}
                {ci > 0 && <path d={`M${x0} ${TOP - 26} L${x0} ${BASE + 34}`} stroke={PIGMENT.graphite} strokeWidth={0.6} opacity={0.22} />}

                {/* The context, as a pigment mass over its own events. */}
                <g>
                  <clipPath id={clip}>
                    <path d={blob(fw / 2 + 7, fh / 2 + 6, seed + 71, 0.13)} transform={`translate(${cx} ${cy})`} />
                  </clipPath>
                  <g className="at-layer" clipPath={`url(#${clip})`} stroke={PIGMENT[pigment]} fill="none" strokeLinecap="round">
                    <g transform={`translate(${cx} ${cy}) rotate(${ci % 2 ? 28 : -32})`}>
                      {field.strokes.map((s, i) => (
                        <path key={i} d={s.d} strokeWidth={s.w} opacity={s.p} />
                      ))}
                    </g>
                  </g>
                </g>

                {/* The context's actual events, as graphite deposits. */}
                {ctx.events.map((e, i) => (
                  <path
                    key={i}
                    d={EVENT}
                    transform={`translate(${evX(e.start)} ${yFor(e.pitch)})`}
                    fill="none"
                    stroke={PIGMENT.graphite}
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    opacity={0.82}
                  />
                ))}

                {/* The probe. Same glyph, same height, every panel. */}
                <use href={`#${uid}probe`} x={probeX} y={probeY - 17} />
                {held && (
                  <path
                    d={`M${probeX - 15} ${probeY} L${probeX - 3} ${probeY}`}
                    stroke={PIGMENT.graphite}
                    strokeWidth={0.9}
                    opacity={0.55}
                  />
                )}

                <text x={x0 + 14} y={BASE + 60} fill={PIGMENT.graphite} fontFamily="var(--at-sans)" fontSize={11} fontWeight={700} letterSpacing="0.1em">
                  {ctx.label.toUpperCase()}
                </text>
                <text x={x0 + 14} y={BASE + 80} fill={PIGMENT[pigment]} fontFamily="var(--at-hand)" fontSize={19}>
                  {ctx.role ?? "role given in the text"}
                </text>
                <text x={probeX - 4} y={BASE + 24} fill={PIGMENT.graphite} fontFamily="var(--at-sans)" fontSize={9.5} letterSpacing="0.09em" opacity={0.6}>
                  probe
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption>
        <b>One probe, four contexts.</b> The probe mark is a single glyph instanced four times on one registration line: it
        is the same pitch, the same register, the same duration and the same loudness in every panel. The pigment beside it
        is drawn from each context&rsquo;s own stored events. What differs between the panels is therefore the surround, and
        the role named under each panel is a <b>relation to that surround</b> — not a property the note carries with it, and
        not a measure of how much anyone liked it.
      </figcaption>

      <dl className="at-conditions">
        <dt>Changed</dt>
        <dd>
          <b>The preceding tonal context only.</b>
        </dd>
        <dt>Held constant</dt>
        <dd>{probe.body}</dd>
        <dt>Cannot establish</dt>
        <dd>
          That all listeners produce the same judgement, that fit is liking, or that these panels are a published profile.
          The role labels are the record&rsquo;s own descriptions of tonal function; no rating values are shown because the
          record does not hold any.
        </dd>
      </dl>
    </figure>
  );
}

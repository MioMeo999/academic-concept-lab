"use client";

/**
 * The outcome hinge.
 *
 * The problem this has to solve: the record's structure is temporal, but a
 * ruled timeline with five boxes would assert an I → T → P → R → A algorithm
 * and five isolated modules, both of which the freeze forbids. The temporal
 * ordering is "functional and approximate", not a measurement.
 *
 * The solution attempted here:
 *
 *   - The only hard structural mark on the plate is the hinge itself. Outcome
 *     onset is the one thing the record is firm about, so it is the one firm
 *     line.
 *   - Horizontal position is approximate distance from the hinge. There is no
 *     axis, no tick, no unit and no scale, and the plate says so.
 *   - Nothing is boxed or laned. The response extents overlap, have no equal
 *     widths, and two of them have no edge at all: Imagination is open at the
 *     left because it reaches furthest back, Appraisal is open at the right
 *     because it can recur.
 *   - Prediction and Reaction leave one shared origin dot on the hinge with
 *     identical initial geometry before diverging. Same start, same weight,
 *     no order.
 *   - The expectation sources run the full width, across the hinge, beneath
 *     the responses — a parallel layer, not four earlier stages.
 *   - Choosing a lens does not switch the others off. They stay as retained
 *     trace, because the record says these are three questions about one
 *     event, and because a later appraisal revises without erasing.
 */

import { useState } from "react";
import { MultiPass, PigmentField } from "../../_components/Marks";
import { rng } from "../../_lib/marks";

const W = 720;
const H = 452;
const HINGE = 300;
const DELAY = 96;

type Lens = "none" | "prediction" | "reaction" | "appraisal";

/**
 * The four sources as drawn channels rather than ruled rules. Two of them are
 * built to cross near the hinge: a listener can veridically expect exactly the
 * event that is schematically unexpected, and that conflict is the point of
 * the layer. Nothing here ranks them, because the record does not.
 */
const SOURCES = (() => {
  const r = rng(404);
  const spec = [
    { name: "schematic", colour: "var(--vr-cobalt)", y0: 382, y1: 416, dash: "30 7", weight: 2.5 },
    { name: "veridical", colour: "var(--vr-vermilion)", y0: 416, y1: 382, dash: "17 6 5 8", weight: 2.5 },
    { name: "dynamic", colour: "var(--vr-ochre-mark)", y0: 432, y1: 438, dash: "24 6 6 7", weight: 2.1 },
    { name: "conscious", colour: "var(--vr-violet)", y0: 400, y1: 398, dash: "13 9", weight: 1.9 },
  ];
  return spec.map((sp) => {
    const pts: string[] = [];
    for (let i = 0; i <= 12; i += 1) {
      const t = i / 12;
      const x = 4 + (W - 8) * t;
      const y = sp.y0 + (sp.y1 - sp.y0) * t + (r() - 0.5) * 3.4;
      pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return { ...sp, d: pts.join(" "), labelY: sp.y0 + 3 };
  });
})();

const LENS_TEXT: Record<Exclude<Lens, "none">, { q: string; body: string }> = {
  prediction: {
    q: "How accurate was the forecast?",
    body:
      "The Prediction response evaluates predictive accuracy after onset. The prediction itself was formed before onset; this is the assessment of it, and it is not the same thing.",
  },
  reaction: {
    q: "What should be done now?",
    body:
      "The Reaction response is rapid and conservative — a fast response to possible danger or opportunity. It begins with Prediction, not after it.",
  },
  appraisal: {
    q: "What does this event mean?",
    body:
      "Appraisal is slower, context-sensitive and revisable. It can confirm, revise or reverse an earlier response, and it can recur — without erasing the prior prediction or reaction.",
  },
};

export function Hinge() {
  const [delayed, setDelayed] = useState(false);
  const [lens, setLens] = useState<Lens>("none");

  const hinge = delayed ? HINGE + DELAY : HINGE;
  const dim = (k: Exclude<Lens, "none">) => (lens === "none" || lens === k ? 1 : 0.26);

  return (
    <div>
      <div className="vr-figure__plate">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={
            "One outcome event drawn as a single firm vertical line, the hinge. To its left, two overlapping regions of drawn material: imagination, which has no left-hand edge because it reaches furthest back, and tension, which thickens as it approaches the hinge. At the hinge, one shared origin from which prediction and reaction both depart, at the same weight, one above and one below, with no order between them. Extending to the right and beyond the edge of the plate, appraisal: a long interrupted band that thickens again at intervals and is never closed. Running the full width underneath, across the hinge rather than before it, four concurrent expectation sources — schematic, veridical, dynamic and conscious — two of which are drawn in opposing directions where a listener can veridically expect what is schematically unexpected."
          }
        >
          {/* --- pre-outcome: two overlapping extents, no boxes ------------ */}
          <PigmentField
            id="imag"
            x={-10}
            y={64}
            w={hinge - 26}
            h={74}
            colour="var(--vr-violet)"
            angles={[17, 6]}
            gap={5.2}
            seed={31}
            broken={0.45}
            soft={0.62}
            pressure={[0.07, 0.24]}
          />
          <PigmentField
            id="tens"
            x={hinge - 196}
            y={112}
            w={190}
            h={78}
            colour="var(--vr-ochre-mark)"
            angles={[-9, 2]}
            gap={4}
            seed={57}
            broken={0.3}
            soft={0.34}
            pressure={[0.1, 0.42]}
          />
          {/* Tension gathers towards the hinge: a second pass, ramped. */}
          <PigmentField
            id="tens2"
            x={hinge - 96}
            y={116}
            w={90}
            h={70}
            colour="var(--vr-ochre-mark)"
            angles={[-8]}
            gap={3.4}
            seed={59}
            broken={0.22}
            soft={0.3}
            pressure={[0.14, 0.5]}
          />

          <g fontFamily="var(--vr-sans)" fontSize={12.5} fill="var(--vr-ink-soft)">
            <text x={16} y={56}>
              Imagination
            </text>
            <text x={16} y={72} fontSize={11} fill="var(--vr-ink-faint)">
              possible futures · no defined start
            </text>
            <text x={hinge - 190} y={206}>
              Tension
            </text>
            <text x={hinge - 190} y={221} fontSize={11} fill="var(--vr-ink-faint)">
              preparation as the outcome approaches
            </text>
          </g>

          {/* --- the hinge: the one firm mark on the plate ----------------- */}
          {delayed ? (
            <g opacity={0.32}>
              <path d={`M ${HINGE} 40 L ${HINGE} 260`} stroke="var(--vr-graphite)" strokeWidth={1.4} strokeDasharray="3 5" fill="none" />
              <text x={HINGE - 6} y={34} textAnchor="end" fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
                where the outcome was due
              </text>
            </g>
          ) : null}
          <MultiPass d={`M ${hinge} 34 L ${hinge} 268`} colour="var(--vr-graphite)" width={2.6} count={3} seed={13} spread={0.9} />
          <text x={hinge + 8} y={30} fontFamily="var(--vr-sans)" fontSize={12.5} fill="var(--vr-ink)">
            outcome onset
          </text>

          {/* --- post-outcome: one shared origin, two departures ----------- */}
          <g opacity={dim("prediction")}>
            <MultiPass
              d={`M ${hinge} 152 C ${hinge + 26} 152 ${hinge + 34} 120 ${hinge + 62} 112 C ${hinge + 110} 98 ${hinge + 150} 100 ${hinge + 186} 104`}
              colour="var(--vr-cobalt)"
              width={2.5}
              count={2}
              seed={29}
              spread={1.1}
            />
            <text x={hinge + 74} y={92} fontFamily="var(--vr-sans)" fontSize={12.5} fill="var(--vr-cobalt)">
              Prediction
            </text>
          </g>
          <g opacity={dim("reaction")}>
            <MultiPass
              d={`M ${hinge} 152 C ${hinge + 26} 152 ${hinge + 34} 184 ${hinge + 62} 192 C ${hinge + 104} 204 ${hinge + 132} 200 ${hinge + 156} 194`}
              colour="var(--vr-vermilion)"
              width={2.5}
              count={2}
              seed={37}
              spread={1.1}
            />
            <text x={hinge + 72} y={216} fontFamily="var(--vr-sans)" fontSize={12.5} fill="var(--vr-vermilion)">
              Reaction
            </text>
          </g>
          {/* The shared origin. Both leave from here, together. */}
          <circle cx={hinge} cy={152} r={4.6} fill="var(--vr-graphite)" />
          <path
            d={`M ${hinge - 6} 156 C ${hinge - 40} 176 ${hinge - 60} 214 ${hinge - 96} 236`}
            stroke="var(--vr-ink-faint)"
            strokeWidth={0.9}
            fill="none"
          />
          <text x={hinge - 100} y={250} textAnchor="end" fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-soft)">
            Prediction and Reaction leave this point together
          </text>
          <text x={hinge - 100} y={264} textAnchor="end" fontFamily="var(--vr-sans)" fontSize={10.5} fill="var(--vr-ink-faint)">
            same origin · same weight · no order between them
          </text>

          {/* --- appraisal: later, recurring, never closed ----------------- */}
          <g opacity={dim("appraisal")}>
            <PigmentField
              id="appr"
              x={hinge + 96}
              y={236}
              w={W - hinge - 60}
              h={54}
              colour="var(--vr-emerald)"
              angles={[11, 1]}
              gap={4.6}
              seed={91}
              broken={0.5}
              soft={0.5}
              pressure={[0.09, 0.34]}
            />
            <path
              d={`M ${hinge + 84} 262 C ${hinge + 150} 250 ${hinge + 180} 274 ${hinge + 244} 258 C ${hinge + 300} 244 ${hinge + 330} 268 ${W + 10} 256`}
              stroke="var(--vr-emerald)"
              strokeWidth={2.2}
              strokeDasharray="26 11 9 13"
              fill="none"
              strokeLinecap="round"
            />
            <text x={hinge + 96} y={300} fontFamily="var(--vr-sans)" fontSize={12.5} fill="var(--vr-emerald)">
              Appraisal
            </text>
            <text x={hinge + 96} y={315} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
              slower · revisable · can recur · no end drawn
            </text>
          </g>

          {/* --- the source layer: concurrent, and it crosses the hinge ---- */}
          <g>
            <text x={8} y={366} fontFamily="var(--vr-sans)" fontSize={11.5} fill="var(--vr-ink-soft)">
              expectation sources — concurrent, crossing the hinge, and not four earlier stages
            </text>
            {SOURCES.map((src) => (
              <g key={src.name}>
                <path
                  d={src.d}
                  stroke={src.colour}
                  strokeWidth={src.weight}
                  strokeDasharray={src.dash}
                  strokeOpacity={0.82}
                  strokeLinecap="round"
                  fill="none"
                />
                <rect x={4} y={src.labelY - 10} width={72} height={15} fill="var(--vr-ground)" />
                <text x={6} y={src.labelY} fontFamily="var(--vr-sans)" fontSize={11} fill={src.colour}>
                  {src.name}
                </text>
              </g>
            ))}
            <path d={`M ${HINGE + 6} 402 L ${HINGE + 46} 428`} stroke="var(--vr-ink-faint)" strokeWidth={0.9} fill="none" />
            <text x={HINGE + 50} y={432} fontFamily="var(--vr-sans)" fontSize={10.5} fill="var(--vr-ink-soft)">
              here the same event is veridically expected and schematically unexpected
            </text>
          </g>

          <text x={8} y={342} fontFamily="var(--vr-sans)" fontSize={10.5} fill="var(--vr-ink-faint)">
            Horizontal position is approximate functional order. There is no time axis, no unit, and no duration is claimed.
          </text>
        </svg>
      </div>

      <div className="vr-conditions" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", marginTop: "1.4rem" }}>
        <fieldset className="vr-controls">
          <legend className="vr-label vr-controls__legend">Outcome timing</legend>
          <div className="vr-switch" role="radiogroup" aria-label="Outcome timing">
            <button type="button" role="radio" aria-checked={!delayed} onClick={() => setDelayed(false)}>
              On time
            </button>
            <button type="button" role="radio" aria-checked={delayed} onClick={() => setDelayed(true)}>
              Delayed
            </button>
          </div>
          <p className="vr-condition__read" style={{ marginTop: "0.55rem" }}>
            {delayed
              ? "The hinge has moved later. Tension extends, because preparation continues while the outcome has not yet arrived. The position where the outcome was due stays on the plate as a trace — it is where the expectation was, not a mistake."
              : "The outcome arrives where it was due. Changing this control changes only the timing: the outcome itself, the preceding context, its pitch, harmony, timbre, gain and tone duration are held."}
          </p>
        </fieldset>

        <fieldset className="vr-controls">
          <legend className="vr-label vr-controls__legend">One event, three questions</legend>
          <div className="vr-switch" role="radiogroup" aria-label="Which question to ask of the same outcome">
            {(
              [
                ["none", "All three"],
                ["prediction", "Prediction"],
                ["reaction", "Reaction"],
                ["appraisal", "Appraisal"],
              ] as const
            ).map(([k, label]) => (
              <button key={k} type="button" role="radio" aria-checked={lens === k} onClick={() => setLens(k)}>
                {label}
              </button>
            ))}
          </div>
          <p className="vr-condition__read" style={{ marginTop: "0.55rem" }}>
            {lens === "none" ? (
              <>
                Three different questions about one outcome. They are not three stages, and asking one does not close the
                others.
              </>
            ) : (
              <>
                <b>{LENS_TEXT[lens].q}</b> {LENS_TEXT[lens].body}{" "}
                <span style={{ color: "var(--vr-ink-faint)" }}>
                  The other two responses are still drawn, at reduced pressure. They have not stopped; you have stopped
                  asking about them.
                </span>
              </>
            )}
          </p>
        </fieldset>
      </div>
    </div>
  );
}

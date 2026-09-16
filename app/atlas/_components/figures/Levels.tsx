import type { PredictiveCard } from "@/content/types";
import { blob, hatch, partialBox, passes, rng, toPath, wander } from "../../_lib/marks";
import { PIGMENT } from "../Pigment";

/* ---------------------------------------------------------------------------
   PREDICTIVE PROCESSING · Levels, and the two directions

   The record allows explanatory levels and a direction of information. It
   forbids assigning those levels anatomical destinations and forbids a fixed
   style → phrase → note wiring map.

   So this figure gives the levels no boxes, no arrows between named regions,
   and no fixed count of connections. It gives them three pigment fields whose
   texture differs — fast marks, middle marks, slow marks — and two runs across
   them: one drawn as retained construction, one drawn firmly. The fields are
   left open on both sides, because the record does not close the hierarchy.
   ------------------------------------------------------------------------ */

const W = 760;
const BAND_H = 66;
const GAP = 26;
const PAD_L = 150;

export function Levels({ cards, downLabel, upLabel }: { cards: PredictiveCard[]; downLabel: string; upLabel: string }) {
  const H = cards.length * (BAND_H + GAP) + 30;

  return (
    <figure className="at-figure">
      <p className="at-sr" id="lv-t">
        {cards.map((c) => `${c.label}: ${c.body}`).join(" ")} Two runs cross the levels: {downLabel}, drawn as retained
        construction, and {upLabel}, drawn firmly. The bands are open at both ends because the record does not close the
        hierarchy or assign the levels to anatomical destinations.
      </p>
      <div className="at-scroller">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="lv-t" style={{ minWidth: "32rem" }}>
          {cards.map((c, i) => {
            const y = 18 + i * (BAND_H + GAP);
            const fw = W - PAD_L - 20;
            const cx = PAD_L + fw / 2;
            const cy = y + BAND_H / 2;
            // Faster levels are drawn with shorter, more broken marks; slower
            // levels with longer, more continuous ones. Texture is the record's
            // own timescale language, not a quantity.
            const fast = i === 0;
            const f = hatch({
              w: fw + 14,
              h: BAND_H,
              gap: 3.6 + i * 1.2,
              seed: 9100 + i * 61,
              jitter: 1.5,
              broken: fast ? 0.55 : i === 1 ? 0.28 : 0.08,
              pressure: [0.16, 0.5],
              weight: 0.85,
              max: 260,
            });
            return (
              <g key={c.label}>
                <g>
                  <clipPath id={`lvc${i}`}>
                    <path d={blob(fw / 2, BAND_H / 2, 9200 + i, 0.09)} transform={`translate(${cx} ${cy})`} />
                  </clipPath>
                  <g className="at-layer" clipPath={`url(#lvc${i})`} stroke={PIGMENT.ultramarine} fill="none" strokeLinecap="round">
                    <g transform={`translate(${cx} ${cy}) rotate(${i % 2 ? 24 : -24})`}>
                      {f.strokes.map((s, k) => (
                        <path key={k} d={s.d} strokeWidth={s.w} opacity={s.p} />
                      ))}
                    </g>
                  </g>
                  <path
                    d={partialBox(PAD_L, y, fw, BAND_H, "right", 30, 9300 + i)}
                    fill="none"
                    stroke={PIGMENT.ultramarine}
                    strokeWidth={0.95}
                    strokeLinecap="round"
                    opacity={0.6}
                  />
                </g>
                <text x={0} y={cy - 4} fontFamily="var(--at-sans)" fontSize={10.5} fontWeight={700} letterSpacing="0.1em" fill={PIGMENT.graphite}>
                  {c.label}
                </text>
                <text x={0} y={cy + 12} fontFamily="var(--at-sans)" fontSize={9} letterSpacing="0.04em" fill={PIGMENT.graphite} opacity={0.55}>
                  explanatory level
                </text>
              </g>
            );
          })}

          {/* Prediction: retained construction, running down the levels. */}
          <g className="at-layer">
            <path
              d={toPath(wander(PAD_L + 90, 12, PAD_L + 130, H - 22, rng(9401), 2.6))}
              fill="none"
              stroke={PIGMENT.ultramarine}
              strokeWidth={1.1}
              strokeDasharray="3.5 5"
              strokeLinecap="round"
              opacity={0.85}
            />
            <text x={PAD_L + 138} y={H - 24} fontFamily="var(--at-hand)" fontSize={19} fill={PIGMENT.ultramarine}>
              {downLabel}
            </text>
          </g>

          {/* Mismatch: a firm run the other way. */}
          <g className="at-layer">
            {passes(2, 9501, 1.2).map((p, i) => (
              <path
                key={i}
                d={toPath(wander(W - 150, H - 22, W - 196, 12, rng(9511 + i), 2.4))}
                transform={`translate(${p.dx} ${p.dy})`}
                fill="none"
                stroke={PIGMENT.rose}
                strokeWidth={i ? 1 : 1.9}
                strokeLinecap="round"
                opacity={p.o}
              />
            ))}
            <text x={W - 188} y={8} textAnchor="end" fontFamily="var(--at-hand)" fontSize={19} fill={PIGMENT.rose}>
              {upLabel}
            </text>
          </g>
        </svg>
      </div>

      <figcaption>
        <b>Levels with no destinations.</b> The three fields are the record&rsquo;s explanatory levels, told apart by how the
        marks behave — short and broken where the record says fast and local, long and continuous where it says slower and
        higher. Every band is left <b>open on the right</b>, and the two runs cross them without connecting named things,
        because the record allows a direction of information and explicitly refuses a fixed anatomical or
        style-to-note wiring map.
      </figcaption>
    </figure>
  );
}

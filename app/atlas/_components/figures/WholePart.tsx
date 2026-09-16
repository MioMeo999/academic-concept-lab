import type { GestaltWholeCase } from "@/content/types";
import { blob, hatch, rng, rule, toPath, wander } from "../../_lib/marks";
import { PIGMENT, type Pigment } from "../Pigment";

/* ---------------------------------------------------------------------------
   GESTALT · The same event, in two organisations

   The record's whole–part lesson is easy to draw badly. Drawing the central
   event twice, differently, would say that the event changed. It did not.

   So the central mark is generated once, at module scope, and both rows
   instance it. The only thing that differs between the rows is where the
   pigment stops — and the pigment is placed from the gap the record's own
   notation puts in each case, not from an arrangement invented here.
   ------------------------------------------------------------------------ */

const W = 720;
const ROW_H = 134;
const PAD = 56;
const STEP = (W - PAD * 2) / 5;

const NOTE = [toPath(wander(0, 0, 0, 38, rng(6101), 1.1)), toPath(wander(0.8, 2, 0.3, 36, rng(6113), 1))];
const CENTRAL = [
  toPath(wander(0, 0, 0, 50, rng(6131), 1.2)),
  toPath(wander(1, 2.5, 0.2, 47, rng(6143), 1.1)),
  toPath(wander(-0.9, 4, 0.6, 45, rng(6151), 1)),
];

/** Read the gap out of the record's own notation rather than inventing one. */
function parseCase(c: GestaltWholeCase) {
  const tokens = `${c.before} ${c.central} ${c.after}`.split(/\s+/).filter((t) => t && t !== "·");
  const notes: string[] = [];
  let gapAfter = tokens.length;
  for (const t of tokens) {
    if (t === "—" || t === "-" || t === "–") gapAfter = notes.length;
    else notes.push(t);
  }
  return { notes, gapAfter, centralIndex: notes.indexOf(c.central) };
}

const ROW_PIGMENT: Pigment[] = ["ultramarine", "viridian"];

export function WholePart({ cases }: { cases: GestaltWholeCase[] }) {
  const H = cases.length * ROW_H + 26;

  return (
    <figure className="at-figure">
      <p className="at-sr" id="wp-t">
        The same central event under two organisations.{" "}
        {cases.map((c) => `${c.label}: ${c.before} ${c.central} ${c.after} — ${c.role}.`).join(" ")} The central mark is the
        same geometry in both rows; only the position of the larger gap, and therefore the extent of the drawn grouping,
        differs.
      </p>
      <div className="at-scroller">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="wp-t" style={{ minWidth: "34rem" }}>

          <defs>
            <g id="wp-note">
              {NOTE.map((d, i) => (
                <path key={i} d={d} fill="none" stroke={PIGMENT.graphite} strokeWidth={i ? 0.95 : 1.6} strokeLinecap="round" opacity={i ? 0.4 : 0.8} />
              ))}
            </g>
            <g id="wp-central">
              {CENTRAL.map((d, i) => (
                <path key={i} d={d} fill="none" stroke={PIGMENT.graphite} strokeWidth={i === 0 ? 2.3 : 1.2} strokeLinecap="round" opacity={i === 0 ? 1 : 0.5} />
              ))}
            </g>
          </defs>

          {cases.map((c, ci) => {
            const { notes, gapAfter, centralIndex } = parseCase(c);
            const y = 30 + ci * ROW_H;
            const xs = notes.map((_, i) => PAD + i * STEP);
            const pigment = ROW_PIGMENT[ci % ROW_PIGMENT.length];
            const groups: [number, number][] = [
              [0, gapAfter - 1],
              [gapAfter, notes.length - 1],
            ];

            return (
              <g key={c.label}>
                {groups.map(([a, b], gi) => {
                  if (b < a) return null;
                  // Only the group that contains the central event is given
                  // pigment. The other is left in graphite, so the figure is
                  // about one event's membership, not about two blocks.
                  const holdsCentral = centralIndex >= a && centralIndex <= b;
                  if (!holdsCentral) return null;
                  const x1 = xs[a] - 24;
                  const x2 = xs[b] + 24;
                  const cx = (x1 + x2) / 2;
                  const wd = x2 - x1;
                  const seed = 6200 + ci * 41 + gi;
                  const f = hatch({ w: wd + 14, h: 78, gap: 3.8, seed, jitter: 1.4, broken: 0.18, pressure: [0.2, 0.56], weight: 0.85, max: 240 });
                  return (
                    <g key={gi}>
                      <clipPath id={`wpc${ci}${gi}`}>
                        <path d={blob(wd / 2 + 5, 40, seed + 61, 0.12)} transform={`translate(${cx} ${y + 26})`} />
                      </clipPath>
                      <g className="at-layer" clipPath={`url(#wpc${ci}${gi})`} stroke={PIGMENT[pigment]} fill="none" strokeLinecap="round">
                        <g transform={`translate(${cx} ${y + 26}) rotate(${ci ? 30 : -30})`}>
                          {f.strokes.map((s, i) => (
                            <path key={i} d={s.d} strokeWidth={s.w} opacity={s.p} />
                          ))}
                        </g>
                      </g>
                    </g>
                  );
                })}

                {/* Where the record puts the larger gap. */}
                <g className="at-layer">
                  <path
                    d={`M${(xs[gapAfter - 1] + xs[gapAfter]) / 2} ${y - 4} L${(xs[gapAfter - 1] + xs[gapAfter]) / 2 + 1} ${y + 62}`}
                    stroke={PIGMENT[pigment]}
                    strokeWidth={1.4}
                    strokeDasharray="7 5"
                    strokeLinecap="round"
                    opacity={0.9}
                  />
                </g>

                <path d={rule(PAD - 30, y + 62, W - PAD + 30, 6300 + ci, 0.6)} fill="none" stroke={PIGMENT.graphite} strokeWidth={0.9} opacity={0.35} />

                {notes.map((n, i) => (
                  <g key={i}>
                    {i === centralIndex ? (
                      <use href="#wp-central" x={xs[i]} y={y + 8} />
                    ) : (
                      <use href="#wp-note" x={xs[i]} y={y + 14} />
                    )}
                    <text
                      x={xs[i]}
                      y={y + 78}
                      textAnchor="middle"
                      fontFamily="var(--at-sans)"
                      fontSize={i === centralIndex ? 11.5 : 10}
                      fontWeight={i === centralIndex ? 700 : 400}
                      letterSpacing="0.06em"
                      fill={PIGMENT.graphite}
                      opacity={i === centralIndex ? 1 : 0.55}
                    >
                      {n}
                    </text>
                  </g>
                ))}

                <text x={4} y={y - 4} fontFamily="var(--at-sans)" fontSize={10} fontWeight={700} letterSpacing="0.12em" fill={PIGMENT.graphite} opacity={0.65}>
                  {c.label}
                </text>
                <text x={W - 4} y={y + 100} textAnchor="end" fontFamily="var(--at-hand)" fontSize={19} fill={PIGMENT[pigment]}>
                  {c.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption>
        <b>The central mark is the same mark.</b> It is one glyph, instanced in both rows: same geometry, same pressure, same
        height. What moves is the larger gap, and therefore what the drawn organisation includes. The event has not changed;
        its <b>membership</b> has — which is the whole–part relation the record actually claims, and not a claim that wholes
        are anything more mysterious than that.
      </figcaption>
    </figure>
  );
}

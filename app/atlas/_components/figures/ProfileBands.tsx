import type { TonalProfileItem } from "@/content/types";
import { blob, hatch, rng, rule, toPath, wander } from "../../_lib/marks";
import { PIGMENT, type Pigment } from "../Pigment";

/* ---------------------------------------------------------------------------
   TONAL HIERARCHY · The profile, as the record actually holds it

   The obvious drawing here is the famous profile curve, and it would be a
   fabrication. This record stores four ordered *role categories*, not rating
   values, so a curve — or a bar chart, or any plot with a vertical scale —
   would invent numbers the record does not have and invite the reader to read
   distances off them.

   So the levels are drawn as four ordered registers. They are ranked, and the
   drawing says so by stacking them. They are not spaced, and the drawing says
   that too, by giving every register the same height and putting no axis
   anywhere near it.
   ------------------------------------------------------------------------ */

const LEVELS: { key: TonalProfileItem["level"]; label: string; pigment: Pigment; gap: number }[] = [
  { key: "anchor", label: "Tonic anchor", pigment: "violet", gap: 3.4 },
  { key: "triad", label: "Other tonic-triad tones", pigment: "violet", gap: 4.4 },
  { key: "diatonic", label: "Other diatonic tones", pigment: "ochre", gap: 5.6 },
  { key: "nondiatonic", label: "Nondiatonic tones", pigment: "ochre", gap: 7.4 },
];

const W = 760;
const ROW = 62;
const LABEL_W = 178;

const TOKEN = [toPath(wander(0, 0, 0, 24, rng(7101), 0.9)), toPath(wander(0.7, 1.6, 0.2, 22, rng(7113), 0.8))];

export function ProfileBands({ items }: { items: TonalProfileItem[] }) {
  const rows = LEVELS.map((l) => ({ ...l, items: items.filter((i) => i.level === l.key) })).filter((l) => l.items.length);
  const H = rows.length * ROW + 34;

  return (
    <figure className="at-figure">
      <p className="at-sr" id="pb-t">
        The record&rsquo;s pitch-role categories, in rank order.{" "}
        {rows.map((r) => `${r.label}: ${r.items.map((i) => `${i.note}, ${i.role}`).join("; ")}.`).join(" ")} The categories
        are ordered but not spaced; no rating values are shown.
      </p>
      <div className="at-scroller">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="pb-t" style={{ minWidth: "34rem" }}>
          {rows.map((r, ri) => {
            const y = 16 + ri * ROW;
            const fw = W - LABEL_W - 24;
            const cx = LABEL_W + fw / 2;
            const cy = y + ROW / 2 - 8;
            const f = hatch({
              w: fw + 12,
              h: 42,
              gap: r.gap,
              seed: 7200 + ri * 43,
              jitter: 1.4,
              broken: ri > 1 ? 0.3 : 0.14,
              pressure: [0.16, 0.5],
              weight: 0.85,
              max: 220,
            });
            return (
              <g key={r.key}>
                <g>
                  <clipPath id={`pbc${ri}`}>
                    <path d={blob(fw / 2, 22, 7300 + ri, 0.1)} transform={`translate(${cx} ${cy})`} />
                  </clipPath>
                  <g className="at-layer" clipPath={`url(#pbc${ri})`} stroke={PIGMENT[r.pigment]} fill="none" strokeLinecap="round">
                    <g transform={`translate(${cx} ${cy}) rotate(${ri % 2 ? 26 : -26})`}>
                      {f.strokes.map((s, i) => (
                        <path key={i} d={s.d} strokeWidth={s.w} opacity={s.p} />
                      ))}
                    </g>
                  </g>
                </g>

                <text x={0} y={cy - 6} fontFamily="var(--at-sans)" fontSize={10.5} fontWeight={700} letterSpacing="0.1em" fill={PIGMENT.graphite}>
                  {String(ri + 1).padStart(2, "0")} · {r.label.toUpperCase()}
                </text>
                <text x={0} y={cy + 10} fontFamily="var(--at-sans)" fontSize={9.5} letterSpacing="0.05em" fill={PIGMENT.graphite} opacity={0.55}>
                  {r.items.length} of the twelve
                </text>

                {r.items.map((it, i) => {
                  const step = fw / Math.max(1, r.items.length);
                  const x = LABEL_W + step * (i + 0.5);
                  return (
                    <g key={it.note}>
                      {TOKEN.map((d, k) => (
                        <path key={k} d={d} transform={`translate(${x} ${cy - 12})`} fill="none" stroke={PIGMENT.graphite} strokeWidth={k ? 1 : 1.8} strokeLinecap="round" opacity={k ? 0.45 : 0.9} />
                      ))}
                      <text x={x} y={cy + 26} textAnchor="middle" fontFamily="var(--at-sans)" fontSize={10} fontWeight={600} letterSpacing="0.05em" fill={PIGMENT.graphite}>
                        {it.note}
                      </text>
                    </g>
                  );
                })}

                <path d={rule(0, y + ROW - 10, W, 7400 + ri, 0.5)} fill="none" stroke={PIGMENT.graphite} strokeWidth={0.7} opacity={0.22} />
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption>
        <b>Ordered, and deliberately not spaced.</b> The four registers are the record&rsquo;s own role categories, stacked
        in the rank it states. Every register is given the same height and there is no axis, because the record holds
        categories rather than rating values — and a curve drawn through them would be a number this record does not have.
        The pigment thins down the stack as a way of drawing <b>less tonally central</b>, not <b>less liked</b> and not{" "}
        <b>less frequent</b>.
      </figcaption>
    </figure>
  );
}

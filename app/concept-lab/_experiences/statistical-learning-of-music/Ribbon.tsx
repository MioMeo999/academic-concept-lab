import type { StatisticalStream } from "@/content/types";
import * as hand from "../../_folio/hand";
import { chunks, junctions, reading, tallyAt } from "./geometry";
import s from "./stat.module.css";

/* ---------------------------------------------------------------------------
   The stream as a ribbon of tones.

   Thirty-six tones in rows, each a bead at its own pitch, so the ribbon is as
   jagged as the tones are. The thread between two beads can carry the statistic
   itself — thick where the tone that came next was very probable, hair-thin
   where several tones could have come — and bars beneath say the same in
   numbers. Beads not yet heard are drawn dashed and stay in place.

   On a wide screen the rows hold thirteen tones; on a narrow one they hold
   eight, with larger beads, so the letters stay readable rather than shrinking.
   Neither row length is a multiple of three, so a row never ends where a
   hidden unit does.
   ------------------------------------------------------------------------- */

type Geo = { w: number; perRow: number; rowH: number; x0: number; dx: number; r: number; top: number; dyPitch: number; barBase: number; barMax: number; barW: number; letter: number };
const WIDE: Geo = { w: 640, perRow: 13, rowH: 184, x0: 34, dx: 48.5, r: 12.5, top: 58, dyPitch: 4.8, barBase: 170, barMax: 34, barW: 12, letter: 15 };
const NARROW: Geo = { w: 640, perRow: 8, rowH: 216, x0: 62, dx: 73, r: 21, top: 66, dyPitch: 5.6, barBase: 198, barMax: 40, barW: 18, letter: 24 };

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 4, wander = 0.8) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

export const UNIT_HUE: Record<string, string> = { ABC: "var(--teal)", DEF: "var(--red)", GHI: "var(--gold-deep)" };

export type RibbonMarks = {
  /** thread thickness carries the probability of what came next */
  weighted?: boolean;
  /** bars under the beads: their share of the stream, or the probability of what came next */
  bars?: "none" | "share" | "next";
  /** cut where the probability of what came next dips below both its neighbours */
  cuts?: boolean;
  /** brace the stretches between cuts */
  brackets?: boolean;
  /** brace the stretches between the dips, or between the places the units really end */
  chunkBy?: "dips" | "units";
};

export function Ribbon({ stream, n, marks, now, label, narrow }: { stream: StatisticalStream; n: number; marks: RibbonMarks; now?: number; label: string; narrow?: boolean }) {
  const R = narrow ? NARROW : WIDE;
  const rowOf = (i: number) => Math.floor(i / R.perRow);
  const colOf = (i: number) => i % R.perRow;
  const xOf = (i: number) => R.x0 + colOf(i) * R.dx;

  const seq = stream.noteSequence;
  const pitch: Record<string, number> = Object.fromEntries(stream.pitchMapping.map((p) => [p.label, p.midi]));
  const heard = Math.max(0, Math.min(n, seq.length));
  const tally = tallyAt(seq, heard);
  const js = junctions(seq, heard);
  const read = reading(seq, stream.unitSequence, heard);
  const rows = Math.ceil(seq.length / R.perRow);
  const H = rows * R.rowH;
  const yOf = (i: number) => rowOf(i) * R.rowH + R.top + (73 - pitch[seq[i]]) * R.dyPitch;
  const pos = (i: number): [number, number] => [xOf(i), yOf(i)];
  const stubLen = narrow ? 26 : 22;
  const lastX = R.x0 + (R.perRow - 1) * R.dx;

  // stretches between cuts, split at row ends so each brace stays on one row
  const pieces: { i0: number; i1: number; tones: string; first: boolean }[] = [];
  if (marks.brackets) {
    const at = marks.chunkBy === "units" ? read.actual : marks.cuts ? read.cuts : [];
    for (const c of chunks(seq, heard, at)) {
      let a = c.from;
      let first = true;
      while (a <= c.to) {
        const b = Math.min(c.to, (rowOf(a) + 1) * R.perRow - 1);
        pieces.push({ i0: a, i1: b, tones: c.tones, first });
        first = false;
        a = b + 1;
      }
    }
  }

  return (
    <svg className={s.ribbon} viewBox={`0 0 ${R.w} ${H}`} role="img" aria-label={label} data-narrow={narrow || undefined}>
      {/* the scale the bars are read against: 0 to 1 */}
      {marks.bars !== "none" && Array.from({ length: rows }, (_, r) => {
        const base = r * R.rowH + R.barBase;
        return (
          <g key={r} className={s.scale} aria-hidden="true">
            <path d={L(R.x0 - 16, base, lastX + R.dx / 2 + 22, base, 300 + r, 14, 0.4)} />
            <path className={s.scaleTop} d={L(R.x0 - 16, base - R.barMax, lastX + R.dx / 2 + 22, base - R.barMax, 310 + r, 14, 0.4)} />
            <text className={s.tag} x={R.x0 - 22} y={base - R.barMax + 4} textAnchor="end">1</text>
            <text className={s.tag} x={R.x0 - 22} y={base + 4} textAnchor="end">0</text>
          </g>
        );
      })}

      {/* the thread between beads */}
      <g className={s.threads}>
        {js.map((p, i) => {
          const [x1, y1] = pos(i), [x2, y2] = pos(i + 1);
          const w = marks.weighted ? 1.2 + 5.2 * p : 2.6;
          if (rowOf(i) !== rowOf(i + 1)) {
            // the stream carries on in the next row: a stub off the end and a stub into the start
            return (
              <g key={i} className={s.stub}>
                <path d={L(x1 + R.r + 2, y1, x1 + R.r + stubLen, y1, 400 + i, 3, 0.4)} style={{ strokeWidth: w }} />
                <path d={L(x2 - R.r - stubLen, y2, x2 - R.r - 2, y2, 500 + i, 3, 0.4)} style={{ strokeWidth: w }} />
              </g>
            );
          }
          const len = Math.hypot(x2 - x1, y2 - y1) || 1;
          const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
          return <path key={i} className={s.thread} data-dip={(marks.cuts && read.cuts.includes(i)) || undefined} style={{ strokeWidth: w }} d={L(x1 + ux * (R.r + 1.5), y1 + uy * (R.r + 1.5), x2 - ux * (R.r + 1.5), y2 - uy * (R.r + 1.5), 100 + i, 5, 0.7)} filter="url(#folio-pencil)" />;
        })}
      </g>

      {/* bars */}
      {marks.bars === "share" && (
        <g className={s.bars} data-kind="share" aria-hidden="true">
          {seq.slice(0, heard).map((t, i) => {
            const h = ((tally.freq[t] ?? 0) / Math.max(heard, 1)) * R.barMax;
            const x = xOf(i), base = rowOf(i) * R.rowH + R.barBase;
            return <rect key={i} x={x - R.barW / 2} y={base - h} width={R.barW} height={Math.max(h, 1.2)} />;
          })}
        </g>
      )}
      {marks.bars === "next" && (
        <g className={s.bars} data-kind="next" aria-hidden="true">
          {js.map((p, i) => {
            const seam = rowOf(i) !== rowOf(i + 1);
            const x = seam ? xOf(i) + R.r + 8 : (xOf(i) + xOf(i + 1)) / 2;
            const base = rowOf(i) * R.rowH + R.barBase;
            const h = p * R.barMax;
            return <rect key={i} x={x - R.barW / 2} y={base - h} width={R.barW} height={Math.max(h, 1.2)} data-dip={(marks.cuts && read.cuts.includes(i)) || undefined} />;
          })}
        </g>
      )}

      {/* cuts */}
      {marks.cuts && (
        <g className={s.cuts} aria-hidden="true">
          {read.cuts.map((i) => {
            const seam = rowOf(i) !== rowOf(i + 1);
            const [x1, y1] = pos(i), [x2, y2] = pos(i + 1);
            const cx = seam ? x1 + R.r + 12 : (x1 + x2) / 2, cy = seam ? y1 : (y1 + y2) / 2;
            const k = narrow ? 1.35 : 1;
            return (
              <g key={i}>
                <path d={L(cx - 5 * k, cy - 11 * k, cx + 3 * k, cy + 11 * k, 600 + i, 2, 0.3)} />
                <path d={L(cx + 1 * k, cy - 11 * k, cx + 9 * k, cy + 11 * k, 700 + i, 2, 0.3)} />
              </g>
            );
          })}
        </g>
      )}

      {/* braces over the stretches */}
      {marks.brackets && (
        <g className={s.braces}>
          {pieces.map((p, k) => {
            const hue = UNIT_HUE[p.tones];
            const y = rowOf(p.i0) * R.rowH + (narrow ? 30 : 26);
            const x1 = xOf(p.i0) - R.r, x2 = xOf(p.i1) + R.r;
            return (
              <g key={k} style={{ "--hue": hue ?? "var(--pen-3)" } as React.CSSProperties} data-unit={hue ? true : undefined}>
                <path d={hand.brace(x1, x2, y + 8, { depth: 7, up: true, seed: 800 + k })} filter="url(#folio-pencil)" />
                {p.first && <text className={s.chunkLabel} x={(x1 + x2) / 2} y={y - 6} textAnchor="middle" style={narrow ? { fontSize: 20 } : undefined}>{hue ? p.tones : "?"}</text>}
              </g>
            );
          })}
        </g>
      )}

      {/* the beads */}
      <g className={s.beads}>
        {seq.map((t, i) => {
          const [x, y] = pos(i);
          const on = i < heard;
          return (
            <g key={i} className={s.bead} data-ghost={!on || undefined} data-now={now === i || undefined}>
              <circle cx={x} cy={y} r={R.r} className={s.beadFill} />
              <path d={hand.ring(x, y, R.r, R.r, { seed: 900 + i, wobble: 0.04 })} className={s.beadInk} filter="url(#folio-pencil)" />
              <text className={s.beadLetter} x={x} y={y + R.letter / 3} textAnchor="middle" style={{ fontSize: R.letter }}>{t}</text>
            </g>
          );
        })}
      </g>

      {/* which tone each row starts at */}
      {Array.from({ length: rows }, (_, r) => <text key={r} className={s.tag} x="4" y={r * R.rowH + 22} aria-hidden="true">{r * R.perRow + 1}</text>)}
    </svg>
  );
}

import * as hand from "../../_folio/hand";
import { tallyGroups } from "./geometry";
import s from "./stat.module.css";

/* ---------------------------------------------------------------------------
   Small hand-drawn marks the page counts with and points with.
   ------------------------------------------------------------------------- */

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 3, wander = 0.7) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

/** tally strokes, in fives: four upright and one across. The number beside it says how many. */
export function TallyMarks({ n, className, seed = 1 }: { n: number; className?: string; seed?: number }) {
  const { full, rest } = tallyGroups(n);
  const groups = full + (rest ? 1 : 0);
  const GW = 27;
  const w = Math.max(groups * GW, 10);
  return (
    <svg className={[s.tally, className].filter(Boolean).join(" ")} viewBox={`0 0 ${w} 22`} style={{ width: `${(w / 22) * 1.15}em` }} aria-hidden="true" data-n={n}>
      <g filter="url(#folio-pencil)">
        {Array.from({ length: groups }, (_, g) => {
          const x0 = g * GW + 4;
          const strokes = g < full ? 4 : rest;
          return (
            <g key={g}>
              {Array.from({ length: strokes }, (_, k) => <path key={k} d={L(x0 + k * 5.4, 3, x0 + k * 5.4 + 0.9, 19, seed * 7 + g * 5 + k)} />)}
              {g < full && <path d={L(x0 - 2.5, 16, x0 + 21.5, 5.5, seed * 7 + g * 5 + 4, 4, 0.8)} />}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export type PictogramKind = "hierarchy" | "adjacent" | "dimensions" | "changing";

/** a pictogram for one of the ways real music is more than an A → B tally */
export function Pictogram({ kind }: { kind: PictogramKind }) {
  return (
    <svg className={s.pictogram} viewBox="0 0 64 44" aria-hidden="true" data-kind={kind}>
      <g filter="url(#folio-pencil)">
        {kind === "hierarchy" && (
          <>
            {[10, 24, 38, 52].map((x) => <circle key={x} cx={x} cy="36" r="3.4" />)}
            <path d={hand.brace(6, 28, 30, { depth: 6, up: true, seed: 3 })} />
            <path d={hand.brace(34, 56, 30, { depth: 6, up: true, seed: 4 })} />
            <path d={hand.brace(6, 56, 14, { depth: 6, up: true, seed: 5 })} />
          </>
        )}
        {kind === "adjacent" && (
          <>
            {[8, 22, 36, 50].map((x) => <circle key={x} cx={x} cy="30" r="3.4" />)}
            <path d={hand.curve([[8, 24], [26, 4], [50, 24]], { seed: 6, wander: 0.4 })} data-far />
            <path d={L(11, 30, 19, 30, 7)} />
            <path d={L(25, 30, 33, 30, 8)} />
            <path d={L(39, 30, 47, 30, 9)} />
          </>
        )}
        {kind === "dimensions" && (
          <>
            <path d={hand.line(8, 6, 8, 38, { seed: 10, wander: 0.5, segments: 4 })} />
            <path d={hand.line(8, 38, 58, 38, { seed: 11, wander: 0.5, segments: 5 })} />
            {[[18, 28], [26, 16], [38, 30], [48, 12], [52, 24]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3.2" />)}
          </>
        )}
        {kind === "changing" && (
          <>
            {[[12, 26], [26, 20], [40, 12], [54, 6]].map(([x, top], i) => <path key={x} d={L(x, 38, x + 0.6, top, 12 + i, 3, 0.6)} data-bar={i} />)}
            <path d={hand.curve([[8, 40], [30, 42], [58, 40]], { seed: 13, wander: 0.3 })} />
          </>
        )}
      </g>
    </svg>
  );
}

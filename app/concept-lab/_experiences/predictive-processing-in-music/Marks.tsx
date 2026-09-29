import * as hand from "../../_folio/hand";
import s from "./pp.module.css";

/* ---------------------------------------------------------------------------
   The ghost and the sound.

   A prediction is drawn as a dashed ghost; what actually arrives is drawn solid;
   a mismatch is the red trace left between them. The same three marks are used
   wherever the page shows something being expected and something being heard.
   ------------------------------------------------------------------------- */

export const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 5, wander = 0.9) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

/** a box drawn by hand: four sides that do not quite meet */
export const box = (x: number, y: number, w: number, h: number, seed: number) =>
  L(x, y, x + w, y + 0.8, seed, 5, 0.9) + L(x + w, y + 0.8, x + w - 0.6, y + h, seed + 1, 3, 0.8) + L(x + w - 0.6, y + h, x, y + h - 0.6, seed + 2, 5, 0.9) + L(x, y + h - 0.6, x + 0.5, y, seed + 3, 3, 0.8);

/** what a model expects: a dashed ghost of a note */
export function GhostNote({ x, y, seed = 1, on = true }: { x: number; y: number; seed?: number; on?: boolean }) {
  return (
    <g className={s.ghostNote} data-off={!on || undefined} aria-hidden="true">
      <path d={hand.ring(x, y, 22, 15, { seed: 30 + seed, wobble: 0.03, tilt: -0.24, overlap: 0.02 })} filter="url(#folio-pencil)" />
    </g>
  );
}

/** what actually arrives: a solid note */
export function SoundNote({ x, y, seed = 1, now }: { x: number; y: number; seed?: number; now?: boolean }) {
  return (
    <g className={s.soundNote} data-now={now || undefined} aria-hidden="true">
      <ellipse cx={x} cy={y} rx="20" ry="13.5" transform={`rotate(-14 ${x} ${y})`} className={s.soundFill} />
      <path d={hand.ring(x, y, 20, 13.5, { seed: 50 + seed, wobble: 0.03, tilt: -0.24 })} className={s.soundInk} filter="url(#folio-pencil)" />
    </g>
  );
}

/** where a note was expected and nothing came: a dotted, empty place */
export function EmptySlot({ x, y, seed = 1 }: { x: number; y: number; seed?: number }) {
  return (
    <g className={s.emptySlot} aria-hidden="true">
      <path d={hand.ring(x, y, 20, 13.5, { seed: 70 + seed, wobble: 0.04, tilt: -0.24 })} />
    </g>
  );
}

/** the trace of a mismatch: a hollow red spike standing on the baseline */
export function Spike({ x, base, h, seed = 1 }: { x: number; base: number; h: number; seed?: number }) {
  return (
    <g className={s.spike} aria-hidden="true">
      <path d={L(x, base, x + 0.8, base - h, 90 + seed, 4, 0.6)} filter="url(#folio-pencil)" />
      <path d={hand.ring(x, base - h - 9, 11, 9, { seed: 95 + seed, wobble: 0.05 })} filter="url(#folio-pencil)" />
    </g>
  );
}

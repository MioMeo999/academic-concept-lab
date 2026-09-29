import * as hand from "../../_folio/hand";
import { GhostNote, SoundNote } from "./Marks";
import s from "./pp.module.css";

/* ---------------------------------------------------------------------------
   The note that is arriving, and the note that comes next.

   The record says a next-note guess is one visible consequence of prediction,
   not the whole of it: a model can also predict the sensory activity expected
   under a present perceptual hypothesis. So the same model is drawn predicting
   two ghosts at once — one over the sound that is arriving now, one over the
   note that has not been heard yet. A teaching map (✦), not a measurement.
   ------------------------------------------------------------------------- */

// a plain helper of its own: this figure is drawn on the server, and a function imported from the client-side marks is not callable there
const line = (x1: number, y1: number, x2: number, y2: number, seed: number, segments: number, wander: number) => hand.line(x1, y1, x2, y2, { seed, wander, segments });
const XS = [110, 206, 302, 398, 494];
const Y_GHOST = 126, Y_HEARD = 202, Y_BASE = 234;

export function Moment() {
  const down = (x: number, seed: number) => (
    <g className={s.predArrow}>
      <path d={hand.curve([[x, 76], [x + 3, 92], [x, 102]], { seed, wander: 0.3 })} filter="url(#folio-pencil)" />
      <path d={hand.arrowHead(x, 103, Math.PI / 2, { size: 9, seed: seed + 1 })} filter="url(#folio-pencil)" />
    </g>
  );
  return (
    <svg className={s.diagram} viewBox="0 0 640 276" role="img" aria-label="A time line of five notes. Three have already been heard, one is arriving now, and one is still to come. A cloud standing for the model predicts two things at once, each drawn as a dashed ghost: the sound that should be arriving now, and the next note that has not been heard yet. Prediction is not only about the future.">
      <path className={s.cloudFill} d={hand.ring(446, 44, 158, 32, { seed: 5, wobble: 0.08 })} />
      <path className={s.cloudInk} d={hand.ring(446, 44, 158, 32, { seed: 5, wobble: 0.08 })} filter="url(#folio-pencil)" />
      <text className={s.diagHead} x="446" y="50" textAnchor="middle">the model</text>
      {down(XS[3], 20)}
      {down(XS[4], 24)}
      <text className={s.tag} x="6" y={Y_GHOST + 4}>expected</text>
      <text className={s.tag} x="6" y={Y_HEARD + 4}>heard</text>
      <GhostNote x={XS[3]} y={Y_GHOST} seed={3} />
      <GhostNote x={XS[4]} y={Y_GHOST} seed={4} />
      <path className={s.predDown} d={hand.curve([[XS[3], Y_GHOST + 20], [XS[3] + 3, (Y_GHOST + Y_HEARD) / 2], [XS[3], Y_HEARD - 22]], { seed: 130, wander: 0.3 })} filter="url(#folio-pencil)" />
      <g className={s.pastNotes}>
        {XS.slice(0, 3).map((x, i) => <SoundNote key={x} x={x} y={Y_HEARD} seed={i + 8} />)}
      </g>
      <SoundNote x={XS[3]} y={Y_HEARD} seed={11} />
      <text className={s.diagSub} x={XS[4]} y={Y_HEARD + 5} textAnchor="middle">not yet heard</text>
      <path className={s.baseline} d={line(60, Y_BASE, 596, Y_BASE, 3, 14, 0.5)} />
      <g className={s.reach}>
        <path d={hand.arrowHead(606, Y_BASE, 0, { size: 9, seed: 31 })} filter="url(#folio-pencil)" />
      </g>
      <text className={s.diagSub} x={XS[1]} y={Y_BASE + 28} textAnchor="middle">already heard</text>
      <text className={s.diagTag} x={XS[3]} y={Y_BASE + 28} textAnchor="middle">now</text>
      <text className={s.diagTag} x={XS[4]} y={Y_BASE + 28} textAnchor="middle">next</text>
    </svg>
  );
}

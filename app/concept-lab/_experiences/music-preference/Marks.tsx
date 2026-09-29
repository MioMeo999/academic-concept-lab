import * as hand from "../../_folio/hand";
import { poly, q } from "./draw";
import { TRACE_W, trace, type Quality } from "./sound";
import s from "./mp.module.css";

/* ---------------------------------------------------------------------------
   The marks the Music Preference figures share: a sound drawn as a trace, and a
   listener drawn as a head and shoulders.
   ------------------------------------------------------------------------- */

/** one quality of sound, drawn as a trace across TRACE_W units with its centre line at y = 0 */
export function SoundTrace({ quality, mini = false }: { quality: Quality; mini?: boolean }) {
  const t = trace(quality);
  const pencil = mini ? undefined : "url(#folio-pencil)";
  return (
    <g className={s.trace} data-quality={quality} data-mini={mini || undefined}>
      {t.base && <path className={s.traceBase} d={`M0 0H${TRACE_W}`} />}
      {/* the jag is filled with the short upright strokes that a hand would make to darken it */}
      {quality === "I" && <path className={s.traceFill} d={t.strokes[0].filter((_, i) => i % 2 === 1).map(([x, y]) => `M${q(x)} 0V${q(y)}`).join("")} />}
      {t.strokes.map((pts, i) => {
        const straight = pts.every(([, y]) => y === 0);
        return (
          <g key={i}>
            {quality === "M" && <path className={s.traceHalo} d={poly(pts)} />}
            <path className={s.traceLine} data-strand={i} d={poly(pts)} filter={straight ? undefined : pencil} />
          </g>
        );
      })}
      {t.beats.map((b) => (
        <g key={`${b.kind}-${b.x}`} className={b.kind === "hat" ? s.beatHat : s.beat}>
          <path d={`M${q(b.x)} 0V${-b.h}`} />
          {b.kind === "hit" && <circle cx={q(b.x)} cy={-b.h} r="4.6" />}
        </g>
      ))}
    </g>
  );
}

/** a listener: a head and shoulders, drawn by hand */
export function Person({ x, y, k = 1, seed = 1 }: { x: number; y: number; k?: number; seed?: number }) {
  return (
    <g className={s.person} aria-hidden="true">
      <path d={hand.ring(q(x), q(y - 16 * k), q(8.5 * k), q(8.5 * k), { seed, wobble: 0.05 })} filter="url(#folio-pencil)" />
      <path d={hand.curve([[q(x - 17 * k), q(y + 8 * k)], [q(x - 12 * k), q(y - 4 * k)], [q(x), q(y - 6 * k)], [q(x + 12 * k), q(y - 4 * k)], [q(x + 17 * k), q(y + 8 * k)]], { seed: seed + 1, wander: 0.5 })} filter="url(#folio-pencil)" />
    </g>
  );
}

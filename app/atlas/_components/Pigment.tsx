import type { CSSProperties, ReactNode } from "react";
import { blob, brace, erased, hatch, leader, partialBox, passes, rule, stipple, ticks } from "../_lib/marks";

/* ---------------------------------------------------------------------------
   Pigment and graphite primitives.

   Two rules hold everywhere in this directory:

   1. A mark is material, not a legend. Nothing here means anything on its own;
      the spread that places a mark says in text what it is doing. Colour is
      pigment, never a claim-class key, and density is never evidence weight.
   2. Every mark in this file is decorative at the accessibility layer —
      aria-hidden, focus-inert, and safe to remove. Where a drawing carries an
      argument it is wrapped by a figure component that supplies a real
      caption and a linear text equivalent.
   ------------------------------------------------------------------------ */

export type Pigment =
  | "graphite"
  | "ultramarine"
  | "vermilion"
  | "viridian"
  | "violet"
  | "ochre"
  | "rose";

export const PIGMENT: Record<Pigment, string> = {
  graphite: "var(--pg-graphite)",
  ultramarine: "var(--pg-ultramarine)",
  vermilion: "var(--pg-vermilion)",
  viridian: "var(--pg-viridian)",
  violet: "var(--pg-violet)",
  ochre: "var(--pg-ochre)",
  rose: "var(--pg-rose)",
};

/** Wraps pigment so overlaps behave like layered colour rather than paint-over. */
export function Layer({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <g className={`at-layer${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </g>
  );
}

type FieldProps = {
  /** Centre of the field, in the parent SVG's user units. */
  cx: number;
  cy: number;
  w: number;
  h: number;
  pigment?: Pigment;
  angle?: number;
  gap?: number;
  seed?: number;
  broken?: number;
  pressure?: [number, number];
  ramp?: "none" | "in" | "out" | "centre";
  weight?: number;
  /** A second pass at a different angle: tone reached by crossing, not by opacity. */
  cross?: number | false;
  /** Clip the strokes to a hand-shaped boundary rather than a rectangle. */
  shaped?: boolean;
  opacity?: number;
  max?: number;
};

/**
 * A pigment mass. Tone is accumulated by repetition — more strokes, crossed
 * strokes, or heavier pressure — never declared as a fill. Two fields that
 * overlap keep both directions readable, which is the whole reason a hatch is
 * used here instead of a translucent rectangle.
 */
export function Field({
  cx,
  cy,
  w,
  h,
  pigment = "graphite",
  angle = -34,
  gap = 5.5,
  seed = 1,
  broken = 0,
  pressure = [0.22, 0.62],
  ramp = "none",
  weight = 0.85,
  cross = false,
  shaped = true,
  opacity = 1,
  max,
}: FieldProps) {
  /* Derived from the field's own geometry rather than from a counter: a
     module-scope counter is impure during render and would hand the server and
     the client different ids, which is exactly the sort of mismatch that leaves
     a clip pointing at nothing. */
  const id = `atf-${seed}-${Math.round(cx)}-${Math.round(cy)}-${Math.round(w)}x${Math.round(h)}`;
  const a = hatch({ w, h, gap, seed, broken, pressure, ramp, weight, max });
  const b = cross === false ? null : hatch({ w, h, gap: gap * 1.25, seed: seed + 977, broken, pressure: [pressure[0] * 0.7, pressure[1] * 0.8], ramp, weight, max });
  const shape = blob(w / 2, h / 2, seed + 313, 0.14);

  return (
    <>
      {/* Outside the blended group on purpose — see the note in Overture. */}
      {shaped && (
        <clipPath id={id}>
          <path d={shape} transform={`translate(${cx} ${cy})`} />
        </clipPath>
      )}
      <g className="at-layer" style={{ opacity }} clipPath={shaped ? `url(#${id})` : undefined}>
        <g transform={`translate(${cx} ${cy})`}>
        <g stroke={PIGMENT[pigment]} fill="none" strokeLinecap="round">
          <g transform={`rotate(${angle})`}>
            {a.strokes.map((s, i) => (
              <path key={`a${i}`} d={s.d} strokeWidth={s.w} opacity={s.p} />
            ))}
          </g>
          {b && (
            <g transform={`rotate(${typeof cross === "number" ? cross : angle + 62})`}>
              {b.strokes.map((s, i) => (
                <path key={`b${i}`} d={s.d} strokeWidth={s.w} opacity={s.p * 0.8} />
              ))}
            </g>
          )}
        </g>
        </g>
      </g>
    </>
  );
}

/** A hand-drawn boundary that may decline to close. */
export function Boundary({
  x,
  y,
  w,
  h,
  open = "none",
  pigment = "graphite",
  seed = 5,
  weight = 1.15,
  count = 2,
  opacity = 0.85,
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  open?: "right" | "left" | "top" | "bottom" | "none";
  pigment?: Pigment;
  seed?: number;
  weight?: number;
  count?: number;
  opacity?: number;
  dashed?: boolean;
}) {
  const d = partialBox(x, y, w, h, open, Math.min(26, w * 0.22), seed);
  return (
    <Layer style={{ opacity }}>
      {passes(count, seed).map((p, i) => (
        <path
          key={i}
          d={d}
          transform={`translate(${p.dx} ${p.dy})`}
          fill="none"
          stroke={PIGMENT[pigment]}
          strokeWidth={weight * (i ? 0.8 : 1)}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={p.o}
          strokeDasharray={dashed ? "5 4.5" : undefined}
        />
      ))}
    </Layer>
  );
}

/** A run gone over more than once. The waver is the point. */
export function Stroke({
  x1,
  y1,
  x2,
  y2,
  pigment = "graphite",
  seed = 7,
  weight = 1.2,
  count = 1,
  opacity = 0.9,
  amp = 1,
  dashed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  pigment?: Pigment;
  seed?: number;
  weight?: number;
  count?: number;
  opacity?: number;
  amp?: number;
  dashed?: string;
}) {
  const d = y1 === y2 ? rule(x1, y1, x2, seed, amp) : `M${x1} ${y1}L${x2} ${y2}`;
  return (
    <Layer style={{ opacity }}>
      {passes(count, seed, 0.9).map((p, i) => (
        <path
          key={i}
          d={d}
          transform={`translate(${p.dx} ${p.dy})`}
          fill="none"
          stroke={PIGMENT[pigment]}
          strokeWidth={weight * (i ? 0.75 : 1)}
          strokeLinecap="round"
          opacity={p.o}
          strokeDasharray={dashed}
        />
      ))}
    </Layer>
  );
}

/**
 * Construction that was kept. A ghost is scaffolding the page has decided not
 * to erase — a predicted position, an alternative reading, a line that was
 * needed to build something else. It is faint because it is not asserted, not
 * because it is discredited.
 */
export function Ghost({ d, pigment = "graphite", weight = 0.9, opacity = 0.4 }: { d: string; pigment?: Pigment; weight?: number; opacity?: number }) {
  return (
    <Layer style={{ opacity }}>
      <path d={d} fill="none" stroke={PIGMENT[pigment]} strokeWidth={weight} strokeLinecap="round" strokeDasharray="3.2 4.4" />
    </Layer>
  );
}

/**
 * Residue. A mark that was lifted keeps a broken skeleton and a soft rub. On
 * every spread that uses this, the text says what was revised and to what —
 * removal is a relationship to a former state, not a deletion.
 */
export function Erasure({ cx, cy, w, h, pigment = "graphite", seed = 23 }: { cx: number; cy: number; w: number; h: number; pigment?: Pigment; seed?: number }) {
  const { skeleton, rub } = erased(w, h, seed);
  return (
    <Layer>
      <g transform={`translate(${cx} ${cy})`} stroke={PIGMENT[pigment]} fill="none" strokeLinecap="round">
        <g transform="rotate(-28)">
          {skeleton.map((s, i) => (
            <path key={`s${i}`} d={s.d} strokeWidth={s.w} opacity={s.p * 0.5} />
          ))}
        </g>
        <g transform="rotate(6)">
          {rub.map((s, i) => (
            <path key={`r${i}`} d={s.d} strokeWidth={s.w} opacity={s.p} />
          ))}
        </g>
      </g>
    </Layer>
  );
}

/** A brace holding a run together in the margin. */
export function Brace({
  x,
  y1,
  y2,
  pigment = "graphite",
  seed = 13,
  facing = 1,
  depth = 8,
  opacity = 0.8,
}: {
  x: number;
  y1: number;
  y2: number;
  pigment?: Pigment;
  seed?: number;
  facing?: 1 | -1;
  depth?: number;
  opacity?: number;
}) {
  const d = brace(x, y1, y2, depth, seed, facing);
  return (
    <Layer style={{ opacity }}>
      {passes(2, seed).map((p, i) => (
        <path key={i} d={d} transform={`translate(${p.dx} ${p.dy})`} fill="none" stroke={PIGMENT[pigment]} strokeWidth={i ? 0.7 : 1.05} strokeLinecap="round" opacity={p.o} />
      ))}
    </Layer>
  );
}

/** A curve from an apparatus note to the phrase it attaches to. */
export function Leader({ x1, y1, x2, y2, pigment = "graphite", seed = 17, opacity = 0.7 }: { x1: number; y1: number; x2: number; y2: number; pigment?: Pigment; seed?: number; opacity?: number }) {
  return (
    <Layer style={{ opacity }}>
      <path d={leader(x1, y1, x2, y2, seed)} fill="none" stroke={PIGMENT[pigment]} strokeWidth={0.75} strokeLinecap="round" />
      <circle cx={x2} cy={y2} r={1.5} fill={PIGMENT[pigment]} opacity={0.85} />
    </Layer>
  );
}

export function Stipple({ cx, cy, w, h, count, pigment = "graphite", seed = 19 }: { cx: number; cy: number; w: number; h: number; count: number; pigment?: Pigment; seed?: number }) {
  return (
    <Layer>
      <g transform={`translate(${cx} ${cy})`} fill={PIGMENT[pigment]}>
        {stipple(w, h, count, seed).map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} opacity={s.p} />
        ))}
      </g>
    </Layer>
  );
}

export function Ticks({ x1, x2, y, count, len = 6, pigment = "graphite", seed = 29, weight = 0.9 }: { x1: number; x2: number; y: number; count: number; len?: number; pigment?: Pigment; seed?: number; weight?: number }) {
  return (
    <Layer>
      <g stroke={PIGMENT[pigment]} fill="none" strokeLinecap="round">
        {ticks(x1, x2, count, y, len, seed).map((t, i) => (
          <path key={i} d={t.d} strokeWidth={weight} opacity={t.p} />
        ))}
      </g>
    </Layer>
  );
}

/* --- Marks that live in the page rather than inside a figure ------------- */

/**
 * A pigment mass placed behind running text. It takes its size from the block
 * it decorates, so it cannot drift out of register with the words when the
 * measure reflows.
 */
export function BackingField({
  pigment = "ochre",
  angle = -22,
  seed = 41,
  gap = 7,
  broken = 0.3,
  pressure = [0.1, 0.3],
  ramp = "out",
  className,
  style,
}: {
  pigment?: Pigment;
  angle?: number;
  seed?: number;
  gap?: number;
  broken?: number;
  pressure?: [number, number];
  ramp?: "none" | "in" | "out" | "centre";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg className={`at-backing${className ? ` ${className}` : ""}`} viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true" focusable="false" style={style}>
      <Field cx={200} cy={100} w={430} h={230} pigment={pigment} angle={angle} gap={gap} seed={seed} broken={broken} pressure={pressure} ramp={ramp} shaped={false} max={260} />
    </svg>
  );
}

/** A multi-pass underscore sitting under a phrase, drawn at text scale. */
export function Underscore({ pigment = "vermilion", seed = 53, weight = 1.6 }: { pigment?: Pigment; seed?: number; weight?: number }) {
  return (
    <svg className="at-underscore" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {passes(3, seed, 1.6).map((p, i) => (
        <path key={i} d={rule(2, 5, 198, seed + i * 7, 2.1)} transform={`translate(${p.dx} ${p.dy})`} fill="none" stroke={PIGMENT[pigment]} strokeWidth={weight * (i ? 0.7 : 1)} strokeLinecap="round" opacity={p.o * 0.85} />
      ))}
    </svg>
  );
}

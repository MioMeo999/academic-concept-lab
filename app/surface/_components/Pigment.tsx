/**
 * Surface — the drawing primitives.
 *
 * Every component here is a server component and every mark is decorative
 * unless a caller gives it a `title`. Marks are `aria-hidden` and pointer-inert
 * by default: switching the drawing off must never remove a claim, a citation,
 * a boundary or a qualification from the page. That is the acceptance test for
 * this whole direction, and it is easier to keep if the default is silence.
 *
 * Colour behaves as material. A pigment is named for how it sits in the mass,
 * and `mix-blend-mode: multiply` on every mark group means two pigments that
 * cross actually darken each other instead of the later one covering the
 * earlier. That single property is most of what separates this from vector
 * illustration: it is why an overlap looks like an overlap.
 *
 * Nothing here maps a hue to a meaning. No claim class, evidence status, kind
 * or provenance mark is encoded by colour anywhere in this exploration.
 */

import type { CSSProperties, ReactNode } from "react";
import {
  arc,
  blob,
  brace,
  bucket,
  encircle,
  erased,
  field,
  hatch,
  leader,
  partialBox,
  passes,
  polyline,
  rng,
  softRect,
  toPath,
  wander,
  stipple,
  ticks,
  type Stroke,
} from "../_lib/pigment";

export type Hue =
  | "cobalt" | "sky" | "teal" | "emerald" | "lime" | "lemon" | "ochre"
  | "orange" | "vermilion" | "coral" | "magenta" | "violet" | "lilac"
  | "sand" | "warmgrey" | "graphite" | "charcoal";

const ink = (h: Hue) => `var(--pg-${h})`;

/* ------------------------------------------------------------------ mass -- */

export type MassProps = {
  /** Box the mass fills, in the parent SVG's user units. */
  x: number;
  y: number;
  w: number;
  h: number;
  hue: Hue;
  /** Stroke directions. Two or three crossing passes read as pencil; one reads as a fill. */
  angles?: number[];
  gap?: number;
  /** Roughly, how hard the hand pressed. */
  pressure?: [number, number];
  broken?: number;
  rework?: number;
  ramp?: "none" | "in" | "out" | "centre" | "edges";
  /** How far across the field one stroke runs, 0..1. Low = visible stroke ends. */
  coverage?: number;
  jitter?: number;
  weight?: number;
  seed?: number;
  max?: number;
  /** Clip the mass to a hand-shaped silhouette instead of the box. */
  shape?: "box" | "blob";
  wobble?: number;
  /** Rotate the whole deposit about its centre. */
  rotate?: number;
  opacity?: number;
  className?: string;
};

/**
 * An accumulated deposit of one pigment. Depth comes from crossing passes, so
 * `angles` is the main control: `[-24, 38]` is an ordinary worked mass,
 * `[-18]` is a single quick pass, `[-20, 22, 78]` is somewhere a hand kept
 * going back.
 */
export function Mass({
  x, y, w, h, hue,
  angles = [-22, 34],
  gap = 1.9,
  pressure = [0.26, 0.6],
  broken = 0.28,
  rework = 0.22,
  ramp = "none",
  coverage = 0.4,
  jitter = 2.0,
  weight = 2.1,
  seed = 1,
  max = 900,
  shape = "box",
  wobble = 0.13,
  rotate = 0,
  opacity = 1,
  className,
}: MassProps) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  /* Stroke length is measured against the field's diagonal, which is the right
     reference for a roughly square mass and badly wrong for a long thin one: a
     22-unit-tall band 480 units wide would otherwise be filled with 200-unit
     strokes that survive clipping as a few long diagonal slashes. An elongated
     field therefore shortens its own runs in proportion to how elongated it is,
     so a band reads as a band rather than as scatter. */
  const aspect = Math.max(w, h) / Math.max(1, Math.min(w, h));
  const cov = coverage / Math.max(1, aspect * 0.25);
  const layers = field({ w, h, angles, gap, pressure, broken, rework, ramp, coverage: cov, jitter, weight, seed, max });

  /* Every deposit is clipped. Hatching generated for a rotated frame reaches
     past the field by design — without a bound it escapes across the page and
     the mass stops being where the composition put it. The bound is drawn with
     a hand's edge rather than a straight cut, so the mark keeps its own
     irregularity at the boundary instead of being sliced by a machine. */
  const clipId = `sfm-${hue}-${seed}-${Math.round(x)}-${Math.round(y)}-${Math.round(w)}x${Math.round(h)}`;
  const bound = shape === "blob"
    ? blob(w / 2, h / 2, seed + 313, wobble)
    : softRect(w, h, seed + 149, Math.min(3.2, Math.min(w, h) * 0.07));

  return (
    <g
      className={`sf-mass${className ? ` ${className}` : ""}`}
      transform={`translate(${cx} ${cy})${rotate ? ` rotate(${rotate})` : ""}`}
      style={{ color: ink(hue), opacity }}
      aria-hidden="true"
    >
      <clipPath id={clipId}><path d={bound} /></clipPath>
      <g clipPath={`url(#${clipId})`}>
        {layers.map((layer, li) => (
          <g key={li} transform={`rotate(${layer.angle})`}>
            {bucket(layer.strokes, 5).map((b, i) => (
              <path key={i} d={b.d} stroke="currentColor" strokeWidth={b.w} strokeOpacity={b.o} fill="none" strokeLinecap="round" />
            ))}
          </g>
        ))}
      </g>
    </g>
  );
}

/* ----------------------------------------------------------------- smudge -- */

/**
 * Pigment rubbed rather than laid. Wide, very low-pressure strokes with no
 * crossing pass — it softens an edge and carries colour into open space
 * without ever reading as a second deposit.
 */
export function Smudge({
  x, y, w, h, hue, seed = 5, strength = 0.1, angle = -12,
}: { x: number; y: number; w: number; h: number; hue: Hue; seed?: number; strength?: number; angle?: number }) {
  const strokes = hatch({
    w, h, gap: 3.6, seed, broken: 0.45, jitter: 3.2, coverage: 0.95,
    pressure: [strength * 0.4, strength], weight: 3.6, max: 90,
  });
  const clipId = `sfs-${hue}-${seed}-${Math.round(x)}-${Math.round(y)}`;
  return (
    <g
      className="sf-smudge"
      transform={`translate(${x + w / 2} ${y + h / 2}) rotate(${angle})`}
      style={{ color: ink(hue) }}
      aria-hidden="true"
    >
      <clipPath id={clipId}><path d={blob(w / 2, h / 2, seed + 61, 0.2)} /></clipPath>
      <g clipPath={`url(#${clipId})`}>
        {bucket(strokes, 5).map((b, i) => (
          <path key={i} d={b.d} stroke="currentColor" strokeWidth={b.w} strokeOpacity={b.o} fill="none" strokeLinecap="round" />
        ))}
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ marks -- */

/**
 * A single drawn line, gone over `laps` times.
 *
 * Built from the actual (x1,y1)→(x2,y2) vector rather than from a horizontal
 * rule that is rotated afterwards. The rotate-a-rule approach cannot draw a
 * vertical at all — the underlying path has zero length when x1 equals x2, so
 * it renders nothing and does so silently.
 */
export function Line({
  x1, y1, x2, y2, hue = "graphite", laps = 2, weight = 1.1, seed = 3, amp = 1, opacity = 0.8,
}: { x1: number; y1: number; x2: number; y2: number; hue?: Hue; laps?: number; weight?: number; seed?: number; amp?: number; opacity?: number }) {
  return (
    <g style={{ color: ink(hue) }} aria-hidden="true" className="sf-mark">
      {passes(laps, seed).map((p, i) => (
        <path
          key={i}
          d={toPath(wander(x1, y1, x2, y2, rng(seed + i * 53), amp))}
          transform={`translate(${p.dx} ${p.dy})`}
          stroke="currentColor" strokeWidth={weight} strokeOpacity={p.o * opacity} fill="none" strokeLinecap="round"
        />
      ))}
    </g>
  );
}

/** A wandering path through points — a trace, a contour, a route. */
export function Trace({
  points, hue = "cobalt", laps = 2, weight = 1.2, seed = 7, amp = 1.2, opacity = 0.85, dash,
}: { points: [number, number][]; hue?: Hue; laps?: number; weight?: number; seed?: number; amp?: number; opacity?: number; dash?: string }) {
  return (
    <g style={{ color: ink(hue) }} aria-hidden="true" className="sf-mark">
      {passes(laps, seed).map((p, i) => (
        <path
          key={i}
          d={polyline(points, rng(seed + i * 71), amp)}
          transform={`translate(${p.dx} ${p.dy})`}
          stroke="currentColor" strokeWidth={weight} strokeOpacity={p.o * opacity}
          strokeDasharray={dash} fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
      ))}
    </g>
  );
}

/** A claim laid over something: two-and-a-bit laps around it. */
export function Ring({
  cx, cy, rx, ry, hue = "vermilion", seed = 31, laps = 2, weight = 1.3, opacity = 0.75,
}: { cx: number; cy: number; rx: number; ry: number; hue?: Hue; seed?: number; laps?: number; weight?: number; opacity?: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} style={{ color: ink(hue) }} aria-hidden="true" className="sf-mark">
      {encircle(rx, ry, seed, laps).map((d, i) => (
        <path key={i} d={d} stroke="currentColor" strokeWidth={weight} strokeOpacity={opacity * (i === 0 ? 1 : 0.62)} fill="none" strokeLinecap="round" />
      ))}
    </g>
  );
}

/** An open arc — a boundary that declines to close. */
export function OpenArc({
  cx, cy, rx, ry, from, to, hue = "cobalt", seed = 5, weight = 1.2, opacity = 0.7, dash,
}: { cx: number; cy: number; rx: number; ry: number; from: number; to: number; hue?: Hue; seed?: number; weight?: number; opacity?: number; dash?: string }) {
  return (
    <path
      d={arc(rx, ry, from, to, seed)} transform={`translate(${cx} ${cy})`}
      style={{ color: ink(hue) }} stroke="currentColor" strokeWidth={weight} strokeOpacity={opacity}
      strokeDasharray={dash} fill="none" strokeLinecap="round" aria-hidden="true" className="sf-mark"
    />
  );
}

/**
 * A boundary with one side left unstated. Wherever this appears, the type
 * beside it says what the missing edge means.
 */
export function PartialBound({
  x, y, w, h, open = "right", hue = "graphite", seed = 11, weight = 1.1, opacity = 0.62, dash = "5 5", inset = 16,
}: { x: number; y: number; w: number; h: number; open?: "right" | "left" | "top" | "bottom" | "none"; hue?: Hue; seed?: number; weight?: number; opacity?: number; dash?: string; inset?: number }) {
  return (
    <path
      d={partialBox(x, y, w, h, open, inset, seed)} style={{ color: ink(hue) }}
      stroke="currentColor" strokeWidth={weight} strokeOpacity={opacity} strokeDasharray={dash}
      fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="sf-mark"
    />
  );
}

/** A margin brace spanning a run. */
export function Brace({
  x, y1, y2, depth = 8, hue = "graphite", seed = 13, facing = 1, weight = 1, opacity = 0.6,
}: { x: number; y1: number; y2: number; depth?: number; hue?: Hue; seed?: number; facing?: 1 | -1; weight?: number; opacity?: number }) {
  return (
    <path d={brace(x, y1, y2, depth, seed, facing)} style={{ color: ink(hue) }}
      stroke="currentColor" strokeWidth={weight} strokeOpacity={opacity} fill="none" strokeLinecap="round" aria-hidden="true" className="sf-mark" />
  );
}

/** A line from a marginal note to what it attaches to. */
export function Leader({
  x1, y1, x2, y2, hue = "graphite", seed = 17, weight = 0.85, opacity = 0.55, head = true,
}: { x1: number; y1: number; x2: number; y2: number; hue?: Hue; seed?: number; weight?: number; opacity?: number; head?: boolean }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hl = 5.5;
  return (
    <g style={{ color: ink(hue) }} aria-hidden="true" className="sf-mark">
      <path d={leader(x1, y1, x2, y2, seed)} stroke="currentColor" strokeWidth={weight} strokeOpacity={opacity} fill="none" strokeLinecap="round" />
      {head ? (
        <path
          d={`M${x2 - Math.cos(a - 0.42) * hl} ${y2 - Math.sin(a - 0.42) * hl}L${x2} ${y2}L${x2 - Math.cos(a + 0.42) * hl} ${y2 - Math.sin(a + 0.42) * hl}`}
          stroke="currentColor" strokeWidth={weight * 1.1} strokeOpacity={opacity * 1.2} fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
      ) : null}
    </g>
  );
}

/** Ticks along a registration line. */
export function Ticks({
  x1, x2, count, y, len = 5, hue = "graphite", seed = 29, weight = 0.85, opacity = 0.6,
}: { x1: number; x2: number; count: number; y: number; len?: number; hue?: Hue; seed?: number; weight?: number; opacity?: number }) {
  return (
    <g style={{ color: ink(hue) }} aria-hidden="true" className="sf-mark">
      {ticks(x1, x2, count, y, len, seed).map((t, i) => (
        <path key={i} d={t.d} stroke="currentColor" strokeWidth={weight} strokeOpacity={t.p * opacity} fill="none" strokeLinecap="round" />
      ))}
    </g>
  );
}

/** Discrete deposits. Used only where the record's own language is counting. */
export function Stipple({
  x, y, w, h, count, hue = "graphite", seed = 19, opacity = 0.6,
}: { x: number; y: number; w: number; h: number; count: number; hue?: Hue; seed?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x + w / 2} ${y + h / 2})`} style={{ color: ink(hue) }} aria-hidden="true" className="sf-mark">
      {stipple(w, h, count, seed).map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="currentColor" fillOpacity={s.p * opacity} />
      ))}
    </g>
  );
}

/**
 * Residue: where a reading was revised. The earlier mark keeps a broken
 * skeleton and a soft rub across it. Never used to mean "wrong".
 */
export function Erased({
  x, y, w, h, hue = "graphite", seed = 23,
}: { x: number; y: number; w: number; h: number; hue?: Hue; seed?: number }) {
  const { skeleton, rub } = erased(w, h, seed);
  const draw = (s: Stroke[], k: string) =>
    bucket(s, 5).map((b, i) => (
      <path key={`${k}${i}`} d={b.d} stroke="currentColor" strokeWidth={b.w} strokeOpacity={b.o} fill="none" strokeLinecap="round" />
    ));
  return (
    <g transform={`translate(${x + w / 2} ${y + h / 2})`} style={{ color: ink(hue) }} aria-hidden="true" className="sf-mark">
      {draw(skeleton, "s")}
      {draw(rub, "r")}
    </g>
  );
}

/* ------------------------------------------------------------- containers -- */

/**
 * A drawn figure. `title` and `desc` are what a screen reader gets; the
 * `caption` and any conditions table belong to the calling section, in type,
 * outside this element.
 */
export function Plate({
  viewBox, title, children, className, style, ratio,
}: { viewBox: string; title?: string; children: ReactNode; className?: string; style?: CSSProperties; ratio?: string }) {
  const labelled = Boolean(title);
  return (
    <svg
      className={`sf-plate${className ? ` ${className}` : ""}`}
      viewBox={viewBox}
      style={{ ...style, ...(ratio ? { aspectRatio: ratio } : null) }}
      role={labelled ? "img" : "presentation"}
      aria-hidden={labelled ? undefined : "true"}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** A hand-lettered note. Kept rare: a handful per page and never more. */
export function Hand({
  x, y, children, hue = "graphite", size = 15, rotate = 0, anchor = "start", width,
}: { x: number; y: number; children: ReactNode; hue?: Hue; size?: number; rotate?: number; anchor?: "start" | "middle" | "end"; width?: number }) {
  const lines = String(children).split("\n");
  return (
    <text
      className="sf-hand" x={x} y={y}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{ fill: ink(hue), fontSize: size }}
      textAnchor={anchor} aria-hidden="true"
    >
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size * 1.02} textLength={width}>{l}</tspan>
      ))}
    </text>
  );
}

/** A set label in the machinery voice — the publication's own apparatus. */
export function Label({
  x, y, children, hue = "graphite", size = 9, anchor = "start", rotate = 0, opacity = 1,
}: { x: number; y: number; children: ReactNode; hue?: Hue; size?: number; anchor?: "start" | "middle" | "end"; rotate?: number; opacity?: number }) {
  return (
    <text
      className="sf-glabel" x={x} y={y} textAnchor={anchor}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{ fill: ink(hue), fontSize: size, opacity }} aria-hidden="true"
    >
      {children}
    </text>
  );
}

/** Typeset numerals inside a figure — event numbers, degrees, indices. */
export function Fig({
  x, y, children, hue = "charcoal", size = 12, anchor = "middle", italic = false, weight = 400, opacity = 1,
}: { x: number; y: number; children: ReactNode; hue?: Hue; size?: number; anchor?: "start" | "middle" | "end"; italic?: boolean; weight?: number; opacity?: number }) {
  return (
    <text
      className="sf-gfig" x={x} y={y} textAnchor={anchor}
      style={{ fill: ink(hue), fontSize: size, fontStyle: italic ? "italic" : "normal", fontWeight: weight, opacity }}
      aria-hidden="true"
    >
      {children}
    </text>
  );
}

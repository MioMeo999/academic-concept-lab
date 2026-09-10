/**
 * Surface — expressive drawing components.
 *
 * Every mark here goes through `pencil()`, so a ring, an arrow, a stave line
 * and a note-head all arrive with the same grain: two or three passes, broken
 * where the tooth misses, pale on landing and firm through the middle. That
 * shared texture is what makes the page look drawn rather than illustrated.
 *
 * Everything composites with multiply, so crossing colours mix instead of
 * stacking, and every mark is inert and hidden from assistive technology.
 */

import type { ReactNode } from "react";
import { rng, type Pt } from "../_lib/pigment";
import {
  bowPts, burstPts, contourPts, headPts, pencil, ringPts, runPts, squigglePts, toPath,
  type PencilOptions,
} from "../_lib/pencil";
import { sweep } from "../_lib/draw-sweep";
import {
  barline, beam, contourThrough, flat, noteHead, sharp, slur, stave, stem, trebleClef,
} from "../_lib/music";
import type { Hue } from "./Pigment";

const ink = (h: Hue) => `var(--pg-${h})`;

/* --------------------------------------------------------------- pencil -- */

/**
 * The renderer every mark shares. Takes one or more point runs and lays them
 * down as pencil.
 */
export function Pencil({
  runs, hue = "graphite", seed = 1, passes = 3, drift = 1.1, broken = 0.3,
  weight = 1.4, opacity = 0.75, taper = true, keepFirst = false, dash, className,
}: {
  runs: Pt[][]; hue?: Hue; dash?: string; className?: string;
} & PencilOptions) {
  return (
    <g className={`sf-mark${className ? ` ${className}` : ""}`} style={{ color: ink(hue) }} aria-hidden="true">
      {runs.flatMap((run, i) =>
        pencil(run, { seed: seed + i * 97, passes, drift, broken, weight, opacity, taper, keepFirst })
          .map((p, j) => (
            <path key={`${i}-${j}`} d={p.d} stroke="currentColor" strokeWidth={p.w} strokeOpacity={p.o}
              strokeDasharray={dash} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          )),
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ field -- */

export type FieldProps = {
  x: number; y: number; w: number; h: number;
  hue: Hue; seed?: number;
  /** Patch count. Each patch is a short sweep over part of the field. */
  passes?: number;
  rows?: number; angle?: number; weight?: number; width?: number;
  taper?: number; bowAmt?: number; rotateSpread?: number;
};

/**
 * A loose colour mass. A hand does not shade a region in one traverse — it
 * works it in patches, each at its own slight angle, going back over the middle
 * more than the edges. One sweep across the field reads as a streak; a cluster
 * of overlapping short sweeps reads as shading.
 */
export function Field({
  x, y, w, h, hue, seed = 1, passes = 9, rows = 11, angle = -14,
  weight = 0.3, width = 1.45, taper = 0.3, bowAmt = 5, rotateSpread = 34,
}: FieldProps) {
  const r = rng(seed);
  return (
    <g className="sf-mark" transform={`translate(${x + w / 2} ${y + h / 2})`} style={{ color: ink(hue) }} aria-hidden="true">
      {Array.from({ length: passes }, (_, i) => {
        const bx = ((r() + r() + r()) / 3 - 0.5) * w * 0.92;
        const by = ((r() + r() + r()) / 3 - 0.5) * h * 0.88;
        const pw = w * (0.3 + r() * 0.26);
        const ph = h * (0.34 + r() * 0.3);
        const a = angle + (r() - 0.5) * rotateSpread;
        const dist = Math.min(1, Math.hypot(bx / (w / 2 || 1), by / (h / 2 || 1)));
        const o = weight * (0.42 + r() * 0.62) * (1 - dist * 0.45);
        return (
          <path key={i}
            d={sweep({
              w: pw, h: ph, rows: Math.max(4, Math.round(rows * (0.7 + r() * 0.7))),
              seed: seed + i * 137, amp: 1 + r() * 1.5, overshoot: 1.5 + r() * 4, bow: bowAmt, taper,
            })}
            transform={`translate(${bx.toFixed(1)} ${by.toFixed(1)}) rotate(${a.toFixed(1)})`}
            stroke="currentColor" strokeWidth={width * (0.75 + r() * 0.6)} strokeOpacity={o}
            fill="none" strokeLinecap="round" strokeLinejoin="round" />
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------- structure -- */

/** Two or three laps round something, never quite closing. */
export function Halo({
  cx, cy, rx, ry, hue = "vermilion", seed = 5, laps = 2, weight = 1.6, opacity = 0.7, rotate = 0, dash,
}: { cx: number; cy: number; rx: number; ry: number; hue?: Hue; seed?: number; laps?: number; weight?: number; opacity?: number; rotate?: number; dash?: string }) {
  return (
    <g transform={`translate(${cx} ${cy})${rotate ? ` rotate(${rotate})` : ""}`}>
      <Pencil runs={ringPts(rx, ry, seed, laps)} hue={hue} seed={seed} passes={2}
        broken={0.26} weight={weight} opacity={opacity} drift={0.9} dash={dash} />
    </g>
  );
}

/** A scribbled ball of loops — a term or a process with colour worked round it. */
export function Ball({
  cx, cy, rx, ry, hue, seed = 3, count = 9, weight = 1.4, opacity = 0.4, drift = 0.34,
}: { cx: number; cy: number; rx: number; ry: number; hue: Hue; seed?: number; count?: number; weight?: number; opacity?: number; drift?: number }) {
  const r = rng(seed);
  const runs: Pt[][] = [];
  for (let i = 0; i < count; i += 1) {
    const k = 0.42 + (i / Math.max(1, count - 1)) * 0.66 + (r() - 0.5) * 0.18;
    const lap = ringPts(rx * k * (1 + (r() - 0.5) * drift), ry * k * (1 + (r() - 0.5) * drift), seed + i * 41, 1, 0.14)[0];
    const ox = (r() - 0.5) * rx * drift * 0.8;
    const oy = (r() - 0.5) * ry * drift * 0.8;
    runs.push(lap.map(([x, y]) => [x + ox, y + oy] as Pt));
  }
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <Pencil runs={runs} hue={hue} seed={seed} passes={1} broken={0.2} weight={weight} opacity={opacity} taper />
    </g>
  );
}

/** A bowed arrow. */
export function Arrow({
  x1, y1, x2, y2, hue = "cobalt", bend = 0.2, seed = 7, weight = 2, opacity = 0.78, size = 10,
}: { x1: number; y1: number; x2: number; y2: number; hue?: Hue; bend?: number; seed?: number; weight?: number; opacity?: number; size?: number }) {
  const shaft = bowPts(x1, y1, x2, y2, bend, seed);
  return (
    <>
      <Pencil runs={[shaft]} hue={hue} seed={seed} passes={2} broken={0.18} weight={weight} opacity={opacity} keepFirst />
      <Pencil runs={headPts(shaft, size, seed)} hue={hue} seed={seed + 5} passes={2} broken={0}
        weight={weight * 1.05} opacity={opacity} taper={false} />
    </>
  );
}

/** A connection with no head — a relation, not a direction. */
export function Link({
  x1, y1, x2, y2, hue = "graphite", bend = 0.14, seed = 9, weight = 1.3, opacity = 0.5, dash,
}: { x1: number; y1: number; x2: number; y2: number; hue?: Hue; bend?: number; seed?: number; weight?: number; opacity?: number; dash?: string }) {
  return (
    <Pencil runs={[bowPts(x1, y1, x2, y2, bend, seed)]} hue={hue} seed={seed} passes={2}
      broken={0.24} weight={weight} opacity={opacity} dash={dash} />
  );
}

/** A straight-ish run: a registration line, a rule, a margin. */
export function Rule({
  x1, y1, x2, y2, hue = "warmgrey", seed = 3, weight = 1.1, opacity = 0.45, amp = 1.4, passes = 2,
}: { x1: number; y1: number; x2: number; y2: number; hue?: Hue; seed?: number; weight?: number; opacity?: number; amp?: number; passes?: number }) {
  return (
    <Pencil runs={[runPts(x1, y1, x2, y2, seed, amp)]} hue={hue} seed={seed} passes={passes}
      broken={0.3} weight={weight} opacity={opacity} />
  );
}

/** An irregular hand boundary round a region. */
export function Contour({
  points, hue = "graphite", seed = 29, weight = 1.4, opacity = 0.5, dash, wobble = 4,
}: { points: [number, number][]; hue?: Hue; seed?: number; weight?: number; opacity?: number; dash?: string; wobble?: number }) {
  return (
    <Pencil runs={[contourPts(points, seed, wobble)]} hue={hue} seed={seed} passes={2}
      broken={0.22} weight={weight} opacity={opacity} dash={dash} />
  );
}

export function Squiggle({
  x, y, len, hue = "graphite", seed = 31, cycles = 5, amp = 4, weight = 1.2, opacity = 0.5, rotate = 0,
}: { x: number; y: number; len: number; hue?: Hue; seed?: number; cycles?: number; amp?: number; weight?: number; opacity?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y})${rotate ? ` rotate(${rotate})` : ""}`}>
      <Pencil runs={[squigglePts(len, seed, cycles, amp)]} hue={hue} seed={seed} passes={2}
        broken={0.2} weight={weight} opacity={opacity} />
    </g>
  );
}

export function Burst({
  cx, cy, r = 16, hue = "vermilion", seed = 23, rays = 8, weight = 1.6, opacity = 0.8,
}: { cx: number; cy: number; r?: number; hue?: Hue; seed?: number; rays?: number; weight?: number; opacity?: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <Pencil runs={burstPts(r, seed, rays)} hue={hue} seed={seed} passes={2} broken={0}
        weight={weight} opacity={opacity} taper />
    </g>
  );
}

/* ---------------------------------------------------------------- music -- */

/**
 * A note. `pitch` is the y position; the caller decides what that means. A
 * filled head is scribbled in rather than solid, which is what a fast hand
 * actually leaves.
 */
export function NoteMark({
  x, y, hue = "charcoal", seed = 3, filled = true, stemDir, stemLen = 26,
  size = 1, weight = 1.5, opacity = 0.7,
}: { x: number; y: number; hue?: Hue; seed?: number; filled?: boolean; stemDir?: 1 | -1; stemLen?: number; size?: number; weight?: number; opacity?: number }) {
  const rx = 5.4 * size;
  const ry = 4 * size;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Pencil runs={noteHead(rx, ry, seed, filled)} hue={hue} seed={seed} passes={1}
        broken={0.12} weight={weight} opacity={opacity} taper={false} />
      {stemDir ? (
        <Pencil runs={[stem(rx, stemDir, stemLen, seed + 7)]} hue={hue} seed={seed + 7} passes={2}
          broken={0.15} weight={weight * 0.9} opacity={opacity * 0.9} />
      ) : null}
    </g>
  );
}

/** Five stave lines. Each is its own run, so they drift apart slightly. */
export function Stave({
  x1, x2, y, gap = 8, hue = "warmgrey", seed = 11, weight = 0.95, opacity = 0.42,
}: { x1: number; x2: number; y: number; gap?: number; hue?: Hue; seed?: number; weight?: number; opacity?: number }) {
  return (
    <Pencil runs={stave(x1, x2, y, gap, seed)} hue={hue} seed={seed} passes={1}
      broken={0.06} weight={weight} opacity={opacity} keepFirst />
  );
}

export function Clef({
  x, y, gap = 8, hue = "graphite", seed = 17, weight = 1.5, opacity = 0.62,
}: { x: number; y: number; gap?: number; hue?: Hue; seed?: number; weight?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Pencil runs={[trebleClef(gap, seed)]} hue={hue} seed={seed} passes={2}
        broken={0.14} weight={weight} opacity={opacity} keepFirst />
    </g>
  );
}

export function Barline({
  x, y, gap = 8, hue = "warmgrey", seed = 13, weight = 1.1, opacity = 0.45,
}: { x: number; y: number; gap?: number; hue?: Hue; seed?: number; weight?: number; opacity?: number }) {
  return <Pencil runs={[barline(x, y, gap, seed)]} hue={hue} seed={seed} passes={2} broken={0.1} weight={weight} opacity={opacity} />;
}

export function Accidental({
  x, y, kind = "sharp", hue = "graphite", seed = 19, weight = 1.3, opacity = 0.65, size = 1,
}: { x: number; y: number; kind?: "sharp" | "flat"; hue?: Hue; seed?: number; weight?: number; opacity?: number; size?: number }) {
  const runs = kind === "sharp" ? sharp(14 * size, seed) : [flat(16 * size, seed)];
  return (
    <g transform={`translate(${x} ${y})`}>
      <Pencil runs={runs} hue={hue} seed={seed} passes={1} broken={0.1} weight={weight} opacity={opacity} taper={false} />
    </g>
  );
}

/** A beam joining two stem ends. */
export function Beam({
  x1, y1, x2, y2, hue = "charcoal", seed = 7, weight = 1.8, opacity = 0.62,
}: { x1: number; y1: number; x2: number; y2: number; hue?: Hue; seed?: number; weight?: number; opacity?: number }) {
  return <Pencil runs={beam(x1, y1, x2, y2, seed)} hue={hue} seed={seed} passes={1} broken={0.08} weight={weight} opacity={opacity} taper={false} />;
}

/** A slur arching over a span — the mark for "these belong together". */
export function Slur({
  x1, x2, y, depth = 14, hue = "graphite", seed = 29, weight = 1.4, opacity = 0.6,
}: { x1: number; x2: number; y: number; depth?: number; hue?: Hue; seed?: number; weight?: number; opacity?: number }) {
  return (
    <Pencil runs={[slur(x1, x2, y, depth, seed)]} hue={hue} seed={seed} passes={3}
      broken={0.1} drift={0.85} weight={weight} opacity={opacity} keepFirst />
  );
}

/** The line a listener would trace over a melody. */
export function Contourline({
  points, hue = "cobalt", seed = 33, weight = 1.5, opacity = 0.6, lift = 12, dash,
}: { points: [number, number][]; hue?: Hue; seed?: number; weight?: number; opacity?: number; lift?: number; dash?: string }) {
  return <Pencil runs={[contourThrough(points, lift)]} hue={hue} seed={seed} passes={2} broken={0.22} weight={weight} opacity={opacity} dash={dash} />;
}

/* ------------------------------------------------------------ construction -- */

/** Setting-out lines left visible. Graphite, very light, never colour. */
export function Ghost({
  x, y, w, h, seed = 17, count = 4, opacity = 0.11,
}: { x: number; y: number; w: number; h: number; seed?: number; count?: number; opacity?: number }) {
  const r = rng(seed);
  const runs: Pt[][] = Array.from({ length: count }, (_, i) => {
    const vertical = r() > 0.55;
    const p = (r() - 0.5) * (vertical ? w : h);
    const ext = 0.6 + r() * 0.75;
    return vertical
      ? runPts(p, (-h / 2) * ext, p, (h / 2) * ext, seed + i * 13, 1)
      : runPts((-w / 2) * ext, p, (w / 2) * ext, p, seed + i * 13, 1);
  });
  return (
    <g transform={`translate(${x + w / 2} ${y + h / 2})`}>
      <Pencil runs={runs} hue="graphite" seed={seed} passes={1} broken={0.45} weight={0.8} opacity={opacity} />
    </g>
  );
}

/** A mark partly rubbed out. Says a reading was revised, never that it was wrong. */
export function Lifted({
  x, y, w, h, hue = "graphite", seed = 19,
}: { x: number; y: number; w: number; h: number; hue?: Hue; seed?: number }) {
  const r = rng(seed);
  const frags: Pt[][] = Array.from({ length: 9 }, (_, i) => {
    const fx = (r() - 0.5) * w;
    const fy = (r() - 0.5) * h;
    const len = 5 + r() * 18;
    const a = r() * Math.PI;
    return runPts(fx, fy, fx + Math.cos(a) * len, fy + Math.sin(a) * len, seed + i * 7, 1.2);
  });
  return (
    <g transform={`translate(${x + w / 2} ${y + h / 2})`}>
      <path d={toPath(runPts(-w * 0.55, 0, w * 0.55, 2, seed + 91, 5))} stroke={ink(hue)}
        strokeWidth={9} strokeOpacity={0.05} fill="none" strokeLinecap="round"
        className="sf-mark" aria-hidden="true" />
      <Pencil runs={frags} hue={hue} seed={seed} passes={1} broken={0.5} weight={1.2} opacity={0.28} />
    </g>
  );
}

/** A marker band. Always behind type, always overshooting the word. */
export function Marker({
  x, y, w, h, hue = "lemon", seed = 13, opacity = 0.34, passes = 3,
}: { x: number; y: number; w: number; h: number; hue?: Hue; seed?: number; opacity?: number; passes?: number }) {
  const r = rng(seed);
  return (
    <g className="sf-mark" transform={`translate(${x + w / 2} ${y + h / 2})`} style={{ color: ink(hue) }} aria-hidden="true">
      {Array.from({ length: passes }, (_, i) => {
        const ly = -h / 2 + ((i + 0.5) / passes) * h + (r() - 0.5) * 1.6;
        const over = 3 + r() * 7;
        return (
          <path key={i} d={toPath(runPts(-w / 2 - over, ly, w / 2 + over, ly + (r() - 0.5) * 2, seed + i * 17, 2.2))}
            stroke="currentColor" strokeWidth={h / passes + 2.5}
            strokeOpacity={opacity * (i === 1 ? 1.15 : 0.9)} fill="none" strokeLinecap="round" />
        );
      })}
    </g>
  );
}

/* -------------------------------------------------------------- lettering -- */

/** A note in the hand. Used freely — the researcher is talking. */
export function Note({
  x, y, children, hue = "graphite", size = 17, rotate = 0, anchor = "start", lh = 1.02,
}: { x: number; y: number; children: string; hue?: Hue; size?: number; rotate?: number; anchor?: "start" | "middle" | "end"; lh?: number }) {
  const lines = children.split("\n");
  return (
    <text className="sf-hand" x={x} y={y} textAnchor={anchor}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{ fill: ink(hue), fontSize: size }} aria-hidden="true">
      {lines.map((l, i) => (<tspan key={i} x={x} dy={i === 0 ? 0 : size * lh}>{l}</tspan>))}
    </text>
  );
}

/** A term set in the scholarly face, sitting inside a drawn ring. */
export function Term({
  x, y, children, size = 15, hue = "charcoal", anchor = "middle", italic = false, weight = 500,
}: { x: number; y: number; children: ReactNode; size?: number; hue?: Hue; anchor?: "start" | "middle" | "end"; italic?: boolean; weight?: number }) {
  return (
    <text className="sf-gfig" x={x} y={y} textAnchor={anchor}
      style={{ fill: ink(hue), fontSize: size, fontStyle: italic ? "italic" : "normal", fontWeight: weight }}
      aria-hidden="true">{children}</text>
  );
}

/** Small caps machinery inside a drawing. */
export function Tag({
  x, y, children, hue = "warmgrey", size = 8.5, anchor = "start", rotate = 0,
}: { x: number; y: number; children: ReactNode; hue?: Hue; size?: number; anchor?: "start" | "middle" | "end"; rotate?: number }) {
  return (
    <text className="sf-glabel" x={x} y={y} textAnchor={anchor}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{ fill: ink(hue), fontSize: size }} aria-hidden="true">{children}</text>
  );
}

/* ---------------------------------------------------------------------------
   MARK LIBRARY — Perceptual Field

   Every mark on this page is drawn, not styled. Borders, rules, brackets,
   emphasis and colour fields are all strokes with pressure, wobble and
   overshoot, because a page about how perception builds structure should not
   pretend its own structure was machine-issued.

   All jitter is seeded, so the server and the client draw the identical
   stroke and hydration is silent.
   ------------------------------------------------------------------------- */

import type { CSSProperties, ReactNode } from "react";

/* ---------------------------------------------------------------- randomness */

export function rng(seed: number) {
  let s = (seed * 2654435761) >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** signed jitter in [-a, a] */
const j = (r: () => number, a: number) => (r() * 2 - 1) * a;

const n2 = (v: number) => Math.round(v * 100) / 100;

/* ------------------------------------------------------------------ palette */

export const INK = {
  cobalt: "#1F5FCC",
  sky: "#4FA3E3",
  teal: "#1FA898",
  emerald: "#1F8A4C",
  ochre: "#E0A02A",
  lemon: "#F2C230",
  vermilion: "#D9401F",
  coral: "#E8695C",
  magenta: "#C81E76",
  violet: "#6B3FBF",
  lilac: "#9B85D9",
  graphite: "#4A4A4A",
  charcoal: "#1C1C1C",
  ghost: "#B9B9B9",
} as const;

export type InkName = keyof typeof INK;

/** The record stores colours as CSS custom properties from another stylesheet.
    This page owns its own pigments, so record colours are mapped across once. */
export function pigment(recordColour: string): string {
  const map: Record<string, string> = {
    "var(--teal)": INK.teal,
    "var(--red)": INK.vermilion,
    "var(--gold-deep)": INK.ochre,
    "var(--plum-deep)": INK.violet,
    "var(--pen-3)": INK.cobalt,
  };
  return map[recordColour] ?? INK.graphite;
}

/* -------------------------------------------------------------- wobble path */

/** A straight run from a→b, but drawn by a hand: subdivided and displaced. */
export function handLine(
  x1: number, y1: number, x2: number, y2: number,
  r: () => number, wobble = 1, steps = 6,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  let d = `M ${n2(x1 + j(r, wobble * 0.5))} ${n2(y1 + j(r, wobble * 0.5))}`;
  for (let i = 1; i <= steps; i += 1) {
    const t = i / steps;
    // pressure bows the middle of a stroke more than its ends
    const bow = Math.sin(t * Math.PI);
    const off = j(r, wobble) * (0.35 + bow);
    const px = x1 + dx * t + nx * off;
    const py = y1 + dy * t + ny * off;
    const ct = t - 0.5 / steps;
    const cbow = Math.sin(ct * Math.PI);
    const coff = j(r, wobble) * (0.35 + cbow);
    const cx = x1 + dx * ct + nx * coff;
    const cy = y1 + dy * ct + ny * coff;
    d += ` Q ${n2(cx)} ${n2(cy)} ${n2(px)} ${n2(py)}`;
  }
  return d;
}

/* -------------------------------------------------------------------- hatch */

type HatchProps = {
  width: number;
  height: number;
  colour?: string;
  angle?: number;
  gap?: number;
  seed?: number;
  opacity?: number;
  passes?: number;
  weight?: number;
  className?: string;
  style?: CSSProperties;
};

/** Coloured-pencil hatching: parallel strokes with tooth, not a flat fill.
    Stroke opacity varies per line so the field reads as deposited pigment. */
export function Hatch({
  width, height, colour = INK.graphite, angle = -34, gap = 3.4,
  seed = 1, opacity = 0.55, passes = 1, weight = 1, className, style,
}: HatchProps) {
  const r = rng(seed);
  const id = `h${seed}-${Math.round(width)}-${Math.round(height)}`;
  const diag = Math.hypot(width, height);
  const strokes: ReactNode[] = [];
  for (let p = 0; p < passes; p += 1) {
    const a = angle + (p === 0 ? 0 : 58 + j(r, 10));
    const rad = (a * Math.PI) / 180;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    const nx = -dy;
    const ny = dx;
    const cx = width / 2;
    const cy = height / 2;
    const count = Math.ceil(diag / gap) + 2;
    for (let i = -count / 2; i < count / 2; i += 1) {
      const off = i * gap + j(r, gap * 0.28);
      // strokes stop short of the full diagonal, at both ends, unevenly
      const half = diag / 2 - Math.abs(j(r, diag * 0.12));
      const bx = cx + nx * off;
      const by = cy + ny * off;
      const x1 = bx - dx * half;
      const y1 = by - dy * half;
      const x2 = bx + dx * half;
      const y2 = by + dy * half;
      strokes.push(
        <path
          key={`${p}-${i}`}
          d={handLine(x1, y1, x2, y2, r, 0.7, 3)}
          stroke={colour}
          strokeWidth={n2((0.55 + r() * 0.65) * weight)}
          strokeOpacity={n2(0.22 + r() * 0.5)}
          strokeLinecap="round"
          fill="none"
        />,
      );
    }
  }
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={width} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`} opacity={opacity}>{strokes}</g>
    </svg>
  );
}

/* ------------------------------------------------------------------ scumble */

type ScumbleProps = {
  width: number;
  height: number;
  colour?: string;
  seed?: number;
  opacity?: number;
  loops?: number;
  className?: string;
  style?: CSSProperties;
};

/** A broken, circling tone — the mark you make when you are thinking, not
    filling. Used for pigment clouds and gravitational centres. */
export function Scumble({
  width, height, colour = INK.graphite, seed = 2, opacity = 0.5, loops = 26,
  className, style,
}: ScumbleProps) {
  const r = rng(seed);
  const cx = width / 2;
  const cy = height / 2;
  const paths: ReactNode[] = [];
  for (let i = 0; i < loops; i += 1) {
    const t = i / loops;
    const rx = (width / 2) * (0.18 + t * 0.86) * (0.85 + r() * 0.3);
    const ry = (height / 2) * (0.18 + t * 0.86) * (0.85 + r() * 0.3);
    const rot = r() * 360;
    const ox = j(r, width * 0.06);
    const oy = j(r, height * 0.06);
    const steps = 14;
    let d = "";
    const start = r() * Math.PI * 2;
    const sweep = Math.PI * (1.4 + r() * 1.1);
    for (let s = 0; s <= steps; s += 1) {
      const a = start + (sweep * s) / steps;
      const wob = 1 + j(r, 0.09);
      const x = cx + ox + Math.cos(a) * rx * wob;
      const y = cy + oy + Math.sin(a) * ry * wob;
      d += `${s === 0 ? "M" : "L"} ${n2(x)} ${n2(y)} `;
    }
    paths.push(
      <path
        key={i}
        d={d}
        transform={`rotate(${n2(rot)} ${n2(cx)} ${n2(cy)})`}
        stroke={colour}
        strokeWidth={n2(0.5 + r() * 0.7)}
        strokeOpacity={n2(0.16 + r() * 0.34)}
        strokeLinecap="round"
        fill="none"
      />,
    );
  }
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
    >
      <g opacity={opacity}>{paths}</g>
    </svg>
  );
}

/* ----------------------------------------------------------------- brackets */

type BracketProps = {
  width: number;
  height?: number;
  colour?: string;
  seed?: number;
  facing?: "down" | "up";
  weight?: number;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
};

/** A horizontal square bracket: the mark that claims a span of events as one
    group. The single most important mark on this page. */
export function SpanBracket({
  width, height = 12, colour = INK.graphite, seed = 3,
  facing = "down", weight = 1.7, opacity = 1, className, style,
}: BracketProps) {
  const r = rng(seed);
  const h = height;
  const yBar = facing === "down" ? 1.5 : h - 1.5;
  const yTip = facing === "down" ? h : 0;
  const inset = 1.2;
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={h}
      viewBox={`0 0 ${width} ${h}`}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <g stroke={colour} strokeWidth={weight} strokeLinecap="round" fill="none" opacity={opacity}>
        <path d={handLine(inset, yBar, width - inset, yBar, r, 0.85, 8)} />
        <path d={handLine(inset + j(r, 0.6), yBar, inset + j(r, 0.6), yTip, r, 0.5, 2)} />
        <path d={handLine(width - inset + j(r, 0.6), yBar, width - inset + j(r, 0.6), yTip, r, 0.5, 2)} />
      </g>
    </svg>
  );
}

/** A curly brace, drawn vertically. Groups stacked things. */
export function Brace({
  height, width = 14, colour = INK.graphite, seed = 4, weight = 1.5,
  className, style,
}: { height: number; width?: number; colour?: string; seed?: number; weight?: number; className?: string; style?: CSSProperties }) {
  const r = rng(seed);
  const w = width;
  const h = height;
  const mid = h / 2;
  const d =
    `M ${n2(w - 1.5 + j(r, 0.5))} 1.5 ` +
    `Q ${n2(w * 0.34)} ${n2(h * 0.06)} ${n2(w * 0.42 + j(r, 0.6))} ${n2(mid - h * 0.12)} ` +
    `Q ${n2(w * 0.44)} ${n2(mid - 2)} ${n2(1.5)} ${n2(mid)} ` +
    `Q ${n2(w * 0.44)} ${n2(mid + 2)} ${n2(w * 0.42 + j(r, 0.6))} ${n2(mid + h * 0.12)} ` +
    `Q ${n2(w * 0.34)} ${n2(h * 0.94)} ${n2(w - 1.5 + j(r, 0.5))} ${n2(h - 1.5)}`;
  return (
    <svg className={className} style={style} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      <path d={d} stroke={colour} strokeWidth={weight} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ------------------------------------------------------------ rings & rules */

/** Double-pass ellipse. Two passes because one is never enough by hand. */
export function Ring({
  width, height, colour = INK.vermilion, seed = 5, passes = 2, weight = 1.6,
  opacity = 1, className, style,
}: { width: number; height: number; colour?: string; seed?: number; passes?: number; weight?: number; opacity?: number; className?: string; style?: CSSProperties }) {
  const r = rng(seed);
  const cx = width / 2;
  const cy = height / 2;
  const out: ReactNode[] = [];
  for (let p = 0; p < passes; p += 1) {
    const rx = width / 2 - 2 + j(r, 1.6);
    const ry = height / 2 - 2 + j(r, 1.6);
    const steps = 26;
    const start = r() * Math.PI * 2;
    const sweep = Math.PI * 2 * (1.0 + r() * 0.13);
    let d = "";
    for (let s = 0; s <= steps; s += 1) {
      const a = start + (sweep * s) / steps;
      const wob = 1 + Math.sin(a * 3 + p) * 0.035 + j(r, 0.028);
      const x = cx + Math.cos(a) * rx * wob;
      const y = cy + Math.sin(a) * ry * wob;
      d += `${s === 0 ? "M" : "L"} ${n2(x)} ${n2(y)} `;
    }
    out.push(
      <path key={p} d={d} stroke={colour} strokeWidth={n2(weight * (0.75 + r() * 0.5))}
        strokeOpacity={n2(0.5 + r() * 0.45)} strokeLinecap="round" fill="none" />,
    );
  }
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <g opacity={opacity}>{out}</g>
    </svg>
  );
}

/** A ruled line drawn by hand. Replaces every border-top on the page. */
export function Rule({
  width, colour = INK.charcoal, seed = 6, weight = 1, opacity = 0.5,
  className, style,
}: { width: number; colour?: string; seed?: number; weight?: number; opacity?: number; className?: string; style?: CSSProperties }) {
  const r = rng(seed);
  return (
    <svg className={className} style={style} width={width} height={4}
      viewBox={`0 0 ${width} 4`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path d={handLine(0.5, 2, width - 0.5, 2, r, 0.55, 10)} stroke={colour}
        strokeWidth={weight} strokeOpacity={opacity} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* --------------------------------------------------------- emphasis marks */

/** Cross-out. Used on claims the record explicitly rejects. */
export function Strike({
  width, height = 20, colour = INK.vermilion, seed = 7, weight = 1.6,
  className, style,
}: { width: number; height?: number; colour?: string; seed?: number; weight?: number; className?: string; style?: CSSProperties }) {
  const r = rng(seed);
  const y = height / 2;
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path d={handLine(1, y + j(r, 1.6), width - 1, y + j(r, 1.6), r, 1.1, 9)}
        stroke={colour} strokeWidth={weight} strokeOpacity={0.85} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Wavy underline — provisional, a working hypothesis. */
export function Wave({
  width, colour = INK.cobalt, seed = 8, amp = 1.9, weight = 1.3,
  className, style,
}: { width: number; colour?: string; seed?: number; amp?: number; weight?: number; className?: string; style?: CSSProperties }) {
  const r = rng(seed);
  const h = amp * 2 + 4;
  const mid = h / 2;
  const period = 9 + r() * 3;
  let d = `M 1 ${n2(mid)}`;
  for (let x = 1; x < width - 1; x += period) {
    const half = period / 2;
    d += ` Q ${n2(x + half / 2)} ${n2(mid - amp - j(r, 0.5))} ${n2(x + half)} ${n2(mid)}`;
    d += ` Q ${n2(x + half * 1.5)} ${n2(mid + amp + j(r, 0.5))} ${n2(Math.min(x + period, width - 1))} ${n2(mid)}`;
  }
  return (
    <svg className={className} style={style} width={width} height={h}
      viewBox={`0 0 ${width} ${h}`} aria-hidden="true" focusable="false">
      <path d={d} stroke={colour} strokeWidth={weight} strokeOpacity={0.8} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Highlighter swipe — a wax pass, not a rectangle. */
export function Swipe({
  width, height = 16, colour = INK.lemon, seed = 9, opacity = 0.42,
  className, style,
}: { width: number; height?: number; colour?: string; seed?: number; opacity?: number; className?: string; style?: CSSProperties }) {
  const r = rng(seed);
  const bands: ReactNode[] = [];
  const rows = Math.max(2, Math.round(height / 4));
  for (let i = 0; i < rows; i += 1) {
    const y = 2 + (i * (height - 4)) / Math.max(1, rows - 1);
    const x1 = 1 + Math.abs(j(r, 4));
    const x2 = width - 1 - Math.abs(j(r, 6));
    bands.push(
      <path key={i} d={handLine(x1, y, x2, y, r, 0.9, 5)} stroke={colour}
        strokeWidth={n2(height / rows + 1.4)} strokeOpacity={n2(0.5 + r() * 0.45)}
        strokeLinecap="round" fill="none" />,
    );
  }
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <g opacity={opacity}>{bands}</g>
    </svg>
  );
}

/* -------------------------------------------------------------- connectors */

/** Curved arrow. `bow` is the sideways displacement of the midpoint. */
export function Arrow({
  x1, y1, x2, y2, bow = 18, colour = INK.charcoal, seed = 10, weight = 1.4,
  dashed = false, head = true, width, height, className, style,
}: {
  x1: number; y1: number; x2: number; y2: number; bow?: number;
  colour?: string; seed?: number; weight?: number; dashed?: boolean; head?: boolean;
  width: number; height: number; className?: string; style?: CSSProperties;
}) {
  const r = rng(seed);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow;
  const d = `M ${n2(x1)} ${n2(y1)} Q ${n2(cx)} ${n2(cy)} ${n2(x2)} ${n2(y2)}`;
  // head angle follows the tangent at the end of the quadratic
  const tx = x2 - cx;
  const ty = y2 - cy;
  const ta = Math.atan2(ty, tx);
  const hl = 7.5;
  const spread = 0.42;
  const h1x = x2 - Math.cos(ta - spread) * hl;
  const h1y = y2 - Math.sin(ta - spread) * hl;
  const h2x = x2 - Math.cos(ta + spread) * hl;
  const h2y = y2 - Math.sin(ta + spread) * hl;
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
      <g stroke={colour} strokeWidth={weight} strokeLinecap="round" fill="none" strokeOpacity={0.85}>
        <path d={d} strokeDasharray={dashed ? "5 4" : undefined} />
        {head ? (
          <>
            <path d={handLine(h1x, h1y, x2, y2, r, 0.4, 2)} />
            <path d={handLine(h2x, h2y, x2, y2, r, 0.4, 2)} />
          </>
        ) : null}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------- boundaries */

/** A permeable boundary — dashed, drawn twice, deliberately not a wall. */
export function OpenBoundary({
  width, height, colour = INK.cobalt, seed = 11, opacity = 0.75,
  className, style,
}: { width: number; height: number; colour?: string; seed?: number; opacity?: number; className?: string; style?: CSSProperties }) {
  const r = rng(seed);
  const cx = width / 2;
  const cy = height / 2;
  const paths: ReactNode[] = [];
  for (let p = 0; p < 2; p += 1) {
    const rx = width / 2 - 4 - p * 2.5 + j(r, 2);
    const ry = height / 2 - 4 - p * 2.5 + j(r, 2);
    const steps = 40;
    let d = "";
    for (let s = 0; s <= steps; s += 1) {
      const a = (Math.PI * 2 * s) / steps;
      const wob = 1 + Math.sin(a * 2.7 + p * 1.4) * 0.045;
      d += `${s === 0 ? "M" : "L"} ${n2(cx + Math.cos(a) * rx * wob)} ${n2(cy + Math.sin(a) * ry * wob)} `;
    }
    paths.push(
      <path key={p} d={d} stroke={colour} strokeWidth={p === 0 ? 1.5 : 0.9}
        strokeOpacity={p === 0 ? 0.9 : 0.4} strokeDasharray={p === 0 ? "7 5" : "3 6"}
        strokeLinecap="round" fill="none" />,
    );
  }
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <g opacity={opacity}>{paths}</g>
    </svg>
  );
}

/** Ghost construction — the guide line you draw first and never erase. */
export function Ghost({
  width, height, seed = 12, colour = INK.ghost, className, style,
}: { width: number; height: number; seed?: number; colour?: string; className?: string; style?: CSSProperties }) {
  const r = rng(seed);
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <g stroke={colour} strokeWidth={0.85} strokeOpacity={0.62} fill="none"
        strokeLinecap="round" strokeDasharray="4 5">
        <path d={handLine(2, 2, width - 2, 2, r, 0.6, 4)} />
        <path d={handLine(width - 2, 2, width - 2, height - 2, r, 0.6, 4)} />
        <path d={handLine(width - 2, height - 2, 2, height - 2, r, 0.6, 4)} />
        <path d={handLine(2, height - 2, 2, 2, r, 0.6, 4)} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------- grain */

/** Paper tooth. Almost invisible, and the page is wrong without it. */
export function Grain() {
  return (
    <svg className="pf-grain" aria-hidden="true" focusable="false">
      <filter id="pf-tooth">
        <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#pf-tooth)" />
    </svg>
  );
}

/* ------------------------------------------------------------ event glyphs */

/** One sound event, as deposited pigment rather than a UI dot. Circled over
    and over until the centre is dense and the edge stays open — the way you
    actually mark a point on paper when you mean it. */
export function EventMark({
  size = 26, colour = INK.graphite, seed = 13, filled = true, dim = false,
}: { size?: number; colour?: string; seed?: number; filled?: boolean; dim?: boolean }) {
  const r = rng(seed);
  const c = size / 2;
  const rings: ReactNode[] = [];
  const passes = filled ? 9 : 3;
  const maxR = size / 2 - 1.6;
  for (let p = 0; p < passes; p += 1) {
    const t = p / Math.max(1, passes - 1);
    const rad = filled ? maxR * (0.1 + t * 0.9) : maxR * (0.96 - p * 0.07);
    const steps = 20;
    let d = "";
    const start = r() * 6.28;
    for (let s = 0; s <= steps; s += 1) {
      const a = start + (6.28 * 1.08 * s) / steps;
      const wob = 1 + Math.sin(a * 3 + p) * 0.07 + j(r, 0.05);
      d += `${s === 0 ? "M" : "L"} ${n2(c + Math.cos(a) * rad * wob)} ${n2(c + Math.sin(a) * rad * wob)} `;
    }
    // inner passes carry the weight, the outermost stays light and open
    const heft = 1 - t * 0.55;
    rings.push(
      <path key={p} d={d} stroke={colour} strokeWidth={n2(1.15 + r() * 0.75)}
        strokeOpacity={n2((dim ? 0.13 : 0.5) * heft + r() * (dim ? 0.08 : 0.36) * heft)}
        strokeLinecap="round" fill="none" />,
    );
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
      {filled ? <circle cx={c} cy={c} r={maxR * 0.26} fill={colour} fillOpacity={dim ? 0.18 : 0.72} /> : null}
      {rings}
    </svg>
  );
}

/* --------------------------------------------------------------- pigment */

/** A soft pigment mass — the wash that sits behind an idea and gives the
    white sheet somewhere to push against. Scumble, then blur, so it stays a
    deposit of colour rather than a gradient. */
export function Wash({
  width, height, colour = INK.teal, seed = 30, opacity = 0.2, loops = 30,
  blur = 16, className, style,
}: {
  width: number; height: number; colour?: string; seed?: number;
  opacity?: number; loops?: number; blur?: number; className?: string; style?: CSSProperties;
}) {
  const r = rng(seed);
  const cx = width / 2;
  const cy = height / 2;
  const id = `w${seed}`;
  const paths: ReactNode[] = [];
  // The mass is kept well inside the box: an SVG root clips at its viewBox, so
  // a blur that reaches the edge leaves a hard rectangle instead of a wash.
  for (let i = 0; i < loops; i += 1) {
    const t = i / loops;
    const rx = (width / 2) * (0.1 + t * 0.42) * (0.8 + r() * 0.4);
    const ry = (height / 2) * (0.1 + t * 0.42) * (0.8 + r() * 0.4);
    const ox = j(r, width * 0.075);
    const oy = j(r, height * 0.075);
    const steps = 16;
    let d = "";
    const start = r() * 6.28;
    for (let s = 0; s <= steps; s += 1) {
      const a = start + (6.28 * (0.7 + r() * 0.5) * s) / steps;
      const wob = 1 + j(r, 0.1);
      d += `${s === 0 ? "M" : "L"} ${n2(cx + ox + Math.cos(a) * rx * wob)} ${n2(cy + oy + Math.sin(a) * ry * wob)} `;
    }
    paths.push(
      <path key={i} d={d} stroke={colour} strokeWidth={n2(4 + r() * 9)}
        strokeOpacity={n2(0.2 + r() * 0.4)} strokeLinecap="round" fill="none" />,
    );
  }
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <defs>
        <filter id={id} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>
      <g opacity={opacity} filter={`url(#${id})`}>{paths}</g>
    </svg>
  );
}

/* --------------------------------------------------------- layout helpers */

/** A drawn rule that stretches to its container. */
export function FlexRule({ colour = INK.charcoal, seed = 20, opacity = 0.42, weight = 1 }:
{ colour?: string; seed?: number; opacity?: number; weight?: number }) {
  return <Rule width={600} colour={colour} seed={seed} opacity={opacity} weight={weight}
    style={{ width: "100%", height: 4, display: "block" }} />;
}

export function MarginNote({ children, colour = INK.cobalt, style }:
{ children: ReactNode; colour?: string; style?: CSSProperties }) {
  return <p className="pf-hand" style={{ color: colour, ...style }}>{children}</p>;
}

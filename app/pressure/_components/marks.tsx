/* ---------------------------------------------------------------------------
   MARK LIBRARY — Pressure

   One hand, two compositions. Every mark on these pages is a drawn stroke:
   subdivided, displaced, deposited with uneven pressure. Nothing is a CSS
   border pretending to be a drawing, and nothing is an illustration pasted
   onto a layout.

   All jitter is seeded, so server and client draw the identical stroke and
   hydration stays silent.

   The grammar is shared with earlier explorations (a stroke is a stroke);
   the vocabulary here adds what this hypothesis needs: mass, contour, hinge
   and band — the primitives of attraction and of time.
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

/* The pencil box. Pigments are shared across Concept Lab explorations so a
   page drawn today and a page drawn next year read as the same hand. */
export const INK = {
  cobalt: "#1F5FCC",
  sky: "#287FB8",
  teal: "#16786E",
  emerald: "#187340",
  ochre: "#9C6500",
  lemon: "#F2C230",
  vermilion: "#B7371F",
  coral: "#AA4D42",
  magenta: "#A91C68",
  violet: "#5E369E",
  lilac: "#7560B0",
  graphite: "#4A4A4A",
  charcoal: "#1C1C1C",
  ghost: "#B9B9B9",
} as const;

export type InkName = keyof typeof INK;

/* -------------------------------------------------------------- wobble path */

/** A straight run from a→b, drawn by a hand: subdivided and displaced, with
    the middle of the stroke bowing more than its ends. */
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

/* --------------------------------------------------------------- base marks */

type StrokeBox = { className?: string; style?: CSSProperties };

/** Coloured-pencil hatching: parallel strokes with tooth. Opacity varies per
    stroke so the field reads as deposited pigment, not a flat fill. */
export function Hatch({
  width, height, colour = INK.graphite, angle = -34, gap = 3.4,
  seed = 1, opacity = 0.55, weight = 1, className, style,
}: {
  width: number; height: number; colour?: string; angle?: number; gap?: number;
  seed?: number; opacity?: number; weight?: number;
} & StrokeBox) {
  const r = rng(seed);
  const id = `h${seed}-${Math.round(width)}-${Math.round(height)}`;
  const diag = Math.hypot(width, height);
  const strokes: ReactNode[] = [];
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  const nx = -dy;
  const ny = dx;
  const cx = width / 2;
  const cy = height / 2;
  const count = Math.ceil(diag / gap) + 2;
  for (let i = -count / 2; i < count / 2; i += 1) {
    const off = i * gap + j(r, gap * 0.28);
    const half = diag / 2 - Math.abs(j(r, diag * 0.12));
    const bx = cx + nx * off;
    const by = cy + ny * off;
    strokes.push(
      <path
        key={i}
        d={handLine(bx - dx * half, by - dy * half, bx + dx * half, by + dy * half, r, 0.7, 3)}
        stroke={colour}
        strokeWidth={n2((0.55 + r() * 0.65) * weight)}
        strokeOpacity={n2(0.22 + r() * 0.5)}
        strokeLinecap="round"
        fill="none"
      />,
    );
  }
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={id}><rect x="0" y="0" width={width} height={height} /></clipPath>
      </defs>
      <g clipPath={`url(#${id})`} opacity={opacity}>{strokes}</g>
    </svg>
  );
}

/** A ruled line drawn by hand. Replaces borders. */
export function Rule({
  width, colour = INK.charcoal, seed = 6, weight = 1, opacity = 0.5, className, style,
}: {
  width: number; colour?: string; seed?: number; weight?: number; opacity?: number;
} & StrokeBox) {
  const r = rng(seed);
  return (
    <svg className={className} style={style} width={width} height={4}
      viewBox={`0 0 ${width} 4`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path d={handLine(0.5, 2, width - 0.5, 2, r, 0.55, 10)} stroke={colour}
        strokeWidth={weight} strokeOpacity={opacity} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Curved arrow. `bow` is the sideways displacement of the midpoint. */
export function Arrow({
  x1, y1, x2, y2, bow = 18, colour = INK.charcoal, seed = 10, weight = 1.4,
  dashed = false, width, height, className, style,
}: {
  x1: number; y1: number; x2: number; y2: number; bow?: number;
  colour?: string; seed?: number; weight?: number; dashed?: boolean;
  width: number; height: number;
} & StrokeBox) {
  const r = rng(seed);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow;
  const d = `M ${n2(x1)} ${n2(y1)} Q ${n2(cx)} ${n2(cy)} ${n2(x2)} ${n2(y2)}`;
  const tx = x2 - cx;
  const ty = y2 - cy;
  const ta = Math.atan2(ty, tx);
  const hl = 7.5;
  const spread = 0.42;
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
      <g stroke={colour} strokeWidth={weight} strokeLinecap="round" fill="none" strokeOpacity={0.85}>
        <path d={d} strokeDasharray={dashed ? "5 4" : undefined} />
        <path d={handLine(x2 - Math.cos(ta - spread) * hl, y2 - Math.sin(ta - spread) * hl, x2, y2, r, 0.4, 2)} />
        <path d={handLine(x2 - Math.cos(ta + spread) * hl, y2 - Math.sin(ta + spread) * hl, x2, y2, r, 0.4, 2)} />
      </g>
    </svg>
  );
}

/** Double-pass ellipse: one pass is never enough by hand. */
export function Ring({
  width, height, colour = INK.vermilion, seed = 5, weight = 1.6,
  opacity = 1, className, style,
}: {
  width: number; height: number; colour?: string; seed?: number;
  weight?: number; opacity?: number;
} & StrokeBox) {
  const r = rng(seed);
  const cx = width / 2;
  const cy = height / 2;
  const out: ReactNode[] = [];
  for (let p = 0; p < 2; p += 1) {
    const rx = width / 2 - 2 + j(r, 1.6);
    const ry = height / 2 - 2 + j(r, 1.6);
    const steps = 26;
    const start = r() * Math.PI * 2;
    const sweep = Math.PI * 2 * (1.0 + r() * 0.13);
    let d = "";
    for (let s = 0; s <= steps; s += 1) {
      const a = start + (sweep * s) / steps;
      const wob = 1 + Math.sin(a * 3 + p) * 0.035 + j(r, 0.028);
      d += `${s === 0 ? "M" : "L"} ${n2(cx + Math.cos(a) * rx * wob)} ${n2(cy + Math.sin(a) * ry * wob)} `;
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

/** Wavy underline — provisional, a working hypothesis. */
export function Wave({
  width, colour = INK.cobalt, seed = 8, amp = 1.9, weight = 1.3, className, style,
}: {
  width: number; colour?: string; seed?: number; amp?: number; weight?: number;
} & StrokeBox) {
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

/* ------------------------------------------------------- ATTRACTION · mass */

/** A gravitational centre: pigment wound over and over into a dense core,
    the way you actually darken a point on paper when it is the thing
    everything else is measured against. */
export function Mass({
  size = 90, colour = INK.vermilion, seed = 21, density = 1, className, style,
}: {
  size?: number; colour?: string; seed?: number; density?: number;
} & StrokeBox) {
  const r = rng(seed);
  const c = size / 2;
  const loops = Math.round(26 * density);
  const paths: ReactNode[] = [];
  for (let i = 0; i < loops; i += 1) {
    const t = i / loops;
    // inner passes small and dark, outer passes wider and lighter
    const rad = (size / 2 - 2) * (0.08 + t * 0.86) * (0.8 + r() * 0.35);
    const steps = 18;
    const start = r() * 6.28;
    const sweep = 6.28 * (0.75 + r() * 0.5);
    let d = "";
    for (let s = 0; s <= steps; s += 1) {
      const a = start + (sweep * s) / steps;
      const wob = 1 + j(r, 0.1);
      d += `${s === 0 ? "M" : "L"} ${n2(c + Math.cos(a) * rad * wob)} ${n2(c + Math.sin(a) * rad * wob)} `;
    }
    const heft = 1 - t * 0.6;
    paths.push(
      <path key={i} d={d} stroke={colour} strokeWidth={n2((0.9 + r() * 1.3) * heft)}
        strokeOpacity={n2(0.16 + 0.5 * heft + r() * 0.2)} strokeLinecap="round" fill="none" />,
    );
  }
  return (
    <svg className={className} style={style} width={size} height={size}
      viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
      {paths}
    </svg>
  );
}

/** Attraction contours: concentric, imperfect rings around a centre, fading
    with distance. The field a tonal centre casts over its pitch classes. */
export function Contours({
  width, height, colour = INK.graphite, seed = 22, rings = 5,
  opacity = 0.5, className, style,
}: {
  width: number; height: number; colour?: string; seed?: number;
  rings?: number; opacity?: number;
} & StrokeBox) {
  const r = rng(seed);
  const cx = width / 2;
  const cy = height / 2;
  const out: ReactNode[] = [];
  for (let i = 1; i <= rings; i += 1) {
    const t = i / rings;
    const rx = (width / 2) * t * (0.92 + j(r, 0.06));
    const ry = (height / 2) * t * (0.92 + j(r, 0.06));
    const steps = 30;
    const start = r() * 6.28;
    const sweep = 6.28 * (0.9 + r() * 0.18);
    let d = "";
    for (let s = 0; s <= steps; s += 1) {
      const a = start + (sweep * s) / steps;
      const wob = 1 + Math.sin(a * (2 + (i % 3)) + i) * 0.03 + j(r, 0.02);
      d += `${s === 0 ? "M" : "L"} ${n2(cx + Math.cos(a) * rx * wob)} ${n2(cy + Math.sin(a) * ry * wob)} `;
    }
    out.push(
      <path key={i} d={d} stroke={colour} strokeWidth={n2(0.7 + r() * 0.5)}
        strokeOpacity={n2((1 - t * 0.75) * 0.55)} strokeLinecap="round" fill="none" />,
    );
  }
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <g opacity={opacity}>{out}</g>
    </svg>
  );
}

/* ------------------------------------------------------------- TIME · hinge */

/** The hinge: a moment in time, drawn as a heavy double vertical with a
    registration tick. Everything on a temporal page is measured from here. */
export function Hinge({
  height, colour = INK.charcoal, seed = 23, weight = 2, className, style,
}: {
  height: number; colour?: string; seed?: number; weight?: number;
} & StrokeBox) {
  const r = rng(seed);
  const w = 14;
  return (
    <svg className={className} style={style} width={w} height={height}
      viewBox={`0 0 ${w} ${height}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <g stroke={colour} strokeLinecap="round" fill="none">
        <path d={handLine(w / 2 - 1.5, 2, w / 2 - 1.5, height - 2, r, 0.7, 8)} strokeWidth={weight} strokeOpacity={0.9} />
        <path d={handLine(w / 2 + 2, 4, w / 2 + 2, height - 4, r, 0.9, 8)} strokeWidth={weight * 0.45} strokeOpacity={0.45} />
        <path d={handLine(w / 2 - 5, 2, w / 2 + 5, 2, r, 0.4, 2)} strokeWidth={weight * 0.6} strokeOpacity={0.7} />
        <path d={handLine(w / 2 - 5, height - 2, w / 2 + 5, height - 2, r, 0.4, 2)} strokeWidth={weight * 0.6} strokeOpacity={0.7} />
      </g>
    </svg>
  );
}

/** A temporal band: a low field of horizontal strokes between two moments,
    ends tapering because a response window does not switch on like a lamp. */
export function Band({
  width, height = 26, colour = INK.teal, seed = 24, opacity = 0.8,
  taper = 0.22, className, style,
}: {
  width: number; height?: number; colour?: string; seed?: number;
  opacity?: number; taper?: number;
} & StrokeBox) {
  const r = rng(seed);
  const rows = Math.max(3, Math.round(height / 3.2));
  const strokes: ReactNode[] = [];
  for (let i = 0; i < rows; i += 1) {
    const t = rows === 1 ? 0.5 : i / (rows - 1);
    const y = 2 + t * (height - 4);
    // strokes reach different distances in from both ends
    const x1 = 1 + Math.abs(j(r, width * taper));
    const x2 = width - 1 - Math.abs(j(r, width * taper));
    if (x2 - x1 < 4) continue;
    strokes.push(
      <path key={i} d={handLine(x1, y, x2, y, r, 0.65, 7)} stroke={colour}
        strokeWidth={n2(1.5 + r() * 1.2)} strokeOpacity={n2(0.2 + r() * 0.42)}
        strokeLinecap="round" fill="none" />,
    );
  }
  return (
    <svg className={className} style={style} width={width} height={height}
      viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <g opacity={opacity}>{strokes}</g>
    </svg>
  );
}

/* --------------------------------------------------------- REGISTRATION */

/** Pressure gauge: four short strokes, pressed to the section's level.
    A registration mark — it tells the reader how hard the page is leaning
    on the pigment at this point, the way a printer's mark tells you how the
    sheet was made. */
export function Gauge({
  level, colour = INK.graphite, seed = 25, className, style,
}: {
  level: 0 | 1 | 2 | 3 | 4; colour?: string; seed?: number;
} & StrokeBox) {
  const r = rng(seed);
  const w = 26;
  const h = 14;
  const bars: ReactNode[] = [];
  for (let i = 0; i < 4; i += 1) {
    const x = 3 + i * 6.4;
    const pressed = i < level;
    bars.push(
      <path key={i} d={handLine(x + j(r, 0.5), h - 2, x + j(r, 0.5), h - 4 - i * 2.4, r, 0.35, 2)}
        stroke={colour} strokeWidth={pressed ? 2 : 1.1}
        strokeOpacity={pressed ? 0.9 : 0.22} strokeLinecap="round" fill="none" />,
    );
  }
  return (
    <svg className={className} style={style} width={w} height={h}
      viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`pressure ${level} of 4`}>
      {bars}
    </svg>
  );
}

/** Registration tick: the small cross that says "this sheet was set by hand". */
export function Tick({
  size = 12, colour = INK.ghost, seed = 26, className, style,
}: {
  size?: number; colour?: string; seed?: number;
} & StrokeBox) {
  const r = rng(seed);
  const c = size / 2;
  const a = size * 0.32;
  return (
    <svg className={className} style={style} width={size} height={size}
      viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
      <g stroke={colour} strokeWidth={1} strokeOpacity={0.8} strokeLinecap="round" fill="none">
        <path d={handLine(c - a, c + j(r, 0.4), c + a, c + j(r, 0.4), r, 0.3, 2)} />
        <path d={handLine(c + j(r, 0.4), c - a, c + j(r, 0.4), c + a, r, 0.3, 2)} />
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------- paper tooth */

/** Paper tooth over the whole sheet — barely there, but the white stops
    feeling like a screen and starts feeling like a surface. */
export function Grain() {
  return (
    <svg className="ps-grain" aria-hidden="true" focusable="false">
      <filter id="ps-tooth">
        <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#ps-tooth)" />
    </svg>
  );
}

/**
 * Surface — musical glyphs, drawn by hand.
 *
 * This is a music-psychology atlas. Its records are about note-heads, staves,
 * intervals, chords and cadences, and for two plates the figures were showing
 * those things as abstract blobs on an axis — which is a chart of the music
 * rather than a drawing of it.
 *
 * Everything here is built from point arrays so it goes through `pencil()` and
 * arrives with the same grain as every other mark. Nothing is a font glyph and
 * nothing is a clean vector: a note-head is a small oval scribbled round four
 * or five times, exactly as one gets drawn when someone is working fast.
 */

import { rng, type Pt } from "./pigment";

/**
 * A note-head. Filled ones are scribbled in; open ones are two laps of the
 * outline. Tilted, because a hand draws an oval on the slant.
 */
export function noteHead(rx = 5.4, ry = 4, seed = 3, filled = true): Pt[][] {
  const r = rng(seed);
  const tilt = -0.32 + (r() - 0.5) * 0.16;
  const cos = Math.cos(tilt);
  const sin = Math.sin(tilt);
  const oval = (k: number, phase: number, span: number): Pt[] => {
    const steps = 16;
    const pts: Pt[] = [];
    for (let i = 0; i <= steps; i += 1) {
      const a = phase + (i / steps) * span;
      const wob = 1 + (r() - 0.5) * 0.18;
      const x = Math.cos(a) * rx * k * wob;
      const y = Math.sin(a) * ry * k * wob;
      pts.push([x * cos - y * sin, x * sin + y * cos]);
    }
    return pts;
  };

  const out: Pt[][] = [oval(1, r() * 6.3, Math.PI * 2 * 1.05)];
  if (!filled) {
    out.push(oval(0.98, r() * 6.3, Math.PI * 2 * 0.95));
    return out;
  }
  // Filled: scribbled in with a few tightening laps rather than a solid fill.
  for (let i = 0; i < 4; i += 1) out.push(oval(0.78 - i * 0.16, r() * 6.3, Math.PI * 2 * (0.9 + r() * 0.4)));
  return out;
}

/** A stem. Up on the right of the head, down on the left, as notation does. */
export function stem(rx: number, dir: 1 | -1, len = 26, seed = 5): Pt[] {
  const r = rng(seed);
  const x = dir === 1 ? rx * 0.92 : -rx * 0.92;
  const steps = 6;
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    pts.push([x + (r() - 0.5) * 0.9, -dir * len * t]);
  }
  return pts;
}

/** A beam joining two stem ends. */
export function beam(x1: number, y1: number, x2: number, y2: number, seed = 7): Pt[][] {
  const r = rng(seed);
  return [0, 1].map((i) => {
    const off = i * 3.4;
    const steps = 5;
    const pts: Pt[] = [];
    for (let j = 0; j <= steps; j += 1) {
      const t = j / steps;
      pts.push([x1 + (x2 - x1) * t, y1 + off + (y2 + off - y1 - off) * t + (r() - 0.5) * 0.9]);
    }
    return pts;
  });
}

/** Five stave lines, each drawn as its own slightly-off run. */
export function stave(x1: number, x2: number, y: number, gap = 8, seed = 11): Pt[][] {
  const r = rng(seed);
  return Array.from({ length: 5 }, (_, i) => {
    const ly = y + (i - 2) * gap;
    const steps = Math.max(6, Math.round((x2 - x1) / 26));
    const drop = (r() - 0.5) * 1.6;
    const pts: Pt[] = [];
    for (let j = 0; j <= steps; j += 1) {
      const t = j / steps;
      pts.push([x1 + (x2 - x1) * t, ly + drop * t + (r() - 0.5) * 0.85]);
    }
    return pts;
  });
}

/** A bar line. */
export function barline(x: number, y: number, gap = 8, seed = 13): Pt[] {
  const r = rng(seed);
  return [
    [x + (r() - 0.5) * 0.8, y - gap * 2],
    [x + (r() - 0.5) * 0.8, y],
    [x + (r() - 0.5) * 0.8, y + gap * 2],
  ];
}

/**
 * A treble clef, sketched. Not a font glyph — a single spiralling run that
 * loops, rises, and drops through the stave, which is how one gets drawn.
 */
export function trebleClef(gap = 8, seed = 17): Pt[] {
  const r = rng(seed);
  const s = gap / 8;
  const pts: Pt[] = [];
  const push = (x: number, y: number) => pts.push([x * s + (r() - 0.5) * 0.6, y * s + (r() - 0.5) * 0.6]);

  // The tail below the stave, up the spine, over the top curl, then the spiral.
  push(2, 34); push(4.5, 30); push(6, 25); push(6.6, 19);
  push(6.4, 12); push(5.6, 4); push(4.6, -4); push(3.6, -12);
  push(3.4, -18); push(4.6, -22); push(6.6, -20); push(7.4, -14);
  push(7.2, -6); push(5.6, 2); push(3, 9); push(0.4, 15);
  push(-1.4, 20); push(-1.6, 25); push(0.4, 28); push(3.4, 27.6);
  push(5, 25); push(4.6, 22); push(2, 21); push(0, 22.6);
  return pts;
}

/** A sharp: two uprights crossed by two slanted bars. */
export function sharp(h = 14, seed = 19): Pt[][] {
  const r = rng(seed);
  const j = () => (r() - 0.5) * 0.7;
  return [
    [[-2.2 + j(), -h / 2], [-2.6 + j(), h / 2]],
    [[2.2 + j(), -h / 2 - 1.4], [1.8 + j(), h / 2 - 1.4]],
    [[-5 + j(), -1.6], [5 + j(), -3.6]],
    [[-5 + j(), 3.6], [5 + j(), 1.6]],
  ];
}

/** A flat: a spine with a small bowl on its right. */
export function flat(h = 16, seed = 23): Pt[] {
  const r = rng(seed);
  const j = () => (r() - 0.5) * 0.6;
  return [
    [-2 + j(), -h / 2], [-2.4 + j(), 0], [-2.4 + j(), h / 2 - 1],
    [0 + j(), h / 2 - 4], [2.4 + j(), h / 2 - 7], [1.4 + j(), h / 2 - 10],
    [-1.4 + j(), h / 2 - 9], [-2.4 + j(), h / 2 - 5],
  ];
}

/**
 * A phrase contour — the line a listener would trace over a melody. Sampled
 * smoothly through the note positions rather than joining them with segments.
 */
export function contourThrough(pts: Pt[], lift = 12): Pt[] {
  if (pts.length < 2) return pts;
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i += 1) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    for (let s = 0; s < 8; s += 1) {
      const t = s / 8;
      const arc = Math.sin(Math.PI * t) * -lift * 0.16;
      out.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t + arc]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

/** A slur or tie arching over a span. */
export function slur(x1: number, x2: number, y: number, depth = 14, seed = 29): Pt[] {
  const r = rng(seed);
  const steps = 14;
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    pts.push([x1 + (x2 - x1) * t, y - Math.sin(Math.PI * t) * depth + (r() - 0.5) * 0.9]);
  }
  return pts;
}

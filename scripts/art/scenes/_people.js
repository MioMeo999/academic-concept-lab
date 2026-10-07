/**
 * People, drawn once and reused.
 *
 * A person here is a bust — a head, a pair of shoulders and a mark on the
 * chest — because a crowd has to stay legible at the size of a thumbnail.
 * Four kinds are told apart by three things at once, so that none of them
 * depends on colour alone: a hue, a way of hatching the shoulders, and the
 * mark on the chest. They are teaching stand-ins for "someone who holds
 * different things important", not personality types.
 *
 *   ring     teal      hatched slanting right
 *   bar      vermilion hatched flat
 *   cross    ochre     cross-hatched
 *   chevron  violet    hatched slanting left
 */
export const KINDS = [
  { id: "ring", hue: "teal", alt: "turquoise", hatch: 38, cross: null },
  { id: "bar", hue: "vermilion", alt: "coral", hatch: 0, cross: null },
  { id: "cross", hue: "ochre", alt: "yellow", hatch: 54, cross: -50 },
  { id: "chevron", hue: "violet", alt: "lilac", hatch: -42, cross: null },
];

const jit = (seed, i) => {
  // a small deterministic variation per person, so a crowd is not a stamp
  const v = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/** Geometry of one bust, anchored at the middle of its feet line (x, y). */
export function bustGeometry(h, { x, y, s = 1, seed = 1 }) {
  const wv = 1 + (jit(seed, 1) - 0.5) * 0.08;
  const sl = (jit(seed, 2) - 0.5) * 5;
  const hx = (jit(seed, 3) - 0.5) * 5;
  const P = ([a, b]) => [x + a * s * wv, y + b * s];
  const torso = h.spline(
    [[-43, 0], [-46, -24 + sl * 0.3], [-39, -48 + sl * 0.5], [-17, -58], [17, -58], [39, -48 - sl * 0.5], [46, -24 - sl * 0.3], [43, 0]].map(P),
    9,
  );
  const head = { cx: x + hx * s, cy: y - 82 * s, rx: 18.5 * s, ry: 21.5 * s };
  const headPoly = h.blob(head.cx, head.cy, head.rx, head.ry, { seed: seed + 5, irregular: 0.05, points: 36 });
  // the collar: where head and shoulders meet
  const neck = [[x - 10 * s, y - 62 * s], [x - 8 * s, y - 56 * s], [x, y - 52 * s], [x + 8 * s, y - 56 * s], [x + 10 * s, y - 62 * s]];
  return { torso, head, headPoly, neck, chest: [x, y - 28 * s], s };
}

function drawMark(pen, kind, [cx, cy], s, a = 0.86) {
  const w = 1.8 * s;
  if (kind === 0) pen.ring(cx, cy, 7.2 * s, 7.2 * s, { laps: 2, w, a, wobble: 0.08, open: 0.1 });
  else if (kind === 1) pen.line([[cx - 10 * s, cy], [cx + 10 * s, cy]], { w: 3.3 * s, a, passes: 2, amp: 0.3, broken: 0.05 });
  else if (kind === 2) {
    pen.line([[cx - 8.5 * s, cy], [cx + 8.5 * s, cy]], { w: 2.6 * s, a, passes: 2, amp: 0.3, broken: 0.05 });
    pen.line([[cx, cy - 8.5 * s], [cx, cy + 8.5 * s]], { w: 2.6 * s, a, passes: 2, amp: 0.3, broken: 0.05 });
  } else pen.line([[cx - 10 * s, cy - 5.5 * s], [cx, cy + 5.5 * s], [cx + 10 * s, cy - 5.5 * s]], { w: 2.7 * s, a, passes: 2, amp: 0.3, broken: 0.05 });
}

/**
 * Draw a group of people. Each is { x, y, s, kind, ghost, seed }. Pigment is
 * laid per hue so that overlaps build the way pencil does; ghosts are only a
 * faint outline — the shape of someone who is not here.
 */
export function drawPeople(h, P, people, { seed = 1 } = {}) {
  const geo = people.map((p, i) => ({ ...p, s: p.s ?? 1, g: bustGeometry(h, { x: p.x, y: p.y, s: p.s ?? 1, seed: (p.seed ?? seed) + i * 3 }) }));
  const solid = geo.filter((p) => !p.ghost);
  const ghosts = geo.filter((p) => p.ghost);

  KINDS.forEach((k, ki) => {
    const mine = solid.filter((p) => p.kind === ki);
    if (!mine.length) return;
    h.layer(P[k.hue], (pen) => {
      for (const p of mine) pen.hatch(p.g.torso, { angle: k.hatch, spacing: 3.3 * p.s, len: [9 * p.s, 24 * p.s], a: 0.66, w: 1.55 * p.s, overshoot: 3, jitter: 0.8, bend: 0.1 });
    }, { seed: seed + 10 + ki, pressure: 0.58, vary: 0.6, varyScale: 40 });
    h.layer(P[k.alt], (pen) => {
      for (const p of mine) pen.scumble(p.g.torso, { count: Math.round(16 * p.s * p.s), a: 0.4, size: [1.6 * p.s, 3.2 * p.s] });
    }, { seed: seed + 20 + ki, pressure: 0.42 });
    if (k.cross != null) {
      h.layer(P[k.hue], (pen) => {
        for (const p of mine) pen.hatch(p.g.torso, { angle: k.cross, spacing: 4.4 * p.s, len: [8 * p.s, 20 * p.s], a: 0.46, w: 1.3 * p.s, overshoot: 3, jitter: 0.8 });
      }, { seed: seed + 30 + ki, pressure: 0.5, vary: 0.6, varyScale: 40 });
    }
  });

  // paper shows through where the mark sits, so the mark reads on any hatch
  for (const p of solid) {
    const [cx, cy] = p.g.chest;
    h.erase(h.blob(cx, cy, 10.5 * p.s, 10 * p.s, { seed: 3, irregular: 0.08, points: 20 }), { strength: 0.95, angle: 24, seed: 4, count: 90, len: [3 * p.s, 7 * p.s], width: [2.6 * p.s, 4.2 * p.s] });
  }

  // a light shade on the head, on the side away from the light
  h.layer(P.warmgrey, (pen) => {
    for (const p of solid) {
      const { cx, cy, rx, ry } = p.g.head;
      const shade = h.blob(cx + rx * 0.42, cy + ry * 0.12, rx * 0.5, ry * 0.86, { seed: 8, irregular: 0.05, points: 22 });
      pen.hatch(shade, { angle: 62, spacing: 3.6 * p.s, len: [6 * p.s, 14 * p.s], a: 0.32, w: 1.2 * p.s, overshoot: 1.5 });
    }
  }, { seed: seed + 40, pressure: 0.38, vary: 0.4, varyScale: 40 });

  h.layer(P.graphite, (pen) => {
    for (const p of solid) {
      const s = p.s;
      pen.line(p.g.torso, { w: 1.9 * s, a: 0.74, passes: 2, amp: 0.6 * s, broken: 0.08, step: 3 });
      pen.ring(p.g.head.cx, p.g.head.cy, p.g.head.rx, p.g.head.ry, { laps: 2, w: 1.9 * s, a: 0.76, wobble: 0.05, open: 0.06 });
      pen.line(p.g.neck, { w: 1.5 * s, a: 0.5, passes: 1, amp: 0.3, broken: 0.05, step: 2 });
    }
  }, { seed: seed + 50, pressure: 0.58, vary: 0.7, varyScale: 50 });

  h.layer(P.charcoal, (pen) => {
    for (const p of solid) drawMark(pen, p.kind, p.g.chest, p.s);
  }, { seed: seed + 60, pressure: 0.62 });

  if (ghosts.length) {
    h.layer(P.graphite, (pen) => {
      for (const p of ghosts) {
        const s = p.s;
        pen.line(p.g.torso, { w: 1.7 * s, a: 0.5, passes: 1, amp: 0.5 * s, broken: 0.5, step: 3 });
        pen.ring(p.g.head.cx, p.g.head.cy, p.g.head.rx, p.g.head.ry, { laps: 1, w: 1.7 * s, a: 0.5, wobble: 0.06, open: 0.22 });
        drawMark(pen, p.kind, p.g.chest, s, 0.5);
      }
    }, { seed: seed + 70, pressure: 0.3, vary: 0.5, varyScale: 40 });
  }
}

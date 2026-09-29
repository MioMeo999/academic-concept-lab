/**
 * Self-Determination Theory — same action, different why.
 *
 * One graphite line — the visible action — travels the whole sheet at the same
 * weight and never changes. It passes through two loops, each a person's
 * sense of self. Around the first, the reason sits inside: a settled mass the
 * loop has taken in. Around the second, the reason presses from outside and
 * gathers in a collar along the inner wall: pressure that has not been made
 * the person's own.
 *
 * A teaching drawing. Position, pressure and pigment show the *kind* of
 * reason, never an amount of motivation or effort. Words are live HTML.
 */
export const RING = {
  a: { cx: 470, cy: 350, rx: 215, ry: 196 },
  b: { cx: 1130, cy: 350, rx: 215, ry: 196 },
  line: { y: 350 },
};

const scene = {
  width: 1600,
  height: 700,
  scale: 2,
  seed: 61,
  crop: [0, 60, 1600, 580],
  outputs: [
    { file: "public/visual-language/theories/sdt/sdt-hero.webp", width: 1600, quality: 84 },
    { file: "public/visual-language/theories/sdt/sdt-hero-900.webp", width: 900, quality: 80 },
    // Narrow screens: the same drawing turned so the action runs downward and the two selves stack.
    { file: "public/visual-language/theories/sdt/sdt-hero-stack.webp", width: 620, quality: 80, rotate: 90 },
  ],
  draw(h, P) {
    const { a, b, line } = RING;
    const wall = (r, seed, irregular = 0.07) => h.blob(r.cx, r.cy, r.rx, r.ry, { seed, irregular, points: 110 });
    const closed = (poly) => [...poly, poly[0], poly[1], poly[2]];
    /** A spiral inward: strands that fill a mass the way a hand circles it. */
    const spiral = (cx, cy, rx, ry, turns = 3.2, phase = 0) => {
      const pts = [];
      for (let t = 0; t <= 1; t += 0.004) {
        const k = 1 - 0.82 * t;
        const th = t * Math.PI * 2 * turns + phase;
        pts.push([cx + Math.cos(th) * rx * k * (1 + 0.05 * Math.sin(th * 3)), cy + Math.sin(th) * ry * k * (1 + 0.05 * Math.cos(th * 2))]);
      }
      return pts;
    };
    /** Strands that follow a loop, as if the hand travelled the wall. */
    const along = (r, off, from, to, steps = 120) => {
      const pts = [];
      for (let i = 0; i <= steps; i++) {
        const t = from + (to - from) * (i / steps);
        const k = 1 + 0.02 * Math.sin(t * 7);
        pts.push([r.cx + Math.cos(t) * (r.rx + off) * k, r.cy + Math.sin(t) * (r.ry + off) * k]);
      }
      return pts;
    };

    /* Ghost construction: a level the action travels along, and the
       boundaries that were drawn first and abandoned. Faint, never a scale. */
    h.layer(P.graphite, (pen) => {
      pen.seg(20, line.y - 54, 1580, line.y - 51, { w: 0.7, a: 0.14, passes: 1, broken: 0.6 });
      pen.seg(20, line.y + 58, 1580, line.y + 61, { w: 0.7, a: 0.14, passes: 1, broken: 0.6 });
      pen.line(closed(wall({ ...a, rx: a.rx + 30, ry: a.ry + 26 }, 3, 0.1)), { w: 0.8, a: 0.2, passes: 1, amp: 1.6, broken: 0.6 });
      pen.line(closed(wall({ ...a, rx: a.rx - 24, ry: a.ry - 20 }, 5, 0.1)), { w: 0.8, a: 0.14, passes: 1, amp: 1.6, broken: 0.7 });
      pen.line(closed(wall({ ...b, rx: b.rx + 34, ry: b.ry + 30 }, 4, 0.1)), { w: 0.8, a: 0.2, passes: 1, amp: 1.6, broken: 0.6 });
      pen.line(closed(wall({ ...b, rx: b.rx - 28, ry: b.ry - 24 }, 6, 0.1)), { w: 0.8, a: 0.14, passes: 1, amp: 1.6, broken: 0.7 });
    }, { seed: 1, pressure: 0.25 });

    /* ---- Person A: the reason lives inside ------------------------------ */
    const innerA = h.blob(a.cx, a.cy, 150, 132, { seed: 11, irregular: 0.3 });
    h.layer(P.turquoise, (pen) => pen.scumble(h.blob(a.cx, a.cy, 186, 162, { seed: 12, irregular: 0.22 }), { count: 90, loops: [8, 20], a: 0.26, size: [2.4, 5.4] }), { seed: 12, pressure: 0.3, vary: 0.7, varyScale: 110 });
    h.layer(P.yellow, (pen) => pen.scumble(h.blob(a.cx + 24, a.cy - 14, 120, 100, { seed: 19, irregular: 0.3 }), { count: 60, loops: [8, 18], a: 0.22, size: [2.6, 5.4] }), { seed: 19, pressure: 0.3, vary: 0.7, varyScale: 100 });
    h.layer(P.teal, (pen) => {
      pen.current(spiral(a.cx, a.cy, 150, 132, 3.6, 0.4), { strands: 130, width: 30, a: 0.42, w: 1.15, lengthFrac: [0.06, 0.2], amp: 1.3 });
    }, { seed: 13, pressure: 0.46, vary: 0.65, varyScale: 90 });
    h.layer(P.teal, (pen) => pen.hatch(innerA, { angle: 38, spacing: 4.4, a: 0.38, len: [10, 30], bend: 0.16, jitter: 1.4, density: 0.78 }), { seed: 14, pressure: 0.42, vary: 0.8, varyScale: 70 });
    h.layer(P.emerald, (pen) => pen.hatch(h.blob(a.cx - 30, a.cy + 16, 96, 78, { seed: 15, irregular: 0.32 }), { angle: -34, spacing: 5, a: 0.3, len: [8, 22], bend: 0.14, jitter: 1.2, density: 0.7 }), { seed: 15, pressure: 0.38, vary: 0.8 });
    h.layer(P.ochre, (pen) => pen.scumble(h.blob(a.cx + 40, a.cy - 30, 66, 52, { seed: 16, irregular: 0.32 }), { count: 52, a: 0.36, size: [2, 4.6] }), { seed: 16, pressure: 0.4 });
    h.layer(P.yellow, (pen) => {
      // short marks of interest opening through the loop's wall: the reason is not sealed in
      for (let k = 0; k < 13; k++) {
        const th = -2.7 + k * 0.4;
        const r0 = 150 + (k % 3) * 10, r1 = r0 + 34 + (k % 4) * 8;
        pen.seg(a.cx + Math.cos(th) * r0, a.cy + Math.sin(th) * r0 * 0.9, a.cx + Math.cos(th) * r1, a.cy + Math.sin(th) * r1 * 0.9, { w: 1.7, a: 0.5, passes: 1, broken: 0.1, amp: 0.8 });
      }
    }, { seed: 17, pressure: 0.42 });
    // A's loop: loose and open where the reason moves freely.
    h.layer(P.graphite, (pen) => {
      pen.line(closed(wall(a, 21, 0.06)), { w: 2.2, a: 0.62, passes: 3, amp: 1.7, broken: 0.28, step: 4 });
      pen.line(closed(wall({ ...a, rx: a.rx + 9, ry: a.ry + 7 }, 22, 0.075)), { w: 1.2, a: 0.32, passes: 1, amp: 2, broken: 0.4 });
    }, { seed: 18, pressure: 0.5, vary: 0.9, varyScale: 60 });

    /* ---- Person B: the reason presses from outside ---------------------- */
    // The wall is heavier and dented where the pressure lands.
    const CONTACT = [-2.6, 2.62, -0.52];
    const dent = (r, seed) => wall(r, seed, 0.045).map(([x, y]) => {
      const dx = x - r.cx, dy = y - r.cy;
      const th = Math.atan2(dy, dx);
      let k = 1;
      for (const c of CONTACT) k -= 0.075 * Math.exp(-Math.pow(Math.atan2(Math.sin(th - c), Math.cos(th - c)) / 0.3, 2));
      return [r.cx + dx * k, r.cy + dy * k];
    });
    h.layer(P.graphite, (pen) => {
      pen.line(closed(dent(b, 31)), { w: 2.6, a: 0.72, passes: 4, amp: 1.3, broken: 0.14, step: 4 });
      pen.line(closed(dent({ ...b, rx: b.rx - 8, ry: b.ry - 7 }, 32)), { w: 1.3, a: 0.4, passes: 2, amp: 1.2, broken: 0.25 });
    }, { seed: 27, pressure: 0.58, vary: 0.85, varyScale: 60 });
    // Pressure arriving from outside: strand bundles that converge on the wall.
    CONTACT.forEach((ang, i) => {
      const ux = Math.cos(ang), uy = Math.sin(ang);
      const wx = b.cx + ux * (b.rx * 0.93), wy = b.cy + uy * (b.ry * 0.93);
      const far = [b.cx + ux * (b.rx + 150), b.cy + uy * (b.ry + 150)];
      const mid = [b.cx + ux * (b.rx + 74) + (i - 1) * 6, b.cy + uy * (b.ry + 74) - (i - 1) * 4];
      const path = h.spline([far, mid, [wx + ux * 8, wy + uy * 8]]);
      h.layer(P.vermilion, (pen) => pen.current(path, { strands: 46, widthAt: (t) => 74 * (1 - t) + 6, a: 0.46, w: 1.25, lengthFrac: [0.55, 1], amp: 1.4 }), { seed: 40 + i, pressure: 0.5, vary: 0.7, varyScale: 80 });
      h.layer(P.coral, (pen) => pen.current(path, { strands: 22, widthAt: (t) => 54 * (1 - t) + 4, a: 0.36, w: 1.1, lengthFrac: [0.4, 0.9] }), { seed: 50 + i, pressure: 0.42 });
      h.layer(P.charcoal, (pen) => {
        pen.line([far, [wx + ux * 26, wy + uy * 26]], { w: 1.6, a: 0.6, passes: 2, amp: 1.2, broken: 0.1 });
        const ex = wx + ux * 16, ey = wy + uy * 16;
        pen.line([[ex + ux * 22 - uy * 12, ey + uy * 22 + ux * 12], [ex, ey], [ex + ux * 22 + uy * 12, ey + uy * 22 - ux * 12]], { w: 1.8, a: 0.82, passes: 2 });
      }, { seed: 60 + i, pressure: 0.52 });
    });
    // Inside, the same pressure has been taken in but not made theirs: a collar at the wall.
    h.layer(P.vermilion, (pen) => {
      for (const ang of CONTACT) pen.current(along(b, -22, ang - 0.62, ang + 0.62, 70), { strands: 58, width: 40, a: 0.6, w: 1.3, lengthFrac: [0.25, 0.8], amp: 1.1 });
    }, { seed: 70, pressure: 0.56, vary: 0.7, varyScale: 70 });
    h.layer(P.coral, (pen) => pen.current(along(b, -36, -3.14, 3.14, 240), { strands: 90, width: 42, a: 0.34, w: 1.1, lengthFrac: [0.08, 0.26], amp: 1.7 }), { seed: 71, pressure: 0.4, vary: 0.8, varyScale: 90 });
    h.layer(P.vermilion, (pen) => {
      for (const ang of CONTACT) pen.hatch(h.blob(b.cx + Math.cos(ang) * (b.rx - 50), b.cy + Math.sin(ang) * (b.ry - 46), 42, 30, { seed: 74 + Math.round(ang * 9), irregular: 0.3, rot: ang + Math.PI / 2 }), { angle: (ang * 180) / Math.PI + 70, spacing: 2.8, a: 0.5, len: [6, 15], bend: 0.12, jitter: 0.9 });
    }, { seed: 75, pressure: 0.55 });
    h.layer(P.magenta, (pen) => {
      for (const ang of CONTACT) pen.scumble(h.blob(b.cx + Math.cos(ang) * (b.rx - 54), b.cy + Math.sin(ang) * (b.ry - 48), 26, 20, { seed: 76 + Math.round(ang * 9), irregular: 0.3 }), { count: 24, a: 0.4, size: [1.4, 2.8] });
    }, { seed: 77, pressure: 0.5 });
    h.layer(P.charcoal, (pen) => {
      // a small hard tangle where each contact is closest: worry with a wall behind it
      for (const ang of CONTACT) {
        const c = [b.cx + Math.cos(ang) * (b.rx - 60), b.cy + Math.sin(ang) * (b.ry - 54)];
        const pts = [];
        for (let t = 0; t <= 1; t += 0.014) {
          const th = t * Math.PI * 2 * 4.6 + ang;
          pts.push([c[0] + Math.cos(th) * (11 + 8 * Math.sin(t * 9)), c[1] + Math.sin(th * 0.92) * (8 + 6 * Math.cos(t * 7))]);
        }
        pen.line(pts, { w: 1.2, a: 0.48, passes: 1, amp: 0.6, broken: 0.1, step: 2 });
      }
    }, { seed: 78, pressure: 0.5 });

    /* ---- The action: identical through both --------------------------------- */
    h.layer(P.graphite, (pen) => {
      pen.line([[26, line.y], [400, line.y - 2], [800, line.y + 1], [1200, line.y - 1], [1560, line.y]], { w: 3, a: 0.7, passes: 4, amp: 1.5, broken: 0.06, step: 5 });
    }, { seed: 80, pressure: 0.6, vary: 0.8, varyScale: 90 });
    h.layer(P.charcoal, (pen) => {
      pen.line([[26, line.y + 1], [700, line.y], [1180, line.y - 1], [1560, line.y]], { w: 1.2, a: 0.55, passes: 1, amp: 1.1, broken: 0.1, step: 5 });
      // small ticks marking the same stretch of the same night inside each loop
      for (const cx of [a.cx, b.cx]) for (const dx of [-a.rx, a.rx]) pen.seg(cx + dx, line.y - 13, cx + dx, line.y + 13, { w: 1.5, a: 0.6, passes: 1 });
      // the arrowhead: the action continues
      pen.line([[1532, line.y - 15], [1566, line.y], [1532, line.y + 15]], { w: 2.1, a: 0.85, passes: 2 });
    }, { seed: 81, pressure: 0.55 });
    // The person at the centre of each loop: a pressed dot on the line.
    h.layer(P.charcoal, (pen) => { pen.dot(a.cx, line.y, 9, { a: 0.95, w: 1.5 }); pen.dot(b.cx, line.y, 9, { a: 0.95, w: 1.5 }); }, { seed: 82, pressure: 0.7 });
  },
};

export default scene;

/**
 * Tonal Hierarchy — the tonal field.
 *
 * A graphite field of twelve spokes (pitch-class identity: each tone keeps
 * its own angle) crossed by three pencil bands at increasing distance from
 * home: tonic triad, other diatonic tones, nondiatonic tones. Bands are
 * drawn wide on purpose — each level holds internal variation, and the
 * record shows no exact profile values. Tones, labels and the home mass are
 * placed live by the page, so the field can re-read itself in any context.
 *
 * Distance is a teaching representation of relative tonal centrality/fit —
 * not frequency, loudness, probability, liking or neural activity.
 */
export const RINGS = { triad: 170, diatonic: 290, nondiatonic: 410, rim: 455 };

export default {
  width: 1000,
  height: 1000,
  scale: 2,
  seed: 51,
  outputs: [
    { file: "public/visual-language/theories/tonal/tonal-field.webp", width: 1000, quality: 84 },
    { file: "public/visual-language/theories/tonal/tonal-field-600.webp", width: 600, quality: 80 },
  ],
  draw(h, P) {
    const c = 500;
    const band = (r, w, seed) => {
      const outer = [], inner = [];
      for (let i = 0; i <= 96; i++) {
        const t = (i / 96) * Math.PI * 2;
        const wob = 1 + 0.018 * Math.sin(t * 5 + seed) + 0.012 * Math.sin(t * 11 + seed * 2);
        outer.push([c + Math.cos(t) * (r + w / 2) * wob, c + Math.sin(t) * (r + w / 2) * wob]);
        inner.push([c + Math.cos(-t) * (r - w / 2) * wob, c + Math.sin(-t) * (r - w / 2) * wob]);
      }
      return [...outer, ...inner];
    };

    /* Ghost construction: the rim on which tones sit before any context, and
       twelve faint spokes — identity lines that never move. */
    h.layer(P.graphite, (pen) => {
      pen.ring(c, c, 455, 455, { laps: 2, w: 1.1, a: 0.42, wobble: 0.015, open: 0.04 });
      for (let k = 0; k < 12; k++) {
        const t = -Math.PI / 2 + (k * Math.PI) / 6;
        pen.seg(c + Math.cos(t) * 60, c + Math.sin(t) * 60, c + Math.cos(t) * 470, c + Math.sin(t) * 470, { w: 0.8, a: 0.2, passes: 1, broken: 0.45 });
      }
    }, { seed: 1, pressure: 0.3 });

    const orbit = (r, jitter = 0.02, phase = 0) => {
      const pts = [];
      for (let i = 0; i <= 180; i++) {
        const t = (i / 180) * Math.PI * 2 + phase;
        const wob = 1 + jitter * Math.sin(t * 3 + phase * 2) + jitter * 0.6 * Math.sin(t * 7 + phase);
        pts.push([c + Math.cos(t) * r * wob, c + Math.sin(t) * r * wob]);
      }
      return pts;
    };

    /* The nondiatonic band: far from home, loosely held — sparse graphite orbits. */
    h.layer(P.warmgrey, (pen) => pen.current(orbit(410, 0.02, 0.3), { strands: 70, width: 48, a: 0.32, w: 1, lengthFrac: [0.04, 0.16], amp: 1.6 }), { seed: 3, pressure: 0.32, vary: 0.7, varyScale: 120 });
    h.layer(P.graphite, (pen) => pen.current(orbit(410, 0.02, 1.2), { strands: 18, width: 30, a: 0.3, w: 0.9, lengthFrac: [0.05, 0.12] }), { seed: 4, pressure: 0.3, vary: 0.8, varyScale: 140 });

    /* The diatonic band: ochre orbits, inside the key but differentiated. */
    h.layer(P.ochre, (pen) => pen.current(orbit(290, 0.025, 0.8), { strands: 110, width: 46, a: 0.4, w: 1.1, lengthFrac: [0.06, 0.22], amp: 1.4 }), { seed: 5, pressure: 0.4, vary: 0.6, varyScale: 110 });
    h.layer(P.yellow, (pen) => pen.current(orbit(290, 0.02, 2.1), { strands: 40, width: 30, a: 0.32, w: 1.2, lengthFrac: [0.05, 0.16] }), { seed: 6, pressure: 0.34, vary: 0.6 });

    /* The tonic-triad band: teal, tighter and denser — held close. */
    h.layer(P.teal, (pen) => pen.current(orbit(170, 0.03, 0.2), { strands: 120, width: 40, a: 0.46, w: 1.1, lengthFrac: [0.08, 0.3], amp: 1.2 }), { seed: 7, pressure: 0.44, vary: 0.5, varyScale: 90 });
    h.layer(P.turquoise, (pen) => pen.current(orbit(170, 0.025, 1.7), { strands: 40, width: 26, a: 0.34, w: 1.1, lengthFrac: [0.06, 0.2] }), { seed: 8, pressure: 0.36 });

    /* Home: a dense, warm mass at the centre, built of overlapping passes. */
    const home = h.blob(c, c, 78, 74, { seed: 9, irregular: 0.22 });
    h.layer(P.vermilion, (pen) => pen.hatch(home, { angle: 35, spacing: 2.8, a: 0.58, len: [8, 20] }), { seed: 10, pressure: 0.5 });
    h.layer(P.orange, (pen) => pen.hatch(h.blob(c - 8, c + 6, 60, 56, { seed: 11 }), { angle: -30, spacing: 3.2, a: 0.46, len: [6, 16] }), { seed: 11, pressure: 0.45 });
    h.layer(P.magenta, (pen) => pen.scumble(h.blob(c + 10, c - 8, 40, 36, { seed: 12 }), { count: 30, a: 0.3 }), { seed: 12, pressure: 0.4 });
    h.layer(P.coral, (pen) => pen.scumble(h.blob(c, c, 104, 100, { seed: 13, irregular: 0.2 }), { count: 44, a: 0.22, size: [2, 4] }), { seed: 13, pressure: 0.3 });

    /* Attraction: faint strokes pulled toward home, strongest nearest it. */
    h.layer(P.graphite, (pen) => {
      for (let k = 0; k < 60; k++) {
        const t = (k / 60) * Math.PI * 2 + 0.05;
        const r0 = 126 + (k % 5) * 22, r1 = r0 - 30 - (k % 3) * 8;
        pen.seg(c + Math.cos(t) * r0, c + Math.sin(t) * r0, c + Math.cos(t + 0.03) * r1, c + Math.sin(t + 0.03) * r1, { w: 0.9, a: 0.3, passes: 1 });
      }
    }, { seed: 14, pressure: 0.34 });
  },
};

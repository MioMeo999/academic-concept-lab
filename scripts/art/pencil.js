/**
 * The Lab's drawing hand — an offline coloured-pencil renderer.
 *
 * This runs in a headless browser (see render.mjs), never on a reader's page.
 * It exists because a pencil mark is not a vector line: pigment catches on the
 * tooth of the paper, light pressure only touches the peaks, heavy pressure
 * fills the valleys, and colour accumulates where passes overlap. Emitting
 * thousands of SVG paths to imitate that would cost the reader; baking the
 * marks once into a raster costs them nothing.
 *
 * Scenes describe marks in a W×H drawing space. Each colour is drawn into its
 * own layer as *coverage*, then deposited through a shared paper-tooth field
 * and multiplied onto the sheet, so overlaps darken the way pigment does.
 * Every scene is seeded: the same scene always draws the same picture.
 */

export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Smooth value noise, used for tooth and for slow wandering of a hand. */
function valueNoise(seed) {
  const r = rng(seed);
  const perm = new Float32Array(1024).map(() => r());
  const at = (i, j) => perm[((i * 73856093) ^ (j * 19349663)) & 1023];
  return (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    return lerp(lerp(at(xi, yi), at(xi + 1, yi), u), lerp(at(xi, yi + 1), at(xi + 1, yi + 1), u), v);
  };
}

export const PIGMENT = {
  graphite: "#3b3b42",
  charcoal: "#232326",
  cobalt: "#1b4fd0",
  ultramarine: "#2a36b8",
  sky: "#4f9ee8",
  turquoise: "#12a3a8",
  teal: "#0f8b7c",
  emerald: "#1f9a57",
  lime: "#8cbc2a",
  yellow: "#f2c416",
  ochre: "#cf8a1c",
  orange: "#ec7a1c",
  vermilion: "#d93518",
  coral: "#ef6a5a",
  magenta: "#d0337f",
  violet: "#7139c4",
  lilac: "#a78be0",
  indigo: "#3a2f8f",
  warmgrey: "#8d857a",
};

export function createHand(W, H, { seed = 1, scale = 2, tooth = 1 } = {}) {
  const CW = Math.round(W * scale), CH = Math.round(H * scale);
  const sheet = document.createElement("canvas");
  sheet.width = CW; sheet.height = CH;
  const sctx = sheet.getContext("2d", { willReadFrequently: true });

  /* Paper tooth: fine grain for the catch of the pencil, a medium grain for
     the unevenness of a pass, and a slow field so large masses breathe. */
  const toothField = new Float32Array(CW * CH);
  {
    const r = rng(seed * 7 + 3);
    const fine = new Float32Array(CW * CH);
    for (let i = 0; i < fine.length; i++) fine[i] = r();
    // One box blur pass softens the fine grain into tooth rather than static.
    const blurred = new Float32Array(CW * CH);
    for (let y = 0; y < CH; y++) {
      for (let x = 0; x < CW; x++) {
        let s = 0, c = 0;
        for (let dy = -1; dy <= 1; dy++) {
          const yy = y + dy; if (yy < 0 || yy >= CH) continue;
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx; if (xx < 0 || xx >= CW) continue;
            s += fine[yy * CW + xx]; c++;
          }
        }
        blurred[y * CW + x] = s / c;
      }
    }
    const med = valueNoise(seed * 13 + 1);
    const slow = valueNoise(seed * 29 + 5);
    for (let y = 0; y < CH; y++) {
      for (let x = 0; x < CW; x++) {
        const i = y * CW + x;
        // Slight horizontal fibre: the medium grain is stretched along x.
        const m = med(x / (5.5 * scale), y / (3.2 * scale));
        const sl = slow(x / (90 * scale), y / (90 * scale));
        const b = (blurred[i] - 0.5) * 2.4 + 0.5; // re-expand contrast after blur
        toothField[i] = clamp(0.55 * b + 0.3 * m + 0.15 * sl);
      }
    }
  }
  const toothAmount = tooth;

  function newLayer() {
    const c = document.createElement("canvas");
    c.width = CW; c.height = CH;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.scale(scale, scale);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    return { c, ctx };
  }

  /** Deposit a coverage layer through the tooth and multiply it onto the sheet. */
  function deposit(layer, { pressure = 0.5, grain = toothAmount, blend = "multiply", opacity = 1 } = {}) {
    const img = layer.ctx.getImageData(0, 0, CW, CH);
    const d = img.data;
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
      const a = d[i + 3] / 255;
      if (a <= 0) continue;
      const n = toothField[p];
      // Light coverage only catches the peaks; firm coverage fills the valleys.
      const level = clamp(a * (0.85 + pressure));
      const catchAmt = clamp((level - n * 0.9 * grain + 0.28) / 0.32);
      d[i + 3] = Math.round(255 * clamp(Math.min(1, a * 1.55) * catchAmt * opacity));
    }
    layer.ctx.putImageData(img, 0, 0);
    sctx.save();
    sctx.globalCompositeOperation = blend;
    sctx.drawImage(layer.c, 0, 0);
    sctx.restore();
  }

  /** Pencil colour with a small per-stroke drift, as a real pencil varies. */
  function tint(hex, r, amount = 0.06) {
    const [R, G, B] = hexToRgb(hex);
    const k = 1 + (r() - 0.5) * amount * 2;
    return [clamp(R * k, 0, 255) | 0, clamp(G * k, 0, 255) | 0, clamp(B * k, 0, 255) | 0];
  }

  /**
   * One stroke of the pencil along a polyline. Pressure lands pale, firms up,
   * and lifts pale again — expressed as an alpha gradient along the chord.
   */
  let pressureAt = null;
  function strokeOn(ctx, pts, colour, r, { w = 1.2, a = 0.7, taper = 0.55, land = 0.35 } = {}) {
    if (pts.length < 2) return;
    const [R, G, B] = tint(colour, r);
    const p0 = pts[0], p1 = pts[pts.length - 1];
    // The hand leans harder in some parts of a mass than others.
    if (pressureAt) {
      const m = pts[Math.floor(pts.length / 2)];
      a = clamp(a * pressureAt(m[0], m[1]), 0, 1);
    }
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
    const g = (Math.abs(dx) + Math.abs(dy) < 0.5)
      ? `rgba(${R},${G},${B},${a})`
      : (() => {
          const grad = ctx.createLinearGradient(p0[0], p0[1], p1[0], p1[1]);
          const lead = clamp(land * (0.7 + r() * 0.6), 0.05, 0.45);
          const tail = clamp(1 - taper * (0.4 + r() * 0.5), lead + 0.1, 0.97);
          grad.addColorStop(0, `rgba(${R},${G},${B},${a * (0.25 + r() * 0.2)})`);
          grad.addColorStop(lead, `rgba(${R},${G},${B},${a})`);
          grad.addColorStop(tail, `rgba(${R},${G},${B},${a * (0.85 + r() * 0.15)})`);
          grad.addColorStop(1, `rgba(${R},${G},${B},${a * (0.12 + r() * 0.2)})`);
          return grad;
        })();
    ctx.strokeStyle = g;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();
  }

  /** Resample a polyline so wobble can be applied evenly along it. */
  function resample(pts, step = 3) {
    const out = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      const len = Math.hypot(x1 - x0, y1 - y0);
      const n = Math.max(1, Math.round(len / step));
      for (let k = 1; k <= n; k++) out.push([lerp(x0, x1, k / n), lerp(y0, y1, k / n)]);
    }
    return out;
  }

  /** A hand does not travel in a perfectly straight line. */
  function wander(pts, r, amp = 0.8, freq = 0.05) {
    const nz = valueNoise(Math.floor(r() * 1e6));
    const off = r() * 100;
    return pts.map(([x, y], i) => {
      const prev = pts[Math.max(0, i - 1)], next = pts[Math.min(pts.length - 1, i + 1)];
      let nx = -(next[1] - prev[1]), ny = next[0] - prev[0];
      const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
      const o = (nz(i * freq + off, off) - 0.5) * 2 * amp;
      return [x + nx * o, y + ny * o];
    });
  }

  /** Build a region test from a polygon. */
  function inside(poly) {
    return (x, y) => {
      let c = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i], [xj, yj] = poly[j];
        if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
      }
      return c;
    };
  }

  function bounds(poly) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const [x, y] of poly) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    return [x0, y0, x1, y1];
  }

  const api = {
    W, H, scale,
    /** An irregular closed region, for masses and fields. */
    blob(cx, cy, rx, ry = rx, { seed: s = 1, irregular = 0.22, points = 48, rot = 0 } = {}) {
      const nz = valueNoise(s * 31 + 7);
      const out = [];
      for (let i = 0; i < points; i++) {
        const t = (i / points) * Math.PI * 2;
        const k = 1 + (nz(Math.cos(t) * 1.6 + 5, Math.sin(t) * 1.6 + 5) - 0.5) * 2 * irregular;
        const x = Math.cos(t) * rx * k, y = Math.sin(t) * ry * k;
        out.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]);
      }
      return out;
    },

    /**
     * Draw into one pigment layer, then deposit it. `fn` receives a pen with
     * the marks below; everything drawn inside one call shares pressure.
     */
    layer(colour, fn, { seed: s = 1, pressure = 0.5, grain, opacity = 1, blend = "multiply", vary = 0.4, varyScale = 70 } = {}) {
      const L = newLayer();
      const r = rng(s * 101 + 17);
      const field = valueNoise(s * 53 + 11);
      pressureAt = vary > 0 ? (x, y) => 1 - vary * 0.55 + vary * 1.1 * field(x / varyScale, y / varyScale) : null;
      const pen = {
        r,
        /** A multi-pass pencil line along points. */
        line(pts, { w = 1.7, a = 0.8, passes = 2, drift = 1.1, amp = 0.7, broken = 0.25, step = 3 } = {}) {
          const base = resample(pts, step);
          for (let p = 0; p < passes; p++) {
            const dx = p ? (r() - 0.5) * drift * 2 : 0, dy = p ? (r() - 0.5) * drift * 2 : 0;
            let run = wander(base.map(([x, y]) => [x + dx, y + dy]), r, amp);
            const pa = a * (p ? 0.35 + r() * 0.35 : 1), pw = w * (p ? 0.6 + r() * 0.45 : 1);
            // Lifts: the pencil leaves the paper for a moment.
            let i = 0;
            while (i < run.length - 1) {
              const len = Math.max(3, Math.round(run.length * (0.25 + r() * 0.6) * (1 - broken * 0.5)));
              const seg = run.slice(i, Math.min(run.length, i + len + 1));
              strokeOn(L.ctx, seg, colour, r, { w: pw, a: pa });
              i += len + (r() < broken ? 1 + Math.floor(r() * 2) : 0);
            }
          }
        },
        /** Straight-ish segment helper. */
        seg(x0, y0, x1, y1, o = {}) { pen.line([[x0, y0], [x1, y1]], o); },
        /** A curve through control points (Catmull–Rom). */
        curve(ctrl, o = {}) { pen.line(api.spline(ctrl), o); },
        /** Imperfect ring: laps that never quite close. */
        ring(cx, cy, rx, ry = rx, { laps = 2, w = 1.8, a = 0.85, wobble = 0.06, open = 0.08, rot = 0 } = {}) {
          for (let l = 0; l < laps; l++) {
            const k = 1 + (r() - 0.5) * wobble * 2;
            const start = r() * Math.PI * 2;
            const span = Math.PI * 2 * (1 - open * r()) + (l ? r() * 0.6 : 0);
            const pts = [];
            for (let t = 0; t <= 1; t += 1 / 90) {
              const th = start + span * t;
              const rr = 1 + Math.sin(th * 2 + l) * wobble * 0.5;
              const x = Math.cos(th) * rx * k * rr, y = Math.sin(th) * ry * k * rr;
              pts.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]);
            }
            pen.line(pts, { w: w * (l ? 0.75 : 1), a: a * (l ? 0.6 : 1), passes: 1, amp: 0.5, broken: 0.15 });
          }
        },
        /**
         * Hatch a region with short hand strokes. `angle` in degrees; strokes
         * overshoot or stop short of the boundary the way a hand does.
         */
        hatch(poly, { angle = 35, spacing = 3.2, len = [14, 40], w = 1.7, a = 0.6, bend = 0.08, jitter = 0.6, overshoot = 4, density = 1 } = {}) {
          const test = inside(poly);
          const [x0, y0, x1, y1] = bounds(poly);
          const th = (angle * Math.PI) / 180;
          const ux = Math.cos(th), uy = Math.sin(th), vx = -uy, vy = ux;
          const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
          const R = Math.hypot(x1 - x0, y1 - y0) / 2 + 10;
          for (let o = -R; o <= R; o += spacing * (0.7 + r() * 0.6)) {
            if (r() > density) continue;
            // March along the hatch line, laying strokes wherever it is inside.
            let t = -R;
            while (t < R) {
              const L0 = len[0] + r() * (len[1] - len[0]);
              const px = cx + ux * t + vx * o, py = cy + uy * t + vy * o;
              const qx = px + ux * L0, qy = py + uy * L0;
              const inA = test(px, py), inB = test(qx, qy), inM = test((px + qx) / 2, (py + qy) / 2);
              if (inA || inB || inM) {
                const os = (r() - 0.3) * overshoot;
                const sx = px - ux * os + vx * (r() - 0.5) * jitter, sy = py - uy * os + vy * (r() - 0.5) * jitter;
                const ex = qx + ux * (r() - 0.5) * overshoot + vx * (r() - 0.5) * jitter, ey = qy + uy * (r() - 0.5) * overshoot + vy * (r() - 0.5) * jitter;
                if (inA && inB) {
                  const b = (r() - 0.5) * bend * L0;
                  const mx = (sx + ex) / 2 + vx * b, my = (sy + ey) / 2 + vy * b;
                  strokeOn(L.ctx, [[sx, sy], [mx, my], [ex, ey]], colour, r, { w: w * (0.7 + r() * 0.6), a: a * (0.6 + r() * 0.5) });
                } else if (inA || inB) {
                  // Trim to the boundary with a small ragged overrun.
                  let a0 = [sx, sy], a1 = [ex, ey];
                  const n = 10;
                  for (let k = 0; k <= n; k++) {
                    const qx2 = lerp(sx, ex, k / n), qy2 = lerp(sy, ey, k / n);
                    if (!test(qx2, qy2)) { if (inA) { a1 = [qx2 + ux * r() * overshoot, qy2 + uy * r() * overshoot]; break; } else { a0 = [qx2, qy2]; } }
                    else if (!inA && k > 0) { a0 = [qx2 - ux * r() * overshoot, qy2 - uy * r() * overshoot]; break; }
                  }
                  strokeOn(L.ctx, [a0, a1], colour, r, { w: w * (0.7 + r() * 0.5), a: a * (0.5 + r() * 0.4) });
                }
              }
              t += L0 * (0.55 + r() * 0.55);
            }
          }
        },
        /** Scumble: small overlapping loops that build a broken tone. */
        scumble(poly, { count = 60, loops = [8, 22], size = [1.6, 4.2], w = 1.1, a = 0.38 } = {}) {
          // A wandering scribble of small loops that drifts through the region.
          const test = inside(poly);
          const [x0, y0, x1, y1] = bounds(poly);
          let placed = 0, tries = 0;
          while (placed < count && tries < count * 40) {
            tries++;
            let x = lerp(x0, x1, r()), y = lerp(y0, y1, r());
            if (!test(x, y)) continue;
            placed++;
            const n = Math.round(lerp(loops[0], loops[1], r()));
            let dir = r() * 6.28;
            let run = [];
            for (let k = 0; k < n; k++) {
              const s = lerp(size[0], size[1], r());
              const ph = r() * 6.28;
              for (let t = 0; t < 1; t += 0.125) {
                const th = ph + t * Math.PI * 2;
                run.push([x + Math.cos(th) * s, y + Math.sin(th) * s * (0.55 + r() * 0.3)]);
              }
              dir += (r() - 0.5) * 1.2;
              const nx = x + Math.cos(dir) * s * 1.1, ny = y + Math.sin(dir) * s * 1.1;
              if (test(nx, ny)) { x = nx; y = ny; } else { dir += Math.PI * 0.8; }
              if (run.length > 18) { strokeOn(L.ctx, run, colour, r, { w: w * (0.7 + r() * 0.5), a: a * (0.5 + r() * 0.6) }); run = run.slice(-1); }
            }
            if (run.length > 2) strokeOn(L.ctx, run, colour, r, { w: w * 0.8, a: a * 0.6 });
          }
        },
        /**
         * A current: many strands following one path, spread across a width
         * that can swell and narrow. Used for flows, routes and currents.
         */
        current(path, { strands = 40, width = 30, widthAt = null, w = 1.4, a = 0.45, amp = 1.2, spread = 1, lengthFrac = [0.35, 1] } = {}) {
          const P = resample(path, 4);
          const N = P.length;
          const normals = P.map((_, i) => {
            const a0 = P[Math.max(0, i - 1)], a1 = P[Math.min(N - 1, i + 1)];
            let nx = -(a1[1] - a0[1]), ny = a1[0] - a0[0];
            const l = Math.hypot(nx, ny) || 1;
            return [nx / l, ny / l];
          });
          for (let s = 0; s < strands; s++) {
            const lane = (r() - 0.5) * 2 * spread;
            const f0 = r() * (1 - lengthFrac[0]);
            const f1 = Math.min(1, f0 + lerp(lengthFrac[0], lengthFrac[1], r()));
            const i0 = Math.floor(f0 * (N - 1)), i1 = Math.max(i0 + 2, Math.floor(f1 * (N - 1)));
            const ph = r() * 100, fr = 0.02 + r() * 0.05;
            const nz = valueNoise(Math.floor(r() * 1e6));
            const pts = [];
            for (let i = i0; i <= Math.min(i1, N - 1); i++) {
              const t = i / (N - 1);
              const half = (widthAt ? widthAt(t) : width) / 2;
              const drift = (nz(i * fr + ph, ph) - 0.5) * 2 * amp * 3;
              const off = lane * half + drift;
              pts.push([P[i][0] + normals[i][0] * off, P[i][1] + normals[i][1] * off]);
            }
            // Long strands are laid as several overlapping pulls of the hand.
            let i = 0;
            while (i < pts.length - 1) {
              const len = 6 + Math.floor(r() * 22);
              strokeOn(L.ctx, pts.slice(i, Math.min(pts.length, i + len + 1)), colour, r, { w: w * (0.6 + r() * 0.7), a: a * (0.45 + r() * 0.6) });
              i += Math.max(2, len - Math.floor(r() * 3));
            }
          }
        },
        /** Stipple: pressed dots. */
        stipple(poly, { count = 300, rad = [0.4, 1.2], a = 0.6 } = {}) {
          const test = inside(poly);
          const [x0, y0, x1, y1] = bounds(poly);
          const [R, G, B] = hexToRgb(colour);
          let placed = 0, tries = 0;
          while (placed < count && tries < count * 20) {
            tries++;
            const x = lerp(x0, x1, r()), y = lerp(y0, y1, r());
            if (!test(x, y)) continue;
            placed++;
            L.ctx.fillStyle = `rgba(${R},${G},${B},${a * (0.4 + r() * 0.6)})`;
            L.ctx.beginPath();
            L.ctx.arc(x, y, lerp(rad[0], rad[1], r()), 0, Math.PI * 2);
            L.ctx.fill();
          }
        },
        /** A pressed dot or node, drawn as a tight spiral of pigment. */
        dot(x, y, rad = 3, { a = 0.9, w = 1.2 } = {}) {
          // A node pressed into the paper: an unclosed ring filled by a few quick strokes.
          const ringPts = [];
          const st = r() * 6.28;
          for (let t = 0; t <= 1.08; t += 0.04) {
            const th = st + t * Math.PI * 2;
            ringPts.push([x + Math.cos(th) * rad * (1 + (r() - 0.5) * 0.12), y + Math.sin(th) * rad * (1 + (r() - 0.5) * 0.12)]);
          }
          strokeOn(L.ctx, ringPts, colour, r, { w, a, taper: 0.2, land: 0.15 });
          const n = 4 + Math.round(rad * 1.4);
          for (let k = 0; k < n; k++) {
            const th = r() * 6.28, off = (r() - 0.5) * rad * 1.3;
            const cx = x + Math.cos(th + 1.57) * off, cy = y + Math.sin(th + 1.57) * off;
            const l = rad * (0.6 + r() * 0.5);
            strokeOn(L.ctx, [[cx - Math.cos(th) * l, cy - Math.sin(th) * l], [cx + Math.cos(th) * l, cy + Math.sin(th) * l]], colour, r, { w: w * 0.9, a: a * 0.8 });
          }
        },
      };
      fn(pen);
      deposit(L, { pressure, grain, opacity, blend });
    },

    /** Lift pigment in a region, leaving residue — erasure is revision. */
    erase(poly, { strength = 0.7, angle = 20, seed: s = 3 } = {}) {
      const L = newLayer();
      const r = rng(s);
      const test = inside(poly);
      const [x0, y0, x1, y1] = bounds(poly);
      const th = (angle * Math.PI) / 180, ux = Math.cos(th), uy = Math.sin(th);
      for (let k = 0; k < 220; k++) {
        const x = lerp(x0, x1, r()), y = lerp(y0, y1, r());
        if (!test(x, y)) continue;
        const l = 10 + r() * 30;
        L.ctx.strokeStyle = `rgba(0,0,0,${strength * (0.4 + r() * 0.6)})`;
        L.ctx.lineWidth = 3 + r() * 5;
        L.ctx.beginPath(); L.ctx.moveTo(x, y); L.ctx.lineTo(x + ux * l, y + uy * l); L.ctx.stroke();
      }
      sctx.save();
      sctx.globalCompositeOperation = "destination-out";
      sctx.drawImage(L.c, 0, 0);
      sctx.restore();
    },

    /** Catmull–Rom through control points, returned as a dense polyline. */
    spline(ctrl, per = 16) {
      const out = [];
      const P = [ctrl[0], ...ctrl, ctrl[ctrl.length - 1]];
      for (let i = 1; i < P.length - 2; i++) {
        const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
        for (let k = 0; k < per; k++) {
          const t = k / per, t2 = t * t, t3 = t2 * t;
          out.push([
            0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
            0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
          ]);
        }
      }
      out.push(ctrl[ctrl.length - 1]);
      return out;
    },

    canvas: sheet,
    /** Flatten onto white (or keep transparency) for export. */
    export({ background = "#ffffff" } = {}) {
      if (!background) return sheet.toDataURL("image/png");
      const out = document.createElement("canvas");
      out.width = CW; out.height = CH;
      const o = out.getContext("2d");
      o.fillStyle = background; o.fillRect(0, 0, CW, CH);
      o.drawImage(sheet, 0, 0);
      return out.toDataURL("image/png");
    },
  };
  return api;
}

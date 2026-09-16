/**
 * The head, and the network inside it.
 *
 * The hero drawing for the atlas front door. A profile in graphite with a
 * dense coloured network worked over the skull and out past it — disciplines
 * as masses of pigment, the relations between them as long arcs, and the hand
 * talking round the edges.
 *
 * The profile is drawn as two *open* strokes through hand-placed control
 * points: the face line from crown to neck, and the back of the skull. An open
 * spline matters — a closed one wraps the last point back to the first and
 * turns a face into a pod, which is exactly what happens if you reach for the
 * contour helper by habit.
 *
 * Nothing here is decorative-only. The disciplines are the atlas's real
 * branches, and the colours separate one field from the next and encode
 * nothing else.
 */

import { Plate } from "../../_components/Pigment";
import { Ball, Burst, Field, Halo, Link as Bow, Note, Pencil, Squiggle } from "../../_components/Draw";
import { runPts } from "../../_lib/pencil";
import { rng, type Pt } from "../../_lib/pigment";
import type { Hue } from "../../_components/Pigment";

/** Catmull–Rom through points, sampled and left open at both ends. */
function openSpline(ctrl: Pt[], steps = 12): Pt[] {
  const p = [ctrl[0], ...ctrl, ctrl[ctrl.length - 1]];
  const out: Pt[] = [];
  for (let i = 1; i < p.length - 2; i += 1) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    for (let s = 0; s < steps; s += 1) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push([
        0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      ]);
    }
  }
  out.push(ctrl[ctrl.length - 1]);
  return out;
}

/* The face, crown to neck, facing left. */
const FACE: Pt[] = [
  [438, 168], [400, 124], [352, 102], [300, 100], [252, 118],
  [216, 158], [200, 212], [197, 256], [203, 280], [186, 300],
  [176, 324], [164, 350], [190, 362], [184, 378], [199, 390],
  [188, 404], [200, 418], [193, 436], [212, 456], [242, 474],
  [286, 488], [332, 494], [356, 512], [360, 556], [366, 606],
];
/* The back of the skull and the nape. */
const NAPE: Pt[] = [
  [438, 168], [462, 214], [470, 274], [462, 336], [444, 394],
  [424, 442], [412, 486], [418, 540], [426, 606],
];

const FIELDS: { label: string; hue: Hue; x: number; y: number; r: number; seed: number }[] = [
  { label: "Cognitive\nScience", hue: "cobalt", x: 344, y: 214, r: 33, seed: 101 },
  { label: "Philosophy", hue: "orange", x: 596, y: 174, r: 29, seed: 149 },
  { label: "Psychology", hue: "vermilion", x: 648, y: 312, r: 35, seed: 193 },
  { label: "Neuroscience", hue: "emerald", x: 606, y: 452, r: 27, seed: 241 },
  { label: "AI &\nMachine Learning", hue: "violet", x: 470, y: 536, r: 29, seed: 283 },
  { label: "Music\nPsychology", hue: "lemon", x: 236, y: 552, r: 31, seed: 331 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 2], [2, 3], [3, 4], [4, 5], [0, 5], [0, 3], [1, 3],
];

export function HeadNetwork() {
  const r = rng(7);

  /* The core. Strokes radiate from a point inside the skull and reach past the
     profile, so the network reads as coming *from* the head rather than being
     laid on top of it. */
  const CORE: Hue[] = ["cobalt", "vermilion", "lemon", "emerald", "violet", "orange", "teal", "magenta"];
  const cx = 318;
  const cy = 308;
  const rays = Array.from({ length: 78 }, (_, i) => {
    const a = r() * Math.PI * 2;
    const inner = 8 + r() * 46;
    const outer = inner + 40 + r() * 190;
    return {
      a: [cx + Math.cos(a) * inner, cy + Math.sin(a) * inner * 0.94] as Pt,
      b: [cx + Math.cos(a) * outer, cy + Math.sin(a) * outer * 0.94] as Pt,
      hue: CORE[i % CORE.length],
      seed: 900 + i * 17,
      w: 0.8 + r() * 1.1,
      o: 0.2 + r() * 0.4,
    };
  });

  return (
    <Plate viewBox="0 0 780 640" ratio="780 / 640"
      title="A profile in graphite with a dense coloured network worked over it. Six disciplines — cognitive science, philosophy, psychology, neuroscience, AI and machine learning, and music psychology — sit as masses of pigment around and inside the skull, with arcs between the fields that share records.">

      {/* The mass in the skull, laid first so the profile reads on top. */}
      <Field x={214} y={196} w={216} h={216} hue="cobalt" seed={401} passes={14} rows={10} angle={-18} weight={0.15} width={1.4} taper={0.4} />
      <Field x={248} y={230} w={196} h={190} hue="vermilion" seed={409} passes={12} rows={10} angle={20} weight={0.13} width={1.4} taper={0.4} />
      <Field x={232} y={262} w={180} h={166} hue="lemon" seed={419} passes={11} rows={9} angle={-2} weight={0.16} width={1.4} taper={0.4} />

      {rays.map((c, i) => (
        <Pencil key={`c${i}`} runs={[runPts(c.a[0], c.a[1], c.b[0], c.b[1], c.seed, 3.4)]}
          hue={c.hue} seed={c.seed} passes={1} broken={0.34} weight={c.w} opacity={c.o} />
      ))}

      {/* Scattered deposits: the individual records. */}
      {Array.from({ length: 30 }, (_, i) => {
        const a = r() * Math.PI * 2;
        const rad = 90 + r() * 250;
        const x = cx + 40 + Math.cos(a) * rad;
        const y = cy + Math.sin(a) * rad * 0.86;
        return (
          <circle key={`d${i}`} className="sf-mark" cx={x.toFixed(1)} cy={y.toFixed(1)}
            r={(1.8 + r() * 2.6).toFixed(1)} fill={`var(--pg-${CORE[i % CORE.length]})`}
            fillOpacity={(0.4 + r() * 0.45).toFixed(2)} aria-hidden="true" />
        );
      })}

      {/* Relations between fields: long, thin, and behind the labels. */}
      {EDGES.map(([a, b], i) => (
        <Bow key={`e${i}`} x1={FIELDS[a].x} y1={FIELDS[a].y} x2={FIELDS[b].x} y2={FIELDS[b].y}
          hue="graphite" bend={0.11 + (i % 3) * 0.05} seed={700 + i * 13} weight={0.9} opacity={0.24} />
      ))}

      {/* The profile: two open strokes, gone over twice. */}
      <Pencil runs={[openSpline(FACE)]} hue="charcoal" seed={11} passes={2}
        broken={0.1} drift={0.9} weight={1.8} opacity={0.78} keepFirst />
      <Pencil runs={[openSpline(NAPE)]} hue="charcoal" seed={13} passes={2}
        broken={0.16} drift={1} weight={1.5} opacity={0.55} keepFirst />
      {/* Brow and eye — two marks, no more. */}
      <Pencil runs={[runPts(224, 292, 262, 286, 17, 1.1)]} hue="charcoal" seed={17} passes={2} broken={0.08} weight={1.6} opacity={0.62} />
      <Pencil runs={[runPts(232, 306, 252, 305, 19, 0.8)]} hue="charcoal" seed={19} passes={1} broken={0} weight={1.7} opacity={0.5} />
      {/* Ear. */}
      <Pencil runs={[openSpline([[318, 342], [340, 336], [348, 356], [338, 380], [318, 384]], 8)]}
        hue="charcoal" seed={23} passes={1} broken={0.14} weight={1.3} opacity={0.4} />

      {/* The disciplines. */}
      {FIELDS.map((f, i) => (
        <g key={f.label}>
          <Ball cx={f.x} cy={f.y} rx={f.r} ry={f.r * 0.92} hue={f.hue} seed={f.seed}
            count={12} weight={1.5} opacity={0.34} drift={0.26} />
          <Halo cx={f.x} cy={f.y} rx={f.r} ry={f.r * 0.92} hue={f.hue} seed={f.seed + 7}
            laps={2} weight={1.6} opacity={0.55} />
          <foreignObject x={f.x - 80} y={f.y + f.r + 6} width={160} height={42}>
            <p style={{
              margin: 0, textAlign: "center", whiteSpace: "pre-line",
              font: "500 12.5px/1.18 var(--sf-newsreader), Georgia, serif", color: "var(--ink)",
              textShadow: "0 0 5px #fff, 0 0 5px #fff, 0 0 9px #fff",
            }}>{f.label}</p>
          </foreignObject>
          {i % 2 === 0 ? (
            <Burst cx={f.x + f.r + 13} cy={f.y - f.r - 7} r={8} hue={f.hue} seed={f.seed + 31} rays={6} weight={1.2} opacity={0.6} />
          ) : null}
        </g>
      ))}

      {/* The hand, round the edges and clear of the labels. */}
      <Note x={20} y={60} hue="cobalt" size={18} rotate={-4}>{"See connections.\nFind new\nquestions."}</Note>
      <Squiggle x={20} y={116} len={112} hue="vermilion" seed={811} cycles={4} amp={2.4} weight={1.5} opacity={0.6} />
      <Note x={14} y={392} hue="cobalt" size={18} rotate={-5}>{"Ideas\ncross\ndisciplines."}</Note>
      <Squiggle x={14} y={440} len={98} hue="cobalt" seed={821} cycles={4} amp={2.2} weight={1.4} opacity={0.5} />
      <Note x={598} y={46} hue="graphite" size={18} rotate={-3}>{"Different theories.\nA richer picture."}</Note>
      <Squiggle x={598} y={82} len={148} hue="lemon" seed={831} cycles={3} amp={2.8} weight={3.6} opacity={0.4} />
      <Note x={556} y={584} hue="graphite" size={16} rotate={-2}>{"“A theory is not a final answer,\nbut a clearer way of asking questions.”"}</Note>
      <Note x={14} y={534} hue="graphite" size={18} rotate={-3}>{"Same ideas.\nMore ways\nto see them."}</Note>
      <Squiggle x={14} y={582} len={112} hue="vermilion" seed={841} cycles={4} amp={2.4} weight={1.5} opacity={0.55} />
    </Plate>
  );
}

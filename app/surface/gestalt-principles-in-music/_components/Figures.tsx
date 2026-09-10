/**
 * Gestalt — the drawings.
 *
 * These figures are about note-heads, gaps and phrase boundaries, so they are
 * drawn as music: a hand-ruled stave, a sketched clef, note-heads at their real
 * diatonic positions with stems and ledger lines, and slurs over the events a
 * reading gathers. An abstract dot on a pitch axis would be a chart *of* the
 * music; this is the thing itself, marked up.
 *
 * The record's problem is that one set of events supports more than one
 * organisation, so the plates are built out of overlap: two readings laid over
 * the same notes in two pigments, mixing where they claim the same span.
 *
 * Every event position comes from the arrays the record's own audio presets
 * use. Where two conditions share a stimulus they share the array, and the
 * note-head is drawn from a fixed seed so it is the same mark, not a similar
 * one.
 */

import { Plate } from "../../_components/Pigment";
import {
  Arrow, Barline, Burst, Clef, Contour, Field, Halo, Lifted, Marker,
  Note, NoteMark, Rule, Slur, Squiggle, Stave, Tag, Term,
} from "../../_components/Draw";
import { Pencil } from "../../_components/Draw";
import { runPts } from "../../_lib/pencil";

/* --------------------------------------------------------------- staves -- */

const T_MAX = 2.12;
const GAP = 9;

/** Diatonic step for a MIDI pitch: what line or space it actually sits on. */
const DEGREE = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
const step = (midi: number) => Math.floor(midi / 12) * 7 + DEGREE[midi % 12];
const B4 = step(71); // the middle line of a treble stave

/** y for a pitch, measured against the stave's middle line. */
const sy = (midi: number, mid: number) => mid - (step(midi) - B4) * (GAP / 2);
const ex = (onset: number, left: number, w: number) => left + (onset / T_MAX) * w;

/** Ledger lines for anything outside the five. Drawn short and by hand. */
function Ledgers({ midi, x, mid, seed }: { midi: number; x: number; mid: number; seed: number }) {
  const s = step(midi) - B4;
  const runs = [];
  // Below the stave: E4 is the bottom line, so anything under it needs ledgers.
  for (let k = -6; k >= s; k -= 2) runs.push(runPts(x - 9, mid - k * (GAP / 2), x + 9, mid - k * (GAP / 2), seed + k, 0.9));
  for (let k = 6; k <= s; k += 2) runs.push(runPts(x - 9, mid - k * (GAP / 2), x + 9, mid - k * (GAP / 2), seed + k, 0.9));
  if (!runs.length) return null;
  return <Pencil runs={runs} hue="warmgrey" seed={seed} passes={1} broken={0.14} weight={1} opacity={0.5} />;
}

/** The stave, its clef, and a closing barline. */
function Score({ x1, x2, mid, seed }: { x1: number; x2: number; mid: number; seed: number }) {
  return (
    <>
      <Stave x1={x1} x2={x2} y={mid} gap={GAP} seed={seed} weight={0.95} opacity={0.4} />
      <Clef x={x1 + 16} y={mid + GAP} gap={GAP} seed={seed + 3} weight={1.5} opacity={0.55} />
      <Barline x={x2} y={mid} gap={GAP} seed={seed + 5} weight={1.2} opacity={0.42} />
    </>
  );
}

/* ------------------------------------------- figure 1 — the moved boundary */

const OPEN_PITCHES = [60, 62, 64, 65, 67, 69, 67, 65];
const OPEN_A = [0, 0.24, 0.48, 0.72, 1.2, 1.44, 1.68, 1.92];
const OPEN_B = [0, 0.24, 0.48, 0.72, 0.96, 1.44, 1.68, 1.92];

/**
 * Figure 1. The same eight notes twice, with the one enlarged interval moved.
 * Each reading gets a slur over the notes it gathers and a loose wash of colour
 * behind it — a grouping as a musician would mark one, not a bar chart.
 */
export function MovedBoundary() {
  const L = 74;
  const W = 470;
  const rows = [
    { onsets: OPEN_A, mid: 108, hue: "teal" as const, after: 4, tag: "A", note: "gap after 04" },
    { onsets: OPEN_B, mid: 286, hue: "vermilion" as const, after: 5, tag: "B", note: "gap after 05" },
  ];

  return (
    <Plate viewBox="0 0 680 420" title="Two conditions on the same eight notes, written on a stave. In condition A the one enlarged interval falls after event 04; in condition B it falls after event 05. Pitch, order, timbre, duration and total length are identical; only where the gap sits differs, and with it which notes a slur can gather.">

      {rows.map((row) => {
        const xs = row.onsets.map((o) => ex(o, L + 46, W));
        const ys = OPEN_PITCHES.map((p) => sy(p, row.mid));
        const bx = (xs[row.after - 1] + xs[row.after]) / 2;
        const gA = [xs[0], xs[row.after - 1]];
        const gB = [xs[row.after], xs[7]];

        return (
          <g key={row.tag}>
            {/* Colour behind the notes each reading gathers. */}
            <Field x={gA[0] - 20} y={row.mid - 26} w={gA[1] - gA[0] + 40} h={50} hue={row.hue}
              seed={row.after * 91} passes={11} rows={10} angle={-12} weight={0.17} width={1.4} taper={0.34} />
            <Field x={gB[0] - 20} y={row.mid - 26} w={gB[1] - gB[0] + 40} h={50} hue={row.hue}
              seed={row.after * 131} passes={11} rows={10} angle={14} weight={0.17} width={1.4} taper={0.34} />

            <Score x1={L} x2={L + W + 66} mid={row.mid} seed={row.after * 7} />

            {xs.map((x, i) => (
              <g key={i}>
                <Ledgers midi={OPEN_PITCHES[i]} x={x} mid={row.mid} seed={row.after * 11 + i} />
                <NoteMark x={x} y={ys[i]} seed={900 + i * 37}
                  stemDir={ys[i] > row.mid ? 1 : -1} stemLen={26} weight={1.5} opacity={0.72} />
                <Term x={x} y={row.mid + 46} size={9.5} hue="warmgrey">{String(i + 1).padStart(2, "0")}</Term>
              </g>
            ))}

            {/* The grouping, marked the way a musician marks one. */}
            <Slur x1={gA[0] - 6} x2={gA[1] + 6} y={row.mid - 30} depth={13} hue={row.hue}
              seed={row.after * 17} weight={1.6} opacity={0.72} />
            <Slur x1={gB[0] - 6} x2={gB[1] + 6} y={row.mid - 30} depth={13} hue={row.hue}
              seed={row.after * 29} weight={1.6} opacity={0.72} />

            {/* Where the enlarged interval actually falls. */}
            <Squiggle x={bx} y={row.mid - 52} len={22} hue={row.hue} seed={row.after * 13}
              cycles={3} amp={4.4} weight={2} opacity={0.8} rotate={90} />
            <Tag x={bx} y={row.mid - 58} hue={row.hue} size={9} anchor="middle">{row.note}</Tag>
            <Term x={L - 22} y={row.mid + 6} size={21} hue="graphite" anchor="middle" italic weight={380}>{row.tag}</Term>
          </g>
        );
      })}

      <Arrow x1={ex(OPEN_A[4], L + 46, W) - 26} y1={162} x2={ex(OPEN_B[4], L + 46, W) - 20} y2={236}
        hue="graphite" bend={-0.36} seed={41} weight={1.6} opacity={0.52} size={9} />
      <Note x={ex(OPEN_A[4], L + 46, W) - 150} y={206} hue="graphite" size={17}>{"the gap moves"}</Note>

      <Burst cx={618} cy={78} r={13} hue="lemon" seed={63} rays={7} weight={1.7} opacity={0.9} />
      <Note x={594} y={110} hue="graphite" size={18}>{"same notes."}</Note>
      <Note x={594} y={132} hue="vermilion" size={18}>{"different"}</Note>
      <Note x={594} y={152} hue="vermilion" size={18}>{"groups."}</Note>
      <Squiggle x={594} y={164} len={72} hue="vermilion" seed={57} cycles={4} amp={2.4} weight={1.5} opacity={0.58} />

      <Marker x={80} y={382} w={300} h={20} hue="lemon" seed={71} opacity={0.42} />
      <Note x={88} y={397} hue="charcoal" size={19}>{"the notes did not change — the cue did."}</Note>
    </Plate>
  );
}

/* --------------------------------------- figure 2 — one event, two wholes */

/**
 * Figure 2. The central note is drawn once and instanced twice; only the slur
 * moves. It has to be visibly the same note, or the figure argues something the
 * record does not.
 */
export function OneEventTwoWholes({ cases }: { cases: { label: string; before: string; central: string; after: string; role: string }[] }) {
  const panels = [
    { hue: "teal" as const, breakAfter: 3, seed: 41 },
    { hue: "vermilion" as const, breakAfter: 2, seed: 83 },
  ];
  const pitch = [60, 62, 64, 65, 67, 69];

  return (
    <Plate viewBox="0 0 540 400" title="The same central note under two organisations. In the first the slur closes after it and it reads as the end of a local group; in the second the slur begins before it and it reads as a continuation into the next group. The note itself is identical in both.">
      {panels.map((panel, pi) => {
        const mid = 108 + pi * 172;
        const L = 84;
        const W = 300;
        const xs = pitch.map((_, i) => L + 52 + (i / 5) * W);
        const ys = pitch.map((p) => sy(p, mid));
        const b = panel.breakAfter;

        return (
          <g key={pi}>
            <Field x={xs[0] - 20} y={mid - 24} w={xs[b] - xs[0] + 36} h={48} hue={panel.hue}
              seed={panel.seed} passes={9} rows={9} angle={-13} weight={0.16} width={1.4} taper={0.34} />
            <Field x={xs[b + 1] - 18} y={mid - 24} w={xs[5] - xs[b + 1] + 36} h={48} hue={panel.hue}
              seed={panel.seed + 17} passes={9} rows={9} angle={14} weight={0.16} width={1.4} taper={0.34} />

            <Score x1={L} x2={L + W + 74} mid={mid} seed={panel.seed} />
            {xs.map((x, i) => (
              <g key={i}>
                <Ledgers midi={pitch[i]} x={x} mid={mid} seed={panel.seed + i} />
                <NoteMark x={x} y={ys[i]} seed={900 + i * 37} size={i === 3 ? 1.2 : 1}
                  stemDir={ys[i] > mid ? 1 : -1} stemLen={25}
                  weight={i === 3 ? 1.7 : 1.4} opacity={i === 3 ? 0.82 : 0.66} />
              </g>
            ))}

            <Slur x1={xs[0] - 6} x2={xs[b] + 6} y={mid - 28} depth={12} hue={panel.hue} seed={panel.seed + 5} weight={1.6} opacity={0.72} />
            <Slur x1={xs[b + 1] - 6} x2={xs[5] + 6} y={mid - 28} depth={12} hue={panel.hue} seed={panel.seed + 9} weight={1.6} opacity={0.72} />

            {/* The held note, claimed but not altered. */}
            <Halo cx={xs[3]} cy={ys[3]} rx={17} ry={15} hue="graphite" seed={panel.seed + 31} laps={2} weight={1.3} opacity={0.58} />
            <Term x={xs[3]} y={mid + 48} size={12} hue="charcoal">F</Term>

            <Tag x={L - 10} y={mid - 38} hue="graphite" size={8.5} anchor="end">{cases[pi]?.label ?? ""}</Tag>
            <foreignObject x={L - 76} y={mid - 28} width={62} height={90}>
              <p style={{ margin: 0, font: "italic 10.5px/1.32 var(--sf-newsreader), Georgia, serif", color: "var(--pg-warmgrey)" }}>
                {cases[pi]?.role ?? ""}
              </p>
            </foreignObject>
          </g>
        );
      })}
      <Arrow x1={476} y1={126} x2={476} y2={244} hue="graphite" bend={0.26} seed={77} weight={1.5} opacity={0.48} size={8} />
      <Note x={486} y={180} hue="graphite" size={17}>{"same\nnote.\ntwo roles."}</Note>
      <Marker x={86} y={362} w={216} h={19} hue="lemon" seed={91} opacity={0.42} />
      <Note x={94} y={376} hue="charcoal" size={19}>{"the whole changes the part"}</Note>
    </Plate>
  );
}

/* ------------------------------------------- figure 3 — the contested span */

const CONF_A = [60, 62, 64, 65, 67, 69, 67, 65];
const CONF_BC = [60, 62, 64, 65, 67, 79, 77, 75];
const REGULAR = [0, 0.24, 0.48, 0.72, 0.96, 1.2, 1.44, 1.68];
const GAPPED = [0, 0.24, 0.48, 0.72, 1.2, 1.44, 1.68, 1.92];

/**
 * Figure 3. The peak, and the only place two pigments occupy one span.
 *
 * Proximity proposes X; a register change proposes Y. In C both run over one
 * stimulus: two slurs in two colours disagree about where the phrase breaks,
 * and the wash between them is worked in both so it genuinely darkens. Exactly
 * one note falls inside, and the contour round it does not close.
 */
export function ContestedSpan() {
  const L = 96;
  const W = 590;
  const rows = [
    { tag: "A", onsets: GAPPED, pitches: CONF_A, cues: [{ after: 4, label: "X", hue: "teal" as const }], cap: "time favours X" },
    { tag: "B", onsets: REGULAR, pitches: CONF_BC, cues: [{ after: 5, label: "Y", hue: "ochre" as const }], cap: "register favours Y" },
    { tag: "C", onsets: GAPPED, pitches: CONF_BC, cues: [{ after: 4, label: "X", hue: "teal" as const }, { after: 5, label: "Y", hue: "ochre" as const }], cap: "the cues conflict" },
  ];

  return (
    <Plate viewBox="0 0 900 660" title="Three conditions over one melodic frame, written on a stave. In A a larger temporal gap proposes boundary X. In B regular timing with a large register change proposes boundary Y. In C both cues are present at once: two slurs in two colours disagree about where the phrase breaks, one note lies between them, and which group that note belongs to is what the competition leaves open.">

      {rows.map((row, ri) => {
        const mid = 120 + ri * 190;
        const xs = row.onsets.map((o) => ex(o, L + 52, W));
        const ys = row.pitches.map((p) => sy(p, mid));
        const bxs = row.cues.map((c) => (xs[c.after - 1] + xs[c.after]) / 2);
        const contested = row.cues.length === 2;

        return (
          <g key={row.tag}>
            {row.cues.map((c, ci) => {
              const bx = bxs[ci];
              return (
                <g key={c.label}>
                  <Field x={xs[0] - 22} y={mid - 30} w={bx - xs[0] + 16} h={62} hue={c.hue}
                    seed={c.after * 71 + ci * 11} passes={11} rows={10} angle={ci ? 15 : -14}
                    weight={0.17} width={1.4} taper={0.32} />
                  <Field x={bx + 8} y={mid - 30} w={xs[7] + 24 - bx} h={62} hue={c.hue}
                    seed={c.after * 113 + ci * 11} passes={11} rows={10} angle={ci ? -12 : 16}
                    weight={0.17} width={1.4} taper={0.32} />
                </g>
              );
            })}

            <Score x1={L} x2={L + W + 74} mid={mid} seed={row.tag.charCodeAt(0)} />

            {xs.map((x, i) => (
              <g key={i}>
                <Ledgers midi={row.pitches[i]} x={x} mid={mid} seed={ri * 31 + i} />
                <NoteMark x={x} y={ys[i]} seed={900 + i * 37} size={contested && i === 4 ? 1.2 : 1}
                  stemDir={ys[i] > mid ? 1 : -1} stemLen={26}
                  weight={contested && i === 4 ? 1.7 : 1.5} opacity={contested && i === 4 ? 0.84 : 0.7} />
                <Term x={x} y={mid + 48} size={9.5} hue="warmgrey">{String(i + 1).padStart(2, "0")}</Term>
              </g>
            ))}

            {/* Two readings, marked as two slurs that disagree. */}
            {row.cues.map((c, ci) => (
              <g key={`s${c.label}`}>
                <Slur x1={xs[0] - 6} x2={bxs[ci] - 8} y={mid - 34 - ci * 13} depth={13} hue={c.hue}
                  seed={c.after * 19 + ci} weight={1.7} opacity={0.75} />
                <Slur x1={bxs[ci] + 8} x2={xs[7] + 8} y={mid - 34 - ci * 13} depth={13} hue={c.hue}
                  seed={c.after * 37 + ci} weight={1.7} opacity={0.75} />
                <Squiggle x={bxs[ci]} y={mid - 62 - ci * 13} len={22} hue={c.hue} seed={c.after * 23}
                  cycles={3} amp={4.6} weight={2.1} opacity={0.84} rotate={90} />
                <Term x={bxs[ci]} y={mid - 68 - ci * 13} size={16} hue={c.hue} italic weight={520}>{c.label}</Term>
              </g>
            ))}

            {contested ? (
              <>
                <Contour
                  points={[[bxs[0] + 2, mid - 30], [xs[4], mid - 40], [bxs[1] - 2, mid - 26],
                           [bxs[1] + 8, mid], [bxs[1] - 4, mid + 34],
                           [xs[4], mid + 44], [bxs[0] + 4, mid + 32], [bxs[0] - 6, mid]]}
                  hue="graphite" seed={301} weight={1.7} opacity={0.6} dash="9 7" wobble={3} />
                <Burst cx={xs[4] - 22} cy={ys[4] - 30} r={14} hue="vermilion" seed={311} rays={8} weight={1.8} opacity={0.82} />
                <Arrow x1={xs[7] + 58} y1={mid + 84} x2={xs[4] + 12} y2={mid + 48}
                  hue="vermilion" bend={0.24} seed={317} weight={1.8} opacity={0.74} size={9} />
                <Note x={xs[7] + 64} y={mid + 96} hue="vermilion" size={18}>{"one note,\nin dispute"}</Note>
              </>
            ) : null}

            <Term x={54} y={mid - 34} size={23} hue="graphite" anchor="middle" italic weight={380}>{row.tag}</Term>
            <foreignObject x={16} y={mid - 24} width={74} height={76}>
              <p style={{ margin: 0, font: "italic 11px/1.32 var(--sf-newsreader), Georgia, serif", color: "var(--pg-warmgrey)" }}>{row.cap}</p>
            </foreignObject>
          </g>
        );
      })}

      <Marker x={100} y={624} w={272} h={20} hue="lemon" seed={331} opacity={0.42} />
      <Note x={108} y={639} hue="charcoal" size={20}>{"not a winner — a competition"}</Note>
    </Plate>
  );
}

/* -------------------------------------------------- figure 4 — the ladder */

/**
 * Figure 4. Notes becoming motives becoming phrases: nested slurs over one
 * line, which is exactly how a musician marks structure. Not a tree, because
 * the record keeps its hierarchy claim local and names recursive musical
 * hierarchy as belonging to GTTM.
 */
export function Ladder({ levels }: { levels: { label: string }[] }) {
  const hues = ["teal", "ochre", "vermilion", "violet"] as const;
  const L = 96;
  const W = 330;
  const mid = 214;
  const pitches = [60, 64, 62, 67, 65, 69, 67, 72, 71, 67, 65, 64];
  const xs = pitches.map((_, i) => L + 44 + (i / 11) * W);
  const spans = [
    [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]],
    [[0, 3], [4, 7], [8, 11]],
    [[0, 7], [8, 11]],
    [[0, 11]],
  ];

  return (
    <Plate viewBox="0 0 520 300" title="Four levels of grouping over one line of notes, drawn as nested slurs: single notes, small groups, phrases, and the whole span. Built from the level below rather than as a tree, because the record keeps its hierarchy claim local.">
      <Stave x1={L} x2={L + W + 76} y={mid} gap={GAP} seed={41} weight={0.95} opacity={0.4} />
      <Clef x={L + 16} y={mid + GAP} gap={GAP} seed={43} weight={1.5} opacity={0.55} />

      {xs.map((x, i) => (
        <g key={i}>
          <Ledgers midi={pitches[i]} x={x} mid={mid} seed={51 + i} />
          <NoteMark x={x} y={sy(pitches[i], mid)} seed={900 + i * 37}
            stemDir={sy(pitches[i], mid) > mid ? 1 : -1} stemLen={22} weight={1.4} opacity={0.66} />
        </g>
      ))}

      {spans.map((level, li) => (
        <g key={li}>
          {level.map(([a, b], si) => (
            <Slur key={si} x1={xs[a] - 5} x2={xs[b] + 5} y={mid - 34 - li * 20}
              depth={9 + li * 2} hue={hues[li]} seed={800 + li * 61 + si * 13} weight={1.6} opacity={0.7} />
          ))}
          <Tag x={L + 34} y={mid - 40 - li * 20} hue={hues[li]} size={7} anchor="end">{levels[li]?.label ?? ""}</Tag>
        </g>
      ))}

      <Note x={430} y={272} hue="graphite" size={16} anchor="end">{"parts become wholes"}</Note>
      <Rule x1={250} y1={280} x2={438} y2={278} hue="warmgrey" seed={861} weight={1} opacity={0.3} />
    </Plate>
  );
}

/* ---------------------------------------------- figure 5 — the open field */

/** A boundary that will not close, under the record's stopping points. */
export function OpenBoundary() {
  return (
    <Plate viewBox="0 0 320 150">
      <Lifted x={70} y={38} w={180} h={62} hue="graphite" seed={77} />
      <Contour
        points={[[52, 68], [96, 34], [166, 26], [238, 42], [264, 72], [244, 106], [170, 118], [104, 110]]}
        hue="graphite" seed={91} weight={1.4} opacity={0.46} dash="8 8" wobble={4} />
      <Note x={160} y={78} hue="graphite" size={19} anchor="middle">{"where it stops"}</Note>
      <Squiggle x={96} y={134} len={128} hue="warmgrey" seed={97} cycles={5} amp={2.6} weight={1.1} opacity={0.42} />
    </Plate>
  );
}

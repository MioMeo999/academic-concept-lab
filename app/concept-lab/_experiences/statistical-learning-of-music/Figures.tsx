"use client";

import { useId, useState, type ReactNode } from "react";
import type { AudioEvent, StatisticalRecordContent, StatisticalStream, StatisticalWorld } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { useTones } from "../../_folio/useTones";
import * as hand from "../../_folio/hand";
import { Ribbon, type RibbonMarks } from "./Ribbon";
import { TallyMarks } from "./Marks";
import { useNarrow } from "./useNarrow";
import { FLOW, TONES, conditional, flowBands, fmt, grid, pairSounding, reading, tallyAt, totalFrom, totalTo, tpOf } from "./geometry";
import s from "./stat.module.css";

/* ---------------------------------------------------------------------------
   A stream, and what a tally of it would show.

   Everything here is a count anyone could make of the record's constructed
   material: the stream of thirty-six tones and the two exposure histories. The
   counter is a teaching representation. It is not a claim that a listener
   tallies anything, and hearing a stream here does not show that the visitor
   learned it.
   ------------------------------------------------------------------------- */

const IOI = 0.32;
// trigonometric results can differ in their last digit between the server and the browser, so every drawn coordinate is rounded
const q = (v: number) => Math.round(v * 100) / 100;

function Player({ tones, id, events, label }: { tones: ReturnType<typeof useTones>; id: string; events: AudioEvent[]; label: string }) {
  const on = tones.playing === id;
  return (
    <div className={s.player}>
      <button type="button" className={s.play} onClick={() => void tones.play(id, events)} aria-label={`${on ? "Replay" : "Play"} ${label}`}>{on ? "Replay" : "Play"}</button>
      <button type="button" className={s.stopBtn} onClick={tones.stop} disabled={!on}>Stop</button>
      <span className={s.playState} aria-live="polite">{on ? "playing" : tones.unavailable ? "audio unavailable — read the counts" : "ready"}</span>
    </div>
  );
}

const soundingIndex = (events: AudioEvent[], at: number, playing: boolean) => {
  if (!playing) return undefined;
  const i = events.findIndex((e) => at >= e.start && at <= e.start + e.duration);
  return i < 0 ? undefined : i;
};

/* ------------------------------------------------------------------------
   The ledger: what followed what, across the whole stream
   --------------------------------------------------------------------- */

export function Ledger({ stream }: { stream: StatisticalStream }) {
  const seq = stream.noteSequence;
  const g = grid(seq, seq.length);
  const t = g.tally;
  const [ctx, setCtx] = useState("A");
  const [next, setNext] = useState("B");
  const uid = useId();
  const common = fmt(t.freq[next] ?? 0, t.n);
  const after = fmt(t.pairs[ctx + next] ?? 0, t.followed[ctx] ?? 0);
  const p = tpOf(t, ctx, next);
  return (
    <div className={s.ledgerWrap}>
      <div className={s.ledgerFigure}>
        <table className={s.ledger}>
          <caption className={s.sr}>What followed what in the thirty-six-tone exposure: each row is the tone that was heard, each column the tone that came next, and each cell how often that next tone followed.</caption>
          <thead>
            <tr>
              <th scope="col" className={s.corner}><span>heard ↓</span><span>next →</span></th>
              {TONES.map((to) => <th scope="col" key={to} data-on={to === next || undefined}>{to}</th>)}
              <th scope="col" className={s.heardHead}>heard</th>
            </tr>
          </thead>
          <tbody>
            {g.rows.map((row, i) => (
              <tr key={TONES[i]} data-on={TONES[i] === ctx || undefined}>
                <th scope="row">{TONES[i]}</th>
                {row.map((c) => (
                  <td key={c.to} data-count={c.count || undefined} data-target={(c.from === ctx && c.to === next) || undefined} style={{ "--p": c.p } as React.CSSProperties}>
                    {c.count ? c.p.toFixed(2) : <span aria-hidden="true">·</span>}
                  </td>
                ))}
                <td className={s.heardCell}><TallyMarks n={t.freq[TONES[i]] ?? 0} seed={i + 1} /><span>{t.freq[TONES[i]]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.ledgerPanel}>
        <div className={s.pickers}>
          <label htmlFor={`${uid}-ctx`}>
            <span>Given the tone</span>
            <select id={`${uid}-ctx`} value={ctx} onChange={(e) => setCtx(e.target.value)}>{TONES.map((x) => <option key={x} value={x}>{x}</option>)}</select>
          </label>
          <label htmlFor={`${uid}-next`}>
            <span>How likely is</span>
            <select id={`${uid}-next`} value={next} onChange={(e) => setNext(e.target.value)}>{TONES.map((x) => <option key={x} value={x}>{x}</option>)}</select>
          </label>
        </div>
        <dl className={s.readout} aria-live="polite">
          <div>
            <dt>P({next})</dt>
            <dd><strong>{common}</strong><span>how common is {next} overall?</span></dd>
          </div>
          <div data-emph>
            <dt>P({next} | {ctx})</dt>
            <dd><strong>{after}</strong><span>how likely is {next} right after {ctx}?</span></dd>
          </div>
        </dl>
        <p className={s.figNote}>{p === 0 ? `${next} never follows ${ctx} in this stream, though it is exactly as common as every other tone.` : p === 1 ? `${next} always follows ${ctx} in this stream, and is no more common than any other tone.` : `${next} sometimes follows ${ctx}: as common overall as any other tone, but not certain after ${ctx}.`}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   The stream: let it run past the tally
   --------------------------------------------------------------------- */

type Lens = "sound" | "common" | "follows" | "units";
const LENS_MARKS: Record<Lens, RibbonMarks> = {
  sound: { weighted: false, bars: "none" },
  common: { weighted: false, bars: "share" },
  follows: { weighted: true, bars: "next" },
  units: { weighted: true, bars: "next", cuts: true, brackets: true },
};

function streamReading(lens: Lens, stream: StatisticalStream, n: number): ReactNode {
  const seq = stream.noteSequence;
  const t = tallyAt(seq, n);
  const r = reading(seq, stream.unitSequence, n);
  if (lens === "sound") return <><b>What the sound gives you.</b> It gives you a continuous sequence of tones. The abstract units are not marked by pauses, accents, loudness, timbre, or special articulation.</>;
  if (lens === "common") {
    const counts = TONES.map((x) => t.freq[x] ?? 0);
    const max = Math.max(...counts), min = Math.min(...counts);
    return max === min
      ? <><b>How common each tone is.</b> After {n} tones every tone has occurred {max} {max === 1 ? "time" : "times"} — {fmt(max, n)} each. On this count no tone stands out from any other.</>
      : <><b>How common each tone is.</b> After {n} tones the most frequent tone has occurred {max} {max === 1 ? "time" : "times"} and the least {min}.</>;
  }
  const within = r.junctions.filter((_, i) => !r.actual.includes(i));
  const across = r.junctions.filter((_, i) => r.actual.includes(i));
  const mean = (xs: number[]) => (xs.length ? (xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(2) : "—");
  if (lens === "follows") {
    return <><b>How probable the next tone was.</b> After {n} tones, inside the hidden units the tone that came next has averaged {mean(within)}; across a unit boundary {across.length ? mean(across) : "no boundary has been heard yet"}. The thread is thick where the next tone was probable and hair-thin where it was not.</>;
  }
  return (
    <>
      <b>Cut where the bar dips.</b> {r.cuts.length ? `The bars dip at ${r.cuts.length} ${r.cuts.length === 1 ? "place" : "places"}` : "The bars do not dip anywhere yet"}: {r.found.length} of the {r.actual.length} unit {r.actual.length === 1 ? "boundary" : "boundaries"} heard so far {r.found.length === 1 ? "has" : "have"} been found
      {r.missed.length ? `; ${r.missed.length} ${r.missed.length === 1 ? "is" : "are"} still hidden` : ""}.
      {r.found.length === stream.unitSequence.length - 1 ? " Every boundary is found, and the stretches between them are the twelve units, in the order the record plays them." : ""}
    </>
  );
}

const LENSES: { value: Lens; label: string; hint: string }[] = [
  { value: "sound", label: "Just the sound", hint: "what reaches the ear" },
  { value: "common", label: "How common", hint: "P(tone)" },
  { value: "follows", label: "What follows", hint: "P(next | this)" },
  { value: "units", label: "Find the units", hint: "where the bars dip" },
];

export function Stream({ stream, glance }: { stream: StatisticalStream; glance?: ReactNode }) {
  const seq = stream.noteSequence;
  const [lens, setLens] = useState<Lens>("sound");
  const [n, setN] = useState(seq.length);
  const narrow = useNarrow();
  const tones = useTones();
  const uid = useId();
  const playing = tones.playing === "stream";
  const tracking = playing && tones.at > 0;
  const heard = tracking ? Math.min(seq.length, Math.floor(tones.at / IOI) + 1) : n;
  const now = soundingIndex(stream.events, tones.at, playing);
  const t = tallyAt(seq, heard);
  const marks = LENS_MARKS[lens];

  return (
    <div className={s.stream} data-lens={lens}>
      <figure className={s.streamFigure}>
        <Ribbon stream={stream} n={heard} marks={marks} now={now} narrow={narrow} label={`The ${seq.length}-tone stream as beads at their own pitches, in three rows. Lens: ${LENSES.find((l) => l.value === lens)!.label}. ${heard} of ${seq.length} tones heard.`} />
      </figure>
      <div className={s.streamPanel}>
        <Choices<Lens> label="What to count" value={lens} onChange={setLens} options={LENSES} />
        <div className={s.dose}>
          <label htmlFor={uid}>Tones heard: <b>{heard}</b> of {seq.length}</label>
          <input id={uid} className={s.range} type="range" min={2} max={seq.length} step={1} value={heard} onChange={(e) => { tones.stop(); setN(Number(e.target.value)); }} aria-valuetext={`${heard} of ${seq.length} tones heard`} />
        </div>
        <Player tones={tones} id="stream" events={stream.events} label="one continuous stream" />
        <p className={s.reading} aria-live="polite">{streamReading(lens, stream, heard)}</p>
        <p className={s.figNote}>{stream.audioSpec.duration} · {stream.audioSpec.ioI} · {stream.audioSpec.timbre}.</p>
      </div>

      <div className={s.streamTables}>
        {glance}
        <div className={s.tablesRow}>
          <section aria-label="Computed event frequencies">
            <p className={s.smallHead}>Event frequency · {heard} tones heard</p>
            <ul className={s.freqGrid}>
              {stream.eventFrequencies.map((f) => {
                const count = t.freq[f.label] ?? 0;
                return (
                  <li key={f.label}>
                    <b>{f.label}</b><span>{count}</span><small>{fmt(count, t.n)} of stream</small>
                  </li>
                );
              })}
            </ul>
          </section>
          <section aria-label="Computed transition counts and probabilities">
            <p className={s.smallHead}>Actual pair counts and conditional probabilities</p>
            <ul className={s.pairList}>
              {stream.transitions.map((tr) => {
                const count = t.pairs[tr.from + tr.to] ?? 0;
                const opp = t.followed[tr.from] ?? 0;
                return (
                  <li key={tr.from + tr.to} data-kind={tr.kind} data-heard={count > 0 || undefined}>
                    <span className={s.pairName}><b>{tr.from} → {tr.to}</b><small>{tr.kind === "within" ? "within unit" : "across unit boundary"}</small></span>
                    <span className={s.pairCount}><b>{count} / {opp}</b><small>{count ? fmt(count, opp) : "not yet heard"}</small></span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
        <details className={s.spec}>
          <summary>Read the audio specification and boundary audit</summary>
          <dl className={s.specGrid}>
            {Object.entries(stream.audioSpec).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <ul className={s.pitchGrid}>{stream.pitchMapping.map((p) => <li key={p.label}><b>{p.label}</b> MIDI {p.midi} · {p.frequency}</li>)}</ul>
          <ul className={s.auditList}>{stream.acousticAudit.map((x) => <li key={x}>{x}</li>)}</ul>
          <div className={s.auditPair}>
            <div><p className={s.smallHead}>within-unit intervals</p><p>{stream.withinAudit.direction} · mean {stream.withinAudit.mean} · range {stream.withinAudit.range}</p><small>{stream.withinAudit.distribution}</small></div>
            <div><p className={s.smallHead}>boundary intervals</p><p>{stream.boundaryAudit.direction} · mean {stream.boundaryAudit.mean} · range {stream.boundaryAudit.range}</p><small>{stream.boundaryAudit.distribution}</small></div>
          </div>
        </details>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Two histories: the same totals, a different flow
   --------------------------------------------------------------------- */

/** a box drawn by hand: four sides that do not quite meet */
const box = (x: number, y: number, w: number, h: number, seed: number) =>
  hand.line(x, y, x + w, y + 0.8, { seed, wander: 0.8, segments: 4 }) + hand.line(x + w, y + 0.8, x + w - 0.6, y + h, { seed: seed + 1, wander: 0.8, segments: 8 }) + hand.line(x + w - 0.6, y + h, x, y + h - 0.6, { seed: seed + 2, wander: 0.8, segments: 4 }) + hand.line(x, y + h - 0.6, x + 0.5, y, { seed: seed + 3, wander: 0.8, segments: 8 });

const band = (x1: number, y1: number, x2: number, y2: number, h: number) => {
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}L${x2} ${y2 + h}C${mx} ${y2 + h} ${mx} ${y1 + h} ${x1} ${y1 + h}Z`;
};

export function Flow({ data }: { data: StatisticalRecordContent["worlds"] }) {
  const [wi, setWi] = useState(0);
  const tones = useTones();
  const world: StatisticalWorld = data.worlds[wi];
  const id = `world|${world.label}`;
  const playing = tones.playing === id;
  const sounding = pairSounding(world, tones.at, playing);
  const x1 = FLOW.leftX + FLOW.nodeW, x2 = FLOW.rightX;
  const pY = conditional(world, "X", "Y"), pZ = conditional(world, "X", "Z");
  return (
    <>
    <div className={s.flow} data-world={wi}>
      <figure className={s.flowFigure}>
        <svg className={s.diagram} viewBox="0 0 640 340" role="img" aria-label={`${world.label}: how the pairs heard in one exposure history divide. From X, ${countLabel(world, "X", "Y")} went to Y and ${countLabel(world, "X", "Z")} to Z; from W, ${countLabel(world, "W", "Y")} went to Y and ${countLabel(world, "W", "Z")} to Z. Y and Z each end up with the same total in both worlds.`}>
          {data.worlds.map((w, k) => (
            <g key={w.label} className={s.bandSet} data-on={k === wi || undefined} aria-hidden={k === wi ? undefined : true}>
              {flowBands(w).map((b) => (
                <g key={b.from + b.to} className={s.band} data-from={b.from} data-now={(k === wi && sounding && sounding.from === b.from && sounding.to === b.to) || undefined}>
                  <path className={s.bandFill} d={band(x1, b.ly, x2, b.ry, b.h)} />
                  <path className={s.bandEdge} d={`M${x1} ${b.ly}C${(x1 + x2) / 2} ${b.ly} ${(x1 + x2) / 2} ${b.ry} ${x2} ${b.ry}M${x1} ${b.ly + b.h}C${(x1 + x2) / 2} ${b.ly + b.h} ${(x1 + x2) / 2} ${b.ry + b.h} ${x2} ${b.ry + b.h}`} filter="url(#folio-pencil)" />
                  <text className={s.bandCount} x={x1 + 36} y={b.ly + b.h / 2 + 5} textAnchor="middle">{b.count}</text>
                </g>
              ))}
            </g>
          ))}
          {[["X", FLOW.top[0], "left"], ["W", FLOW.top[1], "left"], ["Y", FLOW.top[0], "right"], ["Z", FLOW.top[1], "right"]].map(([label, top, side]) => {
            const x = side === "left" ? FLOW.leftX : FLOW.rightX;
            const h = 20 * FLOW.scale;
            const lx = side === "left" ? x - 44 : x + FLOW.nodeW + 44;
            return (
              <g key={label as string} className={s.node} data-context={label === "X" || undefined}>
                <path className={s.nodeBox} d={box(x, top as number, FLOW.nodeW, h, 60 + (label as string).charCodeAt(0))} filter="url(#folio-pencil)" />
                <text className={s.nodeLetter} x={lx} y={(top as number) + h / 2 - 2} textAnchor="middle">{label as string}</text>
                <text className={s.diagSub} x={lx} y={(top as number) + h / 2 + 22} textAnchor="middle">{side === "left" ? `${totalFrom(world, label as string)} pairs` : `total ${totalTo(world, label as string)}`}</text>
              </g>
            );
          })}
          <text className={s.diagHead} x={FLOW.leftX + FLOW.nodeW / 2} y="22" textAnchor="middle">heard</text>
          <text className={s.diagHead} x={FLOW.rightX + FLOW.nodeW / 2} y="22" textAnchor="middle">came next</text>
        </svg>
      </figure>
      <div className={s.flowPanel}>
        <Choices<string> label="Choose an exposure world" value={String(wi)} onChange={(v) => { tones.stop(); setWi(Number(v)); }} options={data.worlds.map((w, i) => ({ value: String(i), label: w.label }))} />
        <p className={s.contextLine}>{data.testContext}</p>
        <Player tones={tones} id={id} events={world.events} label={`${world.label} exposure sequence`} />
        <div className={s.condBars} aria-live="polite">
          <div><span>P(Y | X)</span><strong>{world.conditionals[0].probability}</strong><i style={{ "--w": `${pY * 100}%` } as React.CSSProperties} /></div>
          <div><span>P(Z | X)</span><strong>{world.conditionals[1].probability}</strong><i style={{ "--w": `${pZ * 100}%` } as React.CSSProperties} /></div>
        </div>
        <p className={s.marginals}><span>matched marginal totals</span> {world.marginalTotals.map((m) => <b key={m.label}>{m.label} total = {m.count}</b>)}</p>
        <p className={s.reading}><b>{data.testContext}</b> · {world.label}: Y is {world.conditionals[0].probability}; Z is {world.conditionals[1].probability}.</p>
      </div>
    </div>

      <div className={s.flowTables}>
        <table className={s.compare}>
          <caption>Both exposure histories, side by side: the same totals, a different split after X</caption>
          <thead>
            <tr><th scope="col"><span className={s.sr}>What was counted</span></th>{data.worlds.map((w, k) => <th scope="col" key={w.label} data-on={k === wi || undefined}>{w.label}</th>)}</tr>
          </thead>
          <tbody>
            {["X→Y", "X→Z", "W→Y", "W→Z"].map((pair) => {
              const [from, to] = pair.split("→");
              return (
                <tr key={pair}>
                  <th scope="row">{from} → {to}</th>
                  {data.worlds.map((w, k) => <td key={w.label} data-on={k === wi || undefined}><TallyMarks n={w.pairs.find((p) => p.from === from && p.to === to)?.count ?? 0} seed={k + 3} /><b>{w.pairs.find((p) => p.from === from && p.to === to)?.count}</b></td>)}
                </tr>
              );
            })}
            {[0, 1].map((i) => (
              <tr key={i} className={s.condRow}>
                <th scope="row">{data.worlds[0].conditionals[i].label}</th>
                {data.worlds.map((w, k) => <td key={w.label} data-on={k === wi || undefined}><b>{w.conditionals[i].probability}</b></td>)}
              </tr>
            ))}
            {[0, 1].map((i) => (
              <tr key={"m" + i}>
                <th scope="row">{data.worlds[0].marginalTotals[i].label} total</th>
                {data.worlds.map((w, k) => <td key={w.label} data-on={k === wi || undefined}>{w.marginalTotals[i].count}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <details className={s.spec}>
          <summary>Read the sequence validation note</summary>
          {data.worlds.map((w) => <p key={w.label}><b>{w.label}.</b> {w.note}</p>)}
          <p>{data.audioSpec}</p>
        </details>
      </div>
    </>
  );
}

function countLabel(w: StatisticalWorld, from: string, to: string) {
  return String(w.pairs.find((p) => p.from === from && p.to === to)?.count ?? 0);
}

/* ------------------------------------------------------------------------
   Two clocks: a stopwatch and the rings of a tree
   --------------------------------------------------------------------- */

type Focus = "short" | "long" | "both";

export function Clocks({ short, long, both }: { short: string; long: string; both: string }) {
  const [focus, setFocus] = useState<Focus>("both");
  const cx = 150, cy = 176, r = 92;
  const ticks = Array.from({ length: 60 }, (_, i) => i);
  const rx = 478, ry = 192;
  return (
    <div className={s.clocks} data-focus={focus}>
      <figure className={s.clocksFigure}>
        <svg className={s.diagram} viewBox="0 0 640 360" role="img" aria-label="Two clocks that can interact. A stopwatch for short-term learning, from the current piece over seconds or minutes, with about twenty-five to thirty minutes of passive exposure marked on its dial. A tree's rings for long-term learning, from style, culture, training and accumulated listening history over months, years or a lifetime. The two are not drawn to scale.">
          <g className={s.clockShort} data-off={focus === "long" || undefined}>
            <text className={s.diagHead} x={cx} y="34" textAnchor="middle">short-term</text>
            <text className={s.diagSub} x={cx} y="54" textAnchor="middle">seconds to minutes</text>
            <path className={s.dialStem} d={hand.line(cx - 8, cy - r - 16, cx + 8, cy - r - 16, { seed: 5, wander: 0.4, segments: 3 })} filter="url(#folio-pencil)" />
            <path className={s.wedge} d={`M${cx} ${cy}L${cx} ${cy - r + 4}A${r - 4} ${r - 4} 0 0 1 ${cx} ${cy + r - 4}Z`} />
            <path className={s.wedgeHard} d={`M${cx} ${cy}L${q(cx + (r - 4) * Math.sin((150 * Math.PI) / 180))} ${q(cy - (r - 4) * Math.cos((150 * Math.PI) / 180))}A${r - 4} ${r - 4} 0 0 1 ${cx} ${cy + r - 4}Z`} />
            <path className={s.dialRing} d={hand.ring(cx, cy, r, r, { seed: 41, wobble: 0.012 })} filter="url(#folio-pencil)" />
            {ticks.map((i) => {
              const a = (i / 60) * Math.PI * 2, big = i % 5 === 0;
              return <path key={i} className={s.tick} d={`M${q(cx + Math.sin(a) * (r - (big ? 12 : 6)))} ${q(cy - Math.cos(a) * (r - (big ? 12 : 6)))}L${q(cx + Math.sin(a) * (r - 1))} ${q(cy - Math.cos(a) * (r - 1))}`} />;
            })}
            <path className={s.dialHand} d={hand.line(cx, cy, q(cx + (r - 18) * Math.sin((165 * Math.PI) / 180)), q(cy - (r - 18) * Math.cos((165 * Math.PI) / 180)), { seed: 44, wander: 0.5, segments: 4 })} filter="url(#folio-pencil)" />
            <text className={s.diagTag} x={cx} y="338" textAnchor="middle">≈ 25–30 minutes in the lab</text>
          </g>
          <g className={s.clockLong} data-off={focus === "short" || undefined}>
            <text className={s.diagHead} x={rx} y="34" textAnchor="middle">long-term</text>
            <text className={s.diagSub} x={rx} y="54" textAnchor="middle">months, years, a lifetime</text>
            {Array.from({ length: 9 }, (_, i) => <path key={i} className={s.ringPath} d={hand.ring(rx, ry, 12 + i * 13.2, 12 + i * 12.9, { seed: 70 + i, wobble: 0.028 })} filter="url(#folio-pencil)" />)}
            <path className={s.ringCore} d={hand.ring(rx, ry, 5, 5, { seed: 88, wobble: 0.1 })} />
            <text className={s.diagTag} x={rx} y="338" textAnchor="middle">years of listening</text>
          </g>
          <g className={s.clockLink} data-off={focus !== "both" || undefined}>
            <path d={hand.curve([[cx + r + 18, cy - 14], [(cx + rx) / 2, cy - 22], [rx - 148, cy - 14]], { seed: 91, wander: 0.4 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(rx - 148, cy - 14, 0.1, { size: 10, seed: 92 })} filter="url(#folio-pencil)" />
            <path d={hand.curve([[rx - 148, cy + 20], [(cx + rx) / 2, cy + 28], [cx + r + 18, cy + 20]], { seed: 93, wander: 0.4 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(cx + r + 18, cy + 20, Math.PI - 0.1, { size: 10, seed: 94 })} filter="url(#folio-pencil)" />
            <text className={s.diagSub} x={(cx + rx) / 2} y={cy - 40} textAnchor="middle">can interact</text>
          </g>
        </svg>
      </figure>
      <div className={s.clocksPanel}>
        <Choices<Focus> label="Which clock?" value={focus} onChange={setFocus} options={[
          { value: "short", label: "Short-term", hint: "the current piece" },
          { value: "long", label: "Long-term", hint: "style and culture" },
          { value: "both", label: "Both, interacting", hint: "not separate modules" },
        ]} />
        <p className={s.reading} aria-live="polite">{focus === "short" ? short : focus === "long" ? long : both}</p>
        <p className={s.figNote}>Not drawn to scale. The stopwatch is small and the rings are large only to say they are different clocks.</p>
      </div>
    </div>
  );
}

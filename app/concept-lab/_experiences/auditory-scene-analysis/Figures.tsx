"use client";

import { useMemo, useState } from "react";
import type { ASACard, AudioEvent, AudioPreset } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import { useTones } from "../../_folio/useTones";
import * as hand from "../../_folio/hand";
import { Dash, Frame, StreamPlane } from "./Plane";
import { PLANE, STREAM_AXIS, centre, xOf, yOf, type Axis, type Pt } from "./geometry";
import s from "./asa.module.css";

/* ---------------------------------------------------------------------------
   Figures that let the reader change how the same sound is organised.

   Each is drawn on the one plane: time across, pitch up, a dash for a tone.
   What moves is never the tones — it is the connections the listener draws
   over them, and which of those connections a cue favours. Where there is
   sound, it is the record's own synthetic presets, unchanged.
   ------------------------------------------------------------------------- */

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 6, wander = 1.1) => hand.line(x1, y1, x2, y2, { seed, wander, segments });
const link = (pts: Pt[], seed: number) => pts.slice(1).map((p, i) => L(pts[i][0], pts[i][1], p[0], p[1], seed + i, 3, 0.8)).join(" ");

function Player({ tones, id, events, label }: { tones: ReturnType<typeof useTones>; id: string; events: AudioEvent[]; label: string }) {
  const on = tones.playing === id;
  return (
    <div className={s.player}>
      <button type="button" className={s.play} onClick={() => void tones.play(id, events)} aria-label={`${on ? "Replay" : "Play"} ${label}`}>{on ? "Replay" : "Play"}</button>
      <button type="button" className={s.stopBtn} onClick={tones.stop} disabled={!on}>Stop</button>
      <span className={s.playState} aria-live="polite">{on ? "playing" : tones.unavailable ? "audio unavailable — read the contour below" : "ready"}</span>
    </div>
  );
}

const semis = (events: AudioEvent[]) => {
  const ps = events.map((e) => e.pitch);
  return Math.max(...ps) - Math.min(...ps);
};

/* ------------------------------------------------------------------------
   The stream splitter: one repeating pattern, three settings
   --------------------------------------------------------------------- */

export function StreamSplitter({ presets }: { presets: AudioPreset[] }) {
  const [i, setI] = useState(0);
  const [mode, setMode] = useState<"one" | "two">("one");
  const tones = useTones();
  const p = presets[i];
  const id = `split-${i}`;
  const desc = `${p.label}: twelve tones in a repeating high–low pattern on a plane of time across and pitch up. The two pitches are ${semis(p.events)} semitones apart and the tones arrive every ${Math.round((p.events[1].start - p.events[0].start) * 1000)} milliseconds.`;

  return (
    <div className={s.splitter} data-preset={i}>
      <figure className={s.splitterFigure}>
        <StreamPlane events={p.events} axis={STREAM_AXIS} mode={mode} at={tones.playing === id ? tones.at : undefined} label={desc} />
      </figure>
      <div className={s.splitterPanel}>
        <Choices<string> label="Setting" value={String(i)} onChange={(v) => { tones.stop(); setI(Number(v)); }} options={presets.map((x, k) => ({ value: String(k), label: x.label }))} />
        <Player tones={tones} id={id} events={p.events} label={p.label} />
        <Choices<"one" | "two"> label="Draw what you hear as" value={mode} onChange={setMode} options={[{ value: "one", label: "one stream", hint: "a galloping pattern" }, { value: "two", label: "two streams", hint: "a high line and a low line" }]} />
        <p className={s.reading} aria-live="polite">{p.body}</p>
        <p className={s.meta}><b>{p.variable}</b> {p.controls}</p>
      </div>
      <ol className={s.settings} aria-label="The three settings, in full">
        {presets.map((x, k) => (
          <li key={x.label} data-on={k === i || undefined}>
            <b>{x.label}</b>
            <span>{x.body}</span>
            <em>{x.controls}</em>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------------
   One stimulus, two percepts
   --------------------------------------------------------------------- */

export function Bistability({ events, states }: { events: AudioEvent[]; states: ASACard[] }) {
  const [i, setI] = useState(0);
  const tones = useTones();
  const id = "bistable";
  return (
    <div className={s.bistable} data-percept={i}>
      <figure className={s.bistableFigure}>
        <StreamPlane events={events} axis={STREAM_AXIS} mode={i === 0 ? "one" : "two"} at={tones.playing === id ? tones.at : undefined} label="The intermediate setting: the same twelve tones, drawn once as one galloping contour and once as a high line and a low line. The tones do not change; only the drawn organisation does." />
      </figure>
      <div className={s.bistablePanel}>
        <Choices<string> label="The percept" value={String(i)} onChange={(v) => setI(Number(v))} options={states.map((x, k) => ({ value: String(k), label: x.label }))} />
        <Player tones={tones} id={id} events={events} label="the intermediate setting" />
        <ul className={s.states} aria-label="Both percepts, in the record's words">
          {states.map((x, k) => (
            <li key={x.label} data-on={k === i || undefined} style={{ "--hue": x.colour } as React.CSSProperties}>
              <b>{x.label}</b> {x.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   What is in the air is one sum
   --------------------------------------------------------------------- */

const SOURCES = [
  { name: "a voice", f: 3.2, a: 30, ph: 0.4 },
  { name: "an instrument", f: 5.6, a: 22, ph: 1.9 },
  { name: "a machine", f: 8.5, a: 16, ph: 3.1 },
];
const WAVE_X0 = 40, WAVE_X1 = 600;
const waveAt = (src: (typeof SOURCES)[number], x: number) => Math.sin(((x - WAVE_X0) / (WAVE_X1 - WAVE_X0)) * Math.PI * 2 * src.f + src.ph) * src.a;
const trace = (fn: (x: number) => number) => hand.smooth(Array.from({ length: 141 }, (_, i) => { const x = WAVE_X0 + (i * (WAVE_X1 - WAVE_X0)) / 140; return [x, fn(x)] as Pt; }));

export function Superposition({ layers }: { layers: ASACard[] }) {
  const [view, setView] = useState<"world" | "ear">("world");
  const [on, setOn] = useState([true, true, true]);
  const rows = [70, 150, 230];
  const sum = useMemo(() => trace((x) => 150 + SOURCES.reduce((a, src, k) => a + (on[k] ? waveAt(src, x) : 0), 0)), [on]);
  const flip = (k: number) => setOn((v) => v.map((b, j) => (j === k ? !b : b)));
  const sounding = on.filter(Boolean).length;

  return (
    <div className={s.mixture} data-view={view}>
      <figure className={s.mixtureFigure}>
        <svg className={s.planeSvg} viewBox="0 0 640 300" role="img" aria-label={view === "world" ? "Three sources in the world, each a wave of its own: a voice, an instrument, a machine." : `At the ear the ${sounding} sounding source${sounding === 1 ? "" : "s"} arrive as a single line: their sum.`}>
          {SOURCES.map((src, k) => (
            <g key={src.name} className={s.srcTrace} data-k={k} data-on={on[k] || undefined} style={{ transform: `translateY(${view === "world" ? rows[k] - 150 : 0}px)` }}>
              <path d={trace((x) => 150 + waveAt(src, x))} filter="url(#folio-pencil)" />
            </g>
          ))}
          <path className={s.mixTrace} d={sum} filter="url(#folio-graphite)" />
        </svg>
      </figure>
      <div className={s.mixturePanel}>
        <Choices<"world" | "ear"> label="What is in the air?" value={view} onChange={setView} options={[{ value: "world", label: "In the world", hint: "separate sources" }, { value: "ear", label: "At the ear", hint: "one mixture" }]} />
        <fieldset className={s.sources}>
          <legend>Which sources are sounding?</legend>
          {SOURCES.map((src, k) => (
            <label key={src.name} data-k={k} data-on={on[k] || undefined}>
              <input type="checkbox" checked={on[k]} onChange={() => flip(k)} />
              <span className={s.srcSwatch} aria-hidden="true" />
              {src.name}
            </label>
          ))}
        </fieldset>
        <ol className={s.layers} aria-label="The three layers, in the record's words">
          {layers.map((x, k) => (
            <li key={x.label} data-on={(view === "world" ? k === 0 : k >= 1) || undefined} style={{ "--hue": x.colour } as React.CSSProperties}>
              <b>{x.label}</b> {x.body}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   A stream is not a source
   --------------------------------------------------------------------- */

const SS_AXIS: Axis = { tMax: 3.6, pMin: 56, pMax: 80 };
type Scene = "one" | "two";
const SCENES: Record<Scene, { label: string; events: (AudioEvent & { src: number; str: number })[] }> = {
  one: {
    label: "One source, two streams",
    events: Array.from({ length: 8 }, (_, k) => ({ pitch: k % 2 ? 72 : 60, start: 0.2 + k * 0.4, duration: 0.24, src: 0, str: k % 2 })),
  },
  two: {
    label: "Two sources, one stream",
    events: Array.from({ length: 8 }, (_, k) => ({ pitch: k % 2 ? 64 : 62, start: 0.2 + k * 0.4, duration: 0.24, src: k % 2, str: 0 })),
  },
};

export function SourceStream({ source, stream }: { source: ASACard; stream: ASACard }) {
  const [scene, setScene] = useState<Scene>("one");
  const [by, setBy] = useState<"source" | "stream">("source");
  const sc = SCENES[scene];
  const idx = (e: (typeof sc.events)[number]) => (by === "source" ? e.src : e.str);
  const groups = new Set(sc.events.map(idx)).size;
  return (
    <div className={s.srcStream} data-scene={scene} data-by={by}>
      <figure className={s.srcStreamFigure}>
        <svg className={s.planeSvg} viewBox={`0 0 ${PLANE.w} ${PLANE.h}`} role="img" aria-label={`${sc.label}. Eight tones coloured by ${by}: ${groups} ${by}${groups === 1 ? "" : "s"}.`}>
          <Frame axis={SS_AXIS} seed={5} />
          <path className={s.contourTwo} data-emph={by === "stream" || undefined} d={by === "stream" ? [0, 1].map((g) => { const pts = sc.events.filter((e) => e.str === g).map((e) => centre(e, SS_AXIS)); return pts.length > 1 ? link(pts, 600 + g * 20) : ""; }).join(" ") : ""} filter="url(#folio-pencil)" />
          {sc.events.map((e, k) => <g key={k} className={s.colouredDash} data-c={idx(e)}><Dash e={e} axis={SS_AXIS} seed={700 + k} /></g>)}
        </svg>
      </figure>
      <div className={s.srcStreamPanel}>
        <Choices<Scene> label="Which case?" value={scene} onChange={setScene} options={(Object.keys(SCENES) as Scene[]).map((k) => ({ value: k, label: SCENES[k].label }))} />
        <Choices<"source" | "stream"> label="Colour the tones by" value={by} onChange={setBy} options={[{ value: "source", label: "physical source", hint: "what made the sound" }, { value: "stream", label: "auditory stream", hint: "what the listener organises" }]} />
        <p className={s.reading} aria-live="polite">{scene === "one" ? "One physical source alternates a low and a high tone. Coloured by source there is one colour; coloured by stream there are two." : "Two physical sources alternate two close tones. Coloured by source there are two colours; coloured by stream there is one."}</p>
        <p className={s.kindsNote}>{groups === 1 ? "One colour" : "Two colours"}: {by === "source" ? "the world" : "the listener"} draws {groups === 1 ? "one line" : "two lines"} here.</p>
      </div>
      <div className={s.twoCards}>
        {[source, stream].map((c, k) => (
          <article key={c.label} data-on={(by === "source" ? k === 0 : k === 1) || undefined} style={{ "--hue": c.colour } as React.CSSProperties}>
            <p className={s.cardKick}>{c.label}</p>
            <p>{c.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Two questions of grouping
   --------------------------------------------------------------------- */

const TQ_AXIS: Axis = { tMax: 3.2, pMin: 56, pMax: 80 };
const CHORDS = [[60, 67, 72], [62, 69, 74], [64, 71, 76]].map((c, k) => c.map((pitch) => ({ pitch, start: 0.3 + k * 1, duration: 0.7 })));

export function TwoQuestions({ grouping, cues }: { grouping: { sequential: string[]; simultaneous: string[] }; cues: { sequential: string[]; simultaneous: string[] } }) {
  const [q, setQ] = useState<"sequential" | "simultaneous">("sequential");
  const lines = [0, 1, 2].map((v) => link(CHORDS.map((c) => centre(c[v], TQ_AXIS)), 800 + v * 10));
  const braces = CHORDS.map((c, k) => { const x = xOf(c[0].start + c[0].duration, TQ_AXIS); return hand.braceV(yOf(c[2].pitch, TQ_AXIS) - 8, yOf(c[0].pitch, TQ_AXIS) + 8, x + 8, { depth: 12, left: false, seed: 850 + k }); });
  return (
    <div className={s.twoQ} data-q={q}>
      <figure className={s.twoQFigure}>
        <svg className={s.planeSvg} viewBox={`0 0 ${PLANE.w} ${PLANE.h}`} role="img" aria-label={`Nine tones: three chords of three tones. Grouping across time joins each voice to its next moment; grouping at one moment braces the three tones of a chord. Shown: ${q}.`}>
          <Frame axis={TQ_AXIS} seed={9} />
          <path className={s.across} data-on={q === "sequential" || undefined} d={lines.join(" ")} filter="url(#folio-pencil)" />
          <path className={s.atOnce} data-on={q === "simultaneous" || undefined} d={braces.join(" ")} filter="url(#folio-pencil)" />
          {CHORDS.flat().map((e, k) => <Dash key={k} e={e} axis={TQ_AXIS} band="mid" seed={880 + k} />)}
        </svg>
      </figure>
      <div className={s.twoQPanel}>
        <Choices<"sequential" | "simultaneous"> label="Which question?" value={q} onChange={setQ} options={[{ value: "sequential", label: "Across time", hint: "sequential" }, { value: "simultaneous", label: "At one moment", hint: "simultaneous" }]} />
        <div className={s.questions}>
          {(["sequential", "simultaneous"] as const).map((k) => (
            <article key={k} data-on={q === k || undefined}>
              <p className={s.qText}>{grouping[k][0]}</p>
              <p className={s.qEx}>{grouping[k][1]}</p>
              <ul className={s.chips} aria-label={`Cue families for ${k} organisation`}>{cues[k].map((c) => <li key={c}>{c}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Cues pull — a Concept Lab synthesis, not an algorithm
   --------------------------------------------------------------------- */

const PULL_AXIS: Axis = { tMax: 3.2, pMin: 56, pMax: 80 };
const UPPER = [0, 1, 2, 3].map((k) => ({ pitch: 74, start: 0.15 + k * 0.32, duration: 0.2 }));
const LOWER = [0, 1, 2, 3].map((k) => ({ pitch: 62, start: 0.15 + k * 0.32, duration: 0.2 }));
const AFTER = [0, 1, 2].map((k) => ({ pitch: 74, start: 2.05 + k * 0.32, duration: 0.2 })).concat([0, 1, 2].map((k) => ({ pitch: 62, start: 2.05 + k * 0.32, duration: 0.2 })));

export function CuesPull({ cards, note }: { cards: ASACard[]; note: string }) {
  const [pull, setPull] = useState([0, 0, 0, 0]);
  const net = pull.reduce((a, b) => a + b, 0);
  const x: AudioEvent = { pitch: 68 + net * 2.2, start: 1.45, duration: 0.26 };
  const target = net > 0 ? UPPER[3] : net < 0 ? LOWER[3] : null;
  const verdict = net > 0 ? "joins the upper stream" : net < 0 ? "joins the lower stream" : "stays ambiguous";
  const set = (k: number, v: number) => setPull((p) => p.map((n, j) => (j === k ? v : n)));
  return (
    <div className={s.pull} data-net={Math.sign(net)}>
      <figure className={s.pullFigure}>
        <svg className={s.planeSvg} viewBox={`0 0 ${PLANE.w} ${PLANE.h}`} role="img" aria-label={`Two streams, a high one and a low one, and one tone between them. The four cues together pull it: it ${verdict}.`}>
          <Frame axis={PULL_AXIS} seed={13} />
          <path className={s.contourTwo} data-emph="true" d={link(UPPER.map((e) => centre(e, PULL_AXIS)), 900) + " " + link(LOWER.map((e) => centre(e, PULL_AXIS)), 920)} filter="url(#folio-pencil)" />
          {[UPPER, LOWER, AFTER].flat().map((e, k) => <Dash key={k} e={e} axis={PULL_AXIS} band={e.pitch > 68 ? "hi" : "lo"} seed={940 + k} />)}
          <g className={s.pullTone} style={{ transform: `translateY(${yOf(x.pitch, PULL_AXIS) - yOf(68, PULL_AXIS)}px)` }}>
            <Dash e={{ ...x, pitch: 68 }} axis={PULL_AXIS} band="mid" seed={990} />
          </g>
          {target ? <path className={s.join} d={L(centre(target, PULL_AXIS)[0], centre(target, PULL_AXIS)[1], xOf(x.start, PULL_AXIS), yOf(x.pitch, PULL_AXIS), 991, 4, 0.8)} filter="url(#folio-pencil)" /> : (
            <>
              <path className={s.join} data-ambiguous="true" d={L(centre(UPPER[3], PULL_AXIS)[0], centre(UPPER[3], PULL_AXIS)[1], xOf(x.start, PULL_AXIS), yOf(x.pitch, PULL_AXIS), 992, 4, 0.8)} filter="url(#folio-pencil)" />
              <path className={s.join} data-ambiguous="true" d={L(centre(LOWER[3], PULL_AXIS)[0], centre(LOWER[3], PULL_AXIS)[1], xOf(x.start, PULL_AXIS), yOf(x.pitch, PULL_AXIS), 993, 4, 0.8)} filter="url(#folio-pencil)" />
            </>
          )}
        </svg>
      </figure>
      <div className={s.pullPanel}>
        <p className={s.pullVerdict} aria-live="polite">The tone between the streams <b>{verdict}</b>.</p>
        {cards.map((c, k) => (
          <fieldset key={c.label} className={s.cue} style={{ "--hue": c.colour } as React.CSSProperties}>
            <legend>{c.label}</legend>
            <p>{c.body}</p>
            <Choices<string> className={s.cueChoices} label={`${c.label}: which way does it pull?`} value={String(pull[k])} onChange={(v) => set(k, Number(v))} options={[{ value: "1", label: "up" }, { value: "0", label: "neither" }, { value: "-1", label: "down" }]} />
          </fieldset>
        ))}
        <p className={s.figNote}><Glyph g="✦" /> {note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Fuse, or stand apart
   --------------------------------------------------------------------- */

const GF_AXIS: Axis = { tMax: 1.1, pMin: 54, pMax: 84 };

export function GroupFuse({ presets, question }: { presets: AudioPreset[]; question: string }) {
  const [i, setI] = useState(0);
  const tones = useTones();
  const p = presets[i];
  const id = `fuse-${i}`;
  const top = Math.max(...p.events.map((e) => e.pitch));
  return (
    <div className={s.fuse} data-preset={i}>
      <figure className={s.fuseFigure}>
        <svg className={s.planeSvg} viewBox={`0 0 ${PLANE.w} ${PLANE.h}`} role="img" aria-label={`${p.label}: four components of one synthetic complex sound. ${i === 0 ? "All four begin together." : "The highest begins a little after the other three."}`}>
          <Frame axis={GF_AXIS} seed={17} />
          {p.events.map((e, k) => (
            <g key={k} className={s.component} data-target={e.pitch === top || undefined}>
              <Dash e={e} axis={GF_AXIS} band={e.pitch === top ? "hi" : "lo"} seed={1000 + k} now={tones.playing === id && tones.at >= e.start && tones.at <= e.start + e.duration} />
            </g>
          ))}
          {tones.playing === id && tones.at > 0 && <path className={s.playhead} d={L(xOf(tones.at, GF_AXIS), PLANE.y0 - 8, xOf(tones.at, GF_AXIS), PLANE.y1 + 8, 1099, 4, 0.3)} />}
        </svg>
      </figure>
      <div className={s.fusePanel}>
        <Choices<string> label="Onset" value={String(i)} onChange={(v) => { tones.stop(); setI(Number(v)); }} options={presets.map((x, k) => ({ value: String(k), label: x.label }))} />
        <Player tones={tones} id={id} events={p.events} label={p.label} />
        <p className={s.fuseQuestion}>{question}</p>
        <p className={s.reading} aria-live="polite">{p.body}</p>
        <p className={s.meta}><b>{p.variable}</b> {p.controls}</p>
      </div>
      <ol className={s.settings} aria-label="Both onsets, in full">
        {presets.map((x, k) => (
          <li key={x.label} data-on={k === i || undefined}>
            <b>{x.label}</b>
            <span>{x.body}</span>
            <em>{x.controls}</em>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Old plus new
   --------------------------------------------------------------------- */

const OLD = [58, 92, 70, 112, 52, 82];
const NEW = [0, 0, 44, 0, 62, 0];
const BAR_X = (k: number) => 92 + k * 76;

export function OldNew({ steps }: { steps: string[] }) {
  const [i, setI] = useState(0);
  const base = 250;
  // a bar is a filled block with a hand-drawn edge; no filter, because a filter has no width to work on for a standing line
  const bar = (k: number, h: number, y0: number, seed: number) => {
    const x0 = BAR_X(k) - 13, x1 = BAR_X(k) + 13, top = y0 - h;
    return (
      <g key={k}>
        <path className={s.barFill} d={`M${x0} ${y0}L${x0} ${top}L${x1} ${top}L${x1} ${y0}Z`} />
        <path className={s.barEdge} d={L(x0, y0, x0, top, seed, 4, 0.8) + L(x0, top, x1, top, seed + 1, 3, 0.8) + L(x1, top, x1, y0, seed + 2, 4, 0.8)} />
      </g>
    );
  };
  return (
    <div className={s.oldNew} data-step={i}>
      <figure className={s.oldNewFigure}>
        <svg className={s.planeSvg} viewBox="0 0 640 300" role="img" aria-label={`Step ${i + 1}: ${steps[i].toLowerCase()}. Six spectral components, drawn as bars.`}>
          <path className={s.frame} d={L(60, base + 4, 600, base + 4, 1, 12, 0.8)} filter="url(#folio-graphite)" />
          <text className={s.axisWord} x={600} y={base + 36} textAnchor="end" aria-hidden="true">frequency →</text>
          {/* the ongoing sound: always there, and always the same */}
          <g className={s.oldBars}>{OLD.map((h, k) => bar(k, h * 1.4, base, 10 + k * 3))}</g>
          {/* 2 · additional energy enters, beside the ongoing sound */}
          <g className={s.enterBars} data-on={i === 1 || undefined}>{NEW.map((h, k) => (h ? bar(k, h * 1.4, base - OLD[k] * 1.4 - 26, 40 + k * 3) : null))}</g>
          {/* 3 · the mixture: the two added together, and nothing to tell them apart */}
          <g className={s.mixBars} data-on={i === 2 || undefined}>{OLD.map((h, k) => bar(k, (h + NEW[k]) * 1.4, base, 70 + k * 3))}</g>
          {/* 4 · the continuing old, and a candidate new left over */}
          <g className={s.residueBars} data-on={i === 3 || undefined}>{NEW.map((h, k) => (h ? bar(k, h * 1.4, base - OLD[k] * 1.4, 100 + k * 3) : null))}</g>
        </svg>
      </figure>
      <div className={s.oldNewPanel}>
        <Choices<string> label="Step through the heuristic" value={String(i)} onChange={(v) => setI(Number(v))} options={steps.map((x, k) => ({ value: String(k), label: x, hint: `step ${k + 1}` }))} />
        <p className={s.reading} aria-live="polite">{[
          "An ongoing sound: six components, all continuing.",
          "Additional energy enters, on top of some of the components already there.",
          "The mixture reaching the ear is the sum. It does not say which part was old and which was new.",
          "The continuing components are treated as old, and what is left over becomes a candidate new sound.",
        ][i]}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Music inside streams
   --------------------------------------------------------------------- */

export function MusicStreams({ events, cards }: { events: AudioEvent[]; cards: ASACard[] }) {
  const [mode, setMode] = useState<"one" | "two">("one");
  const tones = useTones();
  const id = "music";
  return (
    <div className={s.music} data-mode={mode}>
      <figure className={s.musicFigure}>
        <StreamPlane events={events} axis={STREAM_AXIS} mode={mode} at={tones.playing === id ? tones.at : undefined} label="One physical line of alternating high and low tones, drawn once as a single melodic contour and once as two strands: implied polyphony." />
      </figure>
      <div className={s.musicPanel}>
        <Choices<"one" | "two"> label="Hear the line as" value={mode} onChange={setMode} options={[{ value: "one", label: "one melody", hint: "a single contour" }, { value: "two", label: "two strands", hint: "implied polyphony" }]} />
        <Player tones={tones} id={id} events={events} label="the alternating line" />
      </div>
      <div className={s.musicCards}>
        {cards.map((c, k) => (
          <article key={c.label} data-on={(mode === "two" ? k === 0 : k === 1) || undefined} style={{ "--hue": c.colour } as React.CSSProperties}>
            <p className={s.cardKick}>{c.label}</p>
            <p>{c.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}


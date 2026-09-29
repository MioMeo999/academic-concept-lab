"use client";

import { useState } from "react";
import type { AppliedWork, Model, TheoryDemo } from "@/content/types";
import { Rich } from "../../_components/Sketch";
import { Choices } from "../../_folio/Choices";
import * as hand from "../../_folio/hand";
import { L, box, decode, q } from "./draw";
import { FACTORS, MAP, knots, type Instrument as InstrumentMode, type Lane, type Origin } from "./geometry";
import { Person, SoundTrace } from "./Marks";
import { QUALITIES, SKETCH_SECONDS, TRACE_ALT, TRACE_W } from "./sound";
import { useSketch } from "./useSketch";
import s from "./mp.module.css";

/* ---------------------------------------------------------------------------
   The figures that open the page: the field, the qualities of sound, and the
   two ways the structure of taste was measured.
   ------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------
   The field: two literatures over sixteen years
   --------------------------------------------------------------------- */

export const LANE_LABEL: Record<Lane, string> = { taste: "The structure and development of taste", work: "Listening at work" };

export function FieldMap({ origins, applied }: { origins: Origin[]; applied: AppliedWork[] }) {
  const ks = knots(origins, applied);
  const [at, setAt] = useState(0);
  const o = origins[at];
  const k = ks[at];
  const lanes: Lane[] = ["taste", "work"];
  return (
    <div className={s.map} data-at={at} data-lane={k.lane}>
      <figure className={s.mapFigure}>
        <svg className={s.diagram} viewBox="0 0 640 232" role="img" aria-label="A map of the field. Two lines run across the page from 1995 to 2011: the structure and development of taste, and listening at work. The seven works on the record's trail are numbered along them in order of date, four on the first line and three on the second, and the two 2011 works stand one above the other. A dashed link joins them at the right, marked as this page's own frame, Person–Music Fit, not the authors'.">
          <g aria-hidden="true">
            {lanes.map((lane, li) => (
              <path key={lane} className={s.laneLine} data-lane={lane} d={hand.curve([[26, MAP.y[lane]], [200, MAP.y[lane] - 3], [420, MAP.y[lane] + 2], [618, MAP.y[lane] - 1]], { seed: 5 + li, wander: 0.7 })} filter="url(#folio-pencil)" />
            ))}
            <path className={s.bridge} d={`M${MAP.x1} ${MAP.y.taste + 18}V${MAP.y.work - 18}`} />
            <text className={s.bridgeText} x={MAP.x1 - 14} y="137" textAnchor="end">✦ Person–Music Fit · our frame, not the authors’</text>
            {ks.map((kn, i) => {
              const on = i === at;
              const anchor = kn.x > 500 ? "end" : kn.x < 90 ? "start" : "middle";
              // a label for the last works stands to the left of its knot, clear of the dashed link between the two literatures
              const dx = anchor === "end" ? (kn.x >= MAP.x1 - 8 ? -14 : 18) : anchor === "start" ? -18 : 0;
              return (
                <g key={kn.n} className={s.knot} data-lane={kn.lane} data-on={on || undefined} onClick={() => setAt(i)}>
                  <circle className={s.knotDot} cx={kn.x} cy={kn.y} r={on ? 16 : 13} />
                  {on && <path className={s.knotRing} d={hand.ring(kn.x, kn.y, 22, 22, { seed: 40 + i, wobble: 0.06 })} filter="url(#folio-pencil)" />}
                  <text className={s.knotNum} x={kn.x} y={kn.y + 4.6} textAnchor="middle">{kn.n}</text>
                  <text className={s.tag} x={kn.x} y={kn.lane === "taste" ? kn.y - 26 - kn.tier * 20 : kn.y + 38 + kn.tier * 20} textAnchor="middle">{kn.year}</text>
                  {on && <text className={s.diagTag} x={kn.x + dx} y={kn.lane === "taste" ? kn.y + 42 : kn.y - 26} textAnchor={anchor}>{kn.short}</text>}
                </g>
              );
            })}
          </g>
        </svg>
        <ul className={s.legend} aria-label="The two literatures">
          {lanes.map((lane) => <li key={lane} data-lane={lane}>{LANE_LABEL[lane]}</li>)}
        </ul>
      </figure>
      <div className={s.mapPanel}>
        <Choices<string> compact label="Choose a work on the map" value={String(at)} onChange={(v) => setAt(Number(v))} options={ks.map((kn, i) => ({ value: String(i), label: String(kn.n), hint: `${kn.year} · ${kn.short}` }))} />
        <div className={s.mapReading} aria-live="polite">
          <p className={s.mapKick} data-lane={k.lane}>{LANE_LABEL[k.lane]} · {o.year}</p>
          <Rich as="p" className={s.mapWork} html={o.work} />
          <p className={s.mapAuthors}>{decode(o.author)}</p>
          <p className={s.reading}>{o.contribution}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Five qualities of sound
   --------------------------------------------------------------------- */

function MiniTrace({ quality }: { quality: (typeof QUALITIES)[number] }) {
  return (
    <svg className={s.mini} viewBox={`0 -92 ${TRACE_W} 184`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <SoundTrace quality={quality} mini />
    </svg>
  );
}

export function Qualities({ demo }: { demo: TheoryDemo }) {
  const facets = demo.facets ?? [];
  const [at, setAt] = useState(demo.start ?? 0);
  const sk = useSketch();
  const quality = QUALITIES[at];
  const f = facets[at];
  const heard = sk.playing === quality;
  const px = 20 + (Math.min(sk.at, SKETCH_SECONDS) / SKETCH_SECONDS) * TRACE_W;
  return (
    <div className={s.qualities} data-quality={quality}>
      <figure className={s.qualFigure}>
        <svg className={s.diagram} viewBox="0 -112 640 224" role="img" aria-label={`${f.label}, drawn as a trace of sound: ${TRACE_ALT[quality]}. A drawing of the paraphrased quality, not a measurement of any music and not a genre.`}>
          <g transform="translate(20 0)" key={quality} className={s.traceIn}>
            <SoundTrace quality={quality} />
          </g>
          {heard && <path className={s.playhead} d={`M${q(px)} -104V104`} />}
        </svg>
        <div className={s.sketchBar}>
          <button type="button" className={s.play} aria-pressed={heard} onClick={() => (heard ? sk.stop() : sk.play(quality))}>
            <span className={s.playMark} aria-hidden="true" />{heard ? "Stop the sketch" : "Hear a sketch"}
          </button>
          <span className={s.playState} aria-live="polite">{sk.state === "unavailable" ? "Audio is not available here." : heard ? "Playing a short synthesised sketch." : ""}</span>
        </div>
      </figure>
      <div className={s.qualPanel}>
        <Choices<string>
          label={demo.label}
          value={String(at)}
          onChange={(v) => { sk.stop(); setAt(Number(v)); }}
          options={facets.map((fa, i) => ({
            value: String(i),
            label: <span className={s.qChoice}><MiniTrace quality={QUALITIES[i]} /><b>{fa.initial}</b> {fa.label}</span>,
          }))}
        />
        <ol className={s.facets} aria-label="The five dimensions, in the record’s words">
          {facets.map((fa, i) => (
            <li key={fa.initial} data-on={i === at || undefined}>
              <b><span aria-hidden="true">{fa.initial}</span> {fa.label}</b> {fa.body}
            </li>
          ))}
        </ol>
        <p className={s.figNote}>
          <span className={s.glyph} aria-hidden="true">✦</span> Drawn and synthesised for this page to show the paraphrased character — not a measurement of any music, not one of the study’s own excerpts, and not a genre. {demo.caption}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Two ways of measuring, two structures
   --------------------------------------------------------------------- */

const LETTERS = ["M", "U", "S", "I", "C"];

export function Instrument({ models }: { models: Model[] }) {
  const [mode, setMode] = useState<InstrumentMode>("names");
  const n = FACTORS[mode];
  const i = mode === "names" ? 0 : 1;
  const bw = mode === "names" ? 34 : 27;
  const gap = mode === "names" ? 9.3 : 7.3;
  const wave = hand.curve(Array.from({ length: 10 }, (_, k) => [q(44 + k * 17.5), q(96 + Math.sin(k * 1.7) * 20 * (0.6 + 0.4 * Math.sin(k * 0.7)))] as [number, number]), { seed: 9, wander: 0.5 });
  return (
    <div className={s.instrument} data-mode={mode}>
      <figure className={s.instrumentFigure}>
        <svg className={s.diagram} viewBox="0 0 640 250" role="img" aria-label={mode === "names" ? "Measuring by genre names: people are shown the name of a genre, respond, and a four-factor structure results. Genre labels carry social baggage and drift over time and between groups." : "Measuring by musical excerpts: people hear music, respond, and a five-factor structure results, the five MUSIC dimensions. Sound carries no such baggage of its own."}>
          <g key={mode} className={s.swapIn}>
            <path className={s.cardBox} d={box(24, 34, 196, 112, 60)} filter="url(#folio-pencil)" />
            {mode === "names" ? (
              <text className={s.cardWord} x="122" y="98" textAnchor="middle">“a genre name”</text>
            ) : (
              <g>
                <path className={s.cardWave} d={wave} filter="url(#folio-pencil)" />
                <path className={s.cardWave} d={hand.curve([[96, 62], [122, 52], [148, 62]], { seed: 3, wander: 0.4 })} filter="url(#folio-pencil)" />
                <circle className={s.cardPad} cx="94" cy="68" r="6" />
                <circle className={s.cardPad} cx="150" cy="68" r="6" />
              </g>
            )}
            <text className={s.diagSub} x="24" y="170">{mode === "names" ? "a label: it carries social baggage" : "the music itself:"}</text>
            <text className={s.diagSub} x="24" y="190">{mode === "names" ? "and drifts over time and between groups" : "sound carries no such baggage"}</text>
          </g>
          <g className={s.flow}>
            <path d={hand.curve([[230, 92], [262, 88], [290, 92]], { seed: 21, wander: 0.4 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(291, 92, 0.05, { size: 10, seed: 22 })} filter="url(#folio-pencil)" />
            <path d={hand.curve([[384, 92], [414, 88], [442, 92]], { seed: 23, wander: 0.4 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(443, 92, 0.05, { size: 10, seed: 24 })} filter="url(#folio-pencil)" />
          </g>
          <Person x={336} y={104} k={1.9} seed={7} />
          <text className={s.diagSub} x="336" y="152" textAnchor="middle">listeners respond</text>
          <g key={`${mode}-blocks`} className={s.swapIn}>
            {Array.from({ length: n }, (_, b) => (
              <g key={b} className={s.block}>
                <path className={s.blockFill} d={`M${q(452 + b * (bw + gap))} 46h${bw}v76h-${bw}z`} />
                <path className={s.blockBox} d={box(q(452 + b * (bw + gap)), 46, bw, 76, 80 + b)} filter="url(#folio-pencil)" />
                {mode === "excerpts" && <text className={s.blockLetter} x={q(452 + b * (bw + gap) + bw / 2)} y="92" textAnchor="middle">{LETTERS[b]}</text>}
              </g>
            ))}
            <text className={s.diagTag} x="534" y="148" textAnchor="middle">{mode === "names" ? "a four-factor structure" : "a five-factor structure"}</text>
          </g>
          <path className={s.baselineMark} d={L(24, 218, 616, 218, 12, 12, 0.5)} />
        </svg>
      </figure>
      <div className={s.instrumentPanel}>
        <Choices<InstrumentMode>
          label="How the structure was measured"
          value={mode}
          onChange={setMode}
          options={[
            { value: "names", label: "Ask about genre names", hint: `${models[0].year} · STOMP` },
            { value: "excerpts", label: "Play the music", hint: `${models[1].year} · MUSIC` },
          ]}
        />
        <ul className={s.models} aria-label="The two models, in the record’s words">
          {models.map((m, idx) => (
            <li key={m.year} data-on={idx === i || undefined}>
              <p className={s.modelHead}><b>{m.year}</b> <span>{m.name}</span></p>
              <p className={s.modelSource}>{decode(m.source)}</p>
              <Rich as="p" className={s.modelBody} html={m.body} />
              {m.note && <Rich as="p" className={s.modelNote} html={m.note} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

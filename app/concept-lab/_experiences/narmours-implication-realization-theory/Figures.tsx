"use client";

import { useId, useState, type ReactNode } from "react";
import type { AudioEvent, NarmourCandidate, NarmourRecordContent, NarmourRelationStatus } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { useTones } from "../../_folio/useTones";
import * as hand from "../../_folio/hand";
import { Field, IntervalBrace, Leans, PIP_GAP, PipHeader, PipRow, Playhead, RelationIcon, Stamp, Stroke, Tone } from "./Field";
import { MOVEMENTS, RELATION_KEYS, RELATION_LABEL, contourPoints, lean, noteName, pitchesOf, relationOf, signature, sizeClass, soundingTone, verdictGrid, xOfTone, yOfPitch, type Movement, type RelationKey } from "./geometry";
import s from "./narmour.module.css";

/* ---------------------------------------------------------------------------
   Three tones, read again and again.

   The first two tones are fixed on every figure here. What changes is the third
   tone — or, on the dial, the size of the first interval — and what the page
   draws about it: the leans the interval seems to have, and the verdict each
   continuation gets against them. The sounds are the record's own constructed
   three-tone stimuli, timed as the record times them.
   ------------------------------------------------------------------------- */

const tone = (pitch: number, start: number): AudioEvent => ({ pitch, start, duration: 0.42 });

function Player({ tones, id, events, label }: { tones: ReturnType<typeof useTones>; id: string; events: AudioEvent[]; label: string }) {
  const on = tones.playing === id;
  return (
    <div className={s.player}>
      <button type="button" className={s.play} onClick={() => void tones.play(id, events)} aria-label={`${on ? "Replay" : "Play"} ${label}`}>{on ? "Replay" : "Play"}</button>
      <button type="button" className={s.stopBtn} onClick={tones.stop} disabled={!on}>Stop</button>
      <span className={s.playState} aria-live="polite">{on ? "playing" : tones.unavailable ? "audio unavailable — read the notes" : "ready"}</span>
    </div>
  );
}

/** a small inline pictogram for one of the four relations */
export function LedgerIcon({ k }: { k: RelationKey }) {
  return <svg className={s.ledgerIcon} viewBox="-11 -11 22 22" aria-hidden="true"><RelationIcon k={k} x={0} y={0} /></svg>;
}

/** a small inline verdict: a disc, a cross or a dashed ring */
export function StatusMark({ status }: { status: NarmourRelationStatus }) {
  return <svg className={s.statusMark} viewBox="-11 -11 22 22" aria-hidden="true" data-status={status}><Stamp status={status} x={0} y={0} /></svg>;
}

/** the three tones and the interval between the first two, shared by the figures */
function Heard({ a, b, now }: { a: number; b: number; now?: 0 | 1 | 2 }) {
  return (
    <>
      <Stroke from={[0, a]} to={[1, b]} kind="heard" seed={1} />
      <Tone k={0} pitch={a} now={now === 0} name seed={0} />
      <Tone k={1} pitch={b} now={now === 1} name seed={1} />
    </>
  );
}

/* ------------------------------------------------------------------------
   The fork: hold the first two tones, choose the third
   --------------------------------------------------------------------- */

const X_PIPS = xOfTone(2) + 52;

export function Fork({ data }: { data: NarmourRecordContent }) {
  const [fi, setFi] = useState(0);
  const [ci, setCi] = useState(0);
  const tones = useTones();
  const family = data.families[fi];
  const c = family.candidates[ci] ?? family.candidates[0];
  const [a, b, p] = pitchesOf(c);
  const id = `fork|${family.label}|${c.label}`;
  const playing = tones.playing === id;
  const now = soundingTone(c.events, tones.at, playing);

  return (
    <div className={s.fork} data-family={fi} data-candidate={ci}>
      <figure className={s.forkFigure}>
        <Field top={34} label={`${noteName(a)} then ${noteName(b)} are heard, ${family.interval}. Three possible third tones are drawn, each with its four verdicts. Chosen: ${c.label}.`}>
          <PipHeader x={X_PIPS} y={54} />
          {family.candidates.map((cand, i) => {
            const pitch = cand.events[2].pitch;
            const chosen = i === ci;
            return (
              <g key={cand.label} className={s.candidate} data-chosen={chosen || undefined}>
                <Stroke from={[1, b]} to={[2, pitch]} kind={chosen ? "chosen" : "prong"} seed={i + 2} />
                {!chosen && <Tone k={2} pitch={pitch} ghost name seed={i + 3} />}
                <PipRow x={X_PIPS} y={yOfPitch(pitch)} statuses={signature(cand)} seed={i * 7} />
                {chosen && <path className={s.pick} d={hand.ring(X_PIPS + PIP_GAP * 1.5, yOfPitch(pitch), 66, 17, { seed: 9 + i, wobble: 0.03 })} filter="url(#folio-pencil)" />}
              </g>
            );
          })}
          <Heard a={a} b={b} now={now} />
          <Tone k={2} pitch={p} now={now === 2} name seed={2} />
          <Playhead at={playing ? tones.at : 0} />
        </Field>
      </figure>
      <div className={s.forkPanel}>
        <Choices<string> label="Choose the fixed implicative interval" value={String(fi)} onChange={(v) => { setFi(Number(v)); setCi(0); tones.stop(); }} options={data.families.map((f, i) => ({ value: String(i), label: f.label }))} />
        <p className={s.stimulus}><b>{family.interval}</b> · {family.body}</p>
        <Choices<string> label={`Choose a continuation after ${family.interval}`} value={String(ci)} onChange={(v) => { setCi(Number(v)); tones.stop(); }} options={family.candidates.map((x, i) => ({ value: String(i), label: x.label }))} />
        <Player tones={tones} id={id} events={c.events} label={`${c.label} after ${family.interval}`} />
        <p className={s.reading} aria-live="polite">{c.body}</p>
        <dl className={s.chips}>
          <div><dt>Physical movement</dt><dd>{c.physicalMovement}</dd></div>
          <div><dt>Interval sizes</dt><dd>{c.intervalSizes}</dd></div>
        </dl>
        <ul className={s.ledger} aria-label="Relations in this continuation">
          {c.relations.map((r) => {
            const key = RELATION_KEYS.find((k) => RELATION_LABEL[k] === r.label);
            return (
              <li key={r.label} data-status={r.status}>
                {key && <LedgerIcon k={key} />}
                <div>
                  <p className={s.ledgerHead}><span>{r.label}</span><StatusMark status={r.status} /><strong>{r.status}</strong></p>
                  <p className={s.ledgerBody}>{r.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <details className={s.spec}>
          <summary>Read the fixed stimulus and audio specification</summary>
          <p><b>Pitch mapping:</b> equal-tempered MIDI at A4 = 440 Hz: C4 = 60 / 261.63 Hz, D4 = 62 / 293.66 Hz, E4 = 64 / 329.63 Hz, F4 = 65 / 349.23 Hz, G4 = 67 / 392.00 Hz, A4 = 69 / 440.00 Hz.</p>
          <p><b>Held constant:</b> triangle timbre · 0.12 gain · 420 ms tone duration · 600 ms onset-to-onset IOI · C4-centred register where possible · no harmony or probe-timing manipulation.</p>
          <p><b>Manipulated variable:</b> the candidate third tone after a fixed two-tone interval. The relation panel identifies which tendency each candidate tests; physical movement is kept separate from registral-direction fulfilment.</p>
        </details>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Anatomy: two tones, what they imply, and a third that answers
   --------------------------------------------------------------------- */

const STEPS = [
  { label: "Two tones", hint: "the implicative interval" },
  { label: "What they imply", hint: "several leans at once" },
  { label: "A third tone answers", hint: "realise · deny" },
];

export function Anatomy({ data, groups }: { data: NarmourRecordContent; groups: ReactNode[] }) {
  const [step, setStep] = useState(0);
  const family = data.families[0];
  const c = family.candidates[0];
  const [a, b, p] = pitchesOf(c);
  const yA = yOfPitch(a), yB = yOfPitch(b), yC = yOfPitch(p);
  const x1 = xOfTone(0), x2 = xOfTone(1), x3 = xOfTone(2);
  const captions = [
    `${noteName(a)} then ${noteName(b)}: the interval between the first two tones is the implicative interval.`,
    "The same two tones, with four leans drawn round the place the third tone will be. None of them aims at a pitch.",
    `${noteName(p)} arrives. The interval from ${noteName(b)} to ${noteName(p)} is the realised interval, and each of the four relations gets a verdict.`,
  ];

  return (
    <>
    <div className={s.anatomy} data-step={step}>
      <figure className={s.anatomyFigure}>
        <Field top={100} unheard={step < 2} label={step === 0 ? `Two tones, ${noteName(a)} then ${noteName(b)}: the first interval is the implicative interval.` : step === 1 ? `The same two tones with four leans drawn round the place the third tone will be: direction, size, return and proximity.` : `A third tone, ${noteName(p)}, answers: the interval it makes with the second is the realised interval, and each of the four relations gets a verdict.`}>
          <Heard a={a} b={b} />
          {step === 0 && <text className={s.tagLabel} transform={`rotate(-12 ${(x1 + x2) / 2 + 6} ${(yA + yB) / 2 + 30})`} x={(x1 + x2) / 2 + 6} y={(yA + yB) / 2 + 30} textAnchor="middle" aria-hidden="true">implicative interval</text>}
          <g className={s.leanLayer} data-on={step >= 1 || undefined} data-dim={step === 2 || undefined}>
            <Leans cls="small" a={a} b={b} labels={step === 1} />
          </g>
          <g className={s.answerLayer} data-on={step === 2 || undefined}>
            <Stroke from={[1, b]} to={[2, p]} kind="heard" seed={4} />
            <Tone k={2} pitch={p} name seed={2} />
            <text className={s.tagLabel} transform={`rotate(-12 ${(x2 + x3) / 2 + 6} ${(yB + yC) / 2 + 30})`} x={(x2 + x3) / 2 + 6} y={(yB + yC) / 2 + 30} textAnchor="middle" aria-hidden="true">realised interval</text>
            <PipHeader x={X_PIPS} y={124} />
            <PipRow x={X_PIPS} y={yC} statuses={signature(c)} seed={3} />
          </g>
        </Field>
      </figure>
      <div className={s.anatomyPanel}>
        <Choices<string> label="Step through the three tones" value={String(step)} onChange={(v) => setStep(Number(v))} options={STEPS.map((x, i) => ({ value: String(i), label: x.label, hint: x.hint }))} />
        <p className={s.reading} aria-live="polite">{captions[step]}</p>
        {step === 2 && (
          <ul className={s.ledger} aria-label={`How ${c.label} answers`}>
            {c.relations.map((r) => {
              const key = RELATION_KEYS.find((k) => RELATION_LABEL[k] === r.label);
              return (
                <li key={r.label} data-status={r.status}>
                  {key && <LedgerIcon k={key} />}
                  <div><p className={s.ledgerHead}><span>{r.label}</span><StatusMark status={r.status} /><strong>{r.status}</strong></p></div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
    <div className={s.groups}>
      {groups.map((g, i) => <div key={i} className={s.group} data-on={i === step || undefined}>{g}</div>)}
    </div>
    </>
  );
}

/* ------------------------------------------------------------------------
   The size dial: at what size does the lean change?
   --------------------------------------------------------------------- */

export function SizeDial({ tritoneNote }: { tritoneNote: string }) {
  const [n, setN] = useState(2);
  const tones = useTones();
  const uid = useId();
  const cls = sizeClass(n);
  const a = 60, b = 60 + n;
  const id = `dial|${n}`;
  const playing = tones.playing === id;
  const events: AudioEvent[] = [tone(a, 0), tone(b, 0.6)];
  const now = soundingTone(events, tones.at, playing);
  const l = lean(cls);
  const reading = l ? `Leans: ${l.direction} · ${l.size === "similar" ? "a similar size" : "a smaller size"} · stay ${l.proximity} · a return ${l.return === "competes" ? "can compete" : "is possible"}.` : tritoneNote;
  return (
    <div className={s.dial} data-size={cls}>
      <figure className={s.dialFigure}>
        <Field high unheard label={`The first interval is ${noteName(a)} to ${noteName(b)}, ${n} semitones: ${cls === "neither" ? "neither small nor large in the common quantified implementation, so no lean is drawn" : `${cls}, so the ${cls === "small" ? "small" : "large"}-interval leans are drawn round the place the third tone will be`}.`}>
          <IntervalBrace a={a} b={b} label={`${n} st`} />
          <Stroke from={[0, a]} to={[1, b]} kind="heard" seed={1} />
          <Tone k={0} pitch={a} now={now === 0} name seed={0} />
          <Tone k={1} pitch={b} now={now === 1} name seed={1} />
          <Leans cls={cls} a={a} b={b} />
          <Playhead at={playing ? tones.at : 0} />
        </Field>
      </figure>
      <div className={s.dialPanel}>
        <label className={s.dialLabel} htmlFor={uid}>Size of the first interval: <b>{n} semitones</b> · C4 to {noteName(b)}</label>
        <input id={uid} className={s.range} type="range" min={1} max={12} step={1} value={n} onChange={(e) => { setN(Number(e.target.value)); tones.stop(); }} aria-valuetext={`${n} semitones, ${cls === "neither" ? "neither small nor large" : cls}`} />
        <ol className={s.zones} aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((k) => (
            <li key={k} data-class={sizeClass(k)} data-on={k === n || undefined}>{k}</li>
          ))}
        </ol>
        <ul className={s.zoneKey}>
          <li data-class="small">small · 5 semitones or fewer</li>
          <li data-class="neither">six · neither</li>
          <li data-class="large">large · 7 semitones or more</li>
        </ul>
        <Player tones={tones} id={id} events={events} label={`the interval C4 to ${noteName(b)}`} />
        <p className={s.reading} aria-live="polite"><b>{n} semitones · {cls === "neither" ? "neither" : cls}.</b> {reading}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Same movement, different verdict
   --------------------------------------------------------------------- */

export function MovementGrid({ data }: { data: NarmourRecordContent }) {
  const [mv, setMv] = useState<Movement>("up → up");
  const grid = verdictGrid(data.families);
  const at = (fi: number, m: Movement) => grid.find((v) => v.family === data.families[fi] && v.movement === m)!;
  return (
    <div className={s.movement} data-movement={mv}>
      <Choices<Movement> label="Physical movement" value={mv} onChange={setMv} options={MOVEMENTS.map((m) => ({ value: m, label: m, hint: m === "up → up" ? "the melody keeps rising" : "the melody turns down" }))} />
      <div className={s.miniPair}>
        {data.families.map((f, fi) => {
          const v = at(fi, mv);
          const [pa, pb, pc] = pitchesOf(v.candidate);
          const direction = relationOf(v.candidate, "direction")!;
          return (
            <figure className={s.miniFigure} key={f.label} data-status={v.status}>
              <Field top={56} label={`After ${f.interval}, the melody goes ${mv}: ${noteName(pa)}, ${noteName(pb)}, ${noteName(pc)}. Its registral-direction verdict is ${direction.status.toLowerCase()}.`}>
                <Stroke from={[0, pa]} to={[1, pb]} kind="heard" seed={1} />
                <Stroke from={[1, pb]} to={[2, pc]} kind="heard" seed={2} />
                <Tone k={0} pitch={pa} name seed={0} />
                <Tone k={1} pitch={pb} name seed={1} />
                <Tone k={2} pitch={pc} name seed={2} />
                <Leans cls={sizeClass(f.semitones)} a={pa} b={pb} only={["direction"]} directionStamp={v.status} />
              </Field>
              <figcaption>
                <p className={s.miniHead}><b>{f.label}</b> · {mv}</p>
                <p className={s.miniVerdict}><StatusMark status={v.status} /> <strong>{v.status}</strong> <span>{RELATION_LABEL.direction.toLowerCase()}</span></p>
                <p className={s.miniBody}>{direction.detail}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <table className={s.grid2}>
        <caption>Registral-direction verdict, by physical movement and by the interval that came first</caption>
        <thead>
          <tr>
            <th scope="col"><span className={s.sr}>Physical movement</span></th>
            {data.families.map((f) => <th scope="col" key={f.label}>{f.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {MOVEMENTS.map((m) => (
            <tr key={m} data-on={m === mv || undefined}>
              <th scope="row">{m}</th>
              {data.families.map((f, fi) => {
                const v = at(fi, m);
                return <td key={f.label} data-status={v.status}><StatusMark status={v.status} /> <strong>{v.status}</strong><span>{v.candidate.label}</span></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Every continuation, every relation: the verdict sheets
   --------------------------------------------------------------------- */

function Contour({ c }: { c: NarmourCandidate }) {
  const pts = contourPoints(pitchesOf(c), 64, 34);
  return (
    <svg className={s.contour} viewBox="0 0 64 34" aria-hidden="true">
      <path d={`M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}`} />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 2 ? 3.6 : 3} data-third={i === 2 || undefined} />)}
    </svg>
  );
}

export function VerdictSheets({ data }: { data: NarmourRecordContent }) {
  const tones = useTones();
  const sheets = [
    { key: "large", title: "After C4 → G4", intro: data.matrix.lede, family: data.families[1], candidates: data.matrix.candidates, note: data.matrix.note },
    { key: "small", title: "After C4 → D4", intro: "", family: data.families[0], candidates: data.families[0].candidates, note: "" },
  ];
  return (
    <div className={s.sheets}>
      {sheets.map((sheet) => (
        <section className={s.sheet} key={sheet.key} aria-label={sheet.title}>
          <h4 className={s.sheetHead}>{sheet.title}</h4>
          <p className={s.sheetKick}><b>{sheet.family.interval}</b> · {sheet.family.body}</p>
          {sheet.intro && <p className={s.sheetIntro}>{sheet.intro}</p>}
          <ul className={s.candCards}>
            {sheet.candidates.map((c) => {
              const id = `sheet|${sheet.key}|${c.label}`;
              const on = tones.playing === id;
              return (
                <li key={c.label} data-on={on || undefined} style={{ "--hue": c.colour } as React.CSSProperties}>
                  <p className={s.cardKick}>{c.label}</p>
                  <div className={s.candTop}>
                    <Contour c={c} />
                    <p className={s.candMeta}>{c.physicalMovement} · {c.intervalSizes}</p>
                  </div>
                  <p className={s.candBody}>{c.body}</p>
                  <button type="button" className={s.rowPlay} onClick={() => void (on ? tones.stop() : tones.play(id, c.events))} aria-label={`${on ? "Stop" : "Play"} ${c.label} after ${sheet.family.interval}`}>{on ? "Stop" : "Play"}</button>
                </li>
              );
            })}
          </ul>
          <table className={s.matrix}>
            <caption className={s.sr}>Realization and denial matrix for continuations after {sheet.family.interval}</caption>
            <thead>
              <tr>
                <th scope="col">Continuation</th>
                <th scope="col">Physical movement</th>
                {RELATION_KEYS.map((k) => <th scope="col" key={k}><LedgerIcon k={k} />{RELATION_LABEL[k]}</th>)}
              </tr>
            </thead>
            <tbody>
              {sheet.candidates.map((c) => (
                <tr key={c.label}>
                  <th scope="row"><b>{c.label}</b><small>{c.intervalSizes}</small></th>
                  <td data-label="Physical movement"><strong>{c.physicalMovement}</strong></td>
                  {RELATION_KEYS.map((k) => {
                    const r = relationOf(c, k);
                    return r ? (
                      <td key={k} data-label={RELATION_LABEL[k]} data-status={r.status}>
                        <span className={s.cellHead}><StatusMark status={r.status} /><b>{r.status}</b></span>
                        <small>{r.detail}</small>
                      </td>
                    ) : <td key={k} data-label={RELATION_LABEL[k]}>—</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {sheet.note && <p className={s.note}>{sheet.note}</p>}
        </section>
      ))}
    </div>
  );
}

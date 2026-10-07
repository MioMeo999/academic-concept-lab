"use client";

import { useState, type CSSProperties } from "react";
import type { TonalCard, TonalContext, TonalProbe, TonalProfileItem } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import { Rich } from "../../_components/Sketch";
import { TonalField, levelsFor, PCS, LEVEL_LABEL } from "./Field";
import { useTones, contextThenProbe } from "./useTones";
import s from "./tonal.module.css";

const pcOf = (probe: TonalProbe) => probe.midi % 12;

/** Tonic and mode for each constructed context in the record. */
const KEY_OF: Record<string, { tonic: number; mode: "major" | "minor"; name: string }> = {
  "c-major-scale": { tonic: 0, mode: "major", name: "C major" },
  "c-major-cadence": { tonic: 0, mode: "major", name: "C major" },
  "f-major-cadence": { tonic: 5, mode: "major", name: "F major" },
  "a-minor-cadence": { tonic: 9, mode: "minor", name: "A minor" },
  "d-major-cadence": { tonic: 2, mode: "major", name: "D major" },
};

function PlayButton({ label, active, onClick, disabled }: { label: string; active: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" className={s.play} data-playing={active || undefined} onClick={onClick} disabled={disabled} aria-label={`${active ? "Replay" : "Play"} ${label}`}>
      <span className={s.playIcon} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

/* ------------------------------------------------------------------------
   Listen first. Twelve tones on the rim, no home yet. Hear the context and
   four probes; then give the field the context and watch it organise.
   --------------------------------------------------------------------- */

export function ListenFirst({ context, probes, lede, note }: { context: TonalContext; probes: TonalProbe[]; lede: string; note: string }) {
  const { play, stop, playing, unavailable } = useTones();
  const [organised, setOrganised] = useState(false);
  const [probe, setProbe] = useState<TonalProbe | null>(null);
  const key = KEY_OF[context.id];
  const levels = organised ? levelsFor(key.tonic, key.mode) : null;

  return (
    <div className={s.listen}>
      <TonalField
        levels={levels}
        tonicLabel="home"
        audible={probes.map(pcOf)}
        highlight={probe ? pcOf(probe) : undefined}
        highlightLabel={probe && organised ? probe.role : undefined}
        ariaLabel={organised ? "Twelve pitch classes arranged around C as home: the tonic triad closest, other diatonic tones further out, nondiatonic tones furthest." : "Twelve pitch classes evenly spaced on a rim, with no home and no differences in distance."}
        className={s.heroField}
      >
        <p className={s.fieldState} aria-live="polite">{organised ? "In C major, the same twelve tones take different distances from home." : "Twelve tones. No context, no home."}</p>
      </TonalField>

      <div className={s.listenPanel}>
        <Rich as="p" className={s.listenLede} html={lede} />
        <ol className={s.listenSteps}>
          <li>
            <span className={s.stepN}>1</span>
            <PlayButton label={`the ${context.label.split(" · ")[0]} context`} active={playing === "context"} onClick={() => void play("context", context.events)} />
          </li>
          <li>
            <span className={s.stepN}>2</span>
            <div className={s.probeRow} role="group" aria-label="Probe tones: context, then probe">
              {probes.map((p) => (
                <button key={p.note} type="button" className={s.probe} aria-pressed={probe?.note === p.note} data-playing={playing === p.note || undefined} onClick={() => { setProbe(p); void play(p.note, contextThenProbe(context, p.midi)); }}>
                  {p.note}
                </button>
              ))}
            </div>
          </li>
          <li>
            <span className={s.stepN}>3</span>
            <button type="button" className={s.organise} aria-pressed={organised} onClick={() => { setOrganised((v) => !v); stop(); }}>
              {organised ? "Take the context away" : "Give the tones a context"}
            </button>
          </li>
        </ol>
        <div className={s.listenRead} aria-live="polite">
          {probe && organised ? (
            <p><b>{probe.note}</b> · {probe.role}. {probe.body}</p>
          ) : probe ? (
            <p>You heard <b>{probe.note}</b> after the context. Its teaching interpretation stays hidden until the field has a context.</p>
          ) : (
            <p>Listen before reading any labels. How well does each probe seem to fit what came before it?</p>
          )}
          {unavailable && <p className={s.muted}>Audio is unavailable in this browser; the field and text carry the same comparison.</p>}
        </div>
        <p className={s.teachingNote}>{note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   The probe lab and the three levels of inference: the response you give,
   the profile built from many responses, the interpretation made of it.
   --------------------------------------------------------------------- */

const WHITE = [0, 2, 4, 5, 7, 9, 11];
const BLACK = [1, 3, 6, 8, 10];

export function ProbeLab({ context, probes, levels, note }: { context: TonalContext; probes: TonalProbe[]; levels: TonalCard[]; note: string }) {
  const { play, playing } = useTones();
  const [pc, setPc] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const byPc = new Map(probes.map((p) => [pcOf(p), p]));
  const probe = byPc.get(pc)!;
  const rated = Object.keys(ratings).length;
  const choose = (n: number) => { setPc(n); const p = byPc.get(n); if (p) void play(p.note, contextThenProbe(context, p.midi)); };

  // A plain render function, not a nested component: keys must not remount
  // on every rating, or keyboard focus would be lost.
  const renderKey = (n: number, black = false) => (
    <button
      key={n}
      type="button"
      className={black ? s.keyBlack : s.keyWhite}
      style={{ "--i": black ? [0.7, 1.7, 3.7, 4.7, 5.7][BLACK.indexOf(n)] : WHITE.indexOf(n) } as CSSProperties}
      aria-pressed={pc === n}
      data-playing={playing === byPc.get(n)?.note || undefined}
      onClick={() => choose(n)}
      aria-label={`Probe ${byPc.get(n)?.note}${ratings[n] ? `, your rating ${ratings[n]}` : ""}`}
    >
      <span className={s.keyName}>{PCS[n]}</span>
    </button>
  );

  return (
    <div className={s.lab}>
      <div className={s.labInstrument}>
        <div className={s.labContext}>
          <p className={s.labKicker}>Context</p>
          <p className={s.labContextName}>{context.label}</p>
          <button type="button" className={s.textButton} onClick={() => void play("lab-context", context.events)}>{playing === "lab-context" ? "replay context" : "play context"}</button>
        </div>
        <div className={s.yours} aria-hidden="true">
          <span className={s.yoursLabel}>your ratings</span>
          {[...WHITE, ...BLACK].map((n) => {
            const black = BLACK.includes(n);
            const x = black ? [0.7, 1.7, 3.7, 4.7, 5.7][BLACK.indexOf(n)] + 0.31 : WHITE.indexOf(n) + 0.5;
            return <span key={n} className={s.yoursBar} data-black={black || undefined} data-on={ratings[n] ? true : undefined} style={{ "--x": x, "--r": ratings[n] ?? 0 } as CSSProperties} />;
          })}
        </div>
        <div className={s.keyboard} role="group" aria-label="Twelve probe tones, one octave">
          {WHITE.map((n) => renderKey(n))}
          {BLACK.map((n) => renderKey(n, true))}
        </div>
        <p className={s.keyboardNote}>The pencil strokes above the keys are your own ratings: learner-generated teaching data, not a published profile.</p>
      </div>

      <ol className={s.ladder}>
        <li data-level="1">
          <p className={s.ladderHead}>{levels[0]?.label}</p>
          <p className={s.ladderAsk}>How well does <b>{probe.note}</b> fit what you just heard?</p>
          <div className={s.rating} role="group" aria-label={`Optional fit rating for ${probe.note}: 1 weak to 7 strong`}>
            {[1, 2, 3, 4, 5, 6, 7].map((v) => (
              <button key={v} type="button" aria-pressed={ratings[pc] === v} onClick={() => setRatings((r) => ({ ...r, [pc]: v }))}>{v}</button>
            ))}
          </div>
          <p className={s.ladderSmall}>1 = weak fit · 7 = strong fit. Not a measure of musical ability.</p>
        </li>
        <li data-level="2">
          <p className={s.ladderHead}>{levels[1]?.label}</p>
          <p className={s.ladderBody}>{rated === 0 ? "Rate a few probes: your responses start to form a pattern across pitch classes." : `${rated} of 12 probes rated. A pattern across pitch classes is a profile — still a pattern of responses, not yet a psychological construct.`}</p>
        </li>
        <li data-level="3">
          <p className={s.ladderHead}>{levels[2]?.label}</p>
          <Rich as="p" className={s.ladderBody} html={levels[2]?.body ?? ""} />
        </li>
      </ol>
      <div role="note" className={s.labAside}>
        <p className={s.labKicker}>{levels[3]?.label}</p>
        <Rich as="p" html={levels[3]?.body ?? ""} />
        <p className={s.teachingNote}>{note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   The landscape: the C-major teaching profile, read tone by tone.
   --------------------------------------------------------------------- */

export function Landscape({ items }: { items: TonalProfileItem[] }) {
  const [sel, setSel] = useState<number | null>(7);
  const levels = levelsFor(0, "major");
  const pcOfItem = (i: TonalProfileItem) => PCS.indexOf(i.pitchClass as (typeof PCS)[number]);
  const groups = (["anchor", "triad", "diatonic", "nondiatonic"] as const).map((level) => ({ level, items: items.filter((i) => i.level === level) }));
  return (
    <div className={s.landscape}>
      <TonalField levels={levels} tonicLabel="C" selected={sel} onSelect={setSel} ariaLabel="The C-major teaching profile as a field: C at home, E and G on the tonic-triad band, D, F, A and B on the diatonic band, and the five nondiatonic tones furthest out." />
      <div className={s.profileList}>
        {groups.map((g) => (
          <section key={g.level} className={s.profileGroup} data-level={g.level} aria-label={LEVEL_LABEL[g.level]}>
            <p className={s.profileGroupHead}><span aria-hidden="true" />{LEVEL_LABEL[g.level]}<em>{({ anchor: "home", triad: "near", diatonic: "further", nondiatonic: "furthest" } as const)[g.level]}</em></p>
            <ul>
              {g.items.map((it) => {
                const pc = pcOfItem(it);
                return (
                  <li key={it.note} data-on={sel === pc || undefined}>
                    <button type="button" aria-pressed={sel === pc} onClick={() => setSel(pc)}>{it.note}</button>
                    <span>{it.body}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Same note, different home. The C4 probe keeps its spoke; the context
   decides its distance.
   --------------------------------------------------------------------- */

export function SameNote({ probe, contexts }: { probe: TonalProbe; contexts: TonalContext[] }) {
  const { play, playing } = useTones();
  const [i, setI] = useState(0);
  const ctx = contexts[i];
  const key = KEY_OF[ctx.id];
  const levels = levelsFor(key.tonic, key.mode);
  return (
    <div className={s.same}>
      <TonalField
        levels={levels}
        tonicLabel={PCS[key.tonic]}
        highlight={pcOf(probe)}
        highlightLabel={`the same ${probe.note}`}
        ariaLabel={`The field recentred on ${key.name}. The held ${probe.note} sits at the ${LEVEL_LABEL[levels[pcOf(probe)]]} distance.`}
      />
      <div className={s.sameChoose}>
        <Choices<string>
          label="Choose the context that comes before the same C4"
          value={ctx.id}
          onChange={(id) => setI(Math.max(0, contexts.findIndex((c) => c.id === id)))}
          options={contexts.map((c) => ({ value: c.id, label: c.label.split(" · ")[0], hint: c.label.split(" · ")[1] }))}
        />
      </div>
      <div className={s.samePanel}>
        <div className={s.sameRead} aria-live="polite">
          <p className={s.sameRole}>{ctx.role}</p>
          <p>{ctx.body}</p>
          {key.mode === "minor" && <p className={s.muted}><Glyph g="?" /> In minor, the sixth and seventh degrees vary between the natural, harmonic and melodic forms of the scale, so the field does not rank them.</p>}
        </div>
        <PlayButton label={`${ctx.label.split(" · ")[0]}, then ${probe.note}`} active={playing === ctx.id} onClick={() => void play(ctx.id, contextThenProbe(ctx, probe.midi))} />
        <details className={s.held}>
          <summary>What is held constant</summary>
          <p>{ctx.controls}</p>
        </details>
      </div>
      <table className={s.sameTable}>
        <caption className={s.smallHeadInline}>The same {probe.note}, four readings</caption>
        <thead><tr><th scope="col">Context</th><th scope="col">What establishes it</th><th scope="col">Role of {probe.note}</th></tr></thead>
        <tbody>
          {contexts.map((c, k) => (
            <tr key={c.id} data-on={k === i || undefined}>
              <th scope="row">{c.label}</th>
              <td>{c.body}</td>
              <td>{c.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Keys have neighbourhoods: the field zooms out; C major becomes one key
   among related keys. Distance here is psychological similarity.
   --------------------------------------------------------------------- */

const FIFTHS = ["C", "G", "D", "A", "E", "B", "F♯", "D♭", "A♭", "E♭", "B♭", "F"];
const REL_MINORS = ["a", "e", "b", "f♯", "c♯", "g♯", "e♭", "b♭", "f", "c", "g", "d"];

export function KeySpace({ levels }: { levels: { label: string; body: string; relations: string[] }[] }) {
  const [l, setL] = useState(0);
  const cur = levels[l];
  const ang = (k: number) => -Math.PI / 2 + (k * Math.PI) / 6;
  const P = (k: number, r: number) => [Math.round(500 + Math.cos(ang(k)) * r), Math.round(500 + Math.sin(ang(k)) * r)] as const;
  const outer = 380, inner = 250;
  // which nodes are lit at each level (indices into FIFTHS / REL_MINORS)
  const litMajor = [[0, 1, 11], [11, 0, 1, 2, 3], [0, 11, 1], []][l] ?? [];
  const litMinor = [[0, 9], [], [0, 9, 11, 1], []][l] ?? [];
  const chords: [number, "M" | "m", number, "M" | "m"][] =
    l === 0 ? [[0, "M", 1, "M"], [0, "M", 11, "M"], [0, "M", 0, "m"], [0, "M", 9, "m"]]
    : l === 1 ? [[11, "M", 0, "M"], [0, "M", 1, "M"], [1, "M", 2, "M"], [2, "M", 3, "M"]]
    : l === 2 ? [[0, "M", 0, "m"], [0, "M", 9, "m"], [11, "M", 11, "m"], [1, "M", 1, "m"]]
    : [];
  const at = (k: number, t: "M" | "m") => P(k, t === "M" ? outer : inner);
  return (
    <div className={s.keys} data-level={l}>
      <figure className={s.keysFigure}>
        <svg viewBox="0 0 1000 1000" role="img" aria-label={`Key neighbourhood, ${cur.label}: ${cur.relations.join(", ")}`}>
          <circle className={s.keysRing} cx="500" cy="500" r={outer} filter="url(#folio-graphite)" />
          <circle className={s.keysRingInner} cx="500" cy="500" r={inner} filter="url(#folio-graphite)" />
          {chords.map(([a, ta, b, tb], k) => {
            const [x1, y1] = at(a, ta); const [x2, y2] = at(b, tb);
            const qx = Math.round((x1 + x2) / 2 + (500 - (x1 + x2) / 2) * 0.35), qy = Math.round((y1 + y2) / 2 + (500 - (y1 + y2) / 2) * 0.35);
            const hasArea = Math.min(x1, qx, x2) !== Math.max(x1, qx, x2) && Math.min(y1, qy, y2) !== Math.max(y1, qy, y2);
            return <path key={k} className={s.keysChord} d={`M${x1} ${y1} Q ${qx} ${qy} ${x2} ${y2}`} filter={hasArea ? "url(#folio-pencil)" : undefined} />;
          })}
          {FIFTHS.map((n, k) => { const [x, y] = P(k, outer); return <text key={n} x={x} y={y + 10} textAnchor="middle" className={s.keysMajor} data-lit={litMajor.includes(k) || undefined} data-home={k === 0 || undefined}>{n}</text>; })}
          {REL_MINORS.map((n, k) => { const [x, y] = P(k, inner); return <text key={n} x={x} y={y + 9} textAnchor="middle" className={s.keysMinor} data-lit={litMinor.includes(k) || undefined}>{n}</text>; })}
          {l === 3 && (
            <g className={s.torus}>
              <ellipse cx="500" cy="500" rx="170" ry="92" filter="url(#folio-pencil)" />
              <path d="M410 492 C 450 530, 550 530, 590 492" filter="url(#folio-pencil)" />
              <path d="M430 508 C 470 480, 530 480, 570 508" filter="url(#folio-pencil)" />
              <text x="500" y="446" textAnchor="middle">a mathematical surface</text>
              <text x="500" y="620" textAnchor="middle">not a place in the brain</text>
            </g>
          )}
        </svg>
        <figcaption className={s.caption}><Glyph g="▲" /> Teaching sketch: major keys on the outer circle of fifths, relative minors inside. Distance here stands for psychological similarity between key profiles, not physical distance.</figcaption>
      </figure>
      <div className={s.keysPanel}>
        <ol className={s.levelList} aria-label="Progressive key-space view">
          {levels.map((x, k) => (
            <li key={x.label} data-on={k === l || undefined}>
              <button type="button" aria-pressed={k === l} onClick={() => setL(k)}>
                <span className={s.levelNum}>{String(k + 1).padStart(2, "0")}</span>
                <span className={s.levelTitle}>{x.label}</span>
              </button>
              <p>{x.body}</p>
              <p className={s.levelRel}>{x.relations.join(" · ")}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Home can move. Two regions stay on the sheet; successive chords shift
   the balance without erasing earlier evidence.
   --------------------------------------------------------------------- */

export function MovingHome({ states, note }: { states: TonalCard[]; note: string }) {
  const [i, setI] = useState(0);
  const weightA = [1, 0.62, 0.34][i];
  const weightB = [0.18, 0.62, 1][i];
  return (
    <div className={s.moving}>
      <figure className={s.movingFigure} aria-hidden="true">
        <svg viewBox="0 -10 900 430">
          {/* Each chord is a piece of evidence; its faint line says which region it
              supports. Earlier lines stay drawn: the evidence is not erased. */}
          {Array.from({ length: 3 + i * 3 }).map((_, k) => {
            const toB = k >= 5 || (k >= 3 && k % 2 === 1);
            const x = 110 + k * 80;
            const [cx, w] = toB ? [610, weightB] : [290, weightA];
            const bottom = 196 + 48 + w * 64;
            return <path key={`e${k}`} className={toB ? s.evidenceB : s.evidenceA} d={`M${x} 348 C ${x} 300, ${cx} ${320 - w * 20}, ${cx} ${bottom}`} filter="url(#folio-graphite)" />;
          })}
          <g style={{ opacity: 0.25 + weightA * 0.75 } as CSSProperties} className={s.regionA}>
            <ellipse cx="290" cy="196" rx={70 + weightA * 90} ry={48 + weightA * 64} filter="url(#folio-pencil)" />
            <ellipse cx="290" cy="196" rx={36 + weightA * 40} ry={26 + weightA * 28} filter="url(#folio-pencil)" />
          </g>
          <text className={s.regionLabelA} x="290" y="30" textAnchor="middle"><tspan x="290">C-major-like</tspan><tspan x="290" dy="1.05em">region</tspan></text>
          <g style={{ opacity: 0.25 + weightB * 0.75 } as CSSProperties} className={s.regionB}>
            <ellipse cx="610" cy="196" rx={70 + weightB * 90} ry={48 + weightB * 64} filter="url(#folio-pencil)" />
            <ellipse cx="610" cy="196" rx={36 + weightB * 40} ry={26 + weightB * 28} filter="url(#folio-pencil)" />
          </g>
          <text className={s.regionLabelB} x="610" y="30" textAnchor="middle"><tspan x="610">related or</tspan><tspan x="610" dy="1.05em">contrasting region</tspan></text>
          <path className={s.timeLine} d="M90 348 C 300 346, 600 350, 810 348" filter="url(#folio-graphite)" />
          {Array.from({ length: 3 + i * 3 }).map((_, k) => <circle key={k} className={s.chordDot} cx={110 + k * 80} cy={348} r={k === 2 + i * 3 ? 9 : 6} />)}
          <text className={s.timeText} x="90" y="392">successive chords → earlier evidence stays</text>
        </svg>
      </figure>
      <div className={s.movingPanel}>
        <ol className={s.levelList} aria-label="Stage in the unfolding context">
          {states.map((x, k) => (
            <li key={x.label} data-on={k === i || undefined}>
              <button type="button" aria-pressed={k === i} onClick={() => setI(k)}>
                <span className={s.levelNum}>{String(k + 1).padStart(2, "0")}</span>
                <span className={s.levelTitle}>{x.label}</span>
              </button>
              <p>{x.body}</p>
            </li>
          ))}
        </ol>
        <p className={s.teachingNote}>{note}</p>
      </div>
    </div>
  );
}

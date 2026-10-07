"use client";

import { useState } from "react";
import type { ASACard, NarmourRecordContent } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import * as hand from "../../_folio/hand";
import { Field, Leans, Stroke, Tone } from "./Field";
import { noteName, pitchesOf } from "./geometry";
import s from "./narmour.module.css";

/* ---------------------------------------------------------------------------
   The concept figures: where the page stops drawing tones and draws relations.

   These belong to the record's editorial synthesis (✦): a map of how two
   sources of expectation meet, a chain that keeps moving, and three layers of
   one tradition that must not be mistaken for one another. They are teaching
   maps, not diagrams of any process in a listener.
   ------------------------------------------------------------------------- */

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 6, wander = 1) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

/** a box drawn by hand: four sides that do not quite meet */
const box = (x: number, y: number, w: number, h: number, seed: number) =>
  L(x, y, x + w, y + 0.8, seed, 5, 0.9) + L(x + w, y + 0.8, x + w - 0.6, y + h, seed + 1, 3, 0.8) + L(x + w - 0.6, y + h, x, y + h - 0.6, seed + 2, 5, 0.9) + L(x, y + h - 0.6, x + 0.5, y, seed + 3, 3, 0.8);

/* ------------------------------------------------------------------------
   Two sources of expectation
   --------------------------------------------------------------------- */

// the two lists of what feeds each system, as the record's own cards give them
export const BOTTOM_UP = ["direction", "size", "proximity", "return", "closure"];
export const TOP_DOWN = ["tonality", "idiom", "motivic familiarity", "meter", "phrase structure", "learned schemas"];

type Meeting = "bottom" | "top" | "converge" | "conflict";

export function TwoSources({ data }: { data: NarmourRecordContent }) {
  const [m, setM] = useState<Meeting>("converge");
  const cards = data.systems.cards;
  const left = m !== "top", right = m !== "bottom";
  const reading = m === "bottom" ? cards[0].body : m === "top" ? cards[1].body : m === "converge" ? data.systems.lede : cards[2].body;
  const yL = (i: number) => 92 + i * 38, yR = (i: number) => 90 + i * 34;
  const cx = 320, cy = 178;
  return (
    <div className={s.sources} data-meeting={m}>
      <figure className={s.sourcesFigure}>
        <svg className={s.diagram} viewBox="0 0 640 372" role="img" aria-label="Two sources of melodic expectation. Local bottom-up relations — direction, size, proximity, return and closure — and learned top-down knowledge — tonality, idiom, motivic familiarity, meter, phrase structure and learned schemas — both bear on the implications of a melodic surface. They can converge on one field of implications, or conflict.">
          <g className={s.srcLeft} data-off={!left || undefined}>
            <text className={s.diagHead} x="26" y="32">bottom-up</text>
            <text className={s.diagSub} x="26" y="54">local interval relations</text>
            {BOTTOM_UP.map((w, i) => (
              <g key={w}>
                <path className={s.srcBox} d={box(26, yL(i) - 15, 168, 30, 20 + i)} filter="url(#folio-pencil)" />
                <text className={s.diagTag} x="110" y={yL(i) + 5} textAnchor="middle">{w}</text>
                <path className={s.srcLine} d={hand.curve([[194, yL(i)], [232, (yL(i) + cy) / 2 + (i - 2) * 3], [cx - 64, cy + (i - 2) * 5]], { seed: 30 + i, wander: 0.5 })} filter="url(#folio-pencil)" />
              </g>
            ))}
          </g>
          <g className={s.srcRight} data-off={!right || undefined}>
            <text className={s.diagHead} x="614" y="32" textAnchor="end">top-down</text>
            <text className={s.diagSub} x="614" y="54" textAnchor="end">learned style and schema</text>
            {TOP_DOWN.map((w, i) => (
              <g key={w}>
                <path className={s.srcBox} d={box(446, yR(i) - 14, 168, 28, 50 + i)} filter="url(#folio-pencil)" />
                <text className={s.diagTag} x="530" y={yR(i) + 5} textAnchor="middle">{w}</text>
                <path className={s.srcLine} d={hand.curve([[446, yR(i)], [408, (yR(i) + cy) / 2 + (i - 2.5) * 3], [cx + 64, cy + (i - 2.5) * 5]], { seed: 70 + i, wander: 0.5 })} filter="url(#folio-pencil)" />
              </g>
            ))}
          </g>
          <g className={s.srcCentre}>
            <path className={s.srcRing} data-broken={m === "conflict" || undefined} d={hand.ring(cx, cy, 62, 44, { seed: 90, wobble: 0.04 })} filter="url(#folio-pencil)" />
            <text className={s.diagHead} x={cx} y={cy - 2} textAnchor="middle">implications</text>
            <text className={s.diagSub} x={cx} y={cy + 16} textAnchor="middle">several at once</text>
          </g>
          {(m === "converge" || m === "bottom" || m === "top") && (
            <g className={s.srcOut}>
              <path className={s.srcOutLine} d={hand.curve([[cx, cy + 46], [cx + 4, cy + 90], [cx, cy + 120]], { seed: 95, wander: 0.5 })} filter="url(#folio-pencil)" />
              <path className={s.srcOutLine} d={hand.arrowHead(cx, cy + 122, Math.PI / 2, { size: 11, seed: 96 })} filter="url(#folio-pencil)" />
              <path className={s.srcNext} d={hand.ring(cx, 338, 70, 22, { seed: 97, wobble: 0.05 })} />
              <text className={s.diagTag} x={cx} y="343" textAnchor="middle">the next event</text>
            </g>
          )}
          {m === "conflict" && (
            <g className={s.srcOut}>
              <path className={s.srcOutLine} d={hand.curve([[cx - 34, cy + 40], [cx - 86, cy + 84], [cx - 148, cy + 114]], { seed: 98, wander: 0.5 })} filter="url(#folio-pencil)" />
              <path className={s.srcOutLine} d={hand.arrowHead(cx - 150, cy + 116, Math.PI * 0.7, { size: 11, seed: 99 })} filter="url(#folio-pencil)" />
              <path className={s.srcOutLine} d={hand.curve([[cx + 34, cy + 40], [cx + 86, cy + 84], [cx + 148, cy + 114]], { seed: 100, wander: 0.5 })} filter="url(#folio-pencil)" />
              <path className={s.srcOutLine} d={hand.arrowHead(cx + 150, cy + 116, Math.PI * 0.3, { size: 11, seed: 101 })} filter="url(#folio-pencil)" />
              <path className={s.srcNext} d={hand.ring(cx - 150, 340, 72, 24, { seed: 102, wobble: 0.05 })} />
              <text className={s.diagTag} x={cx - 150} y="338" textAnchor="middle">what the local</text>
              <text className={s.diagTag} x={cx - 150} y="354" textAnchor="middle">interval favours</text>
              <path className={s.srcNext} d={hand.ring(cx + 150, 340, 72, 24, { seed: 103, wobble: 0.05 })} />
              <text className={s.diagTag} x={cx + 150} y="338" textAnchor="middle">what learned</text>
              <text className={s.diagTag} x={cx + 150} y="354" textAnchor="middle">style favours</text>
              <path className={s.srcConflict} d={hand.curve([[cx - 76, 340], [cx - 48, 330], [cx - 24, 350], [cx, 332], [cx + 24, 350], [cx + 48, 330], [cx + 76, 340]], { seed: 104, wander: 0.4 })} filter="url(#folio-pencil)" />
            </g>
          )}
        </svg>
      </figure>
      <div className={s.sourcesPanel}>
        <Choices<Meeting> label="How the two sources meet" value={m} onChange={setM} options={[
          { value: "bottom", label: "Bottom-up", hint: "local interval relations" },
          { value: "top", label: "Top-down", hint: "learned style" },
          { value: "converge", label: "Converging", hint: "one field of implications" },
          { value: "conflict", label: "Conflicting", hint: "pulling apart" },
        ]} />
        <p className={s.reading} aria-live="polite">{reading}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Expectation keeps moving: the window slides
   --------------------------------------------------------------------- */

const LOOP_COLS = [96, 236, 376, 516];
const LOOP_STEPS = [
  { label: "Interval", hint: "A → B" },
  { label: "Implication", hint: "what may follow?" },
  { label: "Realise / deny", hint: "B → C" },
  { label: "New context", hint: "C becomes the next starting point" },
];

export function Loop({ data }: { data: NarmourRecordContent }) {
  const [step, setStep] = useState(0);
  const c = data.families[0].candidates[0];
  const [a, b, p] = pitchesOf(c);
  const yA = 300 - (a - 58) * 19, yB = 300 - (b - 58) * 19, yC = 300 - (p - 58) * 19;
  const win = (from: number, to: number, y1: number, y2: number, seed: number) => {
    const x1 = LOOP_COLS[from] - 34, x2 = LOOP_COLS[to] + 34, top = Math.min(y1, y2) - 30, bot = Math.max(y1, y2) + 30;
    return box(x1, top, x2 - x1, bot - top, seed);
  };
  return (
    <div className={s.loopFig} data-step={step}>
      <figure className={s.loopFigure}>
        <Field top={90} columns={LOOP_COLS} unheard={step < 3} label={
          step === 0 ? `The chain begins with an interval, ${noteName(a)} to ${noteName(b)}.`
          : step === 1 ? `That interval implies several things about what may follow.`
          : step === 2 ? `The next tone, ${noteName(p)}, realises or denies them: the interval from ${noteName(b)} to ${noteName(p)} is now heard.`
          : `The new interval, ${noteName(b)} to ${noteName(p)}, becomes the next starting point, and implies in its turn.`}>
          <path className={s.window} data-on={step <= 2 || undefined} data-dim={step === 2 || undefined} d={win(0, 1, yA, yB, 120)} filter="url(#folio-pencil)" />
          <path className={s.window} data-on={step === 3 || undefined} d={win(1, 2, yB, yC, 130)} filter="url(#folio-pencil)" />
          <Stroke from={[0, a]} to={[1, b]} kind="heard" seed={1} fx={LOOP_COLS[0]} tx={LOOP_COLS[1]} />
          <Tone k={0} pitch={a} name seed={0} x={LOOP_COLS[0]} />
          <Tone k={1} pitch={b} name seed={1} x={LOOP_COLS[1]} />
          <g className={s.leanLayer} data-on={step === 1 || undefined}>
            <Leans cls="small" a={a} b={b} col={LOOP_COLS[2]} labels />
          </g>
          <g className={s.answerLayer} data-on={step >= 2 || undefined}>
            <Stroke from={[1, b]} to={[2, p]} kind="chosen" seed={4} fx={LOOP_COLS[1]} tx={LOOP_COLS[2]} />
            <Tone k={2} pitch={p} name seed={2} x={LOOP_COLS[2]} />
          </g>
          <g className={s.leanLayer} data-on={step === 3 || undefined}>
            <Leans cls="small" a={b} b={p} col={LOOP_COLS[3]} labels={false} />
            <path className={s.ghostRing} d={hand.ring(LOOP_COLS[3], yC, 13, 9, { seed: 140, wobble: 0.05 })} />
            <text className={s.tag} x={LOOP_COLS[3]} y={yC + 4} textAnchor="middle">?</text>
            <path className={s.loopBack} d={hand.curve([[LOOP_COLS[2] + 34, yB - 40], [LOOP_COLS[2] + 92, yB - 78], [LOOP_COLS[3] - 30, yC - 42]], { seed: 141, wander: 0.5 })} filter="url(#folio-pencil)" />
            <path className={s.loopBack} d={hand.arrowHead(LOOP_COLS[3] - 30, yC - 42, Math.PI * 0.36, { size: 10, seed: 142 })} filter="url(#folio-pencil)" />
          </g>
        </Field>
      </figure>
      <div className={s.loopPanel}>
        <Choices<string> label="Step through the loop" value={String(step)} onChange={(v) => setStep(Number(v))} options={LOOP_STEPS.map((x, i) => ({ value: String(i), label: x.label, hint: x.hint }))} />
        <ol className={s.stepList} aria-label="The four moments of the loop">
          <li data-on={step === 0 || undefined}><b>interval</b> A → B</li>
          <li data-on={step === 1 || undefined}><b>implication</b> what may follow?</li>
          <li data-on={step === 2 || undefined}><b>realise / deny</b> B → C</li>
          <li data-on={step === 3 || undefined}><b>new context</b> C becomes the next starting point</li>
        </ol>
        <p className={s.figNote}>new context → new implication</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Three layers of one tradition
   --------------------------------------------------------------------- */

const LAYER_META = [
  { title: "Narmour’s theory", who: "Narmour · 1990, 1991, 1992", hue: "var(--plum)", edge: "var(--plum-deep)" },
  { title: "Quantified layer", who: "Cuddy & Lunney · 1995 · Schellenberg · 1996", hue: "var(--teal)", edge: "var(--teal-deep)" },
  { title: "Later simplification", who: "Schellenberg · 1997", hue: "var(--red)", edge: "var(--red)" },
];
const LAYER_W = [576, 408, 240];

export function Layers({ data }: { data: NarmourRecordContent }) {
  const [on, setOn] = useState(0);
  const cards: ASACard[] = data.testable.cards;
  const y = (i: number) => 26 + i * 96;
  return (
    <div className={s.layers} data-layer={on}>
      <figure className={s.layersFigure}>
        <svg className={s.diagram} viewBox="0 0 640 320" role="img" aria-label="Three layers of one tradition, each narrower than the one before: Narmour's full theory; a quantified layer of bottom-up predictors tested by Cuddy and Lunney and by Schellenberg; and Schellenberg's later two-factor simplification. The widths are not measurements.">
          {cards.map((c, i) => (
            <g key={c.label} className={s.layer} data-on={i === on || undefined} style={{ "--hue": LAYER_META[i].hue, "--edge": LAYER_META[i].edge } as React.CSSProperties}>
              <path className={s.layerFill} d={`M12 ${y(i)} h${LAYER_W[i]} v72 h-${LAYER_W[i]} z`} />
              <path className={s.layerEdge} d={box(12, y(i), LAYER_W[i], 72, 160 + i * 4)} filter="url(#folio-pencil)" />
              <text className={s.layerTitle} x="30" y={y(i) + 32}>{LAYER_META[i].title}</text>
              <text className={s.diagSub} x="30" y={y(i) + 54}>{LAYER_META[i].who}</text>
            </g>
          ))}
          <g className={s.layerArrow} aria-hidden="true">
            <path d={hand.curve([[40, y(0) + 74], [46, y(0) + 84], [40, y(1) - 2]], { seed: 170, wander: 0.4 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(40, y(1) - 1, Math.PI / 2, { size: 9, seed: 171 })} filter="url(#folio-pencil)" />
            <text className={s.diagSub} x="62" y={y(0) + 90}>some bottom-up relations converted into predictors</text>
            <path d={hand.curve([[40, y(1) + 74], [46, y(1) + 84], [40, y(2) - 2]], { seed: 172, wander: 0.4 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(40, y(2) - 1, Math.PI / 2, { size: 9, seed: 173 })} filter="url(#folio-pencil)" />
            <text className={s.diagSub} x="62" y={y(1) + 90}>predictive information compressed</text>
          </g>
        </svg>
      </figure>
      <div className={s.layersPanel}>
        <Choices<string> label="Which layer?" value={String(on)} onChange={(v) => setOn(Number(v))} options={cards.map((c, i) => ({ value: String(i), label: c.label, hint: LAYER_META[i].who }))} />
        <ol className={s.layerList} aria-label="The three layers, in the record's words">
          {cards.map((c, i) => (
            <li key={c.label} data-on={i === on || undefined} style={{ "--hue": LAYER_META[i].edge } as React.CSSProperties}>
              <b>{c.label}</b> {c.body}
            </li>
          ))}
        </ol>
        <p className={s.figNote}>{data.testable.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   The whole, as a route map
   --------------------------------------------------------------------- */

function Down({ two, up }: { two?: boolean; up?: boolean }) {
  return (
    <svg className={s.down} data-two={two || undefined} viewBox="0 0 200 34" preserveAspectRatio="none" aria-hidden="true">
      {two ? (
        <>
          {/* the fork spreads from the middle; the merge gathers into it — both run downward */}
          <path d={hand.curve(up ? [[36, 3], [42, 18], [96, 28]] : [[100, 3], [46, 8], [36, 26]], { seed: 220, wander: 0.3 })} />
          <path d={hand.curve(up ? [[164, 3], [158, 18], [104, 28]] : [[100, 3], [154, 8], [164, 26]], { seed: 221, wander: 0.3 })} />
          <path d={hand.arrowHead(up ? 99 : 36, up ? 29 : 29, up ? 0.3 : Math.PI / 2, { size: 8, seed: 224 })} />
          <path d={hand.arrowHead(up ? 101 : 164, up ? 29 : 29, up ? Math.PI - 0.3 : Math.PI / 2, { size: 8, seed: 225 })} />
        </>
      ) : (
        <>
          <path d={hand.curve([[100, 2], [102, 16], [100, 28]], { seed: 222, wander: 0.4 })} />
          <path d={hand.arrowHead(100, 31, Math.PI / 2, { size: 8, seed: 223 })} />
        </>
      )}
    </svg>
  );
}

export function FinalModel() {
  return (
    <div className={s.model} role="img" aria-label="Branched I-R model: melodic surface and learned context feed bottom-up and top-down systems, which converge on multiple implications; the next event may realize, partially realize, or deny them, creating a new context and new implications. Closure is a relation that can weaken or terminate an active implication, not a downstream outcome node.">
      <div className={`${s.mNode} ${s.mWide}`}>melodic surface + learned context</div>
      <Down two />
      <div className={s.mPair}>
        <div className={s.mNode}><b>bottom-up</b><small>local interval relations</small></div>
        <div className={s.mNode}><b>top-down</b><small>style and schematic knowledge</small></div>
      </div>
      <Down two up />
      <div className={`${s.mNode} ${s.mWide}`} data-tone="teal"><b>multiple simultaneous implications</b><small>direction · size · proximity · return · closure · style</small></div>
      <Down />
      <div className={`${s.mNode} ${s.mWide}`} data-tone="red"><b>next melodic event</b><small>realise · partially realise · deny</small></div>
      <Down />
      <div className={`${s.mNode} ${s.mWide}`} data-tone="loop">new context ↺ new implication</div>
      <p className={s.mAside}><b>closure</b> can weaken or terminate an active implication; it is not a final outcome node.</p>
    </div>
  );
}


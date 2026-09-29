"use client";

import { useState } from "react";
import type { StatisticalCard, StatisticalStream } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import * as hand from "../../_folio/hand";
import { Ribbon, type RibbonMarks } from "./Ribbon";
import { reading } from "./geometry";
import { useNarrow } from "./useNarrow";
import s from "./stat.module.css";

/* ---------------------------------------------------------------------------
   The concept figures: where the page stops counting and asks what is doing
   the counting, and what the counts are for. These belong to the record's
   editorial synthesis (✦): teaching maps, not diagrams of anything in a
   listener.
   ------------------------------------------------------------------------- */

// trigonometric results can differ in their last digit between the server and the browser, so every drawn coordinate is rounded
const q = (v: number) => Math.round(v * 100) / 100;
const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 5, wander = 0.9) => hand.line(x1, y1, x2, y2, { seed, wander, segments });
const box = (x: number, y: number, w: number, h: number, seed: number) =>
  L(x, y, x + w, y + 0.8, seed, 5, 0.9) + L(x + w, y + 0.8, x + w - 0.6, y + h, seed + 1, 3, 0.8) + L(x + w - 0.6, y + h, x, y + h - 0.6, seed + 2, 5, 0.9) + L(x, y + h - 0.6, x + 0.5, y, seed + 3, 3, 0.8);

/* ------------------------------------------------------------------------
   Learning is not prediction: acquiring a tally, and using it
   --------------------------------------------------------------------- */

type Phase = "learning" | "prediction" | "both";

export function WriteRead({ learning, prediction, both }: { learning: string; prediction: string; both: string }) {
  const [phase, setPhase] = useState<Phase>("both");
  const w = (k: "experience" | "learned" | "expect") => (k === "experience" ? phase !== "prediction" : k === "learned" ? true : phase !== "learning");
  return (
    <div className={s.writeRead} data-phase={phase}>
      <figure className={s.writeReadFigure}>
        <svg className={s.diagram} viewBox="0 0 640 250" role="img" aria-label="Learning and prediction are two steps. Learning, the statistical-learning hypothesis, takes experience and acquires learned regularities. Prediction, the probabilistic-prediction hypothesis, takes the learned model and uses it for expectation during current listening.">
          <g className={s.wrNode} data-off={!w("experience") || undefined}>
            <path className={s.wrBox} d={box(20, 60, 170, 130, 300)} filter="url(#folio-pencil)" />
            <text className={s.diagHead} x="105" y="52" textAnchor="middle">experience</text>
            {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} className={s.wrBead} cx={40 + i * 26} cy={120 + (i % 2 ? 14 : -10) + (i === 3 ? -14 : 0)} r="8" />)}
            <path className={s.wrThread} d={hand.curve([[40, 110], [66, 134], [92, 120], [118, 96], [144, 134], [170, 120]], { seed: 310, wander: 0.4 })} filter="url(#folio-pencil)" />
          </g>
          <g className={s.wrNode} data-off={!w("learned") || undefined}>
            <path className={s.wrBox} d={box(235, 60, 170, 130, 320)} filter="url(#folio-pencil)" />
            <text className={s.diagHead} x="320" y="52" textAnchor="middle">learned regularities</text>
            <g className={s.wrTally} filter="url(#folio-pencil)">
              {[0, 1, 2, 3].map((k) => <path key={k} d={L(268 + k * 13, 100, 269 + k * 13, 146, 330 + k, 3, 0.8)} />)}
              <path d={L(260, 138, 322, 104, 340, 4, 1)} />
              {[0, 1, 2].map((k) => <path key={k} d={L(346 + k * 13, 100, 347 + k * 13, 146, 350 + k, 3, 0.8)} />)}
            </g>
            <text className={s.diagSub} x="320" y="172" textAnchor="middle">a tally — or a model</text>
          </g>
          <g className={s.wrNode} data-off={!w("expect") || undefined}>
            <path className={s.wrBox} d={box(450, 60, 170, 130, 340)} filter="url(#folio-pencil)" />
            <text className={s.diagHead} x="535" y="52" textAnchor="middle">online expectation</text>
            <path className={s.wrFork} d={hand.curve([[470, 126], [500, 106], [540, 96]], { seed: 350, wander: 0.5 })} filter="url(#folio-pencil)" />
            <path className={s.wrFork} d={hand.curve([[470, 126], [510, 126], [560, 126]], { seed: 351, wander: 0.5 })} filter="url(#folio-pencil)" />
            <path className={s.wrFork} d={hand.curve([[470, 126], [500, 148], [540, 158]], { seed: 352, wander: 0.5 })} filter="url(#folio-pencil)" />
            <text className={s.diagHead} x="588" y="134" textAnchor="middle">?</text>
          </g>
          <g className={s.wrArrow} data-off={phase === "prediction" || undefined}>
            <path d={hand.curve([[196, 124], [212, 116], [230, 124]], { seed: 360, wander: 0.5 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(231, 124, 0.3, { size: 10, seed: 361 })} filter="url(#folio-pencil)" />
            <text className={s.diagTag} x="213" y="216" textAnchor="middle">acquiring</text>
            <text className={s.diagSub} x="213" y="236" textAnchor="middle">statistical-learning hypothesis</text>
          </g>
          <g className={s.wrArrow} data-off={phase === "learning" || undefined}>
            <path d={hand.curve([[411, 124], [427, 116], [445, 124]], { seed: 362, wander: 0.5 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(446, 124, 0.3, { size: 10, seed: 363 })} filter="url(#folio-pencil)" />
            <text className={s.diagTag} x="428" y="216" textAnchor="middle">using</text>
            <text className={s.diagSub} x="428" y="236" textAnchor="middle">probabilistic-prediction hypothesis</text>
          </g>
        </svg>
      </figure>
      <div className={s.writeReadPanel}>
        <Choices<Phase> label="Which step?" value={phase} onChange={setPhase} options={[
          { value: "learning", label: "Learning", hint: "acquiring regularities" },
          { value: "prediction", label: "Prediction", hint: "using a learned model" },
          { value: "both", label: "Both", hint: "adjacent, not the same" },
        ]} />
        <p className={s.reading} aria-live="polite">{phase === "learning" ? learning : phase === "prediction" ? prediction : both}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   What is doing the counting? One stream, two descriptions
   --------------------------------------------------------------------- */

type Account = "pairs" | "chunks" | "both";
const ACCOUNT_MARKS: Record<Account, RibbonMarks> = {
  pairs: { weighted: true, bars: "next", cuts: true },
  chunks: { weighted: false, bars: "none", brackets: true, chunkBy: "units" },
  both: { weighted: true, bars: "next", cuts: true, brackets: true, chunkBy: "units" },
};

export function Mechanism({ stream, supported, unsettled }: { stream: StatisticalStream; supported: string; unsettled: string }) {
  const [account, setAccount] = useState<Account>("pairs");
  const narrow = useNarrow();
  const r = reading(stream.noteSequence, stream.unitSequence, stream.noteSequence.length);
  const same = JSON.stringify(r.cuts) === JSON.stringify(r.actual);
  const text: Record<Account, string> = {
    pairs: "Read as pairwise probabilities, the stream is a set of bars: a boundary is where the tone that came next was less probable than the tones on either side of it.",
    chunks: "Read as chunks, the same stream is a set of recurring units held together: a boundary is where one remembered unit ends and the next begins.",
    both: same
      ? `Here the two descriptions mark the same ${r.actual.length} boundaries, so the stretches they cut out are the same. ${supported} ${unsettled}`
      : "The two descriptions mark different boundaries here.",
  };
  return (
    <div className={s.mechanism} data-account={account}>
      <figure className={s.mechanismFigure}>
        <Ribbon stream={stream} n={stream.noteSequence.length} marks={ACCOUNT_MARKS[account]} narrow={narrow} label={`The stream described as ${account === "pairs" ? "pairwise probabilities, with a bar under each junction and a cut where the bar dips" : account === "chunks" ? "chunks, with a brace over each recurring unit" : "both pairwise probabilities and chunks, which mark the same boundaries"}.`} />
      </figure>
      <div className={s.mechanismPanel}>
        <Choices<Account> label="Describe the same stream as" value={account} onChange={setAccount} options={[
          { value: "pairs", label: "Pairwise probabilities", hint: "bars and dips" },
          { value: "chunks", label: "Chunks", hint: "recurring units" },
          { value: "both", label: "Both, together", hint: "the same boundaries" },
        ]} />
        <p className={s.reading} aria-live="polite">{text[account]}</p>
        <p className={s.figNote}>▲ The stream is the record&rsquo;s constructed one. Two ways of describing what a learner has picked up can mark the same boundaries, which is why the boundaries alone do not say which process produced them.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   The whole, as a loop that has no end
   --------------------------------------------------------------------- */

export function Loop({ steps }: { steps: StatisticalCard[] }) {
  const [at, setAt] = useState(0);
  const cx = 150, cy = 150, r = 108;
  const pt = (i: number, rr = r): [number, number] => {
    const a = -Math.PI / 2 + (i / steps.length) * Math.PI * 2;
    return [q(cx + Math.cos(a) * rr), q(cy + Math.sin(a) * rr)];
  };
  return (
    <div className={s.loop} data-step={at}>
      <figure className={s.loopFigure}>
        <svg className={s.diagram} viewBox="0 0 300 300" role="img" aria-label={`A loop of ${steps.length} steps with no end: ${steps.map((x) => x.label.toLowerCase()).join(", then ")}, and then back to experience.`}>
          {steps.map((_, i) => {
            const a = pt(i), b = pt(i + 1), m = (() => { const ang = -Math.PI / 2 + ((i + 0.5) / steps.length) * Math.PI * 2; return [q(cx + Math.cos(ang) * (r + 5)), q(cy + Math.sin(ang) * (r + 5))] as [number, number]; })();
            const shorten = (from: [number, number], to: [number, number], k: number): [number, number] => { const d = Math.hypot(to[0] - from[0], to[1] - from[1]) || 1; return [q(from[0] + ((to[0] - from[0]) / d) * k), q(from[1] + ((to[1] - from[1]) / d) * k)]; };
            const s0 = shorten(a, m, 24), s1 = shorten(b, m, 26);
            return (
              <g key={i} className={s.loopArc}>
                <path d={hand.curve([s0, m, s1], { seed: 400 + i, wander: 0.4 })} filter="url(#folio-pencil)" />
                <path d={hand.arrowHead(s1[0], s1[1], Math.atan2(s1[1] - m[1], s1[0] - m[0]), { size: 9, seed: 420 + i })} filter="url(#folio-pencil)" />
                <title>{`step ${i + 1} to step ${((i + 1) % steps.length) + 1}`}</title>
              </g>
            );
          })}
          {steps.map((c, i) => {
            const [x, y] = pt(i);
            return (
              <g key={c.label} className={s.loopNode} data-on={i === at || undefined} style={{ "--hue": c.colour } as React.CSSProperties}>
                <circle className={s.loopFill} cx={x} cy={y} r="22" />
                <path className={s.loopRing} d={hand.ring(x, y, 22, 22, { seed: 430 + i, wobble: 0.03 })} filter="url(#folio-pencil)" />
                <text className={s.loopNum} x={x} y={y + 7} textAnchor="middle">{i + 1}</text>
              </g>
            );
          })}
          <text className={s.diagSub} x={cx} y={cy - 4} textAnchor="middle">a loop,</text>
          <text className={s.diagSub} x={cx} y={cy + 14} textAnchor="middle">not an endpoint</text>
        </svg>
      </figure>
      <div className={s.loopPanel}>
        <Choices<string> label="Follow the loop" value={String(at)} onChange={(v) => setAt(Number(v))} options={steps.map((c, i) => ({ value: String(i), label: `${i + 1} · ${c.label}` }))} />
        <ol className={s.loopList} aria-label="The five steps, in the record's words">
          {steps.map((c, i) => (
            <li key={c.label} data-on={i === at || undefined} style={{ "--hue": c.colour } as React.CSSProperties}>
              <b>{c.label}</b> {c.body}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

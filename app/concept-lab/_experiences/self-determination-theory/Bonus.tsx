"use client";

import { useState } from "react";
import type { SDTContextModel, SDTRewardComparison, SDTWorkModel } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import * as hand from "../../_folio/hand";
import s from "./sdt.module.css";

/* ---------------------------------------------------------------------------
   Two views of context.

   FLOW — conditions at work may be experienced as supporting or thwarting
   the three needs, which may shape the quality of motivation and selected
   outcomes. The arrows say "may": the record is explicit that the 2017
   workplace model is a schematic whose relationships are not all equally
   causal or equally established, and the page keeps that visible.

   LENS — one nominal reward, two contexts of delivery, drawn as a push and as
   information. Both are teaching drawings (▲).
   ------------------------------------------------------------------------- */

type Ctx = "supportive" | "thwarting";

export function ContextFlow({ context, model }: { context: SDTContextModel; model: SDTWorkModel }) {
  const [ctx, setCtx] = useState<Ctx>("supportive");
  const [sup, thw] = context.experiences;
  const cur = ctx === "supportive" ? sup : thw;
  const need = ctx === "supportive" ? model.needs[0] : model.needs[1];
  const mot = (m: string) => (ctx === "supportive" ? m === "autonomous" : m === "controlled" || m === "amotivation");

  return (
    <div className={s.flow} data-ctx={ctx}>
      <div className={s.flowSwitch}>
        <p className={s.smallHead}>The same conditions, read two ways</p>
        <Choices<Ctx>
          label="How the work context is experienced"
          value={ctx}
          onChange={setCtx}
          options={[
            { value: "supportive", label: sup.label },
            { value: "thwarting", label: thw.label },
          ]}
        />
      </div>

      <div className={s.flowGrid}>
        <section className={s.flowCol} aria-labelledby="flow-a">
          <h3 id="flow-a" className={s.flowHead}>Conditions at work</h3>
          {model.context.map((c) => <p key={c} className={s.chip}>{c}</p>)}
          <p className={s.flowSub}>and the person</p>
          {model.person.map((c) => <p key={c} className={s.chip} data-person>{c}</p>)}
        </section>
        <span className={s.flowArrow} aria-hidden="true"><svg viewBox="0 0 60 24"><path d={hand.line(4, 12, 48, 12, { seed: 501, wander: 0.8, segments: 5 })} /><path d={hand.arrowHead(50, 12, 0, { size: 9, seed: 502 })} /></svg><i>may shape</i></span>
        <section className={s.flowCol} aria-labelledby="flow-b" data-live>
          <h3 id="flow-b" className={s.flowHead}>How it is experienced</h3>
          <p className={s.flowNow} key={ctx}>{cur.label}</p>
          <p className={s.flowBody}>{cur.body}</p>
          <p className={s.flowResult}>→ need <b>{need}</b></p>
        </section>
        <span className={s.flowArrow} aria-hidden="true"><svg viewBox="0 0 60 24"><path d={hand.line(4, 12, 48, 12, { seed: 503, wander: 0.8, segments: 5 })} /><path d={hand.arrowHead(50, 12, 0, { size: 9, seed: 504 })} /></svg><i>may shape</i></span>
        <section className={s.flowCol} aria-labelledby="flow-c">
          <h3 id="flow-c" className={s.flowHead}>Motivation</h3>
          {model.motivations.map((m) => <p key={m} className={s.chip} data-lit={mot(m) || undefined}>{m}</p>)}
        </section>
        <span className={s.flowArrow} aria-hidden="true"><svg viewBox="0 0 60 24"><path d={hand.line(4, 12, 48, 12, { seed: 505, wander: 0.8, segments: 5 })} /><path d={hand.arrowHead(50, 12, 0, { size: 9, seed: 506 })} /></svg><i>may relate to</i></span>
        <section className={s.flowCol} aria-labelledby="flow-d">
          <h3 id="flow-d" className={s.flowHead}>Selected outcomes</h3>
          {model.outcomes.map((m) => <p key={m} className={s.chip}>{m}</p>)}
        </section>
      </div>

      <p className={s.flowReading}>{context.outcomes.map((o, i) => <span key={o}>{i > 0 && <i aria-hidden="true"> → </i>}{o}</span>)}</p>
      <details className={s.itemised}>
        <summary>The same conditions, itemised</summary>
        <div>
          <p className={s.smallHead}>Work context</p>
          <ul>{context.contextItems.map((c) => <li key={c}>{c}</li>)}</ul>
          <p className={s.smallHead}>The person</p>
          <ul>{context.personItems.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </details>
      <p className={s.teachingNote}><Glyph g="■" /> {context.note} {model.note}</p>
    </div>
  );
}

type Frame = "controlling" | "informational";
const ART = "/visual-language/theories/sdt";

export function RewardLens({ rewards, source }: { rewards: SDTRewardComparison; source: { label: string; body: string; source: string } }) {
  const [frame, setFrame] = useState<Frame>("controlling");
  const [ctrl, info] = rewards.cases;
  const cur = frame === "controlling" ? ctrl : info;

  return (
    <div className={s.lens} data-frame={frame}>
      <div className={s.lensStage}>
        <div className={s.lensArt} role="img" aria-label={`A bonus envelope on the left and a person on the right. ${frame === "controlling" ? "Strands press from the bonus into the person." : "A thin line carries the bonus to a small tick at the person’s chest, as information about how well they did."}`}>
          <img className={s.lensImg} src={`${ART}/sdt-lens-base.webp`} alt="" width={900} height={433} />
          {(["controlling", "informational"] as Frame[]).map((f) => <img key={f} className={s.lensImg} data-layer data-on={f === frame || undefined} src={`${ART}/sdt-lens-${f}.webp`} alt="" width={900} height={433} aria-hidden="true" />)}
        </div>
        <p className={s.lensReward}>{rewards.reward}</p>
      </div>

      <div className={s.lensPanel}>
        <p className={s.smallHead}>The same nominal reward</p>
        <Choices<Frame>
          label="The context the reward is delivered in"
          value={frame}
          onChange={setFrame}
          options={[{ value: "controlling", label: ctrl.label }, { value: "informational", label: info.label }]}
        />
        <div aria-live="polite" className={s.lensNow} key={frame}>
          <p className={s.lensQuote} data-frame={frame}>“{cur.quote}”</p>
          <p className={s.lensMeaning}>{cur.meaning}</p>
          <p className={s.lensBody}>{cur.body}</p>
        </div>
        <ul className={s.lensBoth} aria-label="Both readings, in words">
          {rewards.cases.map((c) => (
            <li key={c.label} aria-current={c === cur ? "true" : undefined}>
              <b>{c.label}</b> <span>“{c.quote}” — {c.meaning}</span>
            </li>
          ))}
        </ul>
        <p className={s.teachingNote}><Glyph g="■" /> {rewards.note}</p>
        <div role="note" className={s.srcNote}>
          <p className={s.srcKick}><Glyph g="●" /> What the sources add · {source.label}</p>
          <p>{source.body}</p>
          <p className={s.srcBy}>{source.source}</p>
        </div>
      </div>
    </div>
  );
}

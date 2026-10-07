"use client";

import { useState } from "react";
import type { SDTMatrixCase, SDTNeed, SDTNeedComparison } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import * as hand from "../../_folio/hand";
import s from "./sdt.module.css";

/* ---------------------------------------------------------------------------
   Three questions a person asks of a situation, each in three conditions.

   One switch re-draws all three emblems: the need is supported, merely
   missing, or actively blocked. Missing and blocked are drawn differently on
   purpose — absence fades a mark; opposition meets it with a counter-mark —
   because the record teaches that they are related but not the same
   experience. Emblems are teaching drawings (▲): they show the kind of
   condition, never an amount of need satisfaction.
   ------------------------------------------------------------------------- */

type State = "supported" | "missing" | "blocked";
type NeedKey = "autonomy" | "competence" | "relatedness";
const KEYS: NeedKey[] = ["autonomy", "competence", "relatedness"];

const STATE_COPY: Record<State, { label: string; hint: string }> = {
  supported: { label: "Supported", hint: "the experience is there" },
  missing: { label: "Missing", hint: "support is simply absent" },
  blocked: { label: "Blocked", hint: "something works against it" },
};

const ART = "/visual-language/theories/sdt";
const ALT: Record<NeedKey, Record<State, string>> = {
  autonomy: {
    supported: "The person draws their own wandering line across a board.",
    missing: "The board is nearly blank and the pen has been put down.",
    blocked: "A second hand from outside forces the line between rigid rails while strokes press it flat.",
  },
  competence: {
    supported: "A clear dotted route climbs the hill to a flag, with a signpost beside it.",
    missing: "Fog hides the hill and the route while the person stands at its foot.",
    blocked: "A crossed-out boulder and a pit cut across the route to the flag.",
  },
  relatedness: {
    supported: "Two people stand close together, their circles overlapping.",
    missing: "One person stands alone; another is faint and far away.",
    blocked: "A hatched wall with a crossed-out line stands between two people.",
  },
};

function NeedArt({ need, state, label }: { need: NeedKey; state: State; label: string }) {
  return (
    <div className={s.needArt} role="img" aria-label={`${label}, ${STATE_COPY[state].label.toLowerCase()}: ${ALT[need][state]}`}>
      {(Object.keys(STATE_COPY) as State[]).map((st) => (
        <img key={st} className={s.needImg} data-on={st === state || undefined} src={`${ART}/sdt-need-${need}-${st}.webp`} alt="" width={720} height={480} aria-hidden="true" loading="lazy" />
      ))}
    </div>
  );
}

function Pic({ social, owner }: { social: "interdependent" | "independent"; owner: "autonomous" | "controlled" }) {
  const f = "url(#folio-pencil)";
  return (
    <svg className={s.pic} viewBox="0 0 150 76" aria-hidden="true" focusable="false" data-owner={owner}>
      <path d={hand.ring(42, 38, 11, 11, { seed: 201, wobble: 0.06 })} filter={f} className={s.picPerson} />
      <circle cx="42" cy="38" r="2.6" className={s.picDot} />
      {social === "interdependent" && (
        <g className={s.picOthers}>
          <path d={hand.ring(112, 24, 9, 9, { seed: 202, wobble: 0.06 })} filter={f} />
          <path d={hand.ring(116, 54, 9, 9, { seed: 203, wobble: 0.06 })} filter={f} />
          <path d={hand.line(54, 36, 104, 26, { seed: 204, wander: 0.8, segments: 5 })} filter="url(#folio-graphite)" />
          <path d={hand.line(54, 41, 108, 52, { seed: 205, wander: 0.8, segments: 5 })} filter="url(#folio-graphite)" />
        </g>
      )}
      {owner === "autonomous" ? (
        <g className={s.picOut}>
          <path d={hand.curve([[16, 38], [8, 24], [16, 12]], { seed: 206, wander: 0.6 })} filter={f} />
          <path d={hand.arrowHead(16, 12, -1.0, { size: 8, seed: 207 })} filter={f} />
          <path d={hand.curve([[42, 25], [40, 12], [48, 6]], { seed: 208, wander: 0.5 })} filter={f} />
        </g>
      ) : (
        <g className={s.picIn}>
          <path d={hand.line(6, 6, 30, 28, { seed: 209, wander: 0.5, segments: 3 })} filter={f} />
          <path d={hand.arrowHead(30, 28, 0.82, { size: 8, seed: 210 })} filter={f} />
          <path d={hand.line(6, 70, 30, 50, { seed: 211, wander: 0.5, segments: 3 })} filter={f} />
          <path d={hand.arrowHead(30, 50, -0.8, { size: 8, seed: 212 })} filter={f} />
        </g>
      )}
    </svg>
  );
}

export function Needs({ needs, comparison, matrix, matrixNote, universal }: {
  needs: SDTNeed[];
  comparison: SDTNeedComparison;
  matrix: SDTMatrixCase[];
  matrixNote: string;
  universal: { label: string; body: string; source: string };
}) {
  const [state, setState] = useState<State>("supported");
  const pairs = comparison.pairs;
  const caseFor = (owner: string, social: string) => matrix.find((c) => c.label.startsWith(owner) && c.label.includes(social))!;

  return (
    <div className={s.needs}>
      <div className={s.needsSwitch}>
        <p className={s.smallHead}>Condition the same three needs</p>
        <Choices<State>
          label="Condition of the three needs"
          value={state}
          onChange={setState}
          options={(Object.keys(STATE_COPY) as State[]).map((k) => ({ value: k, label: STATE_COPY[k].label, hint: STATE_COPY[k].hint }))}
        />
      </div>

      <div className={s.needGrid}>
        {needs.map((n, i) => {
          const key = KEYS[i];
          const pair = pairs.find((p) => p.label === key)!;
          const rows: { st: State; text: string; quote: boolean }[] = [
            { st: "supported", text: n.question, quote: false },
            { st: "missing", text: pair.low, quote: true },
            { st: "blocked", text: pair.thwart, quote: true },
          ];
          return (
            <article key={key} className={s.need} data-need={key} data-state={state}>
              <p className={s.needNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</p>
              <h3 className={s.needName}>{n.label}</h3>
              <NeedArt need={key} state={state} label={n.label} />
              <p className={s.needMeaning}>{n.meaning}</p>
              <p className={s.needNot}><span>Not the same as</span> {n.distinction}</p>
              <ol className={s.stateList} aria-label={`${n.label} in three conditions`}>
                {rows.map((r) => (
                  <li key={r.st} aria-current={r.st === state ? "true" : undefined} data-st={r.st}>
                    <span className={s.stateName}>{STATE_COPY[r.st].label}</span>
                    <span className={r.quote ? s.stateQuote : s.stateAsk}>{r.quote ? `“${r.text}”` : r.text}</span>
                  </li>
                ))}
              </ol>
              <p className={s.needPair}>{pair.body}</p>
            </article>
          );
        })}
      </div>
      <p className={s.teachingNote}><Glyph g="▲" /> Teaching drawings. Fog and faded strokes are absence; a stroke met by a counter-stroke is opposition. Neither shows an amount of need satisfaction. {comparison.note}</p>

      <div role="note" className={s.srcNote}>
        <p className={s.srcKick}><Glyph g="●" /> What the sources add · {universal.label}</p>
        <p>{universal.body}</p>
        <p className={s.srcBy}>{universal.source}</p>
      </div>

      <div className={s.matrixHead}>
        <p className={s.smallHead}>A confusion worth separating</p>
        <h3 className={s.matrixTitle}>Autonomy is <em>not</em> independence.</h3>
        <p className={s.matrixLede}>Autonomy concerns volition. A person can act autonomously while interdependent, or act under control while working alone.</p>
      </div>
      <div className={s.matrix}>
        <p className={s.axisTop} aria-hidden="true"><span>interdependent</span><span>independent</span></p>
        <p className={s.axisSide} data-o="autonomous" aria-hidden="true">autonomous</p>
        <p className={s.axisSide} data-o="controlled" aria-hidden="true">controlled</p>
        {(["autonomous", "controlled"] as const).flatMap((owner) =>
          (["interdependent", "independent"] as const).map((social) => {
            const c = caseFor(owner, social);
            return (
              <article key={owner + social} className={s.cell} data-owner={owner}>
                <Pic social={social} owner={owner} />
                <p className={s.cellLabel}>{c.label}</p>
                <h4 className={s.cellTitle}>{c.title}</h4>
                <p className={s.cellBody}>{c.body}</p>
              </article>
            );
          }),
        )}
      </div>
      <p className={s.teachingNote}><Glyph g="▲" /> {matrixNote}</p>
    </div>
  );
}

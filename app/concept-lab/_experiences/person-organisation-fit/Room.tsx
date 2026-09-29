"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import * as hand from "../../_folio/hand";
import { Bust, MarkIcon } from "./Marks";
import { DOOR, MARKS, ROUNDS, UNITS, next, place, snapshot, STAGES, type Mark, type Snapshot, type Stage, type Where } from "./population";
import s from "./po.module.css";

/* ---------------------------------------------------------------------------
   The room — Attraction, Selection, Attrition, run three times.

   The same room the page opens on, made into something the reader can run. A
   made-up organisation stands above its doorway; a crowd of made-up
   candidates stands in the street below. Three rules, one per stage, each
   applied from where its actor stands. The wall of the room takes the colour
   of whoever is in it. The people who leave stay as outlines.

   Every position is a pure function of (round, stage), so the first paint is
   the same on the server and in the browser, and the figure means the same
   thing with animation switched off.
   ------------------------------------------------------------------------- */

const STAGE_LABEL: Record<Stage, string> = { start: "Start", attraction: "Attraction", selection: "Selection", attrition: "Attrition" };
const STAGE_HINT: Record<Stage, string> = { start: "the room as it stands", attraction: "who applies", selection: "who is chosen", attrition: "who leaves" };

const TOY_RULES = [
  "a candidate applies if their mark is one of the two most common in the room — they can see someone like them at the door.",
  "the organisation admits applicants who carry the room's most common mark, up to three openings — it picks people who look like the people it has.",
  "whoever carries the room's rarest mark leaves — they are the smallest minority.",
];

const names = MARKS.map((m) => m.name as string);
const join = (xs: string[]) => (xs.length < 2 ? (xs[0] ?? "") : xs.length === 2 ? `${xs[0]} and ${xs[1]}` : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const tally = (c: number[]) => join(c.map((n, i) => (n ? `${n} ${names[i]}` : "")).filter(Boolean));
const inRoom = (sn: Snapshot) => sn.counts.reduce((a, b) => a + b, 0);
const kindsWord = (k: number) => `${k} kind${k === 1 ? "" : "s"}`;

/** What happened at this point in the toy, in plain sentences. */
function describe(sn: Snapshot): { title: string; lines: string[] } {
  const { info } = sn;
  if (sn.stage === "start") {
    return sn.round === 1
      ? { title: "Before anything happens", lines: [`Twelve people work here: ${tally(sn.counts)}. Each carries one mark on the chest, standing in for something they hold important.`, "Outside, a crowd of twelve candidates waits — three of each kind."] }
      : { title: `Round ${sn.round} opens`, lines: [`The room holds ${inRoom(sn)} people of ${kindsWord(sn.kinds)}: ${tally(sn.counts)}.`, "A fresh crowd of twelve arrives outside — three of each kind again."] };
  }
  if (sn.stage === "attraction") {
    return { title: "Attraction — who applies?", lines: [`${info.applicants} of the twelve apply: those whose mark is one of the two most common in the room (${join(info.seenAtDoor.map((m) => names[m]))}). They can see someone like them at the door.`, `The other ${12 - info.applicants} stay where they are.`] };
  }
  if (sn.stage === "selection") {
    return { title: "Selection — who is chosen?", lines: [`The organisation has three openings, and it admits applicants who look most like the people it already has: the room's most common mark, ${names[info.preferred]}. ${info.admitted} come in; ${info.turnedAway} are turned away.`] };
  }
  const gone = info.left.reduce((a, b) => a + b, 0);
  const lines = gone
    ? [`The smallest minority leaves: the ${join(info.left.map((n, i) => (n ? names[i] : "")).filter(Boolean))} ${gone === 1 ? "person" : "people"} (${gone}).`]
    : ["Nobody leaves: there is no minority left to lose."];
  lines.push(`The room now holds ${inRoom(sn)} people of ${kindsWord(sn.kinds)}: ${tally(sn.counts)}.`);
  if (sn.kinds === 1) lines.push("One kind is left. Nobody decided this: three rules, each sensible from where it stands, leaned the same way.");
  return { title: "Attrition — who leaves?", lines };
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type Spot = { x: number; y: number; where: Where };

export function SortingRoom({ steps }: { steps: string[] }) {
  const [at, setAt] = useState<{ round: number; stage: Stage }>({ round: 1, stage: "start" });
  const sn = snapshot(at.round, at.stage);
  const nxt = next(at.round, at.stage);
  const read = describe(sn);
  const total = inRoom(sn);

  const stageRef = useRef<HTMLDivElement>(null);
  const els = useRef(new Map<string, HTMLElement>());
  const before = useRef<Map<string, Spot> | null>(null);

  // Move people from where they were to where they are now — through the
  // doorway, never through the wall. With reduced motion they simply are there.
  useLayoutEffect(() => {
    const now = new Map<string, Spot>(sn.people.map((p) => [p.id, { ...place(p), where: p.where }]));
    const was = before.current;
    before.current = now;
    const box = stageRef.current;
    if (!was || !box || (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const k = box.clientWidth / UNITS.w;
    for (const [id, to] of now) {
      const el = els.current.get(id);
      if (!el || typeof el.animate !== "function") continue;
      el.getAnimations().forEach((a) => a.cancel());
      const from = was.get(id);
      if (!from) { el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 480, easing: "ease-out" }); continue; }
      if (from.x === to.x && from.y === to.y) continue;
      const rel = (x: number, y: number) => `translate(${(x - to.x) * k}px, ${(y - to.y) * k}px)`;
      const frames: Keyframe[] = [{ transform: rel(from.x, from.y), zIndex: "1200" }];
      const enters = from.where !== "room" && to.where === "room";
      const leaves = from.where === "room" && to.where !== "room";
      if (enters) frames.push({ transform: rel(clamp(from.x, DOOR.x0 + 40, DOOR.x1 - 40), DOOR.y + 16), zIndex: "1200", offset: 0.5 });
      if (leaves) frames.push({ transform: rel(clamp(from.x, DOOR.x0 + 40, DOOR.x1 - 40), DOOR.y - 14), zIndex: "1200", offset: 0.42 });
      frames.push({ transform: "translate(0px, 0px)", zIndex: "1200" });
      el.animate(frames, { duration: enters || leaves ? 1000 : 720, easing: "cubic-bezier(.45, .05, .25, 1)" });
    }
  }, [sn]);

  const share = sn.counts.map((n) => (total ? n / total : 0));
  const label = `Round ${sn.round} of ${ROUNDS}, ${STAGE_LABEL[sn.stage].toLowerCase()}. The room holds ${tally(sn.counts)}. ${sn.people.filter((p) => p.where === "pool").length} candidates stand outside, ${sn.people.filter((p) => p.where === "queue").length} at the door, and ${sn.people.filter((p) => p.where === "gone").length} outlines mark people who have left.`;

  const H = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 8) => hand.line(x1, y1, x2, y2, { seed, wander: 1.5, segments });
  const walls = [
    H(30, 70, 970, 71, 1, 14), H(30, 70, 31, 500, 2), H(970, 71, 969, 500, 3),
    H(14, 500, DOOR.x0, 501, 4, 6), H(DOOR.x1, 501, 986, 500, 5, 6),
    H(14, 519, DOOR.x0 - 6, 519, 6, 6), H(DOOR.x1 + 6, 519, 986, 519, 7, 6),
    H(DOOR.x0, 501, DOOR.x0 - 6, 519, 8, 2), H(DOOR.x1, 501, DOOR.x1 + 6, 519, 9, 2),
  ].join(" ");
  const pole = H(86, 70, 87, 8, 10, 4);
  const flag = H(87, 12, 162, 30, 11, 3) + H(162, 30, 87, 50, 12, 3) + H(87, 50, 87, 12, 13, 2);
  const pm = sn.pennant;

  return (
    <div className={s.room} data-round={sn.round} data-stage={sn.stage}>
      <figure className={s.roomFigure}>
        <div ref={stageRef} className={s.roomStage} data-room data-round={sn.round} data-stage={sn.stage} role="img" aria-label={label}>
          <div className={s.roomInterior} aria-hidden="true">
            {MARKS.map((m, i) => <span key={m.id} className={s.wash} data-mark={i} style={{ "--share": share[i].toFixed(3) } as CSSProperties} />)}
          </div>
          <svg className={s.roomSvg} viewBox={`0 0 ${UNITS.w} ${UNITS.h}`} aria-hidden="true">
            <path className={s.roomInk} d={walls} filter="url(#folio-graphite)" />
            <path className={s.roomInk} d={pole} filter="url(#folio-graphite)" />
            <g className={s.pennant} style={{ "--hue": MARKS[pm].hue } as CSSProperties} data-mark={pm}>
              <path className={s.flagFill} d="M87 12 L162 30 L87 50 Z" />
              <path className={s.roomInk} d={flag} filter="url(#folio-graphite)" />
              <g className={s.flagMark}>
                {pm === 0 && <circle cx="112" cy="31" r="8" />}
                {pm === 1 && <path d="M100 31 124 30" />}
                {pm === 2 && <path d="M100 31h24M112 19v24" />}
                {pm === 3 && <path d="M100 24 112 38 124 24" />}
              </g>
            </g>
          </svg>
          {sn.people.map((p) => {
            const spot = place(p);
            return (
              <span
                key={p.id}
                ref={(el) => { if (el) els.current.set(p.id, el); else els.current.delete(p.id); }}
                className={s.person}
                data-mark={p.mark}
                data-where={p.where}
                style={{ "--x": spot.x, "--y": spot.y, "--m": p.mark, "--g": p.where === "gone" ? 1 : 0, zIndex: Math.round(spot.y) } as CSSProperties}
                aria-hidden="true"
              />
            );
          })}
        </div>
      </figure>

      <div className={s.roomPanel}>
        <p className={s.roundLine}>
          <span className={s.roundNum}>Round {sn.round} of {ROUNDS}</span>
          <span className={s.roundKinds}>{kindsWord(sn.kinds)} in the room</span>
        </p>
        <Choices<Stage>
          label="Stage of the round"
          value={at.stage}
          onChange={(stage) => setAt((v) => ({ ...v, stage }))}
          options={STAGES.map((st) => ({ value: st, label: STAGE_LABEL[st], hint: STAGE_HINT[st] }))}
        />
        <div className={s.roomButtons}>
          <button type="button" className={s.roomStep} onClick={() => nxt && setAt(nxt)} disabled={!nxt}>
            {nxt ? (nxt.stage === "start" ? `Round ${nxt.round} ▸` : `Next: ${STAGE_LABEL[nxt.stage].toLowerCase()} ▸`) : `${ROUNDS} rounds run`}
          </button>
          <button type="button" className={s.roomReset} onClick={() => setAt({ round: 1, stage: "start" })} disabled={at.round === 1 && at.stage === "start"}>
            Start again
          </button>
        </div>
        <div className={s.roomReading} aria-live="polite">
          <h3>{read.title}</h3>
          {read.lines.map((l) => <p key={l}>{l}</p>)}
        </div>
        <ul className={s.roomTally} aria-label="Who is in the room now">
          {MARKS.map((m, i) => (
            <li key={m.id} data-gone={sn.counts[i] === 0 || undefined}>
              <MarkIcon mark={i as Mark} />
              <span className={s.tallyName}>{m.name}</span>
              <span className={s.tallyCount}>{sn.counts[i]}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className={s.roomLegend} aria-label="How to read the drawing">
        <li><span className={s.legendFlag} aria-hidden="true" />the flag shows the mark most common in the room</li>
        <li><Bust mark={3} ghost className={s.legendBust} />an outline is someone who has left</li>
        <li><span className={s.legendWall} aria-hidden="true" />the wall takes the colour of whoever is inside</li>
      </ul>

      <p className={s.roomCaption}>
        <Glyph g="▲" /> A made-up room of made-up people. A mark stands in for something a person holds important; the rules have no exceptions and no randomness. It shows what three quiet filters do when they lean the same way — not how fast, or how far, a real organisation sorts.
      </p>

      <ol className={s.roomRules} aria-label="The three stages, in the record's words and in this toy">
        {steps.slice(0, 3).map((step, i) => (
          <li key={step} data-on={at.stage === STAGES[i + 1] || undefined}>
            <p className={s.ruleRecord}><span className={s.ruleNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{step}</p>
            <p className={s.ruleToy}><Glyph g="▲" /> In this toy, {TOY_RULES[i]}</p>
          </li>
        ))}
        {steps[3] && (
          <li className={s.ruleOutcome} data-on={(sn.kinds < 4 && sn.stage === "attrition") || undefined}>
            <p className={s.ruleRecord}><span className={s.ruleNum} aria-hidden="true">→</span>{steps[3]}</p>
          </li>
        )}
      </ol>
    </div>
  );
}

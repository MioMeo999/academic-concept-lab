"use client";

import { useState } from "react";
import type { AppliedWork, Category, Expansion, Interaction, Pathway } from "@/content/types";
import { Icon, Rich } from "../../_components/Sketch";
import { Choices } from "../../_folio/Choices";
import * as hand from "../../_folio/hand";
import { L, box, q } from "./draw";
import { ROPE, fitState, rope, spreadY, type Side } from "./geometry";
import { Person } from "./Marks";
import s from "./mp.module.css";

/* ---------------------------------------------------------------------------
   The figures that come after the structure: what shapes a taste, what it is
   for, how it develops, what happens when the listening is done at work, and
   the two sides of a fit. The last is this page's own frame (✦), drawn as such.
   ------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------
   Five levers, twisted into one preference
   --------------------------------------------------------------------- */

// five strands need five hues you can tell apart; the words carry the meaning, and the chosen strand is drawn over the rest
const STRAND: { ink: string; text: string }[] = [
  { ink: "var(--teal)", text: "var(--teal-deep)" },
  { ink: "var(--gold)", text: "var(--gold-deep)" },
  { ink: "var(--blue)", text: "var(--blue)" },
  { ink: "var(--plum)", text: "var(--plum-deep)" },
  { ink: "var(--coral)", text: "var(--red)" },
];

export function Levers({ levers }: { levers: Expansion[] }) {
  const [on, setOn] = useState(0);
  const segs = rope().sort((a, b) => a.z + (a.strand === on ? 4 : 0) - (b.z + (b.strand === on ? 4 : 0)));
  return (
    <div className={s.levers} data-on={on}>
      <figure className={s.leversFigure}>
        <svg className={s.diagram} viewBox="0 0 640 296" role="img" aria-label={`Five strands, one for each of ${levers.map((l) => l.title.toLowerCase()).join(", ")}, run in from the left, come together, and twist round one another into a single rope that ends in a preference. Each passes over and under the others: none explains a preference alone. The strand for ${levers[on].title.toLowerCase()} is drawn on top.`}>
          <g filter="url(#folio-pencil)" aria-hidden="true">
            {segs.map((sg) => (
              <g key={`${sg.strand}-${sg.x0}`} className={s.strand} data-on={sg.strand === on || undefined} style={{ "--ink": STRAND[sg.strand].ink } as React.CSSProperties}>
                <path className={s.strandHalo} d={`M${sg.x0} ${sg.y0}L${sg.x1} ${sg.y1}`} />
                <path className={s.strandLine} d={`M${sg.x0} ${sg.y0}L${sg.x1} ${sg.y1}`} />
              </g>
            ))}
          </g>
          <g aria-hidden="true">
            {levers.map((l, i) => (
              <text key={l.title} className={s.strandLabel} data-on={i === on || undefined} x="22" y={q(spreadY(i) - 13)} style={{ "--ink": STRAND[i].text } as React.CSSProperties}>{l.title}</text>
            ))}
            <path className={s.tie} d={hand.ring(ROPE.xEnd - 6, ROPE.cy, 8, ROPE.R + 10, { seed: 61, wobble: 0.05 })} filter="url(#folio-pencil)" />
            <text className={s.diagSub} x="486" y="102" textAnchor="middle">they interact</text>
            <text className={s.diagHead} x="560" y="234" textAnchor="middle">a preference</text>
            <path className={s.tie} d={hand.underline(508, 612, 242, { seed: 7 })} filter="url(#folio-pencil)" />
          </g>
        </svg>
      </figure>
      <div className={s.leversPanel}>
        <Choices<string> label="Choose a lever" value={String(on)} onChange={(v) => setOn(Number(v))} options={levers.map((l, i) => ({ value: String(i), label: l.title }))} />
        <ul className={s.leverList} aria-label="The five levers, in the record’s words">
          {levers.map((l, i) => (
            <li key={l.title} data-on={i === on || undefined} style={{ "--ink": STRAND[i].ink, "--inkText": STRAND[i].text } as React.CSSProperties}>
              <p className={s.leverHead}><Icon id={l.icon} className={s.leverIcon} /><b>{l.title}</b></p>
              <p className={s.leverBody}>{l.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Who likes it, or what it is for
   --------------------------------------------------------------------- */

type Ask = "who" | "for";

export function Flip({ interactions }: { interactions: Interaction[] }) {
  const [ask, setAsk] = useState<Ask>("who");
  return (
    <div className={s.flip} data-ask={ask}>
      <figure className={s.flipFigure}>
        <svg className={s.diagram} viewBox="0 0 640 244" role="img" aria-label={ask === "who" ? "The usual question: from a person, an arrow runs to the music they like — what kind of person likes this music?" : "The inverted question: from the music, an arrow runs to what it is for — identity expression and social connection."}>
          <g aria-hidden="true">
            {/* the music stays where it is: the thing being explained */}
            <path className={s.noteHead} d={hand.ring(520, 150, 31, 21, { seed: 4, wobble: 0.04, tilt: -0.3 })} filter="url(#folio-pencil)" />
            <path className={s.noteFill} d="M492 158a31 21 -17 1 0 56 -16a31 21 -17 1 0 -56 16z" />
            <path className={s.noteStem} d={L(546, 140, 548, 62, 5, 4, 0.5)} filter="url(#folio-pencil)" />
            <path className={s.noteStem} d={hand.curve([[548, 62], [578, 74], [582, 100], [570, 118]], { seed: 8, wander: 0.5 })} filter="url(#folio-pencil)" />
            <text className={s.diagHead} x="520" y="210" textAnchor="middle">this music</text>
            {ask === "who" ? (
              <g className={s.swapIn} key="who">
                <Person x={110} y={132} k={2.6} seed={11} />
                <text className={s.diagTag} x="110" y="196" textAnchor="middle">what kind of person?</text>
                <g className={s.arrowInk}>
                  <path d={hand.curve([[196, 118], [330, 108], [452, 118]], { seed: 13, wander: 0.5 })} filter="url(#folio-pencil)" />
                  <path d={hand.arrowHead(454, 118, 0.06, { size: 12, seed: 14 })} filter="url(#folio-pencil)" />
                </g>
                <text className={s.diagSub} x="326" y="98" textAnchor="middle">likes</text>
              </g>
            ) : (
              <g className={s.swapIn} key="for">
                <g>
                  <Person x={62} y={68} k={1.1} seed={21} />
                  <path className={s.bubble} d={box(94, 20, 54, 34, 30)} filter="url(#folio-pencil)" />
                  <path className={s.bubble} d={hand.curve([[100, 54], [92, 66], [106, 60]], { seed: 31, wander: 0.3 })} filter="url(#folio-pencil)" />
                  <ellipse className={s.miniNote} cx="115" cy="41" rx="6.5" ry="4.6" transform="rotate(-20 115 41)" />
                  <path className={s.bubble} d={L(121, 39, 121, 26, 6, 2, 0.3)} />
                  <path className={s.bubble} d={hand.ring(180, 38, 9, 6, { seed: 33, wobble: 0.04 })} filter="url(#folio-pencil)" />
                  <circle className={s.miniNote} cx="180" cy="38" r="2.6" />
                  <text className={s.diagTag} x="120" y="98" textAnchor="middle">identity expression</text>
                </g>
                <g>
                  <Person x={54} y={172} k={1} seed={41} />
                  <Person x={118} y={172} k={1} seed={43} />
                  <path className={s.bubble} d={hand.curve([[72, 150], [86, 140], [100, 150]], { seed: 45, wander: 0.4 })} filter="url(#folio-pencil)" />
                  <ellipse className={s.miniNote} cx="86" cy="134" rx="6.5" ry="4.6" transform="rotate(-20 86 134)" />
                  <text className={s.diagTag} x="90" y="212" textAnchor="middle">social connection</text>
                </g>
                <g className={s.arrowInk}>
                  <path d={hand.curve([[452, 118], [340, 108], [232, 118]], { seed: 15, wander: 0.5 })} filter="url(#folio-pencil)" />
                  <path d={hand.arrowHead(230, 118, Math.PI - 0.06, { size: 12, seed: 16 })} filter="url(#folio-pencil)" />
                </g>
                <text className={s.diagSub} x="342" y="98" textAnchor="middle">what is it for?</text>
              </g>
            )}
          </g>
        </svg>
      </figure>
      <div className={s.flipPanel}>
        <Choices<Ask>
          label="Which question to ask"
          value={ask}
          onChange={setAsk}
          options={[
            { value: "who", label: "Who likes this music?", hint: "the usual question" },
            { value: "for", label: "What is this music for?", hint: "the inverted question" },
          ]}
        />
        <p className={s.reading} aria-live="polite">{ask === "who" ? "Ask what kind of person likes this music." : "Ask what this music is for."}</p>
        <ul className={s.pairs} aria-label="The account and the two functions most often named, in the record’s words">
          {interactions.map((c) => (
            <li key={c.title}>
              <p className={s.pairKick}>{c.kicker}</p>
              <p className={s.pairTitle}>{c.title}</p>
              <Rich as="p" className={s.pairBody} html={c.body} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   How a taste gets built, and where the cited account stops
   --------------------------------------------------------------------- */

const ROAD: [number, number][] = [[70, 181], [188, 151], [310, 108], [420, 90]];

export function Road({ pathway }: { pathway: Pathway }) {
  const [at, setAt] = useState(0);
  return (
    <div className={s.road} data-step={at}>
      <figure className={s.roadFigure}>
        <svg className={s.diagram} viewBox="0 0 640 250" role="img" aria-label={`A winding road with four numbered stops — ${pathway.steps.join("; ")} — running up through childhood and adolescence to a dotted line. Beyond the line the road is faint and ends in a question mark: the cited account stops there, and does not claim that adult taste is fixed.`}>
          <g aria-hidden="true">
            <path className={s.roadBed} d={hand.curve([[26, 190], [92, 178], [150, 150], [214, 152], [276, 124], [338, 100], [402, 92], [462, 72]], { seed: 31, wander: 0.5 })} />
            <path className={s.roadLine} d={hand.curve([[26, 190], [92, 178], [150, 150], [214, 152], [276, 124], [338, 100], [402, 92], [462, 72]], { seed: 31, wander: 0.5 })} filter="url(#folio-pencil)" />
            <path className={s.roadFar} d={hand.curve([[462, 72], [520, 54], [600, 38]], { seed: 33, wander: 0.5 })} />
            <path className={s.boundary} d="M478 16V206" />
            <text className={s.diagSub} x="468" y="26" textAnchor="end">the cited account stops here</text>
            <text className={s.diagSub} x="490" y="116">not claimed:</text>
            <text className={s.diagSub} x="490" y="136">adult taste</text>
            <text className={s.diagSub} x="490" y="156">is fixed</text>
            <text className={s.diagHead} x="612" y="34" textAnchor="middle">?</text>
            <path className={s.dimension} d={L(26, 222, 470, 222, 9, 9, 0.5)} />
            <path className={s.dimension} d={L(26, 214, 26, 230, 10, 2, 0.3)} />
            <path className={s.dimension} d={L(470, 214, 470, 230, 11, 2, 0.3)} />
            <text className={s.diagSub} x="248" y="244" textAnchor="middle">the cited account: childhood and adolescence</text>
            {ROAD.map(([x, y], i) => (
              <g key={i} className={s.stop} data-on={i === at || undefined} onClick={() => setAt(i)}>
                {i === at && <path className={s.stopRing} d={hand.ring(x, y, 22, 22, { seed: 50 + i, wobble: 0.06 })} filter="url(#folio-pencil)" />}
                <circle className={s.stopDot} cx={x} cy={y} r={i === at ? 15 : 12.5} />
                <text className={s.stopNum} x={x} y={q(y + 4.8)} textAnchor="middle">{i + 1}</text>
              </g>
            ))}
          </g>
        </svg>
      </figure>
      <div className={s.roadPanel}>
        <Choices<string> compact label="Walk the road, one stop at a time" value={String(at)} onChange={(v) => setAt(Number(v))} options={pathway.steps.map((st, i) => ({ value: String(i), label: String(i + 1), hint: st }))} />
        <p className={s.roadTitle}>{pathway.title}</p>
        <Rich as="p" className={s.roadBlurb} html={pathway.blurb} />
        <ol className={s.stepList} aria-label="The four stops, in the record’s words">
          {pathway.steps.map((st, i) => <li key={st} data-on={i === at || undefined}>{st}</li>)}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Who holds the dial: music supplied, and music chosen
   --------------------------------------------------------------------- */

type Who = "supplied" | "chosen";
const DESKS = [110, 250, 390, 530];

export function Office({ applied }: { applied: AppliedWork[] }) {
  const [who, setWho] = useState<Who>("chosen");
  return (
    <div className={s.office} data-who={who}>
      <figure className={s.officeFigure}>
        <svg className={s.diagram} viewBox="0 0 640 248" role="img" aria-label={who === "supplied" ? "A room of four people at desks. A speaker on the wall plays the same music to all of them: background music the organisation supplies." : "A room of four people at desks, each in their own headphones with a dial of their own. A dashed line between two neighbours marks colleagues’ claims: a work condition the employee chooses."}>
          <g aria-hidden="true">
            <path className={s.room} d={box(14, 14, 612, 206, 90)} filter="url(#folio-pencil)" />
            {DESKS.map((cx, i) => (
              <g key={cx}>
                <path className={s.desk} d={box(cx - 40, 142, 80, 34, 100 + i)} filter="url(#folio-pencil)" />
                <Person x={cx} y={130} k={1} seed={60 + i * 2} />
                <path className={s.laptop} d={box(cx - 15, 148, 30, 18, 110 + i)} filter="url(#folio-pencil)" />
              </g>
            ))}
            {who === "supplied" ? (
              <g className={s.swapIn} key="supplied">
                <path className={s.speaker} d={box(296, 26, 48, 28, 120)} filter="url(#folio-pencil)" />
                <circle className={s.speakerCone} cx="320" cy="40" r="8" />
                {DESKS.map((cx, i) => (
                  <path key={cx} className={s.sound} d={hand.curve([[320, 60], [q(320 + (cx - 320) * 0.5), 76], [cx, 96]], { seed: 130 + i, wander: 0.4 })} />
                ))}
                <text className={s.diagSub} x="320" y="204" textAnchor="middle">background music the organisation supplies</text>
              </g>
            ) : (
              <g className={s.swapIn} key="chosen">
                {DESKS.map((cx, i) => (
                  <g key={cx}>
                    <path className={s.phones} d={hand.curve([[cx - 12, 108], [cx, 96], [cx + 12, 108]], { seed: 140 + i, wander: 0.3 })} filter="url(#folio-pencil)" />
                    <circle className={s.pad} cx={cx - 13} cy="112" r="4.6" />
                    <circle className={s.pad} cx={cx + 13} cy="112" r="4.6" />
                    <path className={s.sound} d={hand.curve([[cx - 24, 104], [cx - 30, 112], [cx - 24, 120]], { seed: 150 + i, wander: 0.3 })} />
                    <path className={s.sound} d={hand.curve([[cx + 24, 104], [cx + 30, 112], [cx + 24, 120]], { seed: 160 + i, wander: 0.3 })} />
                    <circle className={s.dial} cx={cx} cy="58" r="10" />
                    <path className={s.dialTick} d={`M${cx} 58L${q(cx + 6)} ${q(58 - 6)}`} />
                  </g>
                ))}
                <path className={s.claim} d={`M${DESKS[1] + 30} 116H${DESKS[2] - 30}`} />
                <text className={s.diagSub} x="320" y="86" textAnchor="middle">colleagues’ claims</text>
                <text className={s.diagSub} x="320" y="204" textAnchor="middle">a work condition the employee chooses</text>
              </g>
            )}
          </g>
        </svg>
      </figure>
      <div className={s.officePanel}>
        <Choices<Who>
          label="Who chooses the music at work?"
          value={who}
          onChange={setWho}
          options={[
            { value: "supplied", label: "The organisation supplies it", hint: "background music" },
            { value: "chosen", label: "The employee chooses it", hint: "individually controlled" },
          ]}
        />
        <p className={s.reading} aria-live="polite">
          {who === "supplied"
            ? "Background music the organisation supplies: the framing this literature sets aside."
            : "Listening by choice, on personal equipment: here preference stops being about taste and starts being about control."}
        </p>
        <p className={s.figNote}>{applied.length} studies, three designs: a quasi-experiment, a field study and a survey.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Person–Music Fit: the two sides (this page's own frame)
   --------------------------------------------------------------------- */

export function Fit({ categories }: { categories: Category[] }) {
  const [side, setSide] = useState<Side>("both");
  const st = fitState(side);
  // the person's piece keeps a tab on its right edge; the situation's piece has the notch that takes it
  const gap = st.joined ? 6 : 84;
  const piece = (x0: number, x1: number, tab: "out" | "in" | null, seed: number) => {
    const top = 40, bottom = 204, mid = 122;
    const right = tab === "out"
      ? L(x1, top, x1, mid - 26, seed, 3, 0.6) + hand.curve([[x1, mid - 26], [x1 + 26, mid - 22], [x1 + 30, mid], [x1 + 26, mid + 22], [x1, mid + 26]], { seed: seed + 1, wander: 0.4 }) + L(x1, mid + 26, x1, bottom, seed + 2, 3, 0.6)
      : L(x1, top, x1, bottom, seed, 5, 0.7);
    const left = tab === "in"
      ? L(x0, top, x0, mid - 26, seed + 3, 3, 0.6) + hand.curve([[x0, mid - 26], [x0 + 22, mid - 20], [x0 + 26, mid], [x0 + 22, mid + 20], [x0, mid + 26]], { seed: seed + 4, wander: 0.4 }) + L(x0, mid + 26, x0, bottom, seed + 5, 3, 0.6)
      : L(x0, top, x0, bottom, seed + 3, 5, 0.7);
    return L(x0, top, x1, top, seed + 6, 6, 0.8) + L(x0, bottom, x1, bottom, seed + 7, 6, 0.8) + right + left;
  };
  return (
    <div className={s.fit} data-side={side}>
      <figure className={s.fitFigure}>
        <svg className={s.diagram} viewBox="0 0 640 268" role="img" aria-label={side === "both" ? "Two pieces fitted together: what the person brings, and what the situation offers. This is the page's own frame, not an established theory. Neither side alone settles the outcome." : side === "person" ? "Only what the person brings is shown; the situation's piece is set aside. One side alone does not settle the outcome." : "Only what the situation offers is shown; the person's piece is set aside. One side alone does not settle the outcome."}>
          <g aria-hidden="true">
            <g className={s.pieceA} data-shown={st.person || undefined}>
              <path className={s.pieceFillA} d="M60 40H300V96Q330 100 330 122Q330 144 300 148V204H60Z" />
              <path className={s.pieceInk} d={piece(60, 300, "out", 200)} filter="url(#folio-pencil)" />
              <text className={s.pieceTitle} x="180" y="118" textAnchor="middle">What the person</text>
              <text className={s.pieceTitle} x="180" y="142" textAnchor="middle">brings</text>
            </g>
            <g className={s.pieceB} data-shown={st.situation || undefined} style={{ transform: `translateX(${gap}px)` }}>
              <path className={s.pieceFillB} d="M300 40H540V204H300V148Q326 144 326 122Q326 100 300 96Z" />
              <path className={s.pieceInk} d={piece(300, 540, "in", 220)} filter="url(#folio-pencil)" />
              <text className={s.pieceTitle} x="430" y="118" textAnchor="middle">What the situation</text>
              <text className={s.pieceTitle} x="430" y="142" textAnchor="middle">offers</text>
            </g>
            {st.joined ? (
              <g className={s.swapIn} key="joined">
                <path className={s.fitArc} d={hand.curve([[70, 218], [308, 240], [548, 218]], { seed: 70, wander: 0.5 })} />
                <text className={s.diagSub} x="308" y="260" textAnchor="middle">✦ fit — our frame, not an established theory</text>
              </g>
            ) : (
              <g className={s.swapIn} key="apart">
                <text className={s.diagHead} x={q((630 + gap) / 2)} y="132" textAnchor="middle">?</text>
                <text className={s.diagSub} x="308" y="260" textAnchor="middle">one side alone does not settle it</text>
              </g>
            )}
          </g>
        </svg>
      </figure>
      <div className={s.fitPanel}>
        <Choices<Side>
          label="Which side to show"
          value={side}
          onChange={setSide}
          options={[
            { value: "person", label: "The person’s side", hint: "what the listener brings" },
            { value: "situation", label: "The situation’s side", hint: "what the setting offers" },
            { value: "both", label: "Both, together", hint: "our frame" },
          ]}
        />
        <p className={s.reading} aria-live="polite">
          {side === "both" ? "Both together: neither side alone settles the outcome." : `${side === "person" ? "What the person brings" : "What the situation offers"}, on its own: it does not settle the outcome.`}
        </p>
        <ul className={s.sides} aria-label="The two sides, in the record’s words">
          {categories.map((c, i) => (
            <li key={c.title} data-side={i === 0 ? "person" : "situation"} data-on={(i === 0 ? st.person : st.situation) || undefined}>
              <p className={s.sideHead}><Icon id={c.icon} className={s.leverIcon} /><b>{c.title}</b></p>
              <p className={s.sideBody}>{c.definition}</p>
              <ul className={s.chips} aria-label={`${c.title}: examples`}>{c.examples.map((e) => <li key={e}>{e}</li>)}</ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

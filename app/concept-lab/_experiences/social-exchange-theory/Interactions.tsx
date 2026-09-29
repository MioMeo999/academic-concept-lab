"use client";

import { useState, type CSSProperties } from "react";
import type { SETConstraintExample, SETHedonicCell, SETReciprocityMode, SETRuleCase } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import * as hand from "../../_folio/hand";
import { Anchor, Head, Rail, Strand, Tag } from "./Marks";
import s from "./set.module.css";

/* Every diagram here is drawn on the same two lines — actor A's above, actor
   B's below — at proportions that survive a phone. The words that give a mark
   its meaning are live HTML beside the figure, never text inside it. */

/* ------------------------------------------------------------------------
   01 · When is it actually an exchange?
   Two lines and nothing between them. Each requirement the reader specifies
   firms up one part of the drawing: a favour is not automatically an
   exchange until actors, resource, rule and interdependence are named.
   --------------------------------------------------------------------- */

type Req = "relation" | "resource" | "rule" | "interdependence";

const REQS: { id: Req; title: string; says: string }[] = [
  { id: "relation", title: "A relation between actors", says: "Actor A acts — offers, withholds, or changes access. Actor B receives — interprets, accepts, returns, or refuses." },
  { id: "resource", title: "A resource or outcome", says: "A resource / signal passes between them." },
  { id: "rule", title: "A rule of response", says: "The exchange rule makes it legible — direct, generalised, negotiated, or norm-led." },
  { id: "interdependence", title: "Interdependence across the episode", says: "History + alternatives shape what each can receive next, and the relation changes — dependence, trust, obligation, solidarity." },
];

export function ExchangeSpec({ caption }: { caption: string }) {
  const [on, setOn] = useState<Record<Req, boolean>>({ relation: false, resource: false, rule: false, interdependence: false });
  const count = REQS.filter((r) => on[r.id]).length;
  const flip = (id: Req) => setOn((v) => ({ ...v, [id]: !v[id] }));
  const R1 = hand.curve([[150, 76], [192, 128], [244, 196], [286, 250]], { seed: 11, wander: 1 });
  const R2 = hand.curve([[368, 254], [412, 204], [466, 142], [510, 82]], { seed: 12, wander: 1 });

  return (
    <div className={s.spec}>
      <figure className={s.specFigure}>
        <svg className={s.specSvg} viewBox="0 0 640 330" role="img" aria-label={`Two lines, actor A above and actor B below. ${count} of four requirements for an exchange are specified.`}>
          <Rail y={70} seed={1} x0={24} x1={616} />
          <Rail y={260} seed={2} x0={24} x1={616} />
          <Anchor x={50} y={70} letter="A" on={on.relation} seed={3} />
          <Anchor x={50} y={260} letter="B" on={on.relation} seed={4} />
          {/* a resource passes */}
          <Strand d={R1} tone="give" dash={on.resource ? undefined : "3 10"} opacity={on.resource ? 1 : 0.32} />
          <Head x={288} y={252} angle={0.93} tone="give" seed={5} opacity={on.resource ? 1 : 0.32} />
          <Tag x={216} y={160} rot={53} on={on.resource} tone="ochre" />
          {/* a rule makes the answer legible */}
          <Strand d={R2} tone="answer" dash={on.rule ? undefined : "3 10"} opacity={on.rule ? 1 : 0.32} />
          <Head x={512} y={80} angle={-0.93} tone="answer" seed={6} opacity={on.rule ? 1 : 0.32} />
          <Tag x={440} y={172} rot={-53} w={44} text="rule" on={on.rule} />
          {!on.rule && <text className={s.svgNote} x="530" y="58" aria-hidden="true">?</text>}
          {/* interdependence stitches the two lines together */}
          {[556, 580, 604].map((x, i) => (
            <path key={x} className={s.stitch} data-on={on.interdependence || undefined} d={hand.curve([[x, 78], [x + 8, 118], [x - 8, 160], [x + 8, 202], [x, 252]], { seed: 20 + i, wander: 0.8 })} filter="url(#folio-graphite)" />
          ))}
        </svg>
      </figure>

      <fieldset className={s.specTicks}>
        <legend>Specify the exchange</legend>
        {REQS.map((r) => (
          <label key={r.id} className={s.tick} data-on={on[r.id] || undefined}>
            <input type="checkbox" checked={on[r.id]} onChange={() => flip(r.id)} />
            <span className={s.tickBox} aria-hidden="true" />
            <span className={s.tickText}>
              <strong>{r.title}</strong>
              <span>{r.says}</span>
            </span>
          </label>
        ))}
        <p className={s.specReading} aria-live="polite">
          {count === 4
            ? "All four are specified: the favour can now be read as an exchange — a theoretical reading, not evidence by itself."
            : count === 0
              ? "As it stands this is a helpful act between two people. Nothing yet says what moved, under which rule, or what depends on what."
              : `${count} of four specified. The parts still dashed have not yet been named.`}
        </p>
      </fieldset>
      <p className={s.specCaption}><Glyph g="▲" /> {caption}</p>
    </div>
  );
}

/* ------------------------------------------------------------------------
   02 · Which reciprocity?
   One pair of lines, three readings of the same word. Interdependence bends
   the lines toward each other; a folk belief lives in a thought, not in the
   lines; a moral norm presses down on them. The two not chosen stay drawn,
   fainter.
   --------------------------------------------------------------------- */

type Lens = 0 | 1 | 2;

export function ReciprocityLenses({ items, note }: { items: SETReciprocityMode[]; note: string }) {
  const [i, setI] = useState<Lens>(0);
  const m = items[i];
  const act = hand.curve([[150, 62], [184, 112], [222, 176], [250, 226]], { seed: 31, wander: 0.9 });
  const ret = hand.curve([[380, 230], [412, 180], [452, 120], [486, 66]], { seed: 32, wander: 0.9 });
  const railA = hand.line(24, 56, 616, 56, { seed: 33, wander: 1.4, segments: 14 });
  const railB = hand.line(24, 234, 616, 234, { seed: 34, wander: 1.4, segments: 14 });
  // contingent interdependence: each line bends where the other's act reaches it
  const railAbent = "M24 56 C 150 56 320 57 410 56 C 448 56 470 76 508 76 C 552 76 588 70 616 70";
  const railBbent = "M24 234 C 120 234 190 233 218 232 C 246 230 262 212 300 212 C 380 212 520 220 616 220";

  return (
    <div className={s.recip} data-lens={i}>
      <figure className={s.recipFigure}>
        <svg className={s.recipSvg} viewBox="0 0 640 300" aria-hidden="true">
          <g className={s.lensStraight}><Rail y={56} seed={33} d={railA} /><Rail y={234} seed={34} d={railB} /></g>
          <g className={s.lensBent}><Rail y={56} seed={35} d={railAbent} /><Rail y={234} seed={36} d={railBbent} /></g>
          <Strand d={act} tone="give" />
          <Head x={252} y={228} angle={1.02} tone="give" seed={37} />
          <g className={s.lensReturn}>
            <Strand d={ret} tone="answer" />
            <Head x={488} y={64} angle={-1.0} tone="answer" seed={38} />
          </g>
          {/* folk belief: a return that lives in a thought */}
          <g className={s.lensFolk}>
            <path d={hand.ring(512, 150, 92, 46, { seed: 41, wobble: 0.1 })} filter="url(#folio-pencil)" />
            <path d={hand.ring(408, 214, 8, 7, { seed: 42, wobble: 0.1 })} filter="url(#folio-pencil)" />
            <path d={hand.ring(390, 226, 5, 4.5, { seed: 43, wobble: 0.1 })} filter="url(#folio-pencil)" />
          </g>
          {/* moral norm: a weight pressing down */}
          <g className={s.lensMoral}>
            {[296, 320, 344].map((x, k) => <path key={x} d={hand.line(x, 140, x + (k - 1) * 5, 196, { seed: 50 + k, wander: 0.9 })} filter="url(#folio-pencil)" />)}
            <path d={hand.arrowHead(320, 214, Math.PI / 2, { size: 13, seed: 55 })} filter="url(#folio-pencil)" />
          </g>
          <text className={s.svgLetter} x="14" y="44" aria-hidden="true">A</text>
          <text className={s.svgLetter} x="14" y="222" aria-hidden="true">B</text>
        </svg>
      </figure>
      <div className={s.recipPanel}>
        <Choices<string> label="Which meaning of reciprocity?" value={String(i)} onChange={(v) => setI(Number(v) as Lens)} options={items.map((x, k) => ({ value: String(k), label: x.short, hint: x.label }))} />
        <div className={s.recipAnswer} aria-live="polite">
          <h3>{m.label}</h3>
          <p>{m.body}</p>
        </div>
        <ul className={s.recipAll} aria-label="All three meanings">
          {items.map((x, k) => <li key={x.label} data-on={k === i || undefined}><b>{x.label}:</b> {x.body}</li>)}
        </ul>
        <p className={s.teachingNote}>{note}</p>
      </div>
      <p className={s.recipCaption}><Glyph g="▲" /> Same two lines, three readings of one word. The lines bend (interdependence), hold a thought (folk belief) or bear a weight (moral norm) to show where the meaning lives — not how strong it is.</p>
    </div>
  );
}

/* ------------------------------------------------------------------------
   04 · Same action, different rule?
   The same helping act stays fixed. The rule decides what a return would
   look like, so the return is the part that is drawn differently.
   --------------------------------------------------------------------- */

export function RuleRoutes({ items }: { items: SETRuleCase[] }) {
  const [i, setI] = useState(0);
  const m = items[i];
  const key = ["direct", "generalised", "negotiated", "none"][i] ?? "direct";
  const act = hand.curve([[130, 66], [164, 112], [204, 154], [236, 194]], { seed: 61, wander: 1 });
  const direct = hand.curve([[330, 200], [382, 154], [432, 108], [476, 68]], { seed: 62, wander: 1 });
  const pass = hand.curve([[256, 206], [282, 248], [318, 294], [352, 332]], { seed: 63, wander: 1 });
  const system = hand.curve([[430, 336], [466, 272], [496, 182], [524, 72]], { seed: 64, wander: 1 });
  const delay = hand.curve([[336, 196], [372, 170], [406, 148], [436, 126]], { seed: 65, wander: 0.8 });
  const elsewhere = hand.curve([[344, 206], [370, 250], [392, 298], [404, 334]], { seed: 66, wander: 0.8 });

  return (
    <div className={s.rules} data-rule={key}>
      <figure className={s.rulesFigure}>
        <svg className={s.rulesSvg} viewBox="0 0 640 400" aria-hidden="true">
          <Rail y={60} seed={71} x0={24} x1={616} />
          <Rail y={200} seed={72} x0={24} x1={616} />
          <Rail y={340} seed={73} x0={24} x1={616} className={s.railGroup} />
          {[200, 330, 460].map((x, k) => <path key={x} className={s.groupNode} d={hand.ring(x, 340, 12, 11, { seed: 74 + k, wobble: 0.1 })} filter="url(#folio-pencil)" />)}
          <text className={s.svgLetter} x="14" y="48" aria-hidden="true">A</text>
          <text className={s.svgLetter} x="14" y="188" aria-hidden="true">B</text>
          <text className={s.svgLetterSmall} x="14" y="368" aria-hidden="true">the group</text>
          {/* the act: identical under every rule */}
          <Strand d={act} tone="give" />
          <Head x={238} y={196} angle={0.92} tone="give" seed={78} />
          <Tag x={186} y={132} rot={50} w={40} h={22} tone="ochre" />
          {/* direct */}
          <g className={s.ruleDirect}><Strand d={direct} tone="answer" /><Head x={478} y={66} angle={-0.95} tone="answer" seed={79} /></g>
          {/* generalised */}
          <g className={s.ruleGeneral}>
            <Strand d={pass} tone="give" dash="3 9" opacity={0.7} />
            <Strand d={system} tone="group" />
            <Head x={526} y={70} angle={-1.3} tone="group" seed={80} />
            <text className={s.svgNote} x="520" y="260" aria-hidden="true">later</text>
          </g>
          {/* negotiated */}
          <g className={s.ruleNegotiated}>
            <Strand d={direct} tone="answer" />
            <Head x={478} y={66} angle={-0.95} tone="answer" seed={81} />
            <path className={s.term} d={hand.line(190, 126, 432, 126, { seed: 82, wander: 1 })} filter="url(#folio-graphite)" />
            <Tag x={312} y={126} w={62} h={24} text="terms" />
          </g>
          {/* no automatic return */}
          <g className={s.ruleNone}>
            <Strand d={hand.curve([[256, 200], [286, 200], [312, 199]], { seed: 83, wander: 0.4 })} tone="answer" />
            <circle className={s.stubEnd} cx="316" cy="199" r="4" />
            <Strand d={delay} tone="answer" dash="3 9" opacity={0.75} />
            <text className={s.svgNote} x="446" y="122" aria-hidden="true">…</text>
            <Strand d={elsewhere} tone="answer" dash="3 9" opacity={0.6} />
            <path className={s.ghostRing} d={hand.ring(478, 60, 20, 18, { seed: 84, wobble: 0.1 })} filter="url(#folio-pencil)" />
            <text className={s.svgNote} x="478" y="67" textAnchor="middle" aria-hidden="true">?</text>
          </g>
        </svg>
      </figure>
      <div className={s.rulesPanel}>
        <Choices<string> label="Which exchange rule?" value={String(i)} onChange={(v) => setI(Number(v))} options={items.map((x, k) => ({ value: String(k), label: x.label }))} />
        <div className={s.rulesAnswer} aria-live="polite">
          <p className={s.rulesRule}>{m.rule}</p>
          <p>{m.body}</p>
        </div>
        <ol className={s.rulesAll} aria-label="Every rule">
          {items.map((x, k) => <li key={x.label} data-on={k === i || undefined}><b>{x.label}.</b> {x.rule}. {x.body}</li>)}
        </ol>
      </div>
      <p className={s.rulesCaption}><Glyph g="▲" /> The same helping act — A covers B&rsquo;s shift. Only the return is drawn differently, because the rule is what makes a return intelligible. The lowest line is the wider group.</p>
    </div>
  );
}

/* ------------------------------------------------------------------------
   07 · Positive / negative is not enough
   Two things vary separately in the same drawing. Colour is the sign the
   actor gives the exchange; the strand's path and weight are what they do.
   A constraint bends or thins the path without changing its colour.
   --------------------------------------------------------------------- */

type Value = "benefit" | "cost";
type Activity = "engaged" | "holding";

export function ResponseStrand({ cells, constraints }: { cells: SETHedonicCell[]; constraints: SETConstraintExample[] }) {
  const [value, setValue] = useState<Value>("benefit");
  const [activity, setActivity] = useState<Activity>("engaged");
  const [constrained, setConstrained] = useState(false);
  const idx = (value === "benefit" ? 0 : 2) + (activity === "engaged" ? 0 : 1);
  const cell = cells[idx];
  const cons = constrained ? constraints[value === "benefit" ? 1 : 2] : null;
  const tone = value === "benefit" ? "pos" : "neg";
  const direct = hand.curve([[210, 256], [286, 212], [380, 142], [470, 72]], { seed: 91, wander: 1 });
  const around = hand.curve([[210, 256], [270, 256], [336, 256], [392, 238], [432, 172], [470, 74]], { seed: 92, wander: 1 });
  const stub = hand.curve([[210, 256], [236, 254], [262, 251]], { seed: 93, wander: 0.5 });
  const main = activity === "holding" ? stub : constrained ? around : direct;
  const weight = activity === "holding" ? 0.8 : constrained ? 0.85 : 1.25;

  return (
    <div className={s.resp} data-value={value} data-activity={activity} data-constrained={constrained || undefined}>
      <figure className={s.respFigure}>
        <svg className={s.respSvg} viewBox="0 0 640 320" aria-hidden="true">
          <Rail y={60} seed={95} x0={24} x1={616} />
          <Rail y={260} seed={96} x0={24} x1={616} />
          <text className={s.svgLetter} x="14" y="48" aria-hidden="true">A</text>
          <text className={s.svgLetter} x="14" y="248" aria-hidden="true">B</text>
          {/* what the actor would do, if nothing stood in the way */}
          {(constrained || activity === "holding") && <Strand d={direct} tone="ghost" dash="3 10" opacity={0.6} />}
          {constrained && (
            <g className={s.barrier}>
              {[0, 1, 2, 3, 4].map((k) => <path key={k} d={hand.line(322 + k * 9, 128 + (k % 2) * 4, 322 + k * 9 + (k - 2) * 2, 214 - (k % 2) * 3, { seed: 100 + k, wander: 0.8 })} filter="url(#folio-pencil)" />)}
            </g>
          )}
          <Strand d={main} tone={tone} weight={weight} className={s.respMain} />
          {activity === "engaged" && <Head x={472} y={72} angle={-0.95} tone={tone} seed={97} opacity={constrained ? 0.8 : 1} />}
          {activity === "holding" && (
            <g className={s.hold}>
              <path d={hand.line(290, 240, 290, 262, { seed: 98, wander: 0.4 })} filter="url(#folio-pencil)" />
              <path d={hand.line(302, 240, 302, 262, { seed: 99, wander: 0.4 })} filter="url(#folio-pencil)" />
            </g>
          )}
          {value === "cost" && activity === "engaged" && !constrained && (
            <g className={s.fork}>
              <Strand d={hand.curve([[422, 110], [452, 84], [490, 66]], { seed: 110, wander: 0.5 })} tone="neg" weight={0.8} />
              <Strand d={hand.curve([[422, 110], [468, 122], [520, 116]], { seed: 111, wander: 0.5 })} tone="neg" weight={0.8} />
              <Strand d={hand.curve([[422, 110], [456, 154], [490, 200]], { seed: 112, wander: 0.5 })} tone="neg" weight={0.8} />
            </g>
          )}
        </svg>
      </figure>
      <div className={s.respPanel}>
        <Choices<Value> label="How is the exchange experienced?" value={value} onChange={setValue} options={[{ value: "benefit", label: "As a benefit", hint: "positive direction" }, { value: "cost", label: "As a cost", hint: "negative direction" }]} />
        <Choices<Activity> label="What does the actor do?" value={activity} onChange={setActivity} options={[{ value: "engaged", label: "Responds actively" }, { value: "holding", label: "Holds back" }]} />
        <Choices<string> label="Can they respond as they would like?" value={constrained ? "no" : "yes"} onChange={(v) => setConstrained(v === "no")} options={[{ value: "yes", label: "Yes, freely" }, { value: "no", label: "No — something constrains it" }]} />
        <div className={s.respAnswer} aria-live="polite">
          <p className={s.respKick}>{cell.label}</p>
          <p>{cell.body}</p>
          {cons && <p className={s.respCons}><b>{cons.desired} → {cons.constrained}.</b> {cons.body}</p>}
        </div>
      </div>
      <p className={s.respCaption}><Glyph g="▲" /> One drawing, two separate things: colour is whether the exchange is a benefit or a cost; the strand&rsquo;s path and weight are what the actor does about it. A hatched wall is a constraint; a forked end is several possible responses.</p>
      <div className={s.respLedger}>
        <ul aria-label="The four combinations">
          {cells.map((c, k) => (
            <li key={c.label} data-on={k === idx || undefined} style={{ "--cell": c.colour } as CSSProperties}>
              <span className={s.respLedgerKick}>{c.label}</span>
              <span>{c.body}</span>
            </li>
          ))}
        </ul>
        <ol aria-label="Three constrained responses">
          {constraints.map((c) => (
            <li key={c.desired}>
              <span className={s.respLedgerKick}>{c.desired}</span>
              <b>{c.constrained}</b> <span>{c.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

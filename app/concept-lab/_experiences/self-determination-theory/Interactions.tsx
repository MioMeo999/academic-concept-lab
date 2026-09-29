"use client";

import { useState, type CSSProperties } from "react";
import type { SDTContextModel, SDTMatrixCase, SDTMiniTheory, SDTMotive, SDTRegulation, SDTRewardComparison, SDTWorkModel } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import * as hand from "../../_folio/hand";
import s from "./sdt.module.css";

const ART = "/visual-language/theories/sdt";

function Layer({ src, className, size = 800 }: { src: string; className: string; size?: number }) {
  // Decorative pigment layer: the words that name it live in HTML beside the figure.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} alt="" aria-hidden="true" width={size} height={size} loading="lazy" decoding="async" />;
}

/* ------------------------------------------------------------------------
   01 · Whose reason is it?
   The same action line crosses the same loop in every state. What changes is
   where the reason sits relative to the loop and what kind of pressure it
   carries. The reason moves and changes character — it is not swapped out.
   --------------------------------------------------------------------- */

type Place = "external" | "introjected" | "identified" | "integrated" | "intrinsic" | "amotivation";

const PLACE_OF: Record<string, Place> = {
  "External regulation": "external",
  "Introjected regulation": "introjected",
  "Identified regulation": "identified",
  "Integrated regulation": "integrated",
  "Intrinsic motivation": "intrinsic",
  "Amotivation": "amotivation",
};

/** The researcher's short reading beside the drawing — marginalia, not canonical copy. */
const MARGIN: Record<Place, string> = {
  external: "the reason stays outside the loop",
  introjected: "taken in — and still pressing",
  identified: "accepted as mine",
  integrated: "one stroke with the rest of me",
  intrinsic: "the doing is the reason",
  amotivation: "no clear reason to act",
};

export function ReasonLens({ motives, note }: { motives: SDTMotive[]; note: string }) {
  const [i, setI] = useState(0);
  const m = motives[i];
  const place = PLACE_OF[m.regulation] ?? "external";
  const meta = [m.motivationKind, m.relativeAutonomy, m.family === "amotivation" ? null : `${m.family} motivation`].filter(Boolean).join(" · ");

  return (
    <>
      <div className={s.lens}>
        <figure className={s.lensFigureWrap}>
          <div
            className={s.lensFigure}
            data-place={place}
            role="group"
            aria-label="A loop standing for the person's sense of self, crossed by the same line of action in every reading. The chosen reason is drawn outside the loop, at its wall, inside it, sharing its stroke, or arising from the activity itself."
          >
            <Layer src={`${ART}/sdt-lens-wall.webp`} className={`${s.layer} ${s.layerWall}`} />
            <Layer src={`${ART}/sdt-lens-push.webp`} className={`${s.layer} ${s.layerPush}`} />
            <Layer src={`${ART}/sdt-lens-collar.webp`} className={`${s.layer} ${s.layerCollar}`} />
            <Layer src={`${ART}/sdt-lens-through.webp`} className={`${s.layer} ${s.layerThrough}`} />
            <Layer src={`${ART}/sdt-lens-glow.webp`} className={`${s.layer} ${s.layerGlow}`} />
            <Layer src={`${ART}/sdt-lens-stone-red.webp`} className={`${s.stone} ${s.stoneRed}`} size={400} />
            <Layer src={`${ART}/sdt-lens-stone-teal.webp`} className={`${s.stone} ${s.stoneTeal}`} size={400} />
            <span className={s.lensSame} aria-hidden="true">the same action</span>
            <span className={s.lensNote} aria-hidden="true" data-family={m.family}>{MARGIN[place]}</span>
          </div>
        </figure>

        <div className={s.lensPanel}>
          <p className={s.lensPrompt} id="sdt-lens-prompt">Hear a reason. Where does it sit?</p>
          <div className={s.statements} role="group" aria-labelledby="sdt-lens-prompt">
            {motives.map((x, k) => (
              <button key={x.statement} type="button" aria-pressed={k === i} data-family={x.family} onClick={() => setI(k)}>
                <span className={s.statementDot} aria-hidden="true" />
                <span>&ldquo;{x.statement}&rdquo;</span>
              </button>
            ))}
          </div>
          <div className={s.reading} aria-live="polite" data-family={m.family}>
            <p className={s.readingKick}>Likely reading</p>
            <h3 className={s.readingName}>{m.regulation}</h3>
            <p className={s.readingMeta}>{meta}</p>
            <p className={s.readingBody}>{m.explanation}</p>
          </div>
          <p className={s.teachingNote}><Glyph g="?" /> {note}</p>
        </div>

        <p className={s.lensCaption}>
          <Glyph g="▲" /> Teaching drawing. The loop is one person&rsquo;s sense of self; position and pigment show the <em>kind</em> of reason, not an amount of motivation or effort. Places, not steps.
        </p>
      </div>

      <ol className={s.ledger} aria-label="All six readings, together">
        {motives.map((x) => (
          <li key={x.statement}>
            <span className={s.ledgerSaid}>&ldquo;{x.statement}&rdquo;</span>
            <span className={s.ledgerName}>{x.regulation}</span>
            <span className={s.ledgerBody}>{x.explanation}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

/* ------------------------------------------------------------------------
   02 · Two cuts through one row
   The six forms sit in order of relative autonomy. Two different cuts run
   across the same row — kind of motivation, and how autonomous — and they
   do not agree. Choose a form to see both braces that hold it.
   --------------------------------------------------------------------- */

const kindOf = (r: SDTRegulation) => (r.kind === "amotivation" ? "amotivation" : r.kind === "intrinsic" ? "intrinsic" : "extrinsic");
const familyOf = (r: SDTRegulation) => (r.kind === "amotivation" ? "amotivation" : r.kind === "controlled" ? "controlled" : "autonomous");

function runs(items: SDTRegulation[], key: (r: SDTRegulation) => string) {
  const out: { key: string; from: number; span: number }[] = [];
  items.forEach((r, i) => {
    const k = key(r);
    const last = out[out.length - 1];
    if (last && last.key === k) last.span += 1;
    else out.push({ key: k, from: i + 1, span: 1 });
  });
  return out;
}

const CUT_REMARK: Record<string, string> = {
  "External regulation": "extrinsic and controlled",
  "Introjected regulation": "extrinsic and still controlled",
  "Identified regulation": "extrinsic — and autonomous",
  "Integrated regulation": "extrinsic — still",
  "Intrinsic motivation": "not the last step of a demand",
  "Amotivation": "off both lines",
};

export function CutRow({ items }: { items: SDTRegulation[] }) {
  const [sel, setSel] = useState(Math.max(0, items.findIndex((r) => r.label === "Identified regulation")));
  const r = items[sel];
  const kindRuns = runs(items, kindOf);
  const famRuns = runs(items, familyOf);
  const kindLabel = (k: string) => (k === "amotivation" ? "no intention" : k);
  const both = kindOf(r) === "amotivation" ? null : `${kindOf(r)} and ${familyOf(r)}`;

  return (
    <div className={s.cut}>
      <p className={s.cutSaid} aria-live="polite" data-family={familyOf(r)}>
        {both ? <><b>{r.label}</b> is {both}.</> : <><b>{r.label}</b> sits outside both cuts.</>} <span>{r.body}</span>
      </p>
      <ol className={s.cutRow} data-sel={sel + 1}>
        {kindRuns.map((g) => (
          <li key={`k-${g.key}-${g.from}`} className={s.cutBrace} data-cut="kind" data-on={sel + 1 >= g.from && sel + 1 < g.from + g.span || undefined} style={{ "--from": g.from, "--span": g.span } as CSSProperties} aria-hidden="true">
            <span className={s.cutBraceLabel}>{kindLabel(g.key)}</span>
            <svg className={s.braceH} viewBox={`0 0 ${g.span * 100} 30`} preserveAspectRatio="none"><path d={hand.brace(4, g.span * 100 - 4, 6, { depth: 9, up: false, seed: g.from * 7 + 1 })} filter="url(#folio-pencil)" /></svg>
            <svg className={s.braceV} viewBox={`0 0 30 ${g.span * 100}`} preserveAspectRatio="none"><path d={hand.braceV(4, g.span * 100 - 4, 24, { depth: 9, left: true, seed: g.from * 7 + 2 })} filter="url(#folio-pencil)" /></svg>
          </li>
        ))}
        {items.map((x, k) => (
          <li key={x.label} className={s.cutCol} data-family={familyOf(x)} data-kind={kindOf(x)} data-on={k === sel || undefined} style={{ "--col": k + 1 } as CSSProperties}>
            <button type="button" aria-pressed={k === sel} onClick={() => setSel(k)}>
              <span className={s.cutColNum} aria-hidden="true">{String(k + 1).padStart(2, "0")}</span>
              <span className={s.cutColName}>{x.label}</span>
            </button>
            <p className={s.cutColDesc}>{x.descriptor}</p>
            <p className={s.cutColBody}>{x.body}</p>
            <p className={s.cutColMeta}>{kindOf(x) === "amotivation" ? "amotivation" : `${kindOf(x)} · ${familyOf(x)}`}</p>
            {k === sel && <p className={s.cutColMargin} aria-hidden="true">{CUT_REMARK[x.label]}</p>}
          </li>
        ))}
        {famRuns.map((g) => (
          <li key={`f-${g.key}-${g.from}`} className={s.cutBrace} data-cut="family" data-family={g.key} data-on={sel + 1 >= g.from && sel + 1 < g.from + g.span || undefined} style={{ "--from": g.from, "--span": g.span } as CSSProperties} aria-hidden="true">
            <svg className={s.braceH} viewBox={`0 0 ${g.span * 100} 30`} preserveAspectRatio="none"><path d={hand.brace(4, g.span * 100 - 4, 24, { depth: 9, up: true, seed: g.from * 11 + 3 })} filter="url(#folio-pencil)" /></svg>
            <svg className={s.braceV} viewBox={`0 0 30 ${g.span * 100}`} preserveAspectRatio="none"><path d={hand.braceV(4, g.span * 100 - 4, 6, { depth: 9, left: false, seed: g.from * 11 + 4 })} filter="url(#folio-pencil)" /></svg>
            <span className={s.cutBraceLabel}>{g.key === "amotivation" ? "no intention" : g.key}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------------
   04b · Autonomy is not independence
   Two questions, asked separately about the same person and the same work.
   The person moves between the four readings; the four readings stay on the
   page.
   --------------------------------------------------------------------- */

export function AutonomyMap({ cases, note }: { cases: SDTMatrixCase[]; note: string }) {
  const [reason, setReason] = useState<"autonomous" | "controlled">("autonomous");
  const [work, setWork] = useState<"together" | "alone">("together");
  const pick = cases.find((c) => c.label.startsWith(reason) && (work === "together" ? c.label.includes("interdependent") : !c.label.includes("interdependent"))) ?? cases[0];
  const at = (c: SDTMatrixCase) => ({ x: c.label.startsWith("autonomous") ? "r" : "l", y: c.label.includes("interdependent") ? "b" : "t" });

  return (
    <div className={s.auto}>
      <div className={s.autoMap} data-reason={reason} data-work={work}>
        <div className={s.autoAxisTop} aria-hidden="true">more independent</div>
        <div className={s.autoAxisBottom} aria-hidden="true">more interdependent</div>
        <div className={s.autoAxisLeft} aria-hidden="true">controlled</div>
        <div className={s.autoAxisRight} aria-hidden="true">autonomous</div>
        <svg className={s.autoCross} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={hand.line(3, 50, 97, 50, { seed: 5, wander: 0.5, segments: 9 })} filter="url(#folio-graphite)" />
          <path d={hand.line(50, 3, 50, 97, { seed: 8, wander: 0.5, segments: 9 })} filter="url(#folio-graphite)" />
        </svg>
        {cases.map((c) => {
          const p = at(c);
          return (
            <article key={c.label} className={s.autoQuad} data-x={p.x} data-y={p.y} data-on={c === pick || undefined} style={{ "--case": c.colour } as CSSProperties}>
              <p className={s.autoQuadKick}>{c.label}</p>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          );
        })}
        <span className={s.autoPerson} data-x={at(pick).x} data-y={at(pick).y} aria-hidden="true">
          <svg viewBox="0 0 60 60"><path d={hand.ring(30, 30, 20, 18, { seed: 4, wobble: 0.08 })} filter="url(#folio-pencil)" /><circle cx="30" cy="30" r="3.4" /></svg>
        </span>
      </div>
      <div className={s.autoControls}>
        <p className={s.autoHeld}>Same person. Same work.</p>
        <Choices<"autonomous" | "controlled"> label="Where does the reason come from?" value={reason} onChange={setReason} options={[{ value: "autonomous", label: "Willingly chosen", hint: "autonomous" }, { value: "controlled", label: "Under pressure", hint: "controlled" }]} />
        <Choices<"together" | "alone"> label="How is the work arranged?" value={work} onChange={setWork} options={[{ value: "together", label: "Closely with others", hint: "interdependent" }, { value: "alone", label: "Mostly alone", hint: "relatively independent" }]} />
        <p className={s.autoReading} aria-live="polite">Read as <strong>{pick.label}</strong> — &ldquo;{pick.title}.&rdquo; Changing one question does not move the person on the other.</p>
        <p className={s.teachingNote}><Glyph g="▲" /> {note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   05 · Context gets inside motivation
   A branched map. The same conditions may support or thwart; choose which
   reading to follow — the other stays drawn, fainter. Everything after the
   first hop is drawn softly and equally: the record does not make those
   relations equally causal or equally established.
   --------------------------------------------------------------------- */

type Focus = "supportive" | "thwarting";

const box = (x: number, y: number, w: number, h: number): CSSProperties => ({ "--x": `${(x / 1200) * 100}%`, "--y": `${(y / 560) * 100}%`, "--w": `${(w / 1200) * 100}%`, "--h": `${(h / 560) * 100}%` }) as CSSProperties;

export function ContextMap({ context, model }: { context: SDTContextModel; model: SDTWorkModel }) {
  const [focus, setFocus] = useState<Focus>("supportive");
  const [supportive, thwarting] = context.experiences;
  const [needSat, needFrus] = model.needs;
  const [outNeeds, outMotiv, outWork] = context.outcomes;
  const motivY = [40, 210, 380];
  const outsY = [20, 150, 280, 410];
  const P = (x0: number, y0: number, x1: number, y1: number, seed: number, wander = 0.5) => hand.curve([[x0, y0], [(x0 + x1) / 2, (y0 + y1) / 2 + (y1 - y0) * 0.04], [x1, y1]], { seed, wander });

  return (
    <div className={s.ctx} data-focus={focus}>
      <div className={s.ctxControls}>
        <Choices<Focus> label="Read the same conditions as" value={focus} onChange={setFocus} options={[{ value: "supportive", label: "Need-supportive", hint: "may help choice, effectiveness, connection" }, { value: "thwarting", label: "Need-thwarting", hint: "may pressure, undermine, exclude" }]} />
      </div>
      <div className={s.ctxStage} role="group" aria-label="A branched map: context and person-level influences, the conditions they may create, need experience, motivation quality and selected outcomes">
        <svg className={s.ctxLinks} viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true">
          <path className={s.lkSupp} d={P(180, 140, 265, 120, 1)} filter="url(#folio-pencil)" />
          <path className={s.lkThwart} d={P(180, 172, 265, 382, 2)} filter="url(#folio-pencil)" />
          <path className={s.lkPerson} d={P(180, 398, 265, 152, 3)} filter="url(#folio-graphite)" />
          <path className={s.lkPerson} d={P(180, 412, 265, 412, 4)} filter="url(#folio-graphite)" />
          <path className={s.lkSupp} d={P(435, 135, 515, 125, 5)} filter="url(#folio-pencil)" />
          <path className={s.lkThwart} d={P(435, 385, 515, 375, 6)} filter="url(#folio-pencil)" />
          <path className={s.lkSoft} d={P(680, 125, 748, 250, 7)} filter="url(#folio-graphite)" />
          <path className={s.lkSoft} d={P(680, 375, 748, 250, 8)} filter="url(#folio-graphite)" />
          <path className={s.lkBrace} d={hand.braceV(30, 470, 772, { depth: 11, left: true, seed: 9 })} filter="url(#folio-pencil)" />
          <path className={s.lkBrace} d={hand.braceV(30, 470, 952, { depth: 11, left: false, seed: 10 })} filter="url(#folio-pencil)" />
          <path className={s.lkSoft} d={hand.curve([[982, 250], [1010, 249], [1036, 250]], { seed: 11, wander: 0.5 })} filter="url(#folio-graphite)" />
          <path className={s.lkSoft} d={hand.arrowHead(1040, 250, 0, { size: 10, seed: 12 })} filter="url(#folio-graphite)" />
        </svg>

        <div className={s.ctxBox} data-stage="1" data-stagelabel="context" style={box(0, 20, 180, 250)}>
          <h3>Work and social context</h3>
          <ul>{context.contextItems.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className={s.ctxBox} data-stage="1" data-stagelabel="person" data-tone="person" style={box(0, 330, 180, 190)}>
          <h3>Person-level influences</h3>
          <ul>{context.personItems.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>

        <div className={s.ctxBox} data-stage="2" data-stagelabel="conditions" data-tone="supportive" style={box(265, 40, 170, 190)}>
          <h3>{supportive.label}</h3>
          <p>{supportive.body}</p>
        </div>
        <div className={s.ctxBox} data-stage="2" data-stagelabel="conditions" data-tone="thwarting" style={box(265, 290, 170, 190)}>
          <h3>{thwarting.label}</h3>
          <p>{thwarting.body}</p>
        </div>

        <div className={s.ctxBox} data-stage="3" data-stagelabel="need experience" data-tone="supportive" style={box(515, 70, 165, 110)}>
          <p className={s.ctxKick}>{outNeeds}</p>
          <h3>{needSat}</h3>
          <p>one possible experience</p>
        </div>
        <div className={s.ctxBox} data-stage="3" data-stagelabel="need experience" data-tone="thwarting" style={box(515, 320, 165, 110)}>
          <p className={s.ctxKick}>{outNeeds}</p>
          <h3>{needFrus}</h3>
          <p>a distinct possible experience</p>
        </div>

        {model.motivations.map((x, k) => (
          <div className={s.ctxBox} key={x} data-stage="4" data-stagelabel="motivation" style={box(790, motivY[k], 150, 90)}>
            {k === 0 && <p className={s.ctxKick}>{outMotiv}</p>}
            <h3>{x}</h3>
          </div>
        ))}
        {model.outcomes.map((x, k) => (
          <div className={s.ctxBox} key={x} data-stage="5" data-stagelabel="outcomes" style={box(1050, outsY[k], 150, 90)}>
            {k === 0 && <p className={s.ctxKick}>{outWork}</p>}
            <h3>{x}</h3>
          </div>
        ))}

        <span className={s.ctxSays} style={box(182, 226, 84, 60)} aria-hidden="true">may support, neglect, or thwart</span>
        <span className={s.ctxSays} style={box(684, 196, 78, 40)} aria-hidden="true">may relate to</span>
        <span className={s.ctxSays} style={box(976, 176, 72, 60)} aria-hidden="true">may relate to selected outcomes</span>
      </div>

      <div className={s.ctxRead}>
        <p className={s.smallHead}>How to read the map</p>
        <p>Work and person-level variables are inputs or influences; satisfaction and frustration are related but distinct experiences; motivation quality is not the same thing as effort; outcomes are selected rather than guaranteed.</p>
        <p className={s.ctxWords}><Glyph g="●" /> In words: {model.context.join("; ")} — and {model.person.join("; ")} — may shape the conditions and meaning of action, and so {model.needs.join(" and ")}; these may relate to {model.motivations.join(", ")} motivation, and to {model.outcomes.join(", ")}.</p>
        <p className={s.teachingNote}><Glyph g="●" /> {context.note} {model.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   06a · The same reward, two meanings
   The reward and the work stay put. What changes is what the reward is
   doing: pushing the behaviour, or telling the person how they did. Both
   readings stay drawn; the one not chosen is graphite.
   --------------------------------------------------------------------- */

export function RewardFrame({ data }: { data: SDTRewardComparison }) {
  const [i, setI] = useState(0);
  const c = data.cases[i];
  const controlling = i === 0;

  return (
    <div className={s.reward} data-mode={controlling ? "controlling" : "informational"}>
      <figure className={s.rewardFig}>
        <svg viewBox="0 0 700 380" className={s.rewardSvg} aria-hidden="true">
          {/* the work: the same in both readings */}
          <g className={s.rwWork}>
            <path d={hand.ring(590, 190, 52, 48, { seed: 3, wobble: 0.08 })} filter="url(#folio-pencil)" />
            <circle cx="590" cy="190" r="4.2" />
          </g>
          {/* controlling: the reward as a lever behind the behaviour */}
          <g className={s.rwPush}>
            <path d={hand.curve([[250, 150], [340, 132], [430, 168], [522, 190]], { seed: 6 })} filter="url(#folio-pencil)" />
            <path d={hand.curve([[250, 190], [350, 190], [440, 200], [520, 192]], { seed: 7 })} filter="url(#folio-pencil)" />
            <path d={hand.curve([[250, 230], [340, 252], [430, 214], [522, 196]], { seed: 8 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(528, 191, 0, { size: 14, seed: 9 })} filter="url(#folio-pencil)" />
            <path d={hand.line(578, 132, 578, 116, { seed: 11 })} filter="url(#folio-pencil)" />
            <path d={hand.line(604, 130, 610, 114, { seed: 12 })} filter="url(#folio-pencil)" />
            <path d={hand.line(556, 138, 546, 126, { seed: 13 })} filter="url(#folio-pencil)" />
          </g>
          {/* informational: the reward as news about how the work went */}
          <g className={s.rwTell}>
            <path d={hand.curve([[250, 160], [340, 96], [470, 92], [560, 120], [610, 150]], { seed: 21 })} filter="url(#folio-pencil)" />
            <path d={hand.ring(590, 190, 66, 62, { seed: 22, wobble: 0.06, overlap: 0.2 })} filter="url(#folio-pencil)" />
            <path d={hand.curve([[566, 190], [582, 208], [614, 170]], { seed: 23, wander: 0.4 })} filter="url(#folio-pencil)" />
          </g>
        </svg>
        <div className={s.slip}>
          <span className={s.slipKick}>the nominal reward</span>
          <strong>{data.reward}</strong>
        </div>
        <span className={s.rwLabelWork} aria-hidden="true">the work</span>
        <figcaption className={s.rewardCaption}><Glyph g="▲" /> Teaching drawing. The reward and the work do not change; only what the reward is doing does.</figcaption>
      </figure>
      <div className={s.rewardPanel}>
        <Choices<string> label="How is the reward delivered?" value={String(i)} onChange={(v) => setI(Number(v))} options={data.cases.map((x, k) => ({ value: String(k), label: x.label }))} />
        <div className={s.rewardAnswer} aria-live="polite" style={{ "--case": c.colour } as CSSProperties}>
          <p className={s.rewardQuote}>&ldquo;{c.quote}&rdquo;</p>
          <p className={s.rewardMeaning}>{c.meaning}</p>
          <p className={s.rewardBody}>{c.body}</p>
        </div>
        <div className={s.rewardOther}>
          <p className={s.smallHead}>The other reading — still on the page</p>
          <p><b>{data.cases[1 - i].label}:</b> &ldquo;{data.cases[1 - i].quote}&rdquo; — {data.cases[1 - i].meaning}. {data.cases[1 - i].body}</p>
        </div>
        <p className={s.teachingNote}><Glyph g="?" /> {data.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   08 · A family of connected questions
   Not six boxes feeding one outcome. Three carry most of this record and sit
   closer; three are neighbours and stay further off. Choose one to read its
   question — all six are always listed.
   --------------------------------------------------------------------- */

const STAR_AT: Record<string, { x: number; y: number }> = {
  OIT: { x: 25, y: 24 },
  BPNT: { x: 71, y: 20 },
  CET: { x: 38, y: 78 },
  COT: { x: 8, y: 54 },
  GCT: { x: 92, y: 60 },
  RMT: { x: 76, y: 90 },
};

export function Constellation({ items }: { items: SDTMiniTheory[] }) {
  const [sel, setSel] = useState(items.findIndex((x) => x.acronym === "BPNT"));
  const cur = items[Math.max(0, sel)];
  const centre = { x: 50, y: 50 };

  return (
    <div className={s.stars}>
      <figure className={s.starsFig}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={s.starsLinks} aria-hidden="true">
          {items.map((it, k) => {
            const p = STAR_AT[it.acronym] ?? { x: 50, y: 50 };
            // begin beside the label, end short of the node, so no strand crosses either
            const a = { x: centre.x + (p.x - centre.x) * 0.3, y: centre.y + (p.y - centre.y) * 0.3 };
            const b = { x: centre.x + (p.x - centre.x) * 0.88, y: centre.y + (p.y - centre.y) * 0.88 };
            return <path key={it.acronym} data-emphasis={it.emphasis} data-on={k === sel || undefined} d={hand.line(a.x, a.y, b.x, b.y, { seed: k + 3, wander: 0.9, segments: 8 })} filter="url(#folio-graphite)" />;
          })}
        </svg>
        <span className={s.starsCore} style={{ left: `${centre.x}%`, top: `${centre.y}%` }}><small>the macro-theory</small><strong>Self-Determination Theory</strong></span>
        {items.map((it, k) => {
          const p = STAR_AT[it.acronym] ?? { x: 50, y: 50 };
          return (
            <button key={it.acronym} type="button" className={s.star} data-emphasis={it.emphasis} aria-pressed={k === sel} onClick={() => setSel(k)} style={{ left: `${p.x}%`, top: `${p.y}%`, "--star": it.colour } as CSSProperties}>
              <span className={s.starAcr}>{it.acronym}</span>
            </button>
          );
        })}
        <figcaption className={s.starsCaption}><Glyph g="✦" /> A Concept Lab teaching arrangement. Closer means more of this record leans on it, not that it matters more to the theory.</figcaption>
      </figure>
      <div className={s.starsPanel}>
        <p className={s.readingKick}>{cur.emphasis === "core" ? "doing the most work here" : "a neighbouring lens"}</p>
        <h3 className={s.readingName} aria-live="polite">{cur.title} <span>({cur.acronym})</span></h3>
        <p className={s.readingBody}>{cur.question}</p>
        <ol className={s.starsList} aria-label="All six mini-theories">
          {items.map((it) => (
            <li key={it.acronym} data-emphasis={it.emphasis}>
              <span className={s.starsListAcr}>{it.acronym}</span>
              <span><b>{it.title}</b> {it.question}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

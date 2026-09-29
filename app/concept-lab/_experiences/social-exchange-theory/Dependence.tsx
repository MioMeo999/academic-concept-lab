"use client";

import { useState } from "react";
import type { SETChainStep, SETDimension, SETFamilyNode, SETPowerModel } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import * as hand from "../../_folio/hand";
import { Anchor, Head, Strand } from "./Marks";
import { powerReading, type PowerState } from "./power";
import s from "./set.module.css";

/* ------------------------------------------------------------------------
   04 · Social or economic? — a profile, not a point
   Seven questions, each with two poles. The reader places an exchange on
   each; the line through the seven placements is jagged when an exchange is
   mixed. The poles are Concept Lab's reading of each question; the
   comparison is a synthesis, not an official taxonomy.
   --------------------------------------------------------------------- */

type Pos = 0 | 1 | 2;
const POS_LABEL = ["economic-like", "in between", "social-like"] as const;

const POLES: [string, string][] = [
  ["a precise return", "a general sense of owing"],
  ["terms stated", "terms inferred"],
  ["closely monitored", "little monitored"],
  ["immediate or scheduled", "open-ended"],
  ["closes after the transaction", "invites a continuing relation"],
  ["little trust needed", "much trust needed"],
  ["price, compliance, access", "care, status"],
];
const SHORT = ["obligation", "explicitness", "monitoring", "timing", "openness", "uncertainty", "meaning"];

const PRESETS: { id: string; label: string; place: Pos[] }[] = [
  { id: "explicit-warm", label: "Explicit terms inside a warm relationship", place: [1, 0, 1, 1, 2, 1, 2] },
  { id: "monitored-duty", label: "A social obligation, closely monitored", place: [2, 1, 0, 1, 2, 1, 2] },
  { id: "money-care", label: "Money that carries status or care", place: [0, 0, 1, 1, 1, 1, 2] },
];

export function DimensionProfile({ dimensions }: { dimensions: SETDimension[] }) {
  const [place, setPlace] = useState<Pos[]>(PRESETS[0].place);
  const [preset, setPreset] = useState<string | null>(PRESETS[0].id);
  const set = (i: number, v: Pos) => { setPlace((p) => p.map((x, k) => (k === i ? v : x)) as Pos[]); setPreset(null); };
  const counts = [0, 1, 2].map((v) => place.filter((p) => p === v).length);
  const mixed = counts[0] > 0 && counts[2] > 0;
  const X = [128, 224, 320];
  const pts: [number, number][] = place.map((p, i) => [X[p], 60 + i * 50]);

  return (
    <div className={s.prof}>
      <div className={s.profTop}>
        <p className={s.profTry}>Place an exchange. Or start from a constructed illustration:</p>
        <div className={s.profPresets} role="group" aria-label="Constructed illustrations">
          {PRESETS.map((p) => (
            <button key={p.id} type="button" aria-pressed={preset === p.id} onClick={() => { setPlace(p.place); setPreset(p.id); }}>{p.label}</button>
          ))}
        </div>
      </div>
      <div className={s.profBody}>
        <ol className={s.profRows}>
          {dimensions.map((d, i) => (
            <li key={d.label}>
              <div className={s.profQ}>
                <h3>{d.label}</h3>
                <p>{d.body}</p>
              </div>
              <div className={s.profPick} role="radiogroup" aria-label={`${d.label}: where does this exchange sit?`}>
                {([0, 1, 2] as Pos[]).map((v) => (
                  <label key={v} data-on={place[i] === v || undefined}>
                    <input type="radio" name={`dim-${i}`} checked={place[i] === v} onChange={() => set(i, v)} />
                    <span className={s.profDot} aria-hidden="true" />
                    <span className={s.profPole}>{v === 0 ? POLES[i][0] : v === 2 ? POLES[i][1] : "in between"}</span>
                    <span className={s.srOnly}> ({POS_LABEL[v]})</span>
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <figure className={s.profFig}>
          <svg viewBox="0 0 350 420" className={s.profSvg} role="img" aria-label={`A line through seven placements: ${counts[0]} economic-like, ${counts[1]} in between, ${counts[2]} social-like.`}>
            {X.map((x, k) => (
              <g key={x}>
                <path className={s.profGuide} d={hand.line(x, 36, x, 396, { seed: 130 + k, wander: 0.8 })} filter="url(#folio-graphite)" />
                <text x={x} y="18" textAnchor="middle" className={s.svgTiny}>{POS_LABEL[k]}</text>
              </g>
            ))}
            {SHORT.map((t, i) => <text key={t} x="4" y={64 + i * 50} className={s.svgTinyLeft} aria-hidden="true">{t}</text>)}
            <path className={s.profLine} d={hand.curve(pts, { seed: 140, wander: 0.4 })} filter="url(#folio-pencil)" />
            {pts.map(([x, y], i) => <circle key={i} className={s.profPoint} cx={x} cy={y} r="5.5" />)}
          </svg>
          <figcaption className={s.profReading} aria-live="polite">
            {counts[0]} economic-like · {counts[1]} in between · {counts[2]} social-like — {mixed ? "a mixed exchange: no single point on a money / non-money line." : "every placed dimension points the same way here."}
          </figcaption>
        </figure>
      </div>
      <p className={s.teachingNote}><Glyph g="✦" /> The seven questions and their poles are a Concept Lab synthesis for comparison, not an official taxonomy. The three illustrations are constructed from the synthesis above; they are not data.</p>
    </div>
  );
}

/* ------------------------------------------------------------------------
   05 · Who needs whom?
   Two anchors, two tethers, and the other routes each could take. A's
   dependence on B is B's power over A: it rises with the value A gets
   through B and falls with A's alternatives. Power is the asymmetry, not a
   trait of either person.
   --------------------------------------------------------------------- */

const ALT_COUNT = [4, 2, 1];
const ALT_SLOTS: [number, number][] = [[52, 84], [30, 168], [30, 232], [52, 316]];

export function PowerLab({ model }: { model: SETPowerModel }) {
  const [st, setSt] = useState<PowerState>({ aValue: 2, aAlt: 2, bValue: 2, bAlt: 2 });
  const reading = powerReading(st);
  const preset = (low: boolean) => setSt(low ? { aValue: 0, aAlt: 0, bValue: 0, bAlt: 0 } : { aValue: 2, aAlt: 2, bValue: 2, bAlt: 2 });
  const opts = (arr: string[]) => arr.map((label, v) => ({ value: String(v), label }));
  const setK = (k: keyof PowerState) => (v: string) => setSt((x) => ({ ...x, [k]: Number(v) }));
  const wt = (v: number) => 0.7 + v * 1.05;

  /** Each actor's other routes: solid strands for the alternatives they have, ghost rings for the ones they lack. */
  const side = (who: "a" | "b") => {
    const alt = who === "a" ? st.aAlt : st.bAlt;
    const n = ALT_COUNT[alt];
    const cx = who === "a" ? 190 : 450;
    return ALT_SLOTS.map(([dx, y], k) => {
      const sx = who === "a" ? dx : 640 - dx;
      const shown = n === 4 ? true : n === 2 ? k === 1 || k === 2 : k === 1;
      return (
        <g key={`${who}${k}`} className={s.altSlot} data-live={shown || undefined}>
          <path className={s.altNode} d={hand.ring(sx, y, 11, 10, { seed: 150 + k + (who === "a" ? 0 : 10), wobble: 0.1 })} filter="url(#folio-pencil)" />
          {shown && <Strand d={hand.curve([[cx + (who === "a" ? -28 : 28), 200 + (y - 200) * 0.16], [(cx + sx) / 2, (200 + y) / 2 + (k % 2 ? 6 : -6)], [sx + (who === "a" ? 12 : -12), y]], { seed: 160 + k + (who === "a" ? 0 : 10), wander: 0.8 })} tone="ghost" weight={0.6} opacity={0.85} />}
        </g>
      );
    });
  };

  return (
    <div className={s.power}>
      <figure className={s.powerFigure}>
        <svg className={s.powerSvg} viewBox="0 0 640 400" aria-hidden="true">
          {side("a")}
          {side("b")}
          <Anchor x={190} y={200} letter="A" seed={170} />
          <Anchor x={450} y={200} letter="B" seed={171} />
          {/* A's outcome runs through B */}
          <Strand d={hand.curve([[424, 184], [360, 168], [282, 168], [218, 184]], { seed: 172, wander: 0.8 })} tone="give" weight={wt(st.aValue)} />
          <Head x={216} y={185} angle={2.6} tone="give" seed={173} size={14} />
          {/* B's outcome runs through A */}
          <Strand d={hand.curve([[216, 218], [282, 236], [360, 236], [424, 218]], { seed: 174, wander: 0.8 })} tone="answer" weight={wt(st.bValue)} />
          <Head x={426} y={219} angle={-0.6} tone="answer" seed={175} size={14} />
        </svg>
      </figure>

      <div className={s.powerControls}>
        <div className={s.powerHead}>
          <p className={s.smallHead}>relational control</p>
          <h3>Who needs whom?</h3>
          <span className={s.badge}>no numeric power score</span>
        </div>
        <p className={s.powerIntro}>Set the value each actor receives through the other person and the alternatives available elsewhere. The labels are teaching conditions, not a measurement instrument.</p>
        <fieldset className={s.powerSet}>
          <legend>Actor A depends on B</legend>
          <Choices<string> label="Value mediated by B" value={String(st.aValue)} onChange={setK("aValue")} options={opts(model.values)} />
          <Choices<string> label="Alternatives for A" value={String(st.aAlt)} onChange={setK("aAlt")} options={opts(model.alternatives)} />
        </fieldset>
        <fieldset className={s.powerSet}>
          <legend>Actor B depends on A</legend>
          <Choices<string> label="Value mediated by A" value={String(st.bValue)} onChange={setK("bValue")} options={opts(model.values)} />
          <Choices<string> label="Alternatives for B" value={String(st.bAlt)} onChange={setK("bAlt")} options={opts(model.alternatives)} />
        </fieldset>
        <div className={s.powerPresets} role="group" aria-label="Power dependence presets">
          <span className={s.smallHead}>compare balanced conditions</span>
          <button type="button" onClick={() => preset(false)}>balanced + high mutual dependence</button>
          <button type="button" onClick={() => preset(true)}>balanced + low mutual dependence</button>
        </div>
        <div className={s.powerResult} aria-live="polite">
          <span className={s.smallHead}>current relational reading</span>
          <strong>{reading.balance}</strong>
          <strong>{reading.mutual}</strong>
        </div>
        <p className={s.teachingNote}>{model.note} Power balance and total mutual dependence are different questions: two actors can have balanced power while both depend heavily on one another, or while neither depends much. A&rsquo;s dependence on B is what gives B power over A (Emerson, 1962).</p>
      </div>
      <p className={s.powerCaption}><Glyph g="▲" /> Teaching drawing. The upper strand is what A gets through B; the lower is what B gets through A. Thickness is the value of what runs through the other person; each spare route to a ringed partner is an alternative, and a dashed ring is one the actor lacks. Nothing is measured, and no number is claimed.</p>
    </div>
  );
}

/* ------------------------------------------------------------------------
   06 · A transaction is not a relationship
   One exchange is a single turn of the spiral: five stages. The last stage
   feeds the next exchange, which begins one turn further out — in a field
   the first left behind. The drawing says the exchange loops back; it does
   not say the relationship grows.
   --------------------------------------------------------------------- */

const SP = { w: 700, h: 520, cx: 350, cy: 262 };
function spiralPoint(theta: number): [number, number] {
  const r = 78 + (theta / (Math.PI * 2)) * 84;
  return [SP.cx + Math.cos(theta - Math.PI / 2) * r * 1.3, SP.cy + Math.sin(theta - Math.PI / 2) * r * 0.98];
}

export function RelationshipSpiral({ stages }: { stages: SETChainStep[] }) {
  const [i, setI] = useState(0);
  const cur = stages[i];
  const per = (Math.PI * 2) / stages.length;
  const pts = (from: number, to: number) => { const out: [number, number][] = []; for (let t = from; t <= to + 1e-6; t += 0.09) out.push(spiralPoint(t)); return out; };
  const turn1 = hand.smooth(pts(0, Math.PI * 2));
  const turn2 = hand.smooth(pts(Math.PI * 2, Math.PI * 4));
  const feedback = hand.smooth(pts(per * (stages.length - 1), Math.PI * 2 + 0.02));
  const last = i === stages.length - 1;
  const at = (k: number) => spiralPoint(per * k);
  const end = spiralPoint(Math.PI * 2 + 0.02);
  const nextAt = spiralPoint(Math.PI * 2 + per * 0.5);

  return (
    <div className={s.spiral}>
      <figure className={s.spiralFigure}>
        <div className={s.spiralStage}>
          <svg viewBox={`0 0 ${SP.w} ${SP.h}`} className={s.spiralSvg} aria-hidden="true">
            <path className={s.spiralOld} d={turn2} filter="url(#folio-graphite)" />
            <path className={s.spiralTurn} d={turn1} filter="url(#folio-pencil)" />
            {last && <path className={s.spiralFeed} d={feedback} filter="url(#folio-pencil)" />}
            {last && <Head x={end[0]} y={end[1]} angle={0} tone="give" seed={181} size={14} />}
          </svg>
          {stages.map((st, k) => {
            const [x, y] = at(k);
            return (
              <button key={st.label} type="button" className={s.station} aria-pressed={k === i} onClick={() => setI(k)} style={{ left: `${(x / SP.w) * 100}%`, top: `${(y / SP.h) * 100}%` }}>
                <span className={s.stationNum}>{String(k + 1).padStart(2, "0")}</span>
                <span className={s.stationLabel}>{st.label}</span>
              </button>
            );
          })}
          <span className={s.spiralNext} aria-hidden="true" data-on={last || undefined} style={{ left: `${(nextAt[0] / SP.w) * 100}%`, top: `${(nextAt[1] / SP.h) * 100}%` }}>the next exchange</span>
        </div>
        <figcaption className={s.spiralCaption}><Glyph g="▲" /> A transaction can be one episode; a relationship is the feedback history that makes later exchanges meaningful. <span>↺ subsequent exchange feeds back into the relationship</span></figcaption>
      </figure>
      <div className={s.spiralPanel}>
        <p className={s.readingKick}>stage {String(i + 1).padStart(2, "0")} of {String(stages.length).padStart(2, "0")}</p>
        <h3 className={s.readingName} aria-live="polite">{cur.label}</h3>
        <p className={s.readingBody}>{cur.body}</p>
        <ol className={s.spiralList} aria-label="The five stages, in order">
          {stages.map((st, k) => (
            <li key={st.label} data-on={k === i || undefined}><b>{String(k + 1).padStart(2, "0")}</b><span><strong>{st.label}.</strong> {st.body}</span></li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   09 · Why isn't there one SET diagram?
   A family of traditions laid on a time axis. Each tradition is aligned with
   the source whose contribution names it — Concept Lab's alignment, drawn
   from each source's stated contribution. They share one concern
   (interdependence) and do not feed a single causal sequence.
   --------------------------------------------------------------------- */

const FAMILY_AT: Record<string, { year: number; y: number; who: string; tag: string }> = {
  "behavioural exchange": { year: 1958, y: 250, who: "Homans (1958)", tag: "1958" },
  "norm of reciprocity": { year: 1960, y: 92, who: "Gouldner (1960)", tag: "1960" },
  "power–dependence": { year: 1962, y: 410, who: "Emerson (1962; 1976)", tag: "1962" },
  "social resources": { year: 1974, y: 160, who: "Foa & Foa (1974)", tag: "1974" },
  "affect and relationship": { year: 2001, y: 356, who: "Lawler (2001)", tag: "2001" },
  "exchange structures": { year: 2007, y: 452, who: "Molm, Collett & Schaefer (2007)", tag: "2007" },
  "integrative remedies": { year: 2011, y: 100, who: "Cropanzano & Mitchell (2005); Cropanzano et al. (2017)", tag: "2005–17" },
  SET: { year: 2020, y: 250, who: "a family resemblance", tag: "" },
};
const FW = 720, FH = 520;
const xOf = (year: number) => 62 + ((year - 1955) / (2022 - 1955)) * 590;

export function FamilyMap({ nodes }: { nodes: SETFamilyNode[] }) {
  const [sel, setSel] = useState(Math.max(0, nodes.findIndex((n) => n.label === "power–dependence")));
  const cur = nodes[sel];

  return (
    <div className={s.fam}>
      <figure className={s.famFigure}>
        <div className={s.famStage}>
          <svg viewBox={`0 0 ${FW} ${FH}`} className={s.famSvg} aria-hidden="true">
            <path className={s.famAxis} d={hand.line(50, 496, 690, 496, { seed: 190, wander: 0.8, segments: 16 })} filter="url(#folio-graphite)" />
            {[1960, 1980, 2000, 2020].map((y) => <g key={y}><path className={s.famTick} d={hand.line(xOf(y), 490, xOf(y), 502, { seed: y, wander: 0.3 })} filter="url(#folio-graphite)" /><text x={xOf(y)} y="516" textAnchor="middle" className={s.svgTiny}>{y}</text></g>)}
            {/* the shared concern runs the whole length; each tradition sprouts from it where its source falls */}
            <Strand d={hand.curve([[xOf(1958), 250], [xOf(1985), 253], [xOf(2005), 248], [xOf(2020) - 22, 250]], { seed: 191, wander: 1 })} tone="ink" weight={1.1} />
            {nodes.map((n, k) => {
              const p = FAMILY_AT[n.label];
              if (!p || n.label === "behavioural exchange" || n.label === "SET") return null;
              const x = xOf(p.year);
              const from = p.y < 250 ? p.y + 22 : p.y - 22;
              return <Strand key={n.label} d={hand.curve([[x, 250 + (p.y < 250 ? -3 : 3)], [x + (k % 2 ? 6 : -6), (from + 250) / 2], [x, from]], { seed: 200 + k, wander: 0.9 })} tone={n.kind === "remedy" ? "answer" : "give"} weight={1.1} dash={n.kind === "remedy" ? "3 9" : undefined} opacity={k === sel ? 1 : 0.6} />;
            })}
          </svg>
          {nodes.map((n, k) => {
            const p = FAMILY_AT[n.label];
            if (!p) return null;
            return (
              <button key={n.label} type="button" className={s.famNode} data-kind={n.kind} aria-pressed={k === sel} onClick={() => setSel(k)} style={{ left: `${(xOf(p.year) / FW) * 100}%`, top: `${(p.y / FH) * 100}%` }}>
                <span className={s.famYear}>{p.tag}</span>
                <span className={s.famName}>{n.label}</span>
              </button>
            );
          })}
          <span className={s.famTrunk} aria-hidden="true">the shared concern: interdependence</span>
        </div>
        <figcaption className={s.famCaption}><Glyph g="✦" /> This constellation keeps traditions connected without making every branch a mandatory causal stage. Each branch sits at the year of the source whose contribution names it — Concept Lab&rsquo;s alignment, not an official taxonomy.</figcaption>
      </figure>
      <div className={s.famPanel}>
        <p className={s.readingKick}>{cur.kind}</p>
        <h3 className={s.readingName} aria-live="polite">{cur.label}</h3>
        <p className={s.readingBody}>{cur.body}</p>
        <p className={s.famWho}><Glyph g="✦" /> {FAMILY_AT[cur.label]?.who}</p>
        <ol className={s.famList} aria-label="All eight parts of the family">
          {nodes.map((n) => (
            <li key={n.label} data-kind={n.kind}><b>{n.label}</b> <span>{n.body}</span></li>
          ))}
        </ol>
      </div>
    </div>
  );
}

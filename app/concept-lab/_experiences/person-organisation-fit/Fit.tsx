"use client";

import { useId, useState } from "react";
import type { Category, Facet, FitTarget, Model } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import { Rich } from "../../_components/Sketch";
import * as hand from "../../_folio/hand";
import { Bust, TargetArt, TARGET_ABBR } from "./Marks";
import s from "./po.module.css";

/* ---------------------------------------------------------------------------
   The person and the place, as two pieces.

   Fit is a relation between a person and one particular place, so the pages's
   figures draw the relation itself: a person-shaped piece and an
   organisation-shaped piece, and whatever passes between their edges. Alike:
   the same shape and colour, side by side, neither filling anything in the
   other. Fitting together: one has a tab, the other a notch, and they close.
   The same three states come back when the page asks what a survey item is
   really measuring.
   ------------------------------------------------------------------------- */

export type FitMode = "alike" | "person" | "org";
type Pt = [number, number];

const PB = { x0: 70, x1: 250, y0: 126, y1: 250 };
const OB = { x0: 360, x1: 590, y0: 66, y1: 250 };
const SEAM = { y0: 170, y1: 222, d: 26 };
const SHIFT = 110;

// each block's outline, per state, from its bottom corner round to the other
const P_SHAPE: Record<FitMode, Pt[]> = {
  alike: [[PB.x0, PB.y1], [PB.x0, PB.y0], [PB.x1, PB.y0], [PB.x1, PB.y1]],
  person: [[PB.x0, PB.y1], [PB.x0, PB.y0], [PB.x1, PB.y0], [PB.x1, SEAM.y0], [PB.x1 + SEAM.d, SEAM.y0], [PB.x1 + SEAM.d, SEAM.y1], [PB.x1, SEAM.y1], [PB.x1, PB.y1]],
  org: [[PB.x0, PB.y1], [PB.x0, PB.y0], [PB.x1, PB.y0], [PB.x1, SEAM.y0], [PB.x1 - SEAM.d, SEAM.y0], [PB.x1 - SEAM.d, SEAM.y1], [PB.x1, SEAM.y1], [PB.x1, PB.y1]],
};
const O_SHAPE: Record<FitMode, Pt[]> = {
  alike: [[OB.x0, OB.y1], [OB.x0, OB.y0], [OB.x1, OB.y0], [OB.x1, OB.y1]],
  person: [[OB.x0, OB.y1], [OB.x0, SEAM.y1], [OB.x0 + SEAM.d, SEAM.y1], [OB.x0 + SEAM.d, SEAM.y0], [OB.x0, SEAM.y0], [OB.x0, OB.y0], [OB.x1, OB.y0], [OB.x1, OB.y1]],
  org: [[OB.x0, OB.y1], [OB.x0, SEAM.y1], [OB.x0 - SEAM.d, SEAM.y1], [OB.x0 - SEAM.d, SEAM.y0], [OB.x0, SEAM.y0], [OB.x0, OB.y0], [OB.x1, OB.y0], [OB.x1, OB.y1]],
};
const MODES: FitMode[] = ["alike", "person", "org"];
const closed = (pts: Pt[]) => `M${pts.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;
const traced = (pts: Pt[], seed: number) => {
  const loop = [...pts, pts[0]];
  return loop.slice(1).map((p, i) => hand.line(loop[i][0], loop[i][1], p[0], p[1], { seed: seed + i, wander: 1.1, segments: 4 })).join(" ");
};

const FIT_LABEL: Record<FitMode, string> = {
  alike: "A person-shaped piece and an organisation-shaped piece of the same colour, each marked with a ring, standing side by side: alike.",
  person: "A person-shaped piece with a tab, pushed into a notch in the organisation-shaped piece: the person fills a gap in the organisation.",
  org: "An organisation-shaped piece with a tab, pushed into a notch in the person-shaped piece: the organisation meets a need in the person.",
};

/** The two pieces. `compact` keeps just the pieces and the edge between them. */
export function FitPieces({ mode, compact = false, label }: { mode: FitMode; compact?: boolean; label?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const pat = (h: string) => `poHatch${uid}${h}`;
  const oHue = mode === "alike" ? "teal" : "gold";
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const };
  const windows: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) windows.push([396 + c * 62, 92 + r * 46]);

  return (
    <svg className={s.fitSvg} viewBox={compact ? "44 58 574 204" : "0 0 640 300"} data-fit={mode} data-compact={compact || undefined} {...a11y}>
      <defs>
        <pattern id={pat("teal")} patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(38)"><path className={s.patTeal} d="M0 0V7" /></pattern>
        <pattern id={pat("gold")} patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(-38)"><path className={s.patGold} d="M0 0V7" /></pattern>
      </defs>
      {!compact && <path className={s.fitGround} d={hand.line(24, 253, 616, 253, { seed: 3, wander: 1.4, segments: 12 })} filter="url(#folio-graphite)" />}

      {/* the person */}
      <g className={s.fitMove} style={{ transform: `translateX(${mode === "person" ? SHIFT : 0}px)` }}>
        {MODES.map((m, k) => (
          <g key={m} className={s.fitShape} data-on={mode === m || undefined}>
            <path className={s.fitFill} d={closed(P_SHAPE[m])} fill={`url(#${pat("teal")})`} />
            <path className={s.fitInk} d={traced(P_SHAPE[m], 10 + k * 10)} filter="url(#folio-pencil)" />
          </g>
        ))}
        {!compact && (
          <>
            <path className={s.fitInk} d={hand.ring(160, 88, 29, 32, { seed: 5 })} filter="url(#folio-pencil)" />
            <path className={s.fitMark} d={mode === "alike" ? hand.ring(160, 188, 16, 16, { seed: 6 }) : hand.line(142, 188, 178, 188, { seed: 6, wander: 0.8, segments: 3 }) + hand.line(160, 170, 160, 206, { seed: 7, wander: 0.8, segments: 3 })} filter="url(#folio-pencil)" />
          </>
        )}
      </g>

      {/* the organisation */}
      <g className={s.fitMove} style={{ transform: `translateX(${mode === "org" ? -SHIFT : 0}px)` }}>
        {MODES.map((m, k) => (
          <g key={m} className={s.fitShape} data-on={mode === m || undefined}>
            <path className={s.fitFill} d={closed(O_SHAPE[m])} fill={`url(#${pat(oHue)})`} />
            <path className={s.fitInk} d={traced(O_SHAPE[m], 40 + k * 10)} filter="url(#folio-pencil)" />
          </g>
        ))}
        {!compact && (
          <>
            <path className={s.fitInk} d={hand.line(566, 66, 566, 26, { seed: 70, wander: 0.6, segments: 3 }) + hand.line(566, 26, 612, 38, { seed: 71, wander: 0.6, segments: 3 }) + hand.line(612, 38, 566, 50, { seed: 72, wander: 0.6, segments: 3 })} filter="url(#folio-pencil)" />
            {windows.map(([x, y], i) => (
              <g key={i}>
                <path className={s.fitWindow} d={hand.line(x, y, x + 44, y, { seed: 80 + i, wander: 0.7, segments: 3 }) + hand.line(x + 44, y, x + 44, y + 32, { seed: 90 + i, wander: 0.7, segments: 3 }) + hand.line(x + 44, y + 32, x, y + 32, { seed: 100 + i, wander: 0.7, segments: 3 }) + hand.line(x, y + 32, x, y, { seed: 110 + i, wander: 0.7, segments: 3 })} filter="url(#folio-pencil)" />
                <path className={s.fitMark} d={hand.ring(x + 22, y + 16, 8, 8, { seed: 120 + i })} filter="url(#folio-pencil)" />
              </g>
            ))}
          </>
        )}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------------
   Two ways to fit
   Both definitions stay on the page, always; the choice moves the pieces and
   says which of the record's two readings the drawing is of.
   --------------------------------------------------------------------- */

const OWN: Record<"person" | "org", string[]> = {
  person: ["demands–abilities", "filling a gap"],
  org: ["needs–supplies", "meeting a need"],
};

export function TwoFits({ categories, note }: { categories: Category[]; note: string }) {
  const [cat, setCat] = useState<"sup" | "comp">("sup");
  const [dir, setDir] = useState<"person" | "org">("person");
  const mode: FitMode = cat === "sup" ? "alike" : dir;

  return (
    <div className={s.fits} data-fit={mode}>
      <figure className={s.fitsFigure}>
        <FitPieces mode={mode} label={FIT_LABEL[mode]} />
        <div className={s.fitsLabels} aria-hidden="true">
          <span style={{ left: `${((160 + (mode === "person" ? SHIFT : 0)) / 640) * 100}%` }}>the person</span>
          <span style={{ left: `${((475 - (mode === "org" ? SHIFT : 0)) / 640) * 100}%` }}>the organisation</span>
        </div>
      </figure>
      <div className={s.fitsPanel}>
        <Choices<"sup" | "comp"> label="Which kind of fit?" value={cat} onChange={setCat} options={[{ value: "sup", label: categories[0].title, hint: "alike" }, { value: "comp", label: categories[1].title, hint: "fitting together" }]} />
        {cat === "comp" && (
          <Choices<"person" | "org"> label="Who supplies?" value={dir} onChange={setDir} options={[{ value: "person", label: "The person supplies what the organisation lacks" }, { value: "org", label: "The organisation supplies what the person needs" }]} />
        )}
        <p className={s.fitsReading} aria-live="polite">
          {mode === "alike" && "Fit as resemblance: the two pieces are the same colour and carry the same mark, so they sit side by side. Neither fills anything in the other."}
          {mode === "person" && "Fit as fitting together: the person’s tab closes a gap in the organisation. The two are not alike — one has what the other lacks."}
          {mode === "org" && "Fit as fitting together: the organisation’s tab closes a need in the person. The two are not alike — one has what the other lacks."}
        </p>
      </div>
      <div className={s.fitsCards}>
        {categories.map((c, k) => (
          <article key={c.title} className={s.fitsCard} data-on={(k === 0 ? cat === "sup" : cat === "comp") || undefined}>
            <h3>{c.title}</h3>
            <Rich as="p" html={c.definition} />
            <ul className={s.chips}>
              {c.examples.map((e) => <li key={e} data-on={(k === 1 && cat === "comp" && OWN[dir].includes(e)) || undefined}>{e}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <p className={s.fitsCaption}><Glyph g="▲" /> The pieces are a teaching drawing, not a measurement. Which example goes with which direction is Concept Lab’s reading of the record’s own definition; the record lists them together.</p>
      <div className={s.fitsNote}>
        <p><Glyph g="✦" /> <span className={s.badge}>Concept Lab reading</span> <Rich html={note} /></p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Which fit are you actually measuring?
   Two answers side by side: a researcher lays two profiles over each other, or
   a person is asked. The second is then split into the three perceptions the
   survey item runs together — and the three are the two-piece drawing again.
   --------------------------------------------------------------------- */

const PERSON_PROFILE = [150, 92, 172, 64, 132, 112, 80, 158];
const PLACE_PROFILE = [118, 132, 148, 92, 104, 150, 62, 138];
const PX = (i: number) => 40 + i * 48;

/** Two unlabelled profiles, and the gap between them at each point. Illustrative. */
function ProfileFigure() {
  const up = (v: number) => 218 - v;
  // a profile is a line joining separate points, not a smooth curve through them
  const run = (vs: number[], seed: number) => vs.slice(1).map((v, i) => hand.line(PX(i), up(vs[i]), PX(i + 1), up(v), { seed: seed + i, wander: 0.7, segments: 4 })).join(" ");
  const person = run(PERSON_PROFILE, 30);
  const place = run(PLACE_PROFILE, 60);
  return (
    <svg className={s.profileSvg} viewBox="0 0 420 250" aria-hidden="true">
      <path className={s.profileAxis} d={hand.line(20, 220, 400, 220, { seed: 1, wander: 1, segments: 10 })} filter="url(#folio-graphite)" />
      {PERSON_PROFILE.map((v, i) => (
        <path key={i} className={s.profileGap} d={hand.line(PX(i), up(v), PX(i), up(PLACE_PROFILE[i]), { seed: 20 + i, wander: 0.8, segments: 3 })} filter="url(#folio-pencil)" />
      ))}
      <path className={s.profilePerson} d={person} filter="url(#folio-pencil)" />
      <path className={s.profilePlace} d={place} filter="url(#folio-pencil)" />
      {PERSON_PROFILE.map((v, i) => <circle key={`a${i}`} className={s.profileDotPerson} cx={PX(i)} cy={up(v)} r="4.2" />)}
      {PLACE_PROFILE.map((v, i) => <circle key={`b${i}`} className={s.profileDotPlace} cx={PX(i)} cy={up(v)} r="4.2" />)}
    </svg>
  );
}

const FACET_MODE: Record<string, FitMode> = { V: "alike", N: "org", D: "person" };

export function Measuring({ models, facets, facetLabel, facetCaption }: { models: Model[]; facets: Facet[]; facetLabel: string; facetCaption: string }) {
  const [v, setV] = useState(facets[0].initial);
  const f = facets.find((x) => x.initial === v) ?? facets[0];
  const [profile, perceived] = models;

  return (
    <div className={s.measure}>
      <article className={s.measureCard} data-kind="profile">
        <p className={s.measureYear}>{profile.year}</p>
        <h3>{profile.name}</h3>
        <p className={s.measureSource}>{profile.source}</p>
        <figure className={s.profileFig}>
          <ProfileFigure />
          <figcaption><Glyph g="▲" /> Two profiles, drawn with no labels — the record does not supply this instrument’s own items. The gap at each point is what a researcher computes.</figcaption>
        </figure>
        <Rich as="p" className={s.measureBody} html={profile.body} />
        {profile.note && <p className={s.measureNote}>{profile.note}</p>}
      </article>

      <article className={s.measureCard} data-kind="perceived">
        <p className={s.measureYear}>{perceived.year}</p>
        <h3>{perceived.name}</h3>
        <p className={s.measureSource}>{perceived.source}</p>
        <div className={s.item}>
          <Bust mark={0} className={s.itemBust} />
          <p className={s.itemAsk}>“Do you fit here?”</p>
        </div>
        <p className={s.itemLead}>{facetLabel}: one survey item, read three ways.</p>
        <Choices<string>
          className={s.facetChoices}
          label={facetLabel}
          value={v}
          onChange={setV}
          options={facets.map((x) => ({ value: x.initial, label: <><span className={s.facetInitial}>{x.initial}</span> {x.label}</>, hint: `${x.body.split("?")[0]}?` }))}
        />
        <div className={s.facetAnswer} aria-live="polite" data-fit={FACET_MODE[f.initial] ?? "alike"}>
          <FitPieces mode={FACET_MODE[f.initial] ?? "alike"} compact />
          <div>
            <h4>{f.label}</h4>
            <p>{`${f.body.split("?")[0]}?`}</p>
          </div>
        </div>
        <ul className={s.facetAll} aria-label="All three perceptions">
          {facets.map((x) => <li key={x.initial} data-on={x.initial === v || undefined}><b>{x.initial}</b> {x.label}: {x.body}</li>)}
        </ul>
        <Rich as="p" className={s.measureBody} html={perceived.body} />
        {perceived.note && <p className={s.measureNote}>{perceived.note}</p>}
        <p className={s.teachingNote}><Glyph g="▲" /> {facetCaption}</p>
      </article>
    </div>
  );
}

/* ------------------------------------------------------------------------
   One person, four places to be compared with
   The person stays where they are; what changes is what they are compared
   with, and the question that comparison asks. All four rows stay on the page;
   the chosen one is drawn and set heavier.
   --------------------------------------------------------------------- */

export function Targets({ items }: { items: FitTarget[] }) {
  const [i, setI] = useState(0);
  const t = items[i];
  return (
    <div className={s.targets} data-target={t.id}>
      <div className={s.targetStage}>
        <div className={s.targetWho}>
          <Bust mark={0} className={s.targetBust} />
          <span>the same person</span>
        </div>
        <svg className={s.targetArrow} viewBox="0 0 60 30" aria-hidden="true">
          <path d={hand.curve([[4, 15], [22, 11], [40, 17], [54, 14]], { seed: 8, wander: 0.5 })} filter="url(#folio-pencil)" />
          <path d={hand.arrowHead(54, 14, -0.1, { size: 9, seed: 9 })} filter="url(#folio-pencil)" />
        </svg>
        <ul className={s.targetRow} aria-label="What the person is compared with">
          {items.map((it, k) => (
            <li key={it.id}>
              <button type="button" className={s.targetBtn} aria-pressed={i === k} onClick={() => setI(k)}>
                <TargetArt index={k} on={i === k} />
                <span className={s.targetAbbr}>{TARGET_ABBR[it.id] ?? it.title}</span>
                <span className={s.targetTitle}>{it.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ol className={s.targetRows} aria-live="polite">
        {items.map((it, k) => (
          <li key={it.id} data-on={i === k || undefined}>
            <p className={s.rowName}><span className={s.rowAbbr}>{TARGET_ABBR[it.id]}</span>{it.title}</p>
            <p className={s.rowQuestion}>{it.question}</p>
            <p className={s.rowExample}>{it.example}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

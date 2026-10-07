"use client";

import { useState, type CSSProperties } from "react";
import type { SDTInternalisation } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import s from "./sdt.module.css";

/* ---------------------------------------------------------------------------
   One demand, four places in relation to the self.

   The wall above is where a rule is posted by someone else; the bust below is
   the person. The same sentence is set in a different voice as it sits in a
   different place: printed notice, a reproach heard inside, a reason in the
   person's own reasoning, a line in their own hand. Type is a teaching
   device here (▲): it says whose voice the sentence is in, not how much
   motivation there is. The four are places a reason can sit, not stages a
   person must pass through.
   ------------------------------------------------------------------------- */

type Branch = "external" | "introjected" | "identified" | "integrated";
const ORDER: Branch[] = ["external", "introjected", "identified", "integrated"];
const VB = { w: 520, h: 580 };
const ART = "/visual-language/theories/sdt";
const pc = (x: number, y: number, w: number, h: number): CSSProperties => ({ left: `${(x / VB.w) * 100}%`, top: `${(y / VB.h) * 100}%`, width: `${(w / VB.w) * 100}%`, height: `${(h / VB.h) * 100}%` });

/** Where the sentence is set, in drawing units, for each place. */
const SPOT: Record<Branch, { x: number; y: number; w: number; h: number }> = {
  external: { x: 126, y: 60, w: 268, h: 76 },
  introjected: { x: 198, y: 464, w: 124, h: 54 },
  identified: { x: 186, y: 462, w: 150, h: 56 },
  integrated: { x: 176, y: 466, w: 168, h: 44 },
};

export function Rule({ internalisation, expl }: { internalisation: SDTInternalisation; expl: string }) {
  const [branch, setBranch] = useState<Branch>("external");
  const items = ORDER.map((id) => {
    const b = internalisation.branches.find((x) => x.label === id);
    if (!b) throw new Error(`SDT rule: the record has no ${id} branch`);
    return { id, ...b };
  });
  const cur = items.find((i) => i.id === branch)!;
  const spot = SPOT[branch];

  return (
    <div className={s.rule} data-branch={branch}>
      <div className={s.ruleStage}>
        <div className={s.ruleArt} role="img" aria-label={`A wall with a notice above, a person below. The sentence “${cur.quote}” sits ${branch === "external" ? "on the wall, outside the person" : branch === "introjected" ? "inside the person, still pinned up like a notice" : branch === "identified" ? "inside the person, in a notebook as their own reasoning" : "inside the person, joined to their other commitments"}.`}>
          <img className={s.ruleBase} src={`${ART}/sdt-rule-base.webp`} alt="" width={900} height={1004} />
          {ORDER.map((id) => <img key={id} className={s.ruleLayer} data-on={id === branch || undefined} src={`${ART}/sdt-rule-${id}.webp`} alt="" width={900} height={1004} aria-hidden="true" />)}
        </div>
        <p key={branch} className={s.sentence} data-voice={branch} style={pc(spot.x, spot.y, spot.w, spot.h)}>{cur.quote}</p>
        <p className={s.ruleTag} data-where="wall">the wall · someone else’s</p>
        <p className={s.ruleTag} data-where="self">the person · the self</p>
      </div>
      <div className={s.rulePanel}>
        <p className={s.smallHead}>Where does the same demand sit?</p>
        <Choices<Branch>
          label="Where the rule sits in relation to the person"
          value={branch}
          onChange={setBranch}
          options={items.map((i) => ({ value: i.id, label: i.label }))}
        />
        <div className={s.ruleNow} aria-live="polite">
          <p className={s.ruleName}>{cur.label}</p>
          <p className={s.ruleBody}>{cur.body}</p>
        </div>
        <ol className={s.ruleList} aria-label="All four places, in words">
          {items.map((i) => (
            <li key={i.id} data-voice={i.id} aria-current={i.id === branch ? "true" : undefined}>
              <span className={s.ruleQuote}>{i.quote}</span>
              <span className={s.ruleLabel}>{i.label}</span>
              <span className={s.ruleText}>{i.body}</span>
            </li>
          ))}
        </ol>
        <p className={s.teachingNote}><Glyph g="▲" /> {expl}</p>
      </div>
    </div>
  );
}

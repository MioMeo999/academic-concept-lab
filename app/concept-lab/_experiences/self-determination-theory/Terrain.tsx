"use client";

import { useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import * as hand from "../../_folio/hand";
import { CUTS, groupOf, readFlags, type Cut, type Place, type PlaceId } from "./places";
import s from "./sdt.module.css";

/* ---------------------------------------------------------------------------
   The reason register: one shared action field, six live entries.

   The notebook and hand stay constant while the surrounding marks overlap.
   On a narrow screen the complete field appears once above the six live
   entries, so every reason retains a readable action context. The controls
   regroup the same reasons two ways; selections remain qualitative and nothing
   here adds up.
   ------------------------------------------------------------------------- */

/** A pennant on a pole, drawn once per place so each looks hand-set. */
function Flag({ seed }: { seed: number }) {
  const pole = hand.line(10, 56, 11, 6, { seed, wander: 0.8, segments: 5 });
  const cloth = hand.curve([[11, 7], [34, 11], [52, 9], [44, 21], [52, 33], [30, 31], [11, 28]], { seed: seed + 3, wander: 0.9 });
  return (
    <svg className={s.flagSvg} viewBox="0 0 60 62" aria-hidden="true" focusable="false">
      <path className={s.flagCloth} d={cloth} />
      <path className={s.flagPole} d={pole} filter="url(#folio-pencil)" />
      <path className={s.flagEdge} d={cloth} filter="url(#folio-pencil)" />
    </svg>
  );
}

/** A faint ring with a plus, so an unflagged place still says it can be flagged. */
function Plant({ seed }: { seed: number }) {
  return (
    <svg className={s.plantSvg} viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <path d={hand.ring(22, 22, 14, 14, { seed, wobble: 0.06, overlap: 0.18 })} filter="url(#folio-pencil)" />
      <path d={hand.line(22, 15, 22, 29, { seed: seed + 1, wander: 0.4, segments: 3 })} filter="url(#folio-pencil)" />
      <path d={hand.line(15, 22, 29, 22, { seed: seed + 2, wander: 0.4, segments: 3 })} filter="url(#folio-pencil)" />
    </svg>
  );
}

function Brace({ seed }: { seed: number }) {
  const d = hand.brace(2, 198, 4, { depth: 7, up: false, seed });
  return (
    <svg className={s.braceSvg} viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={d} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function ReasonRegister({
  places,
  plateSrc,
  plateWidth,
  plateHeight,
  description,
  caption,
  sky,
  skyAside,
}: {
  places: Place[];
  plateSrc: string;
  plateWidth: number;
  plateHeight: number;
  /** What the drawing shows, for assistive technology; the image itself is decorative. */
  description: string;
  caption: ReactNode;
  /** The title and hook, set in the plate's sky. */
  sky: ReactNode;
  /** The standfirst, set in the sky's other corner. */
  skyAside: ReactNode;
}) {
  const [picked, setPicked] = useState<PlaceId[]>([]);
  const [cut, setCut] = useState<Cut>("owner");
  const uid = useId();
  const reading = useMemo(() => readFlags(picked), [picked]);
  const toggle = (id: PlaceId) => setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const groups = CUTS[cut].groups;
  const colOf = (id: PlaceId) => places.findIndex((p) => p.id === id);

  return (
    <div className={s.register} data-cut={cut}>
      <div className={s.stage} style={{ "--plate-ratio": `${plateWidth} / ${plateHeight}`, "--plate": `url(${plateSrc})` } as CSSProperties}>
        <div className={s.sky}>{sky}</div>
        <div className={s.skyAside}>{skyAside}</div>
        <img className={s.plate} src={plateSrc} width={plateWidth} height={plateHeight} alt="" fetchPriority="high" />
        <p className={s.plateCaption}>{caption}</p>

        {places.map((p, i) => {
          const on = picked.includes(p.id);
          const g = groupOf(p.id, cut);
          return (
            <div key={p.id} className={s.place} role="group" aria-labelledby={`${uid}-${p.id}`} data-place={p.id} data-picked={on || undefined} data-owner={p.owner} data-purpose={p.purpose} style={{ "--i": i, "--col": i + 1 } as CSSProperties}>
              <button type="button" className={s.media} aria-pressed={on} aria-label={`Mark ${p.name} in your reading: “${p.statement}”`} onClick={() => toggle(p.id)}>
                <span className={s.flagWrap} aria-hidden="true">
                  <Plant seed={20 + i * 5} />
                  <Flag seed={40 + i * 7} />
                </span>
              </button>
              <div className={s.text}>
                <p className={s.voice} data-voice={p.id}>“{p.statement}”</p>
                <h2 className={s.placeName} id={`${uid}-${p.id}`}>{p.name}</h2>
                <p className={s.descriptor}>{p.descriptor}</p>
                <p className={s.body}>{p.body}</p>
                <details className={s.more}>
                  <summary>More on this place</summary>
                  <p>{p.explanation}</p>
                </details>
                <p className={s.tags} aria-label="Where this place falls on the two cuts">
                  <span data-on={cut === "purpose" || undefined}>{p.purpose === "none" ? "outside both cuts" : p.purpose}</span>
                  <span aria-hidden="true">·</span>
                  <span data-on={cut === "owner" || undefined}>{p.owner === "none" ? "no ownership" : p.owner}</span>
                </p>
                <span className={s.groupKey} data-group={g.key} aria-hidden="true" />
              </div>
            </div>
          );
        })}

        {groups.map((g, gi) => {
          const cols = g.ids.map(colOf).sort((a, b) => a - b);
          return (
            <div key={g.key} className={s.groupHead} data-group={g.key} style={{ gridColumn: `${cols[0] + 1} / span ${cols.length}` }}>
              <p>{g.label}</p>
              <Brace seed={90 + gi * 4 + (cut === "owner" ? 0 : 20)} />
            </div>
          );
        })}
      </div>

      <p className={s.sr}>{description}</p>
      <div className={s.controls}>
        <div className={s.cutBox}>
          <p className={s.smallHead}>Read the same six reasons two ways</p>
          <Choices<Cut>
            label="How to group the six reasons"
            value={cut}
            onChange={setCut}
            options={[
              { value: "owner", label: CUTS.owner.title, hint: CUTS.owner.hint },
              { value: "purpose", label: CUTS.purpose.title, hint: CUTS.purpose.hint },
            ]}
          />
          <p className={s.cutNote}>Same six places, two dividing lines. Neither cut sits inside the other: identified and integrated reasons are on the extrinsic side of one and the autonomous side of the other.</p>
        </div>
        <div className={s.readBox}>
          <div className={s.readHead}>
            <p className={s.smallHead}>{picked.length ? `${picked.length} reason${picked.length > 1 ? "s" : ""} marked` : "Your reasons"}</p>
            {picked.length > 0 && <button type="button" className={s.clear} onClick={() => setPicked([])}>Clear the marks</button>}
          </div>
          <div className={s.reading} role="status" aria-live="polite" data-kind={reading.kind}>
            {reading.sentences.map((t) => <p key={t}>{t}</p>)}
          </div>
          <p className={s.teachingNote}><Glyph g="✦" /> A reading written for this page from the record’s distinctions. No mark has a weight and nothing is added up.</p>
        </div>
      </div>
    </div>
  );
}

import type { CSSProperties } from "react";
import Link from "next/link";
import type { FitTarget, TermShift, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, Trail } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import * as hand from "../../_folio/hand";
import { Bust, TargetArt, TARGET_ABBR } from "./Marks";
import { SortingRoom } from "./Room";
import { Measuring, Targets, TwoFits } from "./Fit";
import s from "./po.module.css";

/* ---------------------------------------------------------------------------
   Person–Organisation Fit — THE PEOPLE MAKE THE PLACE.

   The knowledge is a relation between a person and one particular place, and
   the odd thing about it is that the relation runs both ways: a person looks
   for a place that fits them, a place lets in the people who fit it, and what
   is left is a place that has made itself out of its people. So the page is
   built around a person, a place with a door, and the room the door opens on.
   The first figure is that room at three moments; the reader then runs the
   room themselves, sees what "fit" can mean when the two sides are drawn as
   pieces, watches one survey item split into three, and compares one person
   with four different places.

   Every drawing is a teaching construction. The people carry made-up marks,
   the room's rules are made up, and none of it is evidence.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "name", num: "01", label: "Name" },
  { id: "sits", num: "02", label: "Sits in" },
  { id: "idea", num: "03", label: "Idea" },
  { id: "asa", num: "04", label: "Sorting" },
  { id: "two", num: "05", label: "Two fits" },
  { id: "measure", num: "06", label: "Measuring" },
  { id: "targets", num: "07", label: "Targets" },
  { id: "trail", num: "08", label: "Trail" },
  { id: "limits", num: "09", label: "Limits" },
  { id: "sources", num: "10", label: "Sources" },
  { id: "provenance", num: "11", label: "Provenance" },
];

const HERO = "/visual-language/theories/po";

/** The two corrections a reader makes before reading the literature. */
function Naming({ items, targets }: { items: TermShift[]; targets: FitTarget[] }) {
  return (
    <div className={s.naming}>
      {items.map((t, i) => (
        <article key={t.was} className={s.correction}>
          <p className={s.corrKick}>correction {String(i + 1).padStart(2, "0")}</p>
          <p className={s.corrWas}><span className={s.srOnly}>Not this: </span><del className={s.struck}>{t.was}</del></p>
          <svg className={s.corrArrow} viewBox="0 0 70 40" aria-hidden="true">
            <path d={hand.curve([[4, 8], [16, 24], [36, 30], [60, 26]], { seed: 4 + i, wander: 0.6 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(62, 26, -0.1, { size: 10, seed: 9 + i })} filter="url(#folio-pencil)" />
          </svg>
          <p className={s.corrNow}><span className={s.srOnly}>Write this: </span><Rich html={t.now} /></p>
          <Rich as="p" className={s.corrNote} html={t.note} />
          {i === 1 && (
            <ul className={s.stamps} aria-label="The four targets, named">
              {targets.map((tg) => (
                <li key={tg.id}><b>{TARGET_ABBR[tg.id]}</b> {tg.title}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

/** The parent framework, and the one environment this record fixes. */
function ParentFrame({ targets }: { targets: FitTarget[] }) {
  return (
    <figure className={s.parent}>
      <div className={s.parentFrame}>
        <p className={s.parentLabel}><b>Person–Environment fit</b> <span>the parent framework</span></p>
        <div className={s.parentBody}>
          <div className={s.parentWho}>
            <Bust mark={0} className={s.parentBust} />
            <span>a person</span>
          </div>
          <svg className={s.parentArrows} viewBox="0 0 120 110" aria-hidden="true">
            <path d={hand.curve([[8, 28], [46, 18], [88, 24], [112, 30]], { seed: 21, wander: 0.5 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(112, 30, 0.35, { size: 9, seed: 22 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(8, 28, Math.PI - 0.3, { size: 9, seed: 23 })} filter="url(#folio-pencil)" />
            <path d={hand.curve([[8, 84], [46, 92], [88, 86], [112, 80]], { seed: 24, wander: 0.5 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(112, 80, -0.35, { size: 9, seed: 25 })} filter="url(#folio-pencil)" />
            <path d={hand.arrowHead(8, 84, Math.PI + 0.3, { size: 9, seed: 26 })} filter="url(#folio-pencil)" />
          </svg>
          <ul className={s.parentEnv} aria-label="Some of the environments a person can be compared with">
            {targets.map((t, k) => (
              <li key={t.id} data-on={k === 0 || undefined}>
                <TargetArt index={k} on={k === 0} />
                <span>{k === 0 ? "the organisation" : t.title.replace("Person–", "").toLowerCase()}</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className={s.parentForms} aria-label="The two forms of correspondence the parent names">
          <li>demands ↔ abilities</li>
          <li>needs ↔ supplies</li>
        </ul>
      </div>
      <figcaption>
        <Glyph g="▲" /> A teaching drawing. The parent framework asks about correspondence with an environment; a few are drawn. P–O fit fixes the environment as the organisation, and the parent&rsquo;s two forms of correspondence carry over.
      </figcaption>
    </figure>
  );
}

export function POExperience({ record: r }: { record: TheoryRecord }) {
  const targets = r.fitTargets!;
  const asa = r.pathways![0];
  const parent = r.relatedTo![0];
  const parentRecord = RECORDS.find((x) => x.id === parent.recordId);

  const opening = (
    <header className={s.opening}>
      <div className={s.openingHead}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>Person&ndash;<em>Organisation</em> Fit</h1>
      </div>
      <div className={s.openingSide}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>&ldquo;the people make the place&rdquo; &mdash; Schneider, 1987</Margin>
      </div>
      <figure className={s.field}>
        <picture>
          <source media="(max-width: 760px)" srcSet={`${HERO}/po-hero-stack.webp`} />
          <img
            src={`${HERO}/po-hero.webp`}
            srcSet={`${HERO}/po-hero-900.webp 900w, ${HERO}/po-hero.webp 1600w`}
            sizes="(max-width: 760px) 100vw, 96vw"
            width={1600}
            height={560}
            alt="A coloured-pencil drawing of one room shown three times, left to right, each with a pennant over it and a doorway in its base. In the first, twelve people of four kinds — marked on the chest with a ring, a bar, a cross or a chevron, and hatched teal, red, ochre or violet — stand mixed together in two rows, the back wall washed in a muddle of all four colours, with a mixed crowd waiting in the street below. In the second, ring people have come through the door and outnumber the rest, three more ring people stand at the door, and two faint outlines in the street mark chevron people who have left. In the third, everyone in the room carries the ring mark, the wall is washed in teal alone, and the street holds only eight faint outlines of people who are no longer there."
            fetchPriority="high"
          />
        </picture>
        <ol className={s.moments}>
          <li><b>Before</b> Twelve people, four kinds. A mixed wall.</li>
          <li><b>After one round</b> Rings have come through the door; the outlines are people who left.</li>
          <li><b>After three rounds</b> One kind. The wall has taken its colour.</li>
        </ol>
        <figcaption className={s.fieldCaption}>
          <Glyph g="▲" /> Original teaching drawing of a made-up toy, run on this page. The marks stand in for &ldquo;something a person holds important&rdquo;; the outlines are people who left. It shows what three quiet filters do when they lean the same way &mdash; not how fast, or how far, a real organisation sorts.
        </figcaption>
      </figure>
      <ul className={s.facts} aria-label="The theory at a glance">
        {r.facts.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Person–Organisation Fit">
      {/* 01 · two corrections before the literature */}
      <Chapter id="name" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">{r.headings!.terminology.toc}</Kicker>
          <h2 className={s.h2}>Call it <em>Person&ndash;Organisation</em> fit</h2>
          <Rich as="p" className={s.headLede} html={r.terminologyLede!} />
        </div>
        <Naming items={r.terminology!} targets={targets} />
      </Chapter>

      {/* 02 · a narrowing of a broader framework */}
      <Chapter id="sits" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">{r.headings!.relatedTo.toc}</Kicker>
          <h2 className={s.h2}>This sits inside a <em>bigger framework</em></h2>
          <Rich as="p" className={s.headLede} html={r.relatedToLede!} />
        </div>
        <div className={s.sits}>
          <ParentFrame targets={targets} />
          <article className={s.sitsText}>
            <p className={s.smallHead}>this record {parent.relation}</p>
            {parentRecord && (
              <Link className={s.parentLink} href={recordHref(parentRecord)}>
                <span>{KIND[parentRecord.kind].label}</span> {parentRecord.title}
              </Link>
            )}
            <Rich as="p" className={s.sitsBody} html={parent.body} />
          </article>
        </div>
      </Chapter>

      {/* 03 · the question is not whether someone can do the job */}
      <Chapter id="idea" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">{r.headings!.idea.toc}</Kicker>
          <h2 className={s.h2}>Compatibility with a <em>particular employer</em></h2>
        </div>
        <div className={s.idea}>
          <Rich as="p" className={s.ideaLede} html={r.ideaLede!} />
          <div className={s.ideaFig} aria-hidden="true">
            <Bust mark={0} className={s.ideaBust} />
            <svg viewBox="0 0 120 50">
              <path d={hand.curve([[6, 30], [34, 18], [78, 22], [108, 26]], { seed: 31, wander: 0.6 })} filter="url(#folio-pencil)" />
              <path d={hand.arrowHead(108, 26, 0.2, { size: 10, seed: 32 })} filter="url(#folio-pencil)" />
            </svg>
            <TargetArt index={0} on className={s.ideaTarget} />
          </div>
        </div>
      </Chapter>

      {/* 04 · the room you can run */}
      <Chapter id="asa" density="rich" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">{asa.title}</Kicker>
          <h2 className={s.h2}>How organisations come to <em>resemble themselves</em></h2>
          <div className={s.headLede}>
            <Rich as="p" html={r.pathwaysLede!} />
            <Rich as="p" html={asa.blurb} />
          </div>
        </div>
        <SortingRoom steps={asa.steps} />
        <div className={s.caution}>
          <p className={s.smallHead}>The uncomfortable part</p>
          <Rich as="p" html={r.pathwaysCaution!} />
        </div>
      </Chapter>

      {/* 05 · alike, or fitting together */}
      <Chapter id="two" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">{r.headings!.categories.toc}</Kicker>
          <h2 className={s.h2}>Two quite different ways of <em>fitting</em></h2>
          <Rich as="p" className={s.headLede} html={r.categoriesLede!} />
        </div>
        <TwoFits categories={r.categories!} note={r.categoriesNote!} />
      </Chapter>

      {/* 06 · a computed comparison, or a judgement */}
      <Chapter id="measure" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="06">{r.headings!.models.toc}</Kicker>
          <h2 className={s.h2}>Which fit are you <em>actually measuring</em>?</h2>
          <Rich as="p" className={s.headLede} html={r.modelsLede!} />
        </div>
        <Measuring models={r.models!} facets={r.demo!.facets!} facetLabel={r.demo!.label} facetCaption={r.demo!.caption} />
        <Rich as="p" className={s.synthesis} html={r.modelsNote!} />
      </Chapter>

      {/* 07 · one person, four places to be compared with */}
      <Chapter id="targets" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="07">{r.headings!.fitTargets.toc}</Kicker>
          <h2 className={s.h2}>P&ndash;O is one target among <em>several</em></h2>
          <p className={s.headLede}>Kristof&rsquo;s review separates four targets of fit. The person stays the same; what they are compared with does not.</p>
        </div>
        <Targets items={targets} />
      </Chapter>

      {/* 08 · the trail */}
      <Chapter id="trail" density="scholarly" className={s.band}>
        <CodaHead kicker="08 · The trail" title="Seven works, thirty-six years">
          <p>{r.trailLede}</p>
          <p>{r.originsNote}</p>
        </CodaHead>
        <Trail nodes={r.origins} />
      </Chapter>

      {/* 09 · limits — quieter */}
      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="09 · Do not conclude" title={<>Shortcuts the literature <em>does not license</em>.</>}>
          <Rich as="p" html={r.oversimplificationsLede} />
        </CodaHead>
        <div className={s.limits}>
          <div>
            <p className={s.smallHead}>Do not conclude</p>
            <Cautions items={r.oversimplifications} />
          </div>
          <div>
            <p className={s.smallHead}>Still open</p>
            <OpenQuestions items={r.qualifications} />
          </div>
        </div>
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="10 · Sources" title={r.minimumReadingLabel ?? "If you read four things"} />
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" } as CSSProperties}>Also drawn on</p>
        <SourceShelf items={r.fullSources.filter((f) => !r.minimumReading.some((m) => m.citation === f.citation))} start={r.minimumReading.length + 1} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="11 · Provenance" title="Where every claim came from">
          <p>The room, its four kinds of person and its three rules, the two pieces that fit or do not, the unlabelled profiles and every drawing on this page are constructed teaching material (▲), written or drawn for this record. The colour of the wall follows the mix of people in the toy; it carries a proportion in a made-up room, not a measurement.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

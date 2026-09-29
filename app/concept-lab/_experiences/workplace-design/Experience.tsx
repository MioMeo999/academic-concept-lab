import type { CSSProperties } from "react";
import type { Disambiguation, TheoryRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, Trail } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import * as hand from "../../_folio/hand";
import { PlanBase, People } from "./Plan";
import { RoomMixer, Tradeoff, WorkspaceStress } from "./Figures";
import { SPARSE } from "./geometry";
import s from "./wp.module.css";

/* ---------------------------------------------------------------------------
   Workplace Design: the physical environment — THE ROOM IS A WORK CONDITION.

   Two literatures answer to this name and only one is about the room you are
   sitting in, so the page begins by putting a wall between them. Then it
   draws the room: one office plan, seen from above, that every later figure
   re-reads — as six conditions that do not move together, as the place where
   one worker's effort goes up while the work stays the same, and as a set of
   partitions that come down. The opening is that plan on five sheets of
   tracing paper.

   Every drawing is a teaching construction; none is a measurement.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "two", num: "01", label: "Two names" },
  { id: "idea", num: "02", label: "Idea" },
  { id: "elements", num: "03", label: "Elements" },
  { id: "mechanism", num: "04", label: "Mechanism" },
  { id: "tradeoff", num: "05", label: "Trade-off" },
  { id: "trail", num: "06", label: "Trail" },
  { id: "limits", num: "07", label: "Limits" },
  { id: "sources", num: "08", label: "Sources" },
  { id: "provenance", num: "09", label: "Provenance" },
];

const HERO = "/visual-language/theories/wp";
const SHEETS: [string, string][] = [
  ["The room", "walls, windows, door, desks"],
  ["The people", "who is in it"],
  ["The sound", "and where it carries"],
  ["Sight lines", "who could see whom"],
  ["Light and warmth", "at the windows"],
];

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 6, wander = 1.2) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

/** The two literatures, on either side of a wall — with a doorway where they meet. */
function TwoLiteratures({ d }: { d: Disambiguation }) {
  const rows = [78, 128, 178, 228, 278, 328];
  return (
    <div className={s.split}>
      <svg className={s.splitFig} data-at="this" viewBox="0 0 640 400" aria-hidden="true">
        <PlanBase />
        <People ids={SPARSE} />
      </svg>

      <div className={s.wallSplit} aria-hidden="true">
        <svg className={s.wallV} viewBox="0 0 40 400" preserveAspectRatio="none">
          <path d={L(20, 6, 20, 150, 1, 8, 1.4) + L(20, 250, 20, 394, 2, 8, 1.4)} filter="url(#folio-graphite)" />
          <path className={s.jamb} d={L(10, 150, 30, 150, 3, 2, 0.6) + L(10, 250, 30, 250, 4, 2, 0.6)} filter="url(#folio-graphite)" />
        </svg>
        <svg className={s.wallH} viewBox="0 0 400 40" preserveAspectRatio="none">
          <path d={L(6, 20, 150, 20, 1, 8, 1.4) + L(250, 20, 394, 20, 2, 8, 1.4)} filter="url(#folio-graphite)" />
          <path className={s.jamb} d={L(150, 10, 150, 30, 3, 2, 0.6) + L(250, 10, 250, 30, 4, 2, 0.6)} filter="url(#folio-graphite)" />
        </svg>
      </div>

      <svg className={s.splitFig} data-at="not" viewBox="0 0 640 400" aria-hidden="true">
        <path className={s.cardEdge} d={L(150, 36, 490, 36, 11, 8, 1.4) + L(490, 36, 490, 372, 12, 8, 1.4) + L(490, 372, 150, 372, 13, 8, 1.4) + L(150, 372, 150, 36, 14, 8, 1.4)} filter="url(#folio-graphite)" />
        <path className={s.cardInk} d={hand.ring(320, 52, 9, 9, { seed: 15 })} filter="url(#folio-pencil)" />
        <path className={s.cardInk} d={L(190, 84, 330, 84, 16, 5, 0.8) + L(190, 92, 290, 92, 17, 4, 0.8)} filter="url(#folio-pencil)" />
        {rows.map((y, i) => (
          <g key={y}>
            <path className={s.cardInk} d={L(190, y + 24, 214, y + 24, 20 + i, 2, 0.5) + L(214, y + 24, 214, y + 48, 30 + i, 2, 0.5) + L(214, y + 48, 190, y + 48, 40 + i, 2, 0.5) + L(190, y + 48, 190, y + 24, 50 + i, 2, 0.5)} filter="url(#folio-pencil)" />
            <path className={s.cardTick} d={hand.curve([[194, y + 37], [201, y + 44], [212, y + 27]], { seed: 60 + i, wander: 0.4 })} filter="url(#folio-pencil)" style={{ opacity: i % 2 ? 0 : 1 }} />
            <path className={s.cardInk} d={L(232, y + 36, 232 + 120 + (i % 3) * 28, y + 36, 70 + i, 4, 0.8)} filter="url(#folio-pencil)" />
          </g>
        ))}
      </svg>

      <article className={s.splitThis}>
        <h3>{d.covered.title}</h3>
        <p className={s.splitBlurb}>{d.covered.blurb}</p>
        <ul className={s.chips}>{d.covered.items.map((x) => <li key={x}>{x}</li>)}</ul>
      </article>

      <article className={s.splitNot}>
        <h3>{d.notCovered.title}</h3>
        <p className={s.splitBlurb}>{d.notCovered.blurb}</p>
        <ul className={s.chips}>{d.notCovered.items.map((x) => <li key={x}>{x}</li>)}</ul>
        <p className={s.smallHead} style={{ marginTop: "1.6rem" } as CSSProperties}>Where to go instead</p>
        <SourceShelf items={d.notCovered.sources} />
      </article>

      <p className={s.splitNote}><Glyph g="✦" /> <span className={s.badge}>Concept Lab reading</span> <Rich html={d.note} /></p>
    </div>
  );
}

/** A desk, a distance, a sound — and a deadline, in the same sense. */
function IdeaFigure() {
  return (
    <div className={s.ideaFig} aria-hidden="true">
      <div className={s.ideaCell}>
        <svg viewBox="0 0 140 100">
          <path d={L(20, 40, 120, 40, 1, 5, 0.6) + L(120, 40, 120, 74, 2, 3, 0.6) + L(120, 74, 20, 74, 3, 5, 0.6) + L(20, 74, 20, 40, 4, 3, 0.6) + L(56, 46, 84, 46, 5, 3, 0.4) + L(84, 46, 84, 60, 6, 2, 0.4) + L(84, 60, 56, 60, 7, 3, 0.4) + L(56, 60, 56, 46, 8, 2, 0.4)} filter="url(#folio-pencil)" />
          <path d={hand.ring(70, 88, 8, 8, { seed: 9 })} filter="url(#folio-pencil)" />
        </svg>
        <span>the desk</span>
      </div>
      <div className={s.ideaCell}>
        <svg viewBox="0 0 140 100">
          <path d={hand.ring(28, 50, 12, 12, { seed: 11 })} filter="url(#folio-pencil)" />
          <path d={hand.ring(112, 50, 12, 12, { seed: 12 })} filter="url(#folio-pencil)" />
          <path d={L(46, 50, 94, 50, 13, 4, 0.5)} filter="url(#folio-pencil)" />
          <path d={hand.arrowHead(46, 50, Math.PI, { size: 8, seed: 14 }) + hand.arrowHead(94, 50, 0, { size: 8, seed: 15 })} filter="url(#folio-pencil)" />
        </svg>
        <span>the distance to the next person</span>
      </div>
      <div className={s.ideaCell}>
        <svg viewBox="0 0 140 100">
          <path d={hand.ring(100, 50, 13, 13, { seed: 21 })} filter="url(#folio-pencil)" />
          {[26, 42, 58].map((r, i) => <path key={r} d={hand.curve(Array.from({ length: 7 }, (_, k) => { const t = Math.PI - 0.7 + (k / 6) * 1.4; return [100 + Math.cos(t) * r, 50 + Math.sin(t) * r] as [number, number]; }), { seed: 22 + i, wander: 0.3 })} style={{ opacity: 0.9 - i * 0.22 }} filter="url(#folio-pencil)" />)}
        </svg>
        <span>the sound reaching your ear</span>
      </div>
      <p className={s.ideaLink}>in the same sense as</p>
      <div className={s.ideaCell} data-kind="task">
        <svg viewBox="0 0 140 100">
          <path d={hand.ring(70, 50, 30, 30, { seed: 31 })} filter="url(#folio-pencil)" />
          <path d={L(70, 50, 70, 28, 32, 3, 0.4) + L(70, 50, 88, 58, 33, 3, 0.4)} filter="url(#folio-pencil)" />
        </svg>
        <span>a deadline</span>
      </div>
    </div>
  );
}

export function WPExperience({ record: r }: { record: TheoryRecord }) {
  const dis = r.disambiguation!;
  const walk = r.pathways![0];

  const opening = (
    <header className={s.opening}>
      <div className={s.openingHead}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>
          Workplace <em>Design</em>
          <span className={s.titleSub}><span className={s.srOnly}>: </span>The Physical Environment</span>
        </h1>
      </div>
      <div className={s.openingSide}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>one room · five ways to read it</Margin>
      </div>
      <figure className={s.field}>
        <picture>
          <source media="(max-width: 760px)" srcSet={`${HERO}/wp-hero-stack.webp`} />
          <img
            src={`${HERO}/wp-hero.webp`}
            srcSet={`${HERO}/wp-hero-900.webp 900w, ${HERO}/wp-hero.webp 1600w`}
            sizes="(max-width: 760px) 100vw, 96vw"
            width={1600}
            height={560}
            alt="A coloured-pencil drawing of one office plan drawn five times on sheets of tracing paper laid one over another. On the first, the room: walls, three windows along the top, a door at the bottom with its swing, and twelve desks with monitors. On the second, twelve people seen from above as heads and shoulders in teal. On the third, vermilion rings and drifting marks spreading from four people who are talking. On the fourth, violet lines running between neighbouring seats and small fans of sight. On the fifth, yellow rays coming in at the windows, a warm ochre band along the window wall and a cool blue patch by the door."
            fetchPriority="high"
          />
        </picture>
        <ol className={s.sheets}>
          {SHEETS.map(([name, sub], i) => <li key={name}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><b>{name}</b> {sub}</li>)}
        </ol>
        <figcaption className={s.fieldCaption}>
          <Glyph g="▲" /> Original teaching drawing. One office, drawn on five sheets of tracing paper so that each condition of the room can be read alone or through the others. It depicts no real office, and no line, ring or wash on it is a measurement.
        </figcaption>
      </figure>
      <ul className={s.facts} aria-label="The theory at a glance">
        {r.facts.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Workplace Design">
      {/* 01 · two literatures, one wall */}
      <Chapter id="two" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">{r.headings!.disambiguation.toc}</Kicker>
          <h2 className={s.h2}>Two literatures answer to &ldquo;<em>workplace design</em>&rdquo;</h2>
          <Rich as="p" className={s.headLede} html={dis.flag} />
        </div>
        <TwoLiteratures d={dis} />
      </Chapter>

      {/* 02 · the room as a condition of work */}
      <Chapter id="idea" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">{r.headings!.idea.toc}</Kicker>
          <h2 className={s.h2}>The room is a <em>work condition</em></h2>
        </div>
        <div className={s.idea}>
          <Rich as="p" className={s.ideaLede} html={r.ideaLede!} />
          <IdeaFigure />
        </div>
      </Chapter>

      {/* 03 · six conditions of one room, and two set apart */}
      <Chapter id="elements" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">{r.headings!.expansions.toc}</Kicker>
          <h2 className={s.h2}>What counts as the <em>physical environment</em></h2>
          <p className={s.headLede}>{r.expansionsLede}</p>
        </div>
        <RoomMixer elements={r.expansions!} />
      </Chapter>

      {/* 04 · how a room becomes a performance problem */}
      <Chapter id="mechanism" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">{walk.title}</Kicker>
          <h2 className={s.h2}>How a room becomes a <em>performance problem</em></h2>
          <div className={s.headLede}>
            <Rich as="p" html={r.pathwaysLede!} />
            <p>{walk.blurb}</p>
          </div>
        </div>
        <WorkspaceStress steps={walk.steps} caption="A teaching drawing of a proposed mechanism. The work and its effort are drawn as lengths, but no length is a measurement, and no direction is claimed for performance or wellbeing beyond &ldquo;affected&rdquo;." />
        <div className={s.caution}>
          <p className={s.smallHead}>A proposed mechanism</p>
          <Rich as="p" html={r.pathwaysCaution!} />
        </div>
      </Chapter>

      {/* 05 · the partitions come down */}
      <Chapter id="tradeoff" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">{r.headings!.interactions.toc}</Kicker>
          <h2 className={s.h2}>The trade-off the <em>open plan</em> cannot escape</h2>
          <p className={s.headLede}>{r.interactionsLede}</p>
        </div>
        <Tradeoff demo={r.demo!} interactions={r.interactions!} />
      </Chapter>

      {/* 06 · the trail */}
      <Chapter id="trail" density="scholarly" className={s.band}>
        <CodaHead kicker="06 · The trail" title="Seven works, thirty-four years">
          <p>{r.trailLede}</p>
          <p>{r.originsNote}</p>
        </CodaHead>
        <Trail nodes={r.origins} />
      </Chapter>

      {/* 07 · limits — quieter */}
      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="07 · Do not conclude" title={<>Conclusions the literature <em>does not support</em>.</>}>
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
        <CodaHead kicker="08 · Sources" title={r.minimumReadingLabel ?? "If you read four things"} />
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" } as CSSProperties}>Also drawn on</p>
        <SourceShelf items={r.fullSources.filter((f) => !r.minimumReading.some((m) => m.citation === f.citation))} start={r.minimumReading.length + 1} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · Provenance" title="Where every claim came from">
          <p>The office plan, its people, the five sheets of tracing paper, the room mixer and its two dials, the workspace-stress walk and the enclosure figure are constructed teaching material (▲), written or drawn for this record. No mark on them is a measurement, and the record gives no room settings for any dimension it names.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

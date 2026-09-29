import type { ASACard, GTTMRecordContent, TheoryRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, Trail, EvidenceLedger, BoundaryMap } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import * as hand from "../../_folio/hand";
import { Architecture, LensRoll, Reductions, SpanSteps, StructureRoll } from "./Figures";
import { Notes, RelationOverlay, Roll } from "./Roll";
import { Tree } from "./Tree";
import s from "./gttm.module.css";

/* ---------------------------------------------------------------------------
   A Generative Theory of Tonal Music — ONE SURFACE, FOUR QUESTIONS.

   The record's teaching phrase is sixteen notes in C major, and nothing on this
   page changes how it sounds. What changes is what is drawn around it: brackets
   for where events belong together, dots for which positions are stronger, a
   tree for which event stands for a span, arcs for how tones elaborate or
   progress. The theory's claim is that these descriptions are related but not
   the same — so the page keeps the phrase still and lets the reader move the
   question. The opening drawing is all four at once, around the notes.

   The phrase, its heads, its trees and its reductions are the record's own
   constructed teaching material; none of it is a source analysis.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "phrase", num: "01", label: "Phrase" },
  { id: "generative", num: "02", label: "Generative" },
  { id: "structure", num: "03", label: "Structure" },
  { id: "reduction", num: "04", label: "Reduction" },
  { id: "prolongation", num: "05", label: "Prolongation" },
  { id: "architecture", num: "06", label: "Architecture" },
  { id: "evidence", num: "07", label: "Evidence" },
  { id: "scope", num: "08", label: "Scope" },
  { id: "lineage", num: "09", label: "Lineage" },
  { id: "limits", num: "10", label: "Limits" },
  { id: "sources", num: "11", label: "Sources" },
  { id: "provenance", num: "12", label: "Provenance" },
];

const HERO = "/visual-language/theories/gttm";

/** a card, set as a small heading and a sentence, in the colour the record gives it */
function Cards({ items, className }: { items: ASACard[]; className?: string }) {
  return (
    <ul className={[s.cards, className].filter(Boolean).join(" ")}>
      {items.map((c) => (
        <li key={c.label} style={{ "--hue": c.colour } as React.CSSProperties}>
          <p className={s.cardKick}>{c.label}</p>
          <p>{c.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** the phrase, note by note — the numbering every other passage refers back to */
function SurfaceRow({ spec }: { spec: GTTMRecordContent["analysis"]["surface"] }) {
  return (
    <div className={s.surface}>
      <ol className={s.surfaceRow} aria-label="The sixteen events: note, event number and harmony">
        {spec.events.map((e) => (
          <li key={e.id}><b>{e.note}</b><span>{e.id}</span><i>{e.harmony}</i></li>
        ))}
      </ol>
      <dl className={s.spec}>
        {([["key", spec.key], ["meter", spec.meter], ["tempo", spec.tempo], ["timbre", spec.timbre], ["gain", spec.gain], ["harmony", spec.harmony]] as [string, string][]).map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </div>
  );
}

/** surface → structure ← listener, and the four things a listener does */
function Triad({ generative, listener }: { generative: ASACard[]; listener: ASACard[] }) {
  return (
    <div className={s.triad}>
      <ol className={s.triadRow}>
        {generative.map((c, i) => (
          <li key={c.label} style={{ "--hue": c.colour } as React.CSSProperties}>
            <p className={s.cardKick}>{c.label}</p>
            <p>{c.body}</p>
            {i < generative.length - 1 && (
              <svg className={s.triadArrow} viewBox="0 0 60 24" aria-hidden="true">
                <path d={hand.curve([[4, 12], [26, 8], [46, 14], [54, 12]], { seed: 3 + i, wander: 0.5 })} filter="url(#folio-pencil)" />
                <path d={hand.arrowHead(54, 12, i === 0 ? 0 : Math.PI, { size: 9, seed: 6 + i })} filter="url(#folio-pencil)" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <ol className={s.loop} aria-label="What the idealised listener does">
        {listener.map((c) => (
          <li key={c.label} style={{ "--hue": c.colour } as React.CSSProperties}>
            <p className={s.cardKick}>{c.label}</p>
            <p>{c.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** what came before and around the theory: four influences that keep their own names */
function Lineage({ nodes }: { nodes: ASACard[] }) {
  return (
    <ul className={s.lineage}>
      {nodes.map((c) => (
        <li key={c.label} style={{ "--hue": c.colour } as React.CSSProperties}>
          <p className={s.cardKick}>{c.label}</p>
          <p>{c.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function GTTMExperience({ record: r }: { record: TheoryRecord }) {
  const d = r.gttm!;
  const a = d.analysis;

  const opening = (
    <header className={s.opening}>
      <div className={s.openingHead}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>A <em>Generative</em> Theory of Tonal Music</h1>
      </div>
      <div className={s.openingSide}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>one surface · four questions</Margin>
      </div>
      <figure className={s.field}>
        <picture>
          <source media="(max-width: 760px)" srcSet={`${HERO}/gttm-hero-stack.webp`} />
          <img
            src={`${HERO}/gttm-hero.webp`}
            srcSet={`${HERO}/gttm-hero-900.webp 900w, ${HERO}/gttm-hero.webp 1600w`}
            sizes="(max-width: 760px) 100vw, 96vw"
            width={1600}
            height={620}
            alt="A coloured-pencil drawing of a sixteen-note phrase as a row of pencilled noteheads, with four structures drawn around it. Above the notes, from the top: plum arcs and bars marking four tonal regions and the progression between them; a red tree of heads standing for spans; nested teal brackets grouping the notes in fours, eights and sixteen. Below the notes, rows of gold dots for metrical strength, stacking higher on the beats that begin bars and the phrase."
            fetchPriority="high"
          />
        </picture>
        <ol className={s.bands}>
          <li><b>Tension · relation</b> how tones elaborate or progress</li>
          <li><b>Importance</b> which events head larger spans</li>
          <li><b>Grouping</b> where events belong together</li>
          <li><b>Meter</b> which positions are stronger</li>
        </ol>
        <figcaption className={s.fieldCaption}>
          <Glyph g="▲" /> Original teaching drawing of the record&rsquo;s constructed phrase. It shows four separate descriptions of one surface; it is not a source analysis, and every label is live HTML.
        </figcaption>
      </figure>
      <ul className={s.facts} aria-label="The theory at a glance">
        {r.facts.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="A Generative Theory of Tonal Music">
      {/* 01 · one surface, four questions */}
      <Chapter id="phrase" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">The phrase</Kicker>
          <h2 className={s.h2}>One surface. <em>Four questions.</em></h2>
          <Rich as="p" className={s.headLede} html={d.opening.lede} />
        </div>
        <LensRoll analysis={a} lenses={d.opening.lenses} note={d.opening.note} />
        <SurfaceRow spec={a.surface} />
      </Chapter>

      {/* 02 · what generative means, and whose ear */}
      <Chapter id="generative" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">Generative</Kicker>
          <h2 className={s.h2}><em>Generative</em> does not mean it composes.</h2>
          <p className={s.headLede}>{d.generative.lede}</p>
        </div>
        <Triad generative={d.generative.cards} listener={d.listener.cards} />
        <p className={s.note}>{d.generative.note}</p>
        <p className={s.subLede}>{d.listener.lede}</p>
        <p className={s.note}>{d.listener.note}</p>
      </Chapter>

      {/* 03 · grouping, meter, and what a rule can and cannot do */}
      <Chapter id="structure" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">Grouping and meter</Kicker>
          <h2 className={s.h2}>Two structures, <em>not one segmentation</em>.</h2>
          <p className={s.headLede}>{d.groupingMeter.lede}</p>
        </div>
        <StructureRoll analysis={a} />
        <div className={s.pair}>
          <article>
            <p className={s.smallHead}>Grouping</p>
            <ul>{d.groupingMeter.grouping.map((x) => <li key={x}>{x}</li>)}</ul>
            <ul className={s.spans}>{[...a.grouping.local, ...a.grouping.higher].map((x) => <li key={x}>{x}</li>)}</ul>
            <p className={s.mono}>boundaries: {a.grouping.boundaries.join(" · ")}</p>
          </article>
          <article>
            <p className={s.smallHead}>Meter</p>
            <ul>{d.groupingMeter.meter.map((x) => <li key={x}>{x}</li>)}</ul>
            <ul className={s.spans}>{a.meter.levels.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className={s.mono}>{a.meter.tactus}</p>
            <ul className={s.spans}>{a.meter.strengths.map((x) => <li key={x}>{x}</li>)}</ul>
          </article>
        </div>
        <p className={s.note}>{d.groupingMeter.note}</p>

        <div className={s.subhead}>
          <p className={s.smallHead}>Rules</p>
          <h3 className={s.h3}>Well-formed is not the same as <em>preferred</em>.</h3>
          <p className={s.subLede}>{d.rules.lede}</p>
        </div>
        <Cards items={d.rules.cards} className={s.four} />
        <p className={s.note}>{d.rules.note}</p>
      </Chapter>

      {/* 04 · spans, heads and reductions */}
      <Chapter id="reduction" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">Time spans and reduction</Kicker>
          <h2 className={s.h2}>Reduction changes the level of description. It does not <em>delete notes</em>.</h2>
          <p className={s.headLede}>{d.reduction.lede}</p>
        </div>

        <div className={s.subhead}>
          <p className={s.smallHead}>Time-span reduction</p>
          <h3 className={s.h3}>Which event <em>stands for</em> a span?</h3>
          <p className={s.subLede}>{d.spans.lede}</p>
        </div>
        <SpanSteps analysis={a} cards={d.spans.cards} />
        <div className={s.pair}>
          <article>
            <p className={s.smallHead}>The spans</p>
            <ul className={s.spans}>{a.timeSpans.spans.map((x) => <li key={x}>{x}</li>)}</ul>
          </article>
          <article>
            <p className={s.smallHead}>The heads</p>
            <ul className={s.spans}>{a.timeSpans.heads.map((x) => <li key={x}>{x}</li>)}</ul>
          </article>
        </div>
        <Tree node={a.timeSpans.tree} label="The time-span reduction tree of the phrase" />
        <p className={s.note}>{a.timeSpans.dependency}</p>
        <p className={s.note}>{d.spans.note}</p>

        <div className={s.subhead}>
          <p className={s.smallHead}>Four levels of one phrase</p>
          <h3 className={s.h3}>Listen for what each level <em>foregrounds</em>.</h3>
        </div>
        <Reductions analysis={a} />
        <p className={s.note}>{d.reduction.note}</p>
      </Chapter>

      {/* 05 · elaboration and progression */}
      <Chapter id="prolongation" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">Prolongational reduction</Kicker>
          <h2 className={s.h2}>How tones <em>elaborate</em> and <em>progress</em>.</h2>
          <p className={s.headLede}>{d.prolongation.lede}</p>
        </div>
        <figure className={s.relationFigure}>
          <Roll short label="The sixteen notes with four tonal regions marked above them — I, IV, V, I — a local elaboration inside the first, and arrows for the progression from head to head.">
            <RelationOverlay events={a.surface.events} />
            <Notes events={a.surface.events} heads={[1, 5, 9, 16]} />
          </Roll>
        </figure>
        <div className={s.pair}>
          <article>
            <p className={s.smallHead}>The relations</p>
            <ul className={s.spans}>{a.prolongation.relations.map((x) => <li key={x}>{x}</li>)}</ul>
          </article>
          <article>
            <p className={s.smallHead}>How to read them</p>
            <p className={s.body}>{a.prolongation.interpretation}</p>
          </article>
        </div>
        <Tree node={a.prolongation.tree} label="The prolongational relation map of the phrase" />
        <Cards items={d.prolongation.cards} className={s.four} />
        <p className={s.note}>{d.prolongation.note}</p>
      </Chapter>

      {/* 06 · a map, not a movie */}
      <Chapter id="architecture" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="06">The whole</Kicker>
          <h2 className={s.h2}>An interacting architecture, not <em>a pipeline</em>.</h2>
          <p className={s.headLede}>{d.finalModel.lede}</p>
        </div>
        <Architecture stages={d.finalModel.stages} />
        <p className={s.note}>{d.finalModel.note}</p>
      </Chapter>

      {/* 07 · evidence */}
      <Chapter id="evidence" density="scholarly" className={s.band}>
        <CodaHead kicker="07 · Evidence" title={<>Component by component — <em>not</em> the whole at once.</>}>
          <p>{d.evidence.lede}</p>
        </CodaHead>
        <EvidenceLedger items={d.evidence.items} />
      </Chapter>

      {/* 08 · scope */}
      <Chapter id="scope" density="quiet" className={s.band}>
        <CodaHead kicker="08 · Scope" title={<>What GTTM explains — and <em>where it stops</em>.</>}>
          <p>{d.scope.lede}</p>
        </CodaHead>
        <BoundaryMap explains={d.scope.explains} stops={d.scope.stops} explainsLabel="GTTM explains" stopsLabel="GTTM does not explain" note={d.scope.note} />
      </Chapter>

      {/* 09 · lineage and the trail */}
      <Chapter id="lineage" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · Lineage" title={<>A conversation, not a march toward <em>confirmation</em>.</>}>
          <p>{d.lineage.lede}</p>
        </CodaHead>
        <Lineage nodes={d.lineage.nodes} />
        <p className={s.note}>{d.lineage.note}</p>
        <div className={s.trailWrap}>
          <CodaHead kicker="The trail" title="From Schenkerian thought to computational GTTM">
            <p>{r.trailLede}</p>
          </CodaHead>
          <Trail nodes={r.origins} />
        </div>
      </Chapter>

      {/* 10 · limits — quieter */}
      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="10 · Do not conclude" title={<>Shortcuts that turn a formal framework into <em>a listening algorithm</em>.</>}>
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
        <CodaHead kicker="11 · Sources" title={r.minimumReadingLabel ?? "If you read five things"} />
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" } as React.CSSProperties}>Also drawn on</p>
        <SourceShelf items={r.fullSources.filter((f) => !r.minimumReading.some((m) => m.citation === f.citation))} start={r.minimumReading.length + 1} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="12 · Provenance" title="Where every claim came from">
          <p>The sixteen-note phrase, its groups, its dots, its heads, its two trees, its four reductions and every drawing of them on this page are the record&rsquo;s constructed teaching material (▲), drawn again for this page. The sounds are the record&rsquo;s own events, with its own timing and synthesis. None of it is a source analysis or a claim about how any listener parses a phrase.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

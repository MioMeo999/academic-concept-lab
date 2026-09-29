import type { ASACard, TheoryRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, Trail, EvidenceLedger, BoundaryMap, BesideOtherLenses } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import * as hand from "../../_folio/hand";
import { Bistability, CuesPull, GroupFuse, MusicStreams, OldNew, SourceStream, StreamSplitter, Superposition, TwoQuestions } from "./Figures";
import s from "./asa.module.css";

/* ---------------------------------------------------------------------------
   Auditory Scene Analysis — ONE MIXTURE, SEVERAL STREAMS.

   The ear receives a single sum of everything that is sounding. The listener
   hears something else: streams, and fused sounds, and a melody that is
   available inside one of them. So the page draws one plane — time across,
   pitch up, a dash for every tone — and lets the reader change the connections
   drawn over it: a line across time, a brace at one moment, a cue pulling a tone
   toward one stream or the other. The opening is the whole argument in one
   drawing: the world, the ear, the streams.

   Everything that sounds is the record's own synthetic presets. Everything that
   is drawn is a teaching construction; none of it is a signal or a result.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "listen", num: "01", label: "Listen" },
  { id: "problem", num: "02", label: "Problem" },
  { id: "grouping", num: "03", label: "Grouping" },
  { id: "fusion", num: "04", label: "Fusion" },
  { id: "learned", num: "05", label: "Learned" },
  { id: "music", num: "06", label: "Music" },
  { id: "evidence", num: "07", label: "Evidence" },
  { id: "scope", num: "08", label: "Scope" },
  { id: "lineage", num: "09", label: "Lineage" },
  { id: "limits", num: "10", label: "Limits" },
  { id: "sources", num: "11", label: "Sources" },
  { id: "provenance", num: "12", label: "Provenance" },
];

const HERO = "/visual-language/theories/asa";
const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 6, wander = 1.1) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

/** A card, set as a small heading and a sentence, in the colour the record gives it. */
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

/** Where a stream can come from: the sound itself, from below; what the listener knows, from above; and where they are looking. */
function LearnedFigure() {
  return (
    <svg className={s.learnedSvg} viewBox="0 0 640 250" aria-hidden="true">
      <path className={s.learnedStream} d={[0, 1, 2, 3, 4, 5].map((k) => L(150 + k * 66, 120 + (k % 2 ? 6 : -6), 150 + k * 66 + 34, 120 + (k % 2 ? 6 : -6), 10 + k, 2, 0.4)).join(" ")} filter="url(#folio-pencil)" />
      <path className={s.learnedLine} d={hand.curve([[150, 120], [216, 126], [282, 114], [348, 126], [414, 114], [480, 126], [510, 120]], { seed: 20, wander: 0.5 })} filter="url(#folio-pencil)" />
      {/* from the sound, upward */}
      <path className={s.learnedArrow} d={hand.curve([[330, 226], [326, 196], [330, 158]], { seed: 21, wander: 0.5 }) + hand.arrowHead(330, 152, -Math.PI / 2, { size: 10, seed: 22 })} filter="url(#folio-pencil)" />
      {/* from what the listener knows, downward */}
      <path className={s.learnedArrow} d={hand.curve([[330, 20], [334, 52], [330, 88]], { seed: 23, wander: 0.5 }) + hand.arrowHead(330, 94, Math.PI / 2, { size: 10, seed: 24 })} filter="url(#folio-pencil)" />
      {/* where the listener is attending */}
      <path className={s.learnedSpot} d={hand.ring(480, 120, 64, 34, { seed: 25, wobble: 0.04 })} filter="url(#folio-pencil)" />
    </svg>
  );
}

/** What came after Bregman: one root and three branches that keep their own names. */
function LineageFigure({ nodes }: { nodes: ASACard[] }) {
  const [root, ...branches] = nodes;
  return (
    <div className={s.lineage}>
      <div className={s.lineageRoot} style={{ "--hue": root.colour } as React.CSSProperties}>
        <p className={s.cardKick}>{root.label}</p>
        <p>{root.body}</p>
      </div>
      <svg className={s.lineageLinks} viewBox="0 0 100 300" preserveAspectRatio="none" aria-hidden="true">
        {[42, 150, 258].map((y, i) => <path key={y} d={hand.curve([[0, 150], [46, 150 + (y - 150) * 0.2], [66, y], [100, y]], { seed: 30 + i, wander: 0.6 })} />)}
      </svg>
      <ul className={s.lineageBranches}>
        {branches.map((c) => (
          <li key={c.label} style={{ "--hue": c.colour } as React.CSSProperties}>
            <p className={s.cardKick}>{c.label}</p>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ASAExperience({ record: r }: { record: TheoryRecord }) {
  const d = r.asa!;
  const middle = d.opening.presets[1];

  const opening = (
    <header className={s.opening}>
      <div className={s.openingHead}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>Auditory <em>Scene</em> Analysis</h1>
      </div>
      <div className={s.openingSide}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>one mixture · several streams</Margin>
      </div>
      <figure className={s.field}>
        <picture>
          <source media="(max-width: 760px)" srcSet={`${HERO}/asa-hero-stack.webp`} />
          <img
            src={`${HERO}/asa-hero.webp`}
            srcSet={`${HERO}/asa-hero-900.webp 900w, ${HERO}/asa-hero.webp 1600w`}
            sizes="(max-width: 760px) 100vw, 96vw"
            width={1600}
            height={560}
            alt="A coloured-pencil drawing read from left to right. At the left, four sources make sound at once, each as a line with its own way of moving: a teal smooth wave, a red quicker wave, an ochre square wave and a violet line with sharp spikes. In the middle they converge into one dark line ringed with all four colours: the mixture that reaches the ear. At the right it opens, with question marks, into three separate rows of short dashes in teal, red and violet: the streams a listener hears."
            fetchPriority="high"
          />
        </picture>
        <ol className={s.stages}>
          <li><b>The world</b> Sources sound at once, each in its own way.</li>
          <li><b>The ear</b> One mixture arrives: their sum.</li>
          <li><b>The streams</b> The listener hears organised sound — which may or may not match the sources.</li>
        </ol>
        <figcaption className={s.fieldCaption}>
          <Glyph g="▲" /> Original teaching drawing. Nothing on it is a signal, a spectrogram or a result: it draws the problem the framework names — a mixture, and the organisation a listener makes of it.
        </figcaption>
      </figure>
      <ul className={s.facts} aria-label="The theory at a glance">
        {r.facts.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Auditory Scene Analysis">
      {/* 01 · listen first */}
      <Chapter id="listen" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">Listen first</Kicker>
          <h2 className={s.h2}>How many <em>streams</em> do you hear?</h2>
          <Rich as="p" className={s.headLede} html={d.opening.lede} />
        </div>
        <StreamSplitter presets={d.opening.presets} />
        <p className={s.note}>{d.opening.note}</p>

        <div className={s.subhead}>
          <p className={s.smallHead}>Same sound, two organisations</p>
          <h3 className={s.h3}>The stimulus does not change. The <em>organisation</em> can.</h3>
          <p className={s.subLede}>{d.bistability.lede}</p>
        </div>
        <Bistability events={middle.events} states={d.bistability.states} />
        <p className={s.note}>{d.bistability.note}</p>
      </Chapter>

      {/* 02 · the problem, and what a stream is */}
      <Chapter id="problem" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">The problem</Kicker>
          <h2 className={s.h2}>The ear gets <em>one mixture</em>.</h2>
          <div className={s.headLede}>
            <p>{r.ideaLede}</p>
            <p>{d.problem.lede}</p>
          </div>
        </div>
        <Superposition layers={d.problem.layers} />
        <p className={s.note}>{d.problem.note}</p>

        <div className={s.subhead}>
          <p className={s.smallHead}>Source and stream</p>
          <h3 className={s.h3}>A stream is not a <em>source</em>.</h3>
          <p className={s.subLede}>{d.source.lede}</p>
        </div>
        <SourceStream source={d.source.source} stream={d.source.stream} />
        <p className={s.note}>{d.source.note}</p>
      </Chapter>

      {/* 03 · two questions, many cues, and cues that pull */}
      <Chapter id="grouping" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">Grouping</Kicker>
          <h2 className={s.h2}>What belongs together — <em>across time</em>, and <em>at once</em>?</h2>
          <p className={s.headLede}>{d.grouping.lede}</p>
        </div>
        <TwoQuestions grouping={d.grouping} cues={d.cues} />
        <p className={s.note}>{d.grouping.note}</p>
        <p className={s.note}>{d.cues.lede}</p>
        <p className={s.note}>{d.cues.note}</p>

        <div className={s.subhead}>
          <p className={s.smallHead}>Cues collaborate, and compete</p>
          <h3 className={s.h3}>One tone. Four cues. <em>Two ways</em> to go.</h3>
          <p className={s.subLede}>{d.competition.lede}</p>
        </div>
        <CuesPull cards={d.competition.cards} note={d.competition.note} />
      </Chapter>

      {/* 04 · fuse, or stand apart; and old plus new */}
      <Chapter id="fusion" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">Simultaneous organisation</Kicker>
          <h2 className={s.h2}>Group, or <em>fuse</em>?</h2>
          <p className={s.headLede}>{d.groupFuse.lede}</p>
        </div>
        <GroupFuse presets={d.groupFuse.presets} question={d.groupFuse.question} />
        <p className={s.note}>{d.groupFuse.note}</p>

        <div className={s.subhead}>
          <p className={s.smallHead}>A heuristic for overlapping signals</p>
          <h3 className={s.h3}>Old <em>plus</em> new.</h3>
          <p className={s.subLede}>{d.oldNew.lede}</p>
        </div>
        <OldNew steps={d.oldNew.steps} />
        <p className={s.note}>{d.oldNew.note}</p>
      </Chapter>

      {/* 05 · learned, and attended */}
      <Chapter id="learned" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">Where organisation comes from</Kicker>
          <h2 className={s.h2}>Built in, learned, and <em>attended</em>.</h2>
          <p className={s.headLede}>{d.organisation.lede}</p>
        </div>
        <div className={s.learned}>
          <LearnedFigure />
          <div className={s.learnedLists}>
            <article>
              <p className={s.smallHead}>Primitive organisation</p>
              <ul>{d.organisation.primitive.map((x) => <li key={x}>{x}</li>)}</ul>
            </article>
            <article>
              <p className={s.smallHead}>Schema-based organisation</p>
              <ul>{d.organisation.schema.map((x) => <li key={x}>{x}</li>)}</ul>
            </article>
          </div>
        </div>
        <p className={s.note}>{d.organisation.note}</p>
        <div className={s.subhead}>
          <p className={s.smallHead}>Attention</p>
          <h3 className={s.h3}>Neither <em>pre-attentive</em> nor <em>chosen</em>.</h3>
          <p className={s.subLede}>{d.attention.lede}</p>
        </div>
        <Cards items={d.attention.cards} />
        <p className={s.note}>{d.attention.note}</p>
      </Chapter>

      {/* 06 · music inside streams */}
      <Chapter id="music" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="06">Music</Kicker>
          <h2 className={s.h2}>Music is heard <em>inside</em> streams.</h2>
          <p className={s.headLede}>{d.music.lede}</p>
        </div>
        <MusicStreams events={middle.events} cards={d.music.cards} />
        <p className={s.note}>{d.music.note}</p>
      </Chapter>

      {/* 07 · evidence */}
      <Chapter id="evidence" density="scholarly" className={s.band}>
        <CodaHead kicker="07 · Evidence" title={<>Five layers, <em>none</em> of them the whole proof.</>}>
          <p>{d.evidence.lede}</p>
        </CodaHead>
        <EvidenceLedger items={d.evidence.items} />
      </Chapter>

      {/* 08 · scope */}
      <Chapter id="scope" density="quiet" className={s.band}>
        <CodaHead kicker="08 · Scope" title={<>What ASA explains — and <em>where it stops</em>.</>}>
          <p>{d.scope.lede}</p>
        </CodaHead>
        <BoundaryMap explains={d.scope.explains} stops={d.scope.stops} explainsLabel="ASA explains" stopsLabel="ASA does not explain" note={d.scope.note} />
      </Chapter>

      {/* 09 · what came after, and the trail */}
      <Chapter id="lineage" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · Lineage" title={<>A branching history, not one march to <em>an algorithm</em>.</>}>
          <p>{d.lineage.lede}</p>
        </CodaHead>
        <LineageFigure nodes={d.lineage.nodes} />
        <p className={s.note}>{d.lineage.note}</p>
        <div className={s.trailWrap}>
          <CodaHead kicker="The trail" title="From stream segregation to computational ASA">
            <p>{r.trailLede}</p>
            <p>{r.originsNote}</p>
          </CodaHead>
          <Trail nodes={r.origins} />
        </div>
      </Chapter>

      {/* 10 · limits — quieter */}
      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="10 · Do not conclude" title={<>Shortcuts that make ASA easier to say and <em>harder to understand</em>.</>}>
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
        <BesideOtherLenses record={r} />
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="11 · Sources" title={r.minimumReadingLabel ?? "If you read six things"} />
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" } as React.CSSProperties}>Also drawn on</p>
        <SourceShelf items={r.fullSources.filter((f) => !r.minimumReading.some((m) => m.citation === f.citation))} start={r.minimumReading.length + 1} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="12 · Provenance" title="Where every claim came from">
          <p>The plane, its dashes and every contour, brace and pull drawn on it are constructed teaching material (▲), drawn for this record; so is the opening drawing. The sounds are the record&rsquo;s own synthetic presets, unchanged. None of it is a signal, a spectrogram or a replication.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

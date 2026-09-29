import type { ProvenanceGlyph, StatisticalCard, StatisticalStream, TheoryRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, Trail, EvidenceLedger, BesideOtherLenses } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { Clocks, Flow, Ledger, Stream } from "./Figures";
import { Loop, Mechanism, WriteRead } from "./Concepts";
import { Pictogram, type PictogramKind } from "./Marks";
import s from "./stat.module.css";

/* ---------------------------------------------------------------------------
   Statistical Learning of Music — A STREAM, AND WHAT A TALLY OF IT WOULD SHOW.

   The framework's question is how exposure can make regularities usable
   without anyone explaining a rule. The page keeps one constructed stream of
   thirty-six tones, unbroken and unmarked, and asks what a tally of it would
   hold: how often each tone occurs — the same for every tone — and how often
   each tone is followed by each other tone, which is not. Then it lets the
   stream run past the tally, so the structure can be watched emerging as the
   exposure grows, and sets two exposure histories side by side that agree on
   every total and differ only in what follows a given tone.

   The counter is a teaching representation, not a claim that a listener tallies
   anything; the stream shows information a learner could use, not that the
   visitor learned it. The mechanism, the representational format and the
   causal story of enculturation stay open, and the page says so.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "exposure", num: "01", label: "Exposure" },
  { id: "counts", num: "02", label: "Counts" },
  { id: "stream", num: "03", label: "Stream" },
  { id: "histories", num: "04", label: "Histories" },
  { id: "clocks", num: "05", label: "Clocks" },
  { id: "learning", num: "06", label: "Learning" },
  { id: "mechanism", num: "07", label: "Mechanism" },
  { id: "scope", num: "08", label: "Scope" },
  { id: "evidence", num: "09", label: "Evidence" },
  { id: "limits", num: "10", label: "Limits" },
  { id: "sources", num: "11", label: "Sources" },
  { id: "provenance", num: "12", label: "Provenance" },
];

const HERO = "/visual-language/theories/stat";

/** a card, set as a small heading and a sentence, in the colour the record gives it */
function Cards({ items, className, pictograms }: { items: StatisticalCard[]; className?: string; pictograms?: PictogramKind[] }) {
  return (
    <ul className={[s.cards, className].filter(Boolean).join(" ")}>
      {items.map((c, i) => (
        <li key={c.label} style={{ "--hue": c.colour } as React.CSSProperties}>
          {pictograms?.[i] && <Pictogram kind={pictograms[i]} />}
          <p className={s.cardKick}>{c.label}</p>
          <p>{c.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** a provenance note: the record writes its own mark at the start of the line, and the page keeps it as a labelled mark */
function Note({ text }: { text: string }) {
  const m = text.match(/^([●■▲✦?])\s*/);
  return <p className={s.note}>{m && <><Glyph g={m[1] as ProvenanceGlyph} /> </>}{m ? text.slice(m[0].length) : text}</p>;
}

/** one of the record's short sections: its lead sentence, its cards and its note */
function Group({ kick, lede, cards, note, className }: { kick: string; lede?: string; cards: StatisticalCard[]; note: string; className?: string }) {
  return (
    <>
      <p className={s.smallHead}>{kick}</p>
      {lede && <p className={s.subLede}>{lede}</p>}
      <Cards items={cards} className={className ?? s.stack} />
      <Note text={note} />
    </>
  );
}

const lastSentence = (text: string) => text.match(/[^.]+\.\s*$/)?.[0].trim() ?? text;

/** the exposure, written out: thirty-six tones, unmarked */
function Exposure({ stream }: { stream: StatisticalStream }) {
  return (
    <div className={s.exposureStrip}>
      <p className={s.smallHead}>An exposure · {stream.noteSequence.length} tones · {new Set(stream.noteSequence).size} kinds</p>
      <p className={s.streamText} aria-label={`The ${stream.noteSequence.length} tones, in the order they are heard: ${stream.noteSequence.join(" ")}`}>
        {stream.noteSequence.map((t, i) => <span key={i}>{t}</span>)}
      </p>
    </div>
  );
}

/** the stream's candidate units and their order, listed in full */
function UnitGlance({ stream }: { stream: StatisticalStream }) {
  return (
    <div className={s.unitGlance}>
      <ul className={s.unitCards}>
        {stream.units.map((u) => (
          <li key={u.label}><span>candidate unit</span><b>{u.label}</b><small>{u.notes.join(" · ")}</small></li>
        ))}
      </ul>
      <p className={s.smallHead}>actual unit order · {stream.unitSequence.length} units / {stream.noteSequence.length} tones</p>
      <ol className={s.unitOrder} aria-label={`Unit sequence ${stream.unitSequence.join(", ")}`}>
        {stream.unitSequence.map((u, i) => <li key={i} data-unit={u}>{u}</li>)}
      </ol>
    </div>
  );
}

/** what the framework explains and where it stops, either side of one drawn line */
function Bound({ explains, stops }: { explains: { lede: string; cards: StatisticalCard[]; note: string }; stops: { lede: string; cards: StatisticalCard[]; note: string } }) {
  return (
    <div className={s.bound}>
      <div className={s.inside}>
        <p className={s.smallHead}>What it explains</p>
        <p className={s.subLede}>{explains.lede}</p>
        <Cards items={explains.cards} className={s.stack} />
        <Note text={explains.note} />
      </div>
      <div className={s.edge} aria-hidden="true">
        <svg viewBox="0 0 24 400" preserveAspectRatio="none">
          <path d="M12 2c-3 40 4 70 0 110s3 60 -1 100 4 80 0 120-2 50 1 66" />
          <path d="M13 6c-2 44 3 72 -1 112s4 58 0 98 2 84 -1 118" opacity=".45" />
        </svg>
      </div>
      <div className={s.outside}>
        <p className={s.smallHead}>Where it stops</p>
        <p className={s.subLede}>{stops.lede}</p>
        <Cards items={stops.cards} className={s.stack} />
        <Note text={stops.note} />
      </div>
    </div>
  );
}

export function StatisticalExperience({ record: r }: { record: TheoryRecord }) {
  const d = r.statistical!;
  const stream = d.hiddenLanguage.stream;

  const opening = (
    <header className={s.opening}>
      <div className={s.openingHead}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>Statistical <em>Learning</em> of Music</h1>
      </div>
      <div className={s.openingSide}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>a stream · a tally · a hidden language</Margin>
      </div>
      <figure className={s.hero}>
        <picture>
          <source media="(max-width: 760px)" srcSet={`${HERO}/stat-hero-stack.webp`} />
          <img
            src={`${HERO}/stat-hero.webp`}
            srcSet={`${HERO}/stat-hero-900.webp 900w, ${HERO}/stat-hero.webp 1600w`}
            sizes="(max-width: 760px) 100vw, 96vw"
            width={1600}
            height={620}
            alt="A coloured-pencil drawing of one long, unbroken stream of thirty-six pencilled beads, each at its own pitch, so the line leaps up and down. Between groups the thread is a thin graphite line; inside each group of three beads it is thick and coloured — teal, red or ochre — so that three recurring groups stand out of the stream, returning again and again in a different order, with no gap anywhere to mark where one ends. Under the stream, one tally stroke in the matching colour is kept each time one of the groups goes by, and a faint plum wash lies behind it all for the exposure history."
            fetchPriority="high"
          />
        </picture>
        <ol className={s.heroKey}>
          <li style={{ "--hue": "var(--pen-2)" } as React.CSSProperties}><b>The stream</b> one bead per tone, at its own pitch</li>
          <li style={{ "--hue": "var(--teal)" } as React.CSSProperties}><b>The thick thread</b> three tones that keep occurring together</li>
          <li style={{ "--hue": "var(--gold-deep)" } as React.CSSProperties}><b>The tally</b> one stroke each time a group goes by</li>
          <li style={{ "--hue": "var(--plum-deep)" } as React.CSSProperties}><b>The wash</b> the exposure history behind it all</li>
        </ol>
        <figcaption className={s.heroCaption}>
          <Glyph g="▲" /> Original teaching drawing of the record&rsquo;s constructed stream. In the sound its three recurring groups are not marked; the thick threads are drawn over it, and every label is live HTML.
        </figcaption>
      </figure>
      <div className={s.glance}>
        <dl className={s.identity} aria-label="The record at a glance">
          <div><dt>Knowledge form</dt><dd>{d.identity.knowledgeForm}</dd></div>
          <div><dt>Status</dt><dd>{d.identity.status}</dd></div>
          <div><dt>Discipline</dt><dd>{d.identity.discipline}</dd></div>
          <div><dt>Atlas branch</dt><dd>{d.identity.branch}</dd></div>
        </dl>
        <ul className={s.facts} aria-label="The framework at a glance">
          {r.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Statistical Learning of Music">
      {/* 01 · the question, and exposure */}
      <Chapter id="exposure" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">The question</Kicker>
          <h2 className={s.h2}>No one had to <em>explain the rule</em>.</h2>
          <Rich as="p" className={s.headLede} html={d.opening.lede} />
        </div>
        <ul className={[s.cards, s.three].join(" ")}>
          {d.opening.cards.map((c) => (
            <li key={c.label} style={{ "--hue": c.colour } as React.CSSProperties}>
              <p className={s.cardKick}>{c.label}</p>
              {c.body.includes("→")
                ? <p className={s.rhythm}>{c.body.split(" → ").map((w, i, all) => <span key={w}>{w}{i < all.length - 1 && <> <i aria-hidden="true">→</i> </>}</span>)}</p>
                : <p>{c.body}</p>}
            </li>
          ))}
        </ul>
        <Note text={d.opening.note} />

        <div className={s.subhead}>
          <p className={s.smallHead}>Exposure</p>
          <h3 className={s.h3}>Patterns keep <em>occurring</em>.</h3>
          <p className={s.subLede}>{d.exposure.lede}</p>
        </div>
        <Cards items={d.exposure.cards} className={s.four} />
        <Note text={d.exposure.note} />
      </Chapter>

      {/* 02 · two counts */}
      <Chapter id="counts" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">Two counts</Kicker>
          <h2 className={s.h2}>Common is not <em>likely next</em>.</h2>
          <p className={s.headLede}>{d.comparison.lede}</p>
        </div>
        <Exposure stream={stream} />
        <Ledger stream={stream} />
        <div className={s.groups}>
          <div className={s.group}><Group kick="Some sounds occur more often" lede={d.frequency.lede} cards={d.frequency.cards} note={d.frequency.note} /></div>
          <div className={s.group}><Group kick="What tends to follow what?" lede={d.transition.lede} cards={d.transition.cards} note={d.transition.note} /></div>
          <div className={s.group}><Group kick="Common isn’t the same as predictable" cards={d.comparison.cards} note={d.comparison.note} /></div>
        </div>
      </Chapter>

      {/* 03 · the hidden language */}
      <Chapter id="stream" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">A hidden musical language</Kicker>
          <h2 className={s.h2}>Let the stream run <em>past the tally</em>.</h2>
          <Rich as="p" className={s.headLede} html={d.hiddenLanguage.lede} />
        </div>
        <Stream stream={stream} glance={<UnitGlance stream={stream} />} />
        <Note text={stream.note} />
        <Note text={d.hiddenLanguage.note} />

        <div className={s.subhead}>
          <p className={s.smallHead}>Where did the boundary come from?</p>
          <h3 className={s.h3}>A boundary the <em>sound</em> never marked.</h3>
          <p className={s.subLede}>{d.segmentation.lede}</p>
        </div>
        <Cards items={d.segmentation.cards} />
        <Note text={d.segmentation.note} />
      </Chapter>

      {/* 04 · same context, different history */}
      <Chapter id="histories" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">Same context, different history</Kicker>
          <h2 className={s.h2}>Same context. <em>Different history.</em></h2>
          <Rich as="p" className={s.headLede} html={d.worlds.lede} />
        </div>
        <Flow data={d.worlds} />
        <Note text={d.worlds.note} />
      </Chapter>

      {/* 05 · years of listening, two clocks, a new world, learning and liking */}
      <Chapter id="clocks" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">Years of listening</Kicker>
          <h2 className={s.h2}>Two clocks, <em>one listener</em>.</h2>
          <p className={s.headLede}>{d.enculturation.lede}</p>
        </div>
        <Cards items={d.enculturation.cards} />
        <Note text={d.enculturation.note} />

        <div className={s.subhead}>
          <p className={s.smallHead}>Two clocks of learning</p>
          <h3 className={s.h3}>The piece, and <em>the lifetime</em>.</h3>
          <p className={s.subLede}>{d.clocks.lede}</p>
        </div>
        <Clocks short={d.clocks.cards[0].body} long={d.clocks.cards[1].body} both={lastSentence(d.clocks.lede)} />
        <Cards items={d.clocks.cards} />
        <Note text={d.clocks.note} />

        <div className={s.pair}>
          <article>
            <Group kick="Can you learn a new musical world?" lede={d.newWorld.lede} cards={d.newWorld.cards} note={d.newWorld.note} />
          </article>
          <article>
            <Group kick="Learning isn’t liking" lede={d.liking.lede} cards={d.liking.cards} note={d.liking.note} />
          </article>
        </div>
      </Chapter>

      {/* 06 · learning is not prediction */}
      <Chapter id="learning" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="06">Learning and prediction</Kicker>
          <h2 className={s.h2}>Learning is not <em>prediction</em>.</h2>
          <p className={s.headLede}>{d.prediction.lede}</p>
        </div>
        <WriteRead learning={d.prediction.cards[0].body} prediction={d.prediction.cards[1].body} both={d.prediction.cards[2].body} />
        <Cards items={d.prediction.cards} />
        <Note text={d.prediction.note} />

        <div className={s.subhead}>
          <p className={s.smallHead}>Beside other lenses</p>
          <h3 className={s.h3}>What experience taught, <em>and what the input affords</em>.</h3>
          <p className={s.subLede}>{d.tonalGestalt.lede}</p>
        </div>
        <Cards items={d.tonalGestalt.cards} className={s.four} />
        <Note text={d.tonalGestalt.note} />
      </Chapter>

      {/* 07 · what is doing the counting */}
      <Chapter id="mechanism" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="07">The mechanism</Kicker>
          <h2 className={s.h2}>What is doing <em>the counting</em>?</h2>
          <p className={s.headLede}>{d.mechanism.lede}</p>
        </div>
        <Mechanism stream={stream} supported={d.mechanism.cards[0].body} unsettled={d.mechanism.cards[1].body} />
        <Cards items={d.mechanism.cards} className={s.four} />
        <Note text={d.mechanism.note} />

        <div className={s.subhead}>
          <p className={s.smallHead}>Real music is more than A → B</p>
          <h3 className={s.h3}>What a tally of pairs <em>cannot see</em>.</h3>
          <p className={s.subLede}>{d.realMusic.lede}</p>
        </div>
        <Cards items={d.realMusic.cards} className={s.four} pictograms={["hierarchy", "adjacent", "dimensions", "changing"]} />
        <Note text={d.realMusic.note} />
      </Chapter>

      {/* 08 · scope, and the whole as a loop */}
      <Chapter id="scope" density="quiet" className={s.band}>
        <CodaHead kicker="08 · Scope" title={<>What statistical learning explains &mdash; and <em>where it stops</em>.</>} />
        <Bound explains={d.explains} stops={d.stops} />

        <div className={s.subhead}>
          <p className={s.smallHead}>The whole, as a loop</p>
          <h3 className={s.h3}>Exposure, sensitivity, expectation &mdash; <em>and back again</em>.</h3>
          <p className={s.subLede}>{d.model.lede}</p>
        </div>
        <Loop steps={d.model.steps} />
        <Note text={d.model.note} />
      </Chapter>

      {/* 09 · evidence and the trail */}
      <Chapter id="evidence" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · Evidence" title={<>What has actually been <em>tested</em>?</>}>
          <p>{d.evidence.lede}</p>
        </CodaHead>
        <EvidenceLedger items={d.evidence.items} glyph="■" />
        <Note text={d.evidence.note} />
        <div className={s.trailWrap}>
          <CodaHead kicker="The trail" title="A research landscape, not a founder story">
            <p>{r.trailLede}</p>
          </CodaHead>
          <Trail nodes={r.origins} />
        </div>
      </Chapter>

      {/* 10 · limits — quieter */}
      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="10 · Do not conclude" title={<>Shortcuts that turn <em>a tally</em> into a mind.</>}>
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
        <CodaHead kicker="11 · Sources" title={r.minimumReadingLabel ?? "If you read five things"} />
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" } as React.CSSProperties}>The full trail</p>
        <SourceShelf items={r.fullSources.filter((f) => !r.minimumReading.some((m) => m.citation === f.citation))} start={r.minimumReading.length + 1} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="12 · Provenance" title="Where every claim came from">
          <p>The constructed stream, its three units, its tallies and the two exposure histories are the record&rsquo;s own constructed teaching systems (▲), drawn again for this page: they are not published stimuli, and they do not test whether the visitor learned anything. The ribbon, the ledger, the flow, the clocks and the loop are code-drawn teaching maps on that material. The loop and the two clocks are editorial synthesis (✦), and the &lsquo;cut where the bar dips&rsquo; rule is only a way of reading the bars, not a model of a listener.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}


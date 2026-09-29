import { Fragment, type ReactNode } from "react";
import type { ASACard, EvidenceXray, ProvenanceGlyph, TheoryRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, Trail, EvidenceLedger, BoundaryMap } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { Anatomy, Fork, MovementGrid, SizeDial, VerdictSheets } from "./Figures";
import { FinalModel, Layers, Loop, TwoSources } from "./Concepts";
import s from "./narmour.module.css";

/* ---------------------------------------------------------------------------
   Narmour's Implication–Realization Theory — THE PATH AND ITS LEAN.

   Two tones have been heard and a third has not. The page keeps those first two
   still and draws, on one pitch × time field, what the theory says about the
   third: which way it seems to lean, how big a step it seems to ask for, whether
   it seems to stay near or come back — and, when a tone does arrive, what it
   realised and what it denied. Nothing here says which note is right. A denial
   is not an error, and a realisation is not a score.

   The two intervals (C4 → D4 and C4 → G4), their continuations, their verdicts
   and every sound are the record's own constructed teaching stimuli. The
   drawings of tendencies are qualitative: an arrow says which way, a brace says
   how much compared with the first interval. None of them aims at a pitch.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "question", num: "01", label: "Question" },
  { id: "implication", num: "02", label: "Implication" },
  { id: "size", num: "03", label: "Size" },
  { id: "verdicts", num: "04", label: "Verdicts" },
  { id: "beyond", num: "05", label: "Beyond" },
  { id: "evidence", num: "06", label: "Evidence" },
  { id: "scope", num: "07", label: "Scope" },
  { id: "trail", num: "08", label: "Trail" },
  { id: "limits", num: "09", label: "Limits" },
  { id: "sources", num: "10", label: "Sources" },
  { id: "provenance", num: "11", label: "Provenance" },
];

const HERO = "/visual-language/theories/narmour";

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

/** a provenance note: what kind of claim the line above it is */
function Note({ g, children }: { g: ProvenanceGlyph; children: ReactNode }) {
  return <p className={s.note}><Glyph g={g} /> {children}</p>;
}

/** one group of the record's cards, with its lead sentence and its note */
function Group({ kick, lede, cards, note, glyph }: { kick: string; lede: string; cards: ASACard[]; note: string; glyph: ProvenanceGlyph }) {
  return (
    <>
      <p className={s.smallHead}>{kick}</p>
      <p className={s.subLede}>{lede}</p>
      <Cards items={cards} />
      <Note g={glyph}>{note}</Note>
    </>
  );
}

/** one rung of the evidence ladder: the question it answers, the study, and what that does and does not show */
function Rung({ n, title, lede, item, note, children }: { n: number; title: ReactNode; lede: string; item?: EvidenceXray; note: string; children?: ReactNode }) {
  return (
    <section className={s.rung} aria-label={`Step ${n} of the evidence`}>
      <div className={s.rail} aria-hidden="true"><span>{String(n).padStart(2, "0")}</span></div>
      <div className={s.rungBody}>
        <h3 className={s.h3}>{title}</h3>
        <p className={s.subLede}>{lede}</p>
        {item && <EvidenceLedger items={[item]} start={n} glyph="■" />}
        {children}
        <Note g="■">{note}</Note>
      </div>
    </section>
  );
}

export function NarmourExperience({ record: r }: { record: TheoryRecord }) {
  const d = r.narmour!;

  const opening = (
    <header className={s.opening}>
      <div className={s.openingHead}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>Narmour&rsquo;s <em>Implication&ndash;Realization</em> Theory</h1>
      </div>
      <div className={s.openingSide}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>two tones heard · a third still to come</Margin>
      </div>
      <figure className={s.hero}>
        <picture>
          <source media="(max-width: 760px)" srcSet={`${HERO}/narmour-hero-stack.webp`} />
          <img
            src={`${HERO}/narmour-hero.webp`}
            srcSet={`${HERO}/narmour-hero-900.webp 900w, ${HERO}/narmour-hero.webp 1600w`}
            sizes="(max-width: 760px) 100vw, 96vw"
            width={1600}
            height={620}
            alt="A coloured-pencil drawing of two melodic gestures on a pitch and time field, each a pair of heard tones followed by a place where a third tone has not yet arrived. On the left, a small step up, C4 to D4, with a teal arrow that continues upward, a short gold brace as long as the first step, and a red dotted ring and a red dashed arrow that comes back down toward the first tone. On the right, a large leap up, C4 to G4, with a teal arrow that turns back down, a shorter gold brace, a red ring, and a long red dashed arrow that falls toward the first tone. Three faint dashed candidate tones wait at the third position in each gesture, and a plum wash lies behind both."
            fetchPriority="high"
          />
        </picture>
        <ol className={s.leanKey}>
          {d.implications.cards.map((c) => <li key={c.label} style={{ "--hue": c.colour } as React.CSSProperties}><b>{c.label}</b></li>)}
        </ol>
        <figcaption className={s.heroCaption}>
          <Glyph g="▲" /> Original teaching drawing of the record&rsquo;s two constructed intervals. The arrows, braces and rings are qualitative: none of them aims at a pitch, and every label is live HTML.
        </figcaption>
      </figure>
      <div className={s.glance}>
        <dl className={s.identity} aria-label="The record at a glance">
          <div><dt>Knowledge form</dt><dd>{d.identity.knowledgeForm}</dd></div>
          <div><dt>Status</dt><dd>{d.identity.status}</dd></div>
          <div><dt>Discipline</dt><dd>{d.identity.discipline}</dd></div>
          <div><dt>Atlas branch</dt><dd>{d.identity.branch}</dd></div>
        </dl>
        <ul className={s.facts} aria-label="The theory at a glance">
          {r.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </header>
  );

  const tritone = r.qualifications.find((q) => q.includes("tritone")) ?? "";

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Implication–Realization Theory">
      {/* 01 · the question, and the fork */}
      <Chapter id="question" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">The question</Kicker>
          <h2 className={s.h2}>Continue &mdash; <em>or reverse?</em></h2>
          <Rich as="p" className={s.headLede} html={d.opening.lede} />
        </div>
        <p className={s.ask}>{d.opening.question}</p>
        <Fork data={d} />
        <Note g="?">{d.opening.note}</Note>
        <Note g="▲">{d.analysisNote}</Note>
      </Chapter>

      {/* 02 · two tones, what they imply, a third that answers */}
      <Chapter id="implication" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">Implication and realisation</Kicker>
          <h2 className={s.h2}>Two tones point <em>forward</em>.</h2>
          <p className={s.headLede}>{d.twoNotes.lede}</p>
        </div>
        <Anatomy
          data={d}
          groups={[
            <Fragment key="two">
              <p className={s.smallHead}>Two notes can point forward</p>
              <Cards items={d.twoNotes.cards} />
              <Note g="■">{d.twoNotes.note}</Note>
            </Fragment>,
            <Group key="implications" kick="One interval, several implications" lede={d.implications.lede} cards={d.implications.cards} note={d.implications.note} glyph="✦" />,
            <Group key="third" kick="The third note answers" lede={d.thirdNote.lede} cards={d.thirdNote.cards} note={d.thirdNote.note} glyph="■" />,
          ]}
        />
      </Chapter>

      {/* 03 · at what size does the lean change? */}
      <Chapter id="size" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">Small and large</Kicker>
          <h2 className={s.h2}>Small tends to <em>continue</em>. Large tends to <em>turn back</em>.</h2>
        </div>
        <SizeDial tritoneNote={tritone} />
        <div className={s.pair}>
          <article>
            <p className={s.smallHead}>Small moves tend to continue</p>
            <p className={s.subLede}>{d.small.lede}</p>
            <Cards items={d.small.cards} className={s.stack} />
            <Note g="?">{d.small.note}</Note>
          </article>
          <article>
            <p className={s.smallHead}>Big leaps often turn back</p>
            <p className={s.subLede}>{d.large.lede}</p>
            <Cards items={d.large.cards} className={s.stack} />
            <Note g="?">{d.large.note}</Note>
          </article>
        </div>
      </Chapter>

      {/* 04 · the same movement, a different verdict */}
      <Chapter id="verdicts" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">More than direction</Kicker>
          <h2 className={s.h2}>Same movement, <em>different verdict</em>.</h2>
          <p className={s.headLede}>{d.moreThanDirection.lede}</p>
        </div>
        <MovementGrid data={d} />
        <Cards items={d.moreThanDirection.cards} className={s.four} />
        <Note g="?">{d.moreThanDirection.note}</Note>

        <div className={s.subhead}>
          <p className={s.smallHead}>Realise some · deny others</p>
          <h3 className={s.h3}>One continuation, <em>four verdicts</em>.</h3>
          <p className={s.subLede}>{d.realiseDeny.lede}</p>
          <p className={s.ask}>{d.realiseDeny.question}</p>
        </div>
        <VerdictSheets data={d} />
        <div className={s.closure}>
          <p className={s.smallHead}>Closure · separate qualitative relation</p>
          <p>Closure is not scored as a table row here. Direction change and relatively smaller realised motion can affect closure, but this record does not claim an exact closure classification for these synthetic examples.</p>
        </div>
        <Note g="▲">{d.realiseDeny.note}</Note>
      </Chapter>

      {/* 05 · process and reversal, two sources, a loop */}
      <Chapter id="beyond" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">Beyond three tones</Kicker>
          <h2 className={s.h2}>Beyond the <em>third tone</em>.</h2>
          <p className={s.headLede}>{d.process.lede}</p>
        </div>
        <Cards items={d.process.cards} />
        <Note g="■">{d.process.note}</Note>

        <div className={s.subhead}>
          <p className={s.smallHead}>Two sources of expectation</p>
          <h3 className={s.h3}>Two sources, <em>not two stages</em>.</h3>
          <p className={s.subLede}>{d.systems.lede}</p>
        </div>
        <TwoSources data={d} />
        <Cards items={d.systems.cards} className={s.four} />
        <Note g="●">{d.systems.note}</Note>

        <div className={s.subhead}>
          <p className={s.smallHead}>Expectation keeps moving</p>
          <h3 className={s.h3}>The window <em>keeps sliding</em>.</h3>
          <p className={s.subLede}>{d.loop.lede}</p>
        </div>
        <Loop data={d} />
        <Note g="✦">{d.loop.note}</Note>
      </Chapter>

      {/* 06 · how a theory became testable, and what the tests showed */}
      <Chapter id="evidence" density="scholarly" className={s.band}>
        <div className={s.head}>
          <Kicker num="06">Evidence</Kicker>
          <h2 className={s.h2}>How a theory became <em>testable</em>.</h2>
          <p className={s.headLede}>{d.testable.lede}</p>
        </div>
        <Layers data={d} />
        <div className={s.rungs}>
          <Rung n={1} title={<>Can we test the <em>principles</em>?</>} lede={d.cuddy.lede} item={d.cuddy.evidence} note={d.cuddy.note} />
          <Rung n={2} title={<>Do we need <em>all five</em>?</>} lede={d.schellenberg96.lede} item={d.schellenberg96.evidence} note={d.schellenberg96.note} />
          <Rung n={3} title={<>A simpler <em>empirical</em> model.</>} lede={d.schellenberg97.lede} item={d.schellenberg97.evidence} note={d.schellenberg97.note} />
          <Rung n={4} title={<>Do these expectations <em>develop</em>?</>} lede={d.development.lede} item={d.development.evidence} note={d.development.note} />
          <Rung n={5} title={<>Where does <em>style</em> enter?</>} lede={d.styleLearning.lede} note={d.styleLearning.note}>
            <Cards items={d.styleLearning.cards} className={s.four} />
          </Rung>
        </div>
      </Chapter>

      {/* 07 · scope */}
      <Chapter id="scope" density="quiet" className={s.band}>
        <CodaHead kicker="07 · Scope" title={<>What I&ndash;R explains &mdash; and <em>where it stops</em>.</>}>
          <p>{d.scope.lede}</p>
        </CodaHead>
        <FinalModel />
        <Note g="✦">{d.finalModelNote}</Note>
        <BoundaryMap explains={d.scope.explains} stops={d.scope.stops} explainsLabel="I–R helps explain" stopsLabel="Where I–R stops" note={d.scope.note} />
      </Chapter>

      {/* 08 · the trail */}
      <Chapter id="trail" density="scholarly" className={s.band}>
        <CodaHead kicker="08 · The trail" title={<>From Meyer&rsquo;s tradition to <em>statistical-learning</em> critiques.</>}>
          <p>{r.trailLede}</p>
        </CodaHead>
        <Trail nodes={r.origins} />
      </Chapter>

      {/* 09 · limits — quieter */}
      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="09 · Do not conclude" title={<>Shortcuts that turn <em>relations</em> into laws.</>}>
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
        <CodaHead kicker="10 · Sources" title={r.minimumReadingLabel ?? "If you read five things"} />
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" } as React.CSSProperties}>The rest of the trail</p>
        <SourceShelf items={r.fullSources.filter((f) => !r.minimumReading.some((m) => m.citation === f.citation))} start={r.minimumReading.length + 1} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="11 · Provenance" title="Where every claim came from">
          <p>The two intervals, their six continuations, their verdicts and every sound are the record&rsquo;s constructed teaching stimuli (▲), drawn again for this page. The arrows, braces and rings that show what an interval seems to ask for are qualitative drawings of what the record says small and large intervals tend to invite; they are not a measurement, and none aims at a pitch. The two-sources map, the sliding window and the three layers are editorial synthesis (✦).</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

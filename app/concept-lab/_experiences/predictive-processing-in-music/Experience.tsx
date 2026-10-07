import type { PredictiveCard, ProvenanceGlyph, TheoryRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, Trail, EvidenceLedger, BesideOtherLenses } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { Ghost, Ladder, Precision } from "./Figures";
import { Circuit, Inference } from "./Concepts";
import { Moment } from "./Moment";
import s from "./pp.module.css";

/* ---------------------------------------------------------------------------
   Predictive Processing in Music — THE GHOST AND THE SOUND.

   A model expects, and a ghost of what it expects is drawn over what actually
   arrives; what is left between them is the residual, and the residual is
   information. The page keeps that one picture and lets the reader move the
   things the framework says matter: which level the expectation comes from,
   whether the expected note is there at all, and how wide the expectation is —
   so that the same 120 ms displacement lies more than three standard
   deviations away in a narrow expectation and barely one in a broad one.

   The +120 ms comparison and the present-or-absent note are the record's own
   constructed teaching examples. The ladder is a simplified message-passing
   motif, not a wiring diagram, and its levels are a teaching hierarchy, not a
   cortical map.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "question", num: "01", label: "Question" },
  { id: "model", num: "02", label: "Model" },
  { id: "error", num: "03", label: "Error" },
  { id: "precision", num: "04", label: "Precision" },
  { id: "history", num: "05", label: "History" },
  { id: "evidence", num: "06", label: "Evidence" },
  { id: "scope", num: "07", label: "Scope" },
  { id: "limits", num: "08", label: "Limits" },
  { id: "sources", num: "09", label: "Sources" },
  { id: "provenance", num: "10", label: "Provenance" },
];

const HERO = "/visual-language/theories/pp";

/** a card, set as a small heading and a sentence, in the colour the record gives it */
function Cards({ items, className }: { items: PredictiveCard[]; className?: string }) {
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

/** a provenance note: the record writes its own mark at the start of the line, and the page keeps it as a labelled mark */
function Note({ text }: { text: string }) {
  const m = text.match(/^([●■▲✦?])\s*/);
  return <p className={s.note}>{m && <><Glyph g={m[1] as ProvenanceGlyph} /> </>}{m ? text.slice(m[0].length) : text}</p>;
}

/** a lead sentence, its cards and its note — one of the record's short sections */
function Section({ kick, title, lede, cards, note, className, aside }: { kick: string; title: React.ReactNode; lede: string; cards?: PredictiveCard[]; note?: string; className?: string; aside?: React.ReactNode }) {
  const head = (
    <div className={s.subhead}>
      <p className={s.smallHead}>{kick}</p>
      <h3 className={s.h3}>{title}</h3>
      <Rich as="p" className={s.subLede} html={lede} />
    </div>
  );
  return (
    <>
      {aside ? <div className={s.subheadFig}>{head}<figure className={s.aside}>{aside}</figure></div> : head}
      {cards && <Cards items={cards} className={className} />}
      {note && <Note text={note} />}
    </>
  );
}

/** what the framework explains and where it stops, either side of one drawn line */
function Bound({ explains, stops }: { explains: string; stops: string }) {
  return (
    <div className={s.bound}>
      <div className={s.inside}>
        <p className={s.smallHead}>Explains well</p>
        <p className={s.boundBody}>{explains}</p>
      </div>
      <div className={s.edge} aria-hidden="true">
        <svg viewBox="0 0 24 400" preserveAspectRatio="none">
          <path d="M12 2c-3 40 4 70 0 110s3 60 -1 100 4 80 0 120-2 50 1 66" />
          <path d="M13 6c-2 44 3 72 -1 112s4 58 0 98 2 84 -1 118" opacity=".45" />
        </svg>
      </div>
      <div className={s.outside}>
        <p className={s.smallHead}>Does not complete</p>
        <p className={s.boundBody}>{stops}</p>
      </div>
    </div>
  );
}

export function PredictiveExperience({ record: r }: { record: TheoryRecord }) {
  const d = r.predictiveProcessing!;

  const opening = (
    <header className={s.opening}>
      <div className={s.openingHead}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>Predictive <em>Processing</em> in Music</h1>
      </div>
      <div className={s.openingSide}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>the ghost · the sound · what is left over</Margin>
      </div>
      <figure className={s.hero}>
        <picture>
          <source media="(max-width: 760px)" srcSet={`${HERO}/pp-hero-stack.webp`} />
          <img
            src={`${HERO}/pp-hero.webp`}
            srcSet={`${HERO}/pp-hero-900.webp 900w, ${HERO}/pp-hero.webp 1600w`}
            sizes="(max-width: 760px) 100vw, 96vw"
            width={1600}
            height={620}
            alt="A coloured-pencil drawing of a model, a ghost and a sound. At the top a plum cloud stands for a generative model, with teal arrows running down from it to a row of ten dashed ghost notes — what the model expects. Below is a row of ten solid pencilled notes — what actually arrives. Most sit exactly under their ghosts, but the fourth arrives late, and a red wedge of hatching between it and its ghost marks the mismatch; and the seventh does not arrive at all, so a dashed empty slot sits under its ghost with a hollow red mark. Red arrows run back up to the cloud from the two mismatches, thick from the late note and thinner from the missing one."
            fetchPriority="high"
          />
        </picture>
        <ol className={s.heroKey}>
          <li style={{ "--hue": "var(--plum-deep)" } as React.CSSProperties}><b>The model</b> a cloud of hypotheses about what caused the sound</li>
          <li style={{ "--hue": "var(--teal)" } as React.CSSProperties}><b>The ghost</b> what the model expects, dashed</li>
          <li style={{ "--hue": "var(--pen-2)" } as React.CSSProperties}><b>The sound</b> what actually arrives, solid</li>
          <li style={{ "--hue": "var(--red)" } as React.CSSProperties}><b>The residual</b> what is left over, and how much it counts</li>
        </ol>
        <figcaption className={s.heroCaption}>
          <Glyph g="▲" /> Original teaching drawing of the framework&rsquo;s central relation. The late note and the missing note are constructed to show a mismatch and are not a measurement of any listener; every label is live HTML.
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
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Predictive Processing in Music">
      {/* 01 · the question */}
      <Chapter id="question" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">The question</Kicker>
          <h2 className={s.h2}>Hearing is <em>a negotiation</em>.</h2>
          <Rich as="p" className={s.headLede} html={d.opening.lede} />
        </div>
        <Cards items={d.opening.cards} />
        <Note text={d.opening.note} />
        <Section
          kick="Prediction is bigger than next-note expectation"
          title={<>A guess at the next note is <em>one visible consequence</em>.</>}
          lede={d.nextNote.lede}
          cards={d.nextNote.cards}
          note={d.nextNote.note}
          aside={<><Moment /><figcaption className={s.figNote}><Glyph g="✦" /> Concept Lab teaching drawing of the two claims below: a model can predict the sound arriving now as well as the note that comes next. The notes are schematic.</figcaption></>}
        />
      </Chapter>

      {/* 02 · what caused this sound, and the ladder */}
      <Chapter id="model" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">Generative models</Kicker>
          <h2 className={s.h2}>What <em>caused</em> this sound?</h2>
          <Rich as="p" className={s.headLede} html={d.generative.lede} />
        </div>
        <Cards items={d.generative.cards} />
        <Note text={d.generative.note} />

        <div className={s.subhead}>
          <p className={s.smallHead}>Predictions travel down; unexplained information travels up</p>
          <h3 className={s.h3}>Down with <em>predictions</em>. Up with <em>what is left over</em>.</h3>
          <Rich as="p" className={s.subLede} html={d.messagePassing.lede} />
        </div>
        <Ladder levels={d.hierarchy.cards} directions={d.messagePassing.cards} />
        <Note text={d.messagePassing.note} />
        <Section kick="Prediction happens at more than one level" title={<>Levels and timescales, <em>nested or interacting</em>.</>} lede={d.hierarchy.lede} note={d.hierarchy.note} />
      </Chapter>

      {/* 03 · prediction error, the note that never came */}
      <Chapter id="error" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">Prediction error</Kicker>
          <h2 className={s.h2}>Error is <em>information</em>.</h2>
          <Rich as="p" className={s.headLede} html={d.error.lede} />
        </div>
        <Cards items={d.error.cards} className={s.four} />
        <Note text={d.error.note} />
        <Section kick="The note that never came" title={<>A ghost with <em>no sound</em> beneath it.</>} lede={d.omission.lede} />
        <Ghost data={d.omission} />
        <Note text={d.omission.note} />
        <Section kick="If the brain minimises error, why not listen to one note forever?" title={<>A world with no novelty is <em>not the goal</em>.</>} lede={d.zeroError.lede} cards={d.zeroError.cards} note={d.zeroError.note} />
      </Chapter>

      {/* 04 · precision */}
      <Chapter id="precision" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">Precision</Kicker>
          <h2 className={s.h2}>Which error should <em>matter</em>?</h2>
          <Rich as="p" className={s.headLede} html={d.precision.lede} />
        </div>
        <Cards items={d.precision.cards} />
        <Note text={d.precision.note} />
        <Section kick="Same deviation. Different precision." title={<>The same deviation, <em>a different weight</em>.</>} lede={d.precisionInteraction.lede} />
        <Precision
          contexts={d.precisionInteraction.contexts}
          constants={["same target event", "same pitch", "same duration", "same timbre", "same gain", "same +120 ms displacement"]}
        />
        <Note text={d.precisionInteraction.note} />
        <Section kick="What are you predicting about your prediction?" title={<>What is expected, <em>and how sure</em>.</>} lede={d.firstSecond.lede} cards={d.firstSecond.cards} note={d.firstSecond.note} />
        <Section kick="Attention changes the weight" title={<>Attention, as <em>a weight on errors</em>.</>} lede={d.attention.lede} cards={d.attention.cards} note={d.attention.note} />
      </Chapter>

      {/* 05 · Predictive Coding of Music, priors, action, the trail */}
      <Chapter id="history" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">Predictive Coding of Music</Kicker>
          <h2 className={s.h2}>A family of formulations, <em>not one model</em>.</h2>
          <Rich as="p" className={s.headLede} html={d.pcm.lede} />
        </div>
        <Cards items={d.pcm.cards} />
        <Note text={d.pcm.note} />
        <Section kick="Your priors have a history" title={<>Priors have <em>a history</em>.</>} lede={d.culture.lede} cards={d.culture.cards} note={d.culture.note} />
        <Section kick="Perception can lead to action" title={<>Two things to do <em>about a mismatch</em>.</>} lede={d.activeInference.lede} />
        <Inference perceive={d.activeInference.cards[0].body} act={d.activeInference.cards[1].body} keep={d.activeInference.cards[2].body} />
        <Cards items={d.activeInference.cards} />
        <Note text={d.activeInference.note} />
        <div className={s.trailWrap}>
          <CodaHead kicker="The trail" title="A branching landscape, not a founder story">
            <p>{r.trailLede}</p>
          </CodaHead>
          <Trail nodes={r.origins} />
        </div>
      </Chapter>

      {/* 06 · evidence, and the critical boundaries */}
      <Chapter id="evidence" density="scholarly" className={s.band}>
        <CodaHead kicker="06 · Evidence" title={<>What do the brain signals <em>actually show</em>?</>}>
          <Rich as="p" html={d.signals.lede} />
        </CodaHead>
        <EvidenceLedger items={d.signals.items} glyph="■" />
        <Note text={d.signals.note} />
        <Section kick="A powerful framework — but how specific?" title={<>Powerful, <em>and not yet specific</em>.</>} lede={d.critical.lede} cards={d.critical.cards} note={d.critical.note} />
      </Chapter>

      {/* 07 · scope, and the whole as a circuit */}
      <Chapter id="scope" density="quiet" className={s.band}>
        <CodaHead kicker="07 · Scope" title={<>What predictive processing explains &mdash; and <em>where it stops</em>.</>} />
        <Bound
          explains="Context-sensitive perception, musical expectation, sensory prediction, violation responses, uncertainty, learning, attention, rhythm and meter, some groove, expertise, omission, and perception–action coupling."
          stops="All music, emotion, reward, aesthetics, culture, social interaction, creativity, or every neural computation."
        />
        <p className={s.note}><Glyph g="✦" /> The framework is a powerful organising lens, not a complete explanation of music.</p>
        <Section kick="The whole, as a circuit" title={<>Model, prediction, mismatch, weight &mdash; <em>and update</em>.</>} lede={d.finalModel.lede} />
        <Circuit nodes={d.finalModel.nodes} />
        <Note text={d.finalModel.note} />
      </Chapter>

      {/* 08 · limits — quieter */}
      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="08 · Do not conclude" title={<>Shortcuts that turn <em>a framework</em> into a verdict.</>}>
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
        <CodaHead kicker="09 · Sources" title={r.minimumReadingLabel ?? "If you read five things"} />
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" } as React.CSSProperties}>The full trail</p>
        <SourceShelf items={r.fullSources.filter((f) => !r.minimumReading.some((m) => m.citation === f.citation))} start={r.minimumReading.length + 1} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="10 · Provenance" title="Where every claim came from">
          <p>The +120 ms comparison and the present-or-omitted note are the record&rsquo;s own constructed teaching devices (▲), drawn again for this page: they are not published stimuli, neural measurements or diagnoses of the visitor, and the envelopes are not brain distributions. The slider that widens or narrows the expectation, between and beyond the two constructed contexts, is the plain arithmetic of a Gaussian: how many standard deviations the same displacement spans is the offset divided by the width. The ladder, the two ways of answering a mismatch, the circuit, and the drawing of the note arriving now beside the note that comes next are code-drawn teaching maps (✦); the ladder&rsquo;s levels are a teaching hierarchy, not a cortical map.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

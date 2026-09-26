import type { MethodRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { CommitmentLenses, VoiceAndSense, QuestionSieve, OneCaseAtATime, ClosePass, MarkerAudit } from "./Interactions";
import { WORKED_QUESTION } from "./worked-pass";
import s from "./ipa.module.css";

/* ---------------------------------------------------------------------------
   Interpretative Phenomenological Analysis — ONE PERSON AT A TIME ·
   A READING OF A READING.

   A method is a practice, so the page is built to be worked at the desk. Its
   shape comes from the method's two defining relationships: the double
   hermeneutic (the researcher reads the participant's own reading, never the
   experience directly) and idiography (one case is finished before the next
   is opened). The opening draws the first as nested loops; the procedure is
   played on a stack of case sheets that enforces the second; and the centre
   of the page is a slow four-column pass over one short, constructed extract.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "what-it-meant", num: "01", label: "What it meant" },
  { id: "reading", num: "02", label: "A reading of a reading" },
  { id: "question", num: "03", label: "Is it an IPA question?" },
  { id: "one-case", num: "04", label: "One case at a time" },
  { id: "close-pass", num: "05", label: "The close pass" },
  { id: "themes", num: "06", label: "Themes and markers" },
  { id: "learn", num: "07", label: "Learn by doing" },
  { id: "limits", num: "08", label: "When it stops being IPA" },
  { id: "sources", num: "09", label: "Sources" },
  { id: "provenance", num: "10", label: "Provenance" },
];

export function IPAExperience({ record: r }: { record: MethodRecord }) {
  const dh = r.doubleHermeneutic!;
  const opening = (
    <header className={s.opening}>
      <div className={s.openingCopy}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>
          <span>Interpretative</span>
          <span>Phenomenological</span>
          <span>Analysis <abbr title="Interpretative Phenomenological Analysis">{r.abbr}</abbr></span>
        </h1>
        <p className={s.hook}>{r.hook}</p>
      </div>
      <figure className={s.openingField}>
        <picture>
          <source media="(max-width: 760px)" srcSet="/visual-language/methods/ipa/ipa-double-hermeneutic-760.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/visual-language/methods/ipa/ipa-double-hermeneutic.webp" width={1400} height={1008} alt="" fetchPriority="high" />
        </picture>
        <span className={s.fieldLabel} data-at="experience">an experience</span>
        <span className={s.fieldLabel} data-at="participant">the participant making sense of it</span>
        <span className={s.fieldLabel} data-at="researcher">the researcher making sense of that</span>
        <figcaption className={s.fieldCaption}><Glyph g="▲" /> Original teaching drawing of the double hermeneutic: the researcher reaches the experience only through the participant&rsquo;s account. Scribbles are marks of reading, not text.</figcaption>
      </figure>
      <div className={s.openingRead}>
        <p className={s.lede}>{r.oneSentence}</p>
        <ul className={s.facts} aria-label="The method at a glance">
          {r.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <Margin tone="kind" className={s.openingMargin}>{r.statusChip?.toLowerCase()} — slowly, one case at a time</Margin>
      </div>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Interpretative Phenomenological Analysis">
      <Chapter id="what-it-meant" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">What it is</Kicker>
          <h2 className={s.h2}>Not what happened — <em>what it meant</em>.</h2>
          <Rich as="p" className={s.headLede} html={r.ideaLede ?? ""} />
        </div>
        <p className={s.commitLede}>{r.commitmentsLede}</p>
        <CommitmentLenses commitments={r.commitments ?? []} />
      </Chapter>

      <Chapter id="reading" density="rich" className={s.band}>
        <div className={s.readingGrid}>
          <div>
            <Kicker num="02">The double hermeneutic</Kicker>
            <h2 className={s.h2}>A reading <em>of a reading</em>.</h2>
            <p className={s.paraphrase}>
              <Glyph g="■" /> {dh.quote}
              <span className={s.after}>paraphrased after Smith (2019)</span>
            </p>
          </div>
          <Rich as="p" className={s.readingBody} html={dh.body} />
        </div>
        <VoiceAndSense />
      </Chapter>

      <Chapter id="question" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">Before any data</Kicker>
          <h2 className={s.h2}>Is your question an <em>IPA question</em>?</h2>
          <p className={s.headLede}>{r.questionFitLede?.replace("Click a question", "Open each question")}</p>
        </div>
        <QuestionSieve items={r.questionFit ?? []} />
        <aside className={s.aside}>
          <Margin tone="kind">instrument, not quality</Margin>
          <p>{r.questionFitNote}</p>
          <p className={s.teachingNote}><Glyph g="▲" /> The questions are teaching illustrations; no study is being characterised through them.</p>
        </aside>
      </Chapter>

      <Chapter id="one-case" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">The procedure</Kicker>
          <h2 className={s.h2}>One case, <em>finished</em>, before the next.</h2>
          <Rich as="p" className={s.headLede} html={r.procedureLede ?? ""} />
        </div>
        <OneCaseAtATime steps={r.procedure ?? []} rule={r.cardinalRule ?? ""} />
      </Chapter>

      <Chapter id="close-pass" density="rich" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">The craft</Kicker>
          <h2 className={s.h2}>The close pass: <em>four columns</em>.</h2>
          <p className={s.headLede}>{r.craftLede}</p>
        </div>
        <div className={s.worked}>
          <p className={s.workedLabel}><Glyph g="▲" /> Worked illustration · constructed extract · not data</p>
          <p className={s.workedQ}>For the question: <i>{WORKED_QUESTION}</i></p>
        </div>
        <ClosePass columns={r.craft ?? []} attendTo={r.attendTo ?? []} />
        <p className={s.teachingNote}><Glyph g="▲" /> The extract, notes, statements and theme were written for this page to show the moves. A different analyst would make a different — not necessarily worse — reading.</p>

        <div className={s.terms}>
          <div>
            <p className={s.smallHead}>Say it the way the field says it now</p>
            <p className={s.termsLede}>{r.terminologyLede}</p>
          </div>
          <ol>
            {(r.terminology ?? []).map((t) => (
              <li key={t.now}>
                <span className={s.termWas}>{t.was}</span>
                <span className={s.termNow}>{t.now}</span>
                <p>{t.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </Chapter>

      <Chapter id="themes" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="06">Quality</Kicker>
          <h2 className={s.h2}>Could this theme head <em>any</em> study?</h2>
          <p className={s.headLede}>{r.themeContrastLede}</p>
        </div>
        {r.themeContrast && (
          <div className={s.contrast}>
            <div className={s.weak}>
              <p className={s.smallHead}>Could head any study</p>
              <ul>{r.themeContrast.weak.map((w) => <li key={w}>{w}</li>)}</ul>
            </div>
            <div className={s.strong}>
              <p className={s.smallHead}>Could only belong to one</p>
              <ul>{r.themeContrast.strong.map((w) => <li key={w}>{w}</li>)}</ul>
            </div>
            <Rich as="p" className={s.contrastNote} html={r.themeContrast.note} />
          </div>
        )}
        <div className={s.auditBlock}>
          <div>
            <p className={s.smallHead}>Four markers · an audit for your own draft</p>
            <p className={s.auditLede}>{r.qualityMarkersLede}</p>
          </div>
          <MarkerAudit markers={r.qualityMarkers ?? []} />
        </div>
      </Chapter>

      <Chapter id="learn" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="07">A pathway</Kicker>
          <h2 className={s.h2}>Learn it by <em>doing</em> it.</h2>
          <p className={s.headLede}>{r.stagesLede}</p>
        </div>
        <ol className={s.stages}>
          {(r.stages ?? []).map((st) => (
            <li key={st.n}>
              <span className={s.stageNum}>{st.n}</span>
              <h3>{st.title}</h3>
              <p>{st.body}</p>
              {st.read && <p className={s.stageRead}>read · {st.read}</p>}
            </li>
          ))}
        </ol>
        <div className={s.exemplars}>
          <div>
            <p className={s.smallHead}>Watch it done well</p>
            <p className={s.exemplarLede}>{r.exemplarsLede}</p>
          </div>
          <ol>
            {(r.exemplars ?? []).map((x) => (
              <li key={x.year + x.authors}>
                <span className={s.exYear}>{x.year}</span>
                <div>
                  <p className={s.exWho}>{x.authors}</p>
                  <Rich as="p" className={s.exWork} html={x.work} />
                  <p className={s.exBody}>{x.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Chapter>

      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="08 · Misuses and limits" title={<>When a study <em>stops being IPA</em>.</>}>
          <p>{r.misusesLede}</p>
        </CodaHead>
        <div className={s.limits}>
          <Cautions items={r.misuses} />
          <div>
            <p className={s.smallHead}>What IPA does not claim</p>
            <OpenQuestions items={r.qualifications} glyph="■" />
            {r.originsNote && <p className={s.origins}><Glyph g="●" /> {r.originsNote}</p>}
          </div>
        </div>
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · Sources" title={r.coreReadingLabel ?? "Core reading"} />
        <SourceShelf items={r.coreReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" }}>The full list</p>
        <SourceShelf items={r.fullSources} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="10 · Provenance" title="Where every claim came from">
          <p>The worked extract in chapter 05 and the three readings in chapter 02 are constructed teaching material (▲), written for this page.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

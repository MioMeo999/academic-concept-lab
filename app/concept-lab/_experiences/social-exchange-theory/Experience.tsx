import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { SourceNote, TheoryRecord } from "@/content/types";
import { Folio, Chapter, Glyph, Margin, FolioIdentity, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, BoundaryMap, Trail, CodaHead, BesideOtherLenses } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { Resources, Rules, Profile, Responses, Next } from "./Chapters";
import { Lab } from "./Lab";
import s from "./set.module.css";

/* ---------------------------------------------------------------------------
   Social Exchange Theory — A | B

   The knowledge is a relation over time between two parties: the unit of
   analysis moves from an act to an exchange to a relationship. One authored
   field establishes that world; later questions are expressed through live
   text and controls so the illustration does not become a repeated diagram.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "what", num: "01", label: "What happened" },
  { id: "rule", num: "02", label: "What rule" },
  { id: "whom", num: "03", label: "Who needs whom" },
  { id: "response", num: "04", label: "What response" },
  { id: "next", num: "05", label: "What next" },
  { id: "check", num: "06", label: "Check a claim" },
  { id: "family", num: "07", label: "A family" },
  { id: "limits", num: "08", label: "Limits" },
  { id: "trail", num: "09", label: "Trail" },
  { id: "sources", num: "10", label: "Sources" },
  { id: "provenance", num: "11", label: "Provenance" },
];

const HERO_ALT =
  "Two hands meet across separate work surfaces as a small object passes between them. Coloured-pencil threads continue beyond the exchange, leaving the response and wider relation open; this is a teaching image, not a recorded event.";

function Head({ id, q, hue, title, lede }: { id: string; q: string; hue: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <header className={s.head} style={{ "--hue": hue } as CSSProperties}>
      <span className={s.headQ} aria-hidden="true">{q}</span>
      <h2 className={s.headTitle} id={id}>{title}</h2>
      {lede && <div className={s.headLede}>{lede}</div>}
    </header>
  );
}

function SrcNote({ n }: { n: SourceNote }) {
  return (
    <div role="note" className={s.srcNote}>
      <p className={s.srcKick}><Glyph g="●" /> What the sources add · {n.label}</p>
      <p>{n.body}</p>
      <p className={s.srcBy}>{n.source}</p>
    </div>
  );
}

export function SETExperience({ record: r }: { record: TheoryRecord }) {
  const d = r.set!;
  const note = (key: string) => {
    const n = r.sourceNotes?.find((x) => x.key === key);
    if (!n) throw new Error(`SET: the record has no source note "${key}"`);
    return n;
  };
  const [q1, q2, q3, q4, q5] = d.chain;
  const [m1, m2, m3] = d.opening.cases;
  const sources = r.minimumReading ?? [];
  const alsoConsulted = r.fullSources.filter((f) => !sources.some((m) => m.citation === f.citation));

  const opening = (
    <header className={s.opening}>
      <div className={s.openingId}><FolioIdentity record={r} /></div>
      <h1 className={s.title}>Social Exchange <em>Theory</em></h1>
      <div className={s.openingText}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>one favour · then what?</Margin>
      </div>
      <div className={s.exchangeField}>
        <figure className={s.ledgerFigure}>
          <Image className={s.ledgerArt} src="/visual-language/theories/set/set-exchange-relation-v2.webp" width={1536} height={1024} sizes="(max-width: 700px) 100vw, 54vw" alt={HERO_ALT} priority unoptimized />
          <figcaption className={s.ledgerCaption}><Glyph g="▲" /> {d.opening.note} The drawn surfaces and traces are a teaching construction, not a record of an actual exchange; they imply no amount, fairness or felt meaning.</figcaption>
        </figure>
        <ol className={s.moments} aria-label="One constructed exchange, read in three moments">
          {[m1, m2, m3].map((m, i) => (
            <li key={m.label} data-i={i}>
              <p className={s.momentLabel}>{m.label}</p>
              <blockquote className={s.momentQuote}>“{m.quote}”</blockquote>
              <p className={s.momentBody}>{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Social Exchange Theory">
      {/* 01 · what happened */}
      <Chapter id="what" density="rich" className={s.band} labelledBy="h-what">
        <Head id="h-what" q="Q1" hue="var(--ochre-ink)" title={q1.label} lede={<p>{q1.body}</p>} />
        <Resources resources={d.resources} />
      </Chapter>

      {/* 02 · what rule */}
      <Chapter id="rule" density="rich" className={s.band} labelledBy="h-rule">
        <Head id="h-rule" q="Q2" hue="var(--teal-ink)" title={q2.label} lede={<p>{q2.body}</p>} />
        <Rules rules={d.rules} reciprocity={d.reciprocity} />
        <div className={s.sub}>
          <Profile dimensions={d.dimensions} />
        </div>
      </Chapter>

      {/* 03 · who needs whom */}
      <Chapter id="whom" density="active" className={s.band} labelledBy="h-whom">
        <Head id="h-whom" q="Q3" hue="var(--a-ink)" title={q3.label} lede={<p>{q3.body}</p>} />
        <Lab power={d.power} emerson={note("emerson-proposition")} />
      </Chapter>

      {/* 04 · what response */}
      <Chapter id="response" density="active" className={s.band} labelledBy="h-response">
        <Head id="h-response" q="Q4" hue="var(--neg-ink)" title={q4.label} lede={<p>{q4.body}</p>} />
        <Responses hedonic={d.hedonic} constraints={d.constraints} />
        <SrcNote n={note("post-hoc")} />
      </Chapter>

      {/* 05 · what next */}
      <Chapter id="next" density="active" className={s.band} labelledBy="h-next">
        <Head id="h-next" q="Q5" hue="var(--teal-ink)" title={q5.label} lede={<p>{q5.body}</p>} />
        <Next stages={d.relationshipStages} />
      </Chapter>

      {/* 06 · check a claim */}
      <Chapter id="check" density="active" className={s.band} labelledBy="h-check">
        <Head id="h-check" q="✓" hue="var(--pen)" title={<>Put the five questions to a <em>claim</em>.</>} lede={<p>A claim is ready to be called an exchange claim when the five questions can be answered for it, not when the word “exchange” appears in it.</p>} />
        <div className={s.audit}>
          {d.audit.map((a, i) => {
            const open = a.answers.every((x) => x.trim().endsWith("?"));
            return (
              <article key={a.label} className={s.claim} data-open={open || undefined}>
                <p className={s.claimLabel}>{a.label}</p>
                <blockquote className={s.claimText}>“{a.claim}”</blockquote>
                <ul className={s.claimRows} aria-label={open ? "Questions the claim leaves open" : "What the claim specifies"}>
                  {a.answers.map((x) => (
                    <li key={x}>
                      <span aria-hidden="true">{open ? "?" : "●"}</span>
                      {x}
                    </li>
                  ))}
                </ul>
                <p className={s.claimVerdict}><b>{open ? "Left open" : "Specified"}.</b> {a.verdict}</p>
                <span className={s.claimNum} aria-hidden="true">{i === 0 ? "A" : "B"}</span>
              </article>
            );
          })}
        </div>
        <p className={s.teachingNote}><Glyph g="✦" /> The verdicts are an audit reading of constructed claims, not a test the record’s sources propose. A claim that passes is still a theoretical reading, not evidence by itself.</p>
      </Chapter>

      {/* 07 · the family */}
      <Chapter id="family" density="quiet" className={s.band} labelledBy="h-family">
        <Head id="h-family" q="07" hue="var(--pen-2)" title={<>A family, not a <em>sealed diagram</em>.</>} lede={<p>{r.trailLede}</p>} />
        <ol className={s.family}>
          {d.family.map((f) => (
            <li key={f.label} data-kind={f.kind}>
              <p className={s.familyKind}>{f.kind === "root" ? "where it starts" : f.kind === "branch" ? "a branch" : f.kind === "remedy" ? "a later remedy" : "the family"}</p>
              <h3>{f.label}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ol>
        <p className={s.teachingNote}><Glyph g="✦" /> The order and the branch structure are the Concept Lab’s teaching arrangement of the record’s traditions. The record calls SET a family resemblance, not one mandatory causal sequence.</p>
      </Chapter>

      {/* 08 · scope, cautions, open questions */}
      <Chapter id="limits" density="quiet" className={s.band} labelledBy="h-limits">
        <CodaHead id="h-limits" kicker="08 · Scope and limits" title={<>What SET explains, and <em>where it stops</em>.</>} />
        <BoundaryMap explains={d.scope.explains} stops={d.scope.stops} note={d.scope.note} />
        <div className={s.limits}>
          <div>
            <p className={s.smallHead}>Do not conclude</p>
            <Rich as="p" className={s.limitsLede} html={r.oversimplificationsLede ?? ""} />
            <Cautions items={r.oversimplifications ?? []} />
          </div>
          <div>
            <p className={s.smallHead}>Still open</p>
            <OpenQuestions items={r.qualifications} />
          </div>
        </div>
        <BesideOtherLenses record={r} />
      </Chapter>

      <Chapter id="trail" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · The trail" title="From behaviour as exchange to a family of lenses" />
        <Trail nodes={r.origins ?? []} />
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="10 · Sources" title={r.minimumReadingLabel ?? "If you read seven things"} />
        <SourceShelf items={sources} />
        {alsoConsulted.length > 0 && (
          <>
            <p className={s.smallHead} style={{ marginTop: "2rem" }}>Also drawn on</p>
            <SourceShelf items={alsoConsulted} start={sources.length + 1} />
          </>
        )}
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="11 · Provenance" title="Where every claim came from">
          <p>The favour, the three moments, the seven-question illustrations and every drawing on this page are constructed teaching material (▲) or the Concept Lab’s own arrangement (✦). The notes headed “What the sources add” are marked ● and name the paper they come from.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

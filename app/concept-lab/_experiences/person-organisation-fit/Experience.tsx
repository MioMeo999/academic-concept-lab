import Link from "next/link";
import type { ReactNode } from "react";
import type { SourceNote, TheoryRecord } from "@/content/types";
import { RECORDS, recordHref } from "@/content/records";
import { Folio, Chapter, Glyph, Margin, FolioIdentity, Plate, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, Trail, CodaHead } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { Targets } from "./Targets";
import { Pieces, Cycle, Perceptions } from "./Chapters";
import s from "./po.module.css";

const CHAPTERS: ChapterEntry[] = [
  { id: "name", num: "01", label: "Fit to what?" },
  { id: "two", num: "02", label: "Two forms of fit" },
  { id: "asa", num: "03", label: "The people make the place" },
  { id: "measure", num: "04", label: "What got measured" },
  { id: "open", num: "05", label: "Open questions" },
  { id: "trail", num: "06", label: "Trail" },
  { id: "sources", num: "07", label: "Sources" },
  { id: "provenance", num: "08", label: "Provenance" },
];

function Head({ id, num, title, lede }: { id: string; num: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <header className={s.head}>
      <p className={s.kicker}><span>{num}</span> Person–Organisation Fit</p>
      <h2 id={id} className={s.sectionTitle}>{title}</h2>
      {lede && <div className={s.headLede}>{lede}</div>}
    </header>
  );
}

function SourceNoteLine({ note }: { note: SourceNote }) {
  return (
    <div className={s.sourceNote} role="note" aria-label={`Source note: ${note.label}`}>
      <p className={s.sourceNoteLabel}><Glyph g="●" /> What the sources add · {note.label}</p>
      <p>{note.body}</p>
      <p className={s.sourceBy}>{note.source}</p>
    </div>
  );
}

export function POExperience({ record: r }: { record: TheoryRecord }) {
  const note = (key: string) => {
    const found = r.sourceNotes?.find((item) => item.key === key);
    if (!found) throw new Error(`P–O Fit record is missing source note: ${key}`);
    return found;
  };
  const related = r.relatedTo?.[0];
  const parent = related ? RECORDS.find((item) => item.id === related.recordId) : undefined;
  const pathway = r.pathways?.[0];
  const demo = r.demo;
  if (!pathway || !demo || demo.type !== "facets") throw new Error("P–O Fit record requires its pathway and facet model");
  const minimum = r.minimumReading ?? [];
  const full = r.fullSources ?? [];
  const alsoConsulted = full.filter((source) => !minimum.some((item) => item.citation === source.citation));

  const opening = (
    <header className={s.opening}>
      <div className={s.openingCopy}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>Person–Organisation <em>Fit</em></h1>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="cobalt" className={s.openingMargin}>one person · this organisation</Margin>
      </div>
      <Plate
        className={s.heroPlate}
        src="/visual-language/theories/po/po-correspondence-landscape-v2.webp"
        width={1536}
        height={1024}
        priority
        alt="A personal worktable faces an organisation's open interior. Layered coloured-pencil contours cross the space between them, with some lines echoing and others remaining distinct."
        caption="An imagined correspondence field. It depicts no actual person, employer, fit judgment or outcome."
      />
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Person–Organisation Fit">
      <Chapter id="name" density="active" className={s.band} labelledBy="h-name">
        <Head id="h-name" num="01" title={<>Fit is always fit <em>to something</em>.</>} lede={<Rich as="p" html={r.ideaLede ?? ""} />} />
        <div className={s.targetField}>
          <div className={s.targetIntro}>
            <p className={s.smallHead}>Name the environment</p>
            <Rich as="p" html={r.terminologyLede ?? ""} />
          </div>
          <Targets targets={r.fitTargets ?? []} />
        </div>
        <div className={s.termNotes}>
          {(r.terminology ?? []).map((item) => (
            <article key={item.was}>
              <p className={s.termWas}><s>{item.was}</s></p>
              <p className={s.termNow}>{item.now}</p>
              <Rich as="p" html={item.note} />
            </article>
          ))}
        </div>
        {related && parent && (
          <div className={s.parentRelation}>
            <p className={s.smallHead}>Where this record sits</p>
            <Rich as="p" html={r.relatedToLede ?? ""} />
            <p className={s.parentRelationLabel}>Person–Organisation Fit <b>{related.relation}</b></p>
            <Link className={s.parentLink} href={recordHref(parent)}>{parent.title}<span aria-hidden="true"> ↗</span></Link>
            <Rich as="p" html={related.body} />
          </div>
        )}
      </Chapter>

      <Chapter id="two" density="rich" className={s.band} labelledBy="h-two">
        <Head id="h-two" num="02" title={<>Similarity and complementarity are different relations. <em>They can coexist.</em></>} lede={<Rich as="p" html={r.categoriesLede ?? ""} />} />
        <Pieces categories={r.categories ?? []} />
        <Rich as="p" className={s.pullNote} html={r.categoriesNote ?? ""} />
        <SourceNoteLine note={note("supplementary-complementary")} />
      </Chapter>

      <Chapter id="asa" density="active" className={s.band} labelledBy="h-asa">
        <Head id="h-asa" num="03" title={<>How a place comes to <em>resemble itself</em>.</>} lede={<Rich as="p" html={r.pathwaysLede ?? ""} />} />
        <Cycle pathway={pathway} />
        <Rich as="p" className={s.caution} html={r.pathwaysCaution ?? ""} />
        <SourceNoteLine note={note("asa-relative")} />
      </Chapter>

      <Chapter id="measure" density="rich" className={s.band} labelledBy="h-measure">
        <Head id="h-measure" num="04" title={<>“Do you fit here?” asks too little. <em>Which fit?</em></>} lede={<Rich as="p" html={r.modelsLede ?? ""} />} />
        <Perceptions label={demo.label} facets={demo.facets ?? []} caption={demo.caption} models={r.models ?? []} />
        <Rich as="p" className={s.pullNote} html={r.modelsNote ?? ""} />
        <SourceNoteLine note={note("cable-derue-outcomes")} />
      </Chapter>

      <Chapter id="open" density="quiet" className={s.band} labelledBy="h-open">
        <Head id="h-open" num="05" title={<>The field’s own authors leave <em>questions open</em>.</>} lede={<p>Kristof-Brown, Schneider and Su (2023) organise a review of fifty years of work around six conundrums. Each is a live boundary on what a page about fit can claim.</p>} />
        <ol className={s.conundrums}>
          {[1, 2, 3, 4, 5, 6].map((index) => {
            const item = note(`conundrum-${index}`);
            return <li key={item.key}><span aria-hidden="true">0{index}</span><div><h3>{item.label}</h3><p>{item.body}</p><p className={s.sourceBy}>{item.source}</p></div></li>;
          })}
        </ol>
        <div className={s.limits}>
          <div><p className={s.smallHead}>Shortcuts to resist</p><Rich as="p" className={s.limitsLede} html={r.oversimplificationsLede ?? ""} /><Cautions items={r.oversimplifications ?? []} /></div>
          <div><p className={s.smallHead}>Still unresolved</p><OpenQuestions items={r.qualifications ?? []} /></div>
        </div>
      </Chapter>

      <Chapter id="trail" density="scholarly" className={s.band}>
        <CodaHead kicker="06 · The trail" title="Seven works, thirty-six years"><p>{r.trailLede}</p>{r.originsNote && <p>{r.originsNote}</p>}</CodaHead>
        <Trail nodes={r.origins ?? []} />
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="07 · Sources" title={r.minimumReadingLabel ?? "If you read four things"} />
        <SourceShelf items={minimum} />
        {alsoConsulted.length > 0 && <><p className={s.smallHead}>Also drawn on</p><SourceShelf items={alsoConsulted} start={minimum.length + 1} /></>}
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="08 · Provenance" title="Where every claim came from"><p>The opening scene and the two-form contour study are generated teaching material (▲), not evidence about an actual fit. The selected correspondence readings are live explanations; the “both” state is marked as the Lab’s synthesis (✦). Source notes and the six questions are attributed to the literature (●).</p></CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

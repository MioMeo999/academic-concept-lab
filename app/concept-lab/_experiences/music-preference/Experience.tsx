import type { TheoryRecord } from "@/content/types";
import { DISCIPLINES } from "@/content/disciplines";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, Trail, BesideOtherLenses } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { FieldMap, Instrument, Qualities } from "./Figures";
import { Fit, Flip, Levers, Office, Road } from "./Concepts";
import s from "./mp.module.css";

/* ---------------------------------------------------------------------------
   Music Preference and Person–Music Fit — A FIELD, NOT A THEORY.

   The record says on its face that there is no single theory of musical
   preference to state: there are converging questions and competing answers.
   So the page is not built as one machine. It opens on a crowd of individual
   tastes and the shape they make, then follows the strands the record follows —
   what the structure of taste is and how it was measured, what shapes a
   preference, what it is for, how it develops, what happens when the listening
   is done at work — and only at the end offers its own frame, Person–Music Fit,
   marked as ours (✦) and never as the authors'.

   The strands, the sound traces and sketches, the twisted rope, the road, the
   room and the two pieces are teaching drawings made for this page; nothing in
   them is data, and none is one of the studies' own materials.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "field", num: "01", label: "The field" },
  { id: "shape", num: "02", label: "Shape" },
  { id: "models", num: "03", label: "Measure" },
  { id: "levers", num: "04", label: "Levers" },
  { id: "function", num: "05", label: "Function" },
  { id: "growth", num: "06", label: "Growth" },
  { id: "work", num: "07", label: "At work" },
  { id: "fit", num: "08", label: "Fit" },
  { id: "limits", num: "09", label: "Limits" },
  { id: "sources", num: "10", label: "Sources" },
  { id: "provenance", num: "11", label: "Provenance" },
];

const HERO = "/visual-language/theories/mp";

/** the design of each workplace study, as the record names it in its own words */
const DESIGN: Record<string, string> = { "1995": "quasi-experiment", "2005": "field study", "2011": "exploratory survey" };

function Head({ num, kick, title, lede }: { num: string; kick: string; title: React.ReactNode; lede: string }) {
  return (
    <div className={s.head}>
      <Kicker num={num}>{kick}</Kicker>
      <h2 className={s.h2}>{title}</h2>
      <Rich as="p" className={s.headLede} html={lede} />
    </div>
  );
}

export function MusicPreferenceExperience({ record: r }: { record: TheoryRecord }) {
  const cs = r.conceptualStatus!;
  const h = r.headings!;
  const demo = r.demo!;
  const applied = r.applied!;
  const pathway = r.pathways![0];

  const opening = (
    <header className={s.opening}>
      <div className={s.openingHead}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>Music <em>Preference</em> and Person&ndash;Music Fit</h1>
      </div>
      <div className={s.openingSide}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>five lines · many threads · one that is yours</Margin>
      </div>
      <figure className={s.hero}>
        <picture>
          <source media="(max-width: 760px)" srcSet={`${HERO}/mp-hero-stack.webp`} />
          <img
            src={`${HERO}/mp-hero.webp`}
            srcSet={`${HERO}/mp-hero-900.webp 900w, ${HERO}/mp-hero.webp 1600w`}
            sizes="(max-width: 760px) 100vw, 96vw"
            width={1600}
            height={620}
            alt="A coloured-pencil drawing of a crowd of tastes. Five straight graphite lines run across the page like a stave: five qualities of sound. Across them wander some forty thin coloured threads, each one a listener's preferences, no two alike. At five places along the page the threads bunch and lean onto one of the lines together, each gathering marked by a soft coloured wash. One thick dark thread, starting from a small ring at the left, wanders through the same field on its own path: yours, felt as yours alone, and still inside the shape the others make."
            fetchPriority="high"
          />
        </picture>
        <ol className={s.heroKey}>
          <li style={{ "--hue": "var(--pen-2)" } as React.CSSProperties}><b>Five lines</b> five qualities of sound: the MUSIC dimensions</li>
          <li style={{ "--hue": "var(--teal)" } as React.CSSProperties}><b>Many threads</b> many listeners&rsquo; preferences, no two alike</li>
          <li style={{ "--hue": "var(--violet)" } as React.CSSProperties}><b>Where they gather</b> a shape: preferences cluster</li>
          <li style={{ "--hue": "var(--pen)" } as React.CSSProperties}><b>One dark thread</b> yours, felt as yours alone</li>
        </ol>
        <figcaption className={s.heroCaption}>
          <Glyph g="▲" /> Original teaching drawing of what &ldquo;a structure of taste&rdquo; means: many different preferences, gathering. The threads are constructed to show the idea and are not data; every label is live HTML.
        </figcaption>
      </figure>
      <div className={s.glance}>
        <dl className={s.identity} aria-label="The record at a glance">
          <div><dt>Knowledge form</dt><dd>{r.knowledgeFormQualifier}</dd></div>
          <div><dt>Status</dt><dd>{r.statusChip}</dd></div>
          <div><dt>Discipline</dt><dd>{DISCIPLINES[r.discipline]?.name}</dd></div>
        </dl>
        <ul className={s.facts} aria-label="The field at a glance">
          {r.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Music Preference and Person–Music Fit">
      {/* 01 · the field */}
      <Chapter id="field" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">The field</Kicker>
          <h2 className={s.h2}>This is a field, <em>not a theory</em>.</h2>
          <Rich as="p" className={s.headLede} html={cs.body} />
        </div>
        <p className={s.smallHead}>What the field sets out to explain</p>
        <ol className={s.questions} aria-label="The four questions the field sets out to explain, in the record’s words">
          {cs.questions.map((qn, i) => (
            <li key={qn}>
              <span className={s.qNum} aria-hidden="true">0{i + 1}</span>
              <Rich as="span" html={qn} />
            </li>
          ))}
        </ol>
        <Rich as="p" className={s.origins} html={r.originsNote!} />
        <div className={s.subhead}>
          <p className={s.smallHead}>Where the work sits</p>
          <h3 className={s.h3}>Seven works, <em>two literatures</em>.</h3>
          <p className={s.subLede}>{r.trailLede}</p>
        </div>
        <FieldMap origins={r.origins} applied={applied} />
      </Chapter>

      {/* 02 · taste has a shape */}
      <Chapter id="shape" density="active" className={s.band}>
        <Head num="02" kick={h.idea.toc} title={<>Taste has <em>a shape</em>.</>} lede={r.ideaLede!} />
        <Qualities demo={demo} />
      </Chapter>

      {/* 03 · the two models, and what was measured */}
      <Chapter id="models" density="active" className={s.band}>
        <Head num="03" kick={h.models.toc} title={<>Two attempts <em>to map the structure</em>.</>} lede={r.modelsLede!} />
        <Instrument models={r.models!} />
        <Rich as="p" className={s.aside} html={r.modelsNote!} />
      </Chapter>

      {/* 04 · what shapes it */}
      <Chapter id="levers" density="active" className={s.band}>
        <Head num="04" kick={h.expansions.toc} title={<>Five things <em>that shape a preference</em>.</>} lede={r.expansionsLede!} />
        <Levers levers={r.expansions!} />
      </Chapter>

      {/* 05 · what it is for */}
      <Chapter id="function" density="active" className={s.band}>
        <Head num="05" kick={h.interactions.toc} title={<>Preference as <em>something music does for you</em>.</>} lede={r.interactionsLede!} />
        <Flip interactions={r.interactions!} />
      </Chapter>

      {/* 06 · how it develops */}
      <Chapter id="growth" density="active" className={s.band}>
        <Head num="06" kick={h.pathways.toc} title={<>How a taste <em>gets built</em>.</>} lede={r.pathwaysLede!} />
        <Road pathway={pathway} />
        <Rich as="p" className={s.caution} html={r.pathwaysCaution!} />
      </Chapter>

      {/* 07 · at work */}
      <Chapter id="work" density="active" className={s.band}>
        <Head num="07" kick={h.applied.toc} title={<>When the listening happens <em>at work</em>.</>} lede={r.appliedLede!} />
        <Office applied={applied} />
        <ul className={s.studies} aria-label="The three workplace studies, in the record’s words">
          {applied.map((a) => (
            <li key={a.year}>
              <p className={s.studyKick}><b>{a.year}</b> <span>{DESIGN[a.year]}</span></p>
              <p className={s.studyAuthors}>{a.authors}</p>
              <p className={s.studyWork}>{a.work}</p>
              <Rich as="p" className={s.studyBody} html={a.body} />
            </li>
          ))}
        </ul>
      </Chapter>

      {/* 08 · Person–Music Fit (ours), and the trail */}
      <Chapter id="fit" density="active" className={s.band}>
        <Head num="08" kick={h.categories.toc} title={<>Person&ndash;Music Fit: <em>the two sides</em>.</>} lede={r.categoriesLede!} />
        <Fit categories={r.categories!} />
        <p className={s.note}><Glyph g="✦" /> {r.categoriesNote}</p>
        <div className={s.trailWrap}>
          <CodaHead kicker="The trail" title="The works, in the order they appeared" />
          <Trail nodes={r.origins} />
        </div>
      </Chapter>

      {/* 09 · limits — quieter */}
      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="09 · Do not conclude" title={<>What this field <em>does not license</em>.</>}>
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
        <CodaHead kicker="10 · Sources" title={r.minimumReadingLabel ?? "If you read four things"} />
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" } as React.CSSProperties}>The full trail</p>
        <SourceShelf items={r.fullSources} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="11 · Provenance" title="Where every claim came from">
          <p>The threads in the opening drawing, the sound traces and their synthesised sketches, the twisted rope of five levers, the road, the room and the two fitted pieces are teaching drawings made for this page (▲, ✦): none is data, none is a measurement of any music or listener, and none is one of the studies&rsquo; own materials. The map of the field places each work in the literature the record itself puts it in; the dashed link between the two literatures, and Person&ndash;Music Fit, are this page&rsquo;s own frame (✦) and are not proposed by any cited author.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

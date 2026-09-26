import type { CSSProperties } from "react";
import type { TheoryRecord, TonalCard } from "@/content/types";
import { RECORDS, recordHref, KIND } from "@/content/records";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, EvidenceLedger, BoundaryMap, Trail } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { ListenFirst, ProbeLab, Landscape, SameNote, KeySpace, MovingHome } from "./Interactions";
import s from "./tonal.module.css";

/* ---------------------------------------------------------------------------
   Tonal Hierarchy — HOME IS A RELATION.

   The research programme's core claim is relational: a physical pitch has no
   fixed tonal job; a context gives it one. So the page keeps one drawn tonal
   field in which every pitch class keeps its own spoke (its identity) while
   the context decides its distance from home (its function). The field
   opens with no context at all — twelve tones on a rim — and organises only
   when the reader supplies one. It is then re-read as a teaching profile, as
   a held C4 changing role across four contexts, as the differentiation that
   comes into focus with development, and as home moving between regions.
   The measurement chapter keeps the record's hardest distinction in view:
   a response, a profile and an interpretation are three different things.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "context", num: "01", label: "Context makes the note" },
  { id: "measure", num: "02", label: "Measuring “home”" },
  { id: "landscape", num: "03", label: "The landscape" },
  { id: "same-note", num: "04", label: "Same note, different home" },
  { id: "keys", num: "05", label: "Keys have neighbourhoods" },
  { id: "moving", num: "06", label: "Home can move" },
  { id: "origins", num: "07", label: "Where it comes from" },
  { id: "evidence", num: "08", label: "What was tested" },
  { id: "scope", num: "09", label: "Where it stops" },
  { id: "limits", num: "10", label: "Do not conclude" },
  { id: "sources", num: "11", label: "Trail and sources" },
  { id: "provenance", num: "12", label: "Provenance" },
];

function Glossary({ items }: { items: TonalCard[] }) {
  return (
    <dl className={s.glossary}>
      {items.map((c) => (
        <div key={c.label} style={{ "--c": c.colour } as CSSProperties}>
          <dt>{c.label.toLowerCase()}</dt>
          <Rich as="dd" html={c.body} />
        </div>
      ))}
    </dl>
  );
}

/** A tonal note carries its own provenance glyph at the front; set it as a quiet line. */
function Note({ html }: { html: string }) {
  return <Rich as="p" className={s.note} html={html} />;
}

export function TonalExperience({ record: r }: { record: TheoryRecord }) {
  const t = r.tonal!;
  const related = (r.relatedTo ?? []).map((l) => ({ link: l, target: RECORDS.find((x) => x.id === l.recordId) })).filter((x) => x.target);

  const opening = (
    <header className={s.opening}>
      <div className={s.openingCopy}>
        <FolioIdentity record={r} standing={r.knowledgeFormQualifier} />
        <h1 className={s.title}>Tonal <em>Hierarchy</em></h1>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <ul className={s.facts} aria-label="The framework at a glance">
          {r.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
      <div className={s.openingLab}>
        <ListenFirst context={t.opening.context} probes={t.opening.probes} lede={t.opening.lede} note={t.opening.note} />
      </div>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Tonal Hierarchy">
      <Chapter id="context" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">Context</Kicker>
          <h2 className={s.h2}>A pitch has no job <em>until a context gives it one</em>.</h2>
          <Rich as="p" className={s.headLede} html={t.context.lede} />
        </div>
        <div className={s.equation} aria-label="Pitch times tonal context gives function">
          <span>pitch</span><b aria-hidden="true">×</b><span>tonal context</span><b aria-hidden="true">→</b><strong>function</strong>
        </div>
        <Glossary items={t.context.cards} />
        <Note html={t.context.note} />
        {r.conceptualStatus && (
          <aside className={s.status}>
            <Margin tone="kind">what kind of knowledge this is</Margin>
            <div>
              <Rich as="p" className={s.statusFlag} html={r.conceptualStatus.flag} />
              <Rich as="p" html={r.conceptualStatus.body} />
            </div>
          </aside>
        )}
      </Chapter>

      <Chapter id="measure" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">Measurement</Kicker>
          <h2 className={s.h2}>A rating, a profile and an interpretation are <em>three different things</em>.</h2>
          <Rich as="p" className={s.headLede} html={t.measurement.lede} />
        </div>
        <ol className={s.path} aria-label="The measurement path">
          {["tonal context", "probe tone", "fit / completion judgment", "repeat across pitch classes", "empirical probe-tone profile", "inference about tonal organisation"].map((x, i) => <li key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</li>)}
        </ol>
        <Rich as="p" className={s.labLede} html={t.probeLab.lede} />
        <ProbeLab context={t.probeLab.context} probes={t.probeLab.probes} levels={t.measurement.cards} note={t.probeLab.note} />
        <Note html={t.measurement.note} />
      </Chapter>

      <Chapter id="landscape" density="rich" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">The profile, drawn as distance</Kicker>
          <h2 className={s.h2}>The tonal <em>landscape</em>.</h2>
          <Rich as="p" className={s.headLede} html={t.profile.lede} />
        </div>
        <Landscape items={t.profile.items} />
        <p className={s.note}><Glyph g="✦" /> On this page the same qualitative representation is drawn as distance from home rather than height. Four broad levels, each drawn as a wide band because it holds internal variation.</p>
        <Note html={t.profile.note} />
        <div className={s.dimensions}>
          <div>
            <p className={s.smallHead}>Tonal function isn&rsquo;t the only dimension</p>
            <Rich as="p" className={s.dimLede} html={t.dimensions.lede} />
            <Glossary items={t.dimensions.cards} />
            <Note html={t.dimensions.note} />
          </div>
          <div>
            <p className={s.smallHead}>The same field, as a psychological representation</p>
            <Rich as="p" className={s.dimLede} html={t.representation.lede} />
            <Glossary items={t.representation.cards} />
            <Note html={t.representation.note} />
          </div>
        </div>
      </Chapter>

      <Chapter id="same-note" density="rich" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">The held probe</Kicker>
          <h2 className={s.h2}>Same note. <em>Different home.</em></h2>
          <Rich as="p" className={s.headLede} html={t.sameNote.lede} />
        </div>
        <SameNote probe={t.sameNote.probe} contexts={t.sameNote.contexts} />
        <Note html={t.sameNote.note} />
      </Chapter>

      <Chapter id="keys" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">One level up</Kicker>
          <h2 className={s.h2}>Keys have <em>neighbourhoods</em>.</h2>
          <Rich as="p" className={s.headLede} html={t.neighbourhood.lede} />
        </div>
        <KeySpace levels={t.neighbourhood.levels} />
        <Note html={t.neighbourhood.note} />
        <div className={s.flat}>
          <p className={s.smallHead}>Why a flat map isn&rsquo;t enough</p>
          <Rich as="p" html={t.keySpace.lede} />
          <Note html={t.keySpace.note} />
        </div>
      </Chapter>

      <Chapter id="moving" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="06">Dynamics</Kicker>
          <h2 className={s.h2}>Home <em>can move</em>.</h2>
          <Rich as="p" className={s.headLede} html={t.dynamics.lede} />
        </div>
        <MovingHome states={t.dynamics.states} note={t.dynamics.note} />
      </Chapter>

      <Chapter id="origins" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="07">Learning, development, culture</Kicker>
          <h2 className={s.h2}>Where does <em>the hierarchy</em> come from?</h2>
          <Rich as="p" className={s.headLede} html={t.distribution.lede} />
        </div>
        <ol className={s.exposure}>
          {t.distribution.cards.map((c, i) => (
            <li key={c.label}><span>{String(i + 1).padStart(2, "0")}</span><b>{c.label.toLowerCase()}</b><Rich as="p" html={c.body} /></li>
          ))}
        </ol>
        <Note html={t.distribution.note} />

        <div className={s.focus}>
          <div className={s.focusHead}>
            <p className={s.smallHead}>The hierarchy comes into focus</p>
            <Rich as="p" html={t.development.lede} />
          </div>
          <ol className={s.focusStages}>
            {t.development.cards.map((c, i) => (
              <li key={c.label}>
                <svg viewBox="0 0 200 200" aria-hidden="true" className={s.focusDraw} data-stage={i}>
                  {i === 0 && <><circle cx="100" cy="100" r="46" /><circle cx="100" cy="100" r="86" className={s.focusOuter} /></>}
                  {i === 1 && <><circle cx="100" cy="100" r="26" /><circle cx="100" cy="100" r="56" /><circle cx="100" cy="100" r="86" className={s.focusOuter} /></>}
                  {i === 2 && <><circle cx="100" cy="100" r="18" /><circle cx="100" cy="100" r="38" /><circle cx="100" cy="100" r="61" /><circle cx="100" cy="100" r="86" className={s.focusOuter} /></>}
                </svg>
                <p className={s.focusLabel}>{c.label.toLowerCase()}</p>
                <Rich as="p" html={c.body} />
              </li>
            ))}
          </ol>
          <p className={s.caption}><Glyph g="▲" /> The drawings count the regions the study describes at each age — two, then three, then further differentiation — and nothing more.</p>
          <Note html={t.development.note} />
        </div>

        <div className={s.culture}>
          <div>
            <p className={s.smallHead}>Culture changes the map</p>
            <Rich as="p" html={t.culture.lede} />
          </div>
          <Glossary items={t.culture.cards} />
          <Note html={t.culture.note} />
        </div>
      </Chapter>

      <Chapter id="evidence" density="scholarly" className={s.band}>
        <CodaHead kicker="08 · Evidence" title={<>A profile is <em>not a process</em>.</>}>
          <Rich as="p" html={t.process.lede} />
        </CodaHead>
        <div className={s.notEqual}>
          <div><p className={s.smallHead}>profile</p><p className={s.neBig}>a pattern in ratings</p><p>Describes expressed tonal organisation.</p></div>
          <span aria-hidden="true">≠</span>
          <div><p className={s.smallHead}>process</p><p className={s.neBig}>key-finding over time</p><p>Asks how a tonal centre is recognised, maintained, or revised.</p></div>
        </div>
        <Glossary items={t.process.cards} />
        <Note html={t.process.note} />
        <p className={s.smallHead} style={{ marginTop: "3rem" }}>What has actually been tested</p>
        {r.evidenceXrays && <EvidenceLedger items={r.evidenceXrays} />}
      </Chapter>

      <Chapter id="scope" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · Scope" title="Where it stops.">
          <Rich as="p" html={t.scope.lede} />
        </CodaHead>
        <BoundaryMap explains={t.scope.explains} stops={t.scope.stops} explainsLabel="Explains well" stopsLabel="Does not establish" note={t.scope.note} />
        <div className={s.lineage}>
          <div>
            <p className={s.smallHead}>What came after Krumhansl</p>
            <Rich as="p" html={t.lineage.lede} />
          </div>
          <ol>
            {t.lineage.nodes.map((n, i) => <li key={n.label}><span>0{i + 1}</span><b>{n.label}</b><Rich as="p" html={n.body} /></li>)}
          </ol>
          <Note html={t.lineage.note} />
        </div>
        {related.length > 0 && (
          <div className={s.beside}>
            <p className={s.smallHead}><Rich html={r.relatedToLede ?? "Beside it in the library"} /></p>
            <ul>
              {related.map(({ link, target }) => (
                <li key={link.recordId}>
                  <a href={recordHref(target!)}>{target!.title}</a>
                  <span className={s.besideRel}>{link.relation}</span>
                  <Rich as="p" html={link.body} />
                  <span className={s.besideGo}>{KIND[target!.kind].cta} →</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Chapter>

      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="10 · Do not conclude" title={<>Shortcuts that turn context into <em>a property of a note</em>.</>}>
          <p>{r.oversimplificationsLede}</p>
        </CodaHead>
        <div className={s.limits}>
          <Cautions items={r.oversimplifications} />
          <div>
            <p className={s.smallHead}>Still open</p>
            <OpenQuestions items={r.qualifications} />
          </div>
        </div>
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="11 · The trail" title="From probe-tone judgments to later critiques.">
          <Rich as="p" html={r.trailLede} />
        </CodaHead>
        <Trail nodes={r.origins} />
        {r.originsNote && <Rich as="p" className={s.note} html={r.originsNote} />}
        <p className={s.smallHead} style={{ marginTop: "2.6rem" }}>{r.minimumReadingLabel ?? "Minimum reading"}</p>
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" }}>The rest of the trail</p>
        <SourceShelf items={r.fullSources} start={r.minimumReading.length + 1} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="12 · Provenance" title="Where every claim came from">
          <p>The field&rsquo;s layout for F major, A minor and D major follows standard scale membership as a teaching construction (▲); only C major&rsquo;s layout is the record&rsquo;s own qualitative profile.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

import type { TheoryRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Plate, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { SortByFunction, TwoCurrents, DemandFork, ResourceDial, ModelWidens } from "./Interactions";
import s from "./jdr.module.css";

/* ---------------------------------------------------------------------------
   Job Demands–Resources — ONE JOB · TWO CURRENTS.

   The theory's shape is a sorting followed by a divergence: any job's
   conditions fall into two functional categories, and each category sets
   off its own process. So the page keeps one authored working world and
   reads it five ways — as a field of conditions, as a desk where one
   condition changes category, as two parallel currents, as a fork where the
   same effort returns differently, and as a junction where resources change
   the relationship without removing the demand. The theory's own history is
   then drawn as accumulation: a model of burnout that kept widening.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "sorting", num: "01", label: "Sorted by function" },
  { id: "currents", num: "02", label: "Two currents" },
  { id: "demand-types", num: "03", label: "Challenge ≠ hindrance" },
  { id: "touch", num: "04", label: "Where they touch" },
  { id: "widening", num: "05", label: "The model widens" },
  { id: "limits", num: "06", label: "Do not conclude" },
  { id: "sources", num: "07", label: "Sources" },
  { id: "provenance", num: "08", label: "Provenance" },
];

/** The four editorial qualifications carry different provenance: three are the
 *  record's own critique (✦), the last is an open question (?). */
const QUALIFICATION_GLYPH = ["✦", "✦", "✦", "?"] as const;

export function JDRExperience({ record: r }: { record: TheoryRecord }) {
  const [demands, resources] = r.categories ?? [];
  const pathways = r.pathways ?? [];
  const demandTypes = r.demandTypes ?? [];
  const interactions = r.interactions ?? [];

  const opening = (
    <header className={s.opening}>
      <div className={s.openingCopy}>
        <FolioIdentity record={r} standing="Theory · a working record" />
        <h1 className={s.title}>
          <span className={s.titleLine}>Job Demands–</span>
          <span className={s.titleLine}><em>Resources</em></span>
          <span className={s.titleTail}>Theory</span>
        </h1>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <ul className={s.facts} aria-label="The theory at a glance">
          {r.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <Margin className={s.openingMargin} tone="kind">one job · many conditions · two currents</Margin>
      </div>
      <Plate
        className={s.openingPlate}
        src="/visual-language/theories/jdr/jdr-opening.webp"
        mobileSrc="/visual-language/theories/jdr/jdr-opening-880.webp"
        width={1448}
        height={1086}
        priority
        alt="A coloured-pencil working world. One worker sits at a desk at the centre, inside a loose ochre ring. To the left, a vermilion field gathers piled paper, a wall clock, meetings and a person with head in hands; to the right, a teal field gathers colleagues talking, a plant, a feedback board and a staircase. People walk through the space below."
        caption="One constructed workplace holding many conditions at once. Colour separates the theory's two categories — it does not grade them. Handwritten words are illustrative marginalia."
      />
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Job Demands–Resources">
      <Chapter id="sorting" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">The categories</Kicker>
          <h2>Sorted by what a condition <em>does</em>.</h2>
          <div className={s.headLede}>
            <Rich as="p" html={r.ideaLede ?? ""} />
            <Rich as="p" className={s.muted} html={r.categoriesLede ?? ""} />
          </div>
        </div>
        {demands && resources && (
          <SortByFunction demands={demands} resources={resources} note={r.categoriesNote ?? ""} />
        )}
      </Chapter>

      <Chapter id="currents" density="rich" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">The processes</Kicker>
          <h2>Two currents from <em>one job</em>.</h2>
          <div className={s.headLede}><p>{r.pathwaysLede}</p></div>
        </div>
        <TwoCurrents pathways={pathways} />
        <div className={s.misreading}>
          <figure className={s.misFigure} aria-labelledby="jdr-misreading">
            <svg viewBox="0 0 420 232" aria-hidden="true">
              <g className={s.misOne}>
                <path d="M40 58 C 150 54, 270 60, 380 56" filter="url(#folio-graphite)" />
                <circle cx="40" cy="58" r="5" /><circle cx="380" cy="56" r="5" />
                <text x="22" y="90">burnout</text><text x="300" y="90">engagement</text>
                <path className={s.misStrike} d="M92 78 C 170 64, 250 50, 344 26" filter="url(#folio-pencil)" />
              </g>
              <g className={s.misTwo} transform="translate(0 14)">
                <path className={s.misRed} d="M40 136 C 150 132, 270 138, 380 134" filter="url(#folio-pencil)" />
                <path className={s.misTeal} d="M40 180 C 150 176, 270 184, 380 178" filter="url(#folio-pencil)" />
                <text x="40" y="124">exhaustion</text><text x="40" y="202">engagement</text>
                <circle className={s.misDotRed} cx="300" cy="135" r="6" /><circle className={s.misDotTeal} cx="300" cy="180" r="6" />
              </g>
            </svg>
          </figure>
          <div id="jdr-misreading" className={s.misText}>
            <Margin tone="red">not one dial</Margin>
            <p>A common misreading puts burnout and engagement at two ends of one scale. JD–R draws them as <b>separate outcomes of separate processes</b> — one person can sit high on both lines at once.</p>
            <p className={s.caution}><Glyph g="■" /> {r.pathwaysCaution}</p>
          </div>
        </div>
      </Chapter>

      <Chapter id="demand-types" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">Not all demands</Kicker>
          <h2>Challenge <span className={s.notEqual}>≠</span> hindrance.</h2>
          <div className={s.headLede}><p>{r.demandTypesLede}</p></div>
        </div>
        <DemandFork types={demandTypes} />
        <aside className={s.adviceNote}>
          <Margin tone="kind">the type decides the advice</Margin>
          <p>{r.demandTypesNote}</p>
        </aside>
      </Chapter>

      <Chapter id="touch" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">The interactions</Kicker>
          <h2>Where the conditions <em>touch</em>.</h2>
          <div className={s.headLede}><p>{r.interactionsLede}</p></div>
        </div>
        {r.demo && <ResourceDial options={r.demo.options} label={r.demo.label} caption={r.demo.caption} />}
        <div className={s.hypotheses}>
          {interactions.map((x) => (
            <article key={x.title}>
              <p className={s.hypKicker}>{x.kicker}</p>
              <h3>{x.title}</h3>
              <Rich as="p" html={x.body} />
            </article>
          ))}
        </div>
      </Chapter>

      <Chapter id="widening" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">The trail</Kicker>
          <h2>A model of burnout that <em>kept widening</em>.</h2>
          <div className={s.headLede}>
            <Rich as="p" html={r.trailLede} />
            {r.expansionsLede && <p className={s.muted}>{r.expansionsLede}</p>}
          </div>
        </div>
        <ModelWidens origins={r.origins} expansions={r.expansions ?? []} />
        {r.originsNote && (
          <aside className={s.arcNote}>
            <Margin>on the arc</Margin>
            <Rich as="p" html={r.originsNote} />
          </aside>
        )}
      </Chapter>

      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="06 · Do not conclude" title={<>Shortcuts the theory <em>does not license</em>.</>}>
          <p>{r.oversimplificationsLede}</p>
        </CodaHead>
        <div className={s.limits}>
          <Cautions items={r.oversimplifications} />
          <div className={s.qualifications}>
            <h3>Qualifications this record keeps</h3>
            {r.qualifications.map((q, i) => (
              <OpenQuestions key={q} items={[q]} glyph={QUALIFICATION_GLYPH[i] ?? "✦"} />
            ))}
          </div>
        </div>
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="07 · Sources" title={r.minimumReadingLabel ?? "Minimum reading"} />
        <SourceShelf items={r.minimumReading} />
        <h3 className={s.subhead}>The full trail</h3>
        <SourceShelf items={r.fullSources} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="08 · Provenance" title="Where every claim came from" />
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

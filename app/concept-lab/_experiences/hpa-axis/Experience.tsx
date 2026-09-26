import type { TheoryRecord } from "@/content/types";
import { RECORDS, recordHref } from "@/content/records";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, Trail } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { Descent, DayStrip, type StepContent } from "./Interactions";
import s from "./hpa.module.css";

/* ---------------------------------------------------------------------------
   The HPA axis — A LOOP, NOT A LINE.

   A mechanism answers "through what". This one's shape is a descent with a
   return: the brain appraises, three glands pass a messenger down, cortisol
   spreads through body and brain, and the same hormone climbs back up the
   side to regulate what released it. The page is built as that descent. It
   then turns the vertical cascade into horizontal time — one drawn day that
   carries the rhythms and becomes the surface each measurement looks
   through — because the commonest misreading of this literature is to take
   a cortisol value as a stress score.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "status", num: "01", label: "A system, not a theory" },
  { id: "descent", num: "02", label: "The descent" },
  { id: "not-fight-or-flight", num: "03", label: "Not fight-or-flight" },
  { id: "rhythm", num: "04", label: "A rhythm at rest" },
  { id: "measuring", num: "05", label: "Windows of measurement" },
  { id: "chronic", num: "06", label: "Chronic ≠ high" },
  { id: "limits", num: "07", label: "Do not conclude" },
  { id: "trail", num: "08", label: "The trail" },
  { id: "sources", num: "09", label: "Sources" },
  { id: "provenance", num: "10", label: "Provenance" },
];

export function HPAExperience({ record: r }: { record: TheoryRecord }) {
  const cs = r.conceptualStatus!;
  const cascade = r.cascade!;
  const dis = r.disambiguation!;
  const regions = r.fitTargets ?? [];
  const actions = r.interactions ?? [];
  const receptors = r.categories ?? [];
  const rhythms = r.expansions ?? [];
  const measures = r.measures ?? [];
  const jdr = r.relatedTo?.[0];
  const jdrRecord = jdr ? RECORDS.find((x) => x.id === jdr.recordId) : undefined;
  const origin = (y: string) => r.origins.find((o) => o.year === y);

  const steps: StepContent[] = [
    {
      stage: "brain",
      kicker: "Before any hormone moves",
      title: r.headings?.fitTargets?.title ?? "The brain decides before the glands move",
      body: (
        <>
          <ul className={s.regions}>
            {regions.map((g) => (
              <li key={g.id}>
                <h4>{g.title}</h4>
                <p>{g.question}</p>
                <p className={s.regionEg}>{g.example}</p>
              </li>
            ))}
          </ul>
          {origin("2004") && (
            <p className={s.stepSource}>
              <Glyph g="●" /> What reliably switches the cascade on: {origin("2004")!.contribution} <span className={s.cite}>— {origin("2004")!.author.replace(/&amp;/g, "&")}, {origin("2004")!.year}</span>
            </p>
          )}
        </>
      ),
    },
    {
      stage: "crh",
      kicker: `${cascade.nodes[0].label} → ${cascade.messengers[0]}`,
      title: "The hypothalamus sends CRH to the pituitary.",
      body: (
        <>
          <p><b>{cascade.nodes[0].label}</b> — {cascade.nodes[0].sub}. The first messenger, <b>{cascade.messengers[0]}</b>, travels to the <b>{cascade.nodes[1].label.toLowerCase()}</b>.</p>
          {origin("1981") && <p className={s.stepSource}><Glyph g="●" /> {origin("1981")!.contribution} <span className={s.cite}>— {origin("1981")!.author.replace(/&amp;/g, "&")}, 1981</span></p>}
        </>
      ),
    },
    {
      stage: "acth",
      kicker: `${cascade.nodes[1].label} → ${cascade.messengers[1]}`,
      title: "The pituitary releases ACTH into the bloodstream.",
      body: <p><b>{cascade.nodes[1].label}</b> — {cascade.nodes[1].sub}. <b>{cascade.messengers[1]}</b> carries the signal to the <b>{cascade.nodes[2].label.toLowerCase()}</b>.</p>,
    },
    {
      stage: "cortisol",
      kicker: `${cascade.nodes[2].label} → ${cascade.messengers[2]}`,
      title: r.headings?.interactions?.title ?? "What cortisol actually does",
      body: (
        <>
          <p><b>{cascade.nodes[2].label}</b> — {cascade.nodes[2].sub}. <b>{cascade.messengers[2]}</b> reaches <b>{cascade.nodes[3].label.toLowerCase()}</b>: {cascade.nodes[3].sub}.</p>
          <Rich as="p" className={s.stepLede} html={r.interactionsLede ?? ""} />
          <dl className={s.actions}>
            {actions.map((a) => (
              <div key={a.title}>
                <dt><span>{a.kicker}</span>{a.title}</dt>
                <Rich as="dd" html={a.body} />
              </div>
            ))}
          </dl>
        </>
      ),
    },
    {
      stage: "feedback",
      kicker: "The loop up the side",
      title: r.headings?.categories?.title ?? "How it switches itself off",
      body: (
        <>
          <Rich as="p" html={r.categoriesLede ?? ""} />
          <div className={s.receptors}>
            {receptors.map((c) => (
              <article key={c.title}>
                <h4>{c.title}</h4>
                <p>{c.definition}</p>
                <p className={s.regionEg}>{c.examples.join(" · ")}</p>
              </article>
            ))}
          </div>
          <Rich as="p" className={s.stepNote} html={r.categoriesNote ?? ""} />
        </>
      ),
    },
  ];

  const opening = (
    <header className={s.opening}>
      <div className={s.openingCopy}>
        <FolioIdentity record={r} />
        <h1 className={s.title} aria-label="The HPA Axis">
          <span className={s.titleThe} aria-hidden="true">The</span>
          <span className={s.acro} aria-hidden="true">
            <span className={s.acroRow} data-step="1"><b>H</b><i>ypothalamic</i></span>
            <span className={s.acroRow} data-step="2"><b>P</b><i>ituitary</i></span>
            <span className={s.acroRow} data-step="3"><b>A</b><i>drenal</i></span>
          </span>
          <span className={s.titleAxis} aria-hidden="true">Axis</span>
        </h1>
        <p className={s.stamp}>{r.statusChip}</p>
      </div>
      <div className={s.openingRead}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <ul className={s.facts} aria-label="The mechanism at a glance">
          {r.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <Margin tone="violet" className={s.openingMargin}>through what — not why</Margin>
      </div>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="The HPA Axis">
      <Chapter id="status" density="quiet" className={s.band}>
        <div className={s.statusGrid}>
          <div>
            <Kicker num="01">What this is</Kicker>
            <h2 className={s.h2}>A system, <em>not a theory</em>.</h2>
            <Rich as="p" className={s.statusFlag} html={cs.flag} />
            <Rich as="p" className={s.body} html={cs.body} />
          </div>
          <div className={s.statusQuestions}>
            <p className={s.smallHead}>This record answers</p>
            <ol>
              {cs.questions.map((q, i) => <li key={q}><span>{String(i + 1).padStart(2, "0")}</span><Rich html={q} /></li>)}
            </ol>
          </div>
        </div>

        <div className={s.stack}>
          <div className={s.stackTheories}>
            <p className={s.smallHead}>Theories explain when and why</p>
            <p>stress · allostasis · social-evaluative threat</p>
          </div>
          <svg className={s.stackArrow} viewBox="0 0 40 90" aria-hidden="true"><path d="M20 4 C 18 30, 22 56, 20 82" filter="url(#folio-pencil)" /><path d="M11 70 L20 84 L29 70" filter="url(#folio-pencil)" /></svg>
          <div className={s.stackRoute}>
            <p className={s.smallHead}>The mechanism is the route they run down</p>
            <p>hypothalamus → pituitary → adrenal cortex</p>
          </div>
        </div>

        {jdr && jdrRecord && (
          <aside className={s.editorialLink}>
            <p className={s.smallHead}><Glyph g="✦" /> Editorial connection — ours, not the sources&rsquo;</p>
            <h3>Could this be one physical route through the <a href={recordHref(jdrRecord)}>{jdrRecord.title}</a> health-impairment process?</h3>
            <Rich as="p" html={jdr.body} />
          </aside>
        )}
      </Chapter>

      <Chapter id="descent" density="rich" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">The cascade</Kicker>
          <h2 className={s.h2}>Walk down it. <em>Then back up the side.</em></h2>
          <Rich as="p" className={s.headLede} html={r.cascadeLede ?? ""} />
        </div>
        <Descent steps={steps} caption={cascade.caption} />
      </Chapter>

      <Chapter id="not-fight-or-flight" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">Disambiguation</Kicker>
          <h2 className={s.h2}>This is <em>not</em> the fight-or-flight system.</h2>
          <Rich as="p" className={s.headLede} html={dis.flag} />
        </div>
        <figure className={s.lanes}>
          <svg viewBox="0 0 1000 250" aria-hidden="true">
            <path className={s.laneAxis} d="M60 222 C 400 220, 700 224, 960 222" filter="url(#folio-graphite)" />
            {["seconds", "minutes", "and longer"].map((t, i) => <text key={t} className={s.laneTick} x={[150, 520, 860][i]} y={244} textAnchor="middle">{t}</text>)}
            <text className={s.laneName} x="60" y="52">SAM</text>
            <path className={s.laneSam} d="M60 90 C 90 88, 110 40, 140 44 C 170 48, 190 86, 240 90 C 500 92, 800 90, 960 91" filter="url(#folio-pencil)" />
            <text className={s.laneName} x="60" y="146">HPA</text>
            <path className={s.laneHpa} d="M60 186 C 260 186, 380 184, 440 170 C 520 140, 600 132, 700 146 C 800 162, 880 180, 960 184" filter="url(#folio-pencil)" />
          </svg>
          <figcaption className={s.caption}><Glyph g="▲" /> Schematic timescales. Relative timing is the point; the shapes are not measured responses.</figcaption>
        </figure>
        <div className={s.disSides}>
          {[dis.covered, dis.notCovered].map((side, i) => (
            <article key={side.title} data-side={i === 0 ? "hpa" : "sam"}>
              <h3>{side.title}</h3>
              <p>{side.blurb}</p>
              <ul>{side.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </article>
          ))}
        </div>
        <Rich as="p" className={s.disNote} html={dis.note} />
      </Chapter>

      <Chapter id="rhythm" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">Its own rhythm</Kicker>
          <h2 className={s.h2}>It moves <em>even when nothing is wrong</em>.</h2>
          <Rich as="p" className={s.headLede} html={r.expansionsLede ?? ""} />
        </div>
        <DayStrip
          mode="rhythm"
          rhythmsLede={
            <dl className={s.rhythms}>
              {rhythms.map((x) => (<div key={x.title}><dt>{x.title}</dt><Rich as="dd" html={x.body} /></div>))}
            </dl>
          }
        />
      </Chapter>

      <Chapter id="measuring" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">Measuring it</Kicker>
          <h2 className={s.h2}>Every measure is a <em>window</em> of a different size.</h2>
          <Rich as="p" className={s.headLede} html={r.measuresLede ?? ""} />
        </div>
        <DayStrip mode="measure" measures={measures} />
        <aside className={s.warning}>
          <Margin tone="violet">carry this one</Margin>
          <Rich as="p" html={r.measuresNote ?? ""} />
        </aside>
      </Chapter>

      <Chapter id="chronic" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="06">Chronic stress</Kicker>
          <h2 className={s.h2}>Chronic does not mean <em>high</em>.</h2>
          <Rich as="p" className={s.headLede} html={r.oversimplifications[1]} />
        </div>
        <div className={s.triptych}>
          {[
            { k: "raised", label: "raised activity", d: "M20 120 C 30 60, 44 44, 60 42 C 110 50, 170 70, 230 86 C 262 94, 286 96, 300 100" },
            { k: "lowered", label: "lowered activity", d: "M20 150 C 30 128, 44 116, 60 114 C 110 120, 170 134, 230 146 C 262 152, 286 154, 300 156" },
            { k: "altered", label: "altered rhythm", d: "M20 120 C 34 106, 44 100, 60 100 C 110 104, 170 110, 230 116 C 262 118, 286 120, 300 120" },
          ].map((v) => (
            <figure key={v.k} className={s.tri}>
              <svg viewBox="0 0 320 180" aria-hidden="true">
                <path className={s.triBase} d="M20 136 C 30 90, 44 70, 60 68 C 110 76, 170 104, 230 130 C 262 142, 286 148, 300 150" filter="url(#folio-graphite)" />
                <path className={s.triVariant} d={v.d} filter="url(#folio-pencil)" />
                <path className={s.triAxis} d="M20 170 L300 170" />
              </svg>
              <figcaption>{v.label}</figcaption>
            </figure>
          ))}
        </div>
        <p className={s.caption}><Glyph g="▲" /> Directions only, drawn against the same schematic day (graphite). These are not curves from any study.</p>
        {origin("2007") && (
          <p className={s.chronicSource}><Glyph g="●" /> {origin("2007")!.contribution} <span className={s.cite}>— {origin("2007")!.author.replace(/&amp;/g, "&")}, 2007</span></p>
        )}
        {origin("1998") && (
          <p className={s.chronicSource}><Glyph g="●" /> {origin("1998")!.contribution} <span className={s.cite}>— {origin("1998")!.author}, 1998</span></p>
        )}
      </Chapter>

      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="07 · Do not conclude" title={<>Statements this literature <em>contradicts</em>.</>}>
          <p>{r.oversimplificationsLede}</p>
        </CodaHead>
        <div className={s.limits}>
          <Cautions items={r.oversimplifications} />
          <div>
            <p className={s.smallHead}>Open and bounded</p>
            <OpenQuestions items={r.qualifications} />
          </div>
        </div>
      </Chapter>

      <Chapter id="trail" density="scholarly" className={s.band}>
        <CodaHead kicker="08 · The trail" title="From a peptide to a system.">
          <p>{r.trailLede}</p>
        </CodaHead>
        <Trail nodes={r.origins} />
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · Sources" title={r.minimumReadingLabel ?? "Minimum reading"} />
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" }}>The full list</p>
        <SourceShelf items={r.fullSources} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="10 · Provenance" title="Where every claim came from" />
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

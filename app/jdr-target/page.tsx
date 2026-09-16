import type { Metadata } from "next";
import { jobDemandsResources as rec } from "../../content/theory";
import { RECORDS, recordHref } from "../../content/records";
import { Note } from "../surface/_components/Shell";
import { ConditionField } from "./_components/JDRFigures";
import { JDROpening, JDRCategories, JDRProcesses, JDRChallenge, JDRInteraction } from "./_components/JDRInteractive";

export const metadata: Metadata = {
  title: "Job Demands–Resources · visual study",
  description: rec.oneSentence,
  robots: { index: false, follow: false },
};

const SECTIONS = [
  ["jdr-categories", "Two categories"],
  ["jdr-processes", "Two processes"],
  ["jdr-types", "Challenge ≠ hindrance"],
  ["jdr-interactions", "Where the lanes touch"],
  ["jdr-expansions", "What was added later"],
  ["jdr-limits", "Do not conclude"],
  ["jdr-trail", "The trail"],
  ["jdr-sources", "Sources"],
  ["jdr-provenance", "Provenance"],
] as const;

function JDRNav() {
  return (
    <header className="jdr-mast">
      <div className="jdr-mast-in">
        <a className="jdr-brand" href="/concept-lab">
          <span className="jdr-brand-star" aria-hidden="true">✦</span>
          Academic Concept Lab
        </a>
        <nav aria-label="Sections">
          <a href="/concept-lab">Home</a>
          <a href="/concept-lab/library">Library</a>
          <a href="/concept-lab/saved">Saved</a>
          <a href="/concept-lab/about">About</a>
        </nav>
        <span className="jdr-tagline" aria-hidden="true">Ideas, drawn together.</span>
      </div>
    </header>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="jdr-kicker">{children}</p>;
}

function SectionHeading({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <header className="jdr-section-heading">
      <Kicker>{kicker}</Kicker>
      <h2>{children}</h2>
    </header>
  );
}

function Definition({ title, body, examples, tone }: {
  title: string; body: string; examples: string[]; tone: "demand" | "resource";
}) {
  return (
    <article className={"jdr-definition jdr-definition-" + tone}>
      <div className="jdr-definition-mark" aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
        <p className="jdr-examples">{examples.join(" · ")}</p>
      </div>
    </article>
  );
}

function QuietList({ items }: { items: string[] }) {
  return (
    <ul className="jdr-quiet-list">
      {items.map((item) => <li key={item} dangerouslySetInnerHTML={{ __html: item }} />)}
    </ul>
  );
}

function Sources({ items }: { items: { citation: string; contribution: string; doi?: string }[] }) {
  return (
    <ol className="jdr-sources">
      {items.map((item, i) => (
        <li key={item.citation}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p dangerouslySetInnerHTML={{ __html: item.citation }} />
            <small>{item.contribution}</small>
            {item.doi ? <a href={"https://doi.org/" + item.doi} rel="noreferrer">doi {item.doi}</a> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function JDRTargetPage() {
  const related = (rec.relatedTo ?? []).map((link) => ({
    link,
    target: RECORDS.find((record) => record.id === link.recordId),
  }));

  return (
    <>
      <JDRNav />
      <main className="jdr-page" id="jdr-main">
        <div className="jdr-breadcrumb">
          <a href="/concept-lab">Theories</a><span aria-hidden="true">/</span>
          <a href="/concept-lab/library">Organisational Behaviour</a><span aria-hidden="true">/</span>
          <b>Job Demands–Resources</b>
        </div>

        <section className="jdr-opening" aria-labelledby="jdr-title">
          <div className="jdr-opening-copy">
            <Kicker>Organisational behaviour · theory record</Kicker>
            <h1 id="jdr-title">Job Demands–<em>Resources</em></h1>
            <p className="jdr-opening-sub">{rec.oneSentence}</p>
            <p className="jdr-opening-hook">{rec.hook}</p>
            <div className="jdr-opening-facts" aria-label="Record facts">
              <div><strong>2</strong><span>categories</span></div>
              <div><strong>2</strong><span>processes</span></div>
              <div><strong>2001 → 2023</strong><span>theory arc</span></div>
              <div><strong>≠</strong><span>challenge / hindrance</span></div>
            </div>
            <a className="jdr-cta" href="#jdr-categories">Enter the working field <span aria-hidden="true">→</span></a>
            <p className="jdr-opening-note">One job can contain both cost and capacity.</p>
          </div>
          <div className="jdr-opening-art">
            <JDROpening />
            <p className="jdr-caption"><b>Figure 01.</b> One workplace, many simultaneous conditions. The colours separate theoretical categories; they do not grade them.</p>
          </div>
        </section>

        <section className="jdr-contents" aria-label="On this page">
          <Kicker>Read the record</Kicker>
          <ol>
            {SECTIONS.map(([id, label], i) => <li key={id}><span>{String(i + 1).padStart(2, "0")}</span><a href={"#" + id}>{label}</a></li>)}
          </ol>
        </section>

        <section className="jdr-section jdr-categories" id="jdr-categories">
          <SectionHeading kicker="02 · The categories">
            Every job is different. The <em>categories</em> are not.
          </SectionHeading>
          <div className="jdr-category-intro">
            <p className="jdr-lede" dangerouslySetInnerHTML={{ __html: rec.categoriesLede ?? "" }} />
            <Note html={rec.categoriesNote} label="The qualification" />
          </div>
          <div className="jdr-category-field"><ConditionField /></div>
          <JDRCategories />
          <div className="jdr-definition-grid">
            {(rec.categories ?? []).map((category, i) => (
              <Definition key={category.title} title={category.title} body={category.definition}
                examples={category.examples} tone={i === 0 ? "demand" : "resource"} />
            ))}
          </div>
        </section>

        <section className="jdr-section jdr-processes" id="jdr-processes">
          <SectionHeading kicker="03 · The processes">
            Two currents from <em>one job</em>.
          </SectionHeading>
          <p className="jdr-lede">{rec.pathwaysLede}</p>
          <div className="jdr-process-art"><JDRProcesses /></div>
          <p className="jdr-caption jdr-caption-wide"><b>Figure 02.</b> The health-impairment and motivational processes have equal standing. They can coexist in one person; they are not opposite ends of a single scale.</p>
          <Note html={rec.pathwaysCaution} label="Read the parallelism carefully" />
        </section>

        <section className="jdr-section jdr-types" id="jdr-types">
          <SectionHeading kicker="04 · Not all demands">
            Challenge <span className="jdr-marked-equals">≠</span> hindrance
          </SectionHeading>
          <div className="jdr-split-lede">
            <p className="jdr-lede">{rec.demandTypesLede}</p>
            <Note html={rec.demandTypesNote} label="The distinction changes the advice" />
          </div>
          <div className="jdr-cost-art"><JDRChallenge /></div>
          <div className="jdr-demand-rows">
            {(rec.demandTypes ?? []).map((demand, i) => (
              <article key={demand.title}>
                <span className={"jdr-row-dot jdr-row-dot-" + (i === 0 ? "teal" : "vermilion")} aria-hidden="true" />
                <div>
                  <h3>{demand.title}</h3>
                  <p>{demand.definition}</p>
                  <p className="jdr-examples">{demand.examples.join(" · ")}</p>
                  <p className="jdr-relates">Relates to {demand.relates}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="jdr-section jdr-interactions" id="jdr-interactions">
          <SectionHeading kicker="05 · The interactions">
            Where the conditions <em>touch</em>.
          </SectionHeading>
          <p className="jdr-lede">{rec.interactionsLede}</p>
          <div className="jdr-interaction-layout">
            <div className="jdr-interaction-copy">
              {(rec.interactions ?? []).map((interaction) => (
                <article key={interaction.title}>
                  <Kicker>{interaction.kicker}</Kicker>
                  <h3>{interaction.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: interaction.body }} />
                </article>
              ))}
            </div>
            <div className="jdr-interaction-art"><JDRInteraction /></div>
          </div>
        </section>

        <section className="jdr-section jdr-expansions" id="jdr-expansions">
          <SectionHeading kicker="06 · After 2001">What was added later.</SectionHeading>
          <p className="jdr-lede">{rec.expansionsLede}</p>
          <div className="jdr-expansion-grid">
            {(rec.expansions ?? []).map((expansion, i) => (
              <article key={expansion.title}>
                <span className={"jdr-expansion-number jdr-expansion-" + i} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{expansion.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: expansion.body }} />
              </article>
            ))}
          </div>
        </section>

        <section className="jdr-section jdr-limits" id="jdr-limits">
          <SectionHeading kicker="07 · Do not conclude">Shortcuts the theory does not license.</SectionHeading>
          <p className="jdr-lede">{rec.oversimplificationsLede}</p>
          <div className="jdr-limit-layout">
            <QuietList items={rec.oversimplifications} />
            <div className="jdr-limit-note">
              <p className="jdr-hand">Uncertainty is content,<br />not a defect to smooth away.</p>
              <h3>Qualifications the record keeps</h3>
              <QuietList items={rec.qualifications} />
            </div>
          </div>
        </section>

        <section className="jdr-section jdr-trail" id="jdr-trail">
          <SectionHeading kicker="08 · The trail">Where the claims come from.</SectionHeading>
          <p className="jdr-lede" dangerouslySetInnerHTML={{ __html: rec.trailLede }} />
          <ol className="jdr-trail-list">
            {rec.origins.map((origin) => (
              <li key={origin.year}>
                <span>{origin.year}</span>
                <div>
                  <h3>{origin.author}</h3>
                  <p dangerouslySetInnerHTML={{ __html: origin.work }} />
                  <small>{origin.contribution}</small>
                </div>
              </li>
            ))}
          </ol>
          {rec.originsNote ? <Note html={rec.originsNote} label="On the arc" /> : null}
        </section>

        <section className="jdr-section jdr-sources" id="jdr-sources">
          <SectionHeading kicker="09 · Sources">{rec.minimumReadingLabel ?? "Minimum reading"}.</SectionHeading>
          <Sources items={rec.minimumReading} />
          <h3 className="jdr-subhead">Full source list</h3>
          <Sources items={rec.fullSources} />
        </section>

        <section className="jdr-section jdr-provenance" id="jdr-provenance">
          <SectionHeading kicker="10 · Provenance">What kind of claim each mark on this page is.</SectionHeading>
          <ul className="jdr-provenance-list">
            {rec.provenance.map((item) => (
              <li key={item.label}>
                <span aria-hidden="true">{item.glyph}</span>
                <div><h3>{item.label}</h3><p>{item.note}</p></div>
              </li>
            ))}
          </ul>
        </section>

        {related.length ? (
          <section className="jdr-section jdr-related">
            <SectionHeading kicker="11 · Nearby">Records that ask a different question.</SectionHeading>
            <ul>
              {related.map(({ link, target }) => (
                <li key={link.recordId}>
                  {target ? <a href={recordHref(target)}>{target.title}</a> : <span>{link.recordId}</span>}
                  <p><i>{link.relation}</i> — {link.body}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
      <footer className="jdr-foot">
        <span>Academic Concept Lab · JD–R visual study</span>
        <span>Typeset knowledge · drawn thinking</span>
        <span>Isolated review prototype · not production</span>
      </footer>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { personEnvironmentFit as record } from "@/content/theory";
import { SaveButton } from "../concept-lab/_components/SaveButton";
import { ContentsNav } from "../concept-lab/_components/ContentsNav";
import { KnowledgeNeighbourhood } from "../concept-lab/_components/KnowledgeNeighbourhood";
import { PEFitSynthesis } from "./_components/PEFitSynthesis";

const art = {
  primary: "/pe-fit-visual-translation-assets/pe-fit-C-editorial-research-drawing.png",
  observational: "/pe-fit-visual-translation-assets/pe-fit-A-observational-workplace.png",
  relational: "/pe-fit-visual-translation-assets/pe-fit-B-relational-field.png",
};

const toc: [string, string, string][] = [
  ["01", "Two currents", "correspondence"],
  ["02", "Four targets", "targets"],
  ["03", "Degree", "degree"],
  ["04", "Adjustment", "adjustment"],
  ["05", "Measurement", "measurement"],
  ["06", "Lineage", "lineage"],
  ["07", "Limits", "limits"],
  ["08", "Reading", "reading"],
  ["09", "Sources", "sources"],
  ["10", "Neighbourhood", "knowledge-neighbourhood-title"],
];

function RichText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function PEFitVisualTranslationPage() {
  return (
    <main id="pefit-main" className="pe-vt-page">
      <div className="pe-vt-wrap">
        <nav className="pe-vt-crumb" aria-label="Breadcrumb">
          <Link href="/concept-lab">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/concept-lab/library">Library</Link>
          <span aria-hidden="true">/</span>
          <Link href="/concept-lab/theory/person-environment-fit">Person–Environment Fit</Link>
          <span aria-hidden="true">/</span>
          <span>Visual Translation Lab</span>
        </nav>

        <section className="pe-vt-hero" aria-labelledby="pe-vt-title">
          <div className="pe-vt-hero-copy">
            <div className="pe-vt-hero-meta">
              <span>THEORY · ORGANISATIONAL BEHAVIOUR</span>
              <SaveButton id={record.id} />
            </div>

            <p className="pe-vt-phase">PHASE 3 · SELECTED SYNTHESIS</p>

            <h1 id="pe-vt-title">
              Person–<br />
              <em>Environment</em> Fit
            </h1>

            <p className="pe-vt-hook">{record.hook}</p>

            <div className="pe-vt-opening-thesis">
              <span className="pe-vt-hand">the same working world, read again</span>
              <strong>
                Fit lives
                <br />
                <em>between them.</em>
              </strong>
            </div>

            <p className="pe-vt-lede">{record.oneSentence}</p>

            <dl className="pe-vt-facts">
              <div>
                <dt>02</dt>
                <dd>forms of correspondence</dd>
              </div>
              <div>
                <dt>04</dt>
                <dd>fit targets</dd>
              </div>
              <div>
                <dt>?</dt>
                <dd>no single uncontested origin</dd>
              </div>
            </dl>

            <a className="pe-vt-enter" href="#correspondence">
              Read the relation <span aria-hidden="true">↘</span>
            </a>
          </div>

          <figure className="pe-vt-hero-world">
            <div className="pe-vt-world-paper">
              <Image
                src={art.primary}
                alt="A coloured-pencil research drawing of one person at a desk within a workplace, surrounded by tasks, colleagues, a supervisor and the broader organisation."
                fill
                priority
                sizes="(max-width: 820px) 100vw, 58vw"
              />
              <svg className="pe-vt-hero-traces" viewBox="0 0 1536 1024" aria-hidden="true">
                <path className="pe-vt-trace pe-vt-trace-da" d="M286 555C432 421 562 398 742 472C818 504 862 509 928 480" />
                <path className="pe-vt-trace pe-vt-trace-ns" d="M746 506C882 431 1036 424 1216 500C1275 525 1322 538 1370 527" />
                <path className="pe-vt-trace pe-vt-trace-residue" d="M475 654C638 612 779 628 920 679C1025 717 1118 718 1258 683" />
              </svg>
              <span className="pe-vt-world-note pe-vt-world-note-one">person</span>
              <span className="pe-vt-world-note pe-vt-world-note-two">environment</span>
              <span className="pe-vt-world-note pe-vt-world-note-gap">the relation is the subject</span>
            </div>
            <figcaption>
              <span>AUTHORED ART · TEACHING / EDITORIAL MATERIAL</span>
              <p>
                The artwork holds one persistent working world. Live text and code carry the
                academic distinctions; the image is not empirical evidence.
              </p>
            </figcaption>
          </figure>
        </section>

        <div className="pe-vt-reading-layout">
          <ContentsNav toc={toc} />

          <article className="pe-vt-reading">
            <PEFitSynthesis record={record} />

            <section className="pe-vt-scholar pe-vt-measurement" id="measurement" aria-labelledby="measurement-title">
              <div className="pe-vt-section-mark">
                <span>05</span>
                <span>MEASUREMENT / BOUNDARY</span>
              </div>

              <div className="pe-vt-scholar-heading">
                <div>
                  <p className="pe-vt-hand">do not let a drawing become a score</p>
                  <h2 id="measurement-title">
                    A relation can be visualised
                    <br />
                    <em>without pretending it was measured.</em>
                  </h2>
                </div>
                <p>
                  The canonical record establishes correspondence, multiple targets and a warning:
                  construct definitions, measurement, context and study design matter. It does not
                  license a universal “fit percentage.”
                </p>
              </div>

              <div className="pe-vt-measure-ledger">
                <div>
                  <span className="pe-vt-glyph">▲</span>
                  <strong>Teaching analogy</strong>
                  <p>
                    Under-supplied, correspondence and over-supplied are used here to make a
                    relational idea inspectable. They are not a validated score, rank or outcome
                    prediction.
                  </p>
                </div>
                <div>
                  <span className="pe-vt-glyph">■</span>
                  <strong>What remains live HTML</strong>
                  <p>
                    Definitions, target labels, qualifications, sources and provenance stay outside
                    the artwork so the academic argument never depends on raster text.
                  </p>
                </div>
                <div>
                  <span className="pe-vt-glyph">?</span>
                  <strong>What this prototype does not settle</strong>
                  <p>
                    A fuller account of competing fit-measurement approaches would require separate
                    canonical content work. Phase 3 does not silently invent that scholarship.
                  </p>
                </div>
              </div>

              <blockquote className="pe-vt-boundary-quote">
                <RichText html={record.oversimplifications[3]} />
              </blockquote>
            </section>

            <section className="pe-vt-scholar pe-vt-lineage" id="lineage" aria-labelledby="lineage-title">
              <div className="pe-vt-section-mark">
                <span>06</span>
                <span>HISTORICAL LINEAGE</span>
              </div>

              <div className="pe-vt-scholar-heading">
                <div>
                  <p className="pe-vt-hand">a trail, not a heroic origin story</p>
                  <h2 id="lineage-title">
                    More than one doorway
                    <br />
                    <em>into the relation.</em>
                  </h2>
                </div>
                <p>{record.originsNote}</p>
              </div>

              <ol className="pe-vt-origin-list">
                {record.origins.map((origin, index) => (
                  <li key={`${origin.year}-${origin.author}`}>
                    <span className="pe-vt-origin-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="pe-vt-origin-year">{origin.year}</span>
                    <div>
                      <h3>{origin.author}</h3>
                      <p className="pe-vt-origin-work"><RichText html={origin.work} /></p>
                      <p>{origin.contribution}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="pe-vt-question-mark" aria-label="Historical origin remains qualified">
                ?
              </p>
            </section>

            <section className="pe-vt-scholar pe-vt-limits" id="limits" aria-labelledby="limits-title">
              <div className="pe-vt-section-mark">
                <span>07</span>
                <span>LIMITS / OPEN QUESTIONS</span>
              </div>

              <div className="pe-vt-scholar-heading">
                <div>
                  <p className="pe-vt-hand">the page should end quieter than it began</p>
                  <h2 id="limits-title">
                    Correspondence
                    <br />
                    <em>needs its conditions.</em>
                  </h2>
                </div>
                <p>{record.oversimplificationsLede}</p>
              </div>

              <ol className="pe-vt-dont-list">
                {record.oversimplifications.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p><RichText html={item} /></p>
                  </li>
                ))}
              </ol>

              <div className="pe-vt-qualification-field">
                <p className="pe-vt-hand">still open in the record</p>
                <ul>
                  {record.qualifications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="pe-vt-scholar pe-vt-reading-section" id="reading" aria-labelledby="reading-title">
              <div className="pe-vt-section-mark">
                <span>08</span>
                <span>{record.minimumReadingLabel?.toUpperCase() ?? "MINIMUM READING"}</span>
              </div>

              <div className="pe-vt-scholar-heading">
                <div>
                  <p className="pe-vt-hand">follow the argument back to paper</p>
                  <h2 id="reading-title">
                    Three ways into
                    <br />
                    <em>the correspondence.</em>
                  </h2>
                </div>
                <p>
                  The reading list remains deliberately small: conceptual integration, evidence
                  across workplace fit targets, and later theoretical assessment.
                </p>
              </div>

              <ol className="pe-vt-reading-list">
                {record.minimumReading.map((source, index) => (
                  <li key={source.citation}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p><RichText html={source.citation} /></p>
                      <small>{source.contribution}</small>
                      {source.doi && (
                        <a href={`https://doi.org/${source.doi}`}>
                          DOI <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <aside className="pe-vt-evidence-note">
                <span className="pe-vt-glyph">●</span>
                <p>
                  The 2005 source is represented here as a meta-analysis across workplace fit
                  targets. No effect size is reproduced because the canonical record does not
                  supply one.
                </p>
              </aside>
            </section>

            <section className="pe-vt-scholar pe-vt-sources" id="sources" aria-labelledby="sources-title">
              <div className="pe-vt-section-mark">
                <span>09</span>
                <span>SOURCES / PROVENANCE</span>
              </div>

              <div className="pe-vt-scholar-heading">
                <div>
                  <p className="pe-vt-hand">the record beneath the field notes</p>
                  <h2 id="sources-title">
                    Keep every mark
                    <br />
                    <em>attached to its status.</em>
                  </h2>
                </div>
                <p>
                  Source claims, paraphrase, teaching analogy and unresolved questions stay visibly
                  different even when they share one page.
                </p>
              </div>

              <ol className="pe-vt-source-list">
                {record.fullSources.map((source, index) => (
                  <li key={source.citation}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p><RichText html={source.citation} /></p>
                      <small>{source.contribution}</small>
                      {source.doi && (
                        <a href={`https://doi.org/${source.doi}`}>
                          DOI <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <ul className="pe-vt-provenance" aria-label="Provenance marks">
                {record.provenance.map((item) => (
                  <li key={item.label}>
                    <span style={{ color: item.colour }}>{item.glyph}</span>
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.note}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pe-vt-art-ledger" aria-labelledby="art-ledger-title">
                <div className="pe-vt-art-ledger-copy">
                  <p className="pe-vt-hand">supporting material · not new evidence</p>
                  <h3 id="art-ledger-title">Three authored sources, one visual world.</h3>
                  <p>
                    C is the persistent editorial world used throughout the page. A informs lived
                    workplace detail; B informs trace, gap and negative-space behaviour. Neither A
                    nor B replaces the live academic record.
                  </p>
                </div>

                <figure>
                  <div className="pe-vt-reference-art">
                    <Image
                      src={art.observational}
                      alt="An observational coloured-pencil workplace reference used for human gesture and lived detail."
                      fill
                      sizes="(max-width: 720px) 100vw, 28vw"
                    />
                  </div>
                  <figcaption>A · observational workplace</figcaption>
                </figure>

                <figure>
                  <div className="pe-vt-reference-art">
                    <Image
                      src={art.relational}
                      alt="An abstract relational-field reference used to study gap, trace and directional correspondence."
                      fill
                      sizes="(max-width: 720px) 100vw, 28vw"
                    />
                  </div>
                  <figcaption>B · relational field</figcaption>
                </figure>
              </div>
            </section>

            <section className="pe-vt-neighbourhood" aria-label="Knowledge neighbourhood">
              <div className="pe-vt-section-mark">
                <span>10</span>
                <span>KNOWLEDGE NEIGHBOURHOOD</span>
              </div>
              <KnowledgeNeighbourhood record={record} />
            </section>
          </article>
        </div>

        <div className="pe-vt-stop">
          <span>PHASE 3 STOP POINT</span>
          <p>
            Full-page prototype only. Review this experience before any canonical integration,
            freeze, merge to main or Production deployment.
          </p>
          <Link href="/concept-lab/theory/person-environment-fit">
            Compare with the current canonical record <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

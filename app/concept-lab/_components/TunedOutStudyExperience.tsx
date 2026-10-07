import Image from "next/image";
import type { PaperRecord } from "@/content/types";
import { Divider, Rich, SecHead } from "./Sketch";
import { RecordShell } from "./RecordShell";
import { SaveButton } from "./SaveButton";
import { AttributionExplorer, ClaimEvidenceExplorer, StudyDossier } from "./TunedOutStudyInteractions";
import styles from "./tuned-out-study.module.css";

const SECTION_LABELS = [
  ["01", "The question", "question"],
  ["02", "From behaviour to judgment", "model"],
  ["03", "Three studies", "studies"],
  ["04", "A qualified pattern", "findings"],
  ["05", "Claim versus evidence", "claims"],
  ["06", "Boundaries of the evidence", "boundaries"],
  ["07", "Implications and source trail", "sources"],
] as const;

function ObserverHero({ record }: { record: PaperRecord }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <div className={styles.heroTopline}>
          <span className={styles.kindLabel}>Empirical study · Organisational behaviour</span>
          <SaveButton id={record.id} />
        </div>
        <span className={styles.heroIndex}>A study of observer interpretation</span>
        <h1>{record.title}</h1>
        <p className={styles.heroHook}>{record.hook}</p>
        <p className={styles.heroLede}>{record.oneSentence}</p>
        <div className={styles.heroCitation}>
          <p><Rich html={record.citation.authors} /> ({record.citation.year})</p>
          <i>{record.citation.journal}, {record.citation.volume}</i>
        </div>
        <ul className={styles.heroFacts} aria-label="Study overview">
          <li>3 complementary studies</li>
          <li>2 preregistered</li>
          <li>{record.citation.journal} · {record.citation.year}</li>
        </ul>
      </div>

      <figure className={styles.heroArt}>
        <Image
          alt="Editorial pencil reconstruction: one employee wearing headphones at work, with two coworkers considering the same visible behaviour along coral and teal traces."
          className={styles.heroImage}
          height={1024}
          unoptimized
          priority
          sizes="(max-width: 850px) 100vw, 58vw"
          src="/study-tuned-out-assets/observer-lens.png"
          width={1536}
        />
        <div className={styles.artLegend} role="group" aria-label="Two possible observer attributions">
          <span><i className={styles.leisureMark} aria-hidden="true" />Leisure attribution</span>
          <span><i className={styles.productivityMark} aria-hidden="true" />Productivity attribution</span>
        </div>
        <figcaption>One visible behaviour; different observer readings. The illustration is an editorial reconstruction, not an article figure or depiction of study participants.</figcaption>
      </figure>
    </section>
  );
}

function ReadingRoute() {
  return (
    <nav className={styles.readingRoute} aria-label="Study sections">
      <span className={styles.routeIntro}><i>follow the argument</i><b>question → evidence → boundary</b></span>
      {SECTION_LABELS.map(([number, label, id]) => (
        <a href={`#${id}`} key={id}><span>{number}</span><strong>{label}</strong></a>
      ))}
      <span className={styles.routeEnd}>then read the source ↘</span>
    </nav>
  );
}

export function TunedOutStudyExperience({ record }: { record: PaperRecord }) {
  const toc = SECTION_LABELS.map(([number, label, id]) => [number, label, id] as [string, string, string]);

  return (
    <RecordShell
      hero={<ObserverHero record={record} />}
      readingRoute={<ReadingRoute />}
      record={record}
      showContentsNav={false}
      toc={toc}
    >
      <div className={styles.experience}>
        <section className={`rec ${styles.section}`} id="question" aria-labelledby="question-heading">
          <div className={styles.sectionHeading}>
            <span>01 · Research question</span>
            <h2 id="question-heading">The same cue, read from the outside.</h2>
          </div>
          <div className={styles.questionGrid}>
            <blockquote>{record.researchQuestion}</blockquote>
            <div>
              <Rich as="p" className="body" html={record.theoreticalFoundation} />
              <p className={styles.questionBoundary}>What coworkers infer is the object of study; it is not proof of what the listener intended.</p>
            </div>
          </div>
        </section>

        <Divider />

        <section className={`rec ${styles.section} ${styles.modelSection}`} id="model" aria-label="From behaviour to social judgment">
          <SecHead num="02" title="From behaviour to social judgment" colour="var(--red-deep)" />
          <p className={styles.sectionLede}>The article’s model traces a proposed perceptual pathway. Change the attribution reading while keeping the shared behaviour—and the alternative—visible.</p>
          <AttributionExplorer
            findings={record.crossStudyFindings}
            hypotheses={record.hypotheses}
            model={record.conceptualModel}
            studies={record.studies}
          />
          <p className={styles.sourceLabel}>The visual pathway is a teaching reconstruction of the canonical conceptual model, not a validated prediction or quantitative effect map.</p>
        </section>

        <Divider />

        <section className={`rec ${styles.section}`} id="studies" aria-labelledby="studies-heading">
          <div className={styles.sectionHeading}>
            <span>03 · Evidence dossier</span>
            <h2 id="studies-heading">Three studies, one line of inquiry.</h2>
            <p>Different designs contribute different kinds of evidence. Select a study to inspect its question, method, role, result and boundary.</p>
          </div>
          <StudyDossier studies={record.studies} />
        </section>

        <Divider />

        <section className={`rec ${styles.section}`} id="findings" aria-labelledby="findings-heading">
          <div className={styles.sectionHeading}>
            <span>04 · Cross-study reading</span>
            <h2 id="findings-heading">A consistent pattern, with important nuances.</h2>
            <p>The package is more qualified than “music helps” or “music harms.”</p>
          </div>
          <div className={styles.findingsField}>
            <article className={styles.findingLeisure}>
              <span>Leisure attribution</span>
              <Rich as="p" html={record.crossStudyFindings[0]} />
            </article>
            <article className={styles.findingProductivity}>
              <span>Productivity attribution</span>
              <Rich as="p" html={record.crossStudyFindings[1]} />
            </article>
            <p className={styles.findingBridge}>{record.crossStudyFindings[2]}</p>
          </div>
        </section>

        <Divider />

        <section className={`rec ${styles.section}`} id="claims" aria-labelledby="claims-heading">
          <div className={styles.sectionHeading}>
            <span>05 · Evidence register</span>
            <h2 id="claims-heading">Claim versus evidence.</h2>
            <p>Inspect what this research package supports, qualifies or leaves unestablished.</p>
          </div>
          <ClaimEvidenceExplorer claims={record.claimEvidencePairs} />
        </section>

        <Divider />

        <section className={`rec ${styles.section}`} id="boundaries" aria-label="Boundaries of the evidence">
          <SecHead num="06" title="Boundaries of the evidence" colour="var(--teal-deep)" />
          <div className={styles.boundaryGrid}>
            <div className={styles.robustness}>
              <span className={styles.marginLabel}>{record.robustness.length} robustness checks reported</span>
              <p>These are checks the authors examined. Their presence does not mean every alternative explanation was conclusively eliminated.</p>
              <ul>{record.robustness.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className={styles.alternatives}>
              <span className={styles.marginLabel}>Alternative explanations and context</span>
              {record.alternativeExplanations.map((item) => <Rich as="p" className={styles.alternativeNote} html={item.text} key={item.text} />)}
            </div>
          </div>
          <div className={styles.limitColumns}>
            <div>
              <h3>Strengths</h3>
              <ul>{record.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>Study limits</h3>
              <ul>{record.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <Divider />

        <section className={`rec ${styles.section} ${styles.quietSection}`} id="sources" aria-label="Implications and source trail">
          <SecHead num="07" title="Implications and source trail" colour="var(--pen-3)" />
          <div className={styles.contributions}>
            <div>
              <span className={styles.marginLabel}>Contribution</span>
              {record.contributions.map((item) => <Rich as="p" html={item} key={item} />)}
            </div>
            <div>
              <span className={styles.marginLabel}>Practice implications</span>
              {record.implications.map((item) => <Rich as="p" html={item} key={item} />)}
            </div>
          </div>
          <div className={styles.sourceTrail}>
            <div>
              <span className={styles.marginLabel}>Published source</span>
              <p><Rich html={record.citation.authors} /> ({record.citation.year}). “{record.title}.” <i>{record.citation.journal}</i>, {record.citation.volume}.</p>
              <a href={`https://doi.org/${record.citation.doi}`} target="_blank" rel="noreferrer">https://doi.org/{record.citation.doi}</a>
              <a href={record.openMaterials} target="_blank" rel="noreferrer">Open data, materials, code and supplemental material</a>
            </div>
            <div className={styles.provenance}>
              <span className={styles.marginLabel}>How to read the marks</span>
              {record.provenance.map((item) => (
                <div className={styles.provenanceItem} key={item.label}>
                  <span style={{ color: item.colour }} aria-hidden="true">{item.glyph}</span>
                  <div><b>{item.label}</b><p>{item.note}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </RecordShell>
  );
}

import Link from "next/link";
import type { CSSProperties } from "react";
import type { PaperRecord, Provenance } from "@/content/types";
import { DISCIPLINES } from "@/content/disciplines";
import { recordHref } from "@/content/records";
import { Rich } from "../_components/Sketch";
import { SaveButton } from "../_components/SaveButton";
import { Crumbs } from "../_components/RecordShell";
import styles from "./study-library.module.css";

const TRAIL = [
  ["Question", "question"],
  ["Design", "design"],
  ["Evidence", "evidence"],
  ["Claim", "claims"],
  ["Boundary", "boundary"],
] as const;

function ProvenanceMark({ item }: { item: Provenance }) {
  return (
    <li className={styles.provenanceItem}>
      <span className={styles.provenanceGlyph} aria-hidden="true" style={{ color: item.colour }}>{item.glyph}</span>
      <div><strong>{item.label}</strong><p>{item.note}</p></div>
    </li>
  );
}

function StudyDossier({ record }: { record: PaperRecord }) {
  const discipline = DISCIPLINES[record.discipline];

  return (
    <article className={styles.dossier} aria-labelledby="study-title">
      <header className={styles.dossierHead}>
        <div className={styles.dossierTitle}>
          <span className={styles.dossierKind}>Study · {discipline?.name ?? record.discipline} · {record.citation.year}</span>
          <h2 id="study-title">{record.title}</h2>
          <p className={styles.dossierHook}>{record.hook}</p>
          <p className={styles.orientation}>{record.oneSentence}</p>
          <ul className={styles.factLine} aria-label="Study package facts">
            {record.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        </div>
        <div className={styles.sourceNote}>
          <span className={styles.microLabel}>Published source</span>
          <p className={styles.authors}>{record.citation.authors.replaceAll("&amp;", "&")}</p>
          <p className={styles.publication}><i>{record.citation.journal}</i>, {record.citation.volume} · {record.citation.year}</p>
          <a className={styles.doi} href={`https://doi.org/${record.citation.doi}`}>doi:{record.citation.doi}<span aria-hidden="true"> ↗</span></a>
          <div className={styles.sourceActions}>
            <SaveButton id={record.id} />
            <Link className={styles.recordLink} href={recordHref(record)}>Read full record <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </header>

      <nav className={styles.trail} aria-label="Study evidence trail">
        <span className={styles.trailLabel}>Follow the argument</span>
        <ol>
          {TRAIL.map(([label, id], index) => (
            <li key={id}>
              {index > 0 && <span className={styles.trailJoin} aria-hidden="true">·</span>}
              <a href={`#${id}`}><span className={styles.trailIndex}>0{index + 1}</span>{label}</a>
            </li>
          ))}
        </ol>
      </nav>

      <section className={styles.argumentSection} id="question" aria-labelledby="question-heading">
        <div className={styles.sectionHeading}>
          <span>01 · Question</span>
          <h3 id="question-heading">What is being explained?</h3>
        </div>
        <div className={styles.questionBody}>
          <blockquote>{record.researchQuestion}</blockquote>
          <div className={styles.contextColumn}>
            <span className={styles.microLabel}>Theoretical footing</span>
            <Rich as="p" html={record.theoreticalFoundation} />
            <span className={styles.microLabel}>Proposed sequence in this record</span>
            <ol className={styles.modelSequence}>
              {record.conceptualModel.map((part, index) => <li key={part}><span>{part}</span>{index < record.conceptualModel.length - 1 && <span className={styles.modelJoin} aria-hidden="true">→</span>}</li>)}
            </ol>
          </div>
          <div className={styles.hypothesisColumn}>
            <span className={styles.microLabel}>Hypotheses</span>
            <ol>{record.hypotheses.map((hypothesis) => <li key={hypothesis}>{hypothesis}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className={styles.argumentSection} id="design" aria-labelledby="design-heading">
        <div className={styles.sectionHeading}>
          <span>02 · Design</span>
          <h3 id="design-heading">Three studies, different kinds of leverage.</h3>
          <p>The package moves from naturally occurring dyads to controlled and then field-based experimental evidence.</p>
        </div>
        <div className={styles.studyEntries}>
          {record.studies.map((study, index) => (
            <section className={styles.studyEntry} id={`study-${index + 1}`} key={study.label} aria-labelledby={`study-heading-${index + 1}`}>
              <header className={styles.studyEntryHead}>
                <span className={styles.studyIndex}>{study.label}</span>
                <h4 id={`study-heading-${index + 1}`}>{study.design}</h4>
                <p><span>{study.location}</span><span>{study.n} participants</span></p>
              </header>
              <dl className={styles.studyDetails}>
                <div className={styles.studyQuestion}><dt>Question</dt><dd>{study.question}</dd></div>
                <div className={styles.studyMethod}><dt>Method</dt><dd>{study.method}</dd></div>
                <div className={styles.studyResult}><dt>Reported result</dt><dd>{study.result}</dd></div>
                <div className={styles.studyContext}><dt>People / setting</dt><dd>{study.sample}</dd></div>
                <div className={styles.studyRole}><dt>Role in the package</dt><dd>{study.role}</dd></div>
                <div className={styles.studyStrength}><dt>Strength</dt><dd>{study.strength}</dd></div>
                <div className={styles.studyLimit}><dt>Study boundary</dt><dd>{study.limitation}</dd></div>
              </dl>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.argumentSection} id="evidence" aria-labelledby="evidence-heading">
        <div className={styles.sectionHeading}>
          <span>03 · Evidence</span>
          <h3 id="evidence-heading">What recurs across the package?</h3>
        </div>
        <div className={styles.evidenceBody}>
          <ol className={styles.findings}>
            {record.crossStudyFindings.map((finding, index) => <li key={finding}><span>0{index + 1}</span><Rich as="p" html={finding} /></li>)}
          </ol>
          <div className={styles.robustness}>
            <span className={styles.microLabel}>Checks reported</span>
            <p>The authors tested whether the pattern held across:</p>
            <ul>{record.robustness.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
        <div className={styles.alternatives}>
          <span className={styles.microLabel}>Alternative explanations and context</span>
          <ul>{record.alternativeExplanations.map((item) => <li key={item.text}><span aria-hidden="true">{item.icon === "i-q" ? "?" : "•"}</span><Rich as="p" html={item.text} /></li>)}</ul>
          <span className={styles.microLabel}>Strengths of the package</span>
          <ul>{record.strengths.map((item) => <li key={item}><span aria-hidden="true">·</span><p>{item}</p></li>)}</ul>
        </div>
      </section>

      <section className={styles.argumentSection} id="claims" aria-labelledby="claims-heading">
        <div className={styles.sectionHeading}>
          <span>04 · Claim</span>
          <h3 id="claims-heading">What can the evidence carry?</h3>
          <p>Each statement below is paired with the record’s own evidential qualification.</p>
        </div>
        <ol className={styles.claims}>
          {record.claimEvidencePairs.map((pair) => (
            <li className={styles.claim} key={pair.claim} style={{ "--claim-accent": pair.fill } as CSSProperties}>
              <span className={styles.claimStatus}><span aria-hidden="true">●</span>{pair.status}</span>
              <div><h4>{pair.claim}</h4><p>{pair.evidence}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.argumentSection} id="boundary" aria-labelledby="boundary-heading">
        <div className={styles.sectionHeading}>
          <span>05 · Boundary</span>
          <h3 id="boundary-heading">Where does the argument stop?</h3>
        </div>
        <div className={styles.boundaryBody}>
          <div>
            <span className={styles.microLabel}>Limits carried by the record</span>
            <ul className={styles.boundaryList}>{record.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className={styles.editorialColumn}>
            <span className={styles.microLabel}>Contribution</span>
            <ul>{record.contributions.map((item) => <li key={item}><Rich as="span" html={item} /></li>)}</ul>
            <span className={styles.microLabel}>Implications offered</span>
            <ul>{record.implications.map((item) => <li key={item}><Rich as="span" html={item} /></li>)}</ul>
          </div>
        </div>
      </section>

        <footer className={styles.provenance}>
        <div className={styles.provenanceHead}>
          <span className={styles.microLabel}>Source · trace · return</span>
          <h3 id="provenance-heading">The claim stays attached to its source.</h3>
          <p>{record.citation.authors.replaceAll("&amp;", "&")}. ({record.citation.year}). <i>{record.citation.journal}</i>, {record.citation.volume}.</p>
          <a href={record.openMaterials}>Open data, materials and supplemental files <span aria-hidden="true">↗</span></a>
        </div>
        <ul className={styles.provenanceList}>{record.provenance.map((item) => <ProvenanceMark item={item} key={item.glyph} />)}</ul>
      </footer>
    </article>
  );
}

export function StudyLibrary({ records, totalRecords }: { records: PaperRecord[]; totalRecords: number }) {
  return (
    <div className={styles.page}>
      <Crumbs items={[{ label: "Home", href: "/concept-lab" }, { label: "Library", href: "/concept-lab/library" }, { label: "Study" }]} />
      <header className={styles.hero}>
        <div className={styles.heroIdentity}>
          <span className={styles.eyebrow}>Knowledge form · {records.length} {records.length === 1 ? "record" : "records"}</span>
          <h1>Study<span>from evidence.</span></h1>
        </div>
        <div className={styles.heroReading}>
          <p>A study is an argument you can follow: from the question, through what was done, toward what the evidence can support.</p>
          <nav aria-label="Library links" className={styles.utilityLinks}>
            <Link href="/concept-lab/library">All record kinds <span aria-hidden="true">↗</span></Link>
            <Link href="/concept-lab/saved">Saved records <span aria-hidden="true">→</span></Link>
          </nav>
        </div>
      </header>
      <p className={styles.indexCount}>
        {"Study records · " + records.length + " of " + totalRecords + " records"}
      </p>
      {records.length ? <div className={styles.records}>{records.map((record) => <StudyDossier key={record.id} record={record} />)}</div> : (
        <section className={styles.empty} aria-labelledby="empty-title">
          <span className={styles.eyebrow}>Study · evidence trail</span>
          <h2 id="empty-title">No study records are in the library yet.</h2>
          <p>Browse the full library to explore the other knowledge forms.</p>
          <Link href="/concept-lab/library">All record kinds ↗</Link>
        </section>
      )}
    </div>
  );
}

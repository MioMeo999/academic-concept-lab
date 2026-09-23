import Link from "next/link";
import type { MethodRecord } from "@/content/types";
import { recordHref } from "@/content/records";
import { Crumbs } from "../_components/RecordShell";
import { Rich } from "../_components/Sketch";
import { SaveButton } from "../_components/SaveButton";
import styles from "./method-library.module.css";

type Props = { records: MethodRecord[] };

function MethodActions({ record }: { record: MethodRecord }) {
  return (
    <div className={styles.actions}>
      <SaveButton id={record.id} />
      <Link className={styles.readLink} href={recordHref(record)}>
        Full method record <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}

function PracticeLinks({ records }: Props) {
  return (
    <nav className={styles.practiceLinks} aria-label="Method practices">
      <span className={styles.microLabel}>Enter a practice</span>
      <ul>
        {records.map((record, index) => (
          <li key={record.id}>
            <a href={`#practice-${record.id}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {record.abbr ?? record.title}
              <span aria-hidden="true">↓</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function PracticeOrientation({ records }: Props) {
  return (
    <section className={styles.orientations} aria-labelledby="orientation-title">
      <div className={styles.orientationHeading}>
        <span className={styles.microLabel}>Two ways the work moves</span>
        <h2 id="orientation-title">Begin with what the method is trying to understand.</h2>
      </div>
      <div className={styles.orientationRows}>
        {records.map((record) => (
          <a className={styles.orientationRow} href={`#practice-${record.id}`} key={record.id}>
            <span>{record.abbr ?? record.title}</span>
            <p>{record.id === "ipa"
              ? "One person’s sense-making, worked through the case before looking across cases."
              : record.id === "reflexive-thematic-analysis"
                ? "Patterns of shared meaning developed through recursive work across a dataset."
                : record.oneSentence}</p>
            <span className={styles.rowArrow} aria-hidden="true">↓</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function IpaProfile({ record, index }: { record: MethodRecord; index: number }) {
  const fittingQuestion = record.questionFit?.find((item) => item.fits);
  const nonFittingQuestion = record.questionFit?.find((item) => !item.fits);

  return (
    <article className={`${styles.profile} ${styles.ipaProfile}`} id={`practice-${record.id}`} aria-labelledby={`method-title-${record.id}`}>
      <header className={styles.profileHeader}>
        <div className={styles.profileIdentity}>
          <span className={styles.profileIndex}>Practice {String(index + 1).padStart(2, "0")} · {record.abbr}</span>
          <h2 id={`method-title-${record.id}`}>{record.title}</h2>
          <p className={styles.profileHook}>{record.hook}</p>
        </div>
        <div className={styles.profileOrientation}>
          <span className={styles.microLabel}>The work, in brief</span>
          <p>{record.oneSentence}</p>
          <ul className={styles.factLine} aria-label={`${record.abbr} method facts`}>
            {record.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        </div>
      </header>

      <section className={styles.questionSection} aria-labelledby={`question-${record.id}`}>
        <div className={styles.sectionHeading}>
          <span className={styles.microLabel}>Purpose · before collection</span>
          <h3 id={`question-${record.id}`}>Does the question ask for this kind of work?</h3>
        </div>
        {fittingQuestion && nonFittingQuestion ? (
          <div className={styles.questionPair}>
            <div className={styles.questionFit}>
              <span>Fits this practice</span>
              <blockquote>{fittingQuestion.question}</blockquote>
              <p>{fittingQuestion.why}</p>
            </div>
            <div className={styles.questionNoFit}>
              <span>Better served elsewhere</span>
              <blockquote>{nonFittingQuestion.question}</blockquote>
              <p>{nonFittingQuestion.why}</p>
            </div>
          </div>
        ) : (
          <p className={styles.orientationText}>{record.hook}</p>
        )}
      </section>

      <section className={styles.ipaWork} aria-labelledby={`work-${record.id}`}>
        <div className={styles.sectionHeading}>
          <span className={styles.microLabel}>Material · close reading</span>
          <h3 id={`work-${record.id}`}>Stay with one account long enough to interpret it.</h3>
        </div>
        <div className={styles.ipaWorkGrid}>
          <div className={styles.caseSequence}>
            <Rich className={styles.practiceNote} as="p" html={record.procedureLede ?? ""} />
            <ol className={styles.procedureList} aria-label="IPA procedure in the record">
              {record.procedure?.map((step) => (
                <li className={styles.procedureStep} data-step={step.n} key={step.n}>
                  <span>{step.n}</span><strong>{step.title}</strong>
                </li>
              ))}
            </ol>
            {record.cardinalRule && <p className={styles.boundaryNote}>{record.cardinalRule}</p>}
          </div>
          <aside className={styles.closePass} aria-labelledby={`close-pass-${record.id}`}>
            <span className={styles.microLabel}>The close pass</span>
            <h4 id={`close-pass-${record.id}`}>Four ways of reading the same material</h4>
            {record.craftLede && <Rich as="p" className={styles.closePassIntro} html={record.craftLede} />}
            <dl>
              {record.craft?.map((column) => (
                <div key={column.title}>
                  <dt>{column.title}</dt><dd>{column.asks}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {record.doubleHermeneutic && (
        <section className={styles.judgementSection} aria-labelledby={`judgement-${record.id}`}>
          <div className={styles.judgementHeading}>
            <span className={styles.microLabel}>Judgement · the researcher is in the work</span>
            <h3 id={`judgement-${record.id}`}>Interpretation stays answerable to the person’s account.</h3>
          </div>
          <div className={styles.doubleHermeneutic}>
            <blockquote>{record.doubleHermeneutic.quote}</blockquote>
            <Rich as="p" html={record.doubleHermeneutic.body} />
          </div>
        </section>
      )}

      <section className={styles.ipaAccount} aria-label="IPA account and quality markers">
        <div className={styles.accountResult}>
          <span className={styles.microLabel}>Account · what can follow</span>
          <p>Personal Experiential Themes for each case; then an account that can be traced back to the extracts.</p>
          <p className={styles.accountCaution}>{record.qualifications[0]}</p>
        </div>
        <div className={styles.qualityField}>
          <span className={styles.microLabel}>Quality markers in this record</span>
          <ol>
            {record.qualityMarkers?.map((marker) => (
              <li key={marker.n}><span>{marker.n}</span><div><strong>{marker.title}</strong><p>{marker.body}</p></div></li>
            ))}
          </ol>
        </div>
      </section>
      <MethodActions record={record} />
    </article>
  );
}

function RtaProfile({ record, index }: { record: MethodRecord; index: number }) {
  const reflexiveSchool = record.schools?.find((school) => school.isThis);
  const example = record.codingExamples?.[0];

  return (
    <article className={`${styles.profile} ${styles.rtaProfile}`} id={`practice-${record.id}`} aria-labelledby={`method-title-${record.id}`}>
      <header className={styles.profileHeader}>
        <div className={styles.profileIdentity}>
          <span className={styles.profileIndex}>Practice {String(index + 1).padStart(2, "0")} · Reflexive approach</span>
          <h2 id={`method-title-${record.id}`}>{record.title}</h2>
          <p className={styles.profileHook}>{record.hook}</p>
        </div>
        <div className={styles.profileOrientation}>
          <span className={styles.microLabel}>The work, in brief</span>
          <p>{record.oneSentence}</p>
          <ul className={styles.factLine} aria-label="Reflexive thematic analysis facts">
            {record.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        </div>
      </header>

      {reflexiveSchool && (
        <section className={styles.schoolNote} aria-label="Approach represented by this record">
          <span className={styles.microLabel}>Name the approach</span>
          <p><strong>This record teaches {reflexiveSchool.name}.</strong> Coding-reliability TA and Codebook TA are distinct approaches with different assumptions, not alternate names for these steps.</p>
          <p>{reflexiveSchool.blurb}</p>
        </section>
      )}

      <section className={styles.rtaWork} aria-labelledby={`work-${record.id}`}>
        <div className={styles.rtaWorkLead}>
          <span className={styles.microLabel}>Material · a dataset</span>
          <h3 id={`work-${record.id}`}>The analyst works across material and returns as the account develops.</h3>
          {record.procedure?.[0] && <p>{record.procedure[0].body}</p>}
        </div>
        <div className={styles.rtaPhases}>
          <div className={styles.phaseHeading}>
            <span className={styles.microLabel}>Moves · six phases</span>
            {record.procedureLede && <Rich as="p" html={record.procedureLede} />}
          </div>
          <ol aria-label="Reflexive thematic analysis phases">
            {record.procedure?.map((phase) => (
              <li key={phase.n}><span>{phase.n}</span><strong>{phase.title}</strong></li>
            ))}
          </ol>
          {record.cardinalRule && <p className={styles.returnNote}>{record.cardinalRule}</p>}
        </div>
      </section>

      {example && (
        <section className={styles.rtaJudgement} aria-labelledby={`judgement-${record.id}`}>
          <div className={styles.rtaJudgementIntro}>
            <span className={styles.microLabel}>Judgement · a coding decision</span>
            <h3 id={`judgement-${record.id}`}>The analytic move says more than the topic.</h3>
            <p>This worked example comes from the Method record; it illustrates a coding decision, not a reported research finding.</p>
          </div>
          <div className={styles.codingExample}>
            <div><span>Extract</span><blockquote>{example.extract}</blockquote></div>
            <div><span>Topic label</span><p>{example.weak}</p></div>
            <div><span>Analytic code</span><p>{example.strong}</p></div>
          </div>
        </section>
      )}

      <section className={styles.rtaAccount} aria-label="RTA account and quality boundary">
        <div>
          <span className={styles.microLabel}>Account · patterns of shared meaning</span>
          <p>Candidate themes carry a central organising concept; the written account joins claims, selected extracts and interpretation.</p>
        </div>
        <div>
          <span className={styles.microLabel}>Keep the design coherent</span>
          <p>{record.qualifications[0]}</p>
          {record.misuses[0] && <Rich as="p" className={styles.accountCaution} html={record.misuses[0]} />}
        </div>
      </section>
      <MethodActions record={record} />
    </article>
  );
}

function OtherMethodProfile({ record, index }: { record: MethodRecord; index: number }) {
  return (
    <article className={styles.profile} id={`practice-${record.id}`} aria-labelledby={`method-title-${record.id}`}>
      <header className={styles.profileHeader}>
        <div className={styles.profileIdentity}>
          <span className={styles.profileIndex}>Practice {String(index + 1).padStart(2, "0")}</span>
          <h2 id={`method-title-${record.id}`}>{record.title}</h2>
          <p className={styles.profileHook}>{record.hook}</p>
        </div>
        <div className={styles.profileOrientation}>
          <span className={styles.microLabel}>The work, in brief</span>
          <p>{record.oneSentence}</p>
          <ul className={styles.factLine} aria-label={`${record.title} method facts`}>
            {record.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        </div>
      </header>
      <p className={styles.futureNote}>Explore the complete Method record for its current practice detail.</p>
      <MethodActions record={record} />
    </article>
  );
}

function MethodPractice({ record, index }: { record: MethodRecord; index: number }) {
  if (record.id === "ipa") return <IpaProfile record={record} index={index} />;
  if (record.id === "reflexive-thematic-analysis") return <RtaProfile record={record} index={index} />;
  return <OtherMethodProfile record={record} index={index} />;
}

export function MethodLibrary({ records }: Props) {
  return (
    <div className={styles.page}>
      <Crumbs items={[{ label: "Home", href: "/concept-lab" }, { label: "Library", href: "/concept-lab/library" }, { label: "Method" }]} />
      <header className={styles.hero}>
        <div className={styles.heroIdentity}>
          <span className={styles.microLabel}>Knowledge form · method · {records.length} practices</span>
          <h1>How inquiry<br /><em>gets done.</em></h1>
        </div>
        <div className={styles.heroReading}>
          <p>A method shapes the questions, the material, the analytic moves and the judgement through which a responsible account takes form.</p>
          <nav className={styles.utilityLinks} aria-label="Library links">
            <Link href="/concept-lab/library">All record kinds <span aria-hidden="true">↗</span></Link>
            <Link href="/concept-lab/saved">Saved records <span aria-hidden="true">→</span></Link>
          </nav>
        </div>
      </header>
      <PracticeLinks records={records} />
      <PracticeOrientation records={records} />
      <div className={styles.profiles}>
        {records.map((record, index) => <MethodPractice key={record.id} record={record} index={index} />)}
      </div>
      <footer className={styles.pageEnd}>
        <p>Library entries help you see the practice. The full record carries the procedure, qualifications, sources and provenance.</p>
        <nav aria-label="Continue through the library">
          <Link href="/concept-lab/library">All record kinds ↗</Link>
          <Link href="/concept-lab/saved">Saved records →</Link>
        </nav>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { PaperRecord } from "@/content/types";
import styles from "./tuned-out-study.module.css";

type Study = PaperRecord["studies"][number];
type Claim = PaperRecord["claimEvidencePairs"][number];

export function AttributionExplorer({
  model,
  hypotheses,
  studies,
  findings,
}: {
  model: PaperRecord["conceptualModel"];
  hypotheses: PaperRecord["hypotheses"];
  studies: Study[];
  findings: PaperRecord["crossStudyFindings"];
}) {
  const [reading, setReading] = useState<"both" | "leisure" | "productivity">("both");
  const controls = [
    { id: "both", label: "Compare both" },
    { id: "leisure", label: "Leisure attribution" },
    { id: "productivity", label: "Productivity attribution" },
  ] as const;

  const interpretation = reading === "leisure"
    ? findings[0].replace(/<[^>]+>/g, "")
    : reading === "productivity"
      ? findings[1].replace(/<[^>]+>/g, "")
      : "The visible act is shared; the observer's explanation changes how it is read. The listener's actual purpose remains outside this model.";
  const evidence = reading === "leisure"
    ? [studies[0], studies[1]]
    : reading === "productivity"
      ? [studies[0], studies[2]]
      : [];

  return (
    <div className={styles.modelExplorer} data-model-reading={reading}>
      <div className={styles.modelTopline}>
        <p className={styles.modelQuestion}>One visible behaviour. More than one observer reading.</p>
        <div className={styles.choiceGroup} role="group" aria-label="Choose an attribution reading">
          {controls.map((control) => (
            <button
              aria-pressed={reading === control.id}
              className={styles.choiceButton}
              data-attribution-control={control.id}
              key={control.id}
              onClick={() => setReading(control.id)}
              type="button"
            >
              {control.label}
            </button>
          ))}
        </div>
      </div>

      <figure className={styles.modelFigure}>
        <div className={styles.modelScrollGuard}>
          <ol className={styles.modelPathway} aria-label="The study's conceptual model">
            <li className={styles.modelNode}>
              <span className={styles.modelNodeIndex}>01</span>
              <strong>{model[0]}</strong>
              <small>visible behaviour</small>
            </li>
            <li className={`${styles.modelNode} ${styles.modelAttributions}`}>
              <span className={styles.modelNodeIndex}>02</span>
              <strong>{model[1]}</strong>
              <div className={styles.attributionBranches}>
                <span className={`${styles.branch} ${styles.branchLeisure}`} data-emphasis={reading === "leisure" || reading === "both" ? "strong" : "residual"}>Leisure</span>
                <span className={`${styles.branch} ${styles.branchProductivity}`} data-emphasis={reading === "productivity" || reading === "both" ? "strong" : "residual"}>Productivity</span>
              </div>
              <small>observer inference · not actual motive</small>
            </li>
            {model.slice(2).map((node, index) => (
              <li className={styles.modelNode} key={node}>
                <span className={styles.modelNodeIndex}>0{index + 3}</span>
                <strong>{node}</strong>
                <small>{index === 0 ? "perceived" : index === 1 ? "judgments" : "interpersonal reactions"}</small>
              </li>
            ))}
          </ol>
          <svg className={styles.modelTraces} viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true">
            <path className={`${styles.trace} ${styles.traceLeisure}`} d="M70 110 C155 110 178 45 280 45 C374 45 390 110 482 110" />
            <path className={`${styles.trace} ${styles.traceProductivity}`} d="M70 110 C155 110 178 175 280 175 C374 175 390 110 482 110" />
            <path className={`${styles.trace} ${styles.traceShared}`} d="M482 110 C585 110 610 110 704 110 S850 110 940 110" />
          </svg>
        </div>
        <figcaption>Conceptual relationship reconstructed from the article; line weight does not encode an effect size.</figcaption>
      </figure>

      <div className={styles.modelReading} aria-live="polite" aria-atomic="true">
        <span className={styles.marginLabel}>{reading === "both" ? "Read the distinction" : `Focused reading · ${reading} attribution`}</span>
        <p>{interpretation}</p>
        {evidence.length > 0 && (
          <div className={styles.selectedEvidence}>
            {evidence.map((study) => (
              <p key={study.label}><b>{study.label}</b><span>{study.result}</span></p>
            ))}
          </div>
        )}
      </div>

      <div className={styles.hypotheses}>
        <span className={styles.marginLabel}>Relationships proposed in the source</span>
        <ol>
          {hypotheses.map((hypothesis, index) => <li key={hypothesis}><span>H{index + 1}</span>{hypothesis}</li>)}
        </ol>
      </div>
    </div>
  );
}

export function StudyDossier({ studies }: { studies: Study[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const study = studies[selectedIndex];

  return (
    <div className={styles.dossier}>
      <div className={styles.studySelector} role="group" aria-label="Open one of the three studies">
        {studies.map((item, index) => (
          <button
            aria-pressed={selectedIndex === index}
            className={styles.studySelect}
            data-study-control={index}
            key={item.label}
            onClick={() => setSelectedIndex(index)}
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.label}</strong>
            <small>{item.design}</small>
          </button>
        ))}
      </div>

      <article className={styles.studyPanel} data-study-panel aria-live="polite" aria-atomic="true">
        <header className={styles.studyPanelHead}>
          <span className={styles.studyIndex}>{String(selectedIndex + 1).padStart(2, "0")}</span>
          <div>
            <p className={styles.marginLabel}>{study.label} · evidence dossier</p>
            <h3>{study.design}</h3>
            <p className={styles.studyMeta}>{study.location} <i aria-hidden="true">·</i> n = {study.n} <i aria-hidden="true">·</i> {study.sample}</p>
          </div>
        </header>
        <div className={styles.studyInquiry}>
          <div className={styles.studyQuestion}>
            <span className={styles.marginLabel}>Question</span>
            <p>{study.question}</p>
          </div>
          <div className={styles.studyResult}>
            <span className={styles.marginLabel}>Reported result</span>
            <p>{study.result}</p>
          </div>
        </div>
        <dl className={styles.studyDetails}>
          <div><dt>Method</dt><dd>{study.method}</dd></div>
          <div><dt>Role in the package</dt><dd>{study.role}</dd></div>
          <div><dt>Strength</dt><dd>{study.strength}</dd></div>
          <div><dt>Study boundary</dt><dd>{study.limitation}</dd></div>
        </dl>
      </article>
    </div>
  );
}

export function ClaimEvidenceExplorer({ claims }: { claims: Claim[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const claim = claims[selectedIndex];

  return (
    <div className={styles.claimExplorer}>
      <div className={styles.claimSelector} role="group" aria-label="Inspect a claim and its evidentiary status">
        {claims.map((item, index) => (
          <button
            aria-pressed={selectedIndex === index}
            className={styles.claimSelect}
            data-claim-control={index}
            key={item.claim}
            onClick={() => setSelectedIndex(index)}
            type="button"
          >
            <span>{item.status}</span>
            <strong>{item.claim}</strong>
          </button>
        ))}
      </div>
      <article className={styles.claimPanel} data-claim-panel aria-live="polite" aria-atomic="true">
        <p className={styles.marginLabel}>Evidence status · {claim.status}</p>
        <h3>{claim.claim}</h3>
        <p>{claim.evidence}</p>
      </article>
    </div>
  );
}

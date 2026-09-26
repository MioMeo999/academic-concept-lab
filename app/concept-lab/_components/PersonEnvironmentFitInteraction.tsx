"use client";

import { useState } from "react";
import type { CoreProcess } from "@/content/types";
import styles from "./person-environment-fit.module.css";

/**
 * Lets the reader inspect the two comparisons that the P–E Fit record names.
 * Both relationships stay visible; the selected pair's canonical explanation
 * is brought into focus without assigning a score, direction, or outcome.
 */
export function PersonEnvironmentFitInteraction({
  processes,
}: {
  processes: CoreProcess[];
}) {
  const [selectedId, setSelectedId] = useState(processes[0]?.id ?? "");
  const selected = processes.find((process) => process.id === selectedId) ?? processes[0];

  if (!selected) return null;

  return (
    <div className={styles.correspondenceField}>
      <div className={styles.fieldHeads} aria-hidden="true">
        <span>Pair identity</span>
        <span>Person</span>
        <span className={styles.relationHead}>↔</span>
        <span>Environment</span>
      </div>
      <fieldset className={styles.processChoices}>
        <legend>Choose a correspondence pair to inspect</legend>
        <div className={styles.processRows}>
          {processes.map((process) => {
            const isSelected = process.id === selected.id;
            return (
              <label
                className={`${styles.processRow} ${isSelected ? styles.processSelected : ""}`}
                key={process.id}
              >
                <span className={styles.processChoice}>
                  <input
                    type="radio"
                    name="pe-fit-correspondence-pair"
                    value={process.id}
                    checked={isSelected}
                    onChange={() => setSelectedId(process.id)}
                  />
                  <span className={styles.processChoiceText}>
                    <strong>{process.title}</strong>
                    {isSelected && <span className={styles.selectedState} aria-hidden="true">Selected</span>}
                  </span>
                </span>
                <span className={styles.processSides}>
                  <span className={styles.processPerson}>
                    <span className={styles.sideLabel}>Person</span>
                    <span>{process.person}</span>
                  </span>
                  <span className={styles.correspondenceMark} aria-hidden="true">↔</span>
                  <span className={styles.processEnvironment}>
                    <span className={styles.sideLabel}>Environment</span>
                    <span>{process.environment}</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className={styles.processExplanation} role="status" aria-atomic="true">
        <span className={styles.explanationLabel}>Selected explanation · {selected.title}</span>
        <p>{selected.explanation}</p>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import type { Source, TheoryRecord } from "@/content/types";
import { RecordShell } from "./RecordShell";
import { Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { PersonEnvironmentFitInteraction } from "./PersonEnvironmentFitInteraction";
import styles from "./person-environment-fit.module.css";

export type PersonEnvironmentFitRecord = TheoryRecord & {
  coreProcesses: NonNullable<TheoryRecord["coreProcesses"]>;
  fitTargets: NonNullable<TheoryRecord["fitTargets"]>;
  workAdjustment: NonNullable<TheoryRecord["workAdjustment"]>;
  originsNote: NonNullable<TheoryRecord["originsNote"]>;
};

export function isPersonEnvironmentFitRecord(record: TheoryRecord): record is PersonEnvironmentFitRecord {
  return Boolean(
    record.coreProcesses?.length === 2 &&
    record.fitTargets?.length === 4 &&
    record.workAdjustment &&
    record.originsNote,
  );
}

type Block = {
  key: string;
  toc: string;
  title: string;
  colour: string;
  body: ReactNode;
};

function SourceList({ items }: { items: Source[] }) {
  return (
    <ol className={styles.sourceList}>
      {items.map((source, index) => (
        <li className={styles.sourceItem} key={`${source.citation}-${index}`}>
          <span className={styles.sourceNumber} aria-hidden="true">{index + 1}</span>
          <div>
            <Rich className={styles.citation} as="div" html={source.citation} />
            <p className={styles.sourceContribution}>{source.contribution}</p>
            {source.doi && <p className={styles.doi}>doi {source.doi}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function PersonEnvironmentFitBody({ record: r }: { record: PersonEnvironmentFitRecord }) {
  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => {
    blocks.push({ key, toc, title, colour, body });
  };

  add("correspondence", "Two forms", "Two forms of correspondence", "var(--blue)", (
    <>
      <Rich className="lede" as="p" html={r.ideaLede ?? r.oneSentence} />
      <p className={styles.fieldPrompt}>What is being compared?</p>
      <PersonEnvironmentFitInteraction processes={r.coreProcesses} />
      {r.demo?.type === "scale-pair" && (
        <aside className={styles.analogyNote} aria-label="Teaching analogy">
          <div className={styles.analogyHeader}>
            <span className="k">Teaching analogy</span>
            <span className={styles.analogyLabel}>{r.demo.label}</span>
          </div>
          <p className={styles.analogyStates}>{r.demo.options.join(" · ")}</p>
          <p className={styles.analogyCaption}>{r.demo.caption}</p>
          {r.oversimplifications[3] && (
            <Rich className={styles.analogyBoundary} as="p" html={r.oversimplifications[3]} />
          )}
        </aside>
      )}
    </>
  ));

  add("fitTargets", "Four targets", "Where fit is examined", "var(--teal)", (
    <>
      <p className="lede">Four targets. A good match with one does not guarantee a good match with another.</p>
      <div className={styles.targetRegister}>
        {r.fitTargets.map((target, index) => (
          <article className={styles.targetEntry} key={target.id}>
            <div className={styles.targetIdentity}>
              <span className={styles.targetNumber}>{pad2(index + 1)}</span>
              <Icon className={styles.targetIcon} id={target.icon} aria-hidden="true" />
              <h3>{target.title}</h3>
            </div>
            <p className={styles.targetQuestion}>{target.question}</p>
            <p className={styles.targetExample}>
              <span>For example</span>
              {target.example}
            </p>
          </article>
        ))}
      </div>
    </>
  ));

  add("workAdjustment", "A continuing relation", "A continuing relationship", "var(--teal)", (
    <>
      <Rich className="body" as="p" html={r.workAdjustment} />
      <div className={styles.adjustmentViews}>
        <article className={styles.adjustmentView}>
          <span className="k">The person’s view</span>
          <h3>Satisfaction</h3>
          <p>Are this person’s needs met by what the environment supplies?</p>
        </article>
        <div className={styles.viewRelation} aria-hidden="true">
          <span>related, distinct viewpoints</span>
          <i />
        </div>
        <article className={styles.adjustmentView}>
          <span className="k">The environment’s view</span>
          <h3>Satisfactoriness</h3>
          <p>Are the environment’s requirements met by what this person can do?</p>
        </article>
      </div>
    </>
  ));

  add("trail", "The trail", "Seven markers, no single starting point", "var(--blue)", (
    <>
      <Rich className="lede" as="p" html={r.trailLede} />
      <Rich className={styles.originsNote} as="p" html={r.originsNote} />
      <ol className={styles.history}>
        {r.origins.map((origin) => (
          <li className={styles.historyEntry} key={`${origin.year}-${origin.author}`}>
            <span className={styles.historyYear}>{origin.year}</span>
            <div className={styles.historyText}>
              <Rich className={styles.historyAuthor} as="h3" html={origin.author} />
              <Rich className={styles.historyWork} as="p" html={origin.work} />
              <Rich className={styles.historyContribution} as="p" html={origin.contribution} />
            </div>
          </li>
        ))}
      </ol>
    </>
  ));

  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={r.oversimplificationsLede} />
      <ol className={styles.guardrails}>
        {r.oversimplifications.map((item, index) => (
          <li key={item}>
            <span className={styles.guardrailNumber}>{pad2(index + 1)}</span>
            <Rich className={styles.guardrailText} as="p" html={item} />
          </li>
        ))}
      </ol>
    </>
  ));

  add("qualifications", "Still open", "Still open", "var(--teal)", (
    <ul className={styles.openQuestions}>
      {r.qualifications.map((qualification) => <li key={qualification}>{qualification}</li>)}
    </ul>
  ));

  add("sources", "Sources", "Sources", "var(--teal)", (
    <>
      <div className={styles.minimumReading}>
        <p className="k">{r.minimumReadingLabel ?? "If you read three things"}</p>
        <SourceList items={r.minimumReading} />
      </div>
      <div className={styles.fullReading}>
        <p className="k">The full trail</p>
        <SourceList items={r.fullSources} />
      </div>
    </>
  ));

  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", (
    <div className={styles.provenance}>
      {r.provenance.map((item) => (
        <article className={styles.provenanceItem} key={item.label}>
          <span className={styles.provenanceGlyph} style={{ color: item.colour }}>{item.glyph}</span>
          <div>
            <h3>{item.label}</h3>
            <p>{item.note}</p>
          </div>
        </article>
      ))}
    </div>
  ));

  const toc = blocks.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`] as [string, string, string]);

  return (
    <div className={styles.page}>
      <RecordShell record={r} toc={toc}>
        <div className={styles.record}>
          <div className={styles.libraryReturn}>
            <a href="/concept-lab/library?kind=theory">← Return to the Theory Library</a>
          </div>
          {blocks.map((block, index) => (
            <span key={block.key} style={{ display: "contents" }}>
              {index > 0 && <Divider />}
              <section className="rec" id={`s${index + 1}`}>
                <SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />
                {block.body}
              </section>
            </span>
          ))}
        </div>
      </RecordShell>
    </div>
  );
}

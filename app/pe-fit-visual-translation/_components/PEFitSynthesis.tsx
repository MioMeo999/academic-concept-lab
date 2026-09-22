"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { TheoryRecord } from "@/content/types";

type Lens = "da" | "ns";
type TargetId = "job" | "organisation" | "group" | "supervisor";
type Degree = "under" | "correspondence" | "over";
type Viewpoint = "satisfaction" | "satisfactoriness";

const primaryArt = "/pe-fit-visual-translation-assets/pe-fit-C-editorial-research-drawing.png";

const lenses: Record<
  Lens,
  {
    label: string;
    shorthand: string;
    question: string;
    person: string;
    environment: string;
    note: string;
  }
> = {
  da: {
    label: "Demands ↔ Abilities",
    shorthand: "What does the work ask — and what can the person do?",
    question: "Can the person do what this setting requires?",
    person: "skills · knowledge · effort · capacity",
    environment: "requirements · standards · task demands",
    note: "The needs–supplies relation remains present as a faint residue. Focusing one correspondence does not erase the other.",
  },
  ns: {
    label: "Needs ↔ Supplies",
    shorthand: "What does the person need — and what does the setting supply?",
    question: "Does the environment provide what this person needs?",
    person: "needs · goals · preferences · values",
    environment: "resources · autonomy · feedback · opportunities",
    note: "The demands–abilities relation remains present as a faint residue. The same encounter is being read through a different comparison.",
  },
};

const targetOrder: TargetId[] = ["job", "organisation", "group", "supervisor"];

const targetNotes: Record<TargetId, { prompt: string; crop: string; mark: string }> = {
  job: {
    prompt: "What does this role ask of the person, and what does it give back?",
    crop: "desk · task · role",
    mark: "01",
  },
  organisation: {
    prompt: "How does the person correspond with the wider organisation?",
    crop: "resources · purpose · opportunity",
    mark: "02",
  },
  group: {
    prompt: "What changes when the immediate work group becomes the target?",
    crop: "colleagues · collaboration · belonging",
    mark: "03",
  },
  supervisor: {
    prompt: "What changes when the supervisor relationship becomes the target?",
    crop: "feedback · direction · relationship",
    mark: "04",
  },
};

const degreeCopy: Record<Degree, { label: string; note: string; trace: string }> = {
  under: {
    label: "Under-supplied",
    note: "On the dimension being compared, the environmental supply falls short of what the person needs.",
    trace: "gap",
  },
  correspondence: {
    label: "Correspondence",
    note: "On the dimension being compared, the characteristics correspond. Neither side is a virtue by itself.",
    trace: "meeting trace",
  },
  over: {
    label: "Over-supplied",
    note: "On the dimension being compared, the environment supplies more than this person needs; more is not automatically better.",
    trace: "extends beyond",
  },
};

function PersistentWorld({
  lens,
  target,
  compact = false,
  alt,
}: {
  lens?: Lens;
  target?: TargetId;
  compact?: boolean;
  alt: string;
}) {
  const lensClass = lens ? `pe-vt-world-lens-${lens}` : "";
  const targetClass = target ? `pe-vt-world-target-${target}` : "";

  return (
    <div className={`pe-vt-persistent-world ${lensClass} ${targetClass} ${compact ? "is-compact" : ""}`}>
      <Image src={primaryArt} alt={alt} fill sizes={compact ? "(max-width: 760px) 100vw, 54vw" : "(max-width: 760px) 100vw, 62vw"} />
      <svg viewBox="0 0 1536 1024" aria-hidden="true">
        <path className="pe-vt-live pe-vt-live-da" d="M270 548C417 427 559 414 733 478C804 504 855 513 929 481" />
        <path className="pe-vt-live pe-vt-live-ns" d="M737 507C876 442 1032 432 1216 501C1272 522 1325 538 1380 526" />
        <path className="pe-vt-live pe-vt-live-field" d="M476 653C642 614 785 627 920 678C1035 720 1131 718 1267 680" />

        {target && (
          <>
            <path className="pe-vt-target-stroke pe-vt-target-stroke-job" d="M348 575C486 512 612 510 742 553" />
            <path className="pe-vt-target-stroke pe-vt-target-stroke-organisation" d="M805 419C998 343 1182 371 1350 485" />
            <path className="pe-vt-target-stroke pe-vt-target-stroke-group" d="M508 632C431 693 375 741 300 777" />
            <path className="pe-vt-target-stroke pe-vt-target-stroke-supervisor" d="M827 552C1011 553 1168 596 1291 684" />
          </>
        )}
      </svg>

      {lens && (
        <>
          <span className="pe-vt-world-person">PERSON</span>
          <span className="pe-vt-world-environment">ENVIRONMENT</span>
          <span className="pe-vt-world-between">correspondence lives here</span>
        </>
      )}
    </div>
  );
}

export function PEFitSynthesis({ record }: { record: TheoryRecord }) {
  const [lens, setLens] = useState<Lens>("da");
  const [target, setTarget] = useState<TargetId>("job");
  const [degree, setDegree] = useState<Degree>("correspondence");
  const [viewpoint, setViewpoint] = useState<Viewpoint>("satisfaction");

  const currentTarget = useMemo(
    () => record.fitTargets?.find((item) => item.id === target) ?? record.fitTargets?.[0],
    [record.fitTargets, target],
  );

  return (
    <>
      <section className="pe-vt-experience pe-vt-correspondence" id="correspondence" aria-labelledby="correspondence-title">
        <div className="pe-vt-section-mark">
          <span>01</span>
          <span>TWO CURRENTS · ONE RELATION</span>
        </div>

        <div className="pe-vt-experience-heading">
          <div>
            <p className="pe-vt-hand">same encounter · different comparison</p>
            <h2 id="correspondence-title">
              Read the relation.
              <br />
              <em>Leave the other trace.</em>
            </h2>
          </div>
          <p>
            Demands–abilities and needs–supplies are distinct correspondence questions.
            Focusing one does not turn the other off.
          </p>
        </div>

        <div className="pe-vt-lens-controls" role="group" aria-label="Correspondence lens">
          {(Object.keys(lenses) as Lens[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={lens === key}
              className={lens === key ? "is-active" : ""}
              onClick={() => setLens(key)}
            >
              <span>{key === "da" ? "D ↔ A" : "N ↔ S"}</span>
              <strong>{lenses[key].label}</strong>
              <small>{lenses[key].shorthand}</small>
            </button>
          ))}
        </div>

        <div className="pe-vt-lens-stage">
          <PersistentWorld
            lens={lens}
            alt="The same coloured-pencil workplace world, now used to compare person and environment characteristics through one correspondence lens while the other remains visible as a residue."
          />

          <div className="pe-vt-lens-reading" aria-live="polite">
            <div>
              <span>PERSON SIDE</span>
              <p>{lenses[lens].person}</p>
            </div>
            <div className="pe-vt-lens-question">
              <span className="pe-vt-hand">{lenses[lens].question}</span>
              <strong>{lenses[lens].label}</strong>
              <p>{lenses[lens].note}</p>
            </div>
            <div>
              <span>ENVIRONMENT SIDE</span>
              <p>{lenses[lens].environment}</p>
            </div>
          </div>
        </div>

        <aside className="pe-vt-memory-trace">
          <span aria-hidden="true">↺</span>
          <p>
            <strong>The page remembers the previous reading.</strong> The inactive relation stays
            faintly visible instead of disappearing, because the same person and workplace can be
            read through both comparisons.
          </p>
        </aside>
      </section>

      <section className="pe-vt-experience pe-vt-targets" id="targets" aria-labelledby="targets-title">
        <div className="pe-vt-section-mark">
          <span>02</span>
          <span>ONE WORKPLACE · FOUR QUESTIONS</span>
        </div>

        <div className="pe-vt-experience-heading">
          <div>
            <p className="pe-vt-hand">same place · new question</p>
            <h2 id="targets-title">
              Fit here does not
              <br />
              <em>settle fit there.</em>
            </h2>
          </div>
          <p>
            The person stays in the same working world. Only the target of attention, crop and
            annotation changes.
          </p>
        </div>

        <div className="pe-vt-target-stage">
          <div className="pe-vt-target-world">
            <PersistentWorld
              target={target}
              compact
              alt={`The same workplace drawing re-read with attention on ${currentTarget?.title ?? target} fit.`}
            />
            <span className="pe-vt-target-crop-note">{targetNotes[target].crop}</span>
            <span className="pe-vt-target-pencil">{targetNotes[target].prompt}</span>
          </div>

          <div className="pe-vt-target-controls" role="group" aria-label="Fit target">
            {targetOrder.map((key) => {
              const item = record.fitTargets?.find((candidate) => candidate.id === key);
              const label = item?.title ?? key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={target === key}
                  className={target === key ? "is-active" : ""}
                  onClick={() => setTarget(key)}
                >
                  <span>{targetNotes[key].mark}</span>
                  <strong>{label}</strong>
                  <small>{target === key ? "reading this relation" : "re-read the same world"}</small>
                </button>
              );
            })}
          </div>
        </div>

        {currentTarget && (
          <div className="pe-vt-target-reading" aria-live="polite">
            <span>{currentTarget.title.toUpperCase()} FIT</span>
            <h3>{currentTarget.question}</h3>
            <p>{currentTarget.example}</p>
            <small>One target is not a proxy for the other three.</small>
          </div>
        )}
      </section>

      <section className="pe-vt-experience pe-vt-degree" id="degree" aria-labelledby="degree-title">
        <div className="pe-vt-section-mark">
          <span>03</span>
          <span>DEGREE · TEACHING ANALOGY</span>
        </div>

        <div className="pe-vt-experience-heading pe-vt-experience-heading-quiet">
          <div>
            <p className="pe-vt-hand">same relation · re-read its condition</p>
            <h2 id="degree-title">
              Correspondence is not
              <br />
              <em>“more is better.”</em>
            </h2>
          </div>
          <p>
            These states teach the idea of relational correspondence. They do not report a
            validated fit score.
          </p>
        </div>

        <div className={`pe-vt-degree-field pe-vt-degree-${degree}`}>
          <svg viewBox="0 0 900 310" role="img" aria-labelledby="degree-figure-title degree-figure-desc">
            <title id="degree-figure-title">A hand-drawn teaching analogy for correspondence degree</title>
            <desc id="degree-figure-desc">
              A personal requirement trace and an environmental supply trace are shown with a gap,
              a meeting point, or an extension. The graphic is not a score or prediction.
            </desc>
            <path className="pe-vt-degree-rule" d="M82 246C271 235 424 249 591 239C681 234 760 235 824 229" />
            <path className="pe-vt-degree-person" d="M132 132C214 118 294 126 382 117" />
            <path className="pe-vt-degree-person pe-vt-degree-ghost" d="M133 138C216 124 296 132 383 123" />
            <path className="pe-vt-degree-environment" d="M520 180C608 164 699 171 790 155" />
            <path className="pe-vt-degree-environment pe-vt-degree-ghost" d="M522 186C611 170 701 177 792 161" />
            <path
              className="pe-vt-degree-bridge"
              d={
                degree === "under"
                  ? "M382 121C423 130 456 148 490 171"
                  : degree === "correspondence"
                    ? "M382 121C433 129 472 150 520 180"
                    : "M382 121C466 112 541 136 616 165"
              }
            />
            <circle
              className="pe-vt-degree-node"
              cx={degree === "under" ? 490 : degree === "correspondence" ? 520 : 616}
              cy={degree === "under" ? 171 : degree === "correspondence" ? 180 : 165}
              r="10"
            />
            <text className="pe-vt-degree-label" x="132" y="96">PERSONAL REQUIREMENT</text>
            <text className="pe-vt-degree-label" x="593" y="132">ENVIRONMENTAL SUPPLY</text>
            <text className="pe-vt-degree-pencil" x="446" y="68">{degreeCopy[degree].trace}</text>
            <text className="pe-vt-degree-caption" x="450" y="286" textAnchor="middle">
              ▲ teaching analogy · not a percentage, rank, gauge or outcome prediction
            </text>
          </svg>
        </div>

        <div className="pe-vt-degree-controls" role="group" aria-label="Correspondence degree">
          {(Object.keys(degreeCopy) as Degree[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={degree === key}
              className={degree === key ? "is-active" : ""}
              onClick={() => setDegree(key)}
            >
              {degreeCopy[key].label}
            </button>
          ))}
        </div>

        <p className="pe-vt-degree-reading" aria-live="polite">
          <strong>{degreeCopy[degree].label}.</strong> {degreeCopy[degree].note}
        </p>
      </section>

      <section className="pe-vt-experience pe-vt-adjustment" id="adjustment" aria-labelledby="adjustment-title">
        <div className="pe-vt-section-mark">
          <span>04</span>
          <span>CONTINUING ADJUSTMENT · TWO VIEWPOINTS</span>
        </div>

        <div className="pe-vt-experience-heading pe-vt-experience-heading-quiet">
          <div>
            <p className="pe-vt-hand">adjust · respond · revisit</p>
            <h2 id="adjustment-title">
              The relation continues.
              <br />
              <em>The viewpoints can diverge.</em>
            </h2>
          </div>
          <p>{record.workAdjustment}</p>
        </div>

        <div className="pe-vt-adjustment-stage">
          <div className="pe-vt-adjustment-world">
            <PersistentWorld
              compact
              alt="A repeated crop of the same workplace world used to show that work adjustment revisits an ongoing relationship rather than creating a new scene."
            />
            <div className="pe-vt-adjustment-loop" aria-hidden="true">
              <span>adjust</span>
              <i>→</i>
              <span>respond</span>
              <i>→</i>
              <span>revisit</span>
              <i>↺</i>
            </div>
          </div>

          <div className="pe-vt-viewpoint-field">
            <div className="pe-vt-viewpoint-controls" role="group" aria-label="Work-adjustment viewpoint">
              <button
                type="button"
                aria-pressed={viewpoint === "satisfaction"}
                className={viewpoint === "satisfaction" ? "is-active" : ""}
                onClick={() => setViewpoint("satisfaction")}
              >
                <span>PERSON’S VIEW</span>
                <strong>Satisfaction</strong>
                <small>needs → supplies</small>
              </button>
              <button
                type="button"
                aria-pressed={viewpoint === "satisfactoriness"}
                className={viewpoint === "satisfactoriness" ? "is-active" : ""}
                onClick={() => setViewpoint("satisfactoriness")}
              >
                <span>ENVIRONMENT’S VIEW</span>
                <strong>Satisfactoriness</strong>
                <small>requirements → abilities</small>
              </button>
            </div>

            <div className="pe-vt-viewpoint-reading" aria-live="polite">
              {viewpoint === "satisfaction" ? (
                <>
                  <span>READING FROM THE PERSON’S SIDE</span>
                  <h3>How is this relationship experienced?</h3>
                  <p>
                    Satisfaction concerns the person’s experience of the relation, including whether
                    needs are met by what the environment supplies.
                  </p>
                </>
              ) : (
                <>
                  <span>READING FROM THE ENVIRONMENT’S SIDE</span>
                  <h3>How is the person’s contribution evaluated?</h3>
                  <p>
                    Satisfactoriness concerns the environment’s view of whether the person’s
                    abilities correspond with its requirements.
                  </p>
                </>
              )}
              <small>These viewpoints are related, but the record does not equate them.</small>
            </div>
          </div>
        </div>

        <div className="pe-vt-transition-ledger">
          <div>
            <span>WHAT STAYS CONSTANT</span>
            <p>the person · the workplace · the underlying relation · the evidence boundary</p>
          </div>
          <div>
            <span>WHAT CHANGES</span>
            <p>comparison lens · target · degree reading · viewpoint · annotation · crop</p>
          </div>
          <p className="pe-vt-hand">the field notes are now quiet enough to show the record underneath</p>
        </div>
      </section>
    </>
  );
}

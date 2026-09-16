"use client";

import { useId, useState } from "react";
import type { TheoryRecord } from "@/content/types";

type FormMode = "both" | "da" | "ns";
type CorrespondenceState = "under" | "fit" | "over";
type TargetId = "job" | "organisation" | "group" | "supervisor";
type Viewpoint = "satisfaction" | "satisfactoriness";

const forms: Record<FormMode, { label: string; short: string; question: string; person: string; environment: string }> = {
  both: { label: "Both relations", short: "two questions", question: "same person · same workplace · two correspondence questions", person: "abilities · needs · goals", environment: "demands · supplies · requirements" },
  da: { label: "Demands ↔ abilities", short: "can the person do it?", question: "Can the person do what the setting requires?", person: "abilities · capacities", environment: "requirements · demands" },
  ns: { label: "Needs ↔ supplies", short: "does the setting provide it?", question: "Does the environment provide what the person needs?", person: "needs · goals · preferences", environment: "supplies · reinforcers" },
};

const stateCopy: Record<CorrespondenceState, { label: string; note: string }> = {
  under: { label: "Under-supplied", note: "The environmental supply falls short of what the person needs on this dimension." },
  fit: { label: "Correspondence", note: "The compared characteristics correspond on this dimension. Neither side is a virtue by itself." },
  over: { label: "Over-supplied", note: "The environment supplies more than this person needs on this dimension; more is not automatically better." },
};

const targetOrder: TargetId[] = ["job", "organisation", "group", "supervisor"];
const primaryArt = "/pe-fit-target-assets/pe-fit-C-editorial-research-drawing.png";

function PencilField({ mode, compact = false }: { mode: FormMode; compact?: boolean }) {
  const active = forms[mode];
  return (
    <div className={`pefit-field ${compact ? "is-compact" : ""} pefit-field-${mode}`}>
      <div className="pefit-art-note pefit-art-note-top">one person · inside one working world</div>
      <div className="pefit-authored-field-art">
        <img src={primaryArt} alt="A coloured-pencil working world with one person, colleagues, tasks, resources and organisational context." loading={compact ? "lazy" : "eager"} />
        <svg className={`pefit-field-live-overlay pefit-field-live-overlay-${mode}`} viewBox="0 0 1536 1024" aria-hidden="true">
          <path d="M170 470C390 300 570 320 770 480" className="pefit-live-trace pefit-live-trace-coral" />
          <path d="M770 480C970 350 1150 360 1380 500" className="pefit-live-trace pefit-live-trace-teal" />
          <path d="M748 495C930 470 1090 500 1275 620" className="pefit-live-trace pefit-live-trace-violet" />
          <text x="760" y="275" className="pefit-live-label">same encounter · different question</text>
        </svg>
      </div>
      <div className="pefit-field-caption"><span className="pefit-field-side pefit-field-side-person">{active.person}</span><span className="pefit-field-centre">{active.question}</span><span className="pefit-field-side pefit-field-side-environment">{active.environment}</span></div>
    </div>
  );
}

function FormControls({ mode, onChange }: { mode: FormMode; onChange: (next: FormMode) => void }) {
  const groupId = useId();
  return (
    <fieldset className="pefit-control-field" aria-labelledby={groupId}>
      <legend id={groupId}>Inspect the correspondence</legend>
      <div className="pefit-control-links">
        {(Object.keys(forms) as FormMode[]).map((key) => (
          <button key={key} type="button" className={`pefit-control ${mode === key ? "is-selected" : ""}`} aria-pressed={mode === key} onClick={() => onChange(key)}>
            <span className="pefit-control-dot" aria-hidden="true" />{forms[key].label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function PEFitInteractive({ record }: { record: TheoryRecord }) {
  const [form, setForm] = useState<FormMode>("both");
  const [state, setState] = useState<CorrespondenceState>("fit");
  const [target, setTarget] = useState<TargetId>("job");
  const [viewpoint, setViewpoint] = useState<Viewpoint>("satisfaction");
  const currentTarget = record.fitTargets?.find((item) => item.id === target) ?? record.fitTargets?.[0];
  const stateInfo = stateCopy[state];
  const targetLabel = currentTarget?.title ?? "Job";

  return (
    <>
      <section className="pefit-section pefit-primary" id="correspondence" aria-labelledby="correspondence-title">
        <div className="pefit-section-kicker"><span>01</span><span>THE RELATION IS THE SUBJECT</span></div>
        <div className="pefit-primary-intro">
          <div><h2 id="correspondence-title">Two questions,<br /><em>one encounter.</em></h2><p>Keep the person and the workplace present. Change the question being asked of their correspondence.</p></div>
          <p className="pefit-hand pefit-hand-right">same person · same workplace<br />different correspondence question</p>
        </div>
        <div className="pefit-primary-field-wrap">
          <PencilField mode={form} />
          <FormControls mode={form} onChange={setForm} />
        </div>
        <p className="pefit-live-reading" aria-live="polite"><span>NOW READING</span><strong>{forms[form].label}</strong><em>{forms[form].question}</em></p>
      </section>

      <section className="pefit-section pefit-state-section" id="correspondence-state" aria-labelledby="state-title">
        <div className="pefit-section-kicker"><span>02</span><span>A RELATIONAL CONDITION</span></div>
        <div className="pefit-split-heading"><div><h2 id="state-title">Correspondence is not<br /><em>“more is better.”</em></h2><p>The same person and environment remain. Only the relationship between the compared characteristics changes.</p></div><p className="pefit-hand">the doorway stays<br />the relation moves</p></div>
        <div className={`pefit-state-field pefit-state-${state}`}>
          <svg viewBox="0 0 900 300" role="img" aria-labelledby="state-figure-title state-figure-desc">
            <title id="state-figure-title">A small correspondence trace</title>
            <desc id="state-figure-desc">Two hand-drawn requirement and supply traces remain stable in form while their relation opens, meets, or extends. This is a teaching analogy, not a measurement.</desc>
            <path d="M75 230C201 218 310 231 416 224C532 216 650 231 825 214" className="pefit-notebook-rule" />
            <path d="M85 95C194 74 302 88 414 81C543 73 661 88 814 67" className="pefit-notebook-rule pefit-notebook-rule-soft" />
            <path d="M152 160C230 147 307 153 379 145" className="pefit-state-pencil-trace pefit-state-pencil-person" />
            <path d="M153 164C228 151 306 159 380 151" className="pefit-state-pencil-trace pefit-state-pencil-person pefit-state-pencil-quiet" />
            <path d="M152 197C261 183 370 195 480 185C586 176 697 188 804 174" className="pefit-state-pencil-trace pefit-state-pencil-environment" />
            <path d="M153 202C261 189 372 201 482 191C588 182 700 194 805 180" className="pefit-state-pencil-trace pefit-state-pencil-environment pefit-state-pencil-quiet" />
            <text x="150" y="128" className="pefit-state-label pefit-state-label-person">PERSONAL REQUIREMENT</text>
            <text x="642" y="157" className="pefit-state-label pefit-state-label-environment">ENVIRONMENTAL SUPPLY</text>
            <path d={state === "under" ? "M380 154C415 166 446 175 480 185" : state === "fit" ? "M380 154C426 159 447 171 480 185" : "M380 154C446 140 518 158 588 178"} className="pefit-state-connection" />
            <circle cx={state === "under" ? 480 : state === "fit" ? 451 : 588} cy={state === "under" ? 185 : state === "fit" ? 172 : 178} r="11" className="pefit-state-pencil-node" />
            <text x={state === "under" ? 421 : state === "fit" ? 458 : 595} y="134" className="pefit-state-note">{state === "under" ? "gap" : state === "fit" ? "meeting trace" : "extends beyond"}</text>
            <text x="450" y="267" textAnchor="middle" className="pefit-state-note pefit-state-caption">teaching analogy · not a validated score or outcome prediction</text>
          </svg>
          <div className="pefit-state-measure" aria-hidden="true"><span>same person</span><i className="pefit-measure-line" /><span>same environment</span></div>
        </div>
        <div className="pefit-state-controls" role="group" aria-label="Correspondence state">
          {(Object.keys(stateCopy) as CorrespondenceState[]).map((key) => <button key={key} type="button" className={`pefit-state-button pefit-state-button-${key} ${state === key ? "is-selected" : ""}`} aria-pressed={state === key} onClick={() => setState(key)}>{stateCopy[key].label}</button>)}
        </div>
        <p className="pefit-state-reading" aria-live="polite"><strong>{stateInfo.label}.</strong> {stateInfo.note} <span>Nothing here calculates an outcome.</span></p>
      </section>

      <section className="pefit-section pefit-target-section" id="fit-targets" aria-labelledby="target-title">
        <div className="pefit-section-kicker"><span>03</span><span>THE PERSON REMAINS · THE TARGET CHANGES</span></div>
        <div className="pefit-split-heading"><div><h2 id="target-title">One person,<br /><em>four targets.</em></h2><p>Fit is local to the relationship being examined. A good match with one target does not guarantee a good match with another.</p></div><p className="pefit-hand">different territories<br />same person</p></div>
        <div className={`pefit-target-field pefit-target-${target}`}>
          <div className="pefit-target-artwork pefit-target-artwork-crop">
            <img src={primaryArt} alt="A crop of the working world showing the person and surrounding task, group and organisational relationships." loading="lazy" />
            <svg viewBox="0 0 1536 1024" aria-hidden="true">
              <path d="M250 490C470 350 660 370 820 500" className="pefit-target-live-line pefit-target-live-line-job" />
              <path d="M820 500C1010 350 1170 370 1370 520" className="pefit-target-live-line pefit-target-live-line-organisation" />
              <path d="M760 520C620 600 520 650 380 730" className="pefit-target-live-line pefit-target-live-line-group" />
              <path d="M830 520C1020 530 1140 560 1310 680" className="pefit-target-live-line pefit-target-live-line-supervisor" />
              <text x="760" y="245" className="pefit-target-note">one target ≠ every target · the person remains</text>
            </svg>
          </div>
          <div className="pefit-target-controls" role="group" aria-label="Fit target">
            {targetOrder.map((key) => { const item = record.fitTargets?.find((candidate) => candidate.id === key); const label = item?.title ?? key; return <button key={key} type="button" className={`pefit-target-button pefit-target-button-${key} ${target === key ? "is-selected" : ""}`} aria-label={`${label}: ${target === key ? "reading this relation" : "inspect target"}`} aria-pressed={target === key} onClick={() => setTarget(key)}><span>{label}</span><small>{target === key ? "reading this relation" : "inspect target"}</small></button>; })}
          </div>
          {currentTarget && <div className="pefit-target-reading" aria-live="polite"><span className="pefit-target-reading-label">{targetLabel} · {currentTarget.question}</span><p>{currentTarget.example}</p></div>}
        </div>
      </section>

      <section className="pefit-section pefit-adjust-section" id="work-adjustment" aria-labelledby="adjust-title">
        <div className="pefit-section-kicker"><span>04</span><span>A CONTINUING RELATIONSHIP</span></div>
        <div className="pefit-split-heading"><div><h2 id="adjust-title">Two viewpoints,<br /><em>one relation.</em></h2><p>{record.workAdjustment}</p></div><p className="pefit-hand">turn the field<br />without changing it</p></div>
        <div className={`pefit-adjust-field pefit-adjust-${viewpoint}`}>
          <div className="pefit-adjust-side pefit-adjust-person"><span className="pefit-adjust-label">PERSON’S VIEW</span><strong>Satisfaction</strong><p>Are this person’s needs met by what the environment supplies?</p></div>
          <div className="pefit-adjust-relation">
            <div className="pefit-adjust-artwork"><img src={primaryArt} alt="A crop of the same working relation, with the person, desk and surrounding workplace still present." loading="lazy" /><svg viewBox="0 0 1536 1024" aria-hidden="true"><path d="M440 520C620 370 820 350 1010 500" className="pefit-adjust-live-line pefit-adjust-live-line-coral" /><path d="M520 640C760 570 980 580 1210 690" className="pefit-adjust-live-line pefit-adjust-live-line-teal" /></svg></div>
            <span className="pefit-adjust-middle-note">walk around the same relationship</span>
          </div>
          <div className="pefit-adjust-side pefit-adjust-environment"><span className="pefit-adjust-label">ENVIRONMENT’S VIEW</span><strong>Satisfactoriness</strong><p>Do the person’s abilities meet what the environment requires?</p></div>
        </div>
        <div className="pefit-view-controls" role="group" aria-label="Work adjustment viewpoint">
          <button type="button" className={viewpoint === "satisfaction" ? "is-selected" : ""} aria-pressed={viewpoint === "satisfaction"} onClick={() => setViewpoint("satisfaction")}>Satisfaction <span>needs → supplies</span></button>
          <button type="button" className={viewpoint === "satisfactoriness" ? "is-selected" : ""} aria-pressed={viewpoint === "satisfactoriness"} onClick={() => setViewpoint("satisfactoriness")}>Satisfactoriness <span>requirements → abilities</span></button>
        </div>
        <p className="pefit-adjust-reading" aria-live="polite">Viewing the same continuing relation from the <strong>{viewpoint === "satisfaction" ? "person’s" : "environment’s"}</strong> side.</p>
      </section>
    </>
  );
}

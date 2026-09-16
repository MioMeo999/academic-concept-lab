"use client";

import { useState } from "react";

type OpeningMode = "whole" | "demands" | "resources";
type ProcessMode = "both" | "health" | "motivational";
type DemandMode = "both" | "challenge" | "hindrance";
type ResourceMode = "none" | "support" | "autonomy" | "feedback";

const assetAlt = {
  opening: "Coloured-pencil workplace atlas showing one working world with pressure, deadlines and health impairment in vermilion above, and support, autonomy, feedback and motivation in teal below.",
  processes: "Coloured-pencil organisational field showing two parallel currents from one job: pressure, sustained effort, incomplete recovery and health complaints above; support, autonomy, feedback, engagement and commitment below.",
  challenge: "Coloured-pencil comparison of the same effort splitting into a challenge demand that supports new skills, problem solving, mastery and growth, or a hindrance demand marked by interruptions, red tape, friction and no meaningful return.",
  interaction: "Coloured-pencil interaction field showing the same work situation, demands on the left, and resources changing the connection through buffering and boosting on the right.",
} as const;

function ArtCanvas({ src, alt, className, mode, children }: {
  src: string;
  alt: string;
  className: string;
  mode: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`jdr-live-canvas ${className}`} data-mode={mode} role="img" aria-label={alt}>
      {/* Authored artwork remains a static visual layer; state is expressed by the editorial focus treatment. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden="true" draggable={false} decoding="async" />
      <div className="jdr-live-ink" aria-hidden="true" />
      {children}
    </div>
  );
}

function ModeButton({ active, children, onClick, label }: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button type="button" className={active ? "is-active" : undefined} aria-pressed={active} onClick={onClick}>
      <span aria-hidden="true" className="jdr-mode-dot" />
      <span>{children}</span>
      <span className="jdr-sr-only">{active ? `Selected: ${label}` : `Select ${label}`}</span>
    </button>
  );
}

function LiveControls({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <div className={`jdr-live-controls ${className}`} role="group" aria-label={label}>{children}</div>;
}

export function JDROpening() {
  const [mode, setMode] = useState<OpeningMode>("whole");
  const copy = {
    whole: ["whole workplace", "one job · many simultaneous conditions"],
    demands: ["demand focus", "workload · time · emotion · complexity"],
    resources: ["resource focus", "support · autonomy · feedback · growth"],
  }[mode];

  return (
    <div className="jdr-live-block jdr-live-opening">
      <div className="jdr-live-stage jdr-opening-stage">
        <ArtCanvas src="/jdr-target-assets/jdr-opening.png" alt={assetAlt.opening} className="jdr-opening-live" mode={mode}>
          <div className="jdr-opening-traces" aria-hidden="true">
            <span className="jdr-opening-trace jdr-opening-trace-demand" />
            <span className="jdr-opening-trace jdr-opening-trace-resource" />
          </div>
          <div className="jdr-live-reading" aria-live="polite">
            <span>{copy[0]}</span>
            <strong>{copy[1]}</strong>
          </div>
        </ArtCanvas>
        <LiveControls label="Explore the working world" className="jdr-controls-opening">
          <ModeButton active={mode === "whole"} onClick={() => setMode("whole")} label="whole workplace">Whole workplace</ModeButton>
          <ModeButton active={mode === "demands"} onClick={() => setMode("demands")} label="demands">Demands</ModeButton>
          <ModeButton active={mode === "resources"} onClick={() => setMode("resources")} label="resources">Resources</ModeButton>
        </LiveControls>
      </div>
      <p className="jdr-sr-only" aria-live="polite">{copy[0]}: {copy[1]}</p>
      <p className="jdr-live-caption">Focus changes what you notice; the working world remains one field.</p>
    </div>
  );
}

export function JDRCategories() {
  const [context, setContext] = useState<"novice" | "expert">("novice");
  const novice = context === "novice";
  return (
    <div className="jdr-category-live" aria-labelledby="jdr-category-experiment-title">
      <div className="jdr-category-live-copy">
        <p className="jdr-subhead" id="jdr-category-experiment-title">Teaching example · the same condition</p>
        <p className="jdr-category-live-lede">Close supervision changes category when the work context changes.</p>
        <LiveControls label="Change the work context" className="jdr-controls-context">
          <ModeButton active={novice} onClick={() => setContext("novice")} label="novice">Novice</ModeButton>
          <ModeButton active={!novice} onClick={() => setContext("expert")} label="expert">Expert</ModeButton>
        </LiveControls>
        <p className="jdr-category-live-state" aria-live="polite">
          For {novice ? "a novice" : "an expert"}, close supervision reads as a <strong className={novice ? "is-teal" : "is-red"}>{novice ? "resource" : "demand"}</strong> because it {novice ? "provides guidance while the task is being learned." : "constrains discretion in work the person already knows."}
        </p>
      </div>
      <div className={`jdr-condition-mini ${novice ? "is-novice" : "is-expert"}`} aria-hidden="true">
        <div className="jdr-mini-work">one condition</div>
        <div className="jdr-mini-person" />
        <div className="jdr-mini-supervision">close supervision</div>
        <div className="jdr-mini-path">
          <span>close supervision</span><i aria-hidden="true">→</i>
          <span>{novice ? "guidance" : "constraint"}</span><i aria-hidden="true">→</i>
          <span>{novice ? "capacity" : "cost"}</span>
        </div>
        <div className="jdr-mini-caption">{novice ? "guidance · capacity" : "constraint · cost"}</div>
      </div>
    </div>
  );
}

export function JDRProcesses() {
  const [mode, setMode] = useState<ProcessMode>("both");
  return (
    <div className="jdr-live-block jdr-live-processes">
      <div className="jdr-live-stage jdr-process-stage">
        <ArtCanvas src="/jdr-target-assets/jdr-processes.png" alt={assetAlt.processes} className="jdr-processes-live" mode={mode}>
          <div className="jdr-process-traces" aria-hidden="true">
            <span className="jdr-process-trace jdr-process-trace-health" />
            <span className="jdr-process-trace jdr-process-trace-motivation" />
          </div>
          <div className="jdr-live-reading" aria-live="polite">
            {mode === "both" ? <><span>parallel routes</span><strong>same person · different processes</strong></> : null}
            {mode === "health" ? <><span>health-impairment process</span><strong>demand → effort → incomplete recovery → strain</strong></> : null}
            {mode === "motivational" ? <><span>motivational process</span><strong>resource → motivation → engagement → commitment</strong></> : null}
          </div>
        </ArtCanvas>
        <LiveControls label="Explore the parallel processes" className="jdr-controls-processes">
          <ModeButton active={mode === "both"} onClick={() => setMode("both")} label="both processes">Both</ModeButton>
          <ModeButton active={mode === "health"} onClick={() => setMode("health")} label="health impairment">Health impairment</ModeButton>
          <ModeButton active={mode === "motivational"} onClick={() => setMode("motivational")} label="motivational process">Motivational</ModeButton>
        </LiveControls>
      </div>
      <div className="jdr-live-route" aria-live="polite">
        <span className={mode === "health" || mode === "both" ? "is-red" : "is-muted"}>Health impairment: demands accumulate effort and can narrow recovery.</span>
        <span className={mode === "motivational" || mode === "both" ? "is-teal" : "is-muted"}>Motivational: resources open agency and can strengthen engagement.</span>
      </div>
      <p className="jdr-sr-only" aria-live="polite">
        {mode === "both" ? "Both routes remain visible: the same person can be exhausted and engaged." : mode === "health" ? "Health impairment route focused: demand, effort, incomplete recovery and strain." : "Motivational route focused: resource, motivation, engagement and commitment."}
      </p>
    </div>
  );
}

export function JDRChallenge() {
  const [mode, setMode] = useState<DemandMode>("both");
  return (
    <div className="jdr-live-block jdr-live-challenge">
      <div className="jdr-live-stage jdr-challenge-stage">
        <ArtCanvas src="/jdr-target-assets/jdr-challenge-hindrance.png" alt={assetAlt.challenge} className="jdr-challenge-live" mode={mode}>
          <div className="jdr-challenge-traces" aria-hidden="true">
            <span className="jdr-challenge-route jdr-challenge-route-challenge" />
            <span className="jdr-challenge-route jdr-challenge-route-hindrance" />
          </div>
          <div className="jdr-live-reading" aria-live="polite">
            {mode === "both" ? <><span>same effort</span><strong>different return</strong></> : null}
            {mode === "challenge" ? <><span>challenge route</span><strong>stretch → learning → meaningful return</strong></> : null}
            {mode === "hindrance" ? <><span>hindrance route</span><strong>friction → blocked progress → no return</strong></> : null}
          </div>
        </ArtCanvas>
        <LiveControls label="Compare demand routes" className="jdr-controls-challenge">
          <ModeButton active={mode === "both"} onClick={() => setMode("both")} label="both routes">Compare both</ModeButton>
          <ModeButton active={mode === "challenge"} onClick={() => setMode("challenge")} label="challenge">Challenge</ModeButton>
          <ModeButton active={mode === "hindrance"} onClick={() => setMode("hindrance")} label="hindrance">Hindrance</ModeButton>
        </LiveControls>
      </div>
      <p className="jdr-sr-only" aria-live="polite">
        {mode === "both" ? "Compare both routes from the same effort." : mode === "challenge" ? "Challenge route focused: stretch, learning and meaningful return." : "Hindrance route focused: friction, blocked progress and no meaningful return."}
      </p>
    </div>
  );
}

export function JDRInteraction() {
  const [resource, setResource] = useState<ResourceMode>("none");
  const state = {
    none: ["demand remains", "The demand is still present; no added resource changes the route."],
    support: ["support introduced", "Support can buffer the demand–strain relationship without making the demand disappear."],
    autonomy: ["autonomy introduced", "Autonomy can widen room to act, making the same work more possible to engage with."],
    feedback: ["feedback introduced", "Feedback can clarify the route and strengthen the motivational relationship."],
  }[resource];
  return (
    <div className="jdr-live-block jdr-live-interaction">
      <div className="jdr-live-stage jdr-interaction-stage">
        <ArtCanvas src="/jdr-target-assets/jdr-interaction.png" alt={assetAlt.interaction} className="jdr-interaction-live" mode={resource}>
          <div className="jdr-interaction-traces" aria-hidden="true">
            <span className="jdr-interaction-trace jdr-interaction-demand" />
            <span className="jdr-interaction-trace jdr-interaction-resource" />
          </div>
          <div className="jdr-live-reading" aria-live="polite">
            <span>{state[0]}</span>
            <strong>{state[1]}</strong>
          </div>
        </ArtCanvas>
        <LiveControls label="Introduce a resource into the work situation" className="jdr-controls-interaction">
          <ModeButton active={resource === "none"} onClick={() => setResource("none")} label="no added resource">Demand only</ModeButton>
          <ModeButton active={resource === "support"} onClick={() => setResource("support")} label="support">Support</ModeButton>
          <ModeButton active={resource === "autonomy"} onClick={() => setResource("autonomy")} label="autonomy">Autonomy</ModeButton>
          <ModeButton active={resource === "feedback"} onClick={() => setResource("feedback")} label="feedback">Feedback</ModeButton>
        </LiveControls>
      </div>
      <p className="jdr-sr-only" aria-live="polite">{state[0]}: {state[1]}</p>
      <p className="jdr-live-caption">Teaching exploration · categorical relationship, not a quantitative effect size.</p>
    </div>
  );
}

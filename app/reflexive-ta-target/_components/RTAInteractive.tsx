"use client";

import { useState } from "react";
import type { ProcedureStep, ThemeContrast } from "../../../content/types";

const phaseWords = ["READ", "CODE", "GATHER", "TEST", "DEFINE", "WRITE"];
const phaseColours = ["ochre", "cobalt", "teal", "coral", "violet", "rose"];

const lensLabels = {
  inductive: "more inductive reading",
  deductive: "more theoretically directed reading",
};
const depthLabels = {
  semantic: "semantic attention",
  latent: "latent attention",
};

const readings = {
  inductive: {
    semantic: "The account describes learning to improvise when the planned structure stops helping.",
    latent: "Professional competence is being renegotiated through uncertainty rather than displayed as control.",
  },
  deductive: {
    semantic: "The extract can be read against a sensitising idea of responsive practice and participant-centred work.",
    latent: "A theory of situated professionalism makes the tension between plan and responsiveness newly visible.",
  },
};

type LensKey = "inductive" | "deductive";
type DepthKey = "semantic" | "latent";

type Props = {
  procedure: ProcedureStep[];
  themeContrast: ThemeContrast;
  themeLede: string;
};

function Mark({ kind = "underline" }: { kind?: string }) {
  return <span className={`rta-mark rta-mark-${kind}`} aria-hidden="true" />;
}

export default function RTAInteractive({ procedure, themeContrast, themeLede }: Props) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [themeMode, setThemeMode] = useState<"topic" | "code" | "theme" | "concept">("topic");
  const [lens, setLens] = useState<LensKey>("inductive");
  const [depth, setDepth] = useState<DepthKey>("semantic");
  const phase = procedure[phaseIndex];

  return (
    <>
      <div className="rta-process-chapter">
      <section className="rta-worktable" id="rta-phases" aria-labelledby="rta-phases-title">
        <div className="rta-section-intro rta-worktable-intro">
          <p className="rta-kicker"><span>04</span><span>ONE FIELD / SIX RETURNING MOVES</span></p>
          <h2 id="rta-phases-title">The analysis<br /><em>leaves traces.</em></h2>
          <p>Six phases make the method teachable. The work itself moves backwards and forwards, carrying earlier readings underneath later ones.</p>
          <p className="rta-hand">return to the extract · again</p>
        </div>

        <div className="rta-worktable-field">
          <div className="rta-field-meta"><span>ORIGINAL TEACHING EXAMPLE</span><span>same material · changing reading</span></div>
          <div className="rta-phase-rail" role="tablist" aria-label="Six recursive phases">
            {procedure.map((item, index) => (
              <button key={item.n} id={`rta-phase-tab-${index}`} role="tab" aria-controls="rta-analysis-panel" aria-selected={index === phaseIndex} className={`rta-phase-tab tone-${phaseColours[index]}`} onClick={() => setPhaseIndex(index)}>
                <span>{item.n}</span><b>{phaseWords[index]}</b><small>{item.title}</small>
              </button>
            ))}
          </div>

          <div id="rta-analysis-panel" role="tabpanel" aria-labelledby={`rta-phase-tab-${phaseIndex}`} aria-live="polite" className={`rta-analysis-canvas phase-${phaseIndex}`}>
            <svg className="rta-analysis-lines" viewBox="0 0 1000 560" aria-hidden="true">
              <path className="rta-ghost-line" d="M80 456 C190 350 240 440 350 314 S566 320 655 218 S820 210 920 112" />
              <path className="rta-active-line" d={`M${110 + phaseIndex * 32} ${430 - phaseIndex * 43} C220 ${310 - phaseIndex * 12} 340 ${410 - phaseIndex * 42} 470 ${250 - phaseIndex * 22} S690 ${320 - phaseIndex * 36} 900 ${145 + phaseIndex * 11}`} />
              <path className="rta-return-line" d="M910 480 C780 520 650 495 540 512 S270 533 130 490" />
              <circle className="rta-puncture" cx={110 + phaseIndex * 32} cy={430 - phaseIndex * 43} r="9" />
            </svg>
            <div className="rta-extract-sheet">
              <p className="rta-sheet-note">fieldnote 01 · constructed excerpt</p>
              <p className="rta-extract">“We stopped following the plan because they seemed tired. I wasn’t sure whether I was leading or accompanying. Only afterwards did I realise the dance had changed my playing.”</p>
              <span className="rta-pencil-note note-one">what catches?</span>
              <span className="rta-pencil-note note-two">what is being assumed?</span>
              <Mark kind={phaseIndex < 2 ? "underline" : "circle"} />
              <span className="rta-eraser-trace" aria-hidden="true" />
            </div>
            <div className="rta-code-cluster" aria-label="Live analytic marks">
              <span className="rta-code code-a">adapting to participant energy</span>
              <span className="rta-code code-b">authority becoming relational</span>
              <span className="rta-code code-c">recognising collaboration retrospectively</span>
              <span className="rta-ghost-code">changing plan</span>
            </div>
            <div className="rta-analysis-history" aria-label="Visible history of this reading">
              <span className="history-current">current reading</span>
              <span className="history-earlier">earlier trace</span>
              <span className="history-revision">revised boundary</span>
            </div>
            <span className="rta-interpretation-note">candidate interpretation · held open</span>
            <div className="rta-phase-reading" aria-live="polite">
              <p className={`rta-phase-stamp tone-${phaseColours[phaseIndex]}`}><b>{phaseWords[phaseIndex]}</b><span>{phase?.n}</span></p>
              <h3>{phase?.title}</h3>
              <p>{phase?.body}</p>
              <p className="rta-live-caption"><b>● Live method explanation.</b> The extract is revisited; it is not six different datasets.</p>
            </div>
          </div>
          <div className="rta-worktable-footer"><button className="rta-return-data" type="button" onClick={() => setPhaseIndex(0)}><span className="rta-return-arrow">↶</span> return to data</button><span>Earlier marks remain as residue. A candidate reading can be revised without pretending the earlier reading never happened.</span></div>
        </div>
      </section>

      <section className="rta-reflexivity" id="rta-reflexivity" aria-labelledby="rta-reflexivity-title">
        <div className="rta-reflexivity-copy">
          <p className="rta-kicker"><span>05</span><span>THE RESEARCHER IS INSIDE THE ANALYSIS</span></p>
          <h2 id="rta-reflexivity-title">Reflexivity is not<br /><em>phase seven.</em></h2>
          <p>The researcher is not a contaminant standing outside the data. Their standpoint, questions and theoretical position are part of the analytic instrument — made visible and examined.</p>
          <p className="rta-hand">the layer passes through every phase</p>
        </div>
        <div className="rta-tracing-field">
          <div className="rta-tracing-paper">
            <span className="rta-trace-label">RESEARCHER / TRACING LAYER</span>
            <div className="rta-trace-extract">“We stopped following the plan because they seemed tired.”</div>
            <span className="rta-reflex-note reflex-one">Why am I noticing this?</span>
            <span className="rta-reflex-note reflex-two">What am I assuming here?</span>
            <span className="rta-reflex-note reflex-three">What other reading is possible?</span>
            <span className="rta-reflex-note reflex-four">What became quieter when I grouped these together?</span>
            <svg viewBox="0 0 800 390" aria-hidden="true"><path d="M85 290 C190 210 265 320 374 225 S574 184 720 98" /><path d="M108 320 C245 280 322 338 438 282 S610 268 738 192" /></svg>
          </div>
          <div className="rta-underlayer"><span>data</span><span>research question</span><span>theoretical position</span></div>
        </div>
      </section>

      <section className="rta-theme-section" id="rta-theme" aria-labelledby="rta-theme-title">
        <div className="rta-theme-copy">
          <p className="rta-kicker"><span>06</span><span>WHAT ACTUALLY HOLDS THESE TOGETHER?</span></p>
          <h2 id="rta-theme-title">A theme is not<br /><em>a bucket.</em></h2>
          <p>{themeLede}</p>
          <p className="rta-hand">topic → code → pattern → concept</p>
        </div>
        <div className="rta-theme-field">
          <div className="rta-theme-controls" role="tablist" aria-label="Move from topic to central organising concept">
            {(["topic", "code", "theme", "concept"] as const).map((mode) => <button key={mode} id={`rta-theme-tab-${mode}`} role="tab" aria-controls="rta-theme-panel" aria-selected={themeMode === mode} className={themeMode === mode ? "is-selected" : ""} onClick={() => setThemeMode(mode)}>{mode}</button>)}
          </div>
          <div id="rta-theme-panel" role="tabpanel" aria-labelledby={`rta-theme-tab-${themeMode}`} aria-live="polite" className={`rta-theme-canvas theme-${themeMode}`}>
            <svg className="rta-theme-threads" viewBox="0 0 760 390" aria-hidden="true"><path d="M110 98 C230 125 248 220 360 190 S516 112 654 160" /><path d="M110 220 C240 260 262 177 360 190 S520 244 654 220" /><path d="M112 310 C230 296 268 230 360 190 S525 305 650 280" /></svg>
            <div className="rta-theme-codes">{themeContrast.strong.slice(0, 3).map((code) => <span key={code}>{code}</span>)}</div>
            <div className="rta-topic-label">WORK–LIFE BALANCE<small>topic-like grouping</small></div>
            <div className="rta-central-concept"><span>central organising concept</span><b>{themeMode === "topic" ? "What is this about?" : themeMode === "code" ? "The claim inside the label" : themeMode === "theme" ? "Abandoning the plan to preserve the purpose" : "Reading the room while surrendering the plan"}</b><small>{themeMode === "topic" ? "a broad container" : themeMode === "code" ? "a code makes an analytic claim" : themeMode === "theme" ? "a candidate pattern of shared meaning" : "one defensible interpretation — not the only one"}</small></div>
            <span className="rta-question-mark">?</span>
          </div>
          <p className="rta-live-caption"><b>▲ Original teaching construction.</b> These codes, names and the extract are invented to show the distinction; they are not findings from a study.</p>
        </div>
      </section>
      </div>

      <section className="rta-lenses" id="rta-lenses" aria-labelledby="rta-lenses-title">
        <div className="rta-lenses-copy">
          <p className="rta-kicker"><span>07</span><span>COMPARE READING / KEEP THE THEORY COHERENT</span></p>
          <h2 id="rta-lenses-title">The same material<br /><em>can be read differently.</em></h2>
          <p>Inductive and deductive, semantic and latent, critical realist and constructionist are not empty switches. They change what becomes analytically audible, while the study still has to say what it assumes.</p>
          <p className="rta-hand">flexibility is a responsibility</p>
        </div>
        <div className="rta-lens-field">
          <div className="rta-lens-compare-label"><span>COMPARE READING</span><b>what becomes visible?</b><small>Keep the extract steady; compare the account that each coherent reading makes possible.</small></div>
          <div className="rta-lens-controls">
            <div role="group" aria-label="Compare orientation of reading"><span>orientation</span><button className={lens === "inductive" ? "is-selected" : ""} aria-pressed={lens === "inductive"} onClick={() => setLens("inductive")}>more inductive</button><button className={lens === "deductive" ? "is-selected" : ""} aria-pressed={lens === "deductive"} onClick={() => setLens("deductive")}>more theoretically directed</button></div>
            <div role="group" aria-label="Compare analytic attention"><span>attention</span><button className={depth === "semantic" ? "is-selected" : ""} aria-pressed={depth === "semantic"} onClick={() => setDepth("semantic")}>semantic reading</button><button className={depth === "latent" ? "is-selected" : ""} aria-pressed={depth === "latent"} onClick={() => setDepth("latent")}>latent reading</button></div>
          </div>
          <div className={`rta-lens-reading lens-${lens} depth-${depth}`} aria-live="polite">
            <svg className="rta-reading-divergence" viewBox="0 0 720 360" aria-hidden="true">
              <path className="divergence-base" d="M32 284 C145 230 188 208 286 196 S442 177 680 72" />
              <path className="divergence-inductive" d="M286 196 C344 138 412 116 480 130 S588 188 676 252" />
              <path className="divergence-deductive" d="M286 196 C356 222 416 260 494 246 S604 164 680 74" />
              <path className="divergence-semantic" d="M85 310 C194 280 258 280 340 244 S468 218 560 186" />
              <path className="divergence-latent" d="M86 316 C188 330 278 324 366 284 S520 130 646 118" />
              <circle className="divergence-node node-origin" cx="286" cy="196" r="8" />
              <circle className="divergence-node node-inductive" cx="480" cy="130" r="6" />
              <circle className="divergence-node node-deductive" cx="494" cy="246" r="6" />
            </svg>
            <div className="rta-lens-extract">“I wasn’t sure whether I was leading or accompanying.”</div>
            <span className={`rta-lens-bracket lens-${lens}`} aria-hidden="true" />
            <p className="rta-lens-result"><span>{lensLabels[lens]} · {depthLabels[depth]}</span>{readings[lens][depth]}</p>
            <div className="rta-lens-orientation-notes">
              <p><b>critical realist</b><span>A reading might attend to how conditions and relations shape what can happen.</span></p>
              <p><b>constructionist</b><span>A reading might attend to how meanings are made through language, context and interaction.</span></p>
              <i>orientation named, not measured</i>
            </div>
          </div>
          <p className="rta-live-caption"><b>■ Faithful explanation.</b> Methodological flexibility does not mean theoretical emptiness; coherence is the quality test.</p>
        </div>
      </section>
    </>
  );
}

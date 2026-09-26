"use client";

import { useState, type CSSProperties } from "react";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import { Rich } from "../../_components/Sketch";
import s from "./jdr.module.css";

const ART = "/visual-language/theories/jdr";

/* ------------------------------------------------------------------------
   01 · Sorted by function
   One condition, two workers. The central crop of the opening world stays
   put; the condition travels to whichever category it functions as. The
   route it did not take stays drawn in graphite — in another job, it would.
   --------------------------------------------------------------------- */

type Who = "novice" | "expert";

type Category = { title: string; definition: string; examples: string[] };

export function SortByFunction({ demands, resources, note }: { demands: Category; resources: Category; note: string }) {
  const [who, setWho] = useState<Who>("novice");
  const toResources = who === "novice";
  const reading = toResources
    ? { side: "a job resource", why: "it gives guidance while the task is still being learned" }
    : { side: "a job demand", why: "it constrains discretion in work the person already knows" };

  const Side = ({ cat, tone, joined }: { cat: Category; tone: "demand" | "resource"; joined: boolean }) => (
    <article className={s.sortSide} data-tone={tone} data-joined={joined || undefined}>
      <h3>{cat.title}</h3>
      <p>{cat.definition}</p>
      <ul aria-label={`Typical ${cat.title.toLowerCase()}`}>
        {cat.examples.map((x) => <li key={x}>{x}</li>)}
        <li className={s.sortArrival} aria-hidden={!joined}>
          close supervision <span>{tone === "resource" ? "for a novice" : "for an expert"}</span>
        </li>
      </ul>
    </article>
  );

  return (
    <div className={s.sort}>
      <Side cat={demands} tone="demand" joined={!toResources} />
      <figure className={s.sortStage} data-who={who}>
        <div className={s.sortCrop}>
          {/* The same authored world as the opening, read at one desk. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ART}/jdr-opening.webp`} alt="" aria-hidden="true" width={1448} height={1086} loading="lazy" decoding="async" />
        </div>
        <svg className={s.sortRoutes} viewBox="0 0 400 390" preserveAspectRatio="none" aria-hidden="true">
          <path className={s.sortToDemand} d="M200 70 C 150 40, 70 50, 6 108" filter="url(#folio-pencil)" />
          <path className={s.sortToResource} d="M200 70 C 250 40, 330 50, 394 108" filter="url(#folio-pencil)" />
        </svg>
        <div className={s.sortToken} aria-hidden="true">
          <span>close supervision</span>
        </div>
        <figcaption className={s.sortCaption}>
          <Glyph g="▲" /> Teaching example. The desk is the opening world, cropped; the condition moves, the job does not.
        </figcaption>
      </figure>
      <Side cat={resources} tone="resource" joined={toResources} />
      <div className={s.sortControls}>
        <Choices<Who>
          label="Who is doing this work?"
          value={who}
          onChange={setWho}
          options={[
            { value: "novice", label: "A novice", hint: "still learning the task" },
            { value: "expert", label: "An expert", hint: "already knows the work" },
          ]}
        />
        <p className={s.sortReading} aria-live="polite">
          For {who === "novice" ? "a novice" : "an expert"}, close supervision works as <strong data-tone={toResources ? "resource" : "demand"}>{reading.side}</strong>: {reading.why}.
        </p>
        <Rich as="p" className={s.sortNote} html={note} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   02 · Two currents
   Focus strengthens one process; the other stays on the page in graphite,
   because the theory says both run at once in the same person.
   --------------------------------------------------------------------- */

type Current = "both" | "health" | "motivational";
type Pathway = { title: string; blurb: string; steps: string[] };

export function TwoCurrents({ pathways }: { pathways: Pathway[] }) {
  const [focus, setFocus] = useState<Current>("both");
  const [health, motivation] = pathways;
  const live = {
    both: "Both processes are drawn at full strength: the same person can be exhausted and engaged.",
    health: `${health.title} in focus; the motivational process remains present in graphite.`,
    motivational: `${motivation.title} in focus; the health-impairment process remains present in graphite.`,
  }[focus];

  return (
    <div className={s.currents} data-focus={focus}>
      <figure className={s.currentsStage}>
        <div className={s.pan} tabIndex={0} role="group" aria-label="Drawing of the two currents; scroll sideways on small screens">
        <div className={s.stageInner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ART}/jdr-processes.webp`}
          srcSet={`${ART}/jdr-processes-880.webp 880w, ${ART}/jdr-processes.webp 1448w`}
          sizes="(max-width: 760px) 190vw, 72vw"
          alt="A coloured-pencil drawing of one worker at one desk. From the desk, a vermilion current runs across the top of the sheet through piled work, a clock, a tired figure and a slumped figure; a teal current runs across the bottom through colleagues talking, a plant, feedback on a screen and a figure walking into open space."
          width={1448}
          height={1086}
          loading="lazy"
          decoding="async"
        />
        <span className={s.veilUpper} aria-hidden="true" />
        <span className={s.veilLower} aria-hidden="true" />
        <svg className={s.currentsInk} viewBox="0 0 1000 750" preserveAspectRatio="none" aria-hidden="true">
          <path className={s.inkHealth} d="M250 250 C 330 170, 420 215, 520 200 S 700 190, 790 200 S 900 205, 960 210" filter="url(#folio-pencil)" />
          <path className={s.inkMotivation} d="M240 392 C 300 470, 420 470, 520 465 S 700 490, 800 495 S 900 480, 975 480" filter="url(#folio-pencil)" />
        </svg>
        </div>
        </div>
        <p className={s.panHint} aria-hidden="true">follow the currents →</p>
        <figcaption className={s.stageCaption}>
          <Glyph g="▲" /> Authored teaching drawing. The handwritten words are illustrative marginalia, not measured outcomes; the currents show direction, not size.
        </figcaption>
      </figure>

      <div className={s.currentsControls}>
        <Choices<Current>
          label="Which process to follow"
          value={focus}
          onChange={setFocus}
          options={[
            { value: "both", label: "Both at once" },
            { value: "health", label: "Health impairment" },
            { value: "motivational", label: "Motivational" },
          ]}
        />
        <p className={s.srOnly} aria-live="polite">{live}</p>
      </div>

      <div className={s.routes}>
        {[{ p: health, key: "health" as const }, { p: motivation, key: "motivational" as const }].map(({ p, key }) => (
          <article key={key} className={s.route} data-route={key} data-muted={(focus !== "both" && focus !== key) || undefined}>
            <h3>{p.title}</h3>
            <p className={s.routeBlurb}>{p.blurb}</p>
            <ol className={s.routeSteps}>
              {p.steps.map((step, i) => (
                <li key={step}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   03 · Challenge ≠ hindrance
   A classification exercise: pick a demand and see which route the
   literature places it on. Both routes begin from the same effort.
   --------------------------------------------------------------------- */

type DemandType = { title: string; definition: string; examples: string[]; relates: string };

export function DemandFork({ types }: { types: DemandType[] }) {
  const [challenge, hindrance] = types;
  // Interleaved so the answer is not given away by the order of the list.
  const pool = challenge.examples.flatMap((x, i) => [
    { label: x, type: "challenge" as const },
    ...(hindrance.examples[i] ? [{ label: hindrance.examples[i], type: "hindrance" as const }] : []),
  ]);
  const [picked, setPicked] = useState<string | null>(null);
  const item = pool.find((p) => p.label === picked) ?? null;
  const focus = item?.type ?? "both";
  const t = item ? (item.type === "challenge" ? challenge : hindrance) : null;

  return (
    <div className={s.fork} data-focus={focus}>
      <figure className={s.forkStage}>
        <div className={s.pan} tabIndex={0} role="group" aria-label="Drawing of the two demand routes; scroll sideways on small screens">
        <div className={s.stageInner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ART}/jdr-challenge-hindrance.webp`}
          srcSet={`${ART}/jdr-challenge-hindrance-880.webp 880w, ${ART}/jdr-challenge-hindrance.webp 1448w`}
          sizes="(max-width: 760px) 190vw, 64vw"
          alt="A coloured-pencil drawing in which one worker's sustained effort splits into two routes. The upper teal route passes a person learning, colleagues solving a problem and a figure walking toward an open landscape. The lower vermilion route passes interruptions, stacked paperwork and a barrier across the way."
          width={1448}
          height={1086}
          loading="lazy"
          decoding="async"
        />
        <span className={s.veilUpper} aria-hidden="true" />
        <span className={s.veilLower} aria-hidden="true" />
        </div>
        </div>
        <p className={s.panHint} aria-hidden="true">same effort, two returns →</p>
        <figcaption className={s.stageCaption}>
          <Glyph g="▲" /> Authored teaching drawing: same effort, two returns. It is not a picture of any study&rsquo;s sample.
        </figcaption>
      </figure>

      <div className={s.forkPanel}>
        <p className={s.forkPrompt} id="jdr-fork-prompt">Place a demand. Which route does the literature put it on?</p>
        <div className={s.forkPool} role="group" aria-labelledby="jdr-fork-prompt">
          {pool.map((p) => (
            <button key={p.label} type="button" aria-pressed={picked === p.label} onClick={() => setPicked(picked === p.label ? null : p.label)}>
              {p.label}
            </button>
          ))}
        </div>
        <div className={s.forkAnswer} aria-live="polite">
          {item && t ? (
            <>
              <p className={s.forkVerdict} data-type={item.type}>
                <b>{item.label}</b> is treated as a <strong>{t.title.toLowerCase().replace(/s$/, "")}</strong>.
              </p>
              <p>{t.definition}</p>
              <p className={s.forkRelates}>Tends to relate to <Rich html={t.relates} /></p>
            </>
          ) : (
            <p className={s.forkIdle}>Both routes start from the same sustained effort. Choose a demand to follow its return.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   04 · Where the conditions touch
   The demand stays constant on the left of the drawing. Resources change
   the two relationships leaving the desk: the strain route narrows
   (buffering) and the motivational route widens (boosting).
   --------------------------------------------------------------------- */

const DIAL = [
  { strain: 0.92, motiv: 0.18, t: "Demands keep drawing effort and nothing offsets the cost. This is the health-impairment route: sustained effort, exhaustion, and over time, health complaints." },
  { strain: 0.55, motiv: 0.55, t: "Resources begin to buffer — the same demands cost less. The motivational route becomes available alongside the strain route, not instead of it." },
  { strain: 0.24, motiv: 0.9, t: "Demands are still high, but plentiful resources both blunt the strain and count for more than they would in an easy job. The demands are what make the resources matter." },
] as const;

export function ResourceDial({ options, label, caption }: { options: string[]; label: string; caption: string }) {
  const [i, setI] = useState(0);
  const st = DIAL[i];
  const w = (v: number) => (2 + v * 13).toFixed(1);
  return (
    <div className={s.dial}>
      <figure className={s.dialStage}>
        <div className={s.pan} tabIndex={0} role="group" aria-label="Drawing of the same work situation; scroll sideways on small screens">
        <div className={s.stageInner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ART}/jdr-interaction.webp`}
          srcSet={`${ART}/jdr-interaction-880.webp 880w, ${ART}/jdr-interaction.webp 1448w`}
          sizes="(max-width: 760px) 190vw, 64vw"
          alt="A coloured-pencil drawing of the same work situation. Vermilion demands — a clock, piled paper — gather on the left and converge on a worker at a desk. On the right, the routes leaving the desk pass a colleague offering support above and a worker with room to grow below."
          width={1448}
          height={1086}
          loading="lazy"
          decoding="async"
        />
        <svg className={s.dialInk} viewBox="0 0 1000 750" preserveAspectRatio="none" aria-hidden="true">
          <path className={s.dialStrain} d="M585 368 C 640 330, 690 292, 760 262" style={{ strokeWidth: w(st.strain) } as CSSProperties} filter="url(#folio-pencil)" />
          <path className={s.dialMotiv} d="M592 452 C 650 486, 700 500, 770 512" style={{ strokeWidth: w(st.motiv) } as CSSProperties} filter="url(#folio-pencil)" />
        </svg>
        <span className={s.dialTagStrain} aria-hidden="true">strain route</span>
        <span className={s.dialTagMotiv} aria-hidden="true">motivational route</span>
        </div>
        </div>
      </figure>
      <div className={s.dialPanel}>
        <p className={s.dialHeld}>Demands held high</p>
        <Choices<string>
          label={label}
          value={options[i]}
          onChange={(v) => setI(Math.max(0, options.indexOf(v)))}
          options={options.map((o) => ({ value: o, label: o }))}
        />
        <p className={s.dialState} aria-live="polite">{st.t}</p>
        <p className={s.dialCaption}><Glyph g="▲" /> {caption}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   05 · The model widens
   One diagram accumulates across five dated sources. Earlier construction
   stays visible as graphite; the newest addition is inked.
   --------------------------------------------------------------------- */

type Origin = { year: string; author: string; work: string; contribution: string };
type Expansion = { title: string; body: string };

const YEARS = ["2001", "2007", "2010", "2014", "2023"] as const;

export function ModelWidens({ origins, expansions }: { origins: Origin[]; expansions: Expansion[] }) {
  const [yi, setYi] = useState(YEARS.length - 1);
  const year = YEARS[yi];
  const origin = origins.find((o) => o.year === year);
  const at = (from: (typeof YEARS)[number]) => {
    const fi = YEARS.indexOf(from);
    if (fi > yi) return undefined;
    return fi === yi ? "new" : "past";
  };
  const g = (from: (typeof YEARS)[number]) => ({ "data-state": at(from) ?? "future" });

  return (
    <div className={s.widen}>
      <div className={s.widenYears} role="group" aria-label="Step through the theory's dated sources">
        {YEARS.map((y, i) => (
          <button key={y} type="button" aria-pressed={i === yi} onClick={() => setYi(i)}>
            <span className={s.widenYear}>{y}</span>
            <span className={s.widenWho}>{origins.find((o) => o.year === y)?.author.split(",")[0].split(" &amp;")[0].replace(/&amp;/g, "&")}</span>
          </button>
        ))}
      </div>

      <figure className={s.widenFigure}>
        <div className={s.widenPan} tabIndex={0} role="group" aria-label="The model diagram; scroll sideways on small screens">
        <svg viewBox="0 0 960 560" role="img" aria-labelledby="jdr-widen-state" className={s.widenSvg}>
          {/* 2001 · the original frame */}
          <g {...g("2001")}>
            <path className={s.wFrame} d="M78 96 C 300 88, 640 92, 884 98 C 890 220, 888 360, 880 470 C 640 478, 300 474, 84 466 C 76 360, 74 220, 78 96" filter="url(#folio-graphite)" />
            <text className={s.wFrameLabel} x="92" y="84">a model of burnout</text>
            <text className={s.wNode} x="120" y="206">job demands</text>
            <path className={s.wDemandMark} d="M118 214 C 170 212, 214 213, 252 211" filter="url(#folio-pencil)" />
            <text className={s.wNode} x="120" y="386">job resources</text>
            <path className={s.wResourceMark} d="M118 394 C 170 392, 222 393, 262 391" filter="url(#folio-pencil)" />
            <path className={s.wRed} d="M270 206 C 360 200, 460 212, 610 204" filter="url(#folio-pencil)" />
            <text className={s.wRoute} x="330" y="190">health-impairment process</text>
            <path className={s.wTeal} d="M280 386 C 370 392, 470 380, 610 388" filter="url(#folio-pencil)" />
            <text className={s.wRoute} x="340" y="372">motivational process</text>
          </g>

          {/* 2007 · a flexible general model */}
          <g {...g("2007")}>
            <path className={s.wStrike} d="M88 79 C 150 77, 210 81, 262 78" filter="url(#folio-graphite)" />
            <path className={s.wFrameWide} d="M34 48 C 320 38, 660 42, 930 50 C 936 210, 934 380, 928 522 C 660 530, 300 528, 40 518 C 30 380, 28 200, 34 48" filter="url(#folio-graphite)" />
            <text className={s.wFrameLabel} x="640" y="546">a flexible general model</text>
            <text className={s.wNote} x="120" y="236">filled in per occupation</text>
          </g>

          {/* 2010 · challenge and hindrance */}
          <g {...g("2010")}>
            <path className={s.wTeal} d="M252 196 C 300 170, 330 150, 360 146" filter="url(#folio-pencil)" />
            <text className={s.wSub} x="366" y="150">challenge</text>
            <path className={s.wRed} d="M252 216 C 300 236, 330 250, 360 254" filter="url(#folio-pencil)" />
            <text className={s.wSub} x="366" y="262">hindrance</text>
            <path className={s.wTealDash} d="M452 146 C 640 140, 668 300, 612 372" filter="url(#folio-pencil)" />
            <text className={s.wNote} x="664" y="300">engagement too</text>
          </g>

          {/* 2014 · parallel pathways, named outcomes */}
          <g {...g("2014")}>
            <text className={s.wOutcome} x="624" y="212">burnout</text>
            <text className={s.wOutcome} x="624" y="394">work engagement</text>
            <path className={s.wBracket} d="M812 186 C 826 190, 828 200, 826 290 C 828 380, 826 396, 812 402" filter="url(#folio-graphite)" />
            <text className={s.wNote} x="836" y="286">separate</text>
            <text className={s.wNote} x="836" y="310">can co-occur</text>
          </g>

          {/* 2023 · the expansions, numbered to the list beside */}
          <g {...g("2023")}>
            <text className={s.wSub} x="120" y="446">① personal resources</text>
            <path className={s.wTealDash} d="M200 430 C 230 420, 250 408, 272 396" filter="url(#folio-pencil)" />
            <path className={s.wInk} d="M700 300 C 600 330, 420 330, 300 300" filter="url(#folio-pencil)" />
            <path className={s.wInk} d="M312 290 L 298 300 L 314 310" filter="url(#folio-pencil)" />
            <text className={s.wSub} x="420" y="344">② job crafting — arrows run back</text>
            <path className={s.wInk} d="M700 262 c 18 -22 50 -16 52 6 c 2 22 -30 30 -44 12" filter="url(#folio-pencil)" />
            <text className={s.wSub} x="700" y="246">③ self-regulation</text>
            <text className={s.wSub} x="566" y="36">④ individual · team · organisation</text>
            <path className={s.wWave} d="M90 494 c 30 -14 50 14 80 0 s 50 14 80 0 s 50 14 80 0 s 50 14 80 0 s 50 14 80 0 s 50 14 80 0 s 50 14 80 0 s 50 14 80 0 s 50 14 80 0" filter="url(#folio-pencil)" />
            <text className={s.wSub} x="96" y="480">⑤ day to day</text>
          </g>
        </svg>
        </div>
        <figcaption className={s.widenCaption} id="jdr-widen-state" aria-live="polite">
          <span className={s.widenCaptionYear}>{year}</span>
          <span>
            {origin ? <Rich html={origin.contribution} /> : null}
          </span>
        </figcaption>
      </figure>

      <ol className={s.widenExpansions} data-visible={yi === YEARS.length - 1 || undefined} aria-label="What the 2023 review added">
        {expansions.map((x, i) => (
          <li key={x.title}>
            <span aria-hidden="true">{"①②③④⑤"[i]}</span>
            <div>
              <h3>{x.title}</h3>
              <Rich as="p" html={x.body} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

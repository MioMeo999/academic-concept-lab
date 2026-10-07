"use client";

import { useState } from "react";
import Image from "next/image";
import type { Category, Facet, Model as FitModel, Pathway } from "@/content/types";
import { Glyph } from "../../_folio/Folio";
import { Rich } from "../../_components/Sketch";
import s from "./po.module.css";

type Way = "similarity" | "complementarity" | "both";

export function Pieces({ categories }: { categories: Category[] }) {
  const [way, setWay] = useState<Way>("both");
  const supplementary = categories.find((category) => category.title === "Supplementary fit");
  const complementary = categories.find((category) => category.title === "Complementary fit");
  if (!supplementary || !complementary) throw new Error("P–O Fit requires supplementary and complementary fit categories");
  const reading: Record<Way, string> = {
    similarity: "The person and organisation share a characteristic. This is fit by resemblance; it does not mean the person fills a gap.",
    complementarity: "One side supplies what the other needs. This is fit by what completes the relation, not by likeness.",
    both: "Kristof’s definition allows both conditions together: shared characteristics can coexist with one side supplying what the other needs. This combined reading is an editorial explanation, not a separate measured type.",
  };

  return (
    <div className={s.fitRelation} data-way={way}>
      <div className={s.fitChoices} role="group" aria-label="Ways person and organisation can correspond">
        {([
          ["similarity", "Resemblance"],
          ["complementarity", "Complementarity"],
          ["both", "Both can occur"],
        ] as const).map(([key, label]) => (
          <button key={key} type="button" aria-pressed={way === key} onClick={() => setWay(key)}>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className={s.fitReading} aria-live="polite" aria-atomic="true">
        <p className={s.fitReadingLabel}>The relation in view</p>
        <p>{reading[way]}</p>
        <figure className={s.fitSketch} data-way={way}>
          <div className={s.fitFigureWindow}>
            <Image className={s.fitFieldArt} src="/visual-language/theories/po/po-fit-relations-v1.webp" width={1536} height={1024} sizes="(max-width: 700px) 100vw, 48vw" alt="Two pencil studies: separate contours with similar profiles, and a distinct shape filling a gap in another contour." unoptimized />
          </div>
          <figcaption className={s.fitFigureCaption}>
            <div className={s.fitFigureReadings}>
              <p data-current={way === "similarity" || way === "both" || undefined}><b>Resemblance</b><span>Similar features remain on distinct sides.</span></p>
              <p data-current={way === "complementarity" || way === "both" || undefined}><b>Need and supply</b><span>One side may provide what the other needs.</span></p>
            </div>
            <p className={s.fitFigureNote}><Glyph g="▲" /> A teaching drawing of relations, not a fit score or judgement about a real person or organisation.</p>
          </figcaption>
        </figure>
      </div>
      <div className={s.fitKinds}>
        {[supplementary, complementary].map((category) => (
          <article key={category.title} data-active={(way === "both" || (way === "similarity" ? category === supplementary : category === complementary)) || undefined}>
            <p className={s.fitKindType}>{category === supplementary ? "Correspondence by similarity" : "Correspondence by need or supply"}</p>
            <h3>{category.title}</h3>
            <Rich as="p" html={category.definition} />
            <ul aria-label={`${category.title} examples`}>
              {category.examples.map((example) => <li key={example}>{example}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <p className={s.editorialNote}>The distinction names different relations. It does not rank people or organisations, and it does not produce a fit score.</p>
    </div>
  );
}

type CycleStage = "attraction" | "selection" | "attrition" | "relative";
const STAGES: { key: CycleStage; label: string; index: number }[] = [
  { key: "attraction", label: "Attraction", index: 0 },
  { key: "selection", label: "Selection", index: 1 },
  { key: "attrition", label: "Attrition", index: 2 },
  { key: "relative", label: "Relative pattern", index: 3 },
];

export function Cycle({ pathway }: { pathway: Pathway }) {
  const [stage, setStage] = useState<CycleStage>("attraction");
  const current = STAGES.find((item) => item.key === stage);
  if (!current) throw new Error(`P–O Fit is missing ASA stage ${stage}`);
  const currentStep = pathway.steps[current.index];
  if (!currentStep) throw new Error(`P–O Fit is missing the ${current.label} step`);
  return (
    <div className={s.asa}>
      <div className={s.asaControl} role="group" aria-label="Read the attraction–selection–attrition account">
        {STAGES.map((item, i) => (
          <button key={item.key} type="button" aria-pressed={stage === item.key} onClick={() => setStage(item.key)}>
            <span className={s.asaNumber} aria-hidden="true">0{i + 1}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className={s.asaReading} aria-live="polite" aria-atomic="true">
        <p className={s.asaCurrent}>{current.label}</p>
        <p>{currentStep}</p>
      </div>
      <ol className={s.asaSequence} aria-label="The Attraction–Selection–Attrition account in words">
        {pathway.steps.map((step, index) => (
          <li key={step} aria-current={index === current.index ? "step" : undefined}>
            <span aria-hidden="true">0{index + 1}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
      <Rich as="p" className={s.asaBlurb} html={pathway.blurb} />
      <p className={s.editorialNote}>The endpoint is relative homogeneity, not sameness. Schneider’s account also concerns differences between organisations; it does not treat homogeneity as desirable or total.</p>
    </div>
  );
}

const OUTCOME_BY_FACET: Record<string, string> = {
  V: "Cable and DeRue report that perceived P–O fit was related to organisation-focused outcomes: identification, citizenship behaviours and turnover decisions.",
  N: "Needs–supplies fit was related to job- and career-focused outcomes, including job and career satisfaction and occupational commitment.",
  D: "Demands–abilities fit was distinct, but was not related to the hypothesised outcomes of job performance and raises in that study.",
};

export function Perceptions({ label, facets, caption, models }: { label: string; facets: Facet[]; caption: string; models: FitModel[] }) {
  const initial = facets[0];
  if (!initial) throw new Error("P–O Fit requires at least one fit perception");
  const [key, setKey] = useState(initial.initial);
  const current = facets.find((facet) => facet.initial === key);
  if (!current) throw new Error(`P–O Fit is missing perception ${key}`);
  const outcome = OUTCOME_BY_FACET[key];
  if (!outcome) throw new Error(`P–O Fit is missing an outcome note for perception ${key}`);
  return (
    <div className={s.measure}>
      <div className={s.measureControl}>
        <p className={s.measurePrompt}>One question, three possible perceptions</p>
        <p className={s.measureQuote}>“Do you fit here?”</p>
        <p className={s.measureExplain}>The answer depends on which relation the question asks about.</p>
        <div className={s.perceptionChoices} role="group" aria-label={label}>
          {facets.map((facet) => (
            <button key={facet.initial} type="button" aria-pressed={facet.initial === key} onClick={() => setKey(facet.initial)}>
              <span aria-hidden="true">{facet.initial}</span>{facet.label}
            </button>
          ))}
        </div>
      </div>
      <article className={s.measureReading} aria-live="polite" aria-atomic="true">
        <p className={s.measureKind}>{current.label}</p>
        <Rich as="p" className={s.measureBody} html={current.body} />
        <p className={s.measureOutcome}>{outcome}</p>
      </article>
      <ol className={s.measureIndex} aria-label="All three perceptions">
        {facets.map((facet) => (
          <li key={facet.initial} aria-current={facet.initial === key ? "true" : undefined}>
            <span aria-hidden="true">{facet.initial}</span>
            <div><h3>{facet.label}</h3><Rich as="p" html={facet.body} /></div>
          </li>
        ))}
      </ol>
      <p className={s.editorialNote}>The selected state changes which perception is foregrounded; it does not imply that one person&apos;s answer is objectively correct.</p>
      <p className={s.sourceNote}><span aria-hidden="true">▲</span> {caption}</p>
      <ol className={s.measureModels} aria-label="Two approaches to measuring fit">
        {models.map((model) => (
          <li key={model.name}>
            <p className={s.modelYear}>{model.year}</p>
            <div><h3>{model.name}</h3><p className={s.modelSource}>{model.source}</p><Rich as="p" html={model.body} /><p className={s.modelNote}>{model.note}</p></div>
          </li>
        ))}
      </ol>
    </div>
  );
}

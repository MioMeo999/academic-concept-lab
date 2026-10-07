"use client";

import { useState } from "react";
import Image from "next/image";
import type { SETConstraintExample, SETDimension, SETHedonicCell, SETChainStep, SETResource, SETReciprocityMode, SETRuleCase } from "@/content/types";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import s from "./set.module.css";

const EXCHANGE_ART = "/visual-language/theories/set/set-exchange-relation-v2.webp";

function required<T>(items: readonly T[], matches: (item: T) => boolean, name: string): T {
  const found = items.find(matches);
  if (!found) throw new Error(`Social Exchange Theory is missing ${name}`);
  return found;
}

/** The resource changes; the two parties and the possibility of a relation remain. */
export function Resources({ resources }: { resources: SETResource[] }) {
  const [label, setLabel] = useState(resources[0]?.label ?? "");
  const current = required(resources, (item) => item.label === label, `resource “${label}”`);
  return (
    <div className={s.resources}>
      <div className={s.resourceChoice}>
        <p className={s.smallHead}>Choose what passes between the parties</p>
        <Choices label="Resource in this constructed exchange" value={label} onChange={setLabel} options={resources.map((item) => ({ value: item.label, label: item.label }))} />
      </div>
      <div className={s.resourceField} aria-live="polite" aria-atomic="true">
        <p className={s.fieldKicker}>One possible exchange · resource in view</p>
        <p className={s.fieldTitle}>{current.label}</p>
        <p>{current.body}</p>
        <figure className={s.resourceMoment}>
          <div className={s.resourceMomentWindow}>
            <Image src={EXCHANGE_ART} width={1536} height={1024} sizes="(max-width: 700px) 100vw, 50vw" alt="" unoptimized />
          </div>
          <figcaption><Glyph g="▲" /> A constructed transfer, with no return guaranteed.</figcaption>
        </figure>
      </div>
      <p className={s.teachingNote}><Glyph g="✦" /> The resource descriptions follow the record’s Foa and Foa classification. Selecting a resource changes the reading; it does not, by itself, establish a return or a relationship.</p>
    </div>
  );
}

type RuleKey = "direct" | "generalised" | "negotiated" | "none";
const RULE_MATCH: Record<RuleKey, string> = { direct: "direct", generalised: "generalised", negotiated: "negotiated", none: "no automatic" };
const RULE_KEYS: RuleKey[] = ["direct", "generalised", "negotiated", "none"];

const RULE_ART = {
  routes: "/visual-language/theories/set/set-exchange-routes-v1.webp",
  terms: "/visual-language/theories/set/set-exchange-terms-v1.webp",
} as const;

const ROUTE_READINGS = [
  { key: "direct", title: "Direct return", text: "A response returns within the same pair." },
  { key: "generalised", title: "Generalised return", text: "A response passes through the wider group." },
] as const;

const TERMS_READINGS = [
  { key: "negotiated", title: "Negotiated terms", text: "The parties establish terms; the drawing makes no claim about equivalence." },
  { key: "none", title: "No automatic return", text: "An exchange does not itself guarantee a response." },
] as const;

/** The pencil studies clarify route differences; live labels carry the theory. */
function RuleFigure({ rule }: { rule: RuleKey }) {
  const routePair = rule === "direct" || rule === "generalised";
  const readings = routePair ? ROUTE_READINGS : TERMS_READINGS;
  const src = routePair ? RULE_ART.routes : RULE_ART.terms;
  const alt = routePair
    ? "Two pencil studies: one return moves back within the same pair; another passes from one party through a second to a third."
    : "Two pencil studies: negotiated terms sit between an outward transfer and a return; a separate transfer has no automatic return route.";

  return (
    <figure className={s.ruleFigure} data-rule={rule}>
      <Image className={s.ruleFigureArt} src={src} width={1536} height={1024} sizes="(max-width: 700px) 100vw, 36vw" alt={alt} unoptimized />
      <figcaption className={s.ruleFigureCaption}>
        <div>{readings.map((item) => <p key={item.key} data-current={rule === item.key || undefined}><b>{item.title}</b><span>{item.text}</span></p>)}</div>
        <p className={s.ruleFigureNote}><Glyph g="▲" /> Teaching drawing: routes clarify the possible relation; they do not show value, fairness or a guaranteed outcome.</p>
      </figcaption>
    </figure>
  );
}

/** Keep reciprocity meanings distinct from the rule that may organise a return. */
export function Rules({ rules, reciprocity }: { rules: SETRuleCase[]; reciprocity: SETReciprocityMode[] }) {
  const items = RULE_KEYS.map((key) => ({ key, ...required(rules, (rule) => rule.label.toLowerCase().startsWith(RULE_MATCH[key]), `${key} exchange rule`) }));
  const [key, setKey] = useState<RuleKey>("direct");
  const current = required(items, (item) => item.key === key, `${key} rule state`);
  return (
    <div className={s.rules}>
      <section className={s.reciprocity} aria-labelledby="set-reciprocity-title">
        <p className={s.smallHead} id="set-reciprocity-title">Three meanings that share a word</p>
        <ol>
          {reciprocity.map((item, index) => (
            <li key={item.label}>
              <span className={s.reciprocityNum} aria-hidden="true">0{index + 1}</span>
              <div><h3>{item.label}</h3><p>{item.body}</p></div>
            </li>
          ))}
        </ol>
      </section>
      <section className={s.ruleInquiry} aria-labelledby="set-rule-title">
        <div className={s.rulePrompt}>
          <p className={s.smallHead} id="set-rule-title">A return needs a rule to be intelligible</p>
          <Choices label="Rule for this constructed exchange" value={key} onChange={(value) => setKey(value as RuleKey)} options={items.map((item) => ({ value: item.key, label: item.label }))} />
        </div>
        <div className={s.ruleNow} aria-live="polite" aria-atomic="true" data-rule={current.key}>
          <p className={s.fieldKicker}>{current.label}</p>
          <p className={s.ruleFormula}>{current.rule}</p>
          <RuleFigure rule={current.key} />
          <p>{current.body}</p>
        </div>
        <ol className={s.ruleRegister} aria-label="The four exchange rules described in this record">
          {items.map((item) => <li key={item.key} data-current={item.key === key || undefined}><b>{item.label}</b><span>{item.rule}</span></li>)}
        </ol>
      </section>
    </div>
  );
}

type PresetId = "swap" | "bonus" | "log";
type Position = 0 | 1 | 2;
const POLES: readonly (readonly [string, string])[] = [
  ["a precise return", "a general sense of owing"],
  ["terms stated", "terms inferred"],
  ["closely monitored", "little monitored"],
  ["immediate or scheduled", "open-ended"],
  ["closes after the transaction", "invites a continuing relation"],
  ["little trust needed", "much trust needed"],
  ["price, compliance or access", "care or status"],
];
const PRESETS: { id: PresetId; label: string; place: Position[] }[] = [
  { id: "swap", label: "A shift swap, with no return discussed", place: [2, 2, 2, 2, 2, 2, 2] },
  { id: "bonus", label: "A bonus tied to a stated target", place: [0, 0, 0, 0, 0, 0, 0] },
  { id: "log", label: "Flexible hours granted, with a record kept", place: [1, 0, 0, 1, 2, 1, 2] },
];

/** A qualitative reading exercise, expressly kept separate from an official scale. */
export function Profile({ dimensions }: { dimensions: SETDimension[] }) {
  if (dimensions.length !== POLES.length) throw new Error("Social Exchange Theory expects seven comparison questions");
  const [id, setId] = useState<PresetId>("log");
  const current = required(PRESETS, (preset) => preset.id === id, `constructed exchange “${id}”`);
  return (
    <section className={s.profile} aria-labelledby="set-profile-title">
      <div className={s.profileIntro}>
        <p className={s.smallHead} id="set-profile-title">The same exchange can answer these questions differently</p>
        <p>Choose a constructed example. Its readings are a teaching synthesis, not an official typology or measured profile.</p>
        <Choices label="Constructed exchange to read" value={id} onChange={(value) => setId(value as PresetId)} options={PRESETS.map((preset) => ({ value: preset.id, label: preset.label }))} />
      </div>
      <p className={s.sr} aria-live="polite">Reading the constructed example: {current.label}. These are qualitative teaching readings, not measurements.</p>
      <ol className={s.dimensions}>
        {dimensions.map((dimension, index) => {
          const ends = POLES[index];
          const position = current.place[index];
          if (!ends || position === undefined) throw new Error(`Social Exchange Theory has no reading for ${dimension.label}`);
          const reading = position === 0 ? ends[0] : position === 2 ? ends[1] : "between these readings";
          return (
            <li key={dimension.label} data-position={position}>
              <span className={s.dimensionNum} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{dimension.label}</h3><p>{dimension.body}</p></div>
              <p className={s.dimensionReading}><span>In this example</span>{reading}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

type ResponseKey = "positive-active" | "positive-withhold" | "negative-active" | "negative-withhold";
const RESPONSE_CASES: { key: ResponseKey; match: string; sign: "positive" | "negative"; activity: "active" | "withhold" }[] = [
  { key: "positive-active", match: "positive + active", sign: "positive", activity: "active" },
  { key: "positive-withhold", match: "positive + withhold", sign: "positive", activity: "withhold" },
  { key: "negative-active", match: "negative + active", sign: "negative", activity: "active" },
  { key: "negative-withhold", match: "negative + withhold", sign: "negative", activity: "withhold" },
];

/** Two separate response dimensions stay visible as a labelled 2 × 2 field. */
export function Responses({ hedonic, constraints }: { hedonic: SETHedonicCell[]; constraints: SETConstraintExample[] }) {
  const items = RESPONSE_CASES.map((response) => ({ ...response, ...required(hedonic, (cell) => cell.label === response.match, `${response.match} response`) }));
  const [key, setKey] = useState<ResponseKey>("positive-active");
  const current = required(items, (item) => item.key === key, `${key} response state`);
  return (
    <div className={s.responses}>
      <div className={s.responseField}>
        <p className={s.smallHead}>A response has a sign and an activity</p>
        <div className={s.responseMatrix} role="group" aria-label="Choose a constructed response by sign and activity">
          <span className={s.matrixCorner} aria-hidden="true" />
          <span className={s.matrixColumn}>Active</span><span className={s.matrixColumn}>Withhold</span>
          <span className={s.matrixRow} data-sign="positive">Positive</span>
          {items.slice(0, 2).map((item) => <button key={item.key} type="button" aria-pressed={item.key === key} onClick={() => setKey(item.key)} data-sign={item.sign}><b>{item.label}</b><span>{item.body}</span></button>)}
          <span className={s.matrixRow} data-sign="negative">Negative</span>
          {items.slice(2).map((item) => <button key={item.key} type="button" aria-pressed={item.key === key} onClick={() => setKey(item.key)} data-sign={item.sign}><b>{item.label}</b><span>{item.body}</span></button>)}
        </div>
        <div className={s.responseReading} aria-live="polite" aria-atomic="true">
          <span className={s.fieldKicker}>Selected reading</span><strong>{current.label}</strong><p>{current.body}</p>
        </div>
      </div>
      <section className={s.constraints} aria-labelledby="set-constraints-title">
        <p className={s.smallHead} id="set-constraints-title">A desired response meets what is possible</p>
        <ol>{constraints.map((item) => <li key={item.desired}><p className={s.constraintPair}><b>{item.desired}</b><span aria-hidden="true">→</span><b>{item.constrained}</b></p><p>{item.body}</p></li>)}</ol>
      </section>
      <p className={s.teachingNote}><Glyph g="▲" /> This is a constructed teaching comparison. The two choices are kept separate; neither indicates the size or fairness of a response.</p>
    </div>
  );
}

type HistoryKey = "one" | "few" | "many";
const HISTORIES: { key: HistoryKey; label: string; title: string; body: string }[] = [
  { key: "one", label: "One exchange", title: "An act is still an act.", body: "One exchange can be examined on its own. A relationship history has not yet been established by the drawing." },
  { key: "few", label: "Several exchanges", title: "A trace begins to accumulate.", body: "Repeated exchanges invite a question about what carries forward. The pattern is still open to interpretation." },
  { key: "many", label: "A continuing history", title: "The next exchange has a past.", body: "A relationship is understood through exchanges over time; what came before can shape how what happens next is read." },
];

export function Next({ stages }: { stages: SETChainStep[] }) {
  const [key, setKey] = useState<HistoryKey>("many");
  const current = required(HISTORIES, (item) => item.key === key, `${key} relationship history state`);
  return (
    <div className={s.next}>
      <div className={s.historyInquiry}>
        <div className={s.historyPrompt}>
          <p className={s.smallHead}>Change the time horizon</p>
          <Choices label="History between the two parties" value={key} onChange={(value) => setKey(value as HistoryKey)} options={HISTORIES.map((item) => ({ value: item.key, label: item.label }))} />
        </div>
        <div className={s.historyReading} aria-live="polite" aria-atomic="true" data-history={key}>
          <span className={s.fieldKicker}>From act to relation</span><h3>{current.title}</h3><p>{current.body}</p>
          <div className={s.historyTrace} aria-hidden="true"><span>act</span><i /><span>exchange</span><i /><span>relationship</span></div>
        </div>
      </div>
      <ol className={s.chainSteps}>{stages.map((stage, index) => <li key={stage.label}><span aria-hidden="true">0{index + 1}</span><div><h3>{stage.label}</h3><p>{stage.body}</p></div></li>)}</ol>
      <p className={s.teachingNote}><Glyph g="✦" /> This is an editorial reading of the record’s distinction between an exchange and a relationship; it does not assert that every sequence develops in the same way.</p>
    </div>
  );
}

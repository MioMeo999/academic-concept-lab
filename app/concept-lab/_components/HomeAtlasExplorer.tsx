"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArtFragment } from "../_design/ResearchSurface";
import type { ArtFragmentName } from "../_design/art-library";
import system from "../_design/system.module.css";
import home from "../home-sections.module.css";

export type HomeDisciplineEntry = {
  id: string;
  name: string;
  count: number;
  summary: string;
  themes: string[];
  fragment: ArtFragmentName;
  href: string;
  branchNote?: string;
};

export type HomeKindEntry = {
  id: "theory" | "mechanism" | "method" | "study";
  name: string;
  count: number;
  line: string;
  description: string;
  question: string;
  fragment: ArtFragmentName;
  href: string;
};

function recordLabel(count: number) {
  return `${count} ${count === 1 ? "record" : "records"}`;
}

export function HomeDisciplineAtlas({ disciplines }: { disciplines: HomeDisciplineEntry[] }) {
  const [activeId, setActiveId] = useState(disciplines[0]?.id ?? "");
  const [visitedIds, setVisitedIds] = useState<string[]>(disciplines[0]?.id ? [disciplines[0].id] : []);
  const active = useMemo(
    () => disciplines.find((entry) => entry.id === activeId) ?? disciplines[0],
    [disciplines, activeId],
  );

  return (
    <div className={home.atlasField} data-active-discipline={active?.id}>
      <div className={home.atlasFieldStage}>
        <p className={home.fieldPrompt}>Choose a territory. The atlas redraws the question.</p>
        <svg className={home.fieldTrace} viewBox="0 0 900 520" aria-hidden="true">
          <path d="M108 302 C 215 168, 323 185, 409 260 S 602 388, 785 226" />
          <path d="M188 400 C 302 333, 403 354, 492 226 S 655 118, 790 146" />
          <path d="M116 220 C 264 250, 343 116, 486 146 S 662 315, 806 339" />
        </svg>
        <span className={home.fieldMarginNote} aria-hidden="true">fields overlap → follow the relation</span>

        <div className={home.territoryNodes}>
          {disciplines.map((entry, index) => {
            const isActive = entry.id === active?.id;
            return (
              <button
                type="button"
                key={entry.id}
                className={home.territoryNode}
                data-discipline={entry.id}
                data-active={isActive ? "true" : "false"}
                aria-pressed={isActive}
                onClick={() => setActiveId(entry.id)}
              >
                <span className={home.territoryNodeIndex}>{String(index + 1).padStart(2, "0")}</span>
                <span className={home.territoryNodeArt} aria-hidden="true">
                  <ArtFragment name={entry.fragment} decorative />
                </span>
                <span className={home.territoryNodeCopy}>
                  <strong>{entry.name}</strong>
                  <small>{recordLabel(entry.count)}</small>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <aside className={home.fieldReading} aria-live="polite">
          <p className={system.meta}>Current territory · {recordLabel(active.count)}</p>
          <h3>{active.name}</h3>
          <p className={home.fieldQuestion}>What does this field make easier to notice?</p>
          <p className={system.prose}>{active.summary}</p>
          {active.themes.length > 0 && (
            <ul className={home.fieldThemes}>
              {active.themes.map((theme) => <li key={theme}>{theme}</li>)}
            </ul>
          )}
          {active.branchNote && <p className={home.fieldBranch}>{active.branchNote}</p>}
          <Link href={active.href} className={system.link}>
            Enter this territory <span aria-hidden="true">↗</span>
          </Link>
          <p className={home.fieldPencilNote}>same atlas · different question</p>
        </aside>
      )}
      <noscript>
        <ul className={home.staticFallback}>
          {disciplines.map((entry) => <li key={entry.id}><a href={entry.href}>{entry.name} · {recordLabel(entry.count)}</a></li>)}
        </ul>
      </noscript>
    </div>
  );
}

export function HomeKindWorkbench({ kinds }: { kinds: HomeKindEntry[] }) {
  const [activeId, setActiveId] = useState<HomeKindEntry["id"]>(kinds[0]?.id ?? "theory");
  const [visitedIds, setVisitedIds] = useState<HomeKindEntry["id"][]>(kinds[0]?.id ? [kinds[0].id] : []);
  const active = useMemo(
    () => kinds.find((entry) => entry.id === activeId) ?? kinds[0],
    [kinds, activeId],
  );

  return (
    <div className={home.kindWorkbench} data-active-kind={active?.id}>
      <div className={home.kindStage}>
        <div className={home.kindStageHeader}>
          <span className={system.meta}>One subject can be handled four different ways.</span>
          <span className={home.kindStageScribble} aria-hidden="true">change the object → change the move</span>
        </div>

        <div className={home.kindGestures}>
          {kinds.map((entry, index) => {
            const isActive = entry.id === active?.id;
            return (
              <button
                type="button"
                key={entry.id}
                className={home.kindGesture}
                data-kind={entry.id}
                data-active={isActive ? "true" : "false"}
                aria-pressed={isActive}
                onClick={() => setActiveId(entry.id)}
              >
                <span className={home.kindGestureNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={home.kindGestureArt} aria-hidden="true">
                  <ArtFragment name={entry.fragment} decorative />
                </span>
                <span className={home.kindGestureName}>{entry.name}</span>
                <span className={home.kindGestureVerb}>{entry.line}</span>
              </button>
            );
          })}
        </div>

        {active && (
          <div className={home.kindQuestion} aria-live="polite">
            <span className={home.kindQuestionMark} aria-hidden="true">?</span>
            <p>{active.question}</p>
          </div>
        )}
      </div>

      {active && (
        <aside className={home.kindReading}>
          <p className={system.meta}>Reading move · {recordLabel(active.count)}</p>
          <h3>{active.name}</h3>
          <p className={home.kindLead}>{active.line}</p>
          <p className={system.prose}>{active.description}</p>
          <Link href={active.href} className={system.link}>
            Explore {active.name.toLowerCase()} records <span aria-hidden="true">↗</span>
          </Link>
          <p className={home.kindPencilNote}>the category is a responsibility, not a colour</p>
        </aside>
      )}
      <noscript>
        <ul className={home.staticFallback}>
          {kinds.map((entry) => <li key={entry.id}><a href={entry.href}>{entry.name} · {recordLabel(entry.count)}</a></li>)}
        </ul>
      </noscript>
    </div>
  );
}

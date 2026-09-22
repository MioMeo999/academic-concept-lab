"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArtFragment, type ArtFragmentName } from "../_design/ResearchSurface";
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

export function HomeAtlasExplorer({
  disciplines,
  kinds,
}: {
  disciplines: HomeDisciplineEntry[];
  kinds: HomeKindEntry[];
}) {
  const [activeDisciplineId, setActiveDisciplineId] = useState(disciplines[0]?.id ?? "");
  const [activeKindId, setActiveKindId] = useState<HomeKindEntry["id"]>(kinds[0]?.id ?? "theory");

  const activeDiscipline = useMemo(
    () => disciplines.find((entry) => entry.id === activeDisciplineId) ?? disciplines[0],
    [disciplines, activeDisciplineId],
  );
  const activeKind = useMemo(
    () => kinds.find((entry) => entry.id === activeKindId) ?? kinds[0],
    [kinds, activeKindId],
  );

  return (
    <>
      <div className={home.atlasField} data-active-discipline={activeDiscipline?.id}>
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
              const active = entry.id === activeDiscipline?.id;
              return (
                <button
                  type="button"
                  key={entry.id}
                  className={home.territoryNode}
                  data-discipline={entry.id}
                  data-active={active ? "true" : "false"}
                  aria-pressed={active}
                  onClick={() => setActiveDisciplineId(entry.id)}
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

        {activeDiscipline && (
          <aside className={home.fieldReading} aria-live="polite">
            <p className={system.meta}>Current territory · {recordLabel(activeDiscipline.count)}</p>
            <h3>{activeDiscipline.name}</h3>
            <p className={home.fieldQuestion}>What does this field make easier to notice?</p>
            <p className={system.prose}>{activeDiscipline.summary}</p>
            {activeDiscipline.themes.length > 0 && (
              <ul className={home.fieldThemes}>
                {activeDiscipline.themes.map((theme) => <li key={theme}>{theme}</li>)}
              </ul>
            )}
            {activeDiscipline.branchNote && <p className={home.fieldBranch}>{activeDiscipline.branchNote}</p>}
            <Link href={activeDiscipline.href} className={system.link}>
              Enter this territory <span aria-hidden="true">↗</span>
            </Link>
            <p className={home.fieldPencilNote}>same atlas · different question</p>
          </aside>
        )}
      </div>

      <div className={home.kindWorkbench} data-active-kind={activeKind?.id}>
        <div className={home.kindStage}>
          <div className={home.kindStageHeader}>
            <span className={system.meta}>One subject can be handled four different ways.</span>
            <span className={home.kindStageScribble} aria-hidden="true">change the object → change the move</span>
          </div>

          <div className={home.kindGestures}>
            {kinds.map((entry, index) => {
              const active = entry.id === activeKind?.id;
              return (
                <button
                  type="button"
                  key={entry.id}
                  className={home.kindGesture}
                  data-kind={entry.id}
                  data-active={active ? "true" : "false"}
                  aria-pressed={active}
                  onClick={() => setActiveKindId(entry.id)}
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

          {activeKind && (
            <div className={home.kindQuestion} aria-live="polite">
              <span className={home.kindQuestionMark} aria-hidden="true">?</span>
              <p>{activeKind.question}</p>
            </div>
          )}
        </div>

        {activeKind && (
          <aside className={home.kindReading}>
            <p className={system.meta}>Reading move · {recordLabel(activeKind.count)}</p>
            <h3>{activeKind.name}</h3>
            <p className={home.kindLead}>{activeKind.line}</p>
            <p className={system.prose}>{activeKind.description}</p>
            <Link href={activeKind.href} className={system.link}>
              Explore {activeKind.name.toLowerCase()} records <span aria-hidden="true">↗</span>
            </Link>
            <p className={home.kindPencilNote}>the category is a responsibility, not a colour</p>
          </aside>
        )}
      </div>
    </>
  );
}

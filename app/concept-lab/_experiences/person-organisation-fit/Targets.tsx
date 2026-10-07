"use client";

import { useState } from "react";
import type { FitTarget } from "@/content/types";
import s from "./po.module.css";

const TARGET_ORDER = ["org", "job", "group", "voc"] as const;

export function Targets({ targets }: { targets: FitTarget[] }) {
  const [id, setId] = useState<(typeof TARGET_ORDER)[number]>("org");
  const current = targets.find((target) => target.id === id);
  if (!current) throw new Error(`P–O fit target is missing: ${id}`);

  return (
    <div className={s.targets}>
      <div className={s.targetChoices} role="group" aria-label="Choose the environment target">
        {TARGET_ORDER.map((targetId) => {
          const target = targets.find((item) => item.id === targetId);
          if (!target) throw new Error(`P–O fit target is missing: ${targetId}`);
          return <button key={target.id} type="button" aria-pressed={target.id === id} onClick={() => setId(targetId)}>{target.title.replace(/^Person[–-]/u, "P–")}</button>;
        })}
      </div>
      <div className={s.targetReading} data-target={id} aria-live="polite" aria-atomic="true">
        <p className={s.targetCurrent}>{current.title}</p>
        <p className={s.targetQuestion}>{current.question}</p>
        <p>{current.example}</p>
      </div>
      <p className={s.editorialNote}>The target changes the question. A finding about one target is not automatically evidence about another.</p>
    </div>
  );
}

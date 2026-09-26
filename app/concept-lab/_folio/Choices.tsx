"use client";

import type { ReactNode } from "react";
import s from "./folio.module.css";

export type ChoiceOption<T extends string> = { value: T; label: ReactNode; hint?: ReactNode };

/**
 * A row of mutually exclusive editorial choices. Each is a real button with
 * aria-pressed; the chosen one is marked by a drawn ring and a filled dot as
 * well as by ink, so the state never depends on colour alone.
 */
export function Choices<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
  tone,
}: {
  label: string;
  options: ChoiceOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  tone?: string;
}) {
  return (
    <div className={[s.choices, className].filter(Boolean).join(" ")} role="group" aria-label={label} style={tone ? ({ "--choice": tone } as React.CSSProperties) : undefined}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button key={o.value} type="button" className={s.choice} aria-pressed={on} onClick={() => onChange(o.value)}>
            <span className={s.choiceDot} aria-hidden="true" />
            <span className={s.choiceText}>
              <span className={s.choiceLabel}>{o.label}</span>
              {o.hint && <span className={s.choiceHint}>{o.hint}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { School } from "@/content/types";

/* Where a family name covers approaches that differ in their assumptions, the
   most useful thing a page can do is let you check which one you are actually
   doing. Pick a school; see what it commits you to. */
export function SchoolPicker({ schools, note }: { schools: School[]; note?: string }) {
  const start = Math.max(0, schools.findIndex((s) => s.isThis));
  const [i, setI] = useState(start);
  const sel = schools[Math.min(i, schools.length - 1)];

  return (
    <div className="sk-box tilt-l" style={{ marginTop: "1.1rem" }}>
      <p className="k">which one are you doing?</p>
      <div className="school-tabs" role="group" aria-label="Schools of thematic analysis">
        {schools.map((s, n) => (
          <button
            key={s.name}
            type="button"
            className={`school-tab${s.isThis ? " is-this" : ""}`}
            aria-pressed={n === i}
            onClick={() => setI(n)}
          >
            {s.name}
            {s.isThis && <span className="school-flag">this page</span>}
          </button>
        ))}
      </div>

      <div className={`school-panel${sel.isThis ? " is-this" : ""}`} aria-live="polite">
        <div style={{ display: "flex", alignItems: "center", gap: ".55rem" }}>
          <svg
            style={{ width: 24, height: 24, color: sel.isThis ? "var(--gold-deep)" : "var(--pen-3)", flex: "none" }}
            aria-hidden="true"
          >
            <use href={sel.isThis ? "#i-check" : "#i-x"} />
          </svg>
          <span style={{ fontWeight: 700, fontSize: "1.05rem", color: sel.isThis ? "var(--gold-deep)" : "var(--pen-3)" }}>
            {sel.isThis ? "This is reflexive TA" : "Not reflexive TA"}
          </span>
        </div>
        <p className="read" style={{ fontSize: ".93rem", lineHeight: 1.55, marginTop: ".5rem", color: "var(--pen-2)" }}>
          {sel.blurb}
        </p>
        <p className="k" style={{ marginTop: ".8rem" }}>you would recognise it by</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem", marginTop: ".4rem" }}>
          {sel.marks.map((m) => (
            <span className="fact" key={m}>{m}</span>
          ))}
        </div>
      </div>

      {note && <p className="k" style={{ marginTop: ".9rem" }}>{note}</p>}
    </div>
  );
}

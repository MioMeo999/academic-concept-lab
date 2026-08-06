"use client";

import { useState } from "react";
import type { QuestionFit as Item } from "@/content/types";

/* Whether a question suits the method is the judgement learners most often get
   wrong, and it is settled before any data is collected — so it gets the
   interactive. Pick a question, get a verdict and the reasoning. */
export function QuestionFit({ items, note }: { items: Item[]; note?: string }) {
  const [i, setI] = useState(0);
  const sel = items[Math.min(i, items.length - 1)];

  return (
    <div className="sk-box tilt-l" style={{ marginTop: "1.1rem" }}>
      <p className="k">pick a research question</p>
      <div className="qfit-list" role="group" aria-label="Candidate research questions">
        {items.map((it, n) => (
          <button
            key={it.question}
            type="button"
            className="qfit-chip"
            aria-pressed={n === i}
            onClick={() => setI(n)}
          >
            {it.question}
          </button>
        ))}
      </div>

      <div className={`qfit-verdict ${sel.fits ? "fits" : "misfits"}`} aria-live="polite">
        <div style={{ display: "flex", alignItems: "center", gap: ".55rem" }}>
          <svg style={{ width: 24, height: 24, color: sel.fits ? "var(--teal)" : "var(--red)", flex: "none" }} aria-hidden="true">
            <use href={sel.fits ? "#i-check" : "#i-x"} />
          </svg>
          <span style={{ fontWeight: 700, fontSize: "1.05rem", color: sel.fits ? "var(--teal)" : "var(--red)" }}>
            {sel.fits ? "An IPA question" : "Not an IPA question"}
          </span>
        </div>
        <p className="read" style={{ fontSize: ".95rem", lineHeight: 1.55, marginTop: ".5rem", color: "var(--pen-2)" }}>
          “{sel.question}”
        </p>
        <p className="read" style={{ fontSize: ".9rem", lineHeight: 1.55, marginTop: ".5rem", color: "var(--pen-3)" }}>
          {sel.why}
        </p>
      </div>

      {note && <p className="k" style={{ marginTop: ".9rem" }}>{note}</p>}
    </div>
  );
}

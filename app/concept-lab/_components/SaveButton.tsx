"use client";

import { useEffect, useRef, useState } from "react";
import { useSaved } from "./saved";

export function SaveButton({ id }: { id: string }) {
  const { isSaved, toggle, ready } = useSaved();
  const on = ready && isSaved(id);
  const [feedback, setFeedback] = useState<"saved" | "removed" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const message = feedback === "saved"
    ? "Saved for later"
    : feedback === "removed"
      ? "Removed from saved"
      : "";

  return (
    <>
      <button
        className={"savebtn" + (feedback ? " save-" + feedback : "")}
        type="button"
        aria-pressed={on}
        title={on ? "Saved" : "Save for later"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!ready) return;
          const next = !on;
          toggle(id);
          setFeedback(next ? "saved" : "removed");
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setFeedback(null), 280);
        }}
      >
        <span className="sr">{on ? "Remove from saved" : "Save for later"}</span>
        <svg style={{ width: 21, height: 21 }} aria-hidden="true">
          <use href={on ? "#i-starf" : "#i-star"} />
        </svg>
      </button>
      <span className="sr" aria-live="polite" aria-atomic="true">{message}</span>
    </>
  );
}

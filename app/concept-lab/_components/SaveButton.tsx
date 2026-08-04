"use client";

import { useSaved } from "./saved";

export function SaveButton({ id }: { id: string }) {
  const { isSaved, toggle, ready } = useSaved();
  const on = ready && isSaved(id);
  return (
    <button
      className="savebtn"
      type="button"
      aria-pressed={on}
      title={on ? "Saved" : "Save for later"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
    >
      <span className="sr">{on ? "Remove from saved" : "Save for later"}</span>
      <svg style={{ width: 21, height: 21 }} aria-hidden="true">
        <use href={on ? "#i-starf" : "#i-star"} />
      </svg>
    </button>
  );
}

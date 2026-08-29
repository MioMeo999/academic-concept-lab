"use client";

import { useSaved } from "@/app/concept-lab/_components/saved";
import { StarIcon } from "./wm";

/* Behaviour is the production store, reused unchanged — a record saved in the
   study is the same record saved on the live site. Only the control is new. */
export function WmSave({ id }: { id: string }) {
  const { isSaved, toggle, ready } = useSaved();
  const on = ready && isSaved(id);

  return (
    <>
      <button
        type="button"
        className="wm-save"
        aria-pressed={on}
        onClick={() => { if (ready) toggle(id); }}
      >
        <StarIcon filled={on} />
        {on ? "Saved" : "Save for later"}
      </button>
      <span className="wm-sr" aria-live="polite">{on ? "Saved for later" : ""}</span>
    </>
  );
}

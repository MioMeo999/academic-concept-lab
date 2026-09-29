import type { CSSProperties } from "react";
import { MARKS, type Mark } from "./population";
import s from "./po.module.css";

/* The four stand-in people and their marks. Nothing here is a personality
   type: a mark stands in for "something this person holds important", and the
   page says so wherever the people appear. A mark is told apart by its shape
   and by how the shoulders are hatched — never by colour alone. */

/** The shape a person carries on the chest, drawn small, for legends and tallies. */
export function MarkIcon({ mark, size = 22, className }: { mark: Mark; size?: number; className?: string }) {
  return (
    <svg className={[s.markIcon, className].filter(Boolean).join(" ")} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" style={{ "--hue": MARKS[mark].hue } as CSSProperties}>
      {mark === 0 && <circle cx="12" cy="12" r="6.4" />}
      {mark === 1 && <path d="M4.5 12.2 19.5 11.8" />}
      {mark === 2 && <path d="M4.5 12h15M12 4.6v14.8" />}
      {mark === 3 && <path d="M5 8.4 12 15.6 19 8.2" />}
    </svg>
  );
}

/**
 * One of the four people, cut from the pencil sprite sheet. Decorative: the
 * words beside it carry the meaning, so it is hidden from assistive tech.
 */
export function Bust({ mark = 0, ghost = false, className, style }: { mark?: Mark; ghost?: boolean; className?: string; style?: CSSProperties }) {
  return <span className={[s.bust, className].filter(Boolean).join(" ")} style={{ "--m": mark, "--g": ghost ? 1 : 0, ...style } as CSSProperties} aria-hidden="true" />;
}

/**
 * One of the four things a person can be fitted to — organisation, job, group,
 * vocation — as a pencil pictogram. Row one is the drawing at rest; chosen, it
 * takes teal in the hatching. The label beside it names it.
 */
export function TargetArt({ index, on = false, className }: { index: number; on?: boolean; className?: string }) {
  return <span className={[s.targetArt, className].filter(Boolean).join(" ")} style={{ "--i": index, "--r": on ? 1 : 0 } as CSSProperties} aria-hidden="true" />;
}

/** The letters a target goes by in the literature: P–O, P–J, P–G, P–V. */
export const TARGET_ABBR: Record<string, string> = { org: "P–O", job: "P–J", group: "P–G", voc: "P–V" };

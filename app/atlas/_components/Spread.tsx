import type { CSSProperties, ReactNode } from "react";
import { PIGMENT, type Pigment } from "./Pigment";

/* ---------------------------------------------------------------------------
   Section machinery.

   A section declares a register, and the register is the atlas's rhythm
   control. Nothing on a spread is uniformly loud; the reader is given dense,
   chromatic, worked passages and then given silence.

     ignition  the opening claim. Display type, full-bleed pigment.
     working   a figure or a comparison. Marks are doing an argument.
     reading   running prose with at most one marginal mark.
     quiet     evidence, scope, limits, provenance, sources. Type only.

   Quiet does not mean generic. A quiet section is ruled to the same grid, set
   in the same faces, and holds the same apparatus column as a loud one. What
   it drops is pigment, not precision.
   ------------------------------------------------------------------------ */

export type Register = "ignition" | "working" | "reading" | "quiet";

export function Rich({
  html,
  as: Tag = "p",
  className,
  style,
}: {
  html: string;
  as?: "p" | "span" | "div" | "h3" | "li" | "dd";
  className?: string;
  style?: CSSProperties;
}) {
  return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * The record content stores colours as the production site's CSS variables.
 * They are not available here and their palette is not this one, so each slot
 * is translated onto the spread's own pigment character. The translation
 * preserves *distinction* between items — which is the only thing the content
 * uses colour for — while letting each spread keep its own chromatic identity.
 * No claim, kind, or status is encoded by hue anywhere in this directory.
 */
export function remap(colour: string | undefined, keys: [Pigment, Pigment, Pigment]): Pigment {
  switch (colour) {
    case "var(--teal)":
      return keys[0];
    case "var(--red)":
      return keys[1];
    case "var(--gold-deep)":
      return keys[2];
    case "var(--plum-deep)":
      return "violet";
    case "var(--blue)":
      return "ultramarine";
    default:
      return "graphite";
  }
}

export function Section({
  id,
  num,
  kicker,
  title,
  register = "reading",
  children,
  aside,
}: {
  id: string;
  num: number;
  kicker?: string;
  title: string;
  register?: Register;
  children: ReactNode;
  /** Content for the apparatus column, level with the section head. */
  aside?: ReactNode;
}) {
  return (
    <section className="at-section" id={id} data-register={register} aria-labelledby={`${id}-h`}>
      <div className="at-section__main">
        <div className="at-sechead">
          <span className="at-sechead__num">{String(num).padStart(2, "0")}</span>
          {kicker && <span className="at-label at-sechead__kicker">{kicker}</span>}
          <h2 id={`${id}-h`}>{title}</h2>
        </div>
        <div className="at-body">{children}</div>
      </div>
      {aside ? <div className="at-section__aside">{aside}</div> : null}
    </section>
  );
}

/** An apparatus note. Sits in the margin; states what it covers. */
export function Note({
  label,
  glyph,
  children,
  flush,
}: {
  label: string;
  glyph?: string;
  children: ReactNode;
  flush?: boolean;
}) {
  return (
    <div className={`at-note${flush ? " at-note--flush" : ""}`}>
      <span className="at-note__label">
        {glyph && <span className="at-note__glyph">{glyph}</span>}
        {label}
      </span>
      {children}
    </div>
  );
}

/** A note that has to sit inside the measure because it qualifies a specific
 *  passage rather than the section. */
export function Aside({ label, children, pigment }: { label?: string; children: ReactNode; pigment?: Pigment }) {
  return (
    <div className="at-aside" style={pigment ? ({ "--at-key": PIGMENT[pigment] } as CSSProperties) : undefined}>
      {label && <span className="at-note__label">{label}</span>}
      {children}
    </div>
  );
}

/**
 * A ruled register replaces the card grid. Three related statements are three
 * rows of one table, not three objects floating on a page — which is both more
 * scholarly and more honest about what they are.
 */
export function RegisterTable({
  rows,
  keys,
}: {
  rows: { label: string; body: string; colour?: string }[];
  keys: [Pigment, Pigment, Pigment];
}) {
  return (
    <div className="at-register">
      {rows.map((r) => (
        <div className="at-register__row" key={r.label}>
          <span className="at-register__term" style={{ "--at-term": PIGMENT[remap(r.colour, keys)] } as CSSProperties}>
            {r.label}
          </span>
          <Rich className="at-register__read" as="div" html={r.body} />
        </div>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: { label?: string; body: string }[] }) {
  return (
    <ol className="at-steps">
      {items.map((s, i) => (
        <li key={s.label ?? i}>
          <div>
            {s.label && <h3 style={{ marginBottom: "0.2rem" }}>{s.label}</h3>}
            <Rich className="at-register__read" as="div" html={s.body} />
          </div>
        </li>
      ))}
    </ol>
  );
}

export function PlainList({ items, single }: { items: string[]; single?: boolean }) {
  return (
    <ul className={`at-list${single ? " at-list--single" : ""}`}>
      {items.map((x) => (
        <Rich as="li" key={x} html={x} />
      ))}
    </ul>
  );
}

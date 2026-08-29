import type { CSSProperties, ElementType } from "react";

/* ---------------------------------------------------------------------------
   Wide Margin — shared primitives for the experimental visual language.

   Nothing here imports from or writes to the production Concept Lab styling.
   The one rule worth stating: colour is bound to provenance. A section does
   not pick a colour because it looks good next to the last one; it inherits
   the colour of the evidence mark it carries, so the colour rhythm down the
   page is a readable summary of where the record's claims come from.
   ------------------------------------------------------------------------- */

export type Mark = "●" | "■" | "▲" | "✦" | "?";
export type Accent = "blue" | "green" | "amber" | "violet" | "red" | "ink";

export const MARKS: Record<Mark, { accent: Accent; short: string }> = {
  "●": { accent: "blue", short: "source-grounded" },
  "■": { accent: "green", short: "empirical finding" },
  "▲": { accent: "amber", short: "constructed example" },
  "✦": { accent: "violet", short: "lab synthesis" },
  "?": { accent: "red", short: "open / debated" },
};

const TRIPLES: Record<Accent, [string, string, string]> = {
  blue: ["var(--wm-blue)", "var(--wm-blue-ink)", "var(--wm-blue-soft)"],
  green: ["var(--wm-green)", "var(--wm-green-ink)", "var(--wm-green-soft)"],
  amber: ["var(--wm-amber)", "var(--wm-amber-ink)", "var(--wm-amber-soft)"],
  violet: ["var(--wm-violet)", "var(--wm-violet-ink)", "var(--wm-violet-soft)"],
  red: ["var(--wm-red)", "var(--wm-red-ink)", "var(--wm-red-soft)"],
  ink: ["var(--wm-ink)", "var(--wm-ink)", "var(--wm-paper-2)"],
};

/** Paints one subtree. Every coloured rule in wide-margin.css reads these. */
export function accent(name: Accent, extra?: CSSProperties): CSSProperties {
  const [c, ink, soft] = TRIPLES[name];
  return { "--wm-c": c, "--wm-c-ink": ink, "--wm-c-soft": soft, ...extra } as CSSProperties;
}

/** Flat value, for the places that need one colour rather than a whole subtree. */
export function accentInk(name: Accent) {
  return TRIPLES[name][1];
}

/** The fill to use behind white text. Always the darkened variant: the bright
 *  amber and red read beautifully as a 3px rule and fail contrast as a button. */
export function solidFill(name: Accent) {
  return TRIPLES[name][1];
}

/** Content carries inline <b>/<i>/<span> on purpose — emphasis is editorial,
 *  so it lives with the words. Same contract as the production Rich. */
export function Rich({
  html,
  as: Tag = "span",
  ...rest
}: {
  html: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function pad2(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

/* --- the hand-made layer -------------------------------------------------
   Three gestures only, each authored as a single irregular stroke. They are
   used where a person would actually reach for a pen: under a phrase that
   matters, around a number, beside a note. Never as container chrome. */

export function HandUnderline({ seed = 0 }: { seed?: number }) {
  const strokes = [
    "M2 7c26-5 54 4 82-1 20-3 40 3 58-2",
    "M2 6c24 5 52-4 78 1 22 4 42-3 62 2",
    "M2 8c28-6 56 5 84 0 18-3 36 3 56-2",
  ];
  return (
    <svg viewBox="0 0 144 12" preserveAspectRatio="none" aria-hidden="true">
      <path d={strokes[seed % strokes.length]} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** A phrase with a drawn stroke under it. */
export function Underlined({ children, seed = 0 }: { children: React.ReactNode; seed?: number }) {
  return (
    <span className="wm-ul">
      {children}
      <HandUnderline seed={seed} />
    </span>
  );
}

export function MarkGlyph({ mark, className }: { mark: Mark; className?: string }) {
  return (
    <span className={className} aria-hidden="true">{mark}</span>
  );
}

/** Provenance annotation. The glyph is decorative; the wording that follows
 *  always says what the mark covers, so meaning never rests on the symbol. */
export function Note({ mark, children }: { mark: Mark; children: string }) {
  return (
    <div className="wm-note" style={accent(MARKS[mark].accent)}>
      <MarkGlyph mark={mark} className="g" />
      <p><b>{MARKS[mark].short}.</b> {children}</p>
    </div>
  );
}

/** The one exception: constructed teaching examples get a physical object,
 *  because they are the claim most easily mistaken for evidence. */
export function StickyNote({ children }: { children: string }) {
  return (
    <div className="wm-sticky" style={accent("amber")}>
      <span className="wm-label"><span aria-hidden="true">▲</span> constructed teaching example</span>
      <p>{children}</p>
    </div>
  );
}

export function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
      <path d="M12 3.4c1.3 3 2.2 5 2.7 5.6.6.6 2.6 1 6 1.3-2.5 1.9-4 3.2-4.3 4-.3.8 0 2.8.9 6.1-2.8-1.8-4.6-2.7-5.3-2.7-.7 0-2.5.9-5.3 2.7.9-3.3 1.2-5.3.9-6.1-.3-.8-1.8-2.1-4.3-4 3.4-.3 5.4-.7 6-1.3.5-.6 1.4-2.6 2.7-5.6z" />
    </svg>
  );
}

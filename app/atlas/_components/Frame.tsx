import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { PIGMENT, type Pigment } from "./Pigment";

/* ---------------------------------------------------------------------------
   The publication frame: masthead, running head, contents, foot.

   These are the parts that repeat on every spread and therefore do most of the
   work of making the atlas feel like one publication rather than a set of
   pages. They are deliberately typographic. Nothing here is drawn.
   ------------------------------------------------------------------------ */

export const PLATES = [
  { slug: "gestalt-principles-in-music", plate: "I", short: "Gestalt" },
  { slug: "tonal-hierarchy", plate: "II", short: "Tonal Hierarchy" },
  { slug: "predictive-processing-in-music", plate: "III", short: "Predictive Processing" },
  { slug: "hurons-itpra-theory-of-expectation", plate: "IV", short: "ITPRA" },
] as const;

export type PlateSlug = (typeof PLATES)[number]["slug"];

/**
 * Each spread declares a pigment character. Two records never open the same
 * box of pencils, which is most of why they do not read as one template in
 * four colourways. The choices are material, not semantic: nothing about a
 * record's claims is encoded in its hues.
 */
export const CHARACTER: Record<PlateSlug, { keys: [Pigment, Pigment, Pigment]; note: string }> = {
  "gestalt-principles-in-music": {
    keys: ["ultramarine", "viridian", "vermilion"],
    note: "Three pigments that have to be able to sit on top of each other, because the record is about cues that reinforce, compete, or leave a reading open.",
  },
  "tonal-hierarchy": {
    keys: ["violet", "ochre", "graphite"],
    note: "A cool field and a warm one, so that a surround can change without the thing inside it changing.",
  },
  "predictive-processing-in-music": {
    keys: ["ultramarine", "rose", "graphite"],
    note: "One pigment for what was predicted and one for what arrived, kept apart so the interval between them is the visible quantity.",
  },
  "hurons-itpra-theory-of-expectation": {
    keys: ["vermilion", "ochre", "viridian"],
    note: "Warm pigments for the responses that begin at the outcome, and a graphite hinge that belongs to none of them.",
  },
};

export function characterStyle(slug: PlateSlug): CSSProperties {
  const c = CHARACTER[slug];
  return {
    "--at-key": PIGMENT[c.keys[0]],
    "--at-key-2": PIGMENT[c.keys[1]],
    "--at-key-3": PIGMENT[c.keys[2]],
  } as CSSProperties;
}

export function Masthead({ here }: { here?: string }) {
  return (
    <header className="at-masthead at-col-wide">
      <Link className="at-masthead__mark" href="/atlas">
        Academic Concept Lab <span style={{ fontWeight: 300 }}>· Atlas</span>
      </Link>
      <span className="at-masthead__rule" />
      <nav aria-label="Atlas">
        <Link href="/atlas" aria-current={here === "/atlas" ? "page" : undefined}>
          Cover
        </Link>
        {PLATES.map((p) => (
          <Link key={p.slug} href={`/atlas/${p.slug}`} aria-current={here === `/atlas/${p.slug}` ? "page" : undefined}>
            {p.short}
          </Link>
        ))}
        <Link href="/atlas/conventions" aria-current={here === "/atlas/conventions" ? "page" : undefined}>
          Conventions
        </Link>
      </nav>
    </header>
  );
}

/** The edition line. It says what this is every time, without comment. */
export function RunningHead({ plate, title, kind }: { plate: string; title: string; kind: string }) {
  return (
    <div className="at-runhead at-col-wide">
      <span>
        Plate <strong>{plate}</strong>
      </span>
      <span>{title}</span>
      <span className="at-runhead__spacer" />
      <span>{kind}</span>
      <span>Visual exploration · not production</span>
    </div>
  );
}

export function Contents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav className="at-contents" aria-label="Contents of this spread">
      <span className="at-label">Contents of this plate</span>
      <ol>
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{it.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Foot({ children }: { children?: ReactNode }) {
  return (
    <footer className="at-foot at-col-wide">
      <div style={{ flex: "1 1 20rem" }}>
        <span className="at-label">Academic Concept Lab · Atlas</span>
        <p style={{ marginTop: "0.5rem" }}>
          An isolated exploration of a new visual direction. The scholarship, evidence, provenance and boundaries on these
          spreads are read from the canonical record content; the presentation is not the production site and no production
          route, component or record was changed to build it.
        </p>
        {children}
      </div>
      <div style={{ flex: "0 1 16rem" }}>
        <span className="at-label">Elsewhere</span>
        <p style={{ marginTop: "0.5rem", fontSize: "0.86rem" }}>
          <Link href="/atlas/conventions">How to read a spread</Link>
          <br />
          <Link href="/concept-lab">The production site</Link>
        </p>
      </div>
    </footer>
  );
}

/**
 * The opening of a spread. Structure is shared — a publication is consistent
 * about how it announces a piece — while the drawn overture above it, the
 * pigment character, and the composition below it are not.
 */
export function Opening({
  kicker,
  title,
  hook,
  oneSentence,
  topics,
  children,
}: {
  kicker: string[];
  title: string;
  hook: string;
  oneSentence: string;
  topics: string[];
  children?: ReactNode;
}) {
  return (
    <header className="at-open">
      <div className="at-open__kicker">
        {kicker.map((k) => (
          <span className="at-label at-label--key" key={k}>
            {k}
          </span>
        ))}
      </div>
      <h1 className="at-display">{title}</h1>
      <p className="at-open__hook">{hook}</p>
      <p className="at-open__one">{oneSentence}</p>
      {children}
      <div className="at-open__topics">
        {topics.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </header>
  );
}

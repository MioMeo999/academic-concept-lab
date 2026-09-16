/**
 * Surface — page furniture.
 *
 * The shell supplies framing only. It never supplies evidence: a record's
 * provenance, citations, boundaries and qualifications all come from
 * `content/`, and a section that has nothing to say simply does not render.
 */

import type { ReactNode } from "react";
import { arc, encircle, rng, rule, wander, toPath } from "../_lib/pigment";

export type Register = "ignition" | "working" | "reading" | "quiet";

const REGISTER_NOTE: Record<Register, string> = {
  ignition: "ignition",
  working: "working",
  reading: "reading",
  quiet: "quiet",
};

export function Masthead({ here }: { here?: string }) {
  const nav = [
    { href: "/surface", label: "Cover" },
    { href: "/surface/job-demands-resources", label: "Job Demands–Resources" },
    { href: "/surface/gestalt-principles-in-music", label: "Gestalt" },
    { href: "/surface/tonal-hierarchy", label: "Tonal Hierarchy" },
    { href: "/surface/conventions", label: "Conventions" },
  ];
  return (
    <header className="sf-mast">
      <div className="sf-mast-in">
        <a className="sf-wordmark" href="/surface">
          Academic Concept Lab <span>/ Working Surface</span>
        </a>
        <nav aria-label="Exploration">
          {nav.map((n) => (
            <a key={n.href} href={n.href} aria-current={here === n.href ? "page" : undefined}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Status({ items }: { items: [string, string][] }) {
  return (
    <p className="sf-status">
      {items.map(([k, v]) => (
        <span key={k}>
          <b>{k}</b> {v}
        </span>
      ))}
    </p>
  );
}

/**
 * One section of the page. `register` governs how much pigment the section may
 * use *and* how the spine is proportioned — at `ignition` the drawing column
 * is wider than the measure; at `quiet` it narrows to an apparatus rail and
 * the measure opens.
 */
export function Band({
  n, register, id, children, full = false,
}: { n?: string; register: Register; id?: string; children: ReactNode; full?: boolean }) {
  return (
    <section className="sf-band" data-register={register} data-full={full || undefined} id={id}>
      {full ? children : (
        <>
          <div className="sf-rail" aria-hidden="true">
            {n ? <div className="sf-num">{n}</div> : null}
            <div className="sf-reg">{REGISTER_NOTE[register]}</div>
          </div>
          {children}
        </>
      )}
    </section>
  );
}

export function Text({ children }: { children?: ReactNode }) {
  return <div className="sf-text">{children}</div>;
}
/* An empty <Think /> is deliberate and common: a section with nothing to draw
   still holds its column open, so the measure does not silently reflow and the
   page keeps one spine from top to bottom. Not every section gets a figure. */
export function Think({ children }: { children?: ReactNode }) {
  return <div className="sf-think">{children}</div>;
}
export function Wide({ children }: { children?: ReactNode }) {
  return <div className="sf-wide">{children}</div>;
}

export function Heading({ kicker, children }: { kicker?: string; children: ReactNode }) {
  return (
    <>
      {kicker ? <p className="sf-kicker">{kicker}</p> : null}
      <h2 className="sf-h">{children}</h2>
    </>
  );
}

/** An editorial caveat. Type only, everywhere, so it can never be mistaken for
 *  an original author's claim. */
export function Note({
  children, html, label = "Editorial note",
}: { children?: ReactNode; html?: string; label?: string }) {
  return (
    <p className="sf-note">
      <b>{label}.</b>{" "}
      {html ? <span dangerouslySetInnerHTML={{ __html: html }} /> : children}
    </p>
  );
}

export function Rich({ html, className = "sf-p" }: { html: string; className?: string }) {
  return <p className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * A phrase the page claims, with the pigment laid *under* the type. Three
 * behaviours only — a reader's underline, a circled word, a struck-through
 * word — because a page that can mark anything in any way marks nothing.
 */
export function Claim({
  children, kind = "underline", hue = "cobalt", seed = 41,
}: { children: ReactNode; kind?: "underline" | "circle" | "strike"; hue?: string; seed?: number }) {
  const r = rng(seed);
  const colour = `var(--pg-${hue})`;
  let body: ReactNode;

  if (kind === "circle") {
    body = encircle(48, 15, seed, 2).map((d, i) => (
      <path key={i} d={d} transform="translate(50 16)" stroke={colour} strokeWidth={1.6}
        strokeOpacity={i === 0 ? 0.8 : 0.5} fill="none" strokeLinecap="round" />
    ));
  } else if (kind === "strike") {
    body = [0, 1].map((i) => (
      <path key={i} d={rule(2, 16 + i * 1.4, 98, seed + i * 17, 1.2)} stroke={colour}
        strokeWidth={1.5} strokeOpacity={i === 0 ? 0.72 : 0.4} fill="none" strokeLinecap="round" />
    ));
  } else {
    body = [0, 1, 2].map((i) => (
      <path
        key={i}
        d={toPath(wander(1 + r() * 3, 26 + i * 1.5, 99 - r() * 3, 26.4 + i * 1.5, r, 1.5))}
        stroke={colour} strokeWidth={1.5 - i * 0.25} strokeOpacity={0.72 - i * 0.2}
        fill="none" strokeLinecap="round"
      />
    ));
  }

  return (
    <span className="sf-claim">
      <svg viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <g style={{ mixBlendMode: "multiply" }}>{body}</g>
      </svg>
      <span>{children}</span>
    </span>
  );
}

/** A drawn rule under a heading — used once or twice a page, never as trim. */
export function Frayed({ hue = "graphite", seed = 9, width = 260 }: { hue?: string; seed?: number; width?: number }) {
  const r = rng(seed);
  return (
    <svg viewBox={`0 0 ${width} 8`} style={{ width: "100%", maxWidth: width, height: 8, display: "block", margin: "0 0 1rem" }} aria-hidden="true" focusable="false">
      <g style={{ mixBlendMode: "multiply" }}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={toPath(wander(1 + r() * 6, 3 + i * 1.3, width - r() * 22, 3.5 + i * 1.3, r, 1.1))}
            stroke={`var(--pg-${hue})`} strokeWidth={1.1 - i * 0.25} strokeOpacity={0.6 - i * 0.16} fill="none" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

/** A small pigment chip standing beside a term. Material, not a key. */
export function Chip({ hue, seed = 3 }: { hue: string; seed?: number }) {
  const r = rng(seed);
  /* Merged into two paths: a page can carry thirty of these, and one element
     per stroke would cost more than the whole rest of the section. */
  const runs = Array.from({ length: 8 }, (_, i) =>
    toPath(wander(1 + r() * 2, 2.5 + i * 1.6, 15 - r() * 2, 3 + i * 1.6, r, 1.1)));
  return (
    <svg className="sf-term-mk" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <g style={{ mixBlendMode: "multiply" }}>
        <path d={runs.join("")} stroke={`var(--pg-${hue})`} strokeWidth={1.3} strokeOpacity={0.5} fill="none" strokeLinecap="round" />
        <path d={runs.slice(2, 7).join("")} transform="rotate(62 8 8)" stroke={`var(--pg-${hue})`} strokeWidth={1.2} strokeOpacity={0.34} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Contents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <ol className="sf-toc">
      {items.map((it, i) => (
        <li key={it.id}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          <a href={`#${it.id}`}>{it.label}</a>
        </li>
      ))}
    </ol>
  );
}

export function Foot() {
  return (
    <footer className="sf-foot">
      <span>Academic Concept Lab — the working surface</span>
      <span>Typeset knowledge · drawn thinking</span>
      <span>Visual exploration — not production</span>
    </footer>
  );
}

/** An open arc used as a section rest. Declines to close, on purpose. */
export function Rest({ hue = "warmgrey", seed = 61 }: { hue?: string; seed?: number }) {
  return (
    <svg viewBox="0 0 120 24" style={{ width: 120, height: 24, display: "block", margin: "2rem auto 0" }} aria-hidden="true" focusable="false">
      <g style={{ mixBlendMode: "multiply" }} transform="translate(60 12)">
        {[0, 1].map((i) => (
          <path key={i} d={arc(46 - i * 3, 7 - i, Math.PI * 0.12, Math.PI * 0.88, seed + i * 9)}
            stroke={`var(--pg-${hue})`} strokeWidth={1} strokeOpacity={0.42 - i * 0.16} fill="none" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

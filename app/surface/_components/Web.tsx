/**
 * Surface — the web furniture.
 *
 * The mark library and the plates settled the drawing. This file settles the
 * *page*: the parts a reader uses rather than reads — a real navigation bar, a
 * breadcrumb, a hero with actions, tag chips, a contents rail that tracks where
 * you are, the cards that run down the right of a record, and the numbered
 * column row that closes a page.
 *
 * The rule from the plates carries over unchanged: the drawing sits behind or
 * beside the type and never on top of it, and every mark is inert. A chip is a
 * word with a ring round it, not a filled pill; a button is type with a real
 * hit area; the rail's active marker is a drawn dot rather than a bar. The
 * furniture is quiet so the plate can be loud.
 */

import type { ReactNode } from "react";
import { Halo, Marker, Note, Pencil, Rule } from "./Draw";
import { ringPts, runPts } from "../_lib/pencil";
import type { Hue } from "./Pigment";

/* ------------------------------------------------------------------- nav -- */

export type NavItem = { href: string; label: string };

export function TopNav({ items, here, tagline = "Ideas, drawn together." }: {
  items: NavItem[]; here?: string; tagline?: string;
}) {
  return (
    <header className="wb-nav">
      <div className="wb-nav-in">
        <a className="wb-brand" href="/surface">
          <span className="wb-star" aria-hidden="true">
            <svg viewBox="-14 -14 28 28" width="17" height="17" focusable="false">
              <g style={{ mixBlendMode: "multiply", color: "var(--pg-vermilion)" }}>
                <path d="M0-13C1.6-4.6 4.6-1.6 13 0 4.6 1.6 1.6 4.6 0 13c-1.6-8.4-4.6-11.4-13-13 8.4-1.6 11.4-4.6 13-13Z"
                  fill="currentColor" fillOpacity="0.92" />
              </g>
            </svg>
          </span>
          Academic Concept Lab
        </a>
        <nav aria-label="Sections">
          {items.map((n) => (
            <a key={n.href} href={n.href} aria-current={here === n.href ? "page" : undefined}>{n.label}</a>
          ))}
        </nav>
        <span className="wb-tagline" aria-hidden="true">
          <svg viewBox="0 0 210 44" width="150" height="32" focusable="false">
            <text className="sf-hand" x="4" y="19" style={{ fill: "var(--pg-graphite)", fontSize: 17 }}>{tagline}</text>
            <g style={{ mixBlendMode: "multiply", color: "var(--pg-vermilion)" }}>
              {ringLine(6, 27, 132, 313).map((p, i) => (
                <path key={i} d={p.d} stroke="currentColor" strokeWidth={p.w} strokeOpacity={p.o}
                  fill="none" strokeLinecap="round" />
              ))}
            </g>
          </svg>
        </span>
      </div>
    </header>
  );
}

function ringLine(x1: number, y: number, len: number, seed: number) {
  return runPts(x1, y, x1 + len, y + 1, seed, 1.4).length
    ? pencilRun(runPts(x1, y, x1 + len, y + 1, seed, 1.4), seed)
    : [];
}
function pencilRun(pts: [number, number][], seed: number) {
  // Small local helper so the nav does not need the full Pencil component.
  return [{ d: `M${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L")}`, w: 1.6, o: 0.68 }]
    .concat([{ d: `M${pts.map((p) => `${(p[0] + 1).toFixed(1)} ${(p[1] + 1.6).toFixed(1)}`).join("L")}`, w: 1.1, o: 0.34 }])
    .map((r, i) => ({ ...r, key: seed + i }));
}

/* ------------------------------------------------------------ breadcrumb -- */

export function Crumb({ trail }: { trail: { href?: string; label: string }[] }) {
  return (
    <nav className="wb-crumb" aria-label="Breadcrumb">
      {trail.map((t, i) => (
        <span key={t.label}>
          {i > 0 ? <i aria-hidden="true">/</i> : null}
          {t.href ? <a href={t.href}>{t.label}</a> : <b aria-current="page">{t.label}</b>}
        </span>
      ))}
    </nav>
  );
}

/* --------------------------------------------------------------- actions -- */

export function Actions({ primary, secondary }: {
  primary: { href: string; label: string }; secondary?: { href: string; label: string };
}) {
  return (
    <div className="wb-actions">
      <a className="wb-btn" href={primary.href}>{primary.label} <span aria-hidden="true">→</span></a>
      {secondary ? <a className="wb-btn wb-btn-alt" href={secondary.href}>{secondary.label}</a> : null}
    </div>
  );
}

/* ----------------------------------------------------------------- chips -- */

/** A term with a ring round it. The ring is drawn, the word is typeset. */
export function Chips({ items }: { items: { label: string; hue: Hue }[] }) {
  return (
    <ul className="wb-chips">
      {items.map((t, i) => (
        <li key={t.label}>
          <span className="wb-chip">
            <span className="wb-chip-mark" aria-hidden="true">
              <svg viewBox="0 0 120 42" preserveAspectRatio="none" focusable="false">
                <g style={{ mixBlendMode: "multiply", color: `var(--pg-${t.hue})` }}>
                  {ringPts(55, 16, 900 + i * 37, 2, 0.1).flatMap((run, k) =>
                    run.length ? [
                      <path key={`${k}a`} d={`M${run.map((p) => `${(p[0] + 60).toFixed(1)} ${(p[1] + 21).toFixed(1)}`).join("L")}`}
                        stroke="currentColor" strokeWidth={1.8} strokeOpacity={0.72} fill="none"
                        strokeLinecap="round" vectorEffect="non-scaling-stroke" />,
                    ] : [])}
                </g>
              </svg>
            </span>
            <span className="wb-chip-word">{t.label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ rail -- */

/** The contents rail down the left of a record, with a drawn marker. */
export function Rail({ items, active }: { items: { id: string; label: string }[]; active?: string }) {
  return (
    <nav className="wb-rail" aria-label="On this page">
      <p className="wb-rail-head">On this page</p>
      <ul>
        {items.map((it) => (
          <li key={it.id} data-active={it.id === active || undefined}>
            <span className="wb-rail-dot" aria-hidden="true">
              <svg viewBox="-6 -6 12 12" width="9" height="9" focusable="false">
                <circle r="3.4" fill="var(--pg-vermilion)" fillOpacity="0.9" />
              </svg>
            </span>
            <a href={`#${it.id}`}>{it.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ----------------------------------------------------------------- cards -- */

/** A bordered card for the right-hand column of a record page. */
export function Card({ title, sub, action, children }: {
  title: string; sub?: string; action?: { href: string; label: string }; children: ReactNode;
}) {
  return (
    <section className="wb-card">
      <header>
        <div>
          <h3>{title}</h3>
          {sub ? <p>{sub}</p> : null}
        </div>
        {action ? <a href={action.href}>{action.label} <span aria-hidden="true">→</span></a> : null}
      </header>
      {children}
    </section>
  );
}

/** A numbered list — the "evidence at a glance" shape. */
export function Numbered({ items }: { items: { head: string; body: ReactNode }[] }) {
  return (
    <ol className="wb-numbered">
      {items.map((it, i) => (
        <li key={it.head}>
          <span className="wb-num" aria-hidden="true">
            <svg viewBox="0 0 34 34" width="24" height="24" focusable="false">
              <g style={{ mixBlendMode: "multiply", color: "var(--pg-graphite)" }}>
                {ringPts(13, 13, 400 + i * 53, 2, 0.11).map((run, k) => (
                  <path key={k} d={`M${run.map((p) => `${(p[0] + 17).toFixed(1)} ${(p[1] + 17).toFixed(1)}`).join("L")}`}
                    stroke="currentColor" strokeWidth={1.2} strokeOpacity={0.5} fill="none" strokeLinecap="round" />
                ))}
              </g>
              <text x="17" y="21.5" textAnchor="middle" className="sf-gfig"
                style={{ fill: "var(--ink)", fontSize: 13 }}>{i + 1}</text>
            </svg>
          </span>
          <div>
            <h4>{it.head}</h4>
            <p>{it.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ----------------------------------------------------------------- columns */

/**
 * The numbered column row that closes a page: a kicker, a serif heading, a
 * short body, a small drawing, and a note in the hand. Four or five across.
 */
export function Columns({ items }: {
  items: { kicker: string; head: string; body: ReactNode; figure?: ReactNode; note?: string; hue: Hue }[];
}) {
  return (
    <div className="wb-cols">
      {items.map((c, i) => (
        <section className="wb-col" key={c.head}>
          <p className="wb-col-n">
            <span style={{ color: `var(--pg-${c.hue})` }}>{String(i + 1).padStart(2, "0")}</span> {c.kicker}
          </p>
          <h3>{c.head}</h3>
          <div className="wb-col-body">{c.body}</div>
          {c.figure ? <div className="wb-col-fig">{c.figure}</div> : null}
          {c.note ? (
            <p className="wb-col-note" style={{ color: `var(--pg-${c.hue})` }}>{c.note}</p>
          ) : null}
        </section>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- pieces */

/** A quote set large, with a drawn rule under it. */
export function Pull({ children, attrib, hue = "lemon" }: { children: ReactNode; attrib?: string; hue?: Hue }) {
  return (
    <figure className="wb-pull">
      <blockquote>{children}</blockquote>
      <svg viewBox="0 0 240 10" className="wb-pull-rule" aria-hidden="true" focusable="false">
        <g style={{ mixBlendMode: "multiply", color: `var(--pg-${hue})` }}>
          <path d={`M${runPts(3, 5, 236, 5.5, 71, 1.6).map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L")}`}
            stroke="currentColor" strokeWidth={5} strokeOpacity={0.42} fill="none" strokeLinecap="round" />
        </g>
      </svg>
      {attrib ? <figcaption>{attrib}</figcaption> : null}
    </figure>
  );
}

/** The "key idea" block: a short statement with a highlighted phrase. */
export function KeyIdea({ children }: { children: ReactNode }) {
  return (
    <section className="wb-key">
      <p className="wb-key-head">Key idea</p>
      <p className="wb-key-body">{children}</p>
    </section>
  );
}

/** A handwritten aside placed in a margin. */
export function Aside({ children, hue = "graphite", rotate = 0 }: { children: string; hue?: Hue; rotate?: number }) {
  const lines = children.split("\n");
  return (
    <p className="wb-aside" aria-hidden="true"
      style={{ color: `var(--pg-${hue})`, transform: rotate ? `rotate(${rotate}deg)` : undefined }}>
      {lines.map((l, i) => (<span key={i}>{l}<br /></span>))}
    </p>
  );
}

export { Halo, Marker, Note, Pencil, Rule };

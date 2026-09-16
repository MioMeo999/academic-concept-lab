/* ---------------------------------------------------------------------------
   PAGE FURNITURE — Pressure

   The furniture makes the hypothesis visible:

   · every section declares its pressure (0–4) and wears a gauge;
   · every section that makes claims carries its provenance glyphs in the
     margin, so "where did this come from" is a continuous presence, not a
     block you meet once at the end;
   · quiet scholarship has its own composed environment — the Ledger — rather
     than being the loud language turned down.

   Server components only. Interactions live in their own islands.
   ------------------------------------------------------------------------- */

import type { CSSProperties, ReactNode } from "react";
import { Gauge, INK, Rule, Tick } from "./marks";

/* ----------------------------------------------------------------- pressure */

export type Pressure = 0 | 1 | 2 | 3 | 4;

export const PRESSURE_LABEL: Record<Pressure, string> = {
  4: "full pigment — the theory's own structure, drawn",
  3: "working — explanation with drawn intervention",
  2: "composed — organised typography, one drawn accent",
  1: "ledger — quiet scholarship, graphite",
  0: "canonical — references, type and registration marks",
};

/* ----------------------------------------------------------------- movement */

export function Movement({
  id,
  pressure,
  children,
  style,
}: {
  id?: string;
  pressure: Pressure;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section id={id} className={`ps-movement ps-p${pressure}`} style={style}>
      {children}
    </section>
  );
}

/* --------------------------------------------------------------------- head */

export function Head({
  num,
  kicker,
  title,
  pressure,
  colour = INK.charcoal,
  seed = 70,
  width = 720,
}: {
  num: string;
  kicker?: string;
  title: ReactNode;
  pressure: Pressure;
  colour?: string;
  seed?: number;
  width?: number;
}) {
  return (
    <header className="ps-head">
      <Rule
        width={width}
        colour={colour}
        seed={seed}
        opacity={pressure >= 3 ? 0.72 : colour === INK.charcoal ? 0.3 : 0.45}
        weight={pressure >= 3 ? 1.5 : 1}
        style={{ width: "100%", height: 4, display: "block", marginBottom: 16 }}
      />
      <div className="ps-head-row">
        <span className="ps-num">{num}</span>
        {kicker ? (
          <span className="ps-meta" style={pressure >= 3 ? { color: colour } : undefined}>
            {kicker}
          </span>
        ) : null}
        <span className="ps-head-gauge">
          <Gauge level={pressure} colour={pressure >= 3 ? colour : INK.graphite} seed={seed + 1} />
        </span>
      </div>
      <h2 className="ps-h2">{title}</h2>
    </header>
  );
}

/* ------------------------------------------------------- provenance in margin */

/** The section's claim status, in the margin where a reader can check it
    without leaving the argument. Glyphs are the Lab's existing set — ● ■ ▲ ✦ ?
    — decoded fully in the provenance ledger near the end of the record. */
export function MarginGlyphs({
  glyphs,
}: {
  glyphs: { glyph: string; colour?: string; label: string }[];
}) {
  return (
    <p className="ps-margin-glyphs">
      {glyphs.map((g, i) => (
        <span key={i} className="ps-margin-glyph" style={g.colour ? { color: g.colour } : undefined}>
          <span aria-hidden="true">{g.glyph}</span>
          <span className="ps-sr">{g.label}</span>
        </span>
      ))}
      <span className="ps-margin-glyphs-key" aria-hidden="true">
        {glyphs.map((g) => g.label).join(" · ")}
      </span>
    </p>
  );
}

/* --------------------------------------------------------------------- note */

/** The record's own qualification on a section — kept distinct from body
    text, because the qualification is part of the claim. */
export function Note({ children, tone = "plain", style }: { children: ReactNode; tone?: "plain" | "caution"; style?: CSSProperties }) {
  return (
    <p className={`ps-note${tone === "caution" ? " ps-note--caution" : ""}`} style={style}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------- ledger */

/** One row of the evidence ledger: what was claimed, what was done, what was
    found, what was not established. Quiet does not mean generic — the row is
    composed like a research notebook entry, in graphite, with the source
    pressed in vermilion because the source is the load-bearing fact. */
export function LedgerRow({
  index,
  title,
  label,
  citation,
  testedLabel,
  tested,
  foundLabel,
  found,
  notTested,
  doi,
}: {
  index: string;
  title: string;
  label: string;
  citation: string;
  testedLabel: string;
  tested: string;
  foundLabel: string;
  found: string;
  notTested: string;
  doi?: string;
}) {
  return (
    <article className="ps-ledger-row">
      <div className="ps-ledger-head">
        <span className="ps-ledger-index">{index}</span>
        <div className="ps-ledger-id">
          <div className="ps-ledger-titleline">
            <h3 className="ps-h3">{title}</h3>
            <span className="ps-meta">{label}</span>
          </div>
          <p className="ps-cite" dangerouslySetInnerHTML={{ __html: citation }} />
          {doi ? <p className="ps-doi">doi · {doi}</p> : null}
        </div>
      </div>
      <dl className="ps-ledger-cells">
        <div className="ps-ledger-cell">
          <dt>{testedLabel}</dt>
          <dd>{tested}</dd>
        </div>
        <div className="ps-ledger-cell ps-ledger-cell--found">
          <dt>{foundLabel}</dt>
          <dd>{found}</dd>
        </div>
        <div className="ps-ledger-cell ps-ledger-cell--open">
          <dt>not established</dt>
          <dd>{notTested}</dd>
        </div>
      </dl>
    </article>
  );
}

/* -------------------------------------------------------------------- scope */

/** Scope as a boundary, not a bullet list: what the framework explains on
    one side of a drawn line, what it stops short of on the other. */
export function Scope({
  explains,
  stops,
  note,
}: {
  explains: string[];
  stops: string[];
  note?: string;
}) {
  return (
    <div className="ps-scope">
      <div className="ps-scope-col">
        <p className="ps-meta" style={{ color: INK.teal, marginBottom: 14 }}>inside — it explains</p>
        <ul className="ps-scope-list">
          {explains.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
      <div className="ps-scope-divider" aria-hidden="true" />
      <div className="ps-scope-col">
        <p className="ps-meta" style={{ color: INK.vermilion, marginBottom: 14 }}>outside — it stops at</p>
        <ul className="ps-scope-list ps-scope-list--stops">
          {stops.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      {note ? <Note tone="caution" style={{ gridColumn: "1 / -1", marginTop: 8 }}>{note}</Note> : null}
    </div>
  );
}

/* --------------------------------------------------------------- references */

/** Canonical references. Pressure 0: hanging indents, italics where italics
    belong, and only registration ticks for company. */
export function References({
  label,
  items,
}: {
  label: string;
  items: { citation: string; contribution: string; doi?: string }[];
}) {
  return (
    <div className="ps-refs">
      <p className="ps-meta" style={{ marginBottom: 22 }}>{label}</p>
      <ol className="ps-refs-list">
        {items.map((s, i) => (
          <li key={i} className="ps-ref">
            <span className="ps-ref-tick" aria-hidden="true">
              <Tick size={11} seed={300 + i} />
            </span>
            <div>
              <p className="ps-cite" dangerouslySetInnerHTML={{ __html: s.citation }} />
              <p className="ps-ref-contribution">{s.contribution}{s.doi ? ` · doi ${s.doi}` : ""}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ----------------------------------------------------------------- provenance */

/** The full decode of the margin glyphs — the record's contract with the
    reader, set as a ledger in its own right. */
export function ProvenanceLedger({
  items,
}: {
  items: { glyph: string; colour: string; label: string; note: string }[];
}) {
  return (
    <div className="ps-prov">
      {items.map((p, i) => (
        <div key={i} className="ps-prov-row">
          <span className="ps-prov-glyph" style={{ color: p.colour }} aria-hidden="true">{p.glyph}</span>
          <div>
            <p className="ps-prov-label">{p.label}</p>
            <p className="ps-small">{p.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- folio */

export function Folio({ left, right }: { left: string; right: string }) {
  return (
    <footer className="ps-folio">
      <span className="ps-meta">{left}</span>
      <span className="ps-meta">{right}</span>
    </footer>
  );
}

/* --------------------------------------------------------------------- html */

export const html = (s: string) => ({ __html: s });

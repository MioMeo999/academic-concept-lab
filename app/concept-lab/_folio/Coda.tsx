import type { ReactNode } from "react";
import type { EvidenceXray, Provenance, ProvenanceGlyph, Source } from "@/content/types";
import { Rich } from "../_components/Sketch";
import { Glyph, cx } from "./Folio";
import s from "./coda.module.css";

/* ---------------------------------------------------------------------------
   The coda: where a record slows into scholarship.

   These are the quiet registers every folio shares — evidence, boundaries,
   the trail, sources and provenance. They are typographic on purpose. A page
   may choose which to use and in what order, but the way a citation or a
   provenance mark looks does not change from record to record: a reader
   should be able to audit any page with the same eyes.
   ------------------------------------------------------------------------- */

const doiHref = (doi: string) => `https://doi.org/${doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")}`;

/** Numbered citations with what each source contributes. */
export function SourceShelf({ items, start = 1, className }: { items: Source[]; start?: number; className?: string }) {
  return (
    <ol className={cx(s.sources, className)} start={start}>
      {items.map((src, i) => (
        <li key={src.citation + i}>
          <span className={s.sourceNum} aria-hidden="true">{String(start + i).padStart(2, "0")}</span>
          <div>
            <Rich as="p" className={s.citation} html={src.citation} />
            <p className={s.contribution}>{src.contribution}</p>
            {src.doi && <a className={s.doi} href={doiHref(src.doi)} rel="noreferrer">doi {src.doi}</a>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Every provenance mark on the record, and what it does and does not cover. */
export function ProvenanceLedger({ items, className }: { items: Provenance[]; className?: string }) {
  return (
    <ul className={cx(s.provenance, className)}>
      {items.map((p) => (
        <li key={p.label}>
          <span className={s.provGlyph} data-glyph={p.glyph} aria-hidden="true">{p.glyph}</span>
          <div>
            <h3>{p.label}</h3>
            <Rich as="p" html={p.note} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** One study or source examined as design → tested → found → not tested. */
export function EvidenceLedger({ items, className, glyph = "●" }: { items: EvidenceXray[]; className?: string; glyph?: ProvenanceGlyph }) {
  return (
    <ol className={cx(s.evidence, className)}>
      {items.map((e, i) => (
        <li key={e.title + i} className={s.evidenceRow}>
          <header className={s.evidenceHead}>
            <span className={s.evidenceNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className={s.evidenceLabel}><Glyph g={glyph} /> {e.label}</p>
              <h3>{e.title}</h3>
            </div>
          </header>
          <dl className={s.evidenceBody}>
            {e.design && (<div><dt>Design</dt><Rich as="dd" html={e.design} /></div>)}
            <div><dt>{e.testedLabel}</dt><Rich as="dd" html={e.tested} /></div>
            <div><dt>{e.foundLabel}</dt><Rich as="dd" html={e.found} /></div>
            <div className={s.notTested}><dt>Does not establish</dt><Rich as="dd" html={e.notTested} /></div>
          </dl>
          <footer className={s.evidenceFoot}>
            <Rich as="p" className={s.citation} html={e.citation} />
            {e.doi && <a className={s.doi} href={doiHref(e.doi)} rel="noreferrer">doi {e.doi}</a>}
          </footer>
        </li>
      ))}
    </ol>
  );
}

/** What the idea explains, and where it stops: a boundary, not a list. */
export function BoundaryMap({
  explains,
  stops,
  explainsLabel = "What it explains",
  stopsLabel = "Where it stops",
  note,
  className,
}: {
  explains: string[];
  stops: string[];
  explainsLabel?: string;
  stopsLabel?: string;
  note?: string;
  className?: string;
}) {
  return (
    <div className={cx(s.boundary, className)}>
      <div className={s.inside}>
        <h3>{explainsLabel}</h3>
        <ul>{explains.map((x) => <Rich as="li" key={x} html={x} />)}</ul>
      </div>
      <div className={s.edge} aria-hidden="true">
        <svg viewBox="0 0 24 400" preserveAspectRatio="none">
          <path d="M12 2c-3 40 4 70 0 110s3 60 -1 100 4 80 0 120-2 50 1 66" />
          <path d="M13 6c-2 44 3 72 -1 112s4 58 0 98 2 84 -1 118" opacity=".45" />
        </svg>
      </div>
      <div className={s.outside}>
        <h3>{stopsLabel}</h3>
        <ul>{stops.map((x) => <Rich as="li" key={x} html={x} />)}</ul>
      </div>
      {note && <Rich as="p" className={s.boundaryNote} html={note} />}
    </div>
  );
}

/** The trail: dated markers with each source's contribution. */
export function Trail({ nodes, className }: { nodes: { year: string; author: string; work: string; contribution: string }[]; className?: string }) {
  return (
    <ol className={cx(s.trail, className)}>
      {nodes.map((n) => (
        <li key={n.year + n.author}>
          <span className={s.trailYear}>{n.year}</span>
          <div>
            <Rich as="h3" html={n.author} />
            <Rich as="p" className={s.trailWork} html={n.work} />
            <Rich as="p" className={s.trailContribution} html={n.contribution} />
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Numbered cautions — the shortcuts a theory does not license. */
export function Cautions({ items, className }: { items: string[]; className?: string }) {
  return (
    <ol className={cx(s.cautions, className)}>
      {items.map((x, i) => (
        <li key={x}>
          <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <Rich as="p" html={x} />
        </li>
      ))}
    </ol>
  );
}

/** Qualifications and open questions, set as quiet prose with a question mark. */
export function OpenQuestions({ items, className, glyph = "?" }: { items: string[]; className?: string; glyph?: ProvenanceGlyph }) {
  return (
    <ul className={cx(s.open, className)}>
      {items.map((x) => (
        <li key={x}>
          <Glyph g={glyph} />
          <Rich as="p" html={x} />
        </li>
      ))}
    </ul>
  );
}

/** Heading block for a coda chapter. */
export function CodaHead({ kicker, title, children, id }: { kicker: string; title: ReactNode; children?: ReactNode; id?: string }) {
  return (
    <header className={s.codaHead}>
      <p className={s.codaKicker}>{kicker}</p>
      <h2 id={id}>{title}</h2>
      {children && <div className={s.codaLede}>{children}</div>}
    </header>
  );
}

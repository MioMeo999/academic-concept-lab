import Link from "next/link";
import type { EvidenceXray, Provenance, Source, TheoryRecord } from "@/content/types";
import { RECORDS, recordHref } from "@/content/records";
import { hatch, rule } from "../_lib/marks";
import { PIGMENT } from "./Pigment";
import { Rich } from "./Spread";
import { PLATES } from "./Frame";

/* ---------------------------------------------------------------------------
   The quiet register.

   Everything the reader has to be able to answer without operating a control
   lives here: what kind of record this is, what the cited evidence tested,
   what it did not test, where the record stops, what is unresolved, which
   statements are the platform's own, and what to read next.

   These blocks carry no pigment at all, with one exception noted at the stop
   rule. That is deliberate. The loud pages earn their colour by doing work
   with it; if the apparatus were also chromatic, colour would stop meaning
   "something is being worked out here" and start meaning nothing.
   ------------------------------------------------------------------------ */

/** An evidence x-ray, set as a table. What was *not* tested is given the same
 *  typographic weight as what was found, because promoting a compatible result
 *  into proof of a whole theory is the single biggest hazard these records
 *  carry. */
export function Xray({ item }: { item: EvidenceXray }) {
  return (
    <div className="at-xray">
      <div className="at-xray__head">
        <span className="at-xray__title">{item.title}</span>
        <span className="at-xray__kind">{item.label}</span>
      </div>
      <Rich className="at-xray__cite" as="div" html={item.citation} />
      <dl style={{ margin: 0 }}>
        {item.design && (
          <div className="at-xray__row">
            <dt>Design</dt>
            <Rich as="dd" html={item.design} />
          </div>
        )}
        <div className="at-xray__row">
          <dt>{item.testedLabel}</dt>
          <Rich as="dd" html={item.tested} />
        </div>
        <div className="at-xray__row">
          <dt>{item.foundLabel}</dt>
          <Rich as="dd" html={item.found} />
        </div>
        <div className="at-xray__row at-xray__row--not">
          <dt>Not tested</dt>
          <Rich as="dd" html={item.notTested} />
        </div>
        {item.doi && (
          <div className="at-xray__row">
            <dt>DOI</dt>
            <dd className="at-mono">{item.doi}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

/**
 * The one mark allowed on a quiet page.
 *
 * A record's stopping point is drawn as a firm rule whose right-hand end
 * frays: the line is asserted, and then it stops being asserted. It sits under
 * the list of things the record does not explain, and the list says in words
 * what the fraying says in graphite. It is here because a boundary is a
 * finding, not a gap.
 */
function StopRule() {
  const frayed = hatch({ w: 120, h: 7, gap: 2.4, seed: 613, broken: 0.7, jitter: 1.5, pressure: [0.12, 0.4], weight: 0.7, max: 60 });
  return (
    <svg className="at-scope__frayed" viewBox="0 0 400 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <g stroke={PIGMENT.graphite} fill="none" strokeLinecap="round">
        <path d={rule(2, 5, 268, 71, 0.8)} strokeWidth={1.6} opacity={0.9} />
        <g transform="translate(320 5)">
          {frayed.strokes.map((s, i) => (
            <path key={i} d={s.d} strokeWidth={s.w * 0.9} opacity={s.p * 0.55} />
          ))}
        </g>
      </g>
    </svg>
  );
}

export function Scope({ explains, stops, note }: { explains: string[]; stops: string[]; note?: string }) {
  return (
    <>
      <div className="at-scope">
        <div className="at-scope__col">
          <span className="at-label">Explains well</span>
          <ul>
            {explains.map((x) => (
              <Rich as="li" key={x} html={x} />
            ))}
          </ul>
        </div>
        <div className="at-scope__col at-scope__col--stops">
          <span className="at-label">Stops here</span>
          <ul>
            {stops.map((x) => (
              <Rich as="li" key={x} html={x} />
            ))}
          </ul>
          <StopRule />
        </div>
      </div>
      {note && (
        <p className="at-small" style={{ marginTop: "1.2rem", maxWidth: "40rem" }}>
          <Rich as="span" html={note} />
        </p>
      )}
    </>
  );
}

export function SourceList({ items, start = 1 }: { items: Source[]; start?: number }) {
  return (
    <div className="at-sources">
      {items.map((s, i) => (
        <div className="at-source" key={s.citation}>
          <span className="at-source__n">{String(start + i).padStart(2, "0")}</span>
          <div>
            <Rich className="at-source__cite" as="div" html={s.citation} />
            <Rich className="at-source__why" as="div" html={s.contribution} />
            {s.doi && <div className="at-source__doi">doi {s.doi}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProvenanceBlock({ items }: { items: Provenance[] }) {
  return (
    <div className="at-prov">
      {items.map((p) => (
        <div className="at-prov__item" key={p.label}>
          <span className="at-prov__glyph" aria-hidden="true">
            {p.glyph}
          </span>
          <div>
            <h3>{p.label}</h3>
            <p>{p.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const PLATE_SLUGS = new Set(PLATES.map((p) => p.slug as string));

/** A related record keeps its direction. It is never a recommendation, and the
 *  relation phrase is the record's own. */
export function Relations({ record }: { record: TheoryRecord }) {
  if (!record.relatedTo?.length) return null;
  return (
    <>
      {record.relatedTo.map((link) => {
        const target = RECORDS.find((r) => r.id === link.recordId);
        if (!target) return null;
        const inAtlas = PLATE_SLUGS.has(target.slug);
        const href = inAtlas ? `/atlas/${target.slug}` : recordHref(target);
        return (
          <Link className="at-relation" href={href} key={link.recordId}>
            <span className="at-relation__dir">
              This record {link.relation} —
            </span>
            <span className="at-relation__title">{target.title}</span>
            <Rich className="at-relation__body" as="span" html={link.body} />
            <span className="at-label" style={{ marginTop: "0.5rem" }}>
              {inAtlas ? "Plate in this atlas" : "Record on the production site"} · a separate record, not a test of this one
            </span>
          </Link>
        );
      })}
    </>
  );
}

/** The trail. Historical contributions, set as a dated register. */
export function Trail({ origins }: { origins: { year: string; author: string; work: string; contribution: string }[] }) {
  return (
    <div className="at-register">
      {origins.map((o) => (
        <div className="at-register__row" key={o.year + o.author}>
          <span className="at-register__term">
            {o.year}
            <br />
            <span style={{ letterSpacing: "0.04em", textTransform: "none", fontWeight: 600, fontSize: "0.78rem" }}>
              <Rich as="span" html={o.author} />
            </span>
          </span>
          <div>
            <Rich as="div" html={`<i>${o.work}</i>`} style={{ fontSize: "1rem", marginBottom: "0.15rem" }} />
            <Rich className="at-register__read" as="div" html={o.contribution} />
          </div>
        </div>
      ))}
    </div>
  );
}

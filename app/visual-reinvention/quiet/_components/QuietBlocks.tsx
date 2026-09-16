/**
 * Quiet scholarship, as a register rather than a quieter version of the loud
 * pages.
 *
 * Three decisions carry most of the weight here.
 *
 * 1. Nothing is boxed. A card would make each source look like an object of
 *    the same kind as every other, and the whole point of this register is
 *    that an empirical study, a review, a theoretical account and a
 *    constructed example are not one evidence class.
 *
 * 2. "Found" and "not tested" are set at identical typographic weight. Almost
 *    every design demotes the limitation; here the equality is the argument,
 *    and it is the cheapest possible way to keep the boundary attached to the
 *    claim it qualifies.
 *
 * 3. Where the frozen handoff does not record a field, the field says so
 *    rather than being quietly dropped or filled in. An absence that is
 *    visible is scholarship; an absence that is tidied away is not.
 */
import type { ReactNode } from "react";
import { GLYPHS, type GlyphKey } from "../../_components/Marks";

export type Field = { key: string; value: ReactNode; limit?: boolean };

export function Evidence({
  cite,
  kind,
  fields,
}: {
  cite: ReactNode;
  kind: string;
  fields: Field[];
}) {
  return (
    <article className="vr-entry">
      <h3 className="vr-entry__cite">{cite}</h3>
      <div className="vr-label vr-entry__kind">{kind}</div>
      {fields.map((f) => (
        <div key={f.key} className={`vr-field${f.limit ? " vr-field--limit" : ""}`}>
          <div className="vr-field__key">{f.key}</div>
          <div className="vr-field__val">{f.value}</div>
        </div>
      ))}
    </article>
  );
}

export function Source({
  mark,
  cite,
  contribution,
}: {
  mark: string;
  cite: ReactNode;
  contribution: string;
}) {
  return (
    <div className="vr-source">
      <div className="vr-source__mark" aria-hidden="true">
        {mark}
      </div>
      <div>
        <div>{cite}</div>
        <div className="vr-source__contribution">{contribution}</div>
      </div>
    </div>
  );
}

export function Relation({
  verb,
  to,
  why,
  provenance,
}: {
  verb: string;
  to: string;
  why: string;
  provenance: string;
}) {
  return (
    <div className="vr-relation">
      <div className="vr-relation__line">
        <span className="vr-relation__verb">{verb}</span>
        <svg width="46" height="10" aria-hidden="true" style={{ flex: "0 0 auto" }}>
          <path d="M 1 5 L 34 5" stroke="var(--vr-hair-strong)" strokeWidth="1.1" fill="none" />
          <path d="M 34 2 L 42 5 L 34 8" stroke="var(--vr-hair-strong)" strokeWidth="1.1" fill="none" />
        </svg>
        <span className="vr-relation__to">{to}</span>
      </div>
      <p className="vr-relation__why" style={{ margin: 0 }}>
        {why}
      </p>
      <div className="vr-label">{provenance}</div>
    </div>
  );
}

export function ProvenanceRow({ kind, covers }: { kind: GlyphKey; covers: string }) {
  return (
    <div className="vr-provenance__row">
      <span className="vr-glyph" aria-hidden="true">
        {GLYPHS[kind]}
      </span>
      <span>{covers}</span>
    </div>
  );
}

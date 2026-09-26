import type { CSSProperties, ReactNode } from "react";
import type { AnyRecord, ProvenanceGlyph } from "@/content/types";
import { DISCIPLINES } from "@/content/disciplines";
import { KIND } from "@/content/records";
import { Crumbs } from "../_components/RecordShell";
import { SaveButton } from "../_components/SaveButton";
import { KnowledgeNeighbourhood } from "../_components/KnowledgeNeighbourhood";
import { ChapterMap, type Chapter as ChapterEntry } from "./ChapterMap";
import { PencilDefs } from "./PencilDefs";
import s from "./folio.module.css";

/* ---------------------------------------------------------------------------
   The folio: what every redesigned record shares — the hand, not the mind.

   A folio supplies the trail back to the Library, the record's identity and
   Save, a chapter map that follows the reader, and the relation ledger at
   the end. Everything between the opening and the coda belongs to the
   record: its geometry, its art, its interactions. Nothing here decides
   what a page looks like in the middle.
   ------------------------------------------------------------------------- */

export type { ChapterEntry };

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

export function Folio({
  record,
  chapters,
  opening,
  children,
  className,
  style,
  mapLabel,
}: {
  record: AnyRecord;
  chapters: ChapterEntry[];
  /** The record's own opening composition, placed above the chapter map. */
  opening: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Short name for the chapter map, when the full title is long. */
  mapLabel?: string;
}) {
  const k = KIND[record.kind];
  return (
    <div
      className={cx(s.folio, className)}
      data-experience={record.id}
      data-record-id={record.id}
      data-record-kind={record.kind}
      style={{ "--kind": k.colour, ...style } as CSSProperties}
    >
      <PencilDefs />
      <div className={s.crumbs}>
        <Crumbs
          items={[
            { label: "Home", href: "/concept-lab" },
            { label: "Library", href: "/concept-lab/library" },
            { label: k.nav, href: `/concept-lab/library?kind=${record.kind}` },
            { label: record.title },
          ]}
        />
      </div>
      {opening}
      <ChapterMap chapters={chapters} label={mapLabel ?? record.title} />
      {children}
      <div className={s.neighbourhood}>
        <KnowledgeNeighbourhood record={record} />
      </div>
    </div>
  );
}

/** Kind, field, standing and Save — the record's identity, placed by the page. */
export function FolioIdentity({ record, standing, className }: { record: AnyRecord; standing?: string; className?: string }) {
  const k = KIND[record.kind];
  return (
    <div className={cx(s.identity, className)}>
      <span className={s.kindMark} aria-hidden="true" />
      <span className={s.kindLabel}>{k.label}</span>
      <span className={s.identitySep} aria-hidden="true">·</span>
      <span>{DISCIPLINES[record.discipline]?.name}</span>
      {(standing ?? record.statusChip) && (
        <>
          <span className={s.identitySep} aria-hidden="true">·</span>
          <span className={s.standing}>{standing ?? record.statusChip}</span>
        </>
      )}
      <span className={s.save}><SaveButton id={record.id} /></span>
    </div>
  );
}

/** A chapter: one intellectual passage with its own density. */
export function Chapter({
  id,
  children,
  className,
  density = "quiet",
  labelledBy,
  style,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  density?: "rich" | "active" | "quiet" | "scholarly";
  labelledBy?: string;
  style?: CSSProperties;
}) {
  return (
    <section id={id} className={cx(s.chapter, className)} data-chapter data-density={density} aria-labelledby={labelledBy} style={style}>
      {children}
    </section>
  );
}

/** The small numbered line above a chapter heading. */
export function Kicker({ num, children, className }: { num?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cx(s.kicker, className)}>
      {num && <span className={s.kickerNum}>{num}</span>}
      <span>{children}</span>
    </p>
  );
}

/** A handwritten margin note: the researcher's voice, never canonical copy. */
export function Margin({ children, className, as: Tag = "p", tone }: { children: ReactNode; className?: string; as?: "p" | "span"; tone?: "ink" | "kind" | "red" | "teal" | "cobalt" | "violet" | "ochre" }) {
  return <Tag className={cx(s.margin, className)} data-tone={tone}>{children}</Tag>;
}

const GLYPH_LABEL: Record<ProvenanceGlyph, string> = {
  "●": "source-grounded",
  "■": "faithful paraphrase",
  "▲": "constructed teaching aid",
  "✦": "editorial synthesis",
  "?": "open or contested",
};

/** An inline provenance mark with its meaning available to assistive tech. */
export function Glyph({ g, className }: { g: ProvenanceGlyph; className?: string }) {
  return (
    <span className={cx(s.glyph, className)} data-glyph={g} title={GLYPH_LABEL[g]}>
      <span aria-hidden="true">{g}</span>
      <span className={s.sr}>{GLYPH_LABEL[g]}:</span>
    </span>
  );
}

/** A caption line that always says what kind of object the image is. */
export function Caption({ g = "▲", children, className }: { g?: ProvenanceGlyph; children: ReactNode; className?: string }) {
  return (
    <p className={cx(s.caption, className)}>
      <Glyph g={g} /> {children}
    </p>
  );
}

/**
 * Authored artwork as a plate. `mobileSrc` lets narrow screens receive a
 * recomposed crop rather than a shrunken desktop field.
 */
export function Plate({
  src,
  mobileSrc,
  width,
  height,
  alt,
  caption,
  captionGlyph = "▲",
  className,
  priority,
  children,
}: {
  src: string;
  mobileSrc?: string;
  width: number;
  height: number;
  alt: string;
  caption?: ReactNode;
  captionGlyph?: ProvenanceGlyph;
  className?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  return (
    <figure className={cx(s.plate, className)}>
      <div className={s.plateArt}>
        <picture>
          {mobileSrc && <source media="(max-width: 760px)" srcSet={mobileSrc} />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : undefined} />
        </picture>
        {children}
      </div>
      {caption && <figcaption><Caption g={captionGlyph}>{caption}</Caption></figcaption>}
    </figure>
  );
}

export { cx };

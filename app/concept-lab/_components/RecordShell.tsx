import Link from "next/link";
import type { CSSProperties } from "react";
import type { AnyRecord } from "@/content/types";
import { DISCIPLINES } from "@/content/disciplines";
import { KIND, otherRecords, recordHref } from "@/content/records";
import { Divider, Rich } from "./Sketch";
import { SaveButton } from "./SaveButton";
import { ContentsNav } from "./ContentsNav";
import { RecordKnowledgeOrbit } from "./VisualAtlas";

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <span key={it.label} style={{ display: "contents" }}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {it.href ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

/** Header, contents rail and the "elsewhere" block — everything a record has
 *  regardless of kind. The sections themselves come from the kind's template. */
export function RecordShell({
  record,
  toc,
  children,
}: {
  record: AnyRecord;
  toc: [string, string, string][];
  children: React.ReactNode;
}) {
  const k = KIND[record.kind];
  const cite = record.kind === "study" ? record.citation : null;

  return (
    <div className="wrap">
      <Crumbs
        items={[
          { label: "Home", href: "/concept-lab" },
          { label: "Library", href: "/concept-lab/library" },
          { label: k.nav, href: "/concept-lab/library" },
          { label: record.title },
        ]}
      />

      <section className={`hero record-hero record-hero-${record.kind}`}>
        <div className="record-hero-copy">
          <div className="record-hero-topline">
            <div className="record-hero-labels">
              <span className={`chip ${k.cls}`}>{k.label}</span>
              <span className="chip grey">{DISCIPLINES[record.discipline]?.name}</span>
            </div>
            <SaveButton id={record.id} />
          </div>

          <span className="cat record-hero-index">{k.nav} · {record.statusChip ?? "a working record"}</span>
          <h1 className="title">{record.title}</h1>
          <p className="hook">{record.hook}</p>

          {cite && (
            <div className="record-source-card">
              <span className="k">the source</span>
              <p className="read">
                <Rich html={cite.authors} /> ({cite.year}).<br />
                <i>{cite.journal}</i>, {cite.volume}.
              </p>
              <p className="cat record-source-doi">doi {cite.doi}</p>
            </div>
          )}

          <p className="lede record-hero-lede">{record.oneSentence}</p>
          <div className="record-topic-strip" role="list" aria-label="Key terms">
            {record.topics.slice(0, 5).map((topic, index) => <span role="listitem" key={topic} style={{ "--topic-line": index % 2 ? "var(--coral)" : "var(--blue)" } as CSSProperties}>{topic}</span>)}
          </div>
        </div>
        <RecordKnowledgeOrbit record={record} />
      </section>

      <nav className="record-reading-route" aria-label="Reading route">
        <span className="record-reading-route-intro"><i>read this record as</i><b>{k.nav.toLowerCase()}</b></span>
        {toc.slice(0, 4).map(([num, label, id]) => (
          <a href={`#${id}`} key={id}>
            <span>{num}</span>
            <strong>{label}</strong>
          </a>
        ))}
        <span className="record-reading-route-tail">then check the marks in the margin ↘</span>
      </nav>

      <div className="layout">
        {/* Phones get no rail, but a record can run to eleven sections — the
            map becomes a fold-out box instead of disappearing. The same
            component keeps the desktop rail and mobile map in sync. */}
        <ContentsNav toc={toc} />
        <div className="record-body">{children}</div>
      </div>

      <Divider />

      <section>
        <span className="k">elsewhere in the library</span>
        <div className="nextprev">
          {otherRecords(record).map((o) => {
            const ok = KIND[o.kind];
            return (
              <article className="card" key={o.id} data-reveal="rise">
                <Link className="hitbox" href={recordHref(o)}>
                  <span>{o.title}</span>
                </Link>
                <div className="inner" style={{ padding: ".9rem 1rem 1rem" }}>
                  <span className={`chip ${ok.cls}`} style={{ fontSize: ".7rem" }}>{ok.label}</span>
                  <h3 style={{ fontSize: "1.1rem", margin: ".5rem 0 .3rem" }}>{o.title}</h3>
                  <p className="read" style={{ fontSize: ".88rem", lineHeight: 1.5, color: "var(--pen-2)" }}>{o.hook}</p>
                  <p className="k" style={{ marginTop: ".6rem" }}>a separate record — not a test of the other</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

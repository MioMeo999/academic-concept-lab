import Link from "next/link";
import type { AnyRecord } from "@/content/types";
import { DISCIPLINES } from "@/content/disciplines";
import { KIND, otherRecords, recordHref } from "@/content/records";
import { Banner, Divider, Rich } from "./Sketch";
import { SaveButton } from "./SaveButton";

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

      <section className="hero" style={{ paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <span className={`chip ${k.cls}`}>{k.label}</span>
            <span className="chip grey">{DISCIPLINES[record.discipline]?.name}</span>
          </div>
          <SaveButton id={record.id} />
        </div>

        <div style={{ marginTop: ".9rem" }}>
          <Banner tilt={record.kind === "theory" ? "tilt-l2" : "tilt-r2"}>
            <h1 className="title">{record.title}</h1>
          </Banner>
        </div>

        <p className="hook">{record.hook}</p>

        {cite && (
          <div className="sk-box tilt-l2 fill" style={{ marginTop: "1.2rem", maxWidth: 600 }}>
            <span className="k">the source</span>
            <p className="read" style={{ fontSize: ".98rem", lineHeight: 1.5, marginTop: ".35rem" }}>
              <Rich html={cite.authors} /> ({cite.year}).<br />
              <i>{cite.journal}</i>, {cite.volume}.
            </p>
            <p className="cat" style={{ marginTop: ".4rem", textTransform: "none", letterSpacing: ".04em" }}>doi {cite.doi}</p>
          </div>
        )}

        <p className="lede" style={{ marginTop: "1.1rem", maxWidth: "60ch" }}>{record.oneSentence}</p>
      </section>

      <div className="layout">
        <aside className="contents" aria-label="Contents">
          <span className="cat">Contents</span>
          <ol>
            {toc.map(([num, label, id]) => (
              <li key={id}>
                <a href={`#${id}`}>
                  <span className="num">{num}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </aside>
        <div>{children}</div>
      </div>

      <Divider />

      <section>
        <span className="k">elsewhere in the library</span>
        <div className="nextprev">
          {otherRecords(record).map((o) => {
            const ok = KIND[o.kind];
            return (
              <article className="card" key={o.id}>
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

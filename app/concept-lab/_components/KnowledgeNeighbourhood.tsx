import Link from "next/link";
import type { AnyRecord } from "@/content/types";
import { KIND, recordHref } from "@/content/records";
import { getKnowledgeNeighbourhood } from "@/content/atlas";
import { Rich } from "./Sketch";

function directionLabel(direction: "outgoing" | "incoming" | "atlas") {
  if (direction === "outgoing") return "outgoing relation";
  if (direction === "incoming") return "incoming relation";
  return "atlas relation";
}

function directionMark(direction: "outgoing" | "incoming" | "atlas") {
  if (direction === "outgoing") return "→";
  if (direction === "incoming") return "←";
  return "↔";
}

export function KnowledgeNeighbourhood({ record }: { record: AnyRecord }) {
  const { neighbours, fallback } = getKnowledgeNeighbourhood(record);

  return (
    <section className="knowledge-neighbourhood" aria-labelledby="knowledge-neighbourhood-title">
      <div className="knowledge-neighbourhood-head">
        <div>
          <span className="k">editorial relation ledger</span>
          <h2 id="knowledge-neighbourhood-title">Where this idea leads.</h2>
        </div>
        <p className="lede">Follow the explicit connections first. The relation explains why the next record is here.</p>
      </div>

      {neighbours.length > 0 ? (
        <div className="knowledge-neighbourhood-list">
          {neighbours.map((neighbour) => {
            const kind = KIND[neighbour.record.kind];
            const body = neighbour.relationBody ?? "The atlas records this relation as a navigational cue, not a claim that the two records are interchangeable.";
            return (
              <article className="knowledge-neighbour-row" key={`${neighbour.direction}-${neighbour.record.id}`}>
                <div className="knowledge-neighbour-relation">
                  <span className="knowledge-neighbour-mark" aria-hidden="true">{directionMark(neighbour.direction)}</span>
                  <span className="k">{directionLabel(neighbour.direction)}</span>
                  <strong>{neighbour.relationLabel}</strong>
                  {neighbour.sourceTitle && <span className="knowledge-neighbour-source">named by {neighbour.sourceTitle}</span>}
                  {neighbour.provenance && <span className="knowledge-neighbour-source">{neighbour.provenance}</span>}
                </div>
                <div className="knowledge-neighbour-record">
                  <Link href={recordHref(neighbour.record)}>
                    <span className={`knowledge-neighbour-kind ${kind.cls}`}>{kind.label}</span>
                    <h3>{neighbour.record.title}</h3>
                  </Link>
                  <p>{neighbour.record.hook}</p>
                </div>
                <div className="knowledge-neighbour-reason">
                  {neighbour.direction === "incoming" && neighbour.sourceTitle && (
                    <p className="knowledge-neighbour-incoming"><strong>{neighbour.sourceTitle}</strong> names this record through this relation.</p>
                  )}
                  <Rich className="read" as="p" html={body} />
                  <Link className="knowledge-neighbour-go" href={recordHref(neighbour.record)}>{kind.cta} →</Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="knowledge-neighbourhood-empty">No direct record relation is recorded here yet. The field remains open to explore without inventing a connection.</p>
      )}

      <div className="knowledge-neighbourhood-fallback">
        <div>
          <span className="k">broader field</span>
          <p>{fallback.body}</p>
        </div>
        <Link href={fallback.href}>{fallback.label} →</Link>
      </div>
    </section>
  );
}

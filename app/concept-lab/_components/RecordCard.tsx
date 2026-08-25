import Link from "next/link";
import type { AnyRecord } from "@/content/types";
import { KIND, recordHref } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import { getBranch, getKnowledgeFormLabel } from "@/content/atlas";
import { GoArrow, Icon, Ribbon } from "./Sketch";
import { SaveButton } from "./SaveButton";

/** Card previews use each record's own dialect, so you can tell what kind of
 *  thing you are about to open before reading the title. */
export function RecordCard({ record }: { record: AnyRecord }) {
  const k = KIND[record.kind];
  const discipline = DISCIPLINES[record.discipline];
  const branch = record.primaryBranch ? getBranch(record.primaryBranch, record.discipline) : undefined;
  const editorialStatusNote = ["Subtype of P–E Fit", "Commonly confused", "Research field", "A system, not a theory"].includes(record.statusChip ?? "")
    ? record.statusChip
    : undefined;
  const art =
    record.kind === "mechanism" ? (
      <div style={{ display: "flex", alignItems: "flex-end", gap: ".2rem", flex: "none" }}>
        <Icon id="i-star" style={{ width: 26, height: 26, color: "var(--plum-deep)" }} />
        <Icon id="i-arrowb" style={{ width: 28, height: 28, color: "var(--pen-3)" }} />
      </div>
    ) : record.kind === "method" ? (
      <div style={{ display: "flex", alignItems: "flex-end", gap: ".25rem", flex: "none" }}>
        <Icon id="i-eye" style={{ width: 28, height: 28, color: "var(--gold-deep)" }} />
        <Icon id="i-person" style={{ width: 30, height: 30 }} />
      </div>
    ) : record.kind === "theory" ? (
      <div style={{ display: "flex", alignItems: "flex-end", gap: ".05rem", flex: "none" }}>
        <Icon id="i-person" style={{ width: 28, height: 28, color: "var(--red)" }} />
        <Icon id="i-door" style={{ width: 34, height: 34 }} />
        <Icon id="i-person" style={{ width: 24, height: 24, color: "var(--teal)" }} />
      </div>
    ) : (
      <div style={{ display: "flex", alignItems: "flex-end", gap: ".3rem", flex: "none" }}>
        <Icon id="i-head" style={{ width: 30, height: 30 }} />
        <Icon id="i-eye" style={{ width: 30, height: 30, color: "var(--teal)" }} />
      </div>
    );

  return (
    <article className="card">
      <Link className="hitbox" href={recordHref(record)}>
        <span>{record.title}</span>
      </Link>
      <div className="inner">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: ".7rem" }}>
          <Ribbon text={k.label.toUpperCase()} fill={k.fill} stroke={k.stroke} tilt={record.kind === "study" ? "tilt-r" : "tilt-l"} />
          {art}
        </div>
        <p className="card-context">
          {discipline?.name ?? record.discipline}
          {branch && <><span aria-hidden="true"> · </span>{branch.label}</>}
        </p>
        <h3>{record.title}</h3>
        <p className="ck">{record.hook}</p>
        {record.oneSentence && <p className="card-summary">{record.oneSentence}</p>}
        {editorialStatusNote && <p className="card-status-note">{editorialStatusNote}</p>}
        <div className="facts">
          {record.facts.map((f) => (
            <span className="fact" key={f}>{f}</span>
          ))}
        </div>
        <div className="card-footer">
          <div className="card-footer-labels">
            <span className={`chip ${k.cls}`}>{k.label}</span>
            {record.knowledgeForm && <span className="chip form-badge">{getKnowledgeFormLabel(record.knowledgeForm)}</span>}
          </div>
          <SaveButton id={record.id} />
          <Link className="go" href={recordHref(record)}>
            <span>{k.cta}</span>
            <GoArrow />
          </Link>
        </div>
      </div>
    </article>
  );
}

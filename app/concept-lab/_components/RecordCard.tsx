import Link from "next/link";
import type { AnyRecord } from "@/content/types";
import { KIND, recordHref } from "@/content/records";
import { GoArrow, Icon, Ribbon } from "./Sketch";
import { SaveButton } from "./SaveButton";

/** Card previews use each record's own dialect, so you can tell what kind of
 *  thing you are about to open before reading the title. */
export function RecordCard({ record }: { record: AnyRecord }) {
  const k = KIND[record.kind];
  const art =
    record.kind === "theory" ? (
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
          <Ribbon text={k.label.toUpperCase()} fill={k.fill} stroke={k.stroke} tilt={record.kind === "theory" ? "tilt-l" : "tilt-r"} />
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            {art}
            <SaveButton id={record.id} />
          </div>
        </div>
        <h3>{record.title}</h3>
        <p className="ck">{record.hook}</p>
        <div className="facts">
          {record.facts.map((f) => (
            <span className="fact" key={f}>{f}</span>
          ))}
        </div>
        <div className="go">
          <span>{k.cta}</span>
          <GoArrow />
        </div>
      </div>
    </article>
  );
}

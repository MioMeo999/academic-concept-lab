import type { BranchRecordGroup } from "@/content/atlas";
import { RecordCard } from "./RecordCard";

export function BranchSection({ group }: { group: BranchRecordGroup }) {
  const { branch, records } = group;
  return (
    <section className="atlas-branch-section" id={branch.id}>
      <div className="atlas-section-heading">
        <span className="atlas-branch-number">{String(branch.order).padStart(2, "0")}</span>
        <div>
          <h2>{branch.label}</h2>
          <p className="read">{branch.description}</p>
        </div>
        <span className="atlas-section-count">{records.length} {records.length === 1 ? "record" : "records"}</span>
      </div>
      <div className="lib atlas-record-grid">
        {records.map((record) => <RecordCard record={record} key={record.id} />)}
      </div>
    </section>
  );
}

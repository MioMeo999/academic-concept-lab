import type { AnyRecord } from "@/content/types";
import { RecordCard } from "./RecordCard";

export function AtlasRecordGroup({ title, description, records, id }: { title: string; description?: string; records: AnyRecord[]; id?: string }) {
  return (
    <section className="atlas-record-group" id={id}>
      <div className="atlas-section-heading">
        <div>
          <h2>{title}</h2>
          {description && <p className="read">{description}</p>}
        </div>
        <span className="atlas-section-count">{records.length} {records.length === 1 ? "record" : "records"}</span>
      </div>
      <div className="lib atlas-record-grid">
        {records.map((record) => <RecordCard record={record} key={record.id} />)}
      </div>
    </section>
  );
}

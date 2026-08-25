import Link from "next/link";
import type { AnyRecord } from "@/content/types";
import type { LearningPath } from "@/content/atlas";
import { recordHref } from "@/content/records";

export function LearningPathRow({ path, records }: { path: LearningPath; records: AnyRecord[] }) {
  const byId = new Map(records.map((record) => [record.id, record]));
  return (
    <article className="atlas-path-row">
      <div>
        <span className="atlas-path-label">learning path</span>
        <h3>{path.question}</h3>
        <p className="read">{path.description}</p>
      </div>
      <ol>
        {path.recordIds.map((id) => byId.get(id)).filter((record): record is AnyRecord => Boolean(record)).map((record, index) => (
          <li key={record.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Link href={recordHref(record)}>{record.title}</Link>
          </li>
        ))}
      </ol>
    </article>
  );
}

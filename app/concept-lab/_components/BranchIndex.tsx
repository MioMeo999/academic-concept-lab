import type { BranchRecordGroup } from "@/content/atlas";

export function BranchIndex({ groups }: { groups: BranchRecordGroup[] }) {
  return (
    <nav className="atlas-branch-index" aria-label="Psychology of Music branches">
      <span className="k">current branches</span>
      <ol>
        {groups.map(({ branch, records }) => (
          <li key={branch.id}>
            <a href={`#${branch.id}`}>
              <span className="atlas-branch-number">{String(branch.order).padStart(2, "0")}</span>
              <span><b>{branch.label}</b><small>{records.length} {records.length === 1 ? "record" : "records"}</small></span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

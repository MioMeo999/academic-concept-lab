import type { AnyRecord } from "@/content/types";
import { DISCIPLINES } from "@/content/disciplines";
import { getBranchesForDiscipline, getDisciplineOrientation, getLearningPathsForDiscipline, groupRecordsByBranch } from "@/content/atlas";
import { BranchIndex } from "./BranchIndex";
import { LearningPathRow } from "./LearningPathRow";

export function DisciplineOrientation({ disciplineId, records }: { disciplineId: string; records: AnyRecord[] }) {
  const discipline = DISCIPLINES[disciplineId];
  const orientation = getDisciplineOrientation(disciplineId);
  const branchGroups = groupRecordsByBranch(records, disciplineId);
  const paths = getLearningPathsForDiscipline(disciplineId);
  if (!discipline || !orientation) return null;

  return (
    <section className="atlas-orientation" aria-labelledby={`orientation-${disciplineId}`}>
      <div className="atlas-orientation-head">
        <div>
          <span className="k">orientation</span>
          <h2 id={`orientation-${disciplineId}`}>{discipline.name}</h2>
          <p className="lede">{orientation.summary}</p>
        </div>
        <span className="atlas-orientation-count"><b>{records.length}</b> {records.length === 1 ? "record" : "records"}</span>
      </div>
      {disciplineId === "music-psych" && branchGroups.length === getBranchesForDiscipline(disciplineId).length && (
        <>
          <BranchIndex groups={branchGroups} />
          <div className="atlas-paths">
            <div className="atlas-subheading">
              <span className="k">current learning paths</span>
              <span>{paths.length} routes through the live atlas</span>
            </div>
            {paths.map((path) => <LearningPathRow key={path.id} path={path} records={records} />)}
          </div>
        </>
      )}
    </section>
  );
}

import type { GTTMTreeNode } from "@/content/types";
import s from "./gttm.module.css";

/**
 * A reduction tree, as the record states it: the head of a span at the root,
 * the spans it stands for as its branches. Read left to right; the relation
 * each node has to its parent is written on it, never left to a line's style.
 */
export function Tree({ node, label }: { node: GTTMTreeNode; label: string }) {
  return (
    <div className={s.tree} role="group" aria-label={label}>
      <TreeNode node={node} />
    </div>
  );
}

function TreeNode({ node }: { node: GTTMTreeNode }) {
  return (
    <div className={s.treeNode}>
      <div className={s.treeBox} data-relation={node.relation}>
        <b>{node.label}</b>
        {node.sub && <span>{node.sub}</span>}
        {node.relation && <i>{node.relation}</i>}
      </div>
      {node.children && (
        <div className={s.treeKids}>
          {node.children.map((c, i) => <TreeNode key={`${c.label}-${i}`} node={c} />)}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import type { Discipline } from "@/content/disciplines";

const PRIMARY = ["ob", "music-psych"] as const;
const SECONDARY = ["qual-methods", "psychobiology"] as const;

function NavLink({ id, label, current, disciplines }: { id: string; label: string; current?: string; disciplines: Record<string, Discipline> }) {
  const active = id === "all" ? !current : current === id;
  const href = id === "all" ? "/concept-lab/library" : `/concept-lab/library?discipline=${id}`;
  return (
    <Link className={`atlas-disc-nav-link${active ? " is-active" : ""}`} href={href} aria-current={active ? "page" : undefined}>
      {id === "all" ? label : disciplines[id]?.name ?? label}
    </Link>
  );
}

export function DisciplineNav({ disciplines, current }: { disciplines: Record<string, Discipline>; current?: string }) {
  return (
    <nav className="atlas-discipline-nav" aria-label="Browse the library by discipline">
      <div className="atlas-disc-nav-primary">
        <NavLink id="all" label="All" current={current} disciplines={disciplines} />
        {PRIMARY.map((id) => <NavLink key={id} id={id} current={current} disciplines={disciplines} label="" />)}
      </div>
      <div className="atlas-disc-nav-secondary">
        <span className="k">also in the lab</span>
        {SECONDARY.map((id) => <NavLink key={id} id={id} current={current} disciplines={disciplines} label="" />)}
      </div>
    </nav>
  );
}

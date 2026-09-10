/**
 * One figure, alone, at width.
 *
 * The plates are long and carry a lot of pigment; a page holding every figure
 * at once is heavy enough to be awkward to inspect. This renders exactly one.
 * A working tool, not part of the exploration's argument.
 */
import { Foot, Masthead } from "../../_components/Shell";
import { ContestedSpan, Ladder, MovedBoundary, OneEventTwoWholes, OpenBoundary } from "../../gestalt-principles-in-music/_components/Figures";
import { CompetingReadings, LocalNeighbourhood, OneProbeFourSurrounds, OrderedRegisters } from "../../tonal-hierarchy/_components/Figures";
import { gestaltPrinciplesInMusic } from "../../../../content/gestalt-principles-in-music";
import { tonalHierarchy } from "../../../../content/tonal-hierarchy";

export const metadata = { title: "Figure bench", robots: { index: false, follow: false } };

const g = gestaltPrinciplesInMusic.gestalt!;
const t = tonalHierarchy.tonal!;

const surrounds = t.sameNote.contexts.map((c) => ({
  label: c.label,
  role: c.role ?? "",
  chords: (() => {
    const byStart = new Map<number, number[]>();
    for (const ev of c.events) {
      const k = Math.round(ev.start * 1000);
      byStart.set(k, [...(byStart.get(k) ?? []), ev.pitch]);
    }
    return Array.from(byStart.entries()).sort((a, b) => a[0] - b[0]).map(([, v]) => v).slice(0, 3);
  })(),
}));

const FIGS: Record<string, { label: string; node: React.ReactNode }> = {
  g1: { label: "the moved boundary", node: <MovedBoundary /> },
  g2: { label: "one event, two wholes", node: <OneEventTwoWholes cases={g.whole.cases} /> },
  g3: { label: "the contested span", node: <ContestedSpan /> },
  g4: { label: "events to sections", node: <Ladder levels={g.hierarchy.levels} /> },
  g5: { label: "where it stops", node: <OpenBoundary /> },
  t1: { label: "one probe, four surrounds", node: <OneProbeFourSurrounds contexts={surrounds} /> },
  t2: { label: "ordered registers", node: <OrderedRegisters items={t.profile.items} /> },
  t3: { label: "two readings", node: <CompetingReadings /> },
  t4: { label: "local neighbourhood", node: <LocalNeighbourhood relations={t.neighbourhood.levels[0].relations} /> },
};

export function generateStaticParams() {
  return Object.keys(FIGS).map((fig) => ({ fig }));
}

export default async function BenchFigure({ params }: { params: Promise<{ fig: string }> }) {
  const { fig } = await params;
  const entry = FIGS[fig];
  return (
    <>
      <Masthead />
      <main className="sf-shell" id="sf-main">
        <p className="sf-status">
          <b>Bench</b> {fig}
          {Object.keys(FIGS).map((k) => (
            <a key={k} href={`/surface/bench/${k}`} style={{ marginLeft: ".5rem" }}>{k}</a>
          ))}
        </p>
        {entry ? (
          <section style={{ padding: "1.4rem 0 3rem" }}>
            <p className="sf-figlabel"><b>{fig.toUpperCase()}</b> <span>{entry.label}</span></p>
            <div style={{ maxWidth: "58rem" }}>{entry.node}</div>
          </section>
        ) : (
          <p className="sf-p">No figure by that name.</p>
        )}
      </main>
      <Foot />
    </>
  );
}

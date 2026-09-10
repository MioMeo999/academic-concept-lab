import type { Metadata } from "next";
import { Foot } from "./_components/Shell";
import { CoverField, ConceptMap } from "./_components/Cover";
import { Actions, Aside, Chips, Columns, KeyIdea, Numbered, Pull, TopNav } from "./_components/Web";
import { Hi, Ul } from "./_components/Notes";
import { Ball, Burst, Contour, Field, Halo, Link as Bow, NoteMark, Slur, Stave } from "./_components/Draw";
import { Plate } from "./_components/Pigment";
import type { Hue } from "./_components/Pigment";

export const metadata: Metadata = {
  title: "Academic Concept Lab",
  description:
    "A living atlas of theories, connections and questions — typeset scholarship with the thinking drawn over it in coloured pencil.",
};

const NAV = [
  { href: "/surface", label: "Home" },
  { href: "/surface/job-demands-resources", label: "Theories" },
  { href: "/surface/conventions", label: "Materials" },
  { href: "/surface/bench/g1", label: "Visual library" },
];

const FEATURED: { n: string; href: string; title: string; sub: string; body: string; hue: Hue; fig: React.ReactNode }[] = [
  {
    n: "01", href: "/surface/job-demands-resources",
    title: "Job Demands–Resources", sub: "What burns people out, and what protects them",
    hue: "vermilion",
    body: "Whatever the occupation, working conditions sort into demands and resources — and those set off two processes, one that drains health and one that builds motivation.",
    fig: <ForkMark />,
  },
  {
    n: "02", href: "/surface/gestalt-principles-in-music",
    title: "Gestalt Principles", sub: "How we hear the whole",
    hue: "teal",
    body: "Musical events become groups, boundaries and larger wholes through interacting cues rather than one deterministic law. The same notes support more than one reading.",
    fig: <OverlapMark />,
  },
  {
    n: "03", href: "/surface/tonal-hierarchy",
    title: "Tonal Hierarchy", sub: "What a pitch does in context",
    hue: "violet",
    body: "Hold one note completely still and change only what precedes it. Its tonal role changes — from tonic, to dominant, to a tone outside the key altogether.",
    fig: <HeldMark />,
  },
];

/* Three small marks, one per featured record, each in that record's own shape:
   a fork, an overlap, a held vertical. Small enough to read at a glance and
   built from the same vocabulary as the plates. */
function ForkMark() {
  return (
    <Plate viewBox="0 0 220 96" ratio="220 / 96">
      <Halo cx={38} cy={48} rx={26} ry={20} hue="cobalt" seed={11} laps={2} weight={1.5} opacity={0.6} />
      <Bow x1={66} y1={40} x2={112} y2={22} hue="vermilion" bend={-0.16} seed={13} weight={1.6} opacity={0.6} />
      <Bow x1={66} y1={56} x2={112} y2={74} hue="teal" bend={0.16} seed={17} weight={1.6} opacity={0.6} />
      <Field x={116} y={8} w={92} h={28} hue="vermilion" seed={19} passes={7} rows={7} angle={-10} weight={0.24} width={1.4} />
      <Halo cx={162} cy={22} rx={46} ry={16} hue="vermilion" seed={23} laps={2} weight={1.5} opacity={0.55} />
      <Field x={116} y={60} w={92} h={28} hue="teal" seed={29} passes={7} rows={7} angle={10} weight={0.24} width={1.4} />
      <Halo cx={162} cy={74} rx={46} ry={16} hue="teal" seed={31} laps={2} weight={1.5} opacity={0.55} />
    </Plate>
  );
}

function OverlapMark() {
  const xs = [26, 58, 90, 122, 158, 190];
  const ys = [58, 50, 42, 46, 34, 40];
  return (
    <Plate viewBox="0 0 220 96" ratio="220 / 96">
      <Field x={14} y={34} w={116} h={34} hue="teal" seed={41} passes={8} rows={8} angle={-12} weight={0.22} width={1.4} />
      <Field x={96} y={30} w={116} h={34} hue="ochre" seed={47} passes={8} rows={8} angle={12} weight={0.22} width={1.4} />
      <Stave x1={12} x2={208} y={48} gap={7} seed={53} weight={0.85} opacity={0.34} />
      {xs.map((x, i) => (
        <NoteMark key={i} x={x} y={ys[i]} seed={900 + i * 37} stemDir={-1} stemLen={17} weight={1.3} opacity={0.66} />
      ))}
      <Slur x1={20} x2={128} y={26} depth={9} hue="teal" seed={59} weight={1.5} opacity={0.7} />
      <Slur x1={92} x2={198} y={14} depth={9} hue="ochre" seed={61} weight={1.5} opacity={0.7} />
    </Plate>
  );
}

function HeldMark() {
  return (
    <Plate viewBox="0 0 220 96" ratio="220 / 96">
      {[0, 1, 2].map((i) => {
        const y = 22 + i * 27;
        return (
          <g key={i}>
            <Stave x1={14} x2={196} y={y} gap={5.5} seed={71 + i} weight={0.8} opacity={0.3} />
            <Field x={30 + i * 16} y={y - 11} w={44} h={22} hue="cobalt" seed={79 + i * 13} passes={5} rows={6} angle={-12} weight={0.2} width={1.3} />
            <NoteMark x={52 + i * 16} y={y - 4 + i * 3} seed={5300 + i} hue="cobalt" weight={1.2} opacity={0.55} />
            <NoteMark x={162} y={y + 3} seed={4400} weight={1.5} opacity={0.82} />
          </g>
        );
      })}
      <Contour points={[[150, 8], [178, 12], [176, 84], [148, 80]]} hue="graphite" seed={97} weight={1.2} opacity={0.4} dash="6 6" wobble={2} />
    </Plate>
  );
}

/* The four ways in, as the record itself would draw them. */
function DiscoverMark() {
  return (
    <Plate viewBox="0 0 160 84" ratio="160 / 84">
      <Field x={18} y={18} w={64} h={44} hue="cobalt" seed={101} passes={7} rows={7} angle={-14} weight={0.22} width={1.4} />
      <Halo cx={50} cy={40} rx={34} ry={24} hue="cobalt" seed={103} laps={2} weight={1.5} opacity={0.58} />
      <Bow x1={88} y1={40} x2={132} y2={40} hue="graphite" bend={0.14} seed={107} weight={1.3} opacity={0.5} />
      <Burst cx={140} cy={38} r={11} hue="lemon" seed={109} rays={7} weight={1.5} opacity={0.8} />
    </Plate>
  );
}
function ConnectMark() {
  return (
    <Plate viewBox="0 0 160 84" ratio="160 / 84">
      <Ball cx={48} cy={42} rx={30} ry={22} hue="teal" seed={113} count={7} weight={1.3} opacity={0.2} />
      <Halo cx={48} cy={42} rx={30} ry={22} hue="teal" seed={115} laps={2} weight={1.5} opacity={0.55} />
      <Ball cx={106} cy={42} rx={30} ry={22} hue="vermilion" seed={119} count={7} weight={1.3} opacity={0.2} />
      <Halo cx={106} cy={42} rx={30} ry={22} hue="vermilion" seed={121} laps={2} weight={1.5} opacity={0.55} />
    </Plate>
  );
}
function MapMark() {
  const nodes: [number, number, Hue][] = [[34, 26, "cobalt"], [80, 52, "vermilion"], [126, 24, "teal"], [104, 68, "ochre"], [44, 66, "violet"]];
  return (
    <Plate viewBox="0 0 160 84" ratio="160 / 84">
      {nodes.map(([x, y], i) => i < nodes.length - 1 ? (
        <Bow key={`e${i}`} x1={x} y1={y} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]}
          hue="graphite" bend={0.14} seed={127 + i} weight={1.1} opacity={0.36} />
      ) : null)}
      {nodes.map(([x, y, h], i) => (
        <Halo key={i} cx={x} cy={y} rx={11} ry={9} hue={h} seed={131 + i * 7} laps={2} weight={1.5} opacity={0.65} />
      ))}
    </Plate>
  );
}
function ThinkMark() {
  return (
    <Plate viewBox="0 0 160 84" ratio="160 / 84">
      <Stave x1={16} x2={144} y={44} gap={7} seed={137} weight={0.85} opacity={0.34} />
      {[30, 58, 86, 114].map((x, i) => (
        <NoteMark key={i} x={x} y={44 - (i % 2) * 7} seed={900 + i * 37} stemDir={-1} stemLen={16} weight={1.3} opacity={0.66} />
      ))}
      <Slur x1={24} x2={120} y={26} depth={10} hue="violet" seed={139} weight={1.5} opacity={0.7} />
    </Plate>
  );
}

const KEY_TERMS: { label: string; hue: Hue }[] = [
  { label: "Theories", hue: "cobalt" },
  { label: "Evidence", hue: "teal" },
  { label: "Connections", hue: "ochre" },
  { label: "Provenance", hue: "violet" },
  { label: "Questions", hue: "vermilion" },
];

export default function Home() {
  return (
    <>
      <TopNav items={NAV} here="/surface" />
      <main className="sf-shell" id="sf-main">

        {/* ------------------------------------------------------------ hero */}
        <div className="wb-home-hero">
          <div>
            <p className="sf-kicker">A living atlas of theories, connections and questions</p>
            <h1 className="wb-hero-title">
              Academic<br />Concept <em>Lab</em>
            </h1>
            <p className="wb-hero-sub">
              An interactive atlas for seeing, connecting and{" "}
              <Hi c="lemon" seed={9}>thinking with theories.</Hi>
            </p>
            <p className="wb-hero-body">
              Every claim, citation and qualification is typeset with the care a journal
              would give it. Over the top, in colour, is the part a printed page never
              shows you: someone grouping, comparing, connecting, doubting, and going back
              over a reading until it holds.
            </p>
            <Actions
              primary={{ href: "#featured", label: "Explore theories" }}
              secondary={{ href: "#map", label: "View the map" }}
            />
            <Chips items={KEY_TERMS} />
          </div>
          <div>
            <CoverField />
            <p className="sf-cap" style={{ maxWidth: "40ch" }}>
              One line of music, read three ways at once. Where two readings claim the same
              notes the colours genuinely mix — <b>that is the argument, not decoration.</b>
            </p>
          </div>
        </div>

        {/* -------------------------------------------------------- featured */}
        <section id="featured" style={{ paddingTop: "2.4rem" }}>
          <div className="wb-secthead">
            <h2>Explore featured theories</h2>
            <span className="fill" aria-hidden="true" />
            <a className="wb-feature-all note" href="#map" style={{ color: "var(--ink-3)", textDecoration: "none" }}>
              Browse the map →
            </a>
          </div>
          <div className="wb-featured">
            {FEATURED.map((f) => (
              <article className="wb-feature" key={f.href}>
                <p className="wb-col-n">
                  <span style={{ color: `var(--pg-${f.hue})` }}>{f.n}</span>
                </p>
                <h3>{f.title}</h3>
                <p className="it">{f.sub}</p>
                <p>{f.body}</p>
                <div style={{ margin: "1rem 0 0" }}>{f.fig}</div>
                <a className="go" href={f.href}>Explore →</a>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- map */}
        <section id="map" style={{ paddingTop: "2.6rem" }}>
          <div className="wb-secthead">
            <h2>See the bigger picture</h2>
            <span className="fill" aria-hidden="true" />
            <span className="note">different questions. not a ladder.</span>
          </div>
          <div className="wb-record" style={{ paddingTop: ".4rem" }}>
            <div className="wb-rail" aria-hidden="true" />
            <div className="wb-main">
              <p className="sf-lede">
                The atlas is not a chain in which each theory improves on the last. It is a
                handful of different questions, asked by records that stay distinct — and
                the arrows are relations the records themselves state about their
                neighbours.
              </p>
              <Aside hue="graphite">Same ideas. More ways to see them.</Aside>
            </div>
            <aside className="wb-side">
              <KeyIdea>
                Nothing was drawn between two records that do not already{" "}
                <Ul c="teal" seed={31}>claim a connection</Ul>.
              </KeyIdea>
            </aside>
            <div className="wb-full" style={{ marginTop: "1.2rem" }}>
              <div className="sf-scroll"><ConceptMap /></div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ how to read */}
        <section style={{ paddingTop: "1.6rem" }}>
          <div className="wb-secthead">
            <h2>How to explore</h2>
            <span className="fill" aria-hidden="true" />
            <span className="note">different paths. a more connected understanding.</span>
          </div>
          <Columns items={[
            {
              kicker: "discover", head: "Read the record, not a summary", hue: "cobalt",
              body: <p>Every record carries its whole payload — the evidence, the scope,
                the qualifications and the provenance. Nothing is cut to make a page
                shorter.</p>,
              figure: <DiscoverMark />,
              note: "start anywhere",
            },
            {
              kicker: "connect", head: "See where ideas overlap", hue: "teal",
              body: <p>Records state their own relations to their neighbours, and say what
                each connection is <i>for</i>. Two theories can share a subject and still
                ask different questions.</p>,
              figure: <ConnectMark />,
            },
            {
              kicker: "map", head: "Find the shape of a field", hue: "ochre",
              body: <p>The map groups records by the question they ask rather than by
                date. The boundaries are drawn by hand and do not quite close, because
                they are an editorial arrangement.</p>,
              figure: <MapMark />,
              note: "the boundary is a proposal",
            },
            {
              kicker: "think", head: "Mark it up yourself", hue: "violet",
              body: <p>The drawing on every page is one reader thinking out loud. It is
                removable: strip every mark and the scholarship is intact, which is the
                test the whole direction has to pass.</p>,
              figure: <ThinkMark />,
            },
          ]} />
        </section>

        {/* ------------------------------------------------------- apparatus */}
        <section style={{ paddingTop: "2.4rem" }}>
          <div className="wb-secthead">
            <h2>What holds it up</h2>
            <span className="fill" aria-hidden="true" />
            <span className="note">still academic. still rigorous.</span>
          </div>
          <div className="wb-record" style={{ paddingTop: ".4rem" }}>
            <div className="wb-rail" aria-hidden="true" />
            <div className="wb-main">
              <Numbered items={[
                {
                  head: "Evidence stays welded to its method",
                  body: "Each study on a record carries its design, what it tested, what it found — and what it did not test. The last line is the one that gets dropped when a framework is summarised, so it is the one that is never dropped here.",
                },
                {
                  head: "Provenance on every claim",
                  body: "Five classes of claim, marked with the record's own glyphs: source-grounded history, source-grounded findings, constructed teaching examples, editorial synthesis, and what remains debated or under-specified.",
                },
                {
                  head: "Scope, and where it stops",
                  body: "Every record says what it does not explain. A boundary that will not close is the one drawn mark allowed in those quiet sections.",
                },
                {
                  head: "The drawing is never load-bearing",
                  body: "Every mark is inert and hidden from assistive technology. Where a drawing carries an argument, its figure supplies a title, a caption and a full conditions table in type.",
                },
              ]} />
            </div>
            <aside className="wb-side">
              <Pull attrib="Academic Concept Lab" hue="lemon">
                “A theory is not a final answer, but a clearer way of asking questions.”
              </Pull>
              <Aside hue="graphite" rotate={-1.5}>{"Knowledge is a\ndrawing in progress."}</Aside>
            </aside>
          </div>
        </section>
      </main>
      <Foot />
    </>
  );
}

import type { Metadata } from "next";
import { RECORDS } from "../../../content/records";
import { Plate } from "../_components/Pigment";
import type { Hue } from "../_components/Pigment";
import { Ball, Burst, Contour, Field, Halo, Link as Bow, NoteMark, Slur, Squiggle, Stave } from "../_components/Draw";
import { Hi, Ul } from "../_components/Notes";
import { HeadNetwork } from "./_components/Head";

export const metadata: Metadata = {
  title: "Academic Concept Lab",
  description:
    "A living atlas of theories, evidence, methods and people — academic work explained without being flattened, with every claim marked by provenance.",
};

const NAV = [
  { href: "#theories", label: "Theories" },
  { href: "#fields", label: "Fields" },
  { href: "#map", label: "Map" },
  { href: "#about", label: "About" },
];

/* Counts read from the registry rather than written into the page, so the
   numbers cannot drift from what the lab actually holds. */
const KINDS = new Set(RECORDS.map((r) => r.kind));
const DISCIPLINES = new Set(RECORDS.map((r) => r.discipline));

const WAYS: { head: string; body: string; hue: Hue; cta: string; fig: React.ReactNode }[] = [
  {
    head: "Explore Theories", hue: "cobalt", cta: "Browse theories",
    body: "From core ideas to detailed explanations, with examples, connections and key references.",
    fig: <OverlapMark />,
  },
  {
    head: "See the Bigger Picture", hue: "emerald", cta: "Open the map",
    body: "Explore our concept map to discover unexpected connections across fields.",
    fig: <NetworkMark />,
  },
  {
    head: "Follow the Evidence", hue: "vermilion", cta: "Explore evidence",
    body: "See how claims are supported, contested and developed across time.",
    fig: <StackMark />,
  },
  {
    head: "Make New Connections", hue: "violet", cta: "Learn more",
    body: "Bring ideas together, compare perspectives and find new ways of thinking.",
    fig: <FramesMark />,
  },
];

/* Four small marks, one per way in. Each is the shape of the thing it stands
   for: overlapping fields, a network, a stack of evidence, two frames brought
   together. */
function OverlapMark() {
  return (
    <Plate viewBox="0 0 150 96" ratio="150 / 96">
      {([["cobalt", 52, 40], ["lemon", 92, 36], ["vermilion", 62, 64], ["teal", 100, 62]] as [Hue, number, number][])
        .map(([h, x, y], i) => (
          <g key={i}>
            <Ball cx={x} cy={y} rx={26} ry={22} hue={h} seed={11 + i * 29} count={9} weight={1.3} opacity={0.26} />
            <Halo cx={x} cy={y} rx={26} ry={22} hue={h} seed={17 + i * 29} laps={2} weight={1.3} opacity={0.5} />
          </g>
        ))}
    </Plate>
  );
}
function NetworkMark() {
  const nodes: [number, number, Hue][] = [
    [30, 30, "cobalt"], [74, 20, "vermilion"], [116, 38, "emerald"],
    [46, 68, "lemon"], [92, 74, "violet"], [122, 66, "graphite"],
  ];
  return (
    <Plate viewBox="0 0 150 96" ratio="150 / 96">
      {nodes.map(([x, y], i) => i < nodes.length - 1 ? (
        <Bow key={`e${i}`} x1={x} y1={y} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]}
          hue="graphite" bend={0.12} seed={31 + i * 7} weight={1} opacity={0.34} />
      ) : null)}
      <Bow x1={30} y1={30} x2={92} y2={74} hue="graphite" bend={-0.12} seed={53} weight={1} opacity={0.3} />
      {nodes.map(([x, y, h], i) => (
        <Halo key={i} cx={x} cy={y} rx={7.5} ry={6.5} hue={h} seed={61 + i * 11} laps={2} weight={1.4} opacity={0.72} />
      ))}
    </Plate>
  );
}
function StackMark() {
  const hues: Hue[] = ["cobalt", "vermilion", "lemon", "emerald", "violet"];
  return (
    <Plate viewBox="0 0 150 96" ratio="150 / 96">
      {hues.map((h, i) => {
        const y = 74 - i * 12;
        const w = 96 - Math.abs(i - 2) * 7;
        return (
          <g key={i}>
            <Field x={30} y={y - 8} w={w} h={11} hue={h} seed={101 + i * 23} passes={5} rows={5} angle={-4} weight={0.26} width={1.3} taper={0.16} />
            <Contour points={[[30, y - 9], [30 + w, y - 9], [30 + w, y + 3], [30, y + 3]]}
              hue="graphite" seed={131 + i * 13} weight={1} opacity={0.42} wobble={1.4} />
          </g>
        );
      })}
    </Plate>
  );
}
function FramesMark() {
  return (
    <Plate viewBox="0 0 150 96" ratio="150 / 96">
      <Field x={26} y={22} w={58} h={50} hue="cobalt" seed={201} passes={7} rows={7} angle={-14} weight={0.2} width={1.4} />
      <Contour points={[[26, 22], [84, 22], [84, 72], [26, 72]]} hue="cobalt" seed={211} weight={1.4} opacity={0.55} wobble={2} />
      <Field x={62} y={34} w={58} h={50} hue="vermilion" seed={221} passes={7} rows={7} angle={16} weight={0.2} width={1.4} />
      <Contour points={[[62, 34], [120, 34], [120, 84], [62, 84]]} hue="vermilion" seed={231} weight={1.4} opacity={0.55} wobble={2} />
    </Plate>
  );
}

export default function AtlasHome() {
  return (
    <div className="hm">
      {/* ------------------------------------------------------------- nav */}
      <header className="hm-nav">
        <div className="hm-nav-in">
          <a className="hm-brand" href="/surface/home">
            <span aria-hidden="true">
              <svg viewBox="-14 -14 28 28" width="20" height="20" focusable="false">
                <path d="M0-13C1.6-4.6 4.6-1.6 13 0 4.6 1.6 1.6 4.6 0 13c-1.6-8.4-4.6-11.4-13-13 8.4-1.6 11.4-4.6 13-13Z"
                  fill="var(--pg-vermilion)" fillOpacity="0.94" />
              </svg>
            </span>
            Academic Concept Lab
          </a>
          <nav aria-label="Sections">
            {NAV.map((n) => (<a key={n.href} href={n.href}>{n.label}</a>))}
          </nav>
          <form className="hm-search" role="search">
            <span aria-hidden="true">
              <svg viewBox="0 0 20 20" width="15" height="15" focusable="false" fill="none"
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <circle cx="8.6" cy="8.6" r="5.6" /><path d="M12.8 12.8 17 17" />
              </svg>
            </span>
            <input type="search" placeholder="Search theories, concepts, people …" aria-label="Search the atlas" />
          </form>
          <span className="hm-tagline" aria-hidden="true">
            Ideas, drawn together.
            <svg viewBox="0 0 150 8" focusable="false">
              <path d="M3 5C34 2 78 6 147 3" stroke="var(--pg-vermilion)" strokeWidth="1.8"
                strokeOpacity=".8" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </header>

      <main className="hm-shell" id="hm-main">
        {/* ------------------------------------------------------------ hero */}
        <section className="hm-hero">
          <div className="hm-hero-copy">
            <p className="hm-eyebrow">A living atlas of theories, evidence, methods and people</p>
            <h1 className="hm-title">Academic<br />Concept Lab</h1>
            <p className="hm-sub">
              Theory, evidence and method — <Ul c="cobalt" seed={5}>drawn out</Ul> until you can{" "}
              <Hi c="lemon" seed={7}>actually see them.</Hi>
            </p>
            <p className="hm-body">
              We explore key concepts, theories and methods across disciplines, showing how
              they connect, how they are supported by evidence, and who has developed them.
              Academic work is explained without being flattened, with claims clearly marked
              by provenance.
            </p>

            <dl className="hm-stats">
              <div>
                <dt>{RECORDS.length}</dt>
                <dd><b>Records</b><span>theories, studies, methods &amp; mechanisms</span></dd>
              </div>
              <div>
                <dt>{KINDS.size}</dt>
                <dd><b>Kinds</b><span>theory, method, evidence, mechanism</span></dd>
              </div>
              <div>
                <dt>{DISCIPLINES.size}</dt>
                <dd><b>Disciplines</b><span>from psychology to philosophy</span></dd>
              </div>
            </dl>

            <div className="hm-cta">
              <a className="hm-btn" href="#theories">Enter the atlas <span aria-hidden="true">→</span></a>
              <span className="hm-cta-note" aria-hidden="true">
                A clearer way<br />to explore<br />academic ideas.
                <svg viewBox="0 0 130 8" focusable="false">
                  <path d="M3 5C30 2 78 7 127 3" stroke="var(--pg-cobalt)" strokeWidth="1.6"
                    strokeOpacity=".7" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>

          <div className="hm-hero-fig">
            <HeadNetwork />
            <p className="hm-figcap" aria-hidden="true">Knowledge is a shared canvas.</p>
          </div>
        </section>

        {/* --------------------------------------------------------- ways in */}
        <section className="hm-ways" id="theories">
          {WAYS.map((w) => (
            <article className="hm-way" key={w.head}>
              <div className="hm-way-fig">{w.fig}</div>
              <div>
                <h2>{w.head}</h2>
                <p>{w.body}</p>
                <a className="hm-go" href="#map">{w.cta} <span aria-hidden="true">→</span></a>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="hm-foot">
        <div className="hm-foot-in">
          <span className="hm-foot-brand">Academic Concept Lab</span>
          <span className="hm-rule" aria-hidden="true" />
          <span className="hm-foot-nav">Think / Connect / See theories / A more visible academic world</span>
          <span className="hm-foot-note" aria-hidden="true">
            Curiosity connects.
            <svg viewBox="0 0 150 8" focusable="false">
              <path d="M3 5C36 1 84 7 147 3" stroke="var(--pg-vermilion)" strokeWidth="1.8"
                strokeOpacity=".8" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </footer>
    </div>
  );
}

import type { Metadata } from "next";
import { Foot, Frayed, Masthead, Status } from "../_components/Shell";
import {
  Erased, Hand, Label, Line, Mass, OpenArc, PartialBound, Plate, Smudge, Stipple, Trace,
} from "../_components/Pigment";
import type { Hue } from "../_components/Pigment";

export const metadata: Metadata = {
  title: "Conventions",
  description:
    "How to read a page on the working surface: what each kind of mark does, what the registers mean, and the four things no mark is allowed to mean.",
};

/* The pigments, named for how each sits in the mass. The order is the order a
   hand reaches for them, not a scale, a ranking, or a key. */
const PIGMENTS: { hue: Hue; name: string; behaviour: string }[] = [
  { hue: "cobalt", name: "Cobalt", behaviour: "holds an edge; stays legible under three other pigments" },
  { hue: "sky", name: "Sky", behaviour: "thins to almost nothing; good for a reading that is only proposed" },
  { hue: "teal", name: "Teal", behaviour: "even in the mass; the workhorse for a span that has to stay readable" },
  { hue: "emerald", name: "Emerald", behaviour: "goes dark quickly when crossed with itself" },
  { hue: "lemon", name: "Lemon", behaviour: "almost disappears alone; changes everything it is laid over" },
  { hue: "ochre", name: "Ochre", behaviour: "warm and opaque; the natural opponent to a cool span" },
  { hue: "orange", name: "Orange", behaviour: "loud at low pressure, so it is used at low pressure" },
  { hue: "vermilion", name: "Vermilion", behaviour: "the strongest claim available; reserved, never structural" },
  { hue: "coral", name: "Coral", behaviour: "vermilion's quieter form, for a second pass over the same span" },
  { hue: "magenta", name: "Magenta", behaviour: "cuts across warm and cool alike; used to separate, not to rank" },
  { hue: "violet", name: "Violet", behaviour: "reads as depth rather than as a hue; sits under other marks well" },
  { hue: "lilac", name: "Lilac", behaviour: "the lightest deposit that still registers as colour" },
  { hue: "sand", name: "Sand", behaviour: "barely a colour; carries a residue without asserting one" },
  { hue: "warmgrey", name: "Warm grey", behaviour: "the rub; softens an edge and moves colour into open space" },
  { hue: "graphite", name: "Graphite", behaviour: "annotation, leader lines, brackets — the reader's own hand" },
  { hue: "charcoal", name: "Charcoal", behaviour: "the deposited event itself; never a field" },
];

const REGISTERS = [
  {
    key: "ignition",
    what: "The record's opening problem.",
    does: "The drawing column is wider than the measure. Pigment is at its densest, and the figure here is the one that states what the record is about.",
  },
  {
    key: "working",
    what: "Where the argument is being made.",
    does: "Measure and drawing are close to balanced. Figures carry claims and are accompanied by a full conditions table in type.",
  },
  {
    key: "reading",
    what: "Consolidation, terminology, lineage.",
    does: "The measure widens and the drawing narrows to marginal notes. Colour thins out. Some sections here carry no drawing at all.",
  },
  {
    key: "quiet",
    what: "Evidence, scope, provenance, sources.",
    does: "The drawing column becomes an apparatus rail. Colour is dropped almost entirely — but the grid, the faces and the rail are unchanged. Quiet is not generic.",
  },
];

const FORBIDDEN = [
  {
    title: "Density never means certainty",
    body: "A darker field is more worked, not more true, more probable, more replicated, or more brain. Wherever two conditions must be told apart, they are told apart by how the marks behave — spread, direction, interruption — and not by how dark they are.",
  },
  {
    title: "Hue never encodes a class",
    body: "No claim class, record kind, evidence status, provenance glyph or confidence level is carried by colour. The same pigment does different work on different plates, and a plate may reuse one pigment for two unrelated things.",
  },
  {
    title: "A drawing never adds a finding",
    body: "Every figure is generated from the arrays and values already in content/. Where a stimulus is held constant across conditions, the mark is generated from one seed and instanced, so it is mechanically identical rather than merely similar.",
  },
  {
    title: "No mark is load-bearing",
    body: "Every decorative mark is inert and hidden from assistive technology. Where a drawing carries an argument, its figure supplies a title, a caption, and a conditions table in type. Switch the drawing off and the scholarship is intact.",
  },
];

function Swatch({ hue, seed }: { hue: Hue; seed: number }) {
  return (
    <Plate viewBox="0 0 150 96" ratio="150 / 96">
      <Mass weight={2.1} x={8} y={8} w={134} h={80} hue={hue} angles={[-24, 32]} gap={1.72}
        pressure={[0.3, 0.72]} broken={0.3} rework={0.4} coverage={0.36} seed={seed} max={930} />
    </Plate>
  );
}

const BEHAVIOURS: { name: string; note: string; plate: React.ReactNode }[] = [
  {
    name: "Accumulation",
    note: "One pigment gone over again. The second pass crosses the first at a different angle — that is what makes depth, not a darker colour.",
    plate: (
      <Plate viewBox="0 0 220 120" ratio="220 / 120">
        <Mass weight={2.1} x={12} y={20} w={58} h={80} hue="cobalt" angles={[-22]} gap={1.85} pressure={[0.26, 0.6]} broken={0.3} rework={0.2} coverage={0.4} seed={11} max={450} />
        <Mass weight={2.1} x={82} y={20} w={58} h={80} hue="cobalt" angles={[-22, 34]} gap={1.85} pressure={[0.28, 0.66]} broken={0.3} rework={0.35} coverage={0.4} seed={11} max={720} />
        <Mass weight={2.1} x={152} y={20} w={58} h={80} hue="cobalt" angles={[-22, 34, 78]} gap={1.85} pressure={[0.3, 0.7]} broken={0.3} rework={0.45} coverage={0.4} seed={11} max={960} />
        <Label x={41} y={112} hue="warmgrey" size={7} anchor="middle">one pass</Label>
        <Label x={111} y={112} hue="warmgrey" size={7} anchor="middle">two</Label>
        <Label x={181} y={112} hue="warmgrey" size={7} anchor="middle">three</Label>
      </Plate>
    ),
  },
  {
    name: "Overlap",
    note: "Two pigments claiming one span. They multiply rather than cover, so where two readings agree the mark genuinely darkens — and where only one reaches, it stays its own colour.",
    plate: (
      <Plate viewBox="0 0 220 120" ratio="220 / 120">
        <Mass weight={2.1} x={16} y={26} w={124} h={64} hue="teal" angles={[-20, 30]} gap={1.78} pressure={[0.28, 0.64]} broken={0.32} rework={0.35} coverage={0.4} seed={41} max={780} />
        <Mass weight={2.1} x={82} y={38} w={124} h={64} hue="ochre" angles={[26, -34]} gap={1.78} pressure={[0.28, 0.62]} broken={0.32} rework={0.35} coverage={0.4} seed={73} max={780} />
      </Plate>
    ),
  },
  {
    name: "Residue",
    note: "A reading that was revised. The earlier mark keeps a broken skeleton and a rub across it. Used only where the page says a reading changed — never to mean that something was wrong.",
    plate: (
      <Plate viewBox="0 0 220 120" ratio="220 / 120">
        <Erased x={20} y={26} w={110} h={62} hue="graphite" seed={97} />
        <Mass weight={2.1} x={104} y={34} w={92} h={54} hue="violet" angles={[-18, 36]} gap={1.78} pressure={[0.28, 0.64]} broken={0.3} rework={0.35} coverage={0.4} seed={131} max={630} />
      </Plate>
    ),
  },
  {
    name: "Partial boundary",
    note: "A bound with one side left unstated. Wherever one appears, the type beside it says what the missing edge means — the gap is a claim about defeasibility, not a rendering accident.",
    plate: (
      <Plate viewBox="0 0 220 120" ratio="220 / 120">
        <Mass weight={2.1} x={30} y={30} w={110} h={58} hue="sky" angles={[-24, 28]} gap={1.98} pressure={[0.22, 0.5]} broken={0.4} rework={0.3} coverage={0.36} seed={167} shape="blob" max={570} />
        <PartialBound x={22} y={22} w={150} h={76} open="right" hue="graphite" seed={181} dash="6 6" />
        <Hand x={186} y={64} hue="graphite" size={13}>open</Hand>
      </Plate>
    ),
  },
  {
    name: "The rub",
    note: "Pigment moved rather than laid. Wide, very low-pressure passes with no crossing stroke. It softens an edge and carries colour into open space without ever reading as a second deposit.",
    plate: (
      <Plate viewBox="0 0 220 120" ratio="220 / 120">
        <Smudge x={20} y={26} w={180} h={66} hue="warmgrey" seed={211} strength={0.16} angle={-9} />
        <Mass weight={2.1} x={30} y={40} w={70} h={44} hue="coral" angles={[-20, 32]} gap={1.85} pressure={[0.28, 0.62]} broken={0.3} rework={0.35} coverage={0.4} seed={223} shape="blob" max={450} />
      </Plate>
    ),
  },
  {
    name: "Counting",
    note: "Discrete deposits, used only where a record's own language is counting. Never as texture, and never to suggest a quantity the record does not state.",
    plate: (
      <Plate viewBox="0 0 220 120" ratio="220 / 120">
        <Stipple x={24} y={30} w={80} h={58} count={9} hue="graphite" seed={251} opacity={0.7} />
        <Stipple x={120} y={30} w={80} h={58} count={27} hue="graphite" seed={269} opacity={0.7} />
        <Label x={64} y={104} hue="warmgrey" size={7} anchor="middle">nine</Label>
        <Label x={160} y={104} hue="warmgrey" size={7} anchor="middle">twenty-seven</Label>
      </Plate>
    ),
  },
];

export default function Conventions() {
  return (
    <>
      <Masthead here="/surface/conventions" />
      <main className="sf-shell" id="sf-main">
        <Status
          items={[
            ["Reference", "How to read a page"],
            ["Applies to", "Every plate on this surface"],
            ["Status", "Visual exploration — not production"],
          ]}
        />

        <section className="sf-band" data-register="ignition">
          <div className="sf-rail" aria-hidden="true">
            <div className="sf-num">00</div>
            <div className="sf-reg">reference</div>
          </div>
          <div className="sf-text">
            <p className="sf-kicker">Conventions</p>
            <h1 className="sf-title" style={{ fontSize: "clamp(2.6rem, 6vw, 4.4rem)" }}>
              What a mark is <em>allowed</em> to mean
            </h1>
            <p className="sf-sub">
              A material language is useful because it is readable at a glance. That is
              also its hazard: a reader will take a darker field as a stronger finding
              unless the system refuses to work that way.
            </p>
            <p className="sf-hook">
              This page states the refusals. Everything below governs every plate on the
              surface, and the plates were composed around these constraints rather than
              having them applied afterwards.
            </p>
          </div>
          <div className="sf-think">
            <Plate viewBox="0 0 400 260" ratio="400 / 260">
              <Mass weight={2.1} x={30} y={40} w={180} h={120} hue="cobalt" angles={[-22, 30]} gap={1.78} pressure={[0.28, 0.66]} broken={0.32} rework={0.4} coverage={0.36} seed={301} max={1050} />
              <Mass weight={2.1} x={150} y={80} w={190} h={130} hue="vermilion" angles={[28, -36]} gap={1.78} pressure={[0.26, 0.62]} broken={0.34} rework={0.4} coverage={0.36} seed={347} max={1050} />
              <Mass weight={2.1} x={90} y={120} w={170} h={110} hue="ochre" angles={[-8, 52]} gap={1.91} pressure={[0.24, 0.56]} broken={0.36} rework={0.35} coverage={0.36} seed={389} shape="blob" max={930} />
              <Trace points={[[262, 60], [318, 44], [356, 62]]} hue="graphite" laps={2} weight={1.1} opacity={0.55} seed={401} />
              <Hand x={300} y={34} hue="graphite" size={15} anchor="middle">this is not a scale</Hand>
            </Plate>
            <p className="sf-cap">
              Three pigments over one region. The darkest area is simply where the most
              passes fell — <b>it is not the most certain, the most supported, or the
              most important part of the figure.</b>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------ pigments */}
        <section className="sf-band" data-register="working" id="pigments">
          <div className="sf-rail" aria-hidden="true">
            <div className="sf-num">01</div>
            <div className="sf-reg">material</div>
          </div>
          <div className="sf-wide">
            <h2 className="sf-h">The pigments</h2>
            <p className="sf-lede" style={{ maxWidth: "48ch" }}>
              Named for how each behaves in the mass, not for what it means. Reading down
              this list tells you nothing about the records — it tells you what happens
              when a pigment is crossed with itself or laid under another.
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(11rem, 1fr))",
              gap: "1.6rem 1.4rem", marginTop: "1.8rem",
            }}>
              {PIGMENTS.map((p, i) => (
                <div key={p.hue}>
                  <Swatch hue={p.hue} seed={17 + i * 31} />
                  <h4 style={{
                    font: "600 .62rem/1.4 var(--sf-instrument), system-ui, sans-serif",
                    letterSpacing: ".14em", textTransform: "uppercase",
                    margin: ".55rem 0 .15rem", color: "var(--ink)",
                  }}>{p.name}</h4>
                  <p style={{
                    margin: 0, font: "italic .82rem/1.4 var(--sf-newsreader), Georgia, serif",
                    color: "var(--ink-3)",
                  }}>{p.behaviour}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- behaviours */}
        <section className="sf-band" data-register="working" id="behaviours">
          <div className="sf-rail" aria-hidden="true">
            <div className="sf-num">02</div>
            <div className="sf-reg">behaviour</div>
          </div>
          <div className="sf-wide">
            <h2 className="sf-h">What the marks do</h2>
            <p className="sf-lede" style={{ maxWidth: "48ch" }}>
              Six behaviours, and nothing else. A vocabulary that can render anything in
              any way renders nothing legibly.
            </p>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))",
              gap: "2rem 2.2rem", marginTop: "1.8rem",
            }}>
              {BEHAVIOURS.map((b) => (
                <div key={b.name}>
                  {b.plate}
                  <h4 style={{
                    font: "600 .62rem/1.4 var(--sf-instrument), system-ui, sans-serif",
                    letterSpacing: ".14em", textTransform: "uppercase",
                    margin: ".7rem 0 .3rem", color: "var(--ink)",
                  }}>{b.name}</h4>
                  <p className="sf-cap" style={{ margin: 0 }}>{b.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- registers */}
        <section className="sf-band" data-register="reading" id="registers">
          <div className="sf-rail" aria-hidden="true">
            <div className="sf-num">03</div>
            <div className="sf-reg">rhythm</div>
          </div>
          <div className="sf-text">
            <h2 className="sf-h">The four registers</h2>
            <p className="sf-lede">
              A section declares a register, and the register moves the spine itself —
              not only the amount of colour. The page changes shape as the argument
              changes temperature.
            </p>
            <div className="sf-terms">
              {REGISTERS.map((r) => (
                <div className="sf-term" key={r.key}>
                  <div style={{
                    width: "1.1rem", height: "2px", marginTop: ".72rem",
                    background: r.key === "ignition" ? "var(--pg-vermilion)"
                      : r.key === "working" ? "var(--pg-cobalt)"
                      : r.key === "reading" ? "var(--pg-warmgrey)" : "var(--ink-4)",
                  }} aria-hidden="true" />
                  <div>
                    <h4>{r.key}</h4>
                    <p><i>{r.what}</i> {r.does}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sf-think">
            <div className="sf-margin">
              <div className="sf-mnote">
                <h4>Where the rail is</h4>
                The number and the register name sit in the left rail on every band, in
                the machinery voice. The publication&rsquo;s own bookkeeping is kept
                visibly separate from its argument.
              </div>
              <div className="sf-mhand">Quiet does not mean generic.</div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- refusals */}
        <section className="sf-band" data-register="quiet" id="refusals">
          <div className="sf-rail" aria-hidden="true">
            <div className="sf-num">04</div>
            <div className="sf-reg">quiet</div>
          </div>
          <div className="sf-text">
            <h2 className="sf-h">Four things no mark may mean</h2>
            <Frayed hue="vermilion" seed={457} width={300} />
            <div className="sf-terms">
              {FORBIDDEN.map((f, i) => (
                <div className="sf-term" key={f.title}>
                  <span style={{
                    font: "600 .62rem/1.6 var(--sf-instrument), system-ui, sans-serif",
                    color: "var(--ink-4)", fontVariantNumeric: "tabular-nums",
                  }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="sf-note">
              <b>The acceptance test.</b> Disable every element with class{" "}
              <code style={{ fontSize: ".92em" }}>sf-mass</code>,{" "}
              <code style={{ fontSize: ".92em" }}>sf-mark</code> and{" "}
              <code style={{ fontSize: ".92em" }}>sf-smudge</code> and read the page. If a
              claim, a citation, a condition, a boundary or a qualification has gone
              missing, the plate is wrong — not the test.
            </p>
          </div>
          <div className="sf-think">
            <Plate viewBox="0 0 260 140" ratio="260 / 140">
              <OpenArc cx={130} cy={70} rx={104} ry={46} from={-2.5} to={1.9} hue="graphite" weight={1.1} opacity={0.45} seed={491} dash="7 6" />
              <Line x1={40} y1={104} x2={220} y2={104} hue="warmgrey" weight={0.9} laps={1} opacity={0.35} seed={499} />
              <Hand x={130} y={76} hue="graphite" size={15} anchor="middle">the drawing can go</Hand>
            </Plate>
          </div>
        </section>
      </main>
      <Foot />
    </>
  );
}

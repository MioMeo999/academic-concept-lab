import Link from "next/link";
import { RECORDS } from "@/content/records";
import { Banner, Divider, Icon } from "./_components/Sketch";
import { RecordCard } from "./_components/RecordCard";

export default function ConceptLabHome() {
  return (
    <div className="wrap">
      <section className="hero">
        <Banner>
          <h1 className="title">Academic Concept&nbsp;Lab</h1>
        </Banner>
        <p className="tagline">
          Theory, evidence and method — <span className="hl">drawn out</span> until you can actually see them.
        </p>
        <p className="lede" style={{ marginTop: "1rem" }}>
          Three kinds of record, each designed for what it actually is: a theory to understand, a study to weigh, a method to practise. Nothing here is invented —
          every claim carries a mark saying where it came from.
        </p>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.2rem" }}>
          <Link href="/concept-lab/library" className="chip red" style={{ textDecoration: "none", fontSize: ".9rem", padding: ".5rem .9rem" }}>
            Browse the library
          </Link>
          <Link href="/concept-lab/about" className="chip grey" style={{ textDecoration: "none", fontSize: ".9rem", padding: ".5rem .9rem" }}>
            How we cite
          </Link>
        </div>
      </section>

      <Divider />

      <section>
        <span className="k">three kinds of record</span>
        <div className="grid3" style={{ marginTop: ".8rem" }}>
          <div className="sk-box teal tilt-l2">
            <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
              <Icon id="i-door" style={{ width: 30, height: 30, color: "var(--teal)" }} />
              <h3 style={{ fontSize: "1.1rem", color: "var(--teal)" }}>A theory is a lens</h3>
            </div>
            <p className="read" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".5rem" }}>
              Nothing in it happened. No sample, no date, no result — just a claim about how two things relate. So its page has to <b>demonstrate</b> rather than report:
              models you can push, and origins laid out as a trail rather than a citation list.
            </p>
          </div>
          <div className="sk-box red tilt-r2">
            <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
              <Icon id="i-eye" style={{ width: 30, height: 30, color: "var(--red)" }} />
              <h3 style={{ fontSize: "1.1rem", color: "var(--red)" }}>A study is an argument</h3>
            </div>
            <p className="read" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".5rem" }}>
              Everything in it happened once, to particular people, in one place — and it could be wrong. So its page keeps method welded to finding: design and sample
              beside every result, a verdict on every claim, eliminated explanations shown rather than buried.
            </p>
          </div>
          <div className="sk-box gold tilt-l2">
            <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
              <Icon id="i-person" style={{ width: 30, height: 30, color: "var(--gold-deep)" }} />
              <h3 style={{ fontSize: "1.1rem", color: "var(--gold-deep)" }}>A method is a practice</h3>
            </div>
            <p className="read" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".5rem" }}>
              You do not learn one by reading about it — competence comes from doing it on real material. So its page has to work <b>at the desk</b>: a procedure you can
              follow, the analytic pass itself, and an audit you can run against your own draft.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "clamp(1.4rem,3.6vw,1.9rem)" }}>In the library</h2>
          <Link href="/concept-lab/library" style={{ fontSize: ".92rem" }}>See all {RECORDS.length} records →</Link>
        </div>
        <div className="lib">
          {RECORDS.slice(0, 4).map((r) => (
            <RecordCard record={r} key={r.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

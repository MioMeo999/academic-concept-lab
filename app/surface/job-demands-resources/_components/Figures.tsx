/**
 * Job Demands–Resources — the drawings.
 *
 * Neither of the music plates' shapes fits this record. Gestalt is built out of
 * overlap and Tonal Hierarchy around one held mark; JD–R is built out of a
 * **fork**. One set of working conditions sorts into two categories, those set
 * off two processes that run in parallel and never merge, and the two arrive at
 * opposite outcomes. So the page is built on two lanes.
 *
 * The armature is a pair of ruled lanes. Loose marks only read as drawing when
 * something underneath is holding them — a ring with nothing to sit against is
 * scribble; the same ring on a lane is a step in a process.
 *
 * Colour does one job here and states it plainly: the two lanes have to be told
 * apart at a glance, so they are given two pigments. Nothing else on the page
 * encodes anything by hue.
 */

import { Plate } from "../../_components/Pigment";
import {
  Arrow, Burst, Contour, Field, Halo, Link, Marker, Note, Rule, Squiggle, Tag, Term,
} from "../../_components/Draw";
import type { Hue } from "../../_components/Pigment";

type Pathway = { title: string; colour: string; blurb: string; steps: string[] };

/** A step on a lane: a wash, one clean ring, and the words inside it. */
function Step({
  cx, cy, rx, ry, hue, seed, children, lead = false,
}: { cx: number; cy: number; rx: number; ry: number; hue: Hue; seed: number; children: string; lead?: boolean }) {
  return (
    <g>
      <Field x={cx - rx * 0.84} y={cy - ry * 0.74} w={rx * 1.68} h={ry * 1.48} hue={hue}
        seed={seed} passes={7} rows={8} angle={-14} weight={lead ? 0.19 : 0.12} width={1.4} taper={0.36} />
      <Halo cx={cx} cy={cy} rx={rx} ry={ry} hue={hue} seed={seed + 31} laps={2}
        weight={lead ? 1.9 : 1.6} opacity={lead ? 0.75 : 0.58} />
      <foreignObject x={cx - rx + 6} y={cy - ry + 5} width={rx * 2 - 12} height={ry * 2 - 10}>
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{
            margin: 0, textAlign: "center",
            font: `${lead ? 560 : 420} ${lead ? 13 : 11.5}px/1.24 var(--sf-newsreader), Georgia, serif`,
            color: "var(--ink)",
          }}>{children}</p>
        </div>
      </foreignObject>
    </g>
  );
}

/* ---------------------------------------------- figure 1 — the two processes */

/**
 * Figure 1. The fork, and the two processes that follow it.
 *
 * Both lanes are drawn identically — same ring, same wash, same spacing —
 * because the record's claim is that these are two processes of the same
 * standing, not a main effect and a side effect.
 */
export function TwoProcesses({ pathways }: { pathways: Pathway[] }) {
  const LANES = [
    { y: 96, hue: "vermilion" as const, seed: 1100 },
    { y: 300, hue: "teal" as const, seed: 1700 },
  ];
  const SRC = { x: 92, y: 198 };
  const xs = [268, 434, 600, 768];

  return (
    <Plate viewBox="0 0 900 420" ratio="900 / 420"
      title="Job Demands–Resources as a fork. Working conditions sort into two categories; each sets off its own process, drawn as a lane of four steps. The upper lane runs from high job demands through sustained effort to exhaustion and health complaints; the lower runs from job resources through motivation to engagement and performance. The two lanes never merge.">

      {/* The armature: one ruled lane per process. */}
      {LANES.map((ln, i) => (
        <Rule key={i} x1={200} y1={ln.y + 62} x2={866} y2={ln.y + 62} hue="warmgrey"
          seed={1000 + i} weight={1} opacity={0.22} />
      ))}

      {/* The source, and the fork out of it. */}
      <Step cx={SRC.x} cy={SRC.y} rx={72} ry={40} hue="cobalt" seed={1001} lead>
        Working conditions
      </Step>
      {LANES.map((ln, i) => (
        <Arrow key={i} x1={SRC.x + 62} y1={SRC.y + (i ? 26 : -26)} x2={xs[0] - 78} y2={ln.y + (i ? -8 : 8)}
          hue={ln.hue} bend={i ? 0.16 : -0.16} seed={1010 + i * 7} weight={1.9} opacity={0.62} size={10} />
      ))}

      {LANES.map((ln, li) => {
        const p = pathways[li];
        if (!p) return null;
        return (
          <g key={li}>
            {p.steps.slice(0, 4).map((s, i) => (
              <g key={i}>
                <Step cx={xs[i]} cy={ln.y} rx={72} ry={38} hue={ln.hue} seed={ln.seed + i * 53} lead={i === 0}>
                  {s}
                </Step>
                {i < 3 ? (
                  <Arrow x1={xs[i] + 74} y1={ln.y} x2={xs[i + 1] - 76} y2={ln.y}
                    hue={ln.hue} bend={li ? -0.1 : 0.1} seed={ln.seed + 200 + i * 11}
                    weight={1.8} opacity={0.58} size={9} />
                ) : null}
              </g>
            ))}
            <Tag x={200} y={ln.y - 58} hue={ln.hue} size={9}>{p.title}</Tag>
            <Squiggle x={200} y={ln.y - 52} len={128} hue={ln.hue} seed={ln.seed + 401}
              cycles={4} amp={2.2} weight={1.4} opacity={0.5} />
          </g>
        );
      })}

      <Burst cx={846} cy={54} r={13} hue="lemon" seed={1501} rays={7} weight={1.7} opacity={0.85} />
      <Note x={614} y={40} hue="graphite" size={17}>{"one job. two processes."}</Note>
      <Note x={614} y={392} hue="graphite" size={17}>{"they run in parallel — they do not cancel."}</Note>
    </Plate>
  );
}

/* ------------------------------------------ figure 2 — the crossing effects */

/**
 * Figure 2. The two interaction hypotheses, which are the only place the lanes
 * touch. Buffering runs down: resources weaken the demands→strain link.
 * Boosting runs up: high demands are what make resources matter most.
 *
 * The arrows deliberately land on a *link* rather than on a node, because both
 * hypotheses are claims about a relationship, not about a quantity.
 */
export function Crossing({ interactions }: { interactions: { kicker: string; title: string; body: string }[] }) {
  const TOP = 92;
  const BOT = 268;

  return (
    <Plate viewBox="0 0 780 380" ratio="780 / 380"
      title="The two interaction hypotheses. Buffering: job resources weaken the link between demands and strain, so the demands are unchanged but cost less. Boosting: resources matter most when demands are high, so the demands are what give resources something to act on. Both arrows land on a link rather than on a node, because each is a claim about a relationship.">

      <Rule x1={60} y1={TOP + 56} x2={720} y2={TOP + 56} hue="warmgrey" seed={2001} weight={1} opacity={0.2} />
      <Rule x1={60} y1={BOT + 56} x2={720} y2={BOT + 56} hue="warmgrey" seed={2003} weight={1} opacity={0.2} />

      <Step cx={158} cy={TOP} rx={74} ry={36} hue="vermilion" seed={2100} lead>Job demands</Step>
      <Step cx={470} cy={TOP} rx={74} ry={36} hue="vermilion" seed={2140}>Strain</Step>
      <Arrow x1={234} y1={TOP} x2={392} y2={TOP} hue="vermilion" bend={0.1} seed={2160} weight={1.9} opacity={0.6} size={9} />

      <Step cx={158} cy={BOT} rx={74} ry={36} hue="teal" seed={2200} lead>Job resources</Step>
      <Step cx={470} cy={BOT} rx={74} ry={36} hue="teal" seed={2240}>Engagement</Step>
      <Arrow x1={234} y1={BOT} x2={392} y2={BOT} hue="teal" bend={-0.1} seed={2260} weight={1.9} opacity={0.6} size={9} />

      {/* Buffering: up from resources onto the demands→strain link. */}
      <Arrow x1={220} y1={BOT - 42} x2={306} y2={TOP + 26} hue="teal" bend={0.2} seed={2300}
        weight={1.9} opacity={0.7} size={10} />
      <Halo cx={313} cy={TOP + 4} rx={26} ry={20} hue="teal" seed={2320} laps={2} weight={1.5} opacity={0.55} />
      <Note x={228} y={BOT - 62} hue="teal" size={17}>{"buffering"}</Note>

      {/* Boosting: down from demands onto the resources→engagement link. */}
      <Arrow x1={220} y1={TOP + 44} x2={306} y2={BOT - 26} hue="vermilion" bend={-0.2} seed={2340}
        weight={1.9} opacity={0.7} size={10} />
      <Halo cx={313} cy={BOT - 4} rx={26} ry={20} hue="vermilion" seed={2360} laps={2} weight={1.5} opacity={0.55} />
      <Note x={228} y={BOT + 74} hue="vermilion" size={17}>{"boosting"}</Note>

      <Contour points={[[286, TOP - 22], [346, TOP - 12], [352, BOT + 18], [284, BOT + 26]]}
        hue="graphite" seed={2400} weight={1.3} opacity={0.3} dash="9 8" wobble={3} />
      <Note x={562} y={182} hue="graphite" size={17}>{"the arrows land on\na link, not a box"}</Note>
      <Link x1={556} y1={178} x2={362} y2={182} hue="graphite" bend={0.1} seed={2420} weight={1.2} opacity={0.4} />

      {interactions[0] ? (
        <Marker x={58} y={352} w={248} h={20} hue="lemon" seed={2440} opacity={0.4} />
      ) : null}
      <Note x={66} y={367} hue="charcoal" size={18}>{"the only place the lanes touch"}</Note>
    </Plate>
  );
}

/* ----------------------------------------- figure 3 — challenge vs hindrance */

/**
 * Figure 3. Two demands that cost the same effort and differ in what comes
 * back. Drawn as one shared effort bar with two different returns, because the
 * record's point is precisely that the *cost* is not what separates them.
 */
export function ChallengeHindrance({ types }: { types: { title: string; definition: string; examples: string[]; relates: string }[] }) {
  const rows = [
    { hue: "teal" as const, y: 92, back: true, seed: 3100 },
    { hue: "vermilion" as const, y: 244, back: false, seed: 3400 },
  ];
  const L = 158;

  return (
    <Plate viewBox="0 0 740 360" ratio="740 / 360"
      title="Challenge and hindrance demands. Both cost the same sustained effort, drawn as an identical bar on each row. Only what returns differs: a challenge demand offers mastery and learning back, a hindrance demand offers nothing. The effort bars are drawn from one seed so they are the same mark.">

      {rows.map((row, i) => (
        <g key={i}>
          <Rule x1={L - 96} y1={row.y + 54} x2={676} y2={row.y + 54} hue="warmgrey" seed={3000 + i} weight={1} opacity={0.22} />

          {/* Identical effort, drawn from one seed on both rows. */}
          <Field x={L} y={row.y - 26} w={190} h={52} hue="graphite" seed={3050}
            passes={9} rows={9} angle={-13} weight={0.17} width={1.4} taper={0.32} />
          <Halo cx={L + 95} cy={row.y} rx={100} ry={30} hue="graphite" seed={3060} laps={2} weight={1.5} opacity={0.5} />
          <Term x={L + 95} y={row.y + 4} size={12.5} hue="charcoal" weight={520}>sustained effort</Term>

          <Tag x={L - 106} y={row.y - 6} hue={row.hue} size={9} anchor="end">{types[i]?.title ?? ""}</Tag>
          <foreignObject x={L - 150} y={row.y + 2} width={140} height={54}>
            <p style={{ margin: 0, textAlign: "right", font: "italic 10.5px/1.3 var(--sf-newsreader), Georgia, serif", color: "var(--pg-warmgrey)" }}>
              {types[i]?.examples.slice(0, 3).join(", ") ?? ""}
            </p>
          </foreignObject>

          <Arrow x1={L + 200} y1={row.y} x2={L + 292} y2={row.y} hue={row.hue} bend={i ? -0.1 : 0.1}
            seed={row.seed} weight={1.9} opacity={0.62} size={10} />

          {row.back ? (
            <>
              <Step cx={L + 386} cy={row.y} rx={86} ry={34} hue={row.hue} seed={row.seed + 40} lead>
                mastery, learning, gain
              </Step>
              {/* The return: an arrow that comes back. */}
              <Arrow x1={L + 386} y1={row.y + 38} x2={L + 118} y2={row.y + 34} hue={row.hue}
                bend={0.22} seed={row.seed + 70} weight={1.6} opacity={0.52} size={9} />
              <Note x={L + 210} y={row.y + 72} hue="teal" size={16}>{"something comes back"}</Note>
            </>
          ) : (
            <>
              <Contour points={[[L + 306, row.y - 32], [L + 466, row.y - 30], [L + 470, row.y + 32], [L + 302, row.y + 30]]}
                hue={row.hue} seed={row.seed + 40} weight={1.4} opacity={0.42} dash="8 8" wobble={3} />
              <Note x={L + 386} y={row.y + 4} hue="vermilion" size={17} anchor="middle">{"nothing back"}</Note>
              <Squiggle x={L + 322} y={row.y + 54} len={128} hue="vermilion" seed={row.seed + 70}
                cycles={5} amp={2.4} weight={1.4} opacity={0.5} />
            </>
          )}
        </g>
      ))}

      <Marker x={158} y={330} w={286} h={20} hue="lemon" seed={3500} opacity={0.4} />
      <Note x={166} y={345} hue="charcoal" size={18}>{"same cost — different return"}</Note>
    </Plate>
  );
}

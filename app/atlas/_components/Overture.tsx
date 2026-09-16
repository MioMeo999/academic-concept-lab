import { blob, hatch, partialBox, passes, rng, rule, toPath, wander } from "../_lib/marks";
import { PIGMENT, type Pigment } from "./Pigment";

/* ---------------------------------------------------------------------------
   Overtures.

   Each spread opens with its own argument stated in pigment before a word of
   the record is read. There are four of them and they are hand-composed, not
   generated from a shared template, because a single hero band reskinned four
   times is exactly the habit this direction exists to break. Each one is the
   shape of its record's central problem:

     Gestalt      masses that overlap, and boundaries that disagree about where
     Tonal        one fixed mark, four surrounds at four distances
     Processing   a broad scatter, and one firm thing landing outside it
     ITPRA        a single hinge, and lanes that will not all close

   They are decorative in the accessibility sense — aria-hidden, inert, and
   removable without loss. The argument each one gestures at is made properly,
   in type and in a captioned figure, further down the spread.
   ------------------------------------------------------------------------ */

const W = 1200;
const H = 240;

function Mass({
  cx,
  cy,
  w,
  h,
  pigment,
  angle,
  seed,
  gap = 3.7,
  broken = 0.16,
  pressure = [0.2, 0.56] as [number, number],
  ramp = "none" as "none" | "in" | "out" | "centre",
  cross,
  lod = 1,
  id,
}: {
  cx: number;
  cy: number;
  w: number;
  h: number;
  pigment: Pigment;
  angle: number;
  seed: number;
  gap?: number;
  broken?: number;
  pressure?: [number, number];
  ramp?: "none" | "in" | "out" | "centre";
  /** A second angle. Tone reached by crossing, which is a different argument
   *  for the same darkness than simply laying down more of one direction. */
  cross?: number;
  /** Coarseness. The cover shows four of these bands at a fraction of their
   *  full-bleed size, where the finest strokes are below the pixel grid
   *  anyway; spacing them out there costs nothing to look at and a great deal
   *  less to composite. */
  lod?: number;
  id: string;
}) {
  /* Budgets, not aspirations. A cover carrying four of these compositions can
     otherwise deposit several thousand nodes, and past this point a field is
     not visibly denser — only slower to composite. */
  const f = hatch({ w: w + 12, h: h + 12, gap: gap * lod, seed, jitter: 1.5, broken, pressure, weight: 0.85, ramp, max: Math.round(190 / lod) });
  const x = cross === undefined ? null : hatch({ w: w + 12, h: h + 12, gap: gap * 1.35 * lod, seed: seed + 613, jitter: 1.4, broken, pressure: [pressure[0] * 0.8, pressure[1] * 0.85], weight: 0.8, ramp, max: Math.round(130 / lod) });
  return (
    <>
      {/* The clip lives outside the blended group. A clipPath nested inside a
          mix-blend-mode group is resolved inconsistently, and the failure mode
          is a field that silently paints nothing. */}
      <clipPath id={id}>
        <path d={blob(w / 2, h / 2, seed + 91, 0.13)} transform={`translate(${cx} ${cy})`} />
      </clipPath>
      <g className="at-layer" clipPath={`url(#${id})`} stroke={PIGMENT[pigment]} fill="none" strokeLinecap="round">
        <g transform={`translate(${cx} ${cy}) rotate(${angle})`}>
          {f.strokes.map((s, i) => (
            <path key={i} d={s.d} strokeWidth={s.w} opacity={s.p} />
          ))}
        </g>
        {x && (
          <g transform={`translate(${cx} ${cy}) rotate(${cross})`}>
            {x.strokes.map((s, i) => (
              <path key={i} d={s.d} strokeWidth={s.w} opacity={s.p * 0.85} />
            ))}
          </g>
        )}
      </g>
    </>
  );
}

/**
 * The same drawing serves twice: full-bleed above its own spread, and as the
 * plate's mark on the cover. A publication identifies a plate by its plate,
 * and reusing the composition rather than inventing a thumbnail for it keeps
 * that identification honest.
 */
function Frame({ children, inline }: { children: React.ReactNode; inline?: boolean }) {
  return (
    <div className={inline ? "at-plate__strip" : "at-overture"}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        /* Full bleed the band is cropped to the page; on the cover it runs the
           full width of the plate and is shown whole. Cropping it with a
           viewBox origin misplaces every clip region in the drawing, and
           cropping it with an oversized element and a negative margin makes a
           layer the compositor will not always paint — so it is not cropped. */
        preserveAspectRatio={inline ? "xMidYMid meet" : "xMidYMid slice"}
        aria-hidden="true"
        focusable="false"
        style={inline ? { width: "100%", height: "auto" } : { maxHeight: "clamp(9rem, 20vw, 13rem)" }}
      >
        {children}
      </svg>
    </div>
  );
}

type OvertureProps = { inline?: boolean };

const V = (seed: number, len: number) => toPath(wander(0, 0, 1, len, rng(seed), 1.5));

/** Masses that overlap, and two boundaries that disagree about where. */
export function OvertureGestalt({ inline }: OvertureProps = {}) {
  const lod = inline ? 1.7 : 1;
  return (
    <Frame inline={inline}>
      <Mass lod={lod} id="ovg1" cx={330} cy={126} w={480} h={162} pigment="ultramarine" angle={-30} seed={2101} cross={26} />
      <Mass lod={lod} id="ovg2" cx={600} cy={132} w={440} h={150} pigment="viridian" angle={33} seed={2131} />
      <Mass lod={lod} id="ovg3" cx={905} cy={116} w={340} h={126} pigment="vermilion" angle={-16} seed={2161} gap={4.6} broken={0.32} pressure={[0.14, 0.4]} />
      <g className="at-layer">
        {passes(2, 2201, 1).map((p, i) => (
          <path key={i} d={V(2211, 196)} transform={`translate(${470 + p.dx} ${30 + p.dy})`} fill="none" stroke={PIGMENT.ultramarine} strokeWidth={i ? 1 : 1.7} strokeDasharray="9 6" strokeLinecap="round" opacity={p.o} />
        ))}
        {passes(2, 2221, 1).map((p, i) => (
          <path key={i} d={V(2231, 196)} transform={`translate(${660 + p.dx} ${34 + p.dy})`} fill="none" stroke={PIGMENT.viridian} strokeWidth={i ? 1 : 1.7} strokeDasharray="9 6" strokeLinecap="round" opacity={p.o} />
        ))}
        <path d={partialBox(460, 12, 212, 26, "right", 14, 2251)} fill="none" stroke={PIGMENT.graphite} strokeWidth={1.1} strokeLinecap="round" opacity={0.7} />
      </g>
    </Frame>
  );
}

/** One fixed mark; four surrounds at four distances. */
export function OvertureTonal({ inline }: OvertureProps = {}) {
  const lod = inline ? 1.7 : 1;
  const surrounds: { cx: number; w: number; pigment: Pigment; angle: number; seed: number; gap: number }[] = [
    { cx: 236, w: 330, pigment: "violet", angle: -28, seed: 3101, gap: 3.3 },
    { cx: 500, w: 280, pigment: "ochre", angle: 30, seed: 3131, gap: 3.8 },
    { cx: 760, w: 300, pigment: "violet", angle: -34, seed: 3161, gap: 4.6 },
    { cx: 1000, w: 250, pigment: "ochre", angle: 24, seed: 3191, gap: 5.8 },
  ];
  return (
    <Frame inline={inline}>
      {surrounds.map((s, i) => (
        <Mass
          key={i}
          lod={lod}
          id={`ovt${i}`}
          cx={s.cx}
          cy={118}
          w={s.w}
          h={148}
          pigment={s.pigment}
          angle={s.angle}
          seed={s.seed}
          gap={s.gap}
          broken={0.18}
          pressure={[0.22, 0.6]}
          /* The nearer surrounds are crossed, the further ones are not: tone
             reached by a second direction rather than by a darker stroke. */
          cross={i < 2 ? s.angle + 62 : undefined}
        />
      ))}
      <g className="at-layer">
        <path d={rule(40, 118, W - 40, 3301, 0.6)} fill="none" stroke={PIGMENT.graphite} strokeWidth={0.9} strokeDasharray="4 5" opacity={0.55} />
        {surrounds.map((s, i) =>
          passes(2, 3401 + i, 0.7).map((p, j) => (
            <path
              key={`${i}-${j}`}
              d={V(3411 + i * 7, 60)}
              transform={`translate(${s.cx + p.dx} ${89 + p.dy})`}
              fill="none"
              stroke={PIGMENT.graphite}
              strokeWidth={j ? 1.1 : 2.1}
              strokeLinecap="round"
              opacity={j ? 0.45 : 0.95}
            />
          )),
        )}
      </g>
    </Frame>
  );
}

/** A broad scatter, and one firm thing landing outside it. */
export function OvertureProcessing({ inline }: OvertureProps = {}) {
  const lod = inline ? 1.7 : 1;
  const r = rng(4101);
  const marks: { x: number; y: number; len: number }[] = [];
  for (let i = 0; i < Math.round(250 / lod); i += 1) {
    // Two crossings of a Box–Muller pair keep the scatter deterministic.
    const u = Math.max(1e-9, r());
    const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
    marks.push({ x: 540 + z * 150, y: 118 + (r() - 0.5) * 128, len: 10 + r() * 9 });
  }
  return (
    <Frame inline={inline}>
      <g className="at-layer">
        {marks.map((m, i) =>
          m.x < -20 || m.x > W + 20 ? null : (
            <path key={i} d={`M${m.x.toFixed(1)} ${(m.y - m.len / 2).toFixed(1)} L${(m.x + 1.6).toFixed(1)} ${(m.y + m.len / 2).toFixed(1)}`} stroke={PIGMENT.ultramarine} strokeWidth={1.25} strokeLinecap="round" opacity={0.62} />
          ),
        )}
      </g>
      <g className="at-layer">
        {passes(2, 4201, 1).map((p, i) => (
          <path key={i} d={V(4211, 176)} transform={`translate(${925 + p.dx} ${32 + p.dy})`} fill="none" stroke={PIGMENT.rose} strokeWidth={i ? 1.3 : 2.7} strokeLinecap="round" opacity={i ? 0.5 : 1} />
        ))}
        <path d={`M540 218 L925 218 M540 212 L540 224 M925 212 L925 224`} stroke={PIGMENT.graphite} strokeWidth={1.1} opacity={0.6} />
        <path d={V(4231, 182)} transform="translate(540 28)" fill="none" stroke={PIGMENT.ultramarine} strokeWidth={1} strokeDasharray="3.5 5" opacity={0.8} />
      </g>
    </Frame>
  );
}

/** A single hinge, and lanes that will not all close. */
export function OvertureItpra({ inline }: OvertureProps = {}) {
  const lod = inline ? 1.7 : 1;
  const lanes: { y: number; x0: number; x1: number; pigment: Pigment; angle: number; seed: number; open: boolean; ramp: "none" | "in" }[] = [
    { y: 18, x0: 90, x1: 520, pigment: "viridian", angle: -26, seed: 5101, open: false, ramp: "none" },
    { y: 58, x0: 330, x1: 520, pigment: "ochre", angle: -26, seed: 5131, open: false, ramp: "in" },
    { y: 98, x0: 520, x1: 690, pigment: "vermilion", angle: -34, seed: 5161, open: false, ramp: "none" },
    { y: 138, x0: 520, x1: 690, pigment: "vermilion", angle: 34, seed: 5191, open: false, ramp: "none" },
    { y: 178, x0: 520, x1: 1160, pigment: "violet", angle: -20, seed: 5221, open: true, ramp: "none" },
  ];
  return (
    <Frame inline={inline}>
      {lanes.map((l, i) => (
        <g key={i}>
          <Mass
            lod={lod}
            id={`ovi${i}`}
            cx={(l.x0 + l.x1) / 2}
            cy={l.y + 14}
            w={l.x1 - l.x0}
            h={30}
            pigment={l.pigment}
            angle={l.angle}
            seed={l.seed}
            gap={l.ramp === "in" ? 4 : 4.8}
            broken={l.open ? 0.32 : 0.14}
            pressure={[0.22, 0.6]}
            ramp={l.ramp}
          />
          <g className="at-layer">
            <path
              d={partialBox(l.x0, l.y, l.x1 - l.x0, 28, l.open ? "right" : "none", 22, 5301 + i)}
              fill="none"
              stroke={PIGMENT[l.pigment]}
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.72}
            />
          </g>
        </g>
      ))}
      <g className="at-layer">
        {passes(2, 5401, 0.9).map((p, i) => (
          <path key={i} d={V(5411, 200)} transform={`translate(${520 + p.dx} ${6 + p.dy})`} fill="none" stroke={PIGMENT.graphite} strokeWidth={i ? 1.2 : 2.2} strokeLinecap="round" opacity={i ? 0.5 : 0.95} />
        ))}
        {passes(2, 5431, 1.4).map((p, i) => (
          <path
            key={`o${i}`}
            d={toPath(wander(900, 186, 600, 104, rng(5441 + i), 2.6))}
            transform={`translate(${p.dx} ${p.dy})`}
            fill="none"
            stroke={PIGMENT.violet}
            strokeWidth={i ? 0.9 : 1.5}
            strokeLinecap="round"
            opacity={p.o * 0.8}
          />
        ))}
      </g>
    </Frame>
  );
}

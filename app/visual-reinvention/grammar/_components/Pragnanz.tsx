/**
 * Prägnanz as a three-part progression, and the one licensed use of the
 * retained trace on this page.
 *
 * The freeze requires three stages that must not collapse: a historical
 * ambition; the critical problem that "good/simple" is under-specified without
 * a stated objective and conditions; and later reformulations that must remain
 * identifiable as later.
 *
 * The trace here carries "prior state", not "superseded because wrong". The
 * caption says so, and the earlier material is drawn *continuing underneath*
 * the later stages rather than fading out behind them — the ambition is the
 * thing later frameworks reformulate, so it must still be present.
 */
import { HatchField, MultiPass, PartialBoundary, PigmentField, RetainedTrace, Figure } from "../../_components/Marks";

const W = 640;
const H = 262;

export function Pragnanz() {
  return (
    <Figure
      tone="loud"
      equivalent={
        "Three stages drawn left to right and deliberately not enclosed as separate boxes. On the left, a dense graphite field stands for the historical ambition toward relatively good or simple organisation; its boundary is drawn open on the right because the objective and conditions were never stated. In the middle that opening is named as the under-specification problem. On the right, three separate later reformulations are drawn in three different pigments, each its own accumulation, with the right-hand edge left open. The graphite of the first stage continues underneath the second and third stages at reduced pressure, showing that the earlier ambition persists as the thing being reformulated rather than having been refuted."
      }
      caption={
        <>
          <b>Prägnanz, three stages.</b> The graphite of the first stage continues under the later ones at reduced
          pressure. Reduced pressure here means <b>earlier and still present</b>. It does not mean refuted, weak, or
          discredited — later frameworks reformulate this ambition rather than replacing it, and they remain
          identifiable as later. The open right edge is the record’s: these reformulations are not a closed set.
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <clipPath id="prag-a">
            <rect x={26} y={44} width={168} height={104} />
          </clipPath>
          <clipPath id="prag-carry">
            <rect x={200} y={104} width={412} height={44} />
          </clipPath>
          <clipPath id="prag-c1">
            <rect x={392} y={40} width={64} height={50} />
          </clipPath>
          <clipPath id="prag-c2">
            <rect x={468} y={40} width={64} height={50} />
          </clipPath>
          <clipPath id="prag-c3">
            <rect x={544} y={40} width={64} height={50} />
          </clipPath>
        </defs>

        {/* Stage 1 — the historical ambition. An accumulation, not a statement. */}
        <PigmentField
          id="prag-one"
          x={26}
          y={44}
          w={162}
          h={104}
          colour="var(--vr-graphite)"
          angles={[30, 16]}
          gap={4.2}
          seed={21}
          broken={0.24}
          soft={0.36}
          pressure={[0.2, 0.56]}
        />

        {/* The ambition carries forward under everything that follows. */}
        <RetainedTrace label="stage one continuing">
          <HatchField
            x={196}
            y={104}
            w={416}
            h={46}
            angle={30}
            gap={5.4}
            seed={21}
            broken={0.3}
            weight={1}
            pressure={[0.24, 0.62]}
            colour="var(--vr-graphite)"
            clipId="prag-carry"
          />
        </RetainedTrace>

        {/* Stage 2 — the opening itself is the content. */}
        <MultiPass d="M 206 40 L 206 152" colour="var(--vr-ochre-mark)" width={1.3} count={1} seed={9} dash="6 8" />
        <MultiPass d="M 358 40 L 358 152" colour="var(--vr-ochre-mark)" width={1.3} count={1} seed={11} dash="6 8" />
        <text x={228} y={70} fontFamily="var(--vr-sans)" fill="var(--vr-ochre)" fontSize={12.5}>
          ? the objective and the
        </text>
        <text x={228} y={86} fontFamily="var(--vr-sans)" fill="var(--vr-ochre)" fontSize={12.5}>
          conditions were never
        </text>
        <text x={228} y={102} fontFamily="var(--vr-sans)" fill="var(--vr-ochre)" fontSize={12.5}>
          stated
        </text>

        {/* Stage 3 — later reformulations, each its own accumulation. */}
        <HatchField x={402} y={40} w={64} h={50} angle={-22} gap={4.4} seed={51} broken={0.2} pressure={[0.32, 0.7]} colour="var(--vr-cobalt)" clipId="prag-c1" />
        <HatchField x={478} y={40} w={64} h={50} angle={14} gap={4.4} seed={63} broken={0.2} pressure={[0.32, 0.7]} colour="var(--vr-violet)" clipId="prag-c2" />
        <HatchField x={554} y={40} w={64} h={50} angle={-40} gap={4.4} seed={71} broken={0.2} pressure={[0.32, 0.7]} colour="var(--vr-emerald)" clipId="prag-c3" />
        <PartialBoundary x={384} y={30} w={244} h={70} open="right" colour="var(--vr-graphite)" seed={83} inset={96} width={1.3} />

        {/* Stage labels, typeset. The drawing does not name its own stages. */}
        <g fontFamily="var(--vr-sans)" fill="var(--vr-ink-soft)">
          <text x={26} y={186} fontSize={12.5}>
            1 · Historical ambition
          </text>
          <text x={26} y={203} fontSize={11.5} fill="var(--vr-ink-faint)">
            relatively good or simple
          </text>
          <text x={26} y={218} fontSize={11.5} fill="var(--vr-ink-faint)">
            organisation, under
          </text>
          <text x={26} y={233} fontSize={11.5} fill="var(--vr-ink-faint)">
            prevailing conditions
          </text>

          <text x={228} y={186} fontSize={12.5}>
            2 · The critical problem
          </text>
          <text x={228} y={203} fontSize={11.5} fill="var(--vr-ink-faint)">
            “good” and “simple” are
          </text>
          <text x={228} y={218} fontSize={11.5} fill="var(--vr-ink-faint)">
            under-specified
          </text>

          <text x={402} y={186} fontSize={12.5}>
            3 · Later reformulations
          </text>
          <text x={402} y={203} fontSize={11.5} fill="var(--vr-ink-faint)">
            simplicity · minimum principles
          </text>
          <text x={402} y={218} fontSize={11.5} fill="var(--vr-ink-faint)">
            likelihood · Bayesian interpretations
          </text>
          <text x={402} y={233} fontSize={11.5} fill="var(--vr-ink-faint)">
            self-organisation
          </text>
        </g>

      </svg>
    </Figure>
  );
}

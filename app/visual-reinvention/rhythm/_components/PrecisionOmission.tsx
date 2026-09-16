"use client";

/**
 * Two constructed comparisons from the Predictive Processing record.
 *
 * Precision. The variable here is invisible: what changes between the two
 * conditions is an *assumption*, not a stimulus. That makes it an interesting
 * drawing problem, and a dangerous one — a smooth bell curve would look like
 * measured data. So the envelope is drawn as diffuse accumulated material with
 * no axis, no peak value and no curve, and its constructed values are stated
 * as constructed. The deviation itself is the same mark in the same place in
 * both conditions.
 *
 * Omission. An absent event is only an event because an expectation was
 * declared first. So the frame is drawn, and nothing is put inside it. This is
 * the one case where the absence of a mark is the content.
 */

import { useState } from "react";
import { MultiPass, PigmentField } from "../../_components/Marks";

const W = 620;
const H = 178;
const EXPECTED = 300;
const ACTUAL = 396; // the same displacement in both conditions

function Beat({ x, y = 96 }: { x: number; y?: number }) {
  return (
    <g style={{ color: "var(--vr-graphite)" }}>
      <use href="#vr-event" x={x} y={y} />
    </g>
  );
}

function PrecisionPlate({ wide }: { wide: boolean }) {
  const spread = wide ? 190 : 74;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`The same event, displaced by the same amount from the same expected onset, inside ${
        wide ? "a wide" : "a narrow"
      } constructed envelope of assumed uncertainty. Only the width of the envelope differs between the two conditions.`}
    >
      <PigmentField
        id={`prec-${wide ? "wide" : "narrow"}`}
        x={EXPECTED - spread}
        y={44}
        w={spread * 2}
        h={104}
        colour="var(--vr-cobalt)"
        angles={[8, -4]}
        gap={wide ? 5.6 : 3.2}
        seed={wide ? 61 : 29}
        broken={wide ? 0.42 : 0.2}
        soft={0.55}
        pressure={wide ? [0.07, 0.24] : [0.14, 0.46]}
      />

      <path d={`M ${EXPECTED} 40 L ${EXPECTED} 150`} stroke="var(--vr-graphite)" strokeWidth={1.2} strokeDasharray="4 5" fill="none" />
      <text x={EXPECTED} y={32} textAnchor="middle" fontFamily="var(--vr-sans)" fontSize={11.5} fill="var(--vr-ink-soft)">
        expected onset
      </text>

      {[120, 180, 240].map((x) => (
        <Beat key={x} x={x} />
      ))}
      <Beat x={ACTUAL} />
      <MultiPass
        d={`M ${EXPECTED + 4} 132 L ${ACTUAL - 4} 132`}
        colour="var(--vr-vermilion)"
        width={1.4}
        count={1}
        seed={7}
      />
      <text x={(EXPECTED + ACTUAL) / 2} y={148} textAnchor="middle" fontFamily="var(--vr-mono)" fontSize={11} fill="var(--vr-vermilion)">
        +120 ms · identical in both
      </text>
      <text x={W - 6} y={166} textAnchor="end" fontFamily="var(--vr-mono)" fontSize={11} fill="var(--vr-ink-faint)">
        {wide ? "σ = 90 ms · open context" : "σ = 35 ms · regular context"}
      </text>
    </svg>
  );
}

export function Precision() {
  return (
    <div>
      <div className="vr-conditions" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))" }}>
        <div className="vr-condition">
          <div className="vr-condition__label">
            <span className="vr-label">Regular context</span>
            <span className="vr-mono" style={{ color: "var(--vr-ink-faint)" }}>
              σ = 35 ms
            </span>
          </div>
          <div className="vr-condition__plate">
            <PrecisionPlate wide={false} />
          </div>
          <p className="vr-condition__read">
            Under a narrow assumed uncertainty, the same displacement sits well outside what the model expected.
          </p>
        </div>
        <div className="vr-condition">
          <div className="vr-condition__label">
            <span className="vr-label">Open context</span>
            <span className="vr-mono" style={{ color: "var(--vr-ink-faint)" }}>
              σ = 90 ms
            </span>
          </div>
          <div className="vr-condition__plate">
            <PrecisionPlate wide />
          </div>
          <p className="vr-condition__read">
            Under a wide assumed uncertainty, the same displacement is much less remarkable to the same model.
          </p>
        </div>
      </div>
      <p className="vr-figure__caption" style={{ maxWidth: "42rem" }}>
        <b>The event did not move.</b> It is the same mark, at the same offset, in both plates. What changed is an
        assumption about uncertainty — and the material has to carry that without looking like data, so the envelope is
        drawn as diffuse accumulation with no axis, no peak and no curve. The <span className="vr-mono">σ</span> values
        are the record’s constructed teaching values, not measurements of anything.
      </p>
    </div>
  );
}

export function Omission() {
  const [present, setPresent] = useState(true);
  return (
    <div>
      <div className="vr-figure__plate">
        <svg
          viewBox="0 0 620 156"
          role="img"
          aria-label={
            present
              ? "Four beats, then a fifth event arriving at the expected position inside a drawn frame."
              : "Four beats, then a drawn frame at the expected position with nothing inside it. The frame is what makes the silence an event."
          }
        >
          {[110, 180, 250, 320].map((x) => (
            <Beat key={x} x={x} y={82} />
          ))}
          <MultiPass
            d="M 372 46 L 372 118 M 372 46 L 424 46 M 372 118 L 424 118 M 424 46 L 424 118"
            colour="var(--vr-graphite)"
            width={1.2}
            count={2}
            seed={23}
            dash="6 5"
          />
          {present ? <Beat x={398} y={82} /> : null}
          <text x={398} y={38} textAnchor="middle" fontFamily="var(--vr-sans)" fontSize={11.5} fill="var(--vr-ink-soft)">
            expected position
          </text>
          <text x={398} y={140} textAnchor="middle" fontFamily="var(--vr-sans)" fontSize={11.5} fill={present ? "var(--vr-ink-faint)" : "var(--vr-vermilion)"}>
            {present ? "the event arrives" : "nothing arrives — and that is the event"}
          </text>
        </svg>
      </div>

      <fieldset className="vr-controls" style={{ marginTop: "0.9rem" }}>
        <legend className="vr-label vr-controls__legend">Does the expected event arrive?</legend>
        <div className="vr-switch" role="radiogroup" aria-label="Whether the expected event arrives">
          <button type="button" role="radio" aria-checked={present} onClick={() => setPresent(true)}>
            It arrives
          </button>
          <button type="button" role="radio" aria-checked={!present} onClick={() => setPresent(false)}>
            It is omitted
          </button>
        </div>
        <p className="vr-condition__read" style={{ marginTop: "0.55rem", maxWidth: "40rem" }}>
          The four preceding beats and the expected position are held constant; only whether a sensory event arrives
          changes. Silence can be a mismatch when a model predicts an event — and the drawn frame is what makes the
          empty space readable at all. Remove the frame and there is simply nothing there.
        </p>
      </fieldset>
    </div>
  );
}

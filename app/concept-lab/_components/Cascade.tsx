import type { Cascade as Data } from "@/content/types";

/* ---------------------------------------------------------------------------
   A signalling cascade, drawn as a SCHEMATIC rather than as anatomy.

   The distinction is deliberate. An anatomical illustration invites anatomical
   scrutiny — organ shape, position, relative scale — and a hand-drawn one
   would fail that scrutiny while looking as though it were trying to pass it.
   A schematic makes a different and honest promise: this is the order of
   events and the direction of travel, nothing more.

   What it does keep is vertical order, because the ordering is real: the chain
   runs from brain, to gland below it, to gland lower still, and the feedback
   loop climbs back up the outside. That is a claim the drawing can support.
   ------------------------------------------------------------------------- */
export function Cascade({ data }: { data: Data }) {
  const { nodes, messengers, feedback, caption } = data;

  return (
    <figure className="cascade">
      <div className="cascade-flow">
        {nodes.map((n, i) => (
          <div className="cascade-step" key={n.label}>
            <div className="cascade-node">
              <span className="cascade-node-label">{n.label}</span>
              <span className="cascade-node-sub">{n.sub}</span>
            </div>

            {i < nodes.length - 1 && (
              <div className="cascade-link" aria-hidden="true">
                <svg viewBox="0 0 40 54" data-draw="">
                  <path
                    d="M20 2c1.6 12-1.4 24 .6 38"
                    fill="none"
                    stroke="var(--plum-deep)"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    pathLength={1}
                    data-ink=""
                  />
                  <path
                    d="M13 34c2.8 3.4 5.2 6.6 7.2 9.8 2.2-3.2 4.6-6.2 7.4-9.2"
                    fill="none"
                    stroke="var(--plum-deep)"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    data-ink=""
                  />
                </svg>
                {messengers[i] && <span className="cascade-messenger">{messengers[i]}</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* The loop that makes it a regulated system rather than a one-way chain. */}
      <div className="cascade-feedback" aria-hidden="true">
        <svg viewBox="0 0 120 320" preserveAspectRatio="none" data-draw="">
          <path
            d="M112 306C60 300 22 286 16 232 10 176 14 108 20 46c1-14 12-24 26-28"
            fill="none"
            stroke="var(--pen-3)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="7 6"
            pathLength={1}
            data-ink=""
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M38 10c3.4 2.6 6.8 5 10.4 7-3.4 2.2-6.6 4.8-9.6 7.6"
            fill="none"
            stroke="var(--pen-3)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            data-ink=""
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="cascade-feedback-label">{feedback}</span>
      </div>

      <figcaption className="cascade-caption">{caption}</figcaption>
    </figure>
  );
}

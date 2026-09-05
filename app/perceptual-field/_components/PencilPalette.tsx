import { Hatch, INK } from "./marks";

const PENCILS = [
  { name: "cobalt", role: "structure", colour: INK.cobalt },
  { name: "sky", role: "possibility", colour: INK.sky },
  { name: "teal", role: "connection", colour: INK.teal },
  { name: "emerald", role: "continuation", colour: INK.emerald },
  { name: "ochre", role: "context", colour: INK.ochre },
  { name: "vermilion", role: "tension", colour: INK.vermilion },
  { name: "coral", role: "attention", colour: INK.coral },
  { name: "magenta", role: "comparison", colour: INK.magenta },
  { name: "violet", role: "abstraction", colour: INK.violet },
];

export const PENCIL_TRACE = PENCILS.map((pencil) => pencil.colour);

export function PencilPalette() {
  return (
    <div className="pf-palette" role="group" aria-label="Pencil colour key">
      <div className="pf-palette-intro">
        <p className="pf-meta">the pencil in full colour</p>
        <p className="pf-small">
          Colour traces the idea being attended to. It is a drawing key, not a changed sound cue.
        </p>
      </div>
      <div className="pf-palette-grid">
        {PENCILS.map((pencil, index) => (
          <div className="pf-palette-item" key={pencil.name}>
            <Hatch
              width={72}
              height={18}
              colour={pencil.colour}
              seed={430 + index}
              angle={-38}
              gap={2.5}
              opacity={0.92}
              style={{ display: "block", width: "100%", height: 18 }}
            />
            <span className="pf-palette-name" style={{ color: pencil.colour }}>
              {pencil.name}
            </span>
            <span className="pf-palette-role">{pencil.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

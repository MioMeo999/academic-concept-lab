import { Plate } from "../../surface/_components/Pigment";
import {
  Ball, Contour, Field, Ghost, Halo, Link, Note, Pencil, Rule, Tag, Term,
} from "../../surface/_components/Draw";
import { bowPts, contourPts } from "../../surface/_lib/pencil";
import type { Hue } from "../../surface/_components/Pigment";

const graphite = "graphite" as const;

function Person({ x, y, hue = "cobalt", seed = 1, scale = 1, seated = false }: {
  x: number; y: number; hue?: Hue; seed?: number; scale?: number; seated?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} aria-hidden="true">
      <Ball cx={0} cy={-27} rx={10} ry={10} hue={hue} seed={seed} count={5} weight={1.1} opacity={0.46} />
      <Pencil runs={[contourPts([[-10, -14], [-17, 10], [-12, 31], [0, 39], [12, 31], [17, 10], [10, -14]], seed + 11, 2.2)]}
        hue={graphite} seed={seed + 12} passes={2} weight={1.25} opacity={0.5} />
      <Rule x1={-7} y1={2} x2={-22} y2={22} hue={hue} seed={seed + 20} weight={1.2} opacity={0.58} />
      <Rule x1={7} y1={2} x2={22} y2={22} hue={hue} seed={seed + 21} weight={1.2} opacity={0.58} />
      {seated ? <Rule x1={-22} y1={23} x2={22} y2={23} hue="graphite" seed={seed + 22} weight={1.1} opacity={0.36} /> : null}
    </g>
  );
}

function Desk({ x, y, w, h, seed = 1, hue = "graphite" as Hue }: {
  x: number; y: number; w: number; h: number; seed?: number; hue?: Hue;
}) {
  return (
    <g aria-hidden="true">
      <Contour points={[[x, y], [x + w, y + 2], [x + w - 8, y + h], [x + 8, y + h - 1], [x, y]]}
        hue={hue} seed={seed} weight={1.2} opacity={0.48} wobble={3} />
      <Rule x1={x + 9} y1={y + h - 1} x2={x + 21} y2={y + h + 26} hue={hue} seed={seed + 1} weight={1} opacity={0.32} />
      <Rule x1={x + w - 17} y1={y + h} x2={x + w - 7} y2={y + h + 25} hue={hue} seed={seed + 2} weight={1} opacity={0.32} />
    </g>
  );
}

function TaskStack({ x, y, w = 92, hue = "warmgrey" as Hue, seed = 1, tilt = 0 }: {
  x: number; y: number; w?: number; hue?: Hue; seed?: number; tilt?: number;
}) {
  return (
    <g transform={`rotate(${tilt} ${x} ${y})`} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Contour points={[[x + i * 5, y + i * 8], [x + w + i * 5, y + i * 8 + 1], [x + w - 2 + i * 5, y + 32 + i * 8], [x + 4 + i * 5, y + 31 + i * 8], [x + i * 5, y + i * 8]]}
            hue={i === 2 ? hue : "graphite"} seed={seed + i * 11} weight={1.1} opacity={0.42} wobble={2.4} />
          <Rule x1={x + 14 + i * 5} y1={y + 13 + i * 8} x2={x + w - 16 + i * 5} y2={y + 13 + i * 8} hue="graphite" seed={seed + i * 13} weight={.7} opacity={.34} />
          <Rule x1={x + 14 + i * 5} y1={y + 20 + i * 8} x2={x + w - 29 + i * 5} y2={y + 20 + i * 8} hue="graphite" seed={seed + i * 17} weight={.7} opacity={.27} />
        </g>
      ))}
    </g>
  );
}

function Clock({ x, y, r = 27, hue = "vermilion" as Hue, seed = 1 }: {
  x: number; y: number; r?: number; hue?: Hue; seed?: number;
}) {
  return (
    <g aria-hidden="true">
      <Halo cx={x} cy={y} rx={r} ry={r} hue={hue} seed={seed} laps={2} weight={1.25} opacity={0.55} />
      <Rule x1={x} y1={y} x2={x - r * .36} y2={y - r * .52} hue={hue} seed={seed + 1} weight={1.15} opacity={.65} />
      <Rule x1={x} y1={y} x2={x + r * .55} y2={y + r * .14} hue={hue} seed={seed + 2} weight={1.15} opacity={.65} />
      <Ball cx={x} cy={y} rx={2.5} ry={2.5} hue={hue} seed={seed + 3} count={3} weight={1} opacity={.7} />
    </g>
  );
}

function Speech({ x, y, w = 84, hue = "sky" as Hue, seed = 1 }: {
  x: number; y: number; w?: number; hue?: Hue; seed?: number;
}) {
  return (
    <g aria-hidden="true">
      <Contour points={[[x, y], [x + w, y + 1], [x + w - 5, y + 31], [x + 23, y + 32], [x + 10, y + 43], [x + 14, y + 31], [x, y + 30], [x, y]]}
        hue={hue} seed={seed} weight={1.15} opacity={.5} wobble={2.5} />
      <Rule x1={x + 15} y1={y + 12} x2={x + w - 16} y2={y + 12} hue={graphite} seed={seed + 1} weight={.8} opacity={.35} />
      <Rule x1={x + 15} y1={y + 20} x2={x + w - 29} y2={y + 20} hue={graphite} seed={seed + 2} weight={.8} opacity={.28} />
    </g>
  );
}

function ChoiceBranch({ x, y, hue = "teal" as Hue, seed = 1 }: { x: number; y: number; hue?: Hue; seed?: number }) {
  return (
    <g aria-hidden="true">
      <Pencil runs={[bowPts(x, y + 34, x + 34, y, -.14, seed), bowPts(x, y + 34, x + 56, y + 34, .16, seed + 1)]}
        hue={hue} seed={seed + 2} passes={2} weight={1.2} opacity={.58} />
      <Ball cx={x} cy={y + 34} rx={4} ry={4} hue={hue} seed={seed + 3} count={4} weight={1.1} opacity={.7} />
      <Ball cx={x + 34} cy={y} rx={4} ry={4} hue={hue} seed={seed + 4} count={4} weight={1.1} opacity={.7} />
      <Ball cx={x + 56} cy={y + 34} rx={4} ry={4} hue={hue} seed={seed + 5} count={4} weight={1.1} opacity={.7} />
    </g>
  );
}

function ArtAsset({ src, alt, variant }: { src: string; alt: string; variant: string }) {
  return (
    <div className={`sf-plate jdr-art-asset ${variant}`} role="img" aria-label={alt}>
      {/* Authored canvas art stays as a static public asset so its paper grain is preserved. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden="true" draggable={false} decoding="async" />
    </div>
  );
}

export function WorkplaceAtlas() {
  return <ArtAsset variant="jdr-art-opening" src="/jdr-target-assets/jdr-opening.png"
    alt="Coloured-pencil workplace atlas showing one working world with pressure, deadlines and health impairment in vermilion above, and support, autonomy, feedback and motivation in teal below."
  />;
}

export function ConditionField() {
  return (
    <Plate viewBox="0 0 820 330" ratio="820 / 330"
      title="The same job is held in one shared field. Its conditions can be read as job demands or job resources according to what they do in that occupation; neither category is a moral label.">
      <Ghost x={30} y={18} w={760} h={280} seed={301} count={7} opacity={.13} />
      <Contour points={[[85, 176], [148, 87], [329, 61], [468, 76], [651, 57], [751, 126], [711, 259], [523, 286], [318, 267], [127, 280]]}
        hue={graphite} seed={303} weight={1.1} opacity={.26} dash="7 8" wobble={5} />
      <Field x={86} y={95} w={236} h={154} hue="vermilion" seed={311} passes={9} rows={8} angle={-15} weight={.11} width={1.4} />
      <Field x={498} y={97} w={236} h={154} hue="teal" seed={317} passes={9} rows={8} angle={13} weight={.11} width={1.4} />
      <Tag x={98} y={85} hue="vermilion" size={10}>conditions as cost</Tag>
      <Tag x={613} y={85} hue="teal" size={10}>conditions as capacity</Tag>
      <TaskStack x={111} y={131} w={83} hue="coral" seed={319} tilt={-5} />
      <Clock x={255} y={136} r={22} hue="vermilion" seed={325} />
      <Person x={408} y={208} hue="cobalt" seed={331} scale={.76} />
      <Desk x={345} y={224} w={137} h={34} seed={337} />
      <Speech x={520} y={131} w={88} hue="sky" seed={343} />
      <ChoiceBranch x={630} y={145} hue="teal" seed={349} />
      <Term x={412} y={150} size={17} hue="charcoal" weight={520}>one job</Term>
      <Note x={412} y={172} hue="graphite" size={14} anchor="middle">{"what the condition does here"}</Note>
      <Link x1={302} y1={190} x2={345} y2={209} hue="vermilion" bend={.08} seed={355} weight={1.1} opacity={.4} />
      <Link x1={520} y1={190} x2={482} y2={209} hue="teal" bend={-.08} seed={357} weight={1.1} opacity={.4} />
      <Note x={149} y={276} hue="vermilion" size={15} rotate={-4}>{"effort · cost · constraint"}</Note>
      <Note x={560} y={276} hue="teal" size={15} rotate={4}>{"support · capacity · growth"}</Note>
      <Note x={410} y={317} hue="graphite" size={14} anchor="middle">{"functional categories, not fixed lists"}</Note>
    </Plate>
  );
}

export function TwoCurrents() {
  return <ArtAsset variant="jdr-art-processes" src="/jdr-target-assets/jdr-processes.png"
    alt="Coloured-pencil organisational field showing two parallel currents from one job: pressure, sustained effort, incomplete recovery and health complaints above; support, autonomy, feedback, engagement and commitment below."
  />;
}

export function CostReturn() {
  return <ArtAsset variant="jdr-art-challenge" src="/jdr-target-assets/jdr-challenge-hindrance.png"
    alt="Coloured-pencil comparison of the same effort splitting into a challenge demand that supports new skills, problem solving, mastery and growth, or a hindrance demand marked by interruptions, red tape, friction and no meaningful return."
  />;
}

export function InteractionField() {
  return <ArtAsset variant="jdr-art-interaction" src="/jdr-target-assets/jdr-interaction.png"
    alt="Coloured-pencil interaction field showing the same work situation, demands on the left, and resources changing the connection through buffering and boosting on the right."
  />;
}

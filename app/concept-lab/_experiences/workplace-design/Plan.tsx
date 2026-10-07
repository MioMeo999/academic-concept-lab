import * as hand from "../../_folio/hand";
import { CROWDED, DESK, DOOR, PLAN, SEATS, WINDOWS, chairAt, deskLinks, seatsFor, sightPairs, type Pt, type Seat } from "./geometry";
import s from "./wp.module.css";

/* ---------------------------------------------------------------------------
   The room and what can be drawn on it. Each piece is a group of marks in the
   plan's own coordinates (640 × 400), so any of them can be laid over the base
   plan — or over one another — and keep to the same room.
   ------------------------------------------------------------------------- */

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 6, wander = 1.4) => hand.line(x1, y1, x2, y2, { seed, wander, segments });
const trace = (pts: Pt[], seed: number, closed = false) => {
  const loop = closed ? [...pts, pts[0]] : pts;
  return loop.slice(1).map((p, i) => L(loop[i][0], loop[i][1], p[0], p[1], seed + i, 3, 0.9)).join(" ");
};
const rect = (x: number, y: number, w: number, h: number): Pt[] => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];

/** walls, windows, the door, and every desk with its monitor */
export function PlanBase({ children }: { children?: React.ReactNode }) {
  const { x0, y0, x1, y1 } = PLAN;
  const top: string[] = [];
  let cur = x0;
  WINDOWS.forEach(([a, b], i) => { top.push(L(cur, y0, a, y0, 100 + i, 4, 1)); cur = b; });
  top.push(L(cur, y0, x1, y0, 110, 4, 1));
  const walls = [
    ...top,
    L(x0, y1, DOOR[0], y1, 111, 8, 1), L(DOOR[1], y1, x1, y1, 112, 8, 1),
    L(x0, y0, x0, y1, 113, 8, 1), L(x1, y0, x1, y1, 114, 8, 1),
  ].join(" ");
  const windows = WINDOWS.map(([a, b], i) => L(a, y0 - 3, b, y0 - 3, 120 + i, 4, 0.5) + " " + L(a, y0 + 3, b, y0 + 3, 130 + i, 4, 0.5)).join(" ");
  const door = L(DOOR[0], y1, DOOR[0], y1 - (DOOR[1] - DOOR[0]), 140, 4, 0.5) + " " + hand.curve(Array.from({ length: 9 }, (_, i) => { const t = -(i / 8) * (Math.PI / 2); return [DOOR[0] + Math.cos(t) * (DOOR[1] - DOOR[0]), y1 + Math.sin(t) * (DOOR[1] - DOOR[0])] as Pt; }), { seed: 141, wander: 0.4 });
  return (
    <g className={s.planBase}>
      <path className={s.wall} d={walls} filter="url(#folio-graphite)" />
      <path className={s.window} d={windows} filter="url(#folio-pencil)" />
      <path className={s.doorSwing} d={door} filter="url(#folio-pencil)" />
      {SEATS.map((seat) => (
        <g key={seat.id}>
          <path className={s.deskFill} d={`M${seat.x - DESK.w / 2} ${seat.y - DESK.h / 2}h${DESK.w}v${DESK.h}h${-DESK.w}z`} />
          <path className={s.desk} d={trace(rect(seat.x - DESK.w / 2, seat.y - DESK.h / 2, DESK.w, DESK.h), 200 + seat.id * 5, true)} filter="url(#folio-pencil)" />
          <path className={s.monitor} d={trace(rect(seat.x - 13, seat.y - 12, 26, 9), 300 + seat.id * 5, true)} filter="url(#folio-pencil)" />
        </g>
      ))}
      {children}
    </g>
  );
}

const shoulders = (cx: number, cy: number): string => {
  const pts: Pt[] = Array.from({ length: 13 }, (_, i) => { const t = Math.PI + (i / 12) * Math.PI; return [cx + Math.cos(t) * 24, cy + 14 - Math.sin(t) * 12] as Pt; });
  return hand.curve(pts, { seed: 7, wander: 0.4 });
};

/** a head and a pair of shoulders, seen from above, at every present seat */
export function People({ ids = CROWDED, className }: { ids?: number[]; className?: string }) {
  return (
    <g className={[s.people, className].filter(Boolean).join(" ")}>
      {seatsFor(ids).map((seat) => {
        const [cx, cy] = chairAt(seat);
        return (
          <g key={seat.id} className={s.person}>
            <path className={s.shoulderFill} d={`${shoulders(cx, cy)}Z`} />
            <path className={s.shoulder} d={shoulders(cx, cy)} filter="url(#folio-pencil)" />
            <path className={s.head} d={hand.ring(cx, cy, 11, 11, { seed: 400 + seat.id })} filter="url(#folio-pencil)" />
          </g>
        );
      })}
    </g>
  );
}

/** who sits near whom: the desks that share an edge or a row */
export function AdjacencyLayer() {
  return (
    <g className={s.adjacency}>
      {deskLinks().map(([a, b], i) => (
        <path key={i} d={L(a.x + (b.x > a.x ? DESK.w / 2 : 0), a.y + (b.y > a.y ? DESK.h / 2 : 0), b.x - (b.x > a.x ? DESK.w / 2 : 0), b.y - (b.y > a.y ? DESK.h / 2 : 0), 500 + i, 4, 1)} filter="url(#folio-pencil)" />
      ))}
    </g>
  );
}

/** quiet: nothing; steady: one sound, the same everywhere; talk: rings round whoever is talking, and words that drift */
export function SoundLayer({ mode, talkers }: { mode: "quiet" | "steady" | "talk"; talkers: number[] }) {
  if (mode === "quiet") return <g className={s.sound} />;
  if (mode === "steady") {
    return (
      <g className={s.sound}>
        {[64, 132, 200, 268, 336].map((y, i) => (
          <path key={y} className={s.hum} d={hand.curve(Array.from({ length: 15 }, (_, k) => [44 + k * 40, y + (k % 2 ? -7 : 7)] as Pt), { seed: 620 + i, wander: 0.5 })} filter="url(#folio-pencil)" />
        ))}
      </g>
    );
  }
  return (
    <g className={s.sound}>
      {seatsFor(talkers).map((seat) => {
        const [cx, cy] = chairAt(seat);
        return (
          <g key={seat.id}>
            {[28, 50, 74].map((r, k) => <path key={r} className={s.ring} style={{ opacity: 0.9 - k * 0.24 }} d={hand.ring(cx, cy, r, r, { seed: 600 + seat.id * 3 + k, wobble: 0.03 })} filter="url(#folio-pencil)" />)}
            {[[-40, -30], [36, -36], [-6, 50]].map(([dx, dy], k) => <path key={k} className={s.word} d={hand.curve([[cx + dx, cy + dy], [cx + dx + 9, cy + dy - 3], [cx + dx + 16, cy + dy + 3]], { seed: 700 + seat.id + k, wander: 0.3 })} filter="url(#folio-pencil)" />)}
          </g>
        );
      })}
    </g>
  );
}

/** what each person could see of the others */
export function SightLayer({ ids }: { ids: number[] }) {
  return (
    <g className={s.sight}>
      {sightPairs(ids).map(([a, b], i) => {
        const [ax, ay] = chairAt(a), [bx, by] = chairAt(b);
        return <path key={i} d={L(ax, ay, bx, by, 800 + i, 6, 1.2)} filter="url(#folio-pencil)" />;
      })}
    </g>
  );
}

/** a private disc round every person; where discs overlap, the room is crowded */
export function SpaceLayer({ ids }: { ids: number[] }) {
  return (
    <g className={s.space}>
      {seatsFor(ids).map((seat) => {
        const [cx, cy] = chairAt(seat);
        return (
          <g key={seat.id}>
            <circle className={s.spaceFill} cx={cx} cy={cy - 6} r={54} />
            <path className={s.spaceEdge} d={hand.ring(cx, cy - 6, 54, 54, { seed: 900 + seat.id, wobble: 0.02 })} filter="url(#folio-pencil)" />
          </g>
        );
      })}
    </g>
  );
}

/** light at the windows, warmth near them, and a draught by the door */
export function LightLayer() {
  const { y0 } = PLAN;
  return (
    <g className={s.light}>
      <rect className={s.warm} x={PLAN.x0 + 8} y={y0 + 8} width={PLAN.w - 64} height={104} rx="6" />
      <rect className={s.cool} x={252} y={296} width={136} height={72} rx="6" />
      {WINDOWS.map(([a, b], w) => Array.from({ length: 7 }, (_, i) => {
        const x = a + ((b - a) * (i + 0.5)) / 7;
        return <path key={`${w}-${i}`} className={s.ray} d={L(x, y0 + 8, x + 26 + (i % 3) * 5, y0 + 98 + (i % 4) * 14, 1000 + w * 10 + i, 4, 0.8)} filter="url(#folio-pencil)" />;
      }))}
    </g>
  );
}

/** the chair and the screen, the immediate physical support for the body at work */
export function FurnitureLayer() {
  return (
    <g className={s.furniture}>
      {SEATS.map((seat) => {
        const [cx, cy] = chairAt(seat);
        return (
          <g key={seat.id}>
            <path className={s.chair} d={hand.ring(cx, cy + 4, 19, 15, { seed: 1100 + seat.id, wobble: 0.03 })} filter="url(#folio-pencil)" />
            <path className={s.screenFill} d={`M${seat.x - 13} ${seat.y - 12}h26v9h-26z`} />
          </g>
        );
      })}
    </g>
  );
}

/** enclosed: a box round every desk with a gap for the door; mixed: low panels between neighbours; open: nothing */
export function Partitions({ state }: { state: "enclosed" | "mixed" | "open" }) {
  const box = (seat: Seat) => {
    const x0 = seat.x - 66, x1 = seat.x + 66, y0 = seat.y - 42, y1 = seat.y + 50;
    return L(x0, y1, x0, y0, 1200 + seat.id * 4, 5, 0.9) + L(x0, y0, x1, y0, 1201 + seat.id * 4, 6, 0.9) + L(x1, y0, x1, y1, 1202 + seat.id * 4, 5, 0.9)
      + L(x0, y1, seat.x - 18, y1, 1203 + seat.id * 4, 3, 0.7) + L(seat.x + 18, y1, x1, y1, 1204 + seat.id * 4, 3, 0.7);
  };
  const panels = (seat: Seat) => L(seat.x - 68, seat.y - 30, seat.x - 68, seat.y + 40, 1300 + seat.id * 2, 4, 0.8) + L(seat.x + 68, seat.y - 30, seat.x + 68, seat.y + 40, 1301 + seat.id * 2, 4, 0.8);
  return (
    <g className={s.partitions} data-state={state}>
      <path className={s.boxes} d={SEATS.map(box).join(" ")} filter="url(#folio-graphite)" />
      <path className={s.panels} d={SEATS.map(panels).join(" ")} filter="url(#folio-graphite)" />
    </g>
  );
}

/** communication between neighbours, and privacy round each person: weight by state, never by count */
export function StrandsAndBubbles({ ids, comm, privacy }: { ids: number[]; comm: number; privacy: number }) {
  const present = new Set(ids);
  const pairs = deskLinks().filter(([a, b]) => present.has(a.id) && present.has(b.id));
  return (
    <g>
      <g className={s.strands} style={{ strokeWidth: 1.4 + comm * 4.6, strokeDasharray: comm < 0.3 ? "2 10" : comm < 0.7 ? "9 6" : "none" }}>
        {pairs.map(([a, b], i) => {
          const [ax, ay] = chairAt(a), [bx, by] = chairAt(b);
          return <path key={i} d={L(ax, ay, bx, by, 1400 + i, 6, 1)} filter="url(#folio-pencil)" />;
        })}
      </g>
      <g className={s.bubbles} style={{ strokeWidth: 1.1 + privacy * 3.6, strokeDasharray: privacy > 0.8 ? "none" : privacy > 0.4 ? "10 6" : "3 12" }}>
        {seatsFor(ids).map((seat) => {
          const [cx, cy] = chairAt(seat);
          return <path key={seat.id} d={hand.ring(cx, cy - 4, 40, 40, { seed: 1500 + seat.id, wobble: 0.03 })} filter="url(#folio-pencil)" />;
        })}
      </g>
    </g>
  );
}

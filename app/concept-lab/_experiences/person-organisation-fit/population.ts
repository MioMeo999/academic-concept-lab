/* ---------------------------------------------------------------------------
   Attraction–Selection–Attrition, as a toy.

   Schneider (1987): people are attracted to organisations they perceive as
   compatible, organisations select those who appear to fit, and those who do
   not fit leave — three stages, running continuously, so that the organisation
   grows more homogeneous without anyone deciding that it should.

   Nothing below is a finding. It is a made-up room of made-up people, each
   carrying one of four marks, with three separate rules that each look
   reasonable from where they are applied:

     attraction  a candidate applies if their mark is among the two most common
                 in the room — they can see someone like them at the door
     selection   the organisation admits applicants whose mark is the room's
                 most common, up to three openings — it picks people who look
                 like the people it has
     attrition   whoever holds the room's rarest mark leaves — they are the
                 smallest minority

   The rules have no exceptions and no randomness, so the same click always
   gives the same room. That is the toy's limit as well as its clarity: it says
   what three quiet filters do when they lean the same way, and nothing about
   how fast or how far a real organisation sorts.
   ------------------------------------------------------------------------- */

export type Mark = 0 | 1 | 2 | 3;
export type Stage = "start" | "attraction" | "selection" | "attrition";
export type Where = "pool" | "queue" | "room" | "gone";

export const MARKS = [
  { id: "ring", name: "ring", hue: "var(--teal)" },
  { id: "bar", name: "bar", hue: "var(--red)" },
  { id: "cross", name: "cross", hue: "var(--gold)" },
  { id: "chevron", name: "chevron", hue: "var(--violet)" },
] as const;

export const STAGES: Stage[] = ["start", "attraction", "selection", "attrition"];
export const ROUNDS = 3;
export const OPENINGS = 3;

export type Person = { id: string; mark: Mark; where: Where; slot: number; home: number };

/* ---- the geometry of the drawing: 1000 wide, room above, street below ---- */

export const UNITS = { w: 1000, h: 880 };
export const ROOM_COLS = 7;
export const ROOM_ROWS = 3;
export const ROOM_SLOTS = ROOM_COLS * ROOM_ROWS;
const ROOM_X = (col: number) => 118 + col * 127;
const ROOM_FEET = [220, 350, 480];
export const DOOR = { x0: 370, x1: 630, y: 500 };
const STREET_FEET = [636, 754];
const GONE_FEET = 862;

/** The row nearest the doorway fills first, from the middle outward. */
export const FILL_ORDER: number[] = Array.from({ length: ROOM_SLOTS }, (_, i) => i).sort((a, b) => {
  const [ra, ca] = [Math.floor(a / ROOM_COLS), a % ROOM_COLS];
  const [rb, cb] = [Math.floor(b / ROOM_COLS), b % ROOM_COLS];
  return rb - ra || Math.abs(ca - 3) - Math.abs(cb - 3) || ca - cb;
});

const POOL_X = [70, 176, 282, 718, 824, 930];
const QUEUE_X = [400, 500, 600];

/** Where a person stands, in drawing units, at their feet. */
export function place(p: Pick<Person, "where" | "slot">): { x: number; y: number } {
  if (p.where === "room") return { x: ROOM_X(p.slot % ROOM_COLS), y: ROOM_FEET[Math.floor(p.slot / ROOM_COLS)] };
  if (p.where === "queue") return { x: QUEUE_X[p.slot % 3], y: STREET_FEET[Math.floor(p.slot / 3)] };
  if (p.where === "gone") return { x: 100 + 115 * p.slot, y: GONE_FEET };
  // pool: left block (slots 0–5), right block (6–11), three across, two deep
  const i = p.slot % 6, block = p.slot < 6 ? 0 : 3;
  return { x: POOL_X[block + (i % 3)], y: STREET_FEET[Math.floor(i / 3)] };
}

/* ---- the state of the room --------------------------------------------- */

// Who works here at the start: two rows of the room, mixed on purpose.
const START_ROOM: (Mark | null)[] = [
  0, 1, 2, 0, 3, 1, 2,
  null, 0, 3, 1, 0, 2, null,
];
// The crowd outside, every round: three of each kind, scattered.
const POOL_MARKS: Mark[] = [0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3];

const freshPool = (round: number): Person[] =>
  POOL_MARKS.map((mark, i) => ({ id: `p${round}-${i}`, mark, where: "pool" as const, slot: i, home: i }));

const initial = (): Person[] => {
  const room: Person[] = [];
  START_ROOM.forEach((mark, slot) => { if (mark != null) room.push({ id: `r0-${slot}`, mark, where: "room", slot, home: slot }); });
  return [...room, ...freshPool(1)];
};

/** How many of each mark are in the room. */
export const roomCounts = (people: Person[]): number[] => {
  const c = [0, 0, 0, 0];
  for (const p of people) if (p.where === "room") c[p.mark]++;
  return c;
};

// Marks in the room, most common first; ties go to the lower mark.
const commonFirst = (c: number[]): Mark[] => ([0, 1, 2, 3] as Mark[]).filter((m) => c[m] > 0).sort((a, b) => c[b] - c[a] || a - b);

export type RoundInfo = {
  /** the two marks a candidate looks for at the door */
  seenAtDoor: Mark[];
  applicants: number;
  /** the mark the organisation prefers, and how many it admitted or turned away */
  preferred: Mark;
  admitted: number;
  turnedAway: number;
  /** who left, by mark */
  left: number[];
};

function attract(people: Person[]) {
  const seenAtDoor = commonFirst(roomCounts(people)).slice(0, 2);
  let q = 0;
  const next = people.map((p) => (p.where === "pool" && seenAtDoor.includes(p.mark) && q < 6 ? { ...p, where: "queue" as const, slot: q++ } : p));
  return { people: next, seenAtDoor, applicants: q };
}

function select(people: Person[]) {
  const preferred = commonFirst(roomCounts(people))[0];
  const occupied = new Set(people.filter((p) => p.where === "room").map((p) => p.slot));
  const free = FILL_ORDER.filter((i) => !occupied.has(i));
  let admitted = 0;
  const next = people.map((p) => {
    if (p.where !== "queue") return p;
    if (p.mark === preferred && admitted < OPENINGS && free.length) return { ...p, where: "room" as const, slot: free[admitted++] };
    return { ...p, where: "pool" as const, slot: p.home };
  });
  const applicants = people.filter((p) => p.where === "queue").length;
  return { people: next, preferred, admitted, turnedAway: applicants - admitted };
}

function leave(people: Person[]) {
  const c = roomCounts(people);
  const present = commonFirst(c);
  const left = [0, 0, 0, 0];
  // one kind alone has no minority to lose
  if (present.length < 2) return { people, left };
  const fewest = Math.min(...present.map((m) => c[m]));
  const rarest = present.filter((m) => c[m] === fewest).sort((a, b) => b - a)[0];
  let g = people.filter((p) => p.where === "gone").length;
  const next = people.map((p) => {
    if (p.where === "room" && p.mark === rarest) { left[p.mark]++; return { ...p, where: "gone" as const, slot: Math.min(g++, 7) }; }
    return p;
  });
  return { people: next, left };
}

export type Snapshot = {
  round: number;
  stage: Stage;
  people: Person[];
  counts: number[];
  kinds: number;
  /** the mark most common in the room now: the one on the pennant */
  pennant: Mark;
  info: RoundInfo;
};

const cache = new Map<string, Snapshot>();

function build(): void {
  let start = initial();
  for (let round = 1; round <= ROUNDS; round++) {
    const a = attract(start);
    const s = select(a.people);
    const l = leave(s.people);
    const info: RoundInfo = { seenAtDoor: a.seenAtDoor, applicants: a.applicants, preferred: s.preferred, admitted: s.admitted, turnedAway: s.turnedAway, left: l.left };
    const stages: [Stage, Person[]][] = [["start", start], ["attraction", a.people], ["selection", s.people], ["attrition", l.people]];
    for (const [stage, people] of stages) {
      const counts = roomCounts(people);
      cache.set(`${round}:${stage}`, { round, stage, people, counts, kinds: counts.filter((n) => n > 0).length, pennant: commonFirst(counts)[0] ?? 0, info });
    }
    // The next round opens on the same room and a fresh crowd: nothing has been learned.
    start = [...l.people.filter((p) => p.where === "room" || p.where === "gone"), ...freshPool(round + 1)];
  }
}

export function snapshot(round: number, stage: Stage): Snapshot {
  if (!cache.size) build();
  return cache.get(`${Math.min(Math.max(round, 1), ROUNDS)}:${stage}`)!;
}

/** The stage that follows this one; the last stage of the last round has none. */
export function next(round: number, stage: Stage): { round: number; stage: Stage } | null {
  const i = STAGES.indexOf(stage);
  if (i < STAGES.length - 1) return { round, stage: STAGES[i + 1] };
  return round < ROUNDS ? { round: round + 1, stage: "start" } : null;
}

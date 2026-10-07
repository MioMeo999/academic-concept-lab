/* ---------------------------------------------------------------------------
   Power–dependence, as a teaching reading.

   Emerson (1962): the power of B over A is equal to, and based upon, A's
   dependence on B. Dependence rises with the value A receives through B and
   falls as A's alternatives grow. Power is therefore the asymmetry between the
   two dependences, and it is not a score for either person.

   The three levels are the record's own teaching conditions
   (low / moderate / high value; many / some / few alternatives), indexed
   0..2 so that a higher index always means more dependence. Nothing here is
   a measurement.
   ------------------------------------------------------------------------- */

export type PowerState = { aValue: number; aAlt: number; bValue: number; bAlt: number };

/** A's dependence on B, and B's dependence on A, on the teaching scale 0..4. */
export function dependences(st: PowerState) {
  return { aOnB: st.aValue + st.aAlt, bOnA: st.bValue + st.bAlt };
}

export function powerReading(st: PowerState) {
  const { aOnB, bOnA } = dependences(st);
  // The more dependent actor is the one the other has power over.
  const balance = aOnB === bOnA ? "balanced power" : aOnB > bOnA ? "B has more relational power" : "A has more relational power";
  // Power balance and total mutual dependence are different questions.
  const mutual = aOnB >= 3 && bOnA >= 3 ? "high mutual dependence" : aOnB <= 1 && bOnA <= 1 ? "low mutual dependence" : "mixed mutual dependence";
  return { balance, mutual };
}

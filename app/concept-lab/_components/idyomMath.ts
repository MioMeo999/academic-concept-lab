export type ProbabilityEntry = { event: string; probability: number };

export function probabilitySum(entries: ProbabilityEntry[]) {
  return entries.reduce((sum, entry) => sum + entry.probability, 0);
}

export function entropyBits(entries: ProbabilityEntry[]) {
  return entries.reduce(
    (sum, entry) => entry.probability > 0 ? sum - entry.probability * Math.log2(entry.probability) : sum,
    0,
  );
}

export function informationBits(entries: ProbabilityEntry[], actualEvent: string) {
  const actual = entries.find((entry) => entry.event === actualEvent);
  if (!actual || actual.probability <= 0) throw new Error(`No positive probability for ${actualEvent}`);
  return -Math.log2(actual.probability);
}

export function assertProbabilityDistribution(entries: ProbabilityEntry[]) {
  const sum = probabilitySum(entries);
  if (Math.abs(sum - 1) > 1e-12 || entries.some((entry) => entry.probability < 0)) {
    throw new Error(`Invalid probability distribution: sum=${sum}`);
  }
  return sum;
}

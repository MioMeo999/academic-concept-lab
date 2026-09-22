export const GATE_STATUSES = ["PASS", "FAIL"];
export const REVIEW_STATUSES = ["CLEAR", "WARN"];

export function deriveStatuses(options = {}) {
  const gateFailures = options.gateFailures ?? [];
  const reviewWarnings = options.reviewWarnings ?? [];
  return {
    gateStatus: gateFailures.length ? "FAIL" : "PASS",
    reviewStatus: reviewWarnings.length ? "WARN" : "CLEAR",
    gateFailures,
    reviewWarnings,
  };
}

export function summarizeResults(results) {
  return results.reduce((summary, result) => {
    summary.gatePass += result.gateStatus === "PASS" ? 1 : 0;
    summary.gateFail += result.gateStatus === "FAIL" ? 1 : 0;
    summary.reviewClear += result.reviewStatus === "CLEAR" ? 1 : 0;
    summary.reviewWarn += result.reviewStatus === "WARN" ? 1 : 0;
    return summary;
  }, { gatePass: 0, gateFail: 0, reviewClear: 0, reviewWarn: 0 });
}

export function screenshotSource(result, kind) {
  if (kind === "fold") return result.viewportScreenshotPath;
  if (kind === "ecology") return result.screenshotPath;
  throw new Error(`Unknown contact-sheet kind: ${kind}`);
}

export function contactSheetFilename(tier, kind) {
  return `${tier}-${kind === "fold" ? "fold" : "ecology"}-contact-sheet.png`;
}

export function resultLabel(result) {
  const gate = result.gateStatus ?? (result.status === "FAIL" ? "FAIL" : "PASS");
  const review = result.reviewStatus ?? (result.status === "WARN" ? "WARN" : "CLEAR");
  if (gate === "FAIL") return "FAIL";
  if (review === "WARN") return result.axeSummary?.violationCount ? `PASS · AXE ${result.axeSummary.violationCount}` : "PASS · REVIEW";
  return "PASS";
}

export function exitCodeForSummary(summary) {
  return summary.gateFail > 0 ? 1 : 0;
}

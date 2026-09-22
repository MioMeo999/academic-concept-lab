import { execFileSync, spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";
import { routesForMode, VIEWPORTS } from "./verification-routes.mjs";
import { deriveStatuses, exitCodeForSummary, summarizeResults } from "./verification-model.mjs";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const DEFAULT_EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const DEFAULT_OUTPUT = join("D:", "OpenAI", "CodexHome", "visualizations", new Date().toISOString().slice(0, 10), "concept-lab-verification");

function arg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const mode = arg("mode", "representative");
const outputRoot = resolve(arg("output", process.env.CONCEPT_LAB_VERIFY_OUTPUT || DEFAULT_OUTPUT));
const suppliedBaseUrl = arg("base-url", process.env.CONCEPT_LAB_VERIFY_BASE_URL);
const serverMode = arg("server", process.env.CONCEPT_LAB_VERIFY_SERVER || "dev");
const expectedRoutes = routesForMode(mode);
const essentialResourceTypes = new Set(["document", "script", "stylesheet", "font", "image"]);

async function loadExperienceContext() {
  try {
    const source = await readFile(resolve("app/concept-lab/_design/experience-manifest.ts"), "utf8");
    const context = new Map();
    for (const block of source.replace(/\r\n/g, "\n").split(/\n\s*\},\n\s*\{/)) {
      const experienceId = block.match(/experienceId:\s*"([^"]+)"/)?.[1];
      const route = block.match(/route:\s*"([^"]+)"/)?.[1];
      const status = block.match(/status:\s*"(benchmark|frozen)"/)?.[1];
      if (experienceId && route && status) context.set(route, { experienceId, status, notice: status === "frozen" ? "FROZEN EXPERIENCE — VISUAL CHANGE REQUIRES EXPLICIT REVIEW" : "BENCHMARK EXPERIENCE — VISUAL CHANGE REQUIRES REVIEW" });
    }
    return context;
  } catch {
    return new Map();
  }
}

function safeSlug(value) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}

function now() {
  return new Date().toISOString();
}

async function waitForServer(baseUrl, child) {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/concept-lab`);
      if (response.status < 500) return;
    } catch {
      // The start command may take a few seconds to bind.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
  }
  child?.kill();
  throw new Error(`Timed out waiting for the local production server at ${baseUrl}`);
}

async function startLocalServer() {
  const port = Number(process.env.CONCEPT_LAB_VERIFY_PORT || (4300 + (process.pid % 400)));
  const command = `npm run ${serverMode} -- --port ${port}`;
  const child = spawn(command, {
    cwd: process.cwd(),
    env: process.env,
    stdio: "pipe",
    shell: true,
    windowsHide: true,
  });
  child.stdout.on("data", () => {});
  child.stderr.on("data", () => {});
  const baseUrl = `http://localhost:${port}`;
  await waitForServer(baseUrl, child);
  return { baseUrl, child };
}

async function navigate(page, url) {
  let attempts = 0;
  while (attempts < 2) {
    attempts += 1;
    try {
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
      return { response, attempts, retry: attempts > 1 ? "dev-navigation-retry" : null };
    } catch (error) {
      const isDevTimeout = serverMode === "dev" && /timeout/i.test(error.message || "");
      if (!isDevTimeout || attempts >= 2) throw Object.assign(error, { navigationAttempts: attempts });
      await page.waitForTimeout(800);
    }
  }
  throw new Error(`Navigation failed for ${url}`);
}

async function dimensions(page) {
  return page.evaluate(() => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    bodyScrollWidth: document.body?.scrollWidth ?? 0,
  }));
}

async function structure(page) {
  return page.evaluate(() => {
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((node) => ({
      level: Number(node.tagName.slice(1)),
      text: (node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 140),
    }));
    const images = [...document.images].map((image) => ({
      src: image.currentSrc || image.src,
      hasAlt: image.hasAttribute("alt"),
      alt: image.getAttribute("alt"),
      complete: image.complete,
      naturalWidth: image.naturalWidth,
    }));
    const controls = [...document.querySelectorAll("button,input,select,textarea,[role='button'],[role='tab']")].map((node) => ({
      tag: node.tagName.toLowerCase(),
      role: node.getAttribute("role"),
      name: (node.getAttribute("aria-label") || node.getAttribute("title") || node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
      pressed: node.getAttribute("aria-pressed"),
      selected: node.getAttribute("aria-selected"),
    }));
    const levelSkips = headings.some((heading, index) => index > 0 && heading.level > headings[index - 1].level + 1);
    return {
      headings,
      headingSummary: { count: headings.length, h1: headings.filter((item) => item.level === 1).length, levelSkips },
      images,
      imageAltSummary: {
        total: images.length,
        missingAlt: images.filter((image) => !image.hasAlt).length,
        emptyAlt: images.filter((image) => image.hasAlt && image.alt === "").length,
        failed: images.filter((image) => image.complete && image.naturalWidth === 0).length,
        pending: images.filter((image) => !image.complete).length,
      },
      controls,
      landmarks: { main: document.querySelectorAll("main").length, nav: document.querySelectorAll("nav").length, header: document.querySelectorAll("header").length, footer: document.querySelectorAll("footer").length },
    };
  });
}

async function focusCheck(page) {
  await page.keyboard.press("Tab");
  return page.evaluate(() => {
    const active = document.activeElement;
    if (!active) return { found: false };
    const style = getComputedStyle(active);
    const rect = active.getBoundingClientRect();
    return {
      found: true,
      tag: active.tagName.toLowerCase(),
      name: (active.getAttribute("aria-label") || active.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
      visible: rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none",
      focusStyle: style.outlineStyle !== "none" || style.boxShadow !== "none",
    };
  });
}

async function controlState(control) {
  return control.evaluate((node) => {
    const element = node;
    return {
      pressed: element.getAttribute("aria-pressed"),
      selected: element.getAttribute("aria-selected"),
      expanded: element.getAttribute("aria-expanded"),
      text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 180),
      href: element.getAttribute("href"),
      tag: element.tagName.toLowerCase(),
    };
  });
}

async function runProbe(page, probe, { baseUrl } = {}) {
  const result = {
    probeId: probe.id,
    selector: probe.selector,
    accessibleTarget: probe.accessibleTarget,
    attempted: false,
    keyboardMethod: probe.keyboardMethod,
    stateBefore: null,
    stateAfter: null,
    expectedChange: probe.expectedChange,
    observedChange: "",
    status: "NOT_APPLICABLE",
    note: "",
  };
  const control = page.locator(probe.selector).first();
  if (await control.count() === 0) {
    result.note = probe.optional ? "Configured control is not present at this route/state." : "Required conceptual control is not present.";
    result.status = probe.optional ? "NOT_APPLICABLE" : "FAIL";
    return result;
  }
  result.attempted = true;
  await control.focus();
  result.stateBefore = await controlState(control);
  if (probe.kind === "link") {
    const href = result.stateBefore.href;
    const resolved = href ? new URL(href, page.url()) : null;
    const prefixOkay = Boolean(resolved && resolved.pathname.startsWith(probe.expectedHrefPrefix || "/concept-lab/"));
    let httpStatus = null;
    if (resolved && baseUrl) {
      try { httpStatus = (await fetch(resolved.href, { redirect: "manual" })).status; } catch { /* route status is recorded as unavailable */ }
    }
    result.stateAfter = result.stateBefore;
    result.observedChange = `focusable link; href ${href || "missing"}; resolved status ${httpStatus ?? "unavailable"}`;
    result.status = prefixOkay && (!httpStatus || (httpStatus >= 200 && httpStatus < 400)) ? "PASS" : "FAIL";
    result.note = "The link was inspected without activating navigation.";
    return result;
  }
  if (probe.keyboardMethod !== "focus") await page.keyboard.press(probe.keyboardMethod);
  await page.waitForTimeout(100);
  result.stateAfter = await controlState(control);
  const stateChanged = JSON.stringify(result.stateBefore) !== JSON.stringify(result.stateAfter);
  const stableReference = probe.stableSelector ? await page.locator(probe.stableSelector).count() > 0 : true;
  result.observedChange = stateChanged ? "accessible state or live text changed" : "accessible state and live text remained stable";
  result.status = stateChanged && stableReference ? "PASS" : "FAIL";
  result.note = stableReference ? "The configured conceptual control remained available after keyboard activation." : `Stable reference ${probe.stableSelector} was not found after activation.`;
  return result;
}

async function runSaveProbe(page, probe) {
  const result = await runProbe(page, { ...probe, kind: "toggle" });
  if (result.status === "FAIL" || result.status === "NOT_APPLICABLE") return result;
  const save = page.locator(probe.selector).first();
  if ((await save.getAttribute("aria-pressed")) !== "true") await save.click();
  const pressed = await save.getAttribute("aria-pressed");
  await page.waitForTimeout(250);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(350);
  const restored = await page.locator(probe.selector).first().getAttribute("aria-pressed");
  const storageValue = await page.evaluate(() => localStorage.getItem("acl:saved"));
  result.stateAfter = { ...result.stateAfter, restoredAriaPressed: restored, storageValue };
  result.observedChange = `aria-pressed=${pressed}; restored aria-pressed=${restored}; storage=${storageValue ?? "null"}`;
  result.status = pressed === "true" && restored === "true" ? "PASS" : "FAIL";
  result.note = "Save state was toggled with keyboard activation and checked after reload.";
  await page.evaluate(() => localStorage.clear());
  return result;
}

async function interactionCheck(page, route, baseUrl) {
  const probes = route.probes ?? [];
  if (probes.length === 0) return { id: route.interaction, status: "NOT_APPLICABLE", probes: [] };
  const results = [];
  for (const probe of probes) results.push(probe.kind === "save" ? await runSaveProbe(page, probe) : await runProbe(page, probe, { baseUrl }));
  return { id: route.interaction, status: results.some((probe) => probe.status === "FAIL") ? "FAIL" : "PASS", probes: results };
}

async function launchBrowser(browserPath) {
  try {
    const browser = await chromium.launch({ headless: true, executablePath: browserPath });
    const context = await browser.newContext();
    return { browser, context, cdp: false, child: null };
  } catch (launchError) {
    // Some Windows policies reject Node's direct .exe spawn (spawn UNKNOWN).
    // Fall back to a normal cmd-hosted process and attach over CDP. This keeps
    // the harness usable without asking CI to install a second browser shell.
    const port = Number(process.env.CONCEPT_LAB_BROWSER_CDP_PORT || 9227);
    const userData = join(process.env.TEMP || "D:/AI-Portrait-Lab/cache/temp", `concept-lab-verify-${process.pid}`);
    const argumentList = ["--headless=new", "--no-sandbox", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${userData}`, "about:blank"];
    const escapedPath = browserPath.replace(/'/g, "''");
    const escapedArguments = argumentList.map((value) => `'${value.replace(/'/g, "''")}'`).join(",");
    const powershell = `$p=Start-Process -FilePath '${escapedPath}' -ArgumentList ${escapedArguments} -WindowStyle Hidden -PassThru; $p.Id`;
    const child = spawn("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", powershell], { stdio: ["ignore", "pipe", "ignore"], windowsHide: true });
    let pidText = "";
    child.stdout.on("data", (chunk) => { pidText += chunk.toString(); });
    await new Promise((resolvePromise) => child.once("close", resolvePromise));
    const browserPid = Number(pidText.trim().split(/\s+/).at(-1));
    const endpoint = `http://127.0.0.1:${port}`;
    const deadline = Date.now() + 20_000;
    while (Date.now() < deadline) {
      try {
        const response = await fetch(`${endpoint}/json/version`);
        if (response.ok) {
          const browser = await chromium.connectOverCDP(endpoint);
          const context = browser.contexts()[0];
          if (context) return { browser, context, cdp: true, child };
        }
      } catch {
        // Keep polling until the browser has bound its debugging endpoint.
      }
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
    }
    if (Number.isFinite(browserPid)) {
      try { execFileSync("taskkill.exe", ["/PID", String(browserPid), "/T", "/F"], { stdio: "ignore" }); } catch { /* already exited */ }
    }
    child.kill();
    throw new Error(`Could not launch browser directly (${launchError.message}) or attach over CDP.`);
  }
}

async function reducedMotionCheck(browser, url, viewport, route, baseUrl) {
  const context = browser.cdp ? browser.context : await browser.browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  if (browser.cdp) await page.emulateMedia({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  let navigationError = null;
  try {
    await navigate(page, url);
    await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => {});
    await page.waitForTimeout(150);
  } catch (error) {
    navigationError = error.message;
  }
  const result = navigationError ? { mediaMatches: false, buttons: 0, mainText: false } : await page.evaluate(() => ({
    mediaMatches: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    buttons: document.querySelectorAll("button,[role='button']").length,
    mainText: Boolean(document.querySelector("main")?.textContent?.trim()),
  }));
  const reducedProbes = [];
  if (!navigationError) {
    for (const probe of (route.probes ?? []).filter((item) => item.reducedMotion)) reducedProbes.push(await runProbe(page, probe, { baseUrl }));
  }
  if (browser.cdp) await page.close();
  else await context.close();
  return { ...result, errors, navigationError, probes: reducedProbes };
}

async function checkRoute(browser, baseUrl, route, viewport, experienceContext) {
  const page = await browser.context.newPage();
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  const consoleErrors = [];
  const consoleWarnings = [];
  const pageErrors = [];
  const failedRequests = [];
  page.on("console", (message) => (message.type() === "error" ? consoleErrors : message.type() === "warning" ? consoleWarnings : null)?.push(message.text()));
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    if (essentialResourceTypes.has(request.resourceType())) failedRequests.push({ url: request.url(), type: request.resourceType(), error: request.failure()?.errorText || "request failed" });
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && essentialResourceTypes.has(response.request().resourceType())) failedRequests.push({ url: response.url(), type: response.request().resourceType(), status: response.status() });
  });

  const url = `${baseUrl}${route.route}`;
  let response;
  let finalUrl = url;
  let navigationError = null;
  let navigationAttempts = 0;
  let navigationRetry = null;
  try {
    const navigation = await navigate(page, url);
    response = navigation.response;
    navigationAttempts = navigation.attempts;
    navigationRetry = navigation.retry;
    finalUrl = page.url();
    await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => {});
    await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
    await page.waitForTimeout(80);
  } catch (error) {
    navigationError = error.message;
  }

  let structureResult = { headings: [], headingSummary: { count: 0, h1: 0, levelSkips: false }, images: [], imageAltSummary: { total: 0, missingAlt: 0, emptyAlt: 0, failed: 0, pending: 0 }, controls: [], landmarks: {} };
  let dimensionResult = { innerWidth: viewport.width, innerHeight: viewport.height, scrollWidth: 0, scrollHeight: 0, bodyScrollWidth: 0 };
  let focusResult = { found: false };
  let interactionResult = { id: route.interaction, status: "not-applicable", details: [] };
  let reducedMotionResult = { mediaMatches: false, buttons: 0, mainText: false, errors: [] };
  let axeSummary = { violations: [], incomplete: [], violationCount: 0, incompleteCount: 0 };
  if (!navigationError && response) {
    structureResult = await structure(page);
    dimensionResult = await dimensions(page);
    focusResult = await focusCheck(page);
    interactionResult = await interactionCheck(page, route, baseUrl);
    reducedMotionResult = await reducedMotionCheck(browser, url, viewport, route, baseUrl);
    try {
      await page.addScriptTag({ path: axePath });
      const axe = await page.evaluate(async () => window.axe.run(document, { resultTypes: ["violations", "incomplete"] }));
      axeSummary = {
        violations: axe.violations.map((item) => ({ id: item.id, impact: item.impact, nodes: item.nodes.length })),
        incomplete: axe.incomplete.map((item) => ({ id: item.id, impact: item.impact, nodes: item.nodes.length })),
        violationCount: axe.violations.length,
        incompleteCount: axe.incomplete.length,
      };
    } catch (error) {
      axeSummary = { violations: [], incomplete: [{ id: "axe-run-error", impact: "unknown", nodes: 0, error: error.message }], violationCount: 0, incompleteCount: 1 };
    }
  }
  const screenshotPath = join(outputRoot, mode, safeSlug(route.id), `${viewport.id}.png`);
  const viewportScreenshotPath = join(outputRoot, mode, safeSlug(route.id), `${viewport.id}-viewport.png`);
  await mkdir(dirname(screenshotPath), { recursive: true });
  if (!navigationError) {
    await page.screenshot({ path: viewportScreenshotPath, fullPage: false });
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }
  await page.close();

  const overflow = dimensionResult.scrollWidth > dimensionResult.innerWidth + 1;
  const semanticFailure = structureResult.headingSummary.h1 !== 1 || structureResult.imageAltSummary.missingAlt > 0 || structureResult.landmarks.main !== 1 || !focusResult.found || !focusResult.visible || interactionResult.status === "FAIL" || reducedMotionResult.probes.some((probe) => probe.status === "FAIL");
  const gateFailures = [];
  if (navigationError) gateFailures.push("navigation-failure");
  if (!response || response.status() < 200 || response.status() >= 400) gateFailures.push("non-2xx-route");
  if (pageErrors.length) gateFailures.push("page-error");
  if (consoleErrors.length) gateFailures.push("console-error");
  if (failedRequests.length) gateFailures.push("essential-resource-failure");
  if (structureResult.imageAltSummary.failed) gateFailures.push("image-load-failure");
  if (overflow) gateFailures.push("horizontal-overflow");
  if (reducedMotionResult.errors.length || reducedMotionResult.navigationError) gateFailures.push("reduced-motion-failure");
  if (semanticFailure) gateFailures.push("semantic-or-interaction-failure");
  const reviewWarnings = ["human-visual-review-required"];
  if (axeSummary.violationCount || axeSummary.incompleteCount) reviewWarnings.push("axe-findings");
  if (consoleWarnings.length) reviewWarnings.push("console-warnings");
  if (navigationRetry) reviewWarnings.push(navigationRetry);
  if (experienceContext.get(route.route)?.status === "frozen") reviewWarnings.push("frozen-experience-review");
  const statuses = deriveStatuses({ gateFailures, reviewWarnings });
  return {
    timestamp: now(),
    route: route.route,
    routeId: route.id,
    rationale: route.reason,
    experience: experienceContext.get(route.route) ?? null,
    viewport,
    http: { status: response?.status() ?? null },
    finalUrl,
    consoleErrors,
    consoleWarnings,
    pageErrors,
    failedRequests,
    dimensions: { ...dimensionResult, overflow },
    headingSummary: structureResult.headingSummary,
    imageAltSummary: structureResult.imageAltSummary,
    landmarks: structureResult.landmarks,
    focusCheck: focusResult,
    interactionCheck: interactionResult,
    keyboardCheck: interactionResult,
    reducedMotionCheck: reducedMotionResult,
    axeSummary,
    screenshotPath,
    viewportScreenshotPath,
    gateStatus: statuses.gateStatus,
    reviewStatus: statuses.reviewStatus,
    gateFailures: statuses.gateFailures,
    reviewWarnings: statuses.reviewWarnings,
    status: statuses.gateStatus,
    navigationAttempts,
    navigationError,
  };
}

function markdownReport(report) {
  const counts = report.summary;
  const lines = [
    `# Wave 0C browser verification — ${report.mode}`,
    "",
    `Generated: ${report.timestamp}`,
    `Git SHA: \`${report.gitSha}\``,
    `Base URL: ${report.baseUrl}`,
    "",
    `**Structural gate:** ${counts.gatePass} PASS · ${counts.gateFail} FAIL`,
    `**Accessibility / human review:** ${counts.reviewWarn} WARN · ${counts.reviewClear} CLEAR`,
    "",
    "Automated checks cover HTTP/navigation, browser errors, essential resources, overflow, basic semantics, focus, keyboard state, reduced motion and axe findings. Screenshots are evidence for human visual review; this report never claims visual design passed automatically.",
    "",
    "| Route | Viewport | Gate | Review | Experience context | HTTP | Overflow | H1 | Images missing alt | Axe violations | Screenshot |",
    "| --- | ---: | --- | --- | --- | ---: | --- | ---: | ---: | ---: | --- |",
  ];
  for (const result of report.results) {
    lines.push(`| ${result.routeId} | ${result.viewport.label} | ${result.gateStatus} | ${result.reviewStatus} | ${result.experience?.notice ?? "—"} | ${result.http.status ?? "—"} | ${result.dimensions.overflow ? "yes" : "no"} | ${result.headingSummary.h1} | ${result.imageAltSummary.missingAlt} | ${result.axeSummary.violationCount} | ${result.screenshotPath} |`);
  }
  lines.push("", "## Review boundaries", "", "- Human review is required for visual ecology, hierarchy, materiality, density and conceptual continuity.", "- Axe findings are review warnings and do not become structural failures in this harness.", "- A route can be structurally healthy while still needing accessibility or visual review.", "- Fold sheets ask what the page first presents; ecology sheets ask what shape the whole page has. Neither is a pixel regression test.", "");
  return lines.join("\n");
}

async function main() {
  const started = suppliedBaseUrl ? null : await startLocalServer();
  const baseUrl = (suppliedBaseUrl || started.baseUrl).replace(/\/$/, "");
  await mkdir(outputRoot, { recursive: true });
  const browserPath = process.env.CONCEPT_LAB_BROWSER_PATH || DEFAULT_EDGE_PATH;
  const browser = await launchBrowser(browserPath);
  const experienceContext = await loadExperienceContext();
  const results = [];
  try {
    for (const route of expectedRoutes) {
      for (const viewport of VIEWPORTS) {
        results.push(await checkRoute(browser, baseUrl, route, viewport, experienceContext));
      }
    }
  } finally {
    await browser.browser.close();
    started?.child.kill();
  }
  const summary = summarizeResults(results);
  const report = { timestamp: now(), gitSha: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), mode, baseUrl, viewports: VIEWPORTS, routes: expectedRoutes, summary, results };
  const reportPath = join(outputRoot, `${mode}-report.json`);
  const markdownPath = join(outputRoot, `${mode}-summary.md`);
  await writeFile(reportPath, JSON.stringify(report, null, 2));
  await writeFile(markdownPath, markdownReport(report));
  console.log(JSON.stringify({ ...summary, reportPath, markdownPath, baseUrl }, null, 2));
  if (exitCodeForSummary(summary) !== 0) process.exitCode = exitCodeForSummary(summary);
}

main().catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });

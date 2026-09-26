import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

for (const [pathname, expected] of [
  ["/concept-lab", "Academic Concept"],
  ["/concept-lab/library", "The Library"],
  ["/concept-lab/about", "The Lab"],
]) {
  test(`server renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, new RegExp(expected));
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  });
}

/* Record coverage is derived from what the library actually links to, rather
   than a hand-kept list here. A new record is covered the moment it appears in
   the library — and if it never appears there, that is itself the bug.

   The path segments below must stay in step with KIND in content/records.ts.
   A kind missing from this pattern silently drops every record of that kind
   out of the suite, which is how the first mechanism record nearly shipped
   untested. The count assertion underneath is the backstop. */
const libraryHtml = await (await render("/concept-lab/library")).text();
const studyLibraryHtml = await (await render("/concept-lab/library?kind=study")).text();
const methodLibraryHtml = await (await render("/concept-lab/library?kind=method")).text();
const mechanismLibraryHtml = await (await render("/concept-lab/library?kind=mechanism")).text();
const hpaMechanismHtml = await (await render("/concept-lab/mechanism/hpa-axis")).text();
const homeHtml = await (await render("/concept-lab")).text();
const theoryLibraryHtml = await (await render("/concept-lab/library?kind=theory")).text();
const musicTheoryLibraryHtml = await (await render("/concept-lab/library?kind=theory&discipline=music-psych")).text();
const statisticalHtml = await (await render("/concept-lab/theory/statistical-learning-of-music")).text();
const idyomHtml = await (await render("/concept-lab/theory/idyom-information-dynamics-of-music")).text();
const predictiveProcessingHtml = await (await render("/concept-lab/theory/predictive-processing-in-music")).text();
const aetHtml = await (await render("/concept-lab/theory/affective-events-theory")).text();
const personEnvironmentFitHtml = await (await render("/concept-lab/theory/person-environment-fit")).text();

test("Affective Events Theory uses the dedicated canonical experience", () => {
  assert.match(aetHtml, /Two truths/);
  assert.match(aetHtml, /same event/);
  assert.match(aetHtml, /two clocks/);
  assert.match(aetHtml, /read the map/);
  assert.match(aetHtml, /aet-visual-rebuild-assets\/aet-opening-workplace\.png/);
  assert.match(aetHtml, /CLAIMS \/ SOURCES \/ PROVENANCE/);
  assert.match(aetHtml, /doi\.org\//);
});

test("temporary AET benchmark route is retired", async () => {
  const response = await render("/aet-visual-rebuild");
  assert.equal(response.status, 404);
});

test("Predictive Processing in Music preserves its model boundaries", () => {
  assert.match(predictiveProcessingHtml, /Predictive Processing in Music/);
  assert.match(predictiveProcessingHtml, /PREDICTIVE PROCESSING/);
  assert.match(predictiveProcessingHtml, /PREDICTIVE CODING/);
  assert.match(predictiveProcessingHtml, /Predictive Coding of Music/);
  assert.match(predictiveProcessingHtml, /IDyOM information content/);
  assert.match(predictiveProcessingHtml, /Same deviation\. Different precision/);
  assert.match(predictiveProcessingHtml, /same \+120 ms displacement/);
  assert.match(predictiveProcessingHtml, /The note that never came/);
  assert.match(predictiveProcessingHtml, /25 non-musicians/);
  assert.match(predictiveProcessingHtml, /24/);
  assert.match(predictiveProcessingHtml, /Rethinking Predictive Processing/);
  assert.match(predictiveProcessingHtml, /Where every claim came from/);
});

test("IDyOM renders validated probability teaching systems", () => {
  assert.match(idyomHtml, /What did the model expect/);
  assert.match(idyomHtml, /PROBABILITY DISTRIBUTION/i);
  assert.match(idyomHtml, /Same surprise\. Different uncertainty/);
  assert.match(idyomHtml, /sum = <!-- -->1\.000/);
  assert.match(idyomHtml, /3\.321928/);
  assert.match(idyomHtml, /0\.921928/);
  assert.match(idyomHtml, /1\.368996/);
  assert.match(idyomHtml, /Old experience\. New pattern/);
  assert.match(idyomHtml, /Five configurations/);
  assert.match(idyomHtml, /The model only knows what you represent/);
  assert.match(idyomHtml, /A corpus isn’t a culture/);
  assert.match(idyomHtml, /Predictive uncertainty in auditory sequence processing/);
  assert.match(idyomHtml, /did not disprove the entire Narmour architecture/);
  assert.match(idyomHtml, /not a hierarchical cortical architecture/);
  assert.match(idyomHtml, /Where every claim came from/);
});

test("statistical learning record renders its audited teaching systems", () => {
  assert.match(statisticalHtml, /Research framework \/ mechanism family/);
  assert.match(statisticalHtml, /A hidden musical language/);
  assert.match(statisticalHtml, /Statistical structure/);
  assert.match(statisticalHtml, /P\(Y \| X\)/);
  assert.match(statisticalHtml, /0\.80 \(16\/20\)/);
  assert.match(statisticalHtml, /0\.20 \(4\/20\)/);
  assert.match(statisticalHtml, /matched marginal totals/);
  assert.match(statisticalHtml, /Y<!--[\s\S]*?--> total = <!-- -->20/);
  assert.match(statisticalHtml, /Z<!--[\s\S]*?--> total = <!-- -->20/);
  assert.match(statisticalHtml, /constructed interaction is not the Saffran experiment/);
});

test("home describes all four record kinds", () => {
  assert.match(homeHtml, /four kinds of record/i);
});

test("Person–Environment Fit presents its canonical correspondence pairs and boundaries", () => {
  assert.match(personEnvironmentFitHtml, /Why can the same workplace energise one person and drain another/);
  assert.match(personEnvironmentFitHtml, /Choose a correspondence pair to inspect/);
  assert.match(personEnvironmentFitHtml, /Pair identity/);
  assert.match(personEnvironmentFitHtml, /Selected explanation/);
  assert.match(personEnvironmentFitHtml, /Demands ↔ abilities/);
  assert.match(personEnvironmentFitHtml, /Needs ↔ supplies/);
  assert.match(personEnvironmentFitHtml, /What the person can do/);
  assert.match(personEnvironmentFitHtml, /What the setting asks/);
  assert.match(personEnvironmentFitHtml, /What the person needs/);
  assert.match(personEnvironmentFitHtml, /What the setting supplies/);
  assert.doesNotMatch(personEnvironmentFitHtml, /under-supplied|over-supplied|the doorway doesn’t change/i);
  assert.doesNotMatch(personEnvironmentFitHtml, /strain is the usual consequence/);
  for (const target of ["Job", "Organisation", "Group", "Supervisor"]) {
    assert.match(personEnvironmentFitHtml, new RegExp(`>${target}<`));
  }
  assert.match(personEnvironmentFitHtml, /Satisfaction/);
  assert.match(personEnvironmentFitHtml, /Satisfactoriness/);
  assert.match(personEnvironmentFitHtml, /Seven markers, no single starting point/);
  assert.match(personEnvironmentFitHtml, /1909/);
  assert.match(personEnvironmentFitHtml, /2008/);
  assert.match(personEnvironmentFitHtml, /If you read three things/);
  assert.match(personEnvironmentFitHtml, /The full trail/);
  assert.match(personEnvironmentFitHtml, /How this record is constructed/);
  assert.match(personEnvironmentFitHtml, /href="\/concept-lab\/library\?kind=theory"[^>]*>← Return to the Theory Library/);
});

test("Study Library renders its three-study evidence dossier", () => {
  assert.match(studyLibraryHtml, /Tuned Out or Dialed In/);
  assert.equal((studyLibraryHtml.match(/<header class="[^"]*studyEntryHead/g) ?? []).length, 3);
  for (const heading of [
    "Dyadic field study",
    "Preregistered online experiment",
    "Preregistered two-day dyadic field experiment",
  ]) {
    assert.match(studyLibraryHtml, new RegExp(heading));
  }
  for (const section of [
    "What is being explained?",
    "Three studies, different kinds of leverage.",
    "What recurs across the package?",
    "What can the evidence carry?",
    "Where does the argument stop?",
  ]) {
    assert.match(studyLibraryHtml, new RegExp(section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(studyLibraryHtml, /href="\/concept-lab\/study\/tuned-out-or-dialed-in"[^>]*>Read full record/);
  assert.match(studyLibraryHtml, /href="\/concept-lab\/library"[^>]*>All record kinds/);
  assert.match(studyLibraryHtml, /href="\/concept-lab\/saved"[^>]*>Saved records/);
});

test("Method Library presents both canonical practices and returns to their full records", () => {
  const ipaPosition = methodLibraryHtml.indexOf("Interpretative Phenomenological Analysis");
  const rtaPosition = methodLibraryHtml.indexOf("Reflexive Thematic Analysis");
  assert.ok(ipaPosition >= 0, "IPA appears in the Method Library");
  assert.ok(rtaPosition > ipaPosition, "the registry order is preserved: IPA, then reflexive thematic analysis");
  assert.match(methodLibraryHtml, /How inquiry/);
  assert.match(methodLibraryHtml, /gets done\./);
  assert.match(methodLibraryHtml, /Fits this practice/);
  assert.match(methodLibraryHtml, /Personal Experiential Themes/);
  assert.match(methodLibraryHtml, /The analyst works across material/);
  assert.match(methodLibraryHtml, /This worked example comes from the Method record/);
  assert.match(methodLibraryHtml, /href="\/concept-lab\/method\/interpretative-phenomenological-analysis"[^>]*>Full method record/);
  assert.match(methodLibraryHtml, /href="\/concept-lab\/method\/reflexive-thematic-analysis"[^>]*>Full method record/);
  assert.match(methodLibraryHtml, /href="\/concept-lab\/library"[^>]*>All record kinds/);
  assert.match(methodLibraryHtml, /href="\/concept-lab\/saved"[^>]*>Saved records/);
  assert.match(methodLibraryHtml, /aria-pressed="false"/);
});

test("Mechanism Library traces the HPA pathway and preserves its scholarly boundary", () => {
  const mechanismText = mechanismLibraryHtml
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ");
  assert.match(mechanismText, /What happens/);
  assert.match(mechanismText, /in between\?/);
  assert.match(mechanismText, /Follow the messengers/);
  for (const stage of ["Hypothalamus", "Anterior pituitary", "Adrenal cortex", "Body and brain", "CRH", "ACTH", "cortisol"]) {
    assert.match(mechanismText, new RegExp(stage));
  }
  assert.match(mechanismText, /negative feedback/);
  assert.match(mechanismText, /Cortisol acts back on the pituitary, hypothalamus and wider brain circuitry/);
  assert.match(mechanismText, /Schematic, not anatomy/);
  assert.match(mechanismText, /Editorial connection/);
  assert.match(mechanismText, /Mechanism profile/);
  assert.match(mechanismText, /01 pathway/);
  assert.doesNotMatch(mechanismText, /1 of 22 records/);
  assert.match(mechanismText, /Reading guide: The two to start with today/);
  assert.match(mechanismText, /The sequence and direction of travel are meaningful; organ shape, position and scale are not depicted and should not be inferred/);
  assert.doesNotMatch(mechanismText, /The vertical order and the direction of travel are real/);
  assert.match(mechanismText, /The messenger sequence traces the route; rhythm describes how activity unfolds over time, not another step/);
  assert.match(mechanismText, /Could the HPA axis be one physiological route through the JD–R health-impairment process/);
  assert.doesNotMatch(mechanismText, /is a candidate pathway for/);
  assert.doesNotMatch(mechanismText, /4 starting sources/);
  assert.match(mechanismText, /neither record.s cited sources make the link/);
  assert.match(mechanismLibraryHtml, /aria-label="The HPA Axis sequence of structures"/);
  assert.match(mechanismLibraryHtml, /href="\/concept-lab\/mechanism\/hpa-axis"/);
});

test("HPA detail page preserves the canonical cascade caption", () => {
  assert.match(hpaMechanismHtml, /The vertical order and the direction of travel are real/);
  assert.match(hpaMechanismHtml, /The dashed line is negative feedback/);
  assert.doesNotMatch(hpaMechanismHtml, /The sequence and direction of travel are meaningful/);
});

function theoryEditorialRows(html) {
  const articles = [...html.matchAll(/<article\b[^>]*recordRow[^>]*>([\s\S]*?)<\/article>/g)];
  return articles.map(([, row]) => ({
    number: row.match(/recordNumber[^\"]*">(\d+)<\/span>/)?.[1],
    href: row.match(/<h4>\s*<a[^>]*href="([^"]+)"/)?.[1],
  }));
}

test("theory editorial numbers follow the rendered field and branch order", () => {
  const rows = theoryEditorialRows(theoryLibraryHtml);
  assert.equal(rows.length, 18);
  assert.deepEqual(rows.map((row) => row.number), Array.from({ length: rows.length }, (_, index) => String(index + 1).padStart(2, "0")));
  assert.ok(rows.every((row) => row.href?.startsWith("/concept-lab/theory/")));
});

test("theory editorial numbers remain stable when the field is filtered", () => {
  const allRows = theoryEditorialRows(theoryLibraryHtml);
  const filteredMusicRows = theoryEditorialRows(musicTheoryLibraryHtml);
  assert.deepEqual(filteredMusicRows, allRows.slice(allRows.length - filteredMusicRows.length));
});

const recordPaths = [...new Set([...libraryHtml.matchAll(/\/concept-lab\/(?:theory|study|method|mechanism)\/[a-z0-9-]+/g)].map((m) => m[0]))];

test("the root Library orients readers by knowledge form, discipline, and encoded routes", () => {
  for (const label of ["A lens", "An argument from evidence", "A practice", "A pathway"]) {
    assert.ok(libraryHtml.includes(label), `root Library is missing the ${label} orientation`);
  }
  for (const field of ["Organizational Behaviour", "Psychology of Music", "Qualitative Methods", "Psychobiology"]) {
    assert.ok(libraryHtml.includes(field), `root Library is missing the ${field} field`);
  }
  for (const question of ["How does the mind organise sound?", "Why does music create expectations?", "How are musical regularities learned and modelled?"]) {
    assert.ok(libraryHtml.includes(question), `root Library is missing the encoded path ${question}`);
  }
  assert.match(libraryHtml, /Records are already arranged by field above/);
  assert.doesNotMatch(libraryHtml, /1,240 records|Leadership and power|Technology and society/);
});

test("the library links to every record", () => {
  assert.ok(recordPaths.length >= 9, `library links to only ${recordPaths.length} records`);
});

for (const pathname of recordPaths) {
  test(`record page ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
    if (pathname.endsWith("/gestalt-principles-in-music")) {
      assert.match(html, /class="gestalt-target"/, `${pathname} renders no Gestalt theory frame`);
      assert.match(html, /Experience grouping/, `${pathname} renders no interactive teaching example`);
      assert.match(html, /Where every claim came from/, `${pathname} renders no provenance block`);
      return;
    }
    if (pathname === "/concept-lab/method/reflexive-thematic-analysis") {
      assert.match(html, /The analysis/);
      assert.match(html, /CLAIMS \/ SOURCES \/ PROVENANCE/);
      return;
    }
    if (pathname === "/concept-lab/theory/affective-events-theory") {
      assert.match(html, /Two truths/);
      assert.match(html, /same event/);
      assert.match(html, /read the map/);
      return;
    }
    if (pathname === "/concept-lab/study/tuned-out-or-dialed-in") {
      assert.match(html, /The same cue, read from the outside/);
      assert.match(html, /Three studies, one line of inquiry/);
      assert.match(html, /Claim versus evidence/);
      assert.match(html, /How to read the marks/);
      assert.match(html, /Directly reported/);
      assert.match(html, /editorial reconstruction/i);
      assert.match(html, /data-record-id="tuned-out-or-dialed-in"/);
      return;
    }
    // Provenance is the field that makes everything else trustworthy.
    const provenanceHeading = pathname === "/concept-lab/theory/person-environment-fit"
      ? /How this record is constructed/
      : /Where every claim came from/;
    assert.match(html, provenanceHeading, `${pathname} renders no provenance block`);
    // Redesigned folio records replace the contents rail with a chapter map.
    // The same guarantee holds: every entry lands on a real chapter, in order,
    // and nothing in the map points at a section that was never rendered.
    if (html.includes("data-chapter-map")) {
      const map = html.slice(html.indexOf("data-chapter-map"));
      const mapLinks = [...map.slice(0, map.indexOf("</nav>")).matchAll(/href="#([a-z0-9-]+)"/g)].map((m) => m[1]);
      const chapters = [...html.matchAll(/<section id="([a-z0-9-]+)"[^>]*data-chapter/g)].map((m) => m[1]);
      assert.ok(mapLinks.length >= 4, `${pathname}: chapter map has only ${mapLinks.length} entries`);
      assert.deepEqual(mapLinks, chapters, `${pathname}: chapter map and rendered chapters disagree`);
      assert.match(html, /class="savebtn[^"]*"[^>]*aria-pressed/, `${pathname} renders no Save control`);
      assert.match(html, /aria-label="Breadcrumb"/, `${pathname} renders no trail back to the Library`);
      assert.match(html, /Where this idea leads/, `${pathname} renders no relation ledger`);
      return;
    }
    // Section numbering and the contents rail are generated together; a
    // mismatch means a block was added without a heading. Each entry renders
    // twice: once in the desktop rail, once in the mobile fold-out box.
    const sections = (html.match(/<section class="rec"/g) ?? []).length;
    const tocEntries = (html.match(/<span class="num">/g) ?? []).length;
    assert.equal(tocEntries, sections * 2, `${pathname}: ${sections} sections but ${tocEntries} contents entries`);
    // Small screens get no contents rail — the fold-out box is their only map.
    assert.match(html, /class="contents-m"/, `${pathname} renders no mobile contents box`);
  });
}

/* A visual redesign may move scholarship around the page, but it must not
   drop it. For each redesigned record, every provenance note, citation,
   caution and qualification in the canonical content has to appear in the
   rendered page. The strings are taken from content/, not copied here. */
const { RECORDS } = await import("../content/records.ts");
const plain = (value) => String(value)
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, " ")
  .replace(/\s+/g, " ")
  .trim();

for (const [kind, slug] of [
  ["theory", "job-demands-resources"],
  ["mechanism", "hpa-axis"],
  ["method", "interpretative-phenomenological-analysis"],
  ["theory", "tonal-hierarchy"],
]) {
  test(`redesigned ${slug} keeps its complete scholarly apparatus`, async () => {
    const record = RECORDS.find((candidate) => candidate.kind === kind && candidate.slug === slug);
    assert.ok(record, `${slug} is registered`);
    const page = plain(await (await render(`/concept-lab/${kind}/${slug}`)).text());
    const required = [
      record.title,
      record.hook,
      record.oneSentence,
      ...record.provenance.flatMap((item) => [item.label, item.note]),
      ...(record.minimumReading ?? record.coreReading ?? []).map((source) => source.citation),
      ...record.fullSources.map((source) => source.citation),
      ...(record.oversimplifications ?? record.misuses ?? []),
      ...record.qualifications,
    ];
    for (const text of required) {
      assert.ok(page.includes(plain(text)), `${slug} dropped canonical text: "${plain(text).slice(0, 90)}…"`);
    }
  });
}

test("redesigned records keep their record-specific teaching boundaries", async () => {
  const jdrRecord = RECORDS.find((candidate) => candidate.id === "job-demands-resources");
  const jdr = plain(await (await render("/concept-lab/theory/job-demands-resources")).text());
  for (const d of jdrRecord.demandTypes) assert.ok(jdr.includes(plain(d.definition)) && jdr.includes(plain(d.relates)), `JD–R dropped ${d.title}`);
  for (const o of jdrRecord.origins) assert.ok(jdr.includes(plain(o.contribution)), `JD–R dropped the ${o.year} trail marker`);
  for (const x of jdrRecord.expansions) assert.ok(jdr.includes(plain(x.body)), `JD–R dropped the ${x.title} expansion`);
  for (const text of ["Job demands", "Job resources", "The health-impairment process", "The motivational process", "Challenge demands", "Hindrance demands", "The buffering hypothesis", "The boosting hypothesis", "Teaching analogy — JD–R describes directions of relationship. The line weights are not magnitudes, and nothing here is calculated.", "Close supervision is a resource to a novice and a demand to an expert", "2001", "2007", "2010", "2014", "2023"]) {
    assert.ok(jdr.includes(text), `JD–R is missing ${text}`);
  }
  const hpaRecord = RECORDS.find((candidate) => candidate.id === "hpa-axis");
  const hpa = plain(await (await render("/concept-lab/mechanism/hpa-axis")).text());
  for (const m of hpaRecord.measures) assert.ok(hpa.includes(plain(m.tells)) && hpa.includes(plain(m.caution)), `HPA dropped the ${m.method} measure`);
  for (const o of hpaRecord.origins) assert.ok(hpa.includes(plain(o.contribution)), `HPA dropped the ${o.year} trail marker`);
  for (const text of ["A system, not a theory", "CRH", "ACTH", "cortisol", "negative feedback", "Not this page: the SAM system", "Salivary cortisol", "Hair cortisol", "Cortisol awakening response", "Diurnal slope", "Reactivity", "salivary cortisol is a biomarker related to HPA functioning — not a direct measurement of the HPA axis.", "Treat this as our editorial connection", "No concentration is shown or implied"]) {
    assert.ok(hpa.includes(text), `HPA axis is missing ${text}`);
  }
  const ipaRecord = RECORDS.find((candidate) => candidate.id === "ipa");
  const ipa = plain(await (await render("/concept-lab/method/interpretative-phenomenological-analysis")).text());
  for (const item of ipaRecord.questionFit) assert.ok(ipa.includes(plain(item.question)) && ipa.includes(plain(item.why)), `IPA dropped a question-fit item: ${item.question}`);
  for (const step of ipaRecord.procedure) assert.ok(ipa.includes(plain(step.title)) && ipa.includes(plain(step.body)), `IPA dropped procedure step ${step.n}`);
  for (const marker of ipaRecord.qualityMarkers) assert.ok(ipa.includes(plain(marker.title)), `IPA dropped quality marker ${marker.n}`);
  assert.ok(ipa.includes(plain(ipaRecord.cardinalRule)), "IPA keeps its cardinal rule visible beside the procedure");
  assert.ok(ipa.includes("Worked illustration · constructed extract · not data"), "IPA labels its worked extract as constructed");
  assert.ok(ipa.includes("paraphrased after Smith (2019)"), "IPA keeps the double hermeneutic marked as paraphrase");
  const tonalHtml = await (await render("/concept-lab/theory/tonal-hierarchy")).text();
  const tonal = plain(tonalHtml);
  const tonalRecord = RECORDS.find((candidate) => candidate.id === "tonal-hierarchy");
  for (const item of tonalRecord.tonal.profile.items) assert.ok(tonal.includes(plain(item.body)), `Tonal profile dropped ${item.note}`);
  for (const context of tonalRecord.tonal.sameNote.contexts) assert.ok(tonal.includes(plain(context.body)) && tonal.includes(plain(context.role)), `Tonal dropped the ${context.label} reading`);
  for (const level of tonalRecord.tonal.neighbourhood.levels) assert.ok(tonal.includes(plain(level.body)), `Tonal dropped key-space level ${level.label}`);
  for (const state of tonalRecord.tonal.dynamics.states) assert.ok(tonal.includes(plain(state.body)), `Tonal dropped dynamic stage ${state.label}`);
  for (const text of ["C major", "F major", "A minor", "D major", "Krumhansl & Shepard (1979)", "Temperley & Marvin (2008)", "Exact empirical profile values require direct source verification before they are displayed.", "no exact empirical profile values are shown", "It is not a donut-shaped neural storage site.", "learner-generated teaching data, not a published profile"]) {
    assert.ok(tonal.includes(text), `Tonal Hierarchy is missing ${text}`);
  }
  for (const pc of ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]) {
    assert.match(tonalHtml, new RegExp(`aria-label="${pc}: (tonic|tonic-triad member|other diatonic tone|nondiatonic tone)"`), `Tonal field gives ${pc} no accessible role`);
  }
});

// Cross-record links (the `relatedTo` block) resolve to real pages. A wrong
// recordId renders nothing at all, so nothing else would notice.
test("every internal record link resolves", async () => {
  const seen = new Set();
  for (const pathname of recordPaths) {
    const html = await (await render(pathname)).text();
    for (const m of html.matchAll(/\/concept-lab\/(?:theory|study|method|mechanism)\/[a-z0-9-]+/g)) {
      if (m[0] !== pathname) seen.add(m[0]);
    }
  }
  for (const target of seen) {
    assert.ok(recordPaths.includes(target), `link to ${target} does not match any record page`);
  }
  assert.ok(seen.size > 0, "no cross-record links found at all");
});

// Every door on the landing page must land on the intended kind experience.
// Generic kinds return a filtered index; Method has its own practice-oriented
// view because the corpus is small and all current records share one discipline.
test("every landing-page library link opens the intended kind experience", async () => {
  const home = await (await render("/concept-lab")).text();
  const links = [...new Set([...home.matchAll(/\/concept-lab\/library\?(kind|discipline)=([a-z-]+)/g)].map((m) => m[0]))];
  assert.ok(links.length >= 4, `expected several filter links, found ${links.length}`);

  const total = recordPaths.length;
  for (const href of links) {
    const html = await (await render(href.replace(/&amp;/g, "&"))).text();
    if (new URL(href, "http://localhost").searchParams.get("kind") === "theory") {
      const filteredPaths = [...new Set([...html.matchAll(/\/concept-lab\/(?:theory|study|method|mechanism)\/[a-z0-9-]+/g)].map((match) => match[0]))];
      const expectedTheoryPaths = recordPaths.filter((pathname) => pathname.startsWith("/concept-lab/theory/"));
      assert.match(html, /Theory/);
      assert.match(html, /as a lens/i);
      assert.deepEqual(filteredPaths.sort(), expectedTheoryPaths.sort(), `${href} did not render exactly the theory records`);
      assert.ok(filteredPaths.length < total, `${href} returned all ${total} record kinds`);
      continue;
    }

    if (new URL(href, "http://localhost").searchParams.get("kind") === "method") {
      assert.match(html, /How inquiry/);
      assert.match(html, /Interpretative Phenomenological Analysis/);
      assert.match(html, /Reflexive Thematic Analysis/);
      assert.match(html, /fits this practice/i);
      assert.doesNotMatch(html, /<label[^>]*for="q"[^>]*>Search<\/label>/);
      continue;
    }

    if (new URL(href, "http://localhost").searchParams.get("kind") === "mechanism") {
      assert.match(html, /Mechanism profile/);
      assert.doesNotMatch(html, /\d+ of \d+ records/);
      const mechanismPaths = [...new Set([...html.matchAll(/href="(\/concept-lab\/mechanism\/[a-z0-9-]+)"/g)].map((match) => match[1]))];
      assert.deepEqual(mechanismPaths, ["/concept-lab/mechanism/hpa-axis"], `${href} did not render exactly the mechanism record`);
      continue;
    }

    const m = html.match(/(\d+) of (\d+) records/);
    assert.ok(m, `${href} rendered no result count`);
    assert.ok(
      Number(m[1]) < Number(m[2]),
      `${href} returned ${m[0]} — the filter was ignored`,
    );
    assert.equal(Number(m[2]), total, `${href} reports a different library size`);
  }
});

// Regression guard. app/globals.css is imported by the root layout, so any
// generic class name it defines outranks the same name in sketchnote.css.
// That once absolutely positioned record body copy on top of the hero.
test("globals.css does not redefine class names the lab owns", async () => {
  const { readFile } = await import("node:fs/promises");
  const base = new URL("../app/", import.meta.url);
  const globals = await readFile(new URL("globals.css", base), "utf8");
  const lab = await readFile(new URL("concept-lab/sketchnote.css", base), "utf8");

  const classesIn = (css) =>
    new Set([...css.matchAll(/^\s*\.([a-zA-Z][\w-]*)/gm)].map((m) => m[1]));

  const owned = classesIn(lab);
  const collisions = [...classesIn(globals)].filter((c) => owned.has(c));
  assert.deepEqual(collisions, [], `globals.css must not redefine: ${collisions.join(", ")}`);
});

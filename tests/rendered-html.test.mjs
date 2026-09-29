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
  assert.match(statisticalHtml, /Find the units/);
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
  ["theory", "self-determination-theory"],
  ["theory", "social-exchange-theory"],
  ["theory", "person-organisation-fit"],
  ["theory", "workplace-design"],
  ["theory", "auditory-scene-analysis"],
  ["theory", "generative-theory-of-tonal-music"],
  ["theory", "narmours-implication-realization-theory"],
  ["theory", "statistical-learning-of-music"],
  ["theory", "predictive-processing-in-music"],
  ["theory", "music-preference"],
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

test("redesigned Self-Determination Theory keeps every teaching element the record carries", async () => {
  const record = RECORDS.find((candidate) => candidate.id === "self-determination-theory");
  const html = await (await render("/concept-lab/theory/self-determination-theory")).text();
  const page = plain(html);
  const d = record.sdt;
  const need = (text, where) => assert.ok(page.includes(plain(text)), `SDT dropped ${where}: "${plain(text).slice(0, 80)}…"`);
  for (const c of d.opening.cases) { need(c.quote, "an opening quote"); need(c.body, `the ${c.label} case`); }
  need(d.opening.note, "the opening note");
  for (const m of d.motives) { need(m.statement, "a motive statement"); need(m.regulation, "a regulation name"); need(m.explanation, `the ${m.regulation} explanation`); }
  for (const r of d.regulations) { need(r.label, "a regulation"); need(r.descriptor, `the ${r.label} descriptor`); need(r.body, `the ${r.label} body`); }
  need(d.internalisation.lede, "the internalisation lede");
  for (const b of d.internalisation.branches) { need(b.label, "an internalisation branch"); need(b.body, `the ${b.label} branch`); }
  need(d.internalisation.note, "the internalisation note");
  for (const n of d.needs) { need(n.question, `the ${n.label} question`); need(n.meaning, `the ${n.label} meaning`); need(n.distinction, `the ${n.label} distinction`); }
  for (const c of d.autonomyMatrix.cases) { need(c.label, "an autonomy case label"); need(c.title, "an autonomy case"); need(c.body, `the "${c.title}" case`); }
  need(d.autonomyMatrix.note, "the autonomy matrix note");
  for (const x of [...d.context.contextItems, ...d.context.personItems, ...d.context.outcomes]) need(x, "a context item");
  for (const e of d.context.experiences) { need(e.label, "a context experience"); need(e.body, `the ${e.label} body`); }
  need(d.context.note, "the context note");
  need(d.rewards.reward, "the nominal reward");
  for (const c of d.rewards.cases) { need(c.label, "a reward context"); need(c.quote, `the ${c.label} quote`); need(c.meaning, `the ${c.label} meaning`); need(c.body, `the ${c.label} body`); }
  need(d.rewards.note, "the reward note");
  for (const p2 of d.needComparison.pairs) { need(p2.low, `the ${p2.label} low-satisfaction example`); need(p2.thwart, `the ${p2.label} frustration example`); need(p2.body, `the ${p2.label} note`); }
  need(d.needComparison.note, "the satisfaction / frustration note");
  for (const x of [...d.workModel.context, ...d.workModel.person, ...d.workModel.needs, ...d.workModel.motivations, ...d.workModel.outcomes]) need(x, "a workplace-model item");
  need(d.workModel.note, "the workplace model note");
  for (const t of d.miniTheories) { need(t.title, "a mini-theory"); need(t.question, `the ${t.acronym} question`); }
  for (const x of [...d.scope.explains, ...d.scope.stops]) need(x, "a scope item");
  need(d.scope.note, "the scope note");
  for (const o of record.origins) { need(o.work, `the ${o.year} work`); need(o.contribution, `the ${o.year} trail marker`); }
  need(record.originsNote, "the origins note");
  need(record.trailLede, "the trail lede");
  for (const link of record.relatedTo) need(link.body, "a relation body");
  need(record.relatedToLede, "the caution about neighbouring lenses");
  for (const text of [
    "Same category? Not quite",
    "Two extrinsic reasons",
    "Places, not steps",
    "The other reading",
    "Autonomy is not independence",
    "Real behaviour can draw on mixed motives",
    "The faded stroke and the opposed stroke are different marks on purpose",
    "Closer means more of this record leans on it",
  ]) assert.ok(page.includes(text), `SDT is missing ${text}`);
  assert.match(html, /sdt-hero\.webp/);
  assert.match(html, /sdt-lens-wall\.webp/);
  assert.equal((html.match(/<img\b(?![^>]*\balt=)/g) ?? []).length, 0, "every SDT image carries an alt attribute, empty when decorative");
  for (const id of ["reason", "row", "owning", "needs", "context", "refinements", "family", "limits", "trail", "sources", "provenance"]) {
    assert.match(html, new RegExp(`id="${id}"`), `SDT chapter ${id} is present for the chapter map`);
  }
});

test("redesigned Social Exchange Theory keeps every teaching element the record carries", async () => {
  const record = RECORDS.find((candidate) => candidate.id === "social-exchange-theory");
  const html = await (await render("/concept-lab/theory/social-exchange-theory")).text();
  const page = plain(html);
  const d = record.set;
  const need = (text, where) => assert.ok(page.includes(plain(text)), `SET dropped ${where}: "${plain(text).slice(0, 80)}…"`);
  for (const c of d.opening.cases) { need(c.label, "an opening moment"); need(c.quote, `the "${c.label}" quote`); need(c.body, `the "${c.label}" body`); }
  need(d.opening.note, "the opening note");
  for (const m of d.reciprocity) { need(m.label, "a reciprocity meaning"); need(m.short, `the ${m.label} short form`); need(m.body, `the ${m.label} body`); }
  for (const r of d.resources) { need(r.label, "a resource"); need(r.body, `the ${r.label} body`); }
  for (const r of d.rules) { need(r.label, "an exchange rule"); need(r.rule, `the ${r.label} rule`); need(r.body, `the ${r.label} body`); }
  for (const x of d.dimensions) { need(x.label, "a social/economic dimension"); need(x.body, `the ${x.label} question`); }
  for (const x of [...d.power.values, ...d.power.alternatives]) need(x, "a power–dependence condition");
  need(d.power.note, "the power–dependence note");
  for (const x of d.relationshipStages) { need(x.label, "a relationship stage"); need(x.body, `the ${x.label} stage`); }
  for (const x of d.hedonic) { need(x.label, "a hedonic cell"); need(x.body, `the ${x.label} cell`); }
  for (const x of d.constraints) { need(x.desired, "a constraint"); need(x.constrained, `the ${x.desired} response`); need(x.body, `the ${x.desired} body`); }
  for (const x of d.chain) { need(x.label, "a chain question"); need(x.body, `the ${x.label} step`); }
  for (const a of d.audit) { need(a.label, "an audit case"); need(a.claim, `the ${a.label} claim`); need(a.verdict, `the ${a.label} verdict`); for (const ans of a.answers) need(ans, `an ${a.label} answer`); }
  for (const f of d.family) { need(f.label, "a family branch"); need(f.body, `the ${f.label} branch`); }
  for (const x of [...d.scope.explains, ...d.scope.stops]) need(x, "a scope item");
  need(d.scope.note, "the scope note");
  for (const o of record.origins) { need(o.work, `the ${o.year} work`); need(o.contribution, `the ${o.year} trail marker`); }
  need(record.trailLede, "the trail lede");
  for (const link of record.relatedTo) need(link.body, "a relation body (five relations, though the shared ledger shows four)");
  need(record.relatedToLede, "the caution about neighbouring lenses");
  for (const text of [
    "offers, withholds, or changes access",
    "interprets, accepts, returns, or refuses",
    "direct, generalised, negotiated, or norm-led",
    "History + alternatives shape what each can receive next",
    "resource / signal",
    "The same resource can carry different meanings in different relationships.",
    "not an official seven-dimension taxonomy",
    "This is not a money/non-money or moral binary",
    "A transaction can be one episode; a relationship is the feedback history that makes later exchanges meaningful.",
    "Later theoretical remedies keep hedonic direction and activity distinct",
    "They do not make response deterministic",
    "Gouldner supplies the foundational norm of reciprocity",
    "Concept Lab synthesis",
    "audit reading",
    "Emerson, 1962",
  ]) assert.ok(page.includes(text), `SET is missing ${text}`);
  assert.match(html, /set-hero\.webp/);
  assert.equal((html.match(/<img\b(?![^>]*\balt=)/g) ?? []).length, 0, "every SET image carries an alt attribute, empty when decorative");
  for (const id of ["spec", "passes", "rules", "mixed", "dependence", "history", "response", "audit", "family", "limits", "sources", "provenance"]) {
    assert.match(html, new RegExp(`id="${id}"`), `SET chapter ${id} is present for the chapter map`);
  }
  // The default power reading must follow Emerson: both actors start highly and equally dependent.
  assert.ok(page.includes("balanced power") && page.includes("high mutual dependence"), "the power lab opens on its balanced, high-dependence preset");
  // every branch of the family map is a button that keeps its name when a narrow screen hides the drawn label
  const famButtons = html.match(/<button[^>]*class="[^"]*famNode[^"]*"[^>]*>/g) ?? [];
  assert.ok(famButtons.length >= 8, `the family map draws its branches as buttons (found ${famButtons.length} in ${html.length} characters)`);
  for (const b of famButtons) assert.match(b, /aria-label="[^"]+"/, "each family-map button carries its own accessible name");
});

test("redesigned Person–Organisation Fit keeps every teaching element the record carries", async () => {
  const record = RECORDS.find((candidate) => candidate.id === "person-organisation-fit");
  const html = await (await render("/concept-lab/theory/person-organisation-fit")).text();
  const page = plain(html);
  const need = (text, where) => assert.ok(page.includes(plain(text)), `P–O dropped ${where}: "${plain(text).slice(0, 80)}…"`);
  need(record.terminologyLede, "the naming lede");
  for (const t of record.terminology) { need(t.was, "a naming correction"); need(t.now, `the "${plain(t.was)}" correction`); need(t.note, `the "${plain(t.was)}" note`); }
  need(record.relatedToLede, "the parent-framework lede");
  for (const link of record.relatedTo) { need(link.relation, "the relation to the parent"); need(link.body, "the parent's body"); }
  need(record.ideaLede, "the idea");
  need(record.pathwaysLede, "the sorting lede");
  need(record.pathwaysCaution, "the sorting caution");
  for (const p of record.pathways) { need(p.title, "the pathway name"); need(p.blurb, "the pathway blurb"); for (const step of p.steps) need(step, "an Attraction–Selection–Attrition step"); }
  need(record.categoriesLede, "the two-fits lede");
  need(record.categoriesNote, "the culture-fit note");
  for (const c of record.categories) { need(c.title, "a category"); need(c.definition, `the ${c.title} definition`); for (const e of c.examples) need(e, `a ${c.title} example`); }
  need(record.modelsLede, "the measuring lede");
  need(record.modelsNote, "the measuring note");
  for (const m of record.models) { need(m.year, "a model year"); need(m.name, "a model"); need(m.source, `the ${m.name} source`); need(m.body, `the ${m.name} body`); need(m.note, `the ${m.name} note`); }
  need(record.demo.label, "the perceptions label");
  need(record.demo.caption, "the perceptions caption");
  for (const f of record.demo.facets) { need(f.label, "a fit perception"); need(f.body, `the ${f.label} body`); }
  for (const t of record.fitTargets) { need(t.title, "a fit target"); need(t.question, `the ${t.title} question`); need(t.example, `the ${t.title} example`); }
  need(record.trailLede, "the trail lede");
  need(record.originsNote, "the trail note");
  for (const o of record.origins) { need(o.work, `the ${o.year} work`); need(o.contribution, `the ${o.year} trail marker`); }
  need(record.oversimplificationsLede, "the cautions lede");
  for (const text of [
    "Twelve people work here: 4 ring, 3 bar, 3 cross and 2 chevron.",
    "In this toy, a candidate applies if their mark is one of the two most common in the room",
    "In this toy, the organisation admits applicants who carry the room's most common mark",
    "In this toy, whoever carries the room's rarest mark leaves",
    "A made-up room of made-up people.",
    "not how fast, or how far, a real organisation sorts",
    "Concept Lab reading",
    "the record does not supply this instrument’s own items",
    "Which example goes with which direction is Concept Lab’s reading of the record’s own definition",
    "the people make the place",
  ]) assert.ok(page.includes(text), `P–O is missing ${text}`);
  assert.match(html, /po-hero\.webp/);
  assert.match(html, /po-hero-stack\.webp/);
  assert.equal((html.match(/<img\b(?![^>]*\balt=)/g) ?? []).length, 0, "every P–O image carries an alt attribute, empty when decorative");
  assert.match(html, /data-room/, "the room toy renders on the server");
  for (const id of ["name", "sits", "idea", "asa", "two", "measure", "targets", "trail", "limits", "sources", "provenance"]) {
    assert.match(html, new RegExp(`id="${id}"`), `P–O chapter ${id} is present for the chapter map`);
  }
});

test("redesigned Workplace Design keeps every teaching element the record carries", async () => {
  const record = RECORDS.find((candidate) => candidate.id === "workplace-design");
  const html = await (await render("/concept-lab/theory/workplace-design")).text();
  const page = plain(html);
  const need = (text, where) => assert.ok(page.includes(plain(text)), `Workplace Design dropped ${where}: "${plain(text).slice(0, 80)}…"`);
  const d = record.disambiguation;
  need(d.flag, "the disambiguation");
  need(d.covered.title, "the covered title"); need(d.covered.blurb, "the covered blurb"); for (const x of d.covered.items) need(x, "a covered item");
  need(d.notCovered.title, "the not-covered title"); need(d.notCovered.blurb, "the not-covered blurb"); for (const x of d.notCovered.items) need(x, "a not-covered item");
  for (const src of d.notCovered.sources) { need(src.citation, "a job-design source"); need(src.contribution, "a job-design contribution"); }
  need(d.note, "the note on where the two meet");
  need(record.ideaLede, "the idea");
  need(record.originsNote, "the trail note");
  need(record.expansionsLede, "the elements lede");
  for (const e of record.expansions) { need(e.title, "an element"); need(e.body, `the ${e.title} body`); }
  need(record.pathwaysLede, "the mechanism lede");
  need(record.pathwaysCaution, "the mechanism caution");
  for (const p of record.pathways) { need(p.title, "the mechanism name"); need(p.blurb, "the mechanism blurb"); for (const step of p.steps) need(step, "a mechanism step"); }
  need(record.interactionsLede, "the trade-off lede");
  for (const x of record.interactions) { need(x.kicker, "a trade-off kicker"); need(x.title, "a trade-off card"); need(x.body, `the ${x.title} body`); }
  need(record.demo.label, "the enclosure label");
  need(record.demo.caption, "the enclosure caption");
  for (const o of record.demo.options) need(o, "an enclosure option");
  for (const road of record.demo.roads) { need(road.label, "a road label"); need(road.sub, "a road sub-label"); }
  for (const st of record.demo.states) need(st.t, "an enclosure reading");
  need(record.trailLede, "the trail lede");
  for (const o of record.origins) { need(o.work, `the ${o.year} work`); need(o.contribution, `the ${o.year} trail marker`); }
  need(record.oversimplificationsLede, "the cautions lede");
  for (const text of [
    "Two literatures answer to",
    "Where to go instead",
    "Concept Lab reading",
    "Set two of them apart",
    "Quiet and cramped",
    "Spacious and unbearable",
    "Twelve people share the room",
    "A room that supports the task",
    "This is the counterfactual; the record describes only what happens when support fails.",
    "one room · five ways to read it",
    "in the same sense as",
    "a deadline",
  ]) assert.ok(page.includes(text), `Workplace Design is missing ${text}`);
  for (const name of ["Which condition of the room?", "Walk the mechanism, one step at a time"]) assert.ok(html.includes(`aria-label="${name}"`), `the "${name}" control is named for assistive tech`);
  assert.match(html, /wp-hero\.webp/);
  assert.match(html, /wp-hero-stack\.webp/);
  assert.equal((html.match(/<img\b(?![^>]*\balt=)/g) ?? []).length, 0, "every Workplace Design image carries an alt attribute, empty when decorative");
  for (const attr of ["data-focus", "data-level", "data-state"]) assert.match(html, new RegExp(attr), `the ${attr} figure renders on the server`);
  for (const id of ["two", "idea", "elements", "mechanism", "tradeoff", "trail", "limits", "sources", "provenance"]) {
    assert.match(html, new RegExp(`id="${id}"`), `Workplace Design chapter ${id} is present for the chapter map`);
  }
});

test("redesigned Auditory Scene Analysis keeps every teaching element the record carries", async () => {
  const record = RECORDS.find((candidate) => candidate.id === "auditory-scene-analysis");
  const html = await (await render("/concept-lab/theory/auditory-scene-analysis")).text();
  const page = plain(html);
  const need = (text, where) => assert.ok(page.includes(plain(text)), `ASA dropped ${where}: "${plain(text).slice(0, 80)}…"`);
  const d = record.asa;
  need(record.ideaLede, "the idea");
  need(d.opening.lede, "the opening lede"); need(d.opening.note, "the opening note");
  for (const p of [...d.opening.presets, ...d.groupFuse.presets]) { need(p.label, "a preset"); need(p.body, `the ${p.label} body`); need(p.variable, `the ${p.label} variable`); need(p.controls, `the ${p.label} controls`); }
  need(d.problem.lede, "the problem lede"); for (const c of d.problem.layers) { need(c.label, "a layer"); need(c.body, `the ${c.label} layer`); } need(d.problem.note, "the problem note");
  need(d.source.lede, "the source lede"); for (const c of [d.source.source, d.source.stream]) { need(c.label, "a source/stream card"); need(c.body, `the ${c.label} card`); } need(d.source.note, "the source note");
  need(d.grouping.lede, "the grouping lede"); for (const t of [...d.grouping.sequential, ...d.grouping.simultaneous]) need(t, "a grouping question"); need(d.grouping.note, "the grouping note");
  need(d.cues.lede, "the cues lede"); for (const t of [...d.cues.sequential, ...d.cues.simultaneous]) need(t, "a cue family"); need(d.cues.note, "the cues note");
  need(d.competition.lede, "the competition lede"); for (const c of d.competition.cards) { need(c.label, "a cue"); need(c.body, `the ${c.label} cue`); } need(d.competition.note, "the competition note");
  need(d.bistability.lede, "the bistability lede"); for (const c of d.bistability.states) { need(c.label, "a percept"); need(c.body, `the ${c.label} percept`); } need(d.bistability.note, "the bistability note");
  need(d.groupFuse.lede, "the fusion lede"); need(d.groupFuse.question, "the fusion question"); need(d.groupFuse.note, "the fusion note");
  need(d.oldNew.lede, "the old-plus-new lede"); for (const t of d.oldNew.steps) need(t, "an old-plus-new step"); need(d.oldNew.note, "the old-plus-new note");
  need(d.organisation.lede, "the organisation lede"); for (const t of [...d.organisation.primitive, ...d.organisation.schema]) need(t, "an organisation item"); need(d.organisation.note, "the organisation note");
  need(d.attention.lede, "the attention lede"); for (const c of d.attention.cards) { need(c.label, "an attention card"); need(c.body, `the ${c.label} card`); } need(d.attention.note, "the attention note");
  need(d.music.lede, "the music lede"); for (const c of d.music.cards) { need(c.label, "a music card"); need(c.body, `the ${c.label} card`); } need(d.music.note, "the music note");
  need(d.evidence.lede, "the evidence lede");
  for (const e of d.evidence.items) { need(e.title, "an evidence title"); need(e.label, `the ${e.title} label`); need(e.citation, `the ${e.title} citation`); need(e.design, `the ${e.title} design`); need(e.tested, `the ${e.title} tested`); need(e.found, `the ${e.title} found`); need(e.notTested, `the ${e.title} not-tested`); }
  need(d.scope.lede, "the scope lede"); for (const t of [...d.scope.explains, ...d.scope.stops]) need(t, "a scope item"); need(d.scope.note, "the scope note");
  need(d.lineage.lede, "the lineage lede"); for (const c of d.lineage.nodes) { need(c.label, "a lineage node"); need(c.body, `the ${c.label} node`); } need(d.lineage.note, "the lineage note");
  need(record.trailLede, "the trail lede"); need(record.originsNote, "the trail note");
  for (const o of record.origins) { need(o.work, `the ${o.year} work`); need(o.contribution, `the ${o.year} trail marker`); }
  need(record.oversimplificationsLede, "the cautions lede");
  need(record.relatedToLede, "the caution about neighbouring lenses");
  for (const link of record.relatedTo) need(link.body, "a relation body");
  for (const text of ["Listen first", "one mixture · several streams", "Which sources are sounding?", "Concept Lab synthesis"]) assert.ok(page.includes(text), `ASA is missing ${text}`);
  for (const name of ["Draw what you hear as", "Setting", "What is in the air?", "Which question?"]) assert.ok(html.includes(`aria-label="${name}"`), `the "${name}" control is named for assistive tech`);
  assert.match(html, /asa-hero\.webp/);
  assert.match(html, /asa-hero-stack\.webp/);
  assert.equal((html.match(/<img\b(?![^>]*\balt=)/g) ?? []).length, 0, "every ASA image carries an alt attribute, empty when decorative");
  for (const attr of ["data-preset", "data-view", "data-q", "data-step", "data-net"]) assert.match(html, new RegExp(attr), `the ${attr} figure renders on the server`);
  for (const id of ["listen", "problem", "grouping", "fusion", "learned", "music", "evidence", "scope", "lineage", "limits", "sources", "provenance"]) {
    assert.match(html, new RegExp(`id="${id}"`), `ASA chapter ${id} is present for the chapter map`);
  }
});

test("redesigned A Generative Theory of Tonal Music keeps every teaching element the record carries", async () => {
  const record = RECORDS.find((candidate) => candidate.id === "generative-theory-of-tonal-music");
  const html = await (await render("/concept-lab/theory/generative-theory-of-tonal-music")).text();
  const page = plain(html);
  const need = (text, where) => assert.ok(page.includes(plain(text)), `GTTM dropped ${where}: "${plain(text).slice(0, 80)}…"`);
  const walk = (node, where) => { need(node.label, where); if (node.sub) need(node.sub, where); if (node.relation) need(node.relation, where); for (const c of node.children ?? []) walk(c, where); };
  const d = record.gttm, a = d.analysis;
  for (const v of Object.values(a.surface)) if (typeof v === "string") need(v, "a fixed-surface fact");
  for (const e of a.surface.events) { need(e.note, "a note name"); need(e.harmony, "a harmony"); }
  for (const x of [...a.grouping.local, ...a.grouping.higher, ...a.grouping.boundaries]) need(x, "a grouping fact"); need(a.grouping.rationale, "the grouping rationale");
  for (const x of [a.meter.tactus, ...a.meter.levels, ...a.meter.strengths, a.meter.relation]) need(x, "a meter fact");
  for (const x of [...a.timeSpans.spans, ...a.timeSpans.heads, a.timeSpans.dependency]) need(x, "a time-span fact"); walk(a.timeSpans.tree, "the time-span tree");
  for (const x of [...a.prolongation.relations, a.prolongation.interpretation]) need(x, "a prolongation fact"); walk(a.prolongation.tree, "the prolongation tree");
  for (const r of a.reductions) { need(r.label, "a reduction level"); need(r.body, `the ${r.label} level`); }
  need(d.opening.lede, "the opening lede"); for (const l of d.opening.lenses) { need(l.label, "a lens"); need(l.question, `the ${l.label} question`); } need(d.opening.note, "the audio-held-constant note");
  for (const sec of [d.generative, d.listener, d.rules, d.spans, d.prolongation, d.finalModel.stages ? { ...d.finalModel, cards: d.finalModel.stages } : d.finalModel, d.lineage.nodes ? { ...d.lineage, cards: d.lineage.nodes } : d.lineage]) {
    need(sec.lede, "a section lede"); need(sec.note, "a section note");
    for (const c of sec.cards ?? []) { need(c.label, "a card"); need(c.body, `the ${c.label} card`); }
  }
  need(d.groupingMeter.lede, "the grouping/meter lede"); for (const x of [...d.groupingMeter.grouping, ...d.groupingMeter.meter]) need(x, "a grouping/meter statement"); need(d.groupingMeter.note, "the grouping/meter note");
  need(d.reduction.lede, "the reduction lede"); need(d.reduction.note, "the sonification note");
  need(d.evidence.lede, "the evidence lede");
  for (const e of d.evidence.items) { need(e.title, "an evidence title"); need(e.label, `the ${e.title} label`); need(e.citation, `the ${e.title} citation`); need(e.design, `the ${e.title} design`); need(e.tested, `the ${e.title} tested`); need(e.found, `the ${e.title} found`); need(e.notTested, `the ${e.title} not-tested`); }
  need(d.scope.lede, "the scope lede"); for (const t of [...d.scope.explains, ...d.scope.stops]) need(t, "a scope item"); need(d.scope.note, "the scope note");
  need(record.trailLede, "the trail lede");
  for (const o of record.origins) { need(o.work, `the ${o.year} work`); need(o.contribution, `the ${o.year} trail marker`); }
  need(record.oversimplificationsLede, "the cautions lede");
  for (const link of record.relatedTo) need(link.body, "a relation body");
  for (const text of ["One surface.", "one surface · four questions", "Interacting descriptions", "A pipeline"]) assert.ok(page.includes(text), `GTTM is missing ${text}`);
  for (const name of ["Which question?", "Which structure?", "Level of description", "Read the architecture as"]) assert.ok(html.includes(`aria-label="${name}"`), `the "${name}" control is named for assistive tech`);
  assert.match(html, /gttm-hero\.webp/);
  assert.match(html, /gttm-hero-stack\.webp/);
  assert.equal((html.match(/<img\b(?![^>]*\balt=)/g) ?? []).length, 0, "every GTTM image carries an alt attribute, empty when decorative");
  for (const attr of ["data-lens", "data-level", "data-step", "data-mode", "data-show"]) assert.match(html, new RegExp(attr), `the ${attr} figure renders on the server`);
  for (const id of ["phrase", "generative", "structure", "reduction", "prolongation", "architecture", "evidence", "scope", "lineage", "limits", "sources", "provenance"]) {
    assert.match(html, new RegExp(`id="${id}"`), `GTTM chapter ${id} is present for the chapter map`);
  }
});

test("redesigned Narmour's Implication–Realization Theory keeps every teaching element the record carries", async () => {
  const record = RECORDS.find((candidate) => candidate.id === "narmours-implication-realization-theory");
  const html = await (await render("/concept-lab/theory/narmours-implication-realization-theory")).text();
  const page = plain(html);
  const need = (text, where) => assert.ok(page.includes(plain(text)), `Narmour dropped ${where}: "${plain(text).slice(0, 80)}…"`);
  const d = record.narmour;
  for (const v of Object.values(d.identity)) need(v, "an identity fact");
  need(d.analysisNote, "the constructed-examples note"); need(d.finalModelNote, "the final-model note");
  for (const key of ["opening", "twoNotes", "thirdNote", "implications", "small", "large", "testable", "moreThanDirection", "realiseDeny", "process", "systems", "loop", "cuddy", "schellenberg96", "schellenberg97", "development", "styleLearning", "scope"]) {
    const sec = d[key];
    need(sec.lede, `the ${key} lede`);
    if (sec.note) need(sec.note, `the ${key} note`);
    if (sec.question) need(sec.question, `the ${key} question`);
    for (const c of sec.cards ?? []) { need(c.label, `a ${key} card`); need(c.body, `the ${c.label} card`); }
    if (sec.evidence) { const e = sec.evidence; for (const f of [e.title, e.label, e.citation, e.design, e.testedLabel, e.tested, e.foundLabel, e.found, e.notTested]) if (f) need(f, `the ${e.title} ledger`); }
  }
  for (const t of [...d.scope.explains, ...d.scope.stops]) need(t, "a scope item");
  for (const f of d.families) { need(f.label, "a family"); need(f.interval, "a family interval"); need(f.body, `the ${f.label} family body`); }
  for (const c of d.families.flatMap((f) => f.candidates)) {
    need(c.label, "a continuation"); need(c.body, `the ${c.label} body`); need(c.physicalMovement, `the ${c.label} movement`); need(c.intervalSizes, `the ${c.label} sizes`);
    for (const r of c.relations) { need(r.label, "a relation"); need(r.status, `the ${c.label} ${r.label} status`); need(r.detail, `the ${c.label} ${r.label} verdict`); }
  }
  need(d.matrix.lede, "the matrix lede"); need(d.matrix.note, "the matrix note");
  need(record.hook, "the hook"); need(record.oneSentence, "the one-sentence definition");
  for (const f of record.facts) need(f, "a fact");
  need(record.trailLede, "the trail lede");
  for (const o of record.origins) { need(o.work, `the ${o.year} work`); need(o.contribution, `the ${o.year} trail marker`); }
  need(record.oversimplificationsLede, "the cautions lede");
  for (const x of record.oversimplifications) need(x, "a caution");
  for (const x of record.qualifications) need(x, "a qualification");
  for (const link of record.relatedTo) need(link.body, "a relation body");
  for (const text of ["Continue —", "Two tones point", "Small tends to", "Same movement,", "How a theory became", "Shortcuts that turn", "Closure is not scored as a table row here."]) assert.ok(page.includes(text), `Narmour is missing ${text}`);
  for (const name of ["Choose the fixed implicative interval", "Step through the three tones", "Physical movement", "How the two sources meet", "Step through the loop", "Which layer?"]) assert.ok(html.includes(`aria-label="${name}"`), `the "${name}" control is named for assistive tech`);
  assert.match(html, /narmour-hero\.webp/);
  assert.match(html, /narmour-hero-stack\.webp/);
  assert.equal((html.match(/<img\b(?![^>]*\balt=)/g) ?? []).length, 0, "every Narmour image carries an alt attribute, empty when decorative");
  for (const attr of ["data-family", "data-step", "data-size", "data-movement", "data-meeting", "data-layer"]) assert.match(html, new RegExp(attr), `the ${attr} figure renders on the server`);
  for (const id of ["question", "implication", "size", "verdicts", "beyond", "evidence", "scope", "trail", "limits", "sources", "provenance"]) {
    assert.match(html, new RegExp(`id="${id}"`), `Narmour chapter ${id} is present for the chapter map`);
  }
  // the size dial is a real range input with its convention spelled out
  assert.match(html, /<input[^>]*type="range"[^>]*min="1"[^>]*max="12"/);
});

test("redesigned Statistical Learning of Music keeps every teaching element the record carries", async () => {
  const record = RECORDS.find((candidate) => candidate.id === "statistical-learning-of-music");
  const html = await (await render("/concept-lab/theory/statistical-learning-of-music")).text();
  const page = plain(html);
  // the record writes its own provenance mark at the start of a note; the page keeps it as a labelled mark
  const bare = (text) => String(text).replace(/^[●■▲✦?]\s*/, "");
  const need = (text, where) => assert.ok(page.includes(plain(bare(text))), `Statistical Learning dropped ${where}: "${plain(bare(text)).slice(0, 80)}…"`);
  const d = record.statistical;
  for (const v of Object.values(d.identity)) need(v, "an identity fact");
  for (const key of ["opening", "exposure", "frequency", "transition", "comparison", "segmentation", "enculturation", "clocks", "newWorld", "liking", "prediction", "tonalGestalt", "mechanism", "realMusic", "explains", "stops"]) {
    const sec = d[key];
    need(sec.lede, `the ${key} lede`); need(sec.note, `the ${key} note`);
    for (const c of sec.cards) { need(c.label, `a ${key} card`); need(c.body, `the ${c.label} card`); }
  }
  const stream = d.hiddenLanguage.stream;
  need(d.hiddenLanguage.lede, "the hidden-language lede"); need(d.hiddenLanguage.note, "the hidden-language note"); need(stream.note, "the stream note");
  for (const u of stream.units) { need(u.label, "a candidate unit"); need(u.notes.join(" · "), `the ${u.label} tones`); }
  for (const f of stream.eventFrequencies) { need(f.share, `the ${f.label} share`); }
  for (const t of stream.transitions) { need(`${t.from} → ${t.to}`, "a transition"); need(t.probability, `the ${t.from}→${t.to} probability`); }
  for (const a of [stream.withinAudit, stream.boundaryAudit]) { need(a.direction, "an audit direction"); need(a.mean, "an audit mean"); need(a.range, "an audit range"); need(a.distribution, "an audit distribution"); }
  for (const v of Object.values(stream.audioSpec)) need(v, "an audio spec value");
  for (const x of stream.acousticAudit) need(x, "an acoustic audit line");
  for (const p of stream.pitchMapping) need(`MIDI ${p.midi} · ${p.frequency}`, `the pitch of ${p.label}`);
  need(`actual unit order · ${stream.unitSequence.length} units / ${stream.noteSequence.length} tones`, "the unit order label");
  need(d.worlds.lede, "the worlds lede"); need(d.worlds.testContext, "the test context"); need(d.worlds.audioSpec, "the worlds audio spec"); need(d.worlds.note, "the worlds note");
  for (const w of d.worlds.worlds) {
    need(w.label, "a world"); need(w.note, `the ${w.label} note`);
    for (const c of w.conditionals) { need(c.label, `the ${w.label} conditional`); need(c.probability, `the ${w.label} ${c.label} probability`); }
    for (const m of w.marginalTotals) need(`${m.label} total`, "a marginal total");
  }
  need(d.model.lede, "the model lede"); need(d.model.note, "the model note");
  for (const c of d.model.steps) { need(c.label, "a model step"); need(c.body, `the ${c.label} step`); }
  need(d.evidence.lede, "the evidence lede"); need(d.evidence.note, "the evidence note");
  for (const e of d.evidence.items) { need(e.title, "an evidence title"); need(e.label, `the ${e.title} label`); need(e.citation, `the ${e.title} citation`); need(e.design, `the ${e.title} design`); need(e.tested, `the ${e.title} tested`); need(e.found, `the ${e.title} found`); need(e.notTested, `the ${e.title} not-tested`); }
  need(record.hook, "the hook"); need(record.oneSentence, "the one-sentence definition");
  for (const f of record.facts) need(f, "a fact");
  need(record.trailLede, "the trail lede");
  for (const o of record.origins) { need(o.work, `the ${o.year} work`); need(o.contribution, `the ${o.year} trail marker`); }
  need(record.oversimplificationsLede, "the cautions lede");
  for (const x of record.oversimplifications) need(x, "a caution");
  for (const x of record.qualifications) need(x, "a qualification");
  need(record.relatedToLede, "the neighbouring-lenses lede");
  for (const link of record.relatedTo) need(link.body, "a relation body");
  for (const text of ["No one had to", "Common is not", "Let the stream run", "Same context.", "Two clocks,", "Learning is not", "What is doing", "Shortcuts that turn", "candidate unit"]) assert.ok(page.includes(text), `Statistical Learning is missing ${text}`);
  for (const name of ["What to count", "Choose an exposure world", "Which clock?", "Which step?", "Describe the same stream as", "Follow the loop"]) assert.ok(html.includes(`aria-label="${name}"`), `the "${name}" control is named for assistive tech`);
  assert.match(html, /stat-hero\.webp/);
  assert.match(html, /stat-hero-stack\.webp/);
  assert.equal((html.match(/<img\b(?![^>]*\balt=)/g) ?? []).length, 0, "every Statistical Learning image carries an alt attribute, empty when decorative");
  for (const attr of ["data-lens", "data-world", "data-focus", "data-phase", "data-account", "data-step"]) assert.match(html, new RegExp(attr), `the ${attr} figure renders on the server`);
  for (const id of ["exposure", "counts", "stream", "histories", "clocks", "learning", "mechanism", "scope", "evidence", "limits", "sources", "provenance"]) {
    assert.match(html, new RegExp(`id="${id}"`), `Statistical Learning chapter ${id} is present for the chapter map`);
  }
  // the ledger is a real table with a row and a column for every tone, and the exposure slider is a real range input
  assert.match(html, /<input[^>]*type="range"[^>]*min="2"[^>]*max="36"/);
  assert.equal((html.match(/<select\b/g) ?? []).length, 2, "the ledger has its two pickers");
});

test("redesigned Predictive Processing in Music keeps every teaching element the record carries", async () => {
  const record = RECORDS.find((candidate) => candidate.id === "predictive-processing-in-music");
  const html = await (await render("/concept-lab/theory/predictive-processing-in-music")).text();
  const page = plain(html);
  // the record writes its own provenance mark at the start of a note; the page keeps it as a labelled mark
  const bare = (text) => String(text).replace(/^[●■▲✦?]\s*/, "");
  const need = (text, where) => assert.ok(page.includes(plain(bare(text))), `Predictive Processing dropped ${where}: "${plain(bare(text)).slice(0, 80)}…"`);
  const d = record.predictiveProcessing;
  for (const v of Object.values(d.identity)) need(v, "an identity fact");
  for (const key of ["opening", "nextNote", "generative", "messagePassing", "error", "precision", "firstSecond", "attention", "hierarchy", "zeroError", "pcm", "culture", "activeInference", "critical"]) {
    const sec = d[key];
    need(sec.lede, `the ${key} lede`); need(sec.note, `the ${key} note`);
    for (const c of sec.cards) { need(c.label, `a ${key} card`); need(c.body, `the ${c.label} card`); }
  }
  const pi = d.precisionInteraction;
  need(pi.lede, "the precision lede"); need(pi.note, "the precision note");
  for (const c of pi.contexts) {
    need(c.label, "a context"); need(c.history, `the ${c.label} history`); need(c.interpretation, `the ${c.label} reading`);
    need(`σ = ${c.sigmaMs} ms`, `the ${c.label} width`); need(`${(c.targetOffsetMs / c.sigmaMs).toFixed(2)}σ`, `the ${c.label} standardised displacement`);
  }
  need(d.omission.lede, "the omission lede"); need(d.omission.note, "the omission note"); need(d.omission.expected, "the expected target");
  for (const b of d.omission.preceding) need(b, "a preceding beat");
  need(d.signals.lede, "the signals lede"); need(d.signals.note, "the signals note");
  for (const e of d.signals.items) { need(e.title, "an evidence title"); need(e.label, `the ${e.title} label`); need(e.citation, `the ${e.title} citation`); need(e.design, `the ${e.title} design`); need(e.tested, `the ${e.title} tested`); need(e.found, `the ${e.title} found`); need(e.notTested, `the ${e.title} not-tested`); }
  need(d.finalModel.lede, "the model lede"); need(d.finalModel.note, "the model note");
  for (const c of d.finalModel.nodes) { need(c.label, "a model node"); need(c.body, `the ${c.label} node`); }
  need(record.hook, "the hook"); need(record.oneSentence, "the one-sentence definition");
  for (const f of record.facts) need(f, "a fact");
  need(record.trailLede, "the trail lede");
  for (const o of record.origins) { need(o.work, `the ${o.year} work`); need(o.contribution, `the ${o.year} trail marker`); }
  need(record.oversimplificationsLede, "the cautions lede");
  for (const x of record.oversimplifications) need(x, "a caution");
  for (const x of record.qualifications) need(x, "a qualification");
  need(record.relatedToLede, "the neighbouring-lenses lede");
  for (const link of record.relatedTo) need(link.body, "a relation body");
  for (const text of ["Hearing is", "Error is", "Which error should", "Priors have", "Down with", "Context-sensitive perception, musical expectation", "The framework is a powerful organising lens", "Shortcuts that turn", "NO SENSORY EVENT ARRIVED HERE", "Predicted input ≠ actual silence.", "The expected target is present."]) assert.ok(page.includes(text), `Predictive Processing is missing ${text}`);
  for (const name of ["Which way does it travel?", "Choose whether the expected target is present", "Choose a rhythmic context to inspect", "Two things to do about a mismatch", "Follow the circuit"]) assert.ok(html.includes(`aria-label="${name}"`), `the "${name}" control is named for assistive tech`);
  assert.match(html, /pp-hero\.webp/);
  assert.match(html, /pp-hero-stack\.webp/);
  assert.equal((html.match(/<img\b(?![^>]*\balt=)/g) ?? []).length, 0, "every Predictive Processing image carries an alt attribute, empty when decorative");
  for (const attr of ["data-flow", "data-present", "data-way", "data-step"]) assert.match(html, new RegExp(attr), `the ${attr} figure renders on the server`);
  for (const id of ["question", "model", "error", "precision", "history", "evidence", "scope", "limits", "sources", "provenance"]) {
    assert.match(html, new RegExp(`id="${id}"`), `Predictive Processing chapter ${id} is present for the chapter map`);
  }
  // the width of the expectation is a real range input across the record's two contexts
  assert.match(html, /<input[^>]*type="range"[^>]*min="20"[^>]*max="130"/);
  // the ladder is drawn with the higher, slower level at the top and the sensory end at the bottom, in the list as in the figure
  const rungLabels = [...html.matchAll(/<text[^>]*class="[^"]*rungLabel[^"]*"[^>]*>([^<]*)</g)].map((m) => m[1].toLowerCase());
  assert.equal(rungLabels.length, 3, "the ladder draws three rungs");
  assert.match(rungLabels[0], /^higher/); assert.equal(rungLabels[1], "middle"); assert.match(rungLabels[2], /^lower/);
  // every message-passing card is read in the ladder's own panel, once
  // (the framework's own script payload repeats every prop a client component receives, so the count is taken on the drawn text)
  const drawn = plain(html.replace(/<script[\s\S]*?<\/script>/g, ""));
  for (const c of d.messagePassing.cards) assert.equal(drawn.split(plain(c.body)).length - 1, 1, `the "${c.label}" statement appears once, in the ladder panel`);
  // the drawing of the note arriving now beside the next note is named for assistive tech
  assert.match(html, /aria-label="A time line of five notes\./);
  // the seven parts of the circuit stay listed and every numbered step keeps its hint in its accessible name
  assert.equal((html.match(/data-compact/g) ?? []).length, 1, "the circuit's numbered steps are the one compact choice group");
});

test("redesigned Music Preference and Person–Music Fit keeps every teaching element the record carries", async () => {
  const record = RECORDS.find((candidate) => candidate.id === "music-preference");
  const html = await (await render("/concept-lab/theory/music-preference")).text();
  const page = plain(html);
  const need = (text, where) => assert.ok(page.includes(plain(text)), `Music Preference dropped ${where}: "${plain(text).slice(0, 80)}…"`);
  // a heading that sets a phrase in italics is split by a tag, and the tag is read as a space: compare those without spaces at all
  const tight = (value) => plain(value).replace(/\s+/g, "");
  const needTight = (text, where) => assert.ok(tight(page).includes(tight(text)), `Music Preference dropped ${where}: "${plain(text).slice(0, 80)}…"`);
  need(record.hook, "the hook"); need(record.oneSentence, "the one-sentence definition");
  for (const f of record.facts) need(f, "a fact");
  const cs = record.conceptualStatus;
  needTight(cs.flag, "the flag that this is a field, not a theory"); need(cs.body, "the field statement");
  for (const q of cs.questions) need(q, "one of the field's four questions");
  need(record.ideaLede, "the idea"); need(record.originsNote, "the note on there being no single founding paper");
  const demo = record.demo;
  need(demo.label, "the five-dimensions label"); need(demo.caption, "the five-dimensions caption");
  for (const f of demo.facets) { need(f.label, "a MUSIC dimension"); need(f.body, `the ${f.label} character`); }
  need(record.modelsLede, "the models lede"); need(record.modelsNote, "the models note");
  for (const m of record.models) { need(m.year, "a model year"); need(m.name, "a model name"); need(m.source, `the ${m.year} source`); need(m.body, `the ${m.year} body`); need(m.note, `the ${m.year} note`); }
  need(record.expansionsLede, "the levers lede");
  for (const e of record.expansions) { need(e.title, "a lever"); need(e.body, `the ${e.title} body`); }
  need(record.interactionsLede, "the function lede");
  for (const x of record.interactions) { need(x.kicker, "a function kicker"); need(x.title, "a function card"); need(x.body, `the ${x.title} body`); }
  need(record.pathwaysLede, "the development lede"); need(record.pathwaysCaution, "the development caution");
  for (const p of record.pathways) { need(p.title, "the development title"); need(p.blurb, "the development blurb"); for (const step of p.steps) need(step, "a development step"); }
  need(record.appliedLede, "the work lede");
  for (const a of record.applied) { need(a.year, "a study year"); need(a.authors, "a study's authors"); need(a.work, `the ${a.year} study`); need(a.body, `the ${a.year} study body`); }
  need(record.categoriesLede, "the fit lede"); need(record.categoriesNote, "the note that Person–Music Fit is our frame");
  for (const c of record.categories) { need(c.title, "a side of the fit"); need(c.definition, `the ${c.title} definition`); for (const e of c.examples) need(e, "an example on a side of the fit"); }
  need(record.trailLede, "the trail lede");
  for (const o of record.origins) { need(o.work, `the ${o.year} work`); need(o.contribution, `the ${o.year} trail marker`); }
  need(record.oversimplificationsLede, "the cautions lede");
  for (const x of record.oversimplifications) need(x, "a caution");
  for (const x of record.qualifications) need(x, "a qualification");
  need(record.minimumReadingLabel, "the minimum-reading label");
  for (const m of record.minimumReading) { need(m.citation, "a minimum-reading source"); need(m.contribution, "a minimum-reading contribution"); }
  // the full trail lists four of the works again in a shorter form, and the page keeps that list whole
  for (const f of record.fullSources) { need(f.citation, "a full-trail source"); need(f.contribution, "a full-trail contribution"); }
  for (const p of record.provenance) { need(p.label, "a provenance label"); need(p.note, `the ${p.label} note`); }
  for (const h of Object.values(record.headings)) { need(h.toc, "a chapter's kicker"); needTight(h.title, "a chapter's title"); }
  for (const text of ["This is a field,", "Taste has", "Two attempts", "Five things", "Preference as", "How a taste", "When the listening happens", "Person–Music Fit:", "What this field", "the cited account stops here", "not claimed:", "our frame", "Hear a sketch", "listeners respond"]) assert.ok(page.includes(text), `Music Preference is missing ${text}`);
  for (const name of ["Choose a work on the map", "The five MUSIC dimensions", "How the structure was measured", "Choose a lever", "Which question to ask", "Walk the road, one stop at a time", "Who chooses the music at work?", "Which side to show"]) assert.ok(html.includes(`aria-label="${name}"`), `the "${name}" control is named for assistive tech`);
  assert.match(html, /mp-hero\.webp/);
  assert.match(html, /mp-hero-stack\.webp/);
  assert.equal((html.match(/<img\b(?![^>]*\balt=)/g) ?? []).length, 0, "every Music Preference image carries an alt attribute, empty when decorative");
  for (const attr of ["data-at", "data-quality", "data-mode", "data-ask", "data-step", "data-who", "data-side"]) assert.match(html, new RegExp(attr), `the ${attr} figure renders on the server`);
  for (const id of ["field", "shape", "models", "levers", "function", "growth", "work", "fit", "limits", "sources", "provenance"]) {
    assert.match(html, new RegExp(`id="${id}"`), `Music Preference chapter ${id} is present for the chapter map`);
  }
  // all five qualities are drawn as a trace in the chooser, and the chosen one is drawn large
  assert.equal((html.match(/<g[^>]*data-quality="[MUSIC]"/g) ?? []).length, 6, "five miniature traces and one large one");
  // the two literatures on the map: four works on one line, three on the other
  assert.match(html, /The structure and development of taste/); assert.match(html, /Listening at work/);
  // Person–Music Fit is marked as this page's own frame wherever it is drawn
  assert.ok((page.match(/our frame/g) ?? []).length >= 2, "the frame is labelled as ours");
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

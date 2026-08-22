import type { CSSProperties, ReactNode } from "react";
import type { Source, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { Bullet, Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";
import {
  SDTAutonomyMatrix,
  SDTMiniTheoryConstellation,
  SDTMotiveSelector,
  SDTNeedSelector,
  SDTRegulationLandscape,
  SDTRewardComparison,
} from "./SDTPatterns";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function SourceList({ items }: { items: Source[] }) {
  return (
    <>
      {items.map((source, index) => (
        <div className="src-item" key={source.citation + index}>
          <span className="n">{index + 1}</span>
          <div>
            <Rich className="c" as="div" html={source.citation} />
            <div className="w">{source.contribution}</div>
            {source.doi && <div className="doi">doi {source.doi}</div>}
          </div>
        </div>
      ))}
    </>
  );
}

function RelatedLinks({ record }: { record: TheoryRecord }) {
  if (!record.relatedTo?.length) return null;
  const links = record.relatedTo
    .map((relation) => ({ relation, target: RECORDS.find((item) => item.id === relation.recordId) }))
    .filter((item) => item.target);

  return (
    <>
      <Rich className="lede" as="p" html={record.relatedToLede ?? ""} />
      {links.map(({ relation, target }) => {
        const kind = KIND[target!.kind];
        return (
          <a className="rel-card" href={recordHref(target!)} key={relation.recordId}>
            <span className="rel-relation">this record {relation.relation}</span>
            <span className="rel-title">{target!.title}</span>
            <span className="rel-hook">{target!.hook}</span>
            <Rich className="rel-body read" as="span" html={relation.body} />
            <span className="rel-go" style={{ color: kind.colour }}>{kind.cta} →</span>
          </a>
        );
      })}
    </>
  );
}

function WorkModel({ record }: { record: TheoryRecord }) {
  const model = record.sdt!.workModel;
  return (
    <figure className="sdt-work-model sk-box tilt-l" aria-label="Branched SDT workplace architecture">
      <div className="sdt-work-inputs">
        <div className="sdt-work-group teal">
          <span className="k">workplace / social context</span>
          <ul>{model.context.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="sdt-work-group gold">
          <span className="k">individual orientations</span>
          <ul>{model.person.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
      <div className="sdt-work-connector" aria-hidden="true"><span>may shape the conditions and meaning of action</span>↓</div>
      <div className="sdt-work-needs">
        <span className="k">psychological need experience</span>
        <div className="sdt-work-need-grid">
          <div className="sdt-work-need satisfied"><b>{model.needs[0]}</b><span>one possible experience</span></div>
          <div className="sdt-work-need frustrated"><b>{model.needs[1]}</b><span>a distinct possible experience</span></div>
        </div>
      </div>
      <div className="sdt-work-connector" aria-hidden="true"><span>may relate to</span>↓</div>
      <div className="sdt-work-motivation">
        <span className="k">motivation quality</span>
        <div className="sdt-work-motivation-list">{model.motivations.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="sdt-work-connector" aria-hidden="true"><span>may relate to selected outcomes</span>↓</div>
      <div className="sdt-work-outcomes">
        {model.outcomes.map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="sdt-linear">
        <p className="k">how to read the map</p>
        <p className="read">Work and person-level variables are inputs or influences; satisfaction and frustration are related but distinct experiences; motivation quality is not the same thing as effort; outcomes are selected rather than guaranteed.</p>
      </div>
      <figcaption className="sdt-caption">● Source-grounded workplace architecture, redrawn as a branched teaching model. The arrows show theorised relationships, not equal causal strength or a universal mediation chain.</figcaption>
    </figure>
  );
}

export function SDTBody({ record: r }: { record: TheoryRecord }) {
  const data = r.sdt;
  if (!data) return null;

  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "Same action, different why", "Same action. Different why.", "var(--red)", (
    <>
      <p className="lede">Two employees stay late to finish the same project. Their visible behaviour looks similar; the reason moving it may not.</p>
      <div className="sdt-opening-grid">
        {data.opening.cases.map((item) => (
          <article className="sdt-opening-case sk-box" key={item.label}>
            <span className="k">{item.label}</span>
            <blockquote>“{item.quote}”</blockquote>
            <p className="read">{item.body}</p>
          </article>
        ))}
      </div>
      <p className="sdt-note"><span className="sdt-mark">▲</span> {data.opening.note}</p>
    </>
  ));

  add("motives", "Why are you doing it?", "Why are you doing it?", "var(--teal)", (
    <>
      <p className="lede">SDT asks not only how much motivation is present, but what kind of motivation is moving the action.</p>
      <SDTMotiveSelector items={data.motives} />
    </>
  ));

  add("regulation", "Build the regulation architecture", "Build the regulation architecture", "var(--teal)", (
    <>
      <p className="lede">The continuum orders reasons by relative autonomy. It is a landscape of possible regulations, not a staircase that every person must climb.</p>
      <SDTRegulationLandscape items={data.regulations} />
    </>
  ));

  add("extrinsic", "Extrinsic ≠ controlled", "Extrinsic does not mean controlled", "var(--red)", (
    <>
      <p className="lede">Extrinsic means the activity is undertaken for a separable outcome. It does not tell us, by itself, whether the reason is pressured or personally endorsed.</p>
      <div className="sdt-extrinsic-grid">
        <article className="sdt-extrinsic-card controlled sk-box">
          <span className="k">external</span>
          <blockquote>“I’ll do it because I get paid.”</blockquote>
          <p className="read">The reason depends on an external contingency. It is extrinsic and relatively controlled.</p>
        </article>
        <article className="sdt-extrinsic-card autonomous sk-box">
          <span className="k">identified</span>
          <blockquote>“I don’t enjoy the paperwork, but I genuinely believe it matters.”</blockquote>
          <p className="read">The outcome remains separable from the activity, but the value is personally accepted. It is extrinsic and relatively autonomous.</p>
        </article>
      </div>
      <p className="sdt-callout"><span>Same category?</span> Not quite. <b>Extrinsic is not one thing.</b></p>
    </>
  ));

  add("internalisation", "Internalisation", "Whose reason does this feel like?", "var(--teal)", (
    <>
      <p className="lede">Internalisation is taking in a value or regulation. Integration is bringing that regulation into coherence with wider values and the self.</p>
      <div className="sdt-branch-map" aria-label="Possible meanings of the same externally prompted behaviour">
        <div className="sdt-branch-root sk-box">same behaviour<br /><span>complete the paperwork</span></div>
        <div className="sdt-branch-lines" aria-hidden="true"><span>can be experienced as</span>↘ ↓ ↙</div>
        <div className="sdt-branch-grid">
          {data.internalisation.branches.map((item) => (
            <article className="sdt-branch-card sk-box" key={item.label} style={{ "--sdt-colour": item.colour } as CSSProperties}>
              <span className="k">{item.label}</span>
              <blockquote>“{item.quote}”</blockquote>
              <p className="read">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="sdt-note"><span className="sdt-mark">?</span> {data.internalisation.note}</p>
    </>
  ));

  add("needs", "Three basic needs", "Three basic psychological needs", "var(--teal)", (
    <>
      <p className="lede">Only after the quality of motivation is visible do the three needs enter. They describe psychological experiences, not three decorative ingredients in a formula.</p>
      <SDTNeedSelector items={data.needs} />
    </>
  ));

  add("autonomy", "Autonomy ≠ independence", "Autonomy is not independence", "var(--red)", (
    <>
      <p className="lede">Autonomy concerns volition. A person can act autonomously while interdependent, or act under control while working alone.</p>
      <SDTAutonomyMatrix cases={data.autonomyMatrix.cases} note={data.autonomyMatrix.note} />
    </>
  ));

  add("context", "Context gets inside motivation", "Context gets inside motivation", "var(--teal)", (
    <>
      <p className="lede">Leadership, job design, feedback, rewards, participation, choice, climate, and relationships are contextual conditions. They are not automatically psychological needs.</p>
      <div className="sdt-context-grid">
        <div className="sdt-context-box teal sk-box"><span className="k">work / social context</span><ul>{data.context.contextItems.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div className="sdt-context-box gold sk-box"><span className="k">person-level influences</span><ul>{data.context.personItems.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </div>
      <div className="sdt-context-arrow" aria-hidden="true">may support, neglect, or thwart ↓</div>
      <div className="sdt-experience-grid">
        {data.context.experiences.map((item) => <article className="sdt-experience sk-box" key={item.label} style={{ "--sdt-colour": item.colour } as CSSProperties}><span className="k">{item.label}</span><p className="read">{item.body}</p></article>)}
      </div>
      <div className="sdt-context-arrow" aria-hidden="true">may be associated with ↓</div>
      <div className="sdt-context-outcomes">{data.context.outcomes.map((item) => <span key={item}>{item}</span>)}</div>
      <p className="sdt-note"><span className="sdt-mark">●</span> {data.context.note}</p>
    </>
  ));

  add("rewards", "Same reward, different meaning", "The same reward can mean different things", "var(--red)", (
    <>
      <p className="lede">A reward does not arrive with one universal motivational function. Contingency, salience, meaning, interpersonal delivery, and task context matter.</p>
      <SDTRewardComparison data={data.rewards} />
    </>
  ));

  add("frustration", "Satisfaction ≠ frustration", "Satisfaction is not simply the opposite of frustration", "var(--teal)", (
    <>
      <p className="lede">The absence of support is not automatically the same as active thwarting. Keep need satisfaction and need frustration related, but distinct.</p>
      <div className="sdt-frustration-grid">
        {data.needComparison.pairs.map((pair) => (
          <article className="sdt-frustration-pair sk-box" key={pair.label} style={{ "--sdt-colour": pair.colour } as CSSProperties}>
            <span className="k">{pair.label}</span>
            <div><span className="sdt-low-label">low satisfaction</span><p className="read">“{pair.low}”</p></div>
            <div><span className="sdt-thwart-label">active frustration</span><p className="read">“{pair.thwart}”</p></div>
            <p className="sdt-small-note">{pair.body}</p>
          </article>
        ))}
      </div>
      <p className="sdt-note"><span className="sdt-mark">●</span> {data.needComparison.note}</p>
    </>
  ));

  add("work", "SDT at work", "SDT at work: a branched motivational map", "var(--plum-deep)", (
    <>
      <p className="lede">The workplace model brings context, person-level influences, psychological needs, motivation quality, and selected outcomes into one map without pretending that every study tests every arrow.</p>
      <WorkModel record={r} />
    </>
  ));

  add("family", "SDT is a family", "SDT is a family of connected mini-theories", "var(--teal)", (
    <>
      <p className="lede">Each mini-theory answers a different motivational question. The family should not be flattened into six boxes mechanically feeding the same outcome.</p>
      <SDTMiniTheoryConstellation items={data.miniTheories} />
    </>
  ));

  add("explains", "What SDT explains", "What SDT explains especially well", "var(--teal)", (
    <div className="sdt-scope-grid">
      <div className="sk-box teal tilt-l"><span className="k">SDT gives us a motivational map</span><ul>{data.scope.explains.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></div>
      <div className="sk-box red tilt-r"><span className="k">the map is not every outcome</span><ul>{data.scope.stops.map((item) => <li key={item}><span>?</span>{item}</li>)}</ul></div>
    </div>
  ));

  add("stops", "Where SDT stops", "Where SDT stops", "var(--red)", (
    <>
      <div className="sdt-stop-box sk-box red tilt-r2"><Icon id="i-warn" style={{ width: 28, height: 28, color: "var(--red)" }} /><p className="read">{data.scope.note}</p></div>
      <div className="sdt-boundary-list">
        {[
          "the exact emotion a person will feel",
          "the exact behaviour one context will produce",
          "a guarantee that autonomy support produces performance",
          "a guarantee that rewards undermine motivation",
          "a single score that captures every motivational meaning",
          "identical need expression in every cultural context",
        ].map((item) => <Bullet icon="i-q" colour="var(--red)" html={item} key={item} />)}
      </div>
    </>
  ));

  add("related", "Where it sits", "Where this sits in the library", "var(--teal)", <RelatedLinks record={r} />);

  add("trail", "The trail", "The trail", "var(--teal)", (
    <>
      <p className="lede">The trail runs from research on intrinsic motivation and internalisation to work motivation and a wider family of SDT mini-theories.</p>
      <svg className="sdt-trail-line" viewBox="0 0 400 58" preserveAspectRatio="none" aria-hidden="true"><path d="M6 42C48 16 84 48 126 24s70 28 112 4 76 24 150 4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
      <div className="trail">{r.origins.map((origin) => <div className="trail-item" key={origin.year + origin.author}><span className="trail-year">{origin.year}</span><div><Rich as="h3" html={origin.author} /><Rich className="work" as="span" html={origin.work} /><Rich as="p" html={origin.contribution} /></div></div>)}</div>
    </>
  ));

  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", (
    <>
      <p className="lede">The most dangerous shortcuts are the ones that turn a theory about meaning into a formula.</p>
      <div className="grid2" style={{ marginTop: "1rem" }}>{r.oversimplifications.map((item, index) => <div className={index % 2 ? "tilt-r2" : "tilt-l2"} key={item}><Cloud colour="#E24E1B"><Rich className="read" as="p" html={item} /></Cloud></div>)}</div>
    </>
  ));

  add("qualifications", "Still open", "Still open", "var(--teal)", <div style={{ marginTop: ".4rem" }}>{r.qualifications.map((item) => <Bullet icon="i-q" colour="var(--teal)" html={item} key={item} />)}</div>);

  add("sources", "Sources", "Sources", "var(--teal)", (
    <>
      <div className="sk-box tilt-l2" style={{ marginTop: ".7rem" }}><div style={{ display: "flex", gap: ".6rem", alignItems: "center", marginBottom: ".4rem" }}><Icon id="i-book" style={{ width: 26, height: 26, color: "var(--red)" }} /><h3>{r.minimumReadingLabel ?? "If you read five things"}</h3></div><SourceList items={r.minimumReading} /></div>
      <div style={{ marginTop: "1.1rem" }}><span className="k">the full trail</span><div style={{ marginTop: ".4rem" }}><SourceList items={r.fullSources} /></div></div>
    </>
  ));

  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", (
    <div className="prov" style={{ marginTop: ".8rem" }}>{r.provenance.map((item) => <div className="prov-item" key={item.label} data-reveal="rise"><span className="g" style={{ color: item.colour }}>{item.glyph}</span><div><h4>{item.label}</h4><p>{item.note}</p></div></div>)}</div>
  ));

  const toc = blocks.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`] as [string, string, string]);
  return <RecordShell record={r} toc={toc}>{blocks.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}

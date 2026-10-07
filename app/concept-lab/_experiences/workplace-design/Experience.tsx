import type { ReactNode } from "react";
import type { Disambiguation, TheoryRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Plate, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, CodaHead, Trail } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import { RoomMixer, Tradeoff, WorkspaceStress } from "./Figures";
import s from "./wp.module.css";

const CHAPTERS: ChapterEntry[] = [
  { id: "two", num: "01", label: "Two literatures" },
  { id: "idea", num: "02", label: "The room as condition" },
  { id: "elements", num: "03", label: "Read the conditions" },
  { id: "mechanism", num: "04", label: "Workspace stress" },
  { id: "tradeoff", num: "05", label: "The open-plan trade-off" },
  { id: "trail", num: "06", label: "Trail" },
  { id: "limits", num: "07", label: "Limits" },
  { id: "sources", num: "08", label: "Sources" },
  { id: "provenance", num: "09", label: "Provenance" },
];

function Head({ id, num, title, lede }: { id: string; num: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <header className={s.head}>
      <Kicker num={num}>{num === "01" ? "Terms" : "Physical workplace"}</Kicker>
      <h2 id={id} className={s.sectionTitle}>{title}</h2>
      {lede && <div className={s.headLede}>{lede}</div>}
    </header>
  );
}

function TwoLiteratures({ disambiguation }: { disambiguation: Disambiguation }) {
  return (
    <div className={s.literatures}>
      <article className={s.physical}>
        <p className={s.smallHead}>This page · the physical environment</p>
        <h3>{disambiguation.covered.title}</h3>
        <p>{disambiguation.covered.blurb}</p>
        <ul>{disambiguation.covered.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>
      <article className={s.job}>
        <p className={s.smallHead}>A separate literature · work or job design</p>
        <h3>{disambiguation.notCovered.title}</h3>
        <p>{disambiguation.notCovered.blurb}</p>
        <ul>{disambiguation.notCovered.items.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className={s.smallHead}>Foundational reading for that question</p>
        <SourceShelf items={disambiguation.notCovered.sources} />
      </article>
      <Rich as="p" className={s.distinctionNote} html={disambiguation.note} />
    </div>
  );
}

export function WPExperience({ record: r }: { record: TheoryRecord }) {
  const disambiguation = r.disambiguation;
  const pathway = r.pathways?.[0];
  const demo = r.demo;
  if (!disambiguation || !pathway || !demo || demo.type !== "dual-path") throw new Error("Workplace Design record requires its distinction, proposed pathway and enclosure model");
  const otherSources = r.fullSources.filter((source) => !r.minimumReading.some((item) => item.citation === source.citation));

  const opening = (
    <header className={s.opening}>
      <div className={s.openingCopy}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>Workplace <em>Design</em><span>The physical environment</span></h1>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="ochre" className={s.openingMargin}>one place · several conditions</Margin>
        <ul className={s.facts} aria-label="About this record">{r.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      </div>
      <Plate
        className={s.heroPlate}
        src="/visual-language/theories/wp/wp-architectural-cutaway-v2.webp"
        width={1536}
        height={1024}
        priority
        alt="A coloured-pencil axonometric cutaway of a workplace showing open workstations, a partially enclosed quiet room, a meeting area, circulation, acoustic panels and windows."
        caption="An imagined architectural field for noticing physical conditions. It depicts no real office, measurements or findings."
      />
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Workplace Design">
      <Chapter id="two" density="active" className={s.band} labelledBy="h-two">
        <Head id="h-two" num="01" title={<>One name, <em>two different objects</em>.</>} lede={<Rich as="p" html={disambiguation.flag} />} />
        <TwoLiteratures disambiguation={disambiguation} />
      </Chapter>

      <Chapter id="idea" density="quiet" className={s.band} labelledBy="h-idea">
        <Head id="h-idea" num="02" title={<>The room is a <em>work condition</em>.</>} />
        <div className={s.idea}>
          <Rich as="p" className={s.ideaLede} html={r.ideaLede ?? ""} />
          <p className={s.ideaOrigin}>{r.originsNote}</p>
        </div>
      </Chapter>

      <Chapter id="elements" density="rich" className={s.band} labelledBy="h-elements">
        <Head id="h-elements" num="03" title={<>Read the room through its <em>conditions</em>.</>} lede={<p>{r.expansionsLede}</p>} />
        <RoomMixer elements={r.expansions ?? []} />
      </Chapter>

      <Chapter id="mechanism" density="active" className={s.band} labelledBy="h-mechanism">
        <Head id="h-mechanism" num="04" title={<>When the room makes work <em>cost more effort</em>.</>} lede={<><Rich as="p" html={r.pathwaysLede ?? ""} /><p>{pathway.blurb}</p></>} />
        <WorkspaceStress steps={pathway.steps} caption="Vischer proposes this account as a theoretical model and a guide for future empirical work. This pathway is not itself a measured effect." />
        <Rich as="p" className={s.modelCaution} html={r.pathwaysCaution ?? ""} />
      </Chapter>

      <Chapter id="tradeoff" density="rich" className={s.band} labelledBy="h-tradeoff">
        <Head id="h-tradeoff" num="05" title={<>The open plan’s <em>privacy–communication</em> trade-off.</>} lede={<p>{r.interactionsLede}</p>} />
        <Tradeoff demo={demo} interactions={r.interactions ?? []} />
      </Chapter>

      <Chapter id="trail" density="scholarly" className={s.band}>
        <CodaHead kicker="06 · The trail" title="Seven works, thirty-four years"><p>{r.trailLede}</p><p>{r.originsNote}</p></CodaHead>
        <Trail nodes={r.origins ?? []} />
      </Chapter>

      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="07 · Do not conclude" title="Conclusions the literature does not support"><Rich as="p" html={r.oversimplificationsLede ?? ""} /></CodaHead>
        <div className={s.limits}>
          <div><p className={s.smallHead}>Do not conclude</p><Cautions items={r.oversimplifications ?? []} /></div>
          <div><p className={s.smallHead}>Still open</p><OpenQuestions items={r.qualifications ?? []} /></div>
        </div>
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="08 · Sources" title={r.minimumReadingLabel ?? "If you read four things"} />
        <SourceShelf items={r.minimumReading ?? []} />
        {otherSources.length > 0 && <><p className={s.smallHead}>Also drawn on</p><SourceShelf items={otherSources} start={(r.minimumReading?.length ?? 0) + 1} /></>}
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · Provenance" title="Where every claim came from"><p>The workplace plate and the small access-and-exposure plan are generated teaching material (▲). The six conditions, proposed workspace-stress account, and privacy–communication interpretation remain live text. Neither drawing shows an observed office, quantity, or empirical result.</p></CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}

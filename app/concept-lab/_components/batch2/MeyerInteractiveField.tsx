"use client";

import Image from "next/image";
import { useState } from "react";
import type { MeyerRecordContent } from "@/content/types";
import { getArtAsset } from "@/app/concept-lab/_design/art-manifest";
import { AudioExample } from "../AudioExample";
import styles from "./batch2-record-heroes.module.css";

export function MeyerInteractiveField({ opening }: { opening: MeyerRecordContent["opening"] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const art = getArtAsset("meyer-open-phrase");
  const selectedChoice = selected === null ? null : opening.choices[selected];

  return (
    <div className={styles.meyerField}>
      <figure>
        <div className={styles.meyerImage}>
          <Image src={art.src} alt={art.baseDescription} width={art.dimensions.width} height={art.dimensions.height} priority unoptimized sizes="(max-width: 760px) 100vw, 64vw" />
          <svg className={styles.routeFocus} viewBox="0 0 1536 1024" preserveAspectRatio="none" aria-hidden="true">
            <path className={selected === 0 ? styles.routeSelected : undefined} d="M1406 119 C1416 90 1466 74 1497 99 C1525 122 1509 157 1483 168 C1450 182 1412 160 1406 135 C1404 128 1404 124 1406 119Z" />
            <path className={selected === 1 ? styles.routeSelected : undefined} d="M1408 348 C1414 324 1460 310 1493 331 C1524 350 1510 383 1481 393 C1450 405 1414 389 1408 369 C1406 360 1406 353 1408 348Z" />
            <path className={selected === 2 ? styles.routeSelected : undefined} d="M1404 686 C1410 656 1455 640 1486 661 C1514 680 1511 716 1482 729 C1449 742 1415 725 1405 703 C1402 697 1401 691 1404 686Z" />
          </svg>
        </div>
        <figcaption>
          <span>{selectedChoice ? `Highlighted possibility · ${selectedChoice.label}` : "three qualitative continuations"}</span>
          <span>one event held open</span>
          <span>later context, heard back</span>
        </figcaption>
      </figure>
      <p className={styles.routeStatus} aria-live="polite">{selectedChoice ? `Following ${selectedChoice.label.toLowerCase()}: ${selectedChoice.body}` : "Play any continuation to follow its route from the same held opening."}</p>
      <div className="music-opening-context">
        <AudioExample label="The unresolved setup" notes={opening.context} description="A short synthetic tonal context pauses before its continuation." />
      </div>
      <div className="music-audio-choice-grid">
        {opening.choices.map((choice, index) => (
          <AudioExample
            key={choice.label}
            label={`${String(index + 1).padStart(2, "0")} · ${choice.label}`}
            notes={[...opening.context, ...choice.notes]}
            description={choice.body}
            colour={index % 2 ? "var(--red)" : "var(--teal)"}
            onPlayIntent={() => setSelected(index)}
          />
        ))}
      </div>
    </div>
  );
}

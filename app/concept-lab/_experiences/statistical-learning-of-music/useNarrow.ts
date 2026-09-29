"use client";

import { useEffect, useState } from "react";

/**
 * True on a narrow screen. The server and the first client render always say
 * false, so nothing mismatches; the drawing then re-lays itself out once the
 * page knows how wide it is, and follows the window if it is resized.
 */
export function useNarrow(query = "(max-width: 899px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return narrow;
}

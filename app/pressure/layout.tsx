/* Isolated route. Fonts and stylesheet are scoped here so nothing in this
   exploration can reach the production site, and nothing on the production
   site reaches in. */

import type { ReactNode } from "react";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/caveat";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./pressure.css";

export default function PressureLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

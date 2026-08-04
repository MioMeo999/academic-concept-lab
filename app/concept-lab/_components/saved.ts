"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "acl:saved";
const EMPTY: string[] = [];

/* localStorage is an external store, so it is read through
   useSyncExternalStore rather than mirrored into state inside an effect.
   getServerSnapshot returns a stable empty array so the server render and the
   first client paint agree; the real value arrives on hydration. */

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedValue: string[] = EMPTY;

function readRaw() {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

/** Must return a cached reference when nothing changed, or React re-renders forever. */
function getSnapshot(): string[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed = JSON.parse(raw);
      cachedValue = Array.isArray(parsed) ? parsed : EMPTY;
    } catch {
      cachedValue = EMPTY;
    }
  }
  return cachedValue;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function emit() {
  for (const l of listeners) l();
}

export function toggleSaved(id: string) {
  const current = getSnapshot();
  const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode or storage full — the session still works, it just will not persist */
  }
  emit();
}

/** False during SSR and the first paint, true once hydrated — so the saved view
 *  can avoid claiming "nothing saved" before localStorage has been read. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function useSaved() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useHydrated();
  const toggle = useCallback((id: string) => toggleSaved(id), []);
  return { ids, ready, toggle, isSaved: (id: string) => ids.includes(id) };
}

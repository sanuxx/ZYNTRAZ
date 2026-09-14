import type Lenis from "lenis";

export const scroll: { lenis: Lenis | null } = { lenis: null };

export const READY_EVENT = "zyn:ready";

// Runs `cb` once the intro has finished (or immediately if it was skipped).
export function whenReady(cb: () => void) {
  if (document.documentElement.classList.contains("is-ready")) {
    cb();
    return () => {};
  }
  window.addEventListener(READY_EVENT, cb, { once: true });
  return () => window.removeEventListener(READY_EVENT, cb);
}

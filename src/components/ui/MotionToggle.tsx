"use client";

import { useSyncExternalStore } from "react";

const KEY = "zyn-motion";
const subscribe = () => () => {};
const getReduced = () => document.documentElement.classList.contains("rm");
const getServer = () => false;

// Visitor-facing motion switch. The choice is applied before first paint by the
// head script in layout.tsx, so a reload re-initialises every animation with it.
export default function MotionToggle() {
  const reduced = useSyncExternalStore(subscribe, getReduced, getServer);

  const toggle = () => {
    try {
      if (reduced) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, "reduced");
    } catch {}
    window.location.reload();
  };

  return (
    <button type="button" className="motion-toggle" role="switch" aria-checked={reduced} onClick={toggle}>
      <span className="motion-toggle-track" aria-hidden="true"><i /></span>
      Reduce motion
    </button>
  );
}

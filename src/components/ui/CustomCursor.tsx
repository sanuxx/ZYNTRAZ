"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const dx = gsap.quickTo(dot, "x", { duration: 0.05 });
    const dy = gsap.quickTo(dot, "y", { duration: 0.05 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      dot.style.opacity = ring.style.opacity = "1";
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const interactive = (e.target as Element | null)?.closest?.("a, button, summary, input, textarea, [role=tab]");
      ring.classList.toggle("is-hover", !!interactive);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

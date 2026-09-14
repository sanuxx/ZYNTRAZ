"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  ["Listen", "Reason", "Act", "Listen", "Reason", "Act", "Listen"],
  ["Automate", "Scale", "Grow", "Automate", "Scale", "Grow", "Automate"],
];

export default function HomeMarquee() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const st = { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo(".hmq-row-0", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: st });
      gsap.fromTo(".hmq-row-1", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: st });
      gsap.fromTo(".hmq-orb", { scale: 0.4, rotate: -90 }, { scale: 1.3, rotate: 90, ease: "none", scrollTrigger: st });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="hmq dark" aria-label="Listen, reason, act. Automate, scale, grow.">
      <div className="hmq-orb" aria-hidden="true" />
      {rows.map((words, r) => (
        <div key={r} className={`hmq-row hmq-row-${r}`} aria-hidden="true">
          {words.map((w, i) => (
            <span key={i} className={`hmq-word${(i + r) % 3 === 1 ? " grad-text" : i % 2 ? " outline" : ""}`}>{w}</span>
          ))}
        </div>
      ))}
      <p className="hmq-tag">One AI workforce. Every system. Around the clock.</p>
    </section>
  );
}

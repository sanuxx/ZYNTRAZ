"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { READY_EVENT, scroll } from "@/lib/scroll";

const TAGLINE = "Intelligence, engineered.";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current!;
    if (!html.classList.contains("intro-active")) {
      el.hidden = true;
      return;
    }

    scroll.lenis?.stop();
    const ready = () => {
      html.classList.add("is-ready");
      window.dispatchEvent(new Event(READY_EVENT));
    };

    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          html.classList.remove("intro-active");
          scroll.lenis?.start();
          el.hidden = true;
        },
      })
        .to(".intro-line", { scaleX: 1, duration: 0.9, ease: "expo.inOut" }, 0.2)
        .to(".intro-glow", { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }, 0.5)
        .to(".intro-logo-base", { clipPath: "inset(0% 0% 0% 0%)", filter: "blur(0px)", duration: 1.2 }, 0.85)
        .to(".intro-line", { scaleX: 1.8, opacity: 0, duration: 0.9, ease: "power2.out" }, 0.95)
        .to(".intro-logo", { scale: 1, duration: 2.2, ease: "power2.out" }, 0.85)
        .to(".intro-logo-sheen", { backgroundPosition: "-60% 0", duration: 1.1, ease: "power2.inOut" }, 1.45)
        .to(".intro-tag span", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.022, ease: "power3.out" }, 1.55)
        // Exit: fly through the logo and hand off to the page.
        .to(".intro-tag", { opacity: 0, y: -10, duration: 0.5, ease: "power2.in" }, 2.95)
        .to(".intro-logo", { scale: 1.35, opacity: 0, filter: "blur(16px)", duration: 0.9, ease: "power2.in" }, 3.0)
        .to(".intro-glow", { scale: 1.8, opacity: 0, duration: 1, ease: "power2.in" }, 3.0)
        .add(ready, 3.35)
        .to(el, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 3.35);
    }, el);

    return () => {
      ctx.revert();
      html.classList.remove("intro-active");
      scroll.lenis?.start();
    };
  }, []);

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div className="intro-glow" />
      <div className="intro-stage">
        <div className="intro-line" />
        <div className="intro-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="intro-logo-base" src="/zyntraz-logo-white.png" alt="" width={894} height={174} />
          <div className="intro-logo-sheen" />
        </div>
      </div>
      <p className="intro-tag">
        {TAGLINE.split("").map((ch, i) => <span key={i}>{ch === " " ? " " : ch}</span>)}
      </p>
    </div>
  );
}

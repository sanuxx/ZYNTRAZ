"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Bot, ChevronRight, LayoutDashboard, Layers, Workflow } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// [text, highlighted?]
const parts: [string, boolean][] = [
  ["Zyntraz is an AI engineering company. We build", false],
  ["AI agents,", true],
  ["custom business systems", true],
  ["and", false],
  ["ready-made platforms", true],
  ["that run your operations — so your team can stop fighting spreadsheets and focus on growth.", false],
];

const pillars = [
  { icon: Bot, label: "AI Agents", href: "/ai" },
  { icon: LayoutDashboard, label: "Custom Systems", href: "/services" },
  { icon: Workflow, label: "Automation", href: "/solutions" },
  { icon: Layers, label: "Platforms", href: "/products" },
];

export default function HomeStatement() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hs-w", { opacity: 0.12 }, {
        opacity: 1, stagger: 0.08, ease: "none",
        scrollTrigger: { trigger: ".hs-text", start: "top 78%", end: "bottom 40%", scrub: true },
      });
      gsap.from(".hs-pill", {
        y: 40, opacity: 0, scale: 0.9, duration: 1, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".hs-pills", start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = parts.flatMap(([t, hi], pi) => t.split(" ").map((w, wi) => ({ w, hi, key: `${pi}-${wi}` })));

  return (
    <section ref={ref} className="hs dark" aria-label="What Zyntraz does">
      <div className="container">
        <p className="eyebrow">What we do, in one sentence</p>
        <p className="hs-text">
          {words.map(({ w, hi, key }) => (
            <span key={key} className={`hs-w${hi ? " grad-text" : ""}`}>{w} </span>
          ))}
        </p>
        <div className="hs-pills">
          {pillars.map(({ icon: Icon, label, href }) => (
            <Link key={label} href={href} className="hs-pill">
              <Icon size={20} /> {label} <ChevronRight size={16} className="hs-chev" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

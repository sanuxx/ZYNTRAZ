"use client";

import { useEffect, useRef } from "react";
import { Hammer, MessagesSquare, PencilRuler, TrendingUp } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: MessagesSquare, title: "Free consultation", desc: "We map your operations and pinpoint where AI and automation will pay off first." },
  { icon: PencilRuler, title: "Design & prototype", desc: "You see a working prototype on your real workflows early — before committing to the full build." },
  { icon: Hammer, title: "Build & launch", desc: "Focused sprints with weekly demos, a secure launch and training for your team." },
  { icon: TrendingUp, title: "Support & evolve", desc: "Monitoring, improvements and new AI capabilities as your business grows." },
];

export default function HomeProcess() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const st = { trigger: ".hp-track", start: "top 75%", end: "bottom 55%", scrub: true };
      gsap.fromTo(".hp-line-fill", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
      gsap.fromTo(".hp-line-fill-v", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: st });
      gsap.utils.toArray<HTMLElement>(".hp-step").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0.25, y: 30 }, {
          opacity: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: ".hp-track", start: `top ${75 - i * 7}%`, end: `top ${60 - i * 7}%`, scrub: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section hp">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow" data-reveal>How we work with you</p>
          <h2 className="h-xl" data-reveal>From first call <span className="grad-text">to first win.</span></h2>
        </div>
        <div className="hp-track">
          <div className="hp-line" aria-hidden="true"><div className="hp-line-fill" /><div className="hp-line-fill-v" /></div>
          <ol className="hp-steps">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="hp-step">
                <span className="hp-node"><Icon size={22} /></span>
                <span className="hp-num">Step {i + 1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { Search, Layers, PenTool, Terminal, CheckCircle, Shield, Rocket, Activity } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: "Discovery & Strategy", desc: "Deep discovery into your operational problems, business goals and constraints — before writing a single line of code.", icon: Search },
  { title: "Architecture & Planning", desc: "Architecting database schemas, choosing optimal tech stacks, and mapping complex API integrations.", icon: Layers },
  { title: "UI/UX Engineering", desc: "High-fidelity prototypes focused on friction-less user experiences and strict accessibility standards.", icon: PenTool },
  { title: "Backend & Systems Dev", desc: "Focused sprints with weekly demos. Clean, modular code built on rigorous CI/CD principles — no black-box development.", icon: Terminal },
  { title: "Quality Assurance", desc: "Automated test suites, manual stress testing and edge-case resolution before anything reaches your team.", icon: CheckCircle },
  { title: "Security Auditing", desc: "Penetration testing, data encryption validation and compliance checks to keep your business data safe.", icon: Shield },
  { title: "Production Deployment", desc: "Zero-downtime containerized launch to live production servers via Docker and Kubernetes. We ship and support.", icon: Rocket },
  { title: "Continuous Evolution", desc: "Monitoring, optimization and feature expansion as your business grows. A long-term partnership, not a hand-off.", icon: Activity },
];

export default function Workflow() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const track = ref.current!.querySelector<HTMLElement>(".process-track")!;
        const dist = () => track.scrollWidth - window.innerWidth;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".process-pin", start: "top top", end: () => `+=${dist()}`,
            pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
          },
        });
        tl.to(track, { x: () => -dist(), ease: "none" }, 0)
          .to(".process-bar > div", { scaleX: 1, ease: "none" }, 0);
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="process" id="process">
      <div className="process-pin">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 48 }}>
            <span className="eyebrow" data-reveal>How we work</span>
            <h2 className="h-lg" data-reveal style={{ ["--d" as string]: ".1s" }}>From chaos to system in <span className="grad-text">8 precise phases.</span></h2>
            <p className="lede" data-reveal style={{ ["--d" as string]: ".2s" }}>
              A precision approach from deep discovery to autonomous scaling — with real progress every week and no surprises.
            </p>
          </div>
        </div>
        <div className="process-track">
          {steps.map(({ title, desc, icon: Icon }, i) => (
            <article key={title} className="glass spot phase">
              <div className="phase-top">
                <span className="phase-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="phase-ico"><Icon size={22} /></span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="phase-tag">Phase {String(i + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
        <div className="process-bar" aria-hidden="true"><div /></div>
      </div>
    </section>
  );
}

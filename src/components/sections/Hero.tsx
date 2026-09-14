"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, BellRing, Bot, CheckCircle2, PackageCheck } from "lucide-react";
import gsap from "gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const ParticleCanvas = dynamic(() => import("@/components/ui/ParticleCanvas"), { ssr: false });

const words = ["restaurants", "hotels", "retailers", "clinics", "businesses"];

const toasts = [
  { pos: { left: "4%", top: "13%" }, icon: CheckCircle2, cls: "", title: "Invoice sent automatically", sub: "Order #1042 · 0 clicks", depth: 30, delay: "0s" },
  { pos: { right: "4%", top: "15%" }, icon: PackageCheck, cls: "blue", title: "Low stock → reorder placed", sub: "Inventory · just now", depth: -40, delay: "1.2s" },
  { pos: { left: "8%", bottom: "26%" }, icon: BellRing, cls: "cyan", title: "New lead → follow-up booked", sub: "CRM · automated", depth: -25, delay: "2.1s" },
  { pos: { right: "7%", bottom: "30%" }, icon: Bot, cls: "", title: "AI agent resolved a customer request", sub: "Support · 24/7 · 2 min", depth: 45, delay: "0.6s" },
];

const marquee = ["Agentic AI", "AI Agents", "LLM Assistants", "Custom Software", "Workflow Automation", "AI Integration", "IoT Engineering", "Data & Analytics", "Cloud Platforms", "CRM Systems", "POS & Inventory"];

function Rotator() {
  const [i, setI] = useState(words.length - 1);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="hero-rotator" aria-live="off">
      {words.map((w, idx) => {
        const prev = (i - 1 + words.length) % words.length;
        const state = idx === i ? "in" : idx === prev ? "out" : "wait";
        return <span key={w} className="grad-text" data-state={state} aria-hidden={idx !== i}>{w}</span>;
      })}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current!;
    const ctx = gsap.context(() => {
      const play = () => {
        gsap.timeline()
          .to(".hero-title .line > span", { y: 0, duration: 1.4, stagger: 0.12, ease: "expo.out" })
          .to(".hero-fade", { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: "power3.out" }, "-=1")
          .from(".hero-float", { opacity: 0, scale: 0.85, duration: 1.2, stagger: 0.12, ease: "power3.out" }, "-=0.9");
      };
      if (document.documentElement.classList.contains("is-ready")) play();
      else window.addEventListener("zyn:ready", play, { once: true });

      gsap.to(".hero-content", {
        yPercent: 18, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    const floats = gsap.utils.toArray<HTMLElement>(".hero-float", root);
    const setters = floats.map((el) => ({
      x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
      depth: Number(el.dataset.depth),
    }));
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      setters.forEach((s) => { s.x(nx * s.depth); s.y(ny * s.depth); });
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => { ctx.revert(); window.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <section ref={ref} className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-beam" />
        <div className="hero-eclipse" />
        <div className="hero-grid" />
        <ParticleCanvas />
        <div className="hero-vignette" />
      </div>

      {toasts.map(({ pos, icon: Icon, cls, title, sub, depth, delay }) => (
        <div key={title} className="hero-float" style={pos} data-depth={depth} aria-hidden="true">
          <div className="toast" style={{ ["--bd" as string]: delay }}>
            <span className={`toast-ico ${cls}`}><Icon size={16} /></span>
            <div>{title}<small>{sub}</small></div>
          </div>
        </div>
      ))}

      <div className="hero-content">
        <div className="hero-pill hero-fade">
          <span className="dot" /> AI agents · Automation · Custom systems
        </div>

        <h1 className="hero-title">
          <span className="line"><span>We rebuild how</span></span>
          <span className="line"><span><Rotator /></span></span>
          <span className="line"><span>operate.</span></span>
        </h1>

        <p className="lede hero-sub hero-fade">
          Zyntraz engineers custom business operating systems and agentic AI — intelligent workflows and AI agents that
          do real work across your business — so your team stops fighting spreadsheets and starts growing.
        </p>

        <div className="hero-ctas hero-fade">
          <MagneticButton>
            <a href="#contact" className="btn btn-primary btn-lg">Book a free consultation <ArrowRight size={17} /></a>
          </MagneticButton>
          <a href="#ai" className="btn btn-ghost btn-lg"><Bot size={17} /> See AI agents in action</a>
        </div>

        <div className="hero-trust hero-fade">
          <span><b>10+</b>systems engineered</span>
          <span><b>15+</b>clients served</span>
          <span><b>99.9%</b>reliability</span>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true"><i />Scroll</div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((m, i) => <span key={i} className="marquee-item">{m}</span>)}
        </div>
      </div>
    </section>
  );
}

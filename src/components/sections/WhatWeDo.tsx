"use client";

import { useEffect, useRef } from "react";
import { Code2, Workflow, BrainCircuit, Cpu, BarChart3 } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Code2, name: "Custom Software", desc: "Enterprise-grade systems built from the ground up." },
  { icon: Workflow, name: "Workflow Automation", desc: "Eliminate manual work with intelligent process flows." },
  { icon: BrainCircuit, name: "AI Integration", desc: "Embed machine intelligence into your core operations." },
  { icon: Cpu, name: "IoT Engineering", desc: "Connect your physical operations to powerful dashboards." },
  { icon: BarChart3, name: "Data & Analytics", desc: "Turn operational data into strategic insight." },
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-light", sectionRef.current!).forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ background: "#f5f5f7", padding: "120px 24px" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Part A — centered statement */}
        <div style={{ textAlign: "center", marginBottom: 96 }}>
          <p className="reveal-light" style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: "#6e6e73",
            textTransform: "uppercase",
            marginBottom: 24,
          }}>
            WHAT WE DO
          </p>
          <h2 className="reveal-light" style={{
            fontFamily: "var(--font-sora)",
            fontSize: "clamp(44px, 6vw, 80px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "#1d1d1f",
            marginBottom: 20,
          }}>
            Built for<br />your business.
          </h2>
          <p className="reveal-light" style={{
            fontSize: 19,
            color: "#6e6e73",
            fontWeight: 300,
            lineHeight: 1.65,
            maxWidth: 480,
            margin: "0 auto",
          }}>
            Custom systems engineered around your operations, workflows, and growth.
          </p>
        </div>

        {/* Part B — 5 service items */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 32 }} id="what-grid">
          {services.map(({ icon: Icon, name, desc }) => (
            <div key={name} className="reveal-light" style={{
              borderTop: "2px solid rgba(0,0,0,0.08)",
              paddingTop: 28,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              <div style={{
                width: 36,
                height: 36,
                background: "rgba(0,0,0,0.05)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Icon size={18} color="#1d1d1f" />
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.01em" }}>{name}</p>
              <p style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) { #what-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { #what-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

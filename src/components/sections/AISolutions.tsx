"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const capabilities = [
  { title: "Predictive Analytics", desc: "ML models trained on your data to forecast demand, churn, and business outcomes." },
  { title: "Intelligent Automation", desc: "Multi-step agentic workflows handling complex business logic end-to-end." },
  { title: "LLM-Powered Assistants", desc: "Custom AI assistants trained on your knowledge base, embedded in your products." },
  { title: "Computer Vision", desc: "Automated image analysis, quality inspection, and visual data extraction at scale." },
  { title: "Compliance AI", desc: "Automated document review, risk flagging, and regulatory compliance monitoring." },
  { title: "Generative Pipelines", desc: "Content generation, summarization, and data transformation for enterprise." },
];

export default function AISolutions() {
  return (
    <section
      id="ai-solutions"
      className="mesh-section"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(160deg, #080318 0%, #0c0828 50%, #060d25 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
            width: 800, height: 600, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(139,92,246,0.35) 0%, rgba(79,110,247,0.2) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div style={{
          position: "absolute", bottom: "-15%", right: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        {/* Light beam effect like image 4 */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 2, height: "60%",
          background: "linear-gradient(180deg, rgba(139,92,246,0.6) 0%, transparent 100%)",
          filter: "blur(20px)",
        }} />
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 64 }} className="ai-header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, background: "linear-gradient(135deg, #a855f7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              AI Solutions
            </p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#fff" }}>
              Intelligence into
              <br />every layer.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 24 }}>
              We architect intelligent capabilities directly into your core business workflows — making your entire operation smarter, faster, and more competitive.
            </p>
            <Link
              href="#contact"
              className="btn-primary"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                textDecoration: "none",
                padding: "11px 24px",
                borderRadius: 999,
                display: "inline-block",
              }}
            >
              Explore AI services
            </Link>
          </motion.div>
        </div>

        {/* Capability grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, borderRadius: 20, overflow: "hidden", background: "rgba(255,255,255,0.05)" }} className="ai-grid">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-dark"
              style={{
                padding: 28,
                borderRadius: 0,
                border: "none",
                borderRight: i % 3 < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
            >
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: `hsl(${220 + i * 25}, 80%, 65%)`,
                marginBottom: 16,
                boxShadow: `0 0 12px hsl(${220 + i * 25}, 80%, 65%)`,
              }} />
              <h4 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 8, letterSpacing: "-0.01em" }}>
                {cap.title}
              </h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .ai-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ai-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) { .ai-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

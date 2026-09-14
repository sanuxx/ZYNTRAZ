"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Projects delivered", color: "#4f6ef7" },
  { value: "98%", label: "Client satisfaction", color: "#a855f7" },
  { value: "12+", label: "Industries served", color: "#06b6d4" },
  { value: "5×", label: "Average ROI", color: "#ec4899" },
];

const points = [
  "Production-ready code, not prototypes",
  "TypeScript + modern stack by default",
  "Weekly progress demos",
  "Full source code ownership",
  "Post-launch support included",
  "NDA available on request",
  "Senior engineers only — no outsourcing",
  "Enterprise-first architecture by default",
];

export default function WhyZyntraz() {
  return (
    <section
      id="why-zyntraz"
      className="mesh-section"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #eef0ff 0%, #f8f9ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", left: "20%", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(79,110,247,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ marginBottom: 56, textAlign: "center" }}
        >
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, background: "linear-gradient(135deg, #4f6ef7, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Why Zyntraz
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0a0a14" }}>
            The standard others can&apos;t match.
          </h2>
        </motion.div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }} className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card"
              style={{ borderRadius: 20, padding: 28, textAlign: "center" }}
            >
              <div style={{
                fontSize: 44, fontWeight: 700, letterSpacing: "-0.04em",
                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}88)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                marginBottom: 4,
              }}>
                {stat.value}
              </div>
              <p style={{ fontSize: 12, color: "#6b7280", margin: 0, fontWeight: 500 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Checklist glass card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card"
          style={{
            borderRadius: 24, padding: 32,
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
          }}
        >
          {points.map((point) => (
            <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #4f6ef7, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: 1,
                boxShadow: "0 2px 8px rgba(79,110,247,0.3)",
              }}>
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>
              </div>
              <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{point}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .glass-card[style*="repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .glass-card[style*="repeat(4"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Discovery & Scoping", description: "Deep discovery into your operational problems, business goals, and constraints — before writing a single line of code." },
  { number: "02", title: "Architecture & Design", description: "System architecture and UX designed in parallel — technical decisions and user experience aligned from day one." },
  { number: "03", title: "Agile Engineering", description: "Focused sprints with weekly demos. Real progress, continuously — no black-box development, no surprises." },
  { number: "04", title: "Launch & Deployment", description: "Production deployment with CI/CD pipelines, monitoring, and security hardening. We ship and support." },
  { number: "05", title: "Scale & Evolve", description: "Post-launch optimization, feature expansion, and scaling as your business grows. Long-term partnership." },
];

export default function Process() {
  return (
    <section
      id="process"
      className="mesh-section"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(160deg, #06021a 0%, #0c0828 60%, #060d25 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,110,247,0.18) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, background: "linear-gradient(135deg, #4f6ef7, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            How we work
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#fff" }}>
            A process built for certainty.
          </h2>
        </motion.div>

        {/* Steps */}
        <div style={{ position: "relative" }}>
          {/* Vertical connector */}
          <div style={{
            position: "absolute", left: 19, top: 20, bottom: 20, width: 2,
            background: "linear-gradient(180deg, #4f6ef7 0%, #a855f7 50%, rgba(168,85,247,0) 100%)",
            borderRadius: 2,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                style={{ display: "flex", gap: 24, paddingBottom: i < steps.length - 1 ? 40 : 0 }}
              >
                {/* Node */}
                <div style={{ flexShrink: 0, width: 40, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 2 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "linear-gradient(135deg, #4f6ef7, #7c3aed)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "#fff",
                    boxShadow: "0 0 20px rgba(79,110,247,0.4)",
                    flexShrink: 0,
                  }}>
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="glass-dark"
                  style={{ flex: 1, padding: 24, borderRadius: 16, marginBottom: 0 }}
                >
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", marginBottom: 8 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0 }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

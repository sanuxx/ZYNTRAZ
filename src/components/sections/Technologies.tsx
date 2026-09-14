"use client";

import { motion } from "framer-motion";

const techCategories = [
  { label: "Frontend", color: "#4f6ef7", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend", color: "#a855f7", items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis"] },
  { label: "AI & ML", color: "#06b6d4", items: ["OpenAI", "LangChain", "Hugging Face", "PyTorch", "Pinecone"] },
  { label: "Infrastructure", color: "#10b981", items: ["Vercel", "AWS", "Docker", "Kubernetes", "GitHub Actions"] },
  { label: "Auth & Payments", color: "#ec4899", items: ["Clerk", "Auth.js", "Stripe", "Paddle", "Supabase"] },
  { label: "Data & Analytics", color: "#f59e0b", items: ["Prisma", "Drizzle", "Recharts", "Grafana", "ClickHouse"] },
];

export default function Technologies() {
  return (
    <section
      id="technologies"
      className="mesh-section"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(160deg, #07021c 0%, #0c0828 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "30%", width: 600, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(79,110,247,0.2) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ marginBottom: 56 }}
        >
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, background: "linear-gradient(135deg, #4f6ef7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Our stack
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#fff" }}>
            Built with the best tools.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="tech-grid">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-dark"
              style={{ borderRadius: 20, padding: 24, transition: "background 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
            >
              <p style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                marginBottom: 16, color: cat.color,
              }}>
                {cat.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: 12, color: "rgba(255,255,255,0.7)",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8, padding: "4px 10px", fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) { .tech-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .tech-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

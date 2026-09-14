"use client";

const testimonials = [
  { quote: "ZynRest transformed our restaurant operations completely. Order accuracy went from 87% to 99.6%.", name: "Marcus Chen", role: "CEO, Coastal Kitchen Group" },
  { quote: "The ZynStay platform paid for itself within the first month. Our RevPAR increased 34% since deployment.", name: "Priya Nair", role: "General Manager, Azure Resorts" },
  { quote: "Their AI integration gave us a real competitive edge. Zyntraz delivered what three other vendors couldn't.", name: "Daniel Osei", role: "CTO, LogiFlow Enterprises" },
  { quote: "Professional, fast delivery, and the code quality is truly enterprise-grade. Exceptional team.", name: "Sofia Vasquez", role: "Founder, DataBridge Solutions" },
  { quote: "ZynDesk now handles 10× our previous ticket volume. Support quality has never been higher.", name: "James Whitfield", role: "Head of Support, TechForge Ltd" },
  { quote: "Working with Zyntraz felt like having a world-class in-house tech team. They over-delivered.", name: "Amara Diallo", role: "Director of Digital, NovaMed Health" },
];

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div
      className="glass-card"
      style={{
        borderRadius: 20,
        padding: "24px 28px",
        minWidth: 320,
        maxWidth: 360,
        flexShrink: 0,
      }}
    >
      <div style={{ fontSize: 12, color: "var(--accent-color)", marginBottom: 12 }}>★★★★★</div>
      <p
        style={{
          fontSize: 14,
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          marginBottom: 16,
          fontStyle: "italic",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{name}</div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{role}</div>
      </div>
    </div>
  );
}

function MarqueeRow({ reverse }: { reverse?: boolean }) {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          gap: 20,
          animation: `marquee-t ${reverse ? "25s" : "30s"} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          width: "max-content",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      style={{
        padding: "80px 0",
        borderTop: "1px solid var(--border-color)",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          marginBottom: 48,
          color: "var(--text-primary)",
          textAlign: "center",
        }}
      >
        What clients say.
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
      <style>{`
        @keyframes marquee-t {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

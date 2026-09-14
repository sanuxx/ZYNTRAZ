"use client";

const companies = [
  "ACME CORP", "STELLAR INC", "VERIDIA", "NEXUSFLOW", "BRIGHTLABS",
  "ORBITA GROUP", "MANTRA TECH", "CLOUDPEAK", "INNOFORGE", "DATASYNC",
];

export default function LogoMarquee() {
  const doubled = [...companies, ...companies];

  return (
    <section
      style={{
        paddingTop: 48,
        paddingBottom: 48,
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          color: "var(--text-secondary)",
          marginBottom: 24,
        }}
      >
        Trusted by Forward-Thinking Companies
      </p>
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: 48,
            animation: "marquee 25s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map((name, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 48 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </span>
              <span style={{ color: "var(--accent-color)", fontSize: 13 }}>·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

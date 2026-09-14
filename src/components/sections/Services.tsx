import { Code2, Cloud, BrainCircuit, Cpu, Workflow, BarChart3 } from "lucide-react";

const services = [
  {
    icon: BrainCircuit, title: "AI & Agentic AI", wide: true,
    desc: "AI agents that reason, plan and act across your systems, plus machine learning and predictive models that turn complex data into actionable logic. From strategy to production.",
    tags: ["AI agents", "LLM assistants", "RAG on your data", "Predictive analytics", "Computer vision", "Compliance AI"],
    solves: "Guesswork, slow responses and AI that never leaves the demo",
  },
  {
    icon: Cloud, title: "Web & Cloud Development",
    desc: "High-performance web platforms deployed on scalable cloud infrastructure ensuring absolute uptime.",
    solves: "Slow, fragile systems",
  },
  {
    icon: Cpu, title: "IoT Engineering",
    desc: "Connecting physical devices to powerful dashboards for real-time monitoring and hardware control.",
    solves: "No visibility on the ground",
  },
  {
    icon: Workflow, title: "Business Automation", wide: true,
    desc: "Eliminating manual tasks and human error through intelligent, multi-step digital workflows — agentic automation that handles complex business logic end-to-end.",
    tags: ["Invoicing", "Approvals", "Reorders", "Reminders", "Reports"],
    solves: "Hours lost to repetitive work",
  },
  {
    icon: Code2, title: "Software Engineering", wide: true,
    desc: "Custom enterprise software development focusing on robust, scalable microservices architectures — enterprise-grade systems built from the ground up.",
    solves: "Software that doesn't fit your business",
  },
  {
    icon: BarChart3, title: "Data Analytics",
    desc: "Custom reporting dashboards that aggregate massive enterprise data into strategic insights.",
    solves: "Flying blind until month-end",
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow" data-reveal>Capabilities &amp; services</span>
          <h2 className="h-lg" data-reveal style={{ ["--d" as string]: ".1s" }}>
            Everything your operations need.<br /><span style={{ color: "var(--dim)" }}>Engineered in one place.</span>
          </h2>
          <p className="lede" data-reveal style={{ ["--d" as string]: ".2s" }}>
            Comprehensive engineering solutions designed to automate, scale, and secure your digital infrastructure.
          </p>
        </div>

        <div className="bento">
          {services.map(({ icon: Icon, title, desc, wide, tags, solves }, i) => (
            <article key={title} className={`glass spot svc${wide ? " wide" : ""}`} data-reveal style={{ ["--d" as string]: `${(i % 3) * 0.08}s` }}>
              {wide && <div className="svc-glow" aria-hidden="true" />}
              <span className="svc-ico"><Icon size={24} /></span>
              <h3>{title}</h3>
              <p>{desc}</p>
              {tags && <div className="svc-tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>}
              <div className="svc-solves"><b>Solves →</b> {solves}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  BarChart3, BookOpen, Bot, BrainCircuit, CalendarCheck, Check, FileSearch, FlaskConical, Lock, Mail,
  MessageCircle, Package, Receipt, Rocket, ScrollText, Search, ShieldCheck, Target, UserCheck, Users, X,
} from "lucide-react";

type ToolId = "whatsapp" | "email" | "crm" | "inventory" | "accounts" | "docs" | "calendar" | "reports";

const tools: { id: ToolId; label: string; icon: typeof Bot }[] = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "crm", label: "CRM", icon: Users },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "accounts", label: "Accounts", icon: Receipt },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "calendar", label: "Calendar", icon: CalendarCheck },
  { id: "docs", label: "Knowledge", icon: BookOpen },
  { id: "email", label: "Email", icon: Mail },
];

const nodePos = tools.map((_, i) => {
  const a = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 };
});

export function AgentNetwork({ active, thinking = true }: { active?: ToolId; thinking?: boolean }) {
  return (
    <div className="agent-net" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" className="net-orbit" />
        <circle cx="50" cy="50" r="27" className="net-orbit inner" />
        {nodePos.map((p, i) => (
          <line key={tools[i].id} x1="50" y1="50" x2={p.x} y2={p.y} className={`net-line${tools[i].id === active ? " on" : ""}`} />
        ))}
      </svg>
      <div className={`agent-core${thinking ? " is-thinking" : ""}`}>
        <Bot size={34} />
        <span>AI Agent</span>
      </div>
      {tools.map(({ id, label, icon: Icon }, i) => (
        <div key={id} className={`net-node${id === active ? " on" : ""}`} style={{ left: `${nodePos[i].x}%`, top: `${nodePos[i].y}%` }}>
          <Icon size={16} /><span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function AgentNetworkAuto() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 3) % tools.length), 1400);
    return () => clearInterval(id);
  }, []);
  return <AgentNetwork active={tools[i].id} />;
}

type Step = { kind: "think" | "tool" | "human" | "done"; text: string; tool?: ToolId };

const scenarios: { id: string; label: string; channel: ToolId; trigger: string; steps: Step[] }[] = [
  {
    id: "sales", label: "Sales agent", channel: "whatsapp",
    trigger: "“Hi, do you have space for a 40-person team dinner on the 12th?”",
    steps: [
      { kind: "think", text: "Understands the request: group booking · 40 guests · 12th" },
      { kind: "tool", text: "Checks availability for the 12th", tool: "calendar" },
      { kind: "tool", text: "Looks up the customer — returning corporate client", tool: "crm" },
      { kind: "tool", text: "Builds a group menu quote from pricing rules", tool: "accounts" },
      { kind: "human", text: "Sends the quote to the manager for approval — approved" },
      { kind: "done", text: "Quote sent on WhatsApp · follow-up scheduled in 48h", tool: "whatsapp" },
    ],
  },
  {
    id: "support", label: "Support agent", channel: "email",
    trigger: "“My order #1042 arrived damaged. What can you do?”",
    steps: [
      { kind: "think", text: "Classifies: damaged delivery · priority high" },
      { kind: "tool", text: "Finds order #1042 and delivery details", tool: "crm" },
      { kind: "tool", text: "Checks the replacement policy", tool: "docs" },
      { kind: "tool", text: "Reserves a replacement item from stock", tool: "inventory" },
      { kind: "human", text: "Replacement over limit? No — auto-approved by policy" },
      { kind: "done", text: "Customer replied with tracking · case logged for review", tool: "email" },
    ],
  },
  {
    id: "ops", label: "Operations agent", channel: "reports",
    trigger: "⏰ Scheduled run · every day at 6:00 AM",
    steps: [
      { kind: "tool", text: "Reads yesterday's sales and stock levels", tool: "reports" },
      { kind: "think", text: "Forecasts weekend demand from past trends" },
      { kind: "tool", text: "Finds 3 items below reorder level", tool: "inventory" },
      { kind: "tool", text: "Drafts purchase orders for each supplier", tool: "accounts" },
      { kind: "human", text: "Owner approves on WhatsApp with one tap" },
      { kind: "done", text: "POs emailed to suppliers · morning summary delivered", tool: "email" },
    ],
  },
];

const kindIcon = { think: BrainCircuit, tool: FileSearch, human: UserCheck, done: Check };

export function AgentDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [si, setSi] = useState(0);
  const [n, setN] = useState(0);
  const sc = scenarios[si];

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const finished = n >= sc.steps.length;
    const t = setTimeout(() => {
      if (!finished) setN(n + 1);
      else { setSi((si + 1) % scenarios.length); setN(0); }
    }, finished ? 3400 : n === 0 ? 900 : 1350);
    return () => clearTimeout(t);
  }, [inView, si, n, sc.steps.length]);

  const current = n > 0 ? sc.steps[n - 1] : undefined;
  const running = n < sc.steps.length;

  return (
    <div ref={ref} className="ai-stage">
      <AgentNetwork active={current?.tool ?? sc.channel} thinking={running} />
      <div className="agent-console">
        <div className="ac-head">
          <div className="ac-dots"><i /><i /><i /></div>
          <span>Example agent run</span>
          <span className={`ac-live${running ? "" : " done"}`}>{running ? "Running" : "Completed"}</span>
        </div>
        <div className="ac-tabs" role="tablist" aria-label="Agent examples">
          {scenarios.map((s, i) => (
            <button key={s.id} role="tab" aria-selected={i === si} className="ac-tab" onClick={() => { setSi(i); setN(0); }}>{s.label}</button>
          ))}
        </div>
        <div className="ac-body" key={sc.id}>
          <div className="ac-trigger">
            <small>Trigger · {tools.find((t) => t.id === sc.channel)!.label}</small>
            {sc.trigger}
          </div>
          <ol className="ac-steps">
            {sc.steps.slice(0, n).map((s, i) => {
              const Icon = kindIcon[s.kind];
              return (
                <li key={i} className={`astep ${s.kind}`}>
                  <span className="astep-ico"><Icon size={14} /></span>
                  <span className="astep-text">{s.text}</span>
                  {s.tool && <span className="astep-tag">{tools.find((t) => t.id === s.tool)!.label}</span>}
                </li>
              );
            })}
            {running && <li className="astep thinking"><span className="dots"><i /><i /><i /></span> Agent is working…</li>}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function ChatbotVsAgent() {
  return (
    <div className="ai-vs">
      <div className="card ai-vs-card" data-reveal>
        <h3>A typical chatbot</h3>
        <ul>
          <li><X size={16} /> Answers questions from a script</li>
          <li><X size={16} /> Doesn&apos;t know your business or your data</li>
          <li><X size={16} /> Hands the actual work back to your staff</li>
        </ul>
      </div>
      <div className="card ai-vs-card is-agent" data-reveal style={{ ["--d" as string]: ".1s" }}>
        <h3>A Zyntraz AI agent</h3>
        <ul>
          <li><Check size={16} /> Understands goals and plans the steps</li>
          <li><Check size={16} /> Uses your CRM, inventory, accounts, email and WhatsApp</li>
          <li><Check size={16} /> Finishes the job — and asks for approval when it matters</li>
        </ul>
      </div>
    </div>
  );
}

const trust = [
  { icon: UserCheck, title: "Human-in-the-loop", desc: "Agents ask for approval before high-stakes actions. You set the rules." },
  { icon: Lock, title: "Access control built in", desc: "Agents only see and touch the systems and data you allow." },
  { icon: ScrollText, title: "Full audit trail", desc: "Every decision and action is logged, explainable and reviewable." },
  { icon: Target, title: "Measured by outcomes", desc: "We track hours saved, response times and revenue impact — not hype." },
];

export function AITrust() {
  return (
    <div className="ai-trust">
      {trust.map(({ icon: Icon, title, desc }, i) => (
        <div key={title} data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
          <Icon size={26} />
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
      ))}
    </div>
  );
}

const deploy = [
  { icon: Search, title: "Find the use cases", desc: "We map your workflows and pinpoint where AI saves the most time and money first." },
  { icon: FlaskConical, title: "Prototype fast", desc: "A working agent on your real data, so you see value before you commit to scale." },
  { icon: ShieldCheck, title: "Deploy with guardrails", desc: "Approvals, access control and audit logs configured for how your business runs." },
  { icon: Rocket, title: "Measure & expand", desc: "Track the results, tune the agent, and roll AI out to the next team." },
];

export function AIDeploy() {
  return (
    <ol className="deploy">
      {deploy.map(({ icon: Icon, title, desc }, i) => (
        <li key={title} data-reveal style={{ ["--d" as string]: `${i * 0.1}s` }}>
          <span className="deploy-num">{String(i + 1).padStart(2, "0")}</span>
          <Icon size={24} className="deploy-ico" />
          <h3>{title}</h3>
          <p>{desc}</p>
        </li>
      ))}
    </ol>
  );
}

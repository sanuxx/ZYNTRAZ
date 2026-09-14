import Link from "next/link";
import { AlertCircle, CheckCircle2, ChevronRight, Coffee, LayoutGrid, Pizza } from "lucide-react";

function MockupHeader({ url }: { url: string }) {
  return (
    <div className="mockup-header">
      <div className="mockup-dot" /><div className="mockup-dot" /><div className="mockup-dot" />
      <span className="mockup-url">{url}</span>
    </div>
  );
}

export function ZynRestMockup() {
  return (
    <div className="mockup-window" style={{ height: 380 }}>
      <MockupHeader url="zynrest.app / POS Terminal 1" />
      <div className="mockup-body">
        <div className="pos-sidebar">
          <div className="active"><LayoutGrid size={14} /></div>
          <div><Coffee size={14} /></div>
          <div><Pizza size={14} /></div>
        </div>
        <div className="pos-main">
          {[["Wagyu 8oz", "$45.00"], ["Truffle Fries", "$12.00"], ["Caesar Salad", "$14.00"], ["Craft Cola", "$5.00"], ["Espresso", "$4.00"], ["Sourdough", "$8.00"]].map(([n, p]) => (
            <div key={n} className="pos-item"><span>{n}</span><span className="pos-item-price">{p}</span></div>
          ))}
        </div>
        <div className="pos-receipt">
          <div style={{ fontWeight: 700, marginBottom: 12, borderBottom: "1px solid var(--line)", paddingBottom: 8, display: "flex", justifyContent: "space-between" }}>
            Table 04 <span style={{ color: "var(--dim)" }}>#1042</span>
          </div>
          {[["Wagyu Steak", "$45.00"], ["Truffle Fries", "$12.00"], ["Craft Cola", "$5.00"]].map(([n, p]) => (
            <div key={n} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 10 }}><span>{n}</span><span>{p}</span></div>
          ))}
          <div style={{ marginTop: "auto", borderTop: "1px solid var(--line)", paddingTop: 8, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 13 }}>
            <span>Total</span><span style={{ color: "var(--cyan)" }}>$62.00</span>
          </div>
          <div style={{ background: "var(--brand)", color: "#fff", padding: "8px 0", borderRadius: 8, fontWeight: 700, textAlign: "center", marginTop: 10 }}>Charge</div>
        </div>
      </div>
    </div>
  );
}

export function ZynStayMockup() {
  return (
    <div className="mockup-window" style={{ height: 380 }}>
      <MockupHeader url="zynstay.app / Dashboard" />
      <div className="mockup-body" style={{ flexDirection: "column" }}>
        <div className="stay-metrics">
          {[["Occupancy", "88.5%", "var(--cyan)"], ["RevPAR", "$142", "var(--text)"], ["Check-ins", "12 Pend", "var(--text)"]].map(([l, v, c]) => (
            <div key={l} className="stay-metric-card">
              <span style={{ color: "var(--dim)", fontSize: 10 }}>{l}</span>
              <div style={{ fontSize: 18, fontWeight: 700, color: c, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="stay-grid">
          <div className="stay-rooms">
            {["Rm 101", "Rm 102", "Rm 103", "Rm 104"].map((r) => <div key={r} style={{ height: 28, display: "flex", alignItems: "center" }}>{r}</div>)}
          </div>
          <div className="stay-timeline">
            <div className="stay-booking" style={{ top: 0, left: "10%", width: "40%", background: "rgba(95,227,255,.15)", border: "1px solid var(--cyan)", color: "var(--cyan)" }}>Smith, J.</div>
            <div className="stay-booking" style={{ top: 36, left: "30%", width: "60%", background: "rgba(62,230,168,.15)", border: "1px solid var(--ok)", color: "var(--ok)" }}>Corp Event Block</div>
            <div className="stay-booking" style={{ top: 72, left: "0%", width: "22%", background: "rgba(255,170,80,.15)", border: "1px solid #ffaa50", color: "#ffaa50" }}>Maint.</div>
            <div className="stay-booking" style={{ top: 108, left: "48%", width: "35%", background: "rgba(91,140,255,.18)", border: "1px solid var(--electric)", color: "var(--electric)" }}>Perera, A.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ZynDeskMockup() {
  return (
    <div className="mockup-window" style={{ height: 380 }}>
      <MockupHeader url="zyndesk.app / Inbox" />
      <div className="mockup-body">
        <div className="desk-list" style={{ width: 150 }}>
          <div className="desk-ticket active"><span className="desk-tag critical">CRITICAL</span><b style={{ fontSize: 10 }}>Gateway Error</b></div>
          <div className="desk-ticket"><span className="desk-tag open">OPEN</span><b style={{ fontSize: 10 }}>Password Reset</b></div>
          <div className="desk-ticket"><span className="desk-tag open">OPEN</span><b style={{ fontSize: 10 }}>Refund request</b></div>
        </div>
        <div className="desk-chat">
          <div className="chat-bubble chat-ai">AI triage: Payments · Priority high · SLA 1h</div>
          <div className="chat-bubble chat-left">User: &quot;Checkout is failing.&quot;</div>
          <div className="chat-bubble chat-right">Agent: &quot;Looking into this now.&quot;</div>
          <div className="chat-bubble chat-left">User: &quot;Thanks — that was fast!&quot;</div>
        </div>
      </div>
    </div>
  );
}

export function ZynCRMMockup() {
  const cols: [string, [string, string][]][] = [
    ["Leads", [["Acme Corp", "$54k"], ["Stark Ind.", "$12k"]]],
    ["Proposal", [["Wayne Ent.", "$120k"], ["Globex", "$31k"]]],
    ["Closed", [["Oscorp Ltd.", "$88k"]]],
  ];
  return (
    <div className="mockup-window" style={{ height: 380 }}>
      <MockupHeader url="zyncrm.app / Pipeline" />
      <div className="mockup-body">
        <div className="crm-columns">
          {cols.map(([name, cards]) => (
            <div key={name} className="crm-col">
              <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 4 }}>{name}</div>
              {cards.map(([c, v]) => <div key={c} className="crm-card"><span style={{ fontSize: 10 }}>{c}</span><div className="crm-val">{v}</div></div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const products = [
  {
    id: "zynrest", name: "ZynRest", category: "Restaurant Management", tagline: "Every order. Every table. One system.", mockup: <ZynRestMockup />,
    pain: "Wrong orders, wasted stock and no idea which dishes actually make money?",
    desc: "An intelligent platform designed to manage restaurant operations, orders, inventory, and analytics from one unified dashboard.",
    features: ["Multi-terminal POS", "Live KDS system", "Real-time inventory", "Dynamic QR menus", "Staff shift tracking", "Recipe cost engine"],
    ai: "AI-ready: add a Zyntraz agent for demand forecasting and automatic reorders",
  },
  {
    id: "zynstay", name: "ZynStay", category: "Hospitality Platform", tagline: "Fuller rooms. Happier guests.", mockup: <ZynStayMockup />,
    pain: "Double bookings, empty rooms and housekeeping chaos?",
    desc: "A comprehensive hospitality management platform for hotels, resorts, and event venues to streamline guest experiences.",
    features: ["Centralized booking", "Event & banquet", "Housekeeping logic", "Dynamic pricing", "Channel sync", "Revenue forecasting"],
    ai: "AI-ready: add a booking agent that answers guests on WhatsApp",
  },
  {
    id: "zyndesk", name: "ZynDesk", category: "Support & Ticketing", tagline: "Support that never sleeps.", mockup: <ZynDeskMockup />,
    pain: "Customer complaints lost in inboxes and nobody owning the fix?",
    desc: "A powerful helpdesk system to manage customer support operations efficiently — every ticket tracked, prioritised and resolved on time.",
    features: ["SLA ticket tracking", "Omni-channel inboxes", "AI ticket triage", "Self-serve knowledge base"],
    ai: "AI triage and suggested replies on every ticket",
  },
  {
    id: "zyncrm", name: "ZynCRM", category: "Customer Relationship", tagline: "No lead left behind.", mockup: <ZynCRMMockup />,
    pain: "Leads going cold because nobody followed up?",
    desc: "A smart CRM system designed to manage leads, track sales pipelines, and improve growth.",
    features: ["Visual pipeline tracking", "Follow-up automation", "Predictive lead scoring", "Invoice & quote generator"],
    ai: "Predictive lead scoring and automated follow-ups",
  },
];

export default function ProductShowcase() {
  return (
    <>
      {products.map((p, i) => (
        <section key={p.id} id={p.id} className={`pshow${i % 2 ? " dark" : " alt"}`}>
          <div className="container pshow-head">
            <p className="pshow-cat" data-reveal>{p.category}</p>
            <h2 className="h-xl" data-reveal style={{ ["--d" as string]: ".06s" }}>{p.name}</h2>
            <p className="pshow-tag" data-reveal style={{ ["--d" as string]: ".12s" }}>{p.tagline}</p>
            <div className="cta-row" data-reveal style={{ ["--d" as string]: ".18s" }}>
              <Link href="/contact" className="btn btn-primary">Book a {p.name} demo</Link>
              <a href={`#${p.id}-details`} className="link-chev">Learn more <ChevronRight size={18} /></a>
            </div>
          </div>
          <div className="container pshow-visual" data-reveal>{p.mockup}</div>
          <div className="container pshow-body" id={`${p.id}-details`}>
            <div data-reveal>
              <p className="pshow-pain"><AlertCircle size={18} /> {p.pain}</p>
              <p className="lede">{p.desc}</p>
              <p className="pshow-ai"><span>AI</span> {p.ai}</p>
            </div>
            <ul className="pshow-feats" data-reveal style={{ ["--d" as string]: ".1s" }}>
              {p.features.map((f) => <li key={f}><CheckCircle2 size={18} /> {f}</li>)}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}

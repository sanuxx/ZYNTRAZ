import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AgentNetworkAuto } from "@/components/sections/AgenticAI";
import { ZynCRMMockup, ZynDeskMockup, ZynRestMockup, ZynStayMockup } from "@/components/sections/Products";

function Links({ learn, demo = "/contact" }: { learn: string; demo?: string }) {
  return (
    <div className="tile-links">
      <Link href={learn} className="btn btn-primary">Learn more</Link>
      <Link href={demo} className="link-chev">Book a demo <ChevronRight size={18} /></Link>
    </div>
  );
}

function DashboardMock() {
  const bars = [38, 52, 44, 66, 58, 74, 69, 88, 80, 95, 90, 100];
  return (
    <div className="dash">
      <div className="dash-top">
        {[["Revenue today", "+18.4%"], ["Orders synced", "1,284"], ["Manual tasks", "0"]].map(([l, v]) => (
          <div key={l} className="dash-kpi"><span>{l}</span><b>{v}</b></div>
        ))}
      </div>
      <div className="dash-chart">
        {bars.map((h, i) => <i key={i} style={{ height: `${h}%`, ["--i" as string]: i }} />)}
      </div>
      <div className="dash-rows">
        {["Invoice #2231 — sent automatically", "Low stock: Arabica beans — PO drafted", "New lead: Hilltop Resort — follow-up booked"].map((r) => (
          <div key={r}><span className="dash-dot" />{r}</div>
        ))}
      </div>
    </div>
  );
}

export default function HomeTiles() {
  return (
    <section className="tiles" aria-label="Zyntraz platforms">
      <article className="tile tile-full dark" data-reveal>
        <p className="tile-eyebrow grad-text">Zyntraz AI</p>
        <h2>Your new AI workforce.</h2>
        <p className="tile-sub">Agents that answer, decide and get work done — across every system you use.</p>
        <Links learn="/ai" />
        <div className="tile-visual tile-visual-net"><AgentNetworkAuto /></div>
      </article>

      <article className="tile tile-full alt" data-reveal>
        <p className="tile-eyebrow">Custom Business Systems</p>
        <h2>Built around how you <span className="grad-text">actually work.</span></h2>
        <p className="tile-sub">One operating system for orders, stock, customers, staff and finance.</p>
        <Links learn="/services" />
        <div className="tile-visual"><DashboardMock /></div>
      </article>

      <div className="tile-grid">
        <article className="tile dark" data-reveal>
          <p className="tile-eyebrow">ZynRest</p>
          <h3>Every order. Every table.</h3>
          <p className="tile-sub">Restaurant management, unified.</p>
          <Links learn="/products#zynrest" />
          <div className="tile-visual tile-visual-mock"><ZynRestMockup /></div>
        </article>
        <article className="tile alt" data-reveal style={{ ["--d" as string]: ".08s" }}>
          <p className="tile-eyebrow">ZynStay</p>
          <h3>Fuller rooms. Happier guests.</h3>
          <p className="tile-sub">Hospitality, beautifully run.</p>
          <Links learn="/products#zynstay" />
          <div className="tile-visual tile-visual-mock"><ZynStayMockup /></div>
        </article>
        <article className="tile alt" data-reveal>
          <p className="tile-eyebrow">ZynDesk</p>
          <h3>Support that never sleeps.</h3>
          <p className="tile-sub">AI triage for every ticket.</p>
          <Links learn="/products#zyndesk" />
          <div className="tile-visual tile-visual-mock"><ZynDeskMockup /></div>
        </article>
        <article className="tile dark" data-reveal style={{ ["--d" as string]: ".08s" }}>
          <p className="tile-eyebrow">ZynCRM</p>
          <h3>No lead left behind.</h3>
          <p className="tile-sub">Pipelines that follow up for you.</p>
          <Links learn="/products#zyncrm" />
          <div className="tile-visual tile-visual-mock"><ZynCRMMockup /></div>
        </article>
      </div>
    </section>
  );
}

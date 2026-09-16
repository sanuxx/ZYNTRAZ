import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import CTABand from "@/components/layout/CTABand";
import DomainsOrbit from "@/components/sections/DomainsOrbit";
import Workflow from "@/components/sections/Workflow";
import TechStack from "@/components/sections/TechStack";

export const metadata: Metadata = {
  title: "Services — AI, software, cloud, IoT and automation",
  description: "AI & agentic AI, software development, web development, web system development and custom system development — engineered end to end.",
};

export default function ServicesPage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="Services"
        title={<>Engineering,<br /><span className="grad-text">end to end.</span></>}
        lede={<>AI-first — and full-stack. We design, build, secure and scale <strong>AI agents, software, websites, web systems and custom platforms</strong>, with real progress every week.</>}
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See how we work", href: "#process" }}
      />
      <DomainsOrbit />
      <Workflow />
      <TechStack />
      <CTABand />
    </div>
  );
}

import type { Metadata } from "next";
import LocalNav from "@/components/layout/LocalNav";
import PageHero from "@/components/layout/PageHero";
import CTABand from "@/components/layout/CTABand";
import Services from "@/components/sections/Services";
import Workflow from "@/components/sections/Workflow";
import TechStack from "@/components/sections/TechStack";

export const metadata: Metadata = {
  title: "Services — AI, software, cloud, IoT and automation",
  description: "AI & agentic AI, custom software, web & cloud, IoT, business automation and data analytics — engineered end to end.",
};

export default function ServicesPage() {
  return (
    <div className="page">
      <LocalNav title="Services" links={[
        { label: "Capabilities", href: "#services" }, { label: "Process", href: "#process" }, { label: "Technology", href: "#tech" },
      ]} />
      <PageHero
        eyebrow="Services"
        title={<>Engineering,<br /><span className="grad-text">end to end.</span></>}
        lede={<>From AI agents to cloud platforms, we design, build, secure and scale the systems your business runs on — <strong>with real progress every week.</strong></>}
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See how we work", href: "#process" }}
      />
      <Services />
      <Workflow />
      <TechStack />
      <CTABand />
    </div>
  );
}

import type { Metadata } from "next";
import LocalNav from "@/components/layout/LocalNav";
import PageHero from "@/components/layout/PageHero";
import CTABand from "@/components/layout/CTABand";
import Positioning from "@/components/sections/Positioning";
import Stats from "@/components/sections/Stats";

export const metadata: Metadata = {
  title: "Company — we rebuild how businesses operate",
  description: "Not generic software. Zyntraz engineers AI and business systems around how your business actually works.",
};

export default function CompanyPage() {
  return (
    <div className="page">
      <LocalNav title="Company" links={[{ label: "Philosophy", href: "#company" }, { label: "Numbers", href: "#numbers" }]} />
      <PageHero
        eyebrow="About Zyntraz"
        title={<>We rebuild how<br /><span className="grad-text">businesses operate.</span></>}
        lede={<>Zyntraz is an AI-first engineering company. We build <strong>AI agents, intelligent workflows and custom business systems</strong> for companies that are ready to stop patching the chaos.</>}
        primary={{ label: "Work with us", href: "/contact" }}
        secondary={{ label: "Explore Zyntraz AI", href: "/ai" }}
      />
      <Stats />
      <Positioning />
      <CTABand />
    </div>
  );
}

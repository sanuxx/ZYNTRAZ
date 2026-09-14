import type { Metadata } from "next";
import LocalNav from "@/components/layout/LocalNav";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Contact — book a free consultation",
  description: "Free consultation, no commitment. Talk to a Zyntraz architect about AI agents, automation or a custom system.",
};

export default function ContactPage() {
  return (
    <div className="page">
      <LocalNav title="Contact" links={[{ label: "Consultation", href: "#contact" }, { label: "FAQ", href: "#faq" }]} cta={{ label: "WhatsApp us", href: "https://wa.me/94777437250" }} />
      <Contact />
      <FAQ />
    </div>
  );
}

import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Contact — book a free consultation",
  description: "Free consultation, no commitment. Talk to a Zyntraz architect about AI agents, automation or a custom system.",
};

export default function ContactPage() {
  return (
    <div className="page">
      <Contact />
      <FAQ />
    </div>
  );
}

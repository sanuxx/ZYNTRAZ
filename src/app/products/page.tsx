import type { Metadata } from "next";
import LocalNav from "@/components/layout/LocalNav";
import PageHero from "@/components/layout/PageHero";
import CTABand from "@/components/layout/CTABand";
import ProductShowcase from "@/components/sections/Products";

export const metadata: Metadata = {
  title: "Products — ZynRest, ZynStay, ZynDesk, ZynCRM",
  description: "Ready-made platforms for restaurants, hospitality, support and sales — deployed fast, then tailored to the way your business works.",
};

export default function ProductsPage() {
  return (
    <div className="page">
      <LocalNav title="Products" links={[
        { label: "ZynRest", href: "#zynrest" }, { label: "ZynStay", href: "#zynstay" },
        { label: "ZynDesk", href: "#zyndesk" }, { label: "ZynCRM", href: "#zyncrm" },
      ]} />
      <PageHero
        eyebrow="Zyntraz Platforms"
        title={<>Platforms,<br /><span className="grad-text">ready to run.</span></>}
        lede={<>Proprietary systems designed for operational dominance — <strong>deployed fast</strong>, then tailored to the way your business works. Every one is AI-ready.</>}
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "Explore ZynRest", href: "#zynrest" }}
      />
      <ProductShowcase />
      <CTABand title={<>Find the right platform <span className="grad-text">for you.</span></>} lede="Tell us how your business runs and we'll show you a live demo configured for it." />
    </div>
  );
}

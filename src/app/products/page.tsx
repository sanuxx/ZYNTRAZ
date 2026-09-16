import type { Metadata } from "next";
import CTABand from "@/components/layout/CTABand";
import ProductsHero from "@/components/products/ProductsHero";
import ProductTheater from "@/components/products/ProductTheater";

export const metadata: Metadata = {
  title: "Products — ZynRest, ZynStay, ZynDesk, ZynCRM",
  description: "Ready-made platforms for restaurants, hospitality, support and sales — deployed fast, then tailored to the way your business works.",
};

export default function ProductsPage() {
  return (
    <div className="page">
      <ProductsHero />
      <ProductTheater />
      <CTABand title={<>Find the right platform <span className="grad-text">for you.</span></>} lede="Tell us how your business runs and we'll show you a live demo configured for it." />
    </div>
  );
}

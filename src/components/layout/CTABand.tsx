import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WHATSAPP } from "@/lib/contact";

type Props = { title?: React.ReactNode; lede?: string; dark?: boolean };

export default function CTABand({
  title = <>Ready to build your <span className="grad-text">AI workforce?</span></>,
  lede = "Free consultation, no commitment. We'll map where AI and automation will pay off first — and outline a clear roadmap.",
  dark = true,
}: Props) {
  return (
    <section className={`ctaband${dark ? " dark" : ""}`}>
      <div className="ctaband-glow" aria-hidden="true" />
      <div className="container ctaband-inner">
        <h2 className="h-xl" data-reveal>{title}</h2>
        <p className="lede" data-reveal style={{ ["--d" as string]: ".1s" }}>{lede}</p>
        <div className="cta-row" data-reveal style={{ ["--d" as string]: ".2s" }}>
          <Link href="/contact" className="btn btn-primary btn-lg">Book a free consultation</Link>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="link-chev">Chat on WhatsApp <ChevronRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Bot, ChevronRight, FileSpreadsheet, Repeat } from "lucide-react";

const pains = [
  { icon: FileSpreadsheet, title: "Running on spreadsheets and WhatsApp.", desc: "Nobody has one version of the truth, so mistakes are guaranteed." },
  { icon: Repeat, title: "Your team does robot work.", desc: "Hours every week lost to copy-paste, re-typing and chasing approvals." },
  { icon: Bot, title: "AI that never leaves the demo.", desc: "Chatbots that don't know your business and can't act in your systems." },
];

export default function HomePain() {
  return (
    <section className="section alt hpain">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow pain" data-reveal>Sound familiar?</p>
          <h2 className="h-xl" data-reveal style={{ ["--d" as string]: ".08s" }}>
            Your business is growing.<br /><span className="dim">Your systems aren&apos;t.</span>
          </h2>
        </div>
        <div className="hpain-grid">
          {pains.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="hpain-item" data-reveal style={{ ["--d" as string]: `${i * 0.1}s` }}>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
        <div className="cta-row center" data-reveal>
          <Link href="/solutions" className="link-chev">See how we fix it <ChevronRight size={18} /></Link>
          <Link href="/solutions#calculator" className="link-chev">Calculate your hidden cost <ChevronRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}

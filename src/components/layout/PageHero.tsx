import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  dark?: boolean;
  children?: React.ReactNode;
};

export default function PageHero({ eyebrow, title, lede, primary, secondary, dark, children }: Props) {
  return (
    <section className={`phero${dark ? " dark" : ""}`}>
      <div className="container phero-inner">
        <p className="phero-eyebrow" data-reveal>{eyebrow}</p>
        <h1 className="h-hero" data-reveal style={{ ["--d" as string]: ".08s" }}>{title}</h1>
        <p className="lede phero-lede" data-reveal style={{ ["--d" as string]: ".16s" }}>{lede}</p>
        {(primary || secondary) && (
          <div className="cta-row" data-reveal style={{ ["--d" as string]: ".24s" }}>
            {primary && <Link href={primary.href} className="btn btn-primary btn-lg">{primary.label}</Link>}
            {secondary && <Link href={secondary.href} className="link-chev">{secondary.label} <ChevronRight size={18} /></Link>}
          </div>
        )}
      </div>
      {children && <div className="phero-visual" data-reveal style={{ ["--d" as string]: ".3s" }}>{children}</div>}
    </section>
  );
}

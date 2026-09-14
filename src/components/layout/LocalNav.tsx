import Link from "next/link";

type Props = { title: string; links: { label: string; href: string }[]; cta?: { label: string; href: string }; dark?: boolean };

export default function LocalNav({ title, links, cta = { label: "Book a demo", href: "/contact" }, dark }: Props) {
  return (
    <div className={`lnav${dark ? " dark" : ""}`}>
      <div className="lnav-row">
        <span className="lnav-title">{title}</span>
        <nav className="lnav-links" aria-label={`${title} sections`}>
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <Link href={cta.href} className="lnav-cta">{cta.label}</Link>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP } from "@/lib/contact";
import { BASE_PATH } from "@/lib/site";
import MotionToggle from "@/components/ui/MotionToggle";

const cols = [
  { title: "AI", links: [["Zyntraz AI", "/ai"], ["Agent demo", "/ai#demo"], ["Capabilities", "/ai#capabilities"], ["Trust & safety", "/ai#trust"]] },
  { title: "Services", links: [["Software development", "/services"], ["Web development", "/services"], ["Web systems", "/services"], ["Custom systems", "/services"]] },
  { title: "Products", links: [["ZynRest", "/products#zynrest"], ["ZynStay", "/products#zynstay"], ["ZynDesk", "/products#zyndesk"], ["ZynCRM", "/products#zyncrm"]] },
  { title: "Use cases", links: [["Problems we solve", "/solutions#problems"], ["Cost calculator", "/solutions#calculator"], ["Industries", "/solutions#industries"]] },
  { title: "Company", links: [["About Zyntraz", "/company"], ["How we work", "/services#process"], ["FAQ", "/contact#faq"]] },
];

export default function Footer() {
  return (
    <>
      <footer className="gfoot">
        <div className="container">
          <p className="gfoot-note">
            Free consultation, no commitment. <Link href="/contact">Talk to an architect</Link> or chat with us on{" "}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
          </p>
          <div className="gfoot-cols">
            {cols.map((c) => (
              <div key={c.title}>
                <h4>{c.title}</h4>
                <ul>{c.links.map(([l, h]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
              </div>
            ))}
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                <li><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
                <li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="gfoot-bottom">
            <Image src={`${BASE_PATH}/zyntraz-logo.png`} alt="Zyntraz" width={894} height={174} className="gfoot-logo" />
            <span>Copyright © {new Date().getFullYear()} Zyntraz. All rights reserved.</span>
            <span className="gfoot-tag"><MotionToggle /></span>
          </div>
        </div>
      </footer>
      <a className="wa-fab" href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Chat with Zyntraz on WhatsApp">
        <MessageCircle size={24} />
      </a>
    </>
  );
}

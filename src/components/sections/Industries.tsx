import { Hotel, ShoppingBag, GraduationCap, Building2, HeartPulse, Truck } from "lucide-react";

const industries = [
  { name: "Hospitality", icon: Hotel, systems: ["Hotel management systems", "Reservation dashboards", "Restaurant POS", "Guest analytics"] },
  { name: "Retail & E-Commerce", icon: ShoppingBag, systems: ["Inventory management", "Sales analytics", "Order management", "Customer dashboards"] },
  { name: "Education & EdTech", icon: GraduationCap, systems: ["LMS platforms", "Student portals", "Attendance systems", "Performance analytics"] },
  { name: "Real Estate", icon: Building2, systems: ["Property management", "CRM dashboards", "Agent portals", "Market analytics"] },
  { name: "Healthcare", icon: HeartPulse, systems: ["Patient systems", "Appointment booking", "Medical analytics", "Staff management"] },
  { name: "Logistics", icon: Truck, systems: ["Fleet management", "Tracking dashboards", "Inventory logistics", "Delivery monitoring"] },
];

export default function Industries() {
  return (
    <section className="section alt" id="industries">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow" data-reveal>Industries</span>
          <h2 className="h-lg" data-reveal style={{ ["--d" as string]: ".1s" }}>Built for the way your industry works.</h2>
          <p className="lede" data-reveal style={{ ["--d" as string]: ".2s" }}>
            Every business operates differently. So every system should too.
          </p>
        </div>
        <div className="ind-grid">
          {industries.map(({ name, icon: Icon, systems }, i) => (
            <article key={name} className="glass spot ind" data-reveal style={{ ["--d" as string]: `${(i % 3) * 0.08}s` }}>
              <div className="ind-head">
                <span className="ind-ico"><Icon size={22} /></span>
                <h3>{name}</h3>
              </div>
              <ul>{systems.map((s) => <li key={s}>{s}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import WorkforceScene from "@/components/home/WorkforceScene";
import BusinessSystemScene from "@/components/home/BusinessSystemScene";

export default function HomeTiles() {
  return (
    <section className="tiles" aria-label="Zyntraz AI and custom business systems">
      <WorkforceScene />

      <BusinessSystemScene />
    </section>
  );
}

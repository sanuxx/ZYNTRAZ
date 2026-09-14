import HeroCinematic from "@/components/home/HeroCinematic";
import HomeStatement from "@/components/home/HomeStatement";
import HomePain from "@/components/home/HomePain";
import Journey from "@/components/home/Journey";
import HomeMarquee from "@/components/home/HomeMarquee";
import HomeTiles from "@/components/home/HomeTiles";
import HomeProcess from "@/components/home/HomeProcess";
import Stats from "@/components/sections/Stats";
import CTABand from "@/components/layout/CTABand";

// Story: promise → what we do → the problem → what we provide → platforms → how we work → proof → act.
export default function Home() {
  return (
    <>
      <HeroCinematic />
      <HomeStatement />
      <HomePain />
      <Journey />
      <HomeMarquee />
      <HomeTiles />
      <HomeProcess />
      <Stats />
      <CTABand />
    </>
  );
}

import HeroCinematic from "@/components/home/HeroCinematic";
import Journey from "@/components/home/Journey";
import HomePain from "@/components/home/HomePain";
import HomeTiles from "@/components/home/HomeTiles";
import HomeIndustries from "@/components/home/HomeIndustries";
import HomeProcess from "@/components/home/HomeProcess";
import Stats from "@/components/sections/Stats";
import CTABand from "@/components/layout/CTABand";

// Story: promise (hero) → the orb bursts into what we provide (particles) → the problem → AI workforce & custom systems → industries → how we work → proof → act.
export default function Home() {
  return (
    <>
      <HeroCinematic />
      <Journey />
      <HomePain />
      <HomeTiles />
      <HomeIndustries />
      <HomeProcess />
      <Stats />
      <CTABand />
    </>
  );
}

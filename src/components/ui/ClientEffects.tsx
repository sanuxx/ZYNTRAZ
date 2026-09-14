"use client";

import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import Motion from "@/components/ui/Motion";

// SmoothScroll must mount first so the intro can pause Lenis.
export default function ClientEffects() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Motion />
    </>
  );
}

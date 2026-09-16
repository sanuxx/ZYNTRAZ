"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { scroll } from "@/lib/scroll";

// Jumps past the long, scroll-locked section this button lives in.
export default function SkipSection({ label = "Skip" }: { label?: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const skip = () => {
    const next = ref.current?.closest("section")?.nextElementSibling as HTMLElement | null;
    if (!next) return;
    if (scroll.lenis) scroll.lenis.scrollTo(next, { duration: 1.4 });
    else next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button ref={ref} type="button" className="skip-btn" onClick={skip}>
      {label} <ChevronDown size={15} />
    </button>
  );
}

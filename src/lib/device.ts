// Client-only helpers; call from effects, state initialisers or ssr:false components.
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Phones, tablets and low-core machines get lighter 3D scenes.
export const isLowPower = () =>
  window.innerWidth < 768 ||
  window.matchMedia("(pointer: coarse)").matches ||
  (navigator.hardwareConcurrency ?? 8) <= 4;

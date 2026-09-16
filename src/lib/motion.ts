// Shared motion language. Three signature moves are used site-wide:
//  1. Masked headline reveal (SplitText lines rising out of a mask)
//  2. Rise-and-fade for content blocks
//  3. Scroll-scrubbed depth (scale / tilt tied to scroll) for set-piece scenes
export const EASE = {
  out: "expo.out", // entrances
  inOut: "power3.inOut", // morphs and handovers
  scrub: "none", // anything tied to scroll position
} as const;

export const DUR = {
  fast: 0.45,
  base: 0.9,
  slow: 1.2,
} as const;

export const RISE = { y: 40, opacity: 0 } as const;

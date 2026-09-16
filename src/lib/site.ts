// Kept in sync with `basePath` in next.config.ts. Only production builds are exported to
// https://sanuxx.github.io/ZYNTRAZ/, so dev (`next dev`, NODE_ENV=development) stays unprefixed —
// next/link and next/image apply this automatically, but a plain <img src> or a CSS url() does not,
// so anything using one of those must prefix its path with this constant itself.
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/ZYNTRAZ" : "";

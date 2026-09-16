import path from "node:path";
import type { NextConfig } from "next";

// Served from https://sanuxx.github.io/ZYNTRAZ/ — a project page, not a user/org root page —
// so every route and asset must be prefixed with the repo name, and GitHub Pages has no
// Node server to run Next's image optimizer or route handlers against. Only applied to
// production builds (see src/lib/site.ts) so `next dev` stays unprefixed at localhost:3000/.
const repo = "ZYNTRAZ";
const prod = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  transpilePackages: [],
  output: "export",
  ...(prod && { basePath: `/${repo}`, assetPrefix: `/${repo}/` }),
  trailingSlash: true,
  images: { unoptimized: true },
  // A stray lockfile in the user's home directory otherwise makes Turbopack misdetect the
  // workspace root; pin it to this project explicitly.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;

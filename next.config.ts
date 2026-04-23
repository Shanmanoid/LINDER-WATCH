import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project — avoids the
  // "inferred workspace root" warning when parent dirs contain
  // stray package.json / lockfiles.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;

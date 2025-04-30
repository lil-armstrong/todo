import analyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
// import path from "node:path";
// import { fileURLToPath } from "node:url";


const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === "true",
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default withBundleAnalyzer(nextConfig);

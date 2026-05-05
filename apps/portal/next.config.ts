import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@amoeba/ui", "@amoeba/db"],
};

export default nextConfig;

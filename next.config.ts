import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  additionalPrecacheEntries: ["/"],
  reloadOnOnline: false,
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSerwist(nextConfig);

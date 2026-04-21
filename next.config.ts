import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  /** LAN や 127.0.0.1 経由で dev にアクセスするときの HMR 許可 */
  allowedDevOrigins: ["127.0.0.1", "192.168.0.30", "localhost"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

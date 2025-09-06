import type { NextConfig } from "next";
const CompressionPlugin = require("compression-webpack-plugin");

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: "gzip", 
          test: /\.(js|css|html|svg)$/, 
          threshold: 1024, 
          minRatio: 0.8, 
        })
      );
    }
    return config;
  },
};

export default nextConfig;
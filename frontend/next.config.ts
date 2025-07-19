import type { NextConfig } from "next";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
};

export default nextConfig;

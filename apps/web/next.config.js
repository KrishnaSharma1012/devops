import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceDir = path.resolve(appDir, "../..");

// The local .env is stored beside the bms workspace. Existing environment
// variables still take precedence in production and CI.
dotenv.config({ path: path.resolve(workspaceDir, "../.env") });

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: workspaceDir,
  },
};

export default nextConfig;

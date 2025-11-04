#!/usr/bin/env node
import { spawn } from "child_process";
import path from "path";
import os from "os";
import fs from "fs";
import { fileURLToPath } from "url";
import pkg from "../package.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(__dirname, "../server.js");

// ---------- Helpers ----------
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) return iface.address;
    }
  }
  return "localhost";
}

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

// ---------- Parse CLI args ----------
const args = process.argv.slice(2);
const options = {
  showQR: !args.includes("--no-qr"),
  port: null,
  envFile: null,
};

if (args.includes("--help")) {
  console.log(`
Usage: tabsync [options]

Options:
  --port <num>         Use a specific port instead of a random one
  --no-qr              Skip showing QR code
  --env <path>         Load environment variables from a custom file
  --version, --v       Show the current version
  --help               Show this help message

Examples:
  tabsync
  tabsync --port 3210
  tabsync --env ./myenv.txt
  tabsync --no-qr --port 8080
`);
  process.exit(0);
}

if (args.includes("--version") || args.includes("--v")) {
  console.log(`v${pkg.version}`);
  process.exit(0);
}

// ---- Parse --port ----
const portIndex = args.indexOf("--port");
if (portIndex !== -1 && args[portIndex + 1]) {
  options.port = parseInt(args[portIndex + 1], 10);
}

// ---- Parse --env ----
const envIndex = args.indexOf("--env");
if (envIndex !== -1 && args[envIndex + 1]) {
  options.envFile = path.resolve(args[envIndex + 1]);
}

// ---------- Prepare Environment ----------
const ip = getLocalIP();
const env = { ...process.env, TABSYNC_IP: ip };

if (options.port) env.TABSYNC_PORT = options.port;
if (!options.showQR) env.TABSYNC_NO_QR = "1";

// Load custom .env file manually (only if provided)
if (options.envFile && fs.existsSync(options.envFile)) {
  log(`Loading environment variables from: ${options.envFile}`);
  const lines = fs.readFileSync(options.envFile, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    const value = rest.join("=").trim().replace(/^['"]|['"]$/g, "");
    if (key) env[key.trim()] = value;
  }
} else if (options.envFile) {
  console.warn(`⚠️  Env file not found: ${options.envFile}`);
}

// ---------- Run Server ----------
log("Starting TabSync Local server...");
log(`Detected LAN IP: ${ip}`);

const child = spawn("node", [serverPath], {
  stdio: ["ignore", "pipe", "pipe"],
  env,
});

child.stdout.on("data", (data) => process.stdout.write(data));
child.stderr.on("data", (data) => process.stderr.write(data));

// Graceful shutdown
function cleanup() {
  log("Shutting down TabSync server...");
  child.kill("SIGINT");
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

child.on("exit", (code) => {
  log(`TabSync server exited with code ${code}`);
});

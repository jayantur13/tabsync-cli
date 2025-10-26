#!/usr/bin/env node
import { spawn } from "child_process";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(__dirname, "../server.js");

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

// ---- Parse CLI args ----
const args = process.argv.slice(2);
const options = {
  showQR: !args.includes("--no-qr"),
  port: null,
};

if (args.includes("--help")) {
  console.log(`
Usage: tabsync [options]

Options:
  --no-qr        Skip showing QR code
  --help         Show this help message
`);
  process.exit(0);
}

const portIndex = args.indexOf("--port");
if (portIndex !== -1 && args[portIndex + 1]) {
  options.port = parseInt(args[portIndex + 1], 10);
}

// ---- Run server ----
const ip = getLocalIP();
log("Starting TabSync Local server...");
log(`Detected LAN IP: ${ip}`);

const env = { ...process.env, TABSYNC_IP: ip };
if (!options.showQR) env.TABSYNC_NO_QR = "1";

const child = spawn("node", [serverPath], {
  stdio: ["ignore", "pipe", "pipe"],
  env,
});

child.stdout.on("data", (data) => process.stdout.write(data));
child.stderr.on("data", (data) => process.stderr.write(data));

// Handle graceful shutdown
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

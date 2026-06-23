import { existsSync, rmSync } from "node:fs";
import { createServer } from "node:net";
import { join } from "node:path";
import { spawn } from "node:child_process";

const port = Number(process.env.PORT || 3000);
const devCacheDir = join(process.cwd(), ".next-dev");

function isPortAvailable(portNumber) {
  return new Promise((resolve) => {
    const server = createServer();

    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(portNumber, "127.0.0.1");
  });
}

const available = await isPortAvailable(port);

if (!available) {
  console.error(
    `Port ${port} is already in use. Stop the existing dev server before starting another one.`
  );
  process.exit(1);
}

if (existsSync(devCacheDir)) {
  rmSync(devCacheDir, { recursive: true, force: true });
  console.log("Removed stale .next-dev cache.");
}

const nextBin = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, "dev"], {
  stdio: "inherit",
  shell: false,
  env: {
    ...process.env,
    NEXT_DIST_DIR: ".next-dev",
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

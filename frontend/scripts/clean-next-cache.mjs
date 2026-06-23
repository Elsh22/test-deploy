import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const cacheDirs = [".next", ".next-dev"];

for (const dir of cacheDirs) {
  const cacheDir = join(process.cwd(), dir);

  if (existsSync(cacheDir)) {
    rmSync(cacheDir, { recursive: true, force: true });
    console.log(`Removed stale ${dir} cache.`);
  }
}

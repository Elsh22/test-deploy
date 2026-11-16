import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  resolve: { alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    'server-only': fileURLToPath(new URL('./test/server-only.ts', import.meta.url)),
  } },
  oxc: { jsx: { runtime: 'automatic' } },
  test: { environment: 'jsdom', setupFiles: ['./test/setup.ts'], include: ['test/gallery-admin/**/*.test.{ts,tsx}'], maxWorkers: 1 },
});

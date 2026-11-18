/// <reference types="vitest/config" />
import type {} from 'vite-react-ssg/node';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@shared': fileURLToPath(new URL('./shared', import.meta.url)),
    },
  },
  build: { target: 'es2020', cssCodeSplit: true, sourcemap: false },
  ssgOptions: {
    script: 'async',
    formatting: 'none',
    dirStyle: 'flat',
    crittersOptions: false,
    beastiesOptions: false,
    /** 404 jest prerenderowana jako 404.html, ścieżka „*” — nie. */
    includedRoutes: (paths) => paths.filter((p) => !p.includes('*')),
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts', 'shared/**/*.test.ts', 'api/**/*.test.ts'],
  },
});

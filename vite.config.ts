/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ fastRefresh: false }),
    eslint(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTest.ts'],
    coverage: {
      provider: 'c8',
      all: true,
      include: ['src'],
      exclude: [
        '**/App.tsx',
        '**/main.tsx',
        '**/entry-server.tsx',
        '**/AppRoutes.tsx',
        '**/interfaces.ts',
        '**/store.ts',
      ],
    },
  },
});

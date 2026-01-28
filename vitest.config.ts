import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vitest Configuration
 *
 * Test runner configuration for unit, integration, and E2E tests
 */
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
        'client/**', // Exclude all client code for now (frontend not tested yet)
        'server/services/storage/**', // Exclude repositories (thin data layer, mocked in tests)
        'server/index.ts', // Main entry point
        'server/config/**', // Configuration files
        'shared/**', // Shared schema and types
        '*.{test,spec}.{js,ts,jsx,tsx}',
      ],
      include: [
        'server/controllers/**/*.ts',
        'server/services/**/*.ts',
        'server/routes/**/*.ts',
        'server/middleware/**/*.ts',
        'server/utils/**/*.ts',
      ],
      // Coverage thresholds for server business logic
      // Current: 65% lines, 61% branches, 59% functions
      // Goal: Increase to 70% as we add more tests
      thresholds: {
        lines: 60,
        functions: 55,
        branches: 55,
        statements: 60,
      },
    },
    // Separate test files by pattern
    include: [
      'tests/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    // Test timeout
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@server': path.resolve(__dirname, './server'),
    },
  },
});

/**
 * Global Test Setup
 *
 * Configures Vitest globals and testing library matchers
 * This file runs before all tests via vitest.config.ts setupFiles
 */

import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Setup global test environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/fundrazor_test';
process.env.SESSION_SECRET = 'test-secret-key-for-testing-only-min-32-chars';
process.env.LOG_LEVEL = 'error'; // Suppress logs during tests

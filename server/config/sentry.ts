import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { Express } from 'express';
import { logger } from './logging';

/**
 * Sentry Error Tracking Configuration
 *
 * Captures and reports errors to Sentry for monitoring and debugging.
 *
 * Environment Variables:
 * - SENTRY_DSN: Sentry Data Source Name (required to enable Sentry)
 * - SENTRY_ENVIRONMENT: Environment name (default: NODE_ENV)
 * - SENTRY_TRACES_SAMPLE_RATE: Performance tracing sample rate 0-1 (default: 0.1)
 * - SENTRY_PROFILES_SAMPLE_RATE: Profiling sample rate 0-1 (default: 0.1)
 */

export function initializeSentry(_app: Express): void {
  const dsn = process.env.SENTRY_DSN;

  if (!dsn) {
    logger.info('Sentry is disabled (SENTRY_DSN not set)');
    return;
  }

  const environment = process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development';
  const tracesSampleRate = parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1');
  const profilesSampleRate = parseFloat(process.env.SENTRY_PROFILES_SAMPLE_RATE || '0.1');

  Sentry.init({
    dsn,
    environment,
    integrations: [
      // Enable HTTP calls tracing
      Sentry.httpIntegration(),
      // Enable Express.js middleware tracing
      Sentry.expressIntegration(),
      // Enable Profiling
      nodeProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate, // Capture 10% of transactions for performance monitoring
    // Profiling
    profilesSampleRate, // Profile 10% of transactions
  });

  // Setup request and tracing handlers
  // Note: In Sentry v8+, handlers are set up via integrations, not middleware

  logger.info('Sentry error tracking initialized', {
    environment,
    tracesSampleRate,
    profilesSampleRate,
  });
}

/**
 * Setup Sentry error handler middleware
 * Must be registered AFTER all routes and BEFORE error handlers
 */
export function setupSentryErrorHandler(app: Express): void {
  const dsn = process.env.SENTRY_DSN;

  if (!dsn) {
    return;
  }

  // The error handler must be registered before any other error middleware and after all controllers
  // Note: In Sentry v8+, error handler is set up via setupExpressErrorHandler
  Sentry.setupExpressErrorHandler(app);

  logger.info('Sentry error handler registered');
}

/**
 * Capture an exception manually
 */
export function captureException(error: Error, context?: Record<string, any>): void {
  if (!process.env.SENTRY_DSN) {
    return;
  }

  Sentry.captureException(error, {
    contexts: context ? { custom: context } : undefined,
  });
}

/**
 * Capture a message manually
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info'): void {
  if (!process.env.SENTRY_DSN) {
    return;
  }

  Sentry.captureMessage(message, level);
}

/**
 * Add user context to Sentry
 */
export function setUser(user: { id: string; email?: string; username?: string }): void {
  if (!process.env.SENTRY_DSN) {
    return;
  }

  Sentry.setUser(user);
}

/**
 * Clear user context
 */
export function clearUser(): void {
  if (!process.env.SENTRY_DSN) {
    return;
  }

  Sentry.setUser(null);
}

/**
 * Add custom context
 */
export function setContext(name: string, context: Record<string, any>): void {
  if (!process.env.SENTRY_DSN) {
    return;
  }

  Sentry.setContext(name, context);
}

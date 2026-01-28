/**
 * Sentry Client Configuration
 *
 * Initializes Sentry for error tracking and performance monitoring in the React app.
 *
 * Environment Variables:
 * - VITE_SENTRY_DSN: Sentry Data Source Name (required to enable Sentry)
 * - VITE_SENTRY_ENVIRONMENT: Environment name (default: development)
 * - VITE_SENTRY_TRACES_SAMPLE_RATE: Performance tracing sample rate 0-1 (default: 0.1)
 * - VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE: Session replay sample rate 0-1 (default: 0.1)
 * - VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE: Error replay sample rate 0-1 (default: 1.0)
 */

import * as Sentry from '@sentry/react';

export function initializeSentry(): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    console.info('Sentry is disabled (VITE_SENTRY_DSN not set)');
    return;
  }

  const environment = import.meta.env.VITE_SENTRY_ENVIRONMENT || import.meta.env.MODE || 'development';
  const tracesSampleRate = parseFloat(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || '0.1');
  const replaysSessionSampleRate = parseFloat(import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE || '0.1');
  const replaysOnErrorSampleRate = parseFloat(import.meta.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || '1.0');

  Sentry.init({
    dsn,
    environment,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate, // Capture 10% of transactions for performance monitoring
    // Session Replay
    replaysSessionSampleRate, // Capture 10% of all sessions
    replaysOnErrorSampleRate, // Capture 100% of sessions with errors
    // Release tracking
    release: import.meta.env.VITE_SENTRY_RELEASE,
  });

  console.info('Sentry error tracking initialized', {
    environment,
    tracesSampleRate,
    replaysSessionSampleRate,
    replaysOnErrorSampleRate,
  });
}

/**
 * Capture an exception manually
 */
export function captureException(error: Error, context?: Record<string, any>): void {
  if (!import.meta.env.VITE_SENTRY_DSN) {
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
  if (!import.meta.env.VITE_SENTRY_DSN) {
    return;
  }

  Sentry.captureMessage(message, level);
}

/**
 * Add user context to Sentry
 */
export function setUser(user: { id: string; email?: string; username?: string } | null): void {
  if (!import.meta.env.VITE_SENTRY_DSN) {
    return;
  }

  Sentry.setUser(user);
}

/**
 * Add custom context
 */
export function setContext(name: string, context: Record<string, any>): void {
  if (!import.meta.env.VITE_SENTRY_DSN) {
    return;
  }

  Sentry.setContext(name, context);
}

/**
 * Start a new transaction for performance monitoring
 * Note: Using modern Sentry API (startSpan) instead of deprecated startTransaction
 */
export function startTransaction(name: string, op: string): void {
  if (!import.meta.env.VITE_SENTRY_DSN) {
    return;
  }

  // Use the modern Sentry API for performance monitoring
  Sentry.startSpan({ name, op }, () => {
    // Span automatically ends when callback completes
  });
}

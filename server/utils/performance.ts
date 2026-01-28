/**
 * Performance Monitoring Utilities
 *
 * Tracks and logs performance metrics for database queries, API requests, and operations.
 */

import { logger } from '../config/logging';

/**
 * Performance thresholds (in milliseconds)
 */
const THRESHOLDS = {
  // Warn if database query takes longer than 100ms
  DATABASE_QUERY_WARN: 100,
  // Warn if database query takes longer than 500ms (critical)
  DATABASE_QUERY_CRITICAL: 500,
  // Warn if API request takes longer than 1000ms
  API_REQUEST_WARN: 1000,
  // Warn if API request takes longer than 3000ms (critical)
  API_REQUEST_CRITICAL: 3000,
  // Warn if any operation takes longer than 5000ms
  OPERATION_WARN: 5000,
};

export interface PerformanceMetrics {
  operation: string;
  duration: number;
  startTime: number;
  endTime: number;
  metadata?: Record<string, any>;
}

/**
 * Start a performance timer
 */
export function startTimer(operation: string): { stop: (metadata?: Record<string, any>) => PerformanceMetrics } {
  const startTime = Date.now();

  return {
    stop: (metadata?: Record<string, any>): PerformanceMetrics => {
      const endTime = Date.now();
      const duration = endTime - startTime;

      const metrics: PerformanceMetrics = {
        operation,
        duration,
        startTime,
        endTime,
        metadata,
      };

      // Log slow operations
      if (duration > THRESHOLDS.OPERATION_WARN) {
        logger.warn('Slow operation detected', metrics);
      }

      return metrics;
    },
  };
}

/**
 * Monitor database query performance
 */
export function monitorDatabaseQuery<T>(
  queryName: string,
  queryFn: () => Promise<T>,
  metadata?: Record<string, any>
): Promise<T> {
  const startTime = Date.now();

  return queryFn()
    .then((result) => {
      const duration = Date.now() - startTime;

      // Log query performance
      const logData = {
        query: queryName,
        duration,
        ...metadata,
      };

      if (duration > THRESHOLDS.DATABASE_QUERY_CRITICAL) {
        logger.error('Critical: Very slow database query', logData);
      } else if (duration > THRESHOLDS.DATABASE_QUERY_WARN) {
        logger.warn('Slow database query', logData);
      } else {
        logger.debug('Database query completed', logData);
      }

      return result;
    })
    .catch((error) => {
      const duration = Date.now() - startTime;

      logger.error('Database query failed', {
        query: queryName,
        duration,
        error: error.message,
        stack: error.stack,
        ...metadata,
      });

      throw error;
    });
}

/**
 * Monitor API request performance
 */
export function logApiRequestPerformance(
  method: string,
  url: string,
  statusCode: number,
  duration: number,
  metadata?: Record<string, any>
): void {
  const logData = {
    method,
    url,
    statusCode,
    duration,
    ...metadata,
  };

  if (duration > THRESHOLDS.API_REQUEST_CRITICAL) {
    logger.error('Critical: Very slow API request', logData);
  } else if (duration > THRESHOLDS.API_REQUEST_WARN) {
    logger.warn('Slow API request', logData);
  } else {
    logger.debug('API request completed', logData);
  }
}

/**
 * Create a performance decorator for functions
 */
export function measurePerformance(operationName: string) {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const timer = startTimer(`${operationName}.${propertyKey}`);

      try {
        const result = await originalMethod.apply(this, args);
        timer.stop();
        return result;
      } catch (error) {
        const metrics = timer.stop({ error: true });
        logger.error('Operation failed', {
          ...metrics,
          error: error instanceof Error ? error.message : String(error),
        });
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * Memory usage monitoring
 */
export function logMemoryUsage(): void {
  const usage = process.memoryUsage();

  logger.info('Memory usage', {
    rss: `${Math.round(usage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(usage.external / 1024 / 1024)} MB`,
  });
}

/**
 * Setup periodic memory monitoring (every 5 minutes)
 */
export function setupPeriodicMemoryMonitoring(): void {
  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      logMemoryUsage();
    }, 5 * 60 * 1000); // 5 minutes
  }
}

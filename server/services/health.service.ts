import { db } from '../db';
import { getFileStorage } from './storage/fileStorageFactory';
import { logger } from '../config/logging';

/**
 * Health Check Service
 *
 * Provides health check functionality for monitoring and orchestration.
 * Used by Kubernetes liveness/readiness probes and monitoring systems.
 */

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  checks: {
    database: HealthCheckResult;
    storage: HealthCheckResult;
    memory: HealthCheckResult;
  };
}

export interface HealthCheckResult {
  status: 'up' | 'down' | 'degraded';
  message?: string;
  responseTime?: number;
  details?: Record<string, any>;
}

const startTime = Date.now();
const version = process.env.npm_package_version || '1.0.0';

/**
 * Get overall system health status
 */
export async function getHealthStatus(): Promise<HealthStatus> {
  const checks = await Promise.allSettled([
    checkDatabase(),
    checkStorage(),
    checkMemory(),
  ]);

  const [databaseResult, storageResult, memoryResult] = checks;

  const database: HealthCheckResult =
    databaseResult.status === 'fulfilled'
      ? databaseResult.value
      : { status: 'down', message: 'Database check failed' };

  const storage: HealthCheckResult =
    storageResult.status === 'fulfilled'
      ? storageResult.value
      : { status: 'down', message: 'Storage check failed' };

  const memory: HealthCheckResult =
    memoryResult.status === 'fulfilled'
      ? memoryResult.value
      : { status: 'down', message: 'Memory check failed' };

  // Determine overall status
  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

  if (database.status === 'down' || storage.status === 'down') {
    overallStatus = 'unhealthy';
  } else if (
    database.status === 'degraded' ||
    storage.status === 'degraded' ||
    memory.status === 'degraded'
  ) {
    overallStatus = 'degraded';
  }

  return {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000), // uptime in seconds
    version,
    checks: {
      database,
      storage,
      memory,
    },
  };
}

/**
 * Check database connectivity
 */
async function checkDatabase(): Promise<HealthCheckResult> {
  const startTime = Date.now();

  try {
    // Simple query to test database connection
    await db.execute('SELECT 1');

    const responseTime = Date.now() - startTime;

    if (responseTime > 1000) {
      // Slow response (> 1 second)
      logger.warn('Database responding slowly', { responseTime });
      return {
        status: 'degraded',
        message: 'Database connection slow',
        responseTime,
      };
    }

    return {
      status: 'up',
      responseTime,
    };
  } catch (error) {
    logger.error('Database health check failed', { error });
    return {
      status: 'down',
      message: error instanceof Error ? error.message : 'Unknown error',
      responseTime: Date.now() - startTime,
    };
  }
}

/**
 * Check storage service availability
 */
async function checkStorage(): Promise<HealthCheckResult> {
  const startTime = Date.now();

  try {
    const storage = getFileStorage();

    // Try to list files (minimal operation)
    await storage.list();

    const responseTime = Date.now() - startTime;

    if (responseTime > 2000) {
      // Slow response (> 2 seconds)
      logger.warn('Storage responding slowly', { responseTime });
      return {
        status: 'degraded',
        message: 'Storage connection slow',
        responseTime,
      };
    }

    return {
      status: 'up',
      responseTime,
    };
  } catch (error) {
    logger.error('Storage health check failed', { error });
    return {
      status: 'down',
      message: error instanceof Error ? error.message : 'Unknown error',
      responseTime: Date.now() - startTime,
    };
  }
}

/**
 * Check memory usage
 */
async function checkMemory(): Promise<HealthCheckResult> {
  const usage = process.memoryUsage();

  // Convert to MB
  const heapUsed = Math.round(usage.heapUsed / 1024 / 1024);
  const heapTotal = Math.round(usage.heapTotal / 1024 / 1024);
  const external = Math.round(usage.external / 1024 / 1024);
  const rss = Math.round(usage.rss / 1024 / 1024);

  const heapPercentage = (heapUsed / heapTotal) * 100;

  const details = {
    heapUsed: `${heapUsed}MB`,
    heapTotal: `${heapTotal}MB`,
    external: `${external}MB`,
    rss: `${rss}MB`,
    heapPercentage: `${heapPercentage.toFixed(1)}%`,
  };

  if (heapPercentage > 90) {
    logger.warn('High memory usage', details);
    return {
      status: 'degraded',
      message: 'High memory usage',
      details,
    };
  }

  return {
    status: 'up',
    details,
  };
}

/**
 * Liveness probe - checks if application is alive
 * Should return healthy if the process is running
 */
export async function getLiveness(): Promise<{ status: 'alive' }> {
  return { status: 'alive' };
}

/**
 * Readiness probe - checks if application is ready to serve traffic
 * Should check critical dependencies (database, storage)
 */
export async function getReadiness(): Promise<{
  status: 'ready' | 'not_ready';
  checks: {
    database: HealthCheckResult;
  };
}> {
  const database = await checkDatabase();

  const status = database.status === 'up' ? 'ready' : 'not_ready';

  return {
    status,
    checks: {
      database,
    },
  };
}

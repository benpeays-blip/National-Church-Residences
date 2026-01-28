import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logging';
import { logApiRequestPerformance } from '../utils/performance';

/**
 * Request Logging Middleware
 *
 * Logs all HTTP requests with:
 * - Method, URL, status code
 * - Response time
 * - User ID (if authenticated)
 * - Client IP address
 *
 * Uses structured logging for easy parsing and analysis.
 */
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();

  // Capture response finish event
  res.on('finish', () => {
    const duration = Date.now() - start;

    // Determine log level based on status code
    let logLevel: 'info' | 'warn' | 'error' = 'info';
    if (res.statusCode >= 500) {
      logLevel = 'error';
    } else if (res.statusCode >= 400) {
      logLevel = 'warn';
    }

    logger[logLevel]('HTTP Request', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user?.id,
      ip: req.ip || req.socket.remoteAddress,
      userAgent: req.get('user-agent'),
      // Only log query params for GET requests (avoid logging sensitive POST data)
      ...(req.method === 'GET' && Object.keys(req.query).length > 0 && {
        query: req.query,
      }),
    });

    // Track API performance metrics
    logApiRequestPerformance(req.method, req.url, res.statusCode, duration, {
      userId: req.user?.id,
    });
  });

  next();
}

/**
 * Slow Request Warning Middleware
 *
 * Logs a warning if a request takes longer than the threshold.
 * Useful for identifying performance bottlenecks.
 */
export function slowRequestLogger(thresholdMs: number = 1000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      if (duration > thresholdMs) {
        logger.warn('Slow request detected', {
          method: req.method,
          url: req.url,
          duration: `${duration}ms`,
          threshold: `${thresholdMs}ms`,
          userId: req.user?.id,
        });
      }
    });

    next();
  };
}

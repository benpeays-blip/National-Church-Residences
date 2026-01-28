import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError, ValidationError } from '../utils/errors';

/**
 * Centralized Error Handler Middleware
 *
 * Handles all errors thrown in the application:
 * - Zod validation errors (400)
 * - Custom AppError instances (various status codes)
 * - Unexpected errors (500)
 *
 * Logs errors and returns appropriate HTTP responses.
 * In production, hides internal error details from clients.
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Operational errors (AppError and subclasses)
  if (err instanceof AppError) {
    const response: {
      message: string;
      errors?: unknown;
    } = {
      message: err.message,
    };

    // Include validation errors if present
    if (err instanceof ValidationError && err.errors) {
      response.errors = err.errors;
    }

    return res.status(err.statusCode).json(response);
  }

  // Unexpected errors
  // Use structured logging
  const logger = require('../config/logging').logger;
  logger.error('Unexpected error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
    userId: req.user?.id,
  });

  // Don't expose internal errors in production
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message;

  return res.status(500).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

/**
 * 404 Not Found Handler
 *
 * Catches requests to undefined routes.
 * Should be added AFTER all valid routes.
 */
export function notFoundHandler(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(404).json({
    message: `Route ${req.method} ${req.path} not found`,
  });
}

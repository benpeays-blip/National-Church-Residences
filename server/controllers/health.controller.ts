import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as healthService from '../services/health.service';

/**
 * Health Check Controller
 *
 * Handles HTTP requests for health check endpoints.
 * Used by monitoring systems and Kubernetes probes.
 */

/**
 * GET /health
 * Get overall system health status
 */
export const getHealth = asyncHandler(async (_req: Request, res: Response) => {
  const health = await healthService.getHealthStatus();

  // Return 503 if unhealthy, 200 otherwise
  const statusCode = health.status === 'unhealthy' ? 503 : 200;

  res.status(statusCode).json(health);
});

/**
 * GET /health/live
 * Kubernetes liveness probe
 * Returns 200 if the process is alive
 */
export const getLiveness = asyncHandler(async (_req: Request, res: Response) => {
  const liveness = await healthService.getLiveness();
  res.json(liveness);
});

/**
 * GET /health/ready
 * Kubernetes readiness probe
 * Returns 200 if ready to serve traffic, 503 if not ready
 */
export const getReadiness = asyncHandler(async (_req: Request, res: Response) => {
  const readiness = await healthService.getReadiness();

  // Return 503 if not ready, 200 if ready
  const statusCode = readiness.status === 'ready' ? 200 : 503;

  res.status(statusCode).json(readiness);
});

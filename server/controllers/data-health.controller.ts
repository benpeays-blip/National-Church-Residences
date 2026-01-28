import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as dataHealthService from '../services/data-health.service';

/**
 * Data Health Controller
 *
 * Handles HTTP requests for data quality and health monitoring.
 */

export const getDataHealthMetrics = asyncHandler(async (_req: Request, res: Response) => {
  const metrics = await dataHealthService.getDataHealthMetrics();
  res.json(metrics);
});

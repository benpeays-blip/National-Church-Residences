import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as dashboardsService from '../services/dashboards.service';

/**
 * Dashboards Controller
 *
 * Handles HTTP requests for executive and role-based dashboards.
 */

export const getHomeDashboard = asyncHandler(async (_req: Request, res: Response) => {
  const data = await dashboardsService.getHomeDashboard();
  res.json(data);
});

export const getMGODashboard = asyncHandler(async (_req: Request, res: Response) => {
  const data = await dashboardsService.getMGODashboard();
  res.json(data);
});

export const getDevDirectorDashboard = asyncHandler(async (_req: Request, res: Response) => {
  const data = await dashboardsService.getDevDirectorDashboard();
  res.json(data);
});

export const getCEODashboard = asyncHandler(async (_req: Request, res: Response) => {
  const data = await dashboardsService.getCEODashboard();
  res.json(data);
});
